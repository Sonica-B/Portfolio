'use client'

import { useEffect, useState, type ComponentType } from 'react'
import { afterPaintIdle } from '@/lib/idle'
import type { EmailParts } from './email'
import { PALETTE_INDEX_URL, type PaletteEntry } from './palette-types'

type DialogProps = { entries: PaletteEntry[]; email: EmailParts; openOnMount?: boolean }
type Loaded = { Dialog: ComponentType<DialogProps>; entries: PaletteEntry[] }

let pending: Promise<Loaded> | null = null

/** The dialog code and the static index, fetched once per page load; a failed fetch is retried on the next request. */
function loadPalette(): Promise<Loaded> {
  if (!pending) {
    const index = fetch(PALETTE_INDEX_URL)
      .then((res) => (res.ok ? (res.json() as Promise<PaletteEntry[]>) : Promise.reject(new Error(String(res.status)))))
      .then((rows) => (Array.isArray(rows) ? rows : []))
    pending = Promise.all([import('./palette-dialog'), index]).then(([mod, entries]) => ({ Dialog: mod.PaletteDialog, entries }))
    pending.catch(() => {
      pending = null
    })
  }
  return pending
}

const isPaletteKey = (e: KeyboardEvent) => (e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'k'

/**
 * Stands in for the palette until it is needed. The dialog chunk and /palette-index.json load when
 * the page is idle after its first paint, or at once on Ctrl K, Cmd K or a "palette:open" event, in
 * which case the palette opens as soon as they arrive. From then on the dialog owns those triggers.
 */
export function PaletteLoader({ email }: { email: EmailParts }) {
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  const [openOnMount, setOpenOnMount] = useState(false)

  useEffect(() => {
    if (loaded) return
    let active = true
    const load = (open: boolean) => {
      if (open) setOpenOnMount(true)
      loadPalette().then(
        (result) => active && setLoaded(result),
        () => {
          // Offline or a failed deploy: the next shortcut tries again.
        },
      )
    }
    const onKey = (e: KeyboardEvent) => {
      if (!isPaletteKey(e)) return
      e.preventDefault()
      load(true)
    }
    const onOpen = () => load(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('palette:open', onOpen)
    const cancelIdle = afterPaintIdle(() => load(false), 4000)
    return () => {
      active = false
      cancelIdle()
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('palette:open', onOpen)
    }
  }, [loaded])

  if (!loaded) return null
  const { Dialog, entries } = loaded
  return <Dialog entries={entries} email={email} openOnMount={openOnMount} />
}
