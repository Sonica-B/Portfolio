import { AddressBook, CalendarBlank, DownloadSimple } from '@phosphor-icons/react/dist/ssr'
import { profile } from '@/lib/content'
import { TrackLink } from '@/components/cta/actions'
import { CopyEmail } from '@/components/cta/copy-email'
import { splitEmail } from '@/components/cta/email'
import { ShareButton } from '@/components/cta/share-button'
import { Reveal } from '@/components/ui/reveal'

const VCARD = '/shreya-boyane.vcf'

/**
 * Closing band: one flat accent-soft field with the statement, the availability and every
 * action. The email is copied, never linked, so no mailto: reaches the HTML; every action
 * reports a cta_click through its component. Full-bleed, so it does not use the Section wrapper.
 */
export function ContactSection() {
  const { identity, links } = profile
  const { availability, location, headline } = identity
  // "Immediately" -> "immediately"; a dated start ("June 2027") keeps its capitals.
  const start = /^[A-Za-z]+$/.test(availability.startDate) ? availability.startDate.toLowerCase() : availability.startDate
  const authorization = availability.workAuthorization.split('. ')[0].replace(/\.?$/, '.')

  return (
    <section id="contact" aria-labelledby="contact-title" className=" bg-accent-soft">
      <Reveal className="container-site py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h2 id="contact-title" className="text-headline max-w-[20ch]">
              Full-time roles, starting {start}
            </h2>
            <p className="text-lead mt-5 max-w-[52ch] text-ink-2">{availability.display}.</p>
            <p className="text-status mt-4 max-w-[60ch]">
              {location.display}. {authorization}
            </p>
          </div>

          <div className="flex flex-wrap content-start gap-3 md:col-span-5 md:self-end md:justify-end">
            <CopyEmail parts={splitEmail(links.email)} location="contact" variant="primary" />
            <TrackLink href={links.scheduling} id="call" location="contact" variant="secondary">
              <CalendarBlank size={16} aria-hidden="true" />
              Book a call
            </TrackLink>
            <TrackLink href={links.resumePdf} id="resume" location="contact" variant="secondary" download>
              <DownloadSimple size={16} aria-hidden="true" />
              Download resume
            </TrackLink>
            <TrackLink href={VCARD} id="vcard" location="contact" variant="secondary" download>
              <AddressBook size={16} aria-hidden="true" />
              Download vCard
            </TrackLink>
            <ShareButton text={headline} location="contact" />
          </div>
        </div>

        <p className="mt-12 border-t border-rule-strong/40 pt-5 text-sm leading-snug text-ink-2">
          <span className="text-ink">Roles: </span>
          {availability.roles.join(', ')}
        </p>
      </Reveal>
    </section>
  )
}
