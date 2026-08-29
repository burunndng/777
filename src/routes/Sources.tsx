export default function Sources() {
  return (
    <div className="mx-auto flex max-w-reading flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="eyebrow">Method and provenance</p>
        <h1 className="font-display text-5xl text-ink">Sources &amp; method</h1>
        <p className="prose-reading">
          This is a compact reading reference, not a critical edition. It keeps
          the ten Sephiroth legible in one place while marking the difference
          between inherited correspondences and this project’s contemporary
          framing.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl text-ink">Primary historical source</h2>
        <p className="prose-reading">
          The core correspondence spine draws from Aleister Crowley’s 1909{' '}
          <em>Liber 777</em>. The source is historical material: useful for
          tracing a tradition’s symbolic map, not a guarantee that the map is
          timeless, complete, or authoritative.
        </p>
        <a
          href="https://archive.org/search?query=%22Liber%20777%22"
          className="link-gilt w-fit text-sm text-ink-soft hover:text-ink"
          target="_blank"
          rel="noreferrer"
        >
          Find public editions of Liber 777 ↗
        </a>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl text-ink">Attribution method</h2>
        <p className="prose-reading">
          Each sphere lists the project’s standard Golden Dawn-style
          correspondences: divine name, archangel, angelic order, planet or
          cosmic body, color scales, symbols, and Tarot pip relationship. The
          entries intentionally omit the paths and their Hebrew-letter or Trump
          associations because those belong to a different layer of the Tree.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl text-ink">Editorial framing</h2>
        <p className="prose-reading">
          The “why this cluster exists,” “how to use it,” and marginalia are
          contemporary editorial writing. They offer creative, psychological,
          and practical ways to read a symbolic system; they are not quotations
          from Crowley or statements of doctrine.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl text-ink">Figures and limits</h2>
        <p className="prose-reading">
          Deities and figures are curated examples, not exhaustive catalogues or
          claims of universal equivalence. Traditions vary, translations differ,
          and historical correspondence systems often carry the assumptions of
          their period. Read the clusters as a structured vocabulary, and check
          primary and specialist sources when precision matters.
        </p>
      </section>
    </div>
  )
}
