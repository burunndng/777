# Lean Reference Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen 777's lookup, navigation, comparison, provenance, and release validation flows without adding dependencies or expanding the product beyond a static ten-Sephiroth reference.

**Architecture:** Keep all behavior client-side and preserve `src/data/sephiroth.ts` as the single source of truth. Add only small pure helpers for search grouping and metadata; use native HTML, SVG links, React Router, Tailwind, and Bun's existing test runner for the rest.

**Tech Stack:** React 19, TypeScript strict mode, Vite, Tailwind CSS, React Router 7, Bun test, GitHub Actions, Vercel SPA rewrite.

## Global Constraints

- Use Bun, never npm, for project commands.
- Add no dependencies.
- Preserve TypeScript strict mode and the flat `sephiroth.ts` data source.
- Use existing Tailwind theme tokens rather than raw palette values in new UI.
- Preserve the product scope: only the ten Sephiroth and existing correspondence fields.
- Do not add accounts, persistence, analytics, APIs, a backend, LLM features, new cosmologies, paths, ritual automation, or a component/test framework.

---

### Task 1: Repair the test contract and add the route fallback

**Files:**
- Modify: `package.json:7-12`
- Modify: `.github/workflows/ci.yml:16-19`
- Modify: `src/App.tsx:10-21`
- Create: `src/routes/NotFound.tsx`

**Interfaces:**
- Produces a `NotFound` route component and a working `bun run test` command.

- [ ] **Step 1: Add the explicit test script**

Add `"test": "bun test"` to the scripts object after `lint`.

- [ ] **Step 2: Update CI to use the script**

Change the test workflow command from `bun test` to `bun run test`.

- [ ] **Step 3: Create the not-found screen**

Create a route component with one heading and three links:

```tsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex max-w-reading flex-col gap-4">
      <p className="eyebrow">404 · Uncharted branch</p>
      <h1 className="font-display text-5xl text-ink">This page is not in the table</h1>
      <p className="prose-reading">
        The address does not resolve to a page in this reference.
      </p>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link to="/" className="link-gilt text-ink-soft hover:text-ink">Home</Link>
        <Link to="/search" className="link-gilt text-ink-soft hover:text-ink">Search</Link>
        <Link to="/sephiroth" className="link-gilt text-ink-soft hover:text-ink">Ten spheres</Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Register the wildcard route**

Import `NotFound` in `src/App.tsx` and add `<Route path="*" element={<NotFound />} />` after the known routes.

- [ ] **Step 5: Run the baseline checks**

Run `bun run lint`, `bun run test`, and `bun run build`. Expect all three to complete successfully.

- [ ] **Step 6: Commit**

```bash
git add package.json .github/workflows/ci.yml src/App.tsx src/routes/NotFound.tsx
git commit -m "fix: restore test command and add route fallback"
```

### Task 2: Add pure route metadata helpers

**Files:**
- Create: `src/lib/metadata.ts`
- Create: `src/lib/metadata.test.ts`
- Modify: `src/routes/Home.tsx:1-24`
- Modify: `src/routes/SephirothList.tsx:1-12`
- Modify: `src/routes/SephiraDetail.tsx:1-20`
- Modify: `src/routes/Triads.tsx:1-5`
- Modify: `src/routes/CorrespondenceTable.tsx:1-6`
- Modify: `src/routes/Search.tsx:1-6`
- Modify: `src/routes/NotFound.tsx:1-5`

**Interfaces:**
- Produces `PageMeta`, `getPageMeta(pathname: string)`, and `applyPageMeta(meta: PageMeta): void`.

- [ ] **Step 1: Write metadata tests**

Test the base page, `/search`, `/triads`, `/table`, `/sources`, valid `/sephiroth/6`, invalid `/sephiroth/99`, and an unknown path. Assert title, description, and canonical path.

- [ ] **Step 2: Implement pure metadata mapping**

Define:

```ts
export interface PageMeta {
  title: string
  description: string
  canonicalPath: string
}

