import { ImageResponse } from 'next/og'
import { profile, SITE_URL } from '@/lib/content'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

export type OgMetric = { value: string; label: string }
export type OgProps = {
  title: string
  subtitle?: string
  metrics?: OgMetric[]
  kicker?: string
}

// Hex twins of the tokens in globals.css: next/og renders outside the CSS cascade.
const SURFACE = '#03080f'
const INK = '#f2f6f7'
const INK_2 = '#9fa6aa'
const INK_3 = '#788288'
const RULE = '#1f2730'
const RULE_STRONG = '#404f5d'
const ACCENT = '#5de8f6'

const HOST = SITE_URL.replace(/^https?:\/\//, '')

function titleSize(title: string) {
  if (title.length > 56) return 54
  if (title.length > 36) return 64
  if (title.length > 20) return 80
  return 96
}

/**
 * One corner bracket of the HUD frame, 2 px so it survives preview downscaling.
 * Satori reads the style object directly (no ReactDOM), so only set the keys that apply:
 * an undefined border value crashes its shorthand parser.
 */
function Bracket({ top, left }: { top: boolean; left: boolean }) {
  const edge = `2px solid ${RULE_STRONG}`
  const style: Record<string, string | number> = { position: 'absolute', width: 28, height: 28 }
  style[top ? 'top' : 'bottom'] = 24
  style[left ? 'left' : 'right'] = 24
  style[top ? 'borderTop' : 'borderBottom'] = edge
  style[left ? 'borderLeft' : 'borderRight'] = edge
  return <div style={style as React.CSSProperties} />
}

/** Shared 1200x630 Open Graph card: ink-blue ground, cyan rule, corner brackets, title, subtitle, up to three metrics. */
export function renderOg({ title, subtitle, metrics = [], kicker }: OgProps) {
  const shown = metrics.slice(0, 3)
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: SURFACE,
          color: INK,
          padding: '56px 64px',
          fontFamily: 'Geist, sans-serif',
        }}
      >
        <Bracket top left />
        <Bracket top left={false} />
        <Bracket top={false} left />
        <Bracket top={false} left={false} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 6, background: ACCENT }} />
          {kicker ? (
            <div style={{ fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', color: ACCENT }}>{kicker}</div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 36,
            fontSize: titleSize(title),
            lineHeight: 1.04,
            letterSpacing: -2,
            color: INK,
          }}
        >
          {title}
        </div>

        {subtitle ? (
          <div style={{ display: 'flex', marginTop: 20, maxWidth: 1000, fontSize: 28, lineHeight: 1.35, color: INK_2 }}>
            {subtitle}
          </div>
        ) : null}

        <div style={{ display: 'flex', flexGrow: 1 }} />

        {shown.length > 0 ? (
          <div style={{ display: 'flex', gap: 56, alignItems: 'flex-end' }}>
            {shown.map((m) => (
              <div key={m.label} style={{ display: 'flex', flexDirection: 'column', maxWidth: 320 }}>
                <div style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: -1, color: ACCENT }}>{m.value}</div>
                <div style={{ marginTop: 8, fontSize: 20, lineHeight: 1.3, color: INK_2 }}>{m.label}</div>
              </div>
            ))}
          </div>
        ) : null}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 36,
            paddingTop: 24,
            borderTop: `1px solid ${RULE}`,
            fontSize: 22,
            color: INK_3,
          }}
        >
          <div>{HOST}</div>
          <div>{profile.identity.name}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
