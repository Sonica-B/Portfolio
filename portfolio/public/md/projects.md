# Projects by Shreya Boyane

23 projects, featured work first. Kinds: Research, Production system, Computer vision, Generative AI, MLOps, LLM systems, Developer tooling, Robotics, NLP, Machine learning, Reinforcement learning, Augmented reality, Web. Each entry links to a full page with the problem, approach, results and stack.

## Interpreting Latent CoT Reasoning as Dynamical Systems

Mechanistic interpretability paper, ICML 2026 FoGen Workshop poster. Research, Feb 2026 to May 2026, Algoverse AI Research Fellowship. Poster, ICML 2026 FoGen Workshop.

Treats each latent thought token of a chain-of-thought language model as a state in a discrete-time trajectory and applies dynamical-systems analysis to 768-dimensional reasoning trajectories across 8,792 GSM8K and 500 MATH samples.

Key numbers: GSM8K samples: 8,792; Trajectory dimension: 768; Samples with an unstable DMD mode, COCONUT vs CODI: 41% vs 85%; Verified claims: 28 of 28; Reviewer rating: 6 of 6.

Stack: PyTorch, Hugging Face Transformers, PEFT, LoRA, DMD, PHATE, UMAP, CUDA, HDF5, mechanistic interpretability.

Details: https://shreyaboyane.dev/projects/latent-cot (markdown: https://shreyaboyane.dev/md/projects/latent-cot.md). Code: https://github.com/SabariIyyappan/Latent-CoT-Reasoning-as-Dynamical-Systems

## SkipLegal: multi-agent H-1B document intelligence

Production system for Crossing, Data Science GQP MVP. Production system, Aug 2025 to Dec 2025, Crossing x WPI industry-sponsored Graduate Qualifying Project. Data Science GQP MVP, December 2025.

A four-agent LLM pipeline on AWS that turns messy multi-format H-1B petition packages into schema-validated JSON and a single attorney-ready QC report, cutting review from 3 to 4 days to about 5 to 10 minutes.

Key numbers: Review time: 3 to 4 days down to 5 to 10 min; Structural accuracy: 95 to 99%; Missing-document detection: 99 to 100%; Rules across fields: 50+ over 45+; Hours freed per firm per season: about 2,000; Cost per case: 50 to 70% lower.

Stack: LangGraph, Amazon Bedrock, AWS Lambda, Step Functions, S3, EventBridge, Textract, Pydantic, RAGAS, FastAPI, Prometheus.

Details: https://shreyaboyane.dev/projects/skiplegal (markdown: https://shreyaboyane.dev/md/projects/skiplegal.md). Code: https://github.com/Sonica-B/GQP-SkipLegal

## Einstein Vision: 3D scene reconstruction for autonomous driving

Perception stack plus TensorRT inference optimization. Computer vision, Mar 2025 to Apr 2025, WPI RBE/CS 549 Computer Vision.

Converts monocular dash-cam video into scene-accurate 3D reconstructions by fusing depth, detection, segmentation, pose and optical-flow models, then renders the scene with the Blender Python API while streaming masks and poses at 30 FPS.

Key numbers: 3D placement accuracy: +50%; Scene realism: +75%; Driving sequences: 13; Multi-object throughput: 1.5x; p95 latency: -35%.

Stack: Depth Anything, MiDaS, Mask R-CNN, Detic, OpenPifPaf, YOLO3D, RAFT, Blender Python API, TensorRT, ONNX, Nsight.

Details: https://shreyaboyane.dev/projects/einstein-vision (markdown: https://shreyaboyane.dev/md/projects/einstein-vision.md). Code: https://github.com/Sonica-B/EinsteinVision

## RealmWeaver (MADWE): multi-agent diffusion world engine

Game-world generation on a laptop GPU, every number from a benchmark report. Generative AI, Mar 2025 to Oct 2026, Worcester Polytechnic Institute (2025 prototype), independent rebuild (2026).

