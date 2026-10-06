# Brag Plan: Einstein Vision

## What is this app?
Einstein Vision converts monocular dash-cam video into scene-accurate 3D reconstructions by fusing depth, detection, segmentation, pose and optical-flow models, then renders the scene with the Blender Python API while streaming masks and poses at 30 FPS (WPI RBE/CS 549 Computer Vision, with Divam Trivedi).

## The angle
Dash-cam video in, a 3D driving scene out. The repo's own pitch video already holds the proof: raw dash-cam footage, the perception overlays (green detection boxes, magenta lanes, traffic-light labels) and the Blender renders of the same roads. The brag puts the input and the output side by side, names the model families that get fused, lands the two accuracy numbers from profile.json, then closes on the TensorRT FP16 deployment win (1.5x multi-object throughput, 35% lower p95 latency). No award claim. Every number comes from `portfolio/content/profile.json`.

## Hook (first 2-3 seconds)
Full-bleed real dash-cam footage from `ProductPitchVideo.mp4` (the suburban run at 22 to 27 s) with a slow push-in and a dark scrim. One line rises in at 0.4 s: "Dash-cam footage has no 3D context." (from the project's problem statement). A small kicker names the course.

## Key moments (the middle)
- Split frame: real detection footage (traffic lights, cars, cones, magenta lanes) on the left, the Blender 3D render of a driving scene on the right, joined by an amber arrow. Title "Einstein Vision" above.
- Five capability chips land on the beat grid (Depth, Detection, Segmentation, Pose, Optical flow) each with its model names (MiDaS and Depth Anything; Detic and YOLO3D; Mask R-CNN; OpenPifPaf and OSX; RAFT), beside the report's optical-flow and human-pose figures.
- Two numbers count up and stay: +50% 3D placement accuracy and +75% scene realism, over Fig. 10 from the report (lanes and ground signs rendered in Blender) with the report page behind it.
- TorchScript to ONNX to TensorRT FP16 chips, then 1.5x multi-object throughput and -35% p95 latency, with the real traffic-light detection frame beside them.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/einstein-vision". Music fades under it.

## User flow worth showing
Dash-cam frame in, perception overlays (detections, lanes, pose, flow), Blender scene out. Shown with real video segments and stills from the pitch video, and figure crops rendered from `Report.pdf`.

## Tone
- Preset: polished
- Creative direction: quiet premium product film for a perception stack
- Interpretation: one idea per scene, long holds, soft blur crossfades landing on beats, numbers count up once and stay, sentence case, nothing shouts.

## Format: landscape, 1920x1080
## Duration: 24.5 s

## Visual identity (from the project website)
- Background: #121218
- Accent: #f0b35c (amber, the only accent)
- Text: #f4f2ee, secondary text #b9b5ae
- Display font: Bricolage Grotesque (Google Fonts)
- Body font: Geist (Google Fonts)
- Strongest visual element: the detection-overlay footage and Blender render frames from `ProductPitchVideo.mp4`; Fig. 8, Fig. 9 and Fig. 10 from `Report.pdf`.

## Share copy (draft)
Introducing Einstein Vision: monocular dash-cam video in, a scene-accurate 3D driving scene out. Depth, detection, pose and optical flow fused, rendered in Blender, then deployed through TensorRT FP16 for 1.5x throughput.

## Audio direction
- Role: warm bed with sparse professional accents
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (steady and clean, 109.96 BPM)
- Music treatment: starts at 0 s, volume 0.32, fades out from 23.2 s to 24.5 s under the end card
- Music cue guidance: bundled preset read (`assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.md`). Scene boundaries sit on the beat grid at 4.39, 8.74, 13.11, 17.47 and 21.84 s; 8.74, 13.11 and 17.47 are strong cues and carry the three biggest reveals (title split frame payoff, the numbers, the TensorRT chips). Beat-grid windows: capability chips at 9.29, 9.83, 10.37, 10.93, 11.46; metrics at 13.11 and 14.20; TensorRT chips at 17.47, 18.02, 18.56; end-card lines at 21.84, 22.37, 22.93.
- Audio-reactive treatment: subtle; music RMS breathes the amber glow behind the content. No waveform or equalizer visuals, no text scaling.
- SFX posture: sparse (three cues), motion-matched, low high-frequency risk: a soft impact when the split frame lands, a soft impact when the numbers scene lands, one bong on the end card.
- Audio-coupled moments: chip sequence on the beat grid, the two count-ups, the end-card stack.
- Restraint rule: no SFX on individual chips, no pulsing text, music never above 0.35, nothing strobes.

## Storyboard

### Scene 1 - Hook - 4.39 s (0.00 to 4.39)
Full-bleed muted dash-cam video (pitch video 22.0 to 27.0 s) with a slow push-in from scale 1.0 to 1.06. Dark scrim rises from the bottom and left so the headline sits on near-background darkness. Kicker top-left at 0.3 s: "WPI RBE/CS 549 Computer Vision". Headline bottom-left at 0.4 s: "Dash-cam footage has no 3D context." (settled by 0.9 s, holds 3.5 s).
Sequential/interaction: none
Audio intent: the bed starts quietly, the footage carries the moment
Audio-coupled idea: none
Music: steady bed
Transition mood: soft (blur crossfade, 0.5 s) to Scene 2

### Scene 2 - Reveal - 4.35 s (4.39 to 8.74)
Title "Einstein Vision" top-left at 4.5 s, subtitle "3D scene reconstruction for autonomous driving" at 4.9 s. Two video panels slide in from either side at 5.0 and 5.2 s: left plays the real traffic-light detection footage with magenta lanes, right plays the Blender render of a driving scene; an amber arrow sits between them. Labels under the panels at 5.7 s: "Dash-cam input with detections and lanes" and "3D scene rendered in Blender".
Sequential/interaction: yes, the two panels arrive one after the other
Audio intent: the reveal lands with weight
Audio-coupled idea: one soft impact when the first panel lands
Music: bed building
Transition mood: soft (blur crossfade) to Scene 3

### Scene 3 - The stack - 4.37 s (8.74 to 13.11)
Left column: kicker "Perception stack", heading "Fused into one 3D scene." at 8.8 s. Five chips arrive on the beat grid (9.29, 9.83, 10.37, 10.93, 11.46): Depth (MiDaS, Depth Anything), Detection (Detic, YOLO3D), Segmentation (Mask R-CNN), Pose (OpenPifPaf, OSX), Optical flow (RAFT). Footer at 11.46 s: "Rendered with the Blender Python API". Right column: Fig. 8 (optical flow outputs) and Fig. 9 (human pose estimation) crops from the report slide in at 9.0 and 9.5 s with their figure captions.
Sequential/interaction: yes, five chips one by one, held as a full set for 1.6 s after the last
Audio intent: tick along with the pulse, no extra sound
Audio-coupled idea: beat-grid chip reveal
Music: bed, mid energy
Transition mood: soft (blur crossfade) to Scene 4

### Scene 4 - The numbers - 4.36 s (13.11 to 17.47)
Kicker: "Across 13 Tesla Model S dash-cam sequences". Two metrics count up on the left: "+50%" "3D placement accuracy" at 13.11 s and "+75%" "scene realism" at 14.20 s, amber display numerals, labels in Geist. Right: Fig. 10 crop (lanes and ground signs rendering in Blender) as a card with its caption, and the rendered report page 3 tilted and dimmed behind it.
Sequential/interaction: yes, two metrics one after the other (every other beat)
Audio intent: the numbers land, the scene breathes
Audio-coupled idea: counter ticks locked to the strong cue at 13.11; one soft impact on the scene landing
Music: bed
Transition mood: soft (blur crossfade) to Scene 5

### Scene 5 - TensorRT - 4.37 s (17.47 to 21.84)
Kicker: "Inference optimization". Pipeline chips on the beat grid: "TorchScript" (17.47), "ONNX" (18.02), "TensorRT FP16" (18.56) joined by amber arrows. Below, "1.5x" "multi-object throughput" counts up at 19.10 s and "-35%" "p95 latency" at 19.66 s. Footer at 19.66 s: "With layer fusion. Validated with NVIDIA Nsight." Right: the real traffic-light detection frame as a card with the caption "Masks and poses streamed at 30 FPS".
Sequential/interaction: yes, three chips then two metrics
Audio intent: confident close of the argument
Audio-coupled idea: chips on the beat grid, counters on beats
Music: bed
Transition mood: soft (blur crossfade) to Scene 6

### Scene 6 - End card - 2.66 s (21.84 to 24.50)
Centered: "Shreya Boyane" at 21.84 s, amber rule, "shreyaboyane.dev" at 22.37 s, "/projects/einstein-vision" at 22.93 s. Everything holds to the end; the glow settles as the music fades.
Sequential/interaction: yes, three lines on consecutive beats
Audio intent: a soft closing accent, then the bed fades
Audio-coupled idea: one bong when the name lands
Music: fades out 23.2 to 24.5 s

**Music mood for this video:** polished, steady, warm
**Audio summary:** a quiet bed under real footage, rising with the reveal, ticking the chips and counters along the beat grid, then settling under the end card with one soft accent.

Scene durations: 4.39 + 4.35 + 4.37 + 4.36 + 4.37 + 2.66 = 24.5 s.
