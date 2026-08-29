import { Link, useSearchParams } from 'react-router-dom'
import { ENTRIES, SECTION_META, type AtlasSection } from '../lib/atlas'

export default function Atlas() {
  const [params] = useSearchParams()
  const selected = params.get('section') as AtlasSection | null
  const visible = selected && SECTION_META[selected]
    ? ENTRIES.filter((entry) => entry.section === selected)
    : ENTRIES

  return (
    <div className="atlas-page content-width">
      <div className="page-hero">
        <div><p className="section-number">02 <span>/</span> FIELD INDEX</p><h1>Choose a <em>door.</em></h1></div>
        <p>Every entry is a reported pattern:<br />some measured, some remembered,<br />some named by the people who returned.</p>
      </div>
      <div className="filter-row">
        <Link className={!selected ? 'filter-pill is-active' : 'filter-pill'} to="/atlas">All notes</Link>
        {Object.entries(SECTION_META).map(([key, meta]) => <Link key={key} className={selected === key ? 'filter-pill is-active' : 'filter-pill'} to={`/atlas?section=${key}`}>{meta.label}</Link>)}
      </div>
      <div className="atlas-list">
        {visible.map((entry, i) => <Link to={`/atlas/${entry.slug}`} className={`atlas-entry atlas-entry--${SECTION_META[entry.section].color}`} key={entry.slug}>
          <div className="atlas-entry__index">{String(i + 1).padStart(2, '0')}</div>
          <div className="atlas-entry__main"><span className="micro-label">{entry.eyebrow} · {SECTION_META[entry.section].label}</span><h2>{entry.title}</h2><p>{entry.dek}</p><div className="tag-row">{entry.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}</div></div>
          <div className="atlas-entry__signal"><span className="entry-signal" /><span>{entry.evidence[0]}</span><b>↗</b></div>
        </Link>)}
      </div>
    </div>
  )
}
