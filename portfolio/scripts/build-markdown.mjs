#!/usr/bin/env node
// Builds the markdown mirror of the site from content/profile.json into public/md/:
// index.md, projects.md, projects/<slug>.md, research.md, about.md and resume.md.
// proxy.ts serves these files to clients that ask for text/markdown, /llms.txt links them
// and /llms-full.txt concatenates them at build time. Runs on prebuild; the output is committed.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'md')
const profile = JSON.parse(readFileSync(join(ROOT, 'content', 'profile.json'), 'utf8'))
const { identity, links, meta } = profile
const SITE = links.website

// Kept in sync with lib/content.ts, which is TypeScript and cannot be imported from a plain Node script.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const KIND_LABEL = {
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
const LINK_LABEL = {
  paper: 'Paper (PDF)',
  openreview: 'OpenReview',
  projectPage: 'Project page',
  code: 'Code',
  demo: 'Live demo',
  api: 'Inference API',
  marketplace: 'VS Code Marketplace',
  benchmark: 'Benchmark report',
  pullRequest: '2026 rebuild pull request',
}
const openSourceMd = () => {
  const o = profile.openSource
  return [
    o.summary,
    list(o.merged.map((m) => `Merged: ${m.org} ${m.repo} #${m.number}, ${m.title}. ${m.url}`)),
    `In review at ${o.inReview.join(', ')}. Counts as of ${o.asOf}. All pull requests: ${o.allUrl}`,
  ]
}
const PROFILE_LINKS = [
  ['linkedin', 'LinkedIn'],
  ['github', 'GitHub'],
  ['orcid', 'ORCID'],
  ['huggingface', 'Hugging Face'],
  ['googleDev', 'Google Developers'],
  ['devto', 'Dev.to'],
  ['hackerrank', 'HackerRank'],
  ['vscodeMarketplace', 'VS Code Marketplace'],
]

function formatMonth(ym) {
  if (!ym) return 'present'
  const [y, m] = ym.split('-')
  const idx = Number(m) - 1
  return MONTHS[idx] ? `${MONTHS[idx]} ${y}` : y
}
const formatRange = (start, end) => `${formatMonth(start)} to ${formatMonth(end)}`
const abs = (path) => `${SITE}${path}`
const list = (items) => items.map((item) => `- ${item}`).join('\n')
const kind = (p) => KIND_LABEL[p.kind] ?? p.kind
const linkList = (obj) => Object.entries(obj).map(([key, url]) => `${LINK_LABEL[key] ?? key}: ${url}`)
const metrics = (p) => p.metrics.map((m) => `${m.label}: ${m.value}`)
const publication = (id) => profile.publications.find((p) => p.id === id)
const experience = (id) => profile.experience.find((e) => e.id === id)
const videoExists = (p) => Boolean(p.video) && existsSync(join(ROOT, 'public', p.video))
const profileLinks = () => PROFILE_LINKS.map(([key, label]) => `${label}: ${links[key]}`)
const projectPage = (p) => `${abs(`/projects/${p.slug}`)} (markdown: ${abs(`/md/projects/${p.slug}.md`)})`

/** Joins blocks (strings or nested arrays, empty values dropped) with blank lines and adds a provenance footer. */
function doc(title, blocks, pagePath, mdPath) {
  const body = blocks
    .flat(Infinity)
    .filter((block) => typeof block === 'string' && block.trim().length > 0)
    .join('\n\n')
  const footer = `Canonical page: ${abs(pagePath)}. This markdown: ${abs(mdPath)}. Generated from the site content model, last updated ${meta.lastUpdated}.`
  return `# ${title}\n\n${body}\n\n${footer}\n`
}

