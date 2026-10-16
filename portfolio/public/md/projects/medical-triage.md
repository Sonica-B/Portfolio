# Medical Triage HIL: confidence-aware LLM triage

Human-in-the-loop emergency severity prediction.

- Problem: LLM triage assistants hallucinate and escalate incorrectly, so the question was whether calibrated confidence plus human review could make them safer.
- What she did: Built confidence-aware triage on Ollama-served models with incremental confidence tracking, a dual-channel decision flow and human-in-the-loop review.
- What changed: Triage precision rose 20%, false escalations fell 40%, hallucinations fell 50% and early critical-case detection rose 60%.

> Local LLMs assign Emergency Severity Index levels, reason about handoff risk and track confidence as more patient questions are revealed, with human-in-the-loop review on high-risk escalations.

- Kind: LLM systems
- Period: Jan 2025 to Aug 2025 (completed)
- Affiliation: Worcester Polytechnic Institute
- Repository: https://github.com/Sonica-B/Medical-Triage-HIL

## Problem

LLM triage assistants hallucinate and escalate incorrectly; the question was whether calibrated confidence plus human review could make them safer.

## Approach

Ollama-served models (Mistral by default) with risk-factor extraction, incremental QA-based confidence tracking, and elicitation strategies (vanilla, chain of thought, self-probing, top-k, misleading and paraphrased sampling, aggregation); dual-channel decision flow separating escalation from routine guidance; reliability diagrams and calibration plots.

## Results

- Raised triage precision 20% and ESI accuracy 25% while cutting false escalations 40%.
- Reduced hallucinations 50% and improved patient-provider alignment 2.3x through the dual-channel flow.
- Cut errors 30% and raised reliability 35% with difficulty-weighted training and calibration scoring.
- Raised early critical-case detection 60% and cut non-critical misclassification 70%.
- Built as a research prototype, explicitly not a clinical decision tool.

## Key numbers

- Triage precision: +20%
- False escalations: -40%
- Hallucinations: -50%
- Early critical-case detection: +60%

## Stack

Python, PyTorch, scikit-learn, Ollama, LangChain, calibration, HITL

## Role

Graduate Student Researcher, Generative AI and LLMs for Healthcare, Worcester Polytechnic Institute, Jan 2025 to Aug 2025. Built a production-minded GenAI plus human-in-the-loop triage assistant with difficulty-aware reasoning, confidence calibration and auditable workflows.

## Image

![ESI prediction and confidence overlay for one triage case as questions are revealed](https://shreyaboyane.dev/projects/medical-triage/esi-confidence.webp)

Canonical page: https://shreyaboyane.dev/projects/medical-triage. This markdown: https://shreyaboyane.dev/md/projects/medical-triage.md. Generated from the site content model, last updated 2026-10-15.
