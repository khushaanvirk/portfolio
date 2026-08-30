import type { ProjectContent } from "./types";

export const keyboardPcb: ProjectContent = {
  slug: "keyboard-pcb",
  title: "65% Mechanical Keyboard PCB",
  oneLineSummary:
    "67-key hot-swap keyboard on a 4-layer board: STM32F072, hand-computed 90 Ω USB differential pair, working on the first spin",
  dates: "Jun 2026 – Aug 2026",
  status: "Shipped",
  badge: "First spin worked",
  featured: true,
  role: "Personal project",
  tags: ["Altium", "STM32", "USB-C", "4-Layer", "Impedance Control", "USB HID"],
  hero: {
    type: "video",
    src: "/projects/keyboard-demo.mp4",
    poster: "/projects/keyboard-demo-poster.jpg",
    orientation: "portrait",
    alt: "The finished 67-key keyboard typing on MonkeyType, running a bare-metal USB HID build on the STM32F072",
  },
  summary: [
    "A wired 67-key 65% ANSI mechanical keyboard designed from scratch in Altium Designer: on-board STM32F072CBT6 with crystal-less USB, Kailh hot-swap sockets, and one 1N4148W anti-ghost diode per key. My first fully fabricated board, and the one I type on.",
    "The board is a 4-layer stackup with controlled-impedance USB routing. I computed the 90 Ω differential-pair geometry by hand from the real prepreg height and dielectric constant, landing at 91.0 Ω. It came back from JLCPCB in July, enumerated over USB on the first attempt, and passed a full 67-position matrix test with no respin.",
  ],
  specs: [
    { label: "Layout", value: "67-key 65% ANSI with arrows, Kailh hot-swap sockets" },
    { label: "MCU", value: "STM32F072CBT6, crystal-less USB via HSI48 + CRS" },
    { label: "Board", value: "4-layer JLC04161H-7628 stackup, 1.6 mm, 314.8 × 120.25 mm as manufactured" },
    { label: "USB", value: "90 Ω differential pair: 0.30 mm width / 0.20 mm gap = 91.0 Ω, computed by hand" },
    { label: "Matrix", value: "5 × 15 COL2ROW, one 1N4148W diode per key" },
    { label: "Power", value: "AP2112K-3.3 LDO from VBUS, USBLC6-2SC6 ESD on the data lines" },
    { label: "Drill", value: "481 holes across 10 tools, including six Ø2.4 mm M2 mounting holes shared with the plate" },
    { label: "Flashing", value: "ST-Link over SWD primary, USB DFU via BOOT0 backup" },
    { label: "Firmware", value: "QMK during the fab wait, then a bare-metal USB HID build with no HAL and no CubeMX" },
    { label: "Case", value: "3 mm matte black cast acrylic sandwich, FR4 plate as the top surface, M2 screws, no glue" },
    { label: "Fab", value: "JLCPCB fab + assembly, ordered 14 Jul 2026, two boards" },
  ],
  sections: [
    {
      heading: "Why this board",
      body: [
        "My earlier Battery Temperature Monitor stopped at Gerbers; this one gets manufactured, assembled, and typed on every day. A keyboard is a good first fabricated board because the stakes are real but bounded: a 67-key matrix is electrically simple, which leaves room to do the hard parts properly, USB signal integrity, a 4-layer stackup, and a design-for-manufacturing pass against a real fab.",
        "The case is a self-made matte black acrylic sandwich with an FR4 plate ordered as a second board. Off-the-shelf 65% cases assume daughterboards and gasket mounts, which fight an on-board USB design. The acrylic route keeps full control of the USB cutout and lets the plate be the top surface.",
      ],
    },
    {
      heading: "Schematic and the MCU pivot",
      body: [
        "The project started on the RP2040 and switched to the STM32F072CBT6 three sessions in. The STM32 ecosystem, CubeMX, HAL, and SWD debugging, transfers directly to embedded and automotive work, and the BOM got simpler at the same time: crystal-less USB drops the external crystal, and 128 KB of internal flash drops the QSPI chip. The tradeoff is losing UF2 drag-and-drop flashing, covered by an SWD header and a cheap ST-Link.",
        "The matrix uses a verified cell pattern, column net to switch, switch to diode anode, diode cathode to row, proven in a 2 × 2 test cell before arraying all 67 keys. The USB front end copies a proven open-source reference rather than freelancing it: USBLC6-2SC6 ESD array on the data lines, 5.1 kΩ CC pulldowns, and direct-drive D+/D- since the F072 needs no series resistors. The full schematic compiles with zero errors.",
      ],
    },
    {
      heading: "Layout and stackup",
      body: [
        "The stackup matches JLCPCB's standard 4-layer build exactly: signal, ground, power, signal, so the top-side USB pair references a solid ground plane. All 67 switches sit on a 19.05 mm grid placed by typed coordinates from a keyboard-layout-editor JSON I built by hand, since the site has no 65% preset. Each diode sits 9.525 mm below its switch center.",
        "The DRC pass was its own lesson. Altium's default rules buried the real problems under noise: matching the solder-mask sliver rule to JLCPCB's actual 0.1 mm capability cut 194 violations down to the 2 that mattered, and the ground pour was flooding off the board edge until a proper outline clearance rule existed. DRC caught one genuinely dead key, a diode 0.152 mm off its grid position.",
      ],
    },
    {
      heading: "The USB differential pair",
      body: [
        "USB full speed wants a 90 Ω differential impedance, and JLCPCB publishes its impedance calculator only as a web widget, so I derived the geometry myself. Edge-coupled microstrip over the ground plane, 0.2104 mm prepreg height, Dk of 4.1, through the IPC-2141 approximation: 0.30 mm trace width with a 0.20 mm gap lands at 91.0 Ω, about 1% off target.",
        "The pair is locked into a scoped routing rule so nothing can drift, then routed connector to ESD array to MCU entirely on the top layer, no vias, 45 degree corners, over the solid ground pour. Final DRC reports zero uncoupled-length violations.",
      ],
    },
    {
      heading: "Build log",
      body: [
        "Jun 27. Scoped the project and locked the core decisions: wired 65% ANSI, hot-swap sockets, QMK firmware, fab and assembly at JLCPCB.",
        "Jun 30. Built the hot-swap switch footprint and symbol from the ground up, placed the 1N4148W diode, and validated a 2 × 2 COL2ROW test matrix before arraying anything.",
        "Jul 1. Dropped the RP2040 for the STM32F072CBT6 and rebuilt the full MCU minimum system pin by pin against the datasheet: power, decoupling, LDO, USB-C, BOOT0, NRST, SWD. Zero compile errors.",
        "Jul 3. Arrayed and validated the full 67-key matrix, added the ESD array, and pushed the schematic into the PCB editor.",
        "Jul 6. Matched the stackup to JLCPCB's standard 4-layer, set design rules, and placed all 67 switches on the 19.05 mm grid with typed coordinates.",
        "Jul 8. Placed all 67 diodes, drew the board outline, and placed the MCU strip along the top edge. Locked the case decision: an acrylic sandwich with an FR4 plate as a second board.",
        "Jul 9. Repositioned the whole key field to true ANSI centers after catching a uniform-grid placement bug, placed the stabilizers, swapped in the real USB-C footprint, and routed the 90 Ω differential pair with zero uncoupled-length violations.",
        "Jul 14. Sent to fab. Ordered the boards from JLCPCB with SMD assembly; the Kailh sockets get hand-soldered here when they arrive.",
        "Jul 30. Boards arrived and the first one enumerated over USB immediately. All 67 matrix positions tested good, zero dead keys, no respin needed.",
        "Jul 31. Audited the board against its own documentation by decoding the manufactured Gerber and Excellon files. All ten drill tools decoded exactly as the project docs claimed. The as-built outline came back 314.8 × 120.25 mm, 3 mm wider on three edges than every note I had.",
        "Aug 1. Designed the acrylic case from the fab output rather than the CAD, since the fab output was the only thing that knew the real outline. Two 3 mm matte black layers, M2 screws, no glue.",
        "Aug 5. Started a second firmware target, bare metal, alongside the working QMK build: hand-written Makefile against CMSIS startup and a linker script, no HAL, no CubeMX.",
        "Aug 12. Found that the plate's stabilizer cutouts don't clear the DUROCK V3 housings. Too much material to file by hand, so the build runs without stabilizers rather than waiting on a plate respin.",
        "Aug 29. Full assembly: 67 switches, plate, keycaps, case. The bare-metal build flashed and verified over SWD, the board enumerated as a USB HID keyboard, and it typed a clean pangram.",
      ],
    },
    {
      heading: "Bring-up",
      body: [
        "Bring-up ran over SWD before a single key was pressed. Clock tree, SysTick and the USB stack were checked by reading the peripheral registers directly, because a keyboard that does nothing tells you nothing about why, and the registers do.",
        "A dead key and a wrong character feel identical from the chair and localise to opposite halves of the system. Silence means the electrical path is broken somewhere: switch, socket, joint, trace. A wrong character means the electrical path is fine and the mapping is wrong: net label, matrix definition, keymap. Splitting on that turned \"some keys don't work\" into two separate, separately-fixable faults in about a minute.",
        "The expensive mistake was trusting a silent diagnostic. `system_profiler SPUSBDataType` returns nothing at all for this device on macOS 26.5, not an error, nothing, which is indistinguishable from a failed enumeration. `ioreg -p IOUSB -w0 -l` finds it fine. An hour went into chasing a fault that did not exist. Cross-check a negative result with a second tool before believing it.",
      ],
    },
    {
      heading: "Issues and fixes",
      body: [
        "Three problems surfaced between the boards arriving and the keyboard working. All three came out of assembly rather than design, and none were the kind of fault DRC can catch.",
        "A dead T key. The switch locating-leg holes are 1.70 mm, drawn at nominal with no clearance allowance, so switches needed real force to seat and one did not seat fully. Reseating it fixed the key; the holes go to 1.75 mm on the next spin so it cannot recur.",
        "Z and X transposed. Two net labels crossed on row 3 of the schematic put the keys on each other's matrix positions, which passes every electrical check because the electrical path is fine. Typing a pangram found it in about ten seconds, the keymap fixed it, and the schematic labels get uncrossed on the next spin.",
        "Stabilizer clearance. The FR4 plate's cutouts are stem-sized rather than full Cherry PCB-mount cutouts, so with stabilizers fitted the plate rides too high for the switch pins to reach their sockets. The plate gets opened up to the standard footprint; until that is done the board runs without stabilizers.",
      ],
    },
    {
      heading: "What's next",
      body: [
        "Rev 2 is scoped rather than started: 1.75 mm locating-leg holes, stabilizer cutouts widened to the standard Cherry PCB-mount footprint, and the row 3 net labels uncrossed. All three are known edits to files that already exist, which is the cheapest kind of revision.",
        "Per-key RGB, wireless, and a rotary encoder were deliberately scoped out of this board and belong to a v2 that changes the architecture rather than fixing this one.",
      ],
    },
  ],
  challenges: [
    "Migrating the MCU block from RP2040 to STM32F072 mid-design meant rebuilding power, decoupling, USB, and boot circuitry pin by pin against the ST datasheet, including catching a mislabeled VDDIO2 pin that would have killed an I/O bank.",
    "The switch array was placed on a uniform 1u grid that ignored wide keys, so all 67 switches and 67 diodes had to be repositioned to true ANSI centers from a hand-rebuilt layout file.",
    "Altium's default rules buried 2 real DRC violations under 194 spurious ones; matching the rules to JLCPCB's published 0.1 mm solder-mask capability surfaced the actual work.",
    "JLCPCB ships its impedance calculator as a web widget only, so the 90 Ω differential-pair geometry came from the IPC-2141 approximation with the real stackup numbers, verified at 91.0 Ω.",
    "The design intent and the manufactured board had drifted: the outline was widened 3 mm on three edges before the order and no project note recorded it. The acrylic case had to be generated from the Gerber and drill files instead, since those were the only description of the board that was actually true.",
  ],
  resources: [],
};
