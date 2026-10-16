'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { List, MagnifyingGlass, X } from '@phosphor-icons/react'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/projects', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
]

/** Address split by the layout; joined here on click so no markup carries the full string. */
export type NavEmail = { user: string; domain: string }

const openPalette = () => window.dispatchEvent(new CustomEvent('palette:open'))

function useCopyEmail(email: NavEmail, location: string) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    const address = `${email.user}@${email.domain}`
    window.dispatchEvent(new CustomEvent('email:copy', { detail: { location } }))
    track('cta_click', { id: 'email', location })
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1500)
    } catch {
      window.location.href = `mailto:${address}`
    }
  }
  return { copied, copy }
}

function EmailButton({ email, location, className }: { email: NavEmail; location: string; className?: string }) {
  const { copied, copy } = useCopyEmail(email, location)
  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          'press inline-flex h-11 min-w-28 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90',
          className,
        )}
      >
        {copied ? 'Copied' : 'Email me'}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to the clipboard' : ''}
      </span>
    </>
  )
}

function SearchButton() {
  return (
    <button
      type="button"
      onClick={openPalette}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-rule-strong px-3.5 text-sm text-ink-2 transition-[color,border-color,box-shadow] duration-200 hover:border-accent/60 hover:text-ink hover:glow focus-visible:glow"
    >
      <MagnifyingGlass size={16} aria-hidden="true" />
      Search
      <kbd className="hidden font-mono text-xs text-ink-3 sm:inline">Ctrl K</kbd>
    </button>
  )
}

export function Nav({ email }: { email: NavEmail }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-40 safe-top">
      <div className="border-b border-rule/70 bg-surface/80 backdrop-blur-md">
        <nav aria-label="Primary" className="container-site flex h-16 items-center justify-between gap-3">
          <Link href="/" className="font-display text-lg font-bold tracking-tight text-ink" aria-label="Shreya Boyane, home">
            Shreya Boyane
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-sm text-ink-2 transition-colors hover:bg-surface-raised hover:text-ink',
                    isActive(l.href) && 'bg-surface-raised text-ink',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <SearchButton />
            <EmailButton email={email} location="nav" className="hidden md:inline-flex" />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface-raised md:hidden"
            >
              {open ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 top-16 z-40 bg-surface md:hidden"
        style={{ overscrollBehavior: 'contain' }}
      >
        <ul className="container-site flex flex-col gap-1 py-6">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <Link
                ref={i === 0 ? firstLink : undefined}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={cn(
                  'block rounded-card px-4 py-4 font-display text-3xl font-bold tracking-tight text-ink',
                  isActive(l.href) && 'text-accent',
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-4 px-4">
            <EmailButton email={email} location="menu" className="h-12 px-6 text-base" />
          </li>
        </ul>
      </div>
    </header>
  )
}
