import SectionHeader from "@/components/ui/SectionHeader";
import SkillGroup from "@/components/ui/SkillGroup";

const skillGroups = [
  {
    label: "Embedded & Digital Systems",
    skills: [
      "8051 Microcontroller",
      "RISC-V",
      "FPGA",
      "ADC",
      "Interrupt-driven Systems",
      "Serial Communication",
      "Real-time Control",
    ],
  },
  {
    label: "Programming",
    skills: ["C", "C++", "Embedded C", "Assembly", "SystemVerilog", "Python", "Arduino"],
  },
  {
    label: "CAD & Design",
    skills: ["KiCad", "EasyEDA", "AutoCAD", "MATLAB", "Gerber Files", "Schematic Capture", "PCB Layout"],
  },
  {
    label: "Hardware & Testing",
    skills: [
      "Oscilloscope",
      "Multimeter",
      "Soldering",
      "Breadboarding",
      "PCB Routing",
      "DRC Verification",
      "Signal Conditioning",
    ],
  },
  {
    label: "AI & Automation",
    skills: [
      "LLM Workflows",
      "Prompt Engineering",
      "API Orchestration",
      "Agentic Pipelines",
      "Data Ingestion",
      "Workflow Automation",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Skills" />
        <div className="grid sm:grid-cols-2 gap-12">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.label} {...group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
