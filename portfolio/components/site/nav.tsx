'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import { ThemeToggle } from '@/components/site/theme-toggle'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/projects', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
]

export function Nav() {
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
      <div className="bg-surface/80 backdrop-blur-md border-b border-rule/70">
        <nav aria-label="Primary" className="container-site flex h-16 items-center justify-between gap-4">
          <Link href="/" className="font-display text-[1.05rem] font-semibold tracking-tight text-ink" aria-label="Shreya Boyane, home">
            Shreya Boyane
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm text-ink-2 transition-colors hover:bg-surface-raised hover:text-ink',
                  isActive(l.href) && 'bg-surface-raised text-ink',
                )}
              >
                {l.label}
              </Link>
            ))}
            <span className="mx-1 h-5 w-px bg-rule" aria-hidden="true" />
            <ThemeToggle />
            <a
              href="mailto:shreyaa.boyane@gmail.com"
              className="press ml-1 inline-flex h-10 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              Email me
            </a>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface-raised"
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
                  'block rounded-card px-4 py-4 font-display text-3xl font-semibold tracking-tight text-ink',
                  isActive(l.href) && 'text-accent',
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-4 px-4">
            <a href="mailto:shreyaa.boyane@gmail.com" className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-base font-medium text-accent-ink">
              Email me
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
