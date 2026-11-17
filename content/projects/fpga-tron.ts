import type { Project } from "./types";

export const fpgaTron: Project = {
  slug: "fpga-tron",
  title: "FPGA Tron",
  year: "2025",
  line: "Two-player arcade game over VGA",
  skills: ["FPGA", "C", "RISC-V"],
  preview: {
    type: "drawing",
    src: "/projects/drawings/tron.svg",
  },
  page: {
    dates: "Nov 2025",
    blurb:
      "A two-player Tron lightcycle game on a DE10-Lite FPGA. The game logic runs in C on a Nios V soft core and draws over VGA.",
    hero: {
      type: "video",
      src: "/projects/tron.mp4",
      poster: "/projects/tron-poster.jpg",
      alt: "Gameplay on a monitor",
      aspect: "3/4",
    },
    specs: [
      { label: "Platform", value: "DE10-Lite FPGA" },
      { label: "Processor", value: "Nios V soft core (RISC-V)" },
      { label: "Language", value: "C" },
      { label: "Display", value: "VGA, memory-mapped, 60 Hz" },
      { label: "Renderer", value: "Double-buffered, no tearing" },
      { label: "Input", value: "Interrupt-driven" },
    ],
    media: [],
    links: [],
  },
};
