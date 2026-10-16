import type { MetadataRoute } from 'next'
import { profile, SITE_URL, type Project } from '@/lib/content'
import { PITCH_SECONDS, hasPitch, pitchPosterSrc, pitchVideoSrc } from '@/components/reel/pitch-slugs'

type Entry = MetadataRoute.Sitemap[number]
type Video = NonNullable<Entry['videos']>[number]

const PORTRAITS = ['/portrait/shreya2-560.webp', '/portrait/shreya2-1120.webp']
const abs = (path: string) => `${SITE_URL}${path}`

// Every indexable route, generated from the content model so a new project is listed automatically.
// Project pages carry their pitch as a video sitemap entry and the WebP poster as an image.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(profile.meta.lastUpdated)
  const entry = (path: string, changeFrequency: Entry['changeFrequency'], priority: number, extra: Partial<Entry> = {}): Entry => ({
    url: abs(path),
    lastModified,
    changeFrequency,
    priority,
    ...extra,
  })

  const pitchVideo = (p: Project): Video => ({
    title: `${p.name}: ${PITCH_SECONDS}-second pitch`,
    description: `${p.pitch.problem} ${p.pitch.action} ${p.pitch.change}`,
    thumbnail_loc: abs(pitchPosterSrc(p.slug)),
    content_loc: abs(pitchVideoSrc(p.slug)),
    duration: PITCH_SECONDS,
    publication_date: lastModified,
    family_friendly: 'yes',
    uploader: { info: SITE_URL, content: profile.identity.name },
  })

  const projectEntry = (p: Project): Entry => {
    const pitch = hasPitch(p.slug)
    const images = [...(pitch ? [abs(pitchPosterSrc(p.slug))] : []), ...(p.visual ? [abs(p.visual.src)] : [])]
    return entry(`/projects/${p.slug}`, p.status === 'ongoing' ? 'monthly' : 'yearly', p.featured ? 0.8 : 0.6, {
      ...(images.length ? { images } : {}),
      ...(pitch ? { videos: [pitchVideo(p)] } : {}),
    })
  }

  const figures = profile.publications.flatMap((p) => p.figures.map((f) => abs(f.src)))

  return [
    entry('/', 'weekly', 1, { images: PORTRAITS.map(abs) }),
    entry('/projects', 'weekly', 0.9),
    entry('/research', 'monthly', 0.9, figures.length ? { images: figures } : {}),
    entry('/resume', 'monthly', 0.8),
    entry('/about', 'monthly', 0.7, { images: [abs(PORTRAITS[1])] }),
    ...profile.projects.map(projectEntry),
    entry('/llms.txt', 'monthly', 0.3),
  ]
}
