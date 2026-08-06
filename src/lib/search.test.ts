import { describe, expect, test } from 'bun:test'
import { sephiroth } from '../data/sephiroth'
import { correspondenceIndex, searchCorrespondences } from './search'
import type { CorrespondenceField } from './search'

const ALL_FIELDS: CorrespondenceField[] = [
  'planet',
  'tarot',
  'symbols',
  'deities_figures',
  'divine_name',
  'archangel',
  'angelic_order',
  'color_king',
  'color_queen',
  'virtue',
  'vice',
]

describe('correspondence index integrity', () => {
  test('every indexed term resolves to a valid sphere number 1-10', () => {
    expect(correspondenceIndex.length).toBeGreaterThan(0)
    for (const e of correspondenceIndex) {
      expect(e.term.trim(), 'term must not be empty').toBeTruthy()
      expect(e.sephiraNumber, `"${e.term}" out of range`).toBeGreaterThanOrEqual(1)
      expect(e.sephiraNumber, `"${e.term}" out of range`).toBeLessThanOrEqual(10)
    }
  })

  test('each sphere contributes every in-scope field', () => {
    for (const s of sephiroth) {
      const mine = correspondenceIndex.filter((e) => e.sephiraNumber === s.number)
      for (const f of ALL_FIELDS) {
        expect(mine.some((e) => e.field === f), `${s.name} missing ${f}`).toBe(true)
      }
    }
  })
})

describe('reverse lookup behavior', () => {
  test('"the rose" surfaces both spheres listing it as a symbol', () => {
    const hit = searchCorrespondences('the rose')
      .filter((r) => r.entry.field === 'symbols')
      .map((r) => r.entry.sephiraNumber)
    expect(hit).toEqual([6, 7])
  })

  test('exact planet match ranks first', () => {
    const r = searchCorrespondences('mars')
    expect(r[0].entry.field).toBe('planet')
    expect(r[0].entry.sephiraNumber).toBe(5)
  })

  test('fully matched tokens outrank partial matches within a tier', () => {
    const r = searchCorrespondences('four aces')
    expect(r[0].entry.field).toBe('tarot')
    expect(r[0].entry.sephiraNumber).toBe(1)
  })

  test('typos on proper nouns are tolerated', () => {
    const r = searchCorrespondences('raphal')
    expect(r[0].entry.term).toBe('Raphael')
    const s = searchCorrespondences('sandalfon')
    expect(s[0].entry.term).toBe('Sandalphon')
  })

  test('strict virtue/vice fields reject looser typos', () => {
    expect(
      searchCorrespondences('pried').some((r) => r.entry.field === 'vice'),
    ).toBe(false)
    const r = searchCorrespondences('prde')
    expect(
      r.some((x) => x.entry.field === 'vice' && x.entry.sephiraNumber === 6),
    ).toBe(true)
  })

  test('colors and virtues resolve to their spheres', () => {
    const c = searchCorrespondences('crimson')
    expect(c[0].entry.field).toBe('color_queen')
    expect(c[0].entry.sephiraNumber).toBe(3)
    const v = searchCorrespondences('courage')
    expect(v[0].entry.field).toBe('virtue')
    expect(v[0].entry.sephiraNumber).toBe(5)
  })
})
