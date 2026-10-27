# Shreya Boyane

Machine Learning Engineer specializing in computer vision, LLMs, inference optimization and MLOps.

> Machine Learning Engineer with 2+ years of production DevOps experience and an M.S. in Artificial Intelligence from WPI (May 2026, GPA 3.9). Algoverse Research Fellow and co-first author of a mechanistic interpretability paper on latent chain-of-thought reasoning accepted as a poster at the ICML 2026 FoGen Workshop. Recognized in the Google Cloud x NVIDIA developer community with a Golden Ticket Contest honorable mention at NVIDIA GTC 2026 for inference-optimization engagement across three completed learning pathways. Data Science GQP MVP for a production multi-agent document-intelligence system built for an industry sponsor.

I build production ML systems end to end, from data and training infrastructure through inference optimization to reliability monitoring.

## At a glance

- Title: Machine Learning Engineer
- Location: San Jose, CA (San Francisco Bay Area)
- Availability: Open to full-time machine learning, AI, computer vision and research engineering roles. Start date: immediately.
- Work authorization: F-1 with OPT and STEM OPT: 3 years of US work authorization, no sponsorship needed up front. Open to H-1B sponsorship long term.
- Target roles: ML Engineer (inference, performance, platform); AI Engineer / Applied AI; GenAI / LLM Engineer; Computer Vision / Multimodal Engineer; Research Engineer; Forward Deployed Engineer (AI); MLOps / ML Platform Engineer
- Target locations: Remote (US), San Francisco Bay Area, Seattle, New York, Boston, Austin, Los Angeles, San Diego, open to relocation anywhere in the US
- Email: shreyaa.boyane@gmail.com
- Resume: https://shreyaboyane.dev/ShreyaBoyaneResume.pdf (PDF), https://shreyaboyane.dev/resume (HTML), https://shreyaboyane.dev/md/resume.md (markdown)

## Proof points

- Poster accepted at the ICML 2026 FoGen Workshop, ICML 2026 Workshop on Foundations of Deep Generative Models, May 2026. Interpreting Latent CoT Reasoning as Dynamical Systems; reviewer rating 6/6.
- Golden Ticket Contest honorable mention, NVIDIA GTC 2026, Google Cloud x NVIDIA developer community, Mar 2026. Community contest recognition for a technical write-up on inference optimization after completing three Google Cloud x NVIDIA learning pathways (NVIDIA NIM on GKE, Intro to Inference on GPUs, Speed Up Data Analytics on GPUs). One of 12 honorable mentions; invited to coffee chats with Google and NVIDIA leaders.
- Data Science GQP Most Valuable Player (MVP), Worcester Polytechnic Institute, Dec 2025. One of only a few MVP recipients; exceptional individual contribution to the Crossing x WPI industry-sponsored project that cut immigration petition review from 3 to 4 days to 5 to 10 minutes.
- Work authorization: F-1 with OPT and STEM OPT: 3 years of US work authorization, no sponsorship needed up front. Open to H-1B sponsorship long term.

## Featured projects

### Interpreting Latent CoT Reasoning as Dynamical Systems

Mechanistic interpretability paper, ICML 2026 FoGen Workshop poster. Research, Feb 2026 to May 2026, Algoverse AI Research Fellowship. Poster, ICML 2026 FoGen Workshop.

Treats each latent thought token of a chain-of-thought language model as a state in a discrete-time trajectory and applies dynamical-systems analysis to 768-dimensional reasoning trajectories across 8,792 GSM8K and 500 MATH samples.

Key numbers: GSM8K samples: 8,792; Trajectory dimension: 768; Samples with an unstable DMD mode, COCONUT vs CODI: 41% vs 85%; Verified claims: 28 of 28; Reviewer rating: 6 of 6.

Details: https://shreyaboyane.dev/projects/latent-cot (markdown: https://shreyaboyane.dev/md/projects/latent-cot.md). Code: https://github.com/SabariIyyappan/Latent-CoT-Reasoning-as-Dynamical-Systems

### SkipLegal: multi-agent H-1B document intelligence

Production system for Crossing, Data Science GQP MVP. Production system, Aug 2025 to Dec 2025, Crossing x WPI industry-sponsored Graduate Qualifying Project. Data Science GQP MVP, December 2025.

A four-agent LLM pipeline on AWS that turns messy multi-format H-1B petition packages into schema-validated JSON and a single attorney-ready QC report, cutting review from 3 to 4 days to about 5 to 10 minutes.

