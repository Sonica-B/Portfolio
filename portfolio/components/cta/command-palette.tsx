import { profile } from '@/lib/content'
import { splitEmail } from './email'
import { PaletteLoader } from './palette-loader'

/**
 * Mount once in the layout (a server component): <CommandPalette />.
 * Opens on Ctrl K, Cmd K or a window "palette:open" CustomEvent (the nav trigger and the
 * scroll island dispatch it) and mirrors its state as "palette:state" (detail.open).
 * The dialog and its index (the static /palette-index.json route) load after the first paint,
 * or on the first shortcut, so no page ships them up front.
 */
export function CommandPalette() {
  return <PaletteLoader email={splitEmail(profile.links.email)} />
}
