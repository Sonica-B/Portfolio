import type { Metric } from '@/lib/content'
import { cn } from '@/lib/utils'

// Column spans on a 12-column grid, chosen so every row fills and no two rows match.
const SPANS: Record<number, number[]> = {
  1: [12],
  2: [7, 5],
  3: [5, 4, 3],
  4: [7, 5, 4, 8],
  5: [7, 5, 4, 4, 4],
  6: [5, 4, 3, 3, 4, 5],
}
const SPAN_CLASS: Record<number, string> = {
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  12: 'md:col-span-12',
}

function spans(n: number): number[] {
  if (n <= 6) return SPANS[n] ?? []
  const out = [...SPANS[6]]
  let rest = n - 6
  while (rest > 0) {
    if (rest === 1) {
      out.push(12)
      rest = 0
    } else if (rest === 2) {
      out.push(7, 5)
      rest = 0
    } else {
      out.push(4, 4, 4)
      rest -= 3
    }
  }
  return out
}

/** Asymmetric bento of mono metric values. The first cell is tinted amber, the second raised. */
export function MetricStrip({ metrics, className }: { metrics: Metric[]; className?: string }) {
  const n = metrics.length
  if (n === 0) return null
  const s = spans(n)
  return (
    <dl className={cn('grid grid-cols-2 gap-px overflow-hidden rounded-card border border-rule bg-rule md:grid-cols-12', className)}>
      {metrics.map((m, i) => {
        const hero = i === 0
        // On phones the hero spans the row; when the remainder is odd the last cell does too.
        const fullOnMobile = hero || (n % 2 === 0 && i === n - 1)
        return (
          <div
            key={`${m.label}-${i}`}
            className={cn(
              'flex flex-col justify-between gap-6 p-5 md:p-6',
              fullOnMobile ? 'col-span-2' : 'col-span-1',
              SPAN_CLASS[s[i]] ?? 'md:col-span-4',
              hero ? 'bg-accent-soft' : i === 1 ? 'bg-surface-raised' : 'bg-surface',
            )}
          >
            <dt className="order-2 text-sm text-ink-2">{m.label}</dt>
            <dd className={cn('order-1 text-metric text-balance text-ink', hero ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl')}>
              {m.value}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
