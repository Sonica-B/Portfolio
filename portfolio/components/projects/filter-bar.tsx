import Link from 'next/link'
import { cn } from '@/lib/utils'

export type KindOption = { kind: string; label: string; count: number }

/** Pseudo-kind for the "Shipped" chip: work with an outside user or a public release, kept in `?shipped=1`. */
export const SHIPPED = 'shipped'

/** The URL for a chip: `/projects`, `/projects?shipped=1` or `/projects?kind=<kind>`. */
export function filterHref(pathname: string, kind: string): string {
  if (kind === 'all') return pathname
  if (kind === SHIPPED) return `${pathname}?shipped=1`
  return `${pathname}?kind=${encodeURIComponent(kind)}`
}

// Mono chips in the HUD grammar: 44 px tall, uppercase 13 px, cyan fill when selected. 12 px side padding on phones keeps the wrapped block short.
const chip =
  'press inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3 font-mono text-[13px] uppercase tracking-[0.08em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-200 md:px-4'
/** The chips wrap in place at every width: no sideways rail, so no chip is ever cut at the edge. */
const rail = 'flex flex-wrap gap-2'
const idle = 'border-rule-strong text-ink-2 hover:border-accent/60 hover:text-ink hover:glow'
const selectedCls = 'border-accent bg-accent text-accent-ink'

/**
 * Filter chips. With `onSelect` they are buttons (client state); without it they are
 * plain links to `?kind=` or `?shipped=1`, which is what the static HTML ships before hydration.
 */
export function FilterBar({
  options,
  active,
  onSelect,
}: {
  options: KindOption[]
  active: string
  onSelect?: (kind: string) => void
}) {
  const renderChip = (o: KindOption) => {
    const selected = o.kind === active
    const cls = cn(chip, selected ? selectedCls : idle)
    const content = (
      <>
        <span>{o.label}</span>
        <span className="tnum">{o.count}</span>
      </>
    )
    if (onSelect) {
      return (
        <button key={o.kind} type="button" aria-pressed={selected} onClick={() => onSelect(o.kind)} className={cls}>
          {content}
        </button>
      )
    }
    return (
      <Link key={o.kind} href={filterHref('/projects', o.kind)} aria-current={selected ? 'true' : undefined} className={cls}>
        {content}
      </Link>
    )
  }
  // Kinds with a single project fold behind "More" so the chips stay within a few rows on a phone.
  const main = options.filter((o) => o.kind === 'all' || o.kind === SHIPPED || o.count > 1)
  const more = options.filter((o) => !main.includes(o))
  const moreActive = more.some((o) => o.kind === active)
  return (
    <div role="group" aria-label="Filter projects" className={rail}>
      {main.map(renderChip)}
      {more.length > 0 && (
        <details className="[&[open]]:w-full" open={moreActive || undefined}>
          <summary className={cn(chip, idle, 'w-fit cursor-pointer list-none [&::-webkit-details-marker]:hidden')}>
            <span>More kinds</span>
            <span className="tnum">{more.length}</span>
          </summary>
          <div className="mt-2 flex w-full flex-wrap gap-2">{more.map(renderChip)}</div>
        </details>
      )}
    </div>
  )
}
