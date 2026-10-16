import Link from 'next/link'
import { profile } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { CopyEmail } from '@/components/cta/copy-email'
import { splitEmail } from '@/components/cta/email'

// label doubles as the logo name looked up in content/logos.json; Logo renders nothing until one is sourced.
const SOCIAL: { key: string; label: string }[] = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'github', label: 'GitHub' },
  { key: 'orcid', label: 'ORCID' },
  { key: 'huggingface', label: 'Hugging Face' },
  { key: 'googleDev', label: 'Google Developers' },
  { key: 'devto', label: 'Dev.to' },
  { key: 'hackerrank', label: 'HackerRank' },
  { key: 'vscodeMarketplace', label: 'VS Code Marketplace' },
]

const SITE: { href: string; label: string; download?: boolean }[] = [
  { href: '/projects', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
]

// Every list link is at least 24 px tall (min-h-6 plus py-1) with 8 px between items, the Lighthouse target size.
const LIST_LINK = 'inline-flex min-h-6 items-center py-1 text-ink-2 hover:text-ink'

export function Footer() {
  const { links, identity, meta } = profile
  return (
    <footer className="safe-bottom bg-surface-sunken">
      <div className="container-site grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-bold tracking-tight">{identity.name}</p>
          <p className="mt-2 max-w-[42ch] text-ink-2">{identity.headline}.</p>
          <p className="text-status mt-4">
            {identity.location.display}. {identity.availability.display}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {/* The address is joined on the client at click time, so no page carries a mailto: link or the plain address. */}
            <CopyEmail parts={splitEmail(links.email)} location="footer" variant="primary" />
            <ButtonLink href={links.scheduling} variant="secondary">
              Book a call
            </ButtonLink>
          </div>
        </div>

        <nav aria-label="Site" className="md:col-span-3">
          <p className="text-label text-ink-3">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            {SITE.map((s) => (
              <li key={s.href}>
                <Link className={LIST_LINK} href={s.href}>
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <a className={LIST_LINK} href={links.resumePdf}>
                Resume PDF
              </a>
            </li>
            <li>
              <a className={LIST_LINK} href="/shreya-boyane.vcf" download>
                Download vCard
              </a>
            </li>
            <li>
              <a className={LIST_LINK} href="/llms.txt">
                llms.txt
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Profiles" className="md:col-span-4">
          <p className="text-label text-ink-3">Elsewhere</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {SOCIAL.map((s) => (
              <li key={s.key} className="group">
                <a className={`${LIST_LINK} gap-2`} href={links[s.key]} target="_blank" rel="me noopener noreferrer">
                  <Logo name={s.label} height={16} />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-site flex flex-col gap-2 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-status">Last updated {meta.lastUpdated}. Built with Next.js, every page static, no cookies.</p>
        <p className="text-status">Portrait depth map produced with Depth Anything V2 and rendered in WebGL2.</p>
      </div>
    </footer>
  )
}
