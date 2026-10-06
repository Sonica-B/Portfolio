# Brag Plan: Interpreting Latent CoT Reasoning as Dynamical Systems

## What is this app?
A mechanistic interpretability paper (poster, ICML 2026 FoGen Workshop) that treats each latent thought token of a chain-of-thought language model as a state on a discrete-time trajectory and applies dynamical-systems analysis to 768-dimensional reasoning trajectories across 8,792 GSM8K and 500 MATH samples.

## The angle
Two latent reasoning methods, two different dynamics. You cannot read a model's latent thoughts, but you can measure how they move. CODI behaves as a stable attractor; COCONUT behaves as an unstable expanding system; Sim-CoT supervision tightens both without changing the dynamics. The video shows the real paper figures (PHATE 3D trajectories, the CODI vs COCONUT DMD projections, the step-to-step change plot) and lets the two side-by-side DMD clouds make the argument.

## Hook (first 2-3 seconds)
The real 3D PHATE trajectory figure slides in on the right while two lines land on the left: "You can't read a model's latent thoughts." then "But you can track where they go." The figure's visible structure (a wall of t=0 states fanning into a cloud) is the image that earns the next 20 seconds.

## Key moments (the middle)
- Title card with the paper name, "Poster, ICML 2026 FoGen Workshop" and "Algoverse AI Research Fellowship".
- The split: CODI DMD plot on the left (two tight lobes around the origin), COCONUT DMD plot on the right (one wide spreading cloud). Labels: "A stable attractor." vs "An unstable expanding system." Then the Sim-CoT line.
- The evidence row: the step-to-step change figure (decreasing profile, a decelerating trajectory) beside four stat chips arriving one by one: 8,792 GSM8K samples; 768-dimensional trajectories; 4 model configurations; 28 of 28 claims verified.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/latent-cot", with the recognition line "Co-first author. Poster, ICML 2026 FoGen Workshop."

## User flow worth showing
none, research code (no app UI). The centerpiece is the real result figures from `results/*/plots/`, which are what a reader of the paper actually sees.

## Tone
- Preset: polished
- Creative direction: quiet research film; figures mounted like paper plates on a dark board
- Interpretation: few scenes, long holds, soft blur crossfades, restrained type, one amber accent, no jokes

## Format: landscape, 1920x1080
## Duration: 24.5 seconds

## Visual identity (from the project)
- Background: #121218
- Accent: #f0b35c
- Text: #f4f2ee (secondary #b9b5ae)
- Display font: Bricolage Grotesque (Google Fonts, self-hosted woff2 for a deterministic render)
- Body font: Geist (Google Fonts, self-hosted woff2)
- Strongest visual element: `results/coconut_gpt2/20260502_191252/plots/trajectory_phate_3d.png` (the same figure the portfolio uses as the project visual)

## Share copy (draft)
Latent chain-of-thought reasoning is hard to read, so we measured how it moves: each latent thought becomes a state on a trajectory, CODI behaves as a stable attractor and COCONUT as an unstable expanding system. Poster at the ICML 2026 FoGen Workshop.

## Audio direction
- Role: warm steady bed, sparse professional accents
- Music: happy-beats-business-moves-vol-12-by-ende-dot-app.mp3 (steady and clean, the polished pick)
- Music treatment: starts at 0 at about 0.32 volume, short fade in, fades out over the last 1.5 s under the end card
- Music cue guidance: preset read from `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.md` (109.96 BPM). Strong cues to target: 8.74 s (split reveal), 18.56 s (last stat chip), 22.93 s (accent rule under the name on the end card). Beat grid for the stat chips: 15.29, 16.38, 17.47, 18.56 (every other beat so each line holds for about 1.1 s). Scene changes sit on beats: 4.39, 8.74, 14.20, 20.19.
- Audio-reactive treatment: subtle; the amber radial glow behind the figure cards breathes with RMS and bass (opacity and scale only). No waveform or equalizer visuals.
- SFX posture: sparse (3 cues), motion-matched, low high-frequency risk
- Audio-coupled moments: title card landing (soft impact), CODI/COCONUT split landing (soft impact), name landing on the end card (bong)
- Restraint rule: no SFX on the stat chips, no per-beat pulsing of text, music never above 0.35

