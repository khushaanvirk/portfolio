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
    "A phone IMU can tell you how fast you're accelerating and how fast you're turning. It cannot tell you where you are. Getting position out of it means integrating, and integrating noisy, biased sensor data means the error compounds — that accumulating error, drift, is the central unsolved problem in inertial navigation. This experiment was built to measure it rather than argue about it: walk a route with known ground truth using only the phone's accelerometer and gyroscope, reconstruct the path in Python, and see exactly how far off the reconstruction lands.",
    "The route was a 10 ft × 15 ft rectangle — 15.24 m perimeter, five laps, 76.2 m — walked back to the exact start mark, twice, logged at roughly 100 Hz through phyphox. Returning to the start is the whole design: true displacement is zero, so the distance from the reconstructed end point back to the origin is pure measured error with nothing to argue about. Run A drifted 5.14 m (6.7 % of the distance walked) and Run B drifted 6.00 m (7.9 %).",
  ],
  specs: [
    { label: "Sensors", value: "Phone accelerometer (with g) + gyroscope, no GPS, no map" },
    { label: "Logging", value: "phyphox export, ~100 Hz, Time / X / Y / Z per sheet" },
    { label: "Ground-truth route", value: "10 ft × 15 ft rectangle · 15.24 m perimeter · 5 laps · 76.2 m" },
    { label: "Protocol", value: "~20 s stationary block, then 5 laps back to the exact start mark · 2 runs" },
    { label: "Step detection", value: "0.7–2.1 Hz 4th-order Butterworth band-pass (filtfilt) + peak detection" },
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
        "Each sensor does exactly half the job, and neither half is useful alone. The accelerometer sees the impact of every footfall, so counting those peaks and multiplying by a step length gives distance — but it says nothing about which way you were pointed. The gyroscope measures rotation rate, so integrating it gives heading — but nothing about how far you travelled. Distance with no direction and direction with no distance are both worthless; position needs the two fused together, one heading per step.",
        "The obvious alternative — double-integrate acceleration straight into position, the textbook approach — was tried and abandoned. A constant bias integrated once grows the error linearly, which is survivable over a two-minute walk. Integrated twice it grows quadratically, and on this data that path produced over 50 % error: unusable. That is the reason real pedestrian systems count steps instead of integrating acceleration, and it is the design decision the rest of the pipeline is built around.",
      ],
    },
    {
      heading: "Step detection",
      body: [
        "The phone was not rigidly mounted, so its orientation drifts during the walk and no single axis reliably carries the footfall signal. Taking the magnitude √(x² + y² + z²) sidesteps that entirely — magnitude is rotation-invariant, so a tilted phone reads the same as a level one. Subtracting the mean removes the gravity DC term and leaves the walking oscillation centred on zero.",
        "An FFT of the walking segment put the cadence at about 1.4 Hz, so the band-pass was set to 0.7–2.1 Hz around it: low enough to reject residual gravity and postural sway, high enough to reject sensor noise and arm jitter, leaving only the stepping rhythm. It runs as a 4th-order Butterworth applied with filtfilt — forward and backward — so the filter contributes zero phase lag and the detected peaks stay where the footfalls actually happened. Peak detection with a minimum spacing of fs / 2.1 samples then places one detection per footfall.",
        "Step length is derived, not assumed. Dividing the known 76.2 m route by the detected step count gives 0.508 m/step for Run A. Assuming a textbook stride would have quietly hidden the step-detection error described below — deriving it from ground truth is what made that error visible.",
      ],
      code: {
        language: "python",
        caption: "Step detection: rotation-invariant magnitude → band-pass → peak count → derived step length",
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
            "Before: one full run of raw magnitude. The flat block is the stationary bias reference; everything after it is five laps, oscillating around 9.81 m/s² because the log includes gravity.",
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
        "Heading comes from the gyroscope's z-axis — rotation about vertical, which is yaw. A MEMS gyro reads a small non-zero rate even when it is completely still, and that bias is what eventually destroys the heading estimate: integrated over two minutes, a constant offset becomes a steadily growing angular error. The ~20 s stationary block at the start of each recording exists to measure it. Averaging gyro-Z over that window gives the bias, which is subtracted from the whole trace before anything is integrated.",
        "The corrected rate is then integrated once by the trapezoidal rule to turn rate into cumulative heading. As a sanity check, five laps of a rectangle should total 1800° of turning; Run A's integrated heading came to 1820°, about 1 % off, which confirms the integration and bias correction are behaving.",
        "Dead reckoning is then the fusion step: interpolate the heading at each detected footfall time, and advance one step length in that direction, accumulating (x, y). Because the walk ends on the exact start mark, true displacement is zero, so the magnitude of the final position vector is the drift — no reference system, no alignment, just the length of the vector that shouldn't exist.",
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
        "Run A reconstructs as five laps that visibly rotate instead of stacking on top of each other, ending 5.14 m from the true start — 6.7 % of the 76.2 m walked. That rotation is the drift made visible: each lap is laid down against a heading estimate that has decayed a little further than the last one.",
        "One run proves nothing, so the whole pipeline was repeated on a second independent recording. Run B drifted 6.00 m, 7.9 % — the same ballpark, but a visibly different path shape, because each run carries its own gyro bias and its own phone tilt. That difference is itself the finding: drift is not a fixed offset you calibrate away once.",
        "The stronger check is held-out. Step length is fitted per run, so evaluating it on the same run it was fitted to proves nothing. Taking Run B's step count and multiplying it by the step length derived from Run A gives 78.7 m against a true 76.2 m — about 3 % off. The parameter transfers between runs, so it isn't overfit to a single recording.",
      ],
      media: [
        {
          src: "/projects/pdr-path-run-a.png",
          alt: "Run A dead-reckoned path: 150 steps, 0.508 m per step, 5.14 m loop-closure drift",
          caption:
            "Run A · 150 steps · 0.508 m/step. The laps rotate rather than overlap; the dashed line from the reconstructed end back to the true start is the 5.14 m (6.7 %) loop-closure error.",
        },
        {
          src: "/projects/pdr-path-run-b.png",
          alt: "Run B dead-reckoned path: 155 steps, 0.492 m per step, 6.00 m loop-closure drift",
          caption:
            "Run B · 155 steps · 0.492 m/step · 6.00 m (7.9 %) drift. Same order of error, different path shape — each run carries its own bias and tilt.",
        },
      ],
    },
    {
      heading: "Where the error actually comes from",
      body: [
        "The derived step length landed around 0.5 m, which is short for a normal stride, and that discrepancy is the tell. Since step length is total distance divided by step count, a step length that comes out too short means the step count came out too high: the peak detector was reading spurious peaks as footfalls and over-counting. So the reconstruction carries a real distance error from step detection, not purely a heading error as the first pass concluded.",
        "Heading is still drifting too — gyro bias plus phone tilt rotate each successive lap, which is what stops the loop from closing. Both error sources are in play, and separating them cleanly is exactly the kind of thing the failure analysis was for.",
        "The fixes are algorithmic, not experimental. First, re-estimate the gyro bias during the walk instead of once at the start: bias drifts with time and temperature, and every footfall is a brief moment where the phone is near-stationary and the bias can be re-measured and updated. Second, add the magnetometer. The gyro is smooth and accurate short-term but drifts long-term; a compass is noisier moment to moment but gives an absolute heading that never drifts. Weighting each sensor where it is strongest — a complementary or Kalman filter — cancels the long-term drift. The takeaway is that you cannot fix MEMS drift by walking more carefully. You fix it in the algorithm.",
      ],
    },
  ],
  challenges: [
    "Neither recording ended with the clean stationary block the protocol called for — one trailed off partially, the other cut off mid-stride. Bias estimation was therefore anchored to the start block on both runs, and the end of the walk was marked by the last detected footfall rather than a quiet window that didn't exist.",
    "Run B contains a genuine ~15 s mid-walk pause. It shows up as an amplitude dip, and the step detector correctly finds no peaks there — worth verifying rather than filtering out, since a detector that invented steps during a pause would be silently broken everywhere else.",
    "The derived 0.5 m step length was the thread that unravelled the first conclusion. Taking a suspiciously short number seriously — instead of assuming a plausible stride and moving on — is what exposed the peak-detector over-count and corrected the error attribution from heading-only to heading plus distance.",
  ],
  resources: [],
};
