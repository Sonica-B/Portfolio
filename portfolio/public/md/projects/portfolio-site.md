# shreyaboyane.dev: this site

Content-graph-driven portfolio with a depth-map hero.

- Problem: The previous site drifted a full degree-completion behind reality because content was hardcoded in four places.
- What she did: Rebuilt on Next.js 16 with one JSON content graph, a build-time drift guard and a WebGL2 depth-map hero.
- What changed: One file now feeds 23 project pages, the JSON-LD, sitemap, llms.txt and resume, with every route static and zero runtime APIs.

> A Next.js 16 and React 19 site driven by one JSON content graph that feeds every page, the JSON-LD, the sitemap, llms.txt and the resume, with a WebGL2 hero rendering a Depth Anything V2 depth map of the portrait.

- Kind: Web
- Period: Feb 2026 to present (ongoing)
- Affiliation: Personal
- Repository: https://github.com/Sonica-B/Portfolio

## Problem

The previous version drifted a full degree-completion behind reality because content was hardcoded in four places, and its particle background read as a template.

## Approach

Single source of truth in content/profile.json with a build-time drift guard; Tailwind 4 OKLCH tokens; Motion-Primitives for interactive islands; raw WebGL2 point cloud displaced by depth; static generation for all routes; markdown content negotiation and llms.txt for AI agents; pitch videos rendered with Hyperframes.

## Results

- Serves every route statically with no runtime API.
- Emits Person and ProfilePage JSON-LD with full sameAs and VideoObject per pitch video.
- Keeps one h1 per page and a build-time drift guard on the content graph.

## Key numbers

- Project pages: 23
- Runtime APIs: 0

## Stack

Next.js, React, TypeScript, Tailwind CSS, Motion, WebGL2, Depth Anything V2, Vercel

Canonical page: https://shreyaboyane.dev/projects/portfolio-site. This markdown: https://shreyaboyane.dev/md/projects/portfolio-site.md. Generated from the site content model, last updated 2026-10-15.
