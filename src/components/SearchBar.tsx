export default function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <label htmlFor="sphere-search" className="sr-only">
        Search spheres
      </label>
      <input
        id="sphere-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, planet, title, symbol, figure…"
        className="w-full rounded-lg border border-edge bg-surface/70 px-4 py-3 text-ink placeholder:text-ink-faint focus:border-edge-strong focus:outline-none focus:ring-1 focus:ring-gilt/40"
      />
    </div>
  )
}
