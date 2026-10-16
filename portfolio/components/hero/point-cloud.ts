/**
 * Starts the depth-portrait point cloud behind <DepthPortrait>. It loads after the first paint
 * (depth-portrait.tsx imports it once the page is idle), never with the page.
 *
 * Where a worker can draw WebGL2 into an OffscreenCanvas (asked of the worker itself, so the main
 * thread never pays for a probe context), the canvas is transferred to point-cloud.worker.ts and the
 * main thread only forwards size, visibility, pointer and scroll. Elsewhere the same program
 * (point-cloud-gl.ts) runs here on the main thread, as before.
 */
import { CONTEXT_OPTIONS, createPointCloudGL, gridFor, introResolve } from './point-cloud-gl'

const SESSION_KEY = 'depth-portrait:resolved'

export type PointCloudOptions = {
  canvas: HTMLCanvasElement
  /** The element whose box the canvas fills; observed for size and visibility. */
  host: HTMLElement
  src: string
  depthSrc: string
  width: number
  height: number
  cols: { phone: number; desktop: number }
  paused: boolean
  onReady: (grid: { cols: number; rows: number }) => void
  onUnsupported: () => void
}

export type PointCloud = { setPaused: (paused: boolean) => void; dispose: () => void }

type Env = {
  grid: { cols: number; rows: number }
  dpr: number
  fine: boolean
  skipIntro: boolean
  rememberIntro: () => void
}

/** Pointer position in clip space, -1 to 1 on both axes. */
const pointerOf = (e: PointerEvent) => ({ x: (e.clientX / window.innerWidth) * 2 - 1, y: -((e.clientY / window.innerHeight) * 2 - 1) })
/** 0 at the top of the page, 1 once it has scrolled 0.9 of a viewport. */
const scrollProgress = () => Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)))

export function startPointCloud(o: PointCloudOptions): PointCloud {
  let skipIntro = false
  try {
    skipIntro = sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    // Storage blocked: play the opening move every time.
  }
  const env: Env = {
    grid: gridFor(window.innerWidth, o.cols, o.width, o.height),
    dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    fine: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    skipIntro,
    rememberIntro: () => {
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // Storage blocked: nothing to remember.
      }
    },
  }
  const offscreen = typeof Worker !== 'undefined' && 'transferControlToOffscreen' in HTMLCanvasElement.prototype
  return offscreen ? inWorker(o, env) : onMainThread(o, env)
}

/** Worker path. Falls back to the main thread if the worker cannot load or has no WebGL2. */
function inWorker(o: PointCloudOptions, env: Env): PointCloud {
  const { canvas, host: el } = o
  let paused = o.paused
  let disposed = false
  let attached = false
  let fallback: PointCloud | null = null
  let onScreen = true

  let worker: Worker
  try {
    worker = new Worker(new URL('./point-cloud.worker.ts', import.meta.url))
  } catch {
    return onMainThread(o, env)
  }
  const send = (msg: unknown, transfer?: Transferable[]) => worker.postMessage(msg, transfer ?? [])
  const visible = () => onScreen && !document.hidden

  // Scroll progress without a scroll listener or a main-thread frame loop: a 1 px wide sentinel spans
  // the first 0.9 viewport heights of the document, and its visible share, observed in 1 percent steps,
  // is 1 minus the progress. The worker eases between steps. The main thread stays idle while the cloud draws.
  const sentinel = document.createElement('div')
  sentinel.setAttribute('aria-hidden', 'true')
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;visibility:hidden;pointer-events:none'
  const sizeSentinel = () => {
    sentinel.style.height = `${Math.max(1, Math.round(window.innerHeight * 0.9))}px`
  }
  const sio = new IntersectionObserver(([e]) => send({ type: 'scroll', value: 1 - e.intersectionRatio }), {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
  })

  const ro = new ResizeObserver(() => send({ type: 'size', width: el.clientWidth, height: el.clientHeight }))
  const io = new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting
    send({ type: 'visible', value: visible() })
  })
  const onMove = (e: PointerEvent) => send({ type: 'pointer', ...pointerOf(e) })
  const onVisibility = () => send({ type: 'visible', value: visible() })
  const teardown = () => {
    ro.disconnect()
    io.disconnect()
    sio.disconnect()
    sentinel.remove()
    window.removeEventListener('resize', sizeSentinel)
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('visibilitychange', onVisibility)
    worker.terminate()
  }

  worker.onerror = () => {
    if (disposed) return
    teardown()
    // Before the transfer the canvas is untouched, so the main thread can still draw it.
    if (!attached) fallback = onMainThread({ ...o, paused }, env)
    else o.onUnsupported()
  }
  worker.onmessage = (event: MessageEvent<{ type: string; value?: boolean }>) => {
    if (disposed) return
    const msg = event.data
    if (msg.type === 'capable') {
      if (!msg.value) {
        teardown()
        fallback = onMainThread({ ...o, paused }, env)
        return
      }
      let off: OffscreenCanvas
      try {
        off = canvas.transferControlToOffscreen()
      } catch {
        teardown()
        o.onUnsupported()
        return
      }
      attached = true
      send(
        {
          type: 'attach',
          canvas: off,
          src: new URL(o.src, location.href).href,
          depthSrc: new URL(o.depthSrc, location.href).href,
          grid: env.grid,
          dpr: env.dpr,
          width: el.clientWidth,
          height: el.clientHeight,
          skipIntro: env.skipIntro,
          paused,
          visible: visible(),
        },
        [off],
      )
      send({ type: 'scroll', value: scrollProgress(), jump: true })
    } else if (msg.type === 'ready') {
      ro.observe(el)
      io.observe(el)
      sizeSentinel()
      document.body.appendChild(sentinel)
      sio.observe(sentinel)
      window.addEventListener('resize', sizeSentinel, { passive: true })
      if (env.fine) window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      o.onReady(env.grid)
    } else if (msg.type === 'introDone') {
      env.rememberIntro()
    } else if (msg.type === 'unsupported') {
      teardown()
      o.onUnsupported()
    }
  }
  send({ type: 'probe' })

  return {
    setPaused: (next) => {
      paused = next
      if (fallback) fallback.setPaused(next)
      else send({ type: 'paused', value: next })
    },
    dispose: () => {
      disposed = true
      if (fallback) fallback.dispose()
      else teardown()
    },
  }
}

