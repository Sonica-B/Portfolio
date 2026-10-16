import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { featuredProjects, KIND_LABEL, profile, year, type Pitch, type Project } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Prose } from '@/components/glossary/prose'
import { PITCH_THUMB, hasPitch, pitchThumbSrc } from '@/components/reel/pitch-slugs'
import { PlayPitch } from '@/components/reel/play-pitch'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { publicImageSize } from '@/components/projects/figure'
import { InstrumentSlot } from './instrument-slot'

// research-section.tsx and credentials/wallet-data.tsx import the helper from here; it lives in projects/figure.tsx.
export { publicImageSize } from '@/components/projects/figure'

// Cell labels in the text face at 14 px, sentence case, as on the project page strip.
const LABEL = 'text-sm leading-5 font-medium'
// Frame widths: 8rem on phones, 13rem from 768 px (see the grid columns in Strip).
const SIZES = '(min-width: 768px) 208px, 128px'

/**
 * A number in a sentence, with its %, x or + suffix when attached: "93%", "1.5x", "5,000+".
 * The first group captures the boundary character, so digits glued to letters or hyphens
 * (p95, 3D, GPT-2, INT8) stay part of their word.
 */
const NUMBER = /(^|[^\w.-])(\d+(?:[.,]\d+)*(?:%|x(?!\d))?\+?)(?!\w)/g

/** The metric that stands in for a picture: the first one short enough to read as a number. */
function tileMetric(p: Project) {
  return p.metrics.find((m) => m.value.length <= 12) ?? p.metrics[0]
}

/** The outcome sentence with every number in `text-metric` and the words between them through the glossary. */
function MetricProse({ text, seen }: { text: string; seen: Set<string> }) {
  const parts: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(NUMBER)) {
    const start = (m.index ?? 0) + m[1].length
    if (start > last) parts.push(<Prose key={`t${last}`} as="span" text={text.slice(last, start)} seen={seen} />)
    parts.push(
      <span key={`n${start}`} className="text-metric text-ink">
        {m[2]}
      </span>,
    )
    last = start + m[2].length
  }
  if (last < text.length) parts.push(<Prose key={`t${last}`} as="span" text={text.slice(last)} seen={seen} />)
  return <>{parts}</>
}

/** 16:9 frame: the pitch thumbnail when a video exists, else the project visual, else a typographic metric tile. */
function Frame({ project }: { project: Project }) {
  if (hasPitch(project.slug)) {
    return (
      <Image
        src={pitchThumbSrc(project.slug)}
        alt=""
        width={PITCH_THUMB.width}
        height={PITCH_THUMB.height}
        sizes={SIZES}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    )
  }
  if (project.visual) {
    const size = publicImageSize(project.visual.src)
    return (
      <Image
        src={project.visual.src}
        alt={project.visual.alt}
        width={size.width}
        height={size.height}
        sizes={SIZES}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    )
  }
  const metric = tileMetric(project)
  const value = metric?.value ?? year(project.start)
  const label = metric?.label ?? (KIND_LABEL[project.kind] ?? project.kind)
  return (
    <p className="flex h-full flex-col justify-between p-2 md:p-3">
      <span className={cn('text-metric leading-none break-words text-ink', value.length > 8 ? 'text-base md:text-2xl' : 'text-xl md:text-3xl')}>
        {value}
      </span>
      <span className="mt-1 line-clamp-1 text-xs leading-tight text-ink-2 md:line-clamp-2">{label}</span>
    </p>
  )
}

/** The three-second strip as three short cells. Phones stack them; from 768 px they sit in a row. */
function Cells({ pitch, seen, className }: { pitch: Pitch; seen: Set<string>; className?: string }) {
  return (
    <dl className={cn('grid grid-cols-1 gap-3 md:grid-cols-3', className)}>
      <div>
        <dt className={cn(LABEL, 'text-ink-2')}>Problem</dt>
        <Prose as="dd" text={pitch.problem} className="mt-1.5 text-base leading-snug text-ink-2" seen={seen} />
      </div>
      <div>
        <dt className={cn(LABEL, 'text-ink-2')}>What she did</dt>
        <Prose as="dd" text={pitch.action} className="mt-1.5 text-base leading-snug text-ink-2" seen={seen} />
      </div>
      <div>
        <dt className={cn(LABEL, 'text-accent')}>What changed</dt>
        <dd className="mt-1.5 text-base leading-snug text-ink">
          <MetricProse text={pitch.change} seen={seen} />
        </dd>
      </div>
    </dl>
  )
}

/**
 * One strip: frame, name and meta, the three cells, the actions, 12 px gutters throughout.
 * Phones: frame beside the name, cells in one column, actions below. From 768 px the frame grows
 * and the cells sit in a row. From 1024 px it is one horizontal strip: the frame spans both rows,
 * the actions sit at the right of the name row and the cells run under both.
 */
function Strip({ project, seen, lead }: { project: Project; seen: Set<string>; lead?: boolean }) {
  const href = `/projects/${project.slug}`
  const kind = KIND_LABEL[project.kind] ?? project.kind
  return (
    <>
      <div className="grid grid-cols-[8rem_minmax(0,1fr)] gap-3 md:grid-cols-[13rem_minmax(0,1fr)] lg:grid-cols-[13rem_minmax(0,1fr)_auto]">
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="frame-media aspect-video self-start overflow-hidden transition-[border-color,box-shadow] duration-200 hover:border-rule-strong hover:glow lg:row-span-2"
        >
          <Frame project={project} />
        </Link>

        <div className="min-w-0">
          <p className="flex flex-wrap items-baseline gap-x-2 text-sm text-ink-2">
            <span>{kind}</span>
            <span className="tnum">{year(project.end ?? project.start)}</span>
          </p>
          <h3 className="text-title mt-1">
            <Link href={href} className="text-ink transition-colors hover:text-accent">
              {project.name}
            </Link>
          </h3>
          {project.recognition ? <p className="mt-1 text-sm text-ink-2">{project.recognition}</p> : null}
        </div>

        <Cells pitch={project.pitch} seen={seen} className="col-span-2 lg:col-start-2 lg:row-start-2" />

        <div className="col-span-2 flex flex-wrap items-center gap-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:flex-col lg:items-end">
          <PlayPitch slug={project.slug} label="Play the pitch" location="home" />
          <ButtonLink href={href} variant="ghost">
            Open
          </ButtonLink>
        </div>
      </div>
      {lead ? <InstrumentSlot project={project} className="mt-4" /> : null}
    </>
  )
}

export function FeaturedWork() {
  const total = profile.projects.length
  const featured = featuredProjects
  // One glossary popover per term across the whole section.
  const seen = new Set<string>()
  return (
    <Section
      id="work"
      title="Featured outcomes"
      intro={`${featured.length} of ${total} projects, each with the problem, what she did and what changed.`}
    >
      <ol>
        {featured.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={Math.min(i * 20, 60)} className="py-6 md:py-8">
            <Strip project={project} seen={seen} lead={i === 0} />
          </Reveal>
        ))}
      </ol>
      <div className="mt-8">
        <ButtonLink href="/projects" variant="ghost">
          All {total} projects
        </ButtonLink>
      </div>
    </Section>
  )
}
