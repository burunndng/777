# AGENTS.md

## Project

Liber 777, modernized: a lean reference and learning tool for the **10 Sephiroth** of Crowley's Liber 777 (1909). Vite + React 19 + TypeScript (strict) + Tailwind. Framing: a map of symbolic associations and archetypes for practitioners, artists, and the psych/history-curious — not a ritual engine, not a scholarly edition, not an AI-mysticism toy.

**Scope guardrails (do not violate):** v1 = the 10 Sephiroth only (no paths, no full 32-column tables, no extra cosmologies). Flat data. No over-engineering. No LLM/graph/ritual/generative/account features.

## Commands

Use `bun` (never npm — lockfile is `bun.lock`).

- `bun run dev` — vite dev server, port 5173, binds 0.0.0.0 (LAN-visible)
- `bun run build` — `tsc` typecheck gate + vite build (output `dist/`, gitignored)
- `bun run lint` — eslint
- `bun test` — data-integrity suite

## Data

Single source of truth: `src/data/sephiroth.ts` — a TS module, **there is no JSON**. Schema: `src/lib/types.ts`.

- Every entry carries the same source line: `{ primary: 'Liber 777, Crowley 1909', secondary: 'Standard Golden Dawn attributions' }` — keep it uniform.
- Hebrew letters and the 22 trumps belong to the connecting **paths**, not the spheres — keep per-sphere attributions to the fields that exist.
- Tone: `why` and `how_to_use` tight (2 sentences max); `modern_note` optional, one line, honest modern framing, never purple.

## Traps

- **Two SephiraDetail files, intentional split:** `routes/SephiraDetail.tsx` is the route container (parses `:number`, keyboard ←/→ nav, not-found fallback); `components/SephiraDetail.tsx` is presentational (takes a `Sephira` prop).
- **Colors:** king/queen color strings in the data must resolve in `NAME_TO_HEX` (`src/components/ColorSwatch.tsx`) — the test suite enforces this. Add the map entry when adding a color.
- **Theme tokens:** palette lives in `tailwind.config.js` (`bg`/`surface`/`raised`/`ink`/`gilt`/`oxblood`/`edge`) — use tokens, not raw hex. A few legacy rgba values in `src/index.css` are not yet centralized.
- **Fonts:** Google Fonts (Cormorant/Spectral/IBM Plex Mono) load from CDN at runtime; Georgia/system fallbacks are intended — don't vendor them.
- react-router-dom is v7, used with the legacy `Routes/Route` API — fine, don't migrate it.