A game-world engine that turns a biome description into seamless textures, constraint-valid tile layouts and Unity-ready chunks. Rebuilt in 2026 from a 2025 team prototype, it generates a 512 px texture in 0.37 s on a laptop GPU, and every number it reports comes from a reproducible benchmark.

Key numbers: Seconds per 512 px asset, p50: 0.37; Assets per minute: 165; Latency cut by the CUDA-graph pool: 41%; Peak VRAM: 3.1 GB; Prewarm hit rate vs baseline: 99% vs 56%; Tests: 228.

Stack: PyTorch, Diffusers, Stable Diffusion, Hyper-SD, LoRA, CUDA graphs, DINOv2, Wave Function Collapse, FastAPI, WebSocket, Unity, Docker, llama.cpp.

Details: https://shreyaboyane.dev/projects/madwe (markdown: https://shreyaboyane.dev/md/projects/madwe.md). Code: https://github.com/Sonica-B/RealmWeaver-MADWE

## TumorLytix: unsupervised brain tumor detection and segmentation

CycleGAN plus diffusion on 65,072 MRI images. Computer vision, Oct 2024 to Dec 2024, WPI Deep Learning.

An unsupervised medical-imaging pipeline that pairs CycleGAN image synthesis with diffusion-based refinement to detect and segment brain tumors across 65,072 BraTS2020 MRI images with more than 90% segmentation accuracy and no manual labels.

Key numbers: MRI images: 65,072; Segmentation accuracy: >90%; Precision over baseline: +15%; Inference throughput: 1.6x.

Stack: PyTorch, TensorFlow, CycleGAN, diffusion models, OpenCV, TorchScript, Nsight Compute, BraTS2020.

Details: https://shreyaboyane.dev/projects/tumorlytix (markdown: https://shreyaboyane.dev/md/projects/tumorlytix.md). Code: https://github.com/Sonica-B/TumorLytix

## Scene Mood Classifier: one container, three clouds

Multimodal classifier shipped as an operated MLOps platform. MLOps, Aug 2025 to Dec 2025, WPI DS-553 Case Studies in Data Science.

A CLIP plus Wav2Vec2 fusion model that scores the mood of a video or image-and-audio pair, shipped as one container image deployed to GCP, AWS and Azure with monitoring, alerting, CI/CD and tested recovery paths.

Key numbers: Clouds from one image: 3; Mood scores: 5; Live Spaces: 2.

Stack: CLIP, Wav2Vec2, Gradio, Docker, GCP, AWS, Azure, Prometheus, Grafana, GitHub Actions, Hugging Face Spaces.

Details: https://shreyaboyane.dev/projects/scene-mood-classifier (markdown: https://shreyaboyane.dev/md/projects/scene-mood-classifier.md). Code: https://github.com/Sonica-B/Case-Studies

## FairPrep: fairness-aware human feedback for table unionability

Co-first-author paper submitted to DASHSys 2026. Research, Jan 2025 to May 2026, Worcester Polytechnic Institute, BSF Grant 2024022.

The first adaptation of the FairEM framework from entity matching to annotator-level fairness in table union search, finding statistically significant bias against non-native English annotators on hard questions.

Key numbers: Annotators: 60; Metrics flagging unfairness: 6 of 10; Accuracy gap on hard questions: 25% vs 44%; Fisher exact p: 0.031.

Stack: Python, statsmodels, scikit-learn, permutation testing, bootstrap, FDR correction, fairness.

Details: https://shreyaboyane.dev/projects/fairprep (markdown: https://shreyaboyane.dev/md/projects/fairprep.md). Code: https://github.com/Sonica-B/FairPrep

## Where does physics live in vision encoders?

Spatial probing and LoRA ablation of VLM physical reasoning. Research, Mar 2026 to May 2026, Independent research.

