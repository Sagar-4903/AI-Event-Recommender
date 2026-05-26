import React from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  Sparkles,
  Target,
} from "lucide-react";
import { BRANCHES, DOMAINS, EVENT_TYPES, LOCATIONS, QUICK_TAGS } from "../data/mockEvents";

function SelectField({ label, icon: Icon, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
        <Icon className="h-4 w-4 text-teal-600" />
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-slate-800 shadow-sm outline-none transition-all duration-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </span>
    </label>
  );
}

export default function FilterSidebar({
  userPreferences,
  onPreferenceChange,
  onToggleEventType,
  onToggleTag,
  onGenerate,
  isLoading,
}) {
  return (
    <aside className="border border-white/70 bg-white/80 p-5 shadow-glow backdrop-blur-md lg:sticky lg:top-6">
      <div className="mb-5">
        <p className="text-sm font-extrabold uppercase text-teal-600">Student profile</p>
        <h2 className="mt-1 text-2xl font-extrabold text-slate-950">Tune your AI picks</h2>
      </div>

      <div className="grid gap-4">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
            <Mail className="h-4 w-4 text-teal-600" />
            Student email
          </span>
          <input
            type="email"
            value={userPreferences.student_email}
            onChange={(event) => onPreferenceChange("student_email", event.target.value)}
            placeholder="student@college.edu"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition-all duration-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          />
        </label>
        <SelectField
          label="Branch"
          icon={BriefcaseBusiness}
          value={userPreferences.branch}
          onChange={(value) => onPreferenceChange("branch", value)}
          options={BRANCHES}
        />
        <SelectField
          label="Domain"
          icon={Target}
          value={userPreferences.domain}
          onChange={(value) => onPreferenceChange("domain", value)}
          options={DOMAINS}
        />
        <SelectField
          label="Location"
          icon={MapPin}
          value={userPreferences.location}
          onChange={(value) => onPreferenceChange("location", value)}
          options={LOCATIONS}
        />
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-bold text-slate-700">Event types</p>
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((type) => {
            const active = userPreferences.event_types.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => onToggleEventType(type)}
                className={`rounded-full px-4 py-2 text-sm font-bold ring-1 transition-all duration-300 ${
                  active
                    ? "bg-slate-950 text-white ring-slate-950"
                    : "bg-white text-slate-600 ring-slate-200 hover:ring-teal-300"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-bold text-slate-700">Quick signals</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_TAGS.map((tag) => {
            const active = userPreferences.tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleTag(tag)}
                className={`rounded-full px-3 py-2 text-sm font-bold transition-all duration-300 ${
                  active
                    ? "bg-teal-100 text-teal-800 ring-1 ring-teal-300"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-extrabold text-white shadow-xl shadow-teal-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
        Generate AI Picks
      </button>
    </aside>
  );
}
