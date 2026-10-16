/**
 * WebGL2 program for the depth-portrait point cloud, shared by the worker (point-cloud.worker.ts,
 * drawing into an OffscreenCanvas) and the main-thread fallback (point-cloud.ts). No DOM access here.
 */

// Vertex shader: one point per grid cell. Position comes from gl_VertexID, so no
// vertex buffer is needed. Depth displaces each point toward the pointer and explodes
// the cloud outward on scroll. uResolve runs the opening move: 0 is fully scattered
// (hashed offsets up to 0.6 of the frame), 1 is the settled portrait. Textures are stored
// top row first, so the lookup flips v (row 0 is the bottom of the frame).
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
  vec2 tuv = vec2(uv.x, 1.0 - uv.y);
  vec4 c = texture(uColor, tuv);
  float d = texture(uDepth, tuv).r;
  vUv = tuv;
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

export const CONTEXT_OPTIONS: WebGLContextAttributes = {
  alpha: true,
  antialias: false,
  premultipliedAlpha: true,
  powerPreference: 'low-power',
}

/** Duration of the scatter-to-portrait opening move. */
export const INTRO_MS = 1100

/** 0 to 1 over INTRO_MS with an exponential ease out; 1 once done. */
export function introResolve(elapsed: number): number {
  const t = Math.max(0, Math.min(1, elapsed / INTRO_MS))
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/** Grid for the viewport: a lighter cloud on phones. */
export function gridFor(viewportWidth: number, cols: { phone: number; desktop: number }, width: number, height: number) {
  const c = viewportWidth < 768 ? cols.phone : cols.desktop
  return { cols: c, rows: Math.round((c * height) / width) }
}

export type FrameState = { pointerX: number; pointerY: number; scroll: number; time: number; resolve: number }

export type PointCloudGL = {
  /** Uploads the colour (unit 0) or depth (unit 1) image, top row first. */
  upload: (unit: 0 | 1, source: TexImageSource) => void
  /** Sets the drawing buffer size in device pixels. */
  resize: (width: number, height: number) => void
  draw: (frame: FrameState) => void
}

/** Compiles the program and sets static state, or returns null (no point sprites large enough, a shader failure). */
export function createPointCloudGL(gl: WebGL2RenderingContext, grid: { cols: number; rows: number }): PointCloudGL | null {
  const range = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array | null
  if (!range || range[1] < 4) return null

  const compile = (type: number, code: string) => {
    const s = gl.createShader(type)
    if (!s) return null
    gl.shaderSource(s, code)
    gl.compileShader(s)
    return s
  }
  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  const prog = gl.createProgram()
  if (!vs || !fs || !prog) return null
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null
  gl.useProgram(prog)

  const uPointer = gl.getUniformLocation(prog, 'uPointer')
  const uScroll = gl.getUniformLocation(prog, 'uScroll')
  const uTime = gl.getUniformLocation(prog, 'uTime')
  const uSize = gl.getUniformLocation(prog, 'uSize')
  const uResolve = gl.getUniformLocation(prog, 'uResolve')
  gl.uniform1i(gl.getUniformLocation(prog, 'uColor'), 0)
  gl.uniform1i(gl.getUniformLocation(prog, 'uDepth'), 1)
  gl.uniform2f(gl.getUniformLocation(prog, 'uGrid'), grid.cols, grid.rows)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.disable(gl.DEPTH_TEST)
  gl.clearColor(0, 0, 0, 0)

  return {
    upload: (unit, source) => {
      const t = gl.createTexture()
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, t)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    },
    resize: (width, height) => {
      gl.viewport(0, 0, width, height)
      gl.uniform1f(uSize, width / grid.cols)
    },
    draw: ({ pointerX, pointerY, scroll, time, resolve }) => {
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uPointer, pointerX, pointerY)
      gl.uniform1f(uScroll, scroll)
      gl.uniform1f(uTime, time)
      gl.uniform1f(uResolve, resolve)
      gl.drawArrays(gl.POINTS, 0, grid.cols * grid.rows)
    },
  }
}
