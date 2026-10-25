import { profile } from '@/lib/content'
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og'

const { identity, education } = profile
const wpi = education.find((e) => e.abbr === 'WPI')

export const alt = `${identity.name}, ${identity.title}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OpenGraphImage() {
  return renderOg({
    kicker: identity.title,
    title: identity.name,
    subtitle: identity.headline,
    metrics: [
      { value: 'ICML 2026', label: 'FoGen Workshop poster' },
      { value: 'NVIDIA GTC 2026', label: 'Golden Ticket honorable mention' },
      { value: `GPA ${wpi?.gpa ?? '3.9'}`, label: `M.S. AI, ${wpi?.abbr ?? 'WPI'}` },
    ],
  })
}
