# Brag Plan: FairPrep

## What is this app?
FairPrep is a co-first-author paper (submitted to DASHSys 2026) that adapts the FairEM framework from entity matching to annotator-level fairness in table union search, finding statistically significant bias against non-native English annotators on hard questions.

## The angle
Is human feedback equally reliable across annotators? Nobody had checked. FairPrep checks with 10 FairEM confusion-matrix metrics, permutation tests, bootstrap intervals, Fisher exact tests and FDR correction, and 6 of 10 metrics say no. The video is a quiet data film: the question, the name, the two numbers that answer it, the real significance figure, the end card.

## Hook (first 2-3 seconds)
Left: eyebrow "Human feedback for table union search", then "Is human feedback equally reliable across annotators?" and, in amber, "Nobody had checked." Right: a 2 x 5 grid of the 10 FairEM metric tiles (AP, SP, TPR, TNR, PPV, NPV, FPR, FNR, FDR, FOR, the exact names on the repo's figure) arriving as a staggered grid.

## Key moments (the middle)
- Title card: "FairPrep", "Fairness-aware human feedback for table unionability", pill "Co-first-author paper submitted to DASHSys 2026", "Worcester Polytechnic Institute".
- The answer, typographic: "6 of 10" FairEM metrics flag unfairness; "25% vs 44%" accuracy on hard questions, non-native vs native English annotators, p = 0.031; then the line "Non-native, lower-education and young: p = 0.037 after FDR correction."
- The real figure: `results/statistical_tests/significance_summary.png` (Phase 3 statistical tests) as a wide plate with the caption naming the five test families, beside three chips: 60 annotators, 480 rows, 5 of 5 cleaning strategies.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/fairprep", "Co-first author. Submitted to DASHSys 2026."

## User flow worth showing
none, research code (nine analysis modules under `src/`, no UI). The strongest material is the statistical result itself, so the centerpiece scenes are typographic data plus the one real figure.

## Tone
- Preset: polished
- Creative direction: quiet data film; numbers as the hero, one amber accent
- Interpretation: five scenes, long holds, soft blur crossfades on beats, no jokes

## Format: landscape, 1920x1080
## Duration: 24.5 seconds

## Visual identity (from the project)
- Background: #121218
- Accent: #f0b35c
- Text: #f4f2ee (secondary #b9b5ae)
- Display font: Bricolage Grotesque (Google Fonts, self-hosted woff2)
- Body font: Geist (Google Fonts, self-hosted woff2)
- Strongest visual element: the Phase 3 significance summary figure (effect sizes with fairness threshold lines, -log10 p-values against alpha)

## Share copy (draft)
Introducing FairPrep: fairness-aware human feedback for table unionability. Is human feedback equally reliable across annotators? 6 of 10 FairEM metrics say no, with 25% vs 44% accuracy on hard questions (p = 0.031). Co-first-author paper submitted to DASHSys 2026.

## Audio direction
- Role: warm steady bed, sparse professional accents
- Music: happy-beats-business-moves-vol-12-by-ende-dot-app.mp3
- Music treatment: starts at 0, lane plateau 0.32 (the automation lane is absolute), short fade in, fade out over the last 1.5 s
- Music cue guidance: preset `happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.md` (109.96 BPM). Strong cues used: 8.74 (answer scene), 18.56 (last chip), 22.93 (end-card rule). Scene changes on beats 4.39, 8.74, 15.29, 20.19. Stat blocks at 9.29 and 10.37; bottom line at 11.46; chips at 16.38, 17.47, 18.56 (every other beat).
- Audio-reactive treatment: subtle; amber glow breathes with RMS and bass (opacity and scale only)
- SFX posture: sparse (3 cues), low high-frequency risk
- Audio-coupled moments: title landing (soft impact), answer scene landing (soft impact), name landing (bong)
- Restraint rule: no SFX on tiles or chips, no text pulsing, music never above 0.35

## Music cue guidance
Track vol-12, 109.96 BPM. Strong cues 8.74, 18.56, 22.93 locked; beat grid for sequential text at every other beat so each line holds at least 1.1 s.

## Storyboard

### Scene 1 - Hook - 4.4s (0.00 to 4.39)
Left: eyebrow, the question (lands by 0.9 s), "Nobody had checked." in amber (lands by 1.9 s). Right: 10 metric tiles stagger in (0.05 s apart) under the caption "The 10 FairEM confusion-matrix metrics".
Sequential/interaction: tiles arrive as a grid; lines arrive one after the other.
Audio intent: clean bed, no SFX.
Audio-coupled idea: glow breathes with RMS.
Music: steady bed.
Transition mood: soft blur crossfade on the beat at 4.39 -> Scene 2

### Scene 2 - Title - 4.35s (4.39 to 8.74)
Rule, eyebrow "Co-first-author paper", "FairPrep" very large, subtitle "Fairness-aware human feedback for table unionability", pill "Submitted to DASHSys 2026", "Worcester Polytechnic Institute".
Sequential/interaction: rule, eyebrow, name, subtitle, pill, affiliation in order.
Audio intent: soft impact as the name lands.
Transition mood: soft blur crossfade locked to the strong cue at 8.74 -> Scene 3

### Scene 3 - The answer - 6.55s (8.74 to 15.29)
Two stat blocks: "6 of 10" with "FairEM metrics flag unfairness" (9.29) and "25% vs 44%" with "accuracy on hard questions, non-native vs native English annotators, p = 0.031" (10.37). Bottom line at 11.46: "Non-native, lower-education and young: p = 0.037 after FDR correction." Holds at least 3.4 s.
Sequential/interaction: blocks arrive on beats, then the bottom line.
Audio intent: the answer is the main reveal; one soft impact at 8.74.
Transition mood: soft blur crossfade -> Scene 4

### Scene 4 - Evidence - 4.9s (15.29 to 20.19)
Left: the significance summary figure as a wide plate with the caption "Phase 3 statistical tests: permutation, Fisher with BH correction, bootstrap, logit z-test and meta-analytic." Right: eyebrow "By the numbers", chips "60 annotators", "480 rows in the dataset", "5 of 5 cleaning strategies, findings robust" at 16.38, 17.47, 18.56.
Sequential/interaction: chips one by one on the beat grid.
Audio intent: quiet, no SFX.
Transition mood: soft blur crossfade -> Scene 5

### Scene 5 - End card - 4.3s (20.19 to 24.50)
"Shreya Boyane", amber rule on the 22.93 cue, "shreyaboyane.dev", "/projects/fairprep", "Co-first author. Submitted to DASHSys 2026." Held to the end, music fades.
Audio intent: one warm bong on the name, then the bed fades.
Transition mood: hold, no fade to black.

**Music mood for this video:** steady, clean, warm
**Audio summary:** one clean bed, three soft accents (title, answer, name), a glow that breathes with the music, a fade under the end card.
