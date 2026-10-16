# Eigenfaces and latent face generation

Probabilistic PCA versus beta-VAE.

- Problem: How much of a face survives a 16-, 32- or 64-dimensional latent, and which model interpolates more smoothly.
- What she did: Trained probabilistic PCA and beta-VAE on 576-dimensional face vectors, then compared reconstructions, latent interpolations and 10x10 sample grids.
- What changed: Latents kept 95%+ variance, 100 novel faces were generated, and decoder sampling cut training time 35% over dense baselines.

> Trained probabilistic PCA and beta-VAE models on 576-dimensional face vectors for unsupervised identity representation and generation, then compared reconstructions and latent interpolations.

- Kind: Machine learning
- Period: Jan 2025 to Feb 2025 (completed)
- Affiliation: Worcester Polytechnic Institute

## Problem

How much of a face survives a 16-, 32- or 64-dimensional latent, and which model interpolates more smoothly.

## Approach

Reduced to latent spaces of 16, 32 and 64 dimensions with 95%+ variance retained, generated 100 novel faces by decoder sampling, and compared models through PCA-projected visualizations and 10x10 output grids.

## Results

- Retained 95%+ variance in 16-, 32- and 64-dimensional latents and generated 100 novel faces.
- Found the VAE showed stronger feature continuity and expressiveness.
- Cut training time 35% over dense baselines with decoder sampling.

## Key numbers

- Variance retained: 95%+
- Novel samples: 100

## Stack

PyTorch, VAE, PCA, unsupervised learning

Canonical page: https://shreyaboyane.dev/projects/face-generation. This markdown: https://shreyaboyane.dev/md/projects/face-generation.md. Generated from the site content model, last updated 2026-10-15.
