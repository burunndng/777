# 777 — Sephiroth

A clean, modern, searchable reference to the **10 Sephiroth** of Aleister Crowley's *Liber 777* (1909). A map of symbolic associations and archetypes — built for practitioners, artists, and the psych/history-curious alike, not a ritual engine and not a scholarly edition.

## What it is

*Liber 777* is Crowley's table of correspondences: a grid mapping the ten spheres of the Tree of Life across planets, divine names, archangels, colors, tarot, symbols, and figures. This app distills its core spine — the ten spheres — into a calm, readable reference that teaches what each cluster means, why it still matters (as a compression algorithm for meaning, a Schelling point for the imagination), and how to use it: in practice, or as a creative and psychological lens.

## Features

- **Home** — what / why / how in one screen, with the Tree of Life diagram
- **Ten Spheres** — searchable list (cards or table view) of all 10 Sephiroth
- **Per-sphere detail** — full cluster: meanings, correspondences, virtues and vices, modern context notes, sibling/pillar navigation, keyboard ←/→ stepping
- **Triads** — the Supernal, Ethical, and Astral triads laid out
- **Correspondence table** — the full 13-row × 10-column matrix, transposed for readability

## Live

**https://777-gamma-weld.vercel.app** — also embedded in AuraDesk (launcher → Practice → 777).

## Stack

Vite · React 19 · TypeScript (strict) · Tailwind · react-router-dom 7 — static build, zero backend.

## Develop

```sh
bun install
bun run dev      # localhost:5173
bun run build    # tsc + vite build → dist/
bun run lint
bun test         # data-integrity suite
```

Data lives in `src/data/sephiroth.ts` — one entry per sphere, schema in `src/lib/types.ts`. See `AGENTS.md` for conventions.

## Sources

- *Liber 777*, Aleister Crowley, 1909 — primary correspondence source (public domain). Original: [Liber 777 PDF](http://93beast.fea.st.user.fm/files/section1/777/Liber%20777.pdf)
- Standard Golden Dawn attributions, secondary
- The project's design DNA: *Liber 777 — A Prologue on the Architecture of Symbolic Power* (`2026Liber-777-Prologue.pdf` in this repo)

Crowley is treated as historical source, not scripture.

## License

MIT — see `LICENSE`.
