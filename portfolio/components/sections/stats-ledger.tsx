import Link from 'next/link'
import { formatRange, getExperience, getProject, getPublication, type Project } from '@/lib/content'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'

type Row = {
  id: string
  /** The "before" half of a change ("3 to 4 days down to"), shown quieter; empty for a single figure. */
  before: string
  /** The figure itself ("5 to 10 min", "20+", "6 of 6"). */
  after: string
  caption: string
  /** Where the number comes from: a project, a role or the paper. */
  source: { label: string; href: string }
}

/** "SkipLegal: multi-agent H-1B document intelligence" -> "SkipLegal". */
const shortName = (p: Project) => p.name.split(':')[0].trim()

/** "3 to 4 days down to 5 to 10 min" -> before "3 to 4 days down to", after "5 to 10 min"; "200 to 95 ms" splits at its first "to". */
function splitChange(value: string): { before: string; after: string } {
  const down = value.indexOf(' down to ')
  if (down > 0) return { before: value.slice(0, down + ' down to'.length), after: value.slice(down + ' down to '.length) }
  const to = value.indexOf(' to ')
  if (to > 0) return { before: value.slice(0, to + ' to'.length), after: value.slice(to + ' to '.length) }
  return { before: '', after: value }
}

/** Whole months between two "YYYY-MM" strings, as years with one decimal. */
function yearsBetween(from: string, to: string): string {
  const [fy, fm] = from.split('-').map(Number)
  const [ty, tm] = to.split('-').map(Number)
  return (((ty - fy) * 12 + (tm - fm)) / 12).toFixed(1)
}

/** A before-and-after metric of a project, verbatim from profile.json. */
function projectRow(slug: string, label: string): Row[] {
  const p = getProject(slug)
  const m = p?.metrics.find((x) => x.label === label)
  if (!p || !m) return []
  return [{ id: slug, ...splitChange(m.value), caption: m.label, source: { label: shortName(p), href: `/projects/${p.slug}` } }]
}

/**
 * Outcome numbers from the work, each with the project, role or paper it comes from. Every figure is
 * read from profile.json: two project metrics, the Persistent Systems role's summary and dates, and
 * the reviewer rating on the ICML poster.
 */
function rows(): Row[] {
  const out: Row[] = [...projectRow('skiplegal', 'Review time'), ...projectRow('madwe', 'p95 latency')]

  const devops = getExperience('persistent-lead')
  if (devops) {
    const role = { label: `${devops.role}, ${devops.org}`, href: '/#experience' }
    // summary: "Owned CI/CD and cloud infrastructure across 20+ production projects."
    const projects = /(\d+\+?)\s+production projects/.exec(devops.summary)
    if (projects) {
      out.push({ id: 'cicd', before: '', after: projects[1], caption: 'Production projects on CI/CD and cloud infrastructure she owned', source: role })
    }
    if (devops.end) {
      out.push({
        id: 'devops-years',
        before: '',
        after: yearsBetween(devops.start, devops.end),
        caption: `Years as ${devops.role}, ${formatRange(devops.start, devops.end)}`,
        source: role,
      })
    }
  }

  const paper = getPublication('latent-cot')
  // review: "Reviewer rating 6/6, confidence 3/3".
  const rating = paper?.review ? /rating\s+(\d+)\/(\d+)/i.exec(paper.review) : null
  const confidence = paper?.review ? /confidence\s+(\d+)\/(\d+)/i.exec(paper.review) : null
  if (paper && rating) {
    out.push({
      id: 'review',
      before: '',
      after: `${rating[1]} of ${rating[2]}`,
      caption: `Reviewer rating${confidence ? `, confidence ${confidence[1]} of ${confidence[2]}` : ''}, co-first author`,
      source: { label: paper.displayString, href: '/research' },
    })
  }
  return out
}

/** Sized so the longest half ("3 to 4 days down to", 19 characters) holds one line at 320 px. */
const FIGURE = 'text-metric leading-[1.05] font-medium text-[length:clamp(1.5rem,1.3rem+1.6vw,2.75rem)]'

/**
 * A statement on the left, a ledger of outcome numbers on the right. Each row is the figure (the
 * "before" half quieter), then what it measures and the project or role it comes from as a link.
 */
export function StatsLedger() {
  const list = rows()
  if (list.length === 0) return null
  return (
    <Section id="numbers">
      <Reveal className="grid gap-10 md:grid-cols-12 md:gap-8">
        <h2 className="text-headline md:col-span-5">
          <span className="block text-ink-2">The work</span>
          <span className="block">in numbers</span>
        </h2>
        <ul className="md:col-span-7">
          {list.map((row, i) => (
            <li key={row.id} className={i > 0 ? 'hairline mt-5 pt-5' : undefined}>
              <p className={FIGURE}>
                {/* Each half stays whole, so a long change breaks between "before" and "after", never inside one. */}
                {row.before ? <span className="whitespace-nowrap text-ink-2">{row.before}</span> : null}
                {row.before ? ' ' : null}
                <span className="whitespace-nowrap text-ink">{row.after}</span>
              </p>
              <p className="mt-2 text-base leading-snug text-ink-2">{row.caption}</p>
              <p className="text-base leading-snug">
                <Link
                  href={row.source.href}
                  className="inline-flex min-h-11 items-center text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {row.source.label}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
