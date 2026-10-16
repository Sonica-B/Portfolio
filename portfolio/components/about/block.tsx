import { cn } from '@/lib/utils'

/**
 * One panel of the About sheet: the h2 with its anchor, an optional one-line intro and the content.
 * Spacing and the headline step separate the blocks (no rule); 40 to 48 px of padding keeps the rhythm dense.
 */
export function Block({
  id,
  title,
  intro,
  className,
  children,
}: {
  id: string
  title: string
  intro?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('py-10 md:py-12', className)}>
      <h2 id={`${id}-title`} className="text-headline">
        {title}
      </h2>
      {intro ? <p className="mt-3 max-w-[62ch] text-ink-2">{intro}</p> : null}
      <div className="mt-6 md:mt-8">{children}</div>
    </section>
  )
}
