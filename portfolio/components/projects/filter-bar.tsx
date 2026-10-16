import Link from 'next/link'
import { cn } from '@/lib/utils'

export type KindOption = { kind: string; label: string; count: number }

// Mono chips in the HUD grammar: 44 px tall, uppercase 13 px, cyan fill when selected.
const chip =
  'press inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 font-mono text-[13px] uppercase tracking-[0.08em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-200'
/**
 * Phones: one snap rail that bleeds into the page gutters so the next chip shows at the edge
 * (same gutter clamp as container-site). From 768 px the chips wrap in place.
 */
const rail =
  'flex gap-2 [--gutter:clamp(1rem,0.4rem+3vw,4rem)] mx-[calc(-1*var(--gutter))] snap-x snap-mandatory scroll-px-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:thin] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0'
const idle = 'border-rule-strong text-ink-2 hover:border-accent/60 hover:text-ink hover:glow'
const selectedCls = 'border-accent bg-accent text-accent-ink'

/**
 * Filter chips. With `onSelect` they are buttons (client state); without it they are
 * plain links to `?kind=`, which is what the static HTML ships before hydration.
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
  return (
    <div role="group" aria-label="Filter projects by kind" className={rail}>
      {options.map((o) => {
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
          <Link
            key={o.kind}
            href={o.kind === 'all' ? '/projects' : `/projects?kind=${encodeURIComponent(o.kind)}`}
            aria-current={selected ? 'true' : undefined}
            className={cls}
          >
            {content}
          </Link>
        )
      })}
    </div>
  )
}
