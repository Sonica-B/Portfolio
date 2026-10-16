import { formatMonth, profile } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { CountUp } from '@/components/sections/count-up'

/** Count labels by recognition kind, in display order; the poster is listed as a row but counted with the papers elsewhere. */
const KINDS: { kind: string; one: string; many: string }[] = [
  { kind: 'award', one: 'award', many: 'awards' },
  { kind: 'honor', one: 'honor', many: 'honors' },
  { kind: 'fellowship', one: 'fellowship', many: 'fellowships' },
  { kind: 'competition', one: 'contest', many: 'contests' },
]
const ROWS = 8

export function RecognitionSection() {
  const { recognition, certifications } = profile
  // Certificates live in the wallet on the about page; here only the honors.
  const honors = recognition.filter((r) => r.kind !== 'certification')
  const counts = KINDS.flatMap(({ kind, one, many }) => {
    const n = honors.filter((r) => r.kind === kind).length
    return n > 0 ? [{ label: n === 1 ? one : many, value: n }] : []
  })
  counts.push({ label: certifications.length === 1 ? 'certification' : 'certifications', value: certifications.length })
  const rows = honors.slice(0, ROWS)

  return (
    <Section id="recognition" title="Recognition" className="scroll-mt-24">
      <dl className="flex flex-wrap gap-x-7 gap-y-2 border-t border-rule pt-5">
        {counts.map((c) => (
          <div key={c.label} className="flex items-baseline gap-x-1.5">
            <dt className="order-2 text-sm text-ink-2">{c.label}</dt>
            <dd className="text-metric order-1 text-2xl text-ink">
              <CountUp value={c.value} />
            </dd>
          </div>
        ))}
      </dl>

      <ol className="mt-8 border-t border-rule">
        {rows.map((r, i) => (
          <Reveal
            as="li"
            key={r.id}
            delay={Math.min(i * 15, 60)}
            className="group grid gap-x-4 gap-y-1 border-b border-rule py-3.5 md:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,18rem)] md:items-baseline"
          >
            <p className="text-status tnum">{formatMonth(r.date)}</p>
            <div className="min-w-0">
              <h3 className="text-base leading-snug font-medium text-ink">{r.title}</h3>
              {r.note ? <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-ink-2">{r.note}</p> : null}
            </div>
            <p className="flex items-center gap-2 text-sm text-ink-2">
              <Logo name={r.org} height={16} />
              <span className="min-w-0">{r.org}</span>
            </p>
          </Reveal>
        ))}
      </ol>

      <div className="mt-8">
        <ButtonLink href="/about#recognition" variant="ghost">
          All recognition and certifications
        </ButtonLink>
      </div>
    </Section>
  )
}
