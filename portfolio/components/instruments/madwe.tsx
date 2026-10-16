'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { ArrowsClockwise, Sparkle } from '@phosphor-icons/react'
import { Instrument, useInstrument } from '@/components/instruments/instrument'
import type { Project } from '@/lib/content'
import { cn } from '@/lib/utils'

/*
 * Two instruments live here. The default export is the MADWE sprite gallery: it cycles the
 * real training sprites from data/raw/sprites in github.com/Sonica-B/RealmWeaver-MADWE
 * (one file per stem, converted to WebP under public/projects/madwe/sprites). The named
 * WaveFunctionCollapse export is the shared collapse toy that realmweaver-ai.tsx configures
 * with its own tiles and adjacency rules; it follows the propagate and retry loop of
 * environment/models/wave_function_collapse.py in github.com/Sonica-B/RealmWeaver-AI.
 */

/* ---------- Seeded randomness so Regenerate reseeds deterministically ---------- */

function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const randomSeed = () => Math.floor(Math.random() * 0x7fffffff)
const seedLabel = (seed: number) => `0x${seed.toString(16).padStart(8, '0')}`

function metric(project: Project, label: string): string | null {
  return project.metrics.find((m) => m.label === label)?.value ?? null
}

/* ---------- Wave function collapse (shared) ---------- */

export type Tile = { name: string; src: string }
export type Rules = Record<string, string[]>
type Cell = { tile: string; order: number }

/**
 * Minimum-entropy collapse with constraint propagation. Rules are the same in every direction,
 * as in map_rules.py. A cell whose options shrink to one is treated as collapsed. On a
 * contradiction the whole grid restarts, up to maxRetries times, like the repo's generate().
 */
export function collapseGrid(
  width: number,
  height: number,
  tiles: string[],
  rules: Rules,
  seed: number,
  maxRetries = 5,
): { cells: Cell[]; attempts: number } | null {
  const rand = mulberry32(seed)
  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ]
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const grid: string[][] = Array.from({ length: width * height }, () => [...tiles])
    const order = new Array<number>(width * height).fill(-1)
    let counter = 0
    let contradiction = false

    const propagate = (start: number): boolean => {
      const queue = [start]
      while (queue.length) {
        const i = queue.shift() as number
        const x = i % width
        const y = Math.floor(i / width)
        for (const [dx, dy] of dirs) {
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue
          const n = ny * width + nx
          if (order[n] >= 0) continue
          const allowed = new Set<string>()
          for (const t of grid[i]) for (const a of rules[t] ?? []) if (rules[a]?.includes(t)) allowed.add(a)
          const before = grid[n].length
          grid[n] = grid[n].filter((t) => allowed.has(t))
          if (grid[n].length === 0) return false
          if (grid[n].length < before) {
            if (grid[n].length === 1) order[n] = counter++
            queue.push(n)
          }
        }
      }
      return true
    }

    while (true) {
      let min = Infinity
      let candidates: number[] = []
      for (let i = 0; i < grid.length; i++) {
        if (order[i] >= 0) continue
        const entropy = grid[i].length
        if (entropy < min) {
          min = entropy
          candidates = [i]
        } else if (entropy === min) candidates.push(i)
      }
      if (candidates.length === 0) break
      const pick = candidates[Math.floor(rand() * candidates.length)]
      const options = grid[pick]
      grid[pick] = [options[Math.floor(rand() * options.length)]]
      order[pick] = counter++
      if (!propagate(pick)) {
        contradiction = true
        break
      }
    }
    if (!contradiction) return { cells: grid.map((g, i) => ({ tile: g[0], order: order[i] })), attempts: attempt }
  }
  return null
}

export function WaveFunctionCollapse({
  project,
  tiles,
  rules,
  title,
  status,
  width = 12,
  height = 8,
}: {
  project: Project
  tiles: Tile[]
  rules: Rules
  title: string
  status: string
  width?: number
  height?: number
}) {
  return (
    <Instrument title={title} status={status} slug={project.slug} minHeight={420}>
      <CollapseBody tiles={tiles} rules={rules} width={width} height={height} />
    </Instrument>
  )
}

