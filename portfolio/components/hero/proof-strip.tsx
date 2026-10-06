import Link from 'next/link'

const ITEMS = [
  { label: 'ICML 2026 FoGen Workshop', value: 'Poster: Interpreting Latent CoT Reasoning as Dynamical Systems', href: '/research' },
  { label: 'NVIDIA GTC 2026', value: 'Golden Ticket Contest honorable mention, Google Cloud x NVIDIA developer community', href: '/about#recognition' },
  { label: 'WPI, December 2025', value: 'Data Science GQP Most Valuable Player for a production multi-agent system', href: '/projects/skiplegal' },
  { label: 'Work authorization', value: '3 years in the US on OPT and STEM OPT, no sponsorship needed up front', href: '/about#availability' },
]

export function ProofStrip() {
  return (
    <section aria-label="Credentials" className="container-site">
      <ul className="hairline grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {ITEMS.map((it) => (
          <li key={it.label}>
            <p className="text-xs text-ink-3">{it.label}</p>
            <Link href={it.href} className="mt-1.5 block max-w-[30ch] text-[0.95rem] leading-snug text-ink hover:text-accent">
              {it.value}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
