# TumorLytix: unsupervised brain tumor detection and segmentation

CycleGAN plus diffusion on 65,072 MRI images.

> An unsupervised medical-imaging pipeline that pairs CycleGAN image synthesis with diffusion-based refinement to detect and segment brain tumors across 65,072 BraTS2020 MRI images with more than 90% segmentation accuracy and no manual labels.

- Kind: Computer vision
- Period: Oct 2024 to Dec 2024 (completed)
- Affiliation: WPI Deep Learning
- Team: Shreya Boyane with Ankit Gole, Devesh Bhangale, Farhan Seliya, Sarthak Mehta
- Repository: https://github.com/Sonica-B/TumorLytix

## Problem

Supervised tumor segmentation needs large labeled MRI datasets that are expensive to produce, while tumors vary widely in size, shape and position.

## Approach

Train CycleGAN on unpaired scans to synthesize paired healthy and diseased images and flag anomalies where reconstruction fails; refine boundaries with a conditionally guided diffusion model; automate labeling with OpenCV morphological operations and entropy-based filtering.

## Results

- Processed 23,180 healthy and 41,892 diseased slices across T1, T2, T1CE and FLAIR modalities from 369 patients.
- Automated labeling improved baseline precision 15% and stabilized performance across modalities.
- Packaged TorchScript batched mixed-precision inference for 1.6x images per second, profiled with Nsight Compute.
- Synthetic pairing reached 88.2% accuracy on tumor image creation and 73.7% on healthy reconstruction over 75 epochs; versus a plain CycleGAN, 25% fewer artifacts, 30% higher precision and 50% faster convergence.

## Key numbers

- MRI images: 65,072
- Segmentation accuracy: >90%
- Precision over baseline: +15%
- Inference throughput: 1.6x

## Stack

PyTorch, TensorFlow, CycleGAN, diffusion models, OpenCV, TorchScript, Nsight Compute, BraTS2020

Canonical page: https://shreyaboyane.dev/projects/tumorlytix. This markdown: https://shreyaboyane.dev/md/projects/tumorlytix.md. Generated from the site content model, last updated 2026-10-06.
