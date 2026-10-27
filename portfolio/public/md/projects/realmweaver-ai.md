# RealmWeaver-AI: procedural game asset generator

Stable Diffusion, CVAE-GAN and Wave Function Collapse for Unity.

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

- FID 32.4 at 2.7 seconds per asset, surpassing baseline procedural methods in realism and diversity.
- Biome-aware prefab mapping in Unity reduced manual integration effort 73%.

## Key numbers

- FID: 32.4
- Time per asset: 2.7 s
- Manual effort: -73%

## Stack

Stable Diffusion, LoRA, CVAE-GAN, VAE, Wave Function Collapse, Unity, PyTorch

## Image

![Generated 3D terrain tile rendered from the RealmWeaver pipeline](https://shreyaboyane.dev/projects/realmweaver-ai/terrain.webp)

Canonical page: https://shreyaboyane.dev/projects/realmweaver-ai. This markdown: https://shreyaboyane.dev/md/projects/realmweaver-ai.md. Generated from the site content model, last updated 2026-10-27.
