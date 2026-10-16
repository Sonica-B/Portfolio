import type { Metadata } from 'next'
import { Suspense } from 'react'
import { KIND_LABEL, profile, year, type Project } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from '@/lib/jsonld'
import { PITCH_SECONDS, hasPitch, pitchThumbSrc } from '@/components/reel/pitch-slugs'
import type { KindOption } from '@/components/projects/filter-bar'
import { publicImageSize } from '@/components/projects/figure'
import { ProjectIndex } from '@/components/projects/project-ledger'
import type { StripFrame, StripItem } from '@/components/projects/project-strip'
import { ProjectFilter } from './project-filter'

const { projects, identity } = profile
const count = projects.length
const firstYear = projects.map((p) => year(p.start)).sort()[0]
const pitched = projects.filter((p) => hasPitch(p.slug)).length

// 150 to 160 characters, counts from the content model.
const DESCRIPTION = `${count} machine learning projects by ${identity.name} since ${firstYear}, each with the problem, what she did, what changed and the metrics; ${pitched} carry a ${PITCH_SECONDS}-second pitch video.`

export const metadata: Metadata = {
  title: 'Projects',
  description: DESCRIPTION,
  alternates: { canonical: '/projects' },
  // A page-level openGraph object replaces the layout's, so the card image is restated here.
  openGraph: {
    type: 'website',
    title: `Projects by ${identity.name}`,
    description: DESCRIPTION,
    url: '/projects',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${identity.name}, ${identity.title}` }],
  },
}

/** The metric that stands in for a picture: the first one short enough to read as a number. */
function tileMetric(p: Project) {
  return p.metrics.find((m) => m.value.length <= 12) ?? p.metrics[0]
}

/** Pitch thumbnail when a video exists, else the project visual, else a typographic metric tile. */
function frameFor(p: Project): StripFrame {
  if (hasPitch(p.slug)) return { type: 'thumb', src: pitchThumbSrc(p.slug) }
  if (p.visual) {
    const { width, height } = publicImageSize(p.visual.src)
    return { type: 'visual', src: p.visual.src, alt: p.visual.alt, width, height }
  }
  const m = tileMetric(p)
  return m
    ? { type: 'metric', value: m.value, label: m.label }
    : { type: 'metric', value: year(p.start), label: KIND_LABEL[p.kind] ?? p.kind }
}

const items: StripItem[] = projects.map((p) => ({
  slug: p.slug,
  name: p.name,
  kind: p.kind,
  kindLabel: KIND_LABEL[p.kind] ?? p.kind,
  year: year(p.end ?? p.start),
  change: p.pitch.change,
  hasPitch: hasPitch(p.slug),
  frame: frameFor(p),
}))

const options: KindOption[] = [{ kind: 'all', label: 'All', count }]
for (const p of projects) {
  const existing = options.find((o) => o.kind === p.kind)
  if (existing) existing.count += 1
  else options.push({ kind: p.kind, label: KIND_LABEL[p.kind] ?? p.kind, count: 1 })
}

export default function ProjectsPage() {
  return (
    <div className="container-site py-16 md:py-24">
      <JsonLd data={itemListJsonLd(projects)} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Work', path: '/projects' }])} />

      <header className="max-w-[64ch]">
        <h1 className="text-display">Work</h1>
        <p className="text-lead mt-5 text-ink-2">
          All {count} projects since {firstYear}, each with the problem, what she did and what changed. {pitched} of them
          carry a {PITCH_SECONDS}-second pitch.
        </p>
      </header>

      <div className="mt-10 md:mt-14">
        {/* The fallback is the full sheet, so the static HTML carries every project even before hydration. */}
        <Suspense fallback={<ProjectIndex items={items} options={options} active="all" />}>
          <ProjectFilter items={items} options={options} />
        </Suspense>
      </div>
    </div>
  )
}
