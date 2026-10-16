# shreyaboyane.dev v2: mission-control rebuild, design spec

Date: 2026-10-15. Path: architectural. Branch `redesign-2026-v2` (child of `redesign-2026`), PR back into `redesign-2026`. Approval: the user pre-authorized autonomous end-to-end execution; this spec records the design that execution follows.

## 1. Goal

Turn the v1 editorial site (reads as a business product page) into a portfolio that reads, without saying it, as an AI, robotics and MLOps engineer who ships: professional sci-fi, subtle cyberpunk, polished and rich, every visual interactive without being loud, one page carrying most of the story, fluid motion, a first screen a recruiter can scan in six seconds, and content that passes the three-second test in every section (what was the problem, what did she do, what changed).

Non-goals: light theme (removed), chat widget, MCP server, Gaussian splat hero.

## 2. Audience and reading model

Primary reader: a tech recruiter on a phone, six seconds, F-pattern. They need, in order: role plus domain plus stack (headline), the strongest proof (one featured outcome), recognizable names (WPI, ICML, NVIDIA, Google Cloud, Persistent Systems, AWS), a contact action. Secondary: hiring manager on desktop with two minutes who opens one project, one paper and the pitch reel. Tertiary: ML engineer who reads a case study and runs a demo.

Section engagement model (reference material in the brief): hero 100 percent, featured project 60, live activity 40, testimonials 30, case studies 15, about 10, contact high once the decision is yes. Therefore the first two screens carry the pitch; everything below is depth.

## 3. Art direction

Taste draw (design-taste-frontend v2, sector personal-portfolio, tone technical): direction `contact-sheet` ("show everything at once, small, in order; the volume and consistency of the body of work is the statement"), studied reference Oimachi ("a studio homepage that behaves like a dense dashboard, tiled edge to edge with 8 px gutters instead of spaced-out sections"). Adopted as the composing device and read through the theme as a mission-control console.

Idea sentence: On this page, Shreya's own instruments (a portrait sensed with the depth model she used in Einstein Vision, the frames of her 15 pitch videos, and the measured outputs of 23 projects) become a mission-control sheet the visitor can scrub, play and query.

Live thing the visitor can do: scrub a project demo and watch the number change; play any pitch from the reel; ask the command palette where she worked.

Redraws recorded against the dealt sheet, each for a stated brand reason:
- Type: dealt Libre Franklin / Source Serif 4 (newspaper) replaced by Space Grotesk (display) + Geist (body) + Geist Mono (data) because the brief asks for a tech, sci-fi register. Five size steps only.
- Palette: dealt "soot and lime" kept in proportion (near-black ground, white ink, one action colour) with the colours taken from the subject: ground `oklch(0.13 0.02 255)` (ink-blue black), raised `oklch(0.17 0.02 255)`, ink `oklch(0.97 0.005 220)`, muted `oklch(0.72 0.01 230)`, accent cyan `oklch(0.86 0.12 205)` with accent ink `oklch(0.18 0.03 230)`, signal magenta `oklch(0.72 0.2 340)` reserved for at most one highlight per screen (active timeline node, point-cloud depth tint). No violet gradients, no purple orbs.
- Hero: dealt "sheet with a text cell" merged with the existing depth-portrait: the first screen is a text cell (who, what, stack, proof, actions) beside the point-cloud portrait, and the sheet (pitch-reel frames and featured outcomes) begins inside the first screen on desktop and on the second screen on phones.

House rules kept from the skill: no eyebrow labels on every section, no 01/02/03 numbering, no decorative dots, no scroll cues, no marquees, no three equal cards, no resting drop shadows, no gradients as decoration, real assets only, headlines of two lines or fewer, body 16 px or more, every reader-facing text at 4.5:1 or better. Allowed because the theme asks for it: monospace for data (numbers, labels on instruments, status lines), hairlines inside data tables and HUD frames only.

HUD grammar (the only ornaments, used consistently): 8 to 12 px gutters, square corners on media frames, 12 px radius on panels, a corner-bracket frame on interactive instruments, a mono status line under instruments ("depth map: Depth Anything V2, 54,000 points"), a 1 px scan sweep on the signature image only, grain at 4 percent, cyan focus and hover glow at low alpha, tabular numerals everywhere numbers appear.

