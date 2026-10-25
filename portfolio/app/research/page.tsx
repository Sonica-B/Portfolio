import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { formatMonth, formatRange, profile, type Publication } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, scholarlyArticleJsonLd } from '@/lib/jsonld'
import { ButtonLink } from '@/components/ui/button'
import { Figure } from '@/components/projects/figure'

const { identity, publications, research } = profile

export const metadata: Metadata = {
  title: 'Research',
  description: `Publications by ${identity.name}: ${publications.map((p) => `${p.title} (${p.displayString})`).join('; ')}. Figures, author lists, findings and the research roles behind them.`,
  alternates: { canonical: '/research' },
}

const LINK_LABELS: [key: string, label: string][] = [
  ['paper', 'Paper'],
  ['projectPage', 'Project page'],
  ['code', 'Code'],
  ['openreview', 'OpenReview'],
]

function Authors({ pub }: { pub: Publication }) {
  const equal = pub.equalContribution
  return (
    <div className="mt-5">
      <ul aria-label="Authors" className="flex flex-wrap gap-x-1.5 gap-y-1 text-ink-2">
        {pub.authors.map((a, i) => {
          const me = a === identity.fullName
          const star = equal.includes(a)
          return (
            <li key={a} className={me ? 'font-medium text-ink' : undefined}>
              {a}
              {star ? (
                <>
                  <sup aria-hidden="true">*</sup>
                  <span className="sr-only"> (equal contribution)</span>
                </>
              ) : null}
              {i < pub.authors.length - 1 ? ',' : ''}
            </li>
          )
        })}
      </ul>
      {equal.length > 0 ? (
        <p className="mt-2 text-xs text-ink-2">
          <sup aria-hidden="true">*</sup> Equal contribution
        </p>
      ) : null}
      <p className="mt-2 text-sm text-ink-2">{pub.affiliations.join(', ')}</p>
    </div>
  )
}

function PublicationArticle({ pub }: { pub: Publication }) {
  const links = LINK_LABELS.flatMap(([key, label]) => (pub.links[key] ? [{ key, href: pub.links[key], label }] : []))
  return (
    <article id={pub.id} aria-labelledby={`${pub.id}-title`} className="hairline scroll-mt-24 py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-8">
          <p className="text-sm text-ink-2">
            <span>{pub.displayString}</span>
            <span aria-hidden="true" className="mx-2">
              &middot;
            </span>
            <span>{formatMonth(pub.date)}</span>
          </p>
          <h2 id={`${pub.id}-title`} className="text-headline mt-3">
            {pub.title}
          </h2>
          <p className="mt-4">
            <a
              href={pub.venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1 text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              <span>{pub.venueFull}</span>
              <ArrowUpRight size={16} className="mt-1 shrink-0" aria-hidden="true" />
            </a>
          </p>

          <Authors pub={pub} />

          <dl className="mt-6 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-[auto_minmax(0,1fr)]">
            <dt className="text-ink-2">Role</dt>
            <dd className="text-ink">{pub.role}</dd>
            <dt className="text-ink-2">Status</dt>
            <dd className="text-ink">{pub.status}</dd>
            {pub.review ? (
              <>
                <dt className="text-ink-2">Review</dt>
                <dd className="text-ink">{pub.review}</dd>
              </>
            ) : null}
          </dl>

          <p className="text-lead mt-8 max-w-[62ch] text-ink">{pub.tldr}</p>

          <h3 className="text-title mt-10">Abstract</h3>
          <p className="mt-3 max-w-[70ch] text-ink-2">{pub.abstract}</p>

          <h3 className="text-title mt-10">Findings</h3>
          <ol className="mt-4 space-y-3">
            {pub.findings.map((f, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_minmax(0,1fr)]">
                <span className="text-metric pt-0.5 text-sm text-ink-3" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="max-w-[65ch] text-ink-2">{f}</p>
              </li>
            ))}
          </ol>

          {links.length > 0 ? (
            <ul className="mt-10 flex flex-wrap gap-3">
              {links.map((l) => (
                <li key={l.key}>
                  <ButtonLink href={l.href} variant={l.key === 'paper' ? 'primary' : 'secondary'}>
                    {l.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <aside className="md:col-span-4">
          <h3 className="text-title">By the numbers</h3>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {pub.stats.map((s) => (
              <li key={s} className="tnum py-3 text-sm text-ink-2">
                {s}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {pub.figures.length > 0 ? (
        <div className="mt-12">
          <h3 className="text-title">Figures</h3>
          <div className="mt-5 grid gap-8 sm:grid-cols-2">
            {pub.figures.map((f) => (
              <Figure key={f.src} src={f.src} alt={f.alt} caption={f.caption} sizes="(min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  )
}

export default function ResearchPage() {
  return (
    <div className="container-site py-16 md:py-24">
      {publications.map((pub) => (
        <JsonLd key={pub.id} data={scholarlyArticleJsonLd(pub)} />
      ))}
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Research', path: '/research' }])} />

      <header className="max-w-[64ch]">
        <h1 className="text-display">Research</h1>
        <p className="text-lead mt-5 text-ink-2">
          Both papers in full, with authors, venues, findings, figures and the numbers behind them, followed by the
          research roles they came from.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        {publications.map((pub) => (
          <PublicationArticle key={pub.id} pub={pub} />
        ))}
      </div>

      <section id="roles" aria-labelledby="roles-title" className="hairline scroll-mt-24 py-12 md:py-16">
        <h2 id="roles-title" className="text-headline">
          Research roles
        </h2>
        <ol className="mt-8 divide-y divide-rule border-t border-rule">
          {research.map((r) => (
            <li key={r.id} className="grid gap-6 py-8 md:grid-cols-12 md:gap-x-10">
              <div className="md:col-span-4">
                <h3 className="text-title">{r.title}</h3>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div>
                    <dt className="sr-only">Organization</dt>
                    <dd className="text-ink">{r.org}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Role</dt>
                    <dd className="text-ink-2">{r.role}</dd>
                  </div>
                  {r.advisor ? (
                    <div className="flex gap-2">
                      <dt className="text-ink-2">Advisor</dt>
                      <dd className="text-ink">{r.advisor}</dd>
                    </div>
                  ) : null}
                  {r.grant ? (
                    <div className="flex gap-2">
                      <dt className="text-ink-2">Grant</dt>
                      <dd className="text-ink">{r.grant}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="sr-only">Dates</dt>
                    <dd className="text-ink-2">{formatRange(r.start, r.end)}</dd>
                  </div>
                </dl>
              </div>
              <div className="md:col-span-8">
                <p className="max-w-[65ch] text-ink">{r.summary}</p>
                <ul className="mt-4 space-y-3">
                  {r.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="relative max-w-[65ch] pl-5 text-ink-2 before:absolute before:top-[0.75em] before:left-0 before:h-px before:w-2.5 before:bg-rule-strong"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/projects/${r.projectSlug}`}
                  className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm text-accent underline-offset-4 hover:underline"
                >
                  Project details
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
