import type { MetadataRoute } from 'next'
import { profile, SITE_URL } from '@/lib/content'

type Entry = MetadataRoute.Sitemap[number]

// Every indexable route, generated from the content model so a new project is listed automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(profile.meta.lastUpdated)
  const entry = (path: string, changeFrequency: Entry['changeFrequency'], priority: number, images?: string[]): Entry => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
    ...(images && images.length ? { images } : {}),
  })

  return [
    entry('/', 'weekly', 1, [`${SITE_URL}/portrait/shreya-flat.jpg`]),
    entry('/projects', 'weekly', 0.9),
    entry('/research', 'monthly', 0.9),
    entry('/resume', 'monthly', 0.8),
    entry('/about', 'monthly', 0.7),
    ...profile.projects.map((p) =>
      entry(
        `/projects/${p.slug}`,
        p.status === 'ongoing' ? 'monthly' : 'yearly',
        p.featured ? 0.8 : 0.6,
        p.visual ? [`${SITE_URL}${p.visual.src}`] : undefined,
      ),
    ),
    entry('/llms.txt', 'monthly', 0.3),
  ]
}
