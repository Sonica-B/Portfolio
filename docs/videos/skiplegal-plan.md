# Brag Plan: SkipLegal

## What is this app?
SkipLegal is a four-agent LLM pipeline on AWS that turns a messy, multi-format H-1B petition package into schema-validated JSON and a single attorney-ready QC report, cutting review from 3 to 4 days to about 5 to 10 minutes. Built for Crossing as a WPI industry-sponsored Graduate Qualifying Project; Shreya was named Data Science GQP MVP.

## The 9-question rubric
1. What is the app? A production multi-agent document-intelligence system for H-1B immigration workflows (Form I-129 packages).
2. Funniest or most impressive claim? Review time: 3 to 4 days down to 5 to 10 minutes. Missing-document detection 99 to 100%.
3. Visual hook? The time collapse. A big "3 to 4 days" that is replaced by an amber "5 to 10 minutes".
4. What should be shown from the actual project? Real artifacts from the repo: the document templates the intake agent recognizes (passport, I-94, diplomas, employment letter, I-129 petition, US visa, school transcripts, corporate tax returns, resume, marriage certificate, proof of in-country status), the real output file `final_validation_report.json` and its keys (`validation_type`, `rag_status`, `agent2a_issues`, `agent2b_validation`, `overall_status`), and the README's `Branching_Strategy.jpg`.
5. Shortest satisfying video? About 24 seconds. The flow scene needs room to breathe.
6. Tone? Preset `polished` (user-specified). Creative direction: quiet premium systems film; a legal workflow collapses into minutes.
7. Audio? Steady clean bed (vol-12) at a low level with a soft fade, three subtle SFX only (time collapse, report landing, end card), subtle audio-reactive glow.
8. Share caption? "SkipLegal: four agents turn a messy H-1B petition package into one attorney-ready QC report. Review time went from 3 to 4 days to about 5 to 10 minutes."
9. User flow worth showing? Petition package (PDFs of 11 document types) enters; Agent 1 (intake and vision, Textract OCR), Agent 2A (canonical I-129 fields through deterministic rules), Agent 2B (LLM semantic validation of supporting evidence) and Agent 2C (cross-document comparator with a Bedrock RAG fallback) process it; one `final_validation_report.json` comes out.

## The angle
Four agents turn a messy H-1B petition package into one attorney-ready QC report. The video opens on the time cost of the manual process and collapses it, then shows the real pipeline shape with real artifact names, proves it with the project's own numbers, and closes on the production delivery and the MVP award.

## Hook (first 2-3 seconds)
A small eyebrow "H-1B petition review, per package" above a huge "3 to 4 days". At about 2.2 seconds the line collapses and an amber "5 to 10 minutes" lands on the beat with a soft impact. The collapse is the hook.

## Key moments (the middle)
- The pipeline: real document type chips cascade in on the left, four agent cards arrive one per beat in the middle, and the real output file `final_validation_report.json` lands on the right on a strong cue.
- The proof: "about 2,000" counts up (hours freed per firm per season), with structural accuracy 95 to 99%, missing-document detection 99 to 100%, and cost per case 50 to 70% lower beside it.
- The delivery: the repo's real `Branching_Strategy.jpg` in a card next to "Built as a production system for Crossing" and the Data Science GQP MVP award.

## Outro / punchline
"Shreya Boyane", "shreyaboyane.dev", "/projects/skiplegal". Music fades under it.

## User flow worth showing
Entry: a petition package of real document types (I-129 petition, passport, I-94, US visa, employment letter, diplomas, school transcripts, corporate tax returns). Key action: four agents process it in sequence. Result: one attorney-ready QC report (`final_validation_report.json`). This is the centerpiece scene.

## Tone
- Preset: polished
- Creative direction: quiet premium systems film; a legal workflow collapses into minutes
- Interpretation: few scenes, long holds, soft crossfades, generous letter-spacing, one amber accent, no jokes, nothing aggressive. Energy comes from the time collapse, the beat-aligned agent cards and the count-up, not from fast cuts.

## Format: landscape, 1920x1080
## Duration: 24.6 seconds

## Visual identity (from the website)
- Background: #121218
- Accent: #f0b35c (amber, the only accent)
- Text: #f4f2ee
- Secondary text: #b9b5ae
- Display font: Bricolage Grotesque (local woff2 from Google Fonts)
- Body font: Geist (local woff2 from Google Fonts)
- Mono voice for real file and key names: JetBrains Mono (bundled by Hyperframes)
- Strongest visual element: the time collapse and the three-column pipeline with real artifact names; `Branching_Strategy.jpg` is the one real image in the repo.
- Rules: sentence case, no em dashes anywhere, no gradients across the frame, one accent.

## Share copy (draft)
SkipLegal: four agents turn a messy H-1B petition package into one attorney-ready QC report. Review time went from 3 to 4 days to about 5 to 10 minutes.