function indexMd() {
  const a = identity.availability
  const featured = profile.projects.filter((p) => p.featured)
  const proof = ['icml-poster', 'golden-ticket', 'gqp-mvp']
    .map((id) => profile.recognition.find((r) => r.id === id))
    .filter(Boolean)
  return doc(
    identity.name,
    [
      `${identity.headline}.`,
      `> ${identity.summary}`,
      identity.tagline,
      '## At a glance',
      list([
        `Title: ${identity.title}`,
        `Location: ${identity.location.display}`,
        `Availability: ${a.display}. Start date: ${a.startDate.toLowerCase()}.`,
        `Work authorization: ${a.workAuthorization}`,
        `Target roles: ${a.roles.join('; ')}`,
        `Target locations: ${a.locations.join(', ')}`,
        `Email: ${identity.email}`,
        `Resume: ${abs(links.resumePdf)} (PDF), ${abs('/resume')} (HTML), ${abs('/md/resume.md')} (markdown)`,
      ]),
      '## Proof points',
      list([
        ...proof.map((r) => `${r.title}, ${r.org}, ${formatMonth(r.date)}.${r.note ? ` ${r.note}` : ''}`),
        `Work authorization: ${a.workAuthorization}`,
      ]),
      '## Featured projects',
      featured.map((p) => [
        `### ${p.name}`,
        `${p.subtitle}. ${kind(p)}, ${formatRange(p.start, p.end)}, ${p.affiliation}.${p.recognition ? ` ${p.recognition}.` : ''}`,
        p.summary,
        `Key numbers: ${metrics(p).join('; ')}.`,
        `Details: ${projectPage(p)}.${p.repo ? ` Code: ${p.repo}` : ''}`,
      ]),
      `All ${profile.projects.length} projects: ${abs('/projects')} (markdown: ${abs('/md/projects.md')}).`,
      '## Research',
      list(
        profile.publications.map(
          (p) => `${p.title}. ${p.displayString}, ${formatMonth(p.date)}. ${p.tldr} ${p.links.paper ?? p.venueUrl}`,
        ),
      ),
      `Full detail: ${abs('/research')} (markdown: ${abs('/md/research.md')}).`,
      '## Experience',
      list(
        profile.experience.map(
          (e) =>
            `${e.role}, ${e.org}, ${formatRange(e.start, e.end)}, ${e.location}. ${e.summary}${e.award ? ` Award: ${e.award}.` : ''}`,
        ),
      ),
      '## Open source',
      openSourceMd(),
      '## Education',
      list(
        profile.education.map(
          (e) => `${e.degree} in ${e.field}, ${e.institution}, ${formatRange(e.start, e.end)}, GPA ${e.gpa}/${e.gpaScale}.`,
        ),
      ),
      '## Skills',
      list(Object.entries(profile.skills).map(([group, items]) => `${group}: ${items.join(', ')}`)),
      '## Recognition',
      list(profile.recognition.map((r) => `${formatMonth(r.date)}: ${r.title}, ${r.org}`)),
      '## Elsewhere',
      list(profileLinks()),
      `Contact: ${identity.email}. Book a call: ${links.scheduling}.`,
    ],
    '/',
    '/md/index.md',
  )
}

function projectsMd() {
  const kinds = [...new Set(profile.projects.map(kind))]
  return doc(
    `Projects by ${identity.name}`,
    [
      `${profile.projects.length} projects, featured work first. Kinds: ${kinds.join(', ')}. Each entry links to a full page with the problem, approach, results and stack.`,
      profile.projects.map((p) => [
        `## ${p.name}`,
        `${p.subtitle}. ${kind(p)}, ${formatRange(p.start, p.end)}, ${p.affiliation}.${p.recognition ? ` ${p.recognition}.` : ''}`,
        p.summary,
        `Key numbers: ${metrics(p).join('; ')}.`,
        `Stack: ${p.tags.join(', ')}.`,
        `Details: ${projectPage(p)}.${p.repo ? ` Code: ${p.repo}` : ''}`,
      ]),
    ],
    '/projects',
    '/md/projects.md',
  )
}

function projectMd(p) {
  const pub = publication(p.publicationId)
  const role = experience(p.experienceId)
  const facts = [
    `Kind: ${kind(p)}`,
    `Period: ${formatRange(p.start, p.end)} (${p.status})`,
    `Affiliation: ${p.affiliation}`,
    p.team.length ? `Team: ${identity.name} with ${p.team.join(', ')}` : null,
    p.recognition ? `Recognition: ${p.recognition}` : null,
    p.repo ? `Repository: ${p.repo}` : null,
    ...linkList(p.links),
  ].filter(Boolean)
  return doc(
    p.name,
    [
      `${p.subtitle}.`,
      `> ${p.summary}`,
      list(facts),
      '## Problem',
      p.problem,
      '## Approach',
      p.approach,
      '## Results',
      list(p.highlights),
      '## Key numbers',
      list(metrics(p)),
      '## Stack',
      p.tags.join(', '),
      pub
        ? [
            '## Publication',
            `${pub.title}. ${pub.displayString}, ${formatMonth(pub.date)}. Authors: ${pub.authors.join(', ')}. ${pub.tldr}`,
            list(linkList(pub.links)),
          ]
        : null,
      role ? ['## Role', `${role.role}, ${role.org}, ${formatRange(role.start, role.end)}. ${role.summary}`] : null,
      videoExists(p) ? ['## Pitch video', `${abs(p.video)} (poster: ${abs(p.video.replace(/\.mp4$/, '.jpg'))})`] : null,
      p.visual ? ['## Image', `![${p.visual.alt}](${abs(p.visual.src)})`] : null,
    ],
    `/projects/${p.slug}`,
    `/md/projects/${p.slug}.md`,
  )
}

