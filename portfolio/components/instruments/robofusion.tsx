'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { animate } from 'motion/react'
import { ArrowClockwise } from '@phosphor-icons/react'
import { Instrument, useInstrument } from '@/components/instruments/instrument'
import type { Project } from '@/lib/content'
import { cn } from '@/lib/utils'

/*
 * Gesture to joints. Everything here mirrors github.com/Sonica-B/RoboFusion:
 * gesture labels from DataCollection/processed_data/labels/gesture_labels.py, the joint
 * mapping and limits from app.py and DataCollection/scripts/utils/configs.py, the wrist
 * to base mapping and the ROS2 service call from DataCollection/scripts/utils/file_utils.py,
 * and the model shape from MLModel/models/model.py (Input 42, Dense 128, Dense 64, softmax).
 */

const GESTURES = ['Fist', 'Open Hand', 'Thumbs Up', 'Thumbs Down', 'Palm Flat Up', 'Palm Flat Down', 'V Up', 'V Down'] as const
type Gesture = (typeof GESTURES)[number]

const STEP = 0.1 // radians per ANGLE_UPDATE_INTERVAL (1 s) in app.py
const DEFAULT_ANGLE_LIMIT = 0.0
const MAX_ANGLE_LIMIT = 0.7
const MIN_ANGLE_LIMIT = -0.7
const BASE_MOTOR_MAX_ANGLE = 1.57
const VIDEO_FEED_WIDTH = 640
const VIDEO_FEED_HEIGHT = 480

type Pose = { base: number; shoulder: number; elbow: number; wrist: number; gripper: number }
const REST: Pose = { base: 0, shoulder: 0, elbow: 0, wrist: 0, gripper: 0 } // ARM_ANGLES defaults in configs.py

const EFFECT: Record<Gesture, string> = {
  Fist: 'gripper closes 0.1 rad',
  'Open Hand': 'gripper opens 0.1 rad',
  'Thumbs Up': 'elbow -0.1 rad',
  'Thumbs Down': 'elbow +0.1 rad',
  'Palm Flat Up': 'wrist +0.1 rad',
  'Palm Flat Down': 'wrist -0.1 rad',
  'V Up': 'labelled in gesture_labels.py, no joint mapping in app.py',
  'V Down': 'labelled in gesture_labels.py, no joint mapping in app.py',
}

const DEG = 180 / Math.PI
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const rad = (v: number) => `${v.toFixed(2)} rad`

/** file_utils.map_wrist_to_base_angle, then the clamp app.py applies to the base motor. */
function baseFromWristX(wristX: number): number {
  const normalized = wristX / VIDEO_FEED_WIDTH
  return clamp((normalized - 0.5) * 2 * BASE_MOTOR_MAX_ANGLE, MIN_ANGLE_LIMIT, MAX_ANGLE_LIMIT)
}

/** One angle update of app.py for the current gesture and wrist position. */
function tick(pose: Pose, gesture: Gesture, wristX: number, wristY: number): Pose {
  const next = { ...pose, base: baseFromWristX(wristX) }
  if (gesture === 'Fist') next.gripper = Math.max(pose.gripper - STEP, DEFAULT_ANGLE_LIMIT)
  else if (gesture === 'Open Hand') next.gripper = Math.min(pose.gripper + STEP, MAX_ANGLE_LIMIT)
  if (gesture === 'Palm Flat Up') next.wrist = Math.min(pose.wrist + STEP, MAX_ANGLE_LIMIT)
  else if (gesture === 'Palm Flat Down') next.wrist = Math.max(pose.wrist - STEP, MIN_ANGLE_LIMIT)
  if (gesture === 'Thumbs Down') next.elbow = Math.min(pose.elbow + STEP, MAX_ANGLE_LIMIT)
  else if (gesture === 'Thumbs Up') next.elbow = Math.max(pose.elbow - STEP, MIN_ANGLE_LIMIT)
  if (wristY > VIDEO_FEED_HEIGHT * 0.6) next.shoulder = Math.min(pose.shoulder + STEP, MAX_ANGLE_LIMIT)
  else if (wristY < VIDEO_FEED_HEIGHT * 0.4) next.shoulder = Math.max(pose.shoulder - STEP, MIN_ANGLE_LIMIT)
  return next
}

function lerpPose(a: Pose, b: Pose, t: number): Pose {
  return {
    base: lerp(a.base, b.base, t),
    shoulder: lerp(a.shoulder, b.shoulder, t),
    elbow: lerp(a.elbow, b.elbow, t),
    wrist: lerp(a.wrist, b.wrist, t),
    gripper: lerp(a.gripper, b.gripper, t),
  }
}

