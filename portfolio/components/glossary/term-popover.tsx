'use client'

import { useEffect, useLayoutEffect, useState, type FocusEvent, type PointerEvent, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight } from '@phosphor-icons/react'

/**
 * The glossary popover panel. Owned by <Term>, which holds the open state and the
 * pointer, focus and keyboard logic; this component only shows, hides and places it.
 *
 * - Uses the native `popover="manual"` attribute and showPopover() where supported, so
 *   the panel sits in the top layer and escapes overflow and content-visibility clipping.
 *   In the top layer it is positioned `absolute` against the initial containing block
 *   (document coordinates), so it scrolls with the text it belongs to.
 * - Browsers without popover support get the same element portaled to <body> with
 *   `position: fixed` and viewport coordinates.
 * - Placement: below the trigger when it fits, else above, clamped to the viewport with
 *   12 px margins; recomputed on open and on resize.
 * - role="tooltip" when opened by hover or focus, role="dialog" (with aria-label) when
 *   opened by tap or click, so screen readers can reach the "Read more" link.
 */

export type TermMode = 'hover' | 'tap'

export type TermPopoverProps = {
  id: string
  term: string
  tip: string
  source: string | null
  /** null when closed. */
  mode: TermMode | null
  popoverRef: RefObject<HTMLSpanElement | null>
  anchorRef: RefObject<HTMLButtonElement | null>
  onPointerEnter: (e: PointerEvent<HTMLElement>) => void
  onPointerLeave: (e: PointerEvent<HTMLElement>) => void
  onPointerDown: (e: PointerEvent<HTMLElement>) => void
  onBlur: (e: FocusEvent<HTMLElement>) => void
}

const MARGIN = 12
const GAP = 8

const supportsPopover = typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]

export function TermPopover({
  id,
  term,
  tip,
  source,
  mode,
  popoverRef,
  anchorRef,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onBlur,
}: TermPopoverProps) {
  // Only browsers without the popover attribute need the body portal; decided after mount
  // so the server and the first client render agree.
  const [portal, setPortal] = useState(false)
  useEffect(() => {
    if (!supportsPopover) setPortal(true)
  }, [])

  useLayoutEffect(() => {
    const el = popoverRef.current
    const anchor = anchorRef.current
    if (!el || !anchor) return

    if (!mode) {
      if (supportsPopover && el.matches(':popover-open')) el.hidePopover()
      return
    }
    if (supportsPopover && !el.matches(':popover-open')) {
      try {
        el.showPopover()
      } catch {
        // Not connected yet or already shown: the position below still applies.
      }
    }

    const place = () => {
      const a = anchor.getBoundingClientRect()
      const vw = document.documentElement.clientWidth
      const vh = window.innerHeight
      const w = el.offsetWidth
      const h = el.offsetHeight

      const left = Math.max(MARGIN, Math.min(a.left + a.width / 2 - w / 2, vw - MARGIN - w))
      const below = a.bottom + GAP
      const above = a.top - GAP - h
      const fitsBelow = below + h + MARGIN <= vh
      const fitsAbove = above >= MARGIN
      const placement: 'below' | 'above' = fitsBelow || !fitsAbove ? 'below' : 'above'
      const top = placement === 'above' ? above : fitsBelow ? below : Math.max(MARGIN, Math.min(below, vh - MARGIN - h))

      el.style.position = supportsPopover ? 'absolute' : 'fixed'
      el.style.left = `${Math.round(supportsPopover ? left + window.scrollX : left)}px`
      el.style.top = `${Math.round(supportsPopover ? top + window.scrollY : top)}px`
      el.dataset.placement = placement
    }

    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [mode, popoverRef, anchorRef])

  // Everything inside is a <span> so the popover stays valid phrasing content inside <p> and <li>.
  const node = (
    <span
      ref={popoverRef}
      id={id}
      popover="manual"
      role={mode === 'tap' ? 'dialog' : 'tooltip'}
      aria-label={mode === 'tap' ? term : undefined}
      hidden={!mode}
      data-term-popover=""
      className="panel glow inset-auto z-50 m-0 w-max max-w-[min(320px,calc(100vw_-_24px))] overflow-visible px-4 py-3 text-left font-sans text-base font-normal tracking-normal whitespace-normal normal-case text-ink print:hidden"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onBlur={onBlur}
    >
      <span className="block text-sm leading-5 font-medium text-ink-2">{term}</span>
      <span className="mt-1 block text-[0.9375rem] leading-[1.45] text-ink">{tip}</span>
      {source ? (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 -mb-2 inline-flex min-h-11 items-center gap-1 text-[0.8125rem] text-accent underline-offset-4 hover:underline"
        >
          <span>
            Read more<span className="sr-only"> about {term}</span> on {host(source)}
          </span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ) : null}
    </span>
  )

  return portal ? createPortal(node, document.body) : node
}
