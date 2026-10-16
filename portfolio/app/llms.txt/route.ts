import { formatMonth, profile, SITE_URL, type Project } from '@/lib/content'
import { PITCH_SECONDS, hasPitch, pitchVideoSrc } from '@/components/reel/pitch-slugs'

export const dynamic = 'force-static'

// /llms.txt following https://llmstxt.org: H1, a blockquote summary, free text (the dated facts),
// then H2 sections whose list items are links with notes. Everything comes from the content model.
// No email address: the contact paths are LinkedIn, the scheduling link and the vCard.
export function GET() {
  const { identity, links, publications, projects, now, meta } = profile
  const a = identity.availability
  const abs = (path: string) => `${SITE_URL}${path}`
  const pitch = (p: Project) => `${p.pitch.problem} ${p.pitch.action} ${p.pitch.change}`
  const video = (p: Project) => (hasPitch(p.slug) ? ` Pitch video (${PITCH_SECONDS} s): ${abs(pitchVideoSrc(p.slug))}.` : '')
  const pitched = projects.filter((p) => hasPitch(p.slug)).length

  const lines: string[] = [
    `# ${identity.name}`,
    '',
    `> ${identity.summary}`,
    '',
    `${identity.name} (${identity.pronouns}) is a ${identity.title} based in ${identity.location.display}. ${a.display}, starting ${a.startDate.toLowerCase()}. ${a.workAuthorization}`,
    '',
    `Author: ${identity.name}. Content last updated ${meta.lastUpdated} (profile version ${meta.version}). Every page is also served as markdown: send \`Accept: text/markdown\` or fetch the \`/md/\` path listed next to each link.`,
    '',
    `Now, as of ${now.date}:`,
    '',
    ...now.lines.map((line) => `- ${line}`),
    '',
    '## Pages',
    '',
    `- [Home](${abs('/')}): headline, proof points, featured work, the pitch reel, experience, now and skills. Markdown: ${abs('/md/index.md')}`,
    `- [Projects](${abs('/projects')}): all ${projects.length} projects with the three-second strip, metrics, stack and repositories. Markdown: ${abs('/md/projects.md')}`,
    `- [Research](${abs('/research')}): ${publications.length} publications with abstracts, findings, figures and the research positions behind them. Markdown: ${abs('/md/research.md')}`,
    `- [About](${abs('/about')}): story, availability, education, leadership, recommendations and certifications. Markdown: ${abs('/md/about.md')}`,
    `- [Resume](${abs('/resume')}): the full resume as HTML. Markdown: ${abs('/md/resume.md')}. PDF: ${abs(links.resumePdf)}`,
    `- [Pitch reel](${abs('/#reel')}): ${pitched} project pitches of ${PITCH_SECONDS} seconds each, listed per project below`,
    '',
    `## Projects (${projects.length}, featured first; each note is the problem, what she did and what changed)`,
    '',
    ...projects.map((p) => `- [${p.name}](${abs(`/projects/${p.slug}`)}): ${pitch(p)}${video(p)} Markdown: ${abs(`/md/projects/${p.slug}.md`)}`),
    '',
    '## Publications',
    '',
    ...publications.map(
      (p) =>
        `- [${p.title}](${p.links.paper ?? p.venueUrl}): ${p.displayString} (${p.status}), ${formatMonth(p.date)}. Authors: ${p.authors.join(', ')}. ${p.tldr}`,
    ),
    '',
    '## Contact',
    '',
    `- [LinkedIn](${links.linkedin}): messages and connection requests`,
    `- [Book a call](${links.scheduling}): scheduling link`,
    `- [Contact card](${abs('/shreya-boyane.vcf')}): vCard download with the email address`,
    `- [Resume PDF](${abs(links.resumePdf)})`,
    '',
    '## Full content',
    '',
    `- [llms-full.txt](${abs('/llms-full.txt')}): every page of this site as one markdown document, plus the glossary of terms used on it`,
    `- [Resume in markdown](${abs('/md/resume.md')}): experience, research, education, publications, projects, skills and recognition`,
    '',
    '## Profiles',
    '',
    `- [LinkedIn](${links.linkedin})`,
    `- [GitHub](${links.github})`,
    `- [ORCID](${links.orcid})`,
    `- [Hugging Face](${links.huggingface})`,
    `- [Google Developers](${links.googleDev})`,
    `- [Dev.to](${links.devto})`,
    `- [HackerRank](${links.hackerrank})`,
    `- [VS Code Marketplace](${links.vscodeMarketplace})`,
    '',
    '## Optional',
    '',
    `- [Sitemap](${abs('/sitemap.xml')}): every indexable URL, with image and video entries`,
    `- [humans.txt](${abs('/humans.txt')}): who built the site and with what`,
  ]

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
