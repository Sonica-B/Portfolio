import { profile } from '@/lib/content'
import { ProseList } from '@/components/glossary/prose'
import { GithubActivity, longDate } from './github-activity'

/**
 * Two panels in one row: "Now", the dated lines from profile.json, and "On GitHub", the
 * snapshot plus live feed. Phones stack the panels; from 768 px they share the row.
 */
export function NowSection() {
  const { now } = profile
  // One glossary popover per term across the panel.
  const seen = new Set<string>()
  return (
    <section id="now" className="container-site cv-auto py-16 md:py-24">
      {/* minmax(0, 1fr) so a long repository name cannot widen the column past the viewport. */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-2">
        <article aria-labelledby="now-title" className="panel p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 id="now-title" className="text-title">
              Now
            </h2>
            <p className="text-status">
              Updated <time dateTime={now.date}>{longDate(now.date)}</time>
            </p>
          </div>
          <ProseList
            items={now.lines}
            className="mt-4 space-y-3 text-ink-2"
            itemClassName="leading-snug"
            seen={seen}
          />
        </article>
        <GithubActivity />
      </div>
    </section>
  )
}
