# SASRec sequential recommender

Transformer next-item ranking in PyTorch.

- Problem: Sparse interaction histories make next-item prediction unstable, so the goal was a compact model that holds up under sparsity.
- What she did: Built a self-attentive sequential recommender in PyTorch and swept dropout, attention heads and hidden size across five variants.
- What changed: The best checkpoint reached nDCG@10 0.3166 and Hit@10 0.4913 at epoch 14 with two blocks and 50 dimensions.

> A self-attentive sequential recommender with multi-head attention, causal masking and residual feed-forward blocks for next-item ranking, tuned with hyperparameter sweeps and selected by offline metrics.

- Kind: Machine learning
- Period: Apr 2025 to May 2025 (completed)
- Affiliation: Worcester Polytechnic Institute

## Problem

Sparse interaction histories make next-item prediction unstable; the goal was a compact model that holds up under sparsity.

## Approach

Swept dropout 0.05 to 0.5, attention heads 1 to 2 and hidden dimensions 5 to 50, visualized stability across five variants and picked the best checkpoint by nDCG and hit rate.

## Results

- Reached nDCG@10 0.3166 and Hit@10 0.4913 at epoch 14 with two blocks, 50 dimensions.
- Compared five variants by nDCG and hit rate after sweeping dropout, heads and width.

## Key numbers

- nDCG@10: 0.3166
- Hit@10: 0.4913

## Stack

PyTorch, Transformers, recommender systems

Canonical page: https://shreyaboyane.dev/projects/sasrec. This markdown: https://shreyaboyane.dev/md/projects/sasrec.md. Written by Shreya Boyane; generated from the site content model, last updated 2026-10-15.
