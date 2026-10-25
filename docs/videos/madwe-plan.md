# Brag Plan: MADWE

## What is this app?
MADWE (Multi-Agent Diffusion World Engine) is a multi-agent generative runtime that routes work to specialist diffusion agents over a shared world-state graph with budget-aware scheduling, generating 120 game assets per minute and cutting manual design time 73%. After ONNX and TensorRT kernel fusion it runs at 120 FPS. Built at WPI with Ankit Gole; Shreya led AI models and generation.

## The 9-question rubric
1. What is the app? A real-time game asset generation engine: diffusion agents, LoRA adapters per biome, Wave Function Collapse layouts, an evaluator agent, and a Unity bridge.
2. Most impressive claim? 120 assets per minute, and 120 FPS after TensorRT (p95 latency 200 ms to 95 ms).
3. Visual hook? The number 120 counting up, twice: assets per minute, then frames per second.
4. What should be shown from the actual project? The real training sprites under `data/raw/sprites` (pixel characters, fantasy items, sci-fi items) in a grid, and the real training textures across eight biomes under `data/processed/train/textures`, plus the real counts from `data/processed/metadata/quality_report.txt` (240 textures, 44 sprites, all 512 x 512).
5. Shortest satisfying video? About 24 seconds; the sprite grid needs a beat to land.
6. Tone? Preset `polished` (user-specified). Creative direction: quiet premium systems film; a game world assembles itself in real time.
7. Audio? Steady clean bed (vol-12) at a low level, three subtle SFX (hook line, sprite grid landing, end card), subtle audio-reactive glow.
8. Share caption? "MADWE: a multi-agent diffusion engine that generates 120 game assets a minute and runs at 120 FPS after ONNX and TensorRT kernel fusion."
9. User flow worth showing? Request enters the asset agent (Stable Diffusion 1.5, rank-8 LoRA per biome); Wave Function Collapse lays out the biome; the evaluator agent scores quality; assets map to Unity prefabs. The video shows the generation stack beside real generated-style training assets, then the optimization numbers.

## The angle
Two 120s. A multi-agent diffusion engine that generates 120 game assets a minute, and after TensorRT optimization renders at 120 frames a second. The video opens on the first number, shows real sprites and textures from the repo with the real generation stack, proves the second number with the latency and throughput figures, and closes on the world-state graph and the memory numbers.

## Hook (first 2-3 seconds)
Eyebrow "A multi-agent diffusion engine for game worlds". A huge amber "120" counts up from 0 on the first beat with "assets per minute" on its baseline. At 2.19 s a second display line lands with a soft impact: "and 120 FPS after TensorRT".

## Key moments (the middle)
- The sprite grid: eight real training sprites (8-bit hero, 16-bit mage, modern pixel, legendary sword, healing potion, artifact amulet, plasma rifle, nano medkit) land two per beat in a 4 x 2 grid beside the real generation stack (asset agent on Stable Diffusion 1.5, rank-8 LoRA adapters per biome, Wave Function Collapse for layouts, evaluator agent scores quality).
- The proof: "60" counts up to "120" FPS after ONNX and TensorRT kernel fusion, with p95 latency 200 to 95 ms, 1.8x throughput, and FID 12.3 at CLIP similarity 0.89 under 2 GB VRAM.
- The world engine: "Agents coordinate over a neural world-state graph" with peak VRAM down 41% and allocation overhead down 73%, over a strip of eight real texture biomes from the training set.

## Outro / punchline
"Shreya Boyane", "shreyaboyane.dev", "/projects/madwe". Music fades under it.

## User flow worth showing
Entry: an asset request for a biome. Key action: the asset agent generates with a biome LoRA, Wave Function Collapse constrains the layout, the evaluator scores it. Result: assets mapped into Unity. The centerpiece scene pairs this stack with the real assets.

## Tone
- Preset: polished
- Creative direction: quiet premium systems film; a game world assembles itself in real time
- Interpretation: few scenes, long holds, 0.6 s crossfades, one amber accent, real imagery carries the color; the only energy spikes are the two count-ups and the beat-aligned grid.

## Format: landscape, 1920x1080
## Duration: 24.6 seconds

## Visual identity (from the website)
- Background: #121218
- Accent: #f0b35c
- Text: #f4f2ee; secondary #b9b5ae
- Display font: Bricolage Grotesque (local woff2 from Google Fonts)
- Body font: Geist (local woff2 from Google Fonts)
- Mono voice for paths and indices: JetBrains Mono (bundled)
- Strongest visual element: the real sprite grid; the texture biome strip is the second real visual.
- Rules: sentence case, no em dashes anywhere, one accent, no full-frame gradients.

