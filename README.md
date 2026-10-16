# shreyaboyane.dev

Source for Shreya Boyane's portfolio: a static Next.js 16 site for a machine learning engineer who publishes research and ships production systems. Version 2 (October 2026) is a dark-only "mission control" design: every project opens with a three-second strip (the problem, what she did, what changed), a small interactive instrument per project, a reel of 25-second pitch videos, a glossary that explains terms in place, a credential wallet, interactive timelines, and machine-readable surfaces for search engines and AI agents. The application lives in `portfolio/`; this folder also carries the design documents.

## Repository layout

- `portfolio/`: the Next.js app. Its own README is the operating manual (stack, content model, machine surfaces, analytics, scripts).
- `docs/superpowers/specs/2026-10-15-portfolio-v2-design.md`: the v2 design spec; `2026-10-06-portfolio-rebuild-design.md` is the v1 spec it builds on.
- `docs/superpowers/agent-brief-v2.md`: the shared rules every contributor follows (design tokens, accessibility, real content only, no em dashes).
- `docs/research/`: reference studies behind the design, the certifications UI, the glossary and the SEO audit (`seo-audit-v2.md`).
- `docs/qa/`: screenshots and persona walkthroughs from the verification pass.
- `docs/videos/`: plans and share copy for the project pitch videos.
- `.github/workflows/refresh.yml`: the weekly redeploy that keeps the GitHub activity snapshot current.

## Stack

Next.js 16 (App Router, Turbopack, every route static), React 19, TypeScript 5, Tailwind CSS 4 with OKLCH tokens, Motion 12 for the interactive parts, Phosphor icons, and `next/font` for Space Grotesk, Geist and Geist Mono. Dark only, one cyan accent, no light mode. No runtime API routes and no cookies.

## Content model

`portfolio/content/profile.json` is the single source of truth. Every page, the JSON-LD, the sitemap, the OpenGraph images, the HTML resume, `llms.txt`, `llms-full.txt`, `humans.txt`, the vCard and the markdown mirrors under `portfolio/public/md/` are generated from it, so a correction is made once. Side files hold the glossary (`glossary.json`), organization logos (`logos.json`), recommender portraits (`people.json`) and the GitHub snapshot (`github.json`).

A drift guard, `portfolio/scripts/check-profile.mjs`, runs before every build and fails on stale facts or broken copy rules: an entry marked ongoing after its end date, the word "pursuing", a GPA other than 3.9, a publication without a venue URL, an em or en dash anywhere, a duplicate project slug, a project summary over 40 words, a missing or overlong three-line pitch, or a stale `now` block.

The email address never appears in server-rendered HTML or in any machine surface. Buttons assemble it on the client when clicked; the vCard is the one download that carries it.

## Updating content

1. Edit `portfolio/content/profile.json` (and `glossary.json`, `logos.json` or `people.json` when a term, logo or portrait changes).
2. Inside `portfolio/`, run `npm run check` for the drift guard.
3. Run `node scripts/build-markdown.mjs` to regenerate `public/md/`. The build does this on its own, and the output is committed so the markdown surfaces work without a build step.
4. Commit the JSON and the regenerated markdown together.

## Running locally

```bash
cd portfolio
npm install
npm run dev      # http://localhost:3000
npm run build    # GitHub sync, drift guard, markdown generation, then next build
npm run start    # serve the production build
```

## Analytics

Vercel Analytics and Speed Insights are always on. Plausible mounts when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set; Umami mounts when both `NEXT_PUBLIC_UMAMI_SRC` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` are set. Custom events (CTA clicks, video plays, instrument use, palette actions, glossary opens, timeline expands, wallet opens) go through one `track()` helper and reach whichever script is present. No account is created by the build.

## Weekly refresh

`.github/workflows/refresh.yml` runs every Monday at 09:00 UTC and calls the Vercel deploy hook stored in the `VERCEL_DEPLOY_HOOK_URL` repository secret, so the GitHub stars and last-push dates shown on the site stay current. `portfolio/scripts/sync-github.mjs` fetches that snapshot during `prebuild` (set `GITHUB_TOKEN` for a higher rate limit) and keeps the committed file when GitHub is unreachable.

## Deployment

Vercel builds the `portfolio/` directory. Pushes to `master` deploy to production at https://shreyaboyane.dev; every other branch and pull request gets a preview URL. `portfolio/vercel.json` only pins the framework; security headers and asset caching live in `portfolio/next.config.ts`.

## Credits

- The hero renders Shreya's portrait as a WebGL2 point cloud displaced by a depth map produced with Depth Anything V2, the same model family she used in her Einstein Vision project; the about page uses the same engine for a hologram card. Reduced motion, missing WebGL2 and `Save-Data` fall back to the flat portrait.
- Project pitch videos are rendered with Hyperframes.
- Fonts: Space Grotesk, Geist and Geist Mono from Google Fonts, self-hosted through `next/font`. Interaction mechanics borrowed from Motion-Primitives.
