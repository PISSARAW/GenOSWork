export type PrimaryReference = {
  authors: string;
  year: number;
  title: string;
  venue: string;
  url: string;
  mechanism: string;
  relevance: string;
  kind?: "research" | "technical";
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
  "ecosystem": [{ authors: "Arthur G. Tansley", year: 1935, title: "The Use and Abuse of Vegetational Concepts and Terms", venue: "Ecology 16(3), 284–307", url: "https://doi.org/10.2307/1930070", mechanism: "Ecosystem as organisms and physical factors in interaction", relevance: "Introduces the ecosystem as an ecological system. The GenOS biome analogy is a software allocation model, not an ecological measurement." }],
  "ecological-niche": [{ authors: "G. Evelyn Hutchinson", year: 1957, title: "Concluding Remarks", venue: "Cold Spring Harbor Symposia on Quantitative Biology 22, 415–427", url: "https://doi.org/10.1101/SQB.1957.022.01.039", mechanism: "Multidimensional ecological niche", relevance: "Formalizes the niche as conditions under which a population can persist. A worker's task niche is a constrained software role, not a species habitat." }],
  "metapopulation": [{ authors: "Richard Levins", year: 1969, title: "Some Demographic and Genetic Consequences of Environmental Heterogeneity for Biological Control", venue: "Bulletin of the Entomological Society of America 15(3), 237–240", url: "https://doi.org/10.1093/besa/15.3.237", mechanism: "Colonization and extinction among habitat patches", relevance: "Original metapopulation model. GenOS regional groups borrow the population-of-populations structure without reproducing ecological rates." }],
  "stigmergy": [{ authors: "Pierre-Paul Grassé", year: 1959, title: "La reconstruction du nid et les coordinations interindividuelles chez Bellicositermes natalensis et Cubitermes sp. La théorie de la stigmergie : essai d'interprétation du comportement des termites constructeurs", venue: "Insectes Sociaux 6, 41–80", url: "https://doi.org/10.1007/BF02223791", mechanism: "Stigmergic coordination through environmental traces", relevance: "Introduces stigmergy in the study of termite nest reconstruction; shared software traces are a design analogy, not evidence of biological equivalence." }],
  "swarm": [{ authors: "Craig W. Reynolds", year: 1987, title: "Flocks, herds, and schools: A distributed behavioral model", venue: "Computer Graphics 21(4), 25–34", url: "https://doi.org/10.1145/37401.37406", mechanism: "Local rules yielding group motion", relevance: "Presents a computational flocking model. It supports discussion of local coordination rules, not a general claim that a multi-agent system is intelligent or robust." }],
  "selection": [{ authors: "John Maynard Smith and George R. Price", year: 1973, title: "The logic of animal conflict", venue: "Nature 246, 15–18", url: "https://doi.org/10.1038/246015a0", mechanism: "Evolutionarily stable strategies", relevance: "Formalizes strategic stability in evolutionary conflict. It does not prescribe a fair or safe software selection policy." }],
  "embodied-control": [{ authors: "Rodney A. Brooks", year: 1991, title: "Intelligence without representation", venue: "Artificial Intelligence 47(1–3), 139–159", url: "https://doi.org/10.1016/0004-3702(91)90053-M", mechanism: "Layered perception–action control", relevance: "Describes a robot control architecture grounded in direct perception and action. It is a robotics design precedent, not evidence for agent cognition or consciousness." }],
  epigenetics: [{ authors: "David L. Nanney", year: 1958, title: "Epigenetic Control Systems", venue: "Proceedings of the National Academy of Sciences 44(7), 712–717", url: "https://doi.org/10.1073/pnas.44.7.712", mechanism: "Cellular epigenetic regulation", relevance: "Frames epigenetic control as regulation distinct from genetic sequence. GenOS contextual configuration is only an analogy and does not implement molecular regulation." }],
  "genetic-structure": [{ authors: "James D. Watson and Francis H. C. Crick", year: 1953, title: "Molecular Structure of Nucleic Acids: A Structure for Deoxyribose Nucleic Acid", venue: "Nature 171, 737–738", url: "https://doi.org/10.1038/171737a0", mechanism: "DNA structure and complementary pairing", relevance: "Reports a structural model for DNA and suggests a copying mechanism. GenOS genome files are software artifacts, not molecular sequences." }],
  "distributed-ordering": [{ authors: "Leslie Lamport", year: 1978, title: "Time, Clocks, and the Ordering of Events in a Distributed System", venue: "Communications of the ACM 21(7), 558–565", url: "https://doi.org/10.1145/359545.359563", mechanism: "Causal ordering in distributed systems", relevance: "Defines a partial order of events and logical clocks. A published run without event timestamps cannot be reconstructed into a causal timeline from this result alone." }],
  "byzantine-agreement": [{ authors: "Leslie Lamport, Robert Shostak, and Marshall Pease", year: 1982, title: "The Byzantine Generals Problem", venue: "ACM Transactions on Programming Languages and Systems 4(3), 382–401", url: "https://www.microsoft.com/en-us/research/publication/byzantine-generals-problem/", mechanism: "Agreement despite faulty participants", relevance: "Formalizes agreement under specified faulty-participant assumptions. A voting topology does not inherit Byzantine fault tolerance unless its protocol meets those assumptions." }],
  "program-correctness": [{ authors: "C. A. R. Hoare", year: 1969, title: "An axiomatic basis for computer programming", venue: "Communications of the ACM 12(10), 576–580", url: "https://doi.org/10.1145/363235.363259", mechanism: "Hoare logic and program assertions", relevance: "Sets out axiomatic reasoning about program correctness. A checked property is only as relevant as its specification and assumptions." }],
  security: [{ authors: "Jerome H. Saltzer and Michael D. Schroeder", year: 1975, title: "The protection of information in computer systems", venue: "Proceedings of the IEEE 63(9), 1278–1308", url: "https://doi.org/10.1109/PROC.1975.9939", mechanism: "Protection principles and access control", relevance: "Analyzes design principles for protecting information in computer systems. It is foundational guidance, not an audit of this site's runtime boundary." }],
  "fault-tolerance": [{ authors: "Algirdas Avižienis", year: 1967, title: "Design of fault-tolerant computers", venue: "AFIPS Fall Joint Computer Conference, 733–743", url: "https://doi.org/10.1145/1465611.1465708", mechanism: "Detection and containment of computer faults", relevance: "Original fault-tolerance design work. It motivates software failure analysis but does not validate a GenOS pathology label." }],
  "information-channel": [{ authors: "Claude E. Shannon", year: 1948, title: "A mathematical theory of communication", venue: "Bell System Technical Journal 27, 379–423 and 623–656", url: "https://doi.org/10.1002/j.1538-7305.1948.tb00917.x", mechanism: "Messages, channels and noise", relevance: "Foundational communication model; GenOS messages require their own delivery and authorization evidence." }],
  "distributed-snapshot": [{ authors: "K. Mani Chandy and Leslie Lamport", year: 1985, title: "Distributed snapshots: determining global states of distributed systems", venue: "ACM Transactions on Computer Systems 3(1), 63–75", url: "https://doi.org/10.1145/214451.214456", mechanism: "Consistent distributed state capture", relevance: "Describes a snapshot algorithm under explicit assumptions; it does not prove a GenOS snapshot covers external effects." }],
  "biological-morphogenesis": [{ authors: "Alan M. Turing", year: 1952, title: "The chemical basis of morphogenesis", venue: "Philosophical Transactions of the Royal Society B 237, 37–72", url: "https://doi.org/10.1098/rstb.1952.0012", mechanism: "Reaction and diffusion as a pattern-forming model", relevance: "A primary mathematical biology model. GenOS graph composition borrows the concept of constrained form generation, not reaction–diffusion dynamics." }],
  "biological-homeostasis": [{ authors: "Walter B. Cannon", year: 1932, title: "The wisdom of the body", venue: "Kegan Paul, Trench, Trubner (London edition)", url: "https://wellcomecollection.org/works/avvwjxg6", mechanism: "Physiological regulation and homeostasis", relevance: "Original synthesis of homeostatic regulation; software feedback guards are an analogy, not physiology." }],
  "biological-dormancy": [{ authors: "David Keilin", year: 1959, title: "The problem of anabiosis or latent life: history and current concept", venue: "Proceedings of the Royal Society B", url: "https://doi.org/10.1098/rspb.1959.0013", mechanism: "Dormancy and latent life", relevance: "Biological basis for the cryptobiosis analogy; a persisted software process is not latent life." }],
  "mobile-genetic-elements": [{ authors: "Barbara McClintock", year: 1950, title: "The origin and behavior of mutable loci in maize", venue: "Proceedings of the National Academy of Sciences 36(6), 344–355", url: "https://doi.org/10.1073/pnas.36.6.344", mechanism: "Mobile genetic elements and mutable loci", relevance: "Primary biological observations for mobile hereditary elements; transferable software packages are a design analogy." }],
  "cancer-clonal-evolution": [{ authors: "Peter C. Nowell", year: 1976, title: "The clonal evolution of tumor cell populations", venue: "Science 194(4260), 23–28", url: "https://doi.org/10.1126/science.959840", mechanism: "Clonal variation and selection in tumors", relevance: "Biological model of tumor progression; uncontrolled software growth is only a metaphor." }],
  "source-control": [{ authors: "Marc J. Rochkind", year: 1975, title: "The source code control system", venue: "IEEE Transactions on Software Engineering SE-1(4), 364–370", url: "https://doi.org/10.1109/TSE.1975.6312866", mechanism: "Versioned source history", relevance: "Original source-control design, used here to contextualize versioned agent state rather than certify replay fidelity." }],
  "transaction-model": [{ authors: "Jim Gray", year: 1981, title: "The transaction concept: virtues and limitations", venue: "VLDB 1981, 144–154", url: "https://www.cs.utexas.edu/~dahlin/Classes/GradOS/papers/Gray81.pdf", mechanism: "Atomic transactions and their limits", relevance: "Primary database research; a GenOS SQLite integration must still state its own transaction and recovery boundaries." }],
  "sqlite-architecture": [{ authors: "SQLite project", year: 2026, title: "Architecture of SQLite", venue: "SQLite primary technical documentation", url: "https://www.sqlite.org/arch.html", mechanism: "SQLite compiler, virtual machine, B-tree and pager", relevance: "Primary implementation documentation for the specific engine; it is a technical source rather than a scientific experiment.", kind: "technical" }],
  "experimental-design": [{ authors: "Ronald A. Fisher", year: 1935, title: "The design of experiments", venue: "Oliver and Boyd", url: "https://books.google.com/books?id=-EsNAQAAIAAJ", mechanism: "Controlled comparison, randomization and replication", relevance: "Original experimental-design treatment; GenOS comparisons need matched inputs and a declared measurement protocol." }],
  "gettier-problem": [{ authors: "Edmund L. Gettier", year: 1963, title: "Is justified true belief knowledge?", venue: "Analysis 23(6), 121–123", url: "https://doi.org/10.1093/analys/23.6.121", mechanism: "Counterexamples to justified true belief", relevance: "Original philosophical counterexamples. They motivate keeping truth, support and provenance separate; they are not a software test of knowledge." }],
  "procedural-skill": [{ authors: "John R. Anderson", year: 1982, title: "Acquisition of cognitive skill", venue: "Psychological Review 89(4), 369–406", url: "https://doi.org/10.1037/0033-295X.89.4.369", mechanism: "Declarative-to-procedural skill model", relevance: "Primary cognitive model of skill acquisition. A stored GenOS procedure is not evidence of human-like skill learning." }],
  "conscious-workspace": [{ authors: "Stanislas Dehaene and Lionel Naccache", year: 2001, title: "Towards a cognitive neuroscience of consciousness: basic evidence and a workspace framework", venue: "Cognition 79(1–2), 1–37", url: "https://doi.org/10.1016/S0010-0277(00)00123-2", mechanism: "Neuronal workspace hypothesis and functional indicators", relevance: "A primary theoretical and empirical synthesis. It does not establish consciousness in a software workspace." }],
  "clonal-selection": [{ authors: "Frank Macfarlane Burnet", year: 1957, title: "A modification of Jerne's theory of antibody production using the concept of clonal selection", venue: "Australian Journal of Science 20, 67–69; original paper reprinted in Nature Immunology", url: "https://www.nature.com/articles/ni1007-1019", mechanism: "Clonal selection in adaptive immunity", relevance: "Biological basis for adaptive recognition and memory; GenOS threat policies do not implement lymphocyte selection." }],
};

