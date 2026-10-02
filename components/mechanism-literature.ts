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
  epigenetics: [{ authors: "David L. Nanney", year: 1958, title: "Epigenetic Control Systems", venue: "Proceedings of the National Academy of Sciences 44(7), 712–717", url: "https://doi.org/10.1073/pnas.44.7.712", mechanism: "Cellular epigenetic regulation", relevance: "Frames epigenetic control as regulation distinct from genetic sequence. GenOS contextual configuration is only an analogy and does not implement molecular regulation." }],
  "genetic-structure": [{ authors: "James D. Watson and Francis H. C. Crick", year: 1953, title: "Molecular Structure of Nucleic Acids: A Structure for Deoxyribose Nucleic Acid", venue: "Nature 171, 737–738", url: "https://doi.org/10.1038/171737a0", mechanism: "DNA structure and complementary pairing", relevance: "Reports a structural model for DNA and suggests a copying mechanism. GenOS genome files are software artifacts, not molecular sequences." }],
  "distributed-ordering": [{ authors: "Leslie Lamport", year: 1978, title: "Time, Clocks, and the Ordering of Events in a Distributed System", venue: "Communications of the ACM 21(7), 558–565", url: "https://doi.org/10.1145/359545.359563", mechanism: "Causal ordering in distributed systems", relevance: "Defines a partial order of events and logical clocks. A published run without event timestamps cannot be reconstructed into a causal timeline from this result alone." }],
  "byzantine-agreement": [{ authors: "Leslie Lamport, Robert Shostak, and Marshall Pease", year: 1982, title: "The Byzantine Generals Problem", venue: "ACM Transactions on Programming Languages and Systems 4(3), 382–401", url: "https://www.microsoft.com/en-us/research/publication/byzantine-generals-problem/", mechanism: "Agreement despite faulty participants", relevance: "Formalizes agreement under specified faulty-participant assumptions. A voting topology does not inherit Byzantine fault tolerance unless its protocol meets those assumptions." }],
  "program-correctness": [{ authors: "C. A. R. Hoare", year: 1969, title: "An axiomatic basis for computer programming", venue: "Communications of the ACM 12(10), 576–580", url: "https://doi.org/10.1145/363235.363259", mechanism: "Hoare logic and program assertions", relevance: "Sets out axiomatic reasoning about program correctness. A checked property is only as relevant as its specification and assumptions." }],
  security: [{ authors: "Jerome H. Saltzer and Michael D. Schroeder", year: 1975, title: "The protection of information in computer systems", venue: "Proceedings of the IEEE 63(9), 1278–1308", url: "https://doi.org/10.1109/PROC.1975.9939", mechanism: "Protection principles and access control", relevance: "Analyzes design principles for protecting information in computer systems. It is foundational guidance, not an audit of this site's runtime boundary." }],
};

export const primaryMechanismReferences = Object.entries(mechanismLiterature).flatMap(([mechanismId, references]) =>
  references.map((reference) => ({ id: mechanismId, ...reference })),
);

export const literatureMechanismsByConcept: Record<string, string[]> = {
  "episodic-memory": ["episodic-memory"], "semantic-memory": ["semantic-memory"], "memory-retrieval": ["memory-retrieval"],
  "synaptic-plasticity": ["synaptic-plasticity"], stdp: ["stdp"], "brier-calibration": ["brier-calibration"],
  "vector-memory": ["memory-retrieval"], cortex: ["neuron-model", "memory-retrieval"], "attention": ["neuron-model"],
  "morphogenesis": ["swarm"], "dynamic-organizations": ["swarm", "byzantine-agreement"], "swarm-intelligence": ["swarm"], stigmergy: ["stigmergy"],
  "web-foraging": ["foraging"], niches: ["foraging"], biome: ["foraging"], "evolution-selection": ["selection"],
  mutation: ["selection"], populations: ["selection"], "natural-creative-ecology": ["selection"],
  sensorium: ["embodied-control"], foveation: ["embodied-control"], "animal-control-primitives": ["embodied-control"],
  agow: ["neuron-model"], "predictive-system": ["brier-calibration"], beliefs: ["brier-calibration"], biocenose: ["brier-calibration", "byzantine-agreement"],
  "memory-fossilization": ["episodic-memory"], "procedural-memory": ["episodic-memory"],
  epigenetics: ["epigenetics"], genome: ["genetic-structure"], "agent-dna": ["genetic-structure"],
  "communication-ecology": ["distributed-ordering"], "signal-plane": ["distributed-ordering"],
  "agent-relationships": ["distributed-ordering"], "agent-git": ["distributed-ordering"], "counterfactual-workspaces": ["distributed-ordering"],
  "shared-state": ["distributed-ordering"], syncytium: ["distributed-ordering"], observability: ["distributed-ordering"], snapshots: ["distributed-ordering"],
  "proof-artifact": ["program-correctness"], "lean-verification": ["program-correctness"], "deterministic-verification": ["program-correctness"],
  "deterministic-procedures": ["program-correctness"], "verification-registry": ["program-correctness"], workflows: ["program-correctness"],
  sandbox: ["security"], vfs: ["security"], governance: ["security"], "identity-authority": ["security"], mcp: ["security"],
};

export function referencesForConcept(slug: string) {
  return (literatureMechanismsByConcept[slug] ?? []).flatMap((mechanismId) =>
    (mechanismLiterature[mechanismId] ?? []).map((reference) => ({ ...reference, mechanismId })),
  );
}
