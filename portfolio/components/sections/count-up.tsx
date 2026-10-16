'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/** "5.6", "8,792": en-US grouping with a fixed number of decimals, identical on the server and the client. */
export function formatCount(value: number, decimals = 0): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

/**
 * Server-renders the real number, then counts up from zero the first time it scrolls into view.
 * Reduced motion, or no JavaScript, keeps the static value. `decimals` fixes the fraction digits
 * so a figure such as 5.6 keeps its shape while it moves.
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
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const [armed, setArmed] = useState(false)
  const [current, setCurrent] = useState<number | null>(null)

  // Arm after hydration, and only when motion is allowed, so the static HTML and reduced-motion visitors keep the value.
  useEffect(() => {
    if (reduced === false) setArmed(true)
  }, [reduced])

  useEffect(() => {
    if (!armed || !inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCurrent(v),
      onComplete: () => setCurrent(value),
    })
    return () => controls.stop()
  }, [armed, inView, value, duration])

  const shown = current ?? (armed ? 0 : value)
  return (
    <span ref={ref} className={className}>
      {formatCount(shown, decimals)}
    </span>
  )
}