Motion: signature move is the portrait resolving from scattered points on load (1.1 s, once). Everything else is quiet: 240 to 700 ms reveals, hover feedback on every control, scroll-linked progress on timelines, audio never. `prefers-reduced-motion` disables all of it. Hero loop has a pause control.

## 4. Information architecture

| Route | Purpose |
|---|---|
| `/` | Hero text cell + depth portrait; proof strip with logos; featured outcomes (strips, one per project, with demos); pitch reel; research; experience timeline with logos; stats ledger; live GitHub activity + now; testimonials with portraits; contact band |
| `/projects` | Dense index: filter chips in the URL, every project as a strip (frame, outcome line, metric, play) |
| `/projects/[slug]` | Three-second strip on top (Problem, What I did, What changed), hero metric, demo instrument, pitch video, results, stack, links |
| `/research` | Papers in depth, figures, authors, venue links |
| `/about` | New portrait as a floating 3D hologram card, story, education timeline, leadership and activity timeline, credential wallet (31 certifications without vertical space), recommendations with LinkedIn portraits, languages, availability |
| `/resume` | Unchanged apart from theme and glossary |
| machine surfaces | sitemap, robots, manifest, llms.txt, llms-full.txt, humans.txt, markdown negotiation, vCard at `/shreya-boyane.vcf` |

## 5. Features mapped to the brief