Probes where physical properties such as mass, friction, elasticity and stability are encoded across the encoder, projection and LLM stages of Qwen2.5-VL, InternVL 2.5 and LLaVA-OneVision, then fine-tunes five LoRA configurations to find the leverage point for physical intuition.

Key numbers: Vision-language models: 3; Pipeline stages probed: 4; LoRA ablation runs: 15; Benchmarks: 3.

Stack: Qwen2.5-VL, InternVL, LLaVA-OneVision, LoRA, Physion++, PhysBench, probing, Hydra.

Details: https://shreyaboyane.dev/projects/vla-physics (markdown: https://shreyaboyane.dev/md/projects/vla-physics.md). Code: https://github.com/Sonica-B/VLAs

## Medical Triage HIL: confidence-aware LLM triage

Human-in-the-loop emergency severity prediction. LLM systems, Jan 2025 to Aug 2025, Worcester Polytechnic Institute.

Local LLMs assign Emergency Severity Index levels, reason about handoff risk and track confidence as more patient questions are revealed, with human-in-the-loop review on high-risk escalations.

Key numbers: Triage precision: +20%; False escalations: -40%; Hallucinations: -50%; Early critical-case detection: +60%.

Stack: Python, PyTorch, scikit-learn, Ollama, LangChain, calibration, HITL.

Details: https://shreyaboyane.dev/projects/medical-triage (markdown: https://shreyaboyane.dev/md/projects/medical-triage.md). Code: https://github.com/Sonica-B/Medical-Triage-HIL

## AutoGit-AI: VS Code extension with secret scanning

Shipped on the VS Code Marketplace. Developer tooling, May 2025 to present, Open source.

Save a file and AutoGit stages it, writes an AI commit message with GitHub Copilot, scans the diff for leaked secrets and pushes. The only auto-commit extension with a built-in secret scanner that blocks keys, tokens and passwords before they reach the remote.

Key numbers: Secret pattern families: 10+; License: Apache-2.0; Minimum VS Code: 1.90.

Stack: TypeScript, JavaScript, VS Code Extension API, GitHub Copilot, Git, secret scanning.

Details: https://shreyaboyane.dev/projects/autogit (markdown: https://shreyaboyane.dev/md/projects/autogit.md). Code: https://github.com/Sonica-B/AutoGit

## VIO: deep visual-inertial odometry via multimodal fusion

Camera plus IMU fusion with a Transformer encoder. Computer vision, Mar 2025 to May 2025, WPI RBE/CS 549 Computer Vision.

Fuses a FlowNet-style CNN over frames, a two-layer bi-LSTM over IMU windows and a Transformer fusion encoder into a pose regressor trained with an L1 translation and SO(3) geodesic rotation loss on synthetic Blender and OysterSim trajectories.

Key numbers: RMSE ATE vs vision-only: -31 to -34%; IMU rate: 1000 Hz; RGB rate: 100 Hz; Per-step latency: -35%; VRAM: -20%.

Stack: PyTorch, LSTM, Transformer, sensor fusion, Blender, OysterSim, TensorRT, ONNX.

Details: https://shreyaboyane.dev/projects/vio (markdown: https://shreyaboyane.dev/md/projects/vio.md). Code: https://github.com/Sonica-B/VIO

## RoboFusion: ML-driven sensor integration for motion control

Gesture-controlled robotic arm on ROS2. Robotics, Sep 2024 to Dec 2024, Worcester Polytechnic Institute.

A real-time human-robot interface that controls a robotic arm from hand gestures by fusing MediaPipe hand tracking, a TensorFlow gesture model and MPU6050 IMU angle estimates inside ROS2, with sub-500 ms gesture-to-command latency.

Key numbers: Gesture recognition accuracy: 93%; Gesture-to-command latency: <500 ms; Gesture samples: 5,000+.

Stack: ROS2, Gazebo, TensorFlow, MediaPipe, OpenCV, MPU6050, sensor fusion.

