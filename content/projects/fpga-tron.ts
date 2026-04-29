import type { ProjectContent } from "./types";

export const fpgaTron: ProjectContent = {
  slug: "fpga-tron",
  title: "FPGA Tron Game",
  oneLineSummary:
    "Two-player Tron arcade game on a DE10-Lite FPGA with VGA output and a double-buffered renderer",
  dates: "Nov 2025",
  status: "Coursework",
  role: "Solo",
  tags: ["DE10-Lite", "Nios V", "RISC-V", "C", "VGA", "FPGA"],
  hero: {
    type: "video",
    src: "/projects/tron.mp4",
    poster: "/projects/tron-poster.jpg",
    alt: "FPGA Tron gameplay footage",
  },
  summary: [
    "A real-time two-player Tron lightcycle game running on a DE10-Lite FPGA. Game logic and collision detection run in C on the Nios V (RISC-V) soft core; the display is driven over a memory-mapped VGA interface.",
    "The renderer uses a custom double-buffered pipeline: frames compose off-screen and swap on the screen refresh, which keeps 60 Hz output clean. Inputs are interrupt-driven so button presses register cleanly even while the main loop is busy with collision checks.",
  ],
  specs: [
    { label: "Platform", value: "DE10-Lite FPGA" },
    { label: "Processor", value: "Nios V soft core (RISC-V)" },
    { label: "Language", value: "C" },
    { label: "Display", value: "VGA via memory-mapped control registers, 60 Hz" },
    { label: "Renderer", value: "Custom double-buffered pipeline (no screen tearing)" },
    { label: "Input", value: "Hardware-interrupt-driven for precise timing" },
  ],
  sections: [
    {
      heading: "Implementation",
      body: [
        "The game runs as a tight loop on the Nios V soft core: each tick advances both lightcycles, checks the trail map for collisions, and writes the new frame to the back buffer. Bit masking on the VGA memory-mapped control registers handles pixel writes and the buffer swap directly, without going through a separate framebuffer driver.",
        "Inputs are routed through hardware interrupts rather than polled, so a button press registers on the next tick regardless of where the main loop is sitting. With the double-buffer swap synced to the screen refresh, frames stay clean at 60 Hz.",
      ],
    },
  ],
  resources: [
    {
      label: "Gameplay video",
      href: "/projects/tron.mp4",
    },
  ],
};
