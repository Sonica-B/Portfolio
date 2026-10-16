import { CalendarBlank, IdentificationCard } from '@phosphor-icons/react/dist/ssr'
import { profile } from '@/lib/content'
import { TrackLink } from '@/components/cta/actions'
import { CopyEmail } from '@/components/cta/copy-email'
import { splitEmail } from '@/components/cta/email'
import { PlayPitch } from '@/components/reel/play-pitch'
import { PITCH_SECONDS } from '@/components/reel/pitch-slugs'

const { identity, links } = profile
const { availability } = identity

/** The vCard route in app/shreya-boyane.vcf/route.ts. */
const VCARD = '/shreya-boyane.vcf'
const LOCATION = 'about-availability'

/** "open to relocation anywhere in the US" -> sentence case for a chip. */
const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function Chips({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <dt className="text-sm text-ink-2">{label}</dt>
      <dd className="mt-2">
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item} className="rounded-sm border border-rule px-2 py-1 font-mono text-sm leading-5 text-ink">
              {sentenceCase(item)}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  )
}

/** Availability panel: the open-to line, start date, roles and locations as mono chips, then the closing actions. */
export function Availability() {
  return (
    <div>
      <div className="panel p-4 md:p-5">
        <p className="text-lead max-w-[52ch] text-ink">{availability.display}.</p>
        <dl className="mt-5 space-y-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <dt className="text-sm text-ink-2">Start</dt>
            <dd className="text-metric text-ink">{availability.startDate}</dd>
          </div>
          <Chips label="Roles" items={availability.roles} />
          <Chips label="Locations" items={availability.locations} />
        </dl>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <TrackLink href={links.scheduling} id="call" location={LOCATION}>
          <CalendarBlank size={16} aria-hidden="true" />
          Book a call
        </TrackLink>
        <CopyEmail parts={splitEmail(links.email)} location={LOCATION} />
        <TrackLink href={VCARD} id="vcard" location={LOCATION} variant="secondary" download>
          <IdentificationCard size={16} aria-hidden="true" />
          Download vCard
        </TrackLink>
        <PlayPitch slug="latent-cot" label={`Watch a ${PITCH_SECONDS} s pitch`} location={LOCATION} />
      </div>
    </div>
  )
}