export const primaryMechanismReferences = Object.entries(mechanismLiterature).flatMap(([mechanismId, references]) =>
  references.map((reference) => ({ id: mechanismId, ...reference })),
);

export const mechanismLabelsFr: Record<string, string> = {
  "episodic-memory": "mémoire épisodique",
  "semantic-memory": "catégorisation et récupération sémantiques",
  "memory-retrieval": "mémoire associative",
  "synaptic-plasticity": "plasticité synaptique",
  stdp: "plasticité dépendante du temps des impulsions",
  "brier-calibration": "évaluation des prévisions probabilistes",
  "neuron-model": "modèle logique du neurone",
  foraging: "recherche optimale de ressources",
  ecosystem: "interactions au sein d'un écosystème",
  "ecological-niche": "niche écologique multidimensionnelle",
  metapopulation: "colonisation et extinction entre populations locales",
  stigmergy: "coordination par traces environnementales",
  swarm: "coordination locale d'un groupe",
  selection: "stabilité et sélection évolutives",
  "embodied-control": "contrôle perception-action",
  epigenetics: "régulation épigénétique",
  "genetic-structure": "structure et copie de l'ADN",
  "distributed-ordering": "ordre causal dans les systèmes distribués",
  "byzantine-agreement": "accord en présence de participants fautifs",
  "program-correctness": "preuve de correction des programmes",
  security: "principes de protection des systèmes",
  "fault-tolerance": "tolérance aux défaillances",
  "information-channel": "communication et bruit dans un canal",
  "distributed-snapshot": "capture cohérente d'un état distribué",
  "biological-morphogenesis": "formation biologique des motifs",
  "biological-homeostasis": "régulation homéostatique",
  "biological-dormancy": "dormance biologique",
  "mobile-genetic-elements": "éléments génétiques mobiles",
  "cancer-clonal-evolution": "évolution clonale des tumeurs",
  "source-control": "historique versionné du code source",
  "transaction-model": "transactions de bases de données",
  "sqlite-architecture": "architecture du moteur SQLite",
  "experimental-design": "planification d'expériences contrôlées",
  "gettier-problem": "contre-exemples de Gettier",
  "procedural-skill": "acquisition des habiletés procédurales",
  "conscious-workspace": "hypothèse de l'espace de travail conscient",
  "clonal-selection": "sélection clonale immunitaire",
};

