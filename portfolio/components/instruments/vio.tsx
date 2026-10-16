'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/content'
import { Instrument, Segmented, findMetric, useInstrument } from '@/components/instruments/instrument'

/**
 * Odometry toggle: the three model towers (visual-inertial fusion, vision-only,
 * IMU-only) on each held-out test trajectory, cropped from the report's Fig. 7 grid
 * (odometry-outputs.png) into public/projects/vio/odometry-row*-*.webp. Numbers come
 * from project.metrics and project.highlights only.
 */

type Model = { id: string; label: string; metric: RegExp; fallback: string }

const MODELS: Model[] = [
  { id: 'visual-inertial', label: 'Visual-inertial', metric: /ATE/i, fallback: 'Transformer fusion of both streams' },
  { id: 'vision-only', label: 'Vision-only', metric: /RGB rate/i, fallback: 'Reference model for the ATE comparison' },
  { id: 'imu-only', label: 'IMU-only', metric: /IMU rate/i, fallback: 'Bi-LSTM over IMU windows' },
]

/** Row order and names from the report's Fig. 7 caption: Spiral, Infinity, Random. */
const ROWS = [
  { id: 'row0', label: 'Spiral' },
  { id: 'row1', label: 'Infinity' },
  { id: 'row2', label: 'Random' },
]

const WIDTH = 461
const HEIGHT = 304

export default function Vio({ project }: { project: Project }) {
  const [modelId, setModelId] = useState(MODELS[0].id)
  const [rowId, setRowId] = useState(ROWS[0].id)
  const model = MODELS.find((m) => m.id === modelId) ?? MODELS[0]
  const row = ROWS.find((r) => r.id === rowId) ?? ROWS[0]
  const metric = findMetric(project, model.metric)
  const status = `${model.label} · ${row.label}${metric ? ` · ${metric.label} ${metric.value}` : ''}`

  return (
    <Instrument title="Odometry results" status={status} slug={project.slug} minHeight={420}>
      <Toggle project={project} model={model} row={row} onModel={setModelId} onRow={setRowId} />
    </Instrument>
  )
}

function Toggle({
  project,
  model,
  row,
  onModel,
  onRow,
}: {
  project: Project
  model: Model
  row: { id: string; label: string }
  onModel: (id: string) => void
  onRow: (id: string) => void
}) {
  const { interact } = useInstrument()
  const metric = findMetric(project, model.metric)
  const ateLine = model.id === 'visual-inertial' ? project.highlights.find((line) => /ATE/.test(line)) : undefined

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Segmented
          label="Model"
          options={MODELS.map((m) => ({ id: m.id, label: m.label }))}
          value={model.id}
          onChange={(id) => {
            interact()
            onModel(id)
          }}
        />
        <Segmented
          label="Test trajectory"
          options={ROWS}
          value={row.id}
          onChange={(id) => {
            interact()
            onRow(id)
          }}
        />
      </div>

      <div
        className="frame-media relative mx-auto w-full max-w-[640px] overflow-hidden border border-rule bg-white"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {MODELS.map((m) => {
          const active = m.id === model.id
          return (
            <div
              key={m.id}
              className={`absolute inset-0 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={!active}
            >
              <Image
                src={`/projects/vio/odometry-${row.id}-${m.id}.webp`}
                alt={`${m.label} odometry on ${row.label.toLowerCase()}: predicted trajectory and rotations in red against ground truth in blue`}
                width={WIDTH}
                height={HEIGHT}
                sizes="(min-width: 1024px) 720px, 100vw"
                draggable={false}
                className="h-full w-full object-contain"
              />
            </div>
          )
        })}
      </div>

      <dl className="hairline grid gap-x-4 gap-y-1 pt-3 sm:grid-cols-[auto_1fr]">
        <dt className="text-base text-ink-2">{metric ? metric.label : model.label}</dt>
        <dd className="text-base text-ink">
          {metric ? <span className="text-metric text-lead">{metric.value}</span> : model.fallback}
          {ateLine ? <span className="mt-1 block text-ink-2">{ateLine}</span> : null}
        </dd>
      </dl>
    </div>
  )
}
