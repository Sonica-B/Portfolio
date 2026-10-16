# Certifications UI research

Date: 2026-10-15. Scope: the About page certification wall, the v2 spec's credential wallet (item 7). Data: 31 entries in `portfolio/content/profile.json`, 24 landscape scans (640 by 452 WebP), 4 badge SVGs, 2 without images. The current 2 column grid runs about 4,000 px on a 390 px phone. Real issuer groups: LinkedIn Learning 5, Google Cloud x NVIDIA 4, Persistent Systems 4, Coursera partners 3 (one is DeepLearning.AI), HackerRank 3, Microsoft x NASSCOM 1, long tail 11. No AWS credential exists, so no AWS mark should appear.

Support facts are from MDN compat data, October 2026. Baseline: scroll snap, container queries (Chrome 105, Firefox 110, Safari 16), `<dialog>`, `inert`, `translate` and `scale`, `@starting-style` (Chrome 117, Firefox 129, Safari 17.5), `details name` (Chrome 120, Firefox 130, Safari 17.2), `::details-content` (Chrome 131, Firefox 143, Safari 18.4), popover (Baseline 2025), same-document view transitions (Firefox 144, October 2025), anchor positioning (Chrome 125, Safari 26, Firefox 147). Not Baseline: scroll-driven animations (Chrome 115, Safari 26, Firefox 159 due 27 October 2026, in beta today), `interpolate-size` (Chromium 129 only), `::scroll-marker` and `::scroll-button()` (Chromium 135 only), `scroll-state()` and `scrollsnapchange` (Chromium only).

## 1. Ranked shortlist

### 1. Credential wallet: issuer anchors, pass stack, fan to rail

- Desktop: an `Instrument` with corner brackets. Left, issuer tiles (logo, name, count). Right, the stack: top pass full size, two edges peeking behind at reduced scale, mono status line "31 credentials, 2018 to 2026". Selecting an issuer fans that group into a snap rail below.
- Phone: one row of 44 px chips (scroll snap) above the stack. Collapsed passes are cropped to 16:7 (`object-fit: cover`, top aligned) like a wallet sliver; the rail of full cards opens below when a chip is on.
- Interaction: a chip toggles its group into the rail, one group at a time, with an "All 31" chip; tapping a pass or rail card opens a native `<dialog>` with the full scan and its metadata.
- Keyboard and screen reader: chips are buttons with `aria-expanded`, `aria-controls` on the rail and the count in the name ("LinkedIn Learning, 5 credentials"). The rail is a labelled scroller (`role="region"`, `tabindex="0"`) keeping `ul` semantics ("list, 5 items"); cards are buttons; passes behind the top one are `inert`; the dialog traps focus and closes on Escape.
- Motion: the fan is a 240 ms `translate` and `scale` transition from a per-card `--i`; a view transition on reorder is optional. No resting shadows, depth comes from offset and scale. Reduced motion: the rail appears without the fan and the stack swaps instantly.
- Phone height: about 240 px collapsed (44 chips, 12 gap, 157 pass, 24 edges); about 500 px with a rail open. Down from about 4,000.
- Sketch: React state `{ issuer }`; cards get `style={{ '--i': offset }}`. Everything used is Baseline.

```css
.stack { display: grid; aspect-ratio: 16 / 7; }
.stack > li { grid-area: 1 / 1; translate: 0 calc(var(--i) * 8px);
  scale: calc(1 - var(--i) * .04); z-index: calc(10 - var(--i));
  transition: translate .24s, scale .24s; }
.rail { display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain; }
.rail > li { flex: 0 0 72cqw; scroll-snap-align: center; }
@media (prefers-reduced-motion: reduce) { .stack > li { transition: none; } }
```

- Risks: the crop hides most of each scan, so the status line must carry the count and the dialog the full image. The 11 item "Other" rail is long; add prev and next buttons for wheel users (`::scroll-button()` is Chromium only). Rail images load lazily.

### 2. Filmstrip rail with coverflow-lite

