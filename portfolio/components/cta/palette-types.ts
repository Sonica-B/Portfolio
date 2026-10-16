/**
 * Palette row shape and group order. Client-safe on purpose: palette-index.ts builds the rows from
 * profile.json on the server, so the dialog imports these from here and never pulls the profile in.
 */

export type PaletteGroup = 'Sections' | 'Actions' | 'Work' | 'Research' | 'Experience' | 'Skills' | 'Certifications'

export type PaletteEntry = {
  id: string
  group: PaletteGroup
  title: string
  /** Secondary line under the title. */
  hint?: string
  /** Lowercased extra text the query is matched against. */
  keywords: string
  /** Internal path, a hash on "/", or an http(s) URL. */
  href?: string
  /** Client-side actions with no destination. */
  action?: 'email' | 'pitch'
  download?: boolean
}

/** Result order in the palette. */
export const PALETTE_GROUPS: PaletteGroup[] = ['Sections', 'Actions', 'Work', 'Research', 'Experience', 'Skills', 'Certifications']

/** Static JSON route that serves the rows (app/palette-index.json/route.ts). */
export const PALETTE_INDEX_URL = '/palette-index.json'
