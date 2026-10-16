import { profile, SITE_URL } from '@/lib/content'
import { PITCH_SECONDS } from '@/components/reel/pitch-slugs'

export const dynamic = 'force-static'

// humans.txt (humanstxt.org): who built the site and with what. No email address here: the
// contact paths are LinkedIn, the scheduling link and the vCard, which is the one attachment
// that carries the address.
export function GET() {
  const { identity, links, meta } = profile
  const text = `/* TEAM */
Owner and developer: ${identity.name}
Role: ${identity.title}
Location: ${identity.location.display}
Site: ${SITE_URL}
Contact: LinkedIn ${links.linkedin}, scheduling ${links.scheduling}, vCard ${SITE_URL}/shreya-boyane.vcf
GitHub: ${links.github}
ORCID: ${links.orcid}

/* THANKS */
Depth Anything V2 for the depth maps behind the hero point cloud and the about-page portrait.
Hyperframes for rendering the ${PITCH_SECONDS}-second project pitch videos.
Motion-Primitives for the interaction mechanics behind several components.
Phosphor for the icons.
Vercel for hosting, analytics and speed insights.

/* SITE */
Last update: ${meta.lastUpdated}
Language: English
Theme: dark only, cyan accent, one magenta signal colour, no light mode
Doctype: HTML5
Standards: HTML5, CSS, JSON-LD (schema.org), Web App Manifest, llms.txt, text/markdown content negotiation, vCard 3.0, XML sitemap with image and video entries
Components: Next.js 16 (App Router, Turbopack, every route static), React 19, TypeScript 5, Tailwind CSS 4, Motion 12, Phosphor icons, WebGL2 point cloud
Fonts: Space Grotesk (display), Geist (body), Geist Mono (numbers and status lines), self-hosted through next/font
Analytics: Vercel Analytics and Speed Insights; Plausible or Umami only when configured at build time
Source of truth: content/profile.json (version ${meta.version}), plus content/glossary.json, content/logos.json, content/people.json and the content/github.json snapshot
`
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
