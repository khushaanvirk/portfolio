import type { ProjectContent } from "./types";

export const keyboardPcb: ProjectContent = {
  slug: "keyboard-pcb",
  title: "65% Mechanical Keyboard PCB",
  oneLineSummary:
    "A 67-key hot-swap keyboard on a 4-layer board: STM32F072, a 90 Ω USB pair I calculated by hand, working on the first spin",
  dates: "Jun 2026 – Aug 2026",
  status: "Shipped",
  badge: "First spin worked",
  featured: true,
  role: "Personal project",
  tags: ["Altium", "STM32", "USB-C", "4-Layer", "Impedance Control", "Bare-metal C"],
  hero: {
    type: "video",
    src: "/projects/keyboard-demo.mp4",
    poster: "/projects/keyboard-demo-poster.jpg",
    orientation: "portrait",
    alt: "The finished 67-key keyboard typing on MonkeyType, running a bare-metal USB HID build on the STM32F072",
  },
  summary: [
    "A wired 67-key 65% ANSI keyboard, designed from scratch in Altium. On-board STM32F072CBT6 with crystal-less USB, Kailh hot-swap sockets, one 1N4148W diode per key. It is the first board I have had manufactured instead of stopping at Gerbers, and it is the keyboard I type on now.",
    "Four layers, with the USB pair routed as a controlled-impedance differential pair over a solid ground plane. JLCPCB only publishes its impedance calculator as a web widget, so I worked the geometry out by hand from the real prepreg height and dielectric constant and landed at 91.0 Ω against a 90 Ω target. The boards came back in July, enumerated over USB on the first attempt, and passed a full 67-position matrix test. No respin.",
  ],
  specs: [
    { label: "Layout", value: "67-key 65% ANSI with arrows, Kailh hot-swap sockets" },
    { label: "MCU", value: "STM32F072CBT6, crystal-less USB on HSI48 + CRS" },
    { label: "Board", value: "4-layer JLC04161H-7628 stackup, 1.6 mm, 314.8 × 120.25 mm as fabbed" },
    { label: "USB pair", value: "0.30 mm trace / 0.20 mm gap = 91.0 Ω differential, calculated by hand" },
    { label: "Matrix", value: "5 × 15 COL2ROW, one 1N4148W diode per key" },
    { label: "Power", value: "AP2112K-3.3 LDO off VBUS, USBLC6-2SC6 ESD on the data lines" },
    { label: "Firmware", value: "QMK first, now a bare-metal build with no HAL or CubeMX, TinyUSB for the USB device stack" },
    { label: "Flashing", value: "ST-Link over SWD, USB DFU via BOOT0 as the backup path" },
    { label: "Mounting", value: "FR4 plate as the top surface, rubber feet under the PCB" },
    { label: "Fab", value: "JLCPCB fab and assembly, ordered 14 Jul 2026, sockets hand-soldered here" },
  ],
  sections: [
    {
      heading: "Why a keyboard",
      body: [
        "My previous PCB stopped at Gerbers and never got made. A keyboard was a good candidate for one that would: a 67-key matrix is electrically trivial, which puts almost all the difficulty where I wanted it, in USB signal integrity, a 4-layer stackup, and a real fab's design rules.",
        "It started on an RP2040 and moved to the STM32F072 three sessions in. STM32 is what shows up in embedded and automotive work, and the BOM got shorter at the same time: crystal-less USB drops the external crystal, 128 KB of internal flash drops the QSPI chip. The cost is UF2 drag-and-drop flashing, covered by an SWD header and a cheap ST-Link.",
      ],
    },
    {
      heading: "Schematic and layout",
      body: [
        "The matrix is one cell pattern repeated 67 times: column net to switch, switch to diode anode, diode cathode to row. I built it as a 2 × 2 test cell and verified it before arraying anything, because one flipped diode is one dead key and a flipped convention is a dead board. The USB front end I copied from a proven open-source design: USBLC6-2SC6 ESD array on the data lines, 5.1 kΩ CC pulldowns, D+/D- driven straight off the MCU with no series resistors, which the F072 does not need.",
        "All 67 switches sit on a 19.05 mm grid from typed coordinates, each diode 9.525 mm below its switch. The surprise was Altium's stock design rules: 194 solder-mask violations against a capability JLCPCB does not have, burying everything real. Setting the rule to the fab's published 0.1 mm left 2 violations, one of them a diode 0.152 mm off its grid position. That would have been a dead key.",
      ],
      media: [
        {
          src: "/projects/keyboard-schematic.png",
          alt: "Full keyboard schematic: 67-key COL2ROW matrix, STM32F072 minimum system, USB-C front end, LDO and ESD array",
          caption: "Sheet1: the 5 × 15 matrix, the F072 minimum system, USB-C, LDO and ESD array",
        },
        {
          src: "/projects/keyboard-layout.png",
          alt: "PCB top view showing all 67 switch footprints on a 19.05 mm grid with the MCU strip along the top left edge",
          caption: "Top layer as fabbed. MCU strip top left, 314.8 × 120.25 mm",
        },
      ],
    },
    {
      heading: "The 90 Ω USB pair",
      body: [
        "USB full speed wants 90 Ω differential impedance. With no calculator to plug numbers into, I derived the geometry from the stackup: edge-coupled microstrip over the ground plane, 0.2104 mm of 7628 prepreg, Dk of 4.1, through the IPC-2141 approximation. A 0.30 mm trace with a 0.20 mm gap gives 91.0 Ω, about 1% high.",
        "The stackup is JLCPCB's standard 4-layer build, signal over ground over power over signal, so the top-side pair references a solid ground plane the whole way across. The pair sits under its own scoped routing rule so later edits cannot drift it, and runs connector to ESD array to MCU on the top layer with no vias. Final DRC reports zero uncoupled-length violations.",
      ],
      media: [
        {
          src: "/projects/keyboard-stackup.png",
          alt: "Altium stackup editor showing the four-layer JLC04161H-7628 build with 0.2104 mm prepreg at Dk 4.1",
          caption: "The stackup the impedance number came out of: 0.2104 mm prepreg, Dk 4.1",
        },
        {
          src: "/projects/keyboard-3d.png",
          alt: "Altium 3D view of the populated board showing the MCU strip, USB-C connector and SWD header at the top left",
          caption: "3D view. USB-C, ESD array, MCU and SWD header all sit in the top-left strip",
        },
      ],
    },
    {
      heading: "Firmware",
      body: [
        "The board ran QMK first, and that is what validated the hardware. QMK was known-good, so any dead key during bring-up was a solder joint rather than a bug I had written.",
        "It now runs a bare-metal target: no HAL, no CubeMX, built against CMSIS startup and a linker script, with TinyUSB providing the USB device stack. Rows are driven one at a time through BSRR so the write is atomic, and a whole row of columns comes back in a single GPIOB->IDR read. Debounce is a 5 ms global deferred timer with a deadline test that survives the 49-day uint32_t wrap. The binary uses about 21% of the 128 KB flash.",
        "The keymap got checked by reading it back out of the linked binary rather than out of the source: 67 populated cells, empty cells at exactly the eight coordinates decoded from the board itself during bring-up, per-row counts of 15/15/14/14/9.",
      ],
    },
    {
      heading: "Bring-up, and three faults",
      body: [
        "Bring-up ran over SWD before I pressed a single key, reading the clock tree, SysTick and the USB registers directly. The load-bearing check was SysTick counting 2023 ticks in two seconds, which proves the 48 MHz clock actually came up. Had HSI48 failed and left the chip on its 8 MHz oscillator, it would have read about 337.",
        "Three things were wrong once it was assembled, and none of them were the kind DRC can catch. A dead T key, which turned out to be a switch that had not seated fully. Z and X typing each other. And an hour lost to a tool that lies: `system_profiler SPUSBDataType` returns nothing at all for this device on macOS, not an error, which looks exactly like a keyboard that never enumerated. `ioreg -p IOUSB -w0 -l` found it instantly.",
        "A dead key and a wrong character feel identical while you are typing, but they sit in opposite halves of the system. Silence means the scan never saw the key, so the fault is mechanical. A wrong character means the scan saw it fine and the lookup was wrong, so the fault is in the map. Z and X also ruled out a swapped column net without any probing: column nets run the full height of the matrix, so W/E, S/D and 2/3 would have swapped too. Only row 3 was affected, which makes it two crossed net labels.",
      ],
    },
    {
      heading: "What I would change",
      body: [
        "Three edits for a second spin, all to files that already exist. The locating-leg holes are drawn at 1.70 mm, the tight end of the standard. Add drill tolerance and switch legs running slightly fat and it goes into interference, so every switch needed its plastic legs clipped off before it would seat. 1.75 mm next time. The plate's stabilizer cutouts are stem-sized instead of full Cherry PCB-mount cutouts, so with stabilizers fitted the plate rides too high for the switch pins to reach their sockets. It runs without them for now. And row 3's crossed net labels get uncrossed.",
        "Per-key RGB, wireless and a rotary encoder were left off this board deliberately. All three change the architecture rather than fix it, so they belong to a different revision.",
      ],
    },
  ],
  resources: [],
};
