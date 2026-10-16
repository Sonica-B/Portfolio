'use client'

import { useMemo, useState } from 'react'
import { Instrument, useInstrument } from '@/components/instruments/instrument'
import data from '@/content/instruments/trended-courses.json'
import type { Project } from '@/lib/content'

/*
 * Course to skills. The visitor ticks real Computer Science titles from the TrendED catalog
 * (content/instruments/trended-courses.json, built from data/json/wpi_courses.json in
 * github.com/Sonica-B/TrendED) and the top TF-IDF terms are computed here the way
 * comparator.py does it with scikit-learn: TfidfVectorizer(stop_words='english'), smooth idf,
 * L2-normalised document vectors, then the selected vectors are summed and ranked.
 */

type Course = { code: string; title: string }
const COURSES: Course[] = data.courses
const CATALOG_COUNT: number = data.catalogCount
const DEFAULT_CODES = ['CS 4341', 'CS 4342', 'CS 4433'] // AI, machine learning and big data as the first picks
const TOP_N = 8

// scikit-learn's English stop list, the entries that occur in course titles (it really does include "computer" and "system").
const STOP = new Set(
  'a about above across after again against all almost alone along already also although always am among amongst an and another any anyhow anyone anything anyway anywhere are around as at back be became because become becomes been before behind being below beside besides between beyond both but by can cannot computer could do done down due during each eg either else elsewhere enough etc even ever every everything everywhere except few for former from front full further get give go had has have he hence her here hereby herein hers him his how however i ie if in inc indeed interest into is it its itself keep last latter least less ltd made many may me meanwhile might mine more moreover most mostly much must my myself name namely neither never nevertheless next no nobody none nor not nothing now nowhere of off often on once one only onto or other others otherwise our ours out over own part per perhaps please put rather re same see seem several she should show side since so some somehow someone something sometime somewhere still such system take than that the their them themselves then thence there thereafter thereby therefore therein these they this those though through throughout thus to together too toward towards under until up upon us very via was we well were what whatever when whence whenever where whereas whereby wherein whereupon wherever whether which while who whoever whole whom whose why will with within without would yet you your yours yourself yourselves'.split(
    ' ',
  ),
)

/** Same token pattern as TfidfVectorizer's default, two or more word characters, lower-cased. */
function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/\b\w\w+\b/g) ?? []).filter((t) => !STOP.has(t))
}

const DOCS = COURSES.map((c) => tokenize(c.title))
const N = DOCS.length
const DF = new Map<string, number>()
for (const doc of DOCS) for (const t of new Set(doc)) DF.set(t, (DF.get(t) ?? 0) + 1)
const idf = (t: string) => Math.log((1 + N) / (1 + (DF.get(t) ?? 0))) + 1 // smooth_idf=True

/** tf * idf per term, L2-normalised, which is TfidfVectorizer's default norm='l2'. */
function vector(doc: string[]): Map<string, number> {
  const tf = new Map<string, number>()
  for (const t of doc) tf.set(t, (tf.get(t) ?? 0) + 1)
  let norm = 0
  const v = new Map<string, number>()
  for (const [t, c] of tf) {
    const w = c * idf(t)
    v.set(t, w)
    norm += w * w
  }
  norm = Math.sqrt(norm) || 1
  for (const [t, w] of v) v.set(t, w / norm)
  return v
}
const VECTORS = DOCS.map(vector)

function Body() {
  const { reduced, interact } = useInstrument()
  const [selected, setSelected] = useState<Set<string>>(() => new Set(DEFAULT_CODES.filter((c) => COURSES.some((x) => x.code === c))))

  const terms = useMemo(() => {
    const sum = new Map<string, number>()
    COURSES.forEach((c, i) => {
      if (!selected.has(c.code)) return
      for (const [t, w] of VECTORS[i]) sum.set(t, (sum.get(t) ?? 0) + w)
    })
    return [...sum.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, TOP_N)
  }, [selected])
  const max = terms[0]?.[1] ?? 1

  const toggle = (code: string) => {
    interact()
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-ink-2">
            <span className="text-metric text-ink">{selected.size}</span> of {COURSES.length} courses selected
          </p>
          <button
            type="button"
            onClick={() => {
              interact()
              setSelected(new Set())
            }}
            className="press inline-flex min-h-11 items-center rounded-full px-3 text-sm text-ink-2 underline-offset-4 hover:text-ink hover:underline"
          >
            Clear
          </button>
        </div>
        <ul className="mt-2 max-h-72 overflow-y-auto border border-rule bg-surface-sunken" aria-label="Computer Science courses">
          {COURSES.map((c) => {
            const id = `trended-${c.code.replace(/\W+/g, '-')}`
            return (
              <li key={c.code} className="border-b border-rule last:border-b-0">
                <label htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-3 px-3 py-1.5 text-sm hover:bg-surface-raised">
                  <input
                    id={id}
                    type="checkbox"
                    checked={selected.has(c.code)}
                    onChange={() => toggle(c.code)}
                    className="h-4 w-4 shrink-0 accent-accent"
                  />
                  <span className="text-metric shrink-0 text-ink-2">{c.code}</span>
                  <span className="text-ink">{c.title}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="md:col-span-6">
        <p aria-live="polite" aria-atomic="true" className="text-sm text-ink-2">
          {terms.length === 0
            ? 'Tick a course to see its strongest terms.'
            : `Top ${terms.length} terms from ${selected.size} ${selected.size === 1 ? 'course' : 'courses'}, strongest: ${terms[0][0]}`}
        </p>
        <ol className="mt-3 space-y-2" aria-label="Top TF-IDF terms">
          {terms.map(([term, weight]) => (
            <li key={term} className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)_3.5rem] items-center gap-3 font-mono text-[13px]">
              <span className="truncate text-ink">{term}</span>
              <span className="h-2 overflow-hidden bg-surface-sunken" aria-hidden="true">
                <span
                  className="block h-full w-full origin-left bg-accent"
                  style={{ transform: `scaleX(${weight / max})`, transition: reduced ? 'none' : 'transform 300ms cubic-bezier(0.25, 1, 0.5, 1)' }}
                />
              </span>
              <span className="text-metric text-right text-ink-2">{weight.toFixed(2)}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default function TrendedPathfinder({ project }: { project: Project }) {
  return (
    <Instrument
      title="Course to skills"
      status={`TfidfVectorizer(stop_words='english') and cosine_similarity, as in comparator.py; ${COURSES.length} of ${CATALOG_COUNT} Computer Science titles`}
      slug={project.slug}
      minHeight={460}
    >
      <Body />
    </Instrument>
  )
}
