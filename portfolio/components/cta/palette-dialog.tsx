'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowSquareOut, MagnifyingGlass, X } from '@/components/ui/icons'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { copyEmail } from './copy-email'
import type { EmailParts } from './email'
import { PALETTE_GROUPS, type PaletteEntry } from './palette-types'

const PER_GROUP = 6
const MAX = 24
const PITCH_SLUG = 'skiplegal'
const EXTERNAL = /^https?:/i

/** Substring match on title and keywords, grouped in PALETTE_GROUPS order, title hits first. */
function search(entries: PaletteEntry[], query: string): PaletteEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return entries.filter((e) => e.group === 'Sections' || e.group === 'Actions')
  const out: PaletteEntry[] = []
  for (const group of PALETTE_GROUPS) {
    const hits = entries.filter((e) => e.group === group && (e.title.toLowerCase().includes(q) || e.keywords.includes(q)))
    hits.sort((a, b) => Number(b.title.toLowerCase().includes(q)) - Number(a.title.toLowerCase().includes(q)))
    out.push(...hits.slice(0, PER_GROUP))
    if (out.length >= MAX) break
  }
  return out.slice(0, MAX)
}

function dispatch(name: string, detail?: unknown) {
  window.dispatchEvent(new CustomEvent(name, { detail }))
}

type Props = {
  entries: PaletteEntry[]
  email: EmailParts
  /** Open right after mounting: the visitor asked for the palette before its code had loaded (palette-loader.tsx). */
  openOnMount?: boolean
}

/** Native <dialog> command palette. Opens on Ctrl K, Cmd K or the "palette:open" event; mirrors "palette:state". */
export function PaletteDialog({ entries, email, openOnMount = false }: Props) {
  const router = useRouter()
  const id = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [notice, setNotice] = useState('')
  const results = useMemo(() => search(entries, query), [entries, query])
  const index = Math.min(active, Math.max(0, results.length - 1))
  const current: PaletteEntry | undefined = results[index]
  const optionId = (i: number) => `${id}-option-${i}`

  const openPalette = useCallback(() => {
    const d = dialogRef.current
    if (!d || d.open) return
    d.showModal()
    setOpen(true)
    setQuery('')
    setActive(0)
    setNotice('')
    track('palette_open')
    dispatch('palette:state', { open: true })
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [])
  const closePalette = useCallback(() => dialogRef.current?.close(), [])
  const onClose = () => {
    setOpen(false)
    dispatch('palette:state', { open: false })
  }

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey || e.key.toLowerCase() !== 'k') return
      e.preventDefault()
      if (dialogRef.current?.open) closePalette()
      else openPalette()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('palette:open', openPalette)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('palette:open', openPalette)
    }
  }, [openPalette, closePalette])

  // Mount-time only: a later prop change never reopens a palette the visitor closed.
  const openedOnMount = useRef(false)
  useEffect(() => {
    if (!openOnMount || openedOnMount.current) return
    openedOnMount.current = true
    openPalette()
  }, [openOnMount, openPalette])

  // The page behind the modal must not scroll.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    document.getElementById(`${id}-option-${index}`)?.scrollIntoView({ block: 'nearest' })
  }, [id, index])

  const run = async (entry: PaletteEntry) => {
    track('palette_action', { id: entry.id })
    if (entry.action === 'email') {
      const ok = await copyEmail(email)
      setNotice(ok ? 'Email copied' : 'Opening your mail app')
      window.setTimeout(closePalette, 1200)
      return
    }
    closePalette()
    if (entry.action === 'pitch') {
      dispatch('reel:open', { slug: PITCH_SLUG, location: 'palette' })
      return
    }
    if (!entry.href) return
    if (EXTERNAL.test(entry.href)) {
      window.open(entry.href, '_blank', 'noopener,noreferrer')
      return
    }
    if (entry.download) {
      const a = document.createElement('a')
      a.href = entry.href
      a.download = ''
      a.click()
      return
    }
    const [path, hash] = entry.href.split('#')
    if (hash && path === window.location.pathname) window.location.hash = hash
    else router.push(entry.href)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const n = results.length
    if (e.key === 'ArrowDown') setActive(n ? (index + 1) % n : 0)
    else if (e.key === 'ArrowUp') setActive(n ? (index - 1 + n) % n : 0)
    else if (e.key === 'Home') setActive(0)
    else if (e.key === 'End') setActive(Math.max(0, n - 1))
    else if (e.key === 'Enter' && current) void run(current)
    else return
    e.preventDefault()
  }

  let lastGroup = ''
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && closePalette()}
      aria-label="Search this site"
      className="fixed top-auto right-0 bottom-0 left-0 m-0 h-auto max-h-[85dvh] w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-surface/70 backdrop:backdrop-blur-sm md:top-[12vh] md:right-auto md:bottom-auto md:left-1/2 md:w-[36rem] md:-translate-x-1/2"
    >
      <div
        className="panel flex max-h-[85dvh] flex-col overflow-hidden rounded-t-xl border border-rule bg-surface-raised md:max-h-[70vh] md:rounded-xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* The input drops its own outline; the bar carries the accent ring instead, inset so the panel does not clip it. */}
        <div className="flex items-center gap-2 border-b border-rule px-3 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent">
          <MagnifyingGlass size={18} aria-hidden="true" className="shrink-0 text-ink-2" />
          <input
            ref={inputRef}
            id={`${id}-input`}
            name="palette-query"
            type="text"
            role="combobox"
            aria-label="Search this site"
            aria-expanded={open}
            aria-controls={`${id}-list`}
            aria-activedescendant={current ? optionId(index) : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="go"
            placeholder="Search projects, papers, skills, actions…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-3"
          />
          <button
            type="button"
            onClick={closePalette}
            aria-label="Close search"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-2 hover:bg-surface hover:text-ink"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div id={`${id}-list`} role="listbox" aria-label="Results" className="overflow-y-auto overscroll-contain p-2">
          {results.length === 0 && <p className="px-3 py-6 text-sm text-ink-2">Nothing matches. Try a project, a tool or an organization.</p>}
          {results.map((entry, i) => {
            const header = entry.group !== lastGroup
            lastGroup = entry.group
            return (
              <div key={entry.id} role="presentation">
                {header && <p className="text-label px-3 pt-3 pb-1 text-ink-2">{entry.group}</p>}
                <div
                  id={optionId(i)}
                  role="option"
                  aria-selected={i === index}
                  onMouseMove={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => void run(entry)}
                  className={cn('flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 py-2', i === index ? 'bg-surface' : undefined)}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">{entry.title}</span>
                    {entry.hint && <span className="block truncate text-xs text-ink-2">{entry.hint}</span>}
                  </span>
                  {entry.href && EXTERNAL.test(entry.href) && <ArrowSquareOut size={16} aria-hidden="true" className="shrink-0 text-ink-2" />}
                </div>
              </div>
            )
          })}
        </div>

        <p aria-live="polite" className="flex items-center justify-between gap-3 border-t border-rule px-4 py-2 font-mono text-xs text-ink-2">
          <span>{notice || 'Arrow keys to move, Enter to open, Escape to close'}</span>
          <span className="hidden md:inline">Ctrl K or Cmd K</span>
        </p>
      </div>
    </dialog>
  )
}
