'use client'

import dynamic from 'next/dynamic'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { PITCH_SLUGS, hasPitch, type PitchItem } from './pitch-slugs'

/** The lightbox is code-split and mounted after the first open, so the layout pays nothing until a pitch is requested. */
const ReelDialog = dynamic(() => import('./reel-dialog').then((m) => m.ReelDialog), { ssr: false })

export type ReelContextValue = {
  /** Slug in the lightbox, null when closed. */
  slug: string | null
  /** Where the open request came from, forwarded to the video_play event. */
  location: string
  /** Pitches in profile.json order, limited to slugs with a video. */
  items: PitchItem[]
  open: (slug: string, location?: string) => void
  close: () => void
  next: () => void
  prev: () => void
  /** Element that opened the lightbox; focus returns to it on close. */
  openerRef: RefObject<HTMLElement | null>
}

function dispatch(name: string, detail: unknown) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(name, { detail }))
}

/**
 * Without a provider, open() still dispatches reel:open on window so a provider mounted
 * anywhere else in the tree (the layout) picks it up. The rest are no-ops.
 */
const NO_PROVIDER: ReelContextValue = {
  slug: null,
  location: 'unknown',
  items: PITCH_SLUGS.map((slug) => ({ slug, name: slug, outcome: '' })),
  open: (slug, location = 'unknown') => dispatch('reel:open', { slug, location }),
  close: () => {},
  next: () => {},
  prev: () => {},
  openerRef: { current: null },
}

const ReelContext = createContext<ReelContextValue>(NO_PROVIDER)

export function useReel(): ReelContextValue {
  return useContext(ReelContext)
}

/**
 * Mount once in the layout: <ReelProvider items={pitchItems()}>{children}</ReelProvider>.
 * pitchItems() is server-side (components/reel/pitch-reel.tsx) so profile.json stays out of the client bundle.
 * Listens for window CustomEvent "reel:open" (detail.slug, detail.location) and mirrors its state as "reel:state" (detail.open, detail.slug).
 */
export function ReelProvider({ items, children }: { items: PitchItem[]; children: ReactNode }) {
  const [state, setState] = useState<{ slug: string | null; location: string }>({ slug: null, location: 'reel' })
  const [dialogMounted, setDialogMounted] = useState(false)
  const openerRef = useRef<HTMLElement | null>(null)
  const ordered = useMemo(() => items.filter((it) => hasPitch(it.slug)), [items])

  const open = useCallback((slug: string, location = 'reel') => {
    if (!hasPitch(slug)) return
    const active = document.activeElement
    openerRef.current = active instanceof HTMLElement ? active : null
    setDialogMounted(true)
    setState({ slug, location })
  }, [])

  const close = useCallback(() => {
    setState((s) => (s.slug === null ? s : { ...s, slug: null }))
  }, [])

  const step = useCallback(
    (delta: 1 | -1) => {
      setState((s) => {
        if (s.slug === null || ordered.length === 0) return s
        const i = ordered.findIndex((it) => it.slug === s.slug)
        const n = (i + delta + ordered.length) % ordered.length
        return { ...s, slug: ordered[n].slug }
      })
    },
    [ordered],
  )
  const next = useCallback(() => step(1), [step])
  const prev = useCallback(() => step(-1), [step])

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<{ slug?: string; location?: string }>).detail
      if (d?.slug) open(d.slug, d.location)
    }
    window.addEventListener('reel:open', onOpen)
    return () => window.removeEventListener('reel:open', onOpen)
  }, [open])

  useEffect(() => {
    dispatch('reel:state', { open: state.slug !== null, slug: state.slug })
  }, [state.slug])

  const value = useMemo<ReelContextValue>(
    () => ({ slug: state.slug, location: state.location, items: ordered, open, close, next, prev, openerRef }),
    [state.slug, state.location, ordered, open, close, next, prev],
  )

  return (
    <ReelContext.Provider value={value}>
      {children}
      {dialogMounted ? <ReelDialog /> : null}
    </ReelContext.Provider>
  )
}
