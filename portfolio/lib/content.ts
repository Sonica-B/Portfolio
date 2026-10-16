import raw from '@/content/profile.json'
import githubRaw from '@/content/github.json'

export type Metric = { label: string; value: string }
/** Three-second strip: one sentence each, 24 words or fewer, enforced by scripts/check-profile.mjs. */
export type Pitch = { problem: string; action: string; change: string }
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
  /** Her role, set only where the data states it (publication, research or experience role). */
  role?: string
  /** An outside user or a public release: the sponsor handoff, a marketplace listing, a live Space or site. */
  shipped?: { label: string }
  summary: string
  pitch: Pitch
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
export type Recommendation = { name: string; role: string; org: string; quote: string; person?: string }
/** Dated "what is true today" lines for the home page and the markdown index. */
export type Now = { date: string; lines: string[] }

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
  now: Now
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
  /** The five skills per group she would defend first, a subset of `skills`, checked by scripts/check-profile.mjs. */
  coreSkills: Record<string, string[]>
}

export const profile = raw as unknown as Profile
export const SITE_URL = profile.links.website

export type GithubRepoStats = { stars: number; pushedAt: string; language: string | null; description: string | null }
/** Build-time snapshot written by scripts/sync-github.mjs; keys are "owner/name". */
export type GithubSnapshot = {
  fetchedAt: string
  user: { publicRepos: number; followers: number }
  repos: Record<string, GithubRepoStats>
}
export const github = githubRaw as GithubSnapshot

/** Stars, last push and language for a GitHub repo URL, or undefined when the snapshot lacks it. */
export function repoStats(repoUrl: string | null | undefined): { stars: number; pushedAt: string; language: string | null } | undefined {
  if (!repoUrl) return undefined
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/i)
  if (!match) return undefined
  const key = `${match[1]}/${match[2].replace(/\.git$/, '')}`.toLowerCase()
  for (const [name, stats] of Object.entries(github.repos)) {
    if (name.toLowerCase() === key) return { stars: stats.stars, pushedAt: stats.pushedAt, language: stats.language }
  }
  return undefined
}

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

/** Projects that ended in this year or earlier fold into the "Earlier work" row on /projects. */
export const EARLIER_WORK_LAST_YEAR = 2021

/** True for finished projects whose end date falls in EARLIER_WORK_LAST_YEAR or before. */
export function isEarlierWork(p: Pick<Project, 'end'>): boolean {
  return p.end !== null && Number(p.end.slice(0, 4)) <= EARLIER_WORK_LAST_YEAR
}

export type SkillItem = { name: string; core: boolean }
export type SkillGroup = { name: string; items: SkillItem[] }

/** Skills by group with the five core skills first, then the rest in profile.json order. */
export function skillGroups(): SkillGroup[] {
  return Object.entries(profile.skills).map(([name, list]) => {
    const core = new Set(profile.coreSkills?.[name] ?? [])
    const items = list.map((skill) => ({ name: skill, core: core.has(skill) }))
    return { name, items: [...items.filter((s) => s.core), ...items.filter((s) => !s.core)] }
  })
}

/**
 * The one grouping of profile.recognition every surface counts from, in display order. The poster is
 * counted with the papers and the certificates with the wallet, so neither kind is in here.
 */
export const RECOGNITION_KINDS = [
  { kind: 'award', one: 'award', many: 'awards' },
  { kind: 'honor', one: 'honor', many: 'honors' },
  { kind: 'fellowship', one: 'fellowship', many: 'fellowships' },
  { kind: 'competition', one: 'contest result', many: 'contest results' },
] as const

export type RecognitionCount = { kind: string; label: string; count: number }

/** Count per kind in RECOGNITION_KINDS order, kinds with no entries left out: "6 awards", "4 honors", ... */
export function recognitionCounts(): RecognitionCount[] {
  return RECOGNITION_KINDS.flatMap(({ kind, one, many }) => {
    const count = profile.recognition.filter((r) => r.kind === kind).length
    return count > 0 ? [{ kind, label: count === 1 ? one : many, count }] : []
  })
}

/** Sum of recognitionCounts(): awards, honors, fellowships and contest results. */
export function recognitionTotal(): number {
  return recognitionCounts().reduce((sum, c) => sum + c.count, 0)
}
