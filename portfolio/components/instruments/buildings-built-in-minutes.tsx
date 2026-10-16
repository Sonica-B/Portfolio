'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowsHorizontal } from '@phosphor-icons/react'
import type { Project } from '@/lib/content'
import { Instrument, findMetric, useInstrument } from '@/components/instruments/instrument'

/**
 * Drag to orbit: scrubs the project's own NeRF orbit render of the Lego scene.
 * The clip (public/projects/buildings-built-in-minutes/lego-orbit.mp4) is the
 * Phase2/NeRF_Lego.gif from the repository, re-encoded without audio. One full
 * drag across the frame is one full orbit; arrow keys step by ten degrees.
 */

const CLIP = '/projects/buildings-built-in-minutes/lego-orbit.mp4'
const POSTER = '/projects/buildings-built-in-minutes/lego-orbit-poster.webp'
const KEY_STEP_DEGREES = 10

export default function BuildingsBuiltInMinutes({ project }: { project: Project }) {
  const [angle, setAngle] = useState(0)
  const psnr = findMetric(project, /PSNR/i)
  const status = `Orbit ${Math.round(angle)}°${psnr ? ` · ${psnr.label} ${psnr.value}` : ''} · NeRF render of the Lego scene`

  return (
    <Instrument title="Drag to orbit" status={status} slug={project.slug} minHeight={420}>
      <Orbit angle={angle} onAngle={setAngle} />
    </Instrument>
  )
}

function Orbit({ angle, onAngle }: { angle: number; onAngle: (angle: number) => void }) {
  const { interact } = useInstrument()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const target = useRef(0)
  const raf = useRef(0)
  const drag = useRef<{ x: number; t: number } | null>(null)

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
      const duration = video.duration
      const wrapped = ((seconds % duration) + duration) % duration
      target.current = Math.min(wrapped, duration - 0.001)
      onAngle((target.current / duration) * 360)
      if (!raf.current) raf.current = requestAnimationFrame(apply)
    },
    [apply, onAngle],
  )

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { x: event.clientX, t: target.current }
    interact()
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!drag.current || !video || !video.duration) return
    const width = event.currentTarget.clientWidth || 1
    const dx = event.clientX - drag.current.x
    seekTo(drag.current.t + (dx / width) * video.duration)
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
    const stepSeconds = video.duration * (KEY_STEP_DEGREES / 360)
    let next: number | null = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = target.current + stepSeconds
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = target.current - stepSeconds
    else if (event.key === 'PageUp') next = target.current + stepSeconds * 3
    else if (event.key === 'PageDown') next = target.current - stepSeconds * 3
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = video.duration - 0.001
    if (next === null) return
    event.preventDefault()
    interact()
    seekTo(next)
  }

  const degrees = Math.round(angle)

  return (
    <div className="flex flex-col gap-3">
      <div
        role="slider"
        tabIndex={0}
        aria-label="Orbit angle"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={degrees}
        aria-valuetext={`${degrees} degrees`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="frame-media relative mx-auto w-full max-w-[480px] cursor-grab touch-none select-none overflow-hidden border border-rule bg-surface-sunken active:cursor-grabbing"
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
          onLoadedMetadata={() => setReady(true)}
          className="pointer-events-none aspect-square h-auto w-full"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-surface/70 py-2 text-base text-ink-2">
          <ArrowsHorizontal size={18} aria-hidden="true" />
          <span>{ready ? 'Drag sideways or use the arrow keys' : 'Loading the orbit clip'}</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[480px]" aria-hidden="true">
        <div className="h-1 w-full overflow-hidden bg-rule">
          <div className="h-full w-full origin-left bg-accent" style={{ transform: `scaleX(${angle / 360})` }} />
        </div>
        <div className="mt-1 flex justify-between text-base text-ink-2">
          <span className="text-metric">0°</span>
          <span className="text-metric text-ink">{degrees}°</span>
          <span className="text-metric">360°</span>
        </div>
      </div>
    </div>
  )
}
