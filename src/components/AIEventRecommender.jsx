import React, { useMemo, useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import { MOCK_EVENTS } from "../data/mockEvents";
import { recommendEvents, saveStudentProfile } from "../services/api";
import EventDetailModal from "./EventDetailModal";
import EventGrid, { normalizeEvent } from "./EventGrid";
import FilterSidebar from "./FilterSidebar";

function filterMockEvents(preferences) {
  const matches = MOCK_EVENTS.filter((event) => {
    const typeMatch =
      preferences.event_types.length === 0 ||
      preferences.event_types.includes(event.category);
    const domainMatch = event.domain === preferences.domain;
    const locationMatch =
      preferences.location === "Any" ||
      event.location === preferences.location ||
      event.location === "Remote";

    return typeMatch && domainMatch && locationMatch;
  });

  return matches.length ? matches : MOCK_EVENTS.slice(0, 4);
}

export default function AIEventRecommender() {
  const [userPreferences, setUserPreferences] = useState({
    student_email: "",
    branch: "Computer Science",
    event_types: ["Hackathon", "Bootcamp"],
    location: "Bhopal",
    domain: "Web Dev",
    tags: ["React", "Bhopal"],
  });
  const [events, setEvents] = useState(MOCK_EVENTS.slice(0, 3));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Profile changes are ready to save.");

  const updatePreference = (key, value) => {
    setUserPreferences((current) => ({ ...current, [key]: value }));
  };

  const toggleEventType = (type) => {
    setUserPreferences((current) => {
      const exists = current.event_types.includes(type);
      const event_types = exists
        ? current.event_types.filter((item) => item !== type)
        : [...current.event_types, type];

      return { ...current, event_types };
    });
  };

  const toggleTag = (tag) => {
    setUserPreferences((current) => {
      const exists = current.tags.includes(tag);
      const tags = exists
        ? current.tags.filter((item) => item !== tag)
        : [...current.tags, tag];

      return { ...current, tags };
    });
  };

  const generateAIPicks = async () => {
    setIsLoading(true);
    setEvents([]);
    setStatusMessage("Saving profile and asking AI for matches...");

    try {
      if (userPreferences.student_email.trim()) {
        await saveStudentProfile(userPreferences);
      }

      const aiEvents = await recommendEvents(userPreferences);
      const normalizedEvents = aiEvents.map(normalizeEvent);
      setEvents(normalizedEvents);
      setStatusMessage("AI picks generated from Supabase events.");
    } catch (error) {
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      setEvents(filterMockEvents(userPreferences).map(normalizeEvent));
      setStatusMessage("Backend unavailable, showing polished demo picks locally.");
    } finally {
      setIsLoading(false);
    }
  };

  const matchSummary = useMemo(
    () =>
      `${userPreferences.branch} / ${userPreferences.domain} / ${userPreferences.location}`,
    [userPreferences.branch, userPreferences.domain, userPreferences.location]
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_32%),linear-gradient(135deg,#f8fafc,#eef2ff_55%,#ecfeff)] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <header className="mb-8 border border-white/80 bg-white/80 p-6 shadow-2xl shadow-slate-200/60 backdrop-blur-md">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-extrabold text-teal-800">
                <Sparkles className="h-4 w-4" />
                AI Event Marketplace
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
                Personalized event discovery for ambitious students.
              </h1>
              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">
                Save your profile, generate AI-ranked opportunities, inspect deadlines, and register your team in one dashboard.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl">
              <p className="text-sm font-bold text-slate-300">Current profile</p>
              <p className="mt-2 text-lg font-extrabold">{matchSummary}</p>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-teal-200">
                <ShieldCheck className="h-4 w-4" />
                {statusMessage}
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <FilterSidebar
            userPreferences={userPreferences}
            onPreferenceChange={updatePreference}
            onToggleEventType={toggleEventType}
            onToggleTag={toggleTag}
            onGenerate={generateAIPicks}
            isLoading={isLoading}
          />

          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-extrabold uppercase text-teal-700">AI-curated grid</p>
                <h2 className="text-2xl font-extrabold text-slate-950">Recommended events</h2>
              </div>
              <p className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">
                {isLoading ? "Processing preferences..." : `${events.length} matches`}
              </p>
            </div>

            <EventGrid
              events={events.map(normalizeEvent)}
              isLoading={isLoading}
              onSelectEvent={setSelectedEvent}
            />
          </section>
        </div>
      </section>

      <EventDetailModal
        event={selectedEvent}
        leaderEmail={userPreferences.student_email}
        onClose={() => setSelectedEvent(null)}
      />
    </main>
  );
}
