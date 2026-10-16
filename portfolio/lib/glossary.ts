import raw from '@/content/glossary.json'

/**
 * Glossary matcher. Server-safe, no React.
 *
 * - `glossary`: the entries from content/glossary.json with a derived URL-safe `id`.
 * - `getTerm(id)`: one entry by id.
 * - `segment(text, seen?)`: splits a sentence into plain runs and matched terms. Only the
 *   first occurrence of each term is marked per call; pass one `seen` Set to several calls
 *   so a page or section marks each term once across paragraphs (create the Set per render).
 *
 * Matching rules (see docs/research/glossary-notes.md):
 * - longest match string wins ("latent chain-of-thought" before "chain-of-thought");
 * - a match string is case-sensitive when it is all caps or contains a digit (MATH, ATE,
 *   OPT, CLIP, RAG, INT8, F-1) and case-insensitive otherwise;
 * - boundaries are "not a word character or hyphen" on both sides, so "CI/CD" and "F-1"
 *   match as units, "rag" never matches inside another word, and "Transformer-based"
 *   does not trigger "Transformer".
 */

export type GlossaryEntry = {
  /** URL-safe id derived from the term, for example "p95-latency". */
  id: string
  term: string
  match: string[]
  tip: string
  source: string | null
}

export type Segment = { text: string } | { term: GlossaryEntry; text: string }

type RawEntry = { term: string; match: string[]; tip: string; source: string | null }

/** "p95 latency" -> "p95-latency", "CI/CD" -> "ci-cd". */
export function termId(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const seenIds = new Set<string>()
export const glossary: GlossaryEntry[] = (raw as RawEntry[]).map((entry) => {
  let id = termId(entry.term)
  for (let n = 2; seenIds.has(id); n++) id = `${termId(entry.term)}-${n}`
  seenIds.add(id)
  return { id, ...entry }
})

const byId = new Map(glossary.map((entry) => [entry.id, entry]))

export function getTerm(id: string): GlossaryEntry | undefined {
  return byId.get(id)
}

/** All caps or containing a digit: an acronym, a model name or a version, matched exactly. */
export function isCaseSensitive(match: string): boolean {
  return /\d/.test(match) || !/[a-z]/.test(match)
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')

/** One regex source for a match string; case-insensitive strings expand each letter to [xX]. */
function toPattern(match: string): string {
  if (isCaseSensitive(match)) return escapeRegex(match)
  let out = ''
  for (const ch of match) {
    const lower = ch.toLowerCase()
    const upper = ch.toUpperCase()
    out += lower !== upper && lower.length === 1 && upper.length === 1 ? `[${lower}${upper}]` : escapeRegex(ch)
  }
  return out
}

type Candidate = { match: string; entry: GlossaryEntry }

const candidates: Candidate[] = glossary
  .flatMap((entry) => entry.match.map((match) => ({ match, entry })))
  .sort((a, b) => b.match.length - a.match.length)

/** Exact text for case-sensitive strings, lowercased text for the rest. */
const lookup = new Map<string, GlossaryEntry>()
for (const { match, entry } of candidates) {
  const key = isCaseSensitive(match) ? match : match.toLowerCase()
  if (!lookup.has(key)) lookup.set(key, entry)
}

const BOUNDARY_BEFORE = '(?<![\\w-])'
const BOUNDARY_AFTER = '(?![\\w-])'

const matcher = new RegExp(
  `${BOUNDARY_BEFORE}(?:${candidates.map((c) => toPattern(c.match)).join('|')})${BOUNDARY_AFTER}`,
  'g',
)

function entryFor(found: string): GlossaryEntry | undefined {
  return lookup.get(found) ?? lookup.get(found.toLowerCase())
}

/**
 * Split `text` into runs. Matched terms not yet in `seen` become `{ term, text }` segments
 * and are added to `seen`; everything else stays plain text. Returns `[{ text }]` when
 * nothing matches, so callers can render the result unconditionally.
 */
export function segment(text: string, seen: Set<string> = new Set()): Segment[] {
  const out: Segment[] = []
  let last = 0
  matcher.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = matcher.exec(text)) !== null) {
    const found = m[0]
    const entry = entryFor(found)
    if (!entry || seen.has(entry.id)) {
      // Already explained: keep scanning from the next character so a shorter term
      // inside this one ("chain-of-thought" in "latent chain-of-thought") can still match.
      matcher.lastIndex = m.index + 1
      continue
    }
    seen.add(entry.id)
    if (m.index > last) out.push({ text: text.slice(last, m.index) })
    out.push({ term: entry, text: found })
    last = m.index + found.length
  }
  if (last < text.length || out.length === 0) out.push({ text: text.slice(last) })
  return out
}
