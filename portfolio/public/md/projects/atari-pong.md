# Behavioral cloning in Atari Pong

Imitation learning with a 3-layer CNN.

> A supervised imitation-learning pipeline that clones an expert Pong policy from Arcade Learning Environment demonstrations with a three-layer convolutional network.

- Kind: Reinforcement learning
- Period: Sep 2024 to Oct 2024 (completed)
- Affiliation: Worcester Polytechnic Institute

## Problem

Can a small CNN reproduce expert paddle control from demonstrations alone without reward signals.

## Approach

Trained on expert frames for 100 epochs, validated through loss trajectories and gameplay video logs, and measured action latency.

## Results

- 87.55% test accuracy with minimal overfitting; the cloned agent tracks the paddle with sub-500 ms action latency.

## Key numbers

- Test accuracy: 87.55%
- Action latency: <500 ms

## Stack

TensorFlow, OpenCV, CNN, imitation learning, ALE

Canonical page: https://shreyaboyane.dev/projects/atari-pong. This markdown: https://shreyaboyane.dev/md/projects/atari-pong.md. Generated from the site content model, last updated 2026-10-27.
