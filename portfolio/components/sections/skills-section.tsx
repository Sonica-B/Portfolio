import { skillGroups } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { Prose } from '@/components/glossary/prose'

/** The first two groups carry the most weight, so they take half the row each; the rest split a row in thirds. */
const SPANS = ['md:col-span-6', 'md:col-span-6', 'md:col-span-4', 'md:col-span-4', 'md:col-span-4']

const CHIP_CLASS = "after:content-[','] after:text-ink-2 last:after:content-none"

/** Only phrases ("visual-inertial odometry", "AWS (Bedrock, ...)") get glossary tips; single names stay plain chips. */
const isPhrase = (skill: string) => /\s/.test(skill)

/**
 * Each group leads with the five core skills from profile.json `coreSkills` in full ink, the ones the
 * projects and roles use most; the rest follow in secondary ink.
 */
export function SkillsSection() {
  const groups = skillGroups()
  // One glossary popover per term across the whole section.
  const seen = new Set<string>()
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
        {groups.map((group, i) => (
          <Reveal key={group.name} delay={Math.min(i * 15, 60)} className={SPANS[i] ?? 'md:col-span-4'}>
            <h3 className="text-title">{group.name}</h3>
            <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[0.95rem] leading-relaxed">
              {group.items.map((skill) => {
                const cls = cn(CHIP_CLASS, skill.core ? 'font-medium text-ink' : 'text-ink-2')
                return isPhrase(skill.name) ? (
                  <Prose key={skill.name} as="li" text={skill.name} className={cls} seen={seen} />
                ) : (
                  <li key={skill.name} className={cls}>
                    {skill.name}
                  </li>
                )
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
