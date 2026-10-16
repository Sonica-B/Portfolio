# VIO: deep visual-inertial odometry via multimodal fusion

Camera plus IMU fusion with a Transformer encoder.

- Problem: Synthetic video and IMU streams showed scale drift and domain shift that degraded long-horizon odometry.
- What she did: Fused a FlowNet-style CNN, a bi-LSTM over IMU windows and a Transformer encoder into a pose regressor with SO(3) geodesic loss.
- What changed: RMSE ATE fell 31 to 34% versus vision-only, and TensorRT deployment cut per-step latency 35% and VRAM 20%.

> Fuses a FlowNet-style CNN over frames, a two-layer bi-LSTM over IMU windows and a Transformer fusion encoder into a pose regressor trained with an L1 translation and SO(3) geodesic rotation loss on synthetic Blender and OysterSim trajectories.

- Kind: Computer vision
- Period: Mar 2025 to May 2025 (completed)
- Affiliation: WPI RBE/CS 549 Computer Vision
- Team: Shreya Boyane with Divam Trivedi
- Repository: https://github.com/Sonica-B/VIO

## Problem

Synthetic video and IMU streams showed scale drift and domain shift that degraded long-horizon odometry.

## Approach

Automated dataset creation and alignment with OysterSim physics and EVO Umeyama evaluation across six training and three test trajectories at 1000 Hz IMU and 100 Hz RGB; compared vision-only, inertial-only and fusion models.

## Results

- Cut RMSE ATE versus vision-only about 32% (Infinity), 34% (Random), 31% (Spiral).
- Held median RPE near two units across trajectories.
- Reached RMSE ATE 7.9 to 12.1, median 7.2 to 8.6, with SO(3) geodesic loss.
- Deployed through TorchScript, ONNX and TensorRT: 35% lower per-step latency, 20% less VRAM.
- Kept RPE and ATE deltas within 3% after TensorRT deployment.

## Key numbers

- RMSE ATE vs vision-only: -31 to -34%
- IMU rate: 1000 Hz
- RGB rate: 100 Hz
- Per-step latency: -35%
- VRAM: -20%

## Stack

PyTorch, LSTM, Transformer, sensor fusion, Blender, OysterSim, TensorRT, ONNX

## Pitch video

25 seconds, built from the real repository: https://shreyaboyane.dev/videos/vio.mp4 (poster: https://shreyaboyane.dev/videos/vio.webp; thumbnail: https://shreyaboyane.dev/videos/vio-thumb.webp).

Canonical page: https://shreyaboyane.dev/projects/vio. This markdown: https://shreyaboyane.dev/md/projects/vio.md. Written by Shreya Boyane; generated from the site content model, last updated 2026-10-15.
