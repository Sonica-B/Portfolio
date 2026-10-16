'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { InstrumentFor, hasBespokeInstrument } from '@/components/instruments/registry'
import type { Project } from '@/lib/content'

/** Section heading per bespoke instrument: what the visitor can do with it. */
const PURPOSE: Record<string, string> = {
  'latent-cot': 'Scrub the latent trajectories',
  'einstein-vision': 'Slide between the dash-cam frame and the render',
  tumorlytix: 'Reveal the segmentation stages',
  vio: 'Compare the three odometry inputs',
  robofusion: 'Pick a gesture, watch the arm move',
  skiplegal: 'Drop a document into the pipeline',
  madwe: 'Generate assets',
  'realmweaver-ai': 'Collapse a tile map',
  'buildings-built-in-minutes': 'Drag to orbit the NeRF render',
  'trended-pathfinder': 'Pick courses, read the top terms',
  autogit: 'Replay the secret scan',
}

/**
 * The instrument block of a project page: a heading that names the instrument's purpose and
 * `InstrumentFor`, mounted once the section comes within 200 px of the viewport so the
 * instrument chunk is not fetched for a page the visitor never scrolls. Renders nothing when
 * the registry would (no bespoke instrument, no visual, no metrics). The project's visual is
 * not repeated here: the figure switcher shows it, and beside a bespoke instrument the page
 * body places it as a captioned figure (see `visualNeedsFigure` in components/instruments/bespoke).
 */
export function InstrumentSection({ project }: { project: Project }) {
  const bespoke = hasBespokeInstrument(project.slug)
  const ref = useRef<HTMLElement>(null)
  const headingId = useId()
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

  if (!bespoke && !project.visual && project.metrics.length === 0) return null

  const title = bespoke ? (PURPOSE[project.slug] ?? 'Try the instrument') : project.visual ? 'Figures' : 'Explore the numbers'

  return (
    <section ref={ref} aria-labelledby={headingId} className="mt-10 md:mt-14">
      <h2 id={headingId} className="text-title">
        {title}
      </h2>
      {/* The slot keeps its height before mount and while the chunk loads, so the page does not jump. */}
      <div className="mt-4 min-h-[24rem]">{near ? <InstrumentFor project={project} /> : null}</div>
    </section>
  )
}
