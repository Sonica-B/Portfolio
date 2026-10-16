import { KIND_LABEL, getProject, profile, projectSlugs } from '@/lib/content'
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og'

export const alt = `Project by ${profile.identity.name}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const dynamicParams = false

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }))
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) {
    return renderOg({ title: profile.identity.name, subtitle: profile.identity.headline })
  }
  // The v2 palette (ground #03080f for oklch(0.13 0.02 255), cyan #5de8f6) lives in lib/og.tsx; the outcome line sits under the title.
  return renderOg({
    kicker: KIND_LABEL[p.kind] ?? p.kind,
    title: p.name,
    subtitle: p.pitch.change,
    metrics: p.metrics.slice(0, 3),
  })
}
