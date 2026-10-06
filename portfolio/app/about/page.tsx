import type { Metadata } from 'next'
import Image from 'next/image'
import { formatMonth, formatRange, profile, type Recognition } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { ButtonLink } from '@/components/ui/button'

const { identity, links, education, recognition, leadership, recommendations, certifications, activity } = profile
const { availability } = identity

export const metadata: Metadata = {
  title: 'About',
  description: `About ${identity.name}: ${identity.headline}. Based in ${identity.location.display}. ${availability.display}.`,
  alternates: { canonical: '/about' },
}

/** Splits prose on sentence boundaries without breaking abbreviations such as "M.S.". */
function sentences(text: string): string[] {
  return text
    .split(/(?<=[a-z0-9)])\.\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith('.') ? s : `${s}.`))
}

const KIND_ORDER = ['award', 'honor', 'fellowship', 'publication', 'competition', 'certification']
const KIND_HEADING: Record<string, string> = {
  award: 'Awards',
  honor: 'Honors',
  fellowship: 'Fellowships',
  publication: 'Publications',
  competition: 'Competitions',
  certification: 'Certifications',
}

function groupRecognition(items: Recognition[]) {
  const groups = KIND_ORDER.map((kind) => ({
    kind,
    heading: KIND_HEADING[kind],
    items: items.filter((r) => r.kind === kind),
  }))
  const other = items.filter((r) => !KIND_ORDER.includes(r.kind))
  if (other.length) groups.push({ kind: 'other', heading: 'Other', items: other })
  return groups.filter((g) => g.items.length > 0)
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function Block({
  id,
  title,
  intro,
  wide = false,
  children,
}: {
  id: string
  title: string
  intro?: string
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="hairline scroll-mt-24 py-12 md:py-16">
      <div className={wide ? undefined : 'grid gap-8 md:grid-cols-12 md:gap-x-10'}>
        <div className={wide ? 'max-w-[64ch]' : 'md:col-span-4'}>
          <h2 id={`${id}-title`} className="text-headline">
            {title}
          </h2>
          {intro ? <p className="mt-3 text-ink-2">{intro}</p> : null}
        </div>
        <div className={wide ? 'mt-8' : 'md:col-span-8'}>{children}</div>
      </div>
    </section>
  )
}

function Ledger<T>({ items, keyOf, children }: { items: T[]; keyOf: (t: T) => string; children: (t: T) => React.ReactNode }) {
  return (
    <ol className="divide-y divide-rule border-t border-rule">
      {items.map((it) => (
        <li key={keyOf(it)} className="grid gap-1 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
          {children(it)}
        </li>
      ))}
    </ol>
  )
}

export default function AboutPage() {
  const bio = sentences(identity.summary)
  const lead = bio[0]
  const rest = bio.slice(1).join(' ')
  const groups = groupRecognition(recognition)

  return (
    <div className="container-site py-16 md:py-24">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />

      <header className="grid gap-10 md:grid-cols-12 md:items-start md:gap-x-10">
        <div className="md:col-span-7">
          <h1 className="text-display">About Shreya</h1>
          <p className="text-lead mt-6 max-w-[58ch] text-ink">{lead}</p>
          {rest ? <p className="mt-4 max-w-[62ch] text-ink-2">{rest}</p> : null}
          <p className="mt-4 max-w-[62ch] text-ink-2">{identity.tagline}</p>
          <dl className="mt-8 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-ink-2">Location</dt>
              <dd className="mt-1 text-ink">{identity.location.display}</dd>
            </div>
            <div>
              <dt className="text-ink-2">Pronouns</dt>
              <dd className="mt-1 text-ink">{identity.pronouns}</dd>
            </div>
            <div>
              <dt className="text-ink-2">Languages</dt>
              <dd className="mt-1 text-ink">{identity.languages.join(', ')}</dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-5">
          <Image
            src="/ShreyaPro.jpg"
            alt="Shreya Boyane, professional portrait"
            width={1553}
            height={1078}
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="w-full rounded-card bg-surface-raised"
            style={{ height: 'auto' }}
          />
        </div>
      </header>

      <div className="mt-12 md:mt-16">
        <Block id="availability" title="Availability">
          <p className="text-lead text-ink">{availability.display}.</p>
          <p className="mt-4 max-w-[65ch] text-ink-2">{availability.workAuthorization}</p>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm text-ink-2">Start date</dt>
              <dd className="mt-1 text-ink">{availability.startDate}</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-2">Roles</dt>
              <dd className="mt-2">
                <ul className="space-y-1.5 text-ink">
                  {availability.roles.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-2">Locations</dt>
              <dd className="mt-2">
                <ul className="space-y-1.5 text-ink">
                  {availability.locations.map((l) => (
                    <li key={l}>{capitalize(l)}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={links.email}>Email me</ButtonLink>
            <ButtonLink href={links.scheduling} variant="secondary">
              Book a call
            </ButtonLink>
          </div>
        </Block>

        <Block id="education" title="Education">
          <ol className="divide-y divide-rule">
            {education.map((e) => (
              <li key={e.id} className="py-6 first:pt-0 last:pb-0">
                <h3 className="text-title">
                  <a href={e.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {e.institution}
                  </a>
                </h3>
                <p className="mt-2 text-ink">
                  {e.degree}, {e.field}
                </p>
                <p className="mt-1 text-sm text-ink-2">
                  {e.location}. {formatRange(e.start, e.end)}. GPA {e.gpa}/{e.gpaScale}.
                </p>
                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-ink-2">Coursework</dt>
                    <dd className="mt-1 text-ink">{e.coursework.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-2">Honors</dt>
                    <dd className="mt-1">
                      <ul className="space-y-1 text-ink">
                        {e.honors.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </Block>

        <Block id="recognition" title="Recognition">
          <div className="space-y-10">
            {groups.map((g) => (
              <div key={g.kind}>
                <h3 className="text-title">{g.heading}</h3>
                <div className="mt-4">
                  <Ledger items={g.items} keyOf={(r) => r.id}>
                    {(r) => (
                      <>
                        <p className="text-metric text-sm text-ink-2">{formatMonth(r.date)}</p>
                        <div>
                          <p className="text-ink">{r.title}</p>
                          <p className="mt-0.5 text-sm text-ink-2">{r.org}</p>
                          {r.note ? <p className="mt-1.5 max-w-[62ch] text-sm text-ink-2">{r.note}</p> : null}
                        </div>
                      </>
                    )}
                  </Ledger>
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block id="leadership" title="Leadership and community">
          <Ledger items={leadership} keyOf={(l) => l.title}>
            {(l) => (
              <>
                <p className="text-metric text-sm text-ink-2">{l.date}</p>
                <div>
                  <p className="text-ink">{l.title}</p>
                  <p className="mt-0.5 text-sm text-ink-2">{l.org}</p>
                  <p className="mt-1.5 max-w-[62ch] text-sm text-ink-2">{l.note}</p>
                </div>
              </>
            )}
          </Ledger>
        </Block>

        <Block id="recommendations" title="What colleagues say" wide>
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {recommendations.map((r) => (
              <figure key={r.name} className="border-l-2 border-accent pl-5">
                <blockquote className="line-clamp-4 text-ink">
                  {'“'}
                  {r.quote}
                  {'”'}
                </blockquote>
                <figcaption className="mt-4 text-sm text-ink-2">
                  <span className="text-ink">{r.name}</span>, {r.role}, {r.org}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-2">
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
              Full recommendations on LinkedIn
            </a>
          </p>
        </Block>

        <Block id="certifications" title="Certifications" intro={`${certifications.length} certificates and badges, newest first.`} wide>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {certifications.map((c) => (
              <li key={`${c.title}-${c.date}`}>
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={`${c.title}, ${c.issuer}`}
                    width={640}
                    height={452}
                    loading="lazy"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="w-full rounded-card bg-surface-raised"
                    style={{ height: 'auto' }}
                  />
                ) : (
                  <div aria-hidden="true" className="flex aspect-[640/452] items-center justify-center rounded-card bg-surface-raised p-4 text-center">
                    <span className="font-display text-sm font-semibold text-ink-2">{c.title}</span>
                  </div>
                )}
                <p className="mt-3 text-sm text-ink">{c.title}</p>
                <p className="mt-0.5 text-xs text-ink-2">{c.issuer}</p>
                <p className="mt-0.5 text-xs text-ink-2">{formatMonth(c.date)}</p>
                {c.credentialId ? <p className="mt-1 font-mono text-[0.7rem] text-ink-2">Credential {c.credentialId}</p> : null}
              </li>
            ))}
          </ul>
        </Block>

        <Block id="activity" title="Activity">
          <Ledger items={activity} keyOf={(a) => `${a.date}-${a.title}`}>
            {(a) => (
              <>
                <p className="text-metric text-sm text-ink-2">{formatMonth(a.date)}</p>
                <div>
                  <p className="text-ink">{a.title}</p>
                  <p className="mt-0.5 text-sm text-ink-2">
                    {capitalize(a.type)}
                    {a.location ? `, ${a.location}` : ''}
                  </p>
                  {a.note ? <p className="mt-1.5 max-w-[62ch] text-sm text-ink-2">{a.note}</p> : null}
                </div>
              </>
            )}
          </Ledger>
        </Block>
      </div>
    </div>
  )
}
