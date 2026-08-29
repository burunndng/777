import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ENTRIES, SECTION_META, searchAtlas } from '../lib/atlas'

const examples = ['mantis', 'telepathy', 'waiting room', 'more real than real', 'clinic', 'machine elves']

export default function Search() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchAtlas(query), [query])
  return <div className="search-page content-width"><div className="page-hero"><div><p className="section-number">04 <span>/</span> RECEIVER</p><h1>Tune the <em>signal.</em></h1></div><p>Search the language of the experience.<br />A word, a place, a presence, a feeling.</p></div><div className="receiver"><span className="receiver__icon">⌁</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “mantis”, “telepathy”, “waiting room”…" aria-label="Search the hyperspace atlas" /><span className="receiver__count">{query ? `${results.length} FOUND` : 'READY'}</span></div>{!query && <div className="search-examples"><span className="micro-label">Try a frequency</span>{examples.map((example) => <button type="button" key={example} onClick={() => setQuery(example)}>“{example}”</button>)}</div>}{query && <div className="search-results"><div className="micro-label">{results.length} {results.length === 1 ? 'FIELD NOTE' : 'FIELD NOTES'} MATCHED</div>{results.map((entry) => <Link to={`/atlas/${entry.slug}`} className="search-result" key={entry.slug}><div><span className="micro-label">{SECTION_META[entry.section].label} · {entry.evidence[0]}</span><h2>{entry.title}</h2><p>{entry.dek}</p></div><span>↗</span></Link>)}{!results.length && <p className="empty-note">No signal at this frequency. Try a broader word from the examples above.</p>}</div>}{!query && <div className="search-scan"><span className="scan-line" /><div><strong>{ENTRIES.length}</strong><span>FIELD NOTES<br />IN THE INDEX</span></div><div><strong>04</strong><span>EVIDENCE<br />TIERS</span></div><div><strong>∞</strong><span>WAYS TO<br />WANDER</span></div></div>}</div>
}
