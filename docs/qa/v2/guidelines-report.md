# QA guidelines report, portfolio v2

Branch `redesign-2026-v2`, app in `portfolio/`, reviewed 2026-10-16 against the production build served at `http://localhost:3123`.

Three passes: (1) Web Interface Guidelines review of every file under `portfolio/app/**/*.tsx` and `portfolio/components/**/*.tsx` (114 files, 12,707 lines, all read), (2) taste inspector (`lint.mjs` over `app` and `components`, `inspect.mjs` on `/`, `/projects/latent-cot` and `/about` at 1440, 768 and 390, then the critique rubric on the 26 saved screenshots), (3) copy scan of the rendered HTML of six pages.

Caveat that affects the numbers below: the served build (`.next/BUILD_ID`, 23:45) predates uncommitted working-tree edits to `components/site/footer.tsx`, `lib/jsonld.tsx`, `app/layout.tsx`, the `llms*.txt`, `humans.txt` and sitemap routes, `proxy.ts` and `scripts/build-markdown.mjs` (23:59 to 00:00). The copy scan and the screenshots reflect the build; the file and line findings reflect the source as it is now. Where the two differ it is called out.

Paths below are relative to `portfolio/` unless they start with `docs/`.

## Guidelines findings

Format: `file:line - issue`, grouped by severity. Rules that do not apply were skipped: forms (no forms beyond the palette input, range sliders and checkboxes), i18n language detection, currency formatting, destructive actions, animated GIFs, `<select>` styling, `beforeunload`. The guideline "Title Case for headings and buttons" was not applied because the site's house style is sentence case (see the copy scan).

### High

app/resume/page.tsx:72 - `<a href={links.email}>{identity.email}</a>` ships the raw address and a `mailto:` in the HTML of every build of `/resume`; the rest of the site copies the address on the client (nav, hero, contact, island, palette) precisely so scrapers never see it. The served build also still has the footer `mailto:` (`footer.tsx:37` at HEAD) and `"email": "mailto:..."` in the Person JSON-LD; both are already removed in the uncommitted working tree (footer now uses `CopyEmail`, `lib/jsonld.tsx` drops the key), so rebuild and this page is the only remaining source.
components/motion-primitives/text-effect.tsx:163-166 - `splitText` keeps whitespace tokens and renders each as an `inline-block whitespace-pre` span, so when the hero tagline wraps, the next line starts with a visible indent (seen at 1440 and 390: "I build production ML systems end to end, / [space]from data and training infrastructure"). Split as `/(\S+\s*)/` so each word carries its trailing space, or set the space segments to `whitespace-normal`.
components/hero/hero.tsx:48 - the `TextEffect` tagline animates per word with Motion (JS), which the CSS `prefers-reduced-motion` blanket in `globals.css:86-94` cannot stop; no `useReducedMotion` guard and no `MotionConfig reducedMotion="user"`. The spec says reduced motion disables all of it.
components/site/nav.tsx:141-149 - mobile menu is a `div role="dialog" aria-modal="true"` with no focus trap and no `inert` on `main`/`footer`; Tab walks out of the menu while aria-modal says it cannot. Mark the page `inert` while open, or use `<dialog>`/popover like the palette.
components/site/nav.tsx:85-95 - closing the menu (Escape, route change) never returns focus to the toggle; focus is left on a now-hidden link and falls to `body`.
components/cta/palette-dialog.tsx:155-176 - the combobox input has no accessible name (no `<label>`, no `aria-label`; placeholder only).
components/cta/palette-dialog.tsx:175 - `outline-none` on the input with no `focus-visible` replacement; the global ring from `globals.css:80` is removed and nothing takes its place (add a `focus-within` ring on the search bar at line 153).
components/credentials/issuer-anchors.tsx:31-38 - `Mark` draws the logo in a `size-7` box that does not clip; wide wordmarks (Persistent) overflow and sit on top of the issuer name in the desktop ledger and on top of the count in the phone chips (visible in the about screenshots). `overflow-hidden` plus `max-w-full` on the logo, or the monogram for marks wider than 2:1 (`components/ui/logo.tsx:36` allows `max-w-[9rem]`).
app/projects/[slug]/page.tsx:153-164 - pitch `<video controls>` has no `<track kind="captions">` and no transcript; there are no `.vtt` files under `public/`. Same in components/reel/reel-dialog.tsx:94-107.

### Medium

