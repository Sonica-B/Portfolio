import { formatRange, KIND_LABEL, profile } from '@/lib/content'

export type PaletteGroup = 'Sections' | 'Actions' | 'Work' | 'Research' | 'Experience' | 'Skills' | 'Certifications'

export type PaletteEntry = {
  id: string
  group: PaletteGroup
  title: string
  /** Secondary line under the title. */
  hint?: string
  /** Lowercased extra text the query is matched against. */
  keywords: string
  /** Internal path, a hash on "/", or an http(s) URL. */
  href?: string
  /** Client-side actions with no destination. */
  action?: 'email' | 'pitch'
  download?: boolean
}

/** Result order in the palette. */
export const PALETTE_GROUPS: PaletteGroup[] = ['Sections', 'Actions', 'Work', 'Research', 'Experience', 'Skills', 'Certifications']

const SECTIONS: [string, string][] = [
  ['Work', '/#work'],
  ['Research', '/#research'],
  ['Experience', '/#experience'],
  ['Skills', '/#skills'],
  ['Recognition', '/#recognition'],
  ['Activity', '/#activity'],
  ['Contact', '/#contact'],
]

const text = (parts: (string | null | undefined)[]) => parts.filter(Boolean).join(' ').toLowerCase()

/**
 * Built on the server from profile.json, once per process. The client receives only these
 * compact rows, so the full profile (and its phone number) never enters the browser bundle.
 */
export function buildPaletteIndex(): PaletteEntry[] {
  const { projects, publications, experience, certifications, skills, links } = profile
  return [
    ...SECTIONS.map(
      ([title, href]): PaletteEntry => ({
        id: `section-${title.toLowerCase()}`,
        group: 'Sections',
        title,
        hint: 'Home page',
        keywords: text([title, 'section', 'home', 'go to']),
        href,
      }),
    ),
    { id: 'email', group: 'Actions', title: 'Copy email', keywords: 'email contact copy mail address', action: 'email' },
    { id: 'resume', group: 'Actions', title: 'Download resume', hint: 'PDF', keywords: 'resume cv pdf download', href: links.resumePdf, download: true },
    { id: 'vcard', group: 'Actions', title: 'Download vCard', hint: 'Contact card', keywords: 'vcard contact card vcf save', href: '/shreya-boyane.vcf', download: true },
    { id: 'call', group: 'Actions', title: 'Book a call', hint: 'Scheduling link', keywords: 'call meeting schedule calendar book', href: links.scheduling },
    { id: 'linkedin', group: 'Actions', title: 'Open LinkedIn', keywords: 'linkedin profile social', href: links.linkedin },
    { id: 'github', group: 'Actions', title: 'Open GitHub', keywords: 'github code repositories source', href: links.github },
    { id: 'pitch', group: 'Actions', title: 'Watch a pitch', hint: '25 s video', keywords: 'pitch video reel watch play', action: 'pitch' },
    ...projects.map(
      (p): PaletteEntry => ({
        id: `project-${p.slug}`,
        group: 'Work',
        title: p.name,
        hint: p.subtitle,
        keywords: text([p.subtitle, p.affiliation, KIND_LABEL[p.kind] ?? p.kind, ...p.tags]),
        href: `/projects/${p.slug}`,
      }),
    ),
    ...publications.map(
      (p): PaletteEntry => ({
        id: `publication-${p.id}`,
        group: 'Research',
        title: p.title,
        hint: p.displayString,
        keywords: text([p.venue, 'paper', 'publication', ...p.tags]),
        href: '/research',
      }),
    ),
    ...experience.map(
      (e): PaletteEntry => ({
        id: `role-${e.id}`,
        group: 'Experience',
        title: e.role,
        hint: `${e.org}, ${formatRange(e.start, e.end)}`,
        keywords: text([e.org, e.type, e.location, ...e.tags]),
        href: '/#experience',
      }),
    ),
    ...Object.entries(skills).flatMap(([category, list], ci) =>
      list.map(
        (skill, si): PaletteEntry => ({
          id: `skill-${ci}-${si}`,
          group: 'Skills',
          title: skill,
          hint: category,
          keywords: text([category, 'skill']),
          href: '/#skills',
        }),
      ),
    ),
    ...certifications.map(
      (c, i): PaletteEntry => ({
        id: `certification-${i}`,
        group: 'Certifications',
        title: c.title,
        hint: `${c.issuer}, ${c.date.slice(0, 4)}`,
        keywords: text([c.issuer, 'certificate', 'certification', 'badge']),
        href: '/about#certifications',
      }),
    ),
  ]
}
