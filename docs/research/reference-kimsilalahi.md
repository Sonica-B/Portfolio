# Reference study: kimsilalahi.vercel.app

Studied 2026-10-15 in Chrome at 1440 x 900 and 390 x 844. Screenshots: `docs/research/reference/` 01 to 08 (desktop 1440, by section) and 09 to 10 (mobile 390). Companion dev.to post: "People guessed I used Claude Opus 5.5, I used a free model instead".

## Structure

Single page, 11,191 px tall at 1440 x 900. Every block carries a numbered mono label (01 Approach to 07 Contact) and at least one figure.

- Header, fixed 80 px: logo "KS." (becomes the full name once the hero name scrolls off), five anchor links, CV pill. Fixed right rail of eight ticks, active tick orange.
- Hero `#top`, 100svh: eyebrow with pulsing orange dot "AI engineer, Medan, Indonesia"; h1 "Kimsang Silalahi." with an orange square full stop; lead "I build LLM apps, retrieval systems and MLOps that reach production." (last word italic serif); CTAs "View work" and "CV". Right seven columns: plate "FIG. 01, Player segmentation, K-means k = 4" , live canvas scatter, readouts ITER, INERTIA, FITTING, probe caption.
- Marquee strip, 44 px: six capability labels looping.
- Approach `#manifesto`, 959 px: one 56 px statement with scroll-linked word fill, then four counters (10, 7,043, 245, 18/18) with mono captions.
- Selected work `#work`, 2,346 px, light theme: h2 "Ten projects, 24 figures."; six filter pills with counts; ten plates in four columns, each a dark card with "FIG. n.A", year, a project-specific animated SVG and a caption like "04 · MLOps, Telco Churn MLOps, 3 figs · 6 shots". A click opens a right-hand drawer: title, subtitle, two sentences, one big stat, every figure, screenshots, links.
- Method `#method`, 1,333 px: h2 "Retrieve. Evaluate. Ship."; plates 3.1 RAG pipeline with per-document scores, 3.2 causal attention heatmap, 3.3 isometric five-layer stack; under each a numbered h3, one claim and a mono tool list.
- About `#about`, 1,116 px: portrait plate "FIG. 4.1, 02 / 03" with toggles Formal, Everyday, Experiment; h2 "A generalist leaning deep."; quote; two paragraphs; facts table.
- Signal `#discovery`, 769 px: "#1" at 170 px orange, "First of 20 in a ChatGPT search for AI talent in Medan", a disclaimer and an evidence screenshot.
- Writing `#writing`, 1,952 px, light: five rows with number, category, title, summary, date, read time, thumbnail.
- Experience `#experience`, 870 px, light: h2 "Where the work happened.", "Full CV", four accordion rows (dates, org and role), first open with numbered bullets; three credential tiles.
- Contact `footer#contact`, 100svh: "Let's build something that thinks.", email pill, CV pill, "Open to AI engineering roles · remote-first", four link cards with handles, live local time, "Back to top".

Above the fold at 1440 x 900: the whole hero including the figure (screenshot 01). At 390 x 844: logo and Menu pill, eyebrow, two-line name, lead, both CTAs, then the figure plate with readouts (screenshot 09).

## Signals

The page never says "serious ML engineer"; it shows instrument panels.

- Plate chrome everywhere: FIG. 01, FIG. 3.2, "02 / 03", "K-means · k = 4", axis labels Win rate and KDA, ITER 02, INERTIA 0.0195, FITTING in orange.
- A live algorithm in the hero: k-means iterates on the thesis dataset; the visitor can probe a point and reseed.
- Method figures are literal system diagrams: retrieval scores, an attention heatmap, a serving stack with "request to trace".
- Ops vocabulary inside figures: drift to alert, P95 42 ms, req/min 1.2k, model v1.4, SHAP drivers, "Precision@50 from 0.24 to 0.74".
- Typography: Geist 500 with tight tracking for display, Geist Mono 11 px uppercase for data, Instrument Serif italic for one word per heading; warm dark plates, 1 px lines, no gradients or glow.
- Honesty markers: the ChatGPT claim carries a disclaimer, captions count figures and screenshots, the footer shows local time.

