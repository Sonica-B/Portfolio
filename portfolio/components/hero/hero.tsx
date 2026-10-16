import { CalendarBlank, DownloadSimple } from '@phosphor-icons/react/dist/ssr'
import { getPublication, profile } from '@/lib/content'
import { getLogo } from '@/lib/logos'
import { Logo } from '@/components/ui/logo'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { DepthPortrait } from '@/components/hero/depth-portrait'
import { TrackLink, WatchPitch } from '@/components/cta/actions'
import { CopyEmail } from '@/components/cta/copy-email'
import { splitEmail } from '@/components/cta/email'

/** First candidate with a sourced logo in content/logos.json; the text label is always printed. */
function pickLogo(names: (string | undefined)[]): string | undefined {
  const present = names.filter((n): n is string => Boolean(n))
  return present.find((n) => getLogo(n)) ?? present[0]
}

/** The four names a recruiter recognizes, each an organization string from profile.json. */
function proofMarks(): { label: string; logo?: string }[] {
  const icml = getPublication('latent-cot')
  const golden = profile.recognition.find((r) => r.id === 'golden-ticket')
  const community = profile.leadership.find((l) => l.org.includes('NVIDIA'))
  const wpi = profile.education.find((e) => e.id === 'wpi')
  const persistent = profile.experience.find((e) => e.id === 'persistent-lead')
  const marks: ({ label: string; logo?: string } | undefined)[] = [
    icml && { label: icml.venue, logo: pickLogo([icml.venue, icml.venueFull]) },
    community && { label: community.org, logo: pickLogo([community.org, golden?.org, 'NVIDIA', 'Google Cloud']) },
    wpi && { label: wpi.institution, logo: pickLogo([wpi.institution, wpi.abbr]) },
    persistent && { label: persistent.org, logo: pickLogo([persistent.org]) },
  ]
  return marks.filter((m): m is { label: string; logo?: string } => Boolean(m))
}

export function Hero() {
  const { identity, links } = profile
  const marks = proofMarks()
  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="container-site grid gap-8 pt-8 pb-8 md:min-h-[calc(100dvh-4rem)] md:grid-cols-12 md:items-center md:gap-8 md:py-12"
      >
        <div className="md:col-span-7">
          <h1 id="hero-title" className="text-display">
            {identity.name}
            <span className="text-title mt-3 block max-w-[30ch] font-medium text-ink-2">{identity.headline}</span>
          </h1>

          <TextEffect as="p" per="word" preset="slide" delay={0.15} speedReveal={1.4} className="text-lead mt-5 max-w-[46ch] text-ink-2">
            {identity.tagline}
          </TextEffect>

          <ul aria-label="Affiliations" className="group mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-2">
            {marks.map((m) => (
              <li key={m.label} className="inline-flex items-center gap-2">
                {m.logo && <Logo name={m.logo} height={18} />}
                <span>{m.label}</span>
              </li>
            ))}
          </ul>

          <p className="text-status mt-5 font-mono text-sm text-ink-2">{identity.availability.display}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <TrackLink href={links.resumePdf} id="resume" location="hero" download>
              <DownloadSimple size={16} aria-hidden="true" />
              Download resume
            </TrackLink>
            <CopyEmail parts={splitEmail(links.email)} location="hero" />
            <TrackLink href={links.scheduling} id="call" location="hero" variant="secondary">
              <CalendarBlank size={16} aria-hidden="true" />
              Book a call
            </TrackLink>
            <WatchPitch slug="latent-cot" location="hero" />
          </div>
        </div>

        <div className="md:col-span-5">
          <DepthPortrait variant="hero" alt="Shreya Boyane standing with arms crossed in a navy blazer" />
        </div>
      </section>
      {/* Sentinel for the scroll island: it appears once this line leaves the top of the viewport. */}
      <div data-hero-end="" aria-hidden="true" />
    </>
  )
}
