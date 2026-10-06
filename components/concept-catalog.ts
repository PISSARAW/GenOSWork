export type ConceptFamily = {
  id: string;
  name: string;
  description: string;
};

export type ImplementationState = "conceptual" | "proposed" | "partial" | "experimental" | "implemented" | "unassessed";
export type IntegrationState = "isolated" | "callable" | "wired" | "end-to-end" | "unassessed";
export type EvidenceState = "none" | "unit-tested" | "integration-tested" | "end-to-end-tested" | "reported-run" | "test-failing" | "benchmark-protocol" | "benchmarked" | "replicated" | "unassessed";

export type ConceptCatalogEntry = {
  slug: string;
  title: string;
  familyId: string;
  intro: string;
  source: string;
  biologyInspired: boolean;
  hasMathematics: boolean;
  hasSimulation: boolean;
  hasBenchmark: boolean;
  related: string[];
};

export const conceptFamilies: ConceptFamily[] = [
  { id: "identity-development", name: "Identity & Development", description: "What an agent inherits, how it is shaped, and how a project continues between missions." },
  { id: "cognition-control", name: "Cognition & Control", description: "Candidate workspaces, prediction, attention, and bounded control loops." },
  { id: "knowledge-evidence", name: "Knowledge & Evidence", description: "Claims, sources, uncertainty, contradiction, and calibrated judgment." },
  { id: "memory-learning", name: "Memory & Learning", description: "How episodes, knowledge, procedures, and learned changes are retained and retrieved." },
  { id: "collective-intelligence", name: "Collective Intelligence", description: "The runtime components and communication patterns that let agents coordinate." },
  { id: "orchestration", name: "Orchestration", description: "The eight GenOS topologies and the structures they use to organize work." },
  { id: "evolution-ecology", name: "Evolution & Ecology", description: "Variation, selection, transfer, populations, niches, and recovery across agent groups." },
  { id: "physiology-perception", name: "Physiology & Perception", description: "Resource regulation, sensing, foraging, and other bounded runtime processes." },
  { id: "immunity-medicine", name: "Immunity & Medicine", description: "Threat response, pathology models, and the limits of computational health metaphors." },
  { id: "formal-verification", name: "Formal Verification", description: "Deterministic procedures, proof artifacts, solvers, and verification boundaries." },
  { id: "runtime-infrastructure", name: "Runtime & Infrastructure", description: "State, execution boundaries, integrations, authority, and observability." },
];

type Row = [slug: string, title: string, intro: string, source?: string, related?: string[], biology?: boolean, mathematics?: boolean, simulation?: boolean, benchmark?: boolean];

