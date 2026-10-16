import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import {
  KIND_LABEL,
  SITE_URL,
  formatMonth,
  formatRange,
  getExperience,
  getProject,
  getPublication,
  profile,
  projectSlugs,
  repoStats,
} from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, projectJsonLd, scholarlyArticleJsonLd, videoJsonLd } from '@/lib/jsonld'
import { cn } from '@/lib/utils'
import { Prose, ProseList } from '@/components/glossary/prose'
import { PITCH_POSTER, PITCH_SECONDS, hasPitch, pitchCaptionsSrc, pitchPosterSrc, pitchVideoSrc } from '@/components/reel/pitch-slugs'
import { PlayPitch } from '@/components/reel/play-pitch'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { Reveal } from '@/components/ui/reveal'
import { publicImageSize } from '@/components/projects/figure'
import { InstrumentSection } from '@/components/projects/instrument-section'
import { MetricStrip } from '@/components/projects/metric-strip'
import { PitchStrip } from '@/components/projects/pitch-strip'

export const dynamicParams = false

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return { title: 'Page not found' }
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { type: 'article', title: p.name, description: p.pitch.change, url: `/projects/${p.slug}` },
  }
}

const LINK_LABELS: [key: string, label: string][] = [
  ['demo', 'Live demo'],
  ['paper', 'Paper'],
  ['projectPage', 'Project page'],
  ['marketplace', 'VS Code Marketplace'],
  ['api', 'API Space'],
  ['openreview', 'OpenReview'],
]

// The kind beside the breadcrumb: text face at 14 px, sentence case, like the strip cell labels.
const KIND = 'text-sm leading-5 font-medium'
const NEIGHBOUR = 'group inline-block py-1'
const NEIGHBOUR_NAME = 'mt-1 block text-ink transition-colors group-hover:text-accent'

/** "Python, 2 stars, last push Feb 2026" from the GitHub snapshot; zero stars go unsaid. */
function repoLine(stats: NonNullable<ReturnType<typeof repoStats>>): string {
  const stars = stats.stars > 0 ? `${stats.stars} ${stats.stars === 1 ? 'star' : 'stars'}` : null
  return [stats.language, stars, `last push ${formatMonth(stats.pushedAt.slice(0, 7))}`].filter(Boolean).join(', ')
}

