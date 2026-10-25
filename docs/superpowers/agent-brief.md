# Shared brief for build agents (read fully before touching code)

Repo: D:\WPI_Assignments\Portfolio-master\Portfolio-master (branch redesign-2026). App lives in `portfolio/`.
Stack: Next.js 16 (App Router, Turbopack, static output), React 19, TypeScript 5, Tailwind CSS 4 (CSS-first config in `portfolio/app/globals.css`), `motion` (import from `motion/react`), Phosphor icons.
Spec: `docs/superpowers/specs/2026-10-06-portfolio-rebuild-design.md`. Content model: `portfolio/content/profile.json` typed in `portfolio/lib/content.ts` (exports `profile`, `featuredProjects`, `getProject`, `getPublication`, `getExperience`, `formatMonth`, `formatRange`, `year`, `allProjectTags`, `KIND_LABEL`, `SITE_URL`). JSON-LD helpers in `portfolio/lib/jsonld.tsx` (`JsonLd`, `breadcrumbJsonLd`, `scholarlyArticleJsonLd`, `projectJsonLd`, `videoJsonLd`, `itemListJsonLd`, `profilePageJsonLd`).

## Design system (use these, do not invent new colors)
Tailwind color utilities from tokens: `bg-surface`, `bg-surface-raised`, `bg-surface-sunken`, `border-rule`, `border-rule-strong`, `text-ink`, `text-ink-2` (secondary, passes AA), `text-ink-3` (decorative only, never for body copy), `bg-accent` / `text-accent` (amber), `text-accent-ink` (text on accent), `bg-accent-soft`.
Typography utilities: `text-display` (h1 only), `text-headline` (h2), `text-title` (h3/cards), `text-lead`, `text-label` (mono uppercase, use at most once per three sections), `text-metric` (mono tabular numbers), `font-display`, `font-mono`.
Layout utilities: `container-site` (max 1440px with fluid gutters), `hairline` (top rule), `cv-auto`, `safe-bottom`, `press` (active scale), `reveal` (used by the Reveal component).
Components: `components/ui/section.tsx` (`<Section id title intro label>`), `components/ui/button.tsx` (`<ButtonLink href variant="primary|secondary|ghost" download>`), `components/ui/reveal.tsx` (`<Reveal as delay>` client wrapper, fires on mount if in view), `components/motion-primitives/*` (text-effect, in-view, animated-number, spotlight, tilt, magnetic, progressive-blur, text-shimmer, glow-effect, border-trail, animated-group, morphing-dialog, image-comparison, disclosure, infinite-slider, sliding-number, text-loop, text-morph, text-roll, text-scramble, transition-panel, scroll-progress). Motion components are client components; import them into server components freely.
Icons: Phosphor only. In server components import from `@phosphor-icons/react/dist/ssr`; in client components from `@phosphor-icons/react`. Never hand-draw SVG icons. One weight (regular).
Radius: 12px containers (`rounded-card`), pill buttons. One accent. Dark default; light theme via `[data-theme="light"]` tokens works automatically if you only use token utilities.

## Hard rules (taste skill + her own rules)
- Zero em dashes or en dashes in any visible string. Use commas, periods or "to".
- Sentence case headings. No hype words (seamless, elevate, cutting-edge, game-changer, revolutionize).
- No three-equal-card feature rows. No bordered white cards. Prefer hairlines, spacing, asymmetric grids, numbered lists.
- No scroll cues, no section-number labels, no decorative colored dots, no marquees, no version labels, no fake screenshots, no placeholder images. Only real assets under `public/portrait`, `public/projects/<slug>/`, `public/images/badges`, `public/images/certs`, `public/videos/<slug>.mp4` and `.jpg` (videos may not exist yet: check with `fs.existsSync` at build time and render nothing if absent).
- Every string must be real content from profile.json. Numbers come from profile.json only.
- Honor reduced motion. Animate only transform and opacity. No `window.addEventListener('scroll')`; use IntersectionObserver, `useScroll` from motion, or the Reveal component.
- Accessibility: one h1 per page, headings in order, labels on icon-only buttons, 44px tap targets, visible focus, `aria-current` on nav, images with alt and width/height, `loading="lazy"` below the fold, `scroll-margin-top` on anchored headings (`scroll-mt-24`).
- Mobile first: every multi-column layout collapses explicitly below 768px. Test mentally at 360px and 2560px.
- Dark and light: only token utilities, so both themes work.

## Working rules
- A "Fact-Forcing Gate" hook may ask you, before creating a file or running a delete, to present facts (callers of the new file, confirmation that nothing duplicates it, data schema if any, and the user's instruction verbatim: "This is my current portfolio website. It looks too old for a 2026 job era. Make it better to impress the recruiters without looking like a slop."). Present those facts in your message text, then retry as the hook instructs.
- Bash commands longer than about 8 KB fail on this machine; use the Write tool for files.
- Do not run `npm install` or edit `package.json`; if you truly need a dependency, say so in your final report instead.
- `portfolio/node_modules` may still be installing when you start; poll `ls portfolio/node_modules/next` until it exists before running checks.
- Verify with `cd portfolio && npx tsc --noEmit` and `npx next build` (the build runs the drift guard first). Fix every error you introduced. Do not break the shared files you do not own.
- Stay inside your owned files (listed in your task). Report: files created, anything you could not finish, any content gaps you noticed.

- Builds: iterate with `npx tsc --noEmit`; run `npx next build` at most once at the end, because other agents share the same `.next` directory. If a build fails with an error in a file you do not own, wait a minute and retry once, then report.
