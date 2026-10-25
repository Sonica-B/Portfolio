// Drift guard: fails the build when profile.json contradicts reality.
import { readFileSync } from 'node:fs'
const raw = readFileSync(new URL('../content/profile.json', import.meta.url), 'utf8')
const p = JSON.parse(raw)
const errors = []
const today = new Date().toISOString().slice(0, 7)

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
const slugs = new Set()
for (const pr of p.projects) {
  if (slugs.has(pr.slug)) errors.push(`duplicate slug ${pr.slug}`)
  slugs.add(pr.slug)
  if (!pr.summary || pr.summary.split(' ').length > 60) errors.push(`${pr.slug}: summary missing or over 60 words`)
}
if (errors.length) {
  console.error('profile.json drift guard failed:\n - ' + errors.join('\n - '))
  process.exit(1)
}
console.log(`profile.json ok: ${p.projects.length} projects, ${p.publications.length} publications, ${p.experience.length} roles`)
