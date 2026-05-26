export const MOCK_EVENTS = [
  {
    id: "ev-101",
    title: "React AI Product Hackathon",
    category: "Hackathon",
    domain: "Web Dev",
    location: "Bhopal",
    date: "June 14, 2026",
    deadline: "June 08, 2026",
    ai_reason: "Matches your Web Dev profile and React product-building interests.",
    ai_pitch:
      "This hackathon is a strong match because it rewards fast frontend execution, clear product thinking, and AI-assisted workflows. Your React experience can become the anchor of a polished campus-ready product demo.",
    eligibility: [
      "Open to undergraduate university students.",
      "Teams of 2 to 4 students are allowed.",
      "At least one member should know frontend development.",
    ],
    timeline: [
      { label: "Registration closes", date: "June 08" },
      { label: "Problem statements released", date: "June 11" },
      { label: "Final demo day", date: "June 14" },
    ],
  },
  {
    id: "ev-102",
    title: "AI Builders Bootcamp",
    category: "Bootcamp",
    domain: "AI",
    location: "Remote",
    date: "June 25, 2026",
    deadline: "June 20, 2026",
    ai_reason: "Fits your AI domain preference and project-focused learning path.",
    ai_pitch:
      "This bootcamp is useful if you want to move from AI curiosity to working prototypes. You will learn how to frame a use case, connect model output to user experience, and present AI features responsibly.",
    eligibility: [
      "Open to students with basic Python knowledge.",
      "No prior ML research experience required.",
      "Bring one project idea for hands-on sessions.",
    ],
    timeline: [
      { label: "Pre-work shared", date: "June 18" },
      { label: "Registration closes", date: "June 20" },
      { label: "Bootcamp starts", date: "June 25" },
    ],
  },
  {
    id: "ev-103",
    title: "DSA Speed Contest",
    category: "Contest",
    domain: "DSA",
    location: "Remote",
    date: "June 19, 2026",
    deadline: "June 16, 2026",
    ai_reason: "Recommended for strengthening coding rounds and placement readiness.",
    ai_pitch:
      "This contest fits students who want measurable improvement in problem solving and interview preparation. It focuses on timed decisions, clean logic, and ranking feedback that can sharpen your placement preparation.",
    eligibility: [
      "Individual participation only.",
      "Basic knowledge of arrays, strings, sorting, and graphs required.",
      "Students from all branches can participate.",
    ],
    timeline: [
      { label: "Practice arena opens", date: "June 15" },
      { label: "Registration closes", date: "June 16" },
      { label: "Contest window", date: "June 19" },
    ],
  },
  {
    id: "ev-104",
    title: "Full Stack Campus Sprint",
    category: "Hackathon",
    domain: "Web Dev",
    location: "Indore",
    date: "July 02, 2026",
    deadline: "June 27, 2026",
    ai_reason: "Good fit for students who can turn UI, API, and database work into one demo.",
    ai_pitch:
      "This sprint helps you practice full-stack collaboration under realistic delivery pressure. It is especially valuable if you want to show more than screens by connecting frontend, backend, and database flows.",
    eligibility: [
      "Teams of 3 to 5 students.",
      "One member must be comfortable with Git.",
      "Prototype must solve a student or campus workflow problem.",
    ],
    timeline: [
      { label: "Team lock deadline", date: "June 24" },
      { label: "Registration closes", date: "June 27" },
      { label: "Build sprint", date: "July 02" },
    ],
  },
  {
    id: "ev-105",
    title: "Prompt Engineering Challenge",
    category: "Contest",
    domain: "AI",
    location: "Bhopal",
    date: "July 10, 2026",
    deadline: "July 05, 2026",
    ai_reason: "Great match for students exploring practical AI tools and structured thinking.",
    ai_pitch:
      "This challenge is designed for students who want to understand how better instructions lead to better AI output. It will improve your ability to reason about context, constraints, evaluation, and iteration.",
    eligibility: [
      "Individual or duo participation.",
      "Laptop required for live rounds.",
      "Open to students from all technical branches.",
    ],
    timeline: [
      { label: "Qualifier prompt shared", date: "July 01" },
      { label: "Registration closes", date: "July 05" },
      { label: "Live challenge", date: "July 10" },
    ],
  },
  {
    id: "ev-106",
    title: "Placement DSA Bootcamp",
    category: "Bootcamp",
    domain: "DSA",
    location: "Bhopal",
    date: "July 16, 2026",
    deadline: "July 11, 2026",
    ai_reason: "Prioritizes your DSA goals with guided practice and interview-style drills.",
    ai_pitch:
      "This bootcamp matches students who want structure instead of random practice. You will get guided problem sets, common interview patterns, and a clearer plan for improving consistency.",
    eligibility: [
      "Recommended for second year and above.",
      "Basic programming knowledge required.",
      "Students must complete the starter assessment.",
    ],
    timeline: [
      { label: "Starter assessment", date: "July 08" },
      { label: "Registration closes", date: "July 11" },
      { label: "Bootcamp begins", date: "July 16" },
    ],
  },
];

export const EVENT_TYPES = ["Hackathon", "Bootcamp", "Contest"];
export const DOMAINS = ["Web Dev", "AI", "DSA"];
export const BRANCHES = ["Computer Science", "AI/ML", "IT", "ECE", "Mechanical"];
export const LOCATIONS = ["Bhopal", "Indore", "Remote", "Any"];
export const QUICK_TAGS = ["React", "Bhopal", "Remote", "Beginner Friendly", "Team Event"];
