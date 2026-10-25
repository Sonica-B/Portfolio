# Brag Plan: Buildings Built in Minutes

## What is this app?
Buildings Built in Minutes turns uncalibrated photographs into a metrically reliable 3D asset with a full structure-from-motion pipeline, then implements NeRF end to end to render photorealistic 360-degree orbits of the Lego, Hotdog and Ship scenes (WPI RBE/CS 549 Computer Vision, with Divam Trivedi).

## The angle
Classical geometry first, neural rendering second. Phase 1 is structure from motion in Python and OpenCV (SIFT, eight-point fundamental and essential matrices with RANSAC, PnP, triangulation, bundle adjustment) that pulls the average reprojection error from 1.75 to 1.01 pixels across five views. Phase 2 is NeRF with positional encoding and hierarchical sampling, about 60% higher PSNR than the baseline with roughly 40% fewer artifacts. The repo's own NeRF orbit GIFs (Lego, Hotdog, Ship) are the proof, with the report's iteration strips, positional-encoding comparison and PSNR/SSIM table. Every number comes from `portfolio/content/profile.json`. The report in the repo covers the NeRF phase only, so the structure-from-motion beat is typographic (numbers only, no invented plots).

## Hook (first 2-3 seconds)
The real Lego NeRF orbit (converted from `Phase2/NeRF_Lego.gif`) spinning as a large square panel on the right while the headline rises on the left at 0.4 s: "From phone photos to a 3D asset." A quieter second line: "Classical geometry plus neural rendering, with modest compute."

## Key moments (the middle)
- Reveal: "Buildings Built in Minutes" with "Structure from motion and NeRF", the two phases landing on the beat grid, beside Fig. 14 (rendered views over iterations for Lego, Ship and Hotdog).
- Phase 1: a counter runs from 1.75 px down to 1.01 px (average reprojection error across five views after sparse bundle adjustment in SciPy) while five pipeline rows land on the beat grid: SIFT keypoints and matching; eight-point fundamental and essential matrices with RANSAC; PnP camera poses; linear and nonlinear triangulation; bundle adjustment in SciPy.
- Phase 2 numbers: "+60%" PSNR versus the baseline and "-40%" rendering artifacts count up, beside Fig. 15 (without and with positional encoding against ground truth) and Table I (PSNR and SSIM) over the tilted report page.
- The orbits: all three NeRF orbits (Lego, Hotdog, Ship) spinning side by side under "Photorealistic 360-degree orbits of three scenes." with the sampling and reproducibility notes.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/buildings-built-in-minutes". Music fades under it.

## User flow worth showing
Photographs in, camera poses and a sparse point cloud through structure from motion, then NeRF trained on the posed views and rendered as 360-degree orbits. Shown with the real orbit GIFs and the report's iteration strips.

## Tone
- Preset: polished
- Creative direction: quiet premium product film for a reconstruction pipeline
- Interpretation: one idea per scene, long holds, soft blur crossfades on beats, numbers count once and stay, sentence case, nothing shouts.

## Format: landscape, 1920x1080
## Duration: 24.5 s

## Visual identity (from the project website)
- Background: #121218
- Accent: #f0b35c (amber, the only accent)
- Text: #f4f2ee, secondary text #b9b5ae
- Display font: Bricolage Grotesque (Google Fonts)
- Body font: Geist (Google Fonts)
- Strongest visual element: the three NeRF orbit GIFs from `Phase2/` (converted to MP4 with ffmpeg) and Fig. 14, Fig. 15 and Table I from `Report.pdf` (rendered with PyMuPDF).

## Share copy (draft)
Introducing Buildings Built in Minutes: structure from motion that pulls reprojection error from 1.75 to 1.01 px, then NeRF end to end for photorealistic 360-degree orbits of the Lego, Hotdog and Ship scenes, about 60% higher PSNR than the baseline.

## Audio direction
- Role: warm bed with sparse professional accents
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (steady and clean, 109.96 BPM)
- Music treatment: starts at 0 s, volume 0.32, fades out from 23.2 s to 24.5 s under the end card
- Music cue guidance: bundled preset read (`assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.md`). Scene boundaries on the beat grid at 4.39, 8.74, 13.11, 17.47 and 21.84 s; 8.74, 13.11 and 17.47 are strong cues and carry the three biggest reveals (the reprojection counter, the NeRF numbers, the three orbits). Beat-grid windows: phase rows at 5.34, 6.00; pipeline rows at 9.29, 9.83, 10.37, 10.93, 11.46; metrics at 13.11 and 14.20; orbit panels at 17.47, 18.02, 18.56; end-card lines at 21.84, 22.37, 22.93.
- Audio-reactive treatment: subtle; music RMS breathes the amber glow behind the content. No waveform or equalizer visuals, no text scaling.
- SFX posture: sparse (three cues), low high-frequency risk: a soft impact when Fig. 14 lands, a soft impact when the numbers scene lands, one bong on the end card.
- Audio-coupled moments: row sequences on the beat grid, the count-ups, the end-card stack.
- Restraint rule: no SFX on individual rows, no pulsing text, music never above 0.35, nothing strobes.

