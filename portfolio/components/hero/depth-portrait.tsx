'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// Vertex shader: one point per grid cell. Position comes from gl_VertexID, so no
// vertex buffer is needed. Depth displaces each point toward the pointer and explodes
// the cloud outward on scroll. uResolve runs the opening move: 0 is fully scattered
// (hashed offsets up to 0.6 of the frame), 1 is the settled portrait.
const VERT = `#version 300 es
precision highp float;
uniform sampler2D uColor;
uniform sampler2D uDepth;
uniform vec2 uGrid;
uniform vec2 uPointer;
uniform float uScroll;
uniform float uTime;
uniform float uSize;
uniform float uResolve;
out vec2 vUv;
out float vAlpha;
out float vDepth;
float hash(vec2 s) { return fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  float id = float(gl_VertexID);
  float col = mod(id, uGrid.x);
  float row = floor(id / uGrid.x);
  vec2 uv = (vec2(col, row) + 0.5) / uGrid;
  vec4 c = texture(uColor, uv);
  float d = texture(uDepth, uv).r;
  vUv = uv;
  vAlpha = c.a;
  vDepth = d;
  vec2 p = uv * 2.0 - 1.0;
  float z = d - 0.45;
  p.x += uPointer.x * z * 0.10;
  p.y += uPointer.y * z * 0.07;
  p += (uv - 0.5) * uScroll * (0.3 + d * 0.5);
  p.x += sin(uTime * 0.7 + d * 7.0 + row * 0.02) * 0.0035 * d;
  p.y += cos(uTime * 0.6 + col * 0.015) * 0.003 * d;
  vec2 scatter = vec2(hash(vec2(col, row)), hash(vec2(row, col) + 7.0)) * 2.0 - 1.0;
  p += scatter * 1.2 * (1.0 - uResolve);
  gl_Position = vec4(p, 0.0, 1.0);
  gl_PointSize = uSize * (1.1 + d * 0.7) * (1.0 + uScroll * 0.8);
}`

// Fragment shader: round points. The photo colour is cooled toward the accent cyan as
// depth falls away: far points carry up to a 25 percent mix, near points keep their colour.
const FRAG = `#version 300 es
precision highp float;
uniform sampler2D uColor;
uniform float uScroll;
uniform float uResolve;
in vec2 vUv;
in float vAlpha;
in float vDepth;
out vec4 outColor;
void main() {
  if (vAlpha < 0.5) discard;
  vec2 c = gl_PointCoord - 0.5;
  if (dot(c, c) > 0.25) discard;
  vec3 col = texture(uColor, vUv).rgb;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  vec3 cool = vec3(0.47, 0.89, 0.98) * (0.35 + 0.65 * lum);
  col = mix(col, cool, (1.0 - vDepth) * 0.25);
  float a = (1.0 - uScroll * 0.85) * (0.78 + vDepth * 0.22) * (0.4 + 0.6 * uResolve);
  outColor = vec4(col * a, a);
}`

type Variant = 'hero' | 'hologram'

// Per-variant assets and density. maxWidth follows the height cap the parent sets through
// --portrait-max-h (46dvh on phones so the portrait sits under the hero text).
const VARIANTS = {
  hero: {
    src: '/portrait/shreya-1000.webp',
    depthSrc: '/portrait/shreya-depth.png',
    width: 568,
    height: 1000,
    cols: { phone: 180, desktop: 300 },
    maxWidth: 'min(560px, calc(var(--portrait-max-h, 80dvh) * 0.568))',
    frame: '[--portrait-max-h:46dvh] md:[--portrait-max-h:80dvh]',
    // The rendered width: 0.568 of the height cap (46dvh on phones is 26.1vh, 80dvh from 768 px is 45.4vh), capped by 560 px and the column.
    sizes: '(min-width: 768px) min(560px, 46vh, 40vw), min(27vh, 100vw)',
  },
  hologram: {
    src: '/portrait/shreya2-560.webp',
    depthSrc: '/portrait/shreya2-depth.png',
    width: 562,
    height: 592,
    cols: { phone: 160, desktop: 240 },
    maxWidth: 'min(440px, calc(var(--portrait-max-h, 60dvh) * 0.949))',
    frame: '[--portrait-max-h:46dvh] md:[--portrait-max-h:60dvh]',
    sizes: '(min-width: 768px) 440px, 80vw',
  },
} as const

