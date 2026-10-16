'use client'

import Image from 'next/image'
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { ArrowsIn, ArrowsOut, MagnifyingGlassMinus, MagnifyingGlassPlus } from '@phosphor-icons/react'
import { Instrument, useInstrument } from '@/components/instruments/instrument'
import type { Project } from '@/lib/content'
import { cn } from '@/lib/utils'

/*
 * Figure switcher, the shared instrument for projects whose only interactive material is
 * their visual. Fit shows the whole figure; Zoom scales it 1.6x (plus and minus step through
 * 1x, 1.6x and 2.2x) with drag to pan, arrow keys to pan and 0 to fit again.
 */

const LEVELS = [1, 1.6, 2.2]
const PAN_STEP = 40
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

type Visual = { src: string; alt: string }
type Pan = { x: number; y: number }

function Body({ visual, level, setLevel }: { visual: Visual; level: number; setLevel: (i: number) => void }) {
  const { reduced, interact } = useInstrument()
  const [pan, setPan] = useState<Pan>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const viewport = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null)
  const scale = LEVELS[level]

  const clampPan = (p: Pan, s: number): Pan => {
    const el = viewport.current
    if (!el || s <= 1) return { x: 0, y: 0 }
    const mx = ((s - 1) * el.clientWidth) / 2
    const my = ((s - 1) * el.clientHeight) / 2
    return { x: clamp(p.x, -mx, mx), y: clamp(p.y, -my, my) }
  }
  const zoomTo = (i: number) => {
    interact()
    const next = clamp(i, 0, LEVELS.length - 1)
    setLevel(next)
    setPan((p) => clampPan(p, LEVELS[next]))
  }
  const panBy = (dx: number, dy: number) => {
    interact()
    setPan((p) => clampPan({ x: p.x + dx, y: p.y + dy }, scale))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (scale <= 1) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }
    setDragging(true)
    interact()
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d) return
    setPan(clampPan({ x: d.px + (e.clientX - d.x), y: d.py + (e.clientY - d.y) }, scale))
  }
  const endDrag = () => {
    drag.current = null
    setDragging(false)
  }
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const key = e.key
    if (key === '+' || key === '=') zoomTo(level + 1)
    else if (key === '-' || key === '_') zoomTo(level - 1)
    else if (key === '0') zoomTo(0)
    else if (key === 'ArrowLeft') panBy(PAN_STEP, 0)
    else if (key === 'ArrowRight') panBy(-PAN_STEP, 0)
    else if (key === 'ArrowUp') panBy(0, PAN_STEP)
    else if (key === 'ArrowDown') panBy(0, -PAN_STEP)
    else return
    e.preventDefault()
  }

  const zoomed = scale > 1
  const button = 'press inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-200'

  return (
    <figure>
      <div
        ref={viewport}
        tabIndex={0}
        role="group"
        aria-label="Figure viewport. Plus and minus zoom, arrow keys pan, 0 fits."
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn('relative aspect-video select-none overflow-hidden border border-rule bg-surface-sunken', zoomed && (dragging ? 'cursor-grabbing' : 'cursor-grab'))}
        style={{ touchAction: zoomed ? 'none' : 'auto' }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transition: dragging || reduced ? 'none' : 'transform 300ms cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          <Image src={visual.src} alt={visual.alt} fill sizes="(min-width: 768px) 60vw, 100vw" draggable={false} className="object-contain" />
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-ink-2">{visual.alt}</figcaption>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" aria-pressed={!zoomed} onClick={() => zoomTo(0)} className={cn(button, !zoomed ? 'border-accent bg-accent text-accent-ink' : 'border-rule-strong text-ink hover:bg-surface-sunken')}>
          <ArrowsIn size={16} aria-hidden="true" />
          Fit
        </button>
        <button type="button" aria-pressed={zoomed} onClick={() => zoomTo(1)} className={cn(button, zoomed ? 'border-accent bg-accent text-accent-ink' : 'border-rule-strong text-ink hover:bg-surface-sunken')}>
          <ArrowsOut size={16} aria-hidden="true" />
          Zoom
        </button>
        <button type="button" aria-label="Zoom in" disabled={level >= LEVELS.length - 1} onClick={() => zoomTo(level + 1)} className={cn(button, 'min-w-11 border-rule-strong px-0 text-ink hover:bg-surface-sunken disabled:opacity-50')}>
          <MagnifyingGlassPlus size={18} aria-hidden="true" />
        </button>
        <button type="button" aria-label="Zoom out" disabled={level <= 0} onClick={() => zoomTo(level - 1)} className={cn(button, 'min-w-11 border-rule-strong px-0 text-ink hover:bg-surface-sunken disabled:opacity-50')}>
          <MagnifyingGlassMinus size={18} aria-hidden="true" />
        </button>
      </div>
    </figure>
  )
}

export default function FigureSwitcher({ project }: { project: Project }) {
  const [level, setLevel] = useState(0)
  const visual = project.visual
  if (!visual) return null
  const scale = LEVELS[level]
  const status = `${scale === 1 ? 'Fit' : `Zoom ${scale.toFixed(1)}x`}. Plus and minus keys zoom, arrow keys pan`
  return (
    <Instrument title="Figure" status={status} slug={project.slug} minHeight={360}>
      <Body visual={visual} level={level} setLevel={setLevel} />
    </Instrument>
  )
}
