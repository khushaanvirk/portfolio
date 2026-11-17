import type { Project } from "./types";

export const fieldFollowingRobot: Project = {
  slug: "field-following-robot",
  title: "Field-following robot",
  year: "2026",
  line: "Follows a guide wire, team of 6",
  skills: ["Embedded C", "STM32", "I2C", "Motor control"],
  preview: {
    type: "image",
    src: "/projects/robot.jpg",
  },
  page: {
    dates: "Apr 2026",
    blurb:
      "An autonomous robot that tracks a current-carrying guide wire with three pickup inductors, takes pre-programmed turns at intersections, and falls back to an infrared remote. Team of 6.",
    hero: {
      type: "image",
      src: "/projects/robot.jpg",
      alt: "The robot on the figure-8 demonstration track",
      aspect: "16/9",
    },
    specs: [
      { label: "Robot MCU", value: "STM32L051" },
      { label: "Remote MCU", value: "EFM8LB12F64" },
      { label: "Sensing", value: "Three LC tanks at 16.876 kHz, LM358 op-amps" },
      { label: "Motors", value: "Discrete MOSFET H-bridge, optocoupler isolated" },
      { label: "IR link", value: "38 kHz, solid up to 2 m" },
      { label: "Collision", value: "VL53L0X time-of-flight, stops at 200 mm" },
    ],
    media: [
      {
        src: "/projects/robot-block-diagram.png",
        alt: "Hardware block diagram of the remote and the robot",
        caption: "Hardware block diagram",
      },
      {
        src: "/projects/robot-schematic.png",
        alt: "Full robot schematic",
        caption: "Full robot schematic",
      },
      {
        src: "/projects/robot-field-detector-schematic.png",
        alt: "Field detector front-end schematic",
        caption: "Field detector, one of three",
      },
      {
        src: "/projects/robot-hbridge-schematic.png",
        alt: "Motor drive H-bridge schematic",
        caption: "H-bridge, one per motor",
      },
      {
        src: "/projects/robot-remote.jpg",
        alt: "The infrared remote driving the robot",
        caption: "The IR remote",
      },
      {
        src: "/projects/robot-ir-distance-curve.png",
        alt: "Command success rate against distance",
        caption: "Command success rate against distance",
      },
    ],
    links: [
      {
        label: "Demo video on YouTube",
        href: "https://www.youtube.com/watch?v=U5jY5kz8_YE",
      },
      {
        label: "Team firmware on GitHub",
        href: "https://github.com/ELEC-291-2026/Project2.0",
      },
    ],
  },
};
