'use client'

import { useCallback, useEffect, useId, useRef } from 'react'
import { useState } from 'react'
import type { Project } from '@/lib/content'
import raw from '@/content/instruments/latent-cot.json'
import { Instrument, Segmented, findMetric, useInstrument } from '@/components/instruments/instrument'

/**
 * Trajectory scrubber: a step slider over real 2D projections of latent chain-of-thought
 * states. The points are PCA coordinates of the six latent steps for the same 400 GSM8K
 * problems under CODI and COCONUT (content/instruments/latent-cot.json, sampled from the
 * paper's result files). Spread is computed here, in the browser, as the mean distance of
 * the points to their centroid at the shown step.
 */

type Point = [number, number]
type Model = { name: string; steps: Point[][] }
type Stat = { cx: number; cy: number; spread: number }

const data = raw as unknown as { models: Model[]; note: string }
const MODELS: Model[] = data.models.filter((m) => m.steps.length > 0)
const STEPS = MODELS[0]?.steps.length ?? 0

function statOf(points: Point[]): Stat {
  if (points.length === 0) return { cx: 0, cy: 0, spread: 0 }
  let sx = 0
  let sy = 0
  for (const [x, y] of points) {
    sx += x
    sy += y
  }
  const cx = sx / points.length
  const cy = sy / points.length
  let total = 0
  for (const [x, y] of points) total += Math.hypot(x - cx, y - cy)
  return { cx, cy, spread: total / points.length }
}

const STATS: Stat[][] = MODELS.map((model) => model.steps.map(statOf))

/** Shared axis extent over both models and every step so the scale never jumps. */
const EXTENT = (() => {
  let xmin = Infinity
  let xmax = -Infinity
  let ymin = Infinity
  let ymax = -Infinity
  for (const model of MODELS)
    for (const step of model.steps)
      for (const [x, y] of step) {
        if (x < xmin) xmin = x
        if (x > xmax) xmax = x
        if (y < ymin) ymin = y
        if (y > ymax) ymax = y
      }
  if (!Number.isFinite(xmin)) return { xmin: -1, xmax: 1, ymin: -1, ymax: 1 }
  const padX = (xmax - xmin) * 0.06 || 1
  const padY = (ymax - ymin) * 0.06 || 1
  return { xmin: xmin - padX, xmax: xmax + padX, ymin: ymin - padY, ymax: ymax + padY }
})()

const TRANSITION_MS = 360
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export default function LatentCot({ project }: { project: Project }) {
  const [modelIndex, setModelIndex] = useState(0)
  const [step, setStep] = useState(0)
  const model = MODELS[modelIndex]
  const stat = STATS[modelIndex]?.[step]
  const samples = findMetric(project, /GSM8K samples/i)?.value
  const dim = findMetric(project, /dimension/i)?.value

  const status =
    model && stat
      ? `Step ${step + 1} of ${STEPS} · ${model.name} spread ${stat.spread.toFixed(1)} · PCA of ${dim ? `${dim}-dim ` : ''}latent states, ${model.steps[step].length} of ${samples ?? 'the'} GSM8K samples`
      : 'Trajectory data not available'

  return (
    <Instrument title="Trajectory scrubber" status={status} slug={project.slug} minHeight={460}>
      {model ? (
        <Scrubber
          project={project}
          modelIndex={modelIndex}
          onModel={setModelIndex}
          step={step}
          onStep={setStep}
        />
      ) : null}
    </Instrument>
  )
}

