import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'press inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium whitespace-nowrap transition-[background-color,opacity,border-color] duration-200'
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:opacity-90',
  secondary: 'border border-rule-strong text-ink hover:bg-surface-raised',
  ghost: 'px-2 text-ink-2 hover:text-ink underline-offset-4 hover:underline',
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
  variant?: Variant
  external?: boolean
  className?: string
  children: React.ReactNode
  download?: boolean
}) {
  const cls = cn(base, variants[variant], className)
  const isExternal = external ?? /^(https?:|mailto:)/.test(href)
  const isMail = href.startsWith('mailto:')
  if (isExternal || download) {
    return (
      <a
        href={href}
        className={cls}
        download={download}
        target={isExternal && !isMail ? '_blank' : undefined}
        rel={isExternal && !isMail ? 'noopener noreferrer' : undefined}
      >
        {children}
        {isExternal && !isMail && <ArrowUpRight size={16} aria-hidden="true" />}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
