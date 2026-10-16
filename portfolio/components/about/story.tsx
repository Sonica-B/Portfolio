import { DownloadSimple } from '@phosphor-icons/react/dist/ssr'
import { profile } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Prose } from '@/components/glossary/prose'
import { TrackLink } from '@/components/cta/actions'
import { CopyEmail } from '@/components/cta/copy-email'
import { splitEmail } from '@/components/cta/email'
import { paragraphs } from './text'

const { identity, links } = profile
const { availability } = identity

/** Three short paragraphs from the summary and tagline, the facts row and the two opening actions. */
export function Story() {
  // One set for the whole opening, so a glossary term is explained once across paragraphs and facts.
  const seen = new Set<string>()
  const story = paragraphs(`${identity.summary} ${identity.tagline}`)
  const facts: [label: string, value: string][] = [
    ['Location', identity.location.display],
    ['Availability', availability.display],
    ['Work authorization', availability.workAuthorization],
    ['Languages', identity.languages.join(', ')],
  ]

  return (
    <div>
      <div className="mt-6 space-y-4">
        {story.map((text, i) => (
          <Prose key={i} text={text} seen={seen} className={cn('max-w-[62ch]', i === 0 ? 'text-lead text-ink' : 'text-ink-2')} />
        ))}
      </div>

      <dl className="panel mt-8 divide-y divide-rule px-4 md:px-5">
        {facts.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-x-4">
            <dt className="text-sm text-ink-2">{label}</dt>
            <Prose as="dd" text={value} seen={seen} className="text-ink" />
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <TrackLink href={links.resumePdf} id="resume" location="about" download>
          <DownloadSimple size={16} aria-hidden="true" />
          Download resume
        </TrackLink>
        <CopyEmail parts={splitEmail(links.email)} location="about" />
      </div>
    </div>
  )
}
