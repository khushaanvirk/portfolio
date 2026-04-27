import SectionHeader from "@/components/ui/SectionHeader";
import SkillGroup from "@/components/ui/SkillGroup";

const skillGroups = [
  {
    label: "Embedded & Control Systems",
    skills: [
      "8051 (N76E003, EFM8LB1, CV-8052)",
      "ARM (STM32)",
      "FPGA",
      "ADC/DAC",
      "I²C",
      "SPI",
      "UART",
      "PWM",
    ],
  },
  {
    label: "Programming",
    skills: ["C", "Embedded C", "Assembly (8051)", "Python", "SQL", "SystemVerilog"],
  },
  {
    label: "Instrumentation & Hardware",
    skills: [
      "Oscilloscope",
      "Multimeter",
      "Soldering",
      "Signal Conditioning",
      "Op-Amp Design",
      "PCB Layout",
    ],
  },
  {
    label: "Tools & Software",
    skills: ["Git", "KiCad", "EasyEDA", "MATLAB", "PuTTY", "CrossIDE"],
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
