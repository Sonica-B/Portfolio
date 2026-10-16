import Image from 'next/image'
import Link from 'next/link'
import { formatMonth, profile } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { Prose } from '@/components/glossary/prose'
import { publicImageSize } from '@/components/sections/featured-work'

const LINKS: { key: string; label: string }[] = [
  { key: 'paper', label: 'Paper' },
  { key: 'projectPage', label: 'Project page' },
  { key: 'code', label: 'Code' },
]

/** "a, b and c" without a serial comma, matching the site's house style. */
function listJoin(items: string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

export function ResearchSection() {
  const pubs = profile.publications
  const me = profile.identity.fullName
  const figure = pubs[0]?.figures[0]
  const figureSize = figure ? publicImageSize(figure.src) : null
  const hasEqual = pubs.some((p) => p.equalContribution.length > 0)
  const topics = pubs.map((p) => p.tags[0]).filter(Boolean)
  // One glossary popover per term across the section.
  const seen = new Set<string>()

  return (
    <Section
      id="research"
      title="Research"
      label="Publications"
      intro={`${pubs.length} papers as co-first author, on ${listJoin(topics)}.`}
      className="scroll-mt-16"
    >
      <ol className="border-t border-rule">
        {pubs.map((pub, i) => {
          const showFigure = i === 0
          return (
            <Reveal
              as="li"
              key={pub.id}
              delay={Math.min(i * 30, 60)}
              className="grid gap-6 border-b border-rule py-10 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-3 lg:col-span-2">
                <p className="text-sm text-ink">{pub.displayString}</p>
                <p className="text-metric mt-1 text-xs text-ink-3">{formatMonth(pub.date)}</p>
              </div>

              <div className={showFigure ? 'md:col-span-9 lg:col-span-6' : 'md:col-span-9 lg:col-span-8'}>
                <h3 className="text-title max-w-[30ch]">
                  <Link href="/research" className="transition-colors hover:text-accent">
                    {pub.title}
                  </Link>
                </h3>
                <Prose text={pub.tldr} className="mt-3 max-w-[62ch] text-ink-2" seen={seen} />
                <p className="mt-4 max-w-[62ch] text-sm text-ink-2">
                  {pub.authors.map((name, j) => (
                    <span key={name}>
                      <span className={name === me ? 'font-medium text-ink' : undefined}>{name}</span>
                      {pub.equalContribution.includes(name) ? '*' : ''}
                      {j < pub.authors.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <ul className="text-metric mt-5 grid gap-x-6 gap-y-1.5 text-[0.8rem] text-ink-2 sm:grid-cols-2">
                  {pub.stats.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="mt-5 -ml-2 flex flex-wrap gap-x-1 gap-y-1">
                  {LINKS.filter((l) => pub.links[l.key]).map((l) => (
                    <ButtonLink key={l.key} href={pub.links[l.key]} variant="ghost">
                      {l.label}
                    </ButtonLink>
                  ))}
                </div>
              </div>

              {showFigure && figure && figureSize && (
                <figure className="hidden lg:col-span-4 lg:block">
                  <Image
                    src={figure.src}
                    alt={figure.alt}
                    width={figureSize.width}
                    height={figureSize.height}
                    loading="lazy"
                    sizes="(min-width: 1440px) 420px, 30vw"
                    className="w-full rounded-card bg-surface-sunken"
                  />
                  <figcaption className="mt-2 text-xs text-ink-2">{figure.caption}</figcaption>
                </figure>
              )}
            </Reveal>
          )
        })}
      </ol>
      {hasEqual && <p className="mt-4 text-xs text-ink-2">* equal contribution</p>}
    </Section>
  )
}
