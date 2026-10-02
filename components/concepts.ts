import { catalogConcepts, type EvidenceState, type ImplementationState, type IntegrationState } from "@/components/concept-catalog";
import { literatureMechanismsByConcept } from "@/components/mechanism-literature";

export type ConceptSlug = string;
export type ConceptDiagram = "clinical" | "memory" | "cortex" | "ontogenesis" | "ontology";
export type ScientificReference = { label: string; href: string; scope: string };

export type Concept = {
  slug: ConceptSlug;
  number: string;
  title: string;
  eyebrow: string;
  intro: string;
  status: string;
  statusTone: "green" | "amber" | "purple";
  diagram?: ConceptDiagram;
  diagramTitle: string;
  diagramDescription: string;
  steps: { title: string; body: string }[];
  scopeTitle: string;
  scope: string;
  source: string;
  sourceLabel: string;
  familyId?: string;
  implementation?: ImplementationState;
  integration?: IntegrationState;
  evidence?: EvidenceState;
  statusNote?: string;
  biologyInspired?: boolean;
  hasMathematics?: boolean;
  hasSimulation?: boolean;
  hasBenchmark?: boolean;
  related?: string[];
  scienceBasis?: string;
  mathModel?: string;
  codeSources?: string[];
  scientificReferences?: ScientificReference[];
  failureModes?: string[];
  useCases?: string[];
  literatureMechanisms?: string[];
};

export const conceptModelBySlug: Record<string, string> = {
  agow: "agow", attention: "agow", genome: "genome", epigenetics: "genome", "agent-dna": "agent-dna",
  evidence: "evidence", beliefs: "evidence", claims: "evidence", contradictions: "evidence", provenance: "evidence",
  memoire: "memory", "episodic-memory": "memory", "semantic-memory": "memory", "procedural-memory": "memory",
  maladies: "immunity", "immune-system": "immunity", "adaptive-epistemic-immunity": "immunity", pathologies: "immunity",
  "lean-verification": "lean", "proof-artifact": "lean", "deterministic-verification": "lean",
  "brier-calibration": "brier", stdp: "stdp",
};

const authoredConcepts: Concept[] = [
  {
    slug: "maladies", number: "01", title: "Failure modes", eyebrow: "COMPUTATIONAL PATHOLOGY",
    intro: "GenOS models potential failures in an agent system: excessive alerts, cross-workspace contamination, unintended intervention effects, or degraded performance.",
    status: "Clinical model · partially connected", statusTone: "amber", diagram: "clinical",
    diagramTitle: "Monitor, isolate, reassess",
    diagramDescription: "A monitor collects signals, an evaluator classifies the issue, a bounded measure is applied, and the resulting state is checked.",
    steps: [
      { title: "Observe", body: "Track the simulated clinical state, budgets, alerts, and propagation signals." },
      { title: "Classify", body: "Classify the failure as autoimmune, nosocomial, iatrogenic, or degenerative." },
      { title: "Contain", body: "Depending on the case, isolate a workspace, reduce an alert, or correct an excessive intervention." },
      { title: "Verify", body: "Measure the new state and decide whether to reintegrate, take another action, or stop." },
    ],
    scopeTitle: "A software analogy, not a medical tool",
    scope: "These “diseases” describe simulated agent states and their governance mechanisms. They are not human diseases, and GenOS does not diagnose or treat people. The documentation notes that only some primitives and effects are connected; the other scenarios remain proposals.",
    source: "01-concepts/nosologie/pathologie-et-medecine.md", sourceLabel: "Computational pathology and medicine",
  },
  {
    slug: "memoire", number: "02", title: "Memory", eyebrow: "EXPERIENCE · RETRIEVAL · CONSOLIDATION",
    intro: "GenOS memory helps retrieve useful experiences, connect decisions, and avoid known dead ends. It combines detailed episodes with indexed facts and provenance signals.",
    status: "Implemented · multiple mechanisms", statusTone: "green", diagram: "memory",
    diagramTitle: "From experience to retrieval",
    diagramDescription: "Experiences and knowledge are indexed, ranked by relevance, and recalled to inform a mission. Consolidation and pruning cycles maintain the corpus.",
    steps: [
      { title: "Encode", body: "Episodic memory preserves the context, action, observation, and outcome of an experience." },
      { title: "Index", body: "Facts and decisions can be found through lexical and vector search." },
      { title: "Rank", body: "Retrieval combines similarity, lexical match, recency, credibility, and success or failure signals." },
      { title: "Consolidate", body: "Plasticity adjusts some links; consolidation and pruning limit low-value memories." },
    ],
    scopeTitle: "Retrieval is a selection, not proof",
    scope: "Memory can inform a decision, but recalling an item does not make it true. GenOS preserves provenance and distinguishes experience, retrieval score, and independent verification.",
    source: "01-concepts/memoire-et-apprentissage.md", sourceLabel: "Memory and learning",
  },
  {
    slug: "cortex", number: "03", title: "Cortex", eyebrow: "AN ARCHITECTURAL METAPHOR",
    intro: "In GenOS, “cortex” describes some retrieval and association functions. It does not mean a unified artificial brain: these mechanisms are distributed across indexes, memories, agents, and controllers.",
    status: "Documented analogy · explicit limits", statusTone: "purple", diagram: "cortex",
    diagramTitle: "A distributed retrieval function",
    diagramDescription: "A request searches episodic and semantic memories; ranking prepares recalled context for an agent, whose output is then checked.",
    steps: [
      { title: "Receive a request", body: "A mission or question provides the search context." },
      { title: "Search memories", body: "Lexical and vector indexes find related episodes, facts, and decisions." },
      { title: "Assemble context", body: "Ranked results are provided to the agent with their provenance." },
      { title: "Check the output", body: "The agent produces a response or action that remains subject to its own verification requirements." },
    ],
    scopeTitle: "Not a simulation of the human brain",
    scope: "The documentation presents cortex, hippocampus, and synapse imagery as design analogies. They do not establish neurobiological equivalence, perception, or subjective experience. Semantic search is a software retrieval function.",
    source: "01-concepts/memoire-et-apprentissage.md", sourceLabel: "Semantic memory and the cortex analogy",
  },
  {
    slug: "ontogenese", number: "04", title: "Ontogenesis", eyebrow: "PROJECT CONTINUITY",
    intro: "Ontogenesis is the resident controller that follows a project between missions: it selects a task, starts a bounded run, examines evidence, and coordinates integration or resumption.",
    status: "Partial · loop and states connected", statusTone: "amber", diagram: "ontogenesis",
    diagramTitle: "A loop of verified missions",
    diagramDescription: "The project plans, executes, verifies, and integrates a mission. Failure returns to planning; a constraint can put the loop on hold.",
    steps: [
      { title: "Plan", body: "Choose an eligible backlog task based on dependencies, priorities, and budgets." },
      { title: "Execute", body: "Delegate a bounded mission to the GenOS runtime and preserve its state." },
      { title: "Verify", body: "Examine the evidence; without enough evidence, return the mission to planning." },
      { title: "Integrate and reassess", body: "Integrate an accepted result, record failures, and choose what to do next or wait for an event." },
    ],
    scopeTitle: "The controller is not a living organism",
    scope: "The development analogy describes a project moving through software states and resource constraints. The documentation marks Ontogenesis as partial: the loop, selection policies, and persistence mechanisms exist, but transparent recovery for every scenario is not guaranteed.",
    source: "01-concepts/ontogenese.md", sourceLabel: "Ontogenesis: resident project controller",
  },
  {
    slug: "ontologie", number: "05", title: "Ontology", eyebrow: "ENTITIES · RELATIONS · POSSIBLE WORLDS",
    intro: "The operational ontology provides structures for describing entities, identity criteria, relationships, and hypothetical scenarios. It supports analysis without deciding on its own what should be executed.",
    status: "Bounded analysis · non-executing", statusTone: "purple", diagram: "ontology",
    diagramTitle: "Describe before acting",
    diagramDescription: "Entities and properties structure a question; relationships or possible worlds can be analyzed with provenance and uncertainty without triggering an action.",
    steps: [
      { title: "Define", body: "Describe an entity with explicit properties and identity criteria." },
      { title: "Connect", body: "Record a relationship or continuity observation between entities." },
      { title: "Explore", body: "Build and compare possible worlds with stated assumptions." },
      { title: "Qualify", body: "Present the analysis with provenance and uncertainty; hypothetical worlds remain unverified." },
    ],
    scopeTitle: "Analysis does not validate reality",
    scope: "Ontology operations describe or compare hypothetical structures. They do not grant authorization, promote a result, or prove that a scenario occurred in the real world.",
    source: "03-reference/ontologie-operationnelle.md", sourceLabel: "Operational ontology contract",
  },
];

