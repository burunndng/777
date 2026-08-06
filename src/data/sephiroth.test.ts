import { describe, expect, test } from 'bun:test'
import { sephiroth, getByNumber } from './sephiroth'
import { colorHex } from '../components/ColorSwatch'

describe('sephiroth data integrity', () => {
  test('has exactly 10 spheres, numbered 1-10 in order', () => {
    expect(sephiroth).toHaveLength(10)
    sephiroth.forEach((s, i) => {
      expect(s.number).toBe(i + 1)
    })
  })

  test('every entry has the required core fields populated', () => {
    for (const s of sephiroth) {
      expect(s.name).toBeTruthy()
      expect(s.hebrew_name).toBeTruthy()
      expect(s.planet).toBeTruthy()
      expect(s.titles).toBeTruthy()
      expect(s.divine_name).toBeTruthy()
      expect(s.archangel).toBeTruthy()
      expect(s.angelic_order).toBeTruthy()
      expect(s.symbols.length).toBeGreaterThan(0)
      expect(s.deities_figures.length).toBeGreaterThan(0)
      expect(s.why).toBeTruthy()
      expect(s.how_to_use).toBeTruthy()
    }
  })

  test('every entry has a modern_note', () => {
    for (const s of sephiroth) {
      expect(s.modern_note, `${s.name} is missing modern_note`).toBeTruthy()
    }
  })

  test('pillar and triad values are valid', () => {
    const pillars = ['Mercy', 'Severity', 'Equilibrium']
    const triads = ['Supernal', 'Ethical', 'Astral']
    for (const s of sephiroth) {
      expect(pillars).toContain(s.pillar)
      expect(triads).toContain(s.triad)
    }
  })

  test('source lines are uniform', () => {
    for (const s of sephiroth) {
      expect(s.source.primary).toBe('Liber 777, Crowley 1909')
      expect(s.source.secondary).toBe('Standard Golden Dawn attributions')
    }
  })

  test('all king/queen color names resolve in NAME_TO_HEX', () => {
    for (const s of sephiroth) {
      for (const scale of ['king', 'queen'] as const) {
        expect(
          colorHex(s.color[scale]),
          `${s.name} ${scale}: "${s.color[scale]}" unresolved`,
        ).not.toBe('#777777')
      }
    }
  })

  test('getByNumber returns the right entry and handles misses', () => {
    expect(getByNumber(1)?.name).toBe('Kether')
    expect(getByNumber(10)?.name).toBe('Malkuth')
    expect(getByNumber(0)).toBeUndefined()
    expect(getByNumber(11)).toBeUndefined()
  })
})
