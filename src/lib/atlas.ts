export type EvidenceTier = 'Controlled' | 'Structured' | 'Survey' | 'Community'
export type AtlasSection = 'state' | 'worlds' | 'entities' | 'encounters' | 'communication' | 'motifs'

export interface AtlasEntry {
  slug: string
  title: string
  eyebrow: string
  section: AtlasSection
  dek: string
  body: string[]
  tags: string[]
  evidence: EvidenceTier[]
  sourceIds: string[]
  communityNames?: string[]
}

export interface AtlasSource {
  id: string
  authors: string
  year: string
  title: string
  journal: string
  doi?: string
  note: string
}

export const SECTION_META: Record<AtlasSection, { label: string; short: string; color: string }> = {
  state: { label: 'The state', short: 'Immersion, intensity, time, self', color: 'violet' },
  worlds: { label: 'Reported worlds', short: 'Rooms, tunnels, landscapes, voids', color: 'cyan' },
  entities: { label: 'Entities', short: 'Forms, presence, autonomy', color: 'magenta' },
  encounters: { label: 'Encounters', short: 'Welcome, teaching, examination, threat', color: 'amber' },
  communication: { label: 'Communication', short: 'Telepathy, symbols, direct knowing', color: 'lime' },
  motifs: { label: 'Community motifs', short: 'Names that grew around the reports', color: 'rose' },
}

export const SOURCES: AtlasSource[] = [
  {
    id: 'davis-2020',
    authors: 'Davis, Clifton, Weaver, Hurwitz, Johnson & Griffiths',
    year: '2020',
    title: 'Survey of entity encounter experiences occasioned by inhaled N,N-dimethyltryptamine',
    journal: 'Journal of Psychopharmacology 34(9), 1008–1020',
    doi: '10.1177/0269881120916143',
    note: 'Online survey of 2,561 people selected for having had a memorable DMT entity encounter.',
  },
  {
    id: 'michael-2021',
    authors: 'Michael, Luke & Robinson',
    year: '2021',
    title: 'An Encounter With the Other: A Thematic and Content Analysis of DMT Experiences From a Naturalistic Field Study',
    journal: 'Frontiers in Psychology 12, 720717',
    doi: '10.3389/fpsyg.2021.720717',
    note: 'Thirty-six immediate post-experience interviews with experienced users in a naturalistic setting.',
  },
  {
    id: 'timmermann-2018',
    authors: 'Timmermann, Roseman, Williams et al.',
    year: '2018',
    title: 'DMT Models the Near-Death Experience',
    journal: 'Frontiers in Psychology 9, 1424',
    doi: '10.3389/fpsyg.2018.01424',
    note: 'Questionnaire-based comparison of reported DMT phenomenology and near-death-experience phenomenology.',
  },
  {
    id: 'timmermann-2019',
    authors: 'Timmermann, Roseman, Schartner et al.',
    year: '2019',
    title: 'Neural correlates of the DMT experience assessed with multivariate EEG',
    journal: 'Scientific Reports 9',
    doi: '10.1038/s41598-019-51974-4',
    note: 'Controlled human EEG study of acute DMT-related changes in brain dynamics.',
  },
  {
    id: 'timmermann-2023',
    authors: 'Timmermann, Roseman, Haridas et al.',
    year: '2023',
    title: 'Human brain effects of DMT assessed via EEG-fMRI',
    journal: 'Proceedings of the National Academy of Sciences 120(13)',
    doi: '10.1073/pnas.2218949120',
    note: 'Combined EEG-fMRI study of DMT-associated changes in brain activity and connectivity.',
  },
  {
    id: 'cott-2008',
    authors: 'Cott & Rock',
    year: '2008',
    title: 'Phenomenology of N,N-dimethyltryptamine use: A thematic analysis',
    journal: 'Journal of Scientific Exploration 22, 359–378',
    note: 'Early thematic analysis useful for comparison, placed below contemporary controlled and structured studies.',
  },
]

