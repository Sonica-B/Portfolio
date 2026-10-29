import { featuredProjects, profile, SITE_URL } from '@/lib/content'

export const dynamic = 'force-static'

// /llms.txt following https://llmstxt.org: H1, a blockquote summary, short context,
// then H2 sections whose list items are links with notes. Everything comes from profile.json.
export function GET() {
  const { identity, links, publications, meta } = profile
  const abs = (path: string) => `${SITE_URL}${path}`

  const lines: string[] = [
    `# ${identity.name}`,
    '',
    `> ${identity.summary}`,
    '',
    `${identity.name} (${identity.pronouns}) is a ${identity.title} based in ${identity.location.display}. ${identity.availability.display}. ${identity.availability.workAuthorization} Content last updated ${meta.lastUpdated}.`,
    '',
    'Every page is also served as markdown: request it with an `Accept: text/markdown` header or fetch the `/md/` path listed next to each link.',
    '',
    '## Pages',
    '',
    `- [Home](${abs('/')}): headline, proof points, featured work, experience and skills. Markdown: ${abs('/md/index.md')}`,
    `- [Projects](${abs('/projects')}): all ${profile.projects.length} projects with metrics, stacks and repositories. Markdown: ${abs('/md/projects.md')}`,
    `- [Research](${abs('/research')}): publications with abstracts, findings, figures and research positions. Markdown: ${abs('/md/research.md')}`,
    `- [About](${abs('/about')}): bio, availability, education, leadership, recommendations and certifications. Markdown: ${abs('/md/about.md')}`,
    `- [Resume](${abs('/resume')}): the full resume as HTML. Markdown: ${abs('/md/resume.md')}. PDF: ${abs(links.resumePdf)}`,
    '',
    '## Featured projects',
    '',
    ...featuredProjects.map(
      (p) => `- [${p.name}](${abs(`/projects/${p.slug}`)}): ${p.summary} Markdown: ${abs(`/md/projects/${p.slug}.md`)}`,
    ),
    '',
    '## Open source',
    '',
    `${profile.openSource.summary} All pull requests: ${profile.openSource.allUrl}`,
    '',
    ...profile.openSource.merged.map((m) => `- [${m.org} ${m.repo} #${m.number}](${m.url}): merged, ${m.title}`),
    '',
    '## Publications',
    '',
    ...publications.map((p) => `- [${p.title}](${p.links.paper ?? p.venueUrl}): ${p.displayString}. ${p.tldr}`),
    '',
    '## Full content',
    '',
    `- [llms-full.txt](${abs('/llms-full.txt')}): every page of this site concatenated into one markdown document`,
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
    `- [Sitemap](${abs('/sitemap.xml')}): every indexable URL`,
    `- [humans.txt](${abs('/humans.txt')}): who built the site and with what`,
    `- [Book a call](${links.scheduling}): scheduling link`,
    `- [Email](${links.email}): ${identity.email}`,
  ]

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
