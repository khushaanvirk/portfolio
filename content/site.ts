// Everything on the homepage that is not a project. Edit the words here; the
// layout lives in app/page.tsx.

export const site = {
  name: "Khushaan Virk",
  headline: "EE @ UBC | SWE @ Advizr | Incoming SWE @ Bosch",

  links: [
    { label: "Resume", href: "/resume.pdf", download: "Khushaan_Virk_Resume.pdf" },
    { label: "GitHub", href: "https://github.com/khushaanvirk" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khushaan-virk" },
    { label: "Email", href: "mailto:khushaanvirk@gmail.com" },
  ],

  work: [
    { name: "Bosch", role: "Software engineer", when: "Incoming" },
    { name: "Advizr", role: "Software engineer", when: "2026 to now" },
  ],

  reading: "Meditations, and The Will of the Many",
  finished: "Psycho-Cybernetics",
  also: "Climbing, running, techno and dubstep, sleepmaxxing",

  // The rapid rating is read live from chess.com's public API.
  chess: {
    username: "bigchickenwitapoostick",
    profile: "https://www.chess.com/member/bigchickenwitapoostick",
  },

  // Duolingo has no public API, so the streak counts up one a day from a day
  // it was known. If the streak breaks, set a new date and count here.
  duolingo: { date: "2026-11-16", streak: 83 },

  location: "Vancouver, BC",
  timeZone: "America/Vancouver",
} as const;