const authoredMetadata: Record<string, Partial<Concept>> = {
  maladies: { familyId: "immunity-medicine", implementation: "partial", integration: "isolated", evidence: "unassessed", statusNote: "The source describes a clinical runtime model and marks its connected effects as partial.", related: ["nosology", "immune-system", "evidence"], biologyInspired: true },
  memoire: { familyId: "memory-learning", implementation: "partial", integration: "wired", evidence: "unit-tested", statusNote: "Several retrieval and memory mechanisms are present; this status does not mean every memory type is integrated end to end.", related: ["episodic-memory", "semantic-memory", "vector-memory", "synaptic-plasticity"], biologyInspired: true, hasMathematics: true },
  cortex: { familyId: "cognition-control", implementation: "conceptual", integration: "isolated", evidence: "none", statusNote: "Cortex is a documented architectural analogy, not a unified runtime organ.", related: ["agow", "semantic-memory", "theory-of-self"], biologyInspired: true },
  ontogenese: { familyId: "identity-development", implementation: "partial", integration: "wired", evidence: "unit-tested", statusNote: "The resident loop and persistence mechanisms exist; recovery is not guaranteed for every scenario.", related: ["workflows", "resident-daemons", "counterfactual-workspaces"], biologyInspired: true },
  ontologie: { familyId: "knowledge-evidence", implementation: "partial", integration: "callable", evidence: "unit-tested", statusNote: "Bounded ontology services are callable; they do not prove that a described entity or scenario exists.", related: ["knowledge", "beliefs", "evidence"], hasMathematics: true },
};

