import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { formatMonth, profile } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'

export function OpenSourceSection() {
  const { summary, asOf, allUrl, stats, merged, inReview } = profile.openSource

  return (
    <Section id="open-source" title="Open source" intro={summary} className="scroll-mt-16">
      <dl className="grid grid-cols-3 gap-x-6 border-t border-rule pt-8 md:max-w-3xl md:gap-x-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse">
            <dt className="mt-2 text-sm text-ink-2">{s.label}</dt>
            <dd className="text-metric text-[length:clamp(2.2rem,1.6rem+2vw,3.6rem)] leading-none font-medium tracking-tight text-ink">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <h3 className="text-title mt-14">Merged</h3>
      <ol className="mt-4 grid gap-x-10 md:grid-cols-2">
        {merged.map((m, i) => (
          <Reveal as="li" key={m.url} delay={Math.min((i % 2) * 30, 60)} className="border-t border-rule py-5">
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 focus-visible:outline-offset-4"
            >
              <span>
                <span className="block text-sm text-ink-2">
                  {m.org}, {m.repo} <span className="text-metric">#{m.number}</span>
                </span>
                <span className="mt-1 block font-display text-lg leading-snug font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                  {m.title}
                </span>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" className="mt-1 shrink-0 text-ink-2 transition-colors group-hover:text-accent" />
            </a>
          </Reveal>
        ))}
      </ol>

      <p className="mt-10 max-w-[72ch] text-[0.95rem] text-ink-2">
        <span className="text-ink">In review</span> at {inReview.join(', ')}. Counts as of {formatMonth(asOf.slice(0, 7))}.
      </p>

      <div className="mt-8">
        <ButtonLink href={allUrl} variant="ghost">
          Every pull request on GitHub
        </ButtonLink>
      </div>
    </Section>
  )
}
