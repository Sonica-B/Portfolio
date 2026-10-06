# shreyaboyane.dev 2026 rebuild: design spec

Date: 2026-10-06. Path: architectural. Approval: the user pre-authorized autonomous end-to-end execution in the request; this spec records the design that execution follows.

## 1. Goal

Replace the 2021-style template (particle constellation, carousel, stale content) with a 2026 editorial site that reads as "publishing researcher who ships production ML systems", carries every verified detail from resume, LinkedIn, GitHub, ORCID and older CVs, maximizes search and AI-engine visibility, and works on every device class. Subtle through-line: she gets the job done.

Non-goals: chat widget, MCP server, Gaussian splat hero (follow-ups in section 10).

## 2. Audience and tone

Primary reader: recruiter or hiring manager on a phone, often inside the LinkedIn in-app browser, with 20 seconds of attention. Secondary: ML engineer or researcher on desktop doing a deep read. Tone: quantified, direct, no hype words, no em dashes (her own style rule), sentence case headings, X-Y-Z claims (credential, evidence, outcome).

Design read (taste skill): developer portfolio for hiring managers, editorial dark language, dials VARIANCE 7, MOTION 6, DENSITY 4. Redesign mode: overhaul of visuals, preserve content and the root URL.

## 3. Content model (single source of truth)

`portfolio/content/profile.json`, typed by `portfolio/lib/content.ts`. Every page, JSON-LD block, sitemap entry, OG image, `llms.txt`, markdown negotiation response and the HTML resume read from it. Nothing is hardcoded in components.

Top-level keys: meta, identity (with availability and work authorization), links, education, publications, research, experience, projects, recognition, certifications, activity, leadership, recommendations, skills. Dates are ISO `YYYY-MM`; `end: null` means ongoing.

Corrections baked in: M.S. completed May 2026, GPA 3.9/4.0, B.E. Jun 2017 to May 2022, "2+ years production DevOps", location San Jose CA, no BCI claim, Hypersonic Vehicles entry removed (unverified), ICML framed as a workshop poster, Golden Ticket framed as a community contest honorable mention.

Drift guard: `scripts/check-profile.mjs` runs on `prebuild`; it fails if an entry with an end date in the past is marked ongoing, if the word "pursuing" appears, if the GPA is not 3.9, if any publication lacks a venue URL, or if an em dash appears anywhere in the content.

## 4. Information architecture and routes

