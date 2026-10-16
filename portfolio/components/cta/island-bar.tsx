'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { CalendarBlank, DownloadSimple, MagnifyingGlass, X } from '@phosphor-icons/react'
import { track } from '@/lib/analytics'
import { CopyEmail, useEmailCopyEvent } from './copy-email'
import type { EmailParts } from './email'

const DISMISS_KEY = 'island:dismissed'
const FALLBACK_OFFSET = 600
const item =
  'press inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-ink transition-colors hover:bg-surface'

type Props = { resumeHref: string; callHref: string; email: EmailParts }

/** Floating quick actions after the hero: progress ring, Resume, Email, Call, Search, dismiss. */
export function IslandBar({ resumeHref, callHref, email }: Props) {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const [past, setPast] = useState(false)
  const [dismissed, setDismissed] = useState(true)
  const [overlays, setOverlays] = useState<Record<string, boolean>>({})
  const hasSentinel = useRef(false)
  useEmailCopyEvent(email)

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1')
    } catch {
      setDismissed(false)
    }
  }, [])

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

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (!hasSentinel.current) setPast(y > FALLBACK_OFFSET)
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

  const visible = past && !dismissed && !Object.values(overlays).some(Boolean)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: [0.25, 1, 0.5, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:justify-end md:px-6 md:pb-6"
        >
          <div
            role="toolbar"
            aria-label="Quick actions"
            onKeyDown={onKeyDown}
            className="panel pointer-events-auto flex items-center gap-1 rounded-xl border border-rule bg-surface-raised/95 p-1.5 backdrop-blur-md"
          >
            <span aria-hidden="true" className="mx-1 inline-flex h-7 w-7 shrink-0 items-center justify-center">
              <svg viewBox="0 0 28 28" className="h-7 w-7 -rotate-90">
                <circle cx="14" cy="14" r="12" className="fill-none stroke-rule" strokeWidth="2" />
                <motion.circle cx="14" cy="14" r="12" className="fill-none stroke-accent" strokeWidth="2" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