const conceptDossiers: Record<string, Partial<Concept>> = {
  "brier-calibration": {
    scienceBasis: "Brier introduced the squared-probability error for verifying probabilistic forecasts. It scores forecast quality against resolved outcomes; it does not tell whether an unrevealed claim is true.",
    mathModel: "For N binary forecasts: BS = (1/N) Σᵢ (pᵢ − oᵢ)², where pᵢ ∈ [0,1] is the forecast and oᵢ ∈ {0,1} is the resolved outcome. Lower is better only for the same outcome definition and comparable forecast population.",
    useCases: ["Compare calibrated forecasts after outcomes are resolved.", "Inspect whether a consensus policy improves probabilistic forecasts over a stated baseline."],
    failureModes: ["Scoring forecasts before outcomes resolve invents labels.", "Changing the event definition or population makes scores incomparable.", "A lower aggregate score can hide subgroup miscalibration."],
    codeSources: ["backend/src/services/epistemic/epistemicEcologicalSelectionService.js", "backend/src/services/epistemic/epistemicBiocenoseService.js"],
    scientificReferences: [{ label: "Brier (1950), Verification of Forecasts Expressed in Terms of Probability", href: "https://doi.org/10.1175/1520-0493(1950)078%3C0001:VOFEIT%3E2.0.CO;2", scope: "Original forecast verification score; the paper does not validate GenOS." }],
    hasMathematics: true,
  },
  syncytium: {
    scienceBasis: "CRDT theory establishes convergence for specified replicated data types under stated delivery and merge assumptions. GenOS's Syncytium page is an architecture and runtime profile; a CRDT primitive alone does not establish end-to-end concurrent correctness.",
    mathModel: "State-based convergence requires a join-semilattice merge (associative, commutative, idempotent) and eventual delivery of updates. Application invariants still need separate validation.",
    useCases: ["Evaluate shared-state work where replicas may accept concurrent operations.", "Reject a merged state that violates an application-level invariant."],
    failureModes: ["Unsupported operations may not converge.", "Eventual delivery and replica assumptions can be violated.", "Convergence does not imply business invariants or correct decisions."],
    codeSources: ["crates/genos-cli/src/commands/syncytium_crdt/crdt.rs", "backend/src/services/syncytiumCrdtService.js", "backend/src/services/syncytiumCoordinationService.js"],
    scientificReferences: [{ label: "Shapiro et al. (2011), A Comprehensive Study of Convergent and Commutative Replicated Data Types", href: "https://inria.hal.science/inria-00555588/document", scope: "CRDT models and convergence conditions; not a test of the GenOS integration." }],
    hasMathematics: true,
  },
  stdp: {
    scienceBasis: "Bi and Poo report timing-dependent synaptic modification in cultured hippocampal neurons and discuss dependencies on synaptic strength and postsynaptic cell type. GenOS's software update primitive is an analogy; it is not a neural simulation.",
    mathModel: "A common pair-based illustration is Δw = A₊e^(−Δt/τ₊) for Δt > 0 and Δw = −A₋e^(Δt/τ₋) for Δt < 0, where Δt is post-spike minus pre-spike time. This simplified rule is not a universal law and is not asserted to be the exact GenOS update implementation.",
    useCases: ["Explore how event order and a learning window change a bounded association update.", "Compare a proposed plasticity rule against a fixed-weight baseline in a controlled task."],
    failureModes: ["The sign convention for Δt must be declared.", "A simplified pair rule omits cell type, state, and biological context.", "A computed software weight update is not evidence of biological learning."],
    codeSources: ["backend/src/services/primitiveHandlers/memoryStdp.js"],
    scientificReferences: [{ label: "Bi & Poo (1998), Synaptic Modifications in Cultured Hippocampal Neurons", href: "https://doi.org/10.1523/JNEUROSCI.18-24-10464.1998", scope: "Experimental findings in cultured neurons; not a validation of GenOS's abstraction." }],
    hasMathematics: true,
  },
  epistemics: {
    scienceBasis: "This entry groups procedures for representing claims, uncertainty, provenance, and evidence. The cited GenOS contract explicitly keeps declared evidence and system verification separate; no single philosophical theory is treated as implemented.",
    mathModel: "A claim record can be represented as (statement, scope, sources, uncertainty, status). The record is structured data, not a truth function: evaluation depends on a separately declared rule and its evidence inputs.",
    useCases: ["Keep a claim's scope, sources, and uncertainty visible during review.", "Preserve conflicting observations for later adjudication instead of silently overwriting them."],
    failureModes: ["Declared evidence may be irrelevant or invalid.", "Confidence is not truth, and provenance alone does not establish correctness.", "Consensus can preserve a shared error."],
    codeSources: ["backend/src/services/epistemic/epistemicEcologicalSelectionService.js", "docs/01-concepts/epistemologie-et-evidence.md"],
  },
  agow: {
    scienceBasis: "AGOW is a workspace and attention architecture. Terms such as ignition and broadcast are design vocabulary; they do not demonstrate global neural workspace equivalence or subjective experience.",
    mathModel: "No single normalized AGOW equation is registered here. The interactive model is an explicitly illustrative threshold model; its output is not a runtime measurement.",
    useCases: ["Prioritize candidate observations within a bounded workspace.", "Inspect which evidence is broadcast to later work and retain its source."],
    failureModes: ["A threshold can suppress low-salience but critical evidence.", "Correlated salience signals can reinforce a shared blind spot.", "Broadcast is not proof or a claim of consciousness."],
    codeSources: ["backend/src/services/agow/agowRuntimeIngressService.js", "backend/src/services/agow/attentionCreditService.js"],
    hasSimulation: true,
  },
};

