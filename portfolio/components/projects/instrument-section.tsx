'use client'

import Image from 'next/image'
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

type Size = { width: number; height: number }

/**
 * The instrument block of a project page: a heading that names the instrument's purpose and
 * `InstrumentFor`, mounted once the section comes within 200 px of the viewport so the
 * instrument chunk is not fetched for a page the visitor never scrolls. Renders nothing when
 * the registry would (no bespoke instrument, no visual, no metrics). Client component because
 * `hasBespokeInstrument` lives in the client registry; `visualSize` is read on the server.
 */
export function InstrumentSection({ project, visualSize }: { project: Project; visualSize: Size | null }) {
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
  // The figure switcher already shows the visual; bespoke instruments draw their own material, so the visual gets its own frame.
  const visual = bespoke && visualSize ? project.visual : null

  return (
    <section ref={ref} aria-labelledby={headingId} className="mt-10 md:mt-14">
      <h2 id={headingId} className="text-title">
        {title}
      </h2>
      {/* The slot keeps its height before mount and while the chunk loads, so the page does not jump. */}
      <div className="mt-4 min-h-[24rem]">{near ? <InstrumentFor project={project} /> : null}</div>
      {visual && visualSize ? (
        <figure className="mt-3">
          <Image
            src={visual.src}
            alt={visual.alt}
            width={visualSize.width}
            height={visualSize.height}
            sizes="(min-width: 1024px) 960px, 100vw"
            loading="lazy"
            className="frame-media w-full max-w-[960px]"
            style={{ height: 'auto' }}
          />
        </figure>
      ) : null}
    </section>
  )
}