Key numbers: Review time: 3 to 4 days down to 5 to 10 min; Structural accuracy: 95 to 99%; Missing-document detection: 99 to 100%; Rules across fields: 50+ over 45+; Hours freed per firm per season: about 2,000; Cost per case: 50 to 70% lower.

Details: https://shreyaboyane.dev/projects/skiplegal (markdown: https://shreyaboyane.dev/md/projects/skiplegal.md). Code: https://github.com/Sonica-B/GQP-SkipLegal

### Einstein Vision: 3D scene reconstruction for autonomous driving

Perception stack plus TensorRT inference optimization. Computer vision, Mar 2025 to Apr 2025, WPI RBE/CS 549 Computer Vision.

Converts monocular dash-cam video into scene-accurate 3D reconstructions by fusing depth, detection, segmentation, pose and optical-flow models, then renders the scene with the Blender Python API while streaming masks and poses at 30 FPS.

Key numbers: 3D placement accuracy: +50%; Scene realism: +75%; Driving sequences: 13; Multi-object throughput: 1.5x; p95 latency: -35%.

Details: https://shreyaboyane.dev/projects/einstein-vision (markdown: https://shreyaboyane.dev/md/projects/einstein-vision.md). Code: https://github.com/Sonica-B/EinsteinVision

### RealmWeaver (MADWE): multi-agent diffusion world engine

Game-world generation on a laptop GPU, every number from a benchmark report. Generative AI, Mar 2025 to Oct 2026, Worcester Polytechnic Institute (2025 prototype), independent rebuild (2026).

A game-world engine that turns a biome description into seamless textures, constraint-valid tile layouts and Unity-ready chunks. Rebuilt in 2026 from a 2025 team prototype, it generates a 512 px texture in 0.37 s on a laptop GPU, and every number it reports comes from a reproducible benchmark.

Key numbers: Seconds per 512 px asset, p50: 0.37; Assets per minute: 165; Latency cut by the CUDA-graph pool: 41%; Peak VRAM: 3.1 GB; Prewarm hit rate vs baseline: 99% vs 56%; Tests: 228.

Details: https://shreyaboyane.dev/projects/madwe (markdown: https://shreyaboyane.dev/md/projects/madwe.md). Code: https://github.com/Sonica-B/RealmWeaver-MADWE

### TumorLytix: unsupervised brain tumor detection and segmentation

CycleGAN plus diffusion on 65,072 MRI images. Computer vision, Oct 2024 to Dec 2024, WPI Deep Learning.

An unsupervised medical-imaging pipeline that pairs CycleGAN image synthesis with diffusion-based refinement to detect and segment brain tumors across 65,072 BraTS2020 MRI images with more than 90% segmentation accuracy and no manual labels.

Key numbers: MRI images: 65,072; Segmentation accuracy: >90%; Precision over baseline: +15%; Inference throughput: 1.6x.

Details: https://shreyaboyane.dev/projects/tumorlytix (markdown: https://shreyaboyane.dev/md/projects/tumorlytix.md). Code: https://github.com/Sonica-B/TumorLytix

### Scene Mood Classifier: one container, three clouds

Multimodal classifier shipped as an operated MLOps platform. MLOps, Aug 2025 to Dec 2025, WPI DS-553 Case Studies in Data Science.

A CLIP plus Wav2Vec2 fusion model that scores the mood of a video or image-and-audio pair, shipped as one container image deployed to GCP, AWS and Azure with monitoring, alerting, CI/CD and tested recovery paths.

Key numbers: Clouds from one image: 3; Mood scores: 5; Live Spaces: 2.

Details: https://shreyaboyane.dev/projects/scene-mood-classifier (markdown: https://shreyaboyane.dev/md/projects/scene-mood-classifier.md). Code: https://github.com/Sonica-B/Case-Studies

All 23 projects: https://shreyaboyane.dev/projects (markdown: https://shreyaboyane.dev/md/projects.md).

## Research

- Interpreting Latent CoT Reasoning as Dynamical Systems. Poster, ICML 2026 FoGen Workshop, May 2026. Latent chain-of-thought trajectories form structured dynamical systems: CODI behaves as a stable attractor, COCONUT as an unstable expanding system, and Sim-CoT supervision tightens both without changing the underlying dynamics. https://openreview.net/pdf?id=ZAGsOMAwBV
- Toward Fairness-Aware Human Feedback for Table Unionability. Submitted, DASHSys 2026, May 2026. First adaptation of the FairEM framework from entity matching to annotator-level fairness in table union search, showing that human feedback should be treated as conditionally reliable. https://github.com/Sonica-B/FairPrep

