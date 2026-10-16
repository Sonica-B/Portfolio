'use client'

import { useEffect, useState } from 'react'
import { ArrowCounterClockwise, ArrowsClockwise, GitBranch, Warning } from '@phosphor-icons/react'
import { Instrument, useInstrument } from '@/components/instruments/instrument'
import type { Project } from '@/lib/content'
import { cn } from '@/lib/utils'

/*
 * Secret scan replay. Every string is the extension's own, from github.com/Sonica-B/AutoGit:
 * status bar states and log lines from extension.js, the rule id and description from
 * lib/secretScanner.js (the preview keeps the first five characters and masks the rest),
 * the warning and its two buttons from promptOverride() in extension.js, and the settings
 * from package.json (defaults: scanForSecrets true, autoPush true, delayMs 3000; the
 * protectedBranches example is the README's).
 */

type Step =
  | { kind: 'status'; text: string; busy: boolean }
  | { kind: 'log'; text: string }
  | { kind: 'settings'; text: string }
  | { kind: 'notice' }
  | { kind: 'pause'; ms: number }

const SCRIPT: Step[] = [
  { kind: 'status', text: 'Auto Git: Pending (1)', busy: true },
  { kind: 'pause', ms: 900 },
  { kind: 'status', text: 'Auto Git: Working...', busy: true },
  { kind: 'pause', ms: 500 },
  { kind: 'log', text: 'SECRET BLOCKED: AWS access key ID [aws-access-key-id] at src/config.js:12 (AKIAI************)' },
  { kind: 'log', text: 'Commit blocked by secret scan.' },
  { kind: 'pause', ms: 300 },
  { kind: 'notice' },
  { kind: 'pause', ms: 500 },
  { kind: 'status', text: 'Auto Git: ON', busy: false },
  { kind: 'pause', ms: 400 },
  { kind: 'settings', text: '"autoGitCopilot.scanForSecrets": true,' },
  { kind: 'settings', text: '"autoGitCopilot.protectedBranches": ["main", "master"],' },
  { kind: 'settings', text: '"autoGitCopilot.autoPush": true,' },
  { kind: 'settings', text: '"autoGitCopilot.delayMs": 3000' },
]

const NOTICE = 'Auto Git blocked the commit: AWS access key ID in src/config.js:12. Remove it, add an ignore pattern, or commit anyway.'
const CHAR_MS = 18
const LINE_MS = 160

type View = {
  status: { text: string; busy: boolean } | null
  log: string[]
  settings: string[]
  typing: { target: 'log' | 'settings'; text: string } | null
  notice: boolean
  done: boolean
}
const EMPTY: View = { status: null, log: [], settings: [], typing: null, notice: false, done: false }

function finalView(): View {
  const v: View = { ...EMPTY, log: [], settings: [], done: true }
  for (const step of SCRIPT) {
    if (step.kind === 'status') v.status = { text: step.text, busy: step.busy }
    else if (step.kind === 'log') v.log.push(step.text)
    else if (step.kind === 'settings') v.settings.push(step.text)
    else if (step.kind === 'notice') v.notice = true
  }
  return v
}

function Cursor() {
  return <span aria-hidden="true" className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-accent" />
}

