# RealmWeaver (MADWE): multi-agent diffusion world engine

Game-world generation on a laptop GPU, every number from a benchmark report.

> A game-world engine that turns a biome description into seamless textures, constraint-valid tile layouts and Unity-ready chunks. Rebuilt in 2026 from a 2025 team prototype, it generates a 512 px texture in 0.37 s on a laptop GPU, and every number it reports comes from a reproducible benchmark.

- Kind: Generative AI
- Period: Mar 2025 to Oct 2026 (completed)
- Affiliation: Worcester Polytechnic Institute (2025 prototype), independent rebuild (2026)
- Team: Shreya Boyane with Ankit Gole
- Repository: https://github.com/Sonica-B/RealmWeaver-MADWE
- Benchmark report: https://github.com/Sonica-B/RealmWeaver-MADWE/blob/feat/mvp-2026/reports/bench-20261006-045936.json
- 2026 rebuild pull request: https://github.com/Sonica-B/RealmWeaver-MADWE/pull/4

## Problem

Real-time game worlds need coherent assets, layouts and styles under strict latency and memory budgets. The 2025 prototype quoted targets it had never measured, and the 2026 rebuild set out to make every claim a benchmark output.

## Approach

Asset agent on Stable Diffusion 1.5 with Hyper-SD 4-step and 8-step LoRAs, rank-8 biome LoRAs and circular padding for seamless tiles. A memory pool replays the UNet step from a captured CUDA graph. A numpy Wave Function Collapse solver with AC-3 propagation learns adjacency from example maps. A networkx world state graph scores style coherence with DINOv2 vectors, an order-2 Markov predictor and byte-capped LRU scheduler prewarm the chunks a player is heading toward, and a FastAPI and WebSocket bridge streams it all to a Unity package. Shreya led AI models and generation in 2025 and rebuilt the engine in 2026.

## Results

- Measured 0.37 s per 512 px texture (p50 over 100 assets, p95 0.37 s) and 165 assets per minute at 3.1 GB peak VRAM on an RTX 5070 Ti laptop GPU.
- CUDA-graph replay over pooled memory cut per-asset latency 41%, from 0.63 s to 0.37 s, in a pool on versus pool off comparison over 100 assets.
- The Markov prewarm predictor reached 99% top-3 hit rate on the next chunk against 56% for a ring baseline, and Wave Function Collapse solves a 16 by 16 chunk in 20.5 ms.
- Shipped with 228 tests, CI with linting and secret scanning and a Docker GPU image, plus spikes for a local Qwen3-4B NPC runtime at 0.38 s per turn, TRELLIS.2 3D props and 30 km diffusion terrain tiles.

## Key numbers

- Seconds per 512 px asset, p50: 0.37
- Assets per minute: 165
- Latency cut by the CUDA-graph pool: 41%
- Peak VRAM: 3.1 GB
- Prewarm hit rate vs baseline: 99% vs 56%
- Tests: 228

## Stack

PyTorch, Diffusers, Stable Diffusion, Hyper-SD, LoRA, CUDA graphs, DINOv2, Wave Function Collapse, FastAPI, WebSocket, Unity, Docker, llama.cpp

## Image

![A 30.7 km terrain tile from the RealmWeaver terrain spike, hillshaded height with rivers traced over it](https://shreyaboyane.dev/projects/madwe/terrain-overview.webp)

Canonical page: https://shreyaboyane.dev/projects/madwe. This markdown: https://shreyaboyane.dev/md/projects/madwe.md. Generated from the site content model, last updated 2026-10-27.