## Storyboard

### Scene 1 - Hook - 4.39 s (0.00 to 4.39)
The Lego NeRF orbit plays in a 640 px square panel on the right (muted, from 1.2 s into the clip so it opens mid-orbit). Kicker top-left at 0.3 s: "WPI RBE/CS 549 Computer Vision". Headline left at 0.4 s: "From phone photos to a 3D asset." (settled by 1.3 s). Second line at 1.64 s: "Classical geometry plus neural rendering, with modest compute." Panel label: "360-degree NeRF orbit of the Lego scene". Footnote bottom-right: "Orbits and figures from the project repo".
Sequential/interaction: none
Audio intent: the bed starts quietly, the orbit carries the moment
Audio-coupled idea: none
Music: steady bed
Transition mood: soft (blur crossfade, 0.5 s) to Scene 2

### Scene 2 - Reveal - 4.35 s (4.39 to 8.74)
Title "Buildings Built in Minutes" top-left at 4.5 s, subtitle "Structure from motion and NeRF" at 4.9 s. Two rows on the beat grid (5.34, 6.00): "Phase 1, structure from motion in Python and OpenCV" and "Phase 2, NeRF end to end". Footer at 6.56 s: "Classical reconstruction of WPI Unity Hall". Right: Fig. 14 card (rendered views over iterations) rises at 5.3 s with its caption.
Sequential/interaction: yes, two rows one by one
Audio intent: the reveal lands with weight
Audio-coupled idea: one soft impact when Fig. 14 lands
Music: bed building
Transition mood: soft (blur crossfade) to Scene 3

### Scene 3 - Phase 1 - 4.37 s (8.74 to 13.11)
Kicker "Phase 1, structure from motion". Heading "Reprojection error, five views." at 8.8 s. Five pipeline rows on the beat grid (9.29, 9.83, 10.37, 10.93, 11.46). Right: a large counter runs from "1.75 px" to "1.01 px" over 1.6 s from 8.74 s and holds, with the label "average reprojection error after sparse bundle adjustment".
Sequential/interaction: yes, five rows one by one, held as a set for 1.2 s after the last; the counter is the hero
Audio intent: tick along with the pulse, no extra sound
Audio-coupled idea: beat-grid reveal, counter locked to the strong cue at 8.74
Music: bed, mid energy
Transition mood: soft (blur crossfade) to Scene 4

### Scene 4 - Phase 2 numbers - 4.36 s (13.11 to 17.47)
Kicker: "Phase 2, NeRF end to end". Two metrics count up on the left: "+60%" "PSNR versus the baseline" at 13.11 s and "-40%" "rendering artifacts" at 14.20 s. Footer at 14.73 s: "Aligned to SfM poses for consistent scale". Right: Fig. 15 card (without and with positional encoding against ground truth) and the Table I crop (PSNR and SSIM) with the rendered report page 4 tilted and dimmed behind them.
Sequential/interaction: yes, two metrics one after the other (every other beat)
Audio intent: the numbers land, the scene breathes
Audio-coupled idea: counters locked to the strong cue at 13.11; one soft impact on the scene landing
Music: bed
Transition mood: soft (blur crossfade) to Scene 5

### Scene 5 - The orbits - 4.37 s (17.47 to 21.84)
Kicker: "Rendering". Heading "Photorealistic 360-degree orbits of three scenes." Three orbit panels (Lego, Hotdog, Ship) spin side by side, arriving on the beat grid (17.47, 18.02, 18.56) with their labels. Footer at 18.56 s: "Positional encoding, hierarchical coarse-to-fine sampling, fixed seeds".
Sequential/interaction: yes, three panels one by one
Audio intent: confident close of the argument
Audio-coupled idea: panels on the beat grid
Music: bed
Transition mood: soft (blur crossfade) to Scene 6

### Scene 6 - End card - 2.66 s (21.84 to 24.50)
Centered: "Shreya Boyane" at 21.84 s, amber rule, "shreyaboyane.dev" at 22.37 s, "/projects/buildings-built-in-minutes" at 22.93 s. Everything holds to the end; the glow settles as the music fades.
Sequential/interaction: yes, three lines on consecutive beats
Audio intent: a soft closing accent, then the bed fades
Audio-coupled idea: one bong when the name lands
Music: fades out 23.2 to 24.5 s

**Music mood for this video:** polished, steady, warm
**Audio summary:** a quiet bed under the orbit, rising with the reveal, ticking the rows and counters along the beat grid, then settling under the end card with one soft accent.

Scene durations: 4.39 + 4.35 + 4.37 + 4.36 + 4.37 + 2.66 = 24.5 s.
