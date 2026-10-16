'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { List, MagnifyingGlass, X } from '@/components/ui/icons'
import { track } from '@/lib/analytics'
import { cx } from '@/lib/cx'

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

// The two placements, written out in full (no class merging): the bar hides it below md, the menu is larger.
const EMAIL_BUTTON = {
  bar: 'press hidden h-11 min-w-28 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90 md:inline-flex',
  menu: 'press inline-flex h-12 min-w-28 items-center justify-center rounded-full bg-accent px-6 text-base font-medium text-accent-ink transition-opacity hover:opacity-90',
}

function EmailButton({ email, location, placement }: { email: NavEmail; location: string; placement: keyof typeof EMAIL_BUTTON }) {
  const { copied, copy } = useCopyEmail(email, location)
  return (
    <>
      <button type="button" onClick={copy} className={EMAIL_BUTTON[placement]}>
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
  const toggle = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDialogElement>(null)

  useEffect(() => setOpen(false), [pathname])

  // The menu is a native modal <dialog>: showModal() makes the rest of the page inert and
  // keeps Tab inside it, Escape fires "close", and onClose hands focus back to the toggle.
  useEffect(() => {
    const d = menu.current
    if (!d) return
    if (!open) {
      if (d.open) d.close()
      return
    }
    if (!d.open) d.showModal()
    firstLink.current?.focus()
    document.body.style.overflow = 'hidden'
    // The menu only exists below md; widening the window past it closes the modal.
    const wide = window.matchMedia('(min-width: 48rem)')
    const onWide = (e: MediaQueryListEvent) => e.matches && setOpen(false)
    wide.addEventListener('change', onWide)
    return () => {
      wide.removeEventListener('change', onWide)
      document.body.style.overflow = ''
    }
  }, [open])

  const onMenuClose = () => {
    setOpen(false)
    toggle.current?.focus()
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-40 safe-top">
      <div className="nav-glass border-b border-rule/70 bg-surface/80">
        <nav aria-label="Primary" className="container-site flex h-16 items-center justify-between gap-3">
          <Link href="/" className="inline-flex min-h-11 items-center font-display text-lg font-bold tracking-tight text-ink" aria-label="Shreya Boyane, home">
            Shreya Boyane
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={cx(
                    'rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-surface-raised hover:text-ink',
                    isActive(l.href) ? 'bg-surface-raised text-ink' : 'text-ink-2',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <SearchButton />
            <EmailButton email={email} location="nav" placement="bar" />
            <button
              ref={toggle}
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

      {/* Full-screen in the top layer with a transparent band over the bar, so the header stays
          visible; the band's close button sits exactly over the toggle. A tap on the band closes. */}
      <dialog
        ref={menu}
        id="mobile-menu"
        aria-label="Menu"
        onClose={onMenuClose}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-transparent md:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="pointer-events-none shrink-0 safe-top">
            <div className="container-site flex h-16 items-center justify-end">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface-raised"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto bg-surface" style={{ overscrollBehavior: 'contain' }}>
            <ul className="container-site flex flex-col gap-1 py-6">
              {LINKS.map((l, i) => (
                <li key={l.href}>
                  <Link
                    ref={i === 0 ? firstLink : undefined}
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={cx(
                      'block rounded-card px-4 py-4 font-display text-3xl font-bold tracking-tight',
                      isActive(l.href) ? 'text-accent' : 'text-ink',
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-4 px-4">
                <EmailButton email={email} location="menu" placement="menu" />
              </li>
            </ul>
          </div>
        </div>
      </dialog>
    </header>
  )
}
