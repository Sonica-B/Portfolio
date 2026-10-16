/// <reference lib="webworker" />
/**
 * Draws the depth-portrait point cloud into an OffscreenCanvas, so WebGL context creation (about
 * 100 ms on a software GPU), texture upload and every frame's draw stay off the main thread.
 * Protocol (point-cloud.ts is the other side):
 *   main -> worker  probe | attach {canvas, src, depthSrc, grid, dpr, width, height, skipIntro, paused, visible}
 *                   size {width, height} | pointer {x, y} | scroll {value} | visible {value} | paused {value}
 *   worker -> main  capable {value} | ready | introDone | unsupported
 */
import { CONTEXT_OPTIONS, createPointCloudGL, introResolve, type PointCloudGL } from './point-cloud-gl'

type Attach = {
  type: 'attach'
  canvas: OffscreenCanvas
  src: string
  depthSrc: string
  grid: { cols: number; rows: number }
  dpr: number
  width: number
  height: number
  skipIntro: boolean
  paused: boolean
  visible: boolean
}
type Message =
  | { type: 'probe' }
  | Attach
  | { type: 'size'; width: number; height: number }
  | { type: 'pointer'; x: number; y: number }
  | { type: 'scroll'; value: number; jump?: boolean }
  | { type: 'visible'; value: boolean }
  | { type: 'paused'; value: boolean }

const scope = self as unknown as DedicatedWorkerGlobalScope
const post = (msg: unknown) => scope.postMessage(msg)

const raf: (cb: (now: number) => void) => number =
  typeof scope.requestAnimationFrame === 'function'
    ? (cb) => scope.requestAnimationFrame(cb)
    : (cb) => scope.setTimeout(() => cb(performance.now()), 16) as unknown as number

let canvas: OffscreenCanvas | null = null
let program: PointCloudGL | null = null
let ready = false
let paused = false
let visible = true
let frame = 0
let dpr = 1
let cols = 1
const target = { x: 0, y: 0 }
const cur = { x: 0, y: 0 }
/** Scroll progress arrives in 1 percent steps (an IntersectionObserver on the main thread); `scroll` eases toward it. */
let scrollTarget = 0
let scroll = 0
const intro = { active: false, start: 0 }

const resize = (width: number, height: number) => {
  if (!canvas || !program) return
  canvas.width = Math.max(1, Math.round(width * dpr))
  canvas.height = Math.max(1, Math.round(height * dpr))
  program.resize(canvas.width, canvas.height)
}

// Same contract as the main-thread loop: a kick always draws one frame (a resize clears the buffer,
// so a paused cloud repaints), and the loop carries on only while playing, on screen and in a visible tab.
const loop = () => {
  if (frame || !ready) return
  frame = raf((now) => {
    frame = 0
    if (!program) return
    cur.x += (target.x - cur.x) * 0.06
    cur.y += (target.y - cur.y) * 0.06
    scroll += (scrollTarget - scroll) * 0.35
    if (Math.abs(scrollTarget - scroll) < 0.0005) scroll = scrollTarget
    let resolve = 1
    if (intro.active) {
      resolve = introResolve(now - intro.start)
      if (resolve >= 1) {
        intro.active = false
        post({ type: 'introDone' })
      }
    }
    program.draw({ pointerX: cur.x, pointerY: cur.y, scroll, time: now / 1000, resolve })
    if (!paused && visible) loop()
  })
}

const bitmap = (url: string) =>
  fetch(url)
    .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
    .then((blob) => createImageBitmap(blob, { premultiplyAlpha: 'none' }))

scope.onmessage = (event: MessageEvent<Message>) => {
  const msg = event.data
  switch (msg.type) {
    case 'probe': {
      let ok = false
      try {
        ok = typeof OffscreenCanvas !== 'undefined' && Boolean(new OffscreenCanvas(1, 1).getContext('webgl2'))
      } catch {
        ok = false
      }
      post({ type: 'capable', value: ok })
      return
    }
    case 'attach': {
      canvas = msg.canvas
      dpr = msg.dpr
      cols = msg.grid.cols
      paused = msg.paused
      visible = msg.visible
      const gl = canvas.getContext('webgl2', CONTEXT_OPTIONS) as WebGL2RenderingContext | null
      program = gl ? createPointCloudGL(gl, msg.grid) : null
      if (!program) {
        post({ type: 'unsupported' })
        return
      }
      Promise.all([bitmap(msg.src), bitmap(msg.depthSrc)])
        .then(([color, depth]) => {
          if (!program) return
          program.upload(0, color)
          program.upload(1, depth)
          color.close()
          depth.close()
          resize(msg.width, msg.height)
          if (!msg.skipIntro) {
            intro.active = true
            intro.start = performance.now()
          }
          ready = true
          post({ type: 'ready', cols, rows: msg.grid.rows })
          loop()
        })
        .catch(() => post({ type: 'unsupported' }))
      return
    }
    case 'size':
      resize(msg.width, msg.height)
      loop()
      return
    case 'pointer':
      target.x = msg.x
      target.y = msg.y
      return
    case 'scroll':
      scrollTarget = Math.min(1, Math.max(0, msg.value))
      if (msg.jump) scroll = scrollTarget
      return
    case 'visible':
      visible = msg.value
      if (visible) loop()
      return
    case 'paused':
      paused = msg.value
      if (!paused) loop()
      return
  }
}
