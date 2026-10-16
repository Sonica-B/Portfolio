'use client'

import { WaveFunctionCollapse, type Rules, type Tile } from '@/components/instruments/madwe'
import type { Project } from '@/lib/content'

/*
 * Wave function collapse with the six generated biome tiles from outputs/assets/tiles in
 * github.com/Sonica-B/RealmWeaver-AI (converted to WebP under public/projects/realmweaver-ai/tiles)
 * and the adjacency table of create_tilemap_rules() in environment/models/map_rules.py.
 */

const TILES: Tile[] = ['water', 'beach', 'plains', 'forest', 'mountain', 'snow'].map((name) => ({
  name,
  src: `/projects/realmweaver-ai/tiles/${name}.webp`,
}))

const RULES: Rules = {
  water: ['water', 'beach'],
  beach: ['beach', 'plains', 'water'],
  plains: ['plains', 'forest', 'beach', 'mountain'],
  forest: ['forest', 'mountain', 'plains', 'snow'],
  mountain: ['mountain', 'snow', 'forest', 'plains'],
  snow: ['snow', 'mountain', 'forest'],
}

function metric(project: Project, label: string): string | null {
  return project.metrics.find((m) => m.label === label)?.value ?? null
}

export default function RealmweaverAi({ project }: { project: Project }) {
  const fid = metric(project, 'FID')
  const perAsset = metric(project, 'Time per asset')
  const status = [fid ? `FID ${fid}` : null, perAsset ? `${perAsset} per asset` : null, 'rules from map_rules.py'].filter(Boolean).join(', ')
  return <WaveFunctionCollapse project={project} tiles={TILES} rules={RULES} title="Wave function collapse" status={status} />
}
