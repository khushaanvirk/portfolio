import type { ProjectContent } from "./types";

export const pedestrianDeadReckoning: ProjectContent = {
  slug: "pedestrian-dead-reckoning",
  title: "Pedestrian Dead Reckoning (Phone IMU)",
  oneLineSummary:
    "Reconstructing a walked path from accelerometer and gyroscope data alone, and measuring how far inertial drift pushes it off",
  dates: "Jul 2026",
  status: "Shipped",
  role: "Solo · MEMS sensor challenge",
  tags: ["Python", "NumPy", "SciPy", "pandas", "Matplotlib", "Signal processing"],
  hero: {
    type: "image",
    src: "/projects/pdr-hero.png",
    alt: "Dead-reckoned path for Run A: five laps that rotate instead of overlapping, ending 5.14 m from the true start",
  },
  summary: [
    "A phone IMU can tell you how fast you are accelerating and how fast you are turning, but not where you are. Getting position out of it means integrating, and integrating noisy, biased sensor data compounds the error. That accumulating error is drift, the central unsolved problem in inertial navigation. I built this to measure it: walk a route with known ground truth using only the accelerometer and gyroscope, reconstruct the path in Python, and see how far off it lands.",
    "The route was a 10 ft × 15 ft rectangle, 15.24 m per lap, five laps, 76.2 m total, walked back to the exact start mark twice and logged at roughly 100 Hz through phyphox. Ending on the start mark is what makes the measurement clean: true displacement is zero, so the distance from the reconstructed end point back to the origin is the accumulated error and nothing else. Run A drifted 5.14 m (6.7 % of the distance walked). Run B drifted 6.00 m (7.9 %).",
  ],
  specs: [
    { label: "Sensors", value: "Phone accelerometer (with g) + gyroscope, no GPS, no map" },
    { label: "Logging", value: "phyphox export, ~100 Hz, Time / X / Y / Z per sheet" },
    { label: "Ground-truth route", value: "10 ft × 15 ft rectangle · 15.24 m perimeter · 5 laps · 76.2 m" },
    { label: "Protocol", value: "~20 s stationary block, then 5 laps back to the exact start mark · 2 runs" },
    { label: "Step detection", value: "0.7 to 2.1 Hz 4th-order Butterworth band-pass (filtfilt) + peak detection" },
    { label: "Cadence", value: "~1.4 Hz, measured by FFT of the walking segment" },
    { label: "Heading", value: "Gyro-Z bias from the stationary block, subtracted, then trapezoidal integration" },
    { label: "Run A result", value: "150 steps · 0.508 m/step · heading 1820° vs 1800° theory · drift 5.14 m (6.7 %)" },
    { label: "Run B result", value: "155 steps · 0.492 m/step · drift 6.00 m (7.9 %)" },
    { label: "Held-out check", value: "Run B steps × Run A step length = 78.7 m vs true 76.2 m (~3 % off)" },
  ],
  sections: [
    {
      heading: "Why it takes both sensors",
      body: [
        "Each sensor does half the job. The accelerometer sees the impact of every footfall, so counting those peaks and multiplying by a step length gives distance, but it says nothing about which way you were pointed. The gyroscope measures rotation rate, so integrating it gives heading, but nothing about how far you travelled. Position needs both fused together, one heading per step.",
        "I tried the textbook approach first, double-integrating acceleration straight into position, and abandoned it. A constant bias integrated once grows the error linearly, which is survivable over a two-minute walk. Integrated twice it grows quadratically, and on this data it produced over 50 % error. That is why real pedestrian systems count steps, and the rest of the pipeline is built around that decision.",
      ],
    },
    {
      heading: "Step detection",
      body: [
        "The phone was not rigidly mounted, so its orientation drifts during the walk and no single axis reliably carries the footfall signal. Taking the magnitude √(x² + y² + z²) avoids that, because magnitude is rotation-invariant and a tilted phone reads the same as a level one. Subtracting the mean removes the gravity DC term and leaves the walking oscillation centred on zero.",
        "An FFT of the walking segment put the cadence at about 1.4 Hz, so the band-pass runs 0.7 to 2.1 Hz around it. That is low enough to reject residual gravity and postural sway, and high enough to reject sensor noise and arm jitter. It is a 4th-order Butterworth applied with filtfilt, forward and backward, so the filter adds zero phase lag and the detected peaks stay where the footfalls happened. Peak detection with a minimum spacing of fs / 2.1 samples then places one detection per footfall.",
        "I derived step length from the route instead of assuming one, dividing the known 76.2 m by the detected step count to get 0.508 m/step for Run A. Assuming a textbook stride would have hidden the step-detection error described below.",
      ],
      code: {
        language: "python",
        caption: "Step detection: rotation-invariant magnitude, band-pass, peak count, derived step length",
        source: `magnitude = np.sqrt(ax**2 + ay**2 + az**2)   # rotation-invariant: phone tilt doesn't matter
centered  = magnitude - magnitude.mean()    # drop the ~9.81 gravity DC term

# 0.7-2.1 Hz around the 1.4 Hz cadence found by FFT.
# filtfilt runs the filter forwards and backwards -> zero phase lag,
# so the peaks stay aligned with the real footfalls.
b, a = butter(N=4, Wn=[0.7, 2.1], btype="bandpass", fs=fs)
filtered = filtfilt(b, a, centered)

peaks, _ = find_peaks(filtered, height=0, distance=int(fs / 2.1))

step_length = 76.2 / len(peaks)   # derived from ground truth, not assumed`,
      },
      media: [
        {
          src: "/projects/pdr-raw-magnitude.png",
          alt: "Raw accelerometer magnitude over a full run: a flat stationary block followed by five laps of walking",
          caption:
            "Before: one full run of raw magnitude. The flat block is the stationary bias reference. Everything after it is five laps, oscillating around 9.81 m/s² because the log includes gravity.",
        },
        {
          src: "/projects/pdr-step-detection.png",
          alt: "Band-passed acceleration magnitude with one detected peak marked per footfall",
          caption:
            "After: ten seconds of the same signal, band-passed. Once the walking band is isolated the gait is a clean oscillation and peak detection lands one dot per footfall.",
        },
      ],
    },
    {
      heading: "Heading and dead reckoning",
      body: [
        "Heading comes from the gyroscope's z-axis, rotation about vertical, which is yaw. A MEMS gyro reads a small non-zero rate even when it is completely still, and that bias is what eventually destroys the heading estimate: integrated over two minutes, a constant offset becomes a steadily growing angular error. The ~20 s stationary block at the start of each recording exists to measure it. Averaging gyro-Z over that window gives the bias, which is subtracted from the whole trace before anything is integrated.",
        "The corrected rate is then integrated once by the trapezoidal rule to turn rate into cumulative heading. As a sanity check, five laps of a rectangle should total 1800° of turning, and Run A's integrated heading came to 1820°, about 1 % off, which confirms the integration and bias correction are behaving.",
        "Dead reckoning is the fusion step: interpolate the heading at each detected footfall time, then advance one step length in that direction, accumulating (x, y). Because the walk ends on the exact start mark, true displacement is zero, so the magnitude of the final position vector is the drift. No reference system or alignment step is needed to measure it.",
      ],
      code: {
        language: "python",
        caption: "Bias-corrected heading integration, per-step dead reckoning, and loop-closure drift",
        source: `# Bias from the stationary block, subtracted before any integration.
gyro_bias = gyro_df["Z (rad/s)"][gyro_df["Time (s)"] < 20].mean()
gz = gyro_df["Z (rad/s)"] - gyro_bias

# Integrate the corrected rate ONCE (trapezoidal) -> heading over time.
# Once, not twice: a constant bias grows the error linearly, not quadratically.
heading = np.concatenate([[0], np.cumsum(
    0.5 * (gz.values[1:] + gz.values[:-1]) * np.diff(gyro_df["Time (s)"].values)
)])

# Fusion: at each footfall, advance one step length along the current heading.
heading_at_step = np.interp(step_times, gyro_df["Time (s)"], heading)

x, y = [0.0], [0.0]
for h in heading_at_step:
    x.append(x[-1] + step_length * np.cos(h))
    y.append(y[-1] + step_length * np.sin(h))

# True displacement is zero, so the end point IS the accumulated error.
drift = np.hypot(x[-1], y[-1])`,
      },
    },
    {
      heading: "Results and validation",
      body: [
        "Run A reconstructs as five laps that rotate instead of stacking on top of each other, ending 5.14 m from the true start, or 6.7 % of the 76.2 m walked. Each lap is laid down against a heading estimate that has decayed a little further than the last one, which is what produces the rotation.",
        "One run proves nothing, so I repeated the whole pipeline on a second independent recording. Run B drifted 6.00 m, 7.9 %, in the same range but with a visibly different path shape, because each run carries its own gyro bias and its own phone tilt. Drift is not a fixed offset you calibrate away once.",
        "The stronger check is held out. Step length is fitted per run, so evaluating it on the run it was fitted to proves nothing. Taking Run B's step count and multiplying by the step length derived from Run A gives 78.7 m against a true 76.2 m, about 3 % off, so the parameter transfers between runs and is not overfit to one recording.",
      ],
      media: [
        {
          src: "/projects/pdr-path-run-a.png",
          alt: "Run A dead-reckoned path: 150 steps, 0.508 m per step, 5.14 m loop-closure drift",
          caption:
            "Run A · 150 steps · 0.508 m/step. The laps rotate instead of overlapping. The dashed line from the reconstructed end back to the true start is the 5.14 m (6.7 %) loop-closure error.",
        },
        {
          src: "/projects/pdr-path-run-b.png",
          alt: "Run B dead-reckoned path: 155 steps, 0.492 m per step, 6.00 m loop-closure drift",
          caption:
            "Run B · 155 steps · 0.492 m/step · 6.00 m (7.9 %) drift. Same order of error, different path shape, since each run carries its own bias and tilt.",
        },
      ],
    },
    {
      heading: "Where the error actually comes from",
      body: [
        "The derived step length landed around 0.5 m, which is short for a normal stride. Since step length is total distance divided by step count, a step length that comes out too short means the step count came out too high, so the peak detector was reading spurious peaks as footfalls and over-counting. The reconstruction therefore carries a real distance error from step detection, not purely a heading error as my first pass concluded.",
        "Heading is drifting as well. Gyro bias plus phone tilt rotate each successive lap, which is what stops the loop from closing. Both error sources are in play, and separating them was the point of the failure analysis.",
        "The fixes are algorithmic. First, re-estimate the gyro bias during the walk instead of once at the start, since bias moves with time and temperature and every footfall is a brief moment where the phone is near-stationary and the bias can be re-measured. Second, add the magnetometer. The gyro is smooth and accurate short-term but drifts long-term, while a compass is noisier moment to moment but gives an absolute heading that never drifts. A complementary or Kalman filter weights each sensor where it is strongest and cancels the long-term drift. Walking more carefully does not help; the drift has to be handled in the algorithm.",
      ],
    },
  ],
  challenges: [
    "Neither recording ended with the clean stationary block the protocol called for. One trailed off partially and the other cut off mid-stride, so bias estimation was anchored to the start block on both runs and the end of the walk was marked by the last detected footfall instead of a quiet window that did not exist.",
    "Run B contains a genuine ~15 s mid-walk pause. It shows up as an amplitude dip and the step detector correctly finds no peaks there, which was worth verifying, since a detector that invented steps during a pause would be silently broken everywhere else.",
    "The derived 0.5 m step length is what unravelled my first conclusion. Taking a suspiciously short number seriously, instead of assuming a plausible stride and moving on, exposed the peak-detector over-count and corrected the error attribution from heading-only to heading plus distance.",
  ],
  resources: [
    {
      label: "Source, raw data, and notebook (GitHub)",
      href: "https://github.com/khushaanvirk/pedestrian-dead-reckoning",
    },
  ],
};
