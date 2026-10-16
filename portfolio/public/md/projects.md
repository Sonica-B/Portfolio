# Projects by Shreya Boyane

23 projects, featured work first. Kinds: Research, Production system, Computer vision, Generative AI, MLOps, LLM systems, Developer tooling, Robotics, NLP, Machine learning, Reinforcement learning, Augmented reality, Web. Each entry opens with the three-second strip (problem, what she did, what changed) and links to a full page with the approach, results and stack. 15 projects carry a 25-second pitch video.

## Interpreting Latent CoT Reasoning as Dynamical Systems

Mechanistic interpretability paper, ICML 2026 FoGen Workshop poster. Research, Feb 2026 to May 2026, Algoverse AI Research Fellowship. Poster, ICML 2026 FoGen Workshop.

- Problem: Existing interpretability tools cannot explain how latent chain-of-thought reasoning evolves from one step to the next.
- What she did: Modeled 768-dimensional latent trajectories as discrete-time dynamical systems across 8,792 GSM8K and 500 MATH samples on GPT-2.
- What changed: CODI behaves as a stable attractor and COCONUT as an unstable expanding system; accepted as an ICML 2026 FoGen poster, rated 6 of 6.

Treats each latent thought token of a chain-of-thought language model as a state in a discrete-time trajectory and applies dynamical-systems analysis to 768-dimensional reasoning trajectories across 8,792 GSM8K and 500 MATH samples.

Key numbers: GSM8K samples: 8,792; Trajectory dimension: 768; Samples with an unstable DMD mode, COCONUT vs CODI: 41% vs 85%; Verified claims: 28 of 28; Reviewer rating: 6 of 6.

