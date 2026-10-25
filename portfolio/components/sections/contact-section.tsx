import { profile } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'

/** Closing call to action. Full-bleed raised band, so it does not use the shared Section wrapper. */
export function ContactSection() {
  const { identity, links } = profile
  const { availability, location } = identity
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 bg-surface-raised">
      <Reveal className="container-site py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-8">
          <div className="md:col-span-7 md:row-start-1">
            <h2 id="contact-title" className="text-headline max-w-[18ch]">
              Hiring for ML, computer vision or inference work?
            </h2>
            <p className="text-lead mt-5 max-w-[46ch] text-ink-2">{availability.display}.</p>
          </div>

          <dl className="space-y-5 text-sm md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:pt-2 lg:col-span-4 lg:col-start-9">
            <div>
              <dt className="text-xs text-ink-3">Work authorization</dt>
              <dd className="mt-1 text-ink-2">{availability.workAuthorization}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-3">Location</dt>
              <dd className="mt-1 text-ink-2">{location.display}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-3">Start date</dt>
              <dd className="mt-1 text-ink-2">{availability.startDate}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3 md:col-span-7 md:row-start-2">
            <ButtonLink href={links.email}>Email me</ButtonLink>
            <ButtonLink href={links.scheduling} variant="secondary">
              Book a call
            </ButtonLink>
          </div>
        </div>

        <p className="mt-12 border-t border-rule pt-5 text-sm text-ink-2">
          <span className="text-ink">Roles: </span>
          {availability.roles.join(', ')}
        </p>
      </Reveal>
    </section>
  )
}
