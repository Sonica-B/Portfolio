import Image from 'next/image'
import peopleRaw from '@/content/people.json'
import { profile, type Recommendation } from '@/lib/content'
import { Prose } from '@/components/glossary/prose'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'

type Person = {
  name: string
  slug: string
  headline: string
  title: string
  org: string
  linkedin: string
  photo: string | null
}

const PEOPLE = peopleRaw as Person[]
/** Portraits under public/people are 320 x 320. */
const PHOTO = 320
const EXCERPT_WORDS = 40

/** The first 40 words of the quote, with an ellipsis when it goes on. */
function excerpt(quote: string): string {
  const words = quote.trim().split(/\s+/)
  return words.length <= EXCERPT_WORDS ? words.join(' ') : `${words.slice(0, EXCERPT_WORDS).join(' ')}...`
}

/** "Amit Shinde" -> "AS", for entries without a photo. */
function monogram(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/** "a, b and c" without a serial comma, matching the site's house style. */
function listJoin(items: string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

/** 3:1 band crop of the portrait, grayscale at rest and colour on hover of the entry. */
function Band({ person, name }: { person: Person | undefined; name: string }) {
  if (person?.photo) {
    return (
      <Image
        src={person.photo}
        alt={`Portrait of ${name}`}
        width={PHOTO}
        height={PHOTO}
        sizes="320px"
        loading="lazy"
        className="h-full w-full object-cover [object-position:50%_38%] grayscale transition-[filter] duration-500 group-hover:grayscale-0 group-focus-within:grayscale-0"
      />
    )
  }
  return (
    <span aria-hidden="true" className="text-metric flex h-full w-full items-center justify-center text-2xl text-ink-2">
      {monogram(name)}
    </span>
  )
}

function Entry({ rec, seen }: { rec: Recommendation; seen: Set<string> }) {
  const person = rec.person ? PEOPLE.find((p) => p.slug === rec.person) : undefined
  const title = person ? `${person.title}, ${person.org}` : `${rec.role}, ${rec.org}`
  const org = person?.org ?? rec.org
  return (
    <figure className="group panel flex h-full flex-col p-4 md:p-5">
      <figcaption>
        <div className="frame-media aspect-[3/1] w-full overflow-hidden">
          <Band person={person} name={rec.name} />
        </div>
        <p className="mt-4 font-medium text-ink">
          {person?.linkedin ? (
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              {rec.name}
            </a>
          ) : (
            rec.name
          )}
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-ink-2">
          <Logo name={org} height={14} />
          <span>{title}</span>
        </p>
      </figcaption>
      <Prose as="blockquote" text={excerpt(rec.quote)} className="mt-3 text-base leading-snug text-ink-2" seen={seen} />
      <div className="mt-auto -ml-2 pt-4">
        <ButtonLink href="/about#recommendations" variant="ghost">
          Read in full
        </ButtonLink>
      </div>
    </figure>
  )
}

/**
 * A compact band of the recommendations: one snap rail, every entry a shallow portrait band,
 * name, current title and organization from people.json, then the first 40 words of the quote.
 * Renders whatever profile.json carries; entries without a portrait show a monogram.
 */
export function ColleaguesSection() {
  const recs = profile.recommendations
  if (recs.length === 0) return null
  const orgs = [...new Set(recs.map((r) => r.org))]
  // One glossary popover per term across the band.
  const seen = new Set<string>()
  return (
    <Section
      id="colleagues"
      title="What colleagues say"
      intro={`${recs.length} recommendations, from ${listJoin(orgs)}.`}
      className="scroll-mt-24"
    >
      <div
        role="region"
        aria-label={`Recommendations, ${recs.length} entries`}
        tabIndex={0}
        className="[--gutter:clamp(1rem,0.4rem+3vw,4rem)] mx-[calc(-1*var(--gutter))] snap-x snap-mandatory scroll-px-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-3 [scrollbar-width:thin]"
      >
        {/* The ::after item restores the end gutter, which overflowing flex children would otherwise drop. */}
        <ul className="flex items-stretch gap-3 after:block after:w-[calc(var(--gutter)-0.75rem)] after:shrink-0 after:content-['']">
          {recs.map((rec, i) => (
            <Reveal as="li" key={`${rec.person ?? rec.name}-${i}`} delay={Math.min(i * 20, 60)} className="w-[18rem] shrink-0 snap-start md:w-[22rem]">
              <Entry rec={rec} seen={seen} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
