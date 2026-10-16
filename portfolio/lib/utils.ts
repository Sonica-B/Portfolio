import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * The type scale and data faces live in globals.css as `text-*` utilities. Without this,
 * tailwind-merge reads `text-lead` as a colour and drops it when `text-ink-2` follows.
 */
const twMerge = extendTailwindMerge<'text-metric'>({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'headline', 'title', 'lead', 'label', 'status'] }],
      'text-metric': [{ text: ['metric'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