function CollapseBody({ tiles, rules, width, height }: { tiles: Tile[]; rules: Rules; width: number; height: number }) {
  const { reduced, interact } = useInstrument()
  const [seed, setSeed] = useState(0x6708c004) // a fixed first map that shows every biome; Regenerate reseeds
  const [revealed, setRevealed] = useState(false)
  const names = useMemo(() => tiles.map((t) => t.name), [tiles])
  const srcOf = useMemo(() => new Map(tiles.map((t) => [t.name, t.src])), [tiles])
  const result = useMemo(() => collapseGrid(width, height, names, rules, seed), [width, height, names, rules, seed])

  useEffect(() => {
    if (reduced) {
      setRevealed(true)
      return
    }
    setRevealed(false)
    const frame = requestAnimationFrame(() => setRevealed(true))
    return () => cancelAnimationFrame(frame)
  }, [seed, reduced])

  const counts = useMemo(() => {
    const tally = new Map<string, number>(names.map((n) => [n, 0]))
    for (const c of result?.cells ?? []) tally.set(c.tile, (tally.get(c.tile) ?? 0) + 1)
    return [...tally.entries()]
  }, [result, names])
  const countsText = counts.map(([n, c]) => `${n} ${c}`).join(', ')

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-7">
        {result ? (
          <div
            role="img"
            aria-label={`Collapsed map of ${width} by ${height} tiles: ${countsText}`}
            className="grid w-full max-w-96 overflow-hidden border border-rule bg-surface-sunken"
            style={{ gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))` }}
          >
            {result.cells.map((cell, i) => (
              <div
                key={`${seed}-${i}`}
                className="aspect-square"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'none' : 'scale(0.6)',
                  transition: reduced ? 'none' : 'opacity 240ms cubic-bezier(0.25, 1, 0.5, 1), transform 240ms cubic-bezier(0.25, 1, 0.5, 1)',
                  transitionDelay: reduced ? '0ms' : `${cell.order * 8}ms`,
                }}
              >
                <Image src={srcOf.get(cell.tile) ?? ''} alt="" width={32} height={32} unoptimized className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-2">No valid map after five attempts; regenerate to reseed.</p>
        )}
      </div>
      <div className="md:col-span-5">
        <button
          type="button"
          onClick={() => {
            interact()
            setSeed(randomSeed())
          }}
          className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-ink hover:opacity-90"
        >
          <ArrowsClockwise size={16} aria-hidden="true" />
          Regenerate
        </button>
        <dl aria-live="polite" aria-atomic="true" className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[13px]">
          {counts.map(([name, count]) => (
            <div key={name} className="flex items-center justify-between gap-3 border-b border-rule py-1">
              <dt className="flex items-center gap-2 text-ink-2">
                <Image src={srcOf.get(name) ?? ''} alt="" width={16} height={16} unoptimized className="h-4 w-4 object-cover" />
                {name}
              </dt>
              <dd className="text-metric text-ink">{count}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-mono text-[13px] leading-5 text-ink-2">
          seed {seedLabel(seed)}, {result ? `${result.attempts} ${result.attempts === 1 ? 'attempt' : 'attempts'}` : 'no result'}, {width * height} cells
        </p>
        <p className="mt-2 text-sm text-ink-2">Lowest-entropy cell collapses first, neighbours lose the options the rules forbid, repeat.</p>
      </div>
    </div>
  )
}

/* ---------- MADWE sprite gallery (default export) ---------- */

const SPRITES = [
  { set: 'pixel_characters', stem: 'pixel_characters_8bit_hero_0000' },
  { set: 'pixel_characters', stem: 'pixel_characters_16bit_mage_0000' },
  { set: 'pixel_characters', stem: 'pixel_characters_modern_pixel_0000' },
  { set: 'fantasy_items', stem: 'fantasy_items_legendary_sword_0000' },
  { set: 'fantasy_items', stem: 'fantasy_items_healing_potion_0000' },
  { set: 'fantasy_items', stem: 'fantasy_items_artifact_amulet_0000' },
  { set: 'sci_fi_items', stem: 'sci_fi_items_plasma_rifle_0000' },
  { set: 'sci_fi_items', stem: 'sci_fi_items_nano_medkit_0000' },
].map((s) => ({ ...s, src: `/projects/madwe/sprites/${s.stem}.webp` }))

function shuffledOrder(seed: number): number[] {
  const rand = mulberry32(seed)
  const order = SPRITES.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

function GalleryBody() {
  const { reduced, interact } = useInstrument()
  const [seed, setSeed] = useState(0x4d414457)
  const [step, setStep] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const order = useMemo(() => shuffledOrder(seed), [seed])
  const current = order[step % order.length]
  const sprite = SPRITES[current]

  useEffect(() => {
    if (reduced) {
      setRevealed(true)
      return
    }
    setRevealed(false)
    const frame = requestAnimationFrame(() => setRevealed(true))
    return () => cancelAnimationFrame(frame)
  }, [current, reduced])

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-5">
        <div className="mx-auto w-full max-w-64 overflow-hidden border border-rule bg-surface-sunken">
          <Image
            key={sprite.stem}
            src={sprite.src}
            alt={`Training sprite ${sprite.stem}`}
            width={256}
            height={256}
            sizes="256px"
            className="h-auto w-full"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'scale(0.94)',
              transition: reduced ? 'none' : 'opacity 240ms cubic-bezier(0.25, 1, 0.5, 1), transform 240ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          />
        </div>
      </div>
      <div className="md:col-span-7">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              interact()
              setStep((s) => s + 1)
            }}
            className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-ink hover:opacity-90"
          >
            <Sparkle size={16} aria-hidden="true" />
            Generate
          </button>
          <button
            type="button"
            onClick={() => {
              interact()
              setSeed(randomSeed())
              setStep(0)
            }}
            className="press inline-flex min-h-11 items-center gap-2 rounded-full border border-rule-strong px-4 text-sm text-ink hover:bg-surface-sunken"
          >
            <ArrowsClockwise size={16} aria-hidden="true" />
            Regenerate
          </button>
        </div>
        <dl aria-live="polite" aria-atomic="true" className="mt-4 space-y-1 font-mono text-[13px] leading-5">
          <div className="flex flex-wrap justify-between gap-x-4 border-b border-rule py-1">
            <dt className="text-ink-2">stem</dt>
            <dd className="break-all text-ink">{sprite.stem}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4 border-b border-rule py-1">
            <dt className="text-ink-2">path</dt>
            <dd className="break-all text-ink">data/raw/sprites/{sprite.set}/{sprite.stem}.png</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4 border-b border-rule py-1">
            <dt className="text-ink-2">order</dt>
            <dd className="text-metric text-ink">
              {(step % order.length) + 1} of {order.length}, seed {seedLabel(seed)}
            </dd>
          </div>
        </dl>
        <ul className="mt-4 flex flex-wrap gap-1" aria-label="Sprites in this order">
          {order.map((idx, i) => {
            const s = SPRITES[idx]
            const active = idx === current
            return (
              <li key={s.stem}>
                <button
                  type="button"
                  aria-label={s.stem}
                  aria-pressed={active}
                  onClick={() => {
                    interact()
                    setStep(i)
                  }}
                  className={cn(
                    'press flex h-11 w-11 items-center justify-center border transition-[border-color] duration-200',
                    active ? 'border-accent' : 'border-rule hover:border-rule-strong',
                  )}
                >
                  <Image src={s.src} alt="" width={36} height={36} sizes="36px" className="h-9 w-9" />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default function Madwe({ project }: { project: Project }) {
  const perMinute = metric(project, 'Assets per minute')
  const latency = metric(project, 'p95 latency')
  const status = [perMinute ? `${perMinute} assets per minute` : null, latency ? `p95 latency ${latency}` : null].filter(Boolean).join(', ')
  return (
    <Instrument title="Generate" status={status || project.metrics[0]?.value || ''} slug={project.slug} minHeight={400}>
      <GalleryBody />
    </Instrument>
  )
}
