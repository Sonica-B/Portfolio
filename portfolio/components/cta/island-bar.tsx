'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { usePathname } from 'next/navigation'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { CalendarBlank, DownloadSimple, MagnifyingGlass, X } from '@/components/ui/icons'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { track } from '@/lib/analytics'
import { CopyEmail, useEmailCopyEvent } from './copy-email'
import type { EmailParts } from './email'

const DISMISS_KEY = 'island:dismissed'
const FALLBACK_OFFSET = 600
/** The island returns this long after the last scroll event. */
const SETTLE_MS = 600
/** Enter and exit: opacity and a 12 px rise, 280 ms (the CSS transition below). */
const EXIT_MS = 280
const item =
  'press inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-ink transition-colors hover:bg-surface'

type Props = { resumeHref: string; callHref: string; email: EmailParts }

/**
 * Floating quick actions after the hero: progress ring, Resume, Email, Call, Search, dismiss.
 * Loaded after the first paint by island-loader.tsx. Only motion's scroll values are used here;
 * the enter and exit fade is a CSS transition (with @starting-style for the entry) so the motion
 * component runtime stays out of every page.
 */
export function IslandBar({ resumeHref, callHref, email }: Props) {
  const pathname = usePathname()
  const reduce = useReducedMotion() === true
  const { scrollY, scrollYProgress } = useScroll()
  const ring = useRef<SVGCircleElement>(null)
  const [past, setPast] = useState(false)
  const [dismissed, setDismissed] = useState(true)
  const [overlays, setOverlays] = useState<Record<string, boolean>>({})
  const [scrollingDown, setScrollingDown] = useState(false)
  const hasSentinel = useRef(false)
  const toolbar = useRef<HTMLDivElement>(null)
  const settle = useRef(0)
  useEmailCopyEvent(email)
  useEffect(() => () => window.clearTimeout(settle.current), [])

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1')
    } catch {
      setDismissed(false)
    }
  }, [])

  // While the island is enabled, <html data-island> gives the footer room under its last line (globals.css).
  useEffect(() => {
    const root = document.documentElement
    if (dismissed) root.removeAttribute('data-island')
    else root.setAttribute('data-island', '')
    return () => root.removeAttribute('data-island')
  }, [dismissed])

  // The home hero renders [data-hero-end]; elsewhere the island appears after 600 px.
  // The root is extended far below the viewport, so the zero-height sentinel counts as
  // intersecting until it passes the top edge; an instant jump past it still fires.
  useEffect(() => {
    const sentinel = document.querySelector('[data-hero-end]')
    hasSentinel.current = Boolean(sentinel)
    if (!sentinel) {
      setPast(window.scrollY > FALLBACK_OFFSET)
      return
    }
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting), { rootMargin: '0px 0px 100000px 0px' })
    io.observe(sentinel)
    return () => io.disconnect()
  }, [pathname])

  // Out of the way while the visitor reads down the page; back on scroll up or once scrolling
  // settles. It stays put while it holds keyboard focus so focus is never dropped.
  useMotionValueEvent(scrollY, 'change', (y) => {
    if (!hasSentinel.current) setPast(y > FALLBACK_OFFSET)
    const delta = y - (scrollY.getPrevious() ?? y)
    if (delta > 0 && !toolbar.current?.contains(document.activeElement)) setScrollingDown(true)
    else if (delta < 0) setScrollingDown(false)
    window.clearTimeout(settle.current)
    settle.current = window.setTimeout(() => setScrollingDown(false), SETTLE_MS)
  })

  // Hidden while the command palette or the pitch lightbox is open.
  useEffect(() => {
    const onState = (e: Event) => {
      const open = Boolean((e as CustomEvent<{ open?: boolean }>).detail?.open)
      setOverlays((s) => ({ ...s, [e.type]: open }))
    }
    window.addEventListener('palette:state', onState)
    window.addEventListener('reel:state', onState)
    return () => {
      window.removeEventListener('palette:state', onState)
      window.removeEventListener('reel:state', onState)
    }
  }, [])

  const dismiss = () => {
    track('cta_click', { id: 'dismiss', location: 'island' })
    // The button is about to unmount: hand focus to the main landmark rather than letting it fall to body.
    const main = document.getElementById('main')
    if (main && toolbar.current?.contains(document.activeElement)) {
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1')
      main.focus({ preventScroll: true })
    }
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // Storage blocked: hidden for this page view only.
    }
  }
  const openSearch = () => {
    track('cta_click', { id: 'search', location: 'island' })
    window.dispatchEvent(new CustomEvent('palette:open'))
  }
  // Arrow keys move focus along the toolbar.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a, button'))
    const i = items.indexOf(document.activeElement as HTMLElement)
    if (i < 0) return
    e.preventDefault()
    items[(i + (e.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length]?.focus()
  }

  const visible = past && !dismissed && !scrollingDown && !Object.values(overlays).some(Boolean)

  // Stays in the DOM through the exit fade, then unmounts (what AnimatePresence did before).
  const [present, setPresent] = useState(visible)
  useEffect(() => {
    if (visible) {
      setPresent(true)
      return
    }
    if (reduce) {
      setPresent(false)
      return
    }
    const t = window.setTimeout(() => setPresent(false), EXIT_MS)
    return () => window.clearTimeout(t)
  }, [visible, reduce])

  // Progress ring: pathLength 1, so the dash offset is the share of the page still below.
  const paintRing = useCallback((v: number) => {
    ring.current?.style.setProperty('stroke-dashoffset', String(1 - Math.min(1, Math.max(0, v))))
  }, [])
  useMotionValueEvent(scrollYProgress, 'change', paintRing)
  useEffect(() => {
    if (present) paintRing(scrollYProgress.get())
  }, [present, scrollYProgress, paintRing])

  if (!present) return null
  return (
    <div
      data-open={visible}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[opacity,translate] duration-[280ms] ease-[cubic-bezier(0.25,1,0.5,1)] data-[open=false]:translate-y-3 data-[open=false]:opacity-0 starting:translate-y-3 starting:opacity-0 motion-reduce:transition-none md:justify-end md:px-6 md:pb-6"
    >
      <div
        ref={toolbar}
        role="toolbar"
        aria-label="Quick actions"
        onKeyDown={onKeyDown}
        className="panel pointer-events-auto relative flex items-center gap-1 rounded-xl border border-rule bg-surface-raised/95 p-1.5 backdrop-blur-md"
      >
        <span aria-hidden="true" className="mx-1 inline-flex h-7 w-7 shrink-0 items-center justify-center">
          <svg viewBox="0 0 28 28" className="h-7 w-7 -rotate-90">
            <circle cx="14" cy="14" r="12" className="fill-none stroke-rule" strokeWidth="2" />
            <circle
              ref={ring}
              cx="14"
              cy="14"
              r="12"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1}
              className="fill-none stroke-accent"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <a href={resumeHref} download onClick={() => track('cta_click', { id: 'resume', location: 'island' })} className={item}>
          <DownloadSimple size={18} aria-hidden="true" />
          <span className="sr-only md:not-sr-only">Resume</span>
        </a>
        <CopyEmail parts={email} location="island" compact />
        <a href={callHref} target="_blank" rel="noopener noreferrer" onClick={() => track('cta_click', { id: 'call', location: 'island' })} className={item}>
          <CalendarBlank size={18} aria-hidden="true" />
          <span className="sr-only md:not-sr-only">Call</span>
        </a>
        <button type="button" onClick={openSearch} className={item}>
          <MagnifyingGlass size={18} aria-hidden="true" />
          <span className="sr-only md:not-sr-only">Search</span>
        </button>
        <button type="button" onClick={dismiss} aria-label="Hide quick actions" className={item}>
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
