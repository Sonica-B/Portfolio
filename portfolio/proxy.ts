import { NextResponse, type NextRequest } from 'next/server'

// Markdown content negotiation (Next 16 proxy, the successor of middleware).
// A client that prefers text/markdown over text/html, such as an AI agent sending
// `Accept: text/markdown`, is rewritten to the static mirror that scripts/build-markdown.mjs
// generates into public/md. Browsers never list text/markdown, so HTML is untouched; it only
// gains a Link header that advertises the markdown twin, so an agent can discover it without guessing.

const EXACT = new Map<string, string>([
  ['/', '/md/index.md'],
  ['/projects', '/md/projects.md'],
  ['/research', '/md/research.md'],
  ['/about', '/md/about.md'],
  ['/resume', '/md/resume.md'],
])
const PROJECT = /^\/projects\/([a-z0-9][a-z0-9-]*)$/

/** True when text/markdown is listed and text/html does not appear earlier in the Accept list. */
function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false
  const types = accept
    .toLowerCase()
    .split(',')
    .map((part) => part.split(';')[0].trim())
  const markdown = types.indexOf('text/markdown')
  if (markdown === -1) return false
  const html = types.indexOf('text/html')
  return html === -1 || markdown < html
}

function markdownPath(pathname: string): string | null {
  const exact = EXACT.get(pathname)
  if (exact) return exact
  const match = PROJECT.exec(pathname)
  return match ? `/md/projects/${match[1]}.md` : null
}

export function proxy(request: NextRequest) {
  const target = markdownPath(request.nextUrl.pathname)
  if (!target) return NextResponse.next()

  if (!prefersMarkdown(request.headers.get('accept'))) {
    const response = NextResponse.next()
    response.headers.set('Link', `<${request.nextUrl.origin}${target}>; rel="alternate"; type="text/markdown"`)
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = target
  url.search = ''
  const response = NextResponse.rewrite(url)
  response.headers.set('Vary', 'Accept')
  return response
}

export const config = {
  matcher: ['/', '/projects/:path*', '/research', '/about', '/resume'],
}
