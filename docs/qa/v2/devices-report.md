# Devices report, portfolio v2

Reviewer: QA-devices. Date: 2026-10-16. Bar: spec `docs/superpowers/specs/2026-10-15-portfolio-v2-design.md` section 9 (no horizontal overflow, console errors zero, every instrument renders and responds, every video plays, every tooltip opens by keyboard and touch, timelines expand, wallet fans, palette finds).

## What was tested

- Build under test: production build served at `http://localhost:3123`, `.next/BUILD_ID` `djGPyZP0Y6oR9S7llHxnB`, built 2026-10-15 23:45. This build predates commits `d266b6c` (issuer tab names, 23:49) and `6034b9e` (email kept out of every surface, 00:16). While this review ran, other agents had 55 uncommitted files in `portfolio/` (nav, reel dialog, island, footer, hero and more) and were serving them on `:3000`. Every finding below is against `:3123`. Re-run this pass after the next build.
- Automated per-page checks (overflow, offenders, console, h1, images, tap targets, contrast) at 320, 360, 390, 430, 768, 1024, 1440 and 2560 were run by the previous reviewer (raw notes in the session scratchpad, script `qa-check.js`). I re-ran the script live on `/` at 390 (390x844 at 3x, mobile, touch) and on `/` and `/projects` at 320 (320x568 at 2x, mobile, touch). Both runs confirmed the earlier numbers.
- Interactions were driven with chrome-devtools in isolated context `qa-devices-2` at 390 (mobile, touch) and 1440, plus prefers-reduced-motion at 1440. New evidence is in `docs/qa/v2/shots/interactions/`.
- Screenshot matrix: I read 320, 390 and 1440 for all nine pages (tiled). Limitation of the matrix: full-page captures wrap at 16,384 device pixels (home repeats its hero from about y 16,400), and every section that has not been scrolled into view is blank (scroll reveals at opacity 0 and `content-visibility: auto` placeholders). Below roughly the first 7,000 px of home, about and research, the matrix shows black bands, not content. I used live viewport screenshots for those sections.
- Ignored as instructed: the `/_vercel/insights` and `/_vercel/speed-insights` 404s and their MIME refusals, which appear on every page.

## Results table

Tap-target offenders are block-level targets under 44 px tall (the project bar). The visually hidden skip link is left out of the counts. Inline glossary terms inside prose (22 to 26 px tall) are listed apart from the counts because WCAG 2.5.8 exempts inline targets: home 64, research 31, resume 44, project pages 13.

