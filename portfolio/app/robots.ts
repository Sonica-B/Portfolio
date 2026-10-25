import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/content'

// Search and AI crawlers that get an explicit allow entry, so a stricter default can never lock them out.
const NAMED_CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
]

// /_next/ is internal, but the static bundle and image optimizer stay reachable so
// crawlers can render pages and index images. The longest matching rule wins.
const ALLOW = ['/', '/_next/static/', '/_next/image']
const DISALLOW = ['/_next/']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: ALLOW, disallow: DISALLOW },
      ...NAMED_CRAWLERS.map((userAgent) => ({ userAgent, allow: ALLOW, disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
