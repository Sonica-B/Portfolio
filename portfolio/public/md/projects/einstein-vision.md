# Einstein Vision: 3D scene reconstruction for autonomous driving

Perception stack plus TensorRT inference optimization.

> Converts monocular dash-cam video into scene-accurate 3D reconstructions by fusing depth, detection, segmentation, pose and optical-flow models, then renders the scene with the Blender Python API while streaming masks and poses at 30 FPS.

- Kind: Computer vision
- Period: Mar 2025 to Apr 2025 (completed)
- Affiliation: WPI RBE/CS 549 Computer Vision
- Team: Shreya Boyane with Divam Trivedi
- Repository: https://github.com/Sonica-B/EinsteinVision

## Problem

Dash-cam footage lacks interpretable 3D context for perception debugging and for explaining autonomous-driving decisions to humans.

## Approach

Fused MiDaS and Depth Anything monocular depth, Detic open-vocabulary detection with a custom vocabulary, YOLO3D vehicle yaw and boxes, OpenPifPaf and OSX body keypoints, Mask R-CNN lanes and road markings, and RAFT optical flow; calibrated a pinhole camera model and projected detections into world coordinates; synthesized LiDAR-like point clouds and lane contours as ground truth. Rendered through Blender EEVEE with typed asset collections, per-sequence transforms and deterministic replays for side-by-side comparison; input was 13 Tesla Model S dash-cam sequences.

## Results

- Improved 3D placement accuracy 50% and scene realism 75% across 13 driving sequences.
- Deployed detectors through TorchScript to ONNX to TensorRT FP16 with layer fusion: 1.5x multi-object throughput and 35% lower p95 latency, validated with NVIDIA Nsight.
- Documented failure modes honestly: tunnel reflections, rain on the lens, class flicker between SUV and pickup, and optical-flow direction errors at low speed.

## Key numbers

- 3D placement accuracy: +50%
- Scene realism: +75%
- Driving sequences: 13
- Multi-object throughput: 1.5x
- p95 latency: -35%

## Stack

Depth Anything, MiDaS, Mask R-CNN, Detic, OpenPifPaf, YOLO3D, RAFT, Blender Python API, TensorRT, ONNX, Nsight

Canonical page: https://shreyaboyane.dev/projects/einstein-vision. This markdown: https://shreyaboyane.dev/md/projects/einstein-vision.md. Generated from the site content model, last updated 2026-10-06.
