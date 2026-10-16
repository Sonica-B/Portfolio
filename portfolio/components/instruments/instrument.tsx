'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useReducedMotion } from 'motion/react'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import type { Metric, Project } from '@/lib/content'

/**
 * Shared shell for every project instrument (small interactive demo).
 *
 * Contract (see docs/superpowers/agent-brief-v2.md):
 *   <Instrument title status slug className? minHeight? onFirstInteraction?>{children}</Instrument>
 *
 * - Renders a `panel hud-frame` shell with a mono title top left, the children, and a
 *   `text-status` line underneath. Fallback utilities are included so the shell still
 *   reads correctly before the theme agent defines those utilities.
 * - Children mount only once the panel enters the viewport (IntersectionObserver with a
 *   200 px root margin). Before that a placeholder of `minHeight` keeps the layout stable.
 * - `useInstrument()` gives children `{ reduced, interact }`. `reduced` mirrors
 *   `useReducedMotion()` from motion. `interact()` fires one `instrument_use` analytics
 *   event per mounted instrument, then becomes a no-op.
 */

export type InstrumentContextValue = {
  /** True when the visitor prefers reduced motion. Skip non-essential animation. */
  reduced: boolean
  /** Call on the first real interaction (drag, key press, toggle). Fires analytics once. */
  interact: () => void
}

const InstrumentContext = createContext<InstrumentContextValue>({
  reduced: false,
  interact: () => {},
})

export function useInstrument(): InstrumentContextValue {
  return useContext(InstrumentContext)
}

export type InstrumentProps = {
  /** Short instrument name, rendered in mono at the top left. */
  title: string
  /** Mono status line under the instrument. Pass the live value here when it changes. */
  status: string
  /** Project slug, sent with the `instrument_use` event. */
  slug: string
  className?: string
  /** Placeholder height in px before the instrument mounts. Defaults to 320. */
  minHeight?: number
  /** Optional callback alongside the analytics event. */
  onFirstInteraction?: () => void
  children: ReactNode
}

export function Instrument({
  title,
  status,
  slug,
  className,
  minHeight = 320,
  onFirstInteraction,
  children,
}: InstrumentProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const fired = useRef(false)
  const titleId = useId()
  const prefersReduced = useReducedMotion()
  const reduced = prefersReduced === true

  useEffect(() => {
    const el = shellRef.current
    if (!el || mounted) return
    if (typeof IntersectionObserver === 'undefined') {
      setMounted(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted])

  const interact = useCallback(() => {
    if (fired.current) return
    fired.current = true
    track('instrument_use', { slug })
    onFirstInteraction?.()
  }, [slug, onFirstInteraction])

  const value = useMemo<InstrumentContextValue>(() => ({ reduced, interact }), [reduced, interact])

  return (
    <div
      ref={shellRef}
      role="group"
      aria-labelledby={titleId}
      data-instrument={slug}
      className={cn(
        'panel hud-frame relative flex flex-col overflow-hidden rounded-[12px] border border-rule bg-surface-raised',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-3 sm:px-5">
        <p id={titleId} className="font-mono text-[13px] uppercase leading-5 tracking-[0.08em] text-ink-2">
          {title}
        </p>
      </div>
      <div className="relative px-4 py-3 sm:px-5" style={mounted ? undefined : { minHeight }}>
        {mounted ? (
          <InstrumentContext.Provider value={value}>{children}</InstrumentContext.Provider>
        ) : (
          <div aria-hidden="true" style={{ minHeight: Math.max(0, minHeight - 24) }} />
        )}
      </div>
      <p
        className="text-status hairline px-4 py-2.5 font-mono text-[13px] leading-5 text-ink-2 sm:px-5"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* The rule spans the panel; the text keeps a 75-character measure on wide screens. */}
        <span className="block max-w-[75ch]">{status}</span>
      </p>
    </div>
  )
}

/** First metric whose label matches, so instruments never hardcode a number. */
export function findMetric(project: Project, pattern: RegExp): Metric | undefined {
  return project.metrics.find((metric) => pattern.test(metric.label))
}

export type SegmentedOption = { id: string; label: string }

/**
 * Pill segmented control with radio semantics: arrow keys move the selection,
 * Home and End jump, every target is at least 44 px tall.
 */
export function Segmented({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string
  options: SegmentedOption[]
  value: string
  onChange: (id: string) => void
  className?: string
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = options.findIndex((option) => option.id === value)
    let next = -1
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % options.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + options.length) % options.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = options.length - 1
    if (next < 0 || !options[next]) return
    event.preventDefault()
    onChange(options[next].id)
    buttons.current[next]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn('flex max-w-full flex-wrap gap-2', className)}
    >
      {options.map((option, index) => {
        const checked = option.id === value
        return (
          <button
            key={option.id}
            ref={(el) => {
              buttons.current[index] = el
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(option.id)}
            className={cn(
              'press min-h-11 whitespace-nowrap rounded-full border px-4 text-base leading-none',
              checked
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-rule bg-surface text-ink-2 hover:border-rule-strong hover:text-ink',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default Instrument
