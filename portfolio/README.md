# shreyaboyane.dev (app)

The Next.js application behind https://shreyaboyane.dev, version 2 (October 2026). The repository README gives the overview; this file is the operating manual.

## Stack

- Next.js 16 App Router with Turbopack. Every route is statically generated; the only server code is `proxy.ts` (markdown content negotiation) and the static route handlers for the machine surfaces.
- React 19 and TypeScript 5 in strict mode.
- Tailwind CSS 4 configured in CSS (`app/globals.css`) with OKLCH design tokens. Dark only: one cyan accent, one magenta signal colour used at most once per screen, no light theme, no toggle, `color-scheme: dark`.
- Motion (`motion/react`) plus the Motion-Primitives copies in `components/motion-primitives/` for the interactive parts. Everything honors `prefers-reduced-motion`.
- Phosphor icons, regular weight only.
- Fonts through `next/font/google`: Space Grotesk (display), Geist (body), Geist Mono (numbers and status lines).
- Vercel Analytics and Speed Insights, plus optional Plausible or Umami (see Analytics).

## Layout

| Path | Purpose |
|---|---|
| `content/profile.json` | Single source of truth for every visible string and number |
| `content/glossary.json` | 80 terms with match strings, a one-sentence tip and a source URL, shown as popovers by `Prose` |
| `content/logos.json`, `content/people.json` | Organization logos and recommender portraits |
| `content/github.json` | Build-time GitHub snapshot (stars, last push, language) written by `scripts/sync-github.mjs` |
| `lib/content.ts` | Types and helpers over the content model (`profile`, `featuredProjects`, `getProject`, `repoStats`, `formatRange`, `SITE_URL`) |
| `lib/jsonld.tsx` | JSON-LD builders: Person, WebSite, ProfilePage, BreadcrumbList, ScholarlyArticle, SoftwareSourceCode or CreativeWork, VideoObject, ItemList |
| `lib/analytics.ts` | `track(name, props)` for custom events, forwarded to whichever analytics script is present |
| `app/` | Routes `/`, `/projects`, `/projects/[slug]`, `/research`, `/about`, `/resume`, the OpenGraph image routes, and the machine surfaces listed below |
| `components/hero/` | First screen with the WebGL2 depth portrait and the proof strip |
| `components/instruments/` | One small interactive demo per project (`<Instrument>` wrapper, lazy mounted on intersection, keyboard operable) |
| `components/reel/` | Pitch reel: filmstrip, shared lightbox, `PlayPitch` buttons and the list of slugs that have a video |
| `components/glossary/` | `Prose` and `Term`: the first mention of a glossary term gets a hover, focus or tap popover |
| `components/timeline/` | The `Timeline` instrument used for experience, education, leadership and activity |
| `components/about/` | Hologram portrait, story, credential wallet (certificates fan out per issuer) and recommendations |
| `components/cta/` | Copy-email button, scroll island, command palette (Ctrl or Cmd K), share button |
| `components/site/` | Nav, footer, grain, optional analytics scripts |
| `scripts/sync-github.mjs` | Refreshes `content/github.json`; never fails the build when GitHub is unreachable |
| `scripts/check-profile.mjs` | Drift guard, runs on `prebuild` |
| `scripts/build-markdown.mjs` | Generates `public/md/`, runs on `prebuild` |
| `proxy.ts` | Markdown content negotiation and the `Link` header that advertises each page's markdown twin |
| `public/` | Portraits, project images, certificates, pitch videos with posters, resume PDF, logos, people, icons and the generated markdown |

## Content model and drift guard

`content/profile.json` holds `meta`, `identity` (with availability and work authorization), `links`, `now` (three or four dated lines of what is true today), `education`, `publications`, `research`, `experience`, `projects` (each with `pitch: { problem, action, change }`, the three-second strip), `recognition`, `certifications`, `activity`, `leadership`, `recommendations` (with `person` pointing at `people.json`) and `skills`. Dates are ISO `YYYY-MM`; `end: null` means ongoing. Components read it through `lib/content.ts` and never hardcode a string or a number.

`scripts/check-profile.mjs` runs before every build and fails when an entry with a past end date is still marked ongoing, when the word "pursuing" appears, when the WPI GPA is not 3.9, when a publication lacks a venue URL, when an em or en dash appears anywhere, when a project slug is duplicated, when a project summary runs over 40 words, when a pitch line runs over 24 words or is missing, when a problem or approach runs over 70 words, when a highlight runs over 14 words (16 for experience), when `now` has fewer than 3 or more than 4 lines or a bad date, or when a recommendation names a person missing from `people.json`. It warns when `now.date` is older than 120 days.

## Email hygiene

The address never appears in server-rendered HTML, JSON-LD, `llms.txt`, `llms-full.txt`, `humans.txt` or the markdown mirrors. Every email button receives the address split at the `@` (`components/cta/email.ts`) and joins it on the client when clicked, copying it to the clipboard. The machine surfaces point at LinkedIn, the scheduling link and the vCard instead; `/shreya-boyane.vcf` is the one attachment that carries the address, served only when a visitor downloads it. `scripts/build-markdown.mjs` and the `llms-full.txt` route fail the build if the address or a `mailto:` link ever reaches the generated text.

## Machine surfaces

