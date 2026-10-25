# shreyaboyane.dev (app)

The Next.js application behind https://shreyaboyane.dev. The repository README gives the overview; this file is the operating manual.

## Stack

- Next.js 16 App Router with Turbopack. Every route is statically generated and there are no runtime API routes.
- React 19 and TypeScript 5 in strict mode.
- Tailwind CSS 4 configured in CSS (`app/globals.css`) with OKLCH design tokens: dark by default, light theme behind a toggle.
- Motion (`motion/react`) and the Motion-Primitives components in `components/motion-primitives/` for interactive islands. Everything honors `prefers-reduced-motion`.
- Phosphor icons, one weight.
- Fonts through `next/font/google`: Bricolage Grotesque (display), Geist (body), Geist Mono (metrics).
- Vercel Analytics and Speed Insights.

## Layout

| Path | Purpose |
|---|---|
| `content/profile.json` | Single source of truth for all content |
| `lib/content.ts` | Types and helpers over the content model (`profile`, `featuredProjects`, `getProject`, `formatRange`, `SITE_URL`) |
| `lib/jsonld.tsx` | JSON-LD builders: Person, WebSite, ProfilePage, BreadcrumbList, ScholarlyArticle, SoftwareSourceCode, VideoObject, ItemList |
| `app/` | Routes `/`, `/projects`, `/projects/[slug]`, `/research`, `/about`, `/resume`, plus the machine surfaces listed below |
| `components/` | `hero/`, `site/` (nav, footer, theme toggle, grain), `ui/` (section, button, reveal), `motion-primitives/` |
| `scripts/check-profile.mjs` | Drift guard, runs on `prebuild` |
| `scripts/build-markdown.mjs` | Generates `public/md/`, runs on `prebuild` |
| `proxy.ts` | Markdown content negotiation (the Next 16 proxy, successor of middleware) |
| `public/` | Portrait, project images, badges and certificates, pitch videos, resume PDF, icons and the generated markdown |

## Content model and drift guard

`content/profile.json` holds `meta`, `identity` (with availability and work authorization), `links`, `education`, `publications`, `research`, `experience`, `projects`, `recognition`, `certifications`, `activity`, `leadership`, `recommendations` and `skills`. Dates are ISO `YYYY-MM`; `end: null` means ongoing. Components read it through `lib/content.ts` and never hardcode a string or a number.

`scripts/check-profile.mjs` runs before every build and fails when an entry with a past end date is still marked ongoing, when the word "pursuing" appears, when the WPI GPA is not 3.9, when a publication lacks a venue URL, when an em or en dash appears anywhere, when a project slug is duplicated or when a project summary runs over 60 words.

## Machine surfaces

| URL | Source | What it is |
|---|---|---|
| `/sitemap.xml` | `app/sitemap.ts` | Every route, `lastModified` from `meta.lastUpdated`, image entries for project visuals |
| `/robots.txt` | `app/robots.ts` | Allows all crawlers, with explicit entries for Googlebot, Bingbot, GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot and Google-Extended; `/_next/` is disallowed except the static bundle and image optimizer |
| `/manifest.webmanifest` | `app/manifest.ts` | Web app manifest using the 192, 512 and maskable 512 icons in `public/icons/` |
| `/icon`, `/apple-icon` | `app/icon.png`, `app/apple-icon.png` | SB monogram favicons |
| `/llms.txt` | `app/llms.txt/route.ts` | llmstxt.org index: summary plus links to every page and its markdown twin |
| `/llms-full.txt` | `app/llms-full.txt/route.ts` | All generated markdown concatenated at build time |
| `/humans.txt` | `app/humans.txt/route.ts` | Who built the site and with what |
| `/md/*.md` | `scripts/build-markdown.mjs` | Static markdown mirrors: `index.md`, `projects.md`, `projects/<slug>.md`, `research.md`, `about.md`, `resume.md` |

### Markdown content negotiation

`proxy.ts` runs on `/`, `/projects`, `/projects/<slug>`, `/research`, `/about` and `/resume`. When the request's `Accept` header lists `text/markdown` without `text/html` ahead of it, the request is rewritten to the matching file under `/md/` and the response carries `Vary: Accept`. Browsers never ask for markdown, so HTML responses are untouched.

```bash
curl -H 'Accept: text/markdown' https://shreyaboyane.dev/projects/latent-cot
curl https://shreyaboyane.dev/md/projects/latent-cot.md   # the same file, fetched directly
```

## Updating content

1. Edit `content/profile.json`. Keep dates as `YYYY-MM`, use `end: null` for ongoing entries and never type an em or en dash; the drift guard rejects them.
2. `npm run check` runs the drift guard on its own.
3. `node scripts/build-markdown.mjs` regenerates `public/md/`. Commit the result together with the JSON. `npm run build` runs both steps through `prebuild`.
4. Images: project visuals live in `public/projects/<slug>/`, certificates in `public/images/certs/` as WebP (max width 1400, quality 80), badges in `public/images/badges/` as SVG. Pitch videos go to `public/videos/<slug>.mp4` with a `.jpg` poster; pages check for the file at build time and render nothing when it is absent.
5. Icons: `app/icon.png`, `app/apple-icon.png` and `public/icons/*.png` are the SB monogram on amber (`#f0b35c`) rendered with Pillow from Bricolage Grotesque. Regenerate all five together if the mark changes.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run build` | `prebuild` (drift guard, then markdown generation) followed by `next build` |
| `npm run start` | Serves the production build |
| `npm run check` | Drift guard only |
| `npm run typecheck` | `tsc --noEmit` |

## Deployment

Vercel with the root directory set to `portfolio`. `master` deploys to production; other branches and pull requests get preview URLs. Security headers and long-lived caching for static assets are set in `next.config.ts`; `vercel.json` only pins the framework.

## Credits

- Portrait depth map: Depth Anything V2, rendered as a WebGL2 point cloud in `components/hero/depth-portrait.tsx` with a flat-image fallback for reduced motion, missing WebGL2 and `Save-Data`.
- Pitch videos: Hyperframes.
- Icons: Phosphor. Fonts: Bricolage Grotesque, Geist and Geist Mono.
