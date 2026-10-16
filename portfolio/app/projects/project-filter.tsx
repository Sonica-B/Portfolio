import { Suspense } from 'react'
import { getProject, isEarlierWork } from '@/lib/content'
import type { KindOption } from '@/components/projects/filter-bar'
import { ProjectIndex, ProjectIndexLive } from '@/components/projects/project-ledger'
import type { StripItem } from '@/components/projects/project-strip'

/**
 * Server half of the index: adds each project's shipped label and its "Earlier work" flag from
 * profile.json, so the client half never imports the content graph. The live index reads `?kind=`
 * or `?shipped=1`; its fallback is the full sheet, so the static HTML carries every project.
 */
export function ProjectFilter({ items, options }: { items: StripItem[]; options: KindOption[] }) {
  const enriched: StripItem[] = items.map((it) => {
    const p = getProject(it.slug)
    return { ...it, shipped: p?.shipped?.label ?? null, earlier: p ? isEarlierWork(p) : false }
  })
  return (
    <Suspense fallback={<ProjectIndex items={enriched} options={options} active="all" />}>
      <ProjectIndexLive items={enriched} options={options} />
    </Suspense>
  )
}