## Audio direction
- Role: sparse professional accents over a steady clean bed
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (109.96 BPM, steady and clean, the polished pick)
- Music treatment: starts at 0 with a 0.3 s fade-in, volume 0.3, fades out over the last 2 seconds under the end card
- Music cue guidance: preset read from `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.md`. Strong cues to target: 8.74 s (report card lands), 17.47 s (delivery scene enters), 22.37 s (project path lands). Beat grid for sequential events: agent cards at 6.00, 6.56, 7.09, 7.64 (quick reveal, then the full set holds about 4.9 s); stat rows at 14.20, 14.73, 15.29 (quick reveal, held about 2.2 s); scene boundaries on beats 4.39, 12.55, 17.47, 21.84.
- Audio-reactive treatment: subtle; bass energy breathes the amber radial glow behind the content (scale and opacity only), treble adds a faint warmth to the glow. No waveforms, no bars, no text pulsing.
- SFX posture: sparse, three cues, warm low-risk files only
- Audio-coupled moments: the time collapse (soft impact), the report card landing (soft impact), the end card (soft bong)
- Restraint rule: no SFX on the agent cards, chips, stats or transitions; the music carries those. Nothing above 0.6 volume.

## Storyboard

### Scene 1, Hook, 0.00 to 4.39 s (4.39 s)
Eyebrow "H-1B petition review, per package" fades in at 0.2 s. "3 to 4 days" (display, 170 px) rises in on the beat at 0.56 s and holds. At 2.19 s it collapses (shrinks and dims upward) and "5 to 10 minutes" in amber lands in its place with a soft impact. Both lines hold long enough to read (1.6 s and 2.2 s settled). Thin amber rule under the headline scales in.
Sequential/interaction: yes, two states of one headline, the second replacing the first on a beat.
Audio intent: calm bed, one soft impact on the replacement.
Audio-coupled idea: beat-aligned replacement at 2.19 s.
Music: steady bed from 0.
Transition mood: soft crossfade (0.6 s) into Scene 2.

### Scene 2, Reveal and pipeline, 4.39 to 12.55 s (8.16 s)
Top: "SkipLegal" wordmark with "Multi-agent H-1B document intelligence" and a small amber label "Production system for Crossing". Left column "Petition package": eight real document chips cascade in (I-129 petition, passport, I-94, US visa, employment letter, diplomas, school transcripts, corporate tax returns). Middle column: four agent cards arrive one per beat at 6.00, 6.56, 7.09, 7.64: "Agent 1, Intake and vision, Textract OCR"; "Agent 2A, Canonical I-129 fields, deterministic rules"; "Agent 2B, Semantic validation, LLM over evidence"; "Agent 2C, Cross-document comparator, Bedrock RAG fallback". Right column: at 8.74 s (strong cue) a report card lands: `final_validation_report.json` with the real keys `validation_type`, `rag_status`, `agent2a_issues`, `agent2b_validation`, `overall_status` and the caption "One attorney-ready QC report". Thin amber connectors draw between columns. The full set holds until 12.55 s.
Sequential/interaction: yes, chips cascade, four cards arrive one by one on the beat grid, the report lands on a strong cue.
Audio intent: the bed carries the sequence; one soft impact when the report lands.
Audio-coupled idea: beat-grid cards; beat-locked report at 8.74 s.
Music: steady bed.
Transition mood: soft crossfade into Scene 3.

### Scene 3, Proof, 12.55 to 17.47 s (4.92 s)
Left: "about" then "2,000" counts up from 0 (display, 220 px, amber, tabular numerals) over 1.4 s with "hours freed per firm per season" beneath. Right: three stat rows arrive quickly on consecutive beats (14.20, 14.73, 15.29) and hold: "95 to 99%" structural accuracy; "99 to 100%" missing-document detection; "50 to 70% lower" cost per case. Eyebrow "Measured on real petition packages" is not used because it is not in the source; the eyebrow reads "From the project write-up".
Sequential/interaction: yes, the count-up and three stat rows arriving in order.
Audio intent: the count-up rides the bed; no SFX.
Audio-coupled idea: counter and beat-grid rows.
Music: steady bed.
Transition mood: soft crossfade into Scene 4.

### Scene 4, Delivery, 17.47 to 21.84 s (4.37 s)
Enters on the strong cue at 17.47 s. Right: a card holding the real README image `Branching_Strategy.jpg` with the caption "Branching strategy from the repository README". Left: eyebrow "Delivered", headline "Built as a production system for Crossing", amber line "Data Science GQP MVP, December 2025".
Sequential/interaction: image card slides in, then two lines.
Audio intent: calm, no SFX.
Audio-coupled idea: scene entry on the 17.47 s strong cue.
Music: steady bed.
Transition mood: soft crossfade into the outro.

### Scene 5, Outro, 21.84 to 24.60 s (2.76 s)
"Shreya Boyane" (display) at 21.9 s, "shreyaboyane.dev" (amber) on the beat at 22.37 s, "/projects/skiplegal" (mono, secondary) right after. A soft bong when the name lands. Music fades out over the last two seconds. Holds to the end; no fade to black.
Sequential/interaction: three lines in order.
Audio intent: closure.
Audio-coupled idea: end card on the 22.37 s strong cue.
Music: fades out 22.6 to 24.6 s.

**Music mood for this video:** steady and clean, polished.
**Audio summary:** one low clean bed from the first frame, three warm soft accents (collapse, report, end card), a subtle bass-driven glow, and a two-second fade under the end card.
