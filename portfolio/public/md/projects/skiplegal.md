# SkipLegal: multi-agent H-1B document intelligence

Production system for Crossing, Data Science GQP MVP.

> A four-agent LLM pipeline on AWS that turns messy multi-format H-1B petition packages into schema-validated JSON and a single attorney-ready QC report, cutting review from 3 to 4 days to about 5 to 10 minutes.

- Kind: Production system
- Period: Aug 2025 to Dec 2025 (completed)
- Affiliation: Crossing x WPI industry-sponsored Graduate Qualifying Project
- Team: Shreya Boyane with Mansi Rupesh Mantri, Nandini Priya Sripada, Pradyumn Tendulkar
- Recognition: Data Science GQP MVP, December 2025
- Repository: https://github.com/Sonica-B/GQP-SkipLegal

## Problem

Immigration attorneys spent days per petition manually checking Form I-129 packages and supporting evidence for missing documents, inconsistent fields and structural errors.

## Approach

Agent 1 (intake and vision) collapses PDFs into a unified schema with Textract OCR; Agent 2A canonicalizes I-129 fields through a deterministic logic engine; Agent 2B runs LLM semantic validation on supporting evidence; Agent 2C is a cross-document comparator with an Amazon Bedrock RAG fallback for cases the rules cannot resolve. Orchestrated with LangGraph on S3, Lambda, Step Functions and EventBridge.

## Results

- Owned client-facing delivery: requirements discovery with Crossing engineers, acceptance tests, weekly demos, integration and handoff.
- Built the computer-vision grouping, API schema and the Pydantic-validated canonical JSON contract consumed downstream.
- RAG evaluation loops with RAGAS (faithfulness, context recall) and threshold-based regression gating across prompt and retriever changes.
- Presented to eleven industry judges at the WPI GRIE Showcase in April 2026; recognized with the Data Science GQP MVP award.

## Key numbers

- Review time: 3 to 4 days down to 5 to 10 min
- Structural accuracy: 95 to 99%
- Missing-document detection: 99 to 100%
- Rules across fields: 50+ over 45+
- Hours freed per firm per season: about 2,000
- Cost per case: 50 to 70% lower

## Stack

LangGraph, Amazon Bedrock, AWS Lambda, Step Functions, S3, EventBridge, Textract, Pydantic, RAGAS, FastAPI, Prometheus

## Role

Machine Learning Engineer, Crossing x WPI, industry-sponsored Graduate Qualifying Project, Aug 2025 to Dec 2025. Owned client-facing delivery of a production multi-agent document-intelligence system for H-1B immigration workflows.

Canonical page: https://shreyaboyane.dev/projects/skiplegal. This markdown: https://shreyaboyane.dev/md/projects/skiplegal.md. Generated from the site content model, last updated 2026-10-06.
