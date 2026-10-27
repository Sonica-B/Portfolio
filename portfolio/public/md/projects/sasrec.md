# SASRec sequential recommender

Transformer next-item ranking in PyTorch.

> A self-attentive sequential recommender with multi-head attention, causal masking and residual feed-forward blocks for next-item ranking, tuned with hyperparameter sweeps and selected by offline metrics.

- Kind: Machine learning
- Period: Apr 2025 to May 2025 (completed)
- Affiliation: Worcester Polytechnic Institute

## Problem

Sparse interaction histories make next-item prediction unstable; the goal was a compact model that holds up under sparsity.

## Approach

Swept dropout 0.05 to 0.5, attention heads 1 to 2 and hidden dimensions 5 to 50, visualized stability across five variants and picked the best checkpoint by nDCG and hit rate.

## Results

- nDCG@10 of 0.3166 and Hit@10 of 0.4913 at epoch 14 with a two-block, 50-dimensional configuration.

## Key numbers

- nDCG@10: 0.3166
- Hit@10: 0.4913

## Stack

PyTorch, Transformers, recommender systems

Canonical page: https://shreyaboyane.dev/projects/sasrec. This markdown: https://shreyaboyane.dev/md/projects/sasrec.md. Generated from the site content model, last updated 2026-10-27.
