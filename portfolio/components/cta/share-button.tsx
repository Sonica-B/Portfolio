'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ShareNetwork } from '@/components/ui/icons'
import { track } from '@/lib/analytics'
import { cx } from '@/lib/cx'
import { pill, type PillVariant } from './actions'

type Props = {
  /** Share text; server callers pass profile.identity.headline. Falls back to the document title. */
  text?: string
  title?: string
  /** Defaults to the current URL. */
  url?: string
  /** cta_click location, "page" by default. */
  location?: string
  variant?: PillVariant
  className?: string
}

/** Web Share sheet where the browser has one, otherwise copies the link and says so for 1.5 s. */
export function ShareButton({ text, title, url, location = 'page', variant = 'secondary', className }: Props) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const share = async () => {
    track('cta_click', { id: 'share', location })
    const data = { title: title ?? document.title, text: text ?? document.title, url: url ?? window.location.href }
    if (typeof navigator.share === 'function' && (typeof navigator.canShare !== 'function' || navigator.canShare(data))) {
      try {
        await navigator.share(data)
        return
      } catch (error) {
        // A dismissed sheet is not a failure; anything else falls through to copying the link.
        if (error instanceof DOMException && error.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(data.url)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // No clipboard either: the address bar still has the link.
    }
  }

  const Icon = copied ? Check : ShareNetwork
  return (
    <button type="button" onClick={() => void share()} aria-live="polite" className={cx(pill.base, pill[variant], className)}>
      <Icon size={16} aria-hidden="true" />
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}
