/**
 * Sentence and paragraph helpers for the About page. Server-safe, no React.
 *
 * - `sentences(text)`: splits on a terminal mark followed by a capital, keeping "M.S." and "Dr." intact.
 * - `paragraphs(text, target, max)`: packs the sentences into `target` contiguous paragraphs with the
 *   lightest possible heaviest paragraph, adding paragraphs only when one would exceed `max` words.
 * - `lead(text, max)`: the opening sentences up to `max` words and the rest, for a "Read more" disclosure.
 */

/** A terminal mark after a lowercase letter, digit or closing bracket, then space, then a capital or an opening quote. */
const BOUNDARY = /(?<=[a-z0-9)][.!?])\s+(?=[A-Z"“])/

export function sentences(text: string): string[] {
  return text
    .split(BOUNDARY)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)

/** Cut positions that split `weights` into `k` contiguous groups while minimising the heaviest group. */
function bestCuts(weights: number[], k: number): { cuts: number[]; max: number } {
  const n = weights.length
  let best = { cuts: [] as number[], max: Infinity }
  const walk = (start: number, remaining: number, cuts: number[], heaviest: number) => {
    if (remaining === 1) {
      const m = Math.max(heaviest, sum(weights.slice(start)))
      if (m < best.max) best = { cuts, max: m }
      return
    }
    for (let end = start + 1; end <= n - (remaining - 1); end++) {
      const m = Math.max(heaviest, sum(weights.slice(start, end)))
      // Groups only get heavier as `end` grows, so nothing beyond this point can beat the best.
      if (m >= best.max) break
      walk(end, remaining - 1, [...cuts, end], m)
    }
  }
  walk(0, k, [], 0)
  return best
}

function group(items: string[], cuts: number[]): string[] {
  const out: string[] = []
  let start = 0
  for (const cut of [...cuts, items.length]) {
    out.push(items.slice(start, cut).join(' '))
    start = cut
  }
  return out
}

export function paragraphs(text: string, target = 3, max = 60): string[] {
  const s = sentences(text)
  if (s.length === 0) return []
  const weights = s.map(wordCount)
  for (let k = Math.min(target, s.length); k <= s.length; k++) {
    const best = bestCuts(weights, k)
    if (best.max <= max || k === s.length) return group(s, best.cuts)
  }
  return s
}

/**
 * The opening sentences that fit in `max` words, and the remainder (null when everything fits).
 * A first sentence longer than `max` is cut at the word boundary instead.
 */
export function lead(text: string, max = 60): { lead: string; rest: string | null } {
  if (wordCount(text) <= max) return { lead: text, rest: null }
  const s = sentences(text)
  const head: string[] = []
  let count = 0
  for (const sentence of s) {
    const w = wordCount(sentence)
    if (count + w > max) break
    head.push(sentence)
    count += w
  }
  if (head.length === 0) {
    const words = text.split(/\s+/).filter(Boolean)
    return { lead: words.slice(0, max).join(' '), rest: words.slice(max).join(' ') }
  }
  const rest = s.slice(head.length).join(' ')
  return { lead: head.join(' '), rest: rest || null }
}
