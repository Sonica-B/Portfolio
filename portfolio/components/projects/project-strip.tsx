import Image from 'next/image'
import Link from 'next/link'
import { PITCH_THUMB } from '@/components/reel/pitch-slugs'
import { PlayPitch } from '@/components/reel/play-pitch'
import { cx } from '@/lib/cx'

/** What fills the 16:9 frame: the pitch thumbnail, the project visual, or a typographic metric tile. */
export type StripFrame =
  | { type: 'thumb'; src: string }
  | { type: 'visual'; src: string; alt: string; width: number; height: number }
  | { type: 'metric'; value: string; label: string }

/** Serializable projection of a project for the index, computed on the server and passed to the URL filter. */
export type StripItem = {
  slug: string
  name: string
  kind: string
  kindLabel: string
  year: string
  /** pitch.change: the outcome line. */
  change: string
  hasPitch: boolean
  frame: StripFrame
  /** profile.json `shipped.label` ("VS Code Marketplace"), set on the server by ProjectFilter; absent when not shipped. */
  shipped?: string | null
  /** Ended in EARLIER_WORK_LAST_YEAR or before (lib/content.ts isEarlierWork): folds into the "Earlier work" row. */
  earlier?: boolean
}

// Frame widths: 8rem on phones, 13rem from 768 px (see the grid columns below).
const SIZES = '(min-width: 768px) 208px, 128px'

function Frame({ frame }: { frame: StripFrame }) {
  if (frame.type === 'thumb') {
    return (
      <Image
        src={frame.src}
        alt=""
        width={PITCH_THUMB.width}
        height={PITCH_THUMB.height}
        sizes={SIZES}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    )
  }
  if (frame.type === 'visual') {
    return (
      <Image
        src={frame.src}
        alt={frame.alt}
        width={frame.width}
        height={frame.height}
        sizes={SIZES}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    )
  }
  const long = frame.value.length > 8
  return (
    <p className="flex h-full flex-col justify-between p-2 md:p-3">
      <span className={cx('text-metric break-words text-ink', long ? 'text-base md:text-2xl' : 'text-xl md:text-3xl')}>
        {frame.value}
      </span>
      <span className="mt-1 line-clamp-1 text-xs leading-tight text-ink-2 md:line-clamp-2">{frame.label}</span>
    </p>
  )
}

/**
 * One row of the contact sheet. The whole panel is the tap target: the name link's pseudo-element
 * stretches over the positioned item, and the play button sits above it on its own layer.
 * Phones: frame beside the name, outcome line and button full width below. From 768 px the frame
 * spans all three rows on the left.
 */
export function ProjectStrip({ item }: { item: StripItem }) {
  return (
    <li className="panel group relative grid grid-cols-[8rem_minmax(0,1fr)] gap-x-3 gap-y-3 p-3 transition-[border-color,box-shadow] duration-200 focus-within:glow hover:border-rule-strong hover:glow md:grid-cols-[13rem_minmax(0,1fr)] md:grid-rows-[auto_auto_1fr] md:gap-x-4 md:gap-y-2 md:p-4">
      <div className="frame-media aspect-video self-start overflow-hidden md:row-span-3">
        <Frame frame={item.frame} />
      </div>
      <div className="min-w-0">
        <p className="flex flex-wrap items-baseline gap-x-2 text-sm text-ink-2">
          <span>{item.kindLabel}</span>
          <span className="tnum">{item.year}</span>
        </p>
        {/* anywhere: a single long token ("shreyaboyane.dev:", "reconstruction") breaks inside the 1fr column at 320 px. */}
        <h2 className="text-title mt-1 [overflow-wrap:anywhere]">
          <Link
            href={`/projects/${item.slug}`}
            className="text-ink transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
          >
            {item.name}
          </Link>
        </h2>
        {item.shipped ? (
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[13px] tracking-[0.08em] text-accent uppercase">Shipped</span>
            <span className="text-sm text-ink-2">{item.shipped}</span>
          </p>
        ) : null}
      </div>
      <p className="col-span-2 text-ink-2 md:col-span-1 md:col-start-2">{item.change}</p>
      {item.hasPitch ? (
        <div className="col-span-2 md:col-span-1 md:col-start-2 md:self-end">
          <PlayPitch slug={item.slug} label="Play the pitch" location="index" className="relative z-10" />
        </div>
      ) : null}
    </li>
  )
}
