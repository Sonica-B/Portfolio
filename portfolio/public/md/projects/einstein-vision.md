# Einstein Vision: 3D scene reconstruction for autonomous driving

Perception stack plus TensorRT inference optimization.

- Problem: Dash-cam footage gives no interpretable 3D context for debugging perception or explaining autonomous-driving decisions to humans.
- What she did: Fused depth, detection, segmentation, pose and optical-flow models into Blender 3D reconstructions, then deployed the detectors through TensorRT FP16.
- What changed: Rebuilt 13 dash-cam sequences as Blender 3D scenes, streaming masks and poses at 30 FPS, with 1.5x throughput and p95 latency down 35%.

> Converts monocular dash-cam video into scene-accurate 3D reconstructions by fusing depth, detection, segmentation, pose and optical-flow models, then renders the scene with the Blender Python API while streaming masks and poses at 30 FPS.

- Kind: Computer vision
- Period: Mar 2025 to Apr 2025 (completed)
- Affiliation: WPI RBE/CS 549 Computer Vision
- Team: Shreya Boyane with Divam Trivedi
- Repository: https://github.com/Sonica-B/EinsteinVision

## Problem

Dash-cam footage lacks interpretable 3D context for perception debugging and for explaining autonomous-driving decisions to humans.

## Approach

Fused MiDaS and Depth Anything depth, Detic open-vocabulary detection, YOLO3D vehicle yaw and boxes, OpenPifPaf and OSX keypoints, Mask R-CNN lanes and RAFT optical flow; calibrated a pinhole camera and projected detections into world coordinates; synthesized LiDAR-like point clouds and lane contours as ground truth. Rendered through Blender EEVEE with typed asset collections, per-sequence transforms and deterministic replays across 13 Tesla Model S dash-cam sequences.

## Results

- Placed detections in world coordinates through a calibrated pinhole camera across 13 sequences.
- Deployed detectors through TorchScript, ONNX and TensorRT FP16 with layer fusion.
- Reached 1.5x multi-object throughput and 35% lower p95 latency, validated with NVIDIA Nsight.
- Documented failure modes: tunnel reflections, lens rain, SUV versus pickup flicker, low-speed flow errors.

## Key numbers

- Driving sequences: 13
- Mask and pose stream: 30 FPS
- Multi-object throughput: 1.5x
- p95 latency: -35%

## Stack

Depth Anything, MiDaS, Mask R-CNN, Detic, OpenPifPaf, YOLO3D, RAFT, Blender Python API, TensorRT, ONNX, Nsight

## Pitch video

25 seconds, built from the real repository: https://shreyaboyane.dev/videos/einstein-vision.mp4 (poster: https://shreyaboyane.dev/videos/einstein-vision.webp; thumbnail: https://shreyaboyane.dev/videos/einstein-vision-thumb.webp).

Canonical page: https://shreyaboyane.dev/projects/einstein-vision. This markdown: https://shreyaboyane.dev/md/projects/einstein-vision.md. Written by Shreya Boyane; generated from the site content model, last updated 2026-10-15.
