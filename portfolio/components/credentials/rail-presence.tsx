'use client'

import type { ComponentProps } from 'react'
import { AnimatePresence } from 'motion/react'
import { CredentialRail } from './credential-rail'

type Props = Omit<ComponentProps<typeof CredentialRail>, 'id'> & {
  /** Selected group key, null when the rail is closed. Keys the rail so a new group fades in after the old one leaves. */
  selected: string | null
  railId: string
}

/**
 * The fanned-out rail with its enter and exit fade. Its own module so the wallet loads it (and the
 * motion library) only when a visitor reaches for the wallet, not with the about page.
 */
export default function RailPresence({ selected, railId, ...rail }: Props) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {selected ? <CredentialRail key={selected} id={railId} {...rail} /> : null}
    </AnimatePresence>
  )
}