function researchMd() {
  return doc(
    `Research by ${identity.name}`,
    [
      `${profile.publications.length} papers and ${profile.research.length} research positions. Equal contribution is marked with an asterisk.`,
      '## Publications',
      profile.publications.map((p) => [
        `### ${p.title}`,
        `${p.displayString} (${p.status}), ${formatMonth(p.date)}. Venue: ${p.venueFull}. ${p.venueUrl}`,
        `Authors: ${p.authors.map((a) => (p.equalContribution.includes(a) ? `${a}*` : a)).join(', ')}. Affiliations: ${p.affiliations.join('; ')}.`,
        `Role: ${p.role}.${p.review ? ` Review: ${p.review}.` : ''}`,
        `Summary: ${p.tldr}`,
        '#### Abstract',
        p.abstract,
        '#### Findings',
        list(p.findings),
        '#### By the numbers',
        list(p.stats),
        '#### Links',
        list(linkList(p.links)),
        p.figures.length ? ['#### Figures', p.figures.map((f) => `![${f.alt}](${abs(f.src)})\n\n${f.caption}`)] : null,
        `Keywords: ${p.tags.join(', ')}.`,
      ]),
      '## Research positions',
      profile.research.map((r) => [
        `### ${r.title}`,
        `${r.role}, ${r.org}, ${formatRange(r.start, r.end)}.${r.advisor ? ` Advisor: ${r.advisor}.` : ''}${r.grant ? ` Grant: ${r.grant}.` : ''}`,
        r.summary,
        list(r.highlights),
        `Methods and tools: ${r.tags.join(', ')}. Project page: ${abs(`/projects/${r.projectSlug}`)}`,
      ]),
    ],
    '/research',
    '/md/research.md',
  )
}

function aboutMd() {
  const a = identity.availability
  return doc(
    `About ${identity.name}`,
    [
      `${identity.fullName} (${identity.pronouns}), ${identity.title}, ${identity.location.display}.`,
      identity.summary,
      identity.tagline,
      '## Availability',
      `${a.display}. Start date: ${a.startDate.toLowerCase()}. ${a.workAuthorization}`,
      `Roles: ${a.roles.join('; ')}.`,
      `Locations: ${a.locations.join(', ')}.`,
      '## Education',
      profile.education.map((e) => [
        `### ${e.degree} in ${e.field}`,
        `${e.institution} (${e.abbr}), ${e.location}, ${formatRange(e.start, e.end)}. GPA ${e.gpa}/${e.gpaScale}. ${e.url}`,
        `Coursework: ${e.coursework.join(', ')}.`,
        `Honors: ${e.honors.join('; ')}.`,
      ]),
      '## Leadership',
      list(profile.leadership.map((l) => `${l.title}, ${l.org}, ${l.date}. ${l.note}`)),
      '## Recommendations',
      profile.recommendations.map((r) => `> ${r.quote}\n>\n> ${r.name}, ${r.role}, ${r.org}`),
      '## Activity',
      list(
        profile.activity.map(
          (x) => `${formatMonth(x.date)}: ${x.title}${x.location ? `, ${x.location}` : ''}.${x.note ? ` ${x.note}` : ''}`,
        ),
      ),
      '## Certifications',
      list(
        profile.certifications.map(
          (c) =>
            `${c.title}, ${c.issuer}, ${formatMonth(c.date)}${c.credentialId ? ` (credential ${c.credentialId})` : ''}${c.image ? `. Image: ${abs(c.image)}` : ''}`,
        ),
      ),
      '## Languages',
      identity.languages.join(', '),
      '## Elsewhere',
      list(profileLinks()),
      `Contact: ${identity.email}. Book a call: ${links.scheduling}.`,
    ],
    '/about',
    '/md/about.md',
  )
}

