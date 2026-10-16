import type { Metadata } from 'next'
import { profile, SITE_URL, year } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { CredentialWallet } from '@/components/credentials'
import { Block } from '@/components/about/block'
import { HologramCard } from '@/components/about/hologram-card'
import { Story } from '@/components/about/story'
import { EducationTimeline, LeadershipTimeline } from '@/components/about/timelines'
import { RecognitionTable } from '@/components/about/recognition-table'
import { Recommendations } from '@/components/about/recommendations'
import { Availability } from '@/components/about/availability'

const { identity, education, recognition, certifications, recommendations } = profile

// 150 to 160 characters, counts from the content model. The title reaches the social card through Next's fallback.
const masters = education.find((e) => e.abbr === 'WPI')
const DESCRIPTION = `${identity.name}, ${identity.title} in ${identity.location.city}, ${identity.location.region}: M.S. in ${masters?.field ?? 'Artificial Intelligence'} from ${masters?.abbr ?? 'WPI'}, ${recognition.length} awards and honors, ${certifications.length} certifications, ${recommendations.length} recommendations.`

export const metadata: Metadata = {
  title: 'About',
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: '/about',
    description: DESCRIPTION,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${identity.name}, ${identity.title}` }],
  },
}

/** The Person node lives in the layout (lib/jsonld.tsx); this page is a ProfilePage about it. */
function aboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/about#profilepage`,
    url: `${SITE_URL}/about`,
    name: `About ${identity.name}`,
    dateModified: profile.meta.lastUpdated,
    mainEntity: { '@id': `${SITE_URL}/#person` },
  }
}

/** Plural labels for the recognition kinds in profile.json; unknown kinds fall back to the kind itself. */
const KIND_PLURAL: Record<string, string> = {
  award: 'awards',
  honor: 'honors',
  fellowship: 'fellowships',
  publication: 'publications',
  competition: 'contest results',
  certification: 'certifications',
}

/** "6 awards, 4 honors, 4 contest results, 2 fellowships, 2 certifications and 1 publication, 2017 to 2026." */
function recognitionIntro(): string {
  const counts = new Map<string, number>()
  for (const r of recognition) counts.set(r.kind, (counts.get(r.kind) ?? 0) + 1)
  const parts = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([kind, n]) => {
      const label = KIND_PLURAL[kind] ?? kind
      return `${n} ${n === 1 ? label.replace(/s$/, '') : label}`
    })
  const list = parts.length > 1 ? `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}` : (parts[0] ?? '')
  const years = recognition.map((r) => year(r.date)).sort()
  return `${list}, ${years[0]} to ${years[years.length - 1]}.`
}

function educationIntro(): string {
  const starts = education.map((e) => e.start).sort()
  const ends = education.map((e) => e.end).sort()
  return `${education.length} degrees, ${year(starts[0])} to ${year(ends[ends.length - 1])}.`
}

function certificationsIntro(): string {
  const issuers = new Set(certifications.map((c) => c.issuer)).size
  return `${certifications.length} certifications and badges from ${issuers} issuers, newest first.`
}

function recommendationsIntro(): string {
  const orgs = [...new Set(recommendations.map((r) => r.org).filter(Boolean))]
  const where = orgs.length > 1 ? `${orgs.slice(0, -1).join(', ')} and ${orgs[orgs.length - 1]}` : orgs[0]
  return where ? `${recommendations.length} recommendations from ${where}.` : `${recommendations.length} recommendations.`
}

export default function AboutPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <JsonLd data={aboutPageJsonLd()} />

      <header className="grid gap-8 md:grid-cols-12 md:gap-x-3 md:gap-y-0">
        <div className="md:col-span-7 lg:col-span-8">
          <h1 className="text-display">About</h1>
          <p className="text-title mt-3 max-w-[34ch] font-medium text-ink-2">{identity.headline}</p>
          <Story />
        </div>
        <div className="order-first md:order-none md:col-span-5 lg:col-span-4">
          {/* 60 percent of the column on phones with a 240 px floor for 320 px screens; about 320 px of portrait inside the 360 px frame from md. */}
          <HologramCard className="mx-auto w-3/5 min-w-60 md:mr-0 md:w-full md:min-w-0 md:max-w-[22.5rem]" />
        </div>
      </header>

      <div className="mt-12 md:mt-16">
        <Block id="education" title="Education" intro={educationIntro()}>
          <EducationTimeline />
        </Block>

        <Block id="leadership" title="Leadership">
          <LeadershipTimeline />
        </Block>

        <Block id="recognition" title="Recognition" intro={recognitionIntro()} className="cv-auto">
          <RecognitionTable />
        </Block>

        <Block id="certifications" title="Certifications" intro={certificationsIntro()} className="cv-auto">
          <CredentialWallet />
        </Block>

        <Block id="recommendations" title="What colleagues say" intro={recommendationsIntro()} className="cv-auto">
          <Recommendations />
        </Block>

        <Block id="availability" title="Availability">
          <Availability />
        </Block>
      </div>
    </div>
  )
}