## Music cue guidance
Track vol-12, 109.96 BPM. Strong cues used: 8.74 s, 18.56 s, 22.93 s. Beat-grid windows: stat chips at 15.29 / 16.38 / 17.47 / 18.56. Readability stays primary; any cue that would shorten a hold below the reading floor is ignored.

## Storyboard

### Scene 1 - Hook - 4.4s (0.00 to 4.39)
Left: "You can't read a model's latent thoughts." (lands by 0.9 s) then "But you can track where they go." (lands by 1.9 s), Bricolage Grotesque, large. Right: the PHATE 3D figure as a white plate with a slow push-in, caption beneath in Geist: "PHATE embedding of COCONUT latent trajectories, 8,792 GSM8K problems". Both lines hold at least 2.5 s settled.
Sequential/interaction: two lines arrive one after the other; figure plate slides in from the right.
Audio intent: the bed starts clean; no SFX, let the figure carry.
Audio-coupled idea: amber glow behind the plate breathes with RMS.
Music: steady bed.
Transition mood: soft blur crossfade on the beat at 4.39 -> Scene 2

### Scene 2 - Title - 4.35s (4.39 to 8.74)
Eyebrow "Mechanistic interpretability paper", title "Interpreting Latent CoT Reasoning as Dynamical Systems" on two lines, amber pill "Poster, ICML 2026 FoGen Workshop", secondary "Algoverse AI Research Fellowship". Title holds about 3.5 s settled.
Sequential/interaction: eyebrow, title, pill, affiliation arrive in order.
Audio intent: a soft impact as the title lands.
Audio-coupled idea: soft impact SFX at the crossfade start.
Transition mood: soft blur crossfade locked to the strong cue at 8.74 -> Scene 3

### Scene 3 - Two dynamics - 5.5s (8.74 to 14.20)
Two white plates: CODI DMD trajectories (left) and COCONUT DMD trajectories (right), each with an amber method label above and a sentence below: "A stable attractor." / "An unstable expanding system." At 10.93 s a bottom line lands: "Sim-CoT supervision tightens both without changing the dynamics." (holds about 3 s).
Sequential/interaction: plates slide in from opposite sides, labels follow, bottom line last.
Audio intent: the split is the main reveal; one soft impact at 8.74.
Audio-coupled idea: beat-locked reveal at the strong cue.
Transition mood: soft blur crossfade -> Scene 4

### Scene 4 - Evidence - 6.0s (14.20 to 20.19)
Left: the CODI step-to-step change figure (`results/codi_gpt2/20260502_191252/plots/step2step_change.png`, the clearly decreasing profile) as a plate with the caption "CODI step-to-step change falls across the latent chain: a decelerating trajectory." Right: eyebrow "By the numbers" then four stat chips, one per every-other beat: "8,792 GSM8K samples", "768-dimensional trajectories", "4 model configurations", "28 of 28 claims verified". Last chip lands on the strong cue at 18.56 and holds 1.3 s.
Sequential/interaction: chips arrive one by one on the beat grid.
Audio intent: quiet, the chips ride the pulse without SFX.
Audio-coupled idea: beat-grid chip reveals.
Transition mood: soft blur crossfade -> Scene 5

### Scene 5 - End card - 4.3s (20.19 to 24.50)
"Shreya Boyane" large, "shreyaboyane.dev" in amber, "/projects/latent-cot" secondary, small line "Co-first author. Poster, ICML 2026 FoGen Workshop." A hairline amber rule draws under the name on the 22.93 cue. Held to the end, music fades out.
Sequential/interaction: name, site, path, rule.
Audio intent: a single warm bong as the name lands, then the bed fades.
Audio-coupled idea: bong on the name; rule draws on the strongest cue.
Transition mood: hold, no fade to black.

**Music mood for this video:** steady, clean, warm
**Audio summary:** one clean bed from the first frame, three soft accents on the title, the split and the name, a glow that breathes with the music, and a fade under the end card.