export const literatureMechanismsByConcept: Record<string, string[]> = {
  "episodic-memory": ["episodic-memory"], "semantic-memory": ["semantic-memory"], "memory-retrieval": ["memory-retrieval"],
  "synaptic-plasticity": ["synaptic-plasticity"], stdp: ["stdp"], "brier-calibration": ["brier-calibration"],
  "vector-memory": ["memory-retrieval"], cortex: ["neuron-model", "memory-retrieval"], "attention": ["neuron-model"],
  "morphogenesis": ["swarm"], "dynamic-organizations": ["swarm", "byzantine-agreement"], "swarm-intelligence": ["swarm"], stigmergy: ["stigmergy"],
  "web-foraging": ["foraging"], niches: ["ecological-niche"], biome: ["ecosystem", "foraging"], "evolution-selection": ["selection"],
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

const additionalMechanismsByConcept: Record<string, string[]> = {
  maladies: ["fault-tolerance"], memoire: ["episodic-memory"], ontogenese: ["distributed-snapshot"], ontologie: ["program-correctness"],
  phenotype: ["genetic-structure"], instinct: ["embodied-control"], reproduction: ["genetic-structure"], "speciation-graft": ["selection"],
  gvx: ["experimental-design"], "self-model": ["program-correctness"], "theory-of-self": ["program-correctness"], "natural-search-control-plane": ["experimental-design"],
  "consciousness-taxonomy": ["conscious-workspace"], "functional-indicators": ["experimental-design"],
  epistemics: ["gettier-problem"], claims: ["experimental-design"], evidence: ["experimental-design"], contradictions: ["program-correctness"], provenance: ["distributed-ordering"], gettier: ["gettier-problem"], knowledge: ["gettier-problem"],
  morphogenesis: ["biological-morphogenesis"], "epistemic-meristem": ["biological-morphogenesis"], "unblocking-spiral": ["experimental-design"], "counterexample-cambium": ["program-correctness"], chronotaxis: ["distributed-ordering"], "risk-ledger": ["experimental-design"],
  "worker-kinds": ["program-correctness"], "resident-daemons": ["fault-tolerance"], "relational-physiology": ["byzantine-agreement"], "g-cir": ["program-correctness"], "mission-continuity": ["distributed-snapshot"], "agent-git": ["source-control"], "procedural-memory": ["procedural-skill"],
  trinity: ["experimental-design"], "a-team": ["program-correctness"], holobionte: ["biological-homeostasis"], rhizome: ["stigmergy"], metapopulation: ["metapopulation"],
  plasmids: ["mobile-genetic-elements"], "horizontal-transfer": ["mobile-genetic-elements"], cryptobiosis: ["biological-dormancy"], metabolism: ["biological-homeostasis"], homeostasis: ["biological-homeostasis"], resilience: ["fault-tolerance"], development: ["biological-morphogenesis"], symbionts: ["biological-homeostasis"], "animal-senses": ["embodied-control"],
  "adaptive-epistemic-immunity": ["clonal-selection", "fault-tolerance"], "immune-system": ["clonal-selection", "fault-tolerance"], nosology: ["fault-tolerance"], pathologies: ["fault-tolerance"], autoimmune: ["clonal-selection", "fault-tolerance"], degenerative: ["fault-tolerance"], infectious: ["fault-tolerance"], "genetic-pathology": ["fault-tolerance"], cancerous: ["cancer-clonal-evolution"], "metabolic-pathology": ["biological-homeostasis"], cardiovascular: ["biological-homeostasis"], psychiatric: ["fault-tolerance"], "environmental-pathology": ["fault-tolerance"],
  "mathematical-organism": ["biological-morphogenesis"], "smt-solver": ["program-correctness"], sqlite: ["sqlite-architecture", "transaction-model"], persistence: ["transaction-model"], "model-routing": ["experimental-design"], snapshots: ["distributed-snapshot"],
};

const fallbackMechanismByFamily: Record<string, string> = {
  "identity-development": "genetic-structure", "cognition-control": "neuron-model", "knowledge-evidence": "experimental-design",
  "memory-learning": "episodic-memory", "collective-intelligence": "information-channel", orchestration: "experimental-design",
  "evolution-ecology": "selection", "physiology-perception": "embodied-control", "immunity-medicine": "fault-tolerance",
  "formal-verification": "program-correctness", "runtime-infrastructure": "security",
};

export function mechanismIdsForConcept(slug: string, familyId?: string) {
  const ids = [...(literatureMechanismsByConcept[slug] ?? []), ...(additionalMechanismsByConcept[slug] ?? [])];
  if (ids.length === 0 && familyId && fallbackMechanismByFamily[familyId]) ids.push(fallbackMechanismByFamily[familyId]);
  return [...new Set(ids)];
}

export function referencesForConcept(slug: string, familyId?: string) {
  return mechanismIdsForConcept(slug, familyId).flatMap((mechanismId) =>
    (mechanismLiterature[mechanismId] ?? []).map((reference) => ({ ...reference, mechanismId })),
  );
}
