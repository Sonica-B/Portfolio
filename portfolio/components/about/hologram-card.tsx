import { profile } from '@/lib/content'
import { cn } from '@/lib/utils'
import { HudFrame } from '@/components/ui/hud-frame'
import { DepthPortrait } from '@/components/hero/depth-portrait'

/** The real pipeline behind the card; the figure's own caption adds the point count it allocated. */
const PIPELINE = 'Depth Anything V2 depth map, WebGL2 point field'

/**
 * Floating hologram card: a HUD frame around the cut-out portrait rendered as a depth-displaced
 * point field (float, pointer tilt and scan sweep live in DepthPortrait), with the pipeline as
 * the status line. Width comes from the caller: about 320 px on desktop, 60 percent on phones.
 */
export function HologramCard({ className }: { className?: string }) {
  const { identity } = profile
  return (
    // The figure's own caption is nowrap for the hero; inside a 60 percent card it has to wrap.
    <HudFrame status={PIPELINE} className={cn('[&_figcaption>span]:whitespace-normal', className)}>
      <DepthPortrait variant="hologram" alt={`${identity.name}, ${identity.title}`} />
    </HudFrame>
  )
}
