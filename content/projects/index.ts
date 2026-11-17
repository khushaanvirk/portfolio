import type { Project } from "./types";
import { keyboardPcb } from "./keyboard-pcb";
import { uqueue } from "./uqueue";
import { pedestrianDeadReckoning } from "./pedestrian-dead-reckoning";
import { reflowOvenController } from "./reflow-oven-controller";
import { fieldFollowingRobot } from "./field-following-robot";
import { acPhasorVoltmeter } from "./ac-phasor-voltmeter";
import { batteryTempMonitorPcb } from "./battery-temp-monitor-pcb";
import { fpgaTron } from "./fpga-tron";
import { embeddedAlarmClock } from "./embedded-alarm-clock";
import { capacitanceMeters } from "./capacitance-meters";

// Curated display order for the homepage list, not strictly chronological.
// The first project's preview is the one showing before anything is hovered.
export const projects: Project[] = [
  keyboardPcb,
  uqueue,
  pedestrianDeadReckoning,
  reflowOvenController,
  fieldFollowingRobot,
  acPhasorVoltmeter,
  batteryTempMonitorPcb,
  fpgaTron,
  embeddedAlarmClock,
  capacitanceMeters,
];

// Projects with a page of their own at /projects/<slug>. A project that only
// links out (externalUrl) is in the homepage list but not here.
export const pageProjects = projects.filter((project) => project.page);

export const projectsBySlug: Record<string, Project> = Object.fromEntries(
  projects.map((project) => [project.slug, project])
);

export type { Project } from "./types";
