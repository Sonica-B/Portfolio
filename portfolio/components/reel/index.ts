/**
 * Server-side barrel: pitch-reel.tsx reads profile.json, so client components should import the
 * leaf files instead (./play-pitch, ./reel-provider, ./pitch-slugs) to keep it out of their bundle.
 */
export { PitchReel, pitchItems, outcomeLine } from './pitch-reel'
export { ReelProvider, useReel, type ReelContextValue } from './reel-provider'
export { PlayPitch } from './play-pitch'
export { ReelDialog } from './reel-dialog'
export { Filmstrip } from './filmstrip'
export * from './pitch-slugs'
