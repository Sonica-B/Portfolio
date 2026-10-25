'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { AnimatedNumber } from '@/components/motion-primitives/animated-number'

/**
 * Server-renders the real number, then counts up from zero the first time it scrolls
 * into view. Reduced motion, or no JavaScript, keeps the static value.
 */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAnimated(true)
  }, [])

  return (
    <span ref={ref} className={className}>
      <AnimatedNumber value={animated && !inView ? 0 : value} springOptions={{ bounce: 0, duration: 1800 }} />
    </span>
  )
}
