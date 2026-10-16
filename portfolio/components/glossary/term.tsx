'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { track } from '@/lib/analytics'
import { cx } from '@/lib/cx'
import { TermPopover, type TermMode } from './term-popover'

/**
 * Inline glossary trigger: a <button> that reads as text with a dotted accent underline.
 * Rendered by <Prose>; the tip and source come from content/glossary.json through props,
 * so nothing from the glossary file ships to the client except the terms on the page.
 *
 * Opens on hover (120 ms) and keyboard focus with fine pointers, on tap on touch devices.
 * Closes on mouse leave (160 ms grace to reach the popover), blur, Escape, outside tap,
 * and when another term opens. Fires `term_open` once per term per page.
 */

export type TermProps = {
  /** Glossary id from lib/glossary.ts, for example "p95-latency". Sent with the term_open event. */
  id: string
  /** Display name for the popover header. */
  term: string
  /** One-sentence plain-English tip. */
  tip: string
  /** Optional "Read more" URL. */
  source?: string | null
  className?: string
  /** The matched text exactly as it appears in the sentence. */
  children: ReactNode
}

const OPEN_DELAY = 120
const CLOSE_GRACE = 160

/** Tiny event bus: the close function of the term that is open right now, if any. */
let current: (() => void) | null = null
/** term_open already sent for "<path>#<id>" during this page load. */
const reported = new Set<string>()

const BUTTON_CLASS = cx(
  // Reads as text. The ::before block extends the hit area to 44 px without touching the line box,
  // and the focus ring stays on the word because outlines ignore pseudo-elements.
  'relative inline-block cursor-help appearance-none border-0 bg-transparent p-0 text-left align-baseline',
  'before:absolute before:inset-x-0 before:-inset-y-3 before:content-[""]',
  'underline decoration-accent/60 decoration-dotted decoration-1 underline-offset-[0.2em]',
  'hover:decoration-accent aria-expanded:decoration-accent print:no-underline',
)

export function Term({ id, term, tip, source = null, className, children }: TermProps) {
  const popoverId = useId()
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const popoverRef = useRef<HTMLSpanElement | null>(null)
  const openTimer = useRef<number | undefined>(undefined)
  const closeTimer = useRef<number | undefined>(undefined)
  const pointerInPopover = useRef(false)
  const [mode, setMode] = useState<TermMode | null>(null)

  const close = useCallback(() => {
    window.clearTimeout(openTimer.current)
    window.clearTimeout(closeTimer.current)
    setMode(null)
    if (current === close) current = null
  }, [])

  const open = useCallback(
    (next: TermMode) => {
      window.clearTimeout(openTimer.current)
      window.clearTimeout(closeTimer.current)
      if (current && current !== close) current()
      current = close
      setMode(next)
      const key = `${window.location.pathname}#${id}`
      if (!reported.has(key)) {
        reported.add(key)
        track('term_open', { term: id })
      }
    },
    [close, id],
  )

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(close, CLOSE_GRACE)
  }, [close])

  const cancelClose = useCallback(() => window.clearTimeout(closeTimer.current), [])

  // Escape and outside tap, only while open.
  useEffect(() => {
    if (!mode) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const focusInside = popoverRef.current?.contains(document.activeElement) ?? false
      close()
      if (focusInside) buttonRef.current?.focus({ preventScroll: true })
    }
    const onDown = (e: Event) => {
      const target = e.target as Node | null
      if (target && (buttonRef.current?.contains(target) || popoverRef.current?.contains(target))) return
      close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown, true)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown, true)
    }
  }, [mode, close])

  useEffect(
    () => () => {
      window.clearTimeout(openTimer.current)
      window.clearTimeout(closeTimer.current)
      if (current === close) current = null
    },
    [close],
  )

  const onPointerEnter = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return
    cancelClose()
    if (mode) return
    openTimer.current = window.setTimeout(() => open('hover'), OPEN_DELAY)
  }

  const onPointerLeave = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return
    window.clearTimeout(openTimer.current)
    if (mode === 'hover') scheduleClose()
  }

  const onClick = () => {
    if (mode === 'tap') close()
    else open('tap')
  }

  const onFocus = (e: FocusEvent<HTMLButtonElement>) => {
    let keyboard = true
    try {
      keyboard = e.currentTarget.matches(':focus-visible')
    } catch {
      // Older engines without :focus-visible: treat every focus as keyboard focus.
    }
    if (keyboard && !mode) open('hover')
  }

  // Shared by the button and the popover: keep open while focus stays inside either.
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (pointerInPopover.current) return
    const next = e.relatedTarget as Node | null
    if (next && (popoverRef.current?.contains(next) || buttonRef.current?.contains(next))) return
    close()
  }

  const onPopoverPointerDown = () => {
    // A click inside the popover blurs the button; remember it for the blur that follows.
    pointerInPopover.current = true
    window.setTimeout(() => {
      pointerInPopover.current = false
    }, 0)
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        data-term={id}
        aria-describedby={popoverId}
        aria-expanded={mode !== null}
        className={cx(BUTTON_CLASS, className)}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </button>
      <TermPopover
        id={popoverId}
        term={term}
        tip={tip}
        source={source}
        mode={mode}
        popoverRef={popoverRef}
        anchorRef={buttonRef}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') cancelClose()
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== 'touch' && mode === 'hover') scheduleClose()
        }}
        onPointerDown={onPopoverPointerDown}
        onBlur={onBlur}
      />
    </>
  )
}
