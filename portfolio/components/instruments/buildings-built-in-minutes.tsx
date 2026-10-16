'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowsHorizontal } from '@phosphor-icons/react'
import type { Project } from '@/lib/content'
import { Instrument, findMetric, useInstrument } from '@/components/instruments/instrument'

/**
 * Drag to orbit: scrubs the project's own NeRF orbit render of the Lego scene.
 * The clip (public/projects/buildings-built-in-minutes/lego-orbit.mp4) is the
 * Phase2/NeRF_Lego.gif from the repository, re-encoded without audio: 111 frames at
 * 15 fps, one full orbit. Only frames 68 to 102 show the whole model and its base plate
 * clean; before and after, the render streaks and then leaves the frame (frames 16 to 40
 * are black). The instrument scrubs that arc, and the poster is frame 68, so the resting
 * state and every reachable frame read as a finished render. One full drag across the
 * frame covers the arc; arrow keys step by ten degrees of the orbit.
 */

const CLIP = '/projects/buildings-built-in-minutes/lego-orbit.mp4'
const POSTER = '/projects/buildings-built-in-minutes/lego-orbit-poster.webp'
const FPS = 15
const FRAMES = 111
const ARC_FIRST = 68
const ARC_LAST = 102
/** Frame centres, so a seek lands on the frame and not on the boundary before it. */
const ARC_START = (ARC_FIRST + 0.5) / FPS
const ARC_END = (ARC_LAST + 0.5) / FPS
const ARC_SECONDS = ARC_END - ARC_START
const ARC_DEGREES = ((ARC_LAST - ARC_FIRST) / FRAMES) * 360
const KEY_STEP_SECONDS = (10 / 360) * (FRAMES / FPS)
/** Movement in px before a drag is read as sideways (orbit) or vertical (page scroll). */
const DRAG_SLOP = 8

export default function BuildingsBuiltInMinutes({ project }: { project: Project }) {
  const [angle, setAngle] = useState(0)
  const psnr = findMetric(project, /PSNR/i)
  const arc = Math.round(ARC_DEGREES)
  const status = `Orbit ${Math.round(angle)}° of ${arc}°${psnr ? ` · ${psnr.label} ${psnr.value}` : ''} · NeRF render of the Lego scene, the arc where the whole model stays in frame`

  return (
    <Instrument title="Drag to orbit" status={status} slug={project.slug} minHeight={420}>
      <Orbit angle={angle} onAngle={setAngle} />
    </Instrument>
  )
}

type Drag = { id: number; x: number; y: number; t: number; sideways: boolean }

function Orbit({ angle, onAngle }: { angle: number; onAngle: (angle: number) => void }) {
  const { interact } = useInstrument()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const target = useRef(ARC_START)
  const raf = useRef(0)
  const drag = useRef<Drag | null>(null)

  const apply = useCallback(() => {
    raf.current = 0
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration === 0) return
    if (video.seeking) {
      raf.current = requestAnimationFrame(apply)
      return
    }
    if (Math.abs(video.currentTime - target.current) > 0.02) video.currentTime = target.current
  }, [])

  const seekTo = useCallback(
    (seconds: number) => {
      const video = videoRef.current
      if (!video || !Number.isFinite(video.duration) || video.duration === 0) return
      const end = Math.min(ARC_END, video.duration - 0.001)
      target.current = Math.min(end, Math.max(ARC_START, seconds))
      onAngle(((target.current - ARC_START) / ARC_SECONDS) * ARC_DEGREES)
      if (!raf.current) raf.current = requestAnimationFrame(apply)
    },
    [apply, onAngle],
  )

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, t: target.current, sideways: false }
  }

  // touch-action: pan-y hands vertical swipes to the page (the browser then cancels the pointer);
  // a drag becomes orbit input only once it has moved mostly sideways.
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const video = videoRef.current
    if (!d || d.id !== event.pointerId || !video || !video.duration) return
    const dx = event.clientX - d.x
    const dy = event.clientY - d.y
    if (!d.sideways) {
      if (Math.hypot(dx, dy) < DRAG_SLOP) return
      if (Math.abs(dx) <= Math.abs(dy)) {
        drag.current = null
        return
      }
      d.sideways = true
      event.currentTarget.setPointerCapture(event.pointerId)
      interact()
    }
    const width = event.currentTarget.clientWidth || 1
    seekTo(d.t + (dx / width) * ARC_SECONDS)
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    let next: number | null = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = target.current + KEY_STEP_SECONDS
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = target.current - KEY_STEP_SECONDS
    else if (event.key === 'PageUp') next = target.current + KEY_STEP_SECONDS * 3
    else if (event.key === 'PageDown') next = target.current - KEY_STEP_SECONDS * 3
    else if (event.key === 'Home') next = ARC_START
    else if (event.key === 'End') next = ARC_END
    if (next === null) return
    event.preventDefault()
    interact()
    seekTo(next)
  }

  const degrees = Math.round(angle)
  const arc = Math.round(ARC_DEGREES)

  return (
    <div className="flex flex-col gap-3">
      <div
        role="slider"
        tabIndex={0}
        aria-label="Orbit angle"
        aria-valuemin={0}
        aria-valuemax={arc}
        aria-valuenow={degrees}
        aria-valuetext={`${degrees} of ${arc} degrees`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="frame-media relative mx-auto w-full max-w-[480px] cursor-grab touch-pan-y select-none overflow-hidden border border-rule bg-surface-sunken active:cursor-grabbing"
      >
        <video
          ref={videoRef}
          src={CLIP}
          poster={POSTER}
          width={640}
          height={640}
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime = ARC_START
            setReady(true)
          }}
          className="pointer-events-none block aspect-square h-auto w-full object-contain"
        />
        {/* Under the picture, not over it, so the base plate is never covered. */}
        <div className="pointer-events-none flex items-center justify-center gap-2 border-t border-rule py-2 text-base text-ink-2">
          <ArrowsHorizontal size={18} aria-hidden="true" />
          <span>{ready ? 'Drag sideways or use the arrow keys' : 'Loading the orbit clip'}</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[480px]" aria-hidden="true">
        <div className="h-1 w-full overflow-hidden bg-rule">
          <div className="h-full w-full origin-left bg-accent" style={{ transform: `scaleX(${angle / ARC_DEGREES})` }} />
        </div>
        <div className="mt-1 flex justify-between text-base text-ink-2">
          <span className="text-metric">0°</span>
          <span className="text-metric text-ink">{degrees}°</span>
          <span className="text-metric">{arc}°</span>
        </div>
      </div>
    </div>
  )
}
