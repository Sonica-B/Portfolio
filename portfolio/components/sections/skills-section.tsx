import { profile } from '@/lib/content'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { Prose } from '@/components/glossary/prose'

/** The first two groups carry the most weight, so they take half the row each; the rest split a row in thirds. */
const SPANS = ['md:col-span-6', 'md:col-span-6', 'md:col-span-4', 'md:col-span-4', 'md:col-span-4']

const CHIP_CLASS = "after:content-[','] last:after:content-none"

/** Only phrases ("visual-inertial odometry", "AWS (Bedrock, ...)") get glossary tips; single names stay plain chips. */
const isPhrase = (skill: string) => /\s/.test(skill)

export function SkillsSection() {
  const groups = Object.entries(profile.skills)
  // One glossary popover per term across the whole section.
  const seen = new Set<string>()
  return (
    <Section id="skills" title="Skills" className="scroll-mt-16">
      <div className="grid gap-x-8 gap-y-10 border-t border-rule pt-10 md:grid-cols-12">
        {groups.map(([name, items], i) => (
          <Reveal key={name} delay={Math.min(i * 15, 60)} className={SPANS[i] ?? 'md:col-span-4'}>
            <h3 className="text-title">{name}</h3>
            <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[0.95rem] leading-relaxed text-ink-2">
              {items.map((skill) =>
                isPhrase(skill) ? (
                  <Prose key={skill} as="li" text={skill} className={CHIP_CLASS} seen={seen} />
                ) : (
                  <li key={skill} className={CHIP_CLASS}>
                    {skill}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
