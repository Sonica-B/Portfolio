# User testing, portfolio v2 (2026-10-16)

Branch `redesign-2026-v2`, production build at `http://localhost:3123`. MiroFish could not run here, so this is the fallback protocol from `docs/research/mirofish-feasibility.md`: four personas role-played by one agent, each answering only from what the screenshots and page text show. Review only, no code changed.

Inputs: the eleven captures in `docs/qa/v2/personas/` (cropped into readable strips for viewing), page text of `/`, `/projects/latent-cot`, `/about`, `/projects` and `/research` fetched with curl and stripped of tags, and one fresh capture, `docs/qa/v2/personas/home-390-glossary-tap.png` (390x844x3, mobile, touch, isolated context `qa-personas-2`), taken to check that glossary tips open on tap. The six-second test used only `home-390-fold.png` and the first 1,200 characters of home text.

Limits: one rater playing four roles, not real users. The rater had also read source files, which a real visitor never does; where a finding leans on source (data provenance, markup) it says so. Scores are judgments on a 0 to 2 scale, not measurements.

## Summary

| Persona | Device, budget | Who | What | Why talk | Proof found | Problem, action, change | Navigation | Trust | Total |
|---|---|---|---|---|---|---|---|---|---|
| Priya, agency tech recruiter | Phone, LinkedIn in-app, 6 s | 2 | 1 | 1 | 0 | 0 | 2 | 1 | **7 / 14** |
| Tom, non-technical recruiter | Phone, 30 s | 2 | 1 | 1 | 1 | 1 | 1 | 2 | **9 / 14** |
| Daniel, applied ML hiring manager | Desktop, 2 min | 2 | 2 | 2 | 2 | 1 | 2 | 1 | **12 / 14** |
| Mei, senior ML researcher | Desktop, 5 min | 2 | 2 | 2 | 2 | 1 | 2 | 1 | **12 / 14** |

Six-second verdict: **does not pass for all four.** Every persona can say what she does, and every persona would keep reading, but none can name a tool from the first screen, and the two recruiters read "Google Cloud and NVIDIA" as a place she worked. It passes for Daniel and Mei, and only partly for Priya and Tom (details below).

Top three findings:

1. The Latent CoT headline says CODI is a stable attractor and COCONUT an unstable expanding system, but the site's own scrubber, at step 6, shows CODI spread at 2.81x step 1 and COCONUT at 0.97x, next to a tile saying CODI has more unstable DMD modes (85% vs 41%). Mei reads this as a contradiction.
2. The first screen at 390 names no stack. Of Priya's screening keywords, AWS first appears about four and a half phone screens down and PyTorch about fifteen.
3. The hero credential row puts "Google Cloud and NVIDIA" beside a school, an employer and a venue with no qualifier, so it reads as an employer. It is a developer-community contest honorable mention.

## Six-second test (home at 390, first screen only)

What the first screen holds (`home-390-fold.png`): the header (name, Search, menu), the H1 "Shreya Boyane", the role line "Machine Learning Engineer specializing in computer vision, LLMs, inference optimization and MLOps", the summary "I build production ML systems end to end, from data and training infrastructure through inference optimization to reliability monitoring." (with a visible hanging indent before "from" and "monitoring."), four credential chips (ICML 2026 FoGen Workshop, Google Cloud and NVIDIA, Worcester Polytechnic Institute, Persistent Systems), the mono line "Open to full-time machine learning, AI, computer vision and research engineering roles", four buttons (Download resume, Copy email, Book a call, Watch the 25 s pitch) and the top of the portrait.

What it does not hold: a number, a tool, a degree, a location or work authorization. In text order the first 1,200 characters do reach "Work authorization: F-1 with OPT and STEM OPT: 3 years of US work authorization", because the portrait carries no text, but on screen that line sits about 1,900 px down, below the portrait.

