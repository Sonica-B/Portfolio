import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { featuredProjects, KIND_LABEL, profile, year, type Metric, type Project } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { Spotlight } from '@/components/motion-primitives/spotlight'

/**
 * Intrinsic pixel size of a WebP or PNG under public/, read from the file header at
 * build time so next/image gets a real width and height for assets named in profile.json.
 * Falls back to a 16:10 box; the image still renders at its natural ratio through height: auto.
 */
export function publicImageSize(src: string): { width: number; height: number } {
  try {
    const b = readFileSync(join(process.cwd(), 'public', src))
    if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const chunk = b.toString('ascii', 12, 16)
      if (chunk === 'VP8X') return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) }
      if (chunk === 'VP8L') {
        const bits = b.readUInt32LE(21)
        return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >>> 14) & 0x3fff) }
      }
      if (chunk === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
    }
    if (b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
  } catch {
    // Missing or unreadable file: use the fallback box below.
  }
  return { width: 1600, height: 1000 }
}

/** Pointer-follow glow in the accent instead of the primitive's zinc default, so it reads on both themes. */
const GLOW =
  'bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent)_32%,transparent),transparent_70%)]'

/** Column spans and reveal delays for the five projects after the lead: a 7/5 pair, then thirds. */
const LAYOUT = [
  { span: 'md:col-span-7', delay: 0 },
  { span: 'md:col-span-5', delay: 40 },
  { span: 'md:col-span-6 lg:col-span-4', delay: 0 },
  { span: 'md:col-span-6 lg:col-span-4', delay: 30 },
  { span: 'md:col-span-12 lg:col-span-4', delay: 60 },
]

/** The metric that stands in for a visual: the first one short enough to read as a number. */
function heroMetric(metrics: Metric[]): Metric | undefined {
  return metrics.find((m) => m.value.length <= 12) ?? metrics[0]
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 text-xs text-ink-3">
      <span>{KIND_LABEL[project.kind] ?? project.kind}</span>
      <span className="text-metric">{year(project.end ?? project.start)}</span>
    </p>
  )
}

/** The whole panel is the tap target: the link's pseudo-element stretches over the positioned article. */
function ProjectLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-accent"
    >
      {project.name}
    </Link>
  )
}

function Lead({ project }: { project: Project }) {
  const visual = project.visual
  const size = visual ? publicImageSize(visual.src) : null
  return (
    <article className="relative grid gap-6 overflow-hidden rounded-card md:grid-cols-12 md:gap-10">
      <Spotlight className={GLOW} size={420} />
      {visual && size && (
        <figure className="md:col-span-7">
          <Image
            src={visual.src}
            alt={visual.alt}
            width={size.width}
            height={size.height}
            loading="lazy"
            sizes="(min-width: 1440px) 760px, (min-width: 768px) 56vw, 100vw"
            className="w-full rounded-card bg-surface-sunken"
          />
        </figure>
      )}
      <div className={visual ? 'flex flex-col justify-center md:col-span-5' : 'md:col-span-12'}>
        <Meta project={project} />
        <h3 className="mt-3 font-display text-[length:clamp(1.5rem,1.15rem+1.5vw,2.4rem)] leading-[1.08] font-semibold tracking-[-0.02em]">
          <ProjectLink project={project} />
        </h3>
        {project.recognition && <p className="mt-3 text-sm text-accent">{project.recognition}</p>}
        <p className="mt-4 max-w-[52ch] text-ink-2">{project.summary}</p>
        <dl className="mt-6 divide-y divide-rule border-t border-rule">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="flex items-baseline justify-between gap-4 py-2.5">
              <dt className="text-sm text-ink-2">{m.label}</dt>
              <dd className="text-metric shrink-0 text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}

function Panel({ project }: { project: Project }) {
  const hero = heroMetric(project.metrics)
  const rest = project.metrics.filter((m) => m !== hero).slice(0, 2)
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-card bg-surface-raised p-6 md:p-7">
      <Spotlight className={GLOW} size={300} />
      <Meta project={project} />
      {hero && (
        <p className="mt-6 flex flex-col-reverse">
          <span className="mt-2 text-sm text-ink-2">{hero.label}</span>
          <span className="text-metric text-[length:clamp(2.4rem,1.7rem+2.2vw,4rem)] leading-none font-medium tracking-tight text-ink">
            {hero.value}
          </span>
        </p>
      )}
      <h3 className="text-title mt-7">
        <ProjectLink project={project} />
      </h3>
      {project.recognition && <p className="mt-2 text-sm text-accent">{project.recognition}</p>}
      <p className="mt-3 max-w-[52ch] text-[0.95rem] text-ink-2">{project.summary}</p>
      {rest.length > 0 && (
        <div className="mt-auto pt-7">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-rule pt-5">
            {rest.map((m) => (
              <div key={m.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-ink-2">{m.label}</dt>
                <dd className="text-metric text-lg leading-tight text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </article>
  )
}

export function FeaturedWork() {
  const [lead, ...rest] = featuredProjects
  if (!lead) return null
  const total = profile.projects.length
  return (
    <Section
      id="work"
      title="Selected work"
      intro={`${featuredProjects.length} of ${total} projects, chosen for measured results across research, production systems and inference optimization.`}
      className="scroll-mt-16"
    >
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
        <Reveal as="li" className="md:col-span-12">
          <Lead project={lead} />
        </Reveal>
        {rest.map((project, i) => {
          const layout = LAYOUT[i % LAYOUT.length]
          return (
            <Reveal as="li" key={project.slug} delay={layout.delay} className={layout.span}>
              <Panel project={project} />
            </Reveal>
          )
        })}
      </ul>
      <div className="mt-10">
        <ButtonLink href="/projects" variant="ghost">
          All {total} projects
          <ArrowRight size={16} aria-hidden="true" />
        </ButtonLink>
      </div>
    </Section>
  )
}