## Tokens

Fonts, self-hosted woff2: `--ff-sans` Geist Variable, `--ff-mono` Geist Mono Variable, `--ff-serif` Instrument Serif 400 italic.

Type scale: display `clamp(3.4rem,12.5vw,12.5rem)`, h1 `clamp(2.6rem,6.4vw,6rem)`, h2 `clamp(2rem,4.2vw,3.75rem)`, h3 `clamp(1.5rem,2.6vw,2.4rem)`, lead `clamp(1.35rem,2.3vw,2.25rem)`, body `clamp(1rem,.95rem + .25vw,1.125rem)`. At 1440: hero h1 121 px (weight 500, -0.045em, line height 0.86), h2 92 px, manifesto 56 px, lead 33 px, body 18 px, labels 11 px mono uppercase at +0.14em.

Colors (oklch), two themes on `html[data-theme]` switched per section by `data-bg` over 0.6 s: dark `--bg oklch(15.5% .006 65)` (about #121110), `--fg oklch(93.5% .012 85)` (about #EDE9E1), `--accent oklch(73% .185 44)`; light `--bg oklch(94.5% .012 85)`, `--fg oklch(17% .008 60)`, `--accent oklch(62% .205 40)`. Derived by color-mix from currentColor: `--line` 14%, `--line-strong` 32%, `--muted` 58%, `--faint` 36%, `--surface` 5%.

Layout: `--gutter clamp(1.25rem,4.5vw,4.5rem)`, `--section clamp(6rem,13vw,13rem)`, `--nav-h 5rem`, 12-column grid.

Radius 0 on plates and cards, 999px on pills. No shadows except the drawer (0 40px 80px rgba(0,0,0,.15)); no gradients; borders 1 px `--line`; grain overlay at opacity .05. Easing: `--e-out cubic-bezier(.16,1,.3,1)`, `--e-inout cubic-bezier(.87,0,.13,1)`, `--e-smooth cubic-bezier(.4,0,.2,1)`.

## Motion

Stack: Vite plus vanilla TypeScript (106 KB gz), GSAP code-split (48 KB gz), Lenis (6 KB). No three.js, WebGL or framer-motion. One 2D canvas, 16 SVGs, the rest CSS.

- Load: eyebrow, lead and CTAs fade and rise (`data-intro`); h1 lines slide up out of overflow masks; the figure plate reveals by `clip-path: inset`; k-means starts fitting.
- Scroll reveal, once, not scrubbed: `data-reveal` on 45 elements, stagger 0 to 0.24 s, opacity 1.15 s and transform 2.1 s on `--e-out` (0.9 and 1.4 s for small items); line masks on six headings; `card-in` 0.8 s on plates; counters; theme crossfade; logo swap.
- Scroll-linked: only the manifesto word fill. No pinning, parallax or scroll cue.
- Idle: `pulse-dot` 2.4 s, marquee 48 s, `figure-breathe` (5 px drift) plus trace, bar and dash loops that keep SVG figures faintly alive.
- Hover, fine pointers only: body `cursor: none` with a 10 px difference-blend dot that grows into a ring on links and plates; nav links grow a short orange underline; plates shift border-color 0.5 s and transform 0.9 s.
- `prefers-reduced-motion` handled.

Participation without noise: the probe tooltip ("0.63, 0.65 to C4" with dashed guides), Reseed, filters, the portrait toggle, the accordion and the drawer. All optional, all quiet.

## Interactive visuals

1. Hero k-means canvas: hover probes the nearest centroid with a tooltip; Reseed restarts; readouts show iteration, inertia and status.
2. Work filters: click a pill, the grid reflows with counts.
3. Plate drawer: click a plate for figures, screenshots, one stat and links; Close or Escape.
4. Portrait toggle: Formal, Everyday, Experiment with a 02 / 03 counter.
5. Evidence Enlarge lightbox, experience accordion rows, rail ticks (click to jump, active follows scroll) and a footer clock. Plate figures animate but take no input.

## Responsiveness

Breakpoints: Tailwind 40, 48, 64 and 80 rem plus custom 420, 760, 900, 980 and 1280 px, with hover and pointer gates. At 390 the hero stacks text then figure; h1 54 px, lead 21.6 px, body 16.2 px, labels 11 px; nav collapses to a Menu button (95 x 48) opening a full-screen overlay with six 48 px items plus CV and Email; rail, cursor, grain and probe caption hidden; work grid one column; page 16,291 px tall. Touch targets: 16 of 42 under 44 px (pills 28 px tall, hero CTAs 35 to 39 px, "Back to top" 11 px).

## Performance

Eleven requests on first load: a 760 B SPA shell (content is JS-rendered), index.js 106 KB gz, gsap 48 KB, lenis 6 KB, CSS 11.7 KB, three woff2 75.5 KB, manifest, two icons 20 KB: about 268 KB, DOMContentLoaded about 600 ms, 1,703 nodes. Nine images, all WebP and lazy, none at first paint. No analytics or third-party requests.

## CTAs

Primary "View work" in the hero; "CV" four times (header, hero, experience, contact); contact adds the email pill, an "open to roles" line and four social cards. About 43 targets in all. Attention is kept by the fixed header and rail, a figure in every section, counts that say what a click reveals ("3 figs · 1 shot"), a drawer that keeps the visitor on the page, and a full-height close.

## Blog post takeaways

- Rebuilt in about half a day with a free model in a code editor. The model matters less than deciding what a visitor should notice, explore and do next.
- "Spatial design" means 2D order: spacing groups, headings rank, links show the next move.
- No forced journey: read about, browse projects, open a post, download the CV, or leave.
- A project card answers: what is this, what did I build, where can I inspect it. Demo and repository are different proofs; show only the links that exist.
- The ChatGPT ranking is an observation, not a claim; curiosity is a signal, not measured behaviour.
- AI did copy, scaffolding, styling and debugging; the human chose what belonged, reviewed code, checked claims, verified links.
- The site is not an agent; adding one would be a separate product decision with task, controls, failure handling and tests.

## Borrow for Shreya

1. One real figure per section with plate chrome (mono header, 1 px border, readout footer, caption, FIG. number): a pipeline trace, an eval curve, a latency or cost series from real runs.
2. Counter row with denominators: four exact numbers from profile.json, counting up once.
3. Project plates plus drawer: project-specific figure, "n figures · m screenshots" count, drawer with every asset, one stat, only the links that exist.
4. Label system: 11 px mono uppercase at +0.14em for section numbers, figure labels, dates and tool lists; display at weight 500 and -0.04em; one serif italic word per heading at most.
5. Token model: bg, fg, accent plus color-mix derived line, muted, faint, surface; clamp type scale; `--section` and `--gutter` clamps; `cubic-bezier(.16,1,.3,1)` for reveals.
6. Quiet motion: once-only reveals (opacity plus 16 to 24 px rise, 0.9 to 1.2 s, 0.05 to 0.1 s stagger), masked heading lines, no pins, reduced motion honoured.
7. Experience as accordion rows (dates, org and role, numbered bullets, first open) instead of cards.
8. Contact as a full-height closing statement: email pill, one "open to" line, link cards with handles.
9. Rail plus logo swap for orientation instead of scroll cues.
10. Writing rows: number, category, title, one-line summary, date, read time.
11. Budget: self-hosted variable fonts, lazy WebP, under 300 KB first load, server-rendered.

## Avoid

- The marquee strip and the scroll-linked word fill (a scroll cue that hides copy).
- The "#1 in ChatGPT" section: unverifiable, hype adjacent.
- Invented figure data (the 82/100 gauge, placeholder histograms): real runs or nothing.
- Three equal credential tiles.
- Custom cursor and grain overlay: cosmetic, cost accessibility.
- Em dashes (in every section) and title case.
- Pills under 44 px on touch, and a JS-only SPA shell.
- Per-section theme flipping; one theme done well is enough.
