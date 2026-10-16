import { formatMonth, formatRange, year } from '@/lib/content'
import { TimelineRail } from './timeline-rail'

export type TimelineMetric = { label: string; value: string }

export type TimelineItem = {
  /** Stable id, also sent as the `timeline_expand` analytics prop. */
  id: string
  /** "YYYY-MM". */
  start: string
  /** "YYYY-MM", null while the range is ongoing, equal to `start` for a single dated event. */
  end: string | null
  title: string
  org: string
  /** Key into content/logos.json; defaults to `org`. */
  logoName?: string
  /** What she did and what changed, one sentence per line. */
  lines: string[]
  metrics?: TimelineMetric[]
  /** External link shown inside the open node, labelled with `org`. */
  href?: string
  /** Small mono tags in the node header, for example the kind of involvement. */
  tags?: string[]
  /** Verbatim date text for sources that only give years ("2019 to 2022"); replaces the computed range. */
  dateLabel?: string
}

export type TimelineProps = {
  items: TimelineItem[]
  /** "auto" adds a sticky year scrubber from md up; "vertical" is the rail alone at every width. */
  orientation?: 'auto' | 'vertical'
  /** "compact" hides metrics and folds the lines into one sentence. */
  density?: 'default' | 'compact'
  /** Node open on load: the first, none, or the id of an item. */
  initialOpen?: 'first' | 'none' | (string & {})
  className?: string
}

/** An item with its display strings resolved on the server, so the client bundle never imports profile.json. */
export type TimelineEntry = TimelineItem & {
  dateText: string
  yearText: string
  ongoing: boolean
  /** The first ongoing item in the list: the one node allowed to use the signal colour. */
  signal: boolean
}

/**
 * Vertical timeline with a scroll-linked progress rail, one disclosure per node and a sticky
 * year scrubber on wide screens. Render it from server components: dates are formatted here with
 * lib/content.ts and only the resulting strings cross into the client rail.
 */
export function Timeline({ items, orientation = 'auto', density = 'default', initialOpen = 'first', className }: TimelineProps) {
  let signalUsed = false
  const entries: TimelineEntry[] = items.map((item) => {
    const ongoing = item.end === null
    const signal = ongoing && !signalUsed
    if (signal) signalUsed = true
    return {
      ...item,
      ongoing,
      signal,
      yearText: year(item.start),
      dateText: item.dateLabel ?? (item.end === item.start ? formatMonth(item.start) : formatRange(item.start, item.end)),
    }
  })

  const initialOpenId =
    initialOpen === 'none'
      ? null
      : initialOpen === 'first'
        ? (entries[0]?.id ?? null)
        : entries.some((e) => e.id === initialOpen)
          ? initialOpen
          : null

  return (
    <TimelineRail entries={entries} orientation={orientation} density={density} initialOpenId={initialOpenId} className={className} />
  )
}
