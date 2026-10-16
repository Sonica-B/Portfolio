'use client'

import type { ReactNode } from 'react'
import { ArrowUpRight, Play } from '@phosphor-icons/react'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'

export type PillVariant = 'primary' | 'secondary'

/** Mirrors components/ui/button.tsx so client-side actions match the server ButtonLink. */
export const pill: Record<PillVariant | 'base', string> = {
  base: 'press inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium whitespace-nowrap transition-[background-color,opacity,border-color] duration-200',
  primary: 'bg-accent text-accent-ink hover:opacity-90',
  secondary: 'border border-rule-strong text-ink hover:bg-surface-raised',
}

type LinkProps = {
  href: string
  /** cta_click id, for example "resume" or "call". */
  id: string
  /** cta_click location, for example "hero" or "island". */
  location: string
  variant?: PillVariant
  download?: boolean
  className?: string
  children: ReactNode
}

/** Anchor that reports a cta_click before the browser follows it. http(s) URLs open in a new tab. */
export function TrackLink({ href, id, location, variant = 'primary', download, className, children }: LinkProps) {
  const external = /^https?:/i.test(href)
  return (
    <a
      href={href}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={() => track('cta_click', { id, location })}
      className={cn(pill.base, pill[variant], className)}
    >
      {children}
      {external && <ArrowUpRight size={16} aria-hidden="true" />}
    </a>
  )
}

type PitchProps = {
  slug: string
  location: string
  label?: string
  variant?: PillVariant
  className?: string
}

/** Opens the shared pitch lightbox (components/reel/reel-provider.tsx listens for reel:open). */
export function WatchPitch({ slug, location, label = 'Watch the 25 s pitch', variant = 'secondary', className }: PitchProps) {
  const open = () => {
    track('cta_click', { id: 'pitch', location })
    window.dispatchEvent(new CustomEvent('reel:open', { detail: { slug, location } }))
  }
  return (
    <button type="button" onClick={open} className={cn(pill.base, pill[variant], className)}>
      <Play size={16} aria-hidden="true" />
      {label}
    </button>
  )
}
