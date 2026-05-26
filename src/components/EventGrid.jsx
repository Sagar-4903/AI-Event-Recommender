import React from "react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

const categoryStyles = {
  Hackathon: "bg-cyan-100 text-cyan-700 ring-cyan-200",
  Bootcamp: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Contest: "bg-amber-100 text-amber-700 ring-amber-200",
};

export function normalizeEvent(event) {
  return {
    ...event,
    id: event.id || event.event_id,
    title: event.title || event.name || event.event_name,
    ai_reason: event.ai_reason || event.aiReason || event.ai_pitch || "Strong match for your current profile.",
    ai_pitch: event.ai_pitch || event.aiPitch || event.ai_reason || "This event aligns with your profile and current learning goals.",
    eligibility: event.eligibility || ["Open to eligible student participants."],
    timeline:
      event.timeline ||
      [
        { label: "Registration deadline", date: event.deadline || "TBA" },
        { label: "Event date", date: event.date || "TBA" },
      ],
  };
}

function EventCard({ event, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className="group rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-xl shadow-slate-200/60 outline-none transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-100 focus-visible:ring-4 focus-visible:ring-teal-200"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${categoryStyles[event.category] || categoryStyles.Hackathon}`}>
          {event.category}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">
          <CalendarDays className="h-3.5 w-3.5" />
          {event.date || "TBA"}
        </span>
      </div>
      <h3 className="text-xl font-extrabold leading-tight text-slate-950">{event.title}</h3>
      <p className="mt-3 line-clamp-1 text-sm font-semibold text-teal-700">{event.ai_reason}</p>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="flex min-w-0 items-center gap-1 text-sm font-bold text-slate-500">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{event.domain} / {event.location}</span>
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-white transition-all duration-300 group-hover:translate-x-1">
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>
    </button>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="h-64 animate-pulse rounded-3xl bg-white/80 shadow-xl shadow-slate-200/70" />
      ))}
    </div>
  );
}

export default function EventGrid({ events, isLoading, onSelectEvent }) {
  if (isLoading) {
    return <LoadingGrid />;
  }

  if (!events.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-xl shadow-slate-200/50">
        <p className="text-lg font-extrabold text-slate-950">No matching events yet</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">Adjust filters and generate AI picks again.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onSelect={onSelectEvent} />
      ))}
    </div>
  );
}
