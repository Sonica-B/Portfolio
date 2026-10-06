# Brag Plan: RoboFusion

Invocation: `/brag --tone polished --format landscape` (music on, SFX sparse, no voice).
Source of truth for copy: `portfolio/content/profile.json` → project `robofusion`, plus the cloned repo (README.md, app.py, DataCollection/scripts/utils/configs.py, file_utils.py, processed_data/labels/gesture_labels.py, MLModel/models/model.py, Angle_Denoising.ipynb).

## Inspection rubric (Step 1)

1. **What is the app?** A real-time human-robot interface that controls a robotic arm from hand gestures by fusing MediaPipe hand tracking, a TensorFlow gesture model and MPU6050 IMU angle estimates inside ROS2.
2. **Most impressive claim?** 93% gesture recognition accuracy and sub-500 ms gesture-to-command latency across the full pipeline, about 35% better task precision than the sensor-only baseline.
3. **Visual hook?** The product's own OpenCV window ("Robotic Arm Control using Hand Gestures"): a MediaPipe 21-landmark hand skeleton with the green HUD readouts (`Gripper: 0.30 rad`, `Base: ...`) and the gesture label `Open Hand (0.97)` drawn by app.py.
4. **What to show from the actual UI?** The camera window and HUD, the gesture vocabulary from gesture_labels.py and the joint mapping in app.py, the ROS2 service call in file_utils.py (`arm_angle_publisher`, `/goal_joint_space_path`, `joint1` to `joint4`, `path_time = 2.0`), the model shape in model.py (42 → 128 → 64 → softmax), the detection thresholds in configs.py, and the saved training-curve plot from Angle_Denoising.ipynb (the only image artifact in the repo).
5. **Shortest satisfying video?** About 24 seconds: hook demo, gesture vocabulary, pipeline, measured results, end card.
6. **Tone?** Preset `polished` (user-specified). Creative direction: a calm robotics lab film; the interface does the talking.
7. **Audio?** Steady clean bed (vol-12), sparse low-risk SFX on the window pop, the gesture flip, the pipeline reveal and the end card; subtle audio-reactive glow.
8. **Share caption?** See "Share copy" below.
9. **User flow worth showing?** Raise an open hand → the label reads `Open Hand (0.97)` and the gripper opens → close the fist → the label flips to `Fist (0.95)` and the gripper angle steps down 0.1 rad per update → the node sends the four joint positions to `/goal_joint_space_path`.

## What is this app?
RoboFusion turns hand gestures into robotic arm motion in real time, fusing camera-based gesture recognition with IMU angle estimates inside ROS2.

## The angle
Sensor data alone is noisy; a gesture model alone is blind to the hand's actual angles. RoboFusion fuses both, and the video shows the interface doing its job: a hand on camera, a label with a confidence, joint angles ticking, and a ROS2 service call leaving the node, with the measured numbers to back it up.

## Hook (first 2-3 seconds)
"Control a robotic arm with your hand." in display type while the product's own camera window pops in with the hand skeleton already tracked and `Open Hand (0.97)` on the frame.

## Key moments (the middle)
- The hand closes into a fist on camera: the label flips to `Fist (0.95)` and `Gripper:` steps 0.30 → 0.20 → 0.10 rad, then the ROS2 line shows the service call (`arm_angle_publisher → /goal_joint_space_path`, `joint1` to `joint4`, `path_time 2.0`).
- The gesture vocabulary: eight cards arriving on the beat, each with its joint effect from app.py (Fist closes the gripper, Open Hand opens it, Thumbs Up and Down move the elbow, Palm Flat Up and Down move the wrist, wrist x drives the base motor, wrist y drives the shoulder).
- The pipeline: MediaPipe Hands (21 landmarks from a 640x480 feed) → TensorFlow model (42 → 128 → 64 → softmax) → MPU6050 fusion (IMU angles cancel the noise) → ROS2 service (`/goal_joint_space_path`) → Gazebo arm (validated in simulation), under the headline "Sub-500 ms from gesture to command." with the real detection thresholds from configs.py.
- Measured results counting up: 93% gesture recognition accuracy, <500 ms gesture-to-command latency, 5,000+ hand gesture samples, 35% better task precision than the sensor-only baseline, next to the notebook's training-curve plot.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/robofusion", with the hand skeleton floating beside it.

## User flow worth showing
Open hand on camera → `Open Hand (0.97)` → fist → `Fist (0.95)` and the gripper angle steps down → `/goal_joint_space_path` receives the four joint positions (scene 1).

## Tone
- Preset: polished
- Creative direction: calm robotics lab film; the interface does the talking
- Interpretation: five scenes, long holds, blur crossfades, one push slide into the pipeline, measured numbers rather than adjectives, real strings only.

## Format: landscape, 1920x1080
## Duration: 24.5 seconds

## Visual identity (from the portfolio site)
- Background: #121218
- Accent: #f0b35c (single accent, amber)
- Text: #f4f2ee, secondary #b9b5ae
- Display font: Bricolage Grotesque; body font: Geist; code: JetBrains Mono (bundled)
- Recreated UI keeps the product's own HUD colors (green mode and angle lines, cyan label line, white gesture label) inside the camera window only
- Strongest visual element: the camera window with the MediaPipe hand skeleton and HUD; the real training-curve plot from Angle_Denoising.ipynb
- No em dashes on screen; sentence case throughout

## Share copy (draft)
Introducing RoboFusion: a robotic arm you control with hand gestures. MediaPipe hand tracking, a TensorFlow gesture model and an MPU6050 IMU fused inside ROS2, at 93% gesture accuracy and sub-500 ms gesture-to-command latency.

