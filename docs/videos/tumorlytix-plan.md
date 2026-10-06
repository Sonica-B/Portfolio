# Brag Plan: TumorLytix

## What is this app?
TumorLytix is an unsupervised medical-imaging pipeline that pairs CycleGAN image synthesis with diffusion-based refinement to detect and segment brain tumors across 65,072 BraTS2020 MRI images with more than 90% segmentation accuracy and no manual labels (WPI Deep Learning, with Ankit Gole, Devesh Bhangale, Farhan Seliya and Sarthak Mehta).

## The angle
No labels, still over 90%. Supervised tumor segmentation needs expensive labeled MRI data; TumorLytix learns from unpaired scans instead. The report's own figures carry the story: real MRI scans and their generated ground truth, the paired healthy-to-tumor synthesis, the full segmentation flow from test input to overlay, and the comparison table against a plain CycleGAN. Every number comes from `portfolio/content/profile.json`.

## Hook (first 2-3 seconds)
A dark frame with the report's Fig. 12 (four tumor scans above their generated masks) sitting on the canvas, slowly pushing in. One line rises at 0.4 s: "Labeled MRI datasets are expensive." (from the problem statement). A quieter second line follows: "Tumors vary widely in size, shape and position."

## Key moments (the middle)
- Reveal: "TumorLytix" with the full-width Fig. 9 strip, the segmentation flow from test input to reconstructed output, anomaly map, segmentation and overlay, then the line "No manual labels."
- The pairing: "Paired images from unpaired scans." with four dataset facts landing on the beat grid (23,180 healthy slices, 41,892 diseased slices, T1, T2, T1CE and FLAIR, 369 patients) beside Fig. 5 (paired healthy to tumor synthesis) and Fig. 4 (training data sample).
- The numbers: ">90%" segmentation accuracy and "65,072" MRI images count up and stay, beside Fig. 13 (tumor image, ground truth mask, CycleGAN segmentation, combined approach) over the tilted report page.
- Versus a plain CycleGAN: 25% fewer artifacts, 30% higher precision, 50% faster convergence, then "1.6x" images per second from TorchScript batched mixed-precision inference, beside Fig. 10 and Fig. 11.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/tumorlytix". Music fades under it.

## User flow worth showing
Test MRI slice in, reconstructed healthy version, anomaly map where reconstruction fails, diffusion-refined segmentation mask, overlay out. Shown with Fig. 9 from the report, then the comparison table in Fig. 13.

## Tone
- Preset: polished
- Creative direction: quiet premium product film for a medical-imaging pipeline
- Interpretation: one idea per scene, long holds, soft blur crossfades on beats, numbers count up once and stay, sentence case, nothing shouts.

## Format: landscape, 1920x1080
## Duration: 24.5 s

## Visual identity (from the project website)
- Background: #121218
- Accent: #f0b35c (amber, the only accent)
- Text: #f4f2ee, secondary text #b9b5ae
- Display font: Bricolage Grotesque (Google Fonts)
- Body font: Geist (Google Fonts)
- Strongest visual element: Fig. 9 (segmentation flow) and Fig. 13 (comparison table) from `Deep_Learning_Project_Report (1).pdf`, rendered with PyMuPDF.

## Share copy (draft)
Introducing TumorLytix: unsupervised brain tumor segmentation on 65,072 BraTS2020 MRI images, over 90% segmentation accuracy with no manual labels. CycleGAN synthesizes paired healthy and diseased scans, a conditionally guided diffusion model refines the boundaries.

## Audio direction
- Role: warm bed with sparse professional accents
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (steady and clean, 109.96 BPM)
- Music treatment: starts at 0 s, volume 0.32, fades out from 23.2 s to 24.5 s under the end card
- Music cue guidance: bundled preset read (`assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.md`). Scene boundaries on the beat grid at 4.39, 8.74, 13.11, 17.47 and 21.84 s; 8.74, 13.11 and 17.47 are strong cues and carry the three biggest reveals (the pairing scene, the numbers, the comparison chips). Beat-grid windows: dataset chips at 9.29, 9.83, 10.37, 10.93; metrics at 13.11 and 14.20; comparison chips at 17.47, 18.02, 18.56; end-card lines at 21.84, 22.37, 22.93.
- Audio-reactive treatment: subtle; music RMS breathes the amber glow behind the content. No waveform or equalizer visuals, no text scaling.
- SFX posture: sparse (three cues), low high-frequency risk: a soft impact when the flow strip lands, a soft impact when the numbers scene lands, one bong on the end card.
- Audio-coupled moments: chip sequences on the beat grid, the two count-ups, the end-card stack.
- Restraint rule: no SFX on individual chips, no pulsing text, music never above 0.35, nothing strobes.

