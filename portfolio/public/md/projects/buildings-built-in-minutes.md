# Buildings Built in Minutes: structure from motion and NeRF

Classical reconstruction of WPI Unity Hall and neural rendering.

- Problem: Reconstructing a building from phone photos for AR and VR needs classical geometry and neural rendering while keeping compute modest.
- What she did: Built a full structure-from-motion pipeline in OpenCV with bundle adjustment, then implemented NeRF end to end with hierarchical sampling.
- What changed: Reprojection error fell from 1.75 to 1.01 pixels, and NeRF views reached about 60% higher PSNR with roughly 40% fewer artifacts.

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

- Cut average reprojection error 1.75 to 1.01 pixels across five views via bundle adjustment.
- Rendered NeRF novel views at about 60% higher PSNR with roughly 40% fewer artifacts.
- Aligned NeRF coordinates to SfM poses for consistent scale.
- Added reproducibility guards: fixed seeds, deterministic loaders, metric scripts and result caching.

## Key numbers

- Reprojection error: 1.75 to 1.01 px
- PSNR vs baseline: +60%
- Rendering artifacts: -40%

## Stack

Python, OpenCV, SfM, bundle adjustment, NeRF, PyTorch

## Image

![NeRF rendering of the Lego scene rotating 360 degrees](https://shreyaboyane.dev/projects/buildings-built-in-minutes/nerf-lego.webp)

Canonical page: https://shreyaboyane.dev/projects/buildings-built-in-minutes. This markdown: https://shreyaboyane.dev/md/projects/buildings-built-in-minutes.md. Generated from the site content model, last updated 2026-10-15.
