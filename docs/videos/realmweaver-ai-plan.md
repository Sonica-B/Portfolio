# Brag Plan: RealmWeaver-AI

## What is this app?
RealmWeaver-AI is a procedural 2D game asset framework that generates terrain tiles and props with Stable Diffusion and LoRA, learns tile structure with a CVAE-GAN, lays out biomes with Wave Function Collapse and places prefabs automatically in Unity. FID 32.4 at 2.7 seconds per asset; biome-aware prefab mapping cut manual integration effort 73%.

## The 9-question rubric
1. What is the app? A procedural game asset generator: diffusion for tiles and props, a CVAE-GAN for tile structure, a VAE for terrain, Wave Function Collapse for biome layouts, Unity for placement.
2. Most impressive claim? FID 32.4 at 2.7 seconds per asset, and 73% less manual integration effort in Unity.
3. Visual hook? The real generated tilemap (`outputs/assets/visualized_map.png`) drifting slowly beside the problem statement.
4. What should be shown from the actual project? The generated biome tiles, props and characters under `outputs/assets`, the VAE heightmap and 3D terrain render under `outputs/generated_terrain`, the biome map under `outputs/generated_maps`, and the visualized tilemap.
5. Shortest satisfying video? About 24 seconds.
6. Tone? Preset `polished` (user-specified). Creative direction: quiet premium systems film; a world assembles from heightmap to tilemap.
7. Audio? Steady clean bed (vol-12), three subtle SFX, subtle audio-reactive glow.
8. Share caption? "RealmWeaver-AI: terrain tiles, props and whole biomes from Stable Diffusion, a CVAE-GAN and Wave Function Collapse, placed automatically in Unity."
9. User flow worth showing? A VAE heightmap becomes a biome map through Wave Function Collapse, tiles are generated per biome, and prefabs are placed in Unity. Scene 4 shows this pipeline with the real outputs.

## The angle
Procedural worlds from Stable Diffusion, CVAE-GAN and Wave Function Collapse into Unity. Open on the problem (indie developers build worlds by hand) beside a real generated map, show the real assets and the four-part stack, prove it with the project's numbers, then walk the terrain pipeline with the real intermediate outputs.

## Hook (first 2-3 seconds)
Eyebrow with the problem statement from the project: "Indie developers spend most of their time building game worlds by hand". Headline "Terrain, props and biomes, generated" rises on the first beat beside a card holding the real tilemap with a slow push-in. At 2.19 s the amber line "2.7 seconds per asset" lands with a soft impact.

## Key moments (the middle)
- The asset grid: eight real outputs (beach, forest, mountain and snow tiles; tree, house, chest; mage) land two per beat beside the stack: Stable Diffusion with LoRA for assets; CVAE-GAN learns tile structure; Wave Function Collapse lays out biomes; prefabs placed automatically in Unity.
- The proof: "73%" counts up (less manual integration effort with biome-aware prefab mapping in Unity), with FID 32.4, the 128 x 128 VAE terrain grid (latent dimension 64) and the six biomes (water, beach, plains, forest, mountain, snow) beside it.
- The pipeline: four real cards, VAE heightmap, 3D terrain render, biome map, visualized tilemap, under "Heightmap to biome map to tilemap" and "Entropy-minimized Wave Function Collapse for biome layouts".

## Outro / punchline
"Shreya Boyane", "shreyaboyane.dev", "/projects/realmweaver-ai". Music fades under it.

## User flow worth showing
Entry: a VAE-sampled heightmap. Key action: thresholds and Wave Function Collapse turn it into a biome map, diffusion fills tiles per biome. Result: a tilemap with prefabs placed in Unity. Scene 4 is this flow with real outputs.

## Tone
- Preset: polished
- Creative direction: quiet premium systems film; a world assembles from heightmap to tilemap
- Interpretation: few scenes, long holds, 0.6 s crossfades, one amber accent; the real tiles carry the color.

## Format: landscape, 1920x1080
## Duration: 24.6 seconds

