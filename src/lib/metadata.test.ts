import { describe, expect, test } from 'bun:test'
import { getPageMeta } from './metadata'

describe('page metadata', () => {
  test('returns specific metadata for static routes', () => {
    expect(getPageMeta('/').title).toBe('Hyperspace — DMT Field Atlas')
    expect(getPageMeta('/search').title).toBe('Tune the Signal — Hyperspace')
    expect(getPageMeta('/atlas').canonicalPath).toBe('/atlas')
    expect(getPageMeta('/sources').canonicalPath).toBe('/sources')
  })

  test('returns a field-note metadata fallback', () => {
    const meta = getPageMeta('/atlas/apparently-autonomous')
    expect(meta.title).toBe('Field Note — Hyperspace')
    expect(meta.canonicalPath).toBe('/atlas/apparently-autonomous')
    expect(meta.description).toContain('reported DMT')
  })

  test('returns valid metadata for every atlas entry path', () => {
    for (const slug of ['immersion', 'architectural-spaces', 'machine-elves', 'waiting-room']) {
      const meta = getPageMeta(`/atlas/${slug}`)
      expect(meta.title).toBe('Field Note — Hyperspace')
      expect(meta.canonicalPath).toBe(`/atlas/${slug}`)
    }
  })

  test('falls back for unknown and invalid sphere routes', () => {
    expect(getPageMeta('/sephiroth/99').title).toBe('Signal Lost — Hyperspace')
    expect(getPageMeta('/not-a-route').canonicalPath).toBe('/')
  })
})
