import Link from 'next/link'
import { FilterBar, type KindOption } from '@/components/projects/filter-bar'

export type LedgerItem = {
  slug: string
  name: string
  subtitle: string
  kind: string
  kindLabel: string
  range: string
  metric: { label: string; value: string } | null
}

/** Numbered ledger of projects: index, name, subtitle, kind, dates and the first metric. */
export function ProjectLedger({ items }: { items: LedgerItem[] }) {
  if (items.length === 0) {
    return <p className="hairline py-10 text-ink-2">No projects of this kind yet.</p>
  }
  return (
    <ol className="hairline">
      {items.map((it, i) => (
        <li key={it.slug} className="border-b border-rule">
          <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 py-6 md:grid-cols-[3rem_minmax(0,1fr)_11rem_13rem] md:gap-x-6 md:py-7">
            <span className="text-metric pt-1 text-sm text-ink-3" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <Link href={`/projects/${it.slug}`} className="text-title inline-block text-ink transition-colors hover:text-accent">
                {it.name}
              </Link>
              <p className="mt-1.5 max-w-[60ch] text-ink-2">{it.subtitle}</p>
            </div>
            <div className="col-start-2 text-sm text-ink-2 md:col-start-auto">
              <p>{it.kindLabel}</p>
              <p className="mt-1">{it.range}</p>
            </div>
            {it.metric ? (
              <div className="col-start-2 md:col-start-auto md:text-right">
                <p className="text-metric text-lg text-ink">{it.metric.value}</p>
                <p className="mt-1 text-xs text-ink-2">{it.metric.label}</p>
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Filter bar, live count and ledger. Server-safe; the client wrapper only adds URL state. */
export function ProjectIndex({
  items,
  options,
  active,
  onSelect,
}: {
  items: LedgerItem[]
  options: KindOption[]
  active: string
  onSelect?: (kind: string) => void
}) {
  const shown = active === 'all' ? items : items.filter((it) => it.kind === active)
  const label = options.find((o) => o.kind === active)?.label
  return (
    <div>
      <FilterBar options={options} active={active} onSelect={onSelect} />
      <p className="mt-8 text-sm text-ink-2" aria-live="polite" aria-atomic="true">
        {shown.length} {shown.length === 1 ? 'project' : 'projects'}
        {active !== 'all' && label ? ` in ${label}` : ''}
      </p>
      <div className="mt-4">
        <ProjectLedger items={shown} />
      </div>
    </div>
  )
}
