import Link from 'next/link'
import { cn } from '@/lib/utils'

export type KindOption = { kind: string; label: string; count: number }

const chip =
  'press inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-200'
const idle = 'border-rule-strong text-ink-2 hover:bg-surface-raised hover:text-ink'
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
    <div role="group" aria-label="Filter projects by kind" className="flex flex-wrap gap-2">
      {options.map((o) => {
        const selected = o.kind === active
        const cls = cn(chip, selected ? selectedCls : idle)
        const content = (
          <>
            <span>{o.label}</span>
            <span className="text-metric text-xs">{o.count}</span>
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
