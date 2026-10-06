import Link from 'next/link'
import { profile } from '@/lib/content'

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

export function Footer() {
  const { links, identity, meta } = profile
  return (
    <footer className="hairline safe-bottom">
      <div className="container-site grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-semibold tracking-tight">{identity.name}</p>
          <p className="mt-2 max-w-[42ch] text-ink-2">{identity.headline}.</p>
          <p className="mt-4 text-sm text-ink-3">
            {identity.location.display}. {identity.availability.display}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={links.email} className="press inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-ink">
              Email me
            </a>
            <a
              href={links.scheduling}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex h-11 items-center rounded-full border border-rule-strong px-5 text-sm font-medium text-ink hover:bg-surface-raised"
            >
              Book a call
            </a>
          </div>
        </div>

        <nav aria-label="Site" className="md:col-span-3">
          <p className="text-label text-ink-3">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-ink-2 hover:text-ink" href="/projects">Work</Link></li>
            <li><Link className="text-ink-2 hover:text-ink" href="/research">Research</Link></li>
            <li><Link className="text-ink-2 hover:text-ink" href="/about">About</Link></li>
            <li><Link className="text-ink-2 hover:text-ink" href="/resume">Resume</Link></li>
            <li><a className="text-ink-2 hover:text-ink" href={links.resumePdf}>Resume PDF</a></li>
            <li><a className="text-ink-2 hover:text-ink" href="/llms.txt">llms.txt</a></li>
          </ul>
        </nav>

        <nav aria-label="Profiles" className="md:col-span-4">
          <p className="text-label text-ink-3">Elsewhere</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {SOCIAL.map((s) => (
              <li key={s.key}>
                <a className="text-ink-2 hover:text-ink" href={links[s.key]} target="_blank" rel="me noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-site flex flex-col gap-2 pb-8 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>Last updated {meta.lastUpdated}. Built with Next.js, every page static, no cookies.</p>
        <p>Portrait depth map produced with Depth Anything V2 and rendered in WebGL2.</p>
      </div>
    </footer>
  )
}
