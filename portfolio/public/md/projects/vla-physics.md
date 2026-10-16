# Where does physics live in vision encoders?

Spatial probing and LoRA ablation of VLM physical reasoning.

- Problem: Vision-language models show surprising physical reasoning yet fail on intuitive physics, and it was unclear where physical information lives inside them.
- What she did: Probed per-patch activations at four stages of Qwen2.5-VL, InternVL 2.5 and LLaVA-OneVision, then ran a five-condition LoRA ablation.
- What changed: Measured information loss across the projection bottleneck, mapped physics saliency and ran 15 LoRA ablations on three benchmarks.

> Probes where physical properties such as mass, friction, elasticity and stability are encoded across the encoder, projection and LLM stages of Qwen2.5-VL, InternVL 2.5 and LLaVA-OneVision, then fine-tunes five LoRA configurations to find the leverage point for physical intuition.

- Kind: Research
- Period: Mar 2026 to May 2026 (completed)
- Affiliation: Independent research
- Repository: https://github.com/Sonica-B/VLAs

## Problem

Vision-language models trained on internet-scale data show surprising physical reasoning yet fail systematically on intuitive physics, and it was unclear where physical information lives in their pipelines.

## Approach

Linear and MLP probes on per-patch activations at four stages using Physion++ ground truth; physics saliency maps as 14x14 heatmaps; R-squared degradation curves across the projection bottleneck; a 3 model x 5 condition factorial LoRA ablation evaluated on PhysBench, GRASP Level 2 and ConservationBench; before-and-after attention analysis.

## Results

- Probed four stages of three VLMs; ran 15 LoRA ablations across three benchmarks.
- Framed four research questions: spatial encoding, pipeline degradation, leverage points and fine-tuning effects.
- Built a Hydra-configured codebase with probing, visualization, evaluation and ablation modules.

## Key numbers

- Vision-language models: 3
- Pipeline stages probed: 4
- LoRA ablation runs: 15
- Benchmarks: 3

## Stack

Qwen2.5-VL, InternVL, LLaVA-OneVision, LoRA, Physion++, PhysBench, probing, Hydra

## Pitch video

25 seconds, built from the real repository: https://shreyaboyane.dev/videos/vla-physics.mp4 (poster: https://shreyaboyane.dev/videos/vla-physics.webp; thumbnail: https://shreyaboyane.dev/videos/vla-physics-thumb.webp).

## Image

![Grid of physics saliency maps over Physion++ scenes](https://shreyaboyane.dev/projects/vla-physics/saliency-grid.webp)

Canonical page: https://shreyaboyane.dev/projects/vla-physics. This markdown: https://shreyaboyane.dev/md/projects/vla-physics.md. Written by Shreya Boyane; generated from the site content model, last updated 2026-10-15.
