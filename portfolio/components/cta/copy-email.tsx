'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Copy, WarningCircle } from '@/components/ui/icons'
import { track } from '@/lib/analytics'
import { cx } from '@/lib/cx'
import { pill, type PillVariant } from './actions'
import type { EmailParts } from './email'

/** How long the failure message shows before the mail app opens. */
const FALLBACK_MS = 1200
const FAILED_LABEL = 'Copy failed, opening mail app'

/**
 * Joins the two halves and copies the address. When the Clipboard API is missing or refuses, it
 * resolves false and opens the mail client after FALLBACK_MS, so the caller can say so first.
 */
export async function copyEmail(parts: EmailParts): Promise<boolean> {
  const address = parts[0] + parts[1]
  try {
    await navigator.clipboard.writeText(address)
    return true
  } catch {
    window.setTimeout(() => {
      window.location.href = `mailto:${address}`
    }, FALLBACK_MS)
    return false
  }
}

// One window listener for the "email:copy" CustomEvent (the nav dispatches it). The first mounted
// button answers so the visitor sees "Copied"; with no button on screen the address is still copied.
type Handler = { current: () => void }
const buttons = new Set<Handler>()
let fallback: EmailParts | null = null
let installed = false
function onEmailCopy() {
  const first = buttons.values().next().value
  if (first) first.current()
  else if (fallback) void copyEmail(fallback)
}

/** Subscribe to "email:copy". Pass a handler to answer with UI feedback; omit it to only provide the silent fallback. */
export function useEmailCopyEvent(parts: EmailParts, handler?: () => void) {
  const ref = useRef<() => void>(() => {})
  ref.current = handler ?? (() => {})
  const hasHandler = Boolean(handler)
  const [user, host] = parts
  useEffect(() => {
    fallback = [user, host]
    if (!installed) {
      window.addEventListener('email:copy', onEmailCopy)
      installed = true
    }
    if (!hasHandler) return
    buttons.add(ref)
    return () => {
      buttons.delete(ref)
    }
  }, [user, host, hasHandler])
}

type Props = {
  parts: EmailParts
  /** cta_click location, "hero" by default. */
  location?: string
  variant?: PillVariant
  /** Icon-first toolbar style with the label hidden on phones. */
  compact?: boolean
  className?: string
}

type State = 'idle' | 'copied' | 'failed'
const LABEL: Record<State, string> = { idle: 'Copy email', copied: 'Copied', failed: FAILED_LABEL }
const ICON = { idle: Copy, copied: Check, failed: WarningCircle }

export function CopyEmail({ parts, location = 'hero', variant = 'secondary', compact, className }: Props) {
  const [state, setState] = useState<State>('idle')
  const timer = useRef(0)

  const run = useCallback(async () => {
    const ok = await copyEmail(parts)
    setState(ok ? 'copied' : 'failed')
    window.clearTimeout(timer.current)
    // A failure stays up past the hand-off to the mail app, so a device without one still shows why nothing was copied.
    timer.current = window.setTimeout(() => setState('idle'), ok ? 1500 : FALLBACK_MS + 3000)
  }, [parts])

  useEmailCopyEvent(parts, run)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onClick = () => {
    track('cta_click', { id: 'email', location })
    void run()
  }
  const Icon = ICON[state]

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-live="polite"
        className={cx(
          compact
            ? 'press inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-ink transition-colors hover:bg-surface'
            : cx(pill.base, pill[variant]),
          className,
        )}
      >
        <Icon size={compact ? 18 : 16} aria-hidden="true" />
        <span className={compact ? 'sr-only md:not-sr-only' : undefined}>{LABEL[state]}</span>
      </button>
      {compact && state === 'failed' ? (
        // Phones hide the compact label, so the failure shows above the toolbar (its positioned parent).
        // The button's own live label already announces it, hence aria-hidden here.
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-full mb-2 rounded-lg border border-rule bg-surface-raised px-3 py-2 text-center text-sm text-ink md:hidden"
        >
          {FAILED_LABEL}
        </span>
      ) : null}
    </>
  )
}