app/globals.css:50-54 - no `scroll-padding-top` on `html`; the sticky 64 px header can cover an element that keyboard focus scrolls into view. Three sections also use `scroll-mt-16` (exactly the bar height, no safe-area allowance): components/sections/research-section.tsx:38, components/sections/skills-section.tsx:19, components/reel/pitch-reel.tsx:32. Use `scroll-padding-top: 6rem` once and drop the per-section values.
components/cta/island-bar.tsx:98-110 - fixed toolbar sits over the bottom 80 px of every phone screen after the hero, never collapses on scroll, and nothing sets `scroll-padding-bottom`; in the 390 px screenshots it covers running text in every frame. Hide on scroll down and show on scroll up, or shrink to the progress ring until tapped.
components/ui/reveal.tsx:24-44 and app/globals.css:200-206 - `.reveal` content is `opacity: 0` until JavaScript sets `data-visible`; print and reduced motion are handled, no-script is not. Add `@media (scripting: none) { .reveal { opacity: 1; transform: none } }`.
components/credentials/credential-card.tsx:150 - the dialog's scroll container (`max-h-[90dvh] overflow-y-auto`) lacks `overscroll-behavior: contain` (the reel dialog and the palette have it).
components/instruments/instrument.tsx:134-140 - the status line is `aria-live="polite"` and every instrument writes to it on each pointer move (orbit angle, handle percent, stage, step), so a drag produces a stream of announcements. Debounce, or announce on pointer up.
components/credentials/issuer-anchors.tsx:89-95, 99-117 - `role="tablist"` with `role="tab"` buttons that carry `aria-selected` and `aria-expanded`, toggle closed on a second click, and whose `aria-controls` points at a plain `div`; there is no `tabpanel`. This is an accordion: use `aria-expanded` plus `aria-controls` on buttons without the tab roles, or add `role="tabpanel"` and stop toggling.
components/instruments/autogit.tsx:181 - `aria-label` on a `<p>` (prohibited on the paragraph role, ignored by most AT). Put "Buttons shown in VS Code" in a sr-only span.
components/sections/colleagues-section.tsx:28 - excerpt ends with `...` not `…` (five instances on the home page).
components/instruments/buildings-built-in-minutes.tsx:139 - loading state "Loading the orbit clip" lacks the trailing `…`; same for components/hero/depth-portrait.tsx:364 ("loading").
components/hero/depth-portrait.tsx:384-388, 392-402 - when WebGL2 is unavailable (`supported=false`) the hologram float and scan CSS loops keep running, but the pause button only renders when `supported && ready`; a loop over 5 s then has no control.
components/hero/depth-portrait.tsx:393-401 - the pause toggle uses both `aria-pressed` and a label that changes ("Pause motion" / "Play motion"); use one or the other.
components/hero/depth-portrait.tsx:374 - `priority={!hologram}`: on 390 the about card is the first element on the page (`order-first`) and the likely LCP, yet it loads lazily. The spec (section 5.9) assumes it is not the LCP; on phones it is.
components/site/footer.tsx:46-88 (HEAD) - site and profile links are 20 to 24 px tall, 8 px apart (sub-44 px targets); the working tree raises them to 32 px with `LIST_LINK`, still short on phones. `min-h-11` or `py-2.5` with `-my-1`.
app/projects/[slug]/page.tsx:116-121 - breadcrumb "Work" is a bare 14 px text link (about 20 px tall target).
components/cta/palette-dialog.tsx:168 - placeholder should end with `…` and show the pattern ("Search projects, papers, skills, actions…").
components/sections/github-activity.tsx:4-10 and components/sections/github-feed.tsx:27-47 - hand-rolled date and relative-time formatting; `Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ... })` and `Intl.RelativeTimeFormat('en')` are equally deterministic for SSR. (`lib/content.ts:200-213` has the same pattern.)
components/timeline/timeline-node.tsx:84-102 - the `h3` wraps the whole header, so its accessible name is "Apr 2026 to present Contract fellowship AI Trainer Fellow, Software Engineering and Multimodal AI Handshake AI". Keep only the title in the heading (or `aria-labelledby` the title span) and leave date, tag and org outside it.

### Low

