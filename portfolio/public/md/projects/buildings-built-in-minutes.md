# Buildings Built in Minutes: structure from motion and NeRF

Classical reconstruction of WPI Unity Hall and neural rendering.

> Turns uncalibrated photographs into a metrically reliable 3D asset with a full structure-from-motion pipeline, then implements NeRF end to end to render photorealistic 360-degree orbits of the Lego, Hotdog and Ship scenes.

- Kind: Computer vision
- Period: Feb 2025 to Mar 2025 (completed)
- Affiliation: WPI RBE/CS 549 Computer Vision
- Team: Shreya Boyane with Divam Trivedi
- Repository: https://github.com/Sonica-B/Buildings-Built-in-Minutes

## Problem

Reconstructing a building from phone photos for AR and VR needs both classical geometry and neural rendering while keeping compute modest.

## Approach

Phase 1 in Python and OpenCV: SIFT keypoints and matching, eight-point fundamental and essential matrix estimation with RANSAC, PnP camera poses, linear and nonlinear triangulation and bundle adjustment. Phase 2: NeRF with positional encoding and hierarchical coarse-to-fine volume sampling, evaluated with PSNR and SSIM.

## Results

- Average reprojection error improved from 1.75 to 1.01 pixels across five views after sparse bundle adjustment in SciPy.
- NeRF novel views reached about 60% higher PSNR than the baseline with roughly 40% fewer rendering artifacts; coordinates aligned to SfM poses for consistent scale.
- Reproducibility guards: fixed seeds, deterministic loaders, metric scripts and result caching.

## Key numbers

- Reprojection error: 1.75 to 1.01 px
- PSNR vs baseline: +60%
- Rendering artifacts: -40%

## Stack

Python, OpenCV, SfM, bundle adjustment, NeRF, PyTorch

## Image

![NeRF rendering of the Lego scene rotating 360 degrees](https://shreyaboyane.dev/projects/buildings-built-in-minutes/nerf-lego.webp)

Canonical page: https://shreyaboyane.dev/projects/buildings-built-in-minutes. This markdown: https://shreyaboyane.dev/md/projects/buildings-built-in-minutes.md. Generated from the site content model, last updated 2026-10-27.
