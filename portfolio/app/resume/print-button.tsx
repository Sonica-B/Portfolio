'use client'

import { Printer } from '@phosphor-icons/react'

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="press inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-rule-strong px-5 text-sm font-medium whitespace-nowrap text-ink transition-[background-color] duration-200 hover:bg-surface-raised"
    >
      <Printer size={16} aria-hidden="true" />
      Print
    </button>
  )
}
