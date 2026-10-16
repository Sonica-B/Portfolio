'use client'

import { useEffect, useState } from 'react'
import { afterPaintIdle } from '@/lib/idle'

// Film grain at 4 percent (--grain-opacity) over everything. Fixed and pointer-events-none so it never repaints on scroll.
// The 64 px body grid lives in globals.css (body::before) underneath; no scanline layer, it would read in screenshots.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"

/**
 * Mounted once the first paint is on screen: the full-screen overlay blend is the most expensive
 * layer of the first frame (about 85 ms of raster on a software GPU), and at 4 percent opacity it
 * adds nothing a visitor can read in that first frame.
 */
export function Grain() {
  const [on, setOn] = useState(false)
  useEffect(() => afterPaintIdle(() => setOn(true), 2000), [])
  if (!on) return null
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay"
      style={{ backgroundImage: NOISE, opacity: 'var(--grain-opacity)' }}
    />
  )
}