| Page | Width | Horizontal overflow | Console errors | h1 | Image issues | Contrast under 4.5:1 | Tap-target offenders |
|---|---|---|---|---|---|---|---|
| `/` | 320 | **Yes**: scrollWidth 381 vs 320 at 2x (345 at 1x). Offender `span.text-status` "Depth Anything V2 · 57,060 points", right edge 381 | 0 | 1 | 0 of 63 (21 decorative, empty alt) | 0 | 23: brand link 28 px; "On GitHub" 24 px; repo link "Latent-CoT-Reasoning-as-Dynamical-Systems" 24 px; 5 colleague name links ("Amit Shinde" and others) 21 px; 7 footer site links ("Work" to "llms.txt") 18 px; 6 footer elsewhere links ("LinkedIn" and others) 24 px; 2 "Google Developers" 40 px |
| `/` | 390 | No | 0 | 1 | 0 of 63 | 0 | 24: as at 320, plus GitHub feed link "Created branch redesign-2026 in Portfolio" 24 px |
| `/` | 1440 | No | 0 | 1 | 0 of 63 | 0 | n/a |
| `/projects` | 320 | **Yes**: scrollWidth 339 vs 320. Offender: card title link "shreyaboyane.dev: this site", right edge 339 | 0 | 1 | 0 of 23 | 0 | 16: brand 28 px; 7 footer site links 18 px; 6 footer elsewhere links 24 px; 2 "Google Developers" 40 px |
| `/projects` | 390 | No | 0 | 1 | 0 | 0 | 16: same set |
| `/projects` | 1440 | No | 0 | 1 | 0 | 0 | n/a |
| `/projects/latent-cot` | 320 | No | 0 | 1 | 0 | 1: `dt` "GSM8K samples" 4.29:1, rgb(159,166,170) on rgb(40,67,76), 14 px | 17: footer set plus breadcrumb "Work" 18 px |
| `/projects/latent-cot` | 390 | No | 0 | 1 | 0 | same 4.29:1 | 17 |
| `/projects/latent-cot` | 1440 | No | 0 | 1 | 0 | same 4.29:1 | n/a |
| `/projects/robofusion` | 320 | No | 0 | 1 | 0 | 1: `dt` "Gesture recognition accuracy" 4.29:1 | 17 |
| `/projects/robofusion` | 390 | No | 0 | 1 | 0 | same | 17 |
| `/projects/robofusion` | 1440 | No | 0 | 1 | 0 | same | n/a |
| `/projects/buildings-built-in-minutes` | 320 | No | 0 | 1 | 0 | 1: `dt` "Reprojection error" 4.29:1 | 17 |
| `/projects/buildings-built-in-minutes` | 390 | No | 0 | 1 | 0 | same | 17 |
| `/projects/buildings-built-in-minutes` | 1440 | No | 0 | 1 | 0 | same | n/a |
| `/about` | 320 | No | 0 | 1 (text includes the role subtitle) | 0 of 43 | 0 | 16: footer set |
| `/about` | 390 | No | 0 | 1 | 0 | 0 | 16 |
| `/about` | 1440 | No | 0 | 1 | 0 | 0 | n/a |
| `/research` | 320 | No | 0 | 1 | 0 | 0 | 17: footer set plus venue link "DASHSys 2026, regular paper track" 24 px |
| `/research` | 390 | No | 0 | 1 | 0 | 0 | 17 |
| `/research` | 1440 | No | 0 | 1 | 0 | 0 | n/a |
| `/resume` | 320 | No | 0 | 1 | 0 | 0 | 20: footer set plus 4 header contact links (email, site, LinkedIn, GitHub) 18 px |
| `/resume` | 390 | No | 0 | 1 | 0 | 0 | 20 |
| `/resume` | 1440 | No | 0 | 1 | 0 | 0 | n/a |
| `/nope` (404) | 320 | No | 0 (only the expected 404 for the document) | 1 | 0 | 0 | 16: footer set |
| `/nope` (404) | 390 | No | 0 | 1 | 0 | 0 | 16 |
| `/nope` (404) | 1440 | No | 0 | 1 | 0 | 0 | n/a |

Other widths from the earlier pass: `/` also overflows at 360 (365 vs 360) and at 768 (757 vs 753, the same status line at "158,400 points"). Nothing else overflows at 360, 430, 1024 or 2560.

Console warnings and issues seen on top of the zero errors: the DevTools issue "Lazy-loaded images should have explicit dimensions" fires on every page (count 23 to 41). "Portrait preload not used within a few seconds" fires on `/` at 2x and under reduced motion at 1440.

## Interaction results

