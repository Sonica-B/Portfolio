import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="container-site py-16 md:py-24">
      <p className="text-metric text-sm text-ink-2">404</p>
      <h1 className="text-display mt-3">Page not found</h1>
      <p className="text-lead mt-5 max-w-[48ch] text-ink-2">
        The address may have changed, or this page never existed.
      </p>
      <ul className="mt-8 flex flex-wrap gap-3">
        <li>
          <ButtonLink href="/">Home</ButtonLink>
        </li>
        <li>
          <ButtonLink href="/projects" variant="secondary">
            Work
          </ButtonLink>
        </li>
        <li>
          <ButtonLink href="/research" variant="secondary">
            Research
          </ButtonLink>
        </li>
        <li>
          <ButtonLink href="/resume" variant="secondary">
            Resume
          </ButtonLink>
        </li>
      </ul>
    </div>
  )
}