const familyRows: Record<string, { source: string; rows: Row[] }> = {
  "identity-development": {
    source: "genome-et-epigenetique.md",
    rows: [
      ["genome", "Genome", "A versioned software model of inherited traits and constraints; it is not biological DNA and does not by itself instantiate a running agent.", undefined, ["epigenetics", "agent-dna", "phenotype"], true, true],
      ["epigenetics", "Epigenetics", "A software policy for expressing modeled traits in context; it is an analogy, not biochemical marking or biological inheritance.", undefined, ["genome", "phenotype"], true, true],
      ["agent-dna", "AgentDNA", "A versioned binary data format for agent identity and runtime traits; editing it does not by itself start or clone a process.", "agent-dna-runtime.md", ["genome", "phenotype"]],
      ["phenotype", "Phenotype", "The observable runtime profile produced by identity, constraints, and environment.", "biologie-computationnelle.md", ["genome", "epigenetics", "instinct"], true],
      ["instinct", "Instinct", "Bounded innate response patterns that can be selected or modulated by runtime context.", "instinct.md", ["phenotype", "homeostasis"], true],
      ["reproduction", "Reproduction", "Rust reproduction operations transform genome and cell models under inheritance rules; worker startup is separate, while MCP biomimicry handlers record simulations.", "../02-orchestration/reproduction-et-replication.md", ["genome", "plasmids", "phenotype"], true],
      ["speciation-graft", "Speciation & grafting", "A documented path for proposing a new capability or agent lineage and evaluating it before promotion.", "speciation-graft-autonome.md", ["genome", "evolution-selection", "evidence"], true],
    ],
  },
  "cognition-control": {
    source: "../02-orchestration/agow.md",
    rows: [
      ["agow", "AGOW", "An active workspace where candidate frames compete and selected content can be broadcast under policy.", undefined, ["gvx", "attention", "episodic-memory", "evidence"], true, true, false, true],
      ["gvx", "GVX", "A verified development loop that isolates changes, observes outcomes, and uses evidence to govern maturity.", "../02-orchestration/adaptateurs-gvx-runtime.md", ["agow", "counterfactual-workspaces", "proof-artifact"], true, true, false, true],
      ["self-model", "Self-model", "A bounded model of agent identity and continuity used for analysis, not a claim of subjective experience.", "../02-orchestration/theorie-du-soi-orchestrator.md", ["theory-of-self", "genome", "episodic-memory"]],
      ["theory-of-self", "Theory of self", "Runtime models that describe agent identity, continuity, and change without asserting subjective experience.", "../02-orchestration/theorie-du-soi-orchestrator.md", ["genome", "ontogenese", "episodic-memory"]],
      ["predictive-system", "Predictive system", "A multi-scale prediction model that relates observations, hypotheses, and expected outcomes.", "../02-orchestration/systeme-predictif-multi-echelles.md", ["agow", "evidence", "natural-search-control-plane"], false, true],
      ["natural-search-control-plane", "Natural Search Control Plane", "A control model for bounded search using pressure, causal progress, hypotheses, and explicit control.", "natural-search-control-plane.md", ["gvx", "evidence", "mutation"], true, true],
      ["attention", "Attention & salience", "Selection and prioritization signals used to direct limited agent work toward relevant inputs.", "../02-orchestration/agow.md", ["agow", "sensorium", "metabolism"], true, true],
      ["consciousness-taxonomy", "Mind and consciousness taxonomy", "A vocabulary for discussing computational indicators while separating them from claims of subjective experience.", "conscience-esprit-mental.md", ["theory-of-self", "functional-indicators"]],
      ["functional-indicators", "Functional indicators", "Observable indicators used for bounded analysis; they do not establish subjective consciousness.", "indicateurs-fonctionnels.md", ["consciousness-taxonomy", "evidence"], false, true],
    ],
  },
  "knowledge-evidence": {
    source: "epistemologie-et-evidence.md",
    rows: [
      ["epistemics", "Epistemics", "The runtime vocabulary and procedures for representing what is known, uncertain, or contested.", undefined, ["beliefs", "claims", "evidence", "provenance"], false, true],
      ["beliefs", "Beliefs", "Versioned propositions with confidence, provenance, and revision history.", "savoir-et-epistemologie.md", ["claims", "evidence", "contradictions", "brier-calibration"], false, true],
      ["claims", "Claims", "Explicit statements that can be supported, challenged, scoped, and linked to evidence.", undefined, ["evidence", "provenance", "contradictions"]],
      ["evidence", "Evidence", "Artifacts and observations used to support or reject a claim under a stated decision rule.", undefined, ["claims", "provenance", "proof-artifact"], false, true],
      ["contradictions", "Contradictions", "Conflicting claims or observations preserved for review instead of silently collapsed.", "savoir-et-epistemologie.md", ["beliefs", "claims", "brier-calibration"]],
      ["provenance", "Provenance", "Source and lineage information attached to evidence, findings, and decisions.", undefined, ["evidence", "agent-git", "counterfactual-workspaces"]],
      ["brier-calibration", "Brier calibration", "A scoring method for comparing probabilistic forecasts with resolved outcomes.", "savoir-et-epistemologie.md", ["beliefs", "biocenose", "evidence"], false, true],
      ["gettier", "Gettier problems", "A model for examining why a justified belief can still fail to count as knowledge.", "savoir-et-epistemologie.md", ["beliefs", "evidence", "provenance"], false, true],
      ["knowledge", "Knowledge", "A structured representation of sources, claims, inference, and uncertainty.", "savoir-et-epistemologie.md", ["epistemics", "beliefs", "evidence", "provenance"]],
      ["genos-philosophy", "GenOS Philosophy", "A canonical registry with 375 bounded executable audits over eleven shared primitives, linked to Ontogenesis verification without granting promotion authority.", "../03-reference/contrats-philosophiques-ontogenese.md", ["epistemics", "beliefs", "evidence", "provenance", "governance", "ontogenese"]],
    ],
  },
  "memory-learning": {
    source: "memoire-et-apprentissage.md",
    rows: [
      ["episodic-memory", "Episodic memory", "Records of contextualized events, actions, observations, and outcomes.", undefined, ["semantic-memory", "agent-git", "provenance"], true],
      ["semantic-memory", "Semantic memory", "Indexed facts and relationships retrieved to supply context to a mission.", undefined, ["episodic-memory", "vector-memory", "provenance"], false, true],
      ["vector-memory", "Vector memory", "A similarity-search representation used to retrieve related items from an embedding index.", undefined, ["semantic-memory", "episodic-memory"]],
      ["procedural-memory", "Procedural memory", "Reusable instructions or action sequences represented as runtime knowledge.", undefined, ["episodic-memory", "instinct", "workflows"]],
      ["synaptic-plasticity", "Synaptic plasticity", "A bounded update of selected associations or weights based on observed signals.", "neurobiologie-et-plasticite.md", ["stdp", "episodic-memory", "natural-search-control-plane"], true, true],
      ["stdp", "STDP", "Spike-timing-dependent plasticity as a computationally bounded timing-based update rule.", "neurobiologie-et-plasticite.md", ["synaptic-plasticity", "memory-fossilization"], true, true],
      ["memory-fossilization", "Fossilization", "Terminal archival of a lineage or experience while preserving its historical record.", "fossilisation.md", ["episodic-memory", "agent-git", "evolution-selection"], true],
      ["memory-retrieval", "Memory retrieval", "A ranked selection of stored items that can inform, but cannot prove, a current decision.", undefined, ["episodic-memory", "semantic-memory", "evidence"], false, true],
    ],
  },
  "collective-intelligence": {
    source: "../02-orchestration/README.md",
    rows: [
      ["morphogenesis", "Morphogenesis", "A runtime for composing bounded executable graphs from topology and control operators.", "../02-orchestration/noyau-controle-morphogenetique.md", ["trinity", "a-team", "worker-kinds", "evidence"], true, true, true],
      ["epistemic-meristem", "Epistemic meristem", "Tracks verified coverage gaps and revalidates them before proposing growth.", "../02-orchestration/meristeme-epistemique.md", ["morphogenesis", "evidence", "rhizome"]],
      ["unblocking-spiral", "Unblocking spiral", "Changes method and scope through a bounded, evidence-gated response to a repeated blockage.", "../02-orchestration/spirale-de-deblocage.md", ["morphogenesis", "evidence"]],
      ["counterexample-cambium", "Counterexample cambium", "Stores counterexamples and gates their reuse in later work.", "../02-orchestration/cambium-contre-exemples.md", ["morphogenesis", "evidence", "memory-retrieval"]],
      ["chronotaxis", "Aperiodic chronotaxis", "Persists observation schedules and receipts to expose missed temporal windows.", "../02-orchestration/chronotaxie-aperiodique.md", ["morphogenesis", "observability"]],
      ["risk-ledger", "Contracted statistical risk", "Accounts for a bounded promotion-risk budget before opt-in statistical promotion.", "../02-orchestration/infini-sous-contrat.md", ["morphogenesis", "evidence", "trinity"]],
      ["dynamic-organizations", "Dynamic organizations", "Nineteen declared organization patterns with deterministic step algorithms and varying maturity.", "../02-orchestration/topologies-et-capacites.md", ["swarm-intelligence", "stigmergy", "a-team"], true, true],
      ["worker-kinds", "Worker kinds", "A catalog of runtime worker types selected against role and method capability requirements.", "../03-reference/types-de-workers.md", ["resident-daemons", "a-team", "identity-authority"]],
      ["resident-daemons", "Resident daemons", "Long-lived project services that observe state and may propose or carry out bounded work under policy.", "../03-reference/types-de-daemons.md", ["ontogenese", "worker-kinds", "observability"]],
      ["agent-relationships", "Agent relationships", "Declared and measured links that shape coordination, routing, or communication between agents.", "../02-orchestration/relations-inter-agents.md", ["communication-ecology", "rhizome", "stigmergy"]],
      ["relational-physiology", "Relational physiology", "A bounded kernel for relation constraints, provenance independence, authority and admitted routing across 29 relation types.", "../02-orchestration/physiologie-relationnelle.md", ["agent-relationships", "communication-ecology", "evidence"]],
      ["communication-ecology", "Communication ecology", "Signals and channels that let agents coordinate through bounded, typed communication patterns.", "../02-orchestration/communication.md", ["agent-relationships", "signal-plane", "worker-kinds"]],
      ["signal-plane", "Zero-text signal plane", "Persisted signals and deliveries, inbox/ACK, leased handler retries and bounded cognitive escalation.", "../01-concepts/signal-plane-zero-text.md", ["communication-ecology", "agent-relationships", "g-cir"]],
      ["g-cir", "G-CIR", "A residual cognitive contract that keeps versioned obligations, refusals and per-invocation visibility explicit.", "../02-orchestration/g-cir.md", ["signal-plane", "evidence", "provenance"]],
      ["mission-continuity", "Mission continuity", "Durable mission ownership, completion checks, dormancy, wake-up and guarded regeneration across process restarts.", "../02-orchestration/continuite-mission-organisme.md", ["ontogenese", "resident-daemons", "evidence"]],
      ["agent-git", "AgentGit", "Versioned agent state and lineage operations such as commit, branch, diff, replay, and merge.", "../02-orchestration/git-agents.md", ["counterfactual-workspaces", "provenance", "episodic-memory"]],
      ["counterfactual-workspaces", "Counterfactual workspaces", "Isolated workspaces used to compare alternative changes before any result is promoted.", "../02-orchestration/workspaces-contrefactuel.md", ["agent-git", "gvx", "evidence"], false, true, false],
    ],
  },
  orchestration: {
    source: "../02-orchestration/topologies-et-capacites.md",
    rows: [
      ["trinity", "Trinity", "Three candidate worlds are compared through a declared evidence barrier before a candidate is retained or promoted.", "../02-orchestration/topologies/trinity.md", ["evidence", "counterfactual-workspaces", "morphogenesis"], false, true, true],
      ["a-team", "A-Team", "Specialists coordinate work through dependencies, explicit handoffs, and integration of their deliverables.", "../02-orchestration/topologies/a-team.md", ["worker-kinds", "workflows", "morphogenesis"], false, true, true],
      ["biocenose", "Biocenosis", "A community evaluates proposals through evidence, explicit ballots, and policy-bound aggregation.", "../02-orchestration/topologies/biocenose.md", ["beliefs", "brier-calibration", "evidence"], true, true, true],
      ["holobionte", "Holobiont", "A host composes specialist symbionts under capability, resource, lifecycle, and execution contracts.", "../02-orchestration/topologies/holobionte.md", ["symbionts", "immune-system", "metabolism"], true, true, true],
      ["syncytium", "Syncytium", "Members coordinate around shared, versioned state with merge operations and invariant checks.", "../02-orchestration/topologies/syncytium.md", ["shared-state", "evidence", "morphogenesis"], true, true, true],
      ["rhizome", "Rhizome", "A persisted capability graph with callable bounded multi-hop routing, local traces, and evidence-gated growth services.", "../02-orchestration/topologies/rhizome.md", ["agent-relationships", "stigmergy", "worker-kinds"], true, true, true],
      ["metapopulation", "Metapopulation", "Semi-independent demes exchange typed propagules over directed corridors, with receiver validation, verified migration cycles, and gated recolonization.", "../02-orchestration/topologies/metapopulation.md", ["populations", "evolution-selection", "resilience"], true, true, true],
      ["biome", "Biome", "Eleven variants share a bounded transactional ecology loop with persistent niches, measured resource use, authorized adapters and independent verification gates.", "../02-orchestration/topologies/biome.md", ["niches", "metabolism", "web-foraging"], true, true, true],
    ],
  },
  "evolution-ecology": {
    source: "genome-et-epigenetique.md",
    rows: [
      ["mutation", "Mutation", "Rust operations change genome data models; MCP biomimicry mutation handlers update scenario registries and do not change an active agent’s AgentDNA.", undefined, ["genome", "evolution-selection", "agent-dna"], true, true],
      ["evolution-selection", "Selection", "A policy for comparing candidates and retaining outcomes under explicit criteria.", "../02-orchestration/reproduction-et-replication.md", ["mutation", "reproduction", "trinity"], true, true],
      ["plasmids", "Plasmids", "Transferable capability packages that can be acquired, checked, and applied under runtime rules.", "../adr/0108-cycle-de-vie-plasmidique.md", ["horizontal-transfer", "genome", "symbionts"], true],
      ["horizontal-transfer", "Horizontal transfer", "A governed transfer of capabilities or artifacts between agent lineages.", "../adr/0108-cycle-de-vie-plasmidique.md", ["plasmids", "reproduction", "evidence"], true],
      ["swarm-intelligence", "Swarm intelligence", "Local coordination and optimization patterns implemented as bounded organization steps.", "intelligence-de-nuee.md", ["stigmergy", "dynamic-organizations", "populations"], true, true],
      ["stigmergy", "Stigmergy", "Coordination through traces deposited in a shared environment and read by later work.", "intelligence-de-nuee.md", ["rhizome", "swarm-intelligence", "communication-ecology"], true, true],
      ["niches", "Niches", "Declared regions of a search or work environment associated with resources and specialized capabilities.", "natural-creative-ecology.md", ["biome", "populations", "web-foraging"], true],
      ["populations", "Populations", "Groups of agents or candidate solutions whose composition can change under explicit policies.", "intelligence-de-nuee.md", ["metapopulation", "evolution-selection", "mutation"], true, true],
      ["cryptobiosis", "Cryptobiosis & dormancy", "A bounded suspended state that preserves continuity until an explicit resume condition is met.", "continuite-mission.md", ["ontogenese", "resilience", "episodic-memory"], true],
      ["natural-creative-ecology", "Natural creative ecology", "A model of open-ended search through recombination, exploration, plasticity, and selection.", "natural-creative-ecology.md", ["mutation", "evolution-selection", "memory-fossilization"], true, true],
    ],
  },
  "physiology-perception": {
    source: "organes-vitaux-agents.md",
    rows: [
      ["sensorium", "Sensorium", "Runtime structures for observations and perception signals, with boundaries between simulated and real inputs.", undefined, ["web-foraging", "foveation", "animal-senses"], true],
      ["metabolism", "Metabolism", "Resource accounting and allocation rules that constrain the work an agent can perform.", "../adr/0055-plan-metabolique-ressources-holobionte.md", ["biome", "homeostasis", "attention"], true, true],
      ["homeostasis", "Homeostasis & allostasis", "Target regulation and anticipatory adjustment under changing conditions and declared bounds.", "../adr/0065-homeostasie-environnement-hote.md", ["metabolism", "resilience", "instinct"], true, true],
      ["resilience", "Resilience & recovery", "Recovery planning and bounded continuation after a failure, loss, or interruption.", "../04-exploitation/resilience-et-reprise.md", ["metapopulation", "cryptobiosis", "ontogenese"], true],
      ["development", "Development", "A staged process for changing an agent or project while retaining lineage, constraints, and evidence.", "ontogenese.md", ["genome", "gvx", "ontogenese"], true],
      ["symbionts", "Symbionts", "Specialist services composed by a host under explicit capability and execution contracts.", "../adr/0079-daemons-symbiontes-residents.md", ["holobionte", "resident-daemons", "plasmids"], true],
      ["web-foraging", "Web foraging", "A resource-selection calculation for web exploration; it is not by itself a continuous browser controller.", "biomimetisme/web-foraging.md", ["sensorium", "foveation", "biome"], true, true],
      ["foveation", "Foveation", "A process for selecting a region of an observation for higher-resolution inspection.", "biomimetisme/sens-animaux.md", ["sensorium", "web-foraging", "animal-control-primitives"], true],
      ["animal-senses", "Animal senses", "A catalog of sensory mechanisms used as constrained design analogies for runtime perception.", "biomimetisme/sens-animaux.md", ["sensorium", "foveation"], true],
      ["animal-control-primitives", "Animal control primitives", "Bounded control patterns inspired by animal behavior and translated into software operations.", "biomimetisme/primitives-controle-animal.md", ["instinct", "sensorium", "homeostasis"], true],
    ],
  },
  "immunity-medicine": {
    source: "adaptive-epistemic-immune-system.md",
    rows: [
      ["adaptive-epistemic-immunity", "Adaptive epistemic immune system", "A threat-response model for checking claims and evidence while preserving authority and provenance boundaries.", undefined, ["immune-system", "evidence", "biocenose"], true, true],
      ["immune-system", "Immune system", "A set of threat detection and containment mechanisms; no absolute immunity is implied.", "adaptive-epistemic-immune-system.md", ["adaptive-epistemic-immunity", "pathologies", "holobionte"], true],
      ["nosology", "Nosology", "A classification of runtime pathologies used to describe failure patterns and possible responses.", "nosologie/pathologie-et-medecine.md", ["pathologies", "adaptive-epistemic-immunity"]],
      ["pathologies", "Computational pathologies", "A model of degraded or unsafe runtime states, not a medical diagnosis of people.", "nosologie/vue-ensemble.md", ["nosology", "immune-system", "evidence"]],
      ["autoimmune", "Autoimmune failure", "A pathology category for safeguards that overreact to legitimate runtime behavior.", "nosologie/01-auto-immunes.md", ["pathologies", "immune-system"]],
      ["degenerative", "Degenerative failure", "A pathology category for progressive loss of runtime capability or state quality.", "nosologie/02-degeneratives.md", ["pathologies", "resilience"]],
      ["infectious", "Infectious failure", "A pathology category for unwanted propagation across agents, workspaces, or state boundaries.", "nosologie/03-infectieuses.md", ["pathologies", "immune-system", "sandbox"]],
      ["genetic-pathology", "Genetic failure", "A pathology category for harmful inherited or encoded agent traits.", "nosologie/04-genetiques.md", ["pathologies", "genome", "agent-dna"]],
      ["cancerous", "Cancer-like failure", "A pathology category for uncontrolled growth or replication in a runtime model.", "nosologie/05-cancers.md", ["pathologies", "reproduction", "governance"]],
      ["metabolic-pathology", "Metabolic failure", "A pathology category for unsustainable resource use or allocation.", "nosologie/06-metaboliques.md", ["pathologies", "metabolism", "biome"]],
      ["cardiovascular", "Cardiovascular failure", "A pathology category for disrupted flows or communication in a runtime model.", "nosologie/07-cardiovasculaires.md", ["pathologies", "communication-ecology"]],
      ["psychiatric", "Psychiatric failure", "A pathology category for modeled behavioral instability; it is not a claim about human mental illness.", "nosologie/08-psychiatriques.md", ["pathologies", "self-model"]],
      ["environmental-pathology", "Environmental failure", "A pathology category for harmful interactions between a runtime and its operating environment.", "nosologie/09-environnementales.md", ["pathologies", "sensorium", "resilience"]],
    ],
  },
  "formal-verification": {
    source: "mathematical-organism.md",
    rows: [
      ["lean-verification", "Lean verification", "A verification path that submits formal proof artifacts to a Lean kernel.", "../03-reference/contrat-produit-et-completude.md", ["proof-artifact", "verification-registry", "smt-solver"], false, true],
      ["proof-artifact", "ProofArtifact", "A structured artifact that binds a formal claim, proof material, and verification result.", "../03-reference/contrat-produit-et-completude.md", ["lean-verification", "evidence", "verification-registry"], false, true],
      ["deterministic-verification", "Deterministic verification", "A repeatable check whose result depends on declared inputs and a bounded verifier.", "../03-reference/contrat-produit-et-completude.md", ["proof-artifact", "deterministic-procedures", "evidence"], false, true],
      ["mathematical-organism", "Mathematical organism", "A formal model of an agent system expressed through explicit mathematical structures and limits.", undefined, ["lean-verification", "deterministic-procedures", "evidence"], false, true],
      ["verification-registry", "Verification registry", "A registry of available verification contracts and their declared evidence requirements.", "../03-reference/contrat-produit-et-completude.md", ["proof-artifact", "evidence", "governance"], false, true],
      ["smt-solver", "SMT solver layer", "A solver integration surface whose maturity and runtime status must be checked against its implementation record.", "../03-reference/contrat-produit-et-completude.md", ["lean-verification", "deterministic-verification"] , false, true],
      ["deterministic-procedures", "Deterministic procedures", "Bounded procedures whose declared inputs and rules make their results reproducible.", "../02-orchestration/primitives-executables.md", ["deterministic-verification", "workflows", "proof-artifact"], false, true],
    ],
  },
  "runtime-infrastructure": {
    source: "runtime-agentique.md",
    rows: [
      ["snapshots", "Snapshots", "Versioned captures of runtime or agent state that can support restoration and comparison.", "../02-orchestration/git-agents.md", ["agent-git", "counterfactual-workspaces", "provenance"]],
      ["vfs", "Virtual filesystem", "A bounded filesystem interface used to scope access to project and runtime files.", "../05-securite-gouvernance/sandbox-execution-code.md", ["sandbox", "counterfactual-workspaces", "identity-authority"]],
      ["sqlite", "SQLite persistence", "The local relational storage layer used by runtime services that persist sessions and operational state.", "../04-exploitation/deploiement.md", ["persistence", "snapshots", "syncytium"]],
      ["persistence", "Persistence", "Storage and rehydration mechanisms that preserve selected runtime state across calls or restarts.", "../02-orchestration/topologies-et-capacites.md", ["snapshots", "memory-retrieval", "syncytium"]],
      ["shared-state", "Shared state", "Versioned data that multiple members can read or update under an explicit consistency policy.", "../02-orchestration/topologies/syncytium.md", ["syncytium", "persistence", "evidence"], false, true],
      ["model-routing", "Model routing", "Selection and dispatch rules for available inference providers and execution profiles.", "../03-reference/contrat-produit-et-completude.md", ["governance", "identity-authority"]],
      ["mcp", "MCP interfaces", "Tool interfaces exposed through the Model Context Protocol with declared contracts and permissions.", "../03-reference/outils-mcp.md", ["identity-authority", "sandbox", "governance"]],
      ["sandbox", "Sandbox", "An execution boundary intended to constrain filesystem, process, or tool effects.", "../05-securite-gouvernance/sandbox-execution-code.md", ["vfs", "mcp", "governance"]],
      ["observability", "Observability", "Events and state views used to inspect runtime behavior and its evidence trail.", "../04-exploitation/observabilite.md", ["resident-daemons", "provenance", "evidence"]],
      ["identity-authority", "Identity & authority", "Identity, role, and permission rules that constrain which actors may perform runtime operations.", "../02-orchestration/topologies-et-capacites.md", ["governance", "mcp", "sandbox"]],
      ["governance", "Governance", "Approval, policy, and audit mechanisms that bound execution and promotion decisions.", "../05-securite-gouvernance/README.md", ["identity-authority", "evidence", "immune-system"]],
      ["workflows", "Workflows & jobs", "Persisted task graphs and jobs that coordinate execution, dependencies, and lifecycle events.", "../02-orchestration/workflows-et-jobs.md", ["a-team", "ontogenese", "worker-kinds"]],
    ],
  },
};

export const catalogConcepts: ConceptCatalogEntry[] = Object.entries(familyRows).flatMap(([familyId, group]) =>
  group.rows.map(([slug, title, intro, source, related = [], biology = false, hasMathematics = false, hasSimulation = false, hasBenchmark = false]) => {
    const rawSource = source ?? group.source;
    const normalizedSource = rawSource.replace(/^\.\.\//, "");
    const sourcePath = /^(0[1-8]-|adr\/)/.test(normalizedSource) ? normalizedSource : `01-concepts/${normalizedSource}`;
    return {
      slug,
      title,
      familyId,
      intro,
      source: sourcePath,
      biologyInspired: biology,
      hasMathematics,
      hasSimulation,
      hasBenchmark,
      related,
    };
  }),
);
