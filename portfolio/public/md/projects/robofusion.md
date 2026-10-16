# RoboFusion: ML-driven sensor integration for motion control

Gesture-controlled robotic arm on ROS2.

- Problem: Sensor data alone is too noisy and inconsistent for precise robotic arm control in hazardous, manufacturing and medical settings.
- What she did: Fused MediaPipe hand tracking, a TensorFlow gesture model trained on 5,000+ gestures and MPU6050 IMU angles inside ROS2.
- What changed: Gesture recognition reached 93% with task precision about 35% above the sensor-only baseline and under 500 ms gesture-to-command latency.

> A real-time human-robot interface that controls a robotic arm from hand gestures by fusing MediaPipe hand tracking, a TensorFlow gesture model and MPU6050 IMU angle estimates inside ROS2, with sub-500 ms gesture-to-command latency.

- Kind: Robotics
- Period: Sep 2024 to Dec 2024 (completed)
- Affiliation: Worcester Polytechnic Institute
- Team: Shreya Boyane with Ankit Gole, Harsh Chhajed, Shivam Shinde, Simran Chauhan
- Repository: https://github.com/Sonica-B/RoboFusion

## Problem

Sensor data alone is noisy and inconsistent for precise arm control, which matters in hazardous remote operations, manufacturing and medical robotics.

## Approach

Collected a custom dataset of 5,000+ hand gestures with MediaPipe, trained a gesture-and-angle model, fused predictions with MPU6050 readings to cancel noise, and validated in a Gazebo simulation of the arm.

## Results

- 93% gesture recognition accuracy on a custom dataset of 5,000+ gestures.
- Improved task precision about 35% over the sensor-only baseline.
- Held gesture-to-command latency under 500 ms across the full pipeline.
- Built production-style ROS2 nodes with deterministic message contracts for reuse downstream.

## Key numbers

- Gesture recognition accuracy: 93%
- Gesture-to-command latency: <500 ms
- Gesture samples: 5,000+

## Stack

ROS2, Gazebo, TensorFlow, MediaPipe, OpenCV, MPU6050, sensor fusion

## Pitch video

25 seconds, built from the real repository: https://shreyaboyane.dev/videos/robofusion.mp4 (poster: https://shreyaboyane.dev/videos/robofusion.webp; thumbnail: https://shreyaboyane.dev/videos/robofusion-thumb.webp).

Canonical page: https://shreyaboyane.dev/projects/robofusion. This markdown: https://shreyaboyane.dev/md/projects/robofusion.md. Written by Shreya Boyane; generated from the site content model, last updated 2026-10-15.
