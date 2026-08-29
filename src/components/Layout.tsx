import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, type ReactNode } from 'react'
import { applyPageMeta, getPageMeta } from '../lib/metadata'

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    applyPageMeta(getPageMeta(location.pathname))
  }, [location.pathname])

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `atlas-nav__link ${isActive ? 'is-active' : ''}`

  return (
    <div className="atlas-app">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:border focus:border-gilt focus:bg-bg focus:px-3 focus:py-1.5 focus:text-xs focus:text-ink"
      >
        Skip to content
      </a>
      <header className="atlas-header">
        <div className="atlas-header__inner">
          <Link to="/" className="atlas-mark" aria-label="DMT Hyperspace Atlas home">
            <span className="atlas-mark__glyph" aria-hidden="true">✦</span>
            <span><strong>HYPERSPACE</strong><small>DMT FIELD ATLAS</small></span>
          </Link>
          <nav aria-label="Primary" className="atlas-nav">
            <NavLink to="/atlas" className={navClass}>Explore</NavLink>
            <NavLink to="/search" className={navClass}>
              Search
            </NavLink>
            <NavLink to="/sources" className={navClass}>Field notes</NavLink>
          </nav>
          <span className="signal-chip"><span className="signal-chip__dot" /> LIVE INDEX</span>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="atlas-footer">
        <div className="atlas-footer__inner">
          <div><span className="footer-sigil">✦</span><p>Built for the curious.<br />Held to the evidence.</p></div>
          <div className="footer-links"><Link to="/sources">Sources &amp; method</Link><a href="https://doi.org/10.1177/0269881120916143" target="_blank" rel="noreferrer">Research index ↗</a></div>
          <p className="footer-copyright">A living index of reported DMT phenomenology<br />and the language that grew around it.</p>
        </div>
      </footer>
    </div>
  )
}
