import { NextResponse } from 'next/server'

const EMBED_URL =
  'https://www.linkedin.com/embed/feed/update/urn:li:share:7422436984255598592?collapsed=1'

function extractMeta(html: string, property: string): string {
  const r1 = new RegExp(
    `<meta\\s+(?:property|name)=["']${property}["']\\s+content=["']([^"']*)["']`, 'i'
  )
  const m1 = html.match(r1)
  if (m1) return m1[1]
  const r2 = new RegExp(
    `<meta\\s+content=["']([^"']*)["']\\s+(?:property|name)=["']${property}["']`, 'i'
  )
  const m2 = html.match(r2)
  return m2 ? m2[1] : ''
}

async function fetchPost() {
  const res = await fetch(EMBED_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Accept: 'text/html',
    },
    next: { revalidate: 86400 },
  })
  if (!res.ok) throw new Error(`${res.status}`)
  const html = await res.text()

  const description = extractMeta(html, 'description')
  const imageUrl = extractMeta(html, 'og:image').replace(/&amp;/g, '&')
  const ogTitle = extractMeta(html, 'og:title')
  const commentMatch = ogTitle.match(/(\d+)\s*comment/i)
  const commentCount = commentMatch ? parseInt(commentMatch[1], 10) : 0

  const ariaMatch = html.match(/feed-actor-name[^>]*aria-label=["']View profile for ([^"']+)["']/i)
  const authorName = ariaMatch ? ariaMatch[1].trim() : 'Shreya Boyane'

  const postText = description.replace(/\s*\|\s*\d+\s*comments?\s*on\s*LinkedIn\s*$/i, '').trim()

  return {
    authorName,
    authorTitle: 'Machine Learning Engineer | Computer Vision, Generative AI, LLMs, MLOps & DevOps',
    postUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7422436984255598592',
    profileUrl: 'https://www.linkedin.com/in/shreya-boyane',
    postText,
    imageUrl: imageUrl || '/images/linkedin-post.jpg',
    commentCount,
    timeAgo: '1mo',
  }
}

const FALLBACK = {
  authorName: 'Shreya Boyane',
  authorTitle: 'Machine Learning Engineer | Computer Vision, Generative AI, LLMs, MLOps & DevOps',
  postUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7422436984255598592',
  profileUrl: 'https://www.linkedin.com/in/shreya-boyane',
  postText: 'Still smiling about this one. 😊\n\nIn Dec 2025, I received the Data Science GQP MVP award for our project on immigration document validation.\n\nThis award means a lot because our work was not a demo. It was a real system for a real pain point.',
  imageUrl: '/images/linkedin-post.jpg',
  commentCount: 27,
  timeAgo: '1mo',
}

export async function GET() {
  try {
    const data = await fetchPost()
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' },
    })
  } catch {
    return NextResponse.json(FALLBACK, {
      headers: { 'Cache-Control': 'public, s-maxage=3600' },
    })
  }
}