function Scrubber({
  project,
  modelIndex,
  onModel,
  step,
  onStep,
}: {
  project: Project
  modelIndex: number
  onModel: (index: number) => void
  step: number
  onStep: (step: number) => void
}) {
  const { reduced, interact } = useInstrument()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const shown = useRef(step)
  const raf = useRef(0)
  const modelRef = useRef(modelIndex)
  modelRef.current = modelIndex
  const sliderId = useId()
  const model = MODELS[modelIndex]
  const dmd = findMetric(project, /DMD/i)

  const draw = useCallback((t: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const current = MODELS[modelRef.current]
    const stats = STATS[modelRef.current]
    if (!canvas || !ctx || !current || !stats) return

    const { width, height } = canvas
    const dpr = window.devicePixelRatio || 1
    const css = getComputedStyle(canvas)
    const accent = css.getPropertyValue('--accent').trim() || '#7dd3fc'
    const ink = css.getPropertyValue('--ink').trim() || '#f4f4f5'
    const rule = css.getPropertyValue('--rule').trim() || '#3f3f46'

    const pad = 14 * dpr
    const scale = Math.min(
      (width - 2 * pad) / (EXTENT.xmax - EXTENT.xmin),
      (height - 2 * pad) / (EXTENT.ymax - EXTENT.ymin),
    )
    const ox = pad + (width - 2 * pad - (EXTENT.xmax - EXTENT.xmin) * scale) / 2
    const oy = pad + (height - 2 * pad - (EXTENT.ymax - EXTENT.ymin) * scale) / 2
    const X = (x: number) => ox + (x - EXTENT.xmin) * scale
    const Y = (y: number) => height - (oy + (y - EXTENT.ymin) * scale)

    const i0 = Math.max(0, Math.min(STEPS - 1, Math.floor(t)))
    const i1 = Math.min(STEPS - 1, i0 + 1)
    const f = Math.min(1, Math.max(0, t - i0))
    const a = current.steps[i0]
    const b = current.steps[i1]
    const origin = f > 0 ? a : current.steps[Math.max(0, i0 - 1)]
    const sa = stats[i0]
    const sb = stats[i1]

    ctx.clearRect(0, 0, width, height)

    // Axes through the PCA origin.
    ctx.globalAlpha = 1
    ctx.strokeStyle = rule
    ctx.lineWidth = dpr
    ctx.beginPath()
    ctx.moveTo(X(0), 0)
    ctx.lineTo(X(0), height)
    ctx.moveTo(0, Y(0))
    ctx.lineTo(width, Y(0))
    ctx.stroke()

    // Trails from the previous position of every point.
    if (origin !== a || f > 0) {
      ctx.strokeStyle = accent
      ctx.globalAlpha = 0.16
      ctx.beginPath()
      for (let k = 0; k < a.length; k++) {
        const [x0, y0] = origin[k]
        const x = a[k][0] + (b[k][0] - a[k][0]) * f
        const y = a[k][1] + (b[k][1] - a[k][1]) * f
        ctx.moveTo(X(x0), Y(y0))
        ctx.lineTo(X(x), Y(y))
      }
      ctx.stroke()
    }

    // Points.
    ctx.fillStyle = accent
    ctx.globalAlpha = 0.85
    const r = 2.2 * dpr
    for (let k = 0; k < a.length; k++) {
      const x = a[k][0] + (b[k][0] - a[k][0]) * f
      const y = a[k][1] + (b[k][1] - a[k][1]) * f
      ctx.beginPath()
      ctx.arc(X(x), Y(y), r, 0, Math.PI * 2)
      ctx.fill()
    }

    // Centroid crosshair and a dashed ring whose radius is the spread.
    const cx = sa.cx + (sb.cx - sa.cx) * f
    const cy = sa.cy + (sb.cy - sa.cy) * f
    const spread = sa.spread + (sb.spread - sa.spread) * f
    ctx.globalAlpha = 0.9
    ctx.strokeStyle = ink
    ctx.lineWidth = 1.5 * dpr
    ctx.setLineDash([4 * dpr, 4 * dpr])
    ctx.beginPath()
    ctx.arc(X(cx), Y(cy), spread * scale, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
    const c = 6 * dpr
    ctx.beginPath()
    ctx.moveTo(X(cx) - c, Y(cy))
    ctx.lineTo(X(cx) + c, Y(cy))
    ctx.moveTo(X(cx), Y(cy) - c)
    ctx.lineTo(X(cx), Y(cy) + c)
    ctx.stroke()
    ctx.globalAlpha = 1
  }, [])

  // Size the canvas to its frame in device pixels.
  useEffect(() => {
    const frame = frameRef.current
    const canvas = canvasRef.current
    if (!frame || !canvas) return
    const fit = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = frame.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      draw(shown.current)
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [draw])

  // Move between steps: a short eased tween, or a jump under reduced motion.
  useEffect(() => {
    cancelAnimationFrame(raf.current)
    if (reduced || Math.abs(shown.current - step) < 0.001) {
      shown.current = step
      draw(step)
      return
    }
    const from = shown.current
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / TRANSITION_MS)
      shown.current = from + (step - from) * easeOut(p)
      draw(shown.current)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [step, reduced, draw])

  useEffect(() => {
    draw(shown.current)
  }, [modelIndex, draw])

  if (!model) return null
  const pointCount = model.steps[step]?.length ?? 0

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,640px)_minmax(240px,1fr)] md:items-start">
      <div
        ref={frameRef}
        className="frame-media relative aspect-[4/3] w-full overflow-hidden border border-rule bg-surface-sunken"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          role="img"
          aria-label={`${model.name} latent states at step ${step + 1} of ${STEPS}, projected to two PCA dimensions`}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Segmented
          label="Model"
          options={MODELS.map((m, i) => ({ id: String(i), label: m.name }))}
          value={String(modelIndex)}
          onChange={(id) => {
            interact()
            onModel(Number(id))
          }}
        />
        <p className="text-base text-ink-2">
          <span className="text-metric text-ink">{pointCount}</span> problems, same set for both models
        </p>

        <div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor={sliderId} className="text-base text-ink-2">
              Latent step
            </label>
            <span className="text-metric text-base text-ink" aria-hidden="true">
              {step + 1} / {STEPS}
            </span>
          </div>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={Math.max(0, STEPS - 1)}
            step={1}
            value={step}
            aria-valuetext={`Step ${step + 1} of ${STEPS}`}
            onChange={(event) => {
              interact()
              onStep(Number(event.target.value))
            }}
            className="h-11 w-full cursor-ew-resize accent-accent"
          />
        </div>

        <dl className="hairline grid grid-cols-2 gap-x-4 gap-y-1 pt-3">
          {MODELS.map((m, i) => {
            const st = STATS[i]?.[step]
            const base = STATS[i]?.[0]?.spread || 1
            if (!st) return null
            const selected = i === modelIndex
            return (
              <div key={m.name} className={selected ? 'text-ink' : 'text-ink-2'}>
                <dt className="text-base">{m.name} spread</dt>
                <dd className="text-metric text-lead">{st.spread.toFixed(1)}</dd>
                <dd className="text-base text-ink-2">{(st.spread / base).toFixed(2)}x step 1</dd>
              </div>
            )
          })}
        </dl>
        <p className="text-base text-ink-2">Spread is the mean distance of the points to their centroid, in PCA units.</p>

        {dmd ? (
          <p className="text-base text-ink-2">
            Reported in the paper, {dmd.label.charAt(0).toLowerCase() + dmd.label.slice(1)}:{' '}
            <span className="text-metric text-ink">{dmd.value}</span>
          </p>
        ) : null}
      </div>
    </div>
  )
}
