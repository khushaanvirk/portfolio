import type { ProjectContent } from "./types";

export const embeddedAlarmClock: ProjectContent = {
  slug: "embedded-alarm-clock",
  title: "Embedded Alarm Clock",
  oneLineSummary:
    "Real-time alarm clock on the N76E003 in 8051 assembly: interrupts, LCD, snooze",
  dates: "Nov 2025",
  status: "Coursework",
  role: "Solo, ELEC 291 Lab 2",
  tags: ["8051", "Assembly", "Timer Interrupts", "LCD", "Real-Time"],
  hero: {
    type: "video",
    src: "/projects/alarmclock.mp4",
    poster: "/projects/alarmclock-poster.jpg",
    alt: "Alarm clock running on the N76E003 dev board with the LCD showing the current time",
  },
  summary: [
    "A real-time alarm clock built on the N76E003 (8051 family) entirely in assembly. The lab brief asked for a 12-hour AM/PM clock with settable time, a settable alarm, and an audible alarm tone, driven by interrupts so the LCD update and the time-keeping never block each other.",
    "Two timer ISRs split responsibilities: Timer 0 generates the alarm tone as a square wave on the speaker pin, and Timer 2 ticks the real-time clock by incrementing a BCD seconds variable on a half-second interrupt. The main loop only handles button scanning and the LCD redraw.",
  ],
  specs: [
    { label: "Microcontroller", value: "N76E003 (8051 family)" },
    { label: "Clock source", value: "16.6 MHz internal oscillator" },
    { label: "Timer 0", value: "Square-wave audio tone for the alarm (toggled in ISR)" },
    { label: "Timer 2", value: "Half-second tick for the BCD seconds counter (ISR)" },
    { label: "Display", value: "16×2 character LCD in 4-bit mode" },
    { label: "Inputs", value: "Hour / Min / Sec / AM-PM / Mode / Snooze pushbuttons" },
    { label: "Output", value: "Mini speaker on P1.7 driven directly from the GPIO" },
  ],
  sections: [
    {
      heading: "Firmware",
      body: [
        "Two timers split the workload. Timer 2 fires every half-second and bumps a BCD seconds variable by 1; the main loop watches that variable for changes and redraws the LCD when it does. The ISR is intentionally tiny (increment, set a flag, return) so the main loop's LCD writes, which take milliseconds, never block the tick.",
        "Timer 0 generates the alarm tone. When the alarm fires, the main loop sets a flag the ISR reads on each overflow; the ISR toggles the SOUND_OUT pin (P1.7) to produce the square wave. Toggling in the ISR keeps the audio frequency stable even while the main loop is doing slow LCD work.",
        "Time setting and alarm setting share a single edit-mode UI driven by the Mode button: each press cycles through hours / minutes / AM-PM for the clock and then for the alarm. Hour / Min / Sec buttons advance whichever field is currently active, with simple debouncing on the buttons in the main loop.",
      ],
      code: {
        language: "asm",
        caption: "Pin and timer reload constants at boot",
        source: `CLK           EQU 16600000
TIMER0_RATE   EQU 4096
TIMER0_RELOAD EQU ((65536-(CLK/TIMER0_RATE)))
TIMER2_RATE   EQU 1000
TIMER2_RELOAD EQU ((65536-(CLK/TIMER2_RATE)))

BTN_1_HOUR    equ P3.0
BTN_2_MIN     equ P0.5
BTN_3_SEC     equ P1.2
BTN_4_AMPM    equ P1.6
BTN_5_MODE    equ P1.5
BTN_SNOOZE    equ P0.4
SOUND_OUT     equ P1.7`,
      },
    },
  ],
  resources: [
    {
      label: "Demo video",
      href: "/projects/alarmclock.mp4",
    },
  ],
};
