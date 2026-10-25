# Brag Plan: TrendED Pathfinder

Invocation: `/brag --tone polished --format landscape` (music on, SFX sparse, no voice).
Source of truth for copy: `portfolio/content/profile.json` → project `trended-pathfinder`, plus the cloned repo (README.md, static/index.html, static/scripts.js, comparator.py, app/main.py, app/routers/*.py, data/json/wpi_courses.json, data/json/adzunaAPI_jobs.json).

## Inspection rubric (Step 1)

1. **What is the app?** An NLP career recommender: pick a department and courses, and it matches course descriptions to job postings with TF-IDF and cosine similarity (plus LDA topics), then recommends courses that close the skill gaps it finds.
2. **Most impressive claim?** Scaled to 10,000+ job descriptions, 5,000 resumes and 300+ course catalogs; 95% match accuracy and 90% NLP precision; used by 1,000+ students.
3. **Visual hook?** The product's own page (`static/index.html`) rendered by headless Chrome against the repo's own matcher and data: the "Course Selection" form with the real WPI Computer Science catalog, then the job cards it returns.
4. **What to show from the actual UI?** Two real screenshots: the course selection form (department "Computer Science", real course codes and titles) and the "Find Jobs" results (three real postings: Microsoft, Apple, Neuralink), plus the real code lines from comparator.py and the real FastAPI routes.
5. **Shortest satisfying video?** About 24 seconds: hook with the form, the results, the data scale and API, the measured results with the skills vocabulary, end card.
6. **Tone?** Preset `polished` (user-specified). Creative direction: a quiet product film for a campus tool; the product's own page carries it.
7. **Audio?** Steady clean bed (vol-12), sparse low-risk SFX, subtle audio-reactive glow.
8. **Share caption?** See "Share copy" below.
9. **User flow worth showing?** Select a department → tick courses → Find Jobs → ranked job cards (scene 1 to scene 2).

## What is this app?
TrendED Pathfinder turns the courses a student took into a ranked list of matching job postings and the courses that would close their skill gaps.

## The angle
Job boards filter on job type and company, not on what a specific student can do and should learn next. The video shows the real page doing exactly that: real catalog in, real postings out, with the matching code and the measured numbers behind it.

## Hook (first 2-3 seconds)
"Your courses in. Matching roles out." with the product's own course-selection page already open on the right (department: Computer Science, the real catalog listed).

## Key moments (the middle)
- The results page slides in: three real postings returned by the matcher, under "Matched with TF-IDF and cosine similarity." and the real comparator lines (`TfidfVectorizer(stop_words='english')`, `cosine_similarity(course_vectors, job_vectors)`, `.mean(axis=0).argsort()[-top_n:][::-1]`, `LatentDirichletAllocation(n_components=5)`), then "Then it suggests the courses that close your skill gaps."
- Data scale counting up: 10,000+ job descriptions, 5,000 resumes, 300+ course catalogs, scraped with BeautifulSoup and the Adzuna API; the real FastAPI routes arrive on the beat (`GET /courses/get_departments`, `GET /courses/get_courses`, `GET /courses/get_skills`, `GET /jobs/find_jobs`).
- Measured results: 95% match accuracy, 90% NLP precision, 1,000+ students, 50% fewer irrelevant results, beside ten entries from the real TECHNICAL_SKILLS vocabulary.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/trended-pathfinder", with the TrendED logo.

## User flow worth showing
Select department → tick CS 4341, CS 4342, CS 4432 → Find Jobs (top 3) → job cards (captured from the real page with the real matcher).

## Tone
- Preset: polished
- Creative direction: quiet product film for a campus tool; the product's own page carries it
- Interpretation: five scenes, long holds, blur crossfades, one push slide into the results, counters instead of adjectives, real strings only.

## Format: landscape, 1920x1080
## Duration: 24.5 seconds

## Visual identity (from the portfolio site)
- Background: #121218; accent #f0b35c; text #f4f2ee, secondary #b9b5ae
- Display font: Bricolage Grotesque; body font: Geist; code: JetBrains Mono (bundled)
- The screenshots keep the product's own blue (#0073e6) inside browser-frame cards
- Strongest visual element: the two real screenshots of the running page
- No em dashes on screen; sentence case throughout

## Share copy (draft)
Introducing TrendED Pathfinder: a career recommender that reads 10,000+ job descriptions, 5,000 resumes and 300+ course catalogs to match students to roles at 95% accuracy and suggest the courses that close their gaps.

## Audio direction
- Role: steady professional bed with sparse motion-matched accents
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`; lane 0 → 0.36 over 0.8 s, hold, 23.0 → 24.4 s to 0
- Music cue guidance: bundled preset (109.96 BPM). Beat grid: 6.56, 7.09, 7.64, 8.19 (code lines), 14.20, 14.73, 15.29, 15.84 (routes), 18.02 to 19.66 (skills). Strong-cue locks: 13.11 (scale counters land), 17.47 (cut to results), 22.37 (site line, bong).
- Audio-reactive treatment: subtle amber glow on smoothed bass. No waveforms.
- SFX posture: sparse, low risk: drop on the page card, click on the push to results, soft impact on the counters, bong on the end card.
- Restraint rule: nothing per chip, music never above 0.36.

## Storyboard

### Scene 1, Your courses in, 6.0 s (0.00 to 6.00)
Headline "Your courses in. Matching roles out." lands at 0.25 s; at 0.9 s the page's own line rises: "Select a department and courses to find the most relevant job postings." At 1.09 s the browser card with the real course-selection screenshot pops in on the right and drifts with a slow Ken Burns. At 3.27 s a chip under the headline: "Department: Computer Science, 153 courses in the catalog" (counted from wpi_courses.json). At 4.39 s a second chip: "CS 4341, CS 4342, CS 4432 selected, top 3".
Sequential/interaction: chips arrive on beats; the page card breathes.
Audio: drop on the card. Transition: push slide → Scene 2

### Scene 2, Find Jobs, 6.0 s (6.00 to 12.02)
The results screenshot slides in on the left. Right: eyebrow "Find Jobs", headline "Matched with TF-IDF and cosine similarity.", four real code lines typed on beats (6.56 to 8.19), then at 8.74 s: "Then it suggests the courses that close your skill gaps."
Audio: click on the push. Transition: blur crossfade → Scene 3

### Scene 3, The data, 5.45 s (12.02 to 17.47)
Eyebrow "Scraped with BeautifulSoup and the Adzuna API". Three counters land on the 13.11 strong cue: 10,000+ job descriptions, 5,000 resumes, 300+ course catalogs. Second eyebrow "TrendEd Pathfinder API, FastAPI" and four route chips on beats 14.20 to 15.84.
Audio: soft impact at 13.11. Transition: blur crossfade on 17.47 → Scene 4

### Scene 4, Measured, 3.8 s (17.47 to 21.28)
Left: counters 95% match accuracy, 90% NLP precision, 1,000+ students, 50% fewer irrelevant results (land by 18.56). Right: eyebrow "TECHNICAL_SKILLS, from comparator.py" and ten skill chips arriving on the beat grid.
Transition: slow crossfade → Scene 5

### Scene 5, End card, 3.2 s (21.28 to 24.50)
Rule, "Shreya Boyane" (21.84), "shreyaboyane.dev" (22.37, bong), "/projects/trended-pathfinder" (22.93), logo at right. Music fades out by 24.4.

**Music mood:** steady and clean (polished).
**Audio summary:** quiet bed, one drop, one click, one soft impact, one bong, fade out.

## Reading-time check
Headline (6 words, 1.8 s) 5.3 s; page line (12 words, 3.6 s) 4.7 s; chips 1.3 s or more; results headline (6 words) 5.3 s; code lines hold 3.4 s or more; skill-gap line (10 words, 3.0 s) 2.9 s; counters labels 3.6 s; routes 1.3 s or more; stats labels 2.7 s; skills chips 1.2 s or more; end-card lines 1.4 s or more.
