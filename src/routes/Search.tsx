import { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
import { MIN_QUERY_LENGTH, searchCorrespondences } from '../lib/search'

export default function Search() {
  const [q, setQ] = useState('')
  const results = useMemo(() => searchCorrespondences(q), [q])
  const active = q.trim().length >= MIN_QUERY_LENGTH

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="eyebrow">Reverse correspondence lookup</p>
        <h1 className="font-display text-5xl text-ink">Find the Sphere</h1>
        <p className="prose-reading max-w-[50ch]">
          You have a symbol, planet, color, or name — the search finds which
          sphere it belongs to. All matches are shown, ranked by how strongly
          they correspond.
        </p>
      </div>

      <div className="max-w-xl">
        <SearchBar value={q} onChange={setQ} />
      </div>

      {!active ? (
        <p className="text-ink-faint">
          Type at least {MIN_QUERY_LENGTH} characters to search.
        </p>
      ) : results.length === 0 ? (
        <p className="text-ink-faint">No sphere matches “{q}”.</p>
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  )
}