| Check | 390 | 1440 | Evidence |
|---|---|---|---|
| Mobile menu opens | Pass, `role=dialog aria-modal=true`, focus moves to "Work" | n/a, toggle hidden | `interactions/home-390-menu-open.jpeg` |
| Escape closes menu, focus returns to toggle | **Fail**: closes, focus lands on `body` | n/a | defect 3 |
| Search button and Ctrl K open palette | Pass (button) | Pass (button and Ctrl K) | `interactions/home-390-palette-robo.jpeg`, `interactions/home-1440-palette-robo.jpeg` |
| "robo" finds RoboFusion, Enter navigates, Escape closes | Pass, one option, client-side navigation to `/projects/robofusion` | Pass | same |
| Hero "Copy email" feedback | Pass, label changes to "Copied" about 750 ms after the click and stays 1.5 s | Pass | defect 33 for the failure path |
| "Watch the 25 s pitch" opens lightbox, video plays | Pass, `latent-cot.mp4` playing | Pass | `interactions/home-390-lightbox.jpeg` |
| ArrowRight goes to the next pitch | Pass, 2 of 15 SkipLegal | Pass, 3 to 4 of 15 MADWE | `interactions/home-1440-lightbox-madwe.jpeg` |
| Escape closes, focus returns | Pass, back on "Watch the 25 s pitch" | Pass | |
| Captions on pitch videos | **Fail**: 0 text tracks | **Fail** | defect 6 |
| Reel rail buttons scroll | n/a, hidden on phones (swipe rail with snap) | Pass, 312 px per click, left button disables at start | |
| Reel tile opens lightbox | Pass, SkipLegal 2 of 15, focus returns to the tile | Pass, Einstein 3 of 15 | |
| Island appears after hero | Pass, absent until scrollY passes the hero bottom (1,269 px) | Pass | `interactions/home-390-reel-island.jpeg` |
| Island dismiss | Pass, stays hidden for the session (`island:dismissed`). Focus drops to `body` | Pass | defect 23 |
| Island covers content at the bottom | **Fail**: 57 px panel in a 73 px band covers the last footer line at page end | **Fail**: same line covered | defect 8 |
| latent-cot scrubber mounts on scroll | Pass, 0 canvases before scroll, 1 after | Pass | `interactions/latent-cot-390-scrubber-step3.jpeg` |
| latent-cot ArrowRight | Pass, step 1 to 3, canvas label and status update | Pass, step 1 to 2 | |
| robofusion gesture chip animates arm | Pass, Thumbs Up rotates the elbow group to 84.27°, readout Elbow -0.10 rad. Arrow keys move the radio group | Pass | `interactions/robofusion-390-thumbs-up.jpeg` |
| buildings orbit ArrowRight | Pass, 0° to 30° in three presses, video seeks to 0.617 s | Pass, 0° to 10° | `interactions/buildings-390-orbit-30.jpeg` |
| about hologram | Pass, canvas 311x327 backing at 390 (207 px CSS), fallback image hidden | Pass, canvas 319x336 | |
| Timeline node expands with Enter | Pass, B.E. node, panel 0 to 362 px, focus kept; collapsed panels are `inert` | Pass | `interactions/about-390-timeline-expanded.jpeg` |
| Wallet fans an issuer, Escape collapses | Pass functionally (LinkedIn rail of 5 at 390, Persistent fan at 1440, Escape removes the rail and keeps focus on the tab). **Visual fail** on the tabs | same | defect 4, `interactions/about-390-wallet-fanned.jpeg`, `interactions/about-1440-wallet-persistent.jpeg` |
| Recommendation "Read more" expands | Pass (`details` opens). Toggle ends up mid-quote | Pass | defect 18, `interactions/about-390-recommendation-open.jpeg` |
| research term popover on hover | n/a | Pass, "attractor" opens on hover, Escape closes it while the pointer is still over the term | `interactions/research-1440-popover-hover.jpeg` |
| research term popover on tap | Pass, "CODI" opens within the viewport (58 to 378 px), Escape closes it and keeps focus | n/a | `interactions/research-390-popover-tap.jpeg` |
| resume print button | Pass, "Print" button with click handler, print stylesheet present | Pass | |
| Reduced motion, `/` and `/about` | Content visible, 0 of 51 and 0 of 10 reveals hidden, static portrait replaces the canvas, no new errors. **Partial fail**: the hero lede still animates in | | defect 12, `interactions/home-1440-reduced-motion.jpeg`, `interactions/about-1440-reduced-motion.jpeg` |

## Defects, ranked

Severity: blocker means it fails a section 9 gate; high means real users on a device are blocked or misled; medium means visible or WCAG-level breakage with a workaround; low means polish.

### Blocker

1. **Home overflows horizontally on small phones and at 768.**
   - Page and width: `/` at 320, 360 and 768.
   - Element: `span.text-status.font-mono.text-sm` "Depth Anything V2 · 57,060 points" under the hero hologram. It is `white-space: nowrap`, 296 px wide, inside a 148 px flex parent.
   - Observed: scrollWidth 381 vs clientWidth 320 under 320x568 at 2x mobile emulation, and the layout viewport grows to 381. `scrollIntoView` pans the page sideways and cuts off the proof strip text at the left edge. 365 vs 360 at 360, 757 vs 753 at 768.
   - Expected: no horizontal overflow at any width (section 9 gate). The status line should wrap or truncate.
   - Screenshot: `docs/qa/v2/shots/interactions/home-320-hologram-status-overflow.jpeg`, `docs/qa/v2/shots/home-320.jpeg`.

