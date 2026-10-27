import type { Metadata } from 'next'
import { formatMonth, formatRange, profile } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { ButtonLink } from '@/components/ui/button'
import { PrintButton } from './print-button'

const { identity, links, experience, research, education, publications, skills, recognition, openSource } = profile

export const metadata: Metadata = {
  title: 'Resume',
  description: `Resume of ${identity.name}, ${identity.title}: ${experience.length} roles, ${research.length} research positions, ${publications.length} publications, degrees from ${education.map((e) => e.abbr).join(' and ')}, and skills across ${Object.keys(skills).length} areas. Download the PDF or print this page.`,
  alternates: { canonical: '/resume' },
}

// Hoisted into <head> by React; forces a white page with black text and hides site chrome when printing.
const PRINT_CSS = `
@page { margin: 14mm; }
@media print {
  :root, [data-theme="light"], [data-theme="dark"] {
    --surface: #fff; --surface-raised: #fff; --surface-sunken: #fff;
    --rule: #c9c9c9; --rule-strong: #9a9a9a;
    --ink: #000; --ink-2: #222; --ink-3: #444;
    --accent: #000; --accent-ink: #fff; --accent-soft: transparent;
    --grain-opacity: 0; color-scheme: light;
  }
  body { background: #fff !important; color: #000 !important; }
  body > header, body > footer, body > a[href="#main"], body > div[aria-hidden="true"] { display: none !important; }
  a { color: inherit; text-decoration: none; }
}
`

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
const topRecognition = recognition.slice(0, 10)

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="hairline scroll-mt-24 py-8 print:py-4">
      <h2 id={`${id}-title`} className="text-title print:text-lg">
        {title}
      </h2>
      <div className="mt-4 print:mt-2">{children}</div>
    </section>
  )
}

export default function ResumePage() {
  return (
    <div className="container-site py-16 md:py-24 print:bg-white print:py-0 print:text-black">
      <style href="resume-print" precedence="default">
        {PRINT_CSS}
      </style>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Resume', path: '/resume' }])} />

      <div className="flex flex-wrap gap-3 print:hidden">
        <ButtonLink href={links.resumePdf} download>
          Download PDF
        </ButtonLink>
        <PrintButton />
      </div>

      <article className="mt-10 max-w-[80ch] print:mt-0 print:max-w-none">
        <header className="pb-8 print:pb-4">
          <h1 className="text-display print:text-4xl">{identity.name}</h1>
          <p className="text-lead mt-3 text-ink-2 print:mt-1">{identity.title}</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-2 print:mt-3">
            <li>{identity.location.display}</li>
            <li>
              <a href={links.email} className="hover:text-ink">
                {identity.email}
              </a>
            </li>
            <li>
              <a href={links.website} className="hover:text-ink">
                {host(links.website)}
              </a>
            </li>
            <li>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                {host(links.linkedin)}
              </a>
            </li>
            <li>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                {host(links.github)}
              </a>
            </li>
          </ul>
        </header>

        <Section id="summary" title="Summary">
          <p className="text-ink-2">{identity.summary}</p>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="space-y-7 print:space-y-4">
            {experience.map((e) => (
              <li key={e.id} className="print:break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-medium text-ink">{e.role}</h3>
                  <p className="text-metric text-sm text-ink-2">{formatRange(e.start, e.end)}</p>
                </div>
                <p className="mt-0.5 text-sm text-ink-2">
                  {e.orgUrl ? (
                    <a href={e.orgUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                      {e.org}
                    </a>
                  ) : (
                    e.org
                  )}
                  , {e.location}. {e.type}.
                </p>
                {e.award ? <p className="mt-1 text-sm text-accent">{e.award}</p> : null}
                <p className="mt-2 text-sm text-ink-2">{e.summary}</p>
                {e.highlights.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-2 marker:text-ink-3">
                    {e.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                ) : null}
                {e.advisors?.length ? <p className="mt-2 text-sm text-ink-2">Advisors: {e.advisors.join(', ')}.</p> : null}
                {e.presented ? <p className="mt-1 text-sm text-ink-2">Presented at the {e.presented}.</p> : null}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="research" title="Research">
          <ol className="space-y-7 print:space-y-4">
            {research.map((r) => (
              <li key={r.id} className="print:break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-medium text-ink">{r.title}</h3>
                  <p className="text-metric text-sm text-ink-2">{formatRange(r.start, r.end)}</p>
                </div>
                <p className="mt-0.5 text-sm text-ink-2">
                  {r.role}, {r.org}
                  {r.advisor ? `. Advisor: ${r.advisor}` : ''}
                  {r.grant ? `. ${r.grant}` : ''}.
                </p>
                <p className="mt-2 text-sm text-ink-2">{r.summary}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-2 marker:text-ink-3">
                  {r.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="education" title="Education">
          <ol className="space-y-6 print:space-y-3">
            {education.map((e) => (
              <li key={e.id} className="print:break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-medium text-ink">{e.institution}</h3>
                  <p className="text-metric text-sm text-ink-2">{formatRange(e.start, e.end)}</p>
                </div>
                <p className="mt-0.5 text-sm text-ink-2">
                  {e.degree}, {e.field}. {e.location}. GPA {e.gpa}/{e.gpaScale}.
                </p>
                {e.honors.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-2 marker:text-ink-3">
                    {e.honors.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="publications" title="Publications">
          <ol className="space-y-5 print:space-y-3">
            {publications.map((p) => {
              const href = p.links.paper ?? p.venueUrl
              return (
                <li key={p.id} className="print:break-inside-avoid">
                  <h3 className="font-medium text-ink">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {p.title}
                    </a>
                  </h3>
                  <p className="mt-0.5 text-sm text-ink-2">
                    {p.authors.map((a, i) => (
                      <span key={a} className={a === identity.fullName ? 'text-ink' : undefined}>
                        {a}
                        {p.equalContribution.includes(a) ? '*' : ''}
                        {i < p.authors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-2">
                    {p.displayString}, {formatMonth(p.date)}.
                  </p>
                </li>
              )
            })}
          </ol>
          <p className="mt-3 text-xs text-ink-2">* Equal contribution.</p>
        </Section>

        <Section id="open-source" title="Open source">
          <p className="max-w-[72ch] text-sm text-ink-2">{openSource.summary}</p>
          <ol className="mt-3 divide-y divide-rule">
            {openSource.merged.map((m) => (
              <li key={m.url} className="grid gap-x-6 gap-y-0.5 py-2.5 text-sm sm:grid-cols-[6rem_minmax(0,1fr)] print:py-1.5">
                <p className="text-metric text-ink-2">Merged</p>
                <p className="text-ink">
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {m.title}
                  </a>
                  <span className="text-ink-2">
                    , {m.org} {m.repo} #{m.number}
                  </span>
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-3 max-w-[72ch] text-sm text-ink-2">In review at {openSource.inReview.join(', ')}.</p>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[14rem_minmax(0,1fr)]">
            {Object.entries(skills).map(([group, list]) => (
              <div key={group} className="contents">
                <dt className="text-ink">{group}</dt>
                <dd className="text-ink-2">{list.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="recognition" title="Recognition">
          <ol className="divide-y divide-rule">
            {topRecognition.map((r) => (
              <li key={r.id} className="grid gap-x-6 gap-y-0.5 py-2.5 text-sm sm:grid-cols-[6rem_minmax(0,1fr)] print:py-1.5">
                <p className="text-metric text-ink-2">{formatMonth(r.date)}</p>
                <p className="text-ink">
                  {r.title}
                  <span className="text-ink-2">, {r.org}</span>
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </article>
    </div>
  )
}
