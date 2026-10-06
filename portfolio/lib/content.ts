import raw from '@/content/profile.json'

export type Metric = { label: string; value: string }
export type Figure = { src: string; alt: string; caption: string }
export type Visual = { src: string; alt: string } | null

export type Education = {
  id: string
  institution: string
  abbr: string
  degree: string
  field: string
  location: string
  start: string
  end: string
  status: string
  gpa: string
  gpaScale: string
  url: string
  coursework: string[]
  honors: string[]
}

export type Publication = {
  id: string
  title: string
  venue: string
  venueFull: string
  venueUrl: string
  status: string
  displayString: string
  date: string
  authors: string[]
  equalContribution: string[]
  affiliations: string[]
  role: string
  review: string | null
  tldr: string
  abstract: string
  findings: string[]
  stats: string[]
  links: Record<string, string>
  figures: Figure[]
  tags: string[]
}

export type Research = {
  id: string
  title: string
  org: string
  role: string
  advisor: string | null
  grant: string | null
  start: string
  end: string | null
  status: string
  publicationId: string | null
  projectSlug: string
  summary: string
  highlights: string[]
  tags: string[]
}

export type Experience = {
  id: string
  role: string
  org: string
  orgUrl: string | null
  location: string
  type: string
  start: string
  end: string | null
  status: string
  award: string | null
  summary: string
  highlights: string[]
  tags: string[]
  team?: string[]
  advisors?: string[]
  presented?: string
}

export type Project = {
  slug: string
  name: string
  subtitle: string
  kind: string
  featured: boolean
  start: string
  end: string | null
  status: string
  affiliation: string
  team: string[]
  summary: string
  problem: string
  approach: string
  highlights: string[]
  metrics: Metric[]
  tags: string[]
  repo: string | null
  links: Record<string, string>
  visual: Visual
  video: string | null
  recognition: string | null
  publicationId: string | null
  experienceId: string | null
}

export type Recognition = { id: string; kind: string; title: string; org: string; date: string; note: string | null }
export type Certification = { title: string; issuer: string; date: string; image: string | null; credentialId: string | null }
export type Activity = { date: string; type: string; title: string; location: string | null; note: string | null }
export type Leadership = { title: string; org: string; date: string; note: string }
export type Recommendation = { name: string; role: string; org: string; quote: string }

export type Profile = {
  meta: { version: string; lastUpdated: string; sources: string[] }
  identity: {
    name: string
    fullName: string
    pronouns: string
    title: string
    headline: string
    tagline: string
    summary: string
    location: { city: string; region: string; country: string; display: string }
    email: string
    phone: string
    languages: string[]
    availability: {
      status: string
      display: string
      workAuthorization: string
      startDate: string
      roles: string[]
      locations: string[]
    }
  }
  links: Record<string, string>
  education: Education[]
  publications: Publication[]
  research: Research[]
  experience: Experience[]
  projects: Project[]
  recognition: Recognition[]
  certifications: Certification[]
  activity: Activity[]
  leadership: Leadership[]
  recommendations: Recommendation[]
  skills: Record<string, string[]>
}

export const profile = raw as unknown as Profile
export const SITE_URL = profile.links.website

export const featuredProjects = profile.projects.filter((p) => p.featured)
export const projectSlugs = profile.projects.map((p) => p.slug)

export function getProject(slug: string): Project | undefined {
  return profile.projects.find((p) => p.slug === slug)
}

export function getPublication(id: string | null | undefined): Publication | undefined {
  if (!id) return undefined
  return profile.publications.find((p) => p.id === id)
}

export function getExperience(id: string | null | undefined): Experience | undefined {
  if (!id) return undefined
  return profile.experience.find((e) => e.id === id)
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2026-05" -> "May 2026" */
export function formatMonth(ym: string | null | undefined): string {
  if (!ym) return 'present'
  const [y, m] = ym.split('-')
  const idx = Number(m) - 1
  return MONTHS[idx] ? `${MONTHS[idx]} ${y}` : y
}

/** "2024-08", "2026-05" -> "Aug 2024 to May 2026" */
export function formatRange(start: string, end: string | null | undefined): string {
  return `${formatMonth(start)} to ${formatMonth(end)}`
}

/** Year-only, used for compact ledgers. */
export function year(ym: string | null | undefined): string {
  return ym ? ym.slice(0, 4) : 'now'
}

/** All tags across projects, most frequent first. */
export function allProjectTags(): string[] {
  const counts = new Map<string, number>()
  for (const p of profile.projects) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t)
}

export const KIND_LABEL: Record<string, string> = {
  research: 'Research',
  production: 'Production system',
  'computer-vision': 'Computer vision',
  'generative-ai': 'Generative AI',
  mlops: 'MLOps',
  'llm-systems': 'LLM systems',
  tooling: 'Developer tooling',
  robotics: 'Robotics',
  nlp: 'NLP',
  ml: 'Machine learning',
  'reinforcement-learning': 'Reinforcement learning',
  ar: 'Augmented reality',
  web: 'Web',
}