function Body() {
  const { reduced, interact } = useInstrument()
  const [run, setRun] = useState(1)
  const [view, setView] = useState<View>(EMPTY)

  useEffect(() => {
    if (reduced) {
      setView(finalView())
      return
    }
    setView(EMPTY)
    let cancelled = false
    let timer = 0
    let i = 0
    const schedule = (fn: () => void, ms: number) => {
      timer = window.setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
    }
    const typeLine = (target: 'log' | 'settings', text: string, n: number) => {
      if (n < text.length) {
        setView((v) => ({ ...v, typing: { target, text: text.slice(0, n + 1) } }))
        schedule(() => typeLine(target, text, n + 1), CHAR_MS)
        return
      }
      setView((v) => (target === 'log' ? { ...v, typing: null, log: [...v.log, text] } : { ...v, typing: null, settings: [...v.settings, text] }))
      schedule(next, LINE_MS)
    }
    const next = () => {
      if (i >= SCRIPT.length) {
        setView((v) => ({ ...v, done: true }))
        return
      }
      const step = SCRIPT[i++]
      switch (step.kind) {
        case 'status':
          setView((v) => ({ ...v, status: { text: step.text, busy: step.busy } }))
          schedule(next, LINE_MS)
          break
        case 'pause':
          schedule(next, step.ms)
          break
        case 'notice':
          setView((v) => ({ ...v, notice: true }))
          schedule(next, LINE_MS)
          break
        case 'log':
        case 'settings':
          typeLine(step.kind, step.text, 0)
          break
      }
    }
    schedule(next, 300)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [run, reduced])

  const typingIn = (target: 'log' | 'settings') => (view.typing?.target === target ? view.typing.text : null)

  return (
    <div className="grid gap-4 md:grid-cols-12 md:gap-6">
      <div className="md:col-span-7">
        <div className="flex min-h-11 items-center gap-2 border border-rule bg-surface-sunken px-3 font-mono text-[13px] text-ink" aria-live="polite">
          {view.status ? (
            <>
              {view.status.busy ? (
                <ArrowsClockwise size={14} aria-hidden="true" className={cn('text-accent', !reduced && 'animate-spin')} />
              ) : (
                <GitBranch size={14} aria-hidden="true" className="text-accent" />
              )}
              <span>{view.status.text}</span>
            </>
          ) : (
            <span className="text-ink-2">status bar</span>
          )}
        </div>
        <div className="mt-2 min-h-32 border border-rule bg-surface-sunken p-3 font-mono text-[13px] leading-5">
          <p className="text-ink-2">Auto Git output channel</p>
          <ol aria-live="polite" aria-label="Log" className="mt-1 text-ink">
            {view.log.map((line, i) => (
              <li key={i} className="break-words">
                {line}
              </li>
            ))}
          </ol>
          {typingIn('log') !== null ? (
            <p aria-hidden="true" className="break-words text-ink">
              {typingIn('log')}
              <Cursor />
            </p>
          ) : null}
        </div>
      </div>

      <div className="md:col-span-5">
        <div
          role="status"
          aria-live="polite"
          className="border border-rule bg-surface-sunken p-3 text-sm text-ink transition-[opacity,transform] duration-300 ease-out"
          style={{ opacity: view.notice ? 1 : 0, transform: view.notice ? 'none' : 'translateY(6px)' }}
        >
          {view.notice ? (
            <>
              <p className="flex gap-2">
                <Warning size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                <span>{NOTICE}</span>
              </p>
              <p className="mt-2 flex flex-wrap gap-2 font-mono text-[13px]" aria-label="Buttons shown in VS Code: Show Logs, Commit Anyway">
                <span className="border border-rule-strong px-2 py-0.5">Show Logs</span>
                <span className="border border-rule-strong px-2 py-0.5">Commit Anyway</span>
              </p>
            </>
          ) : null}
        </div>
        <div className="mt-2 min-h-32 border border-rule bg-surface-sunken p-3 font-mono text-[13px] leading-5">
          <p className="text-ink-2">settings.json</p>
          <ol aria-live="polite" aria-label="Settings" className="mt-1 text-ink">
            {view.settings.map((line, i) => (
              <li key={i} className="break-words pl-4">
                {line}
              </li>
            ))}
          </ol>
          {typingIn('settings') !== null ? (
            <p aria-hidden="true" className="break-words pl-4 text-ink">
              {typingIn('settings')}
              <Cursor />
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => {
            interact()
            setRun((r) => r + 1)
          }}
          className="press mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-rule-strong px-4 text-sm text-ink hover:bg-surface-sunken"
        >
          <ArrowCounterClockwise size={16} aria-hidden="true" />
          Replay
        </button>
      </div>
    </div>
  )
}

function metric(project: Project, label: string): string | null {
  return project.metrics.find((m) => m.label === label)?.value ?? null
}

export default function Autogit({ project }: { project: Project }) {
  const families = metric(project, 'Secret pattern families')
  const license = metric(project, 'License')
  const status = ['Strings from extension.js and lib/secretScanner.js', families ? `${families} secret pattern families` : null, license].filter(Boolean).join(', ')
  return (
    <Instrument title="Secret scan replay" status={status} slug={project.slug} minHeight={400}>
      <Body />
    </Instrument>
  )
}