| URL | Source | What it is |
|---|---|---|
| `/sitemap.xml` | `app/sitemap.ts` | Every route (29 URLs), `lastModified` from `meta.lastUpdated`, image entries for the portraits, project visuals, pitch posters and paper figures, and a video entry for each of the 15 pitches |
| `/robots.txt` | `app/robots.ts` | Allows all crawlers, with explicit entries for Googlebot, Bingbot, GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot and Google-Extended; `/_next/` is disallowed except the static bundle and image optimizer |
| `/manifest.webmanifest` | `app/manifest.ts` | Web app manifest with the 192, 512 and maskable 512 icons in `public/icons/` |
| `/opengraph-image`, `/projects/<slug>/opengraph-image` | `app/opengraph-image.tsx`, `lib/og.tsx` | 1200 x 630 social cards: the site card, and one per project with its outcome line and top metrics |
| `/llms.txt` | `app/llms.txt/route.ts` | llmstxt.org index: summary, the dated `now` lines, every page, all 23 projects with their three-second pitch and video URL, publications with authors, contact paths and profiles |
| `/llms-full.txt` | `app/llms-full.txt/route.ts` | All generated markdown concatenated at build time, followed by the 80 glossary definitions |
| `/humans.txt` | `app/humans.txt/route.ts` | Who built the site and with what: theme, fonts, stack, standards, last update |
| `/md/*.md` | `scripts/build-markdown.mjs` | Static markdown mirrors: `index.md`, `projects.md`, `projects/<slug>.md`, `research.md`, `about.md`, `resume.md`, each with the pitches, the `now` lines and the pitch video URLs |
| `/shreya-boyane.vcf` | `app/shreya-boyane.vcf/route.ts` | vCard 3.0 contact card, the only surface that carries the email address |

Every page carries JSON-LD: Person and WebSite from the layout, ProfilePage on the home and about pages, BreadcrumbList on every inner page, ItemList of projects on `/projects` and of the pitch reel on `/`, ScholarlyArticle for both papers on `/research` and on their project pages, SoftwareSourceCode or CreativeWork plus a VideoObject (WebP poster and thumbnail) on every project page that has a pitch.

### Markdown content negotiation

`proxy.ts` runs on `/`, `/projects`, `/projects/<slug>`, `/research`, `/about` and `/resume`. When the request's `Accept` header lists `text/markdown` without `text/html` ahead of it, the request is rewritten to the matching file under `/md/` and the response carries `Vary: Accept`. HTML responses on those routes carry a `Link: <.../md/...>; rel="alternate"; type="text/markdown"` header, and each page's `<head>` has the same alternate link, so an agent can find the markdown twin without guessing.

```bash
curl -H 'Accept: text/markdown' https://shreyaboyane.dev/projects/latent-cot
curl https://shreyaboyane.dev/md/projects/latent-cot.md   # the same file, fetched directly
```

## Analytics

Vercel Analytics and Speed Insights are always on. Two privacy-first alternatives mount only when their variables are set at build time, so an unset variable ships no script:

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Loads the Plausible script for that domain |
| `NEXT_PUBLIC_UMAMI_SRC` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Load the Umami script from that source for that website id (both are required) |

`lib/analytics.ts` exports `track(name, props)` and forwards to whichever script is present. Event names: `cta_click` (`id`, `location`), `video_play` (`slug`, `location`), `instrument_use` (`slug`), `palette_open`, `palette_action` (`id`), `term_open` (`term`), `timeline_expand` (`id`), `wallet_open` (`issuer`). No account is created by the build; set the variables in Vercel when one exists.

## Weekly refresh

`.github/workflows/refresh.yml` runs every Monday at 09:00 UTC (and on demand) and calls the Vercel deploy hook stored in the `VERCEL_DEPLOY_HOOK_URL` repository secret, so the GitHub snapshot in `content/github.json` stays current. The job exits quietly when the secret is missing. During `prebuild`, `scripts/sync-github.mjs` fetches the stars, last push and language of every linked repository; set `GITHUB_TOKEN` to raise the API rate limit. Any failure keeps the committed snapshot and never breaks the build.

## Updating content

1. Edit `content/profile.json`. Keep dates as `YYYY-MM`, use `end: null` for ongoing entries, give every project a three-line `pitch`, refresh the `now` lines with the date, and never type an em or en dash; the drift guard rejects them.
2. `npm run check` runs the drift guard on its own.
3. `node scripts/build-markdown.mjs` regenerates `public/md/`. Commit the result together with the JSON. `npm run build` runs both steps, after the GitHub sync, through `prebuild`.
4. Images: project visuals live in `public/projects/<slug>/`, certificates in `public/images/certs/` as WebP, logos in `public/logos/`, recommender portraits in `public/people/`. Pitch videos go to `public/videos/<slug>.mp4` with a 960 x 540 `.webp` poster and a 480 x 270 `-thumb.webp`; add the slug to `components/reel/pitch-slugs.ts` so the reel, the project page, the sitemap and the markdown pick it up.
5. Glossary: add a term to `content/glossary.json` with its match strings, a one-sentence tip and a source; `Prose` wraps the first occurrence on each page.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run build` | `prebuild` (GitHub sync, drift guard, markdown generation) followed by `next build` |
| `npm run start` | Serves the production build |
| `npm run check` | Drift guard only |
| `npm run typecheck` | `tsc --noEmit` |

## Deployment

Vercel with the root directory set to `portfolio`. `master` deploys to production; other branches and pull requests get preview URLs. Security headers and long-lived caching for static assets are set in `next.config.ts`; `vercel.json` only pins the framework.

## Credits

- Portrait depth maps: Depth Anything V2, rendered as a WebGL2 point cloud in the hero and as the hologram card on the about page, with flat-image fallbacks for reduced motion, missing WebGL2 and `Save-Data`.
- Pitch videos: Hyperframes.
- Icons: Phosphor. Fonts: Space Grotesk, Geist and Geist Mono. Interaction mechanics: Motion-Primitives.