export function getPageMeta(pathname: string): PageMeta
export function applyPageMeta(meta: PageMeta): void
```

Use the existing base description and `Tiphareth — 777 Sephiroth` style. `applyPageMeta` sets `document.title`, the description tag, `og:title`, `og:description`, `og:url`, `twitter:title`, `twitter:description`, and a canonical link, creating missing tags when needed.

- [ ] **Step 3: Add route-level effects**

Each route calls `useEffect(() => applyPageMeta(getPageMeta(location.pathname)), [location.pathname])` using `useLocation`. Do not duplicate mapping logic in routes.

- [ ] **Step 4: Add `/sources` metadata support**

Include the route key now; the page itself is delivered in Task 5.

- [ ] **Step 5: Run metadata tests and checks**

Run `bun run test`, `bun run lint`, and `bun run build`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/metadata.ts src/lib/metadata.test.ts src/routes
git commit -m "feat: add route-specific document metadata"
```

### Task 3: Make primary navigation and Tree nodes interactive

**Files:**
- Modify: `src/components/Layout.tsx:1-76`
- Modify: `src/components/TreeDiagram.tsx:32-107`
- Modify: `src/index.css:27-43`

**Interfaces:**
- Tree nodes remain SVG-rendered and produce React Router links to `/sephiroth/:number`.

- [ ] **Step 1: Replace primary `Link` elements with `NavLink`**

Add a small local `navClass` function that adds `text-ink` and a bottom-border/background-size active state when `isActive` is true. Include `aria-current` through `NavLink` and preserve the existing five destinations.

- [ ] **Step 2: Make the header responsive without a new menu dependency**

Keep the brand in a non-scrolling wrapper. Put the nav in `overflow-x-auto whitespace-nowrap`, add `min-w-0` to the header inner flex container, and use smaller gap/padding at mobile widths. Keep the nav keyboard focus visible and ensure it does not wrap.

- [ ] **Step 3: Convert SVG nodes to links**

Import `Link` and wrap each node's circle and label in `<Link to={...} aria-label={...}>`. Use an SVG `<g>` inside the link, preserve the current visual labels, add `tabIndex={0}` only if required by SVG link behavior, and add a class/style change on focus-visible/hover.

- [ ] **Step 4: Add a node affordance**

Add `cursor-pointer` and a focused/hovered stroke state. Keep the diagram's `role="img"` label and add a short visible or screen-reader-only note nearby only where the diagram is used if needed.

- [ ] **Step 5: Run checks**

Run `bun run lint`, `bun run test`, and `bun run build`.

- [ ] **Step 6: Commit**

```bash
git add src/components/Layout.tsx src/components/TreeDiagram.tsx src/index.css
git commit -m "feat: make navigation and tree nodes interactive"
```

### Task 4: Improve search ranking and explainable grouped results

**Files:**
- Modify: `src/lib/search.ts:17-27,203-223`
- Modify: `src/lib/search.test.ts:40-85`
- Modify: `src/components/SearchResults.tsx:1-45`
- Modify: `src/routes/Search.tsx:1-38`

**Interfaces:**
- Add `GroupedSearchResult` and `groupSearchResults(results: SearchResult[]): GroupedSearchResult[]`.

- [ ] **Step 1: Add ranking regression tests**

Add a test fixture query whose same-tier exact candidate matches two tokens and another candidate matches one. Assert the two-token candidate is first. Add grouping assertions for `rose`: two groups, sphere 6 before sphere 7, and each group contains field/term evidence.

- [ ] **Step 2: Change same-tier comparator order**

In `compareMatches`, preserve field tier first, then sort `matchedTokens` descending, then `score` ascending, then existing numeric and term tie breakers.

- [ ] **Step 3: Implement grouping**

Group by `entry.sephiraNumber`, retain the strongest score/tier result as the group sort key, and expose each group's original matching entries in their ranked order.

- [ ] **Step 4: Render one result per sphere**

Render each group as a link with sphere number/name, match count, and a compact list such as `Symbols: the rose` or `Planet: Mars`. Keep all evidence inside the link so the entire result remains one target.

- [ ] **Step 5: Add example query controls**

