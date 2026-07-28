import type { ProjectContent } from "./types";
import { pedestrianDeadReckoning } from "./pedestrian-dead-reckoning";
import { keyboardPcb } from "./keyboard-pcb";
import { reflowOvenController } from "./reflow-oven-controller";
import { fieldFollowingRobot } from "./field-following-robot";
import { batteryTempMonitorPcb } from "./battery-temp-monitor-pcb";
import { fpgaTron } from "./fpga-tron";
import { embeddedAlarmClock } from "./embedded-alarm-clock";
import { acPhasorVoltmeter } from "./ac-phasor-voltmeter";
import { capacitanceMeters } from "./capacitance-meters";

export const projectsBySlug: Record<string, ProjectContent> = {
  [pedestrianDeadReckoning.slug]: pedestrianDeadReckoning,
  [keyboardPcb.slug]: keyboardPcb,
  [reflowOvenController.slug]: reflowOvenController,
  [fieldFollowingRobot.slug]: fieldFollowingRobot,
  [batteryTempMonitorPcb.slug]: batteryTempMonitorPcb,
  [fpgaTron.slug]: fpgaTron,
  [embeddedAlarmClock.slug]: embeddedAlarmClock,
  [acPhasorVoltmeter.slug]: acPhasorVoltmeter,
  [capacitanceMeters.slug]: capacitanceMeters,
};

// Curated display order — not strictly chronological. The featured project is
// lifted out of this list into the large card, so the first entry that isn't
// featured leads the compact grid.
export const projectOrder: string[] = [
  keyboardPcb.slug,
  pedestrianDeadReckoning.slug,
  reflowOvenController.slug,
  fieldFollowingRobot.slug,
  batteryTempMonitorPcb.slug,
  fpgaTron.slug,
  embeddedAlarmClock.slug,
  acPhasorVoltmeter.slug,
  capacitanceMeters.slug,
];

export const allProjects: ProjectContent[] = projectOrder.map(
  (slug) => projectsBySlug[slug]
);

// The large card at the top of the Projects section. Resolved from the
// `featured` flag rather than list position, so highlighting a project is a
// deliberate choice instead of a side effect of reordering. Falls back to the
// first project if nothing is flagged.
export const featuredProject: ProjectContent =
  allProjects.find((project) => project.featured) ?? allProjects[0];

// Everything else, in display order, rendered as the compact grid below it.
export const gridProjects: ProjectContent[] = allProjects.filter(
  (project) => project !== featuredProject
);

export type { ProjectContent } from "./types";
