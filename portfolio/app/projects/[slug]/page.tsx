import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import {
  KIND_LABEL,
  formatRange,
  getExperience,
  getProject,
  getPublication,
  profile,
  projectSlugs,
  type Project,
} from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, projectJsonLd, scholarlyArticleJsonLd, videoJsonLd } from '@/lib/jsonld'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Figure } from '@/components/projects/figure'
import { MetricStrip } from '@/components/projects/metric-strip'

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
    openGraph: { type: 'article', title: p.name, description: p.summary, url: `/projects/${p.slug}` },
  }
}

const LINK_LABELS: [key: string, label: string][] = [
  ['paper', 'Paper'],
  ['projectPage', 'Project page'],
  ['demo', 'Live demo'],
  ['marketplace', 'VS Code Marketplace'],
  ['api', 'API Space'],
  ['openreview', 'OpenReview'],
  ['benchmark', 'Benchmark report'],
  ['pullRequest', '2026 rebuild pull request'],
]

/** Pitch videos are optional build-time assets: the block renders only when the file exists. */
function pitchVideo(slug: string): string | null {
  return fs.existsSync(path.join(process.cwd(), 'public', 'videos', `${slug}.mp4`)) ? `/videos/${slug}.mp4` : null
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="hairline py-8 md:py-10">
      <h2 className="text-title">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const index = profile.projects.findIndex((x) => x.slug === p.slug)
  const prev = index > 0 ? profile.projects[index - 1] : null
  const next = index >= 0 && index < profile.projects.length - 1 ? profile.projects[index + 1] : null
  const publication = getPublication(p.publicationId)
  const experience = getExperience(p.experienceId)
  const video = pitchVideo(p.slug)
  const withVideo: Project | null = video ? { ...p, video } : null
  const kind = KIND_LABEL[p.kind] ?? p.kind
  const links = [
    ...(p.repo ? [{ key: 'repo', href: p.repo, label: 'Source on GitHub' }] : []),
    ...LINK_LABELS.flatMap(([key, label]) => (p.links[key] ? [{ key, href: p.links[key], label }] : [])),
  ]

  return (
    <article className="container-site py-16 md:py-24">
      <JsonLd data={projectJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/projects' },
          { name: p.name, path: `/projects/${p.slug}` },
        ])}
      />
      {withVideo ? <JsonLd data={videoJsonLd(withVideo)} /> : null}
      {publication ? <JsonLd data={scholarlyArticleJsonLd(publication)} /> : null}

      <nav aria-label="Breadcrumb" className="text-sm text-ink-2">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/projects" className="hover:text-ink">
              Work
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {p.name}
          </li>
        </ol>
      </nav>

      <header className="mt-8 max-w-[72ch] md:mt-10">
        <p className="text-label text-accent">{kind}</p>
        <h1 className="text-display mt-4">{p.name}</h1>
        <p className="text-lead mt-5 text-ink-2">{p.subtitle}</p>
        <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 text-sm">
          <div>
            <dt className="text-ink-2">Timeline</dt>
            <dd className="mt-0.5 text-ink">{formatRange(p.start, p.end)}</dd>
          </div>
          <div>
            <dt className="text-ink-2">Affiliation</dt>
            <dd className="mt-0.5 text-ink">{p.affiliation}</dd>
          </div>
          {p.team.length > 0 ? (
            <div>
              <dt className="text-ink-2">Team</dt>
              <dd className="mt-0.5 text-ink">{p.team.join(', ')}</dd>
            </div>
          ) : null}
          {p.recognition ? (
            <div>
              <dt className="text-ink-2">Recognition</dt>
              <dd className="mt-0.5 text-accent">{p.recognition}</dd>
            </div>
          ) : null}
        </dl>
      </header>

      <Reveal className="mt-10 md:mt-14">
        <MetricStrip metrics={p.metrics} />
      </Reveal>

      <div className="mt-10 grid gap-x-10 md:mt-14 md:grid-cols-12">
        <div className="md:col-span-8">
          <Block title="What it is">
            <p className="text-lead max-w-[62ch] text-ink">{p.summary}</p>
          </Block>
          <Block title="Problem">
            <p className="max-w-[65ch] text-ink-2">{p.problem}</p>
          </Block>
          <Block title="Approach">
            <p className="max-w-[65ch] text-ink-2">{p.approach}</p>
          </Block>
          {p.highlights.length > 0 ? (
            <Block title="Highlights">
              <ol className="space-y-4">
                {p.highlights.map((h, i) => (
                  <li key={i} className="grid grid-cols-[2.5rem_minmax(0,1fr)]">
                    <span className="text-metric pt-0.5 text-sm text-ink-3" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="max-w-[62ch] text-ink-2">{h}</p>
                  </li>
                ))}
              </ol>
            </Block>
          ) : null}
          {p.visual ? (
            <Reveal className="hairline py-8 md:py-10">
              <Figure src={p.visual.src} alt={p.visual.alt} sizes="(min-width: 768px) 60vw, 100vw" />
            </Reveal>
          ) : null}
          {video ? (
            <figure className="hairline py-8 md:py-10">
              <video
                controls
                muted
                playsInline
                preload="none"
                poster={`/videos/${p.slug}.jpg`}
                src={video}
                width={1920}
                height={1080}
                className="w-full rounded-card bg-surface-sunken"
              />
              <figcaption className="mt-3 text-sm text-ink-2">25-second pitch</figcaption>
            </figure>
          ) : null}
        </div>

        <aside className="md:col-span-4">
          <Block title="Stack">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-2">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Block>
          {links.length > 0 ? (
            <Block title="Links">
              <ul className="flex flex-wrap gap-3">
                {links.map((l, i) => (
                  <li key={l.key}>
                    <ButtonLink href={l.href} variant={i === 0 ? 'primary' : 'secondary'}>
                      {l.label}
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}
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

      <nav aria-label="Previous and next project" className="hairline mt-4 grid gap-6 py-8 sm:grid-cols-2">
        <div>
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group inline-block py-1">
              <span className="inline-flex items-center gap-1 text-xs text-ink-2">
                <ArrowLeft size={14} aria-hidden="true" />
                Previous
              </span>
              <span className="mt-1 block text-ink group-hover:text-accent">{prev.name}</span>
            </Link>
          ) : null}
        </div>
        <div className="sm:text-right">
          {next ? (
            <Link href={`/projects/${next.slug}`} className="group inline-block py-1">
              <span className="inline-flex items-center gap-1 text-xs text-ink-2">
                Next
                <ArrowRight size={14} aria-hidden="true" />
              </span>
              <span className="mt-1 block text-ink group-hover:text-accent">{next.name}</span>
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  )
}