2. **Projects index overflows at 320.**
   - Page and width: `/projects` at 320.
   - Element: contact-sheet card title link "shreyaboyane.dev: this site", left 169, width 171.
   - Observed: scrollWidth 339 vs 320. The unbreakable "shreyaboyane.dev:" token pushes past the card and the page. In the same grid at 320, "reconstruction" in the Einstein Vision title also reaches the card edge.
   - Expected: no overflow. Titles in the 1fr text column need `overflow-wrap: anywhere` or `min-width: 0`.
   - Screenshot: `docs/qa/v2/shots/projects-320.jpeg` (tile around y 7,400).

### High

3. **Mobile menu has no focus trap, and Escape does not return focus.**
   - Page and width: all pages at 390 and 320.
   - Element: `#mobile-menu` (`role=dialog`, `aria-modal=true`) and the "Open menu" toggle.
   - Observed: after opening, five Tab presses move focus to "Download resume" in the hero, which sits behind the open menu (`inMenu: false`). Escape closes the menu but `document.activeElement` is `BODY`, not the toggle.
   - Expected: Tab cycles inside the modal menu. On close, focus returns to "Open menu".
   - Screenshot: `docs/qa/v2/shots/interactions/home-390-menu-open.jpeg`.

4. **Credential wallet issuer tabs overlap: the Persistent wordmark spills over its own count and the next tab.**
   - Page and width: `/about` at 390 and 1440.
   - Element: `[role=tab]` "Persistent Systems, 4 credentials".
   - Observed: at 390, the "Persistent" raster wordmark runs out of its 65 px pill, over the "4" and into the Google Cloud tab. At 1440, the row reads "PerPersistent Systems" because the wordmark is drawn under the label. The LinkedIn tab shows a blank grey square (see defect 10). On phones the "S 2" tab has no name.
   - Expected: each pill fits its mark and count, and marks never overlap labels.
   - Screenshot: `docs/qa/v2/shots/interactions/about-390-wallet-tabs-overlap-crop.jpeg`, `docs/qa/v2/shots/interactions/about-1440-wallet-tabs-overlap-crop.jpeg`.

5. **Sections set to `content-visibility: auto` are missing from the accessibility tree until scrolled near.**
   - Page and width: `/` at all widths (reel, research, experience, numbers, now, skills, recognition, activity, colleagues: 9 of 13 sections). `/about` recognition, certifications and recommendations.
   - Element: `main > section` with `content-visibility: auto; contain-intrinsic-size: auto 800px`.
   - Observed: Chrome's accessibility snapshot at load on `/` at 1440 goes straight from "All 23 projects" to the contact region. No "Pitch reel", "Skills", "Recognition" or "What colleagues say" headings exist until the viewport is near them. On `/about` at 390, the three regions appear as empty `region` nodes. Side effects: an 800 px placeholder against real heights of up to 2,580 px makes the scrollbar jump. It also causes the blank bands in every full-page screenshot.
   - Expected: heading navigation reaches every section from the top of the page. Either drop `content-visibility` on content sections or confirm with a screen reader that the headings are exposed.
   - Screenshot: `docs/qa/v2/shots/interactions/a11y-snapshot-home-1440-at-load.txt`, `docs/qa/v2/shots/interactions/a11y-snapshot-about-390-at-load.txt` (lines 61 to 65), `docs/qa/v2/shots/about-1440.jpeg` (blank band between Recognition and Availability).

6. **Pitch videos play without captions.**
   - Page and width: lightbox on `/` (hero button and reel tiles) at 390 and 1440.
   - Element: `dialog video` (`latent-cot.mp4`, `skiplegal.mp4`, `einstein-vision.mp4`, `madwe.mp4`).
   - Observed: `video.textTracks.length` is 0 and the served markup has no `<track>`. The video has an audio stream (347 KB of decoded audio in the first seconds) and autoplays unmuted. `public/videos/*.vtt` exist, and the working-tree `reel-dialog.tsx` now has a `<track>`, but the build under test does not.
   - Expected: captions on by default for every pitch (WCAG 1.2.2). Rebuild and re-verify.
   - Screenshot: `docs/qa/v2/shots/interactions/home-390-lightbox.jpeg`.

7. **The orbit instrument traps vertical scrolling on touch devices.**
   - Page and width: `/projects/buildings-built-in-minutes` at 390 (320x320 surface) and 1440 (480x480).
   - Element: `div[role=slider][aria-label="Orbit angle"]`.
   - Observed: computed `touch-action: none` on a square that takes 38% of an 844 px phone viewport. A thumb that lands on it while scrolling the page cannot pan vertically.
   - Expected: `touch-action: pan-y`, so horizontal drags orbit and vertical swipes scroll.
   - Screenshot: `docs/qa/v2/shots/interactions/buildings-390-orbit-30.jpeg`.

