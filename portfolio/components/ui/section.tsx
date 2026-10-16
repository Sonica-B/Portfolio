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
    // No content-visibility: skipped sections drop their headings from the accessibility tree until scrolled near.
    // relative plus overflow-x clip keep what its containment gave: an absolutely positioned child of a sideways
    // rail (an sr-only label in the pitch reel) resolves against the section and cannot widen the page.
    <section id={id} className={cn('container-site relative overflow-x-clip py-16 md:py-24', className)}>
      {(title || intro) && (
        <div className="mb-8 max-w-[62ch] md:mb-10">
          {label && <p className="text-label mb-3 text-accent">{label}</p>}
          {title && <h2 className="text-headline">{title}</h2>}
          {intro && <p className="text-lead mt-4 text-ink-2">{intro}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
