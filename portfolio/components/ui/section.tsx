import { cn } from '@/lib/utils'

export function Section({
  id,
  title,
  intro,
  label,
  className,
  children,
}: {
  id?: string
  title?: string
  intro?: string
  /** Sparse by design: at most one labelled section per three. */
  label?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn('container-site cv-auto py-20 md:py-28', className)}>
      {(title || intro) && (
        <div className="mb-10 max-w-[62ch] md:mb-14">
          {label && <p className="text-label mb-3 text-accent">{label}</p>}
          {title && <h2 className="text-headline">{title}</h2>}
          {intro && <p className="text-lead mt-4 text-ink-2">{intro}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
