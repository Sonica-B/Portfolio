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
  return renderOg({
    kicker: KIND_LABEL[p.kind] ?? p.kind,
    title: p.name,
    subtitle: p.subtitle,
    metrics: p.metrics.slice(0, 3),
  })
}
