'use client'

import { useEffect, useId, useLayoutEffect, useRef, type RefObject } from 'react'
import { motion, useAnimate } from 'motion/react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { CredentialCard, type WalletCredential } from './credential-card'

const FAN_MS = 0.24
const STAGGER_MS = 0.03
/** Cards past this many share the last delay so a 31 card rail settles within half a second. */
const STAGGER_CAP = 8
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1]

/**
 * The fanned-out group: a labelled, keyboard reachable snap rail of cards. On mount each card
 * that will be on screen starts at the pass stack's centre and translates to its place in the
 * rail (transform and opacity only). Reduced motion renders the rail in place.
 */
export function CredentialRail({
  id,
  label,
  credentials,
  stackRef,
  reduced,
  onView,
}: {
  id: string
  label: string
  credentials: WalletCredential[]
  stackRef: RefObject<HTMLUListElement | null>
  reduced: boolean
  onView: (credential: WalletCredential) => void
}) {
  const [scope, animate] = useAnimate()
  const regionRef = useRef<HTMLDivElement>(null)
  const labelId = useId()

  useLayoutEffect(() => {
    // useReducedMotion reads the setting at mount; the direct query also covers a change made since.
    if (reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const list = scope.current as HTMLElement | null
    if (!list) return
    const cards = Array.from(list.querySelectorAll<HTMLElement>('[data-card]'))
    const reset = () => {
      for (const card of cards) {
        card.style.transform = ''
        card.style.opacity = ''
      }
    }
    // A re-run (StrictMode, Fast Refresh) must measure the cards in their resting place.
    reset()
    const stack = stackRef.current?.getBoundingClientRect()
    const limit = window.innerWidth + 320
    const controls = cards.flatMap((card, i) => {
      const rect = card.getBoundingClientRect()
      if (rect.left > limit) return []
      const dx = stack ? stack.left + stack.width / 2 - (rect.left + rect.width / 2) : 0
      const dy = stack ? stack.top + stack.height / 2 - (rect.top + rect.height / 2) : -24
      // Inline start values first so the first painted frame already sits at the stack.
      card.style.opacity = '0'
      card.style.transform = `translate(${dx}px, ${dy}px) scale(0.9)`
      return [
        animate(
          card,
          { x: [dx, 0], y: [dy, 0], scale: [0.9, 1], opacity: [0, 1] },
          { duration: FAN_MS, delay: Math.min(i, STAGGER_CAP) * STAGGER_MS, ease: EASE_OUT_QUART },
        ),
      ]
    })
    return () => {
      for (const c of controls) c.stop()
      reset()
    }
  }, [animate, reduced, scope, stackRef])

  // Bring the rail into view when it opens below the fold (no-op when already visible).
  useEffect(() => {
    regionRef.current?.scrollIntoView({ block: 'nearest' })
  }, [])

  const page = (direction: 1 | -1) => {
    const el = regionRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' })
  }

  const nav =
    'press grid size-11 place-items-center rounded-full border border-rule text-ink-2 transition-colors hover:border-rule-strong hover:text-ink'

  return (
    <motion.div
      id={id}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.16 }}
      className="mt-5 md:mt-6"
    >
      <div className="flex items-center justify-between gap-4">
        <p id={labelId} className="text-sm text-ink-2">
          {label}
        </p>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => page(-1)} aria-label="Scroll back" className={nav}>
            <CaretLeft size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => page(1)} aria-label="Scroll forward" className={nav}>
            <CaretRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={regionRef}
        role="region"
        aria-labelledby={labelId}
        tabIndex={0}
        className="-mx-4 mt-3 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-px-4 pb-2 [scrollbar-width:thin] md:mx-0 md:scroll-px-0"
      >
        {/* Trailing padding of a flex row is dropped from the scrollable overflow, so a 4 px spacer after the 12 px gap gives the last card the same 16 px edge as the first. */}
        <ul ref={scope} className="flex gap-3 ps-4 after:block after:w-1 after:shrink-0 after:content-[''] md:ps-0 md:after:hidden">
          {credentials.map((credential) => (
            <CredentialCard key={credential.id} credential={credential} onView={onView} />
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
