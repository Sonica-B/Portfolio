'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { CaretLeft, CaretRight, Play } from '@phosphor-icons/react'
import { useReducedMotion } from 'motion/react'
import { useReel } from './reel-provider'
import { PITCH_SECONDS, PITCH_THUMB, pitchThumbSrc, pitchVideoSrc, type PitchItem } from './pitch-slugs'

const HOVER_DELAY_MS = 300

const NAV =
  'press inline-flex h-11 w-11 items-center justify-center rounded-full border border-rule-strong text-ink transition-colors hover:bg-surface-raised disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent'

function Tile({ item, onOpen, previewAllowed }: { item: PitchItem; onOpen: (slug: string) => void; previewAllowed: boolean }) {
  const [preview, setPreview] = useState(false)
  const timer = useRef<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const clearTimer = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current)
      timer.current = null
    }
  }

  const onEnter = (e: PointerEvent) => {
    if (!previewAllowed || e.pointerType === 'touch' || !window.matchMedia('(hover: hover)').matches) return
    clearTimer()
    timer.current = window.setTimeout(() => setPreview(true), HOVER_DELAY_MS)
  }

  const onLeave = () => {
    clearTimer()
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
    setPreview(false)
  }

  useEffect(() => clearTimer, [])

  return (
    <button
      type="button"
      onClick={() => onOpen(item.slug)}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="group block w-full text-left"
    >
      <span className="frame-media relative block aspect-video overflow-hidden transition-[border-color,box-shadow] duration-200 group-hover:border-rule-strong group-hover:glow group-focus-visible:glow">
        <Image
          src={pitchThumbSrc(item.slug)}
          alt=""
          width={PITCH_THUMB.width}
          height={PITCH_THUMB.height}
          sizes="(min-width: 768px) 300px, 240px"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {preview ? (
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            loop
            preload="none"
            src={pitchVideoSrc(item.slug)}
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface/85 text-ink transition-colors group-hover:bg-accent group-hover:text-accent-ink group-focus-visible:bg-accent group-focus-visible:text-accent-ink"
        >
          <Play size={16} />
        </span>
        <span aria-hidden="true" className="text-metric absolute top-2 right-2 rounded-full bg-surface/85 px-2 py-0.5 text-xs text-ink-2">
          {PITCH_SECONDS} s
        </span>
      </span>
      <span className="mt-3 block leading-snug font-medium text-ink transition-colors group-hover:text-accent">
        <span className="sr-only">Play the {PITCH_SECONDS} second pitch for </span>
        {item.name}
      </span>
      <span className="mt-1 block text-sm leading-snug text-ink-2">{item.outcome}</span>
    </button>
  )
}

/**
 * Horizontal snap rail of pitch tiles. The rail bleeds into the container gutters so the next
 * tile peeks at the edge, and carries the same gutter as padding so the first tile lines up with
 * the text and the last tile can scroll fully into view.
 */
export function Filmstrip({ items }: { items: PitchItem[] }) {
  const { open } = useReel()
  const reduced = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const max = rail.scrollWidth - rail.clientWidth
    setEdges({ start: rail.scrollLeft <= 2, end: rail.scrollLeft >= max - 2 })
  }, [])

  const onScroll = () => {
    if (frame.current) return
    frame.current = requestAnimationFrame(() => {
      frame.current = 0
      measure()
    })
  }

  useEffect(() => {
    measure()
    const rail = railRef.current
    if (!rail) return
    const ro = new ResizeObserver(measure)
    ro.observe(rail)
    return () => {
      ro.disconnect()
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [measure])

  const scrollByTile = (dir: 1 | -1) => {
    const rail = railRef.current
    const list = rail?.firstElementChild
    if (!rail || !list) return
    const first = list.children[0] as HTMLElement | undefined
    const second = list.children[1] as HTMLElement | undefined
    const step = first && second ? second.offsetLeft - first.offsetLeft : rail.clientWidth * 0.8
    rail.scrollBy({ left: dir * step, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div>
      <div className="mb-4 hidden justify-end gap-2 [@media(hover:hover)_and_(pointer:fine)]:flex">
        <button type="button" onClick={() => scrollByTile(-1)} disabled={edges.start} aria-label="Scroll the reel left" className={NAV}>
          <CaretLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => scrollByTile(1)} disabled={edges.end} aria-label="Scroll the reel right" className={NAV}>
          <CaretRight size={18} aria-hidden="true" />
        </button>
      </div>
      <div
        ref={railRef}
        role="region"
        aria-label={`Pitch reel, ${items.length} videos`}
        tabIndex={0}
        onScroll={onScroll}
        className="[--gutter:clamp(1rem,0.4rem+3vw,4rem)] mx-[calc(-1*var(--gutter))] snap-x snap-mandatory scroll-px-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-3 [scrollbar-width:thin]"
      >
        {/* The ::after item restores the end gutter, which overflowing flex children would otherwise drop. */}
        <ul className="flex gap-3 after:block after:w-[calc(var(--gutter)-0.75rem)] after:shrink-0 after:content-['']">
          {items.map((item) => (
            <li key={item.slug} className="w-[240px] shrink-0 snap-start md:w-[300px]">
              <Tile item={item} onOpen={(slug) => open(slug, 'reel')} previewAllowed={!reduced} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