/** One block of the page body: spacing and the title step separate the blocks, and each fades in on entry. */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="py-6 md:py-8">
      <h2 className="text-title">{title}</h2>
      <div className="mt-3">{children}</div>
    </Reveal>
  )
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const total = profile.projects.length
  const index = profile.projects.findIndex((x) => x.slug === p.slug)
  const prev = index > 0 ? profile.projects[index - 1] : null
  const next = index >= 0 && index < total - 1 ? profile.projects[index + 1] : null
  const publication = getPublication(p.publicationId)
  const experience = getExperience(p.experienceId)
  const kind = KIND_LABEL[p.kind] ?? p.kind
  const pitch = hasPitch(p.slug)
  // VideoObject with the WebP poster as its thumbnail; the helper still names the jpg.
  const video = pitch ? videoJsonLd({ ...p, video: pitchVideoSrc(p.slug) }) : null
  const videoLd = video ? { ...video, thumbnailUrl: `${SITE_URL}${pitchPosterSrc(p.slug)}` } : null
  const stats = repoStats(p.repo)
  const links = LINK_LABELS.flatMap(([key, label]) => (p.links[key] ? [{ key, href: p.links[key], label }] : []))
  const visualSize = p.visual ? publicImageSize(p.visual.src) : null
  // One glossary popover per term across the strip, problem, approach and highlights.
  const seen = new Set<string>()

  return (
    <article className="container-site py-8 md:py-16">
      <JsonLd data={projectJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/projects' },
          { name: p.name, path: `/projects/${p.slug}` },
        ])}
      />
      {videoLd ? <JsonLd data={videoLd} /> : null}
      {publication ? <JsonLd data={scholarlyArticleJsonLd(publication)} /> : null}

      {/* One row even on phones: the name truncates so the kind stays beside it. */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-x-4 text-sm text-ink-2">
        <ol className="flex min-w-0 flex-1 items-center gap-x-2">
          <li className="shrink-0">
            <Link href="/projects" className="hover:text-ink">
              Work
            </Link>
          </li>
          <li aria-hidden="true" className="shrink-0">
            /
          </li>
          <li aria-current="page" className="min-w-0 truncate text-ink">
            {p.name}
          </li>
        </ol>
        <p className={cn(KIND, 'shrink-0 text-accent')}>{kind}</p>
      </nav>

      <header className="mt-6 md:mt-8">
        <h1 className="text-headline max-w-[28ch]">{p.name}</h1>
        <p className="text-lead mt-3 max-w-[60ch] text-ink-2">{p.subtitle}</p>
      </header>

      <PitchStrip pitch={p.pitch} seen={seen} className="mt-5 md:mt-8" />

      <Reveal className="mt-4 md:mt-6">
        <MetricStrip metrics={p.metrics} />
      </Reveal>

      <InstrumentSection project={p} visualSize={visualSize} />

      {pitch ? (
        <section aria-labelledby="pitch-heading" className="mt-10 md:mt-14">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="pitch-heading" className="text-title">
                {PITCH_SECONDS}-second pitch
              </h2>
              <PlayPitch slug={p.slug} label="Play in the reel" location="project" />
            </div>
            {/* Music only: the captions carry a [Music] cue and each scene's on-screen headline and key line. */}
            <video
              controls
              muted
              playsInline
              preload="none"
              poster={pitchPosterSrc(p.slug)}
              src={pitchVideoSrc(p.slug)}
              width={PITCH_POSTER.width}
              height={PITCH_POSTER.height}
              aria-label={`${p.name}, ${PITCH_SECONDS}-second pitch`}
              className="frame-media mt-4 w-full max-w-[960px]"
            >
              <track kind="captions" srcLang="en" label="English" src={pitchCaptionsSrc(p.slug)} default />
            </video>
          </Reveal>
        </section>
      ) : null}

      <div className="mt-6 grid gap-x-12 md:mt-10 md:grid-cols-12">
        <div className="md:col-span-7 lg:col-span-8">
          <Block title="Problem">
            <Prose text={p.problem} className="max-w-[65ch] text-ink-2" seen={seen} />
          </Block>
          <Block title="Approach">
            <Prose text={p.approach} className="max-w-[65ch] text-ink-2" seen={seen} />
          </Block>
          {p.highlights.length > 0 ? (
            <Block title="Highlights">
              <ProseList
                items={p.highlights}
                className="max-w-[65ch] space-y-3"
                itemClassName="text-ink-2"
                seen={seen}
              />
            </Block>
          ) : null}
        </div>

        <aside className="md:col-span-5 lg:col-span-4">
          {p.metrics.length > 0 ? (
            <Block title="Results">
              <dl className="divide-y divide-rule border-y border-rule">
                {p.metrics.map((m, i) => (
                  <div key={`${m.label}-${i}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 py-3">
                    <dt className="text-ink-2">{m.label}</dt>
                    <dd className="text-metric text-right text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          ) : null}

          <Block title="Stack">
            <ul className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full border border-rule px-3 py-1.5 text-sm text-ink-2">
                  {t}
                </li>
              ))}
            </ul>
          </Block>

          {p.repo || links.length > 0 ? (
            <Block title="Links">
              {p.repo ? (
                <div>
                  <ButtonLink href={p.repo}>Source on GitHub</ButtonLink>
                  {stats ? <p className="text-status mt-2">{repoLine(stats)}</p> : null}
                </div>
              ) : null}
              {links.length > 0 ? (
                <ul className={cn('flex flex-wrap gap-3', p.repo && 'mt-4')}>
                  {links.map((l) => (
                    <li key={l.key}>
                      <ButtonLink href={l.href} variant="secondary">
                        {l.label}
                      </ButtonLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Block>
          ) : null}

          <Block title="Details">
            <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-2">
              <dt className="text-ink-2">Timeline</dt>
              <dd className="tnum text-ink">{formatRange(p.start, p.end)}</dd>
              <dt className="text-ink-2">Affiliation</dt>
              <dd className="group flex flex-wrap items-center gap-x-2 gap-y-1 text-ink">
                <Logo name={p.affiliation} height={16} />
                <span>{p.affiliation}</span>
              </dd>
              {p.team.length > 0 ? (
                <>
                  <dt className="text-ink-2">Team</dt>
                  <dd className="text-ink">{p.team.join(', ')}</dd>
                </>
              ) : null}
              {p.recognition ? (
                <>
                  <dt className="text-ink-2">Recognition</dt>
                  <dd className="text-accent">{p.recognition}</dd>
                </>
              ) : null}
            </dl>
          </Block>

          {publication ? (
            <Block title="Related publication">
              <p className="text-ink">{publication.title}</p>
              <p className="mt-1 text-sm text-ink-2">{publication.displayString}</p>
              <Link
                href={`/research#${publication.id}`}
                className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm text-accent underline-offset-4 hover:underline"
              >
                Read on the research page
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Block>
          ) : null}

          {experience ? (
            <Block title="Related role">
              <p className="text-ink">{experience.role}</p>
              <p className="mt-1 text-sm text-ink-2">
                {experience.org}, {formatRange(experience.start, experience.end)}
              </p>
              {experience.award ? <p className="mt-1 text-sm text-accent">{experience.award}</p> : null}
              <Link
                href="/resume#experience"
                className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm text-accent underline-offset-4 hover:underline"
              >
                See the role on the resume
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Block>
          ) : null}
        </aside>
      </div>

      <nav aria-label="More projects" className="mt-10 grid gap-6 py-8 sm:grid-cols-[1fr_auto_1fr] sm:items-center md:mt-14">
        <div>
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className={NEIGHBOUR}>
              <span className="inline-flex items-center gap-1 text-sm text-ink-2">
                <ArrowLeft size={14} aria-hidden="true" />
                Previous
              </span>
              <span className={NEIGHBOUR_NAME}>{prev.name}</span>
            </Link>
          ) : null}
        </div>
        <div className="sm:text-center">
          <ButtonLink href="/projects" variant="secondary">
            All {total} projects
          </ButtonLink>
        </div>
        <div className="sm:text-right">
          {next ? (
            <Link href={`/projects/${next.slug}`} className={NEIGHBOUR}>
              <span className="inline-flex items-center gap-1 text-sm text-ink-2">
                Next
                <ArrowRight size={14} aria-hidden="true" />
              </span>
              <span className={NEIGHBOUR_NAME}>{next.name}</span>
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  )
}
