'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import type { Project } from '@/lib/content'
import { Instrument, findMetric, useInstrument } from '@/components/instruments/instrument'

/**
 * Before and after: the dash-cam frame with its detections against the Blender
 * reconstruction of the same moment. Both frames come from the project's own clips
 * (dashcam-detections.mp4 and blender-twin.mp4, frame 0). Same mechanics as the
 * Motion-Primitives ImageComparison component (a motion value driving two
 * clip-path insets) with pointer capture and a keyboard operable handle added, since
 * the primitive exposes no way to move its handle from the keyboard.
 */

const BEFORE = { src: '/projects/einstein-vision/dashcam-detections.webp', label: 'Dash-cam detections' }
const AFTER = { src: '/projects/einstein-vision/reconstructed-scene.webp', label: 'Reconstructed scene' }
const WIDTH = 1280
const HEIGHT = 720
const KEY_STEP = 5

const clamp = (value: number) => Math.min(100, Math.max(0, value))

export default function EinsteinVision({ project }: { project: Project }) {
  const [position, setPosition] = useState(50)
  const placement = findMetric(project, /placement/i)
  const realism = findMetric(project, /realism/i)
  const facts = [placement, realism]
    .filter((metric): metric is NonNullable<typeof metric> => Boolean(metric))
    .map((metric) => `${metric.label} ${metric.value}`)
    .join(' · ')
  const status = `Handle at ${Math.round(position)}%${facts ? ` · ${facts}` : ''}`

  return (
    <Instrument title="Before and after" status={status} slug={project.slug} minHeight={300}>
      <Compare position={position} onPosition={setPosition} />
    </Instrument>
  )
}

function Compare({ position, onPosition }: { position: number; onPosition: (value: number) => void }) {
  const { reduced, interact } = useInstrument()
  const frameRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const target = useRef(50)
  const value = useMotionValue(50)
  const afterClip = useTransform(value, (v) => `inset(0 0 0 ${v}%)`)
  const handleShift = useTransform(value, (v) => `translateX(${v}%)`)

  const setFromPointer = (clientX: number) => {
    const frame = frameRef.current
    if (!frame) return
    const rect = frame.getBoundingClientRect()
    if (rect.width === 0) return
    const next = clamp(((clientX - rect.left) / rect.width) * 100)
    target.current = next
    value.set(next)
    onPosition(next)
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    setFromPointer(event.clientX)
    interact()
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromPointer(event.clientX)
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null
    const current = target.current
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = current + KEY_STEP
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = current - KEY_STEP
    else if (event.key === 'PageUp') next = current + KEY_STEP * 4
    else if (event.key === 'PageDown') next = current - KEY_STEP * 4
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = 100
    if (next === null) return
    event.preventDefault()
    const clamped = clamp(next)
    target.current = clamped
    interact()
    animate(value, clamped, { duration: reduced ? 0 : 0.24, ease: 'easeOut' })
    onPosition(clamped)
  }

  const rounded = Math.round(position)

  return (
    <div
      ref={frameRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="frame-media relative mx-auto aspect-video w-full max-w-[960px] cursor-ew-resize touch-none select-none overflow-hidden border border-rule bg-surface-sunken"
    >
      <Image
        src={BEFORE.src}
        alt={`${BEFORE.label}: a dash-cam frame with detected vehicles, traffic lights and lane lines drawn on it`}
        width={WIDTH}
        height={HEIGHT}
        sizes="(min-width: 1024px) 960px, 100vw"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <motion.div className="absolute inset-0" style={{ clipPath: afterClip }}>
        <Image
          src={AFTER.src}
          alt={`${AFTER.label}: the same moment rebuilt in Blender with placed vehicles, cones and lane lines`}
          width={WIDTH}
          height={HEIGHT}
          sizes="(min-width: 1024px) 960px, 100vw"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-surface/80 px-3 py-1 font-mono text-[13px] uppercase leading-5 tracking-[0.08em] text-ink">
        {BEFORE.label}
      </span>
      <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-surface/80 px-3 py-1 font-mono text-[13px] uppercase leading-5 tracking-[0.08em] text-ink">
        {AFTER.label}
      </span>

      <motion.div className="pointer-events-none absolute inset-0 w-full" style={{ transform: handleShift }}>
        <div className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-accent" />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparison handle"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rounded}
          aria-valuetext={`${rounded} percent dash-cam, ${100 - rounded} percent reconstruction`}
          onKeyDown={onKeyDown}
          className="glow pointer-events-auto absolute left-0 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-rule-strong bg-surface-raised text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 4 1.5 9 6 14M12 4l4.5 5-4.5 5" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
