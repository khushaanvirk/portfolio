import type { Project } from "./types";

export const batteryTempMonitorPcb: Project = {
  slug: "battery-temp-monitor-pcb",
  title: "Battery temperature monitor",
  year: "2025",
  line: "Over-temperature alert",
  skills: ["PCB design", "KiCad", "Analog circuits"],
  preview: {
    type: "image",
    src: "/projects/pcb.jpg",
  },
  page: {
    dates: "Dec 2025",
    blurb:
      "A small battery-powered analog over-temperature alert circuit, built to get familiar with PCB design software. Designed entirely in KiCad.",
    hero: {
      type: "image",
      src: "/projects/pcb.jpg",
      alt: "3D render of the board: coin-cell holder, thermistor, comparator and LED",
      aspect: "4/3",
    },
    specs: [
      { label: "Power", value: "CR2032 coin cell, 3 V" },
      { label: "Sensor", value: "NTC5D-9 thermistor in a 10 kΩ divider" },
      { label: "Comparator", value: "LM393, open-collector output" },
      { label: "Indicator", value: "0805 LED through 330 Ω" },
      { label: "Board", value: "2 layers, ground pour, routed by hand" },
      { label: "Tools", value: "KiCad" },
    ],
    media: [
      {
        src: "/projects/pcb-schematic.png",
        alt: "Schematic of the thermistor divider, reference divider and comparator",
        caption: "Schematic",
      },
      {
        src: "/projects/pcb-layout.png",
        alt: "Two-layer board layout",
        caption: "Board layout",
      },
    ],
    links: [],
  },
};