Details: https://shreyaboyane.dev/projects/robofusion (markdown: https://shreyaboyane.dev/md/projects/robofusion.md). Code: https://github.com/Sonica-B/RoboFusion

## Buildings Built in Minutes: structure from motion and NeRF

Classical reconstruction of WPI Unity Hall and neural rendering. Computer vision, Feb 2025 to Mar 2025, WPI RBE/CS 549 Computer Vision.

Turns uncalibrated photographs into a metrically reliable 3D asset with a full structure-from-motion pipeline, then implements NeRF end to end to render photorealistic 360-degree orbits of the Lego, Hotdog and Ship scenes.

Key numbers: Reprojection error: 1.75 to 1.01 px; PSNR vs baseline: +60%; Rendering artifacts: -40%.

Stack: Python, OpenCV, SfM, bundle adjustment, NeRF, PyTorch.

Details: https://shreyaboyane.dev/projects/buildings-built-in-minutes (markdown: https://shreyaboyane.dev/md/projects/buildings-built-in-minutes.md). Code: https://github.com/Sonica-B/Buildings-Built-in-Minutes

## TrendED Pathfinder: career recommender

NLP role matching and skill-gap learning paths. NLP, Sep 2024 to Nov 2024, Worcester Polytechnic Institute.

An NLP engine that matches resumes to roles with TF-IDF and cosine similarity, calibrates rankings with supervised classifiers, and recommends courses that close the skill gaps it finds.

Key numbers: Job descriptions: 10,000+; Match accuracy: 95%; NLP precision: 90%.

Stack: Python, TF-IDF, scikit-learn, TensorFlow, BeautifulSoup, NLP.

Details: https://shreyaboyane.dev/projects/trended-pathfinder (markdown: https://shreyaboyane.dev/md/projects/trended-pathfinder.md). Code: https://github.com/Sonica-B/TrendED

## RealmWeaver-AI: procedural game asset generator

Stable Diffusion, CVAE-GAN and Wave Function Collapse for Unity. Generative AI, Mar 2025 to Apr 2025, Worcester Polytechnic Institute.

A procedural 2D asset framework that generates terrain tiles and props with Stable Diffusion and LoRA, learns tile structure with a CVAE-GAN, lays out biomes with Wave Function Collapse and places prefabs automatically in Unity.

Key numbers: FID: 32.4; Time per asset: 2.7 s; Manual effort: -73%.

Stack: Stable Diffusion, LoRA, CVAE-GAN, VAE, Wave Function Collapse, Unity, PyTorch.

Details: https://shreyaboyane.dev/projects/realmweaver-ai (markdown: https://shreyaboyane.dev/md/projects/realmweaver-ai.md). Code: https://github.com/Sonica-B/RealmWeaver-AI

## SASRec sequential recommender

Transformer next-item ranking in PyTorch. Machine learning, Apr 2025 to May 2025, Worcester Polytechnic Institute.

A self-attentive sequential recommender with multi-head attention, causal masking and residual feed-forward blocks for next-item ranking, tuned with hyperparameter sweeps and selected by offline metrics.

Key numbers: nDCG@10: 0.3166; Hit@10: 0.4913.

Stack: PyTorch, Transformers, recommender systems.

Details: https://shreyaboyane.dev/projects/sasrec (markdown: https://shreyaboyane.dev/md/projects/sasrec.md).

## Eigenfaces and latent face generation

Probabilistic PCA versus beta-VAE. Machine learning, Jan 2025 to Feb 2025, Worcester Polytechnic Institute.

Trained probabilistic PCA and beta-VAE models on 576-dimensional face vectors for unsupervised identity representation and generation, then compared reconstructions and latent interpolations.

Key numbers: Variance retained: 95%+; Novel samples: 100.

Stack: PyTorch, VAE, PCA, unsupervised learning.

