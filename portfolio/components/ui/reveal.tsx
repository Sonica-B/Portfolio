'use client'

import { createElement, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Reveals children when they enter the viewport. If already in view on mount
 * (deep link, back navigation, instant scroll) it reveals immediately, which
 * fixes the blank-section bug of the previous site.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'article' | 'section'
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.visible = 'true'
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.dataset.visible = 'true'
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return createElement(
    as,
    { ref, className: cn('reveal', className), style: delay ? { transitionDelay: `${delay}ms` } : undefined },
    children,
  )
}
