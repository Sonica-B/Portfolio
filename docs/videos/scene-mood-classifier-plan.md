# Brag Plan: Scene Mood Classifier

## What is this app?
A CLIP plus Wav2Vec2 fusion model that scores the mood of a video or image-and-audio pair, shipped as one container image deployed to GCP, AWS and Azure with monitoring, alerting, CI/CD and tested recovery paths. Published as two Hugging Face Spaces. Built for WPI DS-553 Case Studies in Data Science.

## The 9-question rubric
1. What is the app? A Gradio app plus HTTP inference API that fuses CLIP (vision) and Wav2Vec2 (audio) zero-shot scores into one of five moods, operated as a platform across three clouds.
2. Most impressive claim? One container image on three clouds, with recovery tested against forced crashes, full wipes and network drops, and recovery time treated as a performance metric.
3. Visual hook? "One container image, three clouds": a Docker image card fanning out to GCP, AWS and Azure chips on the first three beats.
4. What should be shown from the actual project? The app UI recreated from its real strings in `fusion-app/app_local.py` (title, upload prompt, "Use API Mode (requires sign-in)", tabs "Video" and "Image + Audio", the fusion weight slider at 0.70, "Analyze", outputs "Prediction", "Probabilities", "Latency (ms)"), the five moods and their definitions from `labels.json`, the latency keys from `utils_media.py`, the two GitHub Actions workflows (Tests, SYNC with Hugging Face) and the real header of the public Space page. No invented predictions or probabilities appear anywhere.
5. Shortest satisfying video? About 24 seconds.
6. Tone? Preset `polished` (user-specified). Creative direction: quiet premium systems film; a model becomes an operated platform.
7. Audio? Steady clean bed (vol-12), three subtle SFX, subtle audio-reactive glow.
8. Share caption? "Scene Mood Classifier: a CLIP plus Wav2Vec2 fusion model shipped as one container image to GCP, AWS and Azure, monitored, alerted and tested against forced crashes."
9. User flow worth showing? Upload a video or an image plus audio, set the fusion weight, press Analyze, read the prediction, probabilities and latency. Scene 2 recreates this screen with its real labels.

## The angle
One container image, three clouds, monitored and tested against forced crashes: a model shipped as an operated platform, live on Hugging Face Spaces.

