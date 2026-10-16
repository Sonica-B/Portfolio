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
 * Vector marks are tinted to the ink colour at rest; raster marks (photos of a crest, a
 * screenshot of a wordmark) are only desaturated, because inverting them leaves a solid block.
 */
export function Logo({ name, height = 20, mono = true, className }: Props) {
  const logo = getLogo(name)
  if (!logo) return null
  const ratio = logo.width && logo.height ? logo.width / logo.height : 3
  const width = Math.max(height, Math.round(height * ratio))
  const vector = logo.src.endsWith('.svg')
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={logo.alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={cn(
        'inline-block max-w-[9rem] object-contain object-left',
        mono && vector && 'opacity-80 brightness-0 invert transition group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0',
        mono && !vector && 'opacity-90 grayscale transition group-hover:opacity-100 group-hover:grayscale-0',
        className,
      )}
      // The CSS ratio keeps the attribute dimensions visible to Chrome's lazy-image check, which
      // `width: auto` alone hides; the box is the same either way.
      style={{ height, width: 'auto', aspectRatio: `${width} / ${height}` }}
    />
  )
}
