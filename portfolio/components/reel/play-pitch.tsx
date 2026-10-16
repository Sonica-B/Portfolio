'use client'

import { Play } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useReel } from './reel-provider'
import { PITCH_SECONDS, hasPitch } from './pitch-slugs'

const SIZE = {
  sm: 'min-h-11 px-3.5 text-sm',
  md: 'min-h-12 px-5 text-base',
} as const

/** Opens the shared lightbox for a project's pitch. Renders nothing when the project has no video. */
export function PlayPitch({
  slug,
  label = `Watch the ${PITCH_SECONDS} s pitch`,
  size = 'sm',
  location = 'card',
  className,
}: {
  slug: string
  label?: string
  size?: keyof typeof SIZE
  location?: string
  className?: string
}) {
  const { open } = useReel()
  if (!hasPitch(slug)) return null
  return (
    <button
      type="button"
      onClick={() => open(slug, location)}
      className={cn(
        'press inline-flex items-center gap-2 rounded-full border border-rule-strong font-medium whitespace-nowrap text-ink transition-colors hover:bg-surface-raised',
        SIZE[size],
        className,
      )}
    >
      <Play size={size === 'md' ? 18 : 16} aria-hidden="true" />
      {label}
    </button>
  )
}
