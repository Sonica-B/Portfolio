import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { profile, SITE_URL } from '@/lib/content'
import { Nav } from '@/components/site/nav'
import { Footer } from '@/components/site/footer'
import { Grain } from '@/components/site/grain'
import { SiteAnalytics } from '@/components/site/analytics'
import { JsonLd, personJsonLd, websiteJsonLd } from '@/lib/jsonld'

const space = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-space', display: 'swap' })
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const { identity, links } = profile
const TITLE = `${identity.name} | Machine Learning Engineer, Computer Vision and LLM Systems`
const DESCRIPTION =
  'Shreya Boyane is a Machine Learning Engineer (M.S. AI, WPI 2026) with 2+ years of production DevOps, an ICML 2026 workshop paper on latent reasoning, and shipped multi-agent, computer-vision and inference-optimization systems.'

// Hex twin of --surface in globals.css (oklch(0.13 0.02 255)); the browser chrome wants a plain colour.
const GROUND = '#03080f'

// The nav joins the address on the client at click time, so no page carries a mailto: link in its markup.
const [emailUser, emailDomain] = links.email.replace(/^mailto:/, '').split('@')

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${identity.name}` },
  description: DESCRIPTION,
  applicationName: 'shreyaboyane.dev',
  authors: [{ name: identity.name, url: SITE_URL }],
  creator: identity.name,
  publisher: identity.name,
  keywords: [
    'Shreya Boyane',
    'Machine Learning Engineer',
    'AI Engineer',
    'Computer Vision Engineer',
    'LLM Engineer',
    'inference optimization',
    'TensorRT',
    'mechanistic interpretability',
    'MLOps',
    'Worcester Polytechnic Institute',
    'San Jose',
    'open to work',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Shreya Boyane',
    title: TITLE,
    description: DESCRIPTION,
    firstName: 'Shreya',
    lastName: 'Boyane',
    username: 'Sonica-B',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  category: 'technology',
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark',
  themeColor: GROUND,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="bg-surface text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Nav email={{ user: emailUser, domain: emailDomain }} />
        <main id="main">{children}</main>
        <Footer />
        <Grain />
        <JsonLd data={personJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Analytics />
        <SpeedInsights />
        <SiteAnalytics />
        {/* orchestrator mounts ReelProvider, ScrollIsland and CommandPalette here */}
      </body>
    </html>
  )
}