components/cta/palette-dialog.tsx:217 and components/site/nav.tsx:73 - "Ctrl K" and "Ctrl K or Cmd K" need non-breaking spaces (`Ctrl&nbsp;K`).
components/sections/stats-ledger.tsx:43 and components/reel/pitch-reel.tsx:31 - "25 second pitch", "25 seconds each" can break between number and unit; `&nbsp;` (the `PlayPitch` and filmstrip badges already use `whitespace-nowrap`).
components/credentials/credential-card.tsx:103 - `truncate` on a flex child without `min-w-0`; the issuer will not actually truncate.
components/about/recommendations.tsx:47 and components/sections/colleagues-section.tsx:59 - `transition-[filter]` (grayscale to colour) on portrait images is not compositor-friendly.
components/ui/button.tsx:8, components/credentials/credential-card.tsx:86, components/projects/project-strip.tsx:75, components/site/nav.tsx:69 - `box-shadow` (the glow) in the transition list animates a shadow on every hover; transform and opacity only, or accept the cost consciously.
components/instruments/einstein-vision.tsx:150 - the comparison handle carries `glow` at rest (the spec allows the glow on hover and focus only).
components/instruments/trended-pathfinder.tsx:99 - 60 checkbox rows in a 288 px scroll box without `overscroll-contain` or `content-visibility`.
app/layout.tsx:83-108 - no `<link rel="preconnect" href="https://api.github.com">` for the runtime fetch in components/sections/github-feed.tsx:159.
components/instruments/skiplegal.tsx:157-161, components/instruments/autogit.tsx:150-203, components/instruments/madwe.tsx:320-335, components/instruments/robofusion.tsx:268-270, components/sections/github-activity.tsx:47-61, components/sections/skills-section.tsx:24-34, app/resume/page.tsx:199-208 - code tokens, file names, repo names and tool names carry no `translate="no"`; machine translation will garble them. `translate="no"` is unused anywhere in the app.
components/ui/button.tsx:39-55, components/cta/actions.tsx:33-44, components/credentials/credential-card.tsx:93, app/research/page.tsx:76-84, app/resume/page.tsx:82-90 - `target="_blank"` links give no "opens in new tab" cue to assistive tech (the arrow icon is `aria-hidden`); add a sr-only suffix once in `ButtonLink` and `TrackLink`.
components/cta/palette-dialog.tsx:195-203 - option rows navigate with `router.push`, so no middle-click or Cmd-click on internal entries; acceptable for a combobox, worth knowing.
components/sections/skills-section.tsx:9 - commas are CSS `after:content`, so copied text loses them (screen readers are fine, it is a list).
components/sections/research-section.tsx:52, 71, 96, app/research/page.tsx:48, app/resume/page.tsx:196, components/credentials/credential-card.tsx:112, 160, components/reel/filmstrip.tsx:83, components/hero/depth-portrait.tsx:397, components/glossary/term-popover.tsx:126, components/cta/palette-dialog.tsx:194, 206, components/projects/project-strip.tsx:62, 80, components/sections/featured-work.tsx:90, 139, components/timeline/timeline-node.tsx:42, components/site/footer.tsx:45, 73, components/ui/section.tsx:23 - reader-facing text at 11.5 to 12.8 px (`text-xs`, `text-[0.8rem]`, `text-label`); the inspector counts 19 such blocks on the home page. The spec asks for body at 16 px or more; contrast holds (ink-2 on surface is about 8:1, ink-3 about 5:1) but size does not.
components/motion-primitives/animated-group.tsx, border-trail.tsx, disclosure.tsx, glow-effect.tsx, image-comparison.tsx, in-view.tsx, infinite-slider.tsx, magnetic.tsx, morphing-dialog.tsx, progressive-blur.tsx, scroll-progress.tsx, sliding-number.tsx, spotlight.tsx, text-loop.tsx, text-morph.tsx, text-roll.tsx, text-scramble.tsx, text-shimmer.tsx, tilt.tsx, transition-panel.tsx - imported by nothing (only `animated-number` and `text-effect` are used). They carry their own guideline debt (morphing-dialog.tsx:127 meaningless `aria-label="Open dialog ${uniqueId}"`, 245 light-mode `bg-white/40` backdrop, image-comparison.tsx:71-84 mouse and touch only, no keyboard path, text-scramble.tsx:45-72 interval never cleared on unmount, tilt and magnetic mouse-only) and 20 of the taste lint FAILs. Delete them.

### Checked and passing