Stack: PyTorch, Hugging Face Transformers, PEFT, LoRA, DMD, PHATE, UMAP, CUDA, HDF5, mechanistic interpretability.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/latent-cot.mp4 (poster: https://shreyaboyane.dev/videos/latent-cot.webp).

Details: https://shreyaboyane.dev/projects/latent-cot (markdown: https://shreyaboyane.dev/md/projects/latent-cot.md). Code: https://github.com/SabariIyyappan/Latent-CoT-Reasoning-as-Dynamical-Systems

## SkipLegal: multi-agent H-1B document intelligence

Production system for Crossing, Data Science GQP MVP. Production system, Aug 2025 to Dec 2025, Crossing x WPI industry-sponsored Graduate Qualifying Project. Data Science GQP MVP, December 2025.

- Problem: Immigration attorneys spent 3 to 4 days per H-1B petition checking Form I-129 packages for missing documents and errors.
- What she did: Built and delivered a four-agent LLM pipeline on AWS with LangGraph that extracts schema-validated JSON and a single QC report.
- What changed: Review time fell from 3 to 4 days to 5 to 10 minutes at 95 to 99% structural accuracy.

A four-agent LLM pipeline on AWS that turns messy multi-format H-1B petition packages into schema-validated JSON and a single attorney-ready QC report, cutting review from 3 to 4 days to about 5 to 10 minutes.

Key numbers: Review time: 3 to 4 days down to 5 to 10 min; Structural accuracy: 95 to 99%; Missing-document detection: 99 to 100%; Rules across fields: 50+ over 45+; Hours freed per firm per season: about 2,000; Cost per case: 50 to 70% lower.

Stack: LangGraph, Amazon Bedrock, AWS Lambda, Step Functions, S3, EventBridge, Textract, Pydantic, RAGAS, FastAPI, Prometheus.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/skiplegal.mp4 (poster: https://shreyaboyane.dev/videos/skiplegal.webp).

Details: https://shreyaboyane.dev/projects/skiplegal (markdown: https://shreyaboyane.dev/md/projects/skiplegal.md). Code: https://github.com/Sonica-B/GQP-SkipLegal

## Einstein Vision: 3D scene reconstruction for autonomous driving

Perception stack plus TensorRT inference optimization. Computer vision, Mar 2025 to Apr 2025, WPI RBE/CS 549 Computer Vision.

- Problem: Dash-cam footage gives no interpretable 3D context for debugging perception or explaining autonomous-driving decisions to humans.
- What she did: Fused depth, detection, segmentation, pose and optical-flow models into Blender 3D reconstructions, then deployed the detectors through TensorRT FP16.
- What changed: 3D placement accuracy rose 50% and scene realism 75% across 13 sequences, with 1.5x throughput and p95 latency down 35%.

Converts monocular dash-cam video into scene-accurate 3D reconstructions by fusing depth, detection, segmentation, pose and optical-flow models, then renders the scene with the Blender Python API while streaming masks and poses at 30 FPS.

Key numbers: 3D placement accuracy: +50%; Scene realism: +75%; Driving sequences: 13; Multi-object throughput: 1.5x; p95 latency: -35%.

Stack: Depth Anything, MiDaS, Mask R-CNN, Detic, OpenPifPaf, YOLO3D, RAFT, Blender Python API, TensorRT, ONNX, Nsight.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/einstein-vision.mp4 (poster: https://shreyaboyane.dev/videos/einstein-vision.webp).

Details: https://shreyaboyane.dev/projects/einstein-vision (markdown: https://shreyaboyane.dev/md/projects/einstein-vision.md). Code: https://github.com/Sonica-B/EinsteinVision

## MADWE: Multi-Agent Diffusion World Engine

Real-time game asset generation with optimized GPU inference. Generative AI, Mar 2025 to Aug 2025, Worcester Polytechnic Institute.

- Problem: Real-time game worlds need coherent assets and layouts under strict latency and memory budgets, and hand-authoring them does not scale.
- What she did: Led the AI models for a multi-agent diffusion runtime with LoRA adapters per biome, then optimized inference with ONNX, TensorRT and INT8.
- What changed: p95 latency fell from 200 ms to 95 ms, the runtime generated 120 assets per minute and manual design time dropped 73%.

A multi-agent generative runtime that routes work to specialist diffusion agents over a shared world-state graph with budget-aware scheduling, generating 120 game assets per minute and cutting manual design time 73%.

Key numbers: Assets per minute: 120; Manual design time: -73%; p95 latency: 200 to 95 ms; Throughput: 1.8x; FID: 12.3; CLIP similarity: 0.89.

Stack: PyTorch, Diffusers, Stable Diffusion, LoRA, ONNX, TensorRT, INT8, CUDA graphs, Unity, Wave Function Collapse.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/madwe.mp4 (poster: https://shreyaboyane.dev/videos/madwe.webp).

Details: https://shreyaboyane.dev/projects/madwe (markdown: https://shreyaboyane.dev/md/projects/madwe.md). Code: https://github.com/Sonica-B/RealmWeaver-MADWE

## TumorLytix: unsupervised brain tumor detection and segmentation

CycleGAN plus diffusion on 65,072 MRI images. Computer vision, Oct 2024 to Dec 2024, WPI Deep Learning.

- Problem: Supervised tumor segmentation needs large labeled MRI datasets that are expensive to produce, and tumors vary widely in size, shape and position.
- What she did: Paired CycleGAN synthesis with diffusion refinement and automated labeling to detect and segment tumors across 65,072 BraTS2020 images without labels.
- What changed: Segmentation accuracy passed 90% with no manual labels, precision rose 15% over baseline and inference ran 1.6x faster.

An unsupervised medical-imaging pipeline that pairs CycleGAN image synthesis with diffusion-based refinement to detect and segment brain tumors across 65,072 BraTS2020 MRI images with more than 90% segmentation accuracy and no manual labels.

Key numbers: MRI images: 65,072; Segmentation accuracy: >90%; Precision over baseline: +15%; Inference throughput: 1.6x.

Stack: PyTorch, TensorFlow, CycleGAN, diffusion models, OpenCV, TorchScript, Nsight Compute, BraTS2020.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/tumorlytix.mp4 (poster: https://shreyaboyane.dev/videos/tumorlytix.webp).

Details: https://shreyaboyane.dev/projects/tumorlytix (markdown: https://shreyaboyane.dev/md/projects/tumorlytix.md). Code: https://github.com/Sonica-B/TumorLytix

## Scene Mood Classifier: one container, three clouds

Multimodal classifier shipped as an operated MLOps platform. MLOps, Aug 2025 to Dec 2025, WPI DS-553 Case Studies in Data Science.

- Problem: Most course projects stop at a model; this one had to prove the model could be operated reliably across clouds.
- What she did: Shipped a CLIP plus Wav2Vec2 mood classifier as one container with Prometheus, Grafana, GitHub Actions and tested recovery paths.
- What changed: One image runs on GCP, AWS and Azure, standardized ports removed a class of downtime, and two Hugging Face Spaces are live.

A CLIP plus Wav2Vec2 fusion model that scores the mood of a video or image-and-audio pair, shipped as one container image deployed to GCP, AWS and Azure with monitoring, alerting, CI/CD and tested recovery paths.

Key numbers: Clouds from one image: 3; Mood scores: 5; Live Spaces: 2.

Stack: CLIP, Wav2Vec2, Gradio, Docker, GCP, AWS, Azure, Prometheus, Grafana, GitHub Actions, Hugging Face Spaces.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/scene-mood-classifier.mp4 (poster: https://shreyaboyane.dev/videos/scene-mood-classifier.webp).

Details: https://shreyaboyane.dev/projects/scene-mood-classifier (markdown: https://shreyaboyane.dev/md/projects/scene-mood-classifier.md). Code: https://github.com/Sonica-B/Case-Studies

## FairPrep: fairness-aware human feedback for table unionability

Co-first-author paper submitted to DASHSys 2026. Research, Jan 2025 to May 2026, Worcester Polytechnic Institute, BSF Grant 2024022.

- Problem: Human feedback supervises table union search in data lakes, but nobody had checked whether it is equally reliable across annotator demographics.
- What she did: Adapted the FairEM framework to annotator-level fairness with 10 metrics, permutation tests, bootstrap intervals and FDR correction on 60 annotators.
- What changed: 6 of 10 metrics flagged bias against non-native English annotators, 25% versus 44% accuracy on hard questions, p = 0.031.

The first adaptation of the FairEM framework from entity matching to annotator-level fairness in table union search, finding statistically significant bias against non-native English annotators on hard questions.

Key numbers: Annotators: 60; Metrics flagging unfairness: 6 of 10; Accuracy gap on hard questions: 25% vs 44%; Fisher exact p: 0.031.

Stack: Python, statsmodels, scikit-learn, permutation testing, bootstrap, FDR correction, fairness.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/fairprep.mp4 (poster: https://shreyaboyane.dev/videos/fairprep.webp).

Details: https://shreyaboyane.dev/projects/fairprep (markdown: https://shreyaboyane.dev/md/projects/fairprep.md). Code: https://github.com/Sonica-B/FairPrep

## Where does physics live in vision encoders?

Spatial probing and LoRA ablation of VLM physical reasoning. Research, Mar 2026 to May 2026, Independent research.

- Problem: Vision-language models show surprising physical reasoning yet fail on intuitive physics, and it was unclear where physical information lives inside them.
- What she did: Probed per-patch activations at four stages of Qwen2.5-VL, InternVL 2.5 and LLaVA-OneVision, then ran a five-condition LoRA ablation.
- What changed: Produced physics saliency maps, degradation curves across the projection bottleneck and 15 ablation runs on three benchmarks.

Probes where physical properties such as mass, friction, elasticity and stability are encoded across the encoder, projection and LLM stages of Qwen2.5-VL, InternVL 2.5 and LLaVA-OneVision, then fine-tunes five LoRA configurations to find the leverage point for physical intuition.

Key numbers: Vision-language models: 3; Pipeline stages probed: 4; LoRA ablation runs: 15; Benchmarks: 3.

Stack: Qwen2.5-VL, InternVL, LLaVA-OneVision, LoRA, Physion++, PhysBench, probing, Hydra.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/vla-physics.mp4 (poster: https://shreyaboyane.dev/videos/vla-physics.webp).

Details: https://shreyaboyane.dev/projects/vla-physics (markdown: https://shreyaboyane.dev/md/projects/vla-physics.md). Code: https://github.com/Sonica-B/VLAs

## Medical Triage HIL: confidence-aware LLM triage

Human-in-the-loop emergency severity prediction. LLM systems, Jan 2025 to Aug 2025, Worcester Polytechnic Institute.

- Problem: LLM triage assistants hallucinate and escalate incorrectly, so the question was whether calibrated confidence plus human review could make them safer.
- What she did: Built confidence-aware triage on Ollama-served models with incremental confidence tracking, a dual-channel decision flow and human-in-the-loop review.
- What changed: Triage precision rose 20%, false escalations fell 40%, hallucinations fell 50% and early critical-case detection rose 60%.

Local LLMs assign Emergency Severity Index levels, reason about handoff risk and track confidence as more patient questions are revealed, with human-in-the-loop review on high-risk escalations.

Key numbers: Triage precision: +20%; False escalations: -40%; Hallucinations: -50%; Early critical-case detection: +60%.

Stack: Python, PyTorch, scikit-learn, Ollama, LangChain, calibration, HITL.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/medical-triage.mp4 (poster: https://shreyaboyane.dev/videos/medical-triage.webp).

Details: https://shreyaboyane.dev/projects/medical-triage (markdown: https://shreyaboyane.dev/md/projects/medical-triage.md). Code: https://github.com/Sonica-B/Medical-Triage-HIL

## AutoGit-AI: VS Code extension with secret scanning

Shipped on the VS Code Marketplace. Developer tooling, May 2025 to present, Open source.

- Problem: Auto-commit removes the human review step between saving and pushing, which is exactly when secrets leak.
- What she did: Built a VS Code extension that stages, writes a Copilot commit message, scans added lines for secrets and pushes.
- What changed: Shipped on the VS Code Marketplace under Apache-2.0, blocking 10+ families of keys, tokens and passwords before they reach the remote.

Save a file and AutoGit stages it, writes an AI commit message with GitHub Copilot, scans the diff for leaked secrets and pushes. Its built-in secret scanner blocks keys, tokens and passwords before they reach the remote.

Key numbers: Secret pattern families: 10+; License: Apache-2.0; Minimum VS Code: 1.90.

Stack: TypeScript, JavaScript, VS Code Extension API, GitHub Copilot, Git, secret scanning.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/autogit.mp4 (poster: https://shreyaboyane.dev/videos/autogit.webp).

Details: https://shreyaboyane.dev/projects/autogit (markdown: https://shreyaboyane.dev/md/projects/autogit.md). Code: https://github.com/Sonica-B/AutoGit

## VIO: deep visual-inertial odometry via multimodal fusion

Camera plus IMU fusion with a Transformer encoder. Computer vision, Mar 2025 to May 2025, WPI RBE/CS 549 Computer Vision.

- Problem: Synthetic video and IMU streams showed scale drift and domain shift that degraded long-horizon odometry.
- What she did: Fused a FlowNet-style CNN, a bi-LSTM over IMU windows and a Transformer encoder into a pose regressor with SO(3) geodesic loss.
- What changed: RMSE ATE fell 31 to 34% versus vision-only, and TensorRT deployment cut per-step latency 35% and VRAM 20%.

Fuses a FlowNet-style CNN over frames, a two-layer bi-LSTM over IMU windows and a Transformer fusion encoder into a pose regressor trained with an L1 translation and SO(3) geodesic rotation loss on synthetic Blender and OysterSim trajectories.

Key numbers: RMSE ATE vs vision-only: -31 to -34%; IMU rate: 1000 Hz; RGB rate: 100 Hz; Per-step latency: -35%; VRAM: -20%.

Stack: PyTorch, LSTM, Transformer, sensor fusion, Blender, OysterSim, TensorRT, ONNX.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/vio.mp4 (poster: https://shreyaboyane.dev/videos/vio.webp).

Details: https://shreyaboyane.dev/projects/vio (markdown: https://shreyaboyane.dev/md/projects/vio.md). Code: https://github.com/Sonica-B/VIO

## RoboFusion: ML-driven sensor integration for motion control

Gesture-controlled robotic arm on ROS2. Robotics, Sep 2024 to Dec 2024, Worcester Polytechnic Institute.

- Problem: Sensor data alone is too noisy and inconsistent for precise robotic arm control in hazardous, manufacturing and medical settings.
- What she did: Fused MediaPipe hand tracking, a TensorFlow gesture model trained on 5,000+ gestures and MPU6050 IMU angles inside ROS2.
- What changed: Gesture recognition reached 93% with task precision about 35% above the sensor-only baseline and under 500 ms gesture-to-command latency.

A real-time human-robot interface that controls a robotic arm from hand gestures by fusing MediaPipe hand tracking, a TensorFlow gesture model and MPU6050 IMU angle estimates inside ROS2, with sub-500 ms gesture-to-command latency.

Key numbers: Gesture recognition accuracy: 93%; Gesture-to-command latency: <500 ms; Gesture samples: 5,000+.

Stack: ROS2, Gazebo, TensorFlow, MediaPipe, OpenCV, MPU6050, sensor fusion.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/robofusion.mp4 (poster: https://shreyaboyane.dev/videos/robofusion.webp).

Details: https://shreyaboyane.dev/projects/robofusion (markdown: https://shreyaboyane.dev/md/projects/robofusion.md). Code: https://github.com/Sonica-B/RoboFusion

## Buildings Built in Minutes: structure from motion and NeRF

Classical reconstruction of WPI Unity Hall and neural rendering. Computer vision, Feb 2025 to Mar 2025, WPI RBE/CS 549 Computer Vision.

- Problem: Reconstructing a building from phone photos for AR and VR needs classical geometry and neural rendering while keeping compute modest.
- What she did: Built a full structure-from-motion pipeline in OpenCV with bundle adjustment, then implemented NeRF end to end with hierarchical sampling.
- What changed: Reprojection error fell from 1.75 to 1.01 pixels, and NeRF views reached about 60% higher PSNR with roughly 40% fewer artifacts.

Turns uncalibrated photographs into a metrically reliable 3D asset with a full structure-from-motion pipeline, then implements NeRF end to end to render photorealistic 360-degree orbits of the Lego, Hotdog and Ship scenes.

Key numbers: Reprojection error: 1.75 to 1.01 px; PSNR vs baseline: +60%; Rendering artifacts: -40%.

Stack: Python, OpenCV, SfM, bundle adjustment, NeRF, PyTorch.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/buildings-built-in-minutes.mp4 (poster: https://shreyaboyane.dev/videos/buildings-built-in-minutes.webp).

Details: https://shreyaboyane.dev/projects/buildings-built-in-minutes (markdown: https://shreyaboyane.dev/md/projects/buildings-built-in-minutes.md). Code: https://github.com/Sonica-B/Buildings-Built-in-Minutes

## TrendED Pathfinder: career recommender

NLP role matching and skill-gap learning paths. NLP, Sep 2024 to Nov 2024, Worcester Polytechnic Institute.

- Problem: Job boards filter on job type and company, not on what a specific student can do and should learn next.
- What she did: Built a TF-IDF and cosine-similarity matcher over 10,000+ job descriptions, 5,000 resumes and 300+ catalogs with supervised ranking.
- What changed: Match accuracy reached 95% with 90% NLP precision, irrelevant results fell 50% and 1,000+ students used the recommendations.

An NLP engine that matches resumes to roles with TF-IDF and cosine similarity, calibrates rankings with supervised classifiers, and recommends courses that close the skill gaps it finds.

Key numbers: Job descriptions: 10,000+; Match accuracy: 95%; NLP precision: 90%.

Stack: Python, TF-IDF, scikit-learn, TensorFlow, BeautifulSoup, NLP.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/trended-pathfinder.mp4 (poster: https://shreyaboyane.dev/videos/trended-pathfinder.webp).

Details: https://shreyaboyane.dev/projects/trended-pathfinder (markdown: https://shreyaboyane.dev/md/projects/trended-pathfinder.md). Code: https://github.com/Sonica-B/TrendED

## RealmWeaver-AI: procedural game asset generator

Stable Diffusion, CVAE-GAN and Wave Function Collapse for Unity. Generative AI, Mar 2025 to Apr 2025, Worcester Polytechnic Institute.

- Problem: Indie developers spend most of their time building game worlds by hand.
- What she did: Combined Stable Diffusion with LoRA, a CVAE-GAN for tile structure and Wave Function Collapse layouts, placing prefabs automatically in Unity.
- What changed: Assets reached FID 32.4 at 2.7 seconds each and manual integration effort fell 73%.

A procedural 2D asset framework that generates terrain tiles and props with Stable Diffusion and LoRA, learns tile structure with a CVAE-GAN, lays out biomes with Wave Function Collapse and places prefabs automatically in Unity.

Key numbers: FID: 32.4; Time per asset: 2.7 s; Manual effort: -73%.

Stack: Stable Diffusion, LoRA, CVAE-GAN, VAE, Wave Function Collapse, Unity, PyTorch.

Pitch video (25 seconds): https://shreyaboyane.dev/videos/realmweaver-ai.mp4 (poster: https://shreyaboyane.dev/videos/realmweaver-ai.webp).

Details: https://shreyaboyane.dev/projects/realmweaver-ai (markdown: https://shreyaboyane.dev/md/projects/realmweaver-ai.md). Code: https://github.com/Sonica-B/RealmWeaver-AI

## SASRec sequential recommender

Transformer next-item ranking in PyTorch. Machine learning, Apr 2025 to May 2025, Worcester Polytechnic Institute.

- Problem: Sparse interaction histories make next-item prediction unstable, so the goal was a compact model that holds up under sparsity.
- What she did: Built a self-attentive sequential recommender in PyTorch and swept dropout, attention heads and hidden size across five variants.
- What changed: The best checkpoint reached nDCG@10 0.3166 and Hit@10 0.4913 at epoch 14 with two blocks and 50 dimensions.

A self-attentive sequential recommender with multi-head attention, causal masking and residual feed-forward blocks for next-item ranking, tuned with hyperparameter sweeps and selected by offline metrics.

Key numbers: nDCG@10: 0.3166; Hit@10: 0.4913.

Stack: PyTorch, Transformers, recommender systems.

Details: https://shreyaboyane.dev/projects/sasrec (markdown: https://shreyaboyane.dev/md/projects/sasrec.md).

## Eigenfaces and latent face generation

Probabilistic PCA versus beta-VAE. Machine learning, Jan 2025 to Feb 2025, Worcester Polytechnic Institute.

- Problem: How much of a face survives a 16-, 32- or 64-dimensional latent, and which model interpolates more smoothly.
- What she did: Trained probabilistic PCA and beta-VAE on 576-dimensional face vectors, then compared reconstructions, latent interpolations and 10x10 sample grids.
- What changed: Latents kept 95%+ variance, 100 novel faces were generated, and decoder sampling cut training time 35% over dense baselines.

Trained probabilistic PCA and beta-VAE models on 576-dimensional face vectors for unsupervised identity representation and generation, then compared reconstructions and latent interpolations.

Key numbers: Variance retained: 95%+; Novel samples: 100.

Stack: PyTorch, VAE, PCA, unsupervised learning.

Details: https://shreyaboyane.dev/projects/face-generation (markdown: https://shreyaboyane.dev/md/projects/face-generation.md).

## Behavioral cloning in Atari Pong

Imitation learning with a 3-layer CNN. Reinforcement learning, Sep 2024 to Oct 2024, Worcester Polytechnic Institute.

- Problem: Can a small CNN reproduce expert paddle control from demonstrations alone, without reward signals.
- What she did: Trained a three-layer CNN on expert Arcade Learning Environment frames for 100 epochs and validated with gameplay video logs.
- What changed: The cloned agent reached 87.55% test accuracy with minimal overfitting and tracked the paddle with sub-500 ms action latency.

A supervised imitation-learning pipeline that clones an expert Pong policy from Arcade Learning Environment demonstrations with a three-layer convolutional network.

Key numbers: Test accuracy: 87.55%; Action latency: <500 ms.

Stack: TensorFlow, OpenCV, CNN, imitation learning, ALE.

Details: https://shreyaboyane.dev/projects/atari-pong (markdown: https://shreyaboyane.dev/md/projects/atari-pong.md).

## Map.AR: augmented reality navigation assistant

Indoor and outdoor AR wayfinding, TECHVED sponsored. Augmented reality, Jan 2021 to Jan 2022, PES Modern College of Engineering.

- Problem: Complex indoor spaces are hard to navigate with 2D maps.
- What she did: Built the indoor navigation, recommendation logic and full Unity and C# frontend with Vuforia markers, Revit models, Maps SDK and Firebase.
- What changed: Pilot users reported 90%+ satisfaction on a usability survey and TECHVED sponsored the project in October 2021.

An augmented-reality navigation assistant that guides users to a destination indoors and outdoors, combining Vuforia marker detection with Unity 3D overlays and place recommendations based on user preferences.

Key numbers: User satisfaction: 90%+; Team size: 4.

Stack: Unity, C#, Vuforia, Autodesk Revit, Maps SDK, Firebase, Figma.

Details: https://shreyaboyane.dev/projects/map-ar (markdown: https://shreyaboyane.dev/md/projects/map-ar.md).

## Real-time sign language detection

Custom SSD object detector. Computer vision, Apr 2021 to Oct 2021, Independent project.

- Problem: Sign language users face communication barriers in everyday settings.
- What she did: Trained a custom Single Shot Multibox Detector in TensorFlow on a gesture dataset and wired it to a live camera feed.
- What changed: The system detects and translates multiple gestures into text in real time.

An end-to-end custom object-detection system that recognizes hand gestures and translates sign language into text in real time for people with hearing impairments.

Key numbers: Architecture: SSD.

Stack: TensorFlow, Python, object detection, OpenCV.

Details: https://shreyaboyane.dev/projects/sign-language-detection (markdown: https://shreyaboyane.dev/md/projects/sign-language-detection.md).

## Real-time face mask detection

MobileNet SSD on live video. Computer vision, Nov 2020 to Mar 2021, Independent project.

- Problem: Institutions needed an automated, low-cost way to monitor face mask compliance during COVID-19.
- What she did: Trained a custom MobileNet SSD model in TensorFlow and integrated it with live video streams for real-time inference.
- What changed: The detector ran live with high accuracy, suitable for institutions and public venues.

A lightweight MobileNet SSD detector that checks whether people are wearing face masks on live video feeds, built for COVID-19 compliance monitoring in public spaces.

Key numbers: Backbone: MobileNet SSD.

Stack: TensorFlow, OpenCV, Python.

Details: https://shreyaboyane.dev/projects/face-mask-detection (markdown: https://shreyaboyane.dev/md/projects/face-mask-detection.md).

## BookADDA: peer-to-peer book rental platform

Full-stack web app for students. Web, Jun 2020 to Nov 2020, PES Modern College of Engineering.

- Problem: Textbooks are expensive and campus book exchange was informal and slow.
- What she did: Designed and built the entire frontend in HTML, CSS, Bootstrap and JavaScript over a Flask and MySQL backend with a four-person team.
- What changed: Students could buy, rent or sell books through a working, search-first platform that drew positive feedback for ease of use.

An online platform where students buy, rent or sell books with fellow students, with a search-first interface and a Flask backend.

Key numbers: Team size: 4.

Stack: HTML, CSS, Bootstrap, JavaScript, Flask, MySQL.

Details: https://shreyaboyane.dev/projects/bookadda (markdown: https://shreyaboyane.dev/md/projects/bookadda.md).

## shreyaboyane.dev: this site

Content-graph-driven portfolio with a depth-map hero. Web, Feb 2026 to present, Personal.

- Problem: The previous site drifted a full degree-completion behind reality because content was hardcoded in four places.
- What she did: Rebuilt on Next.js 16 with one JSON content graph, a build-time drift guard and a WebGL2 depth-map hero.
- What changed: One file now feeds 23 project pages, the JSON-LD, sitemap, llms.txt and resume, with every route static and zero runtime APIs.

A Next.js 16 and React 19 site driven by one JSON content graph that feeds every page, the JSON-LD, the sitemap, llms.txt and the resume, with a WebGL2 hero rendering a Depth Anything V2 depth map of the portrait.

Key numbers: Project pages: 23; Runtime APIs: 0.

Stack: Next.js, React, TypeScript, Tailwind CSS, Motion, WebGL2, Depth Anything V2, Vercel.

Details: https://shreyaboyane.dev/projects/portfolio-site (markdown: https://shreyaboyane.dev/md/projects/portfolio-site.md). Code: https://github.com/Sonica-B/Portfolio

Canonical page: https://shreyaboyane.dev/projects. This markdown: https://shreyaboyane.dev/md/projects.md. Written by Shreya Boyane; generated from the site content model, last updated 2026-10-15.
