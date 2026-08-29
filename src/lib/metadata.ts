export interface PageMeta {
  title: string
  description: string
  canonicalPath: string
}

const BASE_DESCRIPTION = 'A psychonaut-first field atlas of reported DMT worlds, entities, encounters, and recurring motifs.'

const STATIC_PAGES: Record<string, PageMeta> = {
  '/': { title: 'Hyperspace — DMT Field Atlas', description: BASE_DESCRIPTION, canonicalPath: '/' },
  '/atlas': { title: 'Explore the Atlas — Hyperspace', description: 'Explore field notes on DMT states, reported worlds, entities, encounters, communication, and community motifs.', canonicalPath: '/atlas' },
  '/search': { title: 'Tune the Signal — Hyperspace', description: 'Search the language of reported DMT experiences: places, presences, behaviors, and motifs.', canonicalPath: '/search' },
  '/sources': { title: 'Field Notes & Sources — Hyperspace', description: 'Learn how the Hyperspace DMT field atlas separates research findings from community vocabulary.', canonicalPath: '/sources' },
}

export function getPageMeta(pathname: string): PageMeta {
  if (STATIC_PAGES[pathname]) return STATIC_PAGES[pathname]
  if (pathname.startsWith('/atlas/')) return { title: 'Field Note — Hyperspace', description: BASE_DESCRIPTION, canonicalPath: pathname }
  return { title: 'Signal Lost — Hyperspace', description: BASE_DESCRIPTION, canonicalPath: '/' }
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = content
}

export function applyPageMeta(meta: PageMeta): void {
  document.title = meta.title
  setMeta('meta[name="description"]', 'name', 'description', meta.description)
  setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
  setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description)
  const canonicalUrl = new URL(meta.canonicalPath, window.location.origin).href
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.append(canonical)
  }
  canonical.href = canonicalUrl
}
