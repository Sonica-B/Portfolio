'use client'

import { useEffect, useId, useRef } from 'react'
import Image from 'next/image'
import { ArrowUpRight, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export type WalletImage = {
  src: string
  width: number
  height: number
  /** SVG badge under /images/badges, shown whole instead of cropped like a scan. */
  badge: boolean
}

export type WalletCredential = {
  id: string
  title: string
  issuer: string
  /** "2026-02", as written in profile.json. */
  date: string
  year: string
  month: string
  image: WalletImage | null
  credentialId: string | null
  /** Public verification page when profile.json carries one; null for every entry today. */
  url: string | null
}

/** Rail cards are 72vw on a phone and 288 px from the md breakpoint up. */
const CARD_SIZES = '(min-width: 768px) 288px, 72vw'

/** First letter of the issuer, the stand-in for a logo that has not been sourced. */
export function Monogram({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'panel grid size-7 shrink-0 place-items-center font-display text-sm font-semibold text-ink-2',
        className,
      )}
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  )
}

function Media({ credential, sizes, className }: { credential: WalletCredential; sizes: string; className?: string }) {
  const { image, title, issuer } = credential
  if (!image) {
    return (
      <span className={cn('grid aspect-[16/11] w-full place-items-center', className)}>
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
      sizes={sizes}
      className={cn('aspect-[16/11] w-full', image.badge ? 'object-contain p-4' : 'object-cover object-top', className)}
    />
  )
}

/**
 * One certificate in the rail. The whole card is the target: the control stretches over the
 * list item with a pseudo-element. A verification url makes it a link, otherwise it opens the dialog.
 */
export function CredentialCard({
  credential,
  onView,
}: {
  credential: WalletCredential
  onView: (credential: WalletCredential) => void
}) {
  const { title, issuer, year, url, credentialId } = credential
  const control = cn(
    'frame-media block w-full overflow-hidden transition-[border-color,box-shadow] duration-200',
    "after:absolute after:inset-0 after:content-['']",
    'group-hover:glow group-hover:border-accent/60 focus-visible:glow focus-visible:border-accent',
  )
  return (
    <li data-card className="group relative w-[min(72vw,18rem)] shrink-0 snap-start md:w-72">
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className={control}>
          <Media credential={credential} sizes={CARD_SIZES} />
        </a>
      ) : (
        <button type="button" onClick={() => onView(credential)} className={control}>
          <Media credential={credential} sizes={CARD_SIZES} />
        </button>
      )}
      <p className="mt-3 line-clamp-2 text-base leading-snug text-ink">{title}</p>
      <p className="mt-1 flex items-baseline justify-between gap-3 text-sm text-ink-2">
        <span className="truncate">{issuer}</span>
        <span className="text-metric shrink-0">{year}</span>
      </p>
      {url ? (
        <p className="mt-1 inline-flex items-center gap-1 text-sm text-accent">
          Verify
          <ArrowUpRight size={14} aria-hidden="true" />
        </p>
      ) : credentialId ? (
        <p className="mt-1 truncate font-mono text-xs text-ink-2">Credential {credentialId}</p>
      ) : null}
    </li>
  )
}

/**
 * Native modal with the full scan. showModal() traps focus, closes on Escape and returns focus
 * to the opener; a click on the backdrop closes it too. Stays mounted so the dialog element exists.
 */
export function CredentialDialog({
  credential,
  onClose,
}: {
  credential: WalletCredential | null
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (credential && !dialog.open) dialog.showModal()
    else if (!credential && dialog.open) dialog.close()
  }, [credential])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close()
      }}
      aria-labelledby={titleId}
      className="m-auto w-[min(96vw,64rem)] max-w-none rounded-card border border-rule bg-surface p-0 text-ink backdrop:bg-black/70"
    >
      {credential && (
        <div className="max-h-[90dvh] overflow-y-auto p-4 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 id={titleId} className="text-title">
                {credential.title}
              </h3>
              <p className="mt-1 text-sm text-ink-2">
                {credential.issuer}, {credential.month}
              </p>
              {credential.credentialId ? (
                <p className="mt-1 font-mono text-xs text-ink-2">Credential {credential.credentialId}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close"
              className="press grid size-11 shrink-0 place-items-center rounded-full border border-rule text-ink-2 transition-colors hover:text-ink"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="frame-media mt-4 grid place-items-center overflow-hidden">
            {credential.image ? (
              <Image
                src={credential.image.src}
                alt={`${credential.title}, ${credential.issuer}`}
                width={credential.image.width}
                height={credential.image.height}
                sizes="(min-width: 1024px) 960px, 96vw"
                className={cn('h-auto w-full', credential.image.badge && 'max-w-[24rem] p-6')}
              />
            ) : (
              <span className="grid aspect-[16/11] w-full place-items-center">
                <Monogram name={credential.issuer} className="size-16 text-3xl" />
              </span>
            )}
          </div>
          {credential.url ? (
            <a
              href={credential.url}
              target="_blank"
              rel="noopener noreferrer"
              className="press mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-ink hover:opacity-90"
            >
              Verify
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      )}
    </dialog>
  )
}