/** Main-thread path: the same program and loop, drawn here. */
function onMainThread(o: PointCloudOptions, env: Env): PointCloud {
  const { canvas, host: el } = o
  const noop: PointCloud = { setPaused: () => {}, dispose: () => {} }
  const gl = canvas.getContext('webgl2', CONTEXT_OPTIONS)
  const program = gl ? createPointCloudGL(gl, env.grid) : null
  if (!program) {
    o.onUnsupported()
    return noop
  }

  let raf = 0
  let disposed = false
  let visible = true
  let paused = o.paused
  const target = { x: 0, y: 0 }
  const cur = { x: 0, y: 0 }
  const intro = { active: false, start: 0 }

  const resize = () => {
    canvas.width = Math.round(el.clientWidth * env.dpr)
    canvas.height = Math.round(el.clientHeight * env.dpr)
    program.resize(canvas.width, canvas.height)
  }
  // A kick always draws one frame; the loop carries on only while playing, on screen and in a visible tab.
  const loop = () => {
    if (raf) return
    raf = requestAnimationFrame((now) => {
      raf = 0
      if (disposed) return
      cur.x += (target.x - cur.x) * 0.06
      cur.y += (target.y - cur.y) * 0.06
      let resolve = 1
      if (intro.active) {
        resolve = introResolve(now - intro.start)
        if (resolve >= 1) {
          intro.active = false
          env.rememberIntro()
        }
      }
      program.draw({ pointerX: cur.x, pointerY: cur.y, scroll: scrollProgress(), time: now / 1000, resolve })
      if (!paused && visible && !document.hidden) loop()
    })
  }

  const ro = new ResizeObserver(() => {
    resize()
    loop()
  })
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    if (visible) loop()
  })
  const onMove = (e: PointerEvent) => {
    const p = pointerOf(e)
    target.x = p.x
    target.y = p.y
  }
  const onVisibility = () => {
    if (!document.hidden) loop()
  }
  const load = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new window.Image()
      img.decoding = 'async'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })

  Promise.all([load(o.src), load(o.depthSrc)])
    .then(([color, depth]) => {
      if (disposed) return
      program.upload(0, color)
      program.upload(1, depth)
      resize()
      ro.observe(el)
      io.observe(el)
      if (env.fine) window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      if (!env.skipIntro) {
        intro.active = true
        intro.start = performance.now()
      }
      o.onReady(env.grid)
      loop()
    })
    .catch(() => {
      if (!disposed) o.onUnsupported()
    })

  return {
    setPaused: (next) => {
      paused = next
      if (!next) loop()
    },
    dispose: () => {
      disposed = true
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    },
  }
}
