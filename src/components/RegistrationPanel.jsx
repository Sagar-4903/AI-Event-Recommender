import React, { useState } from "react";
import { CheckCircle2, Loader2, MailPlus, Trash2, UserPlus, Users } from "lucide-react";
import { registerTeam } from "../services/api";

export default function RegistrationPanel({ event, leaderEmail }) {
  const [email, setEmail] = useState("");
  const [teammates, setTeammates] = useState([]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const addTeammate = () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return;
    }
    if (!teammates.includes(cleanEmail)) {
      setTeammates((current) => [...current, cleanEmail]);
    }
    setEmail("");
  };

  const confirmRegistration = async () => {
    setStatus("submitting");
    setMessage("");

    try {
      await registerTeam({
        event_id: String(event.id),
        leader_email: leaderEmail || "student@example.com",
        teammates,
      });
      setStatus("confirmed");
      setMessage("Team registration saved successfully.");
    } catch (error) {
      setStatus("confirmed");
      setMessage("Demo registration confirmed locally. Start FastAPI to save it in Supabase.");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">
          <Users className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-extrabold text-slate-950">Form a Team</h3>
          <p className="text-sm font-medium text-slate-500">Add teammate emails and confirm registration.</p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addTeammate();
          }}
          placeholder="teammate@university.edu"
          className="h-12 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition-all duration-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
        />
        <button
          type="button"
          onClick={addTeammate}
          className="inline-flex h-12 items-center gap-2 rounded-2xl bg-teal-600 px-4 text-sm font-extrabold text-white transition-all duration-300 hover:bg-teal-700"
        >
          <MailPlus className="h-4 w-4" />
          Add
        </button>
      </div>

      <div className="mt-4 grid gap-2">
        {teammates.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm font-semibold text-slate-500">
            No teammates added yet.
          </p>
        ) : (
          teammates.map((teammate) => (
            <div key={teammate} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
              {teammate}
              <button
                type="button"
                onClick={() => setTeammates((current) => current.filter((item) => item !== teammate))}
                className="rounded-full p-2 text-slate-400 transition-all duration-300 hover:bg-rose-50 hover:text-rose-600"
                aria-label={`Remove ${teammate}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={confirmRegistration}
        disabled={status === "submitting"}
        className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 disabled:opacity-70"
      >
        {status === "submitting" ? <Loader2 className="h-5 w-5 animate-spin" /> : status === "confirmed" ? <CheckCircle2 className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
        {status === "confirmed" ? "Registration Confirmed" : "Confirm Registration"}
      </button>

      {message && <p className="mt-3 text-sm font-semibold text-teal-700">{message}</p>}
    </div>
  );
}
