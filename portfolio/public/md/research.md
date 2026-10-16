# Research by Shreya Boyane

2 papers and 3 research positions. Equal contribution is marked with an asterisk.

## Publications

### Interpreting Latent CoT Reasoning as Dynamical Systems

Poster, ICML 2026 FoGen Workshop (Accepted, poster), May 2026. Venue: ICML 2026 Workshop on Foundations of Deep Generative Models: Understanding Memorization, Generalization, and Reasoning. https://openreview.net/forum?id=ZAGsOMAwBV

Authors: Sabari Iyyappan Duraipandian*, Shreya Sanjay Boyane*, Manju Nagesh*, Jerome Francis, Archana Vaidheeswaran, Kevin Zhu. Affiliations: San Jose State University; Worcester Polytechnic Institute; George Mason University; Algoverse AI Research.

Role: Co-first author and lead pipeline engineer (Algoverse AI Research Fellowship). Review: Reviewer rating 6/6, confidence 3/3.

Summary: Latent chain-of-thought trajectories form structured dynamical systems: CODI behaves as a stable attractor, COCONUT as an unstable expanding system, and Sim-CoT supervision tightens both without changing the underlying dynamics.

#### Abstract

Recent latent reasoning methods such as CODI and COCONUT face a fundamental interpretability problem: they carry multiple superimposed candidate traces in hidden space at each step, which obscures how reasoning evolves. We model the sequence of latent tokens as a trajectory in representation space and apply dynamical-systems analysis to characterize reasoning evolution. Using quantitative metrics (step-to-step change, direction consistency, Lyapunov sensitivity) and qualitative projections (UMAP, DMD, PHATE), we show that latent CoT exhibits structured, non-random dynamics with two distinct stability classes.

#### Findings

- CODI behaves as a stable attractor: latent states converge into a bounded region, and shorter, simpler paths correlate with correct answers.
- COCONUT behaves as an unstable expanding system: latent states spread outward across steps, and more latent work correlates with correctness.
- Sim-CoT supervision tightens both behaviours without changing the underlying dynamics.
- COCONUT shows three-attractor compression with a mid-chain direction-consistency hinge at step 3, while CODI behaves as a near period-2 oscillator with 85% of samples carrying at least one unstable DMD mode (41% for COCONUT). Signatures hold across GSM8K and MATH.

#### By the numbers

- 8,792 GSM8K samples and 500 MATH samples
- 768-dimensional latent trajectories across 6 latent steps
- 4 model configurations on GPT-2-small backbones
- 22 quantitative plots per run and 28 of 28 reproducible numeric claims verified

#### Links

- Paper (PDF): https://openreview.net/pdf?id=ZAGsOMAwBV
- OpenReview: https://openreview.net/forum?id=ZAGsOMAwBV
- Project page: https://sabariiyyappan.github.io/Latent-CoT/
- Code: https://github.com/SabariIyyappan/Latent-CoT-Reasoning-as-Dynamical-Systems

#### Figures