- Skip link (`app/layout.tsx:87-92`), `lang`, `color-scheme: dark` (viewport and `globals.css:20`), `theme-color` matching the ground (#03080f), no `maximum-scale`, `viewportFit: cover` with safe-area padding in nav, footer, island, palette and reel.
- `html { overscroll-behavior: none }` only under `@media (pointer: fine)` (`globals.css:55-57`), `touch-action: manipulation` and tap highlight on `a, button, [role=button]` (`globals.css:83`), `overflow-x: clip` on body, `text-wrap: balance` on headings and `pretty` on prose, tabular numerals wherever numbers align, global `:focus-visible` ring.
- `prefers-reduced-motion`: CSS blanket plus explicit checks in the instruments (`useInstrument().reduced`), timeline, count-up, island, credential rail, depth portrait (static image, no WebGL), filmstrip hover preview, hologram CSS. The one gap is the Motion-driven `TextEffect` (High, above).
- Native `<dialog>` with `showModal()` for the palette, the reel and the wallet card: focus trap, Escape and focus return come from the platform; the reel also returns focus to the opener explicitly (`reel-dialog.tsx:42-43`). Body scroll locked while the palette is open; `overscroll-behavior: contain` on the palette list and the reel dialog.
- `inert` plus `aria-hidden` on the two back passes of the wallet stack (`pass-stack.tsx:75-76`).
- Custom controls are keyboard operable with correct ARIA: orbit slider (`role="slider"`, value attributes, arrows, Home, End), comparison handle, segmented controls and radio groups with roving tabindex, native `<input type="range">` with `<label>` for the trajectory, stage and wrist sliders, checkboxes with wrapping labels, `role="region"` with `tabIndex=0` and a name on every horizontal rail, year scrubber and timeline headers with arrow-key roving. Drag surfaces set `touch-none` and `select-none`.
- Images: every `<img>` has width and height (next/image or explicit in `Logo`), `loading="lazy"` below the fold, `priority` on the hero portrait, `sizes` set, decorative thumbnails `alt=""` with sr-only text on the filmstrip tiles.
- `content-visibility: auto` with `contain-intrinsic-size` on home sections and the long about blocks; instruments reserve `minHeight` before mounting on intersection; the GitHub feed reserves `min-h-[9.5rem]`.
- No `window` or `document` at module scope: `term-popover.tsx:43` and `reel-provider.tsx:35` are guarded. No `suppressHydrationWarning`; the counters server-render the final value and only animate after hydration with motion allowed; `formatCount` is locale-fixed.
- Event listener cleanup is complete in every client component (palette, term, depth portrait, island, nav, reel provider, filmstrip, rail, timeline rail, feed, instrument observers, animation frames and timers). The single `email:copy` window listener in `copy-email.tsx:43` is an intentional module singleton.
- Empty states: palette ("Nothing matches…"), project index ("No projects of this kind yet"), trended terms; the GitHub feed stays silent on failure by design.
- URL reflects the project filter (`?kind=`), with the full list in the static HTML before hydration.
- Icon-only buttons all carry `aria-label`; decorative icons are `aria-hidden`; `<time dateTime>` on dates; `aria-live="polite"` on copy and share feedback, the palette status line and the result count.
- Files with no findings: app/page.tsx, app/not-found.tsx, app/about/page.tsx, app/projects/page.tsx, app/projects/project-filter.tsx, app/resume/print-button.tsx, both opengraph-image.tsx; components/about/{availability,block,hologram-card,recognition-table,story,timelines}.tsx; components/credentials/{credential-rail,pass-stack,wallet,wallet-data}.tsx; components/cta/{actions,command-palette,copy-email,scroll-island,share-button}.tsx; components/glossary/{prose,term}.tsx; components/hero/proof-strip.tsx; components/instruments/{figure-switcher,latent-cot,metric-explorer,realmweaver-ai,registry,tumorlytix,vio}.tsx; components/projects/{figure,filter-bar,instrument-section,metric-strip,pitch-strip,project-ledger}.tsx; components/reel/{filmstrip,pitch-reel,play-pitch,reel-provider}.tsx; components/sections/{activity-section,contact-section,count-up,experience-ledger,featured-work,instrument-slot,now-section,recognition-section}.tsx; components/site/{analytics,grain}.tsx; components/timeline/{timeline,timeline-rail,year-scrubber}.tsx; components/ui/{hud-frame,logo,section}.tsx; components/motion-primitives/animated-number.tsx.

## Taste inspector

The v2 spec (docs/superpowers/specs/2026-10-15-portfolio-v2-design.md, section 3) keeps these house rules: no eyebrow on every section, no index numbering, no decorative dots, no resting shadows, no decorative gradients, headlines of two lines or fewer, body 16 px or more. It allows monospace for data (numbers, labels on instruments, status lines) and hairlines inside data tables and HUD frames only. Findings below are sorted against that line.

### Lint (static scan of app and components)

`node lint.mjs app components`: 130 files, 101 FAIL, 12 WARN.

| Rule | Count | Allowed by the spec | Real defect | Dead code |
|---|---|---|---|---|
| mono | 44 | 34: tokens in globals.css:39,143,149,155 and layout.tsx:2,18,85; instrument titles and status (instrument.tsx:123,135, hud-frame.tsx:21); numbers and data inside instruments (autogit 136,150,181,188; einstein-vision 132,135; madwe 212,223,320; robofusion 252,268; skiplegal 135,138,154,165; trended-pathfinder 129); credential ids (credential-card 112,160); dates and status (proof-strip 70, depth-portrait 391, palette 215, timeline-node 42 tags); humans.txt | 10: sentences and names set in mono: hero.tsx:61 (availability sentence), footer `text-status` lines (footer.tsx:33, 92, 93), contact-section.tsx:32, and the uppercase tracked cell labels app/projects/[slug]/page.tsx:60 and 205, pitch-strip.tsx:32, featured-work.tsx:19 and 139, project-strip.tsx:80, filter-bar.tsx:8, availability.tsx:26 chips, recommendations.tsx:33, term-popover.tsx:126 | 0 |
| gradient | 17 | globals.css:169 (the bracket pseudo-element, a drawing technique) | globals.css:75-76: the 64 px body grid is a grid-line ornament the spec never lists | 14 in unused motion primitives (border-trail, glow-effect, progressive-blur, spotlight, text-shimmer) |
| gradient-text | 2 | | | text-shimmer.tsx:32-33 (unused) |
| shadow | 1 | globals.css:185 `glow`, spec: "cyan focus and hover glow at low alpha"; used at rest only on the term popover (an overlay, fine) and the einstein handle (defect, see Low) | | |
| hairline | 37 | 15 inside tables, frames and instruments: [slug]/page.tsx:191 (results ledger), research/page.tsx:134 (stats), story.tsx:33 (facts table), issuer-anchors.tsx:94, madwe 214,321,325,329, robofusion 262, skiplegal 116, trended-pathfinder 103, palette 153,215, depth-portrait 386 (the scan sweep), timeline-rail 119,122 (the spec's track) | 22 section-level rules: globals.css:110 `hairline` (used by about/block.tsx:21, [slug]/page.tsx:72 and 291, research/page.tsx:62 and 180, resume/page.tsx:39, footer.tsx:28, instrument.tsx:135), [slug]/page.tsx:180, research/page.tsx:184 and 224 (bullet dashes), resume/page.tsx:211, proof-strip.tsx:67, pitch-strip.tsx:34, contact-section.tsx:55, featured-work.tsx:177, github-activity.tsx:47, github-feed.tsx:202, now-section.tsx:28, recognition-section.tsx:30,41,47, research-section.tsx:40,48, skills-section.tsx:20, stats-ledger.tsx:96, nav.tsx:101, year-scrubber.tsx:35 (decorative ticks) | |
| WARN outlined-box | 3 | globals.css:188,196 (`frame-media`, `panel`: the HUD frames the spec asks for), palette-dialog.tsx:150 | | |
| WARN default-font | 1 | layout.tsx:16 Space Grotesk, a recorded redraw | | |
| WARN numbering | 1 | | app/research/page.tsx:112 `padStart(2,'0')` prints 01, 02, 03 before findings; the spec bans it | |
| WARN cta-copy | 1 | | about/recommendations.tsx:76 "Read more" (generic; "Full quote" or "Read the rest") | |
| WARN glass | 4 | nav.tsx:101 (the one sticky bar) | island-bar.tsx:109 and palette-dialog.tsx:147: two more blurred panels; the skill allows one | morphing-dialog.tsx:245 (unused) |
| WARN bounce | 1 | | autogit.tsx:69 `animate-pulse` cursor (small, but a looping attention animation) | |
| WARN scale-zero | 1 | skiplegal.tsx:130 (a dot filling in, not an entrance) | | |

Net: 33 of the 113 lint hits are real defects against the spec's own rules, 20 are dead code, the rest are the agreed HUD grammar.

### Inspector measurements

`node inspect.mjs <url> --out .taste-skill/inspect-<page>` at 1440, 768 and 390. Screenshots and `report.json` are under `portfolio/.taste-skill/inspect-home`, `inspect-latent-cot`, `inspect-about`. No `--allow` was passed; the pre-existing `.taste-skill/direction.json` grants no allowances. Console errors: none on any page.

Measurement artifact to know before reading the FAIL counts: `covered-text` fires on every large heading of all three pages ("100% hidden"). The probe forces `pointer-events: auto` on everything while hit-testing, so the fixed 4 percent grain layer (`components/site/grain.tsx`, `fixed inset-0 z-50` with a background image) is what it finds on top. Nothing visibly covers a headline in any screenshot. Treat those four FAILs as the grain ornament, not collisions (painting the grain with `body::after` would make the gate clean).

#### Home (/)

Measured: hero headline (the h1 includes the headline span) 1 line at 92.8 px plus 3 lines at 1440, 4 lines at 768, 3 lines at 390; 17 headings; typefaces Geist 78 percent, Geist Mono 14, Space Grotesk 8; 12 font sizes (12, 13, 14, 15, 16, 18, 21, 24, 26, 55, 92, 93); page 16.8 screens, 916 words, 63 images, 75 moving elements (35 transitions, 40 scripted), no video on the page (the reel previews only play on hover).

| Finding | Result | Classification |
|---|---|---|
| headline-lines, h1 3 to 4 lines at every width | FAIL | Defect: the spec's own two-line rule; hero.tsx:43-46 puts the 14-word headline inside the h1. Also "Open to full-time roles, starting immediately" at 3 lines at 768 (contact-section.tsx:28, `max-w-[16ch]`) |
| eyebrow "Publications" above "Research" | FAIL | Spec-tolerated (one labelled section in three, section.tsx:14-15, research-section.tsx:36) but it caps the taste score at 6.5 |
| mono outside code | FAIL | Mixed: status lines and numbers allowed; the availability sentence (hero.tsx:61), footer sentences, "Google Cloud x NVIDIA developer community" in the proof strip (proof-strip.tsx:70) are sentences and names, defects |
| micro-label, 20 tiny uppercase tracked labels | FAIL | Instrument titles allowed (labels on instruments). The strip cell labels Problem / What she did / What changed (featured-work.tsx:19, pitch-strip.tsx:32), the kind label on project pages ([slug]/page.tsx:60), the popover term header (term-popover.tsx:126) and the footer and palette `text-label` headers are the banned tell |
| hairline, 40 rules | FAIL | 10 inside the instrument, ledgers and the timeline track: allowed. 30 section rules (list above): defects |
| outlined-box, 35 | FAIL | HUD panels and media frames (allowed), secondary pill buttons and chips (fine) |
| small-text, 19 blocks under 13 px | FAIL | Defect against "body 16 px or more" (list in Low) |
| covered-text ×4 | FAIL | Artifact (grain layer) |
| font-count 3 | WARN | Recorded redraw (display, text, data) |
| size-count 12 | WARN | Defect against "five size steps only": 12, 13, 14, 15, 21, 26 and 93 are off the scale |
| no-footage | WARN | Deliberate: the 15 pitch clips play on hover and in the lightbox, not as a loop |
| side-scroll ×2 | WARN | Allowed: the filmstrip and the colleagues rail are snap rails with visible edges, as the spec asks |
| measure 133 cpl | WARN | Defect: the recognition note column (recognition-section.tsx:50-52) has no `max-w`; its notes run about 130 characters at 1440 |

#### Project page (/projects/latent-cot)

Measured: h1 "Interpreting Latent CoT Reasoning as Dynamical Systems" 2 lines at 55.4 px (1440), 1 line (768), 3 lines (390); 6 headings; 11 sizes; 5.5 screens, 570 words, 10 images; motion: 2 elements moved over load and scroll; one video (the pitch, not autoplaying).

| Finding | Result | Classification |
|---|---|---|
| mono (Research, Problem, What she did, What changed) | FAIL | Defects: kind label and strip cell labels (above) |
| micro-label ×4 | FAIL | Same three cell labels plus "Trajectory scrubber" (the last one is an instrument title, allowed) |
| hairline, 24 | FAIL | Metric strip grid (metric-strip.tsx:47, a data ledger) and the instrument's inner rules allowed; the per-block `hairline` (page.tsx:72), highlights `divide-y` (180), results `divide-y` (191, borderline), pitch strip cell rules (pitch-strip.tsx:34), nav and instrument status rule: defects |
| outlined-box ×6 | FAIL | Panels and frames, allowed |
| few-pictures (2) | FAIL | Real: the PHATE figure and the poster are the only raster pictures; the canvas instrument does not count |
| covered-text ×4 | FAIL | Artifact |
| still-page (2 moving elements) | FAIL | Defect against the spec's "240 to 700 ms reveals": only the metric strip is wrapped in `Reveal` |
| headline-lines, 3 lines at 390 | FAIL | Defect (a 7-word paper title at 30 px on 390: lower the display step on phones or allow a tighter measure) |
| card-rows (2 rows of identical boxed cards) | WARN | The stack chips and the link pills; fine |
| font-count 3, size-count 11 | WARN | As on home |

#### About (/about)

Measured: h1 "About" plus headline, 3 lines at every width (91.8 px, 60.9 px, 43.5 px); 7 headings; 10 sizes; 7.4 screens, 919 words, 43 images; 17 moving elements.

| Finding | Result | Classification |
|---|---|---|
| headline-lines at 1440, 768, 390 | FAIL | Defect: same h1 construction as the home hero (app/about/page.tsx:85-88) |
| hero-words 13 | WARN | Same cause |
| mono (status lines, dates, "Worcester, MA" tag) | FAIL | Allowed (data), except the duplicated pipeline caption under the card |
| hairline, 15 | FAIL | The facts table (story.tsx:33) and the wallet ledger rules allowed; the block rules (block.tsx:21) and nav rule: defects |
| outlined-box, 12 | FAIL | HUD card, panels, wallet frame, chips: allowed |
| covered-text ×4 | FAIL | Artifact |
| eyebrow "Full recommendations on LinkedIn" above "Availability" at 390 | FAIL | Artifact: a ghost link that happens to precede the next h2 |
| small-text ×2 | WARN | Defect (text-xs credential ids and the 12 px pause button) |
| no-footage | WARN | Deliberate |

### Critique (rubric: references/critique.md)

Scored as a juror who did not build it. Caps: any remaining FAIL holds overall at 6.0; eyebrow, mono labels and decorative hairlines hold it at 6.5 regardless.

```
ROUND 1, home
Seen in one second: the name beside a woman made of cyan dots.
Idea (one sentence): her own instruments (the depth-sensed portrait, the frames of 15 pitches, the measured numbers of 23 projects) laid out as a mission-control sheet the visitor can scrub, play and query.
Live thing: the trajectory scrubber inside the first featured strip (real PCA points), the reel, Ctrl K.
Layout words by section: hero=split / proof=strip / featured=list of strips with one instrument / reel=rail / research=split list / experience=timeline / numbers=ledger / now=two panels / skills=grid / recognition=list / activity=timeline / colleagues=rail / contact=statement. "list" three times, "timeline" twice, "rail" twice.
Scores: design 7 · usability 7 · creativity 8 · content 8 → overall 7.3 uncapped, 6.0 after caps
Caps applied: FAIL cap (9 real FAILs after discounting covered-text), 6.5 cap (eyebrow, mono labels, section hairlines, 19 blocks under 13 px).
Top three problems (most visible first):
1. The hero tagline's wrapped lines start with an indent (desktop-fold.jpg, mobile-fold.jpg): whitespace tokens from TextEffect. Fix text-effect.tsx:163-166 so each word carries its trailing space, or drop the per-word effect and reveal the paragraph as one block.
2. The first featured strip's instrument is a 4:3 black field with the points huddled in one quadrant (desktop-page-01.jpg frame 3, mobile-page-01.jpg frame 4). Fit the axis extent to the current step (latent-cot.tsx:42-60 uses one extent for all six steps), tween it between steps, and make the frame 16:9.
3. On the phone the island toolbar sits over the bottom 80 px of every screen and the first screen has no picture (mobile-fold.jpg, mobile-page-01.jpg). Hide the island on scroll down, and put the portrait beside the name on 390 (a 40 percent column, cropped to the face) so the first screen is a composition of its own.
Also: the stats ledger opens with a near-empty band (desktop-page-03.jpg frame 1, section padding plus a 40 px rule gap); "Publications" eyebrow; running text under 13 px in the research stats, strip meta lines and footer.
```

```
ROUND 1, /projects/latent-cot
Seen in one second: the paper title and the cyan "What changed" cell.
Idea (one sentence): a project page that opens with the three-second strip and a live instrument built from the project's real data.
Live thing: the trajectory scrubber (step slider, CODI and COCONUT, spread computed in the browser).
Layout words by section: header=statement / strip=three cells / metrics=ledger / instrument=panel / figure=full-width picture / pitch=video / body=two-column list of blocks / neighbours=row.
Scores: design 6.5 · usability 7.5 · creativity 7.5 · content 8 → overall 7.15 uncapped, 6.0 after caps
Caps applied: FAIL cap; few-pictures (design ≤ 6.5); still-page (design ≤ 7); 6.5 cap (mono labels, hairlines).
Top three problems (most visible first):
1. The scrubber canvas is three quarters empty at step 1 and it is the page's only live thing (desktop-page-01.jpg frames 1 and 2, mobile-page-01.jpg frame 2). Fit the extent per step; draw the other model as a ghost cloud so the contraction versus expansion story is visible without toggling.
2. Below the instrument the page becomes eight stacked blocks separated by rules (desktop-page-02.jpg): Problem, Approach, Highlights, Results, Stack, Links, Details, Related publication. Results repeats the five numbers already shown in the metric strip; drop it, fold Links into Details, remove the per-block rules and let spacing and the two type sizes do the separating.
3. The paper figure is a 960 px white rectangle on the dark ground and the poster frame below repeats the same figure (desktop-page-01.jpg frame 4, desktop-page-02.jpg frame 1). Tint or invert the figure for the dark page, or keep it only on /research and let the poster stand here; add one more real picture (the poster frame of the reel at full width, or the GPT-2 run figures) to pass the floor of four.
Also: no entrance reveals on this page (2 moving elements), h1 at three lines on 390.
```

```
ROUND 1, /about
Seen in one second: the word About beside a floating portrait card.
Idea (one sentence): a personnel file: hologram card, two timelines, a recognition table, a credential wallet, the colleagues' words, the availability sheet.
Live thing: the wallet (click an issuer, the certificates fan into a rail), the expandable timelines, the card's pointer tilt.
Layout words by section: header=split / education=timeline / leadership=timeline / recognition=table / certifications=wallet panel / colleagues=grid / availability=panel. "timeline" twice in a row.
Scores: design 7 · usability 6.5 · creativity 7.5 · content 8 → overall 7.05 uncapped, 6.0 after caps
Caps applied: FAIL cap; 6.5 cap (mono labels, block rules).
Top three problems (most visible first):
1. Issuer logos overlap text in the wallet: "Persistent Systems" in the desktop ledger and the phone chips show the mark drawn over the name and the count (desktop-page-02.jpg frame 1, mobile-page-01.jpg frame 8). Clip the 28 px mark box (issuer-anchors.tsx:31-38) or use the monogram for wordmarks.
2. The h1 is "About" plus a three-line headline at every width (desktop-fold.jpg, mobile-fold.jpg), the spec's own two-line rule broken on the hero. Make "About" the h1 and the headline a `text-title` paragraph (app/about/page.tsx:85-88); the home hero needs the same change.
3. The hologram card says "Depth Anything V2" twice under the portrait with the pause control wedged between the two mono lines (desktop-fold.jpg, mobile-fold.jpg). One status line ("Depth Anything V2 depth map, 60,720 points") with the pause control inline.
Also: on 390 the first screen is the card and two mono captions, the name arrives on the second screen; the recommendation bands crop the top of two heads (Amit, Gurdeep); 15 rules, most of them the block separators.
```

## Copy scan

Rendered HTML fetched with curl from the served build, scripts and styles removed, tags stripped; dashes checked as bytes E2 80 94 and E2 80 93 in text and in `alt`, `aria-label`, `title` and `content` attributes; glossary popover panels removed before counting paragraph sentences (they inline "Read more about X on arxiv.org" into every `<p>`, which inflated the first pass).

| Page | Visible words | Em dash | En dash | Hype words | h2/h3 in title case | mailto: / address in HTML (build) | Placeholder text | Sentences over 35 words in `<p>` | Other |
|---|---|---|---|---|---|---|---|---|---|
| / | 3,701 | 0 | 0 | 0 | 0 real; 36 suspects are proper names (paper titles, award names, role titles, org names); every section h2 is sentence case | 4 (footer "Email me" button and Person JSON-LD, each twice with the RSC copy) | 0 | 0 | "..." ×5 in the colleague excerpts (colleagues-section.tsx:28); should be "…" |
| /projects | 932 | 0 | 0 | 0 | 0 real; 4 suspects are project names | 4 (same two sources) | 0 | 0 | |
| /projects/latent-cot | 581 | 0 | 0 | 0 | 0 real; the h1 is the paper title | 4 (same) | 0 | 2: "Latent reasoning methods such as CODI and COCONUT …" (40 words, Problem) and "Model the six latent hidden states as a …" (46 words, Approach); both in content/profile.json | "25 -second pitch" in the scan is a React text-node boundary, it renders as "25-second pitch" |
| /about | 1,598 | 0 | 0 | 1: "innovative", inside a verbatim colleague recommendation (quoted third-party text) | 0 real; 6 suspects are the headline and timeline role and degree names | 4 (same) | 0 | 0 | |
| /research | 1,260 | 0 | 0 | 1: "leverage", a noun in "the leverage point for physical intuition" (vla-physics role summary), not hype | 0 real; 2 suspects are paper titles | 4 (same) | 0 | 0 | 01 / 02 / 03 numbering before findings (app/research/page.tsx:112) |
| /resume | 2,066 | 0 | 0 | 1: the same "leverage point" line | 0 real; 10 suspects are job titles, institutions and paper titles | 6: the two shared sources plus the resume header link (app/resume/page.tsx:72), address printed 8 times | 0 | 0 | |

Notes.
- No em or en dash anywhere, in text or attributes, on any of the six pages.
- The working tree already removes the footer `mailto:` (footer.tsx now renders `CopyEmail`) and the JSON-LD `email` key; after a rebuild only `/resume` carries the address. Decide whether the printable resume should keep it; if so it is the one deliberate exception and the layout comment at app/layout.tsx:28 should say so.
- The hype-word hits are quoted or technical uses; no marketing copy on the site uses the listed words.
- Heading case: every section heading on every page is sentence case. The automated suspects are all proper names, which stay capitalised under the house rule.

## Top 10 fixes

1. app/resume/page.tsx:72 - keep the address out of the HTML (render `CopyEmail`, or print it only in the PDF); rebuild so the working-tree footer and JSON-LD fixes ship, then re-run the scan.
2. components/motion-primitives/text-effect.tsx:163-166 and components/hero/hero.tsx:48 - fix the indented wrapped lines in the hero tagline and give the effect a reduced-motion path (`useReducedMotion` or `MotionConfig reducedMotion="user"`).
3. components/site/nav.tsx:85-95, 141-149 - make the mobile menu a real modal (`inert` on the page or `<dialog>`) and return focus to the menu button on close.
4. components/cta/palette-dialog.tsx:155-176 - `aria-label="Search this site"` on the input, a `focus-within` ring on the search bar instead of bare `outline-none`, placeholder ending with "…".
5. components/credentials/issuer-anchors.tsx:31-38 - clip the logo mark box so wordmarks stop overlapping issuer names and counts (visible on desktop and phone).
6. components/hero/hero.tsx:43-46 and app/about/page.tsx:85-88 - take the headline out of the h1 so the display line is one or two lines at every width; shorten or widen the contact h2 (components/sections/contact-section.tsx:28).
7. components/instruments/latent-cot.tsx:42-60 - fit the scrubber's axis extent per step (tweened) so the canvas is not three quarters empty on the home strip and the project page.
8. app/projects/[slug]/page.tsx:153-164 and components/reel/reel-dialog.tsx:94-107 - add WebVTT caption tracks (or a transcript under the video) for the 15 pitches.
9. app/globals.css:50-54 and components/cta/island-bar.tsx:98-110 - `scroll-padding-top` on `html` (replace the mixed `scroll-mt-16`/`24`), and hide the island on scroll down so it stops covering the bottom of every phone screen.
10. Spec compliance sweep, then re-run `inspect.mjs`: remove the section-level hairlines (globals.css:110 users plus the `border-t`/`divide-y` list under lint), raise the sub-13 px text to 13 or 14 px, drop the 01/02/03 numbering (app/research/page.tsx:112), set the strip cell labels in the text face at 14 px sentence case (featured-work.tsx:19, pitch-strip.tsx:32, [slug]/page.tsx:60), wrap the project-page blocks in `Reveal`, and delete the 20 unused files under components/motion-primitives (20 lint FAILs and a dead focus-trap implementation go with them).
