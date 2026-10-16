import { cn } from '@/lib/utils'

/**
 * Instrument panel in the HUD grammar: raised surface, square corners so the brackets sit flush,
 * a rule at 60 percent, four corner brackets (hud-frame utility), an optional mono title at the
 * top left and a text-status line at the bottom. Server component; wrap client instruments in it.
 */
export function HudFrame({
  title,
  status,
  className,
  children,
}: {
  title?: string
  status?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('hud-frame border border-rule/60 bg-surface-raised p-4 md:p-5', className)}>
      {title ? <p className="font-mono text-sm text-ink">{title}</p> : null}
      <div className={cn(title && 'mt-3')}>{children}</div>
      {status ? <p className="text-status mt-3">{status}</p> : null}
    </div>
  )
}