/** Side view of the arm: base dial, shoulder, elbow, wrist and a two-finger gripper, drawn as strokes. */
function ArmFigure({ pose }: { pose: Pose }) {
  const open = (pose.gripper / MAX_ANGLE_LIMIT) * 34
  return (
    <svg viewBox="0 0 320 240" className="mx-auto h-auto w-full max-w-md text-accent" aria-hidden="true" focusable="false">
      <line x1="24" y1="216" x2="296" y2="216" className="stroke-rule-strong" strokeWidth="1" />
      <rect x="116" y="200" width="68" height="16" rx="3" className="fill-surface-sunken stroke-rule-strong" strokeWidth="1.5" />
      <g transform="translate(52 190)">
        <circle r="22" className="fill-surface-sunken stroke-rule-strong" strokeWidth="1.5" />
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${pose.base * DEG})`}
        />
        <circle r="3" fill="currentColor" />
      </g>
      <g transform={`translate(150 200) rotate(${pose.shoulder * DEG})`}>
        <line x1="0" y1="0" x2="0" y2="-78" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <circle r="6" className="fill-surface stroke-accent" strokeWidth="2.5" />
        <g transform={`translate(0 -78) rotate(${90 + pose.elbow * DEG})`}>
          <line x1="0" y1="0" x2="0" y2="-64" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle r="5.5" className="fill-surface stroke-accent" strokeWidth="2.5" />
          <g transform={`translate(0 -64) rotate(${-pose.wrist * DEG})`}>
            <line x1="0" y1="0" x2="0" y2="-14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle r="4.5" className="fill-surface stroke-accent" strokeWidth="2.5" />
            <g transform="translate(0 -14)">
              <line x1="0" y1="0" x2="0" y2="-18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" transform={`rotate(${-open})`} />
              <line x1="0" y1="0" x2="0" y2="-18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" transform={`rotate(${open})`} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

function Body() {
  const { reduced, interact } = useInstrument()
  const [gesture, setGesture] = useState<Gesture>('Open Hand')
  const [wristX, setWristX] = useState(VIDEO_FEED_WIDTH / 2)
  const [wristY, setWristY] = useState(VIDEO_FEED_HEIGHT / 2)
  const [pose, setPose] = useState<Pose>(REST)
  const [shown, setShown] = useState<Pose>(REST)
  const shownRef = useRef<Pose>(REST)
  const xId = useId()
  const yId = useId()

  // 400 ms ease to the mapped joint angles; reduced motion jumps straight there.
  useEffect(() => {
    const from = shownRef.current
    if (reduced) {
      shownRef.current = pose
      setShown(pose)
      return
    }
    const controls = animate(0, 1, {
      duration: 0.4,
      ease: 'easeOut',
      onUpdate: (t) => {
        const v = lerpPose(from, pose, t)
        shownRef.current = v
        setShown(v)
      },
    })
    return () => controls.stop()
  }, [pose, reduced])

  const apply = (g: Gesture) => {
    interact()
    setGesture(g)
    setPose((p) => tick(p, g, wristX, wristY))
  }

  const index = GESTURES.indexOf(gesture)
  const onGroupKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    let next = -1
    if (delta) next = (index + delta + GESTURES.length) % GESTURES.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = GESTURES.length - 1
    if (next < 0) return
    e.preventDefault()
    apply(GESTURES[next])
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus()
  }

  const joints = [pose.base, pose.shoulder, pose.elbow, pose.gripper] // joint_positions order in app.py

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      <div>
        <div role="radiogroup" aria-label="Hand gesture" onKeyDown={onGroupKey} className="flex flex-wrap gap-2">
          {GESTURES.map((g) => {
            const checked = g === gesture
            return (
              <button
                key={g}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                onClick={() => apply(g)}
                className={cn(
                  'press inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-200',
                  checked ? 'border-accent bg-accent text-accent-ink' : 'border-rule-strong text-ink hover:bg-surface-sunken',
                )}
              >
                {g}
              </button>
            )
          })}
        </div>
        <p className="mt-3 text-sm text-ink-2">
          <span className="text-ink">{gesture}</span>: {EFFECT[gesture]}
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={xId} className="flex justify-between text-sm text-ink-2">
              <span>Wrist x in frame</span>
              <span className="text-metric text-ink">{wristX} px</span>
            </label>
            <input
              id={xId}
              type="range"
              min={0}
              max={VIDEO_FEED_WIDTH}
              step={10}
              value={wristX}
              onChange={(e) => {
                const x = Number(e.target.value)
                interact()
                setWristX(x)
                setPose((p) => ({ ...p, base: baseFromWristX(x) }))
              }}
              className="mt-1 h-11 w-full accent-accent"
            />
          </div>
          <div>
            <label htmlFor={yId} className="flex justify-between text-sm text-ink-2">
              <span>Wrist y in frame</span>
              <span className="text-metric text-ink">{wristY} px</span>
            </label>
            <input
              id={yId}
              type="range"
              min={0}
              max={VIDEO_FEED_HEIGHT}
              step={10}
              value={wristY}
              onChange={(e) => {
                interact()
                setWristY(Number(e.target.value))
              }}
              className="mt-1 h-11 w-full accent-accent"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => apply(gesture)}
          className="press mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-rule-strong px-4 text-sm text-ink hover:bg-surface-sunken"
        >
          <ArrowClockwise size={16} aria-hidden="true" />
          Send another update
        </button>
      </div>

      <div>
        <ArmFigure pose={shown} />
        <dl aria-live="polite" aria-atomic="true" className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[13px] sm:grid-cols-3">
          {(
            [
              ['Gripper', pose.gripper],
              ['Base', pose.base],
              ['Elbow', pose.elbow],
              ['Wrist', pose.wrist],
              ['Shoulder V', pose.shoulder],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3 border-b border-rule py-1">
              <dt className="text-ink-2">{label}</dt>
              <dd className="text-metric text-ink">{rad(value)}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 break-words font-mono text-[13px] leading-5 text-ink-2">
          /goal_joint_space_path joint1 to joint4: [{joints.map((j) => j.toFixed(2)).join(', ')}] path_time 2.0
        </p>
      </div>
    </div>
  )
}

export default function Robofusion({ project }: { project: Project }) {
  return (
    <Instrument
      title="Gesture to joints"
      status="model.py: 42 inputs, 128 to 64 hidden, softmax. app.py steps each joint 0.1 rad per update within -0.7 to 0.7 rad"
      slug={project.slug}
      minHeight={440}
    >
      <Body />
    </Instrument>
  )
}
