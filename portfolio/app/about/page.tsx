import type { Metadata } from 'next'
import { RECOGNITION_KINDS, profile, recognitionCounts, recognitionTotal, SITE_URL, year } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { CredentialWallet } from '@/components/credentials'
import { Block } from '@/components/about/block'
import { HologramCard } from '@/components/about/hologram-card'
import { Story } from '@/components/about/story'
import { ActivityTimeline, EducationTimeline, LeadershipTimeline } from '@/components/about/timelines'
import { RecognitionTable } from '@/components/about/recognition-table'
import { Recommendations } from '@/components/about/recommendations'
import { Availability } from '@/components/about/availability'

const { identity, education, recognition, certifications, recommendations } = profile

// 150 to 160 characters, counts from the content model. The title reaches the social card through Next's fallback.
const masters = education.find((e) => e.abbr === 'WPI')
const DESCRIPTION = `${identity.name}, ${identity.title} in ${identity.location.city}, ${identity.location.region}: M.S. in ${masters?.field ?? 'Artificial Intelligence'} from ${masters?.abbr ?? 'WPI'}, ${recognitionTotal()} awards and honors, ${certifications.length} certifications, ${recommendations.length} recommendations.`

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

/** Labels for the kinds the shared grouping leaves out; they still appear as rows in the table. */
const OTHER_KIND: Record<string, { one: string; many: string }> = {
  publication: { one: 'publication', many: 'publications' },
  certification: { one: 'certification', many: 'certifications' },
}

const andList = (parts: string[]) =>
  parts.length > 1 ? `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}` : (parts[0] ?? '')

/**
 * "16 awards and honors, 2017 to 2026: 6 awards, 4 honors, 2 fellowships and 4 contest results. The table also
 * lists 1 publication and 2 certifications." Totals come from recognitionCounts(), the same grouping the home page uses.
 */
function recognitionIntro(): string {
  const counted = new Set<string>(RECOGNITION_KINDS.map((k) => k.kind))
  const list = andList(recognitionCounts().map((c) => `${c.count} ${c.label}`))
  const years = recognition.filter((r) => counted.has(r.kind)).map((r) => year(r.date)).sort()
  const others = new Map<string, number>()
  for (const r of recognition) if (!counted.has(r.kind)) others.set(r.kind, (others.get(r.kind) ?? 0) + 1)
  const extra = andList(
    [...others.entries()].map(([kind, n]) => {
      const label = OTHER_KIND[kind] ?? { one: kind, many: kind }
      return `${n} ${n === 1 ? label.one : label.many}`
    }),
  )
  const head = `${recognitionTotal()} awards and honors, ${years[0]} to ${years[years.length - 1]}: ${list}.`
  return extra ? `${head} The table also lists ${extra}.` : head
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

      {/* Phones read h1 and headline, then the hologram, then the story. From md the hologram spans both rows on the right. */}
      <header className="grid gap-8 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-3 md:gap-y-0">
        <div className="md:col-span-7 lg:col-span-8">
          <h1 className="text-display">About</h1>
          <p className="text-title mt-3 max-w-[34ch] font-medium text-ink-2">{identity.headline}</p>
        </div>
        <div className="md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 lg:col-span-4 lg:col-start-9">
          {/* 60 percent of the column on phones with a 240 px floor for 320 px screens; about 320 px of portrait inside the 360 px frame from md. */}
          <HologramCard className="mx-auto w-3/5 min-w-60 md:mr-0 md:w-full md:min-w-0 md:max-w-[22.5rem]" />
        </div>
        {/* -mt-6 offsets the Story's own 24 px top margin, so the hologram has the same 32 px gap above and below on phones. */}
        <div className="-mt-6 md:col-span-7 md:mt-0 lg:col-span-8">
          <Story />
        </div>
      </header>

      <div className="mt-12 md:mt-16">
        <Block id="education" title="Education" intro={educationIntro()}>
          <EducationTimeline />
        </Block>

        <Block id="leadership" title="Leadership">
          <LeadershipTimeline />
        </Block>

        <Block id="activity" title="Activity">
          <ActivityTimeline />
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
