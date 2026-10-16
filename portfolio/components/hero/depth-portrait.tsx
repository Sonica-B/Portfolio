'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from '@/components/ui/icons'
import { afterPaintIdle } from '@/lib/idle'
import { cx } from '@/lib/cx'
import type { PointCloud } from './point-cloud'

// The WebGL2 point cloud (shaders, setup, draw loop) lives in ./point-cloud and loads once the first
// paint is on screen and the page is idle; until then, and wherever WebGL2 is missing, the portrait
// image below is what the visitor sees.

type Variant = 'hero' | 'hologram'

// Per-variant assets and density. maxWidth follows the height cap the parent sets through
// --portrait-max-h (46dvh on phones so the portrait sits under the hero text).
const VARIANTS = {
  hero: {
    src: '/portrait/shreya-1000.webp',
    depthSrc: '/portrait/shreya-depth.png',
    width: 568,
    height: 1000,
    cols: { phone: 180, desktop: 300 },
    maxWidth: 'min(560px, calc(var(--portrait-max-h, 80dvh) * 0.568))',
    frame: '[--portrait-max-h:46dvh] md:[--portrait-max-h:80dvh]',
    // The rendered width: 0.568 of the height cap (46dvh on phones is 26.1vh, 80dvh from 768 px is 45.4vh), capped by 560 px and the column.
    sizes: '(min-width: 768px) min(560px, 46vh, 40vw), min(27vh, 100vw)',
  },
  hologram: {
    src: '/portrait/shreya2-560.webp',
    depthSrc: '/portrait/shreya2-depth.png',
    width: 562,
    height: 592,
    cols: { phone: 160, desktop: 240 },
    maxWidth: 'min(440px, calc(var(--portrait-max-h, 60dvh) * 0.949))',
    frame: '[--portrait-max-h:46dvh] md:[--portrait-max-h:60dvh]',
    sizes: '(min-width: 768px) 440px, 80vw',
  },
} as const

// Hologram chrome: a 6 px float on a 6 s loop (translate, so it composes with the pointer
// tilt on transform) and a 1 px scan line that sweeps top to bottom every 7 s.
const HOLO_CSS = `
@keyframes dp-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -6px; } }
@keyframes dp-scan { 0% { transform: translateY(-100%); } 20%, 100% { transform: translateY(100%); } }
.dp-float { animation: dp-float 6s ease-in-out infinite; transform: perspective(900px) rotateX(var(--dp-rx, 0deg)) rotateY(var(--dp-ry, 0deg)); transition: transform 240ms cubic-bezier(0.25, 1, 0.5, 1); }
.dp-scan { animation: dp-scan 7s linear infinite; }
[data-paused="true"] .dp-float, [data-paused="true"] .dp-scan { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .dp-float, .dp-scan { animation: none; transition: none; } }
`

type Props = {
  variant?: Variant
  src?: string
  depthSrc?: string
  width?: number
  height?: number
  alt: string
  className?: string
}

export function DepthPortrait({ variant = 'hero', alt, className, ...overrides }: Props) {
  const cfg = VARIANTS[variant]
  const src = overrides.src ?? cfg.src
  const depthSrc = overrides.depthSrc ?? cfg.depthSrc
  const width = overrides.width ?? cfg.width
  const height = overrides.height ?? cfg.height
  const hologram = variant === 'hologram'

  const host = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<PointCloud | null>(null)
  const pausedRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [supported, setSupported] = useState(true)
  const [paused, setPaused] = useState(false)
  const [grid, setGrid] = useState<{ cols: number; rows: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const el = host.current
    if (!canvas || !el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (reduce || nav.connection?.saveData) {
      setSupported(false)
      return
    }
    let engine: PointCloud | null = null
    let disposed = false
    const cancelIdle = afterPaintIdle(() => {
      import('./point-cloud').then(
        ({ startPointCloud }) => {
          if (disposed) return
          engine = startPointCloud({
            canvas,
            host: el,
            src,
            depthSrc,
            width,
            height,
            cols: cfg.cols,
            paused: pausedRef.current,
            onReady: (g) => {
              setGrid(g)
              setReady(true)
            },
            onUnsupported: () => setSupported(false),
          })
          engineRef.current = engine
        },
        () => setSupported(false),
      )
    }, 2500)
    return () => {
      disposed = true
      cancelIdle()
      engine?.dispose()
      engineRef.current = null
    }
  }, [src, depthSrc, width, height, cfg])

  // Hologram only: tilt the wrapper up to 6 degrees from the pointer, fine pointers only.
  useEffect(() => {
    const el = host.current
    if (!hologram || !el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let rect: DOMRect | null = null
    const onEnter = () => {
      rect = el.getBoundingClientRect()
    }
    const onMove = (e: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--dp-ry', `${(x * 12).toFixed(2)}deg`)
      el.style.setProperty('--dp-rx', `${(-y * 12).toFixed(2)}deg`)
    }
    const onLeave = () => {
      rect = null
      el.style.setProperty('--dp-rx', '0deg')
      el.style.setProperty('--dp-ry', '0deg')
    }
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [hologram])

  const togglePause = () => {
    const next = !paused
    pausedRef.current = next
    setPaused(next)
    engineRef.current?.setPaused(next)
  }

  // Status line from real values: the grid this component allocated.
  const points = grid ? (grid.cols * grid.rows).toLocaleString('en-US') : null
  const status = !supported ? 'Static portrait' : points ? `Depth Anything V2 · ${points} points` : 'Depth Anything V2 · loading'

  return (
    <figure className={cx('mx-auto w-full', cfg.frame, className)} style={{ maxWidth: cfg.maxWidth }} data-paused={paused || undefined}>
      <div ref={host} className={cx('relative w-full', hologram && 'dp-float')} style={{ aspectRatio: `${width} / ${height}` }}>
        {/* No preload link for the portrait: the speculative preload and the img resolved different
            candidates on phones, so one download went unused. React adds a preload for every eager
            img outside a <picture>, so the wrapper opts out; the img stays eager and high priority in
            the server HTML and fetches only the candidate its own sizes resolve to. */}
        <picture className="contents">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={hologram ? 'lazy' : 'eager'}
            fetchPriority={hologram ? undefined : 'high'}
            sizes={cfg.sizes}
            className={cx('absolute inset-0 h-full w-full object-contain transition-opacity duration-700', ready && 'opacity-0')}
          />
        </picture>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          hidden={!supported}
          className={cx('absolute inset-0 h-full w-full transition-opacity duration-700', ready ? 'opacity-100' : 'opacity-0')}
        />
        {hologram && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="dp-scan absolute inset-x-0 top-0 h-full border-t border-accent opacity-[0.35]" />
          </div>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        {/* Wraps: at 320 px the hero figure is about 148 px wide, narrower than the status line. */}
        <span className="text-status min-w-0 font-mono text-sm break-words text-ink-2">{status}</span>
        {supported && ready && (
          <button
            type="button"
            onClick={togglePause}
            aria-pressed={paused}
            className="ml-auto inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-rule px-3 text-xs text-ink-2 hover:text-ink"
          >
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {paused ? 'Play motion' : 'Pause motion'}
          </button>
        )}
      </figcaption>
      {hologram && (
        <style href="depth-portrait-hologram" precedence="default">
          {HOLO_CSS}
        </style>
      )}
    </figure>
  )
}
