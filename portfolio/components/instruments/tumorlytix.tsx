'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/content'
import { Instrument, findMetric, useInstrument } from '@/components/instruments/instrument'

/**
 * Stage slider over the project's own segmentation figure: the five panels of one
 * test slice (test input, reconstructed output, anomaly map, segmentation, overlay)
 * from the report's results figure, cropped to public/projects/tumorlytix/seg-*.webp.
 * Dragging crossfades between consecutive panels; arrow keys snap to the next stage.
 */

type Stage = { src: string; label: string; detail: string }

const STAGES: Stage[] = [
  { src: '/projects/tumorlytix/seg-0-test-input.webp', label: 'Test input', detail: 'Original (tumor)' },
  { src: '/projects/tumorlytix/seg-1-reconstructed-output.webp', label: 'Reconstructed output', detail: 'Reconstructed (healthy)' },
  { src: '/projects/tumorlytix/seg-2-anomaly-map.webp', label: 'Anomaly map', detail: 'Difference between input and reconstruction' },
  { src: '/projects/tumorlytix/seg-3-segmentation.webp', label: 'Segmentation', detail: 'Segmentation mask' },
  { src: '/projects/tumorlytix/seg-4-overlay.webp', label: 'Overlay', detail: 'Mask drawn over the input' },
]
const SIZE = 219
const LAST = STAGES.length - 1

export default function Tumorlytix({ project }: { project: Project }) {
  const [value, setValue] = useState(0)
  const stageIndex = Math.round(value)
  const stage = STAGES[stageIndex] ?? STAGES[0]
  const accuracy = findMetric(project, /segmentation accuracy/i)
  const images = findMetric(project, /MRI images/i)
  const status = [
    `Stage ${stageIndex + 1} of ${STAGES.length}: ${stage.label}`,
    accuracy ? `${accuracy.label} ${accuracy.value}` : null,
    images ? `${images.value} ${images.label}` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <Instrument title="Segmentation stages" status={status} slug={project.slug} minHeight={360}>
      <StageSlider project={project} value={value} onValue={setValue} />
    </Instrument>
  )
}

function StageSlider({
  project,
  value,
  onValue,
}: {
  project: Project
  value: number
  onValue: (value: number) => void
}) {
  const { interact } = useInstrument()
  const sliderId = useId()
  const stageIndex = Math.round(value)
  const stage = STAGES[stageIndex] ?? STAGES[0]
  const accuracy = findMetric(project, /segmentation accuracy/i)
  const precision = findMetric(project, /precision/i)

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let next: number | null = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'PageUp') next = Math.min(LAST, Math.floor(value + 1e-6) + 1)
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'PageDown') next = Math.max(0, Math.ceil(value - 1e-6) - 1)
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = LAST
    if (next === null) return
    event.preventDefault()
    interact()
    onValue(next)
  }

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
      <div className="frame-media relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden border border-rule bg-surface-sunken">
        {STAGES.map((s, i) => {
          const opacity = Math.max(0, 1 - Math.abs(value - i))
          return (
            <div key={s.src} className="absolute inset-0" style={{ opacity }} aria-hidden={opacity === 0}>
              <Image
                src={s.src}
                alt={`${s.label}: ${s.detail}`}
                width={SIZE}
                height={SIZE}
                sizes="(min-width: 768px) 320px, 100vw"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <p className="text-title text-ink">{stage.label}</p>
          <p className="text-base text-ink-2">{stage.detail}</p>
        </div>

        <div>
          <label htmlFor={sliderId} className="text-base text-ink-2">
            Pipeline stage
          </label>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={LAST}
            step={0.02}
            value={value}
            aria-valuetext={`Stage ${stageIndex + 1} of ${STAGES.length}, ${stage.label}`}
            onChange={(event) => {
              interact()
              onValue(Number(event.target.value))
            }}
            onKeyDown={onKeyDown}
            className="h-11 w-full cursor-ew-resize accent-accent"
          />
          <ol className="mt-1 grid grid-cols-5 gap-1">
            {STAGES.map((s, i) => (
              <li key={s.src} className="min-w-0">
                <button
                  type="button"
                  onClick={() => {
                    interact()
                    onValue(i)
                  }}
                  aria-current={i === stageIndex ? 'step' : undefined}
                  className={`press min-h-11 w-full rounded-[8px] px-1 text-base leading-tight ${
                    i === stageIndex ? 'text-ink' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  <span className="text-metric">{i + 1}</span>
                  <span className="sr-only"> {s.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <dl className="hairline grid grid-cols-2 gap-x-4 gap-y-1 pt-3">
          {[accuracy, precision]
            .filter((metric): metric is NonNullable<typeof metric> => Boolean(metric))
            .map((metric) => (
              <div key={metric.label}>
                <dt className="text-base text-ink-2">{metric.label}</dt>
                <dd className="text-metric text-lead text-ink">{metric.value}</dd>
              </div>
            ))}
        </dl>
      </div>
    </div>
  )
}
