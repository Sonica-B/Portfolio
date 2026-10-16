import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { formatMonth, profile, year, type Certification } from '@/lib/content'
import { publicImageSize } from '@/components/sections/featured-work'
import type { WalletCredential, WalletImage } from './credential-card'
import type { IssuerGroup } from './issuer-anchors'
import { Wallet, type WalletProps } from './wallet'

/** Width and height of an SVG badge from its root tag, so next/image gets real numbers. */
function svgSize(src: string): { width: number; height: number } {
  try {
    const text = readFileSync(join(process.cwd(), 'public', src), 'utf8')
    const root = /<svg\b[^>]*>/i.exec(text)?.[0] ?? ''
    const attr = (name: string) => {
      const m = new RegExp(`\\s${name}="([\\d.]+)(?:px)?"`).exec(root)
      return m ? Number(m[1]) : 0
    }
    const width = attr('width')
    const height = attr('height')
    if (width > 0 && height > 0) return { width: Math.round(width), height: Math.round(height) }
    const box = /viewBox="([^"]+)"/.exec(root)?.[1].trim().split(/[\s,]+/).map(Number)
    if (box && box.length === 4 && box[2] > 0 && box[3] > 0) return { width: Math.round(box[2]), height: Math.round(box[3]) }
  } catch {
    // Missing or unreadable file: square fallback below.
  }
  return { width: 600, height: 600 }
}

function imageOf(src: string | null): WalletImage | null {
  if (!src) return null
  const badge = src.startsWith('/images/badges/')
  const size = src.endsWith('.svg') ? svgSize(src) : publicImageSize(src)
  return { src, badge, ...size }
}

/** profile.json carries no url field today; this picks one up as soon as the content agent adds it. */
function urlOf(c: Certification): string | null {
  const url = (c as Certification & { url?: unknown }).url
  return typeof url === 'string' && /^https?:/.test(url) ? url : null
}

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function build(): WalletProps {
  const credentials: WalletCredential[] = profile.certifications
    .map((c, i) => ({ c, i }))
    .sort((a, b) => (a.c.date < b.c.date ? 1 : a.c.date > b.c.date ? -1 : a.i - b.i))
    .map(({ c, i }) => ({
      id: `c${i}`,
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      year: year(c.date),
      month: formatMonth(c.date),
      image: imageOf(c.image),
      credentialId: c.credentialId,
      url: urlOf(c),
    }))

  const byIssuer = new Map<string, string[]>()
  for (const c of credentials) byIssuer.set(c.issuer, [...(byIssuer.get(c.issuer) ?? []), c.id])

  const taken = new Set(['all', 'other'])
  const groups: IssuerGroup[] = [...byIssuer.entries()]
    .filter(([, ids]) => ids.length > 1)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([name, ids]) => {
      let key = slug(name) || 'issuer'
      for (let n = 2; taken.has(key); n += 1) key = `${slug(name)}-${n}`
      taken.add(key)
      return { key, name, count: ids.length, ids, kind: 'issuer' as const }
    })

  const other = credentials.filter((c) => (byIssuer.get(c.issuer)?.length ?? 0) < 2).map((c) => c.id)
  if (other.length) groups.push({ key: 'other', name: 'Other', count: other.length, ids: other, kind: 'other' })

  const stack = credentials
    .filter((c) => c.image?.src.startsWith('/images/certs/'))
    .slice(0, 3)
    .map((c) => c.id)

  const years = credentials.map((c) => c.year).sort()
  return { credentials, groups, stack, from: years[0] ?? '', to: years[years.length - 1] ?? '' }
}

/** Computed once per process: 31 file headers read at build time, never in the browser. */
const DATA = build()

/** Server wrapper: prepares the wallet data (sizes, groups, stack) and renders the client wallet. */
export function CredentialWallet() {
  return <Wallet {...DATA} />
}
