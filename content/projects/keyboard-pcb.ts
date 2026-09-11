import type { ProjectContent } from "./types";

export const keyboardPcb: ProjectContent = {
  slug: "keyboard-pcb",
  title: "65% Mechanical Keyboard PCB",
  oneLineSummary:
    "A 67-key hot-swap keyboard on a 4-layer board: STM32F072, a 90 Ω USB pair I calculated by hand, working on the first spin",
  dates: "Jun to Aug 2026",
  status: "Shipped",
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
    "A wired 67-key 65% ANSI keyboard I designed from scratch in Altium. On-board STM32F072CBT6 with crystal-less USB, Kailh hot-swap sockets, one 1N4148W diode per key. It is my first board that got manufactured instead of stopping at Gerbers, and it is the one I type on.",
    "Four layers, with the USB pair routed as a controlled-impedance differential pair over solid ground. JLCPCB only publishes its impedance calculator as a web widget, so I worked the geometry out by hand from the prepreg height and dielectric constant and got 91.0 Ω against a 90 Ω target. The boards arrived in July, enumerated on the first attempt, and passed a full 67-position matrix test with no respin.",
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
        "My previous PCB stopped at Gerbers and never got made. A keyboard was a good candidate for one that would, because a 67-key matrix is electrically simple. That leaves the difficulty in the parts I wanted to learn: USB signal integrity, a 4-layer stackup, and getting through a real fab's design rules.",
        "It started on an RP2040 and moved to the STM32F072 three sessions in. STM32 is what shows up in embedded and automotive work, and the BOM got shorter at the same time, since crystal-less USB drops the external crystal and internal flash drops the QSPI chip. The cost was UF2 drag-and-drop flashing, which an SWD header and a cheap ST-Link cover.",
      ],
    },
    {
      heading: "Schematic and layout",
      body: [
        "The matrix is one cell repeated 67 times: column net to switch, switch to diode anode, diode cathode to row. I verified it as a 2 × 2 test cell before arraying anything, because one flipped diode costs one key and a backwards convention would have cost all 67. For the USB front end I copied a proven open-source design instead of working it out myself: USBLC6-2SC6 ESD array on the data lines, 5.1 kΩ CC pulldowns, and D+/D- driven straight off the MCU, which the F072 supports without series resistors.",
        "All 67 switches sit on a 19.05 mm grid from typed coordinates, each diode 9.525 mm below its switch. Altium's stock design rules were the problem here. They flagged 194 solder-mask violations against a capability JLCPCB does not have, which buried the real ones. Setting the rule to the fab's published 0.1 mm left 2, and one of those was a diode 0.152 mm off its grid position that would have come back as a dead key.",
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
        "The stackup is JLCPCB's standard 4-layer build, signal over ground over power over signal, so the top-side pair references solid ground the whole way across. The pair has its own scoped routing rule so later edits cannot drift it, and it runs connector to ESD array to MCU on the top layer with no vias. Final DRC reports zero uncoupled-length violations.",
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
        "The board ran QMK first, and that is what validated the hardware. QMK was known-good, so any dead key during bring-up was a solder joint and not something I had written.",
        "It now runs a bare-metal target: no HAL, no CubeMX, built against CMSIS startup and a linker script, with TinyUSB providing the USB device stack. Rows are driven one at a time through BSRR so the write is atomic, and a whole row of columns comes back in one GPIOB->IDR read. Debounce is a 5 ms global deferred timer whose deadline test survives the 49-day uint32_t wrap. I checked the keymap by reading it back out of the linked binary instead of the source: 67 populated cells, empties at the eight coordinates decoded from the board during bring-up, per-row counts of 15/15/14/14/9.",
      ],
    },
    {
      heading: "Bring-up, and three faults",
      body: [
        "Bring-up ran over SWD before I pressed a key, reading the clock tree, SysTick and the USB registers directly. The check that mattered was SysTick counting 2023 ticks in two seconds, which proves the 48 MHz clock came up. If HSI48 had failed and left the chip on its 8 MHz oscillator it would have read about 337.",
        "Three things were wrong once it was assembled, none of them the kind DRC catches. A dead T key, which was a switch that had not seated fully. Z and X typing each other. And an hour lost to `system_profiler SPUSBDataType`, which returns nothing at all for this device on macOS instead of an error, so a working keyboard looked exactly like a failed enumeration. `ioreg -p IOUSB -w0 -l` found it immediately.",
        "The first two separated cleanly because silence and a wrong character sit in opposite halves of the system. Silence means the scan never saw the key, so the fault is mechanical. A wrong character means the scan saw it and the lookup was wrong, so the fault is in the map. Z and X also ruled out a swapped column net without probing, since column nets run the full height of the matrix and W/E, S/D and 2/3 would have swapped too. Only row 3 was affected, so it is two crossed net labels.",
      ],
    },
    {
      heading: "What I would change",
      body: [
        "Three edits for a second spin, all to files that already exist. The locating-leg holes are drawn at 1.70 mm, the tight end of the standard, and between drill tolerance and slightly fat switch legs they interfered, so every switch needed its plastic legs clipped before it would seat. Those go to 1.75 mm. The plate's stabilizer cutouts are stem-sized instead of full Cherry PCB-mount cutouts, so with stabilizers fitted the plate rides too high for the switch pins to reach their sockets, and the board runs without them until the plate is respun. The crossed net labels on row 3 get uncrossed.",
      ],
    },
  ],
  resources: [
    {
      label: "Gerbers, case files and firmware (GitHub)",
      href: "https://github.com/khushaanvirk/khushaan65",
    },
  ],
};
