const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.detail || "Request failed";
    throw new Error(Array.isArray(message) ? message[0]?.msg : message);
  }

  return payload;
}

export function saveStudentProfile(profile) {
  return request("/api/student-profile", {
    method: "POST",
    body: JSON.stringify(profile),
  });
}

export function recommendEvents(preferences) {
  return request("/api/recommend-events", {
    method: "POST",
    body: JSON.stringify(preferences),
  });
}

export function registerTeam(payload) {
  return request("/api/register-team", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