Full detail: https://shreyaboyane.dev/research (markdown: https://shreyaboyane.dev/md/research.md).

## Experience

- AI Trainer Fellow, Software Engineering and Multimodal AI, Handshake AI, Apr 2026 to present, San Francisco, CA (remote). Selected as a domain-expert fellow improving frontier LLMs and vision-language models for leading AI labs.
- Machine Learning Engineer, Crossing x WPI, industry-sponsored Graduate Qualifying Project, Aug 2025 to Dec 2025, Worcester, MA (hybrid). Owned client-facing delivery of a production multi-agent document-intelligence system for H-1B immigration workflows. Award: Data Science GQP Most Valuable Player (MVP).
- Graduate Assistant, Hypersonic Vehicles Project, Worcester Polytechnic Institute, Jun 2025 to May 2026, Worcester, MA (on-site). Part-time graduate assistant on WPI's hypersonic vehicles research project.
- Graduate Student Researcher, Generative AI and LLMs for Healthcare, Worcester Polytechnic Institute, Jan 2025 to Aug 2025, Worcester, MA (hybrid). Built a production-minded GenAI plus human-in-the-loop triage assistant with difficulty-aware reasoning, confidence calibration and auditable workflows.
- Graduate Assistant, Laboratory of Spaceflight and Planetary Exploration (LSPE), Worcester Polytechnic Institute, Apr 2025 to Aug 2025, Worcester, MA (hybrid). Developed an interactive data-driven web application and Python backend for spaceflight trajectory visualization.
- Lead DevOps Engineer, Persistent Systems, Jun 2022 to Jul 2024, Pune, India (hybrid). Owned CI/CD and cloud infrastructure across 20+ production projects. Award: Top Talent 2024, Bravo Individual Award, Team Excellence Award FY2023, Bravo Team Award.
- Software Engineer Intern (.NET), Persistent Systems, Jan 2022 to Jul 2022, Pune, India (on-site). Built ASP.NET Web APIs and integrated Azure Machine Learning for predictive analytics. Award: Best Intern of the 2022 batch among 20,000+ new joiners across India.
- Web Developer Intern, Flavalon IT Solution LLP, Mar 2021 to May 2021, Mumbai, India (remote). Built and launched brand websites with chatbots and learned SEO fundamentals.

## Open source

41 pull requests to 41 open-source machine learning repositories in October 2026, 6 merged so far. Fixes span agent frameworks, training and inference libraries, robotics and computer vision.

- Merged: NVIDIA NeMo Agent Toolkit #2474, Register every built-in tool when langchain-core is not installed. https://github.com/NVIDIA/NeMo-Agent-Toolkit/pull/2474
- Merged: NVIDIA Isaac Lab #8809, Close replaced root-logger handlers in configure_logging. https://github.com/isaac-sim/IsaacLab/pull/8809
- Merged: PyTorch torchtitan #5621, download_hf_assets copies asset types and raises a readable unknown-asset error. https://github.com/pytorch/torchtitan/pull/5621
- Merged: Hugging Face huggingface_hub #5255, hf cache verify no longer crashes on Windows redirected stdout. https://github.com/huggingface/huggingface_hub/pull/5255
- Merged: A2A Project a2a-python #1375, Raise A2A errors for malformed JSON-RPC responses. https://github.com/a2aproject/a2a-python/pull/1375
- Merged: Roboflow supervision #2803, Draw comparison annotators on grayscale scenes. https://github.com/roboflow/supervision/pull/2803

In review at PyTorch ao, rl, ignite and ExecuTorch, ONNX Runtime, onnxscript, Olive and MarkItDown, ONNX, Flax, Optax, MuJoCo and MaxText, TensorRT-LLM, Hugging Face datasets, DeepSpeed, DSPy, MLflow, SGLang, SkyPilot, MONAI, Ultralytics, TransformerLens and SAELens, Gymnasium, Claude Agent SDK. Counts as of 2026-10-27. All pull requests: https://github.com/search?q=is%3Apr+author%3ASonica-B+-user%3ASonica-B+-user%3Askip-hp+-user%3Ayl-space+-user%3ASabariIyyappan&type=pullrequests

## Education

