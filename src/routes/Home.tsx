import { Link } from 'react-router-dom'
import { ENTRIES, SECTION_META, type AtlasSection } from '../lib/atlas'

const featured: { section: AtlasSection; count: string; note: string }[] = [
  { section: 'state', count: '03', note: 'Immersion, intensity, time, self' },
  { section: 'worlds', count: '02', note: 'Rooms, tunnels, landscapes, voids' },
  { section: 'entities', count: '02', note: 'Forms, presence, autonomy' },
  { section: 'encounters', count: '02', note: 'Welcome, teaching, examination' },
  { section: 'communication', count: '01', note: 'Telepathy, symbols, knowing' },
  { section: 'motifs', count: '03', note: 'Names the community gave the impossible' },
]

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-atlas">
        <div className="hero-atlas__grid" aria-hidden="true" />
        <div className="hero-atlas__orb hero-atlas__orb--one" aria-hidden="true" />
        <div className="hero-atlas__orb hero-atlas__orb--two" aria-hidden="true" />
        <div className="hero-atlas__content">
          <p className="kicker"><span className="kicker__line" /> AN INDEX OF THE REPORTED IMPOSSIBLE <span className="kicker__line" /></p>
          <h1>Somewhere<br /><em>else.</em></h1>
          <p className="hero-atlas__dek">A field guide to the worlds, entities, encounters, and recurring motifs reported in intense DMT experiences.</p>
          <div className="hero-atlas__actions"><Link to="/atlas" className="button button--bright">Enter the atlas <span>↗</span></Link><Link to="/search" className="text-link">Tune the receiver <span>⌁</span></Link></div>
        </div>
        <div className="hero-atlas__caption"><span>01</span><span>Experience first · research held close</span><span>↘</span></div>
      </section>

      <section className="intro-band content-width">
        <div className="section-number">01 <span>/</span> ORIENTATION</div>
        <div className="intro-band__copy"><h2>A map for the<br /><em>strange familiar.</em></h2><p>People return from DMT with descriptions of places that felt inhabited, agents that felt autonomous, and messages that arrived without a mouth. This atlas gathers those reports without turning them into a fixed cosmology.</p><Link to="/sources" className="text-link">How to read this atlas <span>→</span></Link></div>
        <div className="intro-band__signal"><span className="signal-ring signal-ring--a" /><span className="signal-ring signal-ring--b" /><span className="signal-ring signal-ring--c" /><strong>10.0<span>°</span></strong><small>REALITY<br />SHIFT</small></div>
      </section>

      <section className="atlas-index content-width">
        <div className="index-heading"><div><div className="section-number">02 <span>/</span> THE INDEX</div><h2>Choose a <em>door.</em></h2></div><p>Six ways into the experience.<br />No single route is canonical.</p></div>
        <div className="index-grid">{featured.map(({ section, count, note }, i) => <Link to={`/atlas?section=${section}`} className={`index-card index-card--${SECTION_META[section].color}`} key={section}><span className="index-card__count">{count}</span><span className="index-card__arrow">↗</span><div><h3>{SECTION_META[section].label}</h3><p>{note}</p></div><span className="index-card__orb" aria-hidden="true" /><span className="index-card__number">0{i + 1}</span></Link>)}</div>
      </section>

      <section className="featured-band content-width">
        <div className="section-number">03 <span>/</span> FIELD SIGNAL</div>
        <div className="featured-band__layout"><div><p className="micro-label">MOST RETURNED TO</p><h2>Apparently<br /><em>autonomous</em><br />agents</h2><p className="featured-band__copy">The presence that does not feel invented. Conscious, intelligent, surprising—sometimes kind, sometimes clinical, sometimes looking straight through you.</p><Link to="/atlas/apparently-autonomous" className="button button--outline">Read the field note <span>↗</span></Link></div><div className="featured-visual" aria-hidden="true"><div className="featured-visual__halo" /><div className="featured-visual__figure"><span /><span /><span /><span /></div><div className="featured-visual__label">AGENCY<br /><b>?</b></div></div></div>
      </section>

      <section className="home-close content-width"><p className="kicker"><span className="kicker__line" /> THE EXPERIENCE IS REAL. THE EXPLANATION IS OPEN. <span className="kicker__line" /></p><h2>Keep your<br /><em>wonder.</em></h2><Link to="/atlas" className="button button--bright">Begin wandering <span>↗</span></Link></section>
      <span className="sr-only">{ENTRIES.length} field notes are indexed.</span>
    </div>
  )
}
