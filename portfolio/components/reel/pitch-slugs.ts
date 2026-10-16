/**
 * Static facts about the pitch videos. No directive and no imports so both server and
 * client modules can read it without pulling profile.json into the client bundle.
 *
 * The slugs are the files present in public/videos/<slug>.mp4, listed in profile.json
 * project order. Client code cannot read the file system, so the list is hardcoded here;
 * pitchItems() in pitch-reel.tsx re-derives the order from profile.projects at build time.
 */
export const PITCH_SLUGS = [
  'latent-cot',
  'skiplegal',
  'einstein-vision',
  'madwe',
  'tumorlytix',
  'scene-mood-classifier',
  'fairprep',
  'vla-physics',
  'medical-triage',
  'autogit',
  'vio',
  'robofusion',
  'buildings-built-in-minutes',
  'trended-pathfinder',
  'realmweaver-ai',
] as const

export type PitchSlug = (typeof PITCH_SLUGS)[number]

/** Nominal length of every pitch, as labelled on the project pages. */
export const PITCH_SECONDS = 25

/** What the filmstrip and the lightbox need per video: computed on the server, passed as props. */
export type PitchItem = { slug: string; name: string; outcome: string }

const SET: ReadonlySet<string> = new Set(PITCH_SLUGS)

export function hasPitch(slug: string): slug is PitchSlug {
  return SET.has(slug)
}

export function pitchVideoSrc(slug: string): string {
  return `/videos/${slug}.mp4`
}

/** 960 x 540 WebP poster for the lightbox. */
export function pitchPosterSrc(slug: string): string {
  return `/videos/${slug}.webp`
}

/** 480 x 270 WebP thumbnail for the filmstrip. */
export function pitchThumbSrc(slug: string): string {
  return `/videos/${slug}-thumb.webp`
}

export const PITCH_THUMB = { width: 480, height: 270 } as const
export const PITCH_POSTER = { width: 960, height: 540 } as const
