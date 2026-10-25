import { profile, SITE_URL, type Project, type Publication } from '@/lib/content'

const { identity, links } = profile
const PERSON_ID = `${SITE_URL}/#person`

export function JsonLd({ data }: { data: unknown }) {
  if (!data) return null
  // Escape "<" so a value can never close the script tag.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: identity.name,
    alternateName: identity.fullName,
    givenName: 'Shreya',
    familyName: 'Boyane',
    gender: 'Female',
    url: SITE_URL,
    image: `${SITE_URL}/portrait/shreya-flat.jpg`,
    email: `mailto:${identity.email}`,
    jobTitle: identity.title,
    description: identity.summary,
    knowsLanguage: identity.languages,
    address: {
      '@type': 'PostalAddress',
      addressLocality: identity.location.city,
      addressRegion: identity.location.region,
      addressCountry: identity.location.country,
    },
    nationality: { '@type': 'Country', name: 'India' },
    alumniOf: profile.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution, url: e.url })),
    hasCredential: profile.education.map((e) => ({
      '@type': 'EducationalOccupationalCredential',
      name: `${e.degree} in ${e.field}`,
      credentialCategory: 'degree',
      recognizedBy: { '@type': 'CollegeOrUniversity', name: e.institution },
    })),
    award: profile.recognition.filter((r) => r.kind !== 'certification').map((r) => `${r.title}, ${r.org}`),
    knowsAbout: Object.values(profile.skills).flat().slice(0, 60),
    sameAs: [
      links.linkedin,
      links.github,
      links.orcid,
      links.huggingface,
      links.googleDev,
      links.devto,
      links.hackerrank,
      links.vscodeMarketplace,
    ],
    worksFor: profile.experience
      .filter((e) => e.status === 'ongoing')
      .map((e) => ({ '@type': 'Organization', name: e.org, ...(e.orgUrl ? { url: e.orgUrl } : {}) })),
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE_URL },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Shreya Boyane',
    url: SITE_URL,
    description: 'Portfolio of Shreya Boyane, Machine Learning Engineer.',
    inLanguage: 'en-US',
    publisher: { '@id': PERSON_ID },
  }
}

export function profilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${identity.name}, Machine Learning Engineer`,
    dateCreated: '2024-12-01',
    dateModified: profile.meta.lastUpdated,
    mainEntity: { '@id': PERSON_ID },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  }
}

export function scholarlyArticleJsonLd(p: Publication) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: p.title,
    name: p.title,
    abstract: p.abstract,
    datePublished: `${p.date}-01`,
    url: p.links.paper ?? p.venueUrl,
    sameAs: Object.values(p.links),
    author: p.authors.map((a) =>
      a === identity.fullName ? { '@id': PERSON_ID, '@type': 'Person', name: a } : { '@type': 'Person', name: a },
    ),
    publisher: { '@type': 'Organization', name: p.venue },
    isPartOf: { '@type': 'Event', name: p.venueFull, url: p.venueUrl },
    keywords: p.tags.join(', '),
  }
}

export function projectJsonLd(p: Project) {
  const base = {
    '@context': 'https://schema.org',
    name: p.name,
    description: p.summary,
    url: `${SITE_URL}/projects/${p.slug}`,
    author: { '@id': PERSON_ID },
    dateCreated: `${p.start}-01`,
    ...(p.end ? { dateModified: `${p.end}-01` } : {}),
    keywords: p.tags.join(', '),
    ...(p.visual ? { image: `${SITE_URL}${p.visual.src}` } : {}),
  }
  if (p.repo) {
    return { ...base, '@type': 'SoftwareSourceCode', codeRepository: p.repo, programmingLanguage: p.tags[0] }
  }
  return { ...base, '@type': 'CreativeWork' }
}

export function videoJsonLd(p: Project) {
  if (!p.video) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${p.name}: 25-second pitch`,
    description: p.summary,
    thumbnailUrl: `${SITE_URL}${p.video.replace(/\.mp4$/, '.jpg')}`,
    contentUrl: `${SITE_URL}${p.video}`,
    uploadDate: profile.meta.lastUpdated,
    duration: 'PT25S',
    author: { '@id': PERSON_ID },
  }
}

export function itemListJsonLd(projects: Project[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projects by Shreya Boyane',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/projects/${p.slug}`,
    })),
  }
}
