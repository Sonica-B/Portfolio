import { profile } from '@/lib/content'
import { splitEmail } from './email'
import { buildPaletteIndex } from './palette-index'
import { PaletteDialog } from './palette-dialog'

// Built once per server process; the client only receives these rows as props.
const INDEX = buildPaletteIndex()

/**
 * Mount once in the layout (a server component): <CommandPalette />.
 * Opens on Ctrl K, Cmd K or a window "palette:open" CustomEvent (the nav trigger and the
 * scroll island dispatch it) and mirrors its state as "palette:state" (detail.open).
 */
export function CommandPalette() {
  return <PaletteDialog entries={INDEX} email={splitEmail(profile.links.email)} />
}
