import { profile, type Activity, type Leadership } from '@/lib/content'
import { Timeline, type TimelineItem } from '@/components/timeline'
import { ButtonLink } from '@/components/ui/button'
import { Section } from '@/components/ui/section'

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)

/** "conference" -> "Conference"; the type words in profile.json are lowercase. */
const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

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

function activityItem(a: Activity): TimelineItem {
  return {
    id: `activity-${a.date}-${slug(a.title)}`,
    start: a.date,
    end: a.date,
    title: a.title,
    org: a.location ?? '',
    lines: a.note ? [a.note] : [],
    tags: [sentenceCase(a.type)],
  }
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
      lines: [l.note],
      tags: ['Leadership'],
      dateLabel: l.date,
    },
  ]
}

/** The home timeline keeps entries that start in this year or later; the rest live on /about. */
const FROM_YEAR = 2025

export function ActivitySection() {
  const items = [...profile.activity.map(activityItem), ...profile.leadership.flatMap(leadershipItem)]
    .filter((item) => Number(item.start.slice(0, 4)) >= FROM_YEAR)
    .sort((a, b) => (a.start < b.start ? 1 : a.start > b.start ? -1 : 0))

  return (
    <Section id="activity" title="Activity and leadership">
      <Timeline items={items} density="compact" />
      <div className="mt-10">
        <ButtonLink href="/about#activity" variant="ghost">
          Full activity and leadership
        </ButtonLink>
      </div>
    </Section>
  )
}
