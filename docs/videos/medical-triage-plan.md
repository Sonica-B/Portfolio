# Brag Plan: Medical Triage HIL

## What is this app?
A research prototype in which local LLMs (Ollama, Mistral by default) assign Emergency Severity Index levels, reason about handoff risk and track confidence as more patient questions are revealed, with human-in-the-loop review on high-risk escalations. Explicitly not a clinical decision tool.

## The angle
LLM triage assistants hallucinate and escalate incorrectly. Could calibrated confidence plus human review make them safer? The video shows the real per-case ESI and confidence plots, explains the three-step flow (extract risk factors, track confidence, escalate to a human), shows the real calibration scatter that motivates human review, and states the prototype disclaimer on screen twice.

## Hook (first 2-3 seconds)
Left: "LLM triage assistants hallucinate and escalate incorrectly." then, in amber, "Could calibrated confidence plus human review make them safer?" Right: the real ESI level and confidence progression plot for one annotated case (`output/visualizations/30000012.txt_esi_confidence.png`).

## Key moments (the middle)
- Title card: "Medical Triage HIL", "Confidence-aware LLM triage", amber pill "Research prototype, not a clinical decision tool", "Worcester Polytechnic Institute".
- The flow, three cards: 01 Extract risk factors (a local LLM served with Ollama assigns an ESI level); 02 Track confidence (re-estimated as each patient question is revealed); 03 Escalate to a human (high-risk escalations go to human-in-the-loop review, separated from routine guidance). Bottom line: "Mistral by default, served locally with Ollama."
- Evidence: the real calibration scatter (`output/visualizations/confidence_accuracy_correlation.png`) with the caption "Confidence vs accuracy across cases against perfect calibration: why escalations get human review." beside four chips from profile.json: +20% triage precision, -40% false escalations, -50% hallucinations, +60% early critical-case detection.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/medical-triage", "Research prototype, not a clinical decision tool."

## User flow worth showing
Entry: an annotated case is parsed and risk factors extracted. Key action: the model predicts an ESI level and its confidence is tracked as each question is revealed. Result: high-risk escalations are handed to human review. Shown as the three-card flow in Scene 3 and the real progression plot in Scene 1.

## Tone
- Preset: polished
- Creative direction: calm clinical-research film, no alarmism, disclaimer visible
- Interpretation: five scenes, long holds, soft blur crossfades on beats, one amber accent

## Format: landscape, 1920x1080
## Duration: 24.5 seconds

## Visual identity (from the project)
- Background: #121218
- Accent: #f0b35c
- Text: #f4f2ee (secondary #b9b5ae)
- Display font: Bricolage Grotesque (Google Fonts, self-hosted woff2)
- Body font: Geist (Google Fonts, self-hosted woff2)
- Strongest visual element: the ESI and confidence overlay (the portfolio's project visual)

## Share copy (draft)
Medical Triage HIL: local LLMs assign Emergency Severity Index levels, track confidence as each patient question is revealed, and hand high-risk escalations to a human reviewer. Triage precision up 20%, false escalations down 40%, hallucinations down 50%. Research prototype, not a clinical decision tool.

## Audio direction
- Role: warm steady bed, sparse professional accents
- Music: happy-beats-business-moves-vol-12-by-ende-dot-app.mp3, lane plateau 0.32 (absolute), fade in 0.4 s, fade out over the last 1.5 s
- Music cue guidance: vol-12 preset (109.96 BPM). Strong cues used: 8.74 (flow reveal), 17.47 (last chip), 22.93 (end-card rule). Scene changes on beats 4.39, 8.74, 15.29, 20.19. Flow cards at 9.29, 10.37, 11.46; bottom line at 12.55; chips on consecutive beats 15.84, 16.38, 16.93, 17.47 then held as a set.
- Audio-reactive treatment: subtle; amber glow breathes with RMS and bass
- SFX posture: sparse (3 cues), low high-frequency risk
- Audio-coupled moments: title landing (soft impact), flow reveal (soft impact), name landing (bong)
- Restraint rule: no SFX on cards or chips, no text pulsing, music never above 0.35

## Music cue guidance
Track vol-12, 109.96 BPM; strong cues 8.74, 17.47, 22.93 locked; sequential text on every beat only where the set then holds long enough to read.

## Storyboard

### Scene 1 - Hook - 4.4s (0.00 to 4.39)
Left: eyebrow "Emergency Severity Index triage with local LLMs", the problem line (lands by 0.9 s), the question in amber (lands by 1.7 s). Right: ESI and confidence plate with push-in, caption "ESI prediction and confidence for one annotated case as questions are revealed".
Audio intent: clean bed.
Transition mood: soft blur crossfade at 4.39 -> Scene 2

### Scene 2 - Title - 4.35s (4.39 to 8.74)
Rule, eyebrow "Human-in-the-loop emergency severity prediction", "Medical Triage HIL", "Confidence-aware LLM triage", pill "Research prototype, not a clinical decision tool", "Worcester Polytechnic Institute".
Audio intent: soft impact as the title lands.
Transition mood: soft blur crossfade locked to 8.74 -> Scene 3

### Scene 3 - The flow - 6.55s (8.74 to 15.29)
Heading "Confidence-aware triage with a human in the loop". Three cards arrive at 9.29, 10.37, 11.46; bottom line at 12.55. Every card holds at least 3.3 s.
Audio intent: soft impact at 8.74.
Transition mood: soft blur crossfade -> Scene 4

### Scene 4 - Evidence - 4.9s (15.29 to 20.19)
Left: calibration plate with caption. Right: "By the numbers" and four chips on consecutive beats, held as a set for 2.3 s.
Audio intent: quiet.
Transition mood: soft blur crossfade -> Scene 5

### Scene 5 - End card - 4.3s (20.19 to 24.50)
Name, amber rule on the 22.93 cue, site, path, disclaimer line. Held to the end, music fades.
Audio intent: one warm bong on the name.
Transition mood: hold.

**Music mood for this video:** steady, clean, warm
**Audio summary:** one clean bed, three soft accents, a breathing glow, a fade under the end card.
