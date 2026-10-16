'use client'

import { track as vercelTrack } from '@vercel/analytics'

export type EventProps = Record<string, string | number | boolean>

/**
 * One entry point for product events (CTA clicks, video plays, instrument use).
 * Vercel Analytics receives every event; Plausible or Umami receive it too when their
 * script is present (see components/site/analytics.tsx). Never throws, never blocks.
 */
export function track(name: string, props: EventProps = {}): void {
  try {
    vercelTrack(name, props)
  } catch {
    // Analytics must never break the page.
  }
  if (typeof window === 'undefined') return
  const w = window as Window & {
    plausible?: (event: string, options?: { props?: EventProps }) => void
    umami?: { track?: (event: string, data?: EventProps) => void }
  }
  try {
    w.plausible?.(name, { props })
    w.umami?.track?.(name, props)
  } catch {
    // Same: a third-party failure is not ours to surface.
  }
}
