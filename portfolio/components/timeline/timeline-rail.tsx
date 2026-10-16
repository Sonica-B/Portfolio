'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { track } from '@/lib/analytics'
import { cx } from '@/lib/cx'
import { Reveal } from '@/components/ui/reveal'
import type { TimelineEntry, TimelineProps } from './timeline'
import { TimelineNode } from './timeline-node'
import { YearScrubber } from './year-scrubber'

type Props = {
  entries: TimelineEntry[]
  orientation: NonNullable<TimelineProps['orientation']>
  density: NonNullable<TimelineProps['density']>
  initialOpenId: string | null
  className?: string
}

const NAV_KEYS = new Set(['ArrowDown', 'ArrowUp', 'Home', 'End'])

/**
 * The observer's root is the top half of the viewport. The year in view belongs to the last node
 * whose top has crossed the midline, which is also where scrollIntoView({ block: 'center' }) lands.
 */
const VIEW_BAND = '0px 0px -50% 0px'

/** Client half of Timeline: disclosure state, scroll-linked rail (CSS view timeline, globals.css), year in view, keyboard roving. */
export function TimelineRail({ entries, orientation, density, initialOpenId, className }: Props) {
  const reduced = useReducedMotion() === true
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set(initialOpenId ? [initialOpenId] : []))
  const years = useMemo(() => Array.from(new Set(entries.map((e) => e.yearText))), [entries])
  const [currentYear, setCurrentYear] = useState<string | null>(years[0] ?? null)
  const railRef = useRef<HTMLDivElement>(null)
  const nodes = useRef(new Map<string, HTMLElement>())
  // Nodes the visitor has toggled: only their panels animate open; the node open on load stays still.
  const [touched, setTouched] = useState<ReadonlySet<string>>(() => new Set())
  const scrubber = orientation === 'auto' && years.length > 1

  useEffect(() => {
    if (!scrubber) return
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          const id = (r.target as HTMLElement).dataset.timelineId
          if (!id) continue
          if (r.isIntersecting) visible.add(id)
          else visible.delete(id)
        }
        for (let i = entries.length - 1; i >= 0; i--) {
          if (visible.has(entries[i].id)) {
            setCurrentYear(entries[i].yearText)
            break
          }
        }
      },
      { rootMargin: VIEW_BAND, threshold: 0 },
    )
    for (const e of entries) {
      const el = nodes.current.get(e.id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [entries, scrubber])

  const setNodeRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) nodes.current.set(id, el)
    else nodes.current.delete(id)
  }, [])

  const toggle = (id: string) => {
    if (!open.has(id)) track('timeline_expand', { id })
    setTouched((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const jumpToYear = (y: string) => {
    const target = entries.find((e) => e.yearText === y)
    const el = target ? nodes.current.get(target.id) : undefined
    if (!el) return
    el.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' })
    el.querySelector<HTMLElement>('[data-timeline-header]')?.focus({ preventScroll: true })
    setCurrentYear(y)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    if (!NAV_KEYS.has(event.key) || !railRef.current) return
    const from = (event.target as HTMLElement).closest<HTMLElement>('[data-timeline-header]')
    if (!from) return
    const headers = Array.from(railRef.current.querySelectorAll<HTMLElement>('[data-timeline-header]'))
    const i = headers.indexOf(from)
    if (i < 0) return
    const last = headers.length - 1
    const next =
      event.key === 'ArrowDown' ? Math.min(i + 1, last) : event.key === 'ArrowUp' ? Math.max(i - 1, 0) : event.key === 'Home' ? 0 : last
    event.preventDefault()
    headers[next]?.focus()
  }

  return (
    <div
      className={cx(
        scrubber && 'md:grid md:grid-cols-[6.5rem_minmax(0,1fr)] md:gap-x-8 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-x-12',
        className,
      )}
    >
      {scrubber && (
        <div className="hidden md:block">
          <YearScrubber years={years} current={currentYear} onSelect={jumpToYear} className="sticky top-24" />
        </div>
      )}

      <div ref={railRef} className="rail-timeline relative">
        {/* Rail track and the progress line that fills as the visitor scrolls past the nodes (a CSS view timeline). */}
        <div aria-hidden="true" className="absolute top-[18px] bottom-0 left-0 w-px bg-rule" />
        <div aria-hidden="true" className="rail-progress absolute top-[18px] bottom-0 left-0 w-px bg-accent" />
        <ol onKeyDown={onKeyDown} className="m-0 list-none p-0">
          {entries.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.id}
              delay={Math.min(i * 20, 60)}
              className={cx('relative', density === 'compact' ? 'pb-5 last:pb-0' : 'pb-8 last:pb-0 md:pb-10')}
            >
              <TimelineNode
                entry={entry}
                density={density}
                open={open.has(entry.id)}
                animate={touched.has(entry.id)}
                onToggle={toggle}
                nodeRef={setNodeRef}
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  )
}
