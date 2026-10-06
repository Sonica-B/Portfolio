import type { Metadata } from 'next'
import { Suspense } from 'react'
import { KIND_LABEL, formatRange, profile, year } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from '@/lib/jsonld'
import type { KindOption } from '@/components/projects/filter-bar'
import { ProjectIndex, type LedgerItem } from '@/components/projects/project-ledger'
import { ProjectFilter } from './project-filter'

const { projects, identity } = profile
const count = projects.length
const firstYear = projects.map((p) => year(p.start)).sort()[0]

const DESCRIPTION = `${count} machine learning projects by ${identity.name}: research papers, production systems, computer vision, generative AI, MLOps and developer tooling, each with metrics, stack and source links.`

export const metadata: Metadata = {
  title: 'Projects',
  description: DESCRIPTION,
  alternates: { canonical: '/projects' },
  openGraph: { title: `Projects by ${identity.name}`, description: DESCRIPTION, url: '/projects' },
}

const items: LedgerItem[] = projects.map((p) => ({
  slug: p.slug,
  name: p.name,
  subtitle: p.subtitle,
  kind: p.kind,
  kindLabel: KIND_LABEL[p.kind] ?? p.kind,
  range: formatRange(p.start, p.end),
  metric: p.metrics[0] ?? null,
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
          All {count} projects since {firstYear}, from research papers and production systems to computer vision,
          generative AI and developer tooling, each with its metrics, stack and source links.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        {/* The fallback is the full ledger, so the static HTML carries every project even before hydration. */}
        <Suspense fallback={<ProjectIndex items={items} options={options} active="all" />}>
          <ProjectFilter items={items} options={options} />
        </Suspense>
      </div>
    </div>
  )
}
