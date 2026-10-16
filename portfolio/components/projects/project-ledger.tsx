import { FilterBar, type KindOption } from '@/components/projects/filter-bar'
import { ProjectStrip, type StripItem } from '@/components/projects/project-strip'

/**
 * Contact sheet of every project: filter chips, a live count line, then one strip per project,
 * two per row from 1024 px with 12 px gutters. Server-safe; the client wrapper only adds URL state.
 */
export function ProjectIndex({
  items,
  options,
  active,
  onSelect,
}: {
  items: StripItem[]
  options: KindOption[]
  active: string
  onSelect?: (kind: string) => void
}) {
  const shown = active === 'all' ? items : items.filter((it) => it.kind === active)
  const label = options.find((o) => o.kind === active)?.label
  const pitched = shown.filter((it) => it.hasPitch).length
  const noun = shown.length === 1 ? 'project' : 'projects'
  return (
    <div>
      <FilterBar options={options} active={active} onSelect={onSelect} />
      <p className="text-status mt-6" aria-live="polite" aria-atomic="true">
        {shown.length} {noun}
        {active !== 'all' && label ? ` in ${label}` : ''}, {pitched} with a pitch video
      </p>
      {shown.length === 0 ? (
        <p className="hairline mt-4 py-10 text-ink-2">No projects of this kind yet.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {shown.map((it) => (
            <ProjectStrip key={it.slug} item={it} />
          ))}
        </ul>
      )}
    </div>
  )
}
