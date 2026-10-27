# shreyaboyane.dev: this site

Content-graph-driven portfolio with a depth-map hero.

> A Next.js 16 and React 19 site driven by one JSON content graph that feeds every page, the JSON-LD, the sitemap, llms.txt and an HTML resume, with a WebGL2 hero that renders a depth map of the portrait produced by Depth Anything V2.

- Kind: Web
- Period: Feb 2026 to present (ongoing)
- Affiliation: Personal
- Repository: https://github.com/Sonica-B/Portfolio

## Problem

The previous version drifted a full degree-completion behind reality because content was hardcoded in four places, and its particle background read as a template.

## Approach

Single source of truth in content/profile.json with a build-time drift guard; Tailwind 4 OKLCH tokens; Motion-Primitives for interactive islands; raw WebGL2 point cloud displaced by depth; static generation for all routes; markdown content negotiation and llms.txt for AI agents; pitch videos rendered with Hyperframes.

## Results

- Every route is static; no runtime API.
- One h1 per page, Person and ProfilePage JSON-LD with full sameAs, VideoObject schema per pitch video.

## Key numbers

- Project pages: 23
- Runtime APIs: 0

## Stack

Next.js, React, TypeScript, Tailwind CSS, Motion, WebGL2, Depth Anything V2, Vercel

Canonical page: https://shreyaboyane.dev/projects/portfolio-site. This markdown: https://shreyaboyane.dev/md/projects/portfolio-site.md. Generated from the site content model, last updated 2026-10-27.
