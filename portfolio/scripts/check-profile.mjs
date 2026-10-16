// Drift guard: fails the build when profile.json contradicts reality or breaks the copy rules.
import { existsSync, readFileSync } from 'node:fs'
const profileUrl = new URL('../content/profile.json', import.meta.url)
const peopleUrl = new URL('../content/people.json', import.meta.url)
const raw = readFileSync(profileUrl, 'utf8')
const p = JSON.parse(raw)
const errors = []
const warnings = []
const today = new Date().toISOString().slice(0, 7)
const words = (s) => (typeof s === 'string' ? s.trim().split(/\s+/).filter(Boolean).length : 0)

if (/[\u2014\u2013]/.test(raw)) errors.push('em dash or en dash found in profile.json')
if (/pursuing/i.test(raw)) errors.push('"pursuing" found; the degree is complete')
const wpi = p.education.find((e) => e.abbr === 'WPI')
if (!wpi || wpi.gpa !== '3.9') errors.push('WPI GPA must be 3.9')
for (const list of [p.education, p.experience, p.research, p.projects]) {
  for (const e of list) {
    const id = e.id ?? e.slug
    if (e.end && e.end < today && e.status === 'ongoing') errors.push(`${id}: ended ${e.end} but marked ongoing`)
    if (e.end === null && e.status !== 'ongoing') errors.push(`${id}: no end date but status ${e.status}`)
  }
}
for (const pub of p.publications) {
  if (!pub.venueUrl) errors.push(`publication ${pub.id} lacks venueUrl`)
}

// Projects: unique slugs, summaries at most 40 words, a three-key pitch at 24 words or fewer each,
// problem and approach at most 70 words, highlights at most 14 words.
const slugs = new Set()
for (const pr of p.projects) {
  if (slugs.has(pr.slug)) errors.push(`duplicate slug ${pr.slug}`)
  slugs.add(pr.slug)
  if (!pr.summary || words(pr.summary) > 40) errors.push(`${pr.slug}: summary missing or over 40 words`)
  if (words(pr.problem) > 70) errors.push(`${pr.slug}: problem over 70 words`)
  if (words(pr.approach) > 70) errors.push(`${pr.slug}: approach over 70 words`)
  if (!pr.pitch || typeof pr.pitch !== 'object') {
    errors.push(`${pr.slug}: missing pitch`)
  } else {
    for (const key of ['problem', 'action', 'change']) {
      const n = words(pr.pitch[key])
      if (!n) errors.push(`${pr.slug}: pitch.${key} missing`)
      else if (n > 24) errors.push(`${pr.slug}: pitch.${key} is ${n} words (max 24)`)
    }
  }
  for (const [i, h] of (pr.highlights ?? []).entries()) {
    if (words(h) > 14) errors.push(`${pr.slug}: highlight ${i + 1} is ${words(h)} words (max 14)`)
  }
  // Metrics are outcomes or measured quantities: every value carries a number, and team size is not one.
  for (const m of pr.metrics ?? []) {
    if (!/\d/.test(m.value)) errors.push(`${pr.slug}: metric "${m.label}" has no number ("${m.value}"); move it to a descriptive field`)
    if (/team size/i.test(m.label)) errors.push(`${pr.slug}: team size is not a metric; say it in the approach or the pitch`)
  }
  // role: her role as the data states it, short. shipped: { label } for an outside user or a public release.
  if (pr.role !== undefined && (typeof pr.role !== 'string' || !words(pr.role) || words(pr.role) > 10)) {
    errors.push(`${pr.slug}: role must be a string of 1 to 10 words`)
  }
  if (pr.shipped !== undefined) {
    if (!pr.shipped || typeof pr.shipped.label !== 'string' || !words(pr.shipped.label) || words(pr.shipped.label) > 6) {
      errors.push(`${pr.slug}: shipped must be { label } with 1 to 6 words`)
    }
  }
}

// coreSkills: for every skills group, exactly five names taken from that group.
if (!p.coreSkills || typeof p.coreSkills !== 'object') {
  errors.push('coreSkills missing')
} else {
  for (const [group, list] of Object.entries(p.skills)) {
    const core = p.coreSkills[group]
    if (!Array.isArray(core) || core.length !== 5) errors.push(`coreSkills["${group}"] must list exactly 5 skills`)
    else for (const name of core) if (!list.includes(name)) errors.push(`coreSkills["${group}"]: "${name}" is not in skills`)
  }
  for (const group of Object.keys(p.coreSkills)) if (!p.skills[group]) errors.push(`coreSkills["${group}"] has no skills group`)
}

// Glossary tips: one sentence of 12 to 25 words, no em or en dash, unique terms.
const glossaryUrl = new URL('../content/glossary.json', import.meta.url)
if (existsSync(glossaryUrl)) {
  const glossaryRaw = readFileSync(glossaryUrl, 'utf8')
  if (new RegExp('[' + String.fromCharCode(0x2014, 0x2013) + ']').test(glossaryRaw)) errors.push('em dash or en dash found in glossary.json')
  const terms = new Set()
  for (const g of JSON.parse(glossaryRaw)) {
    if (terms.has(g.term)) errors.push(`glossary: duplicate term ${g.term}`)
    terms.add(g.term)
    const n = words(g.tip)
    if (n < 12 || n > 25) errors.push(`glossary ${g.term}: tip is ${n} words (12 to 25)`)
    if (/[.!?]\s+\S/.test(g.tip.trim())) errors.push(`glossary ${g.term}: tip must be one sentence`)
  }
}
for (const e of p.experience) {
  for (const [i, h] of (e.highlights ?? []).entries()) {
    if (words(h) > 16) errors.push(`${e.id}: highlight ${i + 1} is ${words(h)} words (max 16)`)
  }
}

// now: ISO date, 3 or 4 lines, warn (do not fail) when older than 120 days.
if (!p.now || !Array.isArray(p.now.lines) || p.now.lines.length < 3 || p.now.lines.length > 4) {
  errors.push('now must carry 3 or 4 lines')
}
if (!p.now || !/^\d{4}-\d{2}-\d{2}$/.test(p.now.date) || Number.isNaN(Date.parse(p.now.date))) {
  errors.push('now.date must be an ISO date (YYYY-MM-DD)')
} else {
  const ageDays = Math.floor((Date.now() - Date.parse(p.now.date)) / 86_400_000)
  if (ageDays > 120) warnings.push(`now.date is ${ageDays} days old; refresh the now lines`)
}

// recommendations[].person must match a slug in people.json when present.
const people = existsSync(peopleUrl) ? JSON.parse(readFileSync(peopleUrl, 'utf8')) : null
const peopleSlugs = new Set(Array.isArray(people) ? people.map((x) => x.slug) : [])
for (const r of p.recommendations) {
  if (r.person === undefined) continue
  if (!people) errors.push(`recommendation ${r.name}: person set but content/people.json is missing`)
  else if (!peopleSlugs.has(r.person)) errors.push(`recommendation ${r.name}: person "${r.person}" not in people.json`)
}

for (const w of warnings) console.warn(`profile.json warning: ${w}`)
if (errors.length) {
  console.error('profile.json drift guard failed:\n - ' + errors.join('\n - '))
  process.exit(1)
}
console.log(`profile.json ok: ${p.projects.length} projects, ${p.publications.length} publications, ${p.experience.length} roles, now ${p.now.date}`)