const scientificProfiles: Record<string, Pick<Concept, "scienceBasis" | "mathModel">> = {
  "episodic-memory": { scienceBasis: "Human episodic memory concerns personally experienced events situated in time and context. GenOS stores machine-readable event records; that shared vocabulary does not imply recollection, autobiographical consciousness, or the encoding and consolidation biology of a human hippocampus.", mathModel: "A record can be represented as e = (context, action, observation, outcome, provenance). Retrieval ranks candidate records against a query q; the ranking is an engineering policy, not a model of human remembering." },
  "semantic-memory": { scienceBasis: "Semantic memory is commonly distinguished from memory for specific episodes. This entry concerns indexed propositions and relationships. Its storage and retrieval behavior must be assessed as an information system, not inferred from the cognitive label.", mathModel: "Represent a fact as (subject, relation, object, scope, source). Query ranking may combine lexical match, vector similarity, recency, and source quality; weights and normalization must be reported by the implementation." },
  "vector-memory": { scienceBasis: "Vector search retrieves items by proximity in an embedding space. That is a learned geometric representation, not a biological memory mechanism; semantic similarity can return related but incorrect records.", mathModel: "For normalized vectors x and q, cosine similarity is s(x,q)=x·q. Top-k retrieval returns the k greatest scores; a similarity score alone is not truth confidence or evidence strength." },
  "memory-retrieval": { scienceBasis: "Associative retrieval can find a stored item from partial cues. Neural content-addressable memory is one historical mechanism reference; GenOS search indexes and ranking are software services with different substrates and failure modes.", mathModel: "Given query q and records E, rank e by S(e,q)=wᵀφ(e,q), where φ contains declared signals. Retrieval returns candidates; verification remains a separate operation." },
  "synaptic-plasticity": { scienceBasis: "Biological synapses change under activity and biochemical conditions. GenOS uses the term for bounded updates to software associations; the analogy does not establish biological fidelity or demonstrate learning quality without controlled evaluation.", mathModel: "A simple bounded update can be written w′=clip(w+η·δ, w_min, w_max), with learning rate η and observed signal δ. The update rule, signal provenance, and evaluation set determine its meaning." },
  stdp: { scienceBasis: "Experiments on hippocampal neurons report changes that depend on the relative timing of pre- and postsynaptic spikes. A software timing rule is a chosen approximation and requires its own stability and outcome tests.", mathModel: "A common pair-based form is Δw=A₊e^(−Δt/τ₊) for Δt>0 and Δw=−A₋e^(Δt/τ₋) for Δt<0. Parameters and sign convention must be stated; this equation is not evidence that GenOS implements it." },
  "brier-calibration": { scienceBasis: "The Brier score was introduced to verify probabilistic weather forecasts. It evaluates forecasts against resolved outcomes; small samples, changing base rates, and selective resolution can make a score misleading.", mathModel: "For binary outcomes yᵢ∈{0,1} and forecasts pᵢ, BS=N⁻¹Σᵢ(pᵢ−yᵢ)². Lower is better on the same evaluation set, but calibration and discrimination are distinct properties." },
  cortex: { scienceBasis: "Cortex is a software architecture metaphor for distributed retrieval and association functions. It does not imply a unified artificial brain, cortical organization, perception, or subjective experience.", mathModel: "The site uses a retrieval pipeline: request → indexed candidates → rank → context assembly → output checks. This is a sequence of software transformations; no neural field equation is implied." },
  agow: { scienceBasis: "AGOW is a software workspace in which candidate representations may be evaluated and selected under explicit policy. Neuronal threshold models provide historical context for formal abstractions, not evidence that AGOW reproduces brain-wide cognition.", mathModel: "For candidate c, selection can be expressed as argmax_c U(c) subject to admissibility constraints A(c)=true and resource budget B(c)≤B_max. The objective and gates are policy inputs, not universal laws." },
  attention: { scienceBasis: "Attention research studies selective processing under limited capacity. A runtime priority score is a resource-allocation signal and should not be conflated with human attention or its neural mechanisms.", mathModel: "A scheduler may rank item i by priority pᵢ=α·relevanceᵢ+β·urgencyᵢ+γ·uncertaintyᵢ, then apply hard permission and budget constraints. Coefficients require task-specific evaluation." },
  "predictive-system": { scienceBasis: "Prediction compares expectations with later observations. Forecast scoring supplies a measurable evaluation method, but predictive-processing theories do not automatically describe this runtime implementation.", mathModel: "For forecast p and binary outcome y, use Brier loss (p−y)²; for general probabilistic predictions, use a declared proper scoring rule and retain calibration data and resolved labels." },
  "swarm-intelligence": { scienceBasis: "Distributed agents can produce group patterns through local interaction rules. Such patterns depend on the communication graph, update schedule, environment, and boundary conditions; collective behavior alone does not establish intelligence or robustness.", mathModel: "A basic consensus update is xᵢ(t+1)=Σⱼ aᵢⱼxⱼ(t), where weights aᵢⱼ are nonnegative and sum to one. Convergence requires graph and update assumptions that must be checked for the actual system." },
  stigmergy: { scienceBasis: "Stigmergy describes coordination mediated by modifications to a shared environment, first studied in termite nest construction. Software traces offer an analogy; correctness depends on access, freshness, attribution, and conflict handling.", mathModel: "A trace field can be modeled as τₓ(t+1)=(1−ρ)τₓ(t)+Δₓ(t), with evaporation rate ρ and deposited signal Δ. This is a candidate design equation, not a claim about every stigmergic system." },
  "web-foraging": { scienceBasis: "The marginal value theorem models when an idealized forager should leave a resource patch as returns diminish. A web-search policy may borrow the decision structure, but web information quality and cost need separate measurements.", mathModel: "Leave a patch when its marginal gain rate falls to the environment-wide average gain rate, under the theorem's assumptions. A runtime must define gain, travel cost, and stopping budget explicitly." },
  "evolution-selection": { scienceBasis: "Evolutionary game theory studies frequency-dependent strategies and conditions for evolutionary stability. Software candidate selection is governed by chosen objectives and constraints; it is not natural selection and does not guarantee adaptation.", mathModel: "For strategy i with payoff fᵢ(x), replicator dynamics use ẋᵢ=xᵢ(fᵢ(x)−f̄(x)). A software selection pipeline may instead be discrete and policy constrained." },
  mutation: { scienceBasis: "Biological mutation changes heritable sequence through physical processes. GenOS uses the word for constrained changes to traits or artifacts; validation, provenance, and lineage rules are software controls, not biological mutation mechanisms.", mathModel: "A candidate variation can be represented as θ′=θ+ε followed by schema validation and an acceptance predicate. Distribution ε and admissibility rules are implementation choices." },
  populations: { scienceBasis: "Population models track composition and change across groups. Runtime populations are collections of workers or candidate solutions and require explicit membership, sampling, and lifecycle rules.", mathModel: "A population state x=(x₁,…,xₙ) records group proportions or counts. Transition rules x′=T(x, environment, policy) should conserve declared totals or explain additions and removals." },
  "homeostasis": { scienceBasis: "Homeostasis concerns regulation around viable ranges; allostasis describes anticipatory adjustment. Runtime resource guards can borrow feedback-control ideas without constituting a physiological model.", mathModel: "A bounded controller observes error eₜ=r−yₜ and adjusts uₜ subject to u_min≤uₜ≤u_max. Stability depends on the plant, delay, gain, and saturation behavior." },
  metabolism: { scienceBasis: "Biological metabolism comprises coupled biochemical pathways that transform matter and energy. GenOS metabolism denotes resource accounting and allocation; it does not model cellular physiology.", mathModel: "For resource budget B, allocation aᵢ≥0 must satisfy Σᵢaᵢ≤B. Usage, reservations, refunds, and units must be defined by the runtime contract." },
  "lean-verification": { scienceBasis: "A proof assistant checks proof terms against a formal kernel and a declared logic. A successful kernel check establishes a theorem relative to that formalization and trusted implementation; it does not verify informal premises automatically.", mathModel: "The proposition Γ⊢P is accepted only when a proof term inhabits P under context Γ and the kernel's inference rules. The trusted computing base and imported axioms bound the claim." },
  "deterministic-verification": { scienceBasis: "Repeatable checks can support reproducibility when inputs, versions, and environmental assumptions are controlled. Determinism alone does not establish that the check measures the right property.", mathModel: "A verifier V(x,c)→{pass,fail} is reproducible when fixed input x, checker c, and declared version produce the same result. Soundness is a separate property requiring proof or validation." },
  trinity: { scienceBasis: "Comparing isolated candidate worlds is related to controlled comparison and ablation design. A retained candidate is only as credible as the shared task, controls, evaluator, and evidence barrier.", mathModel: "Choose candidate j maximizing measured utility Uⱼ only among candidates satisfying evidence threshold Eⱼ≥τ and budget Cⱼ≤C_max. The threshold and utility should be declared before inspecting outcomes." },
  biocenose: { scienceBasis: "Group judgment can aggregate independent assessments, but correlated errors, incentives, and unequal evidence quality can defeat simple majority rules. A vote is a decision record, not ground truth.", mathModel: "For binary ballots bᵢ∈{0,1}, quorum requires n_valid≥q·n_eligible; acceptance may require Σbᵢ/n_valid≥τ. Independence assumptions and abstentions must be reported." },
  "agent-relationships": { scienceBasis: "Network science distinguishes a system's nodes from its interaction edges. Declared agent links describe possible communication or influence; they do not demonstrate that the links are active or productive.", mathModel: "Represent the organization as G=(V,E), with adjacency Aᵢⱼ encoding permitted or observed links. Keep permission edges separate from observed communication edges." },
  "counterfactual-workspaces": { scienceBasis: "Controlled experiments isolate candidate changes to support comparison. Branch isolation improves attribution, but shared dependencies and evaluator bias can still couple the outcomes.", mathModel: "Compare outcomes Δᵢ=Y(candidateᵢ)−Y(control) under matched inputs and budgets. Causal interpretation requires the control and treatment conditions to differ only in the declared change." },
  genome: { scienceBasis: "A biological genome is an organism's DNA sequence; the GenOS genome is a versioned software specification. The shared term signals inheritance and constraints, not molecular encoding or biological equivalence.", mathModel: "A software genome is a typed configuration G=(traits, constraints, version, provenance). Phenotype generation is an implementation mapping P=f(G, context), whose determinism and allowed overrides should be documented." },
  epigenetics: { scienceBasis: "Epigenetics studies regulation of gene expression and cellular state without changing the underlying DNA sequence. GenOS contextual trait regulation is a design analogy; it does not model biochemical marks or inheritance across cell division.", mathModel: "An expression policy can be written θ_eff=g(θ_inherited, context, policy), with explicit permitted ranges. This formalizes configuration, not epigenetic biology." },
  "mcp": { scienceBasis: "A protocol defines messages and interaction rules between clients and servers. The Model Context Protocol is an interface contract, not a scientific theory of cognition or agency.", mathModel: "A tool call is a typed request/response pair constrained by schema and authorization. Valid schema does not imply safe effect; permission checks and runtime boundaries remain necessary." },
  sandbox: { scienceBasis: "Sandboxing is a security boundary that limits process, filesystem, network, or tool effects. Its strength depends on isolation primitives, configuration, and escape resistance; the label alone is not a security guarantee.", mathModel: "A sandbox policy defines allowed capabilities C and requested effects R; execution should be denied when R⊄C. Resource quotas and teardown are independent controls." },
  "shared-state": { scienceBasis: "Distributed shared state requires rules for visibility, ordering, and conflict resolution. A common data structure does not by itself guarantee consistency or safe concurrent updates.", mathModel: "A versioned update carries (value, version, author). Merge function M must declare behavior for concurrent versions and preserve required invariants." },
  maladies: { scienceBasis: "Computational pathology is a taxonomy of software failure patterns inspired by clinical language. It is not a medical nosology: categories need operational definitions and measurable signals, and must never be used to diagnose people.", mathModel: "A bounded triage policy maps observed signals x to a response class c under explicit thresholds: c=policy(x, scope, confidence). Classification should preserve uncertainty and require verification after an intervention." },
  memoire: { scienceBasis: "The GenOS memory subsystem combines records, indexes, ranking, and maintenance. Neuroscience terms describe design inspiration only; storage and retrieval quality must be evaluated on task-specific data with provenance intact.", mathModel: "A memory item m=(content, scope, provenance, timestamp, outcome). Retrieval returns rank_k({m∈M: scope(m)=scope_q}, S(m,q)); consolidation and pruning are separate policies." },
  ontogenese: { scienceBasis: "The concept borrows from organismal development to describe continuity across software missions. A project controller is a stateful workflow, not a living or self-developing organism.", mathModel: "Model the controller as a finite-state process over {plan, execute, verify, integrate, wait}; transition δ(state,event) is allowed only when the relevant permission, evidence, and budget guards pass." },
  ontologie: { scienceBasis: "Formal ontology studies explicit categories and relations. In this runtime, entity descriptions and possible worlds are bounded data structures; their presence does not establish that a described entity exists in the external world.", mathModel: "Represent a world as W=(E,R,P), with entities E, typed relations R, and propositions P. Comparisons are conditional on declared identity criteria and assumptions." },
  "agent-dna": { scienceBasis: "AgentDNA is a software serialization and identity format. DNA is a naming analogy; the representation has no molecular substrate, genetic code, or biological inheritance.", mathModel: "A valid artifact must satisfy schema S and version v: validate(x,S_v)=true. Migration M_v→v+1 should preserve declared invariants and report fields that cannot be mapped." },
  phenotype: { scienceBasis: "In biology, phenotype refers to observable traits shaped by genotype and environment. The software entry uses it for an effective runtime profile and does not claim organismal development.", mathModel: "Effective profile P=f(G,C,E), where G is inherited configuration, C is permitted contextual regulation, and E is execution environment. The function and override precedence must be explicit." },
  instinct: { scienceBasis: "Instinct is a contested biological term for behavior with innate components. A runtime rule called an instinct is an authored policy and must not be treated as evidence of innate cognition.", mathModel: "A rule maps an admissible trigger x to candidate action a only if guard g(x)=true; policy, authority, and budget filters still decide whether a may execute." },
  reproduction: { scienceBasis: "Biological reproduction includes mechanisms of heredity, variation, and development. Software replication copies or derives artifacts under version and authorization rules; it does not reproduce organisms.", mathModel: "A child artifact c=derive(parent, change, policy) is admissible only if schema-valid, provenance-linked, and authorized. Lineage records should make parent and transformation recoverable." },
  "speciation-graft": { scienceBasis: "Speciation and grafting are evolutionary and horticultural analogies for proposing new software lineages or capabilities. They do not imply reproductive isolation or biological compatibility.", mathModel: "A graft candidate must pass compatibility K(c,h) and evidence threshold E(c) before promotion; failed candidates remain separate from the host lineage." },
  gvx: { scienceBasis: "GVX uses controlled experimentation and staged maturity: isolate a candidate, observe it, evaluate evidence, then decide whether to promote. This is a software assurance workflow, not an evolutionary or neurobiological process.", mathModel: "Promotion requires all declared predicates P_i(x)=true and budget use B≤B_max. Record the candidate, baseline, evaluator, and result so the comparison can be repeated." },
  "self-model": { scienceBasis: "A self-model here is structured data about agent identity, state, and capabilities. It supports system introspection but gives no evidence of subjective self-awareness.", mathModel: "A model state s=(identity, capabilities, current-goals, limits, provenance) is updated by an authorized transition function. Claims about continuity require stable identity rules." },
  "theory-of-self": { scienceBasis: "The term names explicit runtime descriptions of identity and continuity. It is a functional data model, not a theory establishing consciousness or a human-like self.", mathModel: "Continuity can be defined as relation C(s_t,s_t+1) over versioned states, with criteria such as identity key, lineage, and preserved constraints. The criteria are normative choices." },
  "natural-search-control-plane": { scienceBasis: "The control plane combines search monitoring, hypotheses, and explicit stop or continue decisions. This is a proposed engineering control model; biological metaphors do not show it is adaptive or effective.", mathModel: "At step t, choose action a_t from eligible actions by a declared score J(a|state), subject to resource, permission, and stopping constraints. Log predictions before observing outcomes to avoid hindsight bias." },
  "functional-indicators": { scienceBasis: "Operational indicators measure observable capabilities under specified tests. A positive indicator supports only the tested behavior and cannot establish subjective experience.", mathModel: "For test suite T, report indicator I=(passes, trials, conditions, uncertainty). Do not collapse heterogeneous indicators into a single score without a validated model." },
  epistemics: { scienceBasis: "Epistemology studies knowledge, justification, and belief. A runtime epistemic ledger represents claims and support relations; its labels depend on source quality and explicit inference rules.", mathModel: "Represent claim c with support set E_c, provenance π_c, and confidence rule f(E_c,π_c). Keep the rule and uncertainty visible; confidence is not proof." },
  beliefs: { scienceBasis: "Belief revision research studies how a set of accepted propositions changes when new information arrives. A versioned runtime record is an auditable assertion, not a human mental state.", mathModel: "A belief record b=(proposition, confidence, evidence, version). Revision operator * maps (belief state, new evidence) to a new state while preserving stated consistency constraints." },
  claims: { scienceBasis: "A claim is an assessable proposition. Separating claims from their evidence supports review, contradiction handling, and scoped conclusions; a stored claim is not itself a fact.", mathModel: "Use a typed proposition c with scope and predicate. Evaluation returns status(c,E)∈{supported, contradicted, unresolved} under a declared decision rule." },
  evidence: { scienceBasis: "Evidence is interpreted relative to a claim, collection process, and decision rule. Artifacts can be incomplete, correlated, or misattributed; provenance is part of the evaluation.", mathModel: "An evidence record e=(artifact, source, method, time, relation-to-claim). An evaluator maps (c,E,rule) to a qualified status and should preserve contrary observations." },
  contradictions: { scienceBasis: "Contradiction handling is a knowledge-representation problem: inconsistent claims may have different scopes, sources, or times. Preserving the conflict helps review instead of silently erasing information.", mathModel: "For propositions p and ¬p, store both with scope and provenance. A paraconsistent policy can prevent one contradiction from making every proposition derivable; the chosen logic must be named." },
  provenance: { scienceBasis: "Data provenance records where information came from and how it was transformed. Attribution improves auditability but does not guarantee that the source is reliable or the conclusion valid.", mathModel: "Represent derivation as a directed acyclic graph G=(V,E), where source nodes feed transformation nodes and claim nodes. Each edge records the contribution relation." },
  gettier: { scienceBasis: "Gettier cases challenge the idea that justified true belief is sufficient for knowledge. A software system can preserve justification and outcome status, but the philosophical problem does not yield a binary API test for knowledge.", mathModel: "Keep truth status T, support status J, and provenance separate. Even T∧J may be insufficient under some accounts; the system should report the premises rather than assert knowledge." },
  knowledge: { scienceBasis: "Knowledge systems organize sources, claims, and inference. Their outputs are bounded by representation, retrieval, and source coverage; graph connectivity does not establish truth.", mathModel: "A claim graph K=(C,E_s,E_c) contains claims, support edges, and contradiction edges. Inference rules determine which conclusions are admissible." },
  "a-team": { scienceBasis: "Task decomposition and parallel work can improve throughput when dependencies are explicit and integration costs are controlled. Team metaphors do not guarantee independent reasoning or correctness.", mathModel: "For a dependency DAG G=(T,D), a task is eligible when all predecessors are complete. Total completion time depends on critical path length plus coordination and integration costs." },
  holobionte: { scienceBasis: "A holobiont is a host together with associated organisms. GenOS uses the term for a host coordinating specialist services; software workers are not symbionts in the biological sense.", mathModel: "A host H composes services S_i only when capability and resource contracts hold: required(H)⊆provided(S) and Σ cost(S_i)≤budget(H)." },
  syncytium: { scienceBasis: "Biological syncytia are multinucleate cells or fused cell structures. The runtime topology instead shares versioned state among workers; a common state store is a software coordination choice.", mathModel: "Workers read version v and propose updates Δ_i. A merge operation M(v,Δ_1,…,Δ_n) must either preserve invariants or return a conflict for review." },
  rhizome: { scienceBasis: "Rhizome is a philosophical and botanical metaphor for non-hierarchical connections. A runtime graph still has explicit nodes, edges, permissions, and routing constraints.", mathModel: "Given a revisioned graph G=(V,E), bounded BFS finds eligible multi-hop paths under cost and trust limits; deterministic scoring ranks candidates. Reachability does not itself prove provider startup or mission success." },
  metapopulation: { scienceBasis: "Metapopulation ecology studies local populations connected by dispersal and subject to local extinction and recolonization. Software regions and migration rules are abstractions, not biological populations.", mathModel: "For regions i, occupancy z_i∈{0,1} changes via colonization c_i and extinction e_i; software recovery policies should report their own transition rules and evidence." },
  "immune-system": { scienceBasis: "Biological immunity involves layered recognition and response mechanisms. A runtime immune system is a threat-detection and containment policy; it cannot guarantee complete detection or prevention.", mathModel: "A detector maps signals x to risk r(x); a response is permitted only if confidence, authority, and reversibility gates pass. False positive and false negative rates require measurement." },
  "adaptive-epistemic-immunity": { scienceBasis: "The analogy combines anomaly detection with review of claims and evidence. Epistemic safeguards can overreact, miss threats, or inherit source bias; no absolute immunity is implied.", mathModel: "A candidate claim c is quarantined when risk(c)≥τ, then released only after an independent review rule passes. Threshold τ trades false positives against missed threats." },
  "pathologies": { scienceBasis: "The pathology catalog classifies software failure patterns using clinical terminology. The categories are operational metaphors and are not medical diagnoses, symptoms, or treatment recommendations.", mathModel: "A failure classifier maps telemetry x to a set of candidate failure labels; preserve multi-label uncertainty and require a separate verified response decision." },
  "proof-artifact": { scienceBasis: "A proof artifact packages a proposition with machine-checkable proof material and verifier metadata. Acceptance is relative to the formal statement, axioms, and trusted checker.", mathModel: "Artifact A=(P, proof, kernel, assumptions, result). A valid result means the kernel checked proof : P under assumptions; it does not confirm that P captures the intended real-world claim." },
  "mathematical-organism": { scienceBasis: "The term describes a mathematical abstraction of a system, not a biological organism. A useful model states its state space, transition rules, observables, and scope.", mathModel: "Specify model M=(X,U,T,Y), with state space X, controls U, transition T, and observations Y. State assumptions and distinguish model properties from implementation evidence." },
  "verification-registry": { scienceBasis: "A registry makes verification contracts discoverable and comparable. Registration indicates an available contract, not that every execution is complete or sound.", mathModel: "Each contract v declares input schema, verifier, assumptions, and result type. A registry entry should bind to a version and reproducible artifact." },
  "smt-solver": { scienceBasis: "SMT solving determines satisfiability of formulas over declared theories. A SAT/UNSAT result is bounded by encoding, solver, theory support, and proof or model validation.", mathModel: "Given formula φ in theory T, return SAT with model m or UNSAT under T. Validate model satisfaction or proof certificate where the solver contract provides one." },
  "deterministic-procedures": { scienceBasis: "Deterministic algorithms return the same output for the same inputs under fixed execution semantics. Reproducibility still depends on versioning and fully specified inputs.", mathModel: "A procedure f is deterministic when x₁=x₂ implies f(x₁)=f(x₂) under the same version and environment. Record both to make replay meaningful." },
  snapshots: { scienceBasis: "A snapshot is a point-in-time state capture used for inspection or restoration. Completeness depends on which stores, external resources, and volatile processes are included.", mathModel: "A snapshot S=(state, version, dependencies, timestamp, digest). Restoration is valid only when required dependencies resolve and integrity checks pass." },
  persistence: { scienceBasis: "Persistence preserves selected state across calls or process restarts. It introduces consistency, migration, retention, and deletion concerns that an in-memory state avoids.", mathModel: "A durable record maps key k and version v to value x. Read/write semantics, transaction boundaries, expiry, and migration rules define the contract." },
  sqlite: { scienceBasis: "SQLite is an embedded relational database engine. Using it provides local transactional storage; it does not by itself define tenant isolation, backup, or application-level correctness.", mathModel: "Relational constraints enforce declared schema invariants. Transaction commit gives atomicity for a transaction; concurrency and durability depend on configuration and deployment." },
  "model-routing": { scienceBasis: "Model routing selects a provider or execution profile according to availability, capability, cost, and policy. Routing outcomes depend on current providers and declared constraints.", mathModel: "Select provider p from eligible set P by minimizing declared objective J(p) subject to capability, privacy, latency, and budget constraints." },
  observability: { scienceBasis: "Observability uses logs, metrics, traces, and state views to infer system behavior. Missing or sampled telemetry limits what can be concluded about a run.", mathModel: "A trace is a set of attributed events with causal links. Coverage should distinguish expected events from observed events; absent telemetry is not proof an event did not occur." },
  governance: { scienceBasis: "Governance defines authority, review, and accountability around actions. An approval workflow is effective only if its identity, policy, and audit controls are enforced at the execution boundary.", mathModel: "Permit action a only when policy(actor, scope, a)=allow and required approvals are present. Store the decision, policy version, and scope with the resulting receipt." },
  "identity-authority": { scienceBasis: "Identity and authorization systems bind actors to permissions within a scope. A credential proves only what the issuer and verifier contract support; least privilege and revocation matter.", mathModel: "Authorize request r when subject, action, and resource satisfy policy P and scope S. Deny by default when identity or scope is missing or ambiguous." },
  "resident-daemons": { scienceBasis: "A daemon is a long-lived software process. Its persistence creates lifecycle, supervision, resource, and authority requirements; the organism metaphor adds no biological property.", mathModel: "A supervisor state machine tracks {starting, ready, degraded, stopped}; restart policy is bounded by a retry budget and must retain crash evidence." },
  "workflows": { scienceBasis: "Workflow systems coordinate tasks through explicit dependencies and state transitions. Correctness depends on retry semantics, idempotence, cancellation, and recovery behavior.", mathModel: "A workflow is a directed graph of tasks with guarded transitions. A transition may fire only when its preconditions hold; retries should be bounded and idempotent where possible." },
};

