# RoboFusion: ML-driven sensor integration for motion control

Gesture-controlled robotic arm on ROS2.

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

- 93% gesture recognition accuracy on the custom dataset and about 35% better task precision than the sensor-only baseline.
- Sub-500 ms gesture-to-command latency across the full pipeline.
- Production-style ROS2 nodes with deterministic message contracts reusable in downstream robotics projects.

## Key numbers

- Gesture recognition accuracy: 93%
- Gesture-to-command latency: <500 ms
- Gesture samples: 5,000+

## Stack

ROS2, Gazebo, TensorFlow, MediaPipe, OpenCV, MPU6050, sensor fusion

Canonical page: https://shreyaboyane.dev/projects/robofusion. This markdown: https://shreyaboyane.dev/md/projects/robofusion.md. Generated from the site content model, last updated 2026-10-27.
