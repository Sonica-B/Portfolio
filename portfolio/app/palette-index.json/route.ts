import { buildPaletteIndex } from '@/components/cta/palette-index'

// Prerendered at build: the command palette fetches these rows the first time it is needed
// (components/cta/palette-loader.tsx), so no page carries the index in its HTML or flight data.
export const dynamic = 'force-static'

export function GET() {
  return Response.json(buildPaletteIndex())
}
