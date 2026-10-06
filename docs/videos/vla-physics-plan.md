# Brag Plan: Where does physics live in vision encoders?

## What is this app?
An independent research project that probes where physical properties (mass, friction, elasticity, stability) are encoded across the encoder, projection and LLM stages of Qwen2.5-VL, InternVL 2.5 and LLaVA-OneVision, then fine-tunes five LoRA configurations to find the leverage point for physical intuition.

## The angle
Where does physics live inside a vision-language model? The real saliency maps answer visually: physics information is richest at the encoder output and fades through the LLM. The video shows the real figures from `results/figures/` and the four profile metrics (3 models, 4 stages, 15 LoRA runs, 3 benchmarks).

## Hook (first 2-3 seconds)
Left: "Where does physics live inside a vision-language model?" then, in amber, "Mass. Friction. Elasticity. Stability." Right: the physics saliency grid (`pub_saliency_grid.png`) as a tall plate with a slow push-in.

## Key moments (the middle)
- Title card: "Where does physics live in vision encoders?", subtitle "Spatial probing and LoRA ablation of VLM physical reasoning", pill with the three model names, "Independent research, 2026".
- The degradation strip (`pub_mass_degradation.png`, cropped below its own overlapping title band): "Physics information is richest at the encoder output and fades through the LLM." with "Mean R² for mass: 0.145 at the encoder output, 0.004 by LLM layer 16." (both values printed on the figure).
- The layer-by-layer curve (`pub_layer_by_layer.png`) beside four chips: 3 vision-language models, 4 pipeline stages probed, 15 LoRA ablation runs, 3 benchmarks.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/vla-physics", "Independent research. Qwen2.5-VL, InternVL 2.5 and LLaVA-OneVision."

## User flow worth showing
none, research code (Hydra-configured probing, visualization, evaluation and ablation modules). The real figures are the centerpiece.

## Tone
- Preset: polished
- Creative direction: quiet research film, heatmaps as the hero
- Interpretation: five scenes, long holds, soft blur crossfades on beats, one amber accent

## Format: landscape, 1920x1080
## Duration: 24.5 seconds

## Visual identity (from the project)
- Background: #121218
- Accent: #f0b35c
- Text: #f4f2ee (secondary #b9b5ae)
- Display font: Bricolage Grotesque (Google Fonts, self-hosted woff2)
- Body font: Geist (Google Fonts, self-hosted woff2)
- Strongest visual element: the saliency grid (the portfolio's project visual) and the mass degradation strip

## Share copy (draft)
Where does physics live in vision encoders? I probed mass, friction, elasticity and stability across the encoder, projection and LLM stages of Qwen2.5-VL, InternVL 2.5 and LLaVA-OneVision, then ran 15 LoRA ablation runs to find the leverage point for physical intuition.

## Audio direction
- Role: warm steady bed, sparse professional accents
- Music: happy-beats-business-moves-vol-12-by-ende-dot-app.mp3, lane plateau 0.32 (absolute), fade in 0.4 s, fade out over the last 1.5 s
- Music cue guidance: vol-12 preset (109.96 BPM). Strong cues used: 8.74 (degradation reveal), 17.47 (last chip), 22.93 (end-card rule). Scene changes on beats 4.39, 8.74, 15.29, 20.19. Chips on consecutive beats 15.84, 16.38, 16.93, 17.47, then the full set holds 2.3 s.
- Audio-reactive treatment: subtle; amber glow breathes with RMS and bass
- SFX posture: sparse (3 cues), low high-frequency risk
- Audio-coupled moments: title landing (soft impact), degradation reveal (soft impact), name landing (bong)
- Restraint rule: no SFX on chips, no text pulsing, music never above 0.35

## Music cue guidance
Track vol-12, 109.96 BPM; strong cues 8.74, 17.47, 22.93 locked; chips reveal quickly on consecutive beats and hold as a set, per the reading-time rule.

## Storyboard

### Scene 1 - Hook - 4.4s (0.00 to 4.39)
Left: eyebrow "Vision-language models and intuitive physics", the question (lands by 0.9 s), the four properties in amber (lands by 1.9 s). Right: saliency grid plate with push-in, caption "Physics saliency maps: per-patch probe R² for four properties across four pipeline stages".
Sequential/interaction: lines then plate.
Audio intent: clean bed.
Transition mood: soft blur crossfade at 4.39 -> Scene 2

### Scene 2 - Title - 4.35s (4.39 to 8.74)
Rule, eyebrow "Independent research", title, subtitle, pill with model names, "Spring 2026".
Audio intent: soft impact as the title lands.
Transition mood: soft blur crossfade locked to 8.74 -> Scene 3

### Scene 3 - Degradation - 6.55s (8.74 to 15.29)
Wide plate with the four mass saliency panels, headline at 9.29: "Physics information is richest at the encoder output and fades through the LLM." Sub line at 10.37: "Mean R² for mass: 0.145 at the encoder output, 0.004 by LLM layer 16." Holds 4.4 s or more.
Audio intent: soft impact at 8.74.
Transition mood: soft blur crossfade -> Scene 4

### Scene 4 - Evidence - 4.9s (15.29 to 20.19)
Left: layer-by-layer plate, caption "Across 12 ViT layers, mass peaks at layer 1 and stability at layer 10." Right: "By the numbers" and four chips on consecutive beats (15.84, 16.38, 16.93, 17.47), full set held to the crossfade.
Audio intent: quiet.
Transition mood: soft blur crossfade -> Scene 5

### Scene 5 - End card - 4.3s (20.19 to 24.50)
Name, amber rule on the 22.93 cue, site, path, model line. Held to the end, music fades.
Audio intent: one warm bong on the name.
Transition mood: hold.

**Music mood for this video:** steady, clean, warm
**Audio summary:** one clean bed, three soft accents, a breathing glow, a fade under the end card.
