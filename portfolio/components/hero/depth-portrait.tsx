'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// Vertex shader: one point per grid cell. Position comes from gl_VertexID, so no
// vertex buffer is needed. Depth displaces each point toward the pointer and
// explodes the cloud outward on scroll.
const VERT = `#version 300 es
precision highp float;
uniform sampler2D uColor;
uniform sampler2D uDepth;
uniform vec2 uGrid;
uniform vec2 uPointer;
uniform float uScroll;
uniform float uTime;
uniform float uSize;
out vec2 vUv;
out float vAlpha;
out float vDepth;
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
  gl_Position = vec4(p, 0.0, 1.0);
  gl_PointSize = uSize * (0.55 + d * 0.95) * (1.0 + uScroll * 0.8);
}`

const FRAG = `#version 300 es
precision highp float;
uniform sampler2D uColor;
uniform float uScroll;
in vec2 vUv;
in float vAlpha;
in float vDepth;
out vec4 outColor;
void main() {
  if (vAlpha < 0.5) discard;
  vec2 c = gl_PointCoord - 0.5;
  if (dot(c, c) > 0.25) discard;
  vec3 col = texture(uColor, vUv).rgb;
  float a = (1.0 - uScroll * 0.85) * (0.78 + vDepth * 0.22);
  outColor = vec4(col * a, a);
}`

type Props = { src: string; depthSrc: string; width: number; height: number; alt: string }

export function DepthPortrait({ src, depthSrc, width, height, alt }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resumeRef = useRef<() => void>(() => {})
  const pausedRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [supported, setSupported] = useState(true)
  const [paused, setPaused] = useState(false)

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
    const cols = window.innerWidth < 768 ? 150 : 230
    const rows = Math.round((cols * height) / width)
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }

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
    }
    const draw = (now: number) => {
      cur.x += (target.x - cur.x) * 0.06
      cur.y += (target.y - cur.y) * 0.06
      const scroll = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)))
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uPointer, cur.x, cur.y)
      gl.uniform1f(uScroll, scroll)
      gl.uniform1f(uTime, now / 1000)
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
        gl.uniform1f(gl.getUniformLocation(prog, 'uSize'), 2.3 * dpr)
        resize()
        ro.observe(el)
        io.observe(el)
        if (fine) window.addEventListener('pointermove', onMove, { passive: true })
        document.addEventListener('visibilitychange', onVisibility)
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
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [src, depthSrc, width, height])

  const togglePause = () => {
    const next = !paused
    pausedRef.current = next
    setPaused(next)
    if (!next) resumeRef.current()
  }

  return (
    <figure className="mx-auto w-full" style={{ maxWidth: 'min(520px, calc(64dvh * 0.568))' }}>
      <div ref={host} className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          sizes="(min-width: 768px) 40vw, 90vw"
          className={cn('absolute inset-0 h-full w-full object-contain transition-opacity duration-700', ready && 'opacity-0')}
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          hidden={!supported}
          className={cn('absolute inset-0 h-full w-full transition-opacity duration-700', ready ? 'opacity-100' : 'opacity-0')}
        />
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-3 text-xs text-ink-3">
        <span>
          {supported
            ? 'Rendered live as a point cloud displaced by a Depth Anything V2 depth map of this portrait. Move the pointer or scroll.'
            : 'Shreya Boyane.'}
        </span>
        {supported && ready && (
          <button
            type="button"
            onClick={togglePause}
            aria-pressed={paused}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-rule px-3 text-xs text-ink-2 hover:text-ink"
          >
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {paused ? 'Play motion' : 'Pause motion'}
          </button>
        )}
      </figcaption>
    </figure>
  )
}
