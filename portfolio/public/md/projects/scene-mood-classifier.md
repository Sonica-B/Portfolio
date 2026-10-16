# Scene Mood Classifier: one container, three clouds

Multimodal classifier shipped as an operated MLOps platform.

- Problem: Most course projects stop at a model; this one had to prove the model could be operated reliably across clouds.
- What she did: Shipped a CLIP plus Wav2Vec2 mood classifier as one container with Prometheus, Grafana, GitHub Actions and tested recovery paths.
- What changed: One image runs on GCP, AWS and Azure, standardized ports removed a class of downtime, and two Hugging Face Spaces are live.

> A CLIP plus Wav2Vec2 fusion model that scores the mood of a video or image-and-audio pair, shipped as one container image deployed to GCP, AWS and Azure with monitoring, alerting, CI/CD and tested recovery paths.

- Kind: MLOps
- Period: Aug 2025 to Dec 2025 (completed)
- Affiliation: WPI DS-553 Case Studies in Data Science
- Repository: https://github.com/Sonica-B/Case-Studies
- Live demo: https://huggingface.co/spaces/SonicaB/Scene-Mood-Classifier
- Inference API: https://huggingface.co/spaces/SonicaB/Scene-Mood-Classifier-API

## Problem

Most course projects stop at a model; the goal here was to prove the model can be operated reliably across clouds with measurable recovery behaviour.

## Approach

Gradio UI plus an HTTP inference API with per-class probability logging and latency tracking; Dockerized app and API; Prometheus, node exporter and Grafana dashboards; GitHub Actions workflow chaining with Discord deployment status; per-provider port injection with runtime-aware config.

## Results

- Deployed one container image to GCP, AWS and Azure with monitoring, alerting and CI/CD.
- Built VM bootstrap and recovery paths with auto-restart, health checks and Discord alerting.
- Tested forced crashes, full wipes and network drops, treating recovery time as a metric.
- Standardized port assignment, eliminating an entire class of downtime across providers.
- Published two Hugging Face Spaces: local mode and an inference-API mode with OAuth.

## Key numbers

- Clouds from one image: 3
- Mood scores: 5
- Live Spaces: 2

## Stack

CLIP, Wav2Vec2, Gradio, Docker, GCP, AWS, Azure, Prometheus, Grafana, GitHub Actions, Hugging Face Spaces

Canonical page: https://shreyaboyane.dev/projects/scene-mood-classifier. This markdown: https://shreyaboyane.dev/md/projects/scene-mood-classifier.md. Generated from the site content model, last updated 2026-10-15.
