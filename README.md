# Hyperspace — DMT Field Atlas

A psychonaut-first field atlas of reported DMT worlds, entities, encounters,
communication, and recurring community motifs. It keeps the experience vivid
while separating controlled findings, structured reports, selected surveys, and
community vocabulary.

## Experience

- **Home** — enter the atlas through an experience-first orientation.
- **Explore** — browse field notes across the state, worlds, entities, encounters, communication, and motifs.
- **Search** — tune the receiver with terms such as `mantis`, `telepathy`, `clinic`, `waiting room`, or `machine elves`.
- **Field notes** — read the evidence hierarchy and exact research threads behind the atlas.

The app is not a claim that named places or entities exist independently of the
people who report them. It is a map of recurring descriptions, felt realities,
and the language communities built around them.

## Develop

```sh
bun install
bun run dev
bun run lint
bun run test
bun run build
```

## Sources

The research index begins with:

- Davis et al. (2020), *Survey of entity encounter experiences occasioned by inhaled N,N-dimethyltryptamine*, Journal of Psychopharmacology. [DOI](https://doi.org/10.1177/0269881120916143)
- Michael, Luke & Robinson (2021), *An Encounter With the Other*, Frontiers in Psychology. [DOI](https://doi.org/10.3389/fpsyg.2021.720717)
- Timmermann et al. (2018), *DMT Models the Near-Death Experience*, Frontiers in Psychology. [DOI](https://doi.org/10.3389/fpsyg.2018.01424)
- Timmermann et al. (2019), *Neural correlates of the DMT experience assessed with multivariate EEG*, Scientific Reports. [DOI](https://doi.org/10.1038/s41598-019-51974-4)
- Timmermann et al. (2023), *Human brain effects of DMT assessed via EEG-fMRI*, PNAS. [DOI](https://doi.org/10.1073/pnas.2218949120)

Community terms such as Waiting Room, machine elves, hyperslap, and
Chrysanthemum are retained as cultural vocabulary, not prevalence or ontology
claims.

## Release check

Run `bun install --frozen-lockfile`, then `bun run lint`, `bun run test`, and
`bun run build`. Before deploying, verify at desktop and narrow mobile widths:

- primary navigation and keyboard focus;
- Tree/atlas links and direct `/atlas/:slug` links;
- search examples and field-note results;
- source links and evidence labels;
- invalid paths and print output;
- reduced-motion behavior.

## License

MIT — see `LICENSE`.
