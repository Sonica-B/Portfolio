'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Copy } from '@phosphor-icons/react'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { pill, type PillVariant } from './actions'
import type { EmailParts } from './email'

/** Joins the two halves and copies the address; when the Clipboard API is missing or refuses, opens the mail client. */
export async function copyEmail(parts: EmailParts): Promise<boolean> {
  const address = parts[0] + parts[1]
  try {
    await navigator.clipboard.writeText(address)
    return true
  } catch {
    window.location.href = `mailto:${address}`
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

export function CopyEmail({ parts, location = 'hero', variant = 'secondary', compact, className }: Props) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  const run = useCallback(async () => {
    if (!(await copyEmail(parts))) return
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1500)
  }, [parts])

  useEmailCopyEvent(parts, run)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onClick = () => {
    track('cta_click', { id: 'email', location })
    void run()
  }
  const Icon = copied ? Check : Copy

  return (
    <button
      type="button"
      onClick={onClick}
      aria-live="polite"
      className={cn(
        compact
          ? 'press inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-ink transition-colors hover:bg-surface'
          : cn(pill.base, pill[variant]),
        className,
      )}
    >
      <Icon size={compact ? 18 : 16} aria-hidden="true" />
      <span className={compact ? 'sr-only md:not-sr-only' : undefined}>{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  )
}
