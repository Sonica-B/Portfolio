'use client'

import { useEffect, useState, type KeyboardEvent } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'
import { AnimatedNumber } from '@/components/motion-primitives/animated-number'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { Instrument, useInstrument } from '@/components/instruments/instrument'
import type { Metric, Project } from '@/lib/content'
import { cn } from '@/lib/utils'

/*
 * Metric explorer, the shared instrument for projects without a bespoke one. It renders
 * project.metrics from profile.json as a selectable list; the chosen value counts up when it
 * parses to one number (AnimatedNumber for integers, a decimal-preserving spring otherwise)
 * and reveals word by word when it does not, such as "3 to 4 days down to 5 to 10 min".
 */

type MetricLike = Metric & { note?: string }
type Parsed = { prefix: string; n: number; decimals: number; suffix: string }

const SINGLE = /^([^\d]*?)(\d[\d,]*(?:\.\d+)?)([^\d]*)$/

function parse(value: string): Parsed | null {
  const m = SINGLE.exec(value.trim())
  if (!m) return null
  const [, prefix, num, suffix] = m
  const n = Number(num.replace(/,/g, ''))
  if (!Number.isFinite(n)) return null
  return { prefix, n, decimals: (num.split('.')[1] ?? '').length, suffix }
}

function DecimalNumber({ value, decimals }: { value: number; decimals: number }) {
  const spring = useSpring(0, { bounce: 0, duration: 1200 })
  const text = useTransform(spring, (v) => v.toFixed(decimals))
  useEffect(() => {
    spring.set(value)
  }, [spring, value])
  return <motion.span className="tabular-nums">{text}</motion.span>
}

function BigValue({ value, reduced }: { value: string; reduced: boolean }) {
  const parsed = parse(value)
  const [shown, setShown] = useState(0)
  useEffect(() => {
    setShown(parsed?.n ?? 0)
  }, [parsed?.n])

  if (reduced) return <>{value}</>
  if (!parsed) {
    return (
      <TextEffect per="word" preset="slide" as="span" speedReveal={1.4} className="inline">
        {value}
      </TextEffect>
    )
  }
  return (
    <>
      {parsed.prefix}
      {parsed.decimals === 0 ? (
        <AnimatedNumber value={shown} springOptions={{ bounce: 0, duration: 1200 }} />
      ) : (
        <DecimalNumber value={shown} decimals={parsed.decimals} />
      )}
      {parsed.suffix}
    </>
  )
}

function Body({ metrics }: { metrics: MetricLike[] }) {
  const { reduced, interact } = useInstrument()
  const [index, setIndex] = useState(0)
  const current = metrics[index] ?? metrics[0]

  const select = (i: number) => {
    interact()
    setIndex(i)
  }
  const onGroupKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    let next = -1
    if (delta) next = (index + delta + metrics.length) % metrics.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = metrics.length - 1
    if (next < 0) return
    e.preventDefault()
    select(next)
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus()
  }

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div role="radiogroup" aria-label="Reported metric" onKeyDown={onGroupKey} className="flex flex-col gap-1 md:col-span-5">
        {metrics.map((m, i) => {
          const checked = i === index
          return (
            <button
              key={`${m.label}-${i}`}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                'press flex min-h-11 items-center justify-between gap-4 rounded-full border px-4 text-left text-sm transition-[background-color,border-color,color] duration-200',
                checked ? 'border-accent bg-accent text-accent-ink' : 'border-rule-strong text-ink hover:bg-surface-sunken',
              )}
            >
              <span>{m.label}</span>
              <span className={cn('text-metric shrink-0', checked ? 'text-accent-ink' : 'text-ink-2')}>{m.value}</span>
            </button>
          )
        })}
      </div>
      <div className="md:col-span-7">
        <p className="text-sm text-ink-2">{current.label}</p>
        <p aria-hidden="true" className="text-metric mt-2 text-4xl text-ink md:text-6xl">
          <BigValue key={index} value={current.value} reduced={reduced} />
        </p>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {current.label}: {current.value}
        </p>
        {current.note ? <p className="mt-3 max-w-[48ch] text-sm text-ink-2">{current.note}</p> : null}
      </div>
    </div>
  )
}

export default function MetricExplorer({ project }: { project: Project }) {
  const metrics = project.metrics as MetricLike[]
  if (metrics.length === 0) return null
  return (
    <Instrument
      title="Reported numbers"
      status={`${metrics.length} ${metrics.length === 1 ? 'metric' : 'metrics'} from the project write-up`}
      slug={project.slug}
      minHeight={280}
    >
      <Body metrics={metrics} />
    </Instrument>
  )
}
