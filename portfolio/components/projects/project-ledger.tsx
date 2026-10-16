'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { CaretRight } from '@phosphor-icons/react'
import { FilterBar, SHIPPED, filterHref, type KindOption } from '@/components/projects/filter-bar'
import { ProjectStrip, type StripItem } from '@/components/projects/project-strip'

const GRID = 'grid grid-cols-1 gap-3 lg:grid-cols-2'

/** "2020 to 2021" from the strips' years, or one year when they agree. */
function yearSpan(items: StripItem[]): string {
  const years = items.map((it) => it.year).sort()
  const first = years[0]
  const last = years[years.length - 1]
  return first === last ? first : `${first} to ${last}`
}

/** The kind chips with "Shipped" after "All", when any item carries a shipped label. */
function chipsFor(items: StripItem[], options: KindOption[]): KindOption[] {
  const shipped = items.filter((it) => it.shipped).length
  const all = options.filter((o) => o.kind === 'all')
  const kinds = options.filter((o) => o.kind !== 'all')
  return shipped > 0 ? [...all, { kind: SHIPPED, label: 'Shipped', count: shipped }, ...kinds] : options
}

/**
 * Contact sheet of every project: filter chips, a live count line, one strip per project (two per
 * row from 1024 px, 12 px gutters), then the projects that ended in 2021 or earlier folded into one
 * "Earlier work" disclosure at the end. Renders on the server as the static fallback and inside
 * ProjectIndexLive once the URL is known.
 */
export function ProjectIndex({
  items,
  options,
  active,
  onSelect,
}: {
  items: StripItem[]
  options: KindOption[]
  active: string
  onSelect?: (kind: string) => void
}) {
  const chips = chipsFor(items, options)
  const shown = active === 'all' ? items : active === SHIPPED ? items.filter((it) => it.shipped) : items.filter((it) => it.kind === active)
  const recent = shown.filter((it) => !it.earlier)
  const earlier = shown.filter((it) => it.earlier)
  const label = chips.find((o) => o.kind === active)?.label
  const pitched = shown.filter((it) => it.hasPitch).length
  const noun = shown.length === 1 ? 'project' : 'projects'
  const scope = active === 'all' || !label ? '' : active === SHIPPED ? ' shipped' : ` in ${label}`
  return (
    <div>
      <FilterBar options={chips} active={active} onSelect={onSelect} />
      <p className="text-status mt-6" aria-live="polite" aria-atomic="true">
        {shown.length} {noun}
        {scope}, {pitched} with a pitch video
      </p>
      {shown.length === 0 ? (
        <p className="mt-4 py-10 text-ink-2">No projects of this kind yet.</p>
      ) : (
        <>
          {recent.length > 0 ? (
            <ul className={`mt-4 ${GRID}`}>
              {recent.map((it) => (
                <ProjectStrip key={it.slug} item={it} />
              ))}
            </ul>
          ) : null}
          {earlier.length > 0 ? (
            <details className="group mt-6 border-t border-rule pt-2" open={recent.length === 0 ? true : undefined}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 py-2 [&::-webkit-details-marker]:hidden">
                <CaretRight size={18} aria-hidden="true" className="text-ink-2 transition-transform duration-200 group-open:rotate-90 motion-reduce:transition-none" />
                <span className="text-title">Earlier work</span>
                <span className="text-sm text-ink-2 tnum">
                  {earlier.length} {earlier.length === 1 ? 'project' : 'projects'}, {yearSpan(earlier)}
                </span>
              </summary>
              <ul className={`mt-3 ${GRID}`}>
                {earlier.map((it) => (
                  <ProjectStrip key={it.slug} item={it} />
                ))}
              </ul>
            </details>
          ) : null}
        </>
      )}
    </div>
  )
}

/** ProjectIndex with the filter kept in the URL (`?kind=` or `?shipped=1`) so a view can be shared or reloaded. */
export function ProjectIndexLive({ items, options }: { items: StripItem[]; options: KindOption[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const kind = searchParams.get('kind')
  const active =
    searchParams.get('shipped') === '1' && items.some((it) => it.shipped)
      ? SHIPPED
      : kind && options.some((o) => o.kind === kind)
        ? kind
        : 'all'

  const select = useCallback((next: string) => router.replace(filterHref(pathname, next), { scroll: false }), [router, pathname])

  return <ProjectIndex items={items} options={options} active={active} onSelect={select} />
}
