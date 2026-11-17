import type { Project } from "./types";

export const embeddedAlarmClock: Project = {
  slug: "embedded-alarm-clock",
  title: "Alarm clock",
  year: "2025",
  line: "8051 assembly, with snooze",
  skills: ["Assembly", "Microcontrollers", "Interrupts"],
  preview: {
    type: "drawing",
    src: "/projects/drawings/clock.svg",
  },
  page: {
    dates: "Nov 2025",
    blurb:
      "A 12-hour alarm clock on the N76E003, written entirely in 8051 assembly and driven by timer interrupts.",
    hero: {
      type: "video",
      src: "/projects/alarmclock.mp4",
      poster: "/projects/alarmclock-poster.jpg",
      alt: "The clock running on a breadboard with the time on its LCD",
      aspect: "16/9",
    },
    specs: [
      { label: "MCU", value: "N76E003 (8051 family)" },
      { label: "Clock", value: "16.6 MHz internal oscillator" },
      { label: "Timer 0", value: "Square-wave alarm tone" },
      { label: "Timer 2", value: "Half-second tick for the BCD clock" },
      { label: "Display", value: "16×2 LCD in 4-bit mode" },
      { label: "Inputs", value: "Hour, minute, second, AM/PM, mode and snooze buttons" },
    ],
    media: [],
    links: [],
  },
};