| | Priya | Daniel | Mei | Tom |
|---|---|---|---|---|
| What does she do | "ML engineer, computer vision and LLMs, open to full-time." | "ML engineer, CV and LLMs, says production." | "ML engineer with an ICML workshop poster." | "Machine learning engineer. The rest is jargon." |
| Primary stack | Cannot name one. "Computer vision, LLMs, MLOps" are areas, not tools; PyTorch and AWS absent. | None named. | None named. | None named. |
| One thing remembered | ICML and "Google Cloud and NVIDIA" | ICML 2026 | ICML 2026 FoGen Workshop | Google Cloud and NVIDIA, WPI |
| Keep reading | Yes, but straight to Download resume to keyword-check there. | Yes. | Yes, to check the research. | Yes. |
| What confused | Did she work at Google Cloud or NVIDIA? What is FoGen? Is she authorized to work? | The summary is the sentence every ML candidate writes; the indented lines look like a typo. | Nothing material; the label honestly says workshop. | "Inference optimization", "MLOps", "FoGen"; no tips on the hero terms. |
| Pass | Partial: keeps going, but two of her five keywords (PyTorch, AWS) are missing and she misreads a logo. | Pass. | Pass. | Partial: can start a sentence, but the sentence he would relay contains the Google Cloud and NVIDIA misread. |

Priya also browses inside the LinkedIn in-app webview. The server HTML ships the hero summary paragraph at `style="opacity:0"` until JavaScript animates it in, so on a slow connection the second line of the hero can be blank for part of her six seconds. That is read from markup, not observed on a device.

## Persona sessions

### 1. Priya, agency tech recruiter (phone, LinkedIn in-app browser, 6 seconds)

Screening for "ML engineer, computer vision, PyTorch, AWS, production".

