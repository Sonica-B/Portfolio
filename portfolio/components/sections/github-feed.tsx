'use client'

import { useEffect, useRef, useState } from 'react'

/** One line of the feed, the only shape that reaches sessionStorage. */
type Item = { id: string; text: string; href: string; at: string }

/** The subset of a GitHub public event the feed reads. */
type GithubEvent = {
  id: string
  type: string
  created_at: string
  repo: { name: string }
  payload: {
    ref?: string | null
    ref_type?: string
    size?: number
    commits?: unknown[]
    action?: string
    number?: number
    pull_request?: { number?: number; html_url?: string }
  }
}

const TTL_MS = 60 * 60 * 1000
const PER_PAGE = 30
const UNITS: [string, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
]

// Versioned so a change to the line format never reads lines cached by an older build.
const cacheKey = (user: string) => `github:events:v2:${user}`

/** "3 days ago", "2 hours ago", "just now". */
function relative(iso: string, now: number): string {
  const seconds = Math.max(0, Math.round((now - Date.parse(iso)) / 1000))
  for (const [name, size] of UNITS) {
    const n = Math.floor(seconds / size)
    if (n >= 1) return `${n} ${name}${n === 1 ? '' : 's'} ago`
  }
  return 'just now'
}

/** A described event before consecutive pushes to one branch are merged. */
type Raw = Item & { key: string; where: string; commits: number; pushes: number }

/** Push, create and pull request events as one short line each; everything else is dropped. */
function describe(e: GithubEvent): Raw | null {
  const full = e.repo.name
  const repo = full.split('/')[1] ?? full
  const base = `https://github.com/${full}`
  switch (e.type) {
    case 'PushEvent': {
      const commits = e.payload.size ?? e.payload.commits?.length ?? 0
      const branch = (e.payload.ref ?? '').replace(/^refs\/heads\//, '')
      const where = branch && branch !== 'main' && branch !== 'master' ? `${repo} (${branch})` : repo
      return {
        id: e.id,
        key: `push:${full}:${branch}`,
        where,
        commits,
        pushes: 1,
        text: '',
        href: branch ? `${base}/commits/${branch}` : base,
        at: e.created_at,
      }
    }
    case 'CreateEvent': {
      const kind = e.payload.ref_type ?? 'repository'
      const text = kind === 'repository' ? `Created repository ${repo}` : `Created ${kind} ${e.payload.ref ?? ''} in ${repo}`.replace(/\s+/g, ' ')
      return { id: e.id, key: `create:${e.id}`, where: repo, commits: 0, pushes: 0, text, href: base, at: e.created_at }
    }
    case 'PullRequestEvent': {
      const pr = e.payload.pull_request
      const number = pr?.number ?? e.payload.number
      const action = e.payload.action ?? 'updated'
      const text = `${action.charAt(0).toUpperCase()}${action.slice(1)} pull request${number ? ` #${number}` : ''} in ${repo}`
      return { id: e.id, key: `pr:${e.id}`, where: repo, commits: 0, pushes: 0, text, href: pr?.html_url ?? `${base}/pulls`, at: e.created_at }
    }
    default:
      return null
  }
}

/** "Pushed 12 commits to X", "Pushed 4 times to X", "Pushed to X": the count depends on what the API reports. */
function pushText(r: Raw): string {
  if (r.commits > 0) return `Pushed ${r.commits} ${r.commits === 1 ? 'commit' : 'commits'} to ${r.where}`
  if (r.pushes > 1) return `Pushed ${r.pushes} times to ${r.where}`
  return `Pushed to ${r.where}`
}

/** Merges consecutive pushes to the same branch into one line (newest first, so the merged line keeps the latest time). */
function collapse(raws: Raw[]): Item[] {
  const merged: Raw[] = []
  for (const r of raws) {
    const prev = merged[merged.length - 1]
    if (prev && prev.pushes > 0 && prev.key === r.key) {
      prev.pushes += r.pushes
      prev.commits += r.commits
      continue
    }
    merged.push({ ...r })
  }
  return merged.map((r) => ({ id: r.id, text: r.pushes > 0 ? pushText(r) : r.text, href: r.href, at: r.at }))
}

function readCache(key: string): Item[] | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { at?: number; items?: Item[] }
    if (typeof parsed.at !== 'number' || !Array.isArray(parsed.items) || Date.now() - parsed.at > TTL_MS) return null
    return parsed.items
  } catch {
    return null
  }
}

function writeCache(key: string, items: Item[]) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), items }))
  } catch {
    // Storage blocked or full: the next visit fetches again.
  }
}

/**
 * Latest public GitHub events, fetched once the panel comes near the viewport and cached in
 * sessionStorage for an hour. Renders nothing until lines exist, and stays silent on any
 * failure (offline, rate limit, blocked storage) so the build-time snapshot above it stands
 * alone. The height is reserved, so there is no skeleton and nothing below moves.
 */
export function GithubFeed({ user, max = 5 }: { user: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<Item[] | null>(null)
  const [now, setNow] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || !user) return
    let cancelled = false
    const key = cacheKey(user)

    const load = async () => {
      const cached = readCache(key)
      if (cached && cached.length > 0) {
        if (!cancelled) {
          setItems(cached.slice(0, max))
          setNow(Date.now())
        }
        return
      }
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/events/public?per_page=${PER_PAGE}`, {
          headers: { Accept: 'application/vnd.github+json' },
        })
        if (!res.ok) return
        const events = (await res.json()) as GithubEvent[]
        if (!Array.isArray(events)) return
        const lines = collapse(events.map(describe).filter((it): it is Raw => it !== null))
        if (cancelled || lines.length === 0) return
        writeCache(key, lines)
        setItems(lines.slice(0, max))
        setNow(Date.now())
      } catch {
        // Silent by design: the snapshot remains.
      }
    }

    if (typeof IntersectionObserver === 'undefined') {
      void load()
      return () => {
        cancelled = true
      }
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          void load()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [user, max])

  return (
    <div ref={ref} className="mt-4 min-h-[9.5rem]" aria-live="polite">
      {items ? (
        <>
          <p className="text-status">Latest public activity</p>
          <ul className="mt-1">
            {items.map((it) => (
              <li key={it.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2">
                <a href={it.href} target="_blank" rel="noopener noreferrer" className="min-w-0 text-ink transition-colors hover:text-accent">
                  {it.text}
                </a>
                <time dateTime={it.at} className="text-status shrink-0">
                  {relative(it.at, now)}
                </time>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}
