import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const base =
  'press inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,opacity,transform] duration-200'
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-ink hover:opacity-90',
  secondary: 'border border-rule-strong text-ink hover:border-accent/60 hover:glow focus-visible:glow',
  ghost: 'px-2 text-ink-2 hover:text-accent [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:translate-x-0.5',
}

/** The three button looks as one class string, for real <button> elements in client components. */
export function buttonClass(variant: ButtonVariant = 'primary', className?: string) {
  return cn(base, variants[variant], className)
}

export function ButtonLink({
  href,
  variant = 'primary',
  external,
  className,
  children,
  download,
}: {
  href: string
  variant?: ButtonVariant
  external?: boolean
  className?: string
  children: React.ReactNode
  download?: boolean
}) {
  const cls = buttonClass(variant, className)
  const isExternal = external ?? /^(https?:|mailto:)/.test(href)
  const newTab = isExternal && !href.startsWith('mailto:')
  // Ghost is "text with arrow": outward arrow for a new tab, forward arrow for a page on this site.
  const arrow = newTab ? (
    <ArrowUpRight size={16} aria-hidden="true" />
  ) : variant === 'ghost' ? (
    <ArrowRight size={16} aria-hidden="true" />
  ) : null
  if (isExternal || download) {
    return (
      <a
        href={href}
        className={cls}
        download={download}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        {children}
        {arrow}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  )
}
