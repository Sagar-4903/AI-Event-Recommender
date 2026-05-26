import React from "react";
import { CalendarDays, CheckCircle2, MapPin, X } from "lucide-react";
import RegistrationPanel from "./RegistrationPanel";

const categoryStyles = {
  Hackathon: "bg-cyan-100 text-cyan-700 ring-cyan-200",
  Bootcamp: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Contest: "bg-amber-100 text-amber-700 ring-amber-200",
};

export default function EventDetailModal({ event, leaderEmail, onClose }) {
  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 px-4 py-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-title"
      onMouseDown={onClose}
    >
      <div className="mx-auto w-full max-w-6xl rounded-3xl bg-white shadow-2xl" onMouseDown={(mouseEvent) => mouseEvent.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-6">
          <div>
            <span className={`rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${categoryStyles[event.category] || categoryStyles.Hackathon}`}>
              {event.category}
            </span>
            <h2 id="event-title" className="mt-4 text-3xl font-extrabold leading-tight text-slate-950">
              {event.title}
            </h2>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {event.date || "TBA"}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:bg-slate-200 hover:text-slate-900"
            aria-label="Close event details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5">
            <section className="rounded-3xl border border-slate-200 p-5">
              <h3 className="text-lg font-extrabold text-slate-950">Detailed AI Pitch</h3>
              <p className="mt-3 leading-7 text-slate-600">{event.ai_pitch}</p>
            </section>

            <section className="rounded-3xl border border-slate-200 p-5">
              <h3 className="text-lg font-extrabold text-slate-950">Eligibility Criteria</h3>
              <ul className="mt-4 grid gap-3">
                {event.eligibility.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-slate-200 p-5">
              <h3 className="text-lg font-extrabold text-slate-950">Important Dates</h3>
              <div className="mt-5 grid gap-4">
                {event.timeline.map((step, index) => (
                  <div key={`${step.label}-${step.date}`} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-sm font-extrabold text-white">
                        {index + 1}
                      </span>
                      {index < event.timeline.length - 1 && <span className="h-8 w-px bg-slate-200" />}
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">{step.label}</p>
                      <p className="text-sm font-bold text-teal-700">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <RegistrationPanel event={event} leaderEmail={leaderEmail} />
        </div>
      </div>
    </div>
  );
}
