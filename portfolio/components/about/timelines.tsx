import { profile, type Education, type Leadership } from '@/lib/content'
import { Timeline, type TimelineItem } from '@/components/timeline'

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)

const newestFirst = (a: TimelineItem, b: TimelineItem) => (a.start < b.start ? 1 : a.start > b.start ? -1 : 0)

/** A degree as a node: the degree and field, the school with its logo, coursework and honors, GPA as the metric. */
function educationItem(e: Education): TimelineItem {
  const lines: string[] = []
  if (e.coursework.length > 0) lines.push(`Coursework: ${e.coursework.join(', ')}.`)
  lines.push(...e.honors)
  return {
    id: e.id,
    start: e.start,
    end: e.end,
    title: `${e.degree} in ${e.field}`,
    org: e.institution,
    logoName: e.institution,
    lines,
    metrics: e.gpa ? [{ label: 'GPA', value: `${e.gpa} / ${e.gpaScale}` }] : undefined,
    href: e.url || undefined,
    tags: e.location ? [e.location] : undefined,
  }
}

export function EducationTimeline() {
  const items = profile.education.map(educationItem).sort(newestFirst)
  return <Timeline items={items} orientation="vertical" initialOpen="first" />
}

/**
 * "2019 to 2022", "2025" or "2026 to present" -> month-resolution bounds for ordering only.
 * The verbatim text stays on the node through dateLabel, so no month is ever invented on screen.
 */
function yearsToRange(date: string): { start: string; end: string | null } | null {
  const m = /(\d{4})(?:\s+to\s+(\d{4}|present))?/i.exec(date)
  if (!m) return null
  const start = `${m[1]}-01`
  if (!m[2]) return { start, end: `${m[1]}-12` }
  return { start, end: /^\d{4}$/.test(m[2]) ? `${m[2]}-12` : null }
}

function leadershipItem(l: Leadership): TimelineItem[] {
  const range = yearsToRange(l.date)
  if (!range) return []
  return [
    {
      id: `leadership-${range.start}-${slug(l.title)}`,
      start: range.start,
      end: range.end,
      title: l.title,
      org: l.org,
      logoName: l.org,
      lines: l.note ? [l.note] : [],
      dateLabel: l.date,
    },
  ]
}

export function LeadershipTimeline() {
  const items = profile.leadership.flatMap(leadershipItem).sort(newestFirst)
  return <Timeline items={items} density="compact" orientation="vertical" />
}
