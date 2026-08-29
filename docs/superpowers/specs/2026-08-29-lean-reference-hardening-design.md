# Lean Reference Hardening Design

## Goal

Strengthen the Liber 777 reference loop—lookup, understand, compare, and continue reading—without changing the product into a platform. The result remains a static React/Vite application with flat local data and no additional dependencies.

## Product Boundary

The app remains a modern, readable reference for the ten Sephiroth. This pass must not add accounts, persistence, analytics, APIs, a backend, LLM features, new cosmologies, paths, ritual automation, or a component/test framework.

## Audience and Success Criteria

The product serves practitioners, artists, and psychologically or historically curious readers. A successful pass lets each audience:

1. Start from a sphere, a structural diagram, or a correspondence term.
2. Reach the relevant sphere without needing prior knowledge of the navigation model.
3. See why a search result matched and compare related associations on a narrow or wide display.
4. Distinguish historical source material from contemporary editorial framing.
5. Use a working deployed application whose documented validation commands work in CI.

## Architecture

All product behavior remains client-side. `src/data/sephiroth.ts` stays the sole correspondence dataset. Small focused modules may be added under `src/lib/` for search result grouping and page metadata, while routes and components continue to render the interface.

The existing Bun test runner remains the only automated-test runtime. Tests focus on deterministic pure functions and data invariants; browser interaction and visual checks are captured in a documented manual QA checklist rather than new dependencies.

## Delivery and Reliability

- Add a `test` package script that runs `bun test`.
- Update CI to invoke `bun run test` after linting.
- Add a catch-all React Router route with an actionable not-found screen.
- Preserve the existing Vercel SPA rewrite for direct links.

## Navigation and Responsive Reading

### Primary navigation

The desktop header retains its current inline links. At narrow widths it becomes a horizontally scrollable row with no wrapping, visible keyboard focus, and a subtle visual cue that the row can continue. The brand remains fixed at the start of the header; controls stay compact rather than becoming a menu system.

The active destination receives a non-color-only state using `NavLink` and an `aria-current="page"` value supplied by React Router.

### Tree of Life

Each sphere node becomes a keyboard-accessible SVG link to `/sephiroth/:number`. Nodes expose an accessible name containing their number and name. Detail routes pass an `activeNumber` to the diagram when it appears in a future context; this pass only needs neutral interactive nodes to avoid expanding the current route layouts.

### Detail keyboard navigation

Arrow stepping remains available on sphere detail pages, but it does nothing when focus is within an editable or form control, or when a modifier key is held. It must not override text editing or assistive workflows.

## Search

### Ranking

Within a correspondence-field tier, hits that match more query tokens rank before hits that match fewer tokens. Score and existing stable tie breakers then determine order. Existing field-tier priority remains intact.

### Result grouping

The search route groups raw correspondence hits by Sephira. Each group shows the sphere once, the number of matching correspondences, and a concise list of field/term evidence. Groups are ordered by their strongest result.

Search controls retain their accessible label. The empty state includes a small set of buttons for representative queries (Mars, rose, Raphael, crimson, courage, four aces); choosing one writes it into the current input and runs the existing search.

## Tables

The comparison tables remain horizontally scrollable matrices. Each table gains a visible mobile-oriented instruction before the scroll container. The full correspondence table retains its sticky attribute column. Where a value is intentionally abbreviated, the cell provides a native title tooltip containing the complete value.

No alternate data view or selector is added in this pass; the static matrix is the correct core reference artifact.

## Provenance and Method

Add a dedicated `/sources` page linked from the footer. It explains:

- the primary historical source and its role;
- the meaning of the project’s standard Golden Dawn attribution line;
- that `why`, `how to use it`, and marginalia are contemporary editorial framing;
- that deity/figure examples are curated and non-exhaustive;
- that the product is not a scholarly critical edition.

Use a secure HTTPS source link. Do not claim that every display field has a page-level critical apparatus.

## Metadata

Add a small dependency-free document metadata utility. Routes set `document.title` and update the standard description plus Open Graph and Twitter description tags for their specific view. The application uses canonical URLs based on `window.location.origin` and `window.location.pathname`; this keeps direct-route sharing accurate on the configured production domain without hard-coding a preview URL.

Home retains the base description. Sphere detail titles use the pattern `Kether — 777 Sephiroth`. Add `/sources` to the app router and metadata set.

## Testing and Manual QA

Add Bun tests for:

- search coverage-first ranking;
- grouped search output order and evidence;
- metadata title/description mapping as pure functions;
- valid route metadata for all ten spheres;
- existing data and color invariants.

Document a manual release checklist in the README for:

- mobile primary-nav scrolling;
- keyboard focus and skip link;
- Tree node navigation;
- direct links and not-found route;
- full/table horizontal scrolling;
- search examples and result evidence;
- print styling.

## Files and Responsibilities

- `package.json`, `.github/workflows/ci.yml`: executable test contract.
- `src/App.tsx`, `src/routes/NotFound.tsx`: complete route coverage.
- `src/components/Layout.tsx`, `src/index.css`: responsive, active primary navigation and footer source link.
- `src/components/TreeDiagram.tsx`: accessible SVG node links.
- `src/routes/SephiraDetail.tsx`: guarded arrow-key navigation and sphere metadata.
- `src/lib/search.ts`, `src/lib/search.test.ts`: coverage-first ranking and groupable result API.
- `src/components/SearchResults.tsx`, `src/routes/Search.tsx`: grouped, explainable lookup and examples.
- `src/routes/CorrespondenceTable.tsx`, `src/components/SephiraTable.tsx`: scroll instruction and complete-value hints.
- `src/routes/Sources.tsx`: source-method page.
- `src/lib/metadata.ts`, `src/lib/metadata.test.ts`: route metadata definitions and deterministic helpers.
- `README.md`: commands and manual release checklist.

## Error Handling

- Unknown paths render a visible not-found page with links to Home, Search, and Spheres.
- Empty or short search queries retain the existing explicit instruction.
- Unknown metadata keys fall back to the base application title and description.
- Unknown Sephira route parameters retain the existing local not-found message.

## Constraints

- Use Bun, never npm, for project commands.
- Add no dependencies.
- Preserve TypeScript strict mode and the flat `sephiroth.ts` data source.
- Use existing Tailwind theme tokens rather than raw palette values in new UI.
- Preserve the product scope: only the ten Sephiroth and existing correspondence fields.
