'use client'

import { useEffect, useState, type ComponentType } from 'react'
import { afterPaintIdle } from '@/lib/idle'
import type { EmailParts } from './email'

type Props = { resumeHref: string; callHref: string; email: EmailParts }

/**
 * The scroll island only shows after the visitor scrolls past the hero, so its code (and motion's
 * scroll values) loads once the first paint is on screen and the page is idle. Nothing renders
 * before that, so there is no layout to hold.
 */
export function IslandLoader(props: Props) {
  const [Bar, setBar] = useState<ComponentType<Props> | null>(null)
  useEffect(
    () =>
      afterPaintIdle(() => {
        import('./island-bar').then(
          (mod) => setBar(() => mod.IslandBar),
          () => {
            // A failed chunk load leaves the page without the island; every action is also in the nav and hero.
          },
        )
      }, 3000),
    [],
  )
  return Bar ? <Bar {...props} /> : null
}
