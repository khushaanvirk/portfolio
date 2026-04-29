import type { ProjectContent } from "./types";
import { reflowOvenController } from "./reflow-oven-controller";
import { fieldFollowingRobot } from "./field-following-robot";
import { batteryTempMonitorPcb } from "./battery-temp-monitor-pcb";
import { fpgaTron } from "./fpga-tron";
import { embeddedAlarmClock } from "./embedded-alarm-clock";
import { acPhasorVoltmeter } from "./ac-phasor-voltmeter";
import { capacitanceMeters } from "./capacitance-meters";

export const projectsBySlug: Record<string, ProjectContent> = {
  [reflowOvenController.slug]: reflowOvenController,
  [fieldFollowingRobot.slug]: fieldFollowingRobot,
  [batteryTempMonitorPcb.slug]: batteryTempMonitorPcb,
  [fpgaTron.slug]: fpgaTron,
  [embeddedAlarmClock.slug]: embeddedAlarmClock,
  [acPhasorVoltmeter.slug]: acPhasorVoltmeter,
  [capacitanceMeters.slug]: capacitanceMeters,
};

// Display order on the homepage project list.
export const projectOrder: string[] = [
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

export type { ProjectContent } from "./types";
