import json
import os
import re
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from supabase import Client, create_client


load_dotenv()


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
ACTIVE_EVENTS_COLUMN = os.getenv("SUPABASE_ACTIVE_EVENTS_COLUMN", "is_active")


def _required_env(name: str, value: str | None) -> str:
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


supabase: Client = create_client(
    _required_env("SUPABASE_URL", SUPABASE_URL),
    _required_env("SUPABASE_KEY", SUPABASE_KEY),
)
gemini_client = genai.Client(api_key=_required_env("GEMINI_API_KEY", GEMINI_API_KEY))


app = FastAPI(
    title="True Presence AI Event Marketplace API",
    version="1.0.0",
)


allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:3000,http://localhost:5173,http://localhost:5174,"
        "http://127.0.0.1:3000,http://127.0.0.1:5173,http://127.0.0.1:5174",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserPreferences(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    branch: str = Field(..., min_length=1, max_length=120)
    event_types: list[str] = Field(..., min_length=1)
    location: str = Field(..., min_length=1, max_length=160)
    domain: str = Field(..., min_length=1, max_length=160)


class TeamRegistration(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    event_id: str = Field(..., min_length=1, max_length=120)
    leader_email: EmailStr
    teammates: list[EmailStr] = Field(default_factory=list)


def _parse_json_array(raw_text: str) -> list[dict[str, Any]]:
    cleaned = raw_text.strip()

    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r"\s*```$", "", cleaned)

    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        raise ValueError(f"Gemini returned invalid JSON: {exc.msg}") from exc

    if not isinstance(parsed, list):
        raise ValueError("Gemini response must be a JSON array.")

    for item in parsed:
        if not isinstance(item, dict):
            raise ValueError("Every Gemini recommendation must be a JSON object.")
        if "ai_pitch" not in item:
            raise ValueError("Every recommended event must include an ai_pitch field.")

    return parsed


def _build_recommendation_prompt(
    preferences: UserPreferences,
    events: list[dict[str, Any]],
) -> str:
    preferences_json = json.dumps(
        jsonable_encoder(preferences.model_dump()),
        ensure_ascii=False,
        indent=2,
    )
    events_json = json.dumps(jsonable_encoder(events), ensure_ascii=False, indent=2)

    return f"""
You are a career advisor for students using the True Presence AI Event Marketplace.

Return only a valid JSON array. Do not include markdown, explanations, or wrapper keys.

Filter the provided active events strictly against the user's preferences:
- branch must be relevant to the event audience or eligibility
- event_types must match the event type/category
- location must match the event location, delivery mode, or allowed attendance area
- domain must match the event domain, skills, theme, or career path

Do not invent events. Only return events that exist in the provided active events list.
For every matching event, preserve the event's existing fields and add:
- ai_pitch: a concise, personalized reason this event fits the user

If no events match, return an empty JSON array.

User preferences:
{preferences_json}

Active events:
{events_json}
""".strip()


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/recommend-events")
def recommend_events(preferences: UserPreferences) -> list[dict[str, Any]]:
    try:
        events_response = (
            supabase.table("events")
            .select("*")
            .eq(ACTIVE_EVENTS_COLUMN, True)
            .execute()
        )
        events = events_response.data or []
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch active events from Supabase: {exc}",
        ) from exc

    try:
        prompt = _build_recommendation_prompt(preferences, events)
        response = gemini_client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.2,
            ),
        )
        if not response.text:
            raise ValueError("Gemini returned an empty response.")

        return _parse_json_array(response.text)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate AI event recommendations: {exc}",
        ) from exc


@app.post("/api/register-team")
def register_team(registration: TeamRegistration) -> dict[str, str]:
    row = {
        "event_id": registration.event_id,
        "leader_email": str(registration.leader_email),
        "teammates": [str(email) for email in registration.teammates],
    }

    try:
        supabase.table("event_registrations").insert(row).execute()
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to register team in Supabase: {exc}",
        ) from exc

    return {
        "status": "success",
        "message": "Team registration completed successfully.",
    }
