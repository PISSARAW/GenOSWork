export type PrimaryReference = {
  authors: string;
  year: number;
  title: string;
  venue: string;
  url: string;
  mechanism: string;
  relevance: string;
};

export const mechanismLiterature: Record<string, PrimaryReference[]> = {
  "episodic-memory": [{ authors: "Endel Tulving", year: 1972, title: "Episodic and semantic memory", venue: "Organization of Memory, pp. 381–403", url: "https://books.google.com/books?id=jGpKAAAAMAAJ", mechanism: "Episodic vs. semantic memory", relevance: "Introduces the distinction used as a vocabulary for contextual episodes and generalized facts; it does not establish that software records have human recollective experience." }],
  "semantic-memory": [{ authors: "John R. Anderson", year: 1991, title: "The Adaptive Nature of Human Categorization", venue: "Psychological Review 98(3), 409–429", url: "https://doi.org/10.1037/0033-295X.98.3.409", mechanism: "Associative retrieval and categorization", relevance: "A probabilistic account of categorization and retrieval from prior instances; GenOS retrieval scores are software rankings, not a cognitive model validated by this paper." }],
  "memory-retrieval": [{ authors: "John J. Hopfield", year: 1982, title: "Neural networks and physical systems with emergent collective computational abilities", venue: "Proceedings of the National Academy of Sciences 79(8), 2554–2558", url: "https://doi.org/10.1073/pnas.79.8.2554", mechanism: "Content-addressable associative memory", relevance: "Shows a dynamical network that retrieves stable patterns; it is a mechanism reference, not evidence that GenOS vector search reproduces neural memory." }],
  "synaptic-plasticity": [{ authors: "Guo-qiang Bi and Mu-ming Poo", year: 1998, title: "Synaptic modifications in cultured hippocampal neurons: dependence on spike timing, synaptic strength, and postsynaptic cell type", venue: "The Journal of Neuroscience 18(24), 10464–10472", url: "https://doi.org/10.1523/JNEUROSCI.18-24-10464.1998", mechanism: "Timing-dependent synaptic modification", relevance: "Reports timing-dependent changes in cultured neurons. A runtime weight update is an engineered rule and does not inherit the biological mechanism or its causal claims." }],
  stdp: [{ authors: "Guo-qiang Bi and Mu-ming Poo", year: 1998, title: "Synaptic modifications in cultured hippocampal neurons: dependence on spike timing, synaptic strength, and postsynaptic cell type", venue: "The Journal of Neuroscience 18(24), 10464–10472", url: "https://doi.org/10.1523/JNEUROSCI.18-24-10464.1998", mechanism: "Spike-timing-dependent plasticity", relevance: "Primary experimental characterization of timing-sensitive synaptic change; it motivates the analogy but does not validate software STDP implementations." }],
  "brier-calibration": [{ authors: "Glenn W. Brier", year: 1950, title: "Verification of forecasts expressed in terms of probability", venue: "Monthly Weather Review 78, 1–3", url: "https://doi.org/10.1175/1520-0493(1950)078%3C0001%3AVOFEIT%3E2.0.CO%3B2", mechanism: "Quadratic scoring of probabilistic forecasts", relevance: "Defines the probability score now bearing Brier’s name. Calibration still requires a suitable set of resolved forecasts; a score alone does not establish general forecasting skill." }],
  "neuron-model": [{ authors: "Warren S. McCulloch and Walter Pitts", year: 1943, title: "A logical calculus of the ideas immanent in nervous activity", venue: "Bulletin of Mathematical Biophysics 5, 115–133", url: "https://doi.org/10.1007/BF02478259", mechanism: "Threshold logic networks", relevance: "Formalizes idealized all-or-none units as logical networks; the abstraction is not a full biological neuron model." }],
  "foraging": [{ authors: "Eric L. Charnov", year: 1976, title: "Optimal foraging, the marginal value theorem", venue: "Theoretical Population Biology 9(2), 129–136", url: "https://doi.org/10.1016/0040-5809(76)90040-X", mechanism: "Patch departure under diminishing returns", relevance: "Derives an idealized patch-leaving rule under stated assumptions. A software resource-selection heuristic is not empirically validated by the ecological model." }],
  "stigmergy": [{ authors: "Pierre-Paul Grassé", year: 1959, title: "La reconstruction du nid et les coordinations interindividuelles chez Bellicositermes natalensis et Cubitermes sp.", venue: "Insectes Sociaux 6, 41–80", url: "https://doi.org/10.1007/BF02223791", mechanism: "Stigmergic coordination through environmental traces", relevance: "Introduces stigmergy in the study of termite nest reconstruction; shared software traces are a design analogy, not evidence of biological equivalence." }],
  "swarm": [{ authors: "Craig W. Reynolds", year: 1987, title: "Flocks, herds, and schools: A distributed behavioral model", venue: "Computer Graphics 21(4), 25–34", url: "https://doi.org/10.1145/37401.37406", mechanism: "Local rules yielding group motion", relevance: "Presents a computational flocking model. It supports discussion of local coordination rules, not a general claim that a multi-agent system is intelligent or robust." }],
  "selection": [{ authors: "John Maynard Smith and George R. Price", year: 1973, title: "The logic of animal conflict", venue: "Nature 246, 15–18", url: "https://doi.org/10.1038/246015a0", mechanism: "Evolutionarily stable strategies", relevance: "Formalizes strategic stability in evolutionary conflict. It does not prescribe a fair or safe software selection policy." }],
  "embodied-control": [{ authors: "Rodney A. Brooks", year: 1991, title: "Intelligence without representation", venue: "Artificial Intelligence 47(1–3), 139–159", url: "https://doi.org/10.1016/0004-3702(91)90053-M", mechanism: "Layered perception–action control", relevance: "Describes a robot control architecture grounded in direct perception and action. It is a robotics design precedent, not evidence for agent cognition or consciousness." }],
};

export const primaryMechanismReferences = Object.entries(mechanismLiterature).flatMap(([mechanismId, references]) =>
  references.map((reference) => ({ id: mechanismId, ...reference })),
);

export const literatureMechanismsByConcept: Record<string, string[]> = {
  "episodic-memory": ["episodic-memory"], "semantic-memory": ["semantic-memory"], "memory-retrieval": ["memory-retrieval"],
  "synaptic-plasticity": ["synaptic-plasticity"], stdp: ["stdp"], "brier-calibration": ["brier-calibration"],
  "vector-memory": ["memory-retrieval"], cortex: ["neuron-model", "memory-retrieval"], "attention": ["neuron-model"],
  "morphogenesis": ["swarm"], "dynamic-organizations": ["swarm"], "swarm-intelligence": ["swarm"], stigmergy: ["stigmergy"],
  "web-foraging": ["foraging"], niches: ["foraging"], biome: ["foraging"], "evolution-selection": ["selection"],
  mutation: ["selection"], populations: ["selection"], "natural-creative-ecology": ["selection"],
  sensorium: ["embodied-control"], foveation: ["embodied-control"], "animal-control-primitives": ["embodied-control"],
  agow: ["neuron-model"], "predictive-system": ["brier-calibration"], beliefs: ["brier-calibration"], biocenose: ["brier-calibration"],
  "memory-fossilization": ["episodic-memory"], "procedural-memory": ["episodic-memory"],
};

export function referencesForConcept(slug: string) {
  return (literatureMechanismsByConcept[slug] ?? []).flatMap((mechanismId) =>
    (mechanismLiterature[mechanismId] ?? []).map((reference) => ({ ...reference, mechanismId })),
  );
}
