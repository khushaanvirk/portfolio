import type { ProjectContent } from "./types";

export const keyboardPcb: ProjectContent = {
  slug: "keyboard-pcb",
  title: "65% Mechanical Keyboard PCB",
  oneLineSummary:
    "67-key hot-swap keyboard on a 4-layer board: STM32F072, hand-computed 90 Ω USB differential pair, now at JLCPCB for fab and assembly",
  dates: "Jun 2026 – Present",
  status: "In progress",
  badge: "Currently building",
  role: "Personal project",
  tags: ["Altium", "STM32", "USB-C", "4-Layer", "Impedance Control", "QMK"],
  hero: {
    type: "image",
    src: "[TODO Altium 3D render of the board, angled top view, export from the Altium machine]",
    alt: "3D render of the 67-key 65% keyboard PCB: STM32F072CBT6 MCU strip, hot-swap socket field, and USB-C connector on a 4-layer board",
  },
  summary: [
    "A wired 67-key 65% ANSI mechanical keyboard designed from scratch in Altium Designer: on-board STM32F072CBT6 with crystal-less USB, Kailh hot-swap sockets, and one 1N4148W anti-ghost diode per key. Built to be a daily driver and my first fully fabricated board.",
    "The board is a 4-layer stackup with controlled-impedance USB routing. I computed the 90 Ω differential-pair geometry by hand from the real prepreg height and dielectric constant, landing at 91.0 Ω. Sent to JLCPCB for fab and SMD assembly in July 2026; the hot-swap sockets get hand-soldered when the boards arrive.",
  ],
  specs: [
    { label: "Layout", value: "67-key 65% ANSI with arrows, Kailh hot-swap sockets" },
    { label: "MCU", value: "STM32F072CBT6, crystal-less USB via HSI48 + CRS" },
    { label: "Board", value: "4-layer JLC04161H-7628 stackup, ~1.6 mm" },
    { label: "USB", value: "90 Ω differential pair: 0.30 mm width / 0.20 mm gap = 91.0 Ω, computed by hand" },
    { label: "Matrix", value: "5 × 15 COL2ROW, one 1N4148W diode per key" },
    { label: "Power", value: "AP2112K-3.3 LDO from VBUS, USBLC6-2SC6 ESD on the data lines" },
    { label: "Flashing", value: "ST-Link over SWD primary, USB DFU via BOOT0 backup" },
    { label: "Firmware", value: "QMK with VIA, built during the fab wait" },
    { label: "Fab", value: "JLCPCB fab + assembly, ordered Jul 2026" },
  ],
  sections: [
    {
      heading: "Why this board",
      body: [
        "My earlier Battery Temperature Monitor stopped at Gerbers; this one gets manufactured, assembled, and typed on every day. A keyboard is a good first fabricated board because the stakes are real but bounded: a 67-key matrix is electrically simple, which leaves room to do the hard parts properly, USB signal integrity, a 4-layer stackup, and a design-for-manufacturing pass against a real fab.",
        "The case is a self-made clear acrylic sandwich with an FR4 plate ordered as a second board. Off-the-shelf 65% cases assume daughterboards and gasket mounts, which fight an on-board USB design. The acrylic route keeps full control of the USB cutout and shows off the PCB itself.",
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
        "Jul 8. Placed all 67 diodes, drew the board outline, and placed the MCU strip along the top edge. Locked the case decision: clear acrylic sandwich with an FR4 plate as a second board.",
        "Jul 9. Repositioned the whole key field to true ANSI centers after catching a uniform-grid placement bug, placed the stabilizers, swapped in the real USB-C footprint, and routed the 90 Ω differential pair with zero uncoupled-length violations.",
        "Jul 14. Sent to fab. Ordered the boards from JLCPCB with SMD assembly; the Kailh sockets get hand-soldered here when they arrive.",
      ],
    },
    {
      heading: "What's next",
      body: [
        "Firmware happens during the fab wait: a QMK port starting from an existing STM32F072 board config so the crystal-less clock setup comes pre-solved, with VIA for live keymap editing. Then the FR4 plate and acrylic case layers, generated from the same layout JSON.",
        "Bring-up is one decisive test. A successful flash over SWD that enumerates as a keyboard proves the differential pair, the crystal-less clock recovery, the power tree, and the boot circuit all at once. After that, the stretch goal is bare-metal USB HID firmware on the same board with CubeMX and HAL.",
      ],
    },
  ],
  challenges: [
    "Migrating the MCU block from RP2040 to STM32F072 mid-design meant rebuilding power, decoupling, USB, and boot circuitry pin by pin against the ST datasheet, including catching a mislabeled VDDIO2 pin that would have killed an I/O bank.",
    "The switch array was placed on a uniform 1u grid that ignored wide keys, so all 67 switches and 67 diodes had to be repositioned to true ANSI centers from a hand-rebuilt layout file.",
    "Altium's default rules buried 2 real DRC violations under 194 spurious ones; matching the rules to JLCPCB's published 0.1 mm solder-mask capability surfaced the actual work.",
    "JLCPCB ships its impedance calculator as a web widget only, so the 90 Ω differential-pair geometry came from the IPC-2141 approximation with the real stackup numbers, verified at 91.0 Ω.",
  ],
  resources: [],
};
