import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const featured = {
  title: "Field-Following Autonomous Robot",
  description:
    "Dual-microcontroller (STM32L051 + EFM8LB12F64) robot that follows a magnetic guide wire using LC tank pickup inductors and an adaptive baseline detector. Custom MOSFET H-bridge motor drivers with optocoupler isolation, 38 kHz IR remote with proportional joystick control, and VL53L0X Time-of-Flight collision avoidance over I²C.",
  tags: ["EFM8", "STM32", "C", "MOSFETs", "I²C", "IR"],
  videoEmbedUrl: "https://www.youtube.com/embed/U5jY5kz8_YE",
};

const projects = [
  {
    title: "Reflow Oven Controller",
    description:
      "Closed-loop temperature controller in 8051 Assembly on a CV-8052, regulating a 1500W oven via SSR-based PWM for SMD reflow soldering. K-type thermocouple with cold-junction compensation achieving ±3°C accuracy. Python serial dashboard with real-time strip-chart plotting and automated Excel reports over UART at 115200 baud.",
    tags: ["CV-8052", "Assembly", "Op-Amp", "ADC", "SSR", "Python"],
    image: "/projects/reflow.jpg",
  },
  {
    title: "AC Phasor Voltmeter",
    description:
      "Microcontroller-based AC instrument that displays RMS voltage and phase difference between two 60 Hz sinusoidal inputs using high-speed ADC sampling and digital signal processing in C.",
    tags: ["EFM8LB1", "C", "ADC", "Signal Processing"],
    image: "/projects/phasor-voltmeter.jpg",
  },
  {
    title: "Capacitance Meters (Dual Platform)",
    description:
      "Two capacitance meters built on different MCU families (8051 and ARM) using 555 timer astable oscillators for frequency-based measurement from 1 nF to 1 µF. Designed the 555 equivalent from discrete comparators, an SR flip-flop, and a transistor discharge circuit.",
    tags: ["EFM8LB1", "STM32", "555 Timer", "C"],
    image: "/projects/capacitance-meter.jpg",
  },
  {
    title: "Battery Temperature Monitor PCB",
    description:
      "Battery-powered temperature monitor using an NTC thermistor, resistor dividers, and an LM393 comparator to trigger an LED alert when temperature exceeds a safe threshold. Full design cycle: schematic capture, 2-layer PCB layout with ground plane, DRC verification, and Gerber file generation.",
    tags: ["KiCad", "PCB Layout", "Analog Design", "Schematic Capture"],
    image: "/projects/pcb.jpg",
  },
  {
    title: "FPGA Tron Game",
    description:
      "Real-time FPGA-based Tron game in C with hardware I/O integration. Handled player controls, on-screen behavior, and debugged timing issues through systematic hardware-software testing and verification.",
    tags: ["FPGA", "C", "Digital Systems", "Hardware I/O"],
    image: "/projects/tron-poster.jpg",
    videoSrc: "/projects/tron.mp4",
    poster: "/projects/tron-poster.jpg",
  },
  {
    title: "Embedded Alarm Clock",
    description:
      "Real-time alarm clock built on the N76E003 (8051) entirely in assembly. Timer-driven interrupts handle hours/minutes/seconds tracking with AM/PM, configurable alarm with snooze, and an edit mode for setting time. LCD display, button matrix, and speaker output for the alarm tone.",
    tags: ["8051", "Assembly", "Timer Interrupts", "LCD", "Real-Time"],
    image: "/projects/alarmclock-poster.jpg",
    videoSrc: "/projects/alarmclock.mp4",
    poster: "/projects/alarmclock-poster.jpg",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-[#737373] text-xs font-mono uppercase tracking-widest mb-4">
              Featured Project
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-[#F5F5F5] tracking-tight leading-tight">
              {featured.title}
            </h2>
            <p className="text-[#737373] text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-[#737373] bg-[#0A0A0A] border border-[#1F1F1F] px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        }
      >
        <iframe
          src={featured.videoEmbedUrl}
          title={featured.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </ContainerScroll>

      <div className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="More Projects" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} {...project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