In the inactive search state, render buttons for `Mars`, `rose`, `Raphael`, `crimson`, `courage`, and `four aces`. Buttons call `setQ(example)` and use `type="button"`; no new component library is needed.

- [ ] **Step 6: Run tests and checks**

Run `bun run test`, `bun run lint`, and `bun run build`.

- [ ] **Step 7: Commit**

```bash
git add src/lib/search.ts src/lib/search.test.ts src/components/SearchResults.tsx src/routes/Search.tsx
git commit -m "feat: clarify and rank reverse correspondence search"
```

### Task 5: Add sources/method page and table mobile affordances

**Files:**
- Create: `src/routes/Sources.tsx`
- Modify: `src/App.tsx:1-21`
- Modify: `src/components/Layout.tsx:55-76`
- Modify: `src/routes/CorrespondenceTable.tsx:55-111`
- Modify: `src/components/SephiraTable.tsx:5-59`
- Modify: `src/routes/Home.tsx:97-120`
- Modify: `README.md:25-35,37-43`

**Interfaces:**
- Adds `/sources`, linked from the footer and home reference copy.

- [ ] **Step 1: Create the sources page**

Render concise sections for primary source, attribution method, editorial framing, curated figures, and scope. Link the historical source through HTTPS and label it as an external source.

- [ ] **Step 2: Register and link the page**

Register `<Route path="/sources" element={<Sources />} />`; add a `Sources & method` footer link and update the Home “Sources” paragraph to link to it.

- [ ] **Step 3: Add table instructions**

Place a short `Swipe horizontally to compare spheres.` paragraph immediately before each overflow container, hidden only when print media applies.

- [ ] **Step 4: Preserve full values for abbreviated table cells**

For the symbols row, calculate the full comma-separated value and set it as the cell `title` while retaining the compact displayed value. Apply the same principle to any intentionally truncated sphere-table content.

- [ ] **Step 5: Update documentation**

Document the corrected commands as `bun run test` and add the manual QA checklist covering mobile nav, skip link, tree links, direct links/404, horizontal tables, search examples, and print styling. Replace the stale HTTP source URL with the HTTPS source URL used by the page.

- [ ] **Step 6: Run checks**

Run `bun run lint`, `bun run test`, and `bun run build`.

- [ ] **Step 7: Commit**

```bash
git add src/routes/Sources.tsx src/App.tsx src/components/Layout.tsx src/routes/CorrespondenceTable.tsx src/components/SephiraTable.tsx src/routes/Home.tsx README.md
git commit -m "feat: add source method and table reading affordances"
```

### Task 6: Guard detail keyboard navigation and complete release verification

**Files:**
- Modify: `src/routes/SephiraDetail.tsx:6-19`
- Modify: `src/data/sephiroth.test.ts:62-67`
- Modify: `src/lib/search.test.ts:1-85`

**Interfaces:**
- Detail arrow navigation ignores editable/form targets and modified key events.

- [ ] **Step 1: Add route/data regression assertions**

Extend pure tests for all ten sphere metadata paths and for search group stability. Keep tests within the existing Bun files or the metadata test file; do not add a test framework.

- [ ] **Step 2: Guard the key handler**

Before handling arrows, inspect `e.target` with `matches('input, textarea, select, [contenteditable="true"]')`; return for those targets and for any modifier key. Preserve cleanup and boundary behavior.

- [ ] **Step 3: Run the complete validation suite**

Run:

```sh
bun install --frozen-lockfile
bun run lint
bun run test
bun run build
```

Expected: all commands pass with no new dependencies and a generated `dist/` directory.

- [ ] **Step 4: Perform manual browser QA**

Use the live deployment or local Vite server and check the README checklist at both a desktop width and a narrow mobile width. Specifically verify direct `/search`, `/sephiroth/6`, `/sources`, and an invalid path.

- [ ] **Step 5: Inspect final diff and status**

Run `git diff --check`, `git status --short`, and `git diff --stat`. Confirm only intended source, test, docs, CI, and plan/spec files changed.

- [ ] **Step 6: Commit verification documentation if changed**

```bash
git add src README.md package.json .github/workflows/ci.yml
git commit -m "test: verify lean reference hardening"
```
