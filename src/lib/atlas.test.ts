import { describe, expect, test } from 'bun:test'
import { ENTRIES, SECTION_META, SOURCES, searchAtlas } from './atlas'

describe('hyperspace atlas data', () => {
  test('keeps every section represented and every entry source-backed', () => {
    for (const section of Object.keys(SECTION_META)) {
      expect(ENTRIES.some((entry) => entry.section === section)).toBe(true)
    }
    for (const entry of ENTRIES) {
      expect(entry.title).toBeTruthy()
      expect(entry.dek).toBeTruthy()
      expect(entry.evidence.length).toBeGreaterThan(0)
      expect(entry.sourceIds.every((id) => SOURCES.some((source) => source.id === id))).toBe(true)
    }
  })

  test('searches tags, community language, and body copy', () => {
    expect(searchAtlas('mantis').map((entry) => entry.slug)).toEqual(['examination-and-treatment'])
    expect(searchAtlas('insectoid').map((entry) => entry.slug)).toContain('morphology')
    expect(searchAtlas('waiting room').map((entry) => entry.slug)).toContain('waiting-room')
    expect(searchAtlas('telepathy').map((entry) => entry.slug)).toContain('telepathy-and-direct-knowing')
  })
})