Details: https://shreyaboyane.dev/projects/face-generation (markdown: https://shreyaboyane.dev/md/projects/face-generation.md).

## Behavioral cloning in Atari Pong

Imitation learning with a 3-layer CNN. Reinforcement learning, Sep 2024 to Oct 2024, Worcester Polytechnic Institute.

A supervised imitation-learning pipeline that clones an expert Pong policy from Arcade Learning Environment demonstrations with a three-layer convolutional network.

Key numbers: Test accuracy: 87.55%; Action latency: <500 ms.

Stack: TensorFlow, OpenCV, CNN, imitation learning, ALE.

Details: https://shreyaboyane.dev/projects/atari-pong (markdown: https://shreyaboyane.dev/md/projects/atari-pong.md).

## Map.AR: augmented reality navigation assistant

Indoor and outdoor AR wayfinding, TECHVED sponsored. Augmented reality, Jan 2021 to Jan 2022, PES Modern College of Engineering.

An augmented-reality navigation assistant that guides users to a destination indoors and outdoors, combining Vuforia marker detection with Unity 3D overlays and place recommendations based on user preferences.

Key numbers: User satisfaction: 90%+; Team size: 4.

Stack: Unity, C#, Vuforia, Autodesk Revit, Maps SDK, Firebase, Figma.

Details: https://shreyaboyane.dev/projects/map-ar (markdown: https://shreyaboyane.dev/md/projects/map-ar.md).

## Real-time sign language detection

Custom SSD object detector. Computer vision, Apr 2021 to Oct 2021, Independent project.

An end-to-end custom object-detection system that recognizes hand gestures and translates sign language into text in real time for people with hearing impairments.

Key numbers: Architecture: SSD.

Stack: TensorFlow, Python, object detection, OpenCV.

Details: https://shreyaboyane.dev/projects/sign-language-detection (markdown: https://shreyaboyane.dev/md/projects/sign-language-detection.md).

## Real-time face mask detection

MobileNet SSD on live video. Computer vision, Nov 2020 to Mar 2021, Independent project.

A lightweight MobileNet SSD detector that checks whether people are wearing face masks on live video feeds, built for COVID-19 compliance monitoring in public spaces.

Key numbers: Backbone: MobileNet SSD.

Stack: TensorFlow, OpenCV, Python.

Details: https://shreyaboyane.dev/projects/face-mask-detection (markdown: https://shreyaboyane.dev/md/projects/face-mask-detection.md).

## BookADDA: peer-to-peer book rental platform

Full-stack web app for students. Web, Jun 2020 to Nov 2020, PES Modern College of Engineering.

An online platform where students buy, rent or sell books with fellow students, with a search-first interface and a Flask backend.

Key numbers: Team size: 4.

Stack: HTML, CSS, Bootstrap, JavaScript, Flask, MySQL.

Details: https://shreyaboyane.dev/projects/bookadda (markdown: https://shreyaboyane.dev/md/projects/bookadda.md).

## shreyaboyane.dev: this site

Content-graph-driven portfolio with a depth-map hero. Web, Feb 2026 to present, Personal.

A Next.js 16 and React 19 site driven by one JSON content graph that feeds every page, the JSON-LD, the sitemap, llms.txt and an HTML resume, with a WebGL2 hero that renders a depth map of the portrait produced by Depth Anything V2.

Key numbers: Project pages: 23; Runtime APIs: 0.

Stack: Next.js, React, TypeScript, Tailwind CSS, Motion, WebGL2, Depth Anything V2, Vercel.

Details: https://shreyaboyane.dev/projects/portfolio-site (markdown: https://shreyaboyane.dev/md/projects/portfolio-site.md). Code: https://github.com/Sonica-B/Portfolio

Canonical page: https://shreyaboyane.dev/projects. This markdown: https://shreyaboyane.dev/md/projects.md. Generated from the site content model, last updated 2026-10-27.
