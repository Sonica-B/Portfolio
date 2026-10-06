import { profile, SITE_URL } from '@/lib/content'

export const dynamic = 'force-static'

export function GET() {
  const { identity, links, meta } = profile
  const text = `/* TEAM */
Owner and developer: ${identity.name}
Role: ${identity.title}
Location: ${identity.location.display}
Site: ${SITE_URL}
Contact: ${identity.email}
GitHub: ${links.github}
LinkedIn: ${links.linkedin}

/* THANKS */
Depth Anything V2 for the depth map behind the portrait hero.
Hyperframes for rendering the project pitch videos.
Vercel for hosting.

/* SITE */
Last update: ${meta.lastUpdated}
Language: English
Standards: HTML5, CSS, JSON-LD, Web App Manifest, llms.txt
Components: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Motion, Phosphor icons
Fonts: Bricolage Grotesque, Geist, Geist Mono
Source of truth: content/profile.json (version ${meta.version})
`
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
