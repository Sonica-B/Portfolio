import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'

// Server-only: reads image headers from public/ at build time so next/image always gets real dimensions.

type Size = { width: number; height: number }

const FALLBACK: Size = { width: 1600, height: 1000 }
const cache = new Map<string, Size>()

function webpSize(b: Buffer): Size | null {
  if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null
  const chunk = b.toString('ascii', 12, 16)
  if (chunk === 'VP8X') return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) }
  if (chunk === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
  if (chunk === 'VP8L') {
    const b0 = b[21]
    const b1 = b[22]
    const b2 = b[23]
    const b3 = b[24]
    return {
      width: 1 + (((b1 & 0x3f) << 8) | b0),
      height: 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)),
    }
  }
  return null
}

function pngSize(b: Buffer): Size | null {
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
}

function jpegSize(b: Buffer): Size | null {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null
  let i = 2
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) {
      i += 1
      continue
    }
    const marker = b[i + 1]
    if (marker === 0xff) {
      i += 1
      continue
    }
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) }
    }
    i += 2 + b.readUInt16BE(i + 2)
  }
  return null
}

/** Intrinsic pixel size of a file under public/ (leading slash path), with a safe fallback. */
export function publicImageSize(src: string): Size {
  const hit = cache.get(src)
  if (hit) return hit
  let size = FALLBACK
  try {
    const b = fs.readFileSync(path.join(process.cwd(), 'public', src))
    size = webpSize(b) ?? pngSize(b) ?? jpegSize(b) ?? FALLBACK
  } catch {
    size = FALLBACK
  }
  cache.set(src, size)
  return size
}

/**
 * A responsive picture with its real dimensions. The CSS aspect ratio is spelled out because the
 * `height: auto` that keeps the picture responsive otherwise hides the attribute ratio from Chrome's
 * lazy-image check, which then reports the image as having no explicit dimensions.
 */
export function Figure({
  src,
  alt,
  caption,
  sizes = '(min-width: 768px) 60vw, 100vw',
  className,
  imageClassName,
}: {
  src: string
  alt: string
  caption?: string
  sizes?: string
  className?: string
  imageClassName?: string
}) {
  const { width, height } = publicImageSize(src)
  return (
    <figure className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading="lazy"
        className={imageClassName ? `frame-media w-full ${imageClassName}` : 'frame-media w-full'}
        style={{ height: 'auto', aspectRatio: `${width} / ${height}` }}
      />
      {caption ? <figcaption className="mt-3 text-sm text-ink-2">{caption}</figcaption> : null}
    </figure>
  )
}
