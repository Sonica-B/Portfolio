import { Fragment } from 'react'
import { Prose } from '@/components/glossary/prose'
import type { Pitch } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * A number in a sentence, with its %, x or + suffix when attached: "93%", "1.5x", "5,000+", "0.031".
 * The first group captures the boundary character, so digits glued to letters or hyphens
 * (p95, 3D, GPT-2, Apache-2.0, sub-500) stay part of their word.
 */
const NUMBER = /(^|[^\w.-])(\d+(?:[.,]\d+)*(?:%|x(?!\d))?\+?)(?!\w)/g

/** The sentence with every number in a `text-metric` span: mono and tabular, as the HUD grammar asks. */
export function Numbers({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(NUMBER)) {
    const start = (m.index ?? 0) + m[1].length
    if (start > last) parts.push(<Fragment key={`t${last}`}>{text.slice(last, start)}</Fragment>)
    parts.push(
      <span key={`n${start}`} className="text-metric">
        {m[2]}
      </span>,
    )
    last = start + m[2].length
  }
  if (last < text.length) parts.push(<Fragment key={`t${last}`}>{text.slice(last)}</Fragment>)
  return <>{parts}</>
}

// Same mono label as the instrument shell title, so the strip reads as instrument chrome.
const LABEL = 'font-mono text-[13px] uppercase leading-5 tracking-[0.08em]'
const CELL = 'p-4 md:p-6'
const NEXT_CELL = 'border-t border-rule md:border-t-0 md:border-l'

/**
 * The three-second strip: Problem, What she did, What changed, from `project.pitch`, in one panel row.
 * Phones stack the three cells with hairlines; from 768 px they sit side by side with vertical rules.
 * Pass the page's `seen` set so a glossary term is explained here once and not again below.
 */
export function PitchStrip({ pitch, seen, className }: { pitch: Pitch; seen?: Set<string>; className?: string }) {
  return (
    <dl className={cn('panel grid grid-cols-1 md:grid-cols-3', className)}>
      <div className={CELL}>
        <dt className={cn(LABEL, 'text-ink-2')}>Problem</dt>
        <Prose as="dd" text={pitch.problem} className="mt-2 text-ink-2" seen={seen} />
      </div>
      <div className={cn(CELL, NEXT_CELL)}>
        <dt className={cn(LABEL, 'text-ink-2')}>What she did</dt>
        <Prose as="dd" text={pitch.action} className="mt-2 text-ink-2" seen={seen} />
      </div>
      <div className={cn(CELL, NEXT_CELL)}>
        <dt className={cn(LABEL, 'text-accent')}>What changed</dt>
        <dd className="mt-2 text-ink">
          <Numbers text={pitch.change} />
        </dd>
      </div>
    </dl>
  )
}
