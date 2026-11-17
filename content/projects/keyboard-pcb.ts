import type { Project } from "./types";

export const keyboardPcb: Project = {
  slug: "keyboard-pcb",
  title: "65% keyboard PCB",
  year: "2026",
  line: "67-key board I designed and built",
  skills: ["PCB design", "Altium", "Embedded C"],
  preview: {
    type: "video",
    src: "/projects/keyboard-demo.mp4",
    poster: "/projects/keyboard-demo-poster.jpg",
    position: "object-[50%_82%]",
  },
  page: {
    dates: "Jun to Aug 2026",
    blurb:
      "A 67-key keyboard I designed from scratch in Altium. It is my first board that got manufactured, and it is the one I type on.",
    hero: {
      type: "video",
      src: "/projects/keyboard-demo.mp4",
      poster: "/projects/keyboard-demo-poster.jpg",
      alt: "The finished keyboard being typed on",
      aspect: "9/16",
    },
    specs: [
      { label: "MCU", value: "STM32F072, crystal-less USB" },
      { label: "Board", value: "4 layers, 1.6 mm, 314.8 × 120.25 mm" },
      { label: "USB pair", value: "91.0 Ω against a 90 Ω target, worked out by hand" },
      { label: "Matrix", value: "5 × 15, one diode per key" },
      { label: "Firmware", value: "Bare-metal C, TinyUSB" },
      { label: "Result", value: "Worked on the first spin, 67 of 67 keys" },
    ],
    media: [
      {
        src: "/projects/keyboard-schematic.png",
        alt: "Full keyboard schematic",
        caption: "Schematic",
      },
      {
        src: "/projects/keyboard-layout.png",
        alt: "Top layer of the board",
        caption: "Top layer as fabbed",
      },
      {
        src: "/projects/keyboard-stackup.png",
        alt: "Four-layer stackup",
        caption: "Stackup: 0.2104 mm prepreg, Dk 4.1",
      },
      {
        src: "/projects/keyboard-3d.png",
        alt: "3D view of the board",
        caption: "3D view",
      },
    ],
    links: [
      {
        label: "Gerbers and firmware on GitHub",
        href: "https://github.com/khushaanvirk/khushaan65",
      },
    ],
  },
};
