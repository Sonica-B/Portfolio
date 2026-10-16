import { getLogo } from '@/lib/logos'
import { cn } from '@/lib/utils'

type Props = {
  /** Organization name exactly as written in profile.json. */
  name: string
  /** Rendered height in px; width follows the file's aspect ratio. */
  height?: number
  /** Monochrome at rest (ink tint), colour on hover of the nearest `group`. */
  mono?: boolean
  className?: string
}

/**
 * Organization logo from content/logos.json. Renders nothing when no logo was sourced,
 * so callers can place it unconditionally next to a name.
 */
export function Logo({ name, height = 20, mono = true, className }: Props) {
  const logo = getLogo(name)
  if (!logo) return null
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={logo.alt}
      height={height}
      loading="lazy"
      decoding="async"
      className={cn(
        'inline-block w-auto max-w-[9rem] object-contain',
        mono && 'opacity-80 brightness-0 invert transition group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0',
        className,
      )}
      style={{ height }}
    />
  )
}
