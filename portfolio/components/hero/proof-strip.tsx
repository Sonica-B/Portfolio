import Link from 'next/link'
import { formatMonth, getExperience, getPublication, profile } from '@/lib/content'
import { getLogo } from '@/lib/logos'
import { Logo } from '@/components/ui/logo'

type Item = { key: string; logos: string[]; label: string; title: string; href: string }

/** Candidates with a sourced logo, one per distinct file (several org strings share a mark); the label text is printed regardless. */
function sourced(names: (string | undefined)[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const name of names) {
    const logo = name ? getLogo(name) : undefined
    if (!name || !logo || seen.has(logo.src)) continue
    seen.add(logo.src)
    out.push(name)
  }
  return out
}

/** Four proof points, every string from profile.json. */
function proofItems(): Item[] {
  const pub = getPublication('latent-cot')
  const icml = profile.recognition.find((r) => r.id === 'icml-poster')
  const golden = profile.recognition.find((r) => r.id === 'golden-ticket')
  const mvp = profile.recognition.find((r) => r.id === 'gqp-mvp')
  const gqp = getExperience('crossing-gqp')
  const { workAuthorization } = profile.identity.availability
  const items: (Item | undefined)[] = [
    pub &&
      icml && {
        key: icml.id,
        logos: sourced([pub.venue, icml.org]),
        label: `${pub.displayString}, ${formatMonth(icml.date)}`,
        title: pub.title,
        href: '/research',
      },
    golden && {
      key: golden.id,
      logos: sourced(['Google Cloud', 'NVIDIA', golden.org]),
      label: `${golden.org}, ${formatMonth(golden.date)}`,
      title: golden.title,
      href: '/about#recognition',
    },
    mvp && {
      key: mvp.id,
      logos: sourced(['Crossing', gqp?.org, mvp.org]),
      label: `${mvp.org}, ${formatMonth(mvp.date)}`,
      title: mvp.title,
      href: '/projects/skiplegal',
    },
    {
      key: 'work-authorization',
      logos: [],
      label: 'Work authorization',
      title: workAuthorization.split('. ')[0].replace(/\.?$/, '.'),
      href: '/about#availability',
    },
  ]
  return items.filter((it): it is Item => Boolean(it))
}

export function ProofStrip() {
  const items = proofItems()
  return (
    <section aria-label="Credentials" className="container-site">
      <ul className="grid gap-3 border-y border-rule py-4 sm:grid-cols-2 lg:grid-cols-4 lg:[&>li+li]:border-l lg:[&>li+li]:border-rule lg:[&>li+li]:pl-3">
        {items.map((it) => (
          <li key={it.key} className="group min-w-0">
            <p className="text-status flex flex-wrap items-center gap-2 font-mono text-sm text-ink-2">
              {it.logos.map((name) => (
                <Logo key={name} name={name} height={16} />
              ))}
              <span>{it.label}</span>
            </p>
            <Link href={it.href} className="mt-1.5 block max-w-[34ch] text-[0.95rem] leading-snug text-ink hover:text-accent">
              {it.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
