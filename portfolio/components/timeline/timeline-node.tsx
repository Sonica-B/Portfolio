'use client'

import { useId } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, CaretDown } from '@phosphor-icons/react'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'
import type { TimelineEntry, TimelineProps } from './timeline'

type Props = {
  entry: TimelineEntry
  density: NonNullable<TimelineProps['density']>
  open: boolean
  reduced: boolean
  onToggle: (id: string) => void
  nodeRef: (id: string, el: HTMLElement | null) => void
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Fallback for the signal token until the theme defines --color-signal (spec value, magenta). */
const SIGNAL_FALLBACK = 'var(--color-signal, oklch(0.72 0.2 340))'

/** One node on the rail: marker, logo, title, org, dates, tags and a disclosure for the detail. */
export function TimelineNode({ entry, density, open, reduced, onToggle, nodeRef }: Props) {
  const uid = useId()
  const headerId = `${uid}-header`
  const panelId = `${uid}-panel`
  const compact = density === 'compact'
  const metrics = !compact && entry.metrics && entry.metrics.length > 0 ? entry.metrics : null
  const expandable = entry.lines.length > 0 || metrics !== null || Boolean(entry.href)
  const logoName = entry.logoName ?? entry.org

  const headerClass = cn('group flex w-full min-h-11 items-start gap-4 rounded-md py-2 text-left', expandable && 'cursor-pointer')

  const header = (
    <>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-5">
          <span className="text-metric text-ink-2">{entry.dateText}</span>
          {entry.tags?.map((tag) => (
            <span key={tag} className="rounded-sm border border-rule px-1.5 font-mono text-xs leading-5 text-ink-2">
              {tag}
            </span>
          ))}
        </span>
        <span
          className={cn(
            'mt-1 block leading-snug text-ink transition-colors duration-200',
            expandable && 'group-hover:text-accent',
            compact ? 'font-medium' : 'font-display text-[1.15rem] font-semibold tracking-[-0.01em]',
          )}
        >
          {entry.title}
        </span>
        {entry.org && (
          <span className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-ink-2">
            <Logo name={logoName} height={18} />
            <span>{entry.org}</span>
          </span>
        )}
      </span>
      {expandable && (
        <CaretDown
          size={18}
          aria-hidden="true"
          className={cn('mt-3 shrink-0 text-ink-2 transition-transform duration-300', open && 'rotate-180')}
        />
      )}
    </>
  )

  return (
    <div ref={(el) => nodeRef(entry.id, el)} data-timeline-id={entry.id} className="relative pl-7 md:pl-10">
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-[11px] left-0 size-3.5 -translate-x-1/2 rounded-full border-2 border-current bg-surface',
          entry.signal ? 'text-signal' : entry.ongoing ? 'text-accent' : 'text-rule-strong',
        )}
        style={entry.signal ? { color: SIGNAL_FALLBACK } : undefined}
      />

      <h3 className="m-0 font-sans text-base font-normal text-pretty">
        {expandable ? (
          <button
            type="button"
            id={headerId}
            data-timeline-header=""
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => onToggle(entry.id)}
            className={headerClass}
          >
            {header}
          </button>
        ) : (
          <span id={headerId} className={headerClass}>
            {header}
          </span>
        )}
      </h3>

      {expandable && (
        <div id={panelId} hidden={!open} className="pb-1">
          <motion.div
            initial={false}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            transition={reduced ? { duration: 0 } : { duration: 0.28, ease: EASE }}
            className="max-w-[68ch] pt-1"
          >
            {compact ? (
              <p className="text-ink-2">{entry.lines.join(' ')}</p>
            ) : (
              <ul className="m-0 list-none space-y-2.5 p-0 text-ink-2">
                {entry.lines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}

            {metrics && (
              <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {metrics.map((m) => (
                  <div key={m.label} className="min-w-0">
                    <dt className="text-sm text-ink-2">{m.label}</dt>
                    <dd className="text-metric mt-0.5 text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {entry.href && (
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {entry.org}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