1. Speed: target Lighthouse mobile 90+ on all four categories and under 2 s load on a throttled phone. Rules: no client JS above the fold except the hero canvas (mounted after LCP), every instrument and video loaded with `next/dynamic` on intersection, posters as WebP at 960 px plus 480 px thumbnails, fonts self-hosted through `next/font`, no third-party scripts except analytics (deferred), image dimensions explicit, `content-visibility: auto` on long sections.
2. Responsive: 320 to 2560 px, dvh units, safe-area insets, 44 px targets, no horizontal page scroll, sideways rows only inside their own scroll container with snap and visible edges, real-device checks through the browser pane at 390 and 430.
3. Analytics: Vercel Analytics stays (page views answer "which projects get views"); custom events for every CTA, demo interaction and video play through one `track()` helper; optional Plausible or Umami script rendered only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` or `NEXT_PUBLIC_UMAMI_WEBSITE_ID` and `NEXT_PUBLIC_UMAMI_SRC` are set (documented in README; no account is created by this build).
4. Projects less wordy, more visual: every project page opens with the three-second strip and a visual; summaries capped at 40 words; highlights as scannable lines; one interactive instrument per featured project and shared instruments for the rest (see section 6).
5. CTAs: hero holds Download resume, Email (copy to clipboard, address assembled on the client so scrapers never see it), Book a call, Watch the 25 s pitch (opens the reel). A floating scroll island appears after the hero on every page: progress ring, Resume, Email, Call, and on mobile the command palette; dismissible, remembered per session. Command palette (Ctrl or Cmd K, and a visible button) searches sections, projects, papers, skills from profile.json and runs actions (copy email, download resume, open LinkedIn). vCard download. Web Share on mobile. Every section ends with one next action.
6. Glossary tips: `content/glossary.json` (term, match strings, one-sentence plain-English tip, source URL). A `Prose` component wraps the first occurrence of each term in a text block with a `Term` control: dotted underline, hover or focus shows a popover, tap on touch, Escape closes, `aria-describedby`; the popover carries the tip and, when a source exists, a "Read more" link. Applied to summaries, highlights, approach text, research abstracts and skills.
7. Certifications without vertical space: a credential wallet. Collapsed: a stacked deck (wallet-pass style, 3 visible edges) beside issuer logos with counts; tap or click an issuer to fan its certificates into a horizontal snap rail of cards (logo, title, issuer, year, verify link); keyboard navigable; reduced motion shows the rail without the fan. Height on a phone: about 220 px collapsed. Research agent's shortlist in `docs/research/certifications-ui.md` decides the final interaction.
8. Interactive timelines: one `Timeline` instrument used for experience, education, leadership and activity: a track with nodes and org logos, scroll-linked progress line, click or keyboard to expand a node (what she did, what changed, metrics), year scrubber on desktop, vertical rail on phones.
9. About portrait: the attached photo becomes a floating 3D hologram card: WebGL2 depth-displaced point field from the new depth map (same engine as the hero, denser points, cyan tint), tilt on pointer, slow float, scan sweep, static cut-out image fallback with `priority` off (not LCP).
10. Videos findable: pitch reel on the home page (filmstrip of 15 frames, hover preview on desktop, tap to play in a lightbox with next and previous), play button on every project strip and card, video at the top of each project page, `VideoObject` JSON-LD on every page that embeds one, and an `ItemList` of the reel.
11. Light mode removed: theme toggle, light tokens, init script, dual theme-color all deleted; `color-scheme: dark`.
12. Logos and faces: `content/logos.json` maps organization names to `public/logos/*`; logos appear in the proof strip, experience timeline, education, recognition table, certification wallet and footer links, rendered monochrome at rest and colour on hover. Recommendations show the recommender's LinkedIn portrait (shallow band crop), name, current title and organization from `content/people.json`.
13. Three-second test: every section and project page leads with Problem, What she did, What changed in one line each. Copy agent rewrites `profile.json` summaries and highlights to that shape; the drift guard adds a check that each project has `pitch: { problem, action, change }` under 24 words each.
14. First screen: name, role plus domain plus stack line, one proof line with logos, availability line, actions, portrait. Nothing else above the fold on a phone.

## 6. Instruments (small interactive demos)

Shared wrapper `Instrument`: HUD frame, title, mono status line, lazy mount on intersection, reduced-motion aware, keyboard operable, emits an analytics event on first interaction. Each instrument uses real data or a real mechanism; none invents predictions.

- latent-cot: dynamical-systems scrubber. A step slider moves a point cloud of sampled latent trajectories (2D projection shipped as a small JSON of real points) and shows contraction versus expansion for CODI and COCONUT.
- einstein-vision: before and after slider between the dash-cam frame and the Blender render.
- tumorlytix: reveal slider over the segmentation strip (input, anomaly map, mask, overlay).
- vio: toggle visual-inertial, vision-only and IMU-only trajectory figures with their ATE numbers.
- robofusion: pick a gesture chip, an SVG arm animates to the mapped joint angles from app.py.
- skiplegal: drop a document type into the pipeline, agents light up in order, the report JSON reveals.
- madwe and realmweaver-ai: wave function collapse toy on a small grid with real tiles, Regenerate button.
- buildings-built-in-minutes: drag to orbit the NeRF render (scrubs the orbit clip).
- trended-pathfinder: select real course titles, see the top TF-IDF terms computed client-side.
- autogit: typed terminal replay of the secret-scan block with real strings.
- medical-triage, fairprep, scene-mood-classifier, vla-physics and the rest: metric explorer (toggle models or settings, bars animate between reported numbers) or figure switcher.

## 7. Content changes

`profile.json` gains `pitch` per project, `now` (dated), `logos` references by name only (the map lives in logos.json), recommendations gain `person` slugs. `content/github.json` is a build-time snapshot (repos, stars, last push, languages) refreshed by `scripts/sync-github.mjs` during `prebuild` with a fallback to the committed file; the client also fetches recent public events at runtime with a one-hour cache. A GitHub Actions workflow runs weekly and calls a Vercel deploy hook when the secret is set, so the site stays a living document.

## 8. Device coverage, SEO and AI surfaces

Unchanged from v1 plus: `VideoObject` for the reel, `ItemList` of pitches, `Person.image` updated to the new portrait, `knowsAbout` from skills, glossary definitions exposed in `llms-full.txt`, vCard linked from Person. robots allows the same AI crawlers. Re-audit with the seo-audit and ai-seo skill checklists after the build.

## 9. Verification (harsh)

Build clean, drift guard, typecheck. Playwright scripts at 320, 360, 390, 430, 768, 1024, 1440, 2560: screenshots, no horizontal overflow, console errors zero, every instrument renders and responds, every video plays, every tooltip opens by keyboard and touch, timelines expand, wallet fans, palette finds. Lighthouse mobile and desktop on home, a project page, about, research, resume: 90+ each category. axe through Lighthouse plus the Web Interface Guidelines review of every component. Taste inspector (`scripts/inspect.mjs`) at three widths, critique and fix up to three rounds. Link check. Persona tests: six-second and two-minute protocols run by subagent personas (recruiter on phone, hiring manager, ML researcher) against screenshots and page text, scored on who, what, why talk, problem, action, change, drop-off; MiroFish used instead if it can run without new accounts (feasibility doc decides).

## 10. Delivery

Commits per feature on `redesign-2026-v2`, pushed, PR into `redesign-2026` with QA numbers, caveats and screenshots. Master untouched.
