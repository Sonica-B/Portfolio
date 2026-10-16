# Glossary notes

Notes on `portfolio/content/glossary.json` (80 terms, all confirmed present in `profile.json`).

## Uncertain meanings

- **DASHSys**: could not confirm what the acronym stands for, so the tip only repeats what the content says (2026 venue, regular paper track); source is null.
- **Sim-CoT**: tip follows the SIM-CoT paper (arXiv 2509.20317), which supervises each latent step through an auxiliary decoder. Confirm that is the variant used in the Latent CoT paper.
- **GQP**: called the Data Science capstone because WPI's GQP page frames it that way; Shreya's degree is the M.S. in Artificial Intelligence.
- **frontier model** and **inference**: no single authoritative page, so source is null.

## Excluded on purpose

- **VLA** appears only in a slug and a repo URL.
- **SLAM, anomaly map, Dice, F1, mAP, BLEU, perplexity** do not appear ("map" hits are Map.AR and saliency maps).
- **precision, recall, bootstrap, latent, drift** carry different meanings across the content (bootstrap is also the CSS framework and a VM bootstrap).
- **Golden Ticket Contest**: no public detail beyond the content.

## Matcher caveats

- Prefer the longest match: "latent chain-of-thought" over "chain-of-thought", "Stable Diffusion" over "diffusion", "CLIP similarity" over "CLIP".
- "Transformers" also sits inside "Hugging Face Transformers" (a library); "CNN" inside "Mask R-CNN".
- Case-insensitive matching lets MATH, ATE, OPT, CLIP, Lambda and poster collide with ordinary words if new content adds them.
- Matches with punctuation (CI/CD, F-1, t-SNE) need "/" and "-" treated as boundaries.

## Left out by the 80-term cap

GAN, VAE, Mask R-CNN, SSD, sensor fusion, IMU, FairEM, permutation testing, FDR correction, HDF5, Hydra, VQA, infrastructure as code, Ansible, GitHub Actions, Snyk, NVIDIA NIM, Step Functions, CUDA graphs, kernel fusion, Nsight, VRAM, throughput, FoGen Workshop, BSF, Algoverse, GRIE, H-1B, multimodal, agentic, ground truth, epoch, LiDAR, nDCG, imitation learning.
