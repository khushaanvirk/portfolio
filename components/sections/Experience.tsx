import SectionHeader from "@/components/ui/SectionHeader";
import TimelineItem from "@/components/ui/TimelineItem";

const experience = [
  {
    role: "Software Engineer",
    company: "Visurae (Co-founder)",
    period: "Dec 2025 – Present",
    bullets: [
      "Designed AI-powered automation workflows for lead generation and outbound outreach.",
      "Integrated data ingestion, prompt engineering, and decision logic into end-to-end production systems.",
      "Collaborated with co-founders to evaluate performance, reliability, and scalability of deployed systems.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Advizr",
    period: "Jul 2025 – Present",
    bullets: [
      "Developed AI-driven workflow automations reducing manual client operations by 30%.",
      "Translated stakeholder needs into technical requirements and implementation plans.",
      "Coordinated cross-functional execution across engineering, operations, and client teams.",
    ],
  },
  {
    role: "Sports Instructor & Camp Leader",
    company: "City of Surrey",
    period: "Sep 2023 – Sep 2025",
    bullets: [
      "Promoted to supervisor; led a team of volunteers and instructors running summer camps.",
      "Delivered structured programs for ages 3–12, maintaining safety standards and incident documentation.",
      "Mentored new volunteers and built an inclusive, high-energy team environment.",
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
