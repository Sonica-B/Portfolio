'use client'

import { useEffect, useState, type ComponentType } from 'react'
import { afterPaintIdle } from '@/lib/idle'

type Loaded = { Analytics: ComponentType; SpeedInsights: ComponentType }

/**
 * Vercel Analytics and Speed Insights, imported and mounted once the first paint is on screen and
 * the page is idle, so neither their components nor their script requests queue in front of the
 * first render. The page view is still recorded, and Speed Insights reads the buffered paint and
 * layout-shift entries.
 */
export function DeferredAnalytics() {
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  useEffect(
    () =>
      afterPaintIdle(() => {
        Promise.all([import('@vercel/analytics/next'), import('@vercel/speed-insights/next')]).then(
          ([a, s]) => setLoaded({ Analytics: a.Analytics, SpeedInsights: s.SpeedInsights }),
          () => {
            // Analytics must never break the page.
          },
        )
      }, 3000),
    [],
  )
  if (!loaded) return null
  const { Analytics, SpeedInsights } = loaded
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