![CODI latent trajectories projected onto dominant DMD modes, forming tight clusters](https://shreyaboyane.dev/projects/latent-cot/trajectory-dmd.webp)

CODI trajectories projected onto dominant DMD modes contract toward a bounded region.

![Three-component PHATE embedding of COCONUT latent trajectories colored by step](https://shreyaboyane.dev/projects/latent-cot/trajectory-phate-3d.webp)

COCONUT trajectories in a 3D PHATE embedding spread outward across steps.

![Step-to-step displacement between consecutive latent states](https://shreyaboyane.dev/projects/latent-cot/step2step-change.webp)

Step-to-step change between consecutive latent states.

![Relative divergence under Gaussian input noise at three sigma levels](https://shreyaboyane.dev/projects/latent-cot/perturbation-grid.webp)

Perturbation divergence under Gaussian noise at sigma 0.01, 0.1 and 1.0.

Keywords: mechanistic interpretability, dynamical systems, latent reasoning, LLMs.

### Toward Fairness-Aware Human Feedback for Table Unionability

Submitted, DASHSys 2026 (Submitted), May 2026. Venue: DASHSys 2026, regular paper track. https://github.com/Sonica-B/FairPrep

Authors: Nina Klimenkova*, Shreya Sanjay Boyane*, Roee Shraga. Affiliations: Worcester Polytechnic Institute.

Role: Co-first author, research assistant under Dr. Roee Shraga (BSF Grant 2024022).

Summary: First adaptation of the FairEM framework from entity matching to annotator-level fairness in table union search, showing that human feedback should be treated as conditionally reliable.

#### Abstract

Table union search is a foundational primitive in modern data lakes, and human feedback is increasingly used to supervise it. We adapt the FairEM framework (Shahbazi et al., VLDB 2023) from entity matching to annotator-level fairness and ask whether feedback quality varies systematically across demographic groups. On a 480-row dataset of 60 annotators across 8 questions and 4 survey versions, we find statistically significant disparities that survive multiple-testing correction and five orthogonal cleaning strategies.

#### Findings

- 6 of 10 FairEM metrics flag unfairness against non-native English annotators.
- 25% versus 44% accuracy on hard questions (Fisher exact p = 0.031).
- The non-native, lower-education, young triple intersection persists at p_BH = 0.037 after Benjamini-Hochberg FDR correction.
- Robust across 5 of 5 orthogonal data-cleaning strategies; behavioral disparities exceed demographic ones.

#### By the numbers

- 480-row dataset: 60 annotators x 8 questions x 4 survey versions
- 10 FairEM confusion-matrix metrics
- 10,000-shuffle permutation tests and 10,000-resample stratified bootstrap CIs
- 9 source modules across 5 experimental phases

#### Links

- Code: https://github.com/Sonica-B/FairPrep

Keywords: fairness, human feedback, data lakes, statistics.

## Research positions

### Latent chain-of-thought trajectories as dynamical systems

AI Research Fellow, lead pipeline engineer, Algoverse AI Research Fellowship, Feb 2026 to May 2026. Advisor: Jerome Francis.

Selected for the competitive 12-week Algoverse fellowship; modeled latent chain-of-thought reasoning in LLMs as discrete-time dynamical systems and reproduced two latent-reasoning training methods end to end on GPT-2.

- Applied Dynamic Mode Decomposition, PHATE, UMAP, t-SNE and PCA to 768-dimensional latent trajectories across 8,792 GSM8K and 500 MATH samples, producing 22 quantitative plots per run.
- Reproduced CODI self-distillation (parallel teacher-student with a 3-loss objective) and the COCONUT 4-stage latent curriculum as LoRA adapters (rank 128, alpha 32) on stock GPT-2 with PyTorch, Hugging Face Transformers and PEFT; recovered 99.84% of test samples with a positional overflow guard.
- Engineered the reliability layer: a multi-stage Bash and Python orchestrator with CUDA health polling that stabilized 14+ hour training runs, HDF5 resume-from-cache saving about 90 minutes per recovery, a GPU-resident Kraskov KSG-1 mutual-information estimator, and a safetensors-level checkpoint repair that preserved trained embeddings byte for byte.
- Built a verification harness that passes 28 of 28 reproducible numeric claims on the canonical run.

Methods and tools: PyTorch, Hugging Face Transformers, PEFT/LoRA, DMD, PHATE, UMAP, CUDA, HDF5. Project page: https://shreyaboyane.dev/projects/latent-cot

### FairPrep: demographic fairness for table union search

Research Assistant, Worcester Polytechnic Institute, Jan 2025 to May 2026. Advisor: Dr. Roee Shraga. Grant: BSF Grant 2024022.

First adaptation of the FairEM framework to annotator-level fairness in table union search, with a complete statistical methodology stack.

- Built 9 source modules across 5 experimental phases on a 480-row dataset (60 annotators x 8 questions x 4 survey versions).
- Designed the statistical stack: 10 FairEM confusion-matrix metrics, permutation testing (10,000 shuffles), bootstrap confidence intervals (10,000 stratified resamples), Fisher exact tests, Benjamini-Hochberg FDR correction, and dual-track logistic regression (scikit-learn for interpretation, statsmodels for inference).
- Surfaced statistically significant bias against non-native English annotators on hard questions (25% versus 44% accuracy, p = 0.031), robust across 5 of 5 cleaning strategies.

Methods and tools: statsmodels, scikit-learn, permutation testing, FDR correction, fairness. Project page: https://shreyaboyane.dev/projects/fairprep

### Where does physics live in vision encoders?

Lead researcher, Independent research, Mar 2026 to May 2026.

Spatial probing of physical reasoning across the vision encoder, projection and LLM stages of three vision-language models, plus a factorial LoRA ablation to find the leverage point for physical intuition.

- Trained linear and MLP probes on per-patch activations at four pipeline stages of Qwen2.5-VL-7B, InternVL 2.5-8B and LLaVA-OneVision-7B using Physion++ ground-truth physical properties.
- Produced physics saliency maps and measured information loss across the projection bottleneck.
- Ran a five-condition factorial LoRA ablation (encoder, projection, LLM, encoder plus projection, full model) evaluated on PhysBench, GRASP Level 2 and ConservationBench.

Methods and tools: VLMs, probing, LoRA, Physion++, PhysBench. Project page: https://shreyaboyane.dev/projects/vla-physics

Canonical page: https://shreyaboyane.dev/research. This markdown: https://shreyaboyane.dev/md/research.md. Generated from the site content model, last updated 2026-10-15.
