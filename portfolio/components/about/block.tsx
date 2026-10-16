import { cn } from '@/lib/utils'

/**
 * One panel of the About sheet: a hairline above, the h2 with its anchor, an optional one-line intro
 * and the content. Dense rhythm (32 to 40 px of padding) so seven blocks read as one dashboard.
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
    <section id={id} aria-labelledby={`${id}-title`} className={cn('hairline scroll-mt-24 py-8 md:py-10', className)}>
      <h2 id={`${id}-title`} className="text-headline">
        {title}
      </h2>
      {intro ? <p className="mt-3 max-w-[62ch] text-ink-2">{intro}</p> : null}
      <div className="mt-6 md:mt-8">{children}</div>
    </section>
  )
}