function resumeMd() {
  const a = identity.availability
  const featured = profile.projects.filter((p) => p.featured)
  const others = profile.projects.filter((p) => !p.featured)
  return doc(
    identity.name,
    [
      `${identity.headline}.`,
      `${identity.location.display}. ${identity.email}. ${SITE}`,
      list(profileLinks()),
      `${a.display}. ${a.workAuthorization} PDF version: ${abs(links.resumePdf)}.`,
      '## Summary',
      identity.summary,
      '## Experience',
      profile.experience.map((e) => [
        `### ${e.role}`,
        `${e.org}, ${e.location}. ${e.type}. ${formatRange(e.start, e.end)}.${e.award ? ` Award: ${e.award}.` : ''}`,
        e.summary,
        e.highlights.length ? list(e.highlights) : null,
        e.team
          ? `Team: ${e.team.join(', ')}.${e.advisors ? ` Advisors: ${e.advisors.join(', ')}.` : ''}${e.presented ? ` Presented at the ${e.presented}.` : ''}`
          : null,
        e.tags.length ? `Tools: ${e.tags.join(', ')}.` : null,
      ]),
      '## Research',
      profile.research.map((r) => [
        `### ${r.title}`,
        `${r.role}, ${r.org}, ${formatRange(r.start, r.end)}.${r.advisor ? ` Advisor: ${r.advisor}.` : ''}${r.grant ? ` Grant: ${r.grant}.` : ''}`,
        r.summary,
        list(r.highlights),
      ]),
      '## Education',
      profile.education.map((e) => [
        `### ${e.degree} in ${e.field}`,
        `${e.institution}, ${e.location}, ${formatRange(e.start, e.end)}. GPA ${e.gpa}/${e.gpaScale}.`,
        `Coursework: ${e.coursework.join(', ')}.`,
        `Honors: ${e.honors.join('; ')}.`,
      ]),
      '## Publications',
      list(
        profile.publications.map(
          (p) => `${p.authors.join(', ')}. ${p.title}. ${p.displayString}, ${formatMonth(p.date)}. ${p.links.paper ?? p.venueUrl}`,
        ),
      ),
      '## Selected projects',
      featured.map((p) => [
        `### ${p.name}`,
        `${p.subtitle}. ${formatRange(p.start, p.end)}, ${p.affiliation}.${p.recognition ? ` ${p.recognition}.` : ''}`,
        p.summary,
        list(p.highlights),
        `Stack: ${p.tags.join(', ')}.${p.repo ? ` Code: ${p.repo}.` : ''} Page: ${abs(`/projects/${p.slug}`)}`,
      ]),
      '## Other projects',
      list(others.map((p) => `${p.name} (${formatRange(p.start, p.end)}): ${p.summary}${p.repo ? ` Code: ${p.repo}` : ''}`)),
      '## Open source',
      openSourceMd(),
      '## Skills',
      list(Object.entries(profile.skills).map(([group, items]) => `${group}: ${items.join(', ')}`)),
      '## Recognition',
      list(profile.recognition.map((r) => `${formatMonth(r.date)}: ${r.title}, ${r.org}.${r.note ? ` ${r.note}` : ''}`)),
      '## Certifications',
      list(
        profile.certifications.map(
          (c) => `${c.title}, ${c.issuer}, ${formatMonth(c.date)}${c.credentialId ? ` (credential ${c.credentialId})` : ''}`,
        ),
      ),
      '## Leadership',
      list(profile.leadership.map((l) => `${l.title}, ${l.org}, ${l.date}. ${l.note}`)),
      '## Languages',
      identity.languages.join(', '),
    ],
    '/resume',
    '/md/resume.md',
  )
}

rmSync(OUT, { recursive: true, force: true })
mkdirSync(join(OUT, 'projects'), { recursive: true })

const files = new Map([
  ['index.md', indexMd()],
  ['projects.md', projectsMd()],
  ['research.md', researchMd()],
  ['about.md', aboutMd()],
  ['resume.md', resumeMd()],
  ...profile.projects.map((p) => [`projects/${p.slug}.md`, projectMd(p)]),
])

// En dash (U+2013) and em dash (U+2014), built from code points so this source stays free of them.
const DASHES = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']')

let bytes = 0
for (const [relative, content] of files) {
  if (DASHES.test(content)) {
    console.error(`build-markdown: em or en dash in generated ${relative}`)
    process.exit(1)
  }
  writeFileSync(join(OUT, relative), content, 'utf8')
  bytes += Buffer.byteLength(content)
}
console.log(`markdown ok: ${files.size} files, ${Math.round(bytes / 1024)} KB written to public/md`)
