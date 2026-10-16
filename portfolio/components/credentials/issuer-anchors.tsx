'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { getLogo } from '@/lib/logos'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'
import { Monogram } from './credential-card'

export type IssuerGroup = {
  /** URL-safe key, used in element ids and analytics. */
  key: string
  /** The issuer string exactly as written in profile.json, or "Other" for the singletons. */
  name: string
  count: number
  ids: string[]
  kind: 'issuer' | 'other'
}

export type AnchorItem = {
  key: string
  name: string
  count: number
  kind: 'issuer' | 'other' | 'all'
}

export function plural(n: number): string {
  return `${n} ${n === 1 ? 'credential' : 'credentials'}`
}

/** Logo when one was sourced in content/logos.json, otherwise the issuer's monogram token. */
function Mark({ name }: { name: string }) {
  if (!getLogo(name)) return <Monogram name={name} />
  return (
    <span className="grid size-7 shrink-0 place-items-center">
      <Logo name={name} height={18} />
    </span>
  )
}

/**
 * One anchor per issuer group plus "Show all". A tablist with roving tabindex: arrow keys move,
 * Enter or Space toggles. Below md the anchors wrap as chips showing the mark and the count,
 * from md up they form a compact ledger with the issuer name.
 */
export function IssuerAnchors({
  items,
  selected,
  railId,
  tabId,
  onSelect,
}: {
  items: AnchorItem[]
  selected: string | null
  railId: string
  tabId: (key: string) => string
  onSelect: (key: string | null) => void
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const [cursor, setCursor] = useState(0)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = refs.current.indexOf(e.target as HTMLButtonElement)
    if (index < 0) return
    const last = items.length - 1
    let next: number
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = index === last ? 0 : index + 1
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        next = index === 0 ? last : index - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }
    e.preventDefault()
    refs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="Issuers"
      aria-orientation="vertical"
      onKeyDown={onKeyDown}
      className="flex min-w-0 flex-wrap gap-2 md:flex-col md:gap-0 md:divide-y md:divide-rule md:border-y md:border-rule"
    >
      {items.map((item, i) => {
        const active = item.key === selected
        return (
          <button
            key={item.key}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={tabId(item.key)}
            aria-selected={active}
            aria-expanded={active}
            aria-controls={active ? railId : undefined}
            tabIndex={i === cursor ? 0 : -1}
            onFocus={() => setCursor(i)}
            onClick={() => onSelect(active ? null : item.key)}
            className={cn(
              'group press flex min-h-11 items-center gap-2 rounded-full border border-rule px-2.5 text-sm text-ink-2 transition-colors hover:border-rule-strong hover:text-ink',
              'aria-selected:border-accent aria-selected:text-ink',
              'md:w-full md:gap-3 md:rounded-none md:border-0 md:px-2 md:hover:bg-surface-sunken/60 md:aria-selected:bg-surface-sunken',
            )}
          >
            {item.kind === 'issuer' ? <Mark name={item.name} /> : null}
            <span
              className={cn(
                'min-w-0 md:flex-1 md:truncate md:text-left',
                item.kind === 'issuer' && 'sr-only md:not-sr-only',
              )}
            >
              {item.kind === 'all' ? (
                <>
                  <span className="md:hidden">All</span>
                  <span className="hidden md:inline">Show all</span>
                </>
              ) : (
                item.name
              )}
            </span>
            <span className="text-metric text-ink">
              {item.count}
              <span className="sr-only"> credentials</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
