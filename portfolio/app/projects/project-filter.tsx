'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import type { KindOption } from '@/components/projects/filter-bar'
import { ProjectIndex } from '@/components/projects/project-ledger'
import type { StripItem } from '@/components/projects/project-strip'

/** Keeps the kind filter in `?kind=` so a filtered view can be shared or reloaded. */
export function ProjectFilter({ items, options }: { items: StripItem[]; options: KindOption[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const requested = searchParams.get('kind')
  const active = requested && options.some((o) => o.kind === requested) ? requested : 'all'

  const select = useCallback(
    (kind: string) => {
      const href = kind === 'all' ? pathname : `${pathname}?kind=${encodeURIComponent(kind)}`
      router.replace(href, { scroll: false })
    },
    [router, pathname],
  )

  return <ProjectIndex items={items} options={options} active={active} onSelect={select} />
}
