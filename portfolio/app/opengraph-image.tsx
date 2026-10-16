import { profile } from '@/lib/content'
import { OG_CONTENT_TYPE, OG_SIZE, renderOg, type OgMetric } from '@/lib/og'

const { identity, education, publications, recognition } = profile
const wpi = education.find((e) => e.abbr === 'WPI')
const paper = publications.find((p) => p.id === 'latent-cot') ?? publications[0]
const ticket = recognition.find((r) => r.id === 'golden-ticket')
// "Golden Ticket Contest honorable mention, NVIDIA GTC 2026" -> label, value
const [ticketLabel, ticketValue] = ticket ? ticket.title.split(', ') : []

const metrics: OgMetric[] = []
if (paper) metrics.push({ value: paper.venue, label: paper.status })
if (ticket) metrics.push({ value: ticketValue ?? ticket.org, label: ticketLabel ?? ticket.title })
if (wpi) metrics.push({ value: `GPA ${wpi.gpa}`, label: `${wpi.degree}, ${wpi.field}, ${wpi.abbr}` })

export const alt = `${identity.name}, ${identity.title}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OpenGraphImage() {
  return renderOg({
    kicker: identity.title,
    title: identity.name,
    subtitle: identity.headline,
    metrics,
  })
}
