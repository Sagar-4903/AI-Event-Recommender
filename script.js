const events = [
  {
    title: "AI Hackathon 2026",
    type: "technical",
    meta: "Lab 4 | 2 days | Team event",
    description: "Best match for students interested in ML models, Python, and product building.",
    score: 92
  },
  {
    title: "Startup Pitch Bootcamp",
    type: "career",
    meta: "Seminar Hall | 3 hours",
    description: "Recommended because your profile includes startups and public speaking.",
    score: 84
  },
  {
    title: "Cloud Fundamentals Workshop",
    type: "technical",
    meta: "Online | Beginner friendly",
    description: "Good skill-building event for backend, deployment, and cloud basics.",
    score: 81
  },
  {
    title: "Design Thinking Sprint",
    type: "creative",
    meta: "Innovation Cell | 1 day",
    description: "Useful for improving product thinking, UX decisions, and teamwork.",
    score: 76
  }
];

const eventList = document.querySelector("#eventList");
const eventFilter = document.querySelector("#eventFilter");
const refreshButton = document.querySelector("#refreshRecommendations");

function renderEvents(type = "all") {
  const filteredEvents = type === "all"
    ? events
    : events.filter((event) => event.type === type);

  eventList.innerHTML = filteredEvents.map((event) => `
    <article class="event-card">
      <div>
        <h4>${event.title}</h4>
        <span class="event-meta">${event.meta}</span>
        <p>${event.description}</p>
        <div class="event-actions">
          <button class="register-btn" type="button">Register</button>
          <button class="save-btn" type="button">Save</button>
        </div>
      </div>
      <span class="score-pill">${event.score}% fit</span>
    </article>
  `).join("");
}

eventFilter.addEventListener("change", (event) => {
  renderEvents(event.target.value);
});

refreshButton.addEventListener("click", () => {
  const shuffledEvents = events
    .map((event) => ({ ...event, score: Math.min(98, event.score + Math.floor(Math.random() * 6)) }))
    .sort((a, b) => b.score - a.score);

  events.splice(0, events.length, ...shuffledEvents);
  renderEvents(eventFilter.value);
});

renderEvents();