- Master of Science in Artificial Intelligence, Worcester Polytechnic Institute, Aug 2024 to May 2026, GPA 3.9/4.0.
- Bachelor of Engineering in Information Technology, Honours in Artificial Intelligence and Machine Learning, PES Modern College of Engineering (Savitribai Phule Pune University), Jun 2017 to May 2022, GPA 8.9/10.

## Skills

- Machine learning and AI: PyTorch, PyTorch Lightning, TensorFlow, Keras, scikit-learn, Hugging Face Transformers, PEFT and LoRA fine-tuning, LLMs, vision-language models, LangChain, LangGraph, multi-agent systems, RAG, prompt engineering, model evaluation and benchmarking, LLM-as-judge and rubric grading, diffusion models, CycleGAN, VAEs and GANs, NeRF, reinforcement learning, recommender systems, statsmodels
- Computer vision and 3D: OpenCV, object detection and segmentation (Mask R-CNN, Detic, SSD), monocular depth estimation, pose estimation (OpenPifPaf, MediaPipe), structure from motion, visual-inertial odometry, sensor fusion, optical flow, visual question answering, chart and document understanding, Blender Python API, Unity
- Inference and GPU optimization: CUDA, TensorRT, ONNX, TorchScript, INT8 quantization, mixed precision, CUDA graphs, kernel fusion, Nsight Systems and Nsight Compute, NVIDIA NIM
- MLOps, cloud and DevOps: AWS (Bedrock, S3, Lambda, Step Functions, EventBridge, CloudWatch, Textract, DynamoDB), Azure DevOps, Azure ML, GCP, Docker, Kubernetes, Terraform, Ansible, CI/CD (Azure Pipelines, GitHub Actions), MLflow, Prometheus, Grafana, Snyk, infrastructure as code, Linux, Slurm HPC
- Programming and data: Python, C++, C#, Java, SQL, R, MATLAB, Scala, Rust, Bash, PowerShell, TypeScript and JavaScript, React, Angular, FastAPI, Flask, PostgreSQL, MySQL, MongoDB, HDF5, JSON Schema

## Recognition

- May 2026: Poster accepted at the ICML 2026 FoGen Workshop, ICML 2026 Workshop on Foundations of Deep Generative Models
- Mar 2026: Golden Ticket Contest honorable mention, NVIDIA GTC 2026, Google Cloud x NVIDIA developer community
- Dec 2025: Data Science GQP Most Valuable Player (MVP), Worcester Polytechnic Institute
- Feb 2026: AI Research Fellow, Algoverse AI Research Fellowship
- Apr 2026: AI Trainer Fellow, Handshake AI
- May 2024: Top Talent 2024, Persistent Systems
- Dec 2023: Bravo Individual Award, Technology and Process Excellence, Persistent Systems
- Jan 2023: Team Excellence Award FY2023, Persistent Systems annual awards
- Dec 2022: Bravo Team Award, Teamwork and Dedication, Persistent Systems
- Jun 2022: Graduate Engineers with Multidimensional Skills (GEMS), Persistent Systems
- May 2022: Best Intern, 2022 batch, Persistent Systems
- May 2022: Honours in Artificial Intelligence and Machine Learning, PES Modern College of Engineering
- Oct 2021: Project sponsorship from TECHVED, TECHVED Consulting
- Oct 2021: Android App Development using Kotlin, 85/100, Spoken Tutorial Project, IIT Bombay (MHRD, Government of India)
- Aug 2020: Python Gold Badge (5 stars), HackerRank
- May 2020: National Level Technical Contest on Web Design, SNJB College of Engineering; Computer Society of India x TechGig
- May 2020: FUEL Aptitude Championship, National level
- Feb 2018: 1st rank, Yantra-Maan robotics, Xtronica Mpulse 2018
- Sep 2017: Clash Contest, Credenz 2017, PICT IEEE Student Branch

## Elsewhere

- LinkedIn: https://www.linkedin.com/in/shreya-boyane/
- GitHub: https://github.com/Sonica-B
- ORCID: https://orcid.org/0009-0004-1211-3253
- Hugging Face: https://huggingface.co/SonicaB
- Google Developers: https://g.dev/shreyaboyane
- Dev.to: https://dev.to/sonicab
- HackerRank: https://www.hackerrank.com/profile/shreyaa_boyane
- VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=ShreyaBoyane.auto-git-copilot

Contact: shreyaa.boyane@gmail.com. Book a call: https://zcal.co/i/4aMYgoRr.

Canonical page: https://shreyaboyane.dev/. This markdown: https://shreyaboyane.dev/md/index.md. Generated from the site content model, last updated 2026-10-27.
