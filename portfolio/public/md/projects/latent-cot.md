# Interpreting Latent CoT Reasoning as Dynamical Systems

Mechanistic interpretability paper, ICML 2026 FoGen Workshop poster.

- Problem: Existing interpretability tools cannot explain how latent chain-of-thought reasoning evolves from one step to the next.
- What she did: Modeled 768-dimensional latent trajectories as discrete-time dynamical systems across 8,792 GSM8K and 500 MATH samples on GPT-2.
- What changed: CODI behaves as a stable attractor and COCONUT as an unstable expanding system; accepted as an ICML 2026 FoGen poster, rated 6 of 6.

> Treats each latent thought token of a chain-of-thought language model as a state in a discrete-time trajectory and applies dynamical-systems analysis to 768-dimensional reasoning trajectories across 8,792 GSM8K and 500 MATH samples.

- Kind: Research
- Period: Feb 2026 to May 2026 (completed)
- Affiliation: Algoverse AI Research Fellowship
- Team: Shreya Boyane with Sabari Iyyappan Duraipandian, Manju Nagesh, Jerome Francis, Archana Vaidheeswaran, Kevin Zhu
- Recognition: Poster, ICML 2026 FoGen Workshop
- Repository: https://github.com/SabariIyyappan/Latent-CoT-Reasoning-as-Dynamical-Systems
- Paper (PDF): https://openreview.net/pdf?id=ZAGsOMAwBV
- Project page: https://sabariiyyappan.github.io/Latent-CoT/
- OpenReview: https://openreview.net/forum?id=ZAGsOMAwBV

## Problem

Latent reasoning methods such as CODI and COCONUT keep multiple superimposed candidate traces in hidden space at every step, so existing mechanistic tools reveal compression and shortcuts but cannot explain how reasoning evolves from one latent step to the next.

## Approach

Model the six latent hidden states as a trajectory; measure step-to-step change, direction consistency, arc length, a Lyapunov surrogate and perturbation divergence; project with DMD, PHATE, UMAP, PCA and t-SNE across four model configurations (CODI and COCONUT, vanilla and Sim-CoT) on GPT-2-small.

## Results

- Showed CODI acts as a stable attractor and COCONUT as an unstable expanding system.
- Found Sim-CoT supervision tightens both systems without changing the underlying dynamics.
- Reproduced CODI self-distillation and the COCONUT four-stage curriculum as rank-128 LoRA adapters with PEFT.
- Built CUDA health-polling orchestration that stabilized 14+ hour training runs.
- Added HDF5 resume-from-cache, a GPU-resident Kraskov KSG-1 mutual-information estimator and byte-exact safetensors repair.
- Verified 28 of 28 reproducible numeric claims; fixed seeds, greedy decoding, pinned dependencies.

## Key numbers

- GSM8K samples: 8,792
- Trajectory dimension: 768
- Samples with an unstable DMD mode, COCONUT vs CODI: 41% vs 85%
- Verified claims: 28 of 28
- Reviewer rating: 6 of 6

## Stack

PyTorch, Hugging Face Transformers, PEFT, LoRA, DMD, PHATE, UMAP, CUDA, HDF5, mechanistic interpretability

## Publication

Interpreting Latent CoT Reasoning as Dynamical Systems. Poster, ICML 2026 FoGen Workshop, May 2026. Authors: Sabari Iyyappan Duraipandian, Shreya Sanjay Boyane, Manju Nagesh, Jerome Francis, Archana Vaidheeswaran, Kevin Zhu. Latent chain-of-thought trajectories form structured dynamical systems: CODI behaves as a stable attractor, COCONUT as an unstable expanding system, and Sim-CoT supervision tightens both without changing the underlying dynamics.

- Paper (PDF): https://openreview.net/pdf?id=ZAGsOMAwBV
- OpenReview: https://openreview.net/forum?id=ZAGsOMAwBV
- Project page: https://sabariiyyappan.github.io/Latent-CoT/
- Code: https://github.com/SabariIyyappan/Latent-CoT-Reasoning-as-Dynamical-Systems

## Pitch video

25 seconds, built from the real repository: https://shreyaboyane.dev/videos/latent-cot.mp4 (poster: https://shreyaboyane.dev/videos/latent-cot.webp; thumbnail: https://shreyaboyane.dev/videos/latent-cot-thumb.webp).

## Image

![3D PHATE embedding of COCONUT latent reasoning trajectories colored by step](https://shreyaboyane.dev/projects/latent-cot/trajectory-phate-3d.webp)

Canonical page: https://shreyaboyane.dev/projects/latent-cot. This markdown: https://shreyaboyane.dev/md/projects/latent-cot.md. Written by Shreya Boyane; generated from the site content model, last updated 2026-10-15.