const registeredConcepts: Concept[] = catalogConcepts.map((entry, index) => ({
  slug: entry.slug as ConceptSlug,
  number: String(authoredConcepts.length + index + 1).padStart(2, "0"),
  title: entry.title,
  eyebrow: entry.familyId.replaceAll("-", " ").toUpperCase(),
  intro: entry.intro,
  status: "Status not yet assessed",
  statusTone: "amber",
  diagram: undefined,
  diagramTitle: "No site diagram registered",
  diagramDescription: "This registry entry links the named concept to its canonical GenOS source.",
  steps: [],
  scopeTitle: "Source-led catalog entry",
  scope: "This concept is indexed in the public atlas. The three implementation axes have not yet been mapped to a dedicated, versioned product contract for this entry; the linked GenOS source is the place to inspect its current scope.",
  source: entry.source.replace(/^\.\.\//, ""),
  sourceLabel: entry.title,
  familyId: entry.familyId,
  implementation: "unassessed",
  integration: "unassessed",
  evidence: "unassessed",
  statusNote: "No concept-specific implementation, integration, or evidence record is registered in this atlas yet.",
  biologyInspired: entry.biologyInspired,
  hasMathematics: entry.hasMathematics,
  hasSimulation: entry.hasSimulation,
  hasBenchmark: entry.hasBenchmark,
  related: entry.related,
  ...conceptDossiers[entry.slug],
}));

export const concepts: Concept[] = [
  ...authoredConcepts.map((concept) => ({ ...concept, ...authoredMetadata[concept.slug], ...scientificProfiles[concept.slug], hasMathematics: Boolean(authoredMetadata[concept.slug]?.hasMathematics || scientificProfiles[concept.slug]?.mathModel), literatureMechanisms: literatureMechanismsByConcept[concept.slug] })),
  ...registeredConcepts.map((concept) => ({ ...concept, ...scientificProfiles[concept.slug], hasMathematics: Boolean(concept.hasMathematics || scientificProfiles[concept.slug]?.mathModel), literatureMechanisms: literatureMechanismsByConcept[concept.slug] })),
];

export function getConcept(slug: string) {
  return concepts.find((concept) => concept.slug === slug);
}
