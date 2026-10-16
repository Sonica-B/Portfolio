'use client'

import Image from 'next/image'
import type { CSSProperties, RefObject } from 'react'
import { cn } from '@/lib/utils'
import { Monogram, type WalletCredential } from './credential-card'

/** Each pass behind the top one peeks out by this much, like cards in a wallet. */
const OFFSET = 12
const SCALE_STEP = 0.05

function Pass({ credential }: { credential: WalletCredential }) {
  const { image, title, issuer } = credential
  if (!image) {
    return (
      <span className="grid h-full w-full place-items-center">
        <Monogram name={issuer} className="size-12 text-xl" />
        <span className="sr-only">
          {title}, {issuer}
        </span>
      </span>
    )
  }
  return (
    <Image
      src={image.src}
      alt={`${title}, ${issuer}`}
      width={image.width}
      height={image.height}
      loading="lazy"
      sizes="(min-width: 768px) 30vw, 100vw"
      className={cn('h-full w-full', image.badge ? 'object-contain p-3' : 'object-cover object-top')}
    />
  )
}

/**
 * The collapsed wallet: the three most recent scans stacked with 12 px offsets and a slight
 * scale step. Only the top pass is interactive; the two behind are inert and hidden from
 * assistive tech. From md up the stack scales down while a rail is open.
 */
export function PassStack({
  passes,
  open,
  status,
  stackRef,
  onView,
}: {
  passes: WalletCredential[]
  open: boolean
  /** Mono status line under the stack, for example "31 credentials, 2018 to 2026". */
  status: string
  stackRef: RefObject<HTMLUListElement | null>
  onView: (credential: WalletCredential) => void
}) {
  const frame = 'frame-media h-full w-full overflow-hidden'
  return (
    <div className="min-w-0">
      <div
        data-open={open ? 'true' : 'false'}
        className="origin-top-left pt-6 transition-transform duration-[240ms] ease-[var(--ease-out-quart)] md:data-[open=true]:scale-[0.82]"
      >
        <ul ref={stackRef} className="grid aspect-[16/7] min-h-0">
          {passes.map((credential, i) => {
            const style: CSSProperties = {
              translate: `0 ${-OFFSET * i}px`,
              scale: String(1 - SCALE_STEP * i),
              zIndex: 10 - i,
            }
            return (
              <li
                key={credential.id}
                style={style}
                className="min-h-0 origin-top overflow-hidden [grid-area:1/1]"
                aria-hidden={i > 0 ? 'true' : undefined}
                inert={i > 0}
              >
                {i === 0 ? (
                  <button
                    type="button"
                    onClick={() => onView(credential)}
                    className={cn(
                      frame,
                      'block transition-[border-color,box-shadow] duration-200 hover:glow hover:border-accent/60 focus-visible:glow focus-visible:border-accent',
                    )}
                  >
                    <Pass credential={credential} />
                  </button>
                ) : (
                  <div className={frame}>
                    <Pass credential={credential} />
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <p className="text-status mt-3">{status}</p>
    </div>
  )
}
