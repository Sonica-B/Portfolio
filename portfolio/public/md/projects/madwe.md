# MADWE: Multi-Agent Diffusion World Engine

Real-time game asset generation with optimized GPU inference.

- Problem: Real-time game worlds need coherent assets and layouts under strict latency and memory budgets, and hand-authoring them does not scale.
- What she did: Led the AI models for a multi-agent diffusion runtime with LoRA adapters per biome, then optimized inference with ONNX, TensorRT and INT8.
- What changed: p95 latency fell from 200 ms to 95 ms, the runtime generated 120 assets per minute and manual design time dropped 73%.

> A multi-agent generative runtime that routes work to specialist diffusion agents over a shared world-state graph with budget-aware scheduling, generating 120 game assets per minute and cutting manual design time 73%.

- Kind: Generative AI
- Period: Mar 2025 to Aug 2025 (completed)
- Affiliation: Worcester Polytechnic Institute
- Team: Shreya Boyane with Ankit Gole
- Repository: https://github.com/Sonica-B/RealmWeaver-MADWE

## Problem

Real-time game worlds need coherent assets, layouts and styles under strict latency and memory budgets, and hand-authoring them does not scale.

## Approach

Asset agent on Stable Diffusion 1.5 with rank-8 LoRA adapters per biome and latent-consistency few-step inference; Wave Function Collapse for layout constraints; evaluator agent scoring quality; biome-aware prefab mapping into Unity. Shreya led AI models and generation. Unity bridge with batched prefab transfers, caching and request prioritization.

## Results

- Generated 120 game assets per minute and cut manual design time 73%.
- Cut p95 latency 200 ms to 95 ms with ONNX and TensorRT kernel fusion.
- Raised FPS from 60 to 120 and shrank binary size 38%.
- Designed a neural world-state graph and a predictive protocol that pre-warms likely branches.
- Added memory pooling that cut allocation overhead about 73% and peak VRAM about 41%.
- Reached 1.8x throughput and 24% less memory with mixed precision, INT8 and CUDA graphs.
- Held FID 12.3 and CLIP similarity 0.89 under 2 GB VRAM.
- Sustained 31 FPS at 6.2 GB VRAM with PSNR 30.1 dB and 94% tileability.

## Key numbers

- Assets per minute: 120
- Manual design time: -73%
- p95 latency: 200 to 95 ms
- Throughput: 1.8x
- FID: 12.3
- CLIP similarity: 0.89

## Stack

PyTorch, Diffusers, Stable Diffusion, LoRA, ONNX, TensorRT, INT8, CUDA graphs, Unity, Wave Function Collapse

## Pitch video

25 seconds, built from the real repository: https://shreyaboyane.dev/videos/madwe.mp4 (poster: https://shreyaboyane.dev/videos/madwe.webp; thumbnail: https://shreyaboyane.dev/videos/madwe-thumb.webp).

Canonical page: https://shreyaboyane.dev/projects/madwe. This markdown: https://shreyaboyane.dev/md/projects/madwe.md. Written by Shreya Boyane; generated from the site content model, last updated 2026-10-15.
