import { NextResponse } from 'next/server'

// LinkedIn posts data - update this with your real posts
// For real-time fetching, you would integrate with LinkedIn API or a scraping service
const linkedInPosts = [
  {
    id: '1',
    date: 'Dec 2025',
    title: 'Multi-Agent AI for Legal Tech',
    excerpt: 'Excited to share our work on automating H-1B document validation using multi-agent systems...',
    likes: 156,
    comments: 23,
    url: 'https://linkedin.com/in/shreya-boyane'
  },
  {
    id: '2',
    date: 'Oct 2025',
    title: 'From DevOps to AI Engineering',
    excerpt: 'My journey transitioning from Lead DevOps at Persistent Systems to ML research...',
    likes: 243,
    comments: 41,
    url: 'https://linkedin.com/in/shreya-boyane'
  }
]

export async function GET() {
  // You can add real LinkedIn API integration here
  // For now, returning static data that can be manually updated

  return NextResponse.json({
    posts: linkedInPosts,
    lastUpdated: new Date().toISOString()
  })
}
