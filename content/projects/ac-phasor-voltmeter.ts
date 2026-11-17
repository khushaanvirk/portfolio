import type { Project } from "./types";

export const acPhasorVoltmeter: Project = {
  slug: "ac-phasor-voltmeter",
  title: "AC phasor voltmeter",
  year: "2026",
  line: "Reads RMS, phase, power factor",
  skills: ["Embedded C", "ADC", "Signal processing"],
  preview: {
    type: "drawing",
    src: "/projects/drawings/phasor.svg",
  },
  page: {
    dates: "Feb 2026",
    blurb:
      "An instrument that reads two AC signals and shows RMS, period, phase difference, frequency and power factor in real time. Built on an EFM8 in C, with all the signal processing on the microcontroller.",
    hero: {
      type: "image",
      src: "/projects/phasor-voltmeter.jpg",
      alt: "The prototype showing R, T and P readings on its LCD",
      aspect: "3/4",
    },
    specs: [
      { label: "MCU", value: "EFM8LB12F64 at 72 MHz" },
      { label: "ADC", value: "14-bit, on-chip" },
      { label: "Period", value: "Timer 0 with a 6 MHz tick" },
      { label: "RMS", value: "Peak sample at a quarter period, divided by √2" },
      { label: "Phase", value: "Time between rising zero crossings, scaled to degrees" },
      { label: "Display", value: "Four LCD modes on a button" },
    ],
    media: [],
    links: [],
  },
};
