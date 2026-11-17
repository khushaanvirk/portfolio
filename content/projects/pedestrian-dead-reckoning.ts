import type { Project } from "./types";

export const pedestrianDeadReckoning: Project = {
  slug: "pedestrian-dead-reckoning",
  title: "Pedestrian dead reckoning",
  year: "2026",
  line: "A walked path rebuilt from phone sensors",
  preview: {
    type: "drawing",
    src: "/projects/drawings/pdr.svg",
  },
  page: {
    dates: "Jul 2026",
    blurb:
      "I walked a route with known ground truth using only a phone's accelerometer and gyroscope, reconstructed the path in Python, and measured how far off it lands.",
    hero: {
      type: "image",
      src: "/projects/pdr-hero.png",
      alt: "Dead-reckoned path for Run A, ending 5.14 m from the true start",
      aspect: "16/9",
    },
    specs: [
      { label: "Sensors", value: "Phone accelerometer and gyroscope, no GPS" },
      { label: "Route", value: "5 laps of a 10 ft × 15 ft rectangle, 76.2 m" },
      { label: "Steps", value: "0.7 to 2.1 Hz band-pass, then peak detection" },
      { label: "Heading", value: "Gyro bias from a stationary block, then integration" },
      { label: "Run A", value: "150 steps, drift 5.14 m (6.7 %)" },
      { label: "Run B", value: "155 steps, drift 6.00 m (7.9 %)" },
    ],
    media: [
      {
        src: "/projects/pdr-raw-magnitude.png",
        alt: "Raw acceleration magnitude for one full run",
        caption: "Raw acceleration magnitude for one run",
      },
      {
        src: "/projects/pdr-step-detection.png",
        alt: "Ten seconds of band-passed signal with a dot on each footfall",
        caption: "Band-passed, one dot per footfall",
      },
      {
        src: "/projects/pdr-path-run-a.png",
        alt: "Reconstructed path for Run A",
        caption: "Run A: 5.14 m loop-closure error",
      },
      {
        src: "/projects/pdr-path-run-b.png",
        alt: "Reconstructed path for Run B",
        caption: "Run B: 6.00 m drift",
      },
    ],
    links: [
      {
        label: "Source, raw data and notebook on GitHub",
        href: "https://github.com/khushaanvirk/pedestrian-dead-reckoning",
      },
    ],
  },
};
