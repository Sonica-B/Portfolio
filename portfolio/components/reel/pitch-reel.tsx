import { profile, type Project } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Filmstrip } from './filmstrip'
import { PITCH_SECONDS, hasPitch, type PitchItem } from './pitch-slugs'

/** The content agent adds pitch: { problem, action, change } per project; until then the first metric stands in. */
type WithPitch = Project & { pitch?: { problem?: string; action?: string; change?: string } }

export function outcomeLine(p: Project): string {
  const change = (p as WithPitch).pitch?.change?.trim()
  if (change) return change
  const m = p.metrics[0]
  return m ? `${m.label}: ${m.value}` : p.subtitle
}

/** Pitches in profile.json order, limited to the slugs that have a video on disk (PITCH_SLUGS). Server-side only. */
export function pitchItems(): PitchItem[] {
  return profile.projects.filter((p) => hasPitch(p.slug)).map((p) => ({ slug: p.slug, name: p.name, outcome: outcomeLine(p) }))
}

/** Home section: server shell with the client filmstrip. Needs ReelProvider above it (the layout). */
export function PitchReel() {
  const items = pitchItems()
  const total = profile.projects.length
  return (
    <Section
      id="reel"
      title="Pitch reel"
      intro={`${items.length} projects, ${PITCH_SECONDS} seconds each, built from the real repos`}
    >
      <Filmstrip items={items} />
      <div className="mt-8">
        {/* The ghost ButtonLink draws its own forward arrow. */}
        <ButtonLink href="/projects" variant="ghost">
          See all {total} projects
        </ButtonLink>
      </div>
    </Section>
  )
}
