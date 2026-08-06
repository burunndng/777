import { sephiroth } from '../data/sephiroth'
import type { Sephira } from './types'

export type CorrespondenceField =
  | 'planet'
  | 'tarot'
  | 'symbols'
  | 'deities_figures'
  | 'divine_name'
  | 'archangel'
  | 'angelic_order'
  | 'color_king'
  | 'color_queen'
  | 'virtue'
  | 'vice'

export interface CorrespondenceEntry {
  term: string
  field: CorrespondenceField
  sephiraNumber: number
}

export interface SearchResult {
  entry: CorrespondenceEntry
  score: number
  matchedTokens: number
}

export const FIELD_LABELS: Record<CorrespondenceField, string> = {
  planet: 'Planet',
  tarot: 'Tarot',
  symbols: 'Symbols',
  deities_figures: 'Deities & Figures',
  divine_name: 'Divine Name',
  archangel: 'Archangel',
  angelic_order: 'Angelic Order',
  color_king: 'Color (King)',
  color_queen: 'Color (Queen)',
  virtue: 'Virtue',
  vice: 'Vice',
}

export const MIN_QUERY_LENGTH = 2

const SCALAR_FIELDS: ReadonlyArray<{
  field: CorrespondenceField
  pick: (s: Sephira) => string
}> = [
  { field: 'planet', pick: (s) => s.planet },
  { field: 'tarot', pick: (s) => s.tarot },
  { field: 'divine_name', pick: (s) => s.divine_name },
  { field: 'archangel', pick: (s) => s.archangel },
  { field: 'angelic_order', pick: (s) => s.angelic_order },
  { field: 'color_king', pick: (s) => s.color.king },
  { field: 'color_queen', pick: (s) => s.color.queen },
  { field: 'virtue', pick: (s) => s.virtue },
  { field: 'vice', pick: (s) => s.vice },
]

const ARRAY_FIELDS: ReadonlyArray<{
  field: CorrespondenceField
  pick: (s: Sephira) => string[]
}> = [
  { field: 'symbols', pick: (s) => s.symbols },
  { field: 'deities_figures', pick: (s) => s.deities_figures },
]

// Ranking tiers and fuzzy tolerances are a tunable starting point, not a
// fixed spec — revisit once real queries are tested against this ordering.
const FIELD_TIER: Record<CorrespondenceField, number> = {
  tarot: 0,
  planet: 0,
  divine_name: 0,
  symbols: 1,
  deities_figures: 1,
  archangel: 1,
  angelic_order: 1,
  color_king: 2,
  color_queen: 2,
  virtue: 3,
  vice: 3,
}

// Fuzzy tolerance as a ratio of edit distance to the longer token. Strict
// fields (virtue/vice) accept fewer typos: short abstract words like "order"
// or "pride" are too easy to false-positive across spheres.
const STRICT_RATIO = 0.25
const LOOSE_RATIO = 0.35

// Query-level stopwords, so "the rose" doesn't also surface every "the …"
// term in the index.
const STOPWORDS = new Set([
  'the',
  'a',
  'an',
  'of',
  'and',
  'or',
  'in',
  'on',
  'at',
  'to',
  'for',
  'with',
  'by',
  'from',
])

export const correspondenceIndex: CorrespondenceEntry[] = sephiroth.flatMap((s) => {
  const scalars = SCALAR_FIELDS.flatMap(({ field, pick }) => {
    const value = pick(s).trim()
    return value === ''
      ? []
      : [{ term: value, field, sephiraNumber: s.number }]
  })
  const arrays = ARRAY_FIELDS.flatMap(({ field, pick }) =>
    pick(s)
      .filter((v) => v.trim() !== '')
      .map((v) => ({ term: v, field, sephiraNumber: s.number })),
  )
  return [...scalars, ...arrays]
})

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(s: string): string[] {
  return normalize(s)
    .split(' ')
    .filter((t) => t !== '' && !STOPWORDS.has(t))
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const row: number[] = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    let diag = row[0]
    row[0] = i
    for (let j = 1; j <= n; j++) {
      const tmp = row[j]
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        diag + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
      diag = tmp
    }
  }
  return row[n]
}

// Lower score is better: 0 exact token, 0.25 substring, 0.5+ fuzzy ratio.
function scoreEntry(
  qTokens: string[],
  entry: CorrespondenceEntry,
): SearchResult | null {
  const tTokens = tokenize(entry.term)
  if (tTokens.length === 0) return null
  const ratioCap =
    entry.field === 'virtue' || entry.field === 'vice'
      ? STRICT_RATIO
      : LOOSE_RATIO
  let best = Infinity
  let matched = 0
  for (const qt of qTokens) {
    let bestForToken: number | null = null
    for (const tt of tTokens) {
      if (qt === tt) {
        bestForToken = 0
        break
      }
      if (qt.length >= 2 && tt.includes(qt)) {
        bestForToken = Math.min(bestForToken ?? Infinity, 0.25)
        continue
      }
      if (qt.length >= 3) {
        const d = levenshtein(qt, tt)
        const ratio = d / Math.max(qt.length, tt.length)
        if (d > 0 && ratio <= ratioCap) {
          bestForToken = Math.min(bestForToken ?? Infinity, 0.5 + ratio)
        }
      }
    }
    if (bestForToken !== null) {
      matched += 1
      best = Math.min(best, bestForToken)
    }
  }
  return Number.isFinite(best)
    ? { entry, score: best, matchedTokens: matched }
    : null
}

function compareMatches(a: SearchResult, b: SearchResult): number {
  const tierDiff = FIELD_TIER[a.entry.field] - FIELD_TIER[b.entry.field]
  if (tierDiff !== 0) return tierDiff
  if (a.score !== b.score) return a.score - b.score
  if (a.matchedTokens !== b.matchedTokens) return b.matchedTokens - a.matchedTokens
  if (a.entry.sephiraNumber !== b.entry.sephiraNumber) {
    return a.entry.sephiraNumber - b.entry.sephiraNumber
  }
  return a.entry.term.localeCompare(b.entry.term)
}

export function searchCorrespondences(query: string): SearchResult[] {
  const qTokens = tokenize(query)
  if (qTokens.length === 0) return []
  const matches: SearchResult[] = []
  for (const entry of correspondenceIndex) {
    const m = scoreEntry(qTokens, entry)
    if (m) matches.push(m)
  }
  return matches.sort(compareMatches)
}
