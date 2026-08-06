import { Link } from 'react-router-dom'
import { getByNumber } from '../data/sephiroth'
import { FIELD_LABELS } from '../lib/search'
import type { SearchResult } from '../lib/search'

export default function SearchResults({
  results,
}: {
  results: SearchResult[]
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="eyebrow">
        {results.length} {results.length === 1 ? 'match' : 'matches'}
      </p>
      <ul className="flex flex-col gap-2">
        {results.map(({ entry }) => {
          const s = getByNumber(entry.sephiraNumber)
          if (!s) return null
          return (
            <li key={`${s.number}-${entry.field}-${entry.term}`}>
              <Link
                to={`/sephiroth/${s.number}`}
                className="group flex items-baseline gap-4 rounded-lg border border-edge bg-surface/50 px-4 py-3 transition hover:bg-raised"
              >
                <span className="font-display text-2xl leading-none text-gilt">
                  {String(s.number).padStart(2, '0')}
                </span>
                <span className="font-display text-xl text-ink group-hover:text-gilt-bright">
                  {s.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {FIELD_LABELS[entry.field]}
                </span>
                <span className="ml-auto truncate text-sm text-ink-soft">
                  {entry.term}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
