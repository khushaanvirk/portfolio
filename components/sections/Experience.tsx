import SectionHeader from "@/components/ui/SectionHeader";
import TimelineItem from "@/components/ui/TimelineItem";

const experience = [
  {
    role: "Software Engineer",
    company: "Advizr",
    period: "Jan 2026 – Present",
    bullets: [
      "Designed and shipped end-to-end Python automation systems for clients, including web scraping, REST API integrations, SQL storage, and automated email pipelines, working from open-ended goals rather than fixed specs.",
      "Picked up new libraries and APIs on a per-project basis by reading documentation directly, applying the same approach used to learn microcontroller peripherals from datasheets.",
      "Diagnosed production issues in deployed client systems by reproducing failures locally, isolating the root cause, and verifying fixes before redeployment.",
      "Maintained client systems across ongoing change requests using Git for version control, balancing new feature work against keeping existing deployments stable.",
    ],
  },
  {
    role: "Sports Instructor / Summer Camp Leader",
    company: "City of Surrey",
    period: "Sep 2023 – Sep 2025",
    bullets: [
      "Led structured programs for groups of 15–30, coordinating daily operations across staff and volunteers while maintaining safety standards.",
      "Adapted instruction in real time to participants of varying skill levels, communicating clear expectations to children, parents, and co-instructors while resolving conflicts and incidents on the spot.",
      "Managed concurrent daily responsibilities including equipment setup, attendance tracking, lesson delivery, and end-of-day reporting under fixed program schedules.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Experience" />
        <div>
          {experience.map((item, i) => (
            <TimelineItem
              key={item.company}
              {...item}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
