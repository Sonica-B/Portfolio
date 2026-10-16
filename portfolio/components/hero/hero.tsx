import { CalendarBlank, DownloadSimple } from '@phosphor-icons/react/dist/ssr'
import { getProject, getPublication, profile, year } from '@/lib/content'
import { getLogo } from '@/lib/logos'
import { Logo } from '@/components/ui/logo'
import { Prose } from '@/components/glossary/prose'
import { DepthPortrait } from '@/components/hero/depth-portrait'
import { TrackLink, WatchPitch } from '@/components/cta/actions'
import { CopyEmail } from '@/components/cta/copy-email'
import { splitEmail } from '@/components/cta/email'

/** The project whose pitch the hero opens and whose review-time metric is the hero's measured result. */
const LEAD_SLUG = 'skiplegal'

/** Tools she would defend in an interview, kept only when profile.json skills list them. */
const TOOLS = ['PyTorch', 'TensorRT', 'ONNX', 'CUDA']
const AWS_SERVICES = ['Bedrock', 'Lambda', 'Step Functions']

/** First candidate with a sourced logo in content/logos.json; the text label is always printed. */
function pickLogo(names: (string | undefined)[]): string | undefined {
  const present = names.filter((n): n is string => Boolean(n))
  return present.find((n) => getLogo(n)) ?? present[0]
}

/** "Master of Science" -> "M.S.", "Artificial Intelligence" -> "AI". */
const degreeShort = (degree: string) =>
  degree
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w))
    .map((w) => `${w[0]}.`)
    .join('')
const initials = (field: string) =>
  field
    .split(' ')
    .map((w) => w[0])
    .join('')

/** The four names a recruiter recognizes, each labelled with her relation to it, all from profile.json. */
function proofMarks(): { label: string; logo?: string }[] {
  const icml = getPublication('latent-cot')
  const golden = profile.recognition.find((r) => r.id === 'golden-ticket')
  const community = profile.leadership.find((l) => l.org.includes('NVIDIA'))
  const wpi = profile.education.find((e) => e.id === 'wpi')
  const persistent = profile.experience.find((e) => e.id === 'persistent-lead')
  // "Golden Ticket Contest honorable mention, NVIDIA GTC 2026" -> "contest, honorable mention".
  const honor = golden?.title.match(/(contest)\s+(honorable mention)/i)
  const marks: ({ label: string; logo?: string } | undefined | false)[] = [
    icml && {
      label: /poster/i.test(icml.status) ? `${icml.venue} poster` : icml.venue,
      logo: pickLogo([icml.venue, icml.venueFull]),
    },
    golden && {
      label: honor
        ? `${golden.org.replace(/\s+developer community$/i, '')} ${honor[1].toLowerCase()}, ${honor[2]}`
        : golden.title,
      logo: pickLogo([community?.org, golden.org, 'NVIDIA', 'Google Cloud']),
    },
    wpi && {
      label: `${degreeShort(wpi.degree)} in ${initials(wpi.field)}, ${wpi.institution}, ${year(wpi.end)}`,
      logo: pickLogo([wpi.institution, wpi.abbr]),
    },
    persistent && { label: `${persistent.role}, ${persistent.org}`, logo: pickLogo([persistent.org]) },
  ]
  return marks.filter((m): m is { label: string; logo?: string } => Boolean(m))
}

/** "PyTorch, TensorRT, ONNX, CUDA and AWS (Bedrock, Lambda, Step Functions)." */
function toolsLine(): string {
  const skills = Object.values(profile.skills).flat()
  const items = TOOLS.filter((t) => skills.includes(t))
  const aws = skills.find((s) => s.startsWith('AWS ('))
  const services = aws ? AWS_SERVICES.filter((s) => aws.includes(s)) : []
  if (services.length) items.push(`AWS (${services.join(', ')})`)
  return items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}.` : `${items[0] ?? ''}.`
}

/** The SkipLegal review-time metric, "3 to 4 days down to 5 to 10 min", as a sentence. */
function resultLine(): string {
  const value = getProject(LEAD_SLUG)?.metrics.find((m) => m.label === 'Review time')?.value ?? ''
  const parts = /^(.+?) down to (.+?) min$/.exec(value)
  // Fallback mirrors projects[slug="skiplegal"].metrics[label="Review time"].value in profile.json.
  if (!parts) return 'Cut H-1B petition review from 3 to 4 days to 5 to 10 minutes.'
  return `Cut H-1B petition review from ${parts[1]} to ${parts[2]} minutes.`
}

export function Hero() {
  const { identity, links } = profile
  const marks = proofMarks()
  // CTA pills drop to 14 px side padding on phones so the four actions fit two rows at 390 px.
  const tight = 'max-md:px-3.5'
  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="container-site grid gap-8 pt-8 pb-8 md:min-h-[calc(100dvh-4rem)] md:grid-cols-12 md:items-center md:gap-8 md:py-12"
      >
        <div className="md:col-span-7">
          <h1 id="hero-title" className="text-display">
            {identity.name}
          </h1>
          <Prose as="p" text={identity.headline} className="text-title mt-2 max-w-[30ch] font-medium text-ink-2 md:mt-3" />

          {/* Static text: it is in the server HTML at full opacity, with nothing to switch off for reduced motion. */}
          <p className="text-lead mt-3 max-w-[46ch] text-ink-2 md:mt-5">{identity.tagline}</p>

          <p className="mt-2.5 max-w-[60ch] text-sm leading-snug text-ink-2">
            {toolsLine()} <span className="text-ink md:block">{resultLine()}</span>
          </p>

          <ul aria-label="Affiliations" className="group mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink-2 md:mt-6 md:gap-y-2">
            {marks.map((m) => (
              <li key={m.label} className="inline-flex items-center gap-2">
                {m.logo && <Logo name={m.logo} height={18} />}
                <span>{m.label}</span>
              </li>
            ))}
          </ul>

          <p className="text-status mt-3 font-mono text-sm text-ink-2 md:mt-5">{identity.availability.display}</p>

          <div className="mt-3.5 flex flex-wrap gap-2 md:mt-7 md:gap-3">
            <TrackLink href={links.resumePdf} id="resume" location="hero" download className={tight}>
              <DownloadSimple size={16} aria-hidden="true" />
              Download resume
            </TrackLink>
            <CopyEmail parts={splitEmail(links.email)} location="hero" className={tight} />
            <TrackLink href={links.scheduling} id="call" location="hero" variant="secondary" className={tight}>
              <CalendarBlank size={16} aria-hidden="true" />
              Book a call
            </TrackLink>
            <WatchPitch slug={LEAD_SLUG} location="hero" className={tight} />
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
