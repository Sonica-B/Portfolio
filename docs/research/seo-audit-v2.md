# SEO audit, portfolio v2 (2026-10-16)

Scope: 28 routes on the dev server (5 pages, 23 project pages), the machine surfaces (`sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `humans.txt`, `/md/*`, vCard) and their JSON-LD, against the seo-audit 2.2.1 and ai-seo 2.9.0 checklists. Method: curl of every route, a node script that parses each `application/ld+json` block, greps for `mailto:` and the address, a browser pass for target sizes. Search Console, field vitals, rankings and backlinks were unavailable.

## Executive summary

Foundations are sound: static HTML, a self-referencing canonical and one H1 on every route, correct sitemap and robots, a markdown twin of every page. Fixed in this pass: the email address exposed in HTML, JSON-LD and every machine file; inner pages inheriting the home page's OpenGraph title, description and URL; the Person node pointing at the v1 portrait and `VideoObject` thumbnails at JPEG posters. What remains sits in files outside this agent's scope, listed with lines below.

## Technical SEO

| Check | Result |
|---|---|
| robots.txt | Allows all; named entries for Googlebot, Bingbot, GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Google-Extended; sitemap URL `https://shreyaboyane.dev/sitemap.xml` verified |
| sitemap.xml | 29 URLs (5 pages, 23 projects, llms.txt), `lastmod` 2026-10-15 from `meta.lastUpdated`, 28 image entries, 15 video entries (new) |
| Canonicals | Self-referencing on every route, https, no trailing slash |
| Indexability | No noindex; `max-image-preview: large`, `max-snippet: -1`, `max-video-preview: -1` |
| Headers | HSTS, nosniff, DENY framing, referrer policy, permissions policy, immutable caching for media and fonts |
| Markdown negotiation | `Accept: text/markdown` returns the mirror; HTML now carries `Link: rel="alternate" type="text/markdown"` plus a matching `<link>` (new) |
| Email exposure | Fixed: 0 `mailto:` and 0 joined addresses on every page and machine file except `/resume` (was 4 to 6 per page) |

## On-page

- Titles use the `%s | Shreya Boyane` template: home 67 characters with name and role in the first 41 (trim to "Vision and LLMs" if Google rewrites it), research 41, resume 49.
- Descriptions: home 159 characters naming role, domain and location; research 156; resume 159. About is 329 and projects 183 (see remaining).
- OpenGraph: `/research` and `/resume` now carry their own `og:title`, `og:description`, `og:url`, `og:type` and the 1200 x 630 card; the layout no longer pins the home copy, so `/about` gets its own title and description too (its `og:url` still inherits the home URL, see remaining).
- Headings and internal links: one H1 per page, breadcrumbs on every inner page, every project reachable from `/projects` and the reel, no orphans.
- Target sizes: footer list links measure 28 px tall with 8 px spacing (Lighthouse had flagged 18 px).

## Content

- E-E-A-T: author identity on every page and machine file (`Author: Shreya Boyane`, `dateModified`), credentials in `Person.alumniOf`, `hasCredential`, `award` and `worksFor`, two papers with authors, venues and status, first-hand outcomes with numbers.
- Freshness: the `now` block dated 2026-10-15 appears on the home page, `llms.txt`, `llms-full.txt`, `index.md` and `about.md`; the footer shows "Last updated"; the drift guard warns after 120 days.
- Honest framing: a submitted paper gets `dateCreated` and `creativeWorkStatus: Submitted`, never `datePublished`.

## AI visibility (ai-seo checklist)

- Extractability: pass. Every project opens with a self-contained three-sentence pitch (problem, action, change) that now also appears in `llms.txt`, every markdown mirror and `VideoObject.description`; 80 term definitions sit in `llms-full.txt`; statistics carry dates and sources.
- Bot access: pass. Discovery, user-triggered and training crawlers are all allowed, matching the goal of being cited.
- Machine-readable files: pass. `llms.txt` (direct answers first, dated facts, author line, pitch video URLs, contact paths without email), `llms-full.txt` (172 KB, mirrors plus glossary), `humans.txt`, `/md/*`, vCard, markdown `Link` header.
- Schema: pass. 28 routes, every block parses, zero failures: Person (ImageObject `shreya2-560.webp`, `knowsAbout` from all skills, `alumniOf`, `worksFor` and `affiliation`, `sameAs` with 8 profiles, `contactPoint` to the scheduling link, vCard and resume as `subjectOf`), WebSite and ProfilePage sharing the portrait, BreadcrumbList on every inner page, ItemList of 23 projects and of the 15-video reel, ScholarlyArticle for both papers, SoftwareSourceCode or CreativeWork per project linking its VideoObject by `@id`, VideoObject with WebP poster and thumbnail.

## Fixed in this pass

`lib/jsonld.tsx`, `app/sitemap.ts`, `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts`, `app/humans.txt/route.ts`, `scripts/build-markdown.mjs` (no email, pitches, now lines, video URLs, leak guard), `components/site/footer.tsx` (CopyEmail, target sizes), `proxy.ts` (Link header), metadata in `app/layout.tsx`, `app/research/page.tsx` and `app/resume/page.tsx`, both README files.

## Remaining (outside this agent's files)

1. `portfolio/app/resume/page.tsx:72` to `73`: a literal `mailto:` anchor prints the address (2 `mailto:`, 4 copies). Replace with `CopyEmail` or drop it; the vCard covers the need. High.
2. `portfolio/app/projects/page.tsx:23`: the page-level `openGraph` object drops the inherited `og:image`, the only route without a card. Add `images: ['/opengraph-image']` or remove the override. High.
3. `portfolio/app/about/page.tsx:18`: the description is 329 characters; cut it to 150 to 160 and add `openGraph: { url: '/about', images }` so `og:url` stops pointing at the home page. Medium.
4. `portfolio/app/projects/page.tsx:17`: the description is 183 characters. Low.
5. RSC payload: client buttons receive the address as two halves from `components/cta/email.ts`; a scraper regex cannot join them, but a literal `@gmail` grep still finds 3 to 5 hits per page. Splitting as `["user@", "domain"]` would clear that. Low.
6. `VideoObject.uploadDate` uses `meta.lastUpdated` because the content model has no per-video date. Low.
7. Not measurable here: field Core Web Vitals, Search Console coverage and the monthly AI citation check of 10 to 20 target prompts.
