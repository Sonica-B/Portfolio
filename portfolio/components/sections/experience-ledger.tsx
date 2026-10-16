import { profile, year, type Experience } from '@/lib/content'
import { Timeline, type TimelineItem, type TimelineMetric } from '@/components/timeline'
import { ButtonLink } from '@/components/ui/button'
import { Section } from '@/components/ui/section'

function isMetric(m: unknown): m is TimelineMetric {
  return (
    typeof m === 'object' &&
    m !== null &&
    typeof (m as { label?: unknown }).label === 'string' &&
    typeof (m as { value?: unknown }).value === 'string'
  )
}

/** Metrics from the entry when the content carries them, plus its award as a labelled value. */
function entryMetrics(e: Experience): TimelineMetric[] | undefined {
  const raw = (e as Experience & { metrics?: unknown }).metrics
  const metrics = Array.isArray(raw) ? raw.filter(isMetric) : []
  if (e.award) metrics.push({ label: 'Recognition', value: e.award })
  return metrics.length > 0 ? metrics : undefined
}

function toItem(e: Experience): TimelineItem {
  return {
    id: e.id,
    start: e.start,
    end: e.end,
    title: e.role,
    org: e.org,
    logoName: e.org,
    lines: e.highlights.length > 0 ? e.highlights : [e.summary],
    metrics: entryMetrics(e),
    href: e.orgUrl ?? undefined,
    tags: [e.type],
  }
}

export function ExperienceLedger() {
  const roles = profile.experience
  const items = roles.map(toItem)
  const orgs = new Set(roles.map((e) => e.org)).size
  const first = roles.map((e) => e.start).sort()[0]
  const ongoing = roles.find((e) => e.end === null)
  const last = roles.map((e) => e.end ?? e.start).sort().at(-1)
  const intro = `${roles.length} roles at ${orgs} organizations, ${year(first)} to ${ongoing ? 'present' : year(last)}.`

  return (
    <Section id="experience" title="Experience" intro={intro}>
      <Timeline items={items} initialOpen={ongoing?.id ?? 'first'} />
      <div className="mt-12">
        <ButtonLink href="/resume" variant="secondary">
          Full resume
        </ButtonLink>
      </div>
    </Section>
  )
}