## Storyboard

### Scene 1 - Hook - 4.39 s (0.00 to 4.39)
Fig. 12 (tumor scans above their generated ground-truth masks, black background) as a wide card at the top of the frame, slow push-in. Kicker top-left at 0.3 s: "WPI Deep Learning, BraTS2020". Headline bottom-left at 0.4 s: "Labeled MRI datasets are expensive." (settled by 1.3 s). Second line at 1.64 s: "Tumors vary widely in size, shape and position." Footnote bottom-right: "Figures from the project report".
Sequential/interaction: none
Audio intent: the bed starts quietly, the scans carry the moment
Audio-coupled idea: none
Music: steady bed
Transition mood: soft (blur crossfade, 0.5 s) to Scene 2

### Scene 2 - Reveal - 4.35 s (4.39 to 8.74)
Title "TumorLytix" top-left at 4.5 s, subtitle "Unsupervised brain tumor detection and segmentation" at 4.9 s. The full-width Fig. 9 strip (test input, reconstructed output, anomaly map, segmentation, overlay) rises in at 5.34 s with its figure caption. Line under it at 6.56 s: "No manual labels."
Sequential/interaction: yes, title, then the strip, then the line
Audio intent: the reveal lands with weight
Audio-coupled idea: one soft impact when the strip lands
Music: bed building
Transition mood: soft (blur crossfade) to Scene 3

### Scene 3 - The pairing - 4.37 s (8.74 to 13.11)
Left column: kicker "CycleGAN on unpaired scans", heading "Paired images from unpaired scans." at 8.8 s. Four dataset facts arrive on the beat grid (9.29, 9.83, 10.37, 10.93): 23,180 healthy slices; 41,892 diseased slices; T1, T2, T1CE, FLAIR, four modalities; 369 patients. Footer at 11.46 s: "Anomalies flagged where reconstruction fails". Right column: Fig. 5 (paired healthy to tumor synthesis) and Fig. 4 (training data sample) cards slide in at 9.0 and 9.5 s with captions.
Sequential/interaction: yes, four facts one by one, held as a set for 1.7 s after the last
Audio intent: tick along with the pulse, no extra sound
Audio-coupled idea: beat-grid reveal
Music: bed, mid energy
Transition mood: soft (blur crossfade) to Scene 4

### Scene 4 - The numbers - 4.36 s (13.11 to 17.47)
Kicker: "BraTS2020, four MRI modalities". Two metrics count up on the left: ">90%" "segmentation accuracy" at 13.11 s and "65,072" "MRI images, no manual labels" at 14.20 s. Footer at 15.29 s: "Automated labeling improved baseline precision 15%". Right: Fig. 13 card (tumor image, ground truth mask, CycleGAN segmentation, combined approach) with the rendered report page 5 tilted and dimmed behind it.
Sequential/interaction: yes, two metrics one after the other (every other beat)
Audio intent: the numbers land, the scene breathes
Audio-coupled idea: counters locked to the strong cue at 13.11; one soft impact on the scene landing
Music: bed
Transition mood: soft (blur crossfade) to Scene 5

### Scene 5 - Versus a plain CycleGAN - 4.37 s (17.47 to 21.84)
Kicker: "Versus a plain CycleGAN". Three facts on the beat grid (17.47, 18.02, 18.56): "25% fewer artifacts", "30% higher precision", "50% faster convergence". Then "1.6x" "images per second" counts up at 19.10 s. Footer at 19.10 s: "Packaged with TorchScript, profiled with Nsight Compute." Right: Fig. 10 (segmentation on CycleGAN alone) and Fig. 11 (segmentation on the combined approach) cards with captions.
Sequential/interaction: yes, three facts then one metric
Audio intent: confident close of the argument
Audio-coupled idea: chips on the beat grid, counter on a beat
Music: bed
Transition mood: soft (blur crossfade) to Scene 6

### Scene 6 - End card - 2.66 s (21.84 to 24.50)
Centered: "Shreya Boyane" at 21.84 s, amber rule, "shreyaboyane.dev" at 22.37 s, "/projects/tumorlytix" at 22.93 s. Everything holds to the end; the glow settles as the music fades.
Sequential/interaction: yes, three lines on consecutive beats
Audio intent: a soft closing accent, then the bed fades
Audio-coupled idea: one bong when the name lands
Music: fades out 23.2 to 24.5 s

**Music mood for this video:** polished, steady, warm
**Audio summary:** a quiet bed under the scans, rising with the reveal, ticking the facts and counters along the beat grid, then settling under the end card with one soft accent.

Scene durations: 4.39 + 4.35 + 4.37 + 4.36 + 4.37 + 2.66 = 24.5 s.