## Visual identity (from the website)
- Background #121218, text #f4f2ee, secondary #b9b5ae, accent #f0b35c, cards #1b1b24
- Display font Bricolage Grotesque, body Geist (local woff2 from Google Fonts), JetBrains Mono for paths
- Strongest visual element: the visualized tilemap, then the asset grid and the pipeline cards.
- Rules: sentence case, no em dashes anywhere, one accent, no full-frame gradients.

## Share copy (draft)
RealmWeaver-AI: terrain tiles, props and whole biomes from Stable Diffusion, a CVAE-GAN and Wave Function Collapse, placed automatically in Unity. FID 32.4 at 2.7 seconds per asset.

## Audio direction
- Role: sparse professional accents over a steady clean bed
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (109.96 BPM), fade-in to 0.3 by 0.35 s, fade-out 22.6 to 24.6 s
- Music cue guidance: bundled vol-12 preset. Strong cues: 8.74 s (stack row 2), 18.56 s (amber pipeline line), 22.37 s (site). Beat grid: asset tiles two per beat at 5.34, 6.00, 6.56, 7.09; stack rows 8.19, 8.74, 9.29, 9.83; stat rows 14.20, 14.73, 15.29; pipeline cards cascade from 17.05; scene boundaries 4.39, 12.02, 16.93, 21.84.
- Audio-reactive treatment: subtle; bass breathes the amber glow (scale and opacity only).
- SFX posture: sparse; soft impact at 2.15 s (amber hook line), soft impact at 5.30 s (first tiles), soft bong at 21.88 s (end card).
- Restraint rule: nothing on rows, stats, pipeline cards or transitions.

## Storyboard

### Scene 1, Hook, 0.00 to 4.39 s
Left: eyebrow (problem statement) at 0.2 s, headline "Terrain, props and biomes, generated" at 0.56 s, amber rule, amber "2.7 seconds per asset" at 2.19 s with a soft impact. Right: a card with the real visualized tilemap, slow push-in across the scene.
Sequential/interaction: yes, headline then amber line on the beat; slow camera push on the map.
Transition mood: soft crossfade into Scene 2.

### Scene 2, Reveal and real assets, 4.39 to 12.02 s
Header "RealmWeaver-AI", subtitle "Stable Diffusion, CVAE-GAN and Wave Function Collapse for Unity", tag "Procedural game asset generator". Right: 4 x 2 grid of real outputs, two per beat at 5.34, 6.00, 6.56, 7.09, caption `outputs/assets: tiles, objects, characters`. Left: "How it builds a world" rows at 8.19, 8.74 (strong cue), 9.29, 9.83. Holds to 12.02 s.
Transition mood: soft crossfade into Scene 3.

### Scene 3, Proof, 12.02 to 16.93 s
Eyebrow "Biome-aware prefab mapping in Unity". "73" counts up with "%" on the baseline, label "less manual integration effort". Rows at 14.20, 14.73, 15.29: "FID 32.4" realism and diversity over procedural baselines; "128 x 128" VAE terrain grid, latent dimension 64; "6 biomes" water, beach, plains, forest, mountain, snow. Holds to 16.93 s.
Transition mood: soft crossfade into Scene 4.

### Scene 4, Terrain pipeline, 16.93 to 21.84 s
Eyebrow "Terrain pipeline", headline "Heightmap to biome map to tilemap", amber line "Entropy-minimized Wave Function Collapse for biome layouts" on the 18.56 s strong cue. Four real cards cascade from 17.05 s: VAE heightmap, 3D terrain render, biome map, visualized tilemap; caption with the output folders. Holds to 21.84 s.
Transition mood: soft crossfade into the outro.

### Scene 5, Outro, 21.84 to 24.60 s
Name at 21.9 s with a soft bong, amber rule, site on the 22.37 s strong cue, path at 22.7 s. Music fades 22.6 to 24.6 s. No fade to black.

**Music mood for this video:** steady and clean, polished.
**Audio summary:** one low bed from frame 0, three warm soft accents, a subtle bass-driven glow, and a two-second fade under the end card.
