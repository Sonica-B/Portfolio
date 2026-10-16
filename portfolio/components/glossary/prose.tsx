import { Fragment, type ReactNode } from 'react'
import { segment } from '@/lib/glossary'
import { Term } from './term'

/**
 * Server component. Renders a sentence with the first occurrence of each glossary term
 * wrapped in <Term> (hover and tap popover). Contract (agent-brief-v2):
 *
 *   <Prose text={string} as?="p" className? seen? />
 *   <ProseList items={string[]} as?="ul" className? itemClassName? seen? />
 *
 * `seen` lets several Prose blocks share "already explained" state so a page or section
 * wraps each term once. Create it per render (`const seen = new Set<string>()` at the top
 * of the page function) and pass the same Set to every block.
 */

type ProseTag = 'p' | 'span' | 'li' | 'div' | 'dd' | 'dt' | 'blockquote' | 'figcaption'

export type ProseProps = {
  text: string
  as?: ProseTag
  className?: string
  seen?: Set<string>
}

// A <button> is an atomic inline, so browsers may break a line between it and the
// bracket or comma touching it ("PHATE" at a line end, ")," starting the next). Glue
// touching punctuation to the term inside a nowrap span so the line breaks like text.
const OPENERS = /[([{"'“‘]+$/
const CLOSERS = /^[)\]}"'”’,.;:!?/]+/

export function Prose({ text, as = 'p', className, seen }: ProseProps) {
  const Tag = as
  const parts = segment(text, seen)
  const texts = parts.map((part) => ('term' in part ? null : part.text))
  const prefixes: string[] = []
  const suffixes: string[] = []

  parts.forEach((part, i) => {
    if (!('term' in part)) return
    const prev = texts[i - 1]
    const before = prev == null ? null : OPENERS.exec(prev)
    if (prev != null && before) {
      prefixes[i] = before[0]
      texts[i - 1] = prev.slice(0, -before[0].length)
    }
    const next = texts[i + 1]
    const after = next == null ? null : CLOSERS.exec(next)
    if (next != null && after) {
      suffixes[i] = after[0]
      texts[i + 1] = next.slice(after[0].length)
    }
  })

  const children: ReactNode[] = parts.map((part, i) => {
    if (!('term' in part)) return <Fragment key={i}>{texts[i]}</Fragment>
    const term = (
      <Term key={i} id={part.term.id} term={part.term.term} tip={part.term.tip} source={part.term.source}>
        {part.text}
      </Term>
    )
    if (!prefixes[i] && !suffixes[i]) return term
    return (
      <span key={i} className="whitespace-nowrap">
        {prefixes[i]}
        {term}
        {suffixes[i]}
      </span>
    )
  })

  return <Tag className={className}>{children}</Tag>
}

export type ProseListProps = {
  items: string[]
  as?: 'ul' | 'ol'
  className?: string
  /** Applied to every <li>. */
  itemClassName?: string
  seen?: Set<string>
}

/** A list of lines (highlights, bullets) with one Prose per line. */
export function ProseList({ items, as = 'ul', className, itemClassName, seen }: ProseListProps) {
  const Tag = as
  return (
    <Tag className={className}>
      {items.map((line, i) => (
        <Prose key={i} as="li" text={line} className={itemClassName} seen={seen} />
      ))}
    </Tag>
  )
}