### Medium

8. **The island hides the last footer line on every page.**
   - Page and width: all pages at 390 and 1440.
   - Element: `div.fixed.inset-x-0.bottom-0` island (panel 57 px, band 73 px). The footer has `padding-bottom: 20px`.
   - Observed: at the end of `/`, the panel (top 771) covers "Portrait depth map produced with Depth Anything V2 and rendered in WebGL2." (bottom 792) at 390. At 1440 the panel (x 890 to 1401, y 831 to 888) covers the same line. During scrolling it also hides the bottom 73 px of whatever is on screen, for example the robofusion joint readout.
   - Expected: footer or body bottom padding of at least the island height plus the safe area, so nothing is permanently covered.
   - Screenshot: `docs/qa/v2/shots/interactions/home-390-island-covers-footer.jpeg`, `docs/qa/v2/shots/interactions/home-1440-island-covers-footer.jpeg`.

9. **The pitch lightbox lets the page bleed through on phones.**
   - Page and width: `/` at 390.
   - Element: `dialog` (transparent background) with `::backdrop` at 88% opacity.
   - Observed: the title, summary and Previous, Next and Open project buttons sit over a ghosted hero. "Download resume", "Copy email", "Book a call" and the role line are readable behind the caption.
   - Expected: an opaque panel behind the caption and controls, or a backdrop of at least 96%.
   - Screenshot: `docs/qa/v2/shots/interactions/home-390-lightbox.jpeg`.

10. **The LinkedIn mark renders as a solid grey square.**
    - Page and width: footer of every page, and the wallet tab on `/about`, at all widths.
    - Element: `img[src="/logos/linkedin.svg"]` with `filter: brightness(0) invert(1)`.
    - Observed: the filter turns every opaque pixel white, and the SVG has no knocked-out "in", so the logo is a blank square.
    - Expected: a recognisable LinkedIn glyph (a knockout SVG or a monochrome glyph file).
    - Screenshot: `docs/qa/v2/shots/interactions/home-390-island-covers-footer.jpeg`, `docs/qa/v2/shots/interactions/about-390-wallet-tabs-overlap-crop.jpeg`.

11. **The hero lede has a ragged left edge.**
    - Page and width: `/` at 390 and 1440 (all widths).
    - Element: `p.text-lead` "I build production ML systems end to end, from data and training infrastructure through inference optimization to reliability monitoring."
    - Observed: the text effect wraps each word and each space in `span.inline-block.whitespace-pre`, so a wrapped line starts with a visible space: " infrastructure", " monitoring." (" from data" at 390).
    - Expected: flush left lines. Attach spaces to the preceding word or use `white-space: normal` on the space spans.
    - Screenshot: `docs/qa/v2/shots/ix-copy-email-1440.jpeg`, `docs/qa/v2/shots/interactions/home-1440-reduced-motion.jpeg`.

12. **The hero lede still animates under reduced motion.**
    - Page and width: `/` at 1440 with `prefers-reduced-motion: reduce`.
    - Element: `p.text-lead` and its 37 word spans.
    - Observed: 1.2 s after load, `document.getAnimations()` lists running animations on the paragraph and its spans, and the lede's effective opacity is under 0.5. It settles a few seconds later. Reveals, the hologram and the instruments respect the setting.
    - Expected: the lede renders fully on first paint when reduced motion is on.
    - Screenshot: `docs/qa/v2/shots/interactions/home-1440-reduced-motion.jpeg` (captured after it settled).

13. **The lead stat label fails contrast on every project page.**
    - Page and width: `/projects/latent-cot`, `/projects/robofusion` and `/projects/buildings-built-in-minutes` at all widths.
    - Element: `dt.order-2.text-sm.text-ink-2` in the highlighted first stat cell ("GSM8K samples", "Gesture recognition accuracy", "Reprojection error").
    - Observed: 4.29:1, rgb(159,166,170) on rgb(40,67,76), 14 px regular.
    - Expected: at least 4.5:1. Use `text-ink` in the tinted cell.
    - Screenshot: `docs/qa/v2/shots/projects-latent-cot-390.jpeg` (first stat cell).