export const ENTRIES: AtlasEntry[] = [
  {
    slug: 'immersion', title: 'Immersion', eyebrow: 'The threshold', section: 'state',
    dek: 'At intensity, the experience can stop feeling like imagery placed over a room and become a room of its own.',
    body: ['Reports range from altered perception with the physical room still available to a felt replacement of ordinary surroundings. The atlas uses immersion as a descriptive continuum, not a universal dose threshold.', 'The striking feature is location: people may feel wholly situated inside an environment, with the body and ordinary room receding from experience.'],
    tags: ['world replacement', 'eyes closed', 'breakthrough', 'location'], evidence: ['Controlled', 'Structured'], sourceIds: ['michael-2021', 'timmermann-2018'],
  },
  {
    slug: 'hyperreality', title: 'Hyperreality', eyebrow: 'The threshold', section: 'state',
    dek: 'The scene may arrive with a conviction that exceeds ordinary waking perception: solid, immediate, and more real than real.',
    body: ['Hyperreality describes how an experience feels, not whether its interpretation is true. The same event can carry intense authenticity and remain impossible to verify from inside the report.', 'This is where the atlas keeps phenomenology and ontology side by side: the certainty is real as an experience; the external status of what produced it remains open.'],
    tags: ['more real than real', 'noesis', 'certainty', 'ontology'], evidence: ['Survey', 'Structured'], sourceIds: ['davis-2020', 'michael-2021'],
  },
  {
    slug: 'transition', title: 'Passage & return', eyebrow: 'The threshold', section: 'state',
    dek: 'Acceleration, tunnels, boundaries, arrival, and the abrupt snap back to the body form a recurring grammar of transition.',
    body: ['Participants describe being pulled, launched, carried, or moved through a boundary before arriving somewhere that feels qualitatively different. The return can be equally architectural: descent, collapse, fading, or re-entry.', 'A transition grammar is better supported than a fixed itinerary. Research describes movement and phases; it does not establish one canonical sequence of stations.'],
    tags: ['tunnel', 'arrival', 'return', 'threshold'], evidence: ['Structured', 'Community'], sourceIds: ['michael-2021', 'cott-2008'],
  },
  {
    slug: 'architectural-spaces', title: 'Architectural spaces', eyebrow: 'A reported world', section: 'worlds',
    dek: 'Rooms, chambers, halls, domes, clinics, temples, and impossible interiors recur across accounts of intense DMT states.',
    body: ['The defensible category is enclosed or architectural environment. Named locations such as Waiting Rooms and Engine Rooms belong underneath it as community vocabulary, not as established geography.', 'Descriptions often emphasize coherent structure, impossible materials, and spaces that seem to continue beyond the participant’s view.'],
    tags: ['rooms', 'chambers', 'halls', 'interiors'], evidence: ['Structured', 'Community'], sourceIds: ['michael-2021', 'cott-2008'], communityNames: ['Waiting Room', 'Engine Room', 'Healing Quarter'],
  },
  {
    slug: 'landscapes-and-voids', title: 'Landscapes & voids', eyebrow: 'A reported world', section: 'worlds',
    dek: 'Not every world is built. Reports also open onto luminous expanses, organic landscapes, patterned fields, darkness, and the absence of space.',
    body: ['A world can feel natural, technological, ceremonial, geometric, luminous, or almost impossible to classify. The apparent environment is often more than a backdrop: it sets the emotional and social conditions of the encounter.', '“The void” and “central light” are useful community and phenomenological handles, but neither is a demonstrated universal destination.'],
    tags: ['landscape', 'luminous', 'void', 'geometry'], evidence: ['Structured', 'Community'], sourceIds: ['michael-2021'], communityNames: ['The Void', 'Central Light', 'Chrysanthemum'],
  },
  {
    slug: 'apparently-autonomous', title: 'Apparently autonomous agents', eyebrow: 'A reported world', section: 'entities',
    dek: 'Many people describe beings as conscious, intelligent, surprising, and engaged in activities that seem to continue without them.',
    body: ['Apparent autonomy is a finding about the character of the experience. It does not settle whether the agent is an independent external intelligence, a non-voluntary model generated by the brain, or some combination of psychological and cultural processes.', 'The useful question is what autonomy does phenomenologically: it makes the world feel inhabited, resistant to control, and larger than the observer.'],
    tags: ['agency', 'intelligence', 'autonomy', 'presence'], evidence: ['Survey', 'Structured'], sourceIds: ['davis-2020', 'michael-2021'],
  },
  {
    slug: 'morphology', title: 'Morphology is multidimensional', eyebrow: 'A reported world', section: 'entities',
    dek: 'Humanoid, insectoid, luminous, mechanical, maternal, animal, geometric, and formless are overlapping descriptions—not fixed species.',
    body: ['A single report can combine appearance, behavior, material, affect, and interpretation: an insectoid figure with a clinical manner, mechanical texture, telepathic communication, and an alien interpretation.', 'This is why the atlas avoids a biological bestiary. Recurring forms matter, but their boundaries are porous and the coding choices shape what appears to recur.'],
    tags: ['insectoid', 'mechanical', 'humanoid', 'luminous'], evidence: ['Survey', 'Structured', 'Community'], sourceIds: ['davis-2020', 'michael-2021'], communityNames: ['machine elves', 'mantids', 'jesters'],
  },
  {
    slug: 'welcome-and-guidance', title: 'Welcome, guidance, and teaching', eyebrow: 'The encounter', section: 'encounters',
    dek: 'Entities may greet, escort, reassure, demonstrate, instruct, or seem to recognize the person who has arrived.',
    body: ['Davis et al. found that people often described messages, emotional communication, and teaching or guidance. Those reports can be meaningful without granting the message automatic factual authority.', 'The encounter’s social shape often determines its afterlife: welcome and care may become spiritual significance; instruction may become a new personal ethic; surprise may become a lifelong question.'],
    tags: ['guide', 'teacher', 'welcome', 'message'], evidence: ['Survey', 'Structured'], sourceIds: ['davis-2020', 'michael-2021'],
  },
  {
    slug: 'examination-and-treatment', title: 'Examination & treatment', eyebrow: 'The encounter', section: 'encounters',
    dek: 'Scanning, surgery, disassembly, repair, cleansing, and adjustment form one of the most persistent encounter families.',
    body: ['Clinical or procedural encounters appear in DMT reports and in accounts from other altered states. Their recurrence is worth studying; it is not yet evidence of a DMT-specific medical class of being.', 'Code the behavior separately from the figure’s appearance and from the participant’s interpretation. “Mantis surgeon” is a compact community phrase for several dimensions at once.'],
    tags: ['clinic', 'surgery', 'healing', 'examination'], evidence: ['Structured', 'Community'], sourceIds: ['michael-2021', 'cott-2008'], communityNames: ['mantis surgeon', 'healing space'],
  },
  {
    slug: 'telepathy-and-direct-knowing', title: 'Telepathy & direct knowing', eyebrow: 'The channel', section: 'communication',
    dek: 'Messages may arrive as speech, symbols, feeling, image, music, vibration, or an immediate knowing with no visible channel.',
    body: ['The cleanest research vocabulary separates modality, content, and epistemic appraisal. “I knew” describes the force and form of the experience; it does not independently verify the proposition that was known.', 'Davis et al. reported visual and extrasensory communication as prominent, with 69% of respondents reporting a message from the encounter.'],
    tags: ['telepathy', 'symbols', 'knowing', 'music'], evidence: ['Survey', 'Structured'], sourceIds: ['davis-2020', 'michael-2021'],
  },
  {
    slug: 'machine-elves', title: 'Machine elves', eyebrow: 'Community cartography', section: 'motifs',
    dek: 'A powerful cultural name for active, playful, mechanical, elf-like figures—important to the history of DMT language, not a settled species.',
    body: ['The phrase carries Terence McKenna’s influence and a long afterlife in psychedelic culture. It can name a morphology, a behavior, a cultural reference, or all three at once.', 'When documenting it, ask whether the respondent used the term spontaneously, had encountered it before, and what the figure actually looked like or did.'],
    tags: ['McKenna', 'elf-like', 'mechanical', 'play'], evidence: ['Community'], sourceIds: ['davis-2020'], communityNames: ['self-transforming machine elves'],
  },
  {
    slug: 'waiting-room', title: 'The Waiting Room', eyebrow: 'Community cartography', section: 'motifs',
    dek: 'A name for the liminal pause: antechamber, lobby, arrivals hall, or enclosed space before the world opens wider.',
    body: ['The underlying phenomenological category—liminal or enclosed space—is more defensible than the claim that one universal room exists. The name is still useful because communities use it to compare a recognizable kind of arrival.', 'In the atlas, community names stay vivid and searchable while their evidence status stays visible.'],
    tags: ['liminal', 'lobby', 'arrival', 'chamber'], evidence: ['Community', 'Structured'], sourceIds: ['michael-2021'], communityNames: ['lobby', 'antechamber', 'arrivals hall'],
  },
]

export const getEntry = (slug: string) => ENTRIES.find((entry) => entry.slug === slug)
export const getSource = (id: string) => SOURCES.find((source) => source.id === id)

export function searchAtlas(query: string): AtlasEntry[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return ENTRIES.map((entry) => {
    const haystack = [entry.title, entry.eyebrow, entry.dek, ...entry.body, ...entry.tags, ...(entry.communityNames ?? [])].join(' ').toLowerCase()
    const matched = terms.filter((term) => haystack.includes(term)).length
    return { entry, matched }
  }).filter(({ matched }) => matched === terms.length).sort((a, b) => b.matched - a.matched || a.entry.title.localeCompare(b.entry.title)).map(({ entry }) => entry)
}
