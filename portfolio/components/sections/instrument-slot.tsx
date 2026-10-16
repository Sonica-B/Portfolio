'use client'

import { useEffect, useRef, useState } from 'react'
import { InstrumentFor } from '@/components/instruments/registry'
import type { Project } from '@/lib/content'

/**
 * Home-page slot for a project instrument. `InstrumentFor` (next/dynamic, ssr: false) is rendered
 * only once the slot comes within 200 px of the viewport, so the instrument chunk and its data are
 * not fetched for a visitor who never scrolls to it. The slot keeps `minHeight` before and while
 * the chunk loads, so nothing below it jumps.
 */
export function InstrumentSlot({
  project,
  minHeight = 540,
  className,
}: {
  project: Project
  /** Pixels reserved before the instrument mounts. */
  minHeight?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [near])

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {near ? <InstrumentFor project={project} /> : null}
    </div>
  )
}
