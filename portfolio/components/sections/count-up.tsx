'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/** "5.6", "8,792": en-US grouping with a fixed number of decimals, identical on the server and the client. */
export function formatCount(value: number, decimals = 0): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

/** CSS cubic-bezier(x1, y1, x2, y2) as a function of progress, solved for x by Newton steps with a bisection fallback. */
function cubicBezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  return (x) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < 6; i++) {
      const err = sampleX(t) - x
      const d = slopeX(t)
      if (Math.abs(err) < 1e-5) return sampleY(t)
      if (Math.abs(d) < 1e-6) break
      t -= err / d
    }
    let lo = 0, hi = 1
    t = x
    for (let i = 0; i < 20; i++) {
      const v = sampleX(t)
      if (Math.abs(v - x) < 1e-5) break
      if (v < x) lo = t
      else hi = t
      t = (lo + hi) / 2
    }
    return sampleY(t)
  }
}

/** The site's ease-out-expo (globals.css --ease-out-expo). */
const EASE = cubicBezier(0.16, 1, 0.3, 1)

/**
 * Server-renders the real number, then counts up from zero the first time half of it scrolls into
 * view. Reduced motion, or no JavaScript, keeps the static value. `decimals` fixes the fraction
 * digits so a figure such as 5.6 keeps its shape while it moves. A plain requestAnimationFrame
 * loop, so the motion library stays out of the page.
 */
export function CountUp({
  value,
  decimals = 0,
  duration = 1.6,
  className,
}: {
  value: number
  decimals?: number
  /** Seconds. */
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const [armed, setArmed] = useState(false)
  const [current, setCurrent] = useState<number | null>(null)

  // Arm after hydration, and only when motion is allowed, so the static HTML and reduced-motion visitors keep the value.
  useEffect(() => {
    if (reduced === false) setArmed(true)
  }, [reduced])

  useEffect(() => {
    const el = ref.current
    if (!armed || !el) return
    let raf = 0
    const run = () => {
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000))
        setCurrent(t >= 1 ? value : value * EASE(t))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          run()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [armed, value, duration])

  const shown = current ?? (armed ? 0 : value)
  return (
    <span ref={ref} className={className}>
      {formatCount(shown, decimals)}
    </span>
  )
}
