import raw from '@/content/logos.json'

export type LogoEntry = {
  src: string
  alt: string
  source: string
  mono: boolean
  wordmark: boolean
  /** Intrinsic size of the file (SVG viewBox or raster pixels), used to give <img> real dimensions. */
  width?: number
  height?: number
}

const logos = raw as Record<string, LogoEntry>

/** Logo for an organization name exactly as it appears in profile.json, or undefined when none was sourced. */
export function getLogo(name: string | undefined | null): LogoEntry | undefined {
  if (!name) return undefined
  return logos[name] ?? logos[name.trim()]
}
