import type { CSSProperties } from 'react'
import { formatMonth, github, profile, year } from '@/lib/content'
import { PITCH_SECONDS, hasPitch } from '@/components/reel/pitch-slugs'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { CountUp } from '@/components/sections/count-up'

type Figure = {
  id: string
  /** Whole-number part, counted up on reveal. */
  whole: number
  /** Decimal part including the point (".6"), left-aligned in its own track. Empty for whole numbers. */
  fraction: string
  caption: string
}

/** Months between two "YYYY-MM" strings (the second may carry a day), as years with one decimal. */
function yearsBetween(from: string, to: string): string {
  const [fy, fm] = from.split('-').map(Number)
  const [ty, tm] = to.split('-').map(Number)
  const months = (ty - fy) * 12 + (tm - fm)
  return (months / 12).toFixed(1)
}

/** Four to six figures, every one computed from the content files. */
function figures(): Figure[] {
  const { projects, publications, certifications, recognition, experience, meta } = profile
  const firstProject = year(projects.map((p) => p.start).sort()[0])
  const pitched = projects.filter((p) => hasPitch(p.slug)).length
  const accepted = publications.filter((p) => /^accepted/i.test(p.status)).length
  const submitted = publications.filter((p) => /^submitted/i.test(p.status)).length
  const issuers = new Set(certifications.map((c) => c.issuer)).size
  const honors = recognition.filter((r) => r.kind !== 'certification')
  const honorYears = honors.map((r) => year(r.date)).sort()
  const first = [...experience].sort((a, b) => (a.start < b.start ? -1 : 1))[0]
  const [wholeYears, decimalYears] = first ? yearsBetween(first.start, meta.lastUpdated).split('.') : ['0', '0']

  const out: Figure[] = [
    {
      id: 'projects',
      whole: projects.length,
      fraction: '',
      caption: `projects since ${firstProject}, ${pitched} with a ${PITCH_SECONDS} second pitch`,
    },
    {
      id: 'papers',
      whole: publications.length,
      fraction: '',
      caption: `papers as co-first author, ${accepted} accepted and ${submitted} submitted`,
    },
    {
      id: 'certifications',
      whole: certifications.length,
      fraction: '',
      caption: `certifications and badges from ${issuers} issuers`,
    },
    {
      id: 'recognition',
      whole: honors.length,
      fraction: '',
      caption: `awards, honors, fellowships and contests, ${honorYears[0]} to ${honorYears[honorYears.length - 1]}`,
    },
  ]
  if (github.user?.publicRepos) {
    out.push({
      id: 'repos',
      whole: github.user.publicRepos,
      fraction: '',
      caption: `public repositories on GitHub, ${github.user.followers} followers`,
    })
  }
  if (first) {
    const kind = /intern/i.test(first.type) ? 'internship' : 'role'
    out.push({
      id: 'years',
      whole: Number(wholeYears),
      fraction: `.${decimalYears}`,
      caption: `years since the first ${kind}, ${formatMonth(first.start)}`,
    })
  }
  return out
}

const FIGURE = 'text-metric text-[length:clamp(3rem,2.2rem+4vw,6rem)] leading-none font-medium text-ink'

/**
 * Column aligned on the decimal: a statement on the left, a ledger of figures on the right. Every
 * row is three tracks of one grid, so the whole numbers right-align in the first, the decimals
 * left-align in the second, and the captions share the figures' baseline in the third. Phones put
 * each caption under its figure; the row index drives the explicit grid rows in both layouts.
 */
export function StatsLedger() {
  const rows = figures()
  return (
    <Section id="numbers" className="scroll-mt-24">
      <Reveal className="grid gap-10 border-t border-rule pt-10 md:grid-cols-12 md:gap-8">
        <h2 className="text-headline md:col-span-5 md:self-center">
          <span className="block text-ink-2">The portfolio</span>
          <span className="block">in numbers</span>
        </h2>
        {/* Phones: 8 px between a figure and its caption, 28 px between rows (the figure's top margin); from 768 px one row each, 20 px apart. */}
        <dl className="grid grid-cols-[auto_auto_minmax(0,1fr)] items-baseline gap-x-0 gap-y-2 md:col-span-7 md:gap-y-5">
          {rows.map((row, i) => (
            <div key={row.id} className="contents" style={{ '--r': i } as CSSProperties}>
              <dt className="col-span-3 col-start-1 self-start text-base leading-snug text-ink-2 tnum [grid-row:calc(var(--r)*2+2)] md:col-span-1 md:col-start-3 md:self-baseline md:pl-5 md:[grid-row:calc(var(--r)+1)]">
                {row.caption}
              </dt>
              <dd className="contents">
                <span className={`${FIGURE} col-start-1 text-right [grid-row:calc(var(--r)*2+1)] md:mt-0 md:[grid-row:calc(var(--r)+1)] ${i > 0 ? 'mt-5' : ''}`}>
                  <CountUp value={row.whole} />
                </span>
                <span className={`${FIGURE} col-start-2 text-left [grid-row:calc(var(--r)*2+1)] md:mt-0 md:[grid-row:calc(var(--r)+1)] ${i > 0 ? 'mt-5' : ''}`} aria-hidden={row.fraction ? undefined : 'true'}>
                  {row.fraction}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  )
}
