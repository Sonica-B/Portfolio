'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react'
import { ArrowRight, CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import { track } from '@/lib/analytics'
import { useReel } from './reel-provider'
import { PITCH_POSTER, pitchCaptionsSrc, pitchPosterSrc, pitchVideoSrc } from './pitch-slugs'

const CONTROL =
  'press inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-rule-strong px-3.5 text-sm text-ink transition-colors hover:bg-surface-raised'

/**
 * Native <dialog> lightbox for the pitch videos. Escape and backdrop clicks close it through the
 * element's own close event, so every path ends in the same handler: unload the video, sync the
 * provider, return focus to the opener.
 */
export function ReelDialog() {
  const { slug, location, items, close, next, prev, openerRef } = useReel()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const tracked = useRef<string | null>(null)
  const index = slug ? items.findIndex((it) => it.slug === slug) : -1
  const item = index >= 0 ? items[index] : null

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (item && !d.open) d.showModal()
    else if (!item && d.open) d.close()
  }, [item])

  const onClose = useCallback(() => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.removeAttribute('src')
      v.load()
    }
    tracked.current = null
    close()
    const opener = openerRef.current
    if (opener && opener.isConnected) opener.focus({ preventScroll: true })
  }, [close, openerRef])

  const onBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) dialogRef.current?.close()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    // Inside the video element the arrow keys seek; everywhere else they step through the reel.
    if (e.target instanceof HTMLVideoElement) return
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  const onPlay = () => {
    if (!item || tracked.current === item.slug) return
    tracked.current = item.slug
    track('video_play', { slug: item.slug, location })
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="reel-title"
      onClose={onClose}
      onClick={onBackdropClick}
      onKeyDown={onKeyDown}
      className="m-auto max-h-[100dvh] w-full max-w-[1120px] overflow-y-auto border-0 bg-transparent p-0 text-ink transition-opacity duration-300 ease-out [overscroll-behavior:contain] backdrop:bg-[oklch(0.08_0.01_260/0.88)] starting:open:opacity-0 md:w-[calc(100%-3rem)]"
    >
      {item ? (
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between gap-4 px-[max(1rem,env(safe-area-inset-left))] pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 md:px-0 md:pt-0">
            <p className="text-metric text-sm text-ink-2">
              {index + 1} of {items.length}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="press inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-raised"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="frame-media aspect-video w-full overflow-hidden">
            <video
              key={item.slug}
              ref={videoRef}
              controls
              autoPlay
              playsInline
              preload="none"
              poster={pitchPosterSrc(item.slug)}
              src={pitchVideoSrc(item.slug)}
              width={PITCH_POSTER.width}
              height={PITCH_POSTER.height}
              onPlay={onPlay}
              className="h-full w-full object-contain"
            >
              <track kind="captions" srcLang="en" label="English" src={pitchCaptionsSrc(item.slug)} default />
            </video>
          </div>

          <div className="flex flex-col gap-4 px-[max(1rem,env(safe-area-inset-left))] pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:flex-row md:items-start md:justify-between md:px-0 md:pt-5 md:pb-0">
            <div className="min-w-0">
              <h2 id="reel-title" className="text-title text-ink">
                {item.name}
              </h2>
              <p className="mt-1 max-w-[60ch] text-ink-2">{item.outcome}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button type="button" onClick={prev} className={CONTROL}>
                <CaretLeft size={16} aria-hidden="true" />
                Previous
              </button>
              <button type="button" onClick={next} className={CONTROL}>
                Next
                <CaretRight size={16} aria-hidden="true" />
              </button>
              <Link href={`/projects/${item.slug}`} onClick={() => dialogRef.current?.close()} className={CONTROL}>
                Open project
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