- First screen: matches "ML engineer", "computer vision" and "production". No PyTorch, no AWS. The primary button, Download resume, is exactly what she wants, so she taps it.
- Proof and outcomes: none visible in six seconds; the first before-and-after number (SkipLegal's "3 to 4 days to 5 to 10 minutes") is about 3,950 px down.
- Navigation: the four buttons are big, labelled and in the order she needs.
- Trust: the logos look credible, but she cannot tell what the Google Cloud and NVIDIA chip means, and the indented summary lines look careless at a glance.

> "ML engineer, computer vision, open to full-time, fine. I'm matching PyTorch and AWS and I don't see either, so I'm downloading the resume to check. Did she work at NVIDIA?"

### 2. Tom, recruiter with no technical background (phone, 30 seconds)

Needs one sentence for a hiring manager.

- First scroll: fold, then the portrait (about 650 px of phone height), then the credential strip: "Poster, ICML 2026 FoGen Workshop", "Golden Ticket Contest honorable mention, NVIDIA GTC 2026", "Data Science GQP Most Valuable Player (MVP)", and the work authorization line. The authorization line is the most useful thing he reads: "3 years of US work authorization, no sponsorship needed up front."
- Held attention: the SkipLegal "What changed" line, "Review time fell from 3 to 4 days to 5 to 10 minutes", which he can repeat word for word.
- Failed the three-second test (for him): the first featured card, Latent CoT ("CODI behaves as a stable attractor and COCONUT as an unstable expanding system"), and the trajectory scrubber under it, about 1,550 px of jargon and dots between the "Featured outcomes" heading and the first plain-English result.
- Terms: tapping a dotted term opens a clear tip (confirmed in `home-390-glossary-tap.png`), but the terms he stumbles on first, "inference optimization", "MLOps" and "FoGen" in the hero, have no tips.
- Navigation: the floating toolbar at the bottom is six unlabelled icons (a ring, download, copy, calendar, search, close) and in the fresh capture it sits over the SkipLegal outcome sentence.
- Stopped: SkipLegal, at 30 seconds.
- His sentence: "Shreya's a machine learning engineer from WPI with an ICML research poster and something with Google Cloud and NVIDIA; she built an AI system that cut legal document review from days to minutes, and she can work three years without sponsorship." Right except the Google Cloud and NVIDIA part, and it misses her M.S. and her two years as Lead DevOps Engineer, neither of which the home page states near the top.

> "I can sell 'days to minutes' and 'no sponsorship for three years'. I can't sell 'stable attractor'. And is she from Google or not?"

### 3. Daniel, hiring manager for an applied ML team (desktop, 2 minutes)

Wants one proof of shipping and one sign of research depth. Path: home (about 90 s), then `/projects` (about 30 s).

- First scroll: the desktop hero, then the credential strip, then Featured outcomes. The three-column problem, what she did, what changed layout is what holds him.
- Held attention: SkipLegal (sponsor, "four-agent LLM pipeline on AWS with LangGraph", "95 to 99% structural accuracy", MVP) and Einstein Vision ("TensorRT FP16", "p95 latency down 35%"). Research depth: the ICML co-first authorship with the real author list.
- Failed the three-second test: the Latent CoT "What changed" is a finding plus an acceptance, not a change; Scene Mood Classifier's "standardized ports removed a class of downtime" says nothing measurable; Einstein Vision's "scene realism 75%" has no measure or baseline; the trajectory scrubber has no takeaway line. On `/projects`: "Real-time face mask detection: The detector ran live with high accuracy", "Real-time sign language detection: The system detects and translates multiple gestures into text in real time" (tile: "SSD Architecture"), BookADDA (tile: "4 Team size"), and "Where does physics live in vision encoders?", whose result is a list of outputs.
- Would make him contact her: SkipLegal plus the poster, and the DevOps background once he finds it (Lead DevOps Engineer at Persistent Systems, CI/CD across 20+ projects). That background is her edge for an applied team and sits two thirds of the way down the page.
- What gave him pause: the `/projects` filter chip "PRODUCTION SYSTEM 1" (one of 23), and the numbers ledger, which counts "31 certifications and badges", "19 public repositories on GitHub, 15 followers" and "5.6 years since the first internship". All five recommendations praise DevOps work, none ML.
- Stopped: the numbers ledger on home, then a 30 s skim of `/projects`.
- Template or slop: the hero summary sentence, the numbers ledger, the 90-item skills wall (Scala, Rust, MATLAB, R, C#, Java alongside the real stack), the Activity timeline reaching back to a 2017 "Auto Wagen workshop", the GitHub widget reporting "Created branch redesign-2026 in Portfolio".
- Felt like hers: SkipLegal's specifics (Form I-129, 45+ normalized fields, 50+ deterministic rules), "Most course projects stop at a model; this one had to prove the model could be operated reliably across clouds", the plain work authorization line.
- Terms: all familiar; the dotted underlines are quiet on desktop but make some paragraphs look busy.
- Demos: did not touch the scrubber; did not play a pitch in a two-minute budget.

> "SkipLegal is the one I'd ask about: real sponsor, AWS, days to minutes. The poster tells me she can do research. But 'scene realism rose 75%' measured how, and why does the numbers block count years since her first internship?"

### 4. Mei, senior ML researcher on a hiring panel (desktop, 5 minutes)

Opens the research, one case study and a demo. Path: home Research section (30 s), `/projects/latent-cot` with the scrubber (3 min), `/research` (90 s).

- First scroll: the home Research section, which gets the basics right: her name bolded among six authors, the equal-contribution asterisk, Paper, Project page and Code links, the scale (GPT-2-small, 8,792 GSM8K samples).
- Held attention: the trajectory scrubber, because it is built on the paper's own data.
- The problem: the case study's "What changed" says "CODI behaves as a stable attractor and COCONUT as an unstable expanding system". The tile beside it says "41% vs 85%, samples with an unstable DMD mode, COCONUT vs CODI", so the stable model has twice the unstable modes. She drags to step 6 (`latent-cot-1440-demo-step6.png`): "CODI spread 18.6, 2.81x step 1", "COCONUT spread 6.6, 0.97x step 1". On screen, CODI expanded and COCONUT did not, the reverse of the headline. Stepping one at a time shows CODI alternating (the source data gives 6.6, 19.7, 6.3, 19.0, 6.6, 18.6) and COCONUT dipping at step 3 (6.8, 6.6, 3.7, 7.3, 6.1, 6.6). That matches finding 04 on `/research` ("CODI behaves as a near period-2 oscillator ... COCONUT shows three-attractor compression ... at step 3") but contradicts findings 01 and 02 as worded. The data looks right; the page never says how the two descriptions fit together.
- Role: `/research` states "Co-first author and lead pipeline engineer"; the case study does not. Its Details list a "Team" of five co-authors, and nothing marks which highlights are hers.
- Other things she would ask about: "Verified 28 of 28 reproducible numeric claims" (verified by whom?); the FairPrep line "6 of 10 metrics flagged bias ... p = 0.031" (corrected across the 10 metrics?); the ICML glossary tip, "one of the three most selective annual research conferences in the field", attached to a workshop poster, which borrows main-conference selectivity a workshop does not share.
- Template or slop: the PHATE figure appears twice in a row (a large white figure with no caption on the case study, then the same figure inside the pitch poster); the Results block repeats the metric tiles from the top of the page.
- Felt like hers: the engineering highlights (CUDA health-polling for 14+ hour runs, HDF5 resume-from-cache, a GPU-resident KSG mutual-information estimator, byte-exact safetensors repair), and "confidence 3/3" shown next to the rating.
- Terms: she needs none of the tips; they do not get in her way, though a tip covers the sentence it explains (`docs/qa/v2/shots/ix-popover-hover-1440.jpeg`).
- Demos: the scrubber helps her more than anything else on the site, and is also the thing that dents her trust, because it has no line telling her what to look for.

> "The paper is real and the role is stated, good. But I dragged the scrubber to step 6 and CODI's spread is 2.8 times step 1 while COCONUT's is flat. That's the opposite of the headline. If the page can't square 'stable attractor' with '85% unstable DMD modes', I'll ask her in the interview, and I'll be less charitable."

## Ranked findings

Severity reflects how much the issue costs a persona's decision, not how hard it is to fix.

### 1. High: the Latent CoT headline and the site's own demo and numbers disagree

- Element: the "What changed" text "CODI behaves as a stable attractor and COCONUT as an unstable expanding system" (home card, case study, `/projects` card, reel caption), the tile "41% vs 85%, samples with an unstable DMD mode, COCONUT vs CODI", and the scrubber readout "1.00x step 1" through "2.81x step 1" (`components/instruments/latent-cot.tsx`, data in `content/instruments/latent-cot.json`).
- Change: (a) under the scrubber, add one sentence saying what to look for, written from the paper and checked with the co-authors, covering how CODI can be a bounded attractor while alternating between a tight and a wide cloud each step, and why that gives it more unstable DMD modes. (b) Replace the single "x step 1" ratio with a six-point spread line per model, so the alternation shows at a glance instead of depending on which step the slider stops at. (c) Move the 41% vs 85% tile next to that sentence, or off the hero tiles, so it does not read as counter-evidence.
- Serves: Mei first, Daniel.

### 2. High: no tool or number on the first screen at 390

- Element: the hero summary "I build production ML systems end to end, from data and training infrastructure through inference optimization to reliability monitoring." It names no tool and no result, and reads like a template. At 390, AWS first shows in the SkipLegal card, about 3,850 px down; PyTorch first shows in the Skills section, about 13,000 px down, because the one Experience entry that names it is collapsed by default.
- Change: replace the summary with one concrete line naming the tools she would defend and one result, for example "PyTorch, TensorRT and AWS (Bedrock, Lambda, Step Functions). Cut H-1B petition review from 3 to 4 days to 5 to 10 minutes." Keep it within two lines at 390.
- Serves: Priya first, Daniel; gives Tom nouns to repeat.

### 3. High: "Google Cloud and NVIDIA" in the hero row reads as an employer

- Element: the hero credential row "ICML 2026 FoGen Workshop · Google Cloud and NVIDIA · Worcester Polytechnic Institute · Persistent Systems". The other three are a venue, a school and an employer; this one is a developer-community contest honorable mention, explained only in the strip under the portrait.
- Change: give every chip its relation in a few words, for example "ICML 2026 workshop poster", "M.S. AI, WPI, 2026", "Lead DevOps Engineer, Persistent, 2022 to 2024", and either relabel the fourth "NVIDIA GTC 2026 contest honorable mention" or drop it from the hero. This is the honest-credential rule applied to the most-read row on the site.
- Serves: Priya, Tom (stops the misread before he relays it), Daniel and Mei (trust).

### 4. Medium: the degree and the DevOps years never appear on the home page

- Element: "M.S. in Artificial Intelligence from WPI (May 2026, GPA 3.9)" and "2+ years of production DevOps experience" are on `/about` only. The home page has no Education section, and its only mention of graduating is "five days after graduating" in the Activity timeline.
- Change: carry both in the hero chips (finding 3). The ML plus production DevOps combination is the hook for an applied team; say it near the top.
- Serves: Tom, Priya, Daniel.

### 5. Medium: on phone, research jargon and the scrubber come before the first plain result

- Element: Featured outcomes opens with the Latent CoT card and its embedded trajectory scrubber; SkipLegal, the plainest result on the site, starts about 1,550 px later.
- Change: on home, lead Featured outcomes with SkipLegal, and keep the scrubber on the case study only (or collapse it on phone behind a "Try the trajectory scrubber" button). Consider opening the pitch reel on SkipLegal too; "Watch the 25 s pitch" currently starts on the research video.
- Serves: Tom, Priya, Daniel.

### 6. Medium: outcomes without a measure or baseline, and cards that fail the three-second test

- Element: Einstein Vision "3D placement accuracy rose 50% and scene realism 75%"; Scene Mood Classifier "standardized ports removed a class of downtime"; on `/projects`, "The detector ran live with high accuracy", "The system detects and translates multiple gestures into text in real time", the tiles "SSD Architecture" and "4 Team size", and "Produced physics saliency maps, degradation curves ... and 15 ablation runs".
- Change: name the measure and the baseline for each percentage (how realism was scored, against what); where no number exists, state the honest outcome in words; group the 2020 to 2021 projects into one "Earlier work" row on `/projects`.
- Serves: Daniel, Mei.

### 7. Medium: the numbers ledger counts the wrong things, and its counts do not reconcile

- Element: "The portfolio in numbers": "31 certifications and badges", "19 public repositories on GitHub, 15 followers", "5.6 years since the first internship, Mar 2021". The ledger's "17 awards, honors, fellowships and contests" does not match the Recognition band (6 + 4 + 2 + 4 = 16) or `/about` ("6 awards, 4 contest results, 4 honors, 2 certifications, 2 fellowships and 1 publication"). The "5.6" also sits out of line with the other figures at 1440 and 390.
- Change: replace the ledger with outcome numbers from the work (3 to 4 days to 5 to 10 minutes; p95 200 ms to 95 ms; CI/CD across 20+ projects; 2 years as Lead DevOps Engineer), or cut it. Drop the follower count. Make the recognition totals agree everywhere.
- Serves: Daniel, Mei.

### 8. Medium: the case study never states her role

- Element: `/projects/latent-cot` Details list a "Team" of five co-authors, but "Co-first author and lead pipeline engineer" appears only on `/research`.
- Change: add a "Role" row to Details, and mark which highlights are hers (the pipeline and CUDA work read as hers, but only she can confirm).
- Serves: Mei, Daniel.

### 9. Medium: the "Production system 1" filter undersells what shipped

- Element: the `/projects` chip "PRODUCTION SYSTEM 1" among 13 categories, which reads as "1 of 23 is real".
- Change: drop "production system" as a category and add a separate "Shipped" badge for work with an outside user or a public release: SkipLegal (sponsor handoff), AutoGit (VS Code Marketplace), Scene Mood Classifier (two live Hugging Face Spaces), this site.
- Serves: Daniel.

### 10. Medium: the colleagues band hides who these people were to her

- Element: the home subtitle "5 recommendations, from Persistent Systems and Broadspire." sits over cards showing current employers (Tata Consultancy Services, Planview, Magnetar, Infosys) without the relation line `/about` shows ("Colleague at Persistent Systems", "Client at Broadspire"). All five are about DevOps.
- Change: add the relation line to the home cards; reword the subtitle to "on her Lead DevOps work at Persistent Systems" so the DevOps focus reads as intended; add an ML-era reference (sponsor, advisor) if one exists.
- Serves: Tom, Daniel.

### 11. Low: glossary gaps where they matter, and one gloss that oversells

- Element: the hero role line ("inference optimization", "MLOps") has no tips, though `content/glossary.json` already defines MLOps; "FoGen" has no entry. The ICML tip says "one of the three most selective annual research conferences in the field" next to a workshop poster.
- Change: apply the glossary to the hero role line; add a FoGen entry ("an ICML 2026 workshop on the foundations of deep generative models"); add to the ICML tip that workshops review papers separately from the main conference.
- Serves: Tom, Mei.

### 12. Low: phone-only friction already logged in `docs/qa/v2/guidelines-report.md`

- Element: the hanging indent in the hero summary (`components/motion-primitives/text-effect.tsx`), the hero summary at `opacity:0` until JavaScript runs, and the floating toolbar (`components/cta/island-bar.tsx`) of unlabelled icons covering the SkipLegal outcome in `home-390-glossary-tap.png`.
- Change: as in the guidelines report; for the personas, the toolbar should hide on scroll down, and the summary should render visible without JavaScript.
- Serves: Priya, Tom.

### 13. Low: research details a reviewer will probe

- Element: "Verified 28 of 28 reproducible numeric claims"; "p = 0.031" across "10 FairEM confusion-matrix metrics"; "Reviewer rating 6 of 6" tile without the scale or review count; the uncaptioned PHATE figure on the case study.
- Change: say who verified the claims and how; say whether the p value is corrected for the 10 metrics; show "6/6, confidence 3/3" on the tile as `/research` does; caption the figure.
- Serves: Mei.

### 14. Low: length and dilution on the home page

- Element: the home page at 390 is 20,806 px (about 25 screens), with Activity entries back to 2017, a 90-item skills wall and a doubled arrow in "See all 23 projects → →".
- Change: cap home Activity at 2025 to 2026 and link the rest; bold the five skills she would defend in each group; fix the arrow.
- Serves: Daniel, Tom.

## Keep

- The problem, what she did, what changed structure on every featured card. Daniel called it the best thing on the site.
- The SkipLegal copy: a named form, named AWS services, a before and after, a sponsor and the MVP.
- The plain work authorization line, "F-1 with OPT and STEM OPT: 3 years of US work authorization, no sponsorship needed up front." Both recruiters used it; consider moving it into the first screen.
- Download resume as the primary button, then Copy email; the phone menu's four large items and Email me.
- Glossary tips: plain definitions with a source link, tap works on phone, quiet on desktop.
- The Research section and `/research`: full author list with her name bolded, equal-contribution note, OpenReview, paper and code links, "confidence 3/3".
- The scrubber built on the paper's real result files, with its provenance note. Keep it; explain it (finding 1).
- Honest framing already in place: "Poster, ICML 2026 FoGen Workshop" rather than "ICML paper", "2+ years of production DevOps experience", "Most course projects stop at a model".
- The pitch hook "You can't read a model's latent thoughts. But you can track where they go." Tom understood it on first read.
- Real names, photos and LinkedIn links on the recommendations.

## Verdict on the six-second test

Not a pass for all four. The first screen at 390 tells every persona what she is and gives every one a reason to continue, but it names no tool and no result, and its credential row invites a misread. Daniel and Mei pass; Priya and Tom pass only partly. Findings 2, 3 and 4 (a concrete stack-and-result line, chips that state their relation, and the degree on the first screen) would let all four pass without adding height to the hero.
