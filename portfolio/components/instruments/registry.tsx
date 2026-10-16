'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import type { Project } from '@/lib/content'

type InstrumentComponent = ComponentType<{ project: Project }>

const opts = { ssr: false } as const

/** Bespoke instruments by project slug. Everything else falls back to a figure switcher or the metric explorer. */
const bespoke: Record<string, InstrumentComponent> = {
  'latent-cot': dynamic(() => import('./latent-cot'), opts),
  'einstein-vision': dynamic(() => import('./einstein-vision'), opts),
  tumorlytix: dynamic(() => import('./tumorlytix'), opts),
  vio: dynamic(() => import('./vio'), opts),
  'buildings-built-in-minutes': dynamic(() => import('./buildings-built-in-minutes'), opts),
  robofusion: dynamic(() => import('./robofusion'), opts),
  skiplegal: dynamic(() => import('./skiplegal'), opts),
  madwe: dynamic(() => import('./madwe'), opts),
  'realmweaver-ai': dynamic(() => import('./realmweaver-ai'), opts),
  'trended-pathfinder': dynamic(() => import('./trended-pathfinder'), opts),
  autogit: dynamic(() => import('./autogit'), opts),
}

const FigureSwitcher = dynamic(() => import('./figure-switcher'), opts)
const MetricExplorer = dynamic(() => import('./metric-explorer'), opts)

export const BESPOKE_SLUGS = Object.keys(bespoke)

export function hasBespokeInstrument(slug: string): boolean {
  return slug in bespoke
}

/** The instrument for a project: bespoke when one exists, otherwise the figure switcher (when a visual exists) or the metric explorer. */
export function InstrumentFor({ project }: { project: Project }) {
  const Bespoke = bespoke[project.slug]
  if (Bespoke) return <Bespoke project={project} />
  if (project.visual) return <FigureSwitcher project={project} />
  if (project.metrics.length > 0) return <MetricExplorer project={project} />
  return null
}
