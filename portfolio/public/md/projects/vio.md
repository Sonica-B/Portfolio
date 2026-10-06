# VIO: deep visual-inertial odometry via multimodal fusion

Camera plus IMU fusion with a Transformer encoder.

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

- Fusion cut RMSE ATE versus the vision-only model by about 32% on the Infinity trajectory, 34% on Random and 31% on Spiral, with median RPE holding near two units.
- Delivered RMSE ATE 7.9 to 12.1 and median 7.2 to 8.6 with the SO(3) geodesic loss.
- Deployed inference through TorchScript and ONNX to TensorRT: 35% lower per-step latency and 20% less VRAM with RPE and ATE deltas within 3%.

## Key numbers

- RMSE ATE vs vision-only: -31 to -34%
- IMU rate: 1000 Hz
- RGB rate: 100 Hz
- Per-step latency: -35%
- VRAM: -20%

## Stack

PyTorch, LSTM, Transformer, sensor fusion, Blender, OysterSim, TensorRT, ONNX

Canonical page: https://shreyaboyane.dev/projects/vio. This markdown: https://shreyaboyane.dev/md/projects/vio.md. Generated from the site content model, last updated 2026-10-06.
