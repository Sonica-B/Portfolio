/**
 * Which projects have a bespoke instrument (components/instruments/<slug>.tsx). Server-safe on
 * purpose: the client registry builds its dynamic imports against this list, and the project
 * page reads it on the server to decide where the project's visual goes.
 */
export const BESPOKE_SLUGS = [
  'latent-cot',
  'einstein-vision',
  'tumorlytix',
  'vio',
  'buildings-built-in-minutes',
  'robofusion',
  'skiplegal',
  'madwe',
  'realmweaver-ai',
  'trended-pathfinder',
  'autogit',
] as const

export type BespokeSlug = (typeof BESPOKE_SLUGS)[number]

/**
 * Bespoke instruments that already show the project's visual (the orbit scrubs the same NeRF
 * render the still is cut from), so the page does not repeat it as a figure.
 */
const SHOWS_VISUAL: ReadonlySet<string> = new Set<BespokeSlug>(['buildings-built-in-minutes'])

export function hasBespokeInstrument(slug: string): boolean {
  return (BESPOKE_SLUGS as readonly string[]).includes(slug)
}

/** True when the page should show the visual as its own figure: a bespoke instrument that does not already draw it. */
export function visualNeedsFigure(slug: string): boolean {
  return hasBespokeInstrument(slug) && !SHOWS_VISUAL.has(slug)
}