## Hook (first 2-3 seconds)
Eyebrow "Most course projects stop at a model" (the project's own problem statement). Headline "One container image, three clouds" rises on the first beat while a Docker image card fans out to GCP, AWS and Azure chips on beats 0.56, 1.09, 1.64. At 2.19 s the amber line "Monitored, alerted and tested against forced crashes" lands with a soft impact.

## Key moments (the middle)
- The app: a recreation of the real Gradio screen with its real strings, beside the five moods it scores (calm, energetic, suspense, joyful, sad) with their real definitions and the two models (CLIP ViT-B/32, Wav2Vec2 base).
- The operations: "Recovery time, treated as a performance metric" with Prometheus, node exporter and Grafana; auto-restart, health checks and Discord alerting; forced crashes, full wipes and network drops.
- The delivery: Tests (pytest, six test modules, Discord status) then SYNC with Hugging Face to two Spaces, with the real Space page header.

## Outro / punchline
"Shreya Boyane", "shreyaboyane.dev", "/projects/scene-mood-classifier". Music fades under it.

## User flow worth showing
Entry: upload media. Key action: set the fusion weight and press Analyze. Result: prediction, per-class probabilities and latency, logged to CSV with p50 and p95 summarized in CI. Scene 2 shows the screen; the outputs show their real keys only.

## Tone
- Preset: polished
- Creative direction: quiet premium systems film; a model becomes an operated platform
- Interpretation: few scenes, long holds, 0.6 s crossfades, one amber accent, typographic diagrams built from real names.

## Format: landscape, 1920x1080
## Duration: 24.6 seconds

## Visual identity (from the website)
- Background #121218, text #f4f2ee, secondary #b9b5ae, accent #f0b35c, cards #1b1b24
- Display Bricolage Grotesque, body Geist (local woff2 from Google Fonts), JetBrains Mono for paths and keys
- Strongest visual element: the three-cloud fan-out and the recreated app screen; the real Space header strip anchors the delivery scene.
- Rules: sentence case, no em dashes anywhere, one accent, no full-frame gradients, no fake results.

## Share copy (draft)
Scene Mood Classifier: a CLIP plus Wav2Vec2 fusion model shipped as one container image to GCP, AWS and Azure, monitored, alerted and tested against forced crashes. Live as two Hugging Face Spaces.

## Audio direction
- Role: sparse professional accents over a steady clean bed
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (109.96 BPM), fade-in to 0.3 by 0.35 s, fade-out 22.6 to 24.6 s
- Music cue guidance: bundled vol-12 preset. Strong cues: 8.74 s (mood row 4), 18.56 s (amber delivery line), 22.37 s (site). Beat grid: cloud chips 0.56, 1.09, 1.64; app screen elements 5.34 to 6.6; mood rows 7.09, 7.64, 8.19, 8.74, 9.29; ops rows 14.20, 14.73, 15.29; scene boundaries 4.39, 12.02, 16.93, 21.84.
- Audio-reactive treatment: subtle; bass breathes the amber glow (scale and opacity only).
- SFX posture: sparse; soft impact 2.15 s (amber hook line), soft impact 5.30 s (app screen lands), soft bong 21.88 s (end card).
- Restraint rule: nothing on rows, chips, cards or transitions.

## Storyboard

### Scene 1, Hook, 0.00 to 4.39 s
Left: eyebrow, headline "One container image, three clouds", amber rule, amber line at 2.19 s. Right: a "One Docker image" card (Gradio UI plus HTTP inference API) with a bus line fanning to GCP, AWS and Azure chips on beats 0.56, 1.09, 1.64; caption "Per-provider port injection with runtime-aware config".
Sequential/interaction: yes, chips on the beat grid.
Transition mood: soft crossfade into Scene 2.

### Scene 2, Reveal and the app, 4.39 to 12.02 s
Header "Scene Mood Classifier", subtitle "Multimodal classifier shipped as an operated MLOps platform", tag "Live on Hugging Face Spaces". Right: the app screen recreated from its real strings lands at 5.34 s with staggered elements; its outputs show only their real keys. Left: "Five moods it scores" rows on beats 7.09, 7.64, 8.19, 8.74 (strong cue), 9.29, then the models caption "CLIP ViT-B/32 for frames, Wav2Vec2 base for audio, zero-shot". Holds to 12.02 s.
Transition mood: soft crossfade into Scene 3.

### Scene 3, Operations, 12.02 to 16.93 s
Eyebrow "Monitoring, alerting, CI/CD and tested recovery paths", headline "Recovery time, treated as a performance metric". Right rows at 14.20, 14.73, 15.29: Prometheus, node exporter, Grafana; auto-restart, health checks, Discord alerting; forced crashes, full wipes, network drops. Holds to 16.93 s.
Transition mood: soft crossfade into Scene 4.

### Scene 4, Delivery, 16.93 to 21.84 s
Eyebrow "CI/CD on GitHub Actions", headline "Tests pass, then both Spaces sync", amber line "Local mode and inference-API mode with Hugging Face OAuth" on the 18.56 s strong cue. Three cards with arrows: Tests (pytest, six test modules, Discord status per step), SYNC with Hugging Face (runs only after tests succeed), Two Spaces (the real page header strip plus the two Space names). Holds to 21.84 s.
Transition mood: soft crossfade into the outro.

### Scene 5, Outro, 21.84 to 24.60 s
Name at 21.9 s with a soft bong, amber rule, site on the 22.37 s strong cue, path at 22.7 s. Music fades 22.6 to 24.6 s. No fade to black.

**Music mood for this video:** steady and clean, polished.
**Audio summary:** one low bed from frame 0, three warm soft accents, a subtle bass-driven glow, and a two-second fade under the end card.
