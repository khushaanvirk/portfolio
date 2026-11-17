import type { Project } from "./types";

export const capacitanceMeters: Project = {
  slug: "capacitance-meters",
  title: "Capacitance meters",
  year: "2025",
  line: "One on EFM8, one on STM32",
  skills: ["Embedded C", "STM32", "Analog circuits"],
  preview: {
    type: "drawing",
    src: "/projects/drawings/cap.svg",
  },
  page: {
    dates: "Oct to Nov 2025",
    blurb:
      "Two capacitance meters on different microcontrollers. A 555 timer oscillates at a frequency set by the capacitor under test, and the firmware counts pulses to work the capacitance back out.",
    hero: {
      type: "image",
      src: "/projects/capacitance-meter.jpg",
      alt: "The meter on a breadboard reading 10 nF on its LCD",
      aspect: "3/2",
    },
    specs: [
      { label: "MCUs", value: "EFM8LB12F64 and STM32" },
      { label: "Method", value: "555 astable, f = 1.44 / ((R_A + 2·R_B)·C)" },
      { label: "Range", value: "1 nF to 1 µF" },
      { label: "Capture", value: "Pulse counting on a hardware timer input" },
      { label: "Display", value: "Four LCD modes" },
      { label: "Extra", value: "A 555 rebuilt from two LM393s, a NAND latch and a 2N3904" },
    ],
    media: [],
    links: [],
  },
};