- Desktop: one full width snap rail of all 31 at 240 px, issuer chips as jump links, prev and next buttons. Phone: `72cqw` cards, `scroll-snap-align: center`.
- Interaction: native scroll; a chip calls `scrollIntoView` on the issuer's first card; tap opens the dialog.
- Keyboard and screen reader: as the rail above, but all 31 cards are tab stops, so add a skip link.
- Motion: `animation-timeline: view(inline)` behind `@supports` fades and scales off-centre cards; fallback and reduced motion are a flat rail.
- Phone height: about 430 px.
- Risks: an endless rail (add sticky issuer sentinels); active state needs IntersectionObserver because `scrollsnapchange` is Chromium only; Firefox gets the flat fallback until 159.

### 3. Issuer drawers: exclusive accordion

- Both widths: seven rows (logo, name, count, years); the open row shows a 2 up (phone) or 4 up (desktop) thumbnail grid.
- Interaction: `<details name="certs">`, one open at a time, no JavaScript; thumbnails open the dialog.
- Keyboard and screen reader: native `summary` button; `hidden="until-found"` keeps find-in-page working (Chrome 102, Firefox 148, Safari 26.2 partial).
- Motion: `::details-content` height needs `interpolate-size` (Chromium only); the Baseline route is a `grid-template-rows: 0fr` to `1fr` wrapper. Reduced motion: instant.
- Phone height: about 390 px collapsed, plus about 450 px for the open LinkedIn group.
- Risks: reads as an FAQ, the first screen shows no certificate, and the 11 item drawer is lopsided.

Rejected: honeycomb hex grid (24 of 31 assets are landscape scans that a hex clip crops), true 3D coverflow (perspective on 31 phone images, nausea risk), marquees and equal card grids (house rules).

## 2. Recommendation

Build approach 1. It matches spec item 7 and the HUD grammar: the pass stack reads as an ID wallet inside a bracketed instrument, the mono status line carries the data, logos sit monochrome at rest with the low alpha glow on hover and focus, and nothing moves on its own. It is current (Apple Wallet, Google Wallet's October 2026 stacked redesign, Framer and Swiper wallet components) and innovative without weight: every property is Baseline, no scroll listeners, no new dependency. It keeps the collapsed instrument near the 220 px target while every certificate stays two taps away. Approach 2's `view()` timeline can be layered onto the rail once Firefox 159 ships.

## 3. Issuer logos as grouping anchors

Derive an `issuerKey` per entry in `lib/content.ts` so counts are computed, never typed, and resolve logos through `content/logos.json` to `public/logos/*` (spec item 12). Chips show logo, name and count ("HackerRank 3") plus "Other 11" and "All 31"; selecting one filters the rail while every count stays visible. Real sources: Simple Icons serves NVIDIA, Google Cloud, Coursera and HackerRank as CC0 SVG files (pin `simple-icons@v16`, copy into `public/logos`, follow each brand's guidelines). Microsoft, LinkedIn and DeepLearning.AI are not in Simple Icons (404 today): use two letter monogram tokens in the HUD style, or official marks under each brand's terms. Persistent Systems and the long tail get monograms. AWS stays absent until a credential exists.

## Sources

- MDN compat data API (same host for every feature cited): https://bcd.developer.mozilla.org/bcd/api/v0/current/css.properties.animation-timeline.json
- MDN Popover API: https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
- web.dev, anchor positioning: https://web.dev/blog/web-platform-01-2026
- web.dev, view transitions: https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available
- Chrome, carousels with CSS: https://developer.chrome.com/blog/carousels-with-css
- Chrome, accessible carousel: https://developer.chrome.com/blog/accessible-carousel
- Chrome, exclusive accordion: https://developer.chrome.com/docs/css-ui/exclusive-accordion
- APG carousel pattern: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
- Addy Osmani, Cover Flow (April 2025): https://addyosmani.com/blog/coverflow/
- Codrops, CSS-only carousels: https://tympanus.net/codrops/2024/01/24/experimental-css-only-carousels-with-scroll-driven-animations
- Smashing Magazine, scroll-driven animations: https://smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/
- Bramus, stacking cards demo: https://scroll-driven-animations.style/demos/stacking-cards/css/
- 9to5Google, Google Wallet stack (October 2026): https://9to5google.com/2026/10/06/google-wallet-card-stack-redesign/
- Framer wallet cards: https://www.framer.com/marketplace/components/walletcards/
- Simple Icons: https://github.com/simple-icons/simple-icons