// Hologram chrome: a 6 px float on a 6 s loop (translate, so it composes with the pointer
// tilt on transform) and a 1 px scan line that sweeps top to bottom every 7 s.
const HOLO_CSS = `
@keyframes dp-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -6px; } }
@keyframes dp-scan { 0% { transform: translateY(-100%); } 20%, 100% { transform: translateY(100%); } }
.dp-float { animation: dp-float 6s ease-in-out infinite; transform: perspective(900px) rotateX(var(--dp-rx, 0deg)) rotateY(var(--dp-ry, 0deg)); transition: transform 240ms cubic-bezier(0.25, 1, 0.5, 1); }
.dp-scan { animation: dp-scan 7s linear infinite; }
[data-paused="true"] .dp-float, [data-paused="true"] .dp-scan { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .dp-float, .dp-scan { animation: none; transition: none; } }
`

const SESSION_KEY = 'depth-portrait:resolved'
const INTRO_MS = 1100

type Props = {
  variant?: Variant
  src?: string
  depthSrc?: string
  width?: number
  height?: number
  alt: string
  className?: string
}

export function DepthPortrait({ variant = 'hero', alt, className, ...overrides }: Props) {
  const cfg = VARIANTS[variant]
  const src = overrides.src ?? cfg.src
  const depthSrc = overrides.depthSrc ?? cfg.depthSrc
  const width = overrides.width ?? cfg.width
  const height = overrides.height ?? cfg.height
  const hologram = variant === 'hologram'

  const host = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resumeRef = useRef<() => void>(() => {})
  const pausedRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [supported, setSupported] = useState(true)
  const [paused, setPaused] = useState(false)
  const [grid, setGrid] = useState<{ cols: number; rows: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const el = host.current
    if (!canvas || !el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (reduce || nav.connection?.saveData) {
      setSupported(false)
      return
    }
    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'low-power' })
    if (!gl) {
      setSupported(false)
      return
    }
    const range = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array | null
    if (!range || range[1] < 4) {
      setSupported(false)
      return
    }

    let raf = 0
    let disposed = false
    let visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const cols = window.innerWidth < 768 ? cfg.cols.phone : cfg.cols.desktop
    const rows = Math.round((cols * height) / width)
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    // The scatter-to-portrait move plays once per session.
    let skipIntro = false
    try {
      skipIntro = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      // Storage blocked: play it every time.
    }
    const intro = { active: false, start: 0 }

    const compile = (type: number, code: string) => {
      const s = gl.createShader(type)
      if (!s) throw new Error('shader')
      gl.shaderSource(s, code)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'compile')
      return s
    }
    let prog: WebGLProgram
    try {
      const p = gl.createProgram()
      if (!p) throw new Error('program')
      gl.attachShader(p, compile(gl.VERTEX_SHADER, VERT))
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(p)
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('link')
      prog = p
    } catch {
      setSupported(false)
      return
    }
    gl.useProgram(prog)
    const uPointer = gl.getUniformLocation(prog, 'uPointer')
    const uScroll = gl.getUniformLocation(prog, 'uScroll')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uSize = gl.getUniformLocation(prog, 'uSize')
    const uResolve = gl.getUniformLocation(prog, 'uResolve')

    const upload = (unit: number, img: HTMLImageElement) => {
      const t = gl.createTexture()
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, t)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }
    const load = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image()
        img.decoding = 'async'
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = url
      })

    const resize = () => {
      canvas.width = Math.round(el.clientWidth * dpr)
      canvas.height = Math.round(el.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uSize, canvas.width / cols)
    }
    const draw = (now: number) => {
      cur.x += (target.x - cur.x) * 0.06
      cur.y += (target.y - cur.y) * 0.06
      const scroll = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)))
      let resolve = 1
      if (intro.active) {
        const t = Math.max(0, Math.min(1, (now - intro.start) / INTRO_MS))
        resolve = t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
        if (t >= 1) {
          intro.active = false
          try {
            sessionStorage.setItem(SESSION_KEY, '1')
          } catch {
            // Storage blocked: nothing to remember.
          }
        }
      }
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uPointer, cur.x, cur.y)
      gl.uniform1f(uScroll, scroll)
      gl.uniform1f(uTime, now / 1000)
      gl.uniform1f(uResolve, resolve)
      gl.drawArrays(gl.POINTS, 0, cols * rows)
    }
    const loop = () => {
      if (raf) return
      raf = requestAnimationFrame((now) => {
        raf = 0
        if (disposed) return
        draw(now)
        if (!pausedRef.current && visible && !document.hidden) loop()
      })
    }
    resumeRef.current = loop

    const ro = new ResizeObserver(() => {
      resize()
      loop()
    })
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) loop()
    })
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onVisibility = () => {
      if (!document.hidden) loop()
    }

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.disable(gl.DEPTH_TEST)
    gl.clearColor(0, 0, 0, 0)

    Promise.all([load(src), load(depthSrc)])
      .then(([color, depth]) => {
        if (disposed) return
        upload(0, color)
        upload(1, depth)
        gl.uniform1i(gl.getUniformLocation(prog, 'uColor'), 0)
        gl.uniform1i(gl.getUniformLocation(prog, 'uDepth'), 1)
        gl.uniform2f(gl.getUniformLocation(prog, 'uGrid'), cols, rows)
        resize()
        ro.observe(el)
        io.observe(el)
        if (fine) window.addEventListener('pointermove', onMove, { passive: true })
        document.addEventListener('visibilitychange', onVisibility)
        if (!skipIntro) {
          intro.active = true
          intro.start = performance.now()
        }
        setGrid({ cols, rows })
        setReady(true)
        loop()
      })
      .catch(() => setSupported(false))

    return () => {
      disposed = true
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [src, depthSrc, width, height, cfg])

  // Hologram only: tilt the wrapper up to 6 degrees from the pointer, fine pointers only.
  useEffect(() => {
    const el = host.current
    if (!hologram || !el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let rect: DOMRect | null = null
    const onEnter = () => {
      rect = el.getBoundingClientRect()
    }
    const onMove = (e: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--dp-ry', `${(x * 12).toFixed(2)}deg`)
      el.style.setProperty('--dp-rx', `${(-y * 12).toFixed(2)}deg`)
    }
    const onLeave = () => {
      rect = null
      el.style.setProperty('--dp-rx', '0deg')
      el.style.setProperty('--dp-ry', '0deg')
    }
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [hologram])

  const togglePause = () => {
    const next = !paused
    pausedRef.current = next
    setPaused(next)
    if (!next) resumeRef.current()
  }

  // Status line from real values: the grid this component allocated.
  const points = grid ? (grid.cols * grid.rows).toLocaleString('en-US') : null
  const status = !supported ? 'Static portrait' : points ? `Depth Anything V2 · ${points} points` : 'Depth Anything V2 · loading'

  return (
    <figure className={cn('mx-auto w-full', cfg.frame, className)} style={{ maxWidth: cfg.maxWidth }} data-paused={paused || undefined}>
      <div ref={host} className={cn('relative w-full', hologram && 'dp-float')} style={{ aspectRatio: `${width} / ${height}` }}>
        {/* No preload link for the portrait: the speculative preload and the img resolved different
            candidates on phones, so one download went unused. React adds a preload for every eager
            img outside a <picture>, so the wrapper opts out; the img stays eager and high priority in
            the server HTML and fetches only the candidate its own sizes resolve to. */}
        <picture className="contents">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={hologram ? 'lazy' : 'eager'}
            fetchPriority={hologram ? undefined : 'high'}
            sizes={cfg.sizes}
            className={cn('absolute inset-0 h-full w-full object-contain transition-opacity duration-700', ready && 'opacity-0')}
          />
        </picture>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          hidden={!supported}
          className={cn('absolute inset-0 h-full w-full transition-opacity duration-700', ready ? 'opacity-100' : 'opacity-0')}
        />
        {hologram && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="dp-scan absolute inset-x-0 top-0 h-full border-t border-accent opacity-[0.35]" />
          </div>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        {/* Wraps: at 320 px the hero figure is about 148 px wide, narrower than the status line. */}
        <span className="text-status min-w-0 font-mono text-sm break-words text-ink-2">{status}</span>
        {supported && ready && (
          <button
            type="button"
            onClick={togglePause}
            aria-pressed={paused}
            className="ml-auto inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-rule px-3 text-xs text-ink-2 hover:text-ink"
          >
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {paused ? 'Play motion' : 'Pause motion'}
          </button>
        )}
      </figcaption>
      {hologram && (
        <style href="depth-portrait-hologram" precedence="default">
          {HOLO_CSS}
        </style>
      )}
    </figure>
  )
}
