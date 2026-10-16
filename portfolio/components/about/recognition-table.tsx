import { profile, year, type Recognition } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'

/** "competition" -> "Competition": the fallback for the fourth column when an entry carries no note. */
const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

type Row = Recognition & { year: string; firstOfYear: boolean; tone: boolean }

/** Newest first; the year prints once per group and every second row carries a tone instead of a rule. */
function rows(): Row[] {
  const sorted = [...profile.recognition].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  let previous = ''
  return sorted.map((r, i) => {
    const y = year(r.date)
    const firstOfYear = y !== previous
    previous = y
    return { ...r, year: y, firstOfYear, tone: i % 2 === 1 }
  })
}

const HEAD = 'pb-2 pr-4 text-left text-sm font-normal text-ink-2'
// Below md the table reflows into blocks: the year as a figure above its group, the title on one line,
// then issuer and note together on the next. Explicit roles keep the table semantics through the reflow.
const CELL = 'py-3.5 pr-4 align-top max-md:py-0 max-md:pr-0'

/**
 * Recognition as a four-column table with no lines (year, title, issuer with its mark, what it was for).
 * Rows are 16 px with 14 px above and below; alternate rows carry the raised tone across the full width.
 */
export function RecognitionTable() {
  const list = rows()
  return (
    <table role="table" className="w-full border-collapse max-md:block">
      <thead role="rowgroup" className="max-md:sr-only">
        <tr role="row">
          <th role="columnheader" scope="col" className={cn(HEAD, 'w-16 md:w-20')}>
            Year
          </th>
          <th role="columnheader" scope="col" className={cn(HEAD, 'md:w-[34%]')}>
            Title
          </th>
          <th role="columnheader" scope="col" className={cn(HEAD, 'md:w-[24%]')}>
            Issuer
          </th>
          <th role="columnheader" scope="col" className={cn(HEAD, 'pr-0')}>
            What for
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup" className="max-md:block">
        {list.map((r, i) => (
          <tr
            key={r.id}
            role="row"
            className={cn(
              'max-md:block max-md:py-3',
              r.tone && 'bg-surface-raised/40',
              r.firstOfYear && i > 0 && 'md:[&>td]:pt-6',
              r.firstOfYear && i > 0 && 'max-md:mt-3',
            )}
          >
            <td role="cell" className={cn(CELL, 'text-metric text-ink-2 max-md:block max-md:text-xl max-md:text-ink', r.firstOfYear && 'max-md:pb-1')}>
              {r.firstOfYear ? r.year : null}
            </td>
            <td role="cell" className={cn(CELL, 'text-ink max-md:block')}>
              {r.title}
            </td>
            <td role="cell" className={cn(CELL, 'text-sm text-ink-2 max-md:inline')}>
              <span className="group inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                <Logo name={r.org} height={16} />
                <span>{r.org}</span>
              </span>
            </td>
            <td role="cell" className={cn(CELL, 'pr-0 text-sm text-ink-2 max-md:inline')}>
              <span aria-hidden="true" className="md:hidden">
                {' · '}
              </span>
              {r.note ?? sentenceCase(r.kind)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
