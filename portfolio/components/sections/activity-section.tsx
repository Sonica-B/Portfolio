import { formatMonth, profile } from '@/lib/content'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'

export function ActivitySection() {
  const items = profile.activity.slice(0, 5)
  return (
    <Section id="activity" title="Recently" className="scroll-mt-16">
      <ol className="border-t border-rule">
        {items.map((a, i) => (
          <Reveal
            as="li"
            key={`${a.date}-${a.title}`}
            delay={Math.min(i * 15, 60)}
            className="grid gap-1 border-b border-rule py-4 md:grid-cols-12 md:gap-8"
          >
            <p className="text-metric text-sm text-ink-2 md:col-span-2">{formatMonth(a.date)}</p>
            <div className="md:col-span-10 lg:col-span-8">
              <p className="text-ink">{a.title}</p>
              {a.location && <p className="mt-0.5 text-sm text-ink-2">{a.location}</p>}
              {a.note && <p className="mt-1.5 max-w-[72ch] text-sm text-ink-2">{a.note}</p>}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
