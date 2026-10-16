import Image from 'next/image'
import peopleRaw from '@/content/people.json'
import { profile, type Recommendation } from '@/lib/content'
import { cn } from '@/lib/utils'
import { publicImageSize } from '@/components/sections/featured-work'
import { Prose } from '@/components/glossary/prose'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { lead } from './text'

/** One entry of content/people.json: who the recommender is today, with a LinkedIn portrait. */
type Person = { name: string; slug: string; headline: string; title: string; org: string; linkedin: string; photo: string }

const PEOPLE = new Map((peopleRaw as Person[]).map((p) => [p.slug, p]))

/** "Amit Shinde" -> "AS", for entries without a portrait. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()

/** Shallow band across eyes and shoulders: fixed height, cover crop, square corners, one hairline. */
const BAND = 'frame-media relative h-21 w-full max-w-[21rem] overflow-hidden md:h-28'

function Band({ person, name }: { person: Person | undefined; name: string }) {
  if (!person) {
    return (
      <div aria-hidden="true" className={cn(BAND, 'flex items-center justify-center')}>
        <span className="font-mono text-2xl text-ink-2">{initials(name)}</span>
      </div>
    )
  }
  const size = publicImageSize(person.photo)
  return (
    <div className={BAND}>
      <Image
        src={person.photo}
        alt={person.name}
        width={size.width}
        height={size.height}
        loading="lazy"
        sizes="(min-width: 640px) 336px, 100vw"
        className="h-full w-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
        style={{ objectPosition: '50% 30%' }}
      />
    </div>
  )
}

function Entry({ r, index }: { r: Recommendation; index: number }) {
  const person = r.person ? PEOPLE.get(r.person) : undefined
  // Each quote explains a term once.
  const seen = new Set<string>()
  const { lead: opening, rest } = lead(r.quote)
  const name = person?.name ?? r.name
  const now = person ? [person.title, person.org].filter(Boolean).join(', ') : ''
  const relation = [r.role, r.org].filter(Boolean).join(' at ')

  return (
    <Reveal as="li" delay={Math.min(index * 30, 90)} className="group min-w-0">
      <Band person={person} name={name} />
      <p className="mt-3 text-sm">
        <span className="text-ink">{name}</span>
        {now ? <span className="text-ink-2">, {now}</span> : null}
      </p>
      {relation ? <p className="mt-0.5 text-sm text-ink-2">{relation}</p> : null}
      <blockquote className="mt-3 max-w-[21rem]">
        <Prose text={opening} seen={seen} className="text-ink" />
        {rest ? (
          <details className="group/more">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center text-sm text-accent underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
              <span className="group-open/more:hidden">Read more</span>
              <span className="hidden group-open/more:inline">Read less</span>
            </summary>
            <Prose text={rest} seen={seen} className="text-ink" />
          </details>
        ) : null}
      </blockquote>
      {person ? (
        <ButtonLink href={person.linkedin} variant="ghost" className="mt-2 -ml-2">
          View on LinkedIn
        </ButtonLink>
      ) : null}
    </Reveal>
  )
}

/**
 * Shallow portrait bands side by side, each with its small quote. Columns are sized to the band
 * (18 to 21 rem, as many as fit) so the 320 px sources are never stretched and no column is left empty.
 */
export function Recommendations() {
  const { recommendations, links } = profile
  return (
    <div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(18rem,100%),21rem))] gap-x-3 gap-y-8">
        {recommendations.map((r, i) => (
          <Entry key={`${r.name}-${i}`} r={r} index={i} />
        ))}
      </ul>
      <div className="mt-6">
        <ButtonLink href={links.linkedin} variant="ghost" className="-ml-2">
          Full recommendations on LinkedIn
        </ButtonLink>
      </div>
    </div>
  )
}
