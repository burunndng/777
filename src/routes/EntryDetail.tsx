import { Link, useParams } from 'react-router-dom'
import { getEntry, getSource, SECTION_META } from '../lib/atlas'

export default function EntryDetail() {
  const { slug } = useParams()
  const entry = getEntry(slug ?? '')
  if (!entry) return <div className="content-width empty-route"><p className="section-number">SIGNAL LOST</p><h1>This note is not indexed.</h1><Link to="/atlas" className="text-link">Return to the index →</Link></div>

  return <div className={`detail-page detail-page--${SECTION_META[entry.section].color} content-width`}>
    <Link to="/atlas" className="back-link">← Back to index</Link>
    <div className="detail-hero"><div><p className="section-number">{SECTION_META[entry.section].label.toUpperCase()} <span>/</span> FIELD NOTE</p><h1>{entry.title}</h1><p className="detail-dek">{entry.dek}</p></div><div className="detail-orbit" aria-hidden="true"><span /><span /><span /></div></div>
    <div className="detail-grid"><article><div className="evidence-strip"><span className="micro-label">EVIDENCE IN THIS NOTE</span>{entry.evidence.map((tier) => <span className="evidence-badge" key={tier}>{tier}</span>)}</div>{entry.body.map((paragraph) => <p className="detail-body" key={paragraph}>{paragraph}</p>)}<div className="tag-row detail-tags">{entry.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></article>
      <aside className="detail-aside"><div className="aside-block"><span className="micro-label">COMMUNITY VOCABULARY</span>{entry.communityNames?.length ? <div className="vocab-list">{entry.communityNames.map((name) => <span key={name}>{name}</span>)}</div> : <p className="aside-muted">No fixed community label. The description comes first.</p>}</div><div className="aside-block"><span className="micro-label">RESEARCH THREAD</span>{entry.sourceIds.map((id) => { const source = getSource(id); return source ? <a className="source-mini" href={source.doi ? `https://doi.org/${source.doi}` : '#'} target="_blank" rel="noreferrer" key={id}><span>{source.year}</span><strong>{source.authors}</strong><small>{source.journal} ↗</small></a> : null })}</div></aside>
    </div>
    <div className="detail-footer"><Link to="/sources" className="text-link">Read the evidence guide <span>→</span></Link><Link to="/atlas" className="text-link">Continue wandering <span>↗</span></Link></div>
  </div>
}