## Audio direction
- Role: steady professional bed with sparse motion-matched accents
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`
- Music treatment: fade in over 0.8 s to 0.36, hold, fade out from 23.0 s to silence at 24.4 s
- Music cue guidance: preset `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.md` (109.96 BPM). Beat grid for sequential reveals: 6.56, 7.09, 7.64, 8.19, 8.74, 9.29, 9.83, 10.37 (gesture cards) and 13.64, 14.20, 14.73, 15.29, 15.84 (pipeline stages). Strong-cue locks: 13.11 (pipeline headline), 17.47 (cut to results), 22.37 (site line, bong).
- Audio-reactive treatment: subtle; one amber radial glow breathes with smoothed bass (opacity 0.12 to 0.32). No waveforms or bars.
- SFX posture: sparse, low high-frequency risk: drop on the window pop, click on the gesture flip, soft impact on the pipeline headline, bong on the end card.
- Audio-coupled moments: beat-grid card and stage reveals; count-ups on the results.
- Restraint rule: no sound per card, music never above 0.36, nothing bright or repeated.

## Storyboard

### Scene 1, Your hand is the controller, 6.0 s (0.00 to 6.00)
"Control a robotic arm with your hand." lands at 0.25 s on the left. The secondary line rises at 0.9 s: "MediaPipe hand tracking, a TensorFlow gesture model and an MPU6050 IMU, fused inside ROS2." At 1.09 s the product's camera window ("Robotic Arm Control using Hand Gestures") pops in on the right with the HUD (`Mode: Normal Operation`, `Label: None`, six angle readouts) and the 21-landmark hand skeleton, label `Open Hand (0.97)`. At 3.27 s the fingers curl into a fist, the label flips to `Fist (0.95)`, and `Gripper:` steps 0.30 → 0.20 → 0.10 rad on the next updates. At 4.39 s a mono line appears under the headline: `arm_angle_publisher → /goal_joint_space_path   joint1 to joint4   path_time 2.0`.
Sequential/interaction: yes, a simulated gesture change (open hand to fist) with the HUD reacting.
Audio intent: soft drop as the window arrives, a click on the gesture flip.
Audio-coupled idea: the gesture flip on the 3.27 beat.
Music: bed fades in, steady.
Transition mood: soft (blur crossfade) → Scene 2

### Scene 2, Gesture vocabulary, 6.0 s (6.00 to 12.02)
Eyebrow "Gesture vocabulary, from app.py", headline "Gestures in. Joint angles out." Eight cards arrive on consecutive beats (6.56 to 10.37): Fist (gripper closes), Open Hand (gripper opens), Thumbs Up (elbow -0.1 rad), Thumbs Down (elbow +0.1 rad), Palm Flat Up (wrist +0.1 rad), Palm Flat Down (wrist -0.1 rad), Wrist x (base motor, -1.57 to 1.57 rad), Wrist y (shoulder up or down). The full set holds from 10.7 s to 12.02 s.
Sequential/interaction: yes, beat-grid card reveal, then a hold of the full set.
Audio intent: the beat carries the cards; no SFX.
Music: steady.
Transition mood: clean slide (push) → Scene 3

### Scene 3, The pipeline, 5.45 s (12.02 to 17.47)
Eyebrow "The pipeline". Headline on the 13.11 strong cue: "Sub-500 ms from gesture to command." Five stages arrive on the beat grid (13.64 to 15.84): MediaPipe Hands, TensorFlow model, MPU6050 fusion, ROS2 service, Gazebo arm, with connectors drawing between them. At 16.38 s a mono line shows the real thresholds: `HAND_DETECTION_CONFIDENCE = 0.6   HAND_TRACKING_CONFIDENCE = 0.7   MAX_HANDS = 1   ANGLE_UPDATE_INTERVAL = 1`.
Sequential/interaction: yes, stage-by-stage reveal.
Audio intent: one soft impact as the headline lands.
Music: steady.
Transition mood: soft (blur crossfade) on the 17.47 strong cue → Scene 4

### Scene 4, Measured, 3.8 s (17.47 to 21.28)
Eyebrow "Measured on the custom dataset". Four stats count up from 17.7 s and land by 18.6 s: 93% gesture recognition accuracy, <500 ms gesture-to-command latency, 5,000+ hand gesture samples, 35% better task precision than the sensor-only baseline. On the right, the notebook card: the real training-curve plot from Angle_Denoising.ipynb with the caption "Angle_Denoising.ipynb, autoencoder training curves".
Sequential/interaction: yes, counters.
Audio intent: nothing new; the bed carries.
Music: steady.
Transition mood: slow crossfade → Scene 5

### Scene 5, End card, 3.2 s (21.28 to 24.50)
Amber rule, "Shreya Boyane" (21.84), "shreyaboyane.dev" (22.37, bong), "/projects/robofusion" (22.93); the hand skeleton floats at the right. Music fades out by 24.4.
Sequential/interaction: three lines on consecutive beats.
Audio intent: one warm bong, then the bed fades out.
Music: fade out.

**Music mood for this video:** steady and clean (polished).
**Audio summary:** a quiet bed under a soft drop and one click in the demo, a soft impact on the pipeline headline, one bong on the end card, then silence.

## Reading-time check
Headline (6 words, 1.8 s) 5.3 s; secondary line (14 words, 4.2 s) 4.7 s; gesture labels at least 1.1 s each before the flip; ROS2 line 1.3 s (code, not must-read); card labels (2 to 4 words) hold 1.3 s or more after the last card; pipeline headline (6 words, 1.8 s) 3.9 s; stage labels 1.2 s or more; stats labels 2.7 s; end-card lines 1.4 s or more.
