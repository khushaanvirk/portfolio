import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";

const featuredProjects = [
  {
    title: "Battery Temperature Monitor PCB",
    description:
      "Battery-powered temperature monitor using an NTC thermistor, resistor dividers, and an LM393 comparator to trigger an LED alert when temperature exceeds a safe threshold. Full design cycle: schematic capture, 2-layer PCB layout with ground plane, DRC verification, and Gerber file generation.",
    tags: ["KiCad", "PCB Layout", "Analog Design", "Schematic Capture"],
    image: "/projects/pcb.jpg",
  },
  {
    title: "Reflow Oven Controller",
    description:
      "Closed-loop temperature controller in Assembly on a CV-8052 microcontroller, regulating a 1500W oven via SSR-based PWM for SMD reflow soldering. K-type thermocouple with cold-junction compensation achieving ±3°C accuracy. Serial data streaming to host PC with Python plotting and automated phone notifications via webhooks.",
    tags: ["Assembly", "PWM", "Signal Conditioning", "ADC", "Webhooks"],
    image: "/projects/reflow-placeholder.svg",
  },
  {
    title: "FPGA Tron Game",
    description:
      "Developed a real-time FPGA-based Tron game in C with hardware I/O integration. Handled player controls, on-screen behavior, and debugged timing issues through systematic hardware-software testing and verification.",
    tags: ["FPGA", "C", "Digital Systems", "Hardware I/O"],
    image: "/projects/fpga-placeholder.svg",
  },
];

const otherProjects = [
  "Embedded Alarm Clock System — 8051, timer-driven interrupts, real-time timekeeping in assembly",
  "Battery Temperature Monitor PCB — NTC thermistor, LM393 comparator, 2-layer PCB, DRC verification",
  "Arduino-Based Traffic Signal Controller — control logic, state machine programming",
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Projects" />

        {/* Featured cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>

        {/* Other projects */}
        <div className="mt-16">
          <h3 className="text-[#737373] text-xs font-mono uppercase tracking-widest mb-6">
            Other Projects
          </h3>
          <div className="space-y-3">
            {otherProjects.map((p) => (
              <div
                key={p}
                className="flex gap-3 text-sm text-[#737373] border-l-2 border-[#1F1F1F] pl-4 py-1"
              >
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