| Route | Purpose |
|---|---|
| `/` | Hero, proof strip, featured work, research, experience ledger, skills, recognition, activity, contact |
| `/projects` | Index of all projects, filterable by tag with the filter in the URL |
| `/projects/[slug]` | 23 detail pages: hero metric, problem, approach, results, stack, links, pitch video |
| `/research` | Both papers in depth with real figures, author lists and venue links |
| `/resume` | HTML resume with print stylesheet and link to the PDF |
| `/about` | Narrative bio, recommendations, leadership, languages, certification wall |
| `/opengraph-image` and per-project OG | Generated with `next/og` from profile data |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/llms.txt`, `/llms-full.txt`, `/humans.txt` | Machine surfaces |
| `proxy.ts` | Serves markdown when `Accept: text/markdown` |
| `not-found.tsx` | Branded 404 |

All routes are static output. The old LinkedIn post API route is removed.

## 5. Visual system

Editorial dark by default with a light theme behind a toggle. Tokens in OKLCH as CSS variables exposed through Tailwind 4 `@theme inline`:

- Dark: base `oklch(0.14 0.012 260)`, raised `oklch(0.18 0.012 260)`, line `oklch(0.28 0.01 260)`, text `oklch(0.96 0.006 80)`, secondary `oklch(0.74 0.01 80)` (passes 4.5:1 on base and raised), accent amber `oklch(0.83 0.16 78)`, accent ink `oklch(0.2 0.03 78)`.
- Light: base `oklch(0.985 0.004 80)`, raised `oklch(0.95 0.006 80)`, text `oklch(0.2 0.012 260)`, secondary `oklch(0.42 0.012 260)`, accent `oklch(0.62 0.15 70)`.
- Fonts: Bricolage Grotesque (display), Geist (body and UI, tabular numerals), Geist Mono (metrics). Loaded with `next/font/google`, swap. No serif, no Inter.
- Icons: Phosphor only, one weight.
- Fluid type with `clamp()`, `text-wrap: balance` on headings and `pretty` on paragraphs. One radius system: 12 px on containers, pill on buttons.
- Surfaces: hairline rules and spacing instead of bordered cards; one spotlight bento strip for metrics; fixed SVG grain overlay at 4 percent; shadows tinted to the surface hue.
- Hero stack: headline, 20-word subtext, primary CTA (resume PDF) and secondary CTA (email). Proof strip (ICML poster, Golden Ticket honorable mention, GQP MVP, work authorization) sits directly under the hero. At most one eyebrow label per three sections, no section numbering, no scroll cue, no decorative dots, no marquee.
- Motion: CSS for hover and reveals; Motion-Primitives `text-effect`, `in-view`, `animated-number`, `spotlight`, `scroll-progress`, `magnetic`, `progressive-blur`, `text-shimmer`, `tilt` for interactive islands. Reveals fire on mount when already in view. `prefers-reduced-motion` disables everything non-essential. The hero loop has a visible pause control.

## 6. The one 3D idea: depth-field portrait

Her portrait run through Depth Anything V2 (the model family she used in Einstein Vision) produces a depth map. The hero renders the portrait as a WebGL2 point cloud displaced by depth: parallax follows the pointer, points separate on scroll. A caption states the pipeline. Assets: portrait WebP plus depth PNG, well under 300 KB combined. Implementation: raw WebGL2 in one client component, no three.js. Fallbacks: reduced motion, no WebGL2 or `Save-Data` render the flat portrait `<img>` with `priority`. The static portrait is the LCP element; the canvas mounts after.

## 7. Device coverage

Phones 320 to 430 px (iOS Safari, Android Chrome, LinkedIn and Instagram WebViews), foldables, tablets in both orientations, laptops, 1440 and 2560 desktops, TV-scale widths with a 1440 px container cap. Techniques: `100dvh`, `env(safe-area-inset-*)`, container queries, 44 px touch targets, `touch-action: manipulation`, no horizontal overflow, `color-scheme`, `theme-color`, print stylesheet for `/resume`, `content-visibility: auto` on long sections, images with explicit dimensions served as AVIF or WebP through `next/image`.

## 8. SEO and AI visibility

- One `h1` per page, keyword-led titles with a template, 150 to 160 character descriptions, canonical per route.
- JSON-LD: `Person` with full `sameAs` (LinkedIn, GitHub, ORCID, Hugging Face, Google Developers, Dev.to, HackerRank, VS Code Marketplace), `ProfilePage`, `WebSite`, `BreadcrumbList`, `ScholarlyArticle` per publication, `SoftwareSourceCode` per project with the repo URL, `ItemList` on the index, `VideoObject` per pitch video.
- `robots.txt` allows Googlebot, Bingbot, GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot and Google-Extended.
- `llms.txt`, `llms-full.txt` and markdown content negotiation generated from the content model.
- Extractable structure: direct answer first, 40 to 60 word summary blocks, dated "last updated" line, author attribution, dated statistics with sources.

## 9. Pitch videos

One 15 to 25 second video per GitHub project with substance (16 repos) via the `brag` skill and Hyperframes, tone `polished`, landscape 1920x1080, music on, no voice. Output `public/videos/<slug>.mp4` plus poster `.jpg`, embedded on the project page with `<video muted playsinline controls preload="none" poster>`. Share copy saved under `docs/videos/`.

## 10. Follow-ups (not in this build)

MCP server at `/api/mcp`, "ask my resume" chat with a spend ceiling, scheduled profile sync from GitHub and ORCID, Gaussian splat hero.

## 11. Delivery

Branch `redesign-2026` pushed to `Sonica-B/Portfolio` with a pull request so Vercel builds a preview URL. Master is not touched; merging is the user's click. Verification before the PR: `next build` clean, drift guard passing, Playwright screenshots at eight viewports, Lighthouse mobile run, axe scan, Web Interface Guidelines review of every component, link check.
