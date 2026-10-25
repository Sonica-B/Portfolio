import { formatRange, profile, year } from '@/lib/content'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'

export function ExperienceLedger() {
  const { experience, education } = profile
  return (
    <Section id="experience" title="Experience" className="scroll-mt-16">
      <ol className="border-t border-rule">
        {experience.map((e, i) => (
          <Reveal
            as="li"
            key={e.id}
            delay={Math.min(i * 20, 60)}
            className="grid gap-3 border-b border-rule py-8 md:grid-cols-12 md:gap-8"
          >
            <div className="md:sticky md:top-20 md:col-span-2 md:self-start">
              <p className="text-metric text-2xl leading-none text-ink">{year(e.start)}</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <h3 className="text-title">{e.role}</h3>
              <p className="mt-1 text-ink-2">
                {e.orgUrl ? (
                  <a href={e.orgUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                    {e.org}
                  </a>
                ) : (
                  e.org
                )}
              </p>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-2">
                <span className="text-metric">{formatRange(e.start, e.end)}</span>
                <span>{e.type}</span>
                <span>{e.location}</span>
              </p>
              {e.award && <p className="mt-2 text-sm text-accent">{e.award}</p>}
              {e.highlights.length > 0 ? (
                <ol className="mt-4 max-w-[72ch] list-decimal space-y-2 pl-5 text-[0.95rem] text-ink-2 marker:text-ink-3">
                  {e.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="pl-1">
                      {h}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-4 max-w-[72ch] text-[0.95rem] text-ink-2">{e.summary}</p>
              )}
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-16">
        <h3 className="text-title">Education</h3>
        <ol className="mt-5 border-t border-rule">
          {education.map((ed) => (
            <li key={ed.id} className="grid gap-2 border-b border-rule py-5 md:grid-cols-12 md:gap-8">
              <p className="text-metric text-2xl leading-none text-ink md:col-span-2">{year(ed.end)}</p>
              <div className="md:col-span-10 lg:col-span-9">
                <p className="text-ink">
                  {ed.degree}, {ed.field}
                </p>
                <p className="mt-1 text-sm text-ink-2">
                  <a href={ed.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                    {ed.institution}
                  </a>
                  , {ed.location}
                </p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-2">
                  <span className="text-metric">{formatRange(ed.start, ed.end)}</span>
                  <span className="text-metric">
                    GPA {ed.gpa}/{ed.gpaScale}
                  </span>
                </p>
                {ed.honors.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-ink-2">
                    {ed.honors.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}
