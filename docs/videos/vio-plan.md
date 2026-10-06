# Brag Plan: VIO

## What is this app?
VIO is a deep visual-inertial odometry system that fuses a FlowNet-style CNN over frames, a two-layer bi-LSTM over IMU windows and a Transformer fusion encoder into a pose regressor trained with an L1 translation and SO(3) geodesic rotation loss on synthetic Blender and OysterSim trajectories (WPI RBE/CS 549 Computer Vision, with Divam Trivedi).

## The angle
Camera plus IMU beats camera alone. Vision-only odometry drifts on long synthetic trajectories; fusing it with inertial data through a Transformer encoder cut RMSE ATE by about a third on every test trajectory (32% on Infinity, 34% on Random, 31% on Spiral). The report's own figures carry the proof: the Blender dataset render, the 3D training and testing trajectories, the odometry outputs per sensing modality, Table I with ATE and RPE, and the training metrics. Every number comes from `portfolio/content/profile.json`.

## Hook (first 2-3 seconds)
Fig. 1 from the report (dataset generation in Blender, an aerial render with the simulated drones) as a wide card at the top, slow push-in. One line at 0.4 s: "Scale drift degrades long-horizon odometry." (from the problem statement). A quieter second line: "Synthetic video and IMU streams, Blender and OysterSim."

## Key moments (the middle)
- Reveal: "VIO" with "Deep visual-inertial odometry via multimodal fusion", the three compared models landing on the beat grid (vision-only, inertial-only, fusion), beside Fig. 7 (odometry outputs on Spiral, Infinity and Random for visual-inertial, vision-only and IMU-only).
- The stack: "Camera plus IMU, fused." with four architecture rows on the beat grid (FlowNet-style CNN over frames; two-layer bi-LSTM over IMU windows; Transformer encoder fusing both into a pose regressor; SO(3) geodesic loss with L1 translation) beside Fig. 4 and Fig. 5 (training and testing trajectories in 3D); footer "1000 Hz IMU, 100 Hz RGB".
- The numbers: three count-ups, -32% Infinity, -34% Random, -31% Spiral (RMSE ATE versus the vision-only model), beside the Table I crop and Fig. 6 over the tilted report page; footer "Median RPE holding near two units".
- Deployment: TorchScript to ONNX to TensorRT, then -35% per-step latency and -20% VRAM, "RPE and ATE deltas within 3%.", beside Fig. 8 (training metrics) and Fig. 5.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/vio". Music fades under it.

## User flow worth showing
Synthetic frames and IMU windows in, fused pose estimates out, compared against vision-only and inertial-only on three held-out trajectories. Shown with Fig. 7 and Table I from the report.

## Tone
- Preset: polished
- Creative direction: quiet premium product film for a sensor-fusion model
- Interpretation: one idea per scene, long holds, soft blur crossfades on beats, numbers count up once and stay, sentence case, nothing shouts.

## Format: landscape, 1920x1080
## Duration: 24.5 s

## Visual identity (from the project website)
- Background: #121218
- Accent: #f0b35c (amber, the only accent)
- Text: #f4f2ee, secondary text #b9b5ae
- Display font: Bricolage Grotesque (Google Fonts)
- Body font: Geist (Google Fonts)
- Strongest visual element: Fig. 7 (odometry outputs per modality) and Table I from `Report.pdf`, rendered with PyMuPDF. The repo has no loose figures, so all visuals are report renders; no plots were invented.

## Share copy (draft)
Introducing VIO: camera plus IMU fused through a Transformer encoder for deep visual-inertial odometry. Fusion cut RMSE ATE by about a third versus vision only (32% on Infinity, 34% on Random, 31% on Spiral), then shipped through TensorRT for 35% lower per-step latency.

## Audio direction
- Role: warm bed with sparse professional accents
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (steady and clean, 109.96 BPM)
- Music treatment: starts at 0 s, volume 0.32, fades out from 23.2 s to 24.5 s under the end card
- Music cue guidance: bundled preset read (`assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.md`). Scene boundaries on the beat grid at 4.39, 8.74, 13.11, 17.47 and 21.84 s; 8.74, 13.11 and 17.47 are strong cues and carry the three biggest reveals (the stack, the numbers, the deployment chips). Beat-grid windows: model rows at 5.34, 6.00, 6.56; architecture rows at 9.29, 9.83, 10.37, 10.93; metrics at 13.11, 13.64, 14.20; pipeline chips at 17.47, 18.02, 18.56; end-card lines at 21.84, 22.37, 22.93.
- Audio-reactive treatment: subtle; music RMS breathes the amber glow behind the content. No waveform or equalizer visuals, no text scaling.
- SFX posture: sparse (three cues), low high-frequency risk: a soft impact when Fig. 7 lands, a soft impact when the numbers scene lands, one bong on the end card.
- Audio-coupled moments: row sequences on the beat grid, the count-ups, the end-card stack.
- Restraint rule: no SFX on individual rows, no pulsing text, music never above 0.35, nothing strobes.