14. **Phone tap targets fall below the 44 px bar on every page.**
    - Page and width: all pages at 320 and 390 (counts in the results table).
    - Elements: footer site links 18 px tall; footer elsewhere links 24 px; brand link 28 px; breadcrumb "Work" 18 px; colleague name links on `/` 21 px; GitHub feed links 24 px; resume header contact links 18 px; "Google Developers" 40 px.
    - Observed: 16 to 24 block offenders per page. They pass WCAG 2.5.8 only through the spacing exception (28 px pitch). They fail the project's 44 px bar.
    - Expected: `min-h-11` on footer, breadcrumb and contact links, as the hero and island already have.
    - Screenshot: `docs/qa/v2/shots/interactions/home-390-island-covers-footer.jpeg`.

15. **The latent-cot scrubber's numbers contradict the headline it illustrates (content, outside device scope, but visible on every device).**
    - Page and width: `/projects/latent-cot` and the home lead instrument at all widths.
    - Element: the "CODI spread" and "COCONUT spread" read-outs in the trajectory scrubber.
    - Observed: across steps 1 to 6, CODI spread reads 6.6, 19.7, 6.3, 19.0, 6.6, 18.6 (up to 2.98x step 1). COCONUT reads 6.8, 6.6, 3.7, 7.3, 6.1, 6.6 (0.54x to 1.08x). Neither "CODI behaves as a stable attractor" nor "COCONUT as an unstable expanding system" is visible in the instrument. An ML researcher will see an oscillating CODI and a flat COCONUT.
    - Expected: the instrument shows the contraction against expansion the copy and spec section 6 promise, or the copy explains the period-2 oscillation it shows.
    - Screenshot: `docs/qa/v2/shots/interactions/latent-cot-390-scrubber-step3.jpeg`.

### Low

16. **"See all 23 projects" renders two arrow icons.**
    - Page and width: `/` reel footer at all widths.
    - Observed: the link markup contains two identical arrow SVGs.
    - Screenshot: `docs/qa/v2/shots/interactions/home-390-reel-island.jpeg`.

17. **The NeRF orbit frame shows half a model, and the same frame repeats directly below.**
    - Page and width: `/projects/buildings-built-in-minutes` at 390 and 1440.
    - Observed: the Lego render fills only the left 40% of the frame with streak artifacts at 0° and 30°. The static figure under the instrument repeats the same frame.
    - Expected: a frame that reads as a finished render, and no duplicate.
    - Screenshot: `docs/qa/v2/shots/interactions/buildings-390-orbit-30.jpeg`.

18. **"Read less" sits in the middle of the quote.**
    - Page and width: `/about` recommendations at 390.
    - Observed: after expanding, the toggle sits between the first paragraph and the rest of the recommendation.
    - Expected: the toggle after the full text.
    - Screenshot: `docs/qa/v2/shots/interactions/about-390-recommendation-open.jpeg`.

19. **The recommender portrait band crops faces at the mouth.**
    - Page and width: `/about` at 390.
    - Observed: Vinay Dandinashivara shows only chin and smile, and Jordan Kelley's eyes sit at the top edge.
    - Screenshot: `docs/qa/v2/shots/interactions/about-390-recommendation-open.jpeg`.

20. **The PES Modern College mark is a tiny white rectangle with unreadable text.**
    - Page and width: `/about` education, leadership and recognition at 320 and 1440.
    - Observed: on the dark background it reads as a white bar, not a desaturated mark.
    - Screenshot: `docs/qa/v2/shots/about-320.jpeg`, `docs/qa/v2/shots/about-1440.jpeg`.

21. **The "Google Developers" footer link shows its name twice and wraps.**
    - Page and width: all pages at 320 and 390 (also visible at 1440).
    - Observed: a wordmark reading "Google Developers" plus the label "Google Developers", which wraps to two lines and breaks the two-column grid.
    - Screenshot: `docs/qa/v2/shots/interactions/home-390-island-covers-footer.jpeg`.

22. **The lightbox Close focus ring is clipped.**
    - Page and width: `/` lightbox at 1440.
    - Observed: the right side of the circular focus ring on "Close" is cut by the dialog edge.
    - Screenshot: `docs/qa/v2/shots/interactions/home-1440-lightbox-madwe.jpeg`.

