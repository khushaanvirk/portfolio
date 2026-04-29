import type { ProjectContent } from "./types";

export const reflowOvenController: ProjectContent = {
  slug: "reflow-oven-controller",
  title: "Reflow Oven Controller",
  oneLineSummary:
    "Closed-loop SMD reflow controller in 8051 Assembly with ±3 °C accuracy",
  dates: "Feb 2026",
  status: "Shipped",
  role: "Team of 6, ELEC 291 Project 1",
  tags: ["CV-8052", "Assembly", "Op-Amp", "ADC", "SSR", "Python"],
  hero: {
    type: "image",
    src: "/projects/reflow.jpg",
    alt: "Toaster oven mid-cycle with the heating elements glowing through the door",
  },
  summary: [
    "An SMD reflow oven controller built on a CV-8052 microcontroller and a retrofitted toaster oven. The firmware is written entirely in 8051 assembly and runs a 6-state FSM (idle → preheat → soak → ramp → reflow → cool) that drives a solid-state relay to follow a user-configured solder profile.",
    "Temperature is measured with a K-type thermocouple front-end built around an OP07 op-amp and an LM335 cold-junction reference, sampled by the DE10-Lite's on-chip ADC. The system held ±3 °C accuracy across 25–240 °C and reflowed test boards during the project demonstration. A Python dashboard pulls UART telemetry at 115200 baud, draws a live strip-chart against the predicted profile, and exports an Excel report when the cycle completes.",
  ],
  specs: [
    { label: "Microcontroller", value: "CV-8052 on the DE10-Lite (8051-class soft processor)" },
    { label: "Accuracy", value: "±3 °C over 25–240 °C" },
    { label: "Control loop", value: "Hybrid: 100 % drive during ramps, low-frequency time-proportioning during soak / dwell" },
    { label: "FSM", value: "Idle → Preheat → Soak → Ramp-to-reflow → Reflow → Cooldown" },
    { label: "Sensor front-end", value: "K-type thermocouple → OP07 difference amplifier → ADC; LM335 cold-junction reference on a second ADC channel" },
    { label: "Power switching", value: "FQU13N06LS MOSFET driving an SSR; oven rated 1500 W" },
    { label: "Telemetry", value: "UART @ 115200 baud → Python live strip-chart + auto-generated .xlsx report" },
    { label: "Safety", value: "60 s thermal-rise watchdog, parameter-bound enforcement, audible error tones" },
    { label: "Build effort", value: "~220 hours across the team" },
  ],
  systemDiagram: {
    src: "/projects/reflow-block-diagram.png",
    alt: "Reflow oven controller hardware block diagram",
    caption: "Hardware block diagram: DE10-Lite drives the SSR which switches the oven; the thermocouple chain feeds back through the temperature electronics.",
  },
  sections: [
    {
      heading: "Hardware",
      body: [
        "Two ADC channels on the DE10-Lite acquire temperature-related voltages: channel 0 reads the LM335 cold-junction reference (10 mV/K, calibrated against a digital multimeter), and channel 1 reads the OP07 op-amp output that amplifies the K-type thermocouple's millivolt-level signal up into the ADC's 12-bit input range.",
        "The op-amp gain network uses precision-matched resistors and an LMC7660 charge-pump inverter to provide a controlled negative rail. We chose the OP07 specifically for its low offset voltage; observed gain still varied between physical chips, so we screened parts and kept the best-behaved one. SSR control runs through a single GPIO that drives the gate of an FQU13N06LS N-channel MOSFET, which closes the SSR's input loop and switches the oven's mains supply.",
        "User input goes through a 4×4 matrix keypad and dedicated start/stop tactile buttons; output goes to a 16×2 LCD (current state, temperatures, set parameters), a 7-segment display (large oven-temperature readout), and a piezo speaker (state-change beeps and error tones). All UI updates are scheduled by the same 1 ms timer that drives the control loop, so display refresh never blocks the FSM.",
      ],
      media: [
        {
          src: "/projects/reflow-build-running.jpg",
          alt: "Controller breadboard mid-run: 7-segment showing the current oven temperature, status LEDs lit, keypad in frame",
          caption: "Controller mid-run: 7-segment displays the live oven temperature, indicator LEDs track the active FSM state, keypad on the right for parameter entry.",
        },
        {
          src: "/projects/reflow-schematic.png",
          alt: "Complete circuit schematic: op-amp front-end, LCD, keypad, SSR driver, and speaker",
          caption: "Full schematic: thermocouple chain on the left, DE10-Lite center, SSR / speaker / UI peripherals fanning out.",
        },
      ],
    },
    {
      heading: "Firmware",
      body: [
        "The firmware is written entirely in 8051 assembly and follows a non-blocking, interrupt-driven structure. Timer 0 generates the 1 ms system tick: every 250 ticks (250 ms) it sets a quarter-second flag consumed by the main loop for ADC sampling, display refresh, and serial transmission; every 1000 ticks it advances the second / minute counters used by the FSM.",
        "The reflow process runs as a 6-state FSM. State transitions are driven by either temperature thresholds (e.g., \"current ≥ soak setpoint\") or elapsed-time counters. The SSR is gated by a `powerPercent` macro that converts a desired duty cycle (%) and a window length (s) into an on-time. During ramps the macro is bypassed and the SSR runs at 100 %; during soak and dwell it produces low-frequency PWM well-matched to the oven's thermal mass.",
        "Timer 0 is shared with the speaker: when a tone is being played, the same timer reload value is swapped to the desired note's period and toggles the SOUND_OUT pin in the ISR. This freed up Timer 2 to be dedicated to UART baud-rate generation, which the assignment required at 115200 baud.",
      ],
      code: {
        language: "asm",
        caption: "`powerPercent` macro: converts a duty-cycle % into a window on-time for the SSR",
        source: `powerPercent MAC
    mov x+0, %0
    mov x+1, #0
    mov x+2, #0
    mov x+3, #0
    Load_Y_Var16(%1)
    lcall mul32

    load_y(100)
    lcall div32

    mov %2+0, x+0
    mov %2+1, x+1
ENDMAC`,
      },
      media: [
        {
          src: "/projects/reflow-fsm.png",
          alt: "Reflow state machine: Idle/Setup → Preheat/Ramp → Soaking → Ramp to Reflow → Reflow → Cooling",
          caption: "Reflow process FSM: six states with temperature- or time-based transitions.",
        },
      ],
    },
    {
      heading: "Validation & telemetry",
      body: [
        "A Python dashboard reads UART frames at 115200 baud and renders a live temperature strip-chart against a predicted profile generated from the user-entered soak / reflow parameters. When the firmware emits a `DONE` token at the end of cooldown, the dashboard saves a snapshot PNG and exports an .xlsx report with the recorded data and an embedded comparison chart.",
        "Temperature accuracy was validated end-to-end against a calibrated digital multimeter from room temperature up to 240 °C across multiple back-to-back heating cycles. The system passed the laboratory's temperature-validation program with margin to spare.",
        "Two extension modes were also implemented: a microwave-style timed-cook mode with eight food presets, and a \"magic keyboard\" mode mapping the keypad to a two-octave musical scale, sharing the same speaker and SSR safety logic.",
      ],
      media: [
        {
          src: "/projects/reflow-temperature-curve.png",
          alt: "Live Python dashboard: actual oven temperature (blue) tracking the predicted reflow profile (red)",
          caption: "Captured run: actual oven temperature (solid blue) tracking the predicted profile (dashed red), with FSM state regions shaded behind.",
        },
      ],
    },
  ],
  challenges: [
    "Op-amp gain network was sensitive to component tolerances even with matched resistors; characterizing several physical OP07s and selecting the best-behaved one was faster than tightening the BOM.",
    "Sharing Timer 0 between the system tick and the speaker required careful ISR mode switching. Early revisions accidentally re-entered the audio path during the timer tick and lost real-time accuracy.",
    "Interrupts had to be temporarily disabled around any call into the integer math library; missing this caused intermittent ADC corruption that took several hours to track down.",
  ],
  resources: [],
};
