# RealmWeaver-AI: procedural game asset generator

Stable Diffusion, CVAE-GAN and Wave Function Collapse for Unity.

- Problem: Indie developers spend most of their time building game worlds by hand.
- What she did: Combined Stable Diffusion with LoRA, a CVAE-GAN for tile structure and Wave Function Collapse layouts, placing prefabs automatically in Unity.
- What changed: Assets reached FID 32.4 at 2.7 seconds each and manual integration effort fell 73%.

> A procedural 2D asset framework that generates terrain tiles and props with Stable Diffusion and LoRA, learns tile structure with a CVAE-GAN, lays out biomes with Wave Function Collapse and places prefabs automatically in Unity.

- Kind: Generative AI
- Period: Mar 2025 to Apr 2025 (completed)
- Affiliation: Worcester Polytechnic Institute
- Repository: https://github.com/Sonica-B/RealmWeaver-AI

## Problem

Indie developers spend most of their time building game worlds by hand.

## Approach

VAE-based terrain synthesis, entropy-minimized Wave Function Collapse for biome layouts, LoRA-enhanced latent diffusion for assets, and a classifier-discriminator extension of the CVAE-GAN tuned by ablation for stability and style coherence.

## Results

- Beat baseline procedural methods on realism and diversity: FID 32.4, 2.7 s per asset.
- Cut manual integration effort 73% with biome-aware prefab mapping in Unity.

## Key numbers

- FID: 32.4
- Time per asset: 2.7 s
- Manual effort: -73%

## Stack

Stable Diffusion, LoRA, CVAE-GAN, VAE, Wave Function Collapse, Unity, PyTorch

## Image

![Generated 3D terrain tile rendered from the RealmWeaver pipeline](https://shreyaboyane.dev/projects/realmweaver-ai/terrain.webp)

Canonical page: https://shreyaboyane.dev/projects/realmweaver-ai. This markdown: https://shreyaboyane.dev/md/projects/realmweaver-ai.md. Generated from the site content model, last updated 2026-10-15.