## Share copy (draft)
MADWE: a multi-agent diffusion engine that generates 120 game assets a minute and runs at 120 FPS after ONNX and TensorRT kernel fusion.

## Audio direction
- Role: sparse professional accents over a steady clean bed
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (109.96 BPM)
- Music treatment: 0.35 s fade-in to 0.3, fade-out over the last 2 seconds
- Music cue guidance: preset `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.md`. Strong cues targeted: 8.74 s (stack row 2 lands), 18.56 s (memory line lands), 22.37 s (site lands). Beat grid: sprite tiles two per beat at 5.34, 6.00, 6.56, 7.09; stack rows at 8.19, 8.74, 9.29, 9.83; stat rows at 14.20, 14.73, 15.29; scene boundaries on beats 4.39, 12.02, 16.93, 21.84.
- Audio-reactive treatment: subtle; bass breathes the amber glow (scale and opacity only). No waveforms, no bars.
- SFX posture: sparse, three warm low-risk cues at or under 0.55
- Audio-coupled moments: hook second line (soft impact), first sprite pair landing (soft impact), end card (soft bong)
- Restraint rule: nothing on the stat rows, stack rows, texture strip or transitions.

## Storyboard

### Scene 1, Hook, 0.00 to 4.39 s
Eyebrow at 0.2 s. "120" counts 0 to 120 from 0.56 s over 1.2 s (display, 230 px, amber) while "assets per minute" rises on its baseline at 1.0 s. Amber rule at 1.4 s. At 2.19 s "and 120 FPS after TensorRT" (display, 96 px) rises in with a soft impact. Holds to 4.39 s.
Sequential/interaction: yes, count-up then a second line on the beat.
Audio intent: calm bed, one soft impact.
Audio-coupled idea: beat-aligned second line at 2.19 s.
Transition mood: soft crossfade into Scene 2.

### Scene 2, Reveal and real sprites, 4.39 to 12.02 s
Header: "MADWE" wordmark, "Multi-Agent Diffusion World Engine", amber tag "Assets mapped into Unity". Right: a 4 x 2 grid of real training sprites, two tiles per beat at 5.34, 6.00, 6.56, 7.09, each with its real name; caption `data/raw/sprites: pixel_characters, fantasy_items, sci_fi_items`. Left: "How it generates" with four rows at 8.19, 8.74 (strong cue), 9.29, 9.83: "Asset agent on Stable Diffusion 1.5", "Rank-8 LoRA adapters per biome", "Wave Function Collapse for layouts", "Evaluator agent scores quality". Full set holds to 12.02 s.
Sequential/interaction: yes, tiles then rows on the beat grid.
Audio intent: bed carries; one soft impact on the first tile pair.
Audio-coupled idea: beat-grid tiles and rows; row 2 beat-locked at 8.74 s.
Transition mood: soft crossfade into Scene 3.

### Scene 3, Proof, 12.02 to 16.93 s
Eyebrow "After ONNX and TensorRT kernel fusion". "60" counts up to "120" (display, 244 px, amber) with "FPS" on the baseline from 12.2 s over 1.4 s; label "frames per second, up from 60". Right: stat rows at 14.20, 14.73, 15.29: "200 to 95 ms" p95 latency; "1.8x" throughput with INT8 and CUDA graphs; "FID 12.3" CLIP similarity 0.89, under 2 GB VRAM. Holds to 16.93 s.
Sequential/interaction: yes, count-up then three rows.
Audio intent: bed only.
Transition mood: soft crossfade into Scene 4.

### Scene 4, World engine, 16.93 to 21.84 s
Eyebrow "World-state graph", headline "Agents coordinate over a neural world-state graph", amber line "Peak VRAM down 41%, allocation overhead down 73%" on the 18.56 s strong cue. Below: a strip of eight real texture tiles (casual bright, cyberpunk city, fantasy forest, horror mansion, post apocalypse, retro arcade, steampunk industrial, underwater depths) cascading in at 17.05 s, with the caption "Eight training biomes, 240 textures and 44 sprites, all 512 x 512". Holds to 21.84 s.
Sequential/interaction: yes, texture cascade.
Audio intent: calm.
Audio-coupled idea: amber line beat-locked at 18.56 s.
Transition mood: soft crossfade into the outro.

### Scene 5, Outro, 21.84 to 24.60 s
"Shreya Boyane" at 21.9 s with a soft bong, amber rule, "shreyaboyane.dev" on the 22.37 s strong cue, "/projects/madwe" at 22.7 s. Music fades 22.6 to 24.6 s. No fade to black.

**Music mood for this video:** steady and clean, polished.
**Audio summary:** one low bed from frame 0, three warm soft accents, a subtle bass-driven glow, and a two-second fade under the end card.
