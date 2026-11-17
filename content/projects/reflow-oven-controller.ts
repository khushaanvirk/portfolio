import type { Project } from "./types";

export const reflowOvenController: Project = {
  slug: "reflow-oven-controller",
  title: "Reflow oven controller",
  year: "2026",
  line: "8051 assembly, holds ±3 °C",
  skills: ["Assembly", "Analog circuits", "Control systems", "Python"],
  preview: {
    type: "image",
    src: "/projects/reflow.jpg",
  },
  page: {
    dates: "Feb 2026",
    blurb:
      "An SMD reflow oven controller built on a CV-8052 and a retrofitted toaster oven, with the firmware written entirely in 8051 assembly. Team of 6.",
    hero: {
      type: "image",
      src: "/projects/reflow.jpg",
      alt: "Toaster oven mid-cycle with the heating elements glowing through the door",
      aspect: "3/2",
    },
    specs: [
      { label: "Controller", value: "CV-8052 soft processor on a DE10-Lite" },
      { label: "Accuracy", value: "±3 °C over 25 to 240 °C" },
      { label: "States", value: "Idle, preheat, soak, ramp, reflow, cooldown" },
      { label: "Sensor", value: "K-type thermocouple, OP07 amplifier, LM335 cold-junction reference" },
      { label: "Switching", value: "MOSFET driving a solid-state relay, 1500 W oven" },
      { label: "Telemetry", value: "UART at 115200 baud to a live Python strip chart" },
    ],
    media: [
      {
        src: "/projects/reflow-block-diagram.png",
        alt: "Reflow oven controller hardware block diagram",
        caption: "Hardware block diagram",
      },
      {
        src: "/projects/reflow-build-running.jpg",
        alt: "Controller mid-run with the live oven temperature on the 7-segment display",
        caption: "Controller mid-run",
      },
      {
        src: "/projects/reflow-schematic.png",
        alt: "Full schematic of the controller",
        caption: "Full schematic",
      },
      {
        src: "/projects/reflow-fsm.png",
        alt: "State machine for the reflow process",
        caption: "The six-state FSM",
      },
      {
        src: "/projects/reflow-temperature-curve.png",
        alt: "Measured oven temperature against the predicted profile",
        caption: "Captured run against the predicted profile",
      },
    ],
    links: [
      {
        label: "Team firmware on GitHub",
        href: "https://github.com/ELEC-291-2026/Project1.0",
      },
    ],
  },
};