## Storyboard

### Scene 1 - Hook - 4.39 s (0.00 to 4.39)
Fig. 1 (dataset generation in Blender) as a wide card at the top of the frame, slow push-in. Kicker top-left at 0.3 s: "WPI RBE/CS 549 Computer Vision". Headline bottom-left at 0.4 s: "Scale drift degrades long-horizon odometry." (settled by 1.3 s). Second line at 1.64 s: "Synthetic video and IMU streams, Blender and OysterSim." Footnote bottom-right: "Figures from the project report".
Sequential/interaction: none
Audio intent: the bed starts quietly, the render carries the moment
Audio-coupled idea: none
Music: steady bed
Transition mood: soft (blur crossfade, 0.5 s) to Scene 2

### Scene 2 - Reveal - 4.35 s (4.39 to 8.74)
Title "VIO" top-left at 4.5 s, subtitle "Deep visual-inertial odometry via multimodal fusion" at 4.9 s. Three rows on the beat grid (5.34, 6.00, 6.56): "Vision-only model", "Inertial-only model", "Fusion model". Right: Fig. 7 card (odometry outputs on Spiral, Infinity and Random) rises in at 5.3 s with its caption.
Sequential/interaction: yes, three rows one by one
Audio intent: the reveal lands with weight
Audio-coupled idea: one soft impact when Fig. 7 lands
Music: bed building
Transition mood: soft (blur crossfade) to Scene 3

### Scene 3 - The stack - 4.37 s (8.74 to 13.11)
Left column: kicker "Architecture", heading "Camera plus IMU, fused." at 8.8 s. Four rows on the beat grid (9.29, 9.83, 10.37, 10.93): FlowNet-style CNN, over frames; Two-layer bi-LSTM, over IMU windows; Transformer encoder, fuses both into a pose regressor; SO(3) geodesic loss, with L1 translation. Footer at 11.46 s: "1000 Hz IMU, 100 Hz RGB". Right: Fig. 4 (training trajectories in 3D) and Fig. 5 (testing trajectories in 3D) cards slide in at 9.0 and 9.5 s with captions.
Sequential/interaction: yes, four rows one by one, held as a set for 1.7 s after the last
Audio intent: tick along with the pulse, no extra sound
Audio-coupled idea: beat-grid reveal
Music: bed, mid energy
Transition mood: soft (blur crossfade) to Scene 4

### Scene 4 - The numbers - 4.36 s (13.11 to 17.47)
Kicker: "RMSE ATE versus the vision-only model". Three metrics count up in a column: "-32%" "Infinity trajectory" at 13.11 s, "-34%" "Random" at 13.64 s, "-31%" "Spiral" at 14.20 s. Footer at 15.29 s: "Median RPE holding near two units". Right: Table I crop (ATE, RPE and scale drift comparison) and a Fig. 6 card (training trajectories in 2D) with the rendered report page 5 tilted and dimmed behind them.
Sequential/interaction: yes, three metrics on consecutive beats, then a 2.5 s hold
Audio intent: the numbers land, the scene breathes
Audio-coupled idea: counters locked to the strong cue at 13.11; one soft impact on the scene landing
Music: bed
Transition mood: soft (blur crossfade) to Scene 5

### Scene 5 - Deployment - 4.37 s (17.47 to 21.84)
Kicker: "Deployed through TensorRT". Pipeline chips on the beat grid: "TorchScript" (17.47), "ONNX" (18.02), "TensorRT" (18.56) joined by amber arrows. Below, "-35%" "per-step latency" counts up at 19.10 s and "-20%" "VRAM" at 19.66 s. Footer at 19.10 s: "RPE and ATE deltas within 3%." Right: Fig. 8 (training metrics) and Fig. 5 cards with captions.
Sequential/interaction: yes, three chips then two metrics
Audio intent: confident close of the argument
Audio-coupled idea: chips on the beat grid, counters on beats
Music: bed
Transition mood: soft (blur crossfade) to Scene 6

### Scene 6 - End card - 2.66 s (21.84 to 24.50)
Centered: "Shreya Boyane" at 21.84 s, amber rule, "shreyaboyane.dev" at 22.37 s, "/projects/vio" at 22.93 s. Everything holds to the end; the glow settles as the music fades.
Sequential/interaction: yes, three lines on consecutive beats
Audio intent: a soft closing accent, then the bed fades
Audio-coupled idea: one bong when the name lands
Music: fades out 23.2 to 24.5 s

**Music mood for this video:** polished, steady, warm
**Audio summary:** a quiet bed under the render, rising with the reveal, ticking the rows and counters along the beat grid, then settling under the end card with one soft accent.

Scene durations: 4.39 + 4.35 + 4.37 + 4.36 + 4.37 + 2.66 = 24.5 s.
