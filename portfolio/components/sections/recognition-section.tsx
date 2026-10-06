import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { formatMonth, profile } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { CountUp } from '@/components/sections/count-up'

export function RecognitionSection() {
  const { projects, publications, recognition, certifications } = profile
  const counts = [
    { value: projects.length, label: 'Projects' },
    { value: publications.length, label: 'Papers' },
    { value: recognition.filter((r) => r.kind !== 'certification').length, label: 'Awards and honors' },
    { value: certifications.length, label: 'Certifications' },
  ]
  const items = recognition.slice(0, 6)

  return (
    <Section id="recognition" title="Recognition" className="scroll-mt-16">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-rule pt-8 md:grid-cols-4 md:gap-x-8">
        {counts.map((c) => (
          <div key={c.label} className="flex flex-col-reverse">
            <dt className="mt-2 text-sm text-ink-2">{c.label}</dt>
            <dd className="text-metric text-[length:clamp(2.6rem,1.8rem+2.6vw,4.5rem)] leading-none font-medium tracking-tight text-ink">
              <CountUp value={c.value} />
            </dd>
          </div>
        ))}
      </dl>

      <ol className="mt-14 grid gap-x-10 md:grid-cols-2">
        {items.map((r, i) => (
          <Reveal as="li" key={r.id} delay={Math.min((i % 2) * 30, 60)} className="border-t border-rule py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg leading-snug font-semibold tracking-tight">{r.title}</h3>
              <p className="text-metric text-xs text-ink-3">{formatMonth(r.date)}</p>
            </div>
            <p className="mt-1 text-sm text-ink-2">{r.org}</p>
            {r.note && <p className="mt-2 max-w-[58ch] text-sm text-ink-2">{r.note}</p>}
          </Reveal>
        ))}
      </ol>

      <div className="mt-8">
        <ButtonLink href="/about#recognition" variant="ghost">
          All recognition and certifications
          <ArrowRight size={16} aria-hidden="true" />
        </ButtonLink>
      </div>
    </Section>
  )
}
