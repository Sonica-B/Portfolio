'use client'

import { useEffect, useState, type KeyboardEvent } from 'react'
import { Instrument, useInstrument } from '@/components/instruments/instrument'
import type { Project } from '@/lib/content'
import { cn } from '@/lib/utils'

/*
 * Pipeline. Document types are the document_type strings of Agent 1's vision handler
 * (agents/agent1/lambdas/vision_handler/extractor.py plus the i129_h1b_petition template),
 * the agents follow profile.json, and the report keys are the real top-level keys of
 * final_validation_report.json documented in agents/final_aggregator/README.md
 * (github.com/Sonica-B/GQP-SkipLegal). Values are shown as ellipses, never invented.
 */

const DOC_TYPES = [
  'Form I-129 petition',
  'Passport',
  'US visa',
  'Form I-94',
  'Employment letter',
  'Resume',
  'School transcript',
  'Diploma',
  'Marriage certificate',
  'Corporate tax return',
  'Proof of in-country status',
]

const AGENTS = [
  { id: 'Agent 1', name: 'Intake and vision', detail: 'Textract OCR into one unified schema' },
  { id: 'Agent 2A', name: 'Canonical fields', detail: 'I-129 fields through a deterministic logic engine' },
  { id: 'Agent 2B', name: 'Semantic validation', detail: 'LLM validation of the supporting evidence' },
  { id: 'Agent 2C', name: 'Cross-document comparator', detail: 'Amazon Bedrock RAG fallback when rules cannot resolve' },
]

const REPORT_KEYS = ['validation_type', 'rag_status', 'agent2a_issues', 'agent2b_validation', 'overall_status']
const STEP_MS = 550
const REPORT_STAGE = AGENTS.length + 1

type State = 'idle' | 'queued' | 'running' | 'done'

function Body() {
  const { reduced, interact } = useInstrument()
  const [doc, setDoc] = useState<string | null>(null)
  const [run, setRun] = useState(0)
  const [stage, setStage] = useState(0) // number of agents finished; REPORT_STAGE once the report is out

  useEffect(() => {
    if (run === 0) return
    if (reduced) {
      setStage(REPORT_STAGE)
      return
    }
    setStage(0)
    const timers = AGENTS.map((_, i) => window.setTimeout(() => setStage(i + 1), (i + 1) * STEP_MS))
    timers.push(window.setTimeout(() => setStage(REPORT_STAGE), AGENTS.length * STEP_MS + 400))
    return () => timers.forEach((t) => clearTimeout(t))
  }, [run, reduced])

  const choose = (d: string) => {
    interact()
    setDoc(d)
    setRun((r) => r + 1)
  }

  const index = doc ? DOC_TYPES.indexOf(doc) : 0
  const onGroupKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    let next = -1
    if (delta) next = (index + delta + DOC_TYPES.length) % DOC_TYPES.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = DOC_TYPES.length - 1
    if (next < 0) return
    e.preventDefault()
    choose(DOC_TYPES[next])
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus()
  }

  const stateOf = (i: number): State => {
    if (run === 0) return 'idle'
    if (i < stage) return 'done'
    if (i === stage && stage < AGENTS.length) return 'running'
    return 'queued'
  }
  const reportShown = stage >= REPORT_STAGE

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-5">
        <p className="text-sm text-ink-2">Drop a document type into the package</p>
        <div role="radiogroup" aria-label="Document type" onKeyDown={onGroupKey} className="mt-3 flex flex-wrap gap-2">
          {DOC_TYPES.map((d, i) => {
            const checked = d === doc
            return (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked || (doc === null && i === 0) ? 0 : -1}
                onClick={() => choose(d)}
                className={cn(
                  'press inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-200',
                  checked ? 'border-accent bg-accent text-accent-ink' : 'border-rule-strong text-ink hover:bg-surface-sunken',
                )}
              >
                {d}
              </button>
            )
          })}
        </div>
      </div>

      <div className="md:col-span-7">
        <ol aria-live="polite" aria-label="Agents" className="ml-1.5 border-l border-rule">
          {AGENTS.map((a, i) => {
            const state = stateOf(i)
            return (
              <li key={a.id} data-state={state} className="relative py-2.5 pl-6">
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute left-0 top-4 h-3 w-3 -translate-x-1/2 rounded-full border bg-surface-raised',
                    state === 'running' || state === 'done' ? 'border-accent' : 'border-rule-strong',
                  )}
                >
                  <span
                    className="absolute inset-0.5 rounded-full bg-accent transition-transform duration-300 ease-out"
                    style={{ transform: state === 'done' ? 'scale(1)' : 'scale(0)' }}
                  />
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <p>
                    <span className="font-mono text-[13px] text-ink-2">{a.id}</span>{' '}
                    <span className="text-ink">{a.name}</span>
                  </p>
                  <span className="font-mono text-[13px] text-ink-2">{state === 'idle' ? 'waiting for a document' : state}</span>
                </div>
                <p className="text-sm text-ink-2">{a.detail}</p>
              </li>
            )
          })}
        </ol>

        <div
          aria-live="polite"
          aria-hidden={!reportShown}
          className="mt-4 rounded-[12px] border border-rule bg-surface-sunken p-4 transition-[opacity,transform] duration-300 ease-out"
          style={{ opacity: reportShown ? 1 : 0, transform: reportShown ? 'none' : 'translateY(8px)' }}
        >
          {reportShown ? (
            <>
              <p className="font-mono text-[13px] text-ink-2">
                final_validation_report.json{doc ? `, package with ${doc.toLowerCase()}` : ''}
              </p>
              <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-5 text-ink">
                {'{\n'}
                {REPORT_KEYS.map((k, i) => `  "${k}": "..."${i < REPORT_KEYS.length - 1 ? ',' : ''}\n`).join('')}
                {'}'}
              </pre>
              <p className="mt-2 text-sm text-ink-2">One attorney-ready QC report; values depend on the real package.</p>
            </>
          ) : (
            <p className="font-mono text-[13px] text-ink-2">final_validation_report.json</p>
          )}
        </div>
      </div>
    </div>
  )
}

function metric(project: Project, label: string): string | null {
  return project.metrics.find((m) => m.label === label)?.value ?? null
}

export default function Skiplegal({ project }: { project: Project }) {
  const review = metric(project, 'Review time')
  const missing = metric(project, 'Missing-document detection')
  const status = [review ? `Review time ${review}` : null, missing ? `missing-document detection ${missing}` : null]
    .filter(Boolean)
    .join('; ')
  return (
    <Instrument title="Pipeline" status={status || project.metrics[0]?.value || ''} slug={project.slug} minHeight={460}>
      <Body />
    </Instrument>
  )
}
