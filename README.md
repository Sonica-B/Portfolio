# shreyaboyane.dev

Source for Shreya Boyane's portfolio: a static Next.js 16 site for a machine learning engineer who publishes research and ships production systems. The application lives in `portfolio/`; this folder also carries the design documents.

## Repository layout

- `portfolio/`: the Next.js app. Its own README is the operating manual (stack, content model, scripts, machine surfaces).
- `docs/superpowers/specs/2026-10-06-portfolio-rebuild-design.md`: the design spec for the 2026 rebuild.
- `docs/superpowers/agent-brief.md`: the shared rules every contributor follows (design tokens, accessibility, real content only, no em dashes).
- `docs/videos/`: share copy for the project pitch videos.

## Stack

Next.js 16 (App Router, Turbopack, every route static), React 19, TypeScript 5, Tailwind CSS 4 with OKLCH tokens, Motion for interactive islands, Phosphor icons, and `next/font` for Bricolage Grotesque, Geist and Geist Mono. There are no runtime API routes and no cookies.

## Content model

`portfolio/content/profile.json` is the single source of truth. Every page, the JSON-LD, the sitemap, the HTML resume, `llms.txt`, `llms-full.txt` and the markdown mirrors under `portfolio/public/md/` are generated from it, so a correction is made once.

A drift guard, `portfolio/scripts/check-profile.mjs`, runs before every build and fails on stale facts: an entry marked ongoing after its end date, the word "pursuing", a GPA other than 3.9, a publication without a venue URL, an em or en dash anywhere, a duplicate project slug or a project summary over 60 words.

## Updating content

1. Edit `portfolio/content/profile.json`.
2. Inside `portfolio/`, run `npm run check` for the drift guard.
3. Run `node scripts/build-markdown.mjs` to regenerate `public/md/`. The build does this on its own, and the output is committed so the markdown surfaces work without a build step.
4. Commit the JSON and the regenerated markdown together.

## Running locally

```bash
cd portfolio
npm install
npm run dev      # http://localhost:3000
npm run build    # drift guard, markdown generation, then next build
npm run start    # serve the production build
```

## Deployment

Vercel builds the `portfolio/` directory. Pushes to `master` deploy to production at https://shreyaboyane.dev; every other branch and pull request gets a preview URL. `portfolio/vercel.json` only pins the framework; security headers and asset caching live in `portfolio/next.config.ts`.

## Credits

- The hero renders Shreya's portrait as a WebGL2 point cloud displaced by a depth map produced with Depth Anything V2, the same model family she used in her Einstein Vision project. Reduced motion, missing WebGL2 and `Save-Data` fall back to the flat portrait.
- Project pitch videos are rendered with Hyperframes.
- Fonts: Bricolage Grotesque, Geist and Geist Mono from Google Fonts.
