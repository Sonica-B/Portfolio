'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import type { Project } from '@/lib/content'
import { BESPOKE_SLUGS, hasBespokeInstrument, type BespokeSlug } from './bespoke'

type InstrumentComponent = ComponentType<{ project: Project }>

/**
 * Bespoke instruments by project slug, keyed by the server-safe list in ./bespoke so the two cannot
 * drift. Everything else falls back to a figure switcher or the metric explorer.
 */
const bespoke: Record<BespokeSlug, InstrumentComponent> = {
  'latent-cot': dynamic(() => import('./latent-cot'), { ssr: false }),
  'einstein-vision': dynamic(() => import('./einstein-vision'), { ssr: false }),
  tumorlytix: dynamic(() => import('./tumorlytix'), { ssr: false }),
  vio: dynamic(() => import('./vio'), { ssr: false }),
  'buildings-built-in-minutes': dynamic(() => import('./buildings-built-in-minutes'), { ssr: false }),
  robofusion: dynamic(() => import('./robofusion'), { ssr: false }),
  skiplegal: dynamic(() => import('./skiplegal'), { ssr: false }),
  madwe: dynamic(() => import('./madwe'), { ssr: false }),
  'realmweaver-ai': dynamic(() => import('./realmweaver-ai'), { ssr: false }),
  'trended-pathfinder': dynamic(() => import('./trended-pathfinder'), { ssr: false }),
  autogit: dynamic(() => import('./autogit'), { ssr: false }),
}

const FigureSwitcher = dynamic(() => import('./figure-switcher'), { ssr: false })
const MetricExplorer = dynamic(() => import('./metric-explorer'), { ssr: false })

export { BESPOKE_SLUGS, hasBespokeInstrument }

/** The instrument for a project: bespoke when one exists, otherwise the figure switcher (when a visual exists) or the metric explorer. */
export function InstrumentFor({ project }: { project: Project }) {
  const Bespoke = hasBespokeInstrument(project.slug) ? bespoke[project.slug as BespokeSlug] : undefined
  if (Bespoke) return <Bespoke project={project} />
  if (project.visual) return <FigureSwitcher project={project} />
  if (project.metrics.length > 0) return <MetricExplorer project={project} />
  return null
}