23. **Island dismiss drops focus to `body`.**
    - Page and width: `/` at 390.
    - Observed: the "Hide quick actions" button unmounts itself and focus goes to `BODY`. The island is also not exposed as a toolbar or a labelled region.
    - Expected: move focus to the next logical element and give the island `role=toolbar` with a label.

24. **Single-digit stats are indented on phones.**
    - Page and width: `/` "The portfolio in numbers" at 390.
    - Observed: values are right-aligned in a 59 px box, so "2" starts 30 px to the right of "23" and "31".
    - Screenshot: `docs/qa/v2/shots/interactions/home-390-numbers.jpeg`.

25. **The robofusion instrument's initial state contradicts its own selection.**
    - Page and width: `/projects/robofusion` at 390 and 1440.
    - Observed: "Open Hand" is checked on load, yet every joint reads 0.00 rad. The arm reflects a gesture only after the user picks one.
    - Expected: apply the default gesture on mount, or start with nothing selected.

26. **The project filter chip rail clips a chip mid-word with no scroll cue.**
    - Page and width: `/projects` at 320 and 390.
    - Observed: "PRODUCT..." is cut at the right edge of `[aria-label="Filter projects by kind"]` (2,244 px of content in 320 px). There is no fade or arrow.
    - Screenshot: `docs/qa/v2/shots/projects-320.jpeg`.

27. **Lazy images without explicit dimensions on every page.**
    - Page and width: all pages, all widths.
    - Observed: the DevTools issue counts 23 to 41 lazy images per page with no width or height attributes, which risks layout shift.

28. **The portrait preload is wasted on some devices.**
    - Page and width: `/` at 2x and under reduced motion at 1440.
    - Observed: "preloaded using link preload but not used" for `shreya-1000.webp` (`w=384` at 2x, `w=640` under reduced motion). The page then fetches a different size.

29. **Desktop layouts leave a third of the width empty.**
    - Page and width: `/resume`, `/research` and project pages at 1440.
    - Observed: the resume column is 600 px, left-aligned in a 940 px container. On project pages the figure and pitch video sit at about 70% width with an empty band to the right. On research, the "By the numbers" aside ends with about 1,000 px of empty column below it.
    - Screenshot: `docs/qa/v2/shots/resume-1440.jpeg`, `docs/qa/v2/shots/projects-latent-cot-1440.jpeg`, `docs/qa/v2/shots/research-1440.jpeg`.

30. **On phones the about hologram precedes the h1.**
    - Page and width: `/about` at 320 and 390.
    - Observed: a 207 px portrait card is the first content and "About" appears below it.
    - Screenshot: `docs/qa/v2/shots/about-320.jpeg`.

31. **The h1 on home and about includes the role subtitle.**
    - Page and width: `/` and `/about` at all widths.
    - Observed: the accessible h1 reads "Shreya Boyane Machine Learning Engineer specializing in computer vision, LLMs, inference optimization and MLOps" (on about, "About Machine Learning Engineer ...").
    - Expected: the subtitle outside the h1 or in a `p`.

32. **The resume shows the plain email address.**
    - Page and width: `/resume` at 320, 390 and 1440.
    - Observed: a `mailto:` link with the full address in the resume header. This build predates `6034b9e` ("email kept out of every surface"). Verify after the rebuild.
    - Screenshot: `docs/qa/v2/shots/resume-320.jpeg`.

33. **The Copy email failure path is silent.**
    - Page and width: all Copy email buttons.
    - Observed: when `navigator.clipboard.writeText` rejects, the code sets `window.location.href = mailto:` and shows no message. On a device without a mail client nothing visible happens. Success feedback is a 1.5 s label swap only.
    - Expected: a visible "Copy failed, address shown" fallback.

## Counts

Blocker 2, high 5, medium 8, low 18. Total 33.

## Notes for the next pass

- Rebuild from the current tree, then re-run this report against the new BUILD_ID. Several items (6, 32 and possibly 3, 8, 11) touch files other agents are editing now.
- Replace full-page captures with scrolled viewport tiles, or force `content-visibility: visible` and reveal state before capture. The current matrix cannot show sections below the first screenfuls.
- Videos in this headless session play faster than real time (24.5 s clips reach their end within seconds), so playback duration was not judged.
