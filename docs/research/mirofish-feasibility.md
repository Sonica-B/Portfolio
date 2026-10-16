# MiroFish feasibility for simulated user testing

Checked 2026-10-15 on a shallow clone of github.com/666ghj/MiroFish (AGPL-3.0); no account created, no key entered, no simulation run.

## What it is

A public-opinion simulator, not a usability tester, in three stages:

1. Graph memory. Upload PDF, MD or TXT seed files (50 MB cap, no URL fetching) plus a natural-language requirement. An LLM proposes an ontology; 500-character chunks go into a Zep Cloud graph.
2. Simulation. Graph entities become agents with LLM-written personas; the default clock is 72 rounds of one simulated hour. Each round activates a random subset (N/15 to N/5 per platform, more at peak hours) on two OASIS (CAMEL) platforms in parallel, a Twitter-like feed and a Reddit-like forum, one chat completion per activated agent.
3. Report. A ReAct agent writes 2 to 5 sections with 3 to 5 tool calls each (Zep searches, agent interviews). The environment stays alive afterwards, so /api/simulation/interview/all can ask every agent one question.

Agents never see a rendered page; they read text chunks and post about them. Six seconds on a phone, drop-off and confusion are not modelled; interview answers are role-play.

## Exact prerequisites

| Need | Detail | Replaceable? |
|---|---|---|
| LLM | Any OpenAI-compatible endpoint (LLM_API_KEY, LLM_BASE_URL, LLM_MODEL_NAME) with JSON mode and tool calling. | Yes in principle (any non-empty key; CAMEL honours OPENAI_API_BASE_URL), but Ollama is not installed and no local server is listening. |
| Zep Cloud | ZEP_API_KEY hard-required (run.py exits without it); ZEP_API_URL rejected. Uses ontology, batch ingest, search, node and edge reads; README says the free tier covers simple use. | No. Needs an account; self-hosting means a rewrite. |
| Runtime | Python 3.11 to 3.12, uv, Node 18+: all present (3.11.9, 3.12.12, uv 0.10.6, Node 24.14); Docker daemon not running. | |

No search APIs are used. Install test (`uv pip install -r backend/requirements.txt`, scratchpad venv): 138 packages, 36 s, 1.0 GB. The langdetect build failed on path length until the uv cache left the scratchpad (LongPathsEnabled is 0). Smart App Control is on and blocks numpy 2.5.4's DLL inside the Temp venv, so oasis and torch fail to import (pure-Python parts load); the same packages load from the user's Python 3.11, so a venv outside Temp or Docker should work, unverified. First run also downloads Twitter/twhin-bert-base (1.1 GB) for the feed recommender and runs it on CPU each round.

## Cost of one simulation

Estimate from the code, not measured: 30 agents and 72 rounds on both platforms is about 700 agent completions plus 60 to 80 setup and report calls, roughly 1,000 chat completions and a few million prompt tokens. The UI estimates 0.6 minutes per round for 100 agents (40 rounds about 24 minutes). On this machine (RTX 5070 Ti 12 GB, 31 GB RAM, 16 cores) an 8B local model would take 1 to 2 hours and fail persona JSON more often.

## Verdict

No-go without new accounts or keys: Zep Cloud is mandatory and no local LLM server exists here. Go once the user creates a Zep Cloud account and supplies an LLM key or installs Ollama, but MiroFish answers "what would people say about this site", not "where do they stop reading", so the fallback fits better.

## Commands if keys are supplied later

```powershell
cd D:\tools
git clone --depth 1 https://github.com/666ghj/MiroFish; cd MiroFish
copy .env.example .env
# set LLM_API_KEY=<llm-key> LLM_BASE_URL=<openai-compatible-url> LLM_MODEL_NAME=<model> ZEP_API_KEY=<zep-key>
# local variant: LLM_API_KEY=ollama LLM_BASE_URL=http://localhost:11434/v1 LLM_MODEL_NAME=<tool-calling model>
npm run setup:all
npm run dev            # UI :3000, API :5001; or docker compose up -d once Docker Desktop runs
```

Feeding the site and personas:

1. Export each route to Markdown, noting what sits above the fold at 390 px and 1440 px; add personas.md naming each reviewer with role, device and goal so they become entities.
2. `POST /api/graph/ontology/generate` (multipart: files, simulation_requirement, project_name); `POST /api/graph/build {"project_id"}`; poll `GET /api/graph/task/<task_id>`.
3. `POST /api/simulation/create {"project_id"}`; `POST /api/simulation/prepare {"simulation_id", "entity_types": ["Person"]}`; poll `POST /api/simulation/prepare/status {"task_id"}`.
4. Optional: hand-edit `backend/uploads/simulations/<sim_id>/twitter_profiles.csv` and `reddit_profiles.json`; readiness only checks file presence.
5. `POST /api/simulation/start {"simulation_id", "platform": "parallel", "max_rounds": 10}`; poll `GET /api/simulation/<sim_id>/run-status`.
6. `POST /api/simulation/interview/all {"simulation_id", "prompt": "<question>"}`; `POST /api/report/generate {"simulation_id"}`; `GET /api/report/by-simulation/<sim_id>`.

## Fallback: Claude subagents as personas

Runs today with no new services against the Vercel preview or `npm run dev` in `portfolio/`.

Personas, one subagent each, briefed only with its card: tech recruiter on a phone with 6 seconds; hiring manager for an ML engineer role, desktop, 2 minutes; ML researcher checking the Latent-CoT claim; startup founder scanning for shipped products; recruiter landing on /resume from LinkedIn.

Inputs per page at 390 px and 1440 px: first-viewport screenshot, full-page screenshot, page text. The 6-second protocol shows only the first-viewport screenshot and takes answers from memory before anything else. The 2-minute protocol adds full screenshots and text for up to three pages and asks for the visit order with reasons.

Each persona returns one card: who she is; what she does (one-sentence claim); why talk to her (the hook); the problem she solves; what she did (evidence found); what changed (outcomes with numbers); drop-off points (where and why she stopped); confusion (misread or unverifiable items); next action (contact, resume, project, close tab). Score each field 0 to 2 for presence and accuracy against profile.json. A sixth subagent aggregates, flags fields failing at phone width, and lists the three changes with the highest expected lift.
