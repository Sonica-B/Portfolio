import { profile } from '@/lib/content'

export const dynamic = 'force-static'

const encoder = new TextEncoder()

/** Escapes a vCard 3.0 text value (RFC 2426, section 2.4.2). */
function esc(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

/** Folds a content line at 75 octets with CRLF plus one space (RFC 2426, section 2.6). */
function fold(line: string): string {
  const out: string[] = []
  let current = ''
  let bytes = 0
  for (const ch of line) {
    const size = encoder.encode(ch).length
    // Continuation lines start with a space, which counts toward the 75 octets.
    const limit = out.length === 0 ? 75 : 74
    if (bytes + size > limit) {
      out.push(current)
      current = ''
      bytes = 0
    }
    current += ch
    bytes += size
  }
  out.push(current)
  return out.join('\r\n ')
}

// vCard 3.0 contact card built from profile.json. No phone number by design.
export function GET() {
  const { identity, links, meta } = profile
  const names = identity.fullName.trim().split(/\s+/)
  const given = names[0] ?? ''
  const family = names.length > 1 ? names[names.length - 1] : ''
  const additional = names.slice(1, -1).join(' ')
  const { city, region, country } = identity.location

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${esc(identity.name)}`,
    `N:${esc(family)};${esc(given)};${esc(additional)};;`,
    `TITLE:${esc(identity.headline)}`,
    `EMAIL;TYPE=INTERNET,PREF:${identity.email}`,
    `URL:${links.website}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${links.linkedin}`,
    `X-SOCIALPROFILE;TYPE=github:${links.github}`,
    `ADR;TYPE=WORK:;;;${esc(city)};${esc(region)};;${esc(country)}`,
    `NOTE:${esc(identity.summary)}`,
    `REV:${meta.lastUpdated}T00:00:00Z`,
    'END:VCARD',
  ]

  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="shreya-boyane.vcf"',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
