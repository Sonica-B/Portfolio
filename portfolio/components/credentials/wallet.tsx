'use client'

import { useCallback, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import { track } from '@/lib/analytics'
import { CredentialDialog, type WalletCredential } from './credential-card'
import { CredentialRail } from './credential-rail'
import { IssuerAnchors, plural, type AnchorItem, type IssuerGroup } from './issuer-anchors'
import { PassStack } from './pass-stack'

export type WalletProps = {
  /** Every credential, newest first. */
  credentials: WalletCredential[]
  /** Issuer groups with two or more credentials, then "Other", sorted by count then name. */
  groups: IssuerGroup[]
  /** Ids of the passes shown in the collapsed stack, top first. */
  stack: string[]
  /** First and last year across the data, for the status line. */
  from: string
  to: string
}

const ALL = 'all'

/** Instrument panel: hud-frame draws the four corner brackets, the rule and ground are ours. */
const FRAME = 'hud-frame border border-rule bg-surface-raised/50 p-4 md:p-6'

/**
 * Client half of the credential wallet. State is one selected group key (or null) and the
 * credential open in the dialog. Escape collapses the rail and returns focus to its anchor.
 */
export function Wallet({ credentials, groups, stack, from, to }: WalletProps) {
  const uid = useId()
  const reduced = useReducedMotion() ?? false
  const [selected, setSelected] = useState<string | null>(null)
  const [viewing, setViewing] = useState<WalletCredential | null>(null)
  const stackRef = useRef<HTMLUListElement>(null)

  const railId = `${uid}-rail`
  const tabId = useCallback((key: string) => `${uid}-tab-${key}`, [uid])

  const byId = useMemo(() => new Map(credentials.map((c) => [c.id, c])), [credentials])
  const pick = (ids: string[]) => ids.map((id) => byId.get(id)).filter((c): c is WalletCredential => !!c)

  const passes = pick(stack)
  const items: AnchorItem[] = [
    ...groups.map(({ key, name, count, kind }) => ({ key, name, count, kind })),
    { key: ALL, name: 'Show all', count: credentials.length, kind: 'all' },
  ]

  const group = selected && selected !== ALL ? groups.find((g) => g.key === selected) : undefined
  const railCards = selected === ALL ? credentials : group ? pick(group.ids) : []
  const railLabel =
    selected === ALL
      ? `All ${plural(credentials.length)}`
      : group?.kind === 'other'
        ? `Other issuers, ${plural(group.count)}`
        : group
          ? `${group.name}, ${plural(group.count)}`
          : ''

  const select = (key: string | null) => {
    setSelected(key)
    if (!key) return
    const g = groups.find((x) => x.key === key)
    track('wallet_open', { issuer: key === ALL ? ALL : g?.kind === 'other' ? 'other' : (g?.name ?? key) })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Escape' || !selected) return
    // The dialog handles its own Escape; the keydown still bubbles through here.
    if ((e.target as HTMLElement).closest('dialog')) return
    e.preventDefault()
    const key = selected
    setSelected(null)
    document.getElementById(tabId(key))?.focus()
  }

  const status = `${plural(credentials.length)}, ${from} to ${to}`

  return (
    <div onKeyDown={onKeyDown} data-open={selected ? 'true' : 'false'} className={FRAME}>
      <div className="grid gap-5 md:grid-cols-[minmax(0,30%)_minmax(0,1fr)] md:items-start md:gap-8">
        <PassStack passes={passes} open={selected !== null} status={status} stackRef={stackRef} onView={setViewing} />
        <IssuerAnchors items={items} selected={selected} railId={railId} tabId={tabId} onSelect={select} />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {selected ? (
          <CredentialRail
            key={selected}
            id={railId}
            label={railLabel}
            credentials={railCards}
            stackRef={stackRef}
            reduced={reduced}
            onView={setViewing}
          />
        ) : null}
      </AnimatePresence>
      <CredentialDialog credential={viewing} onClose={() => setViewing(null)} />
    </div>
  )
}
