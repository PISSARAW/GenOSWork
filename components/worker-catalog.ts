export type WorkerCatalogEntry = {
  id: string;
  title: string;
  description: string;
  artifact: string;
  detail: string;
  authorityPhenotype: string;
  capabilities: string[];
};

export type WorkerFamily = {
  id: string;
  number: string;
  title: string;
  name: string;
  intro: string;
  tone: string;
  workers: WorkerCatalogEntry[];
};

export const workerFamilies: WorkerFamily[] = [
  {
    id: "sensory",
    number: "01",
    title: "Observe",
    name: "Sensing family",
    intro: "Observe a scope, collect signals, and report findings before a decision is made.",
    tone: "sage",
    workers: [
      { id: "scout_cell", title: "Scout cell", description: "Scans a supplied corpus for literal terms and reports exact offsets with source references; it cannot execute or modify files.", artifact: "scout_observation", detail: "1 iteration · read only", authorityPhenotype: "ScoutCell", capabilities: ["observe"] },
      { id: "resident_daemon", title: "Resident daemon", description: "Checks a bounded, timestamped sample window against a threshold. Residency permits monitoring, not autonomous mission decisions.", artifact: "dossier", detail: "unbounded iterations · no write", authorityPhenotype: "ResidentDaemon", capabilities: ["observe", "execute"] },
    ],
  },
  {
    id: "execution",
    number: "02",
    title: "Execute",
    name: "Execution family",
    intro: "Perform assigned work within a defined scope, budget, and tool lease.",
    tone: "ochre",
    workers: [
      { id: "bounded_worker", title: "Bounded worker", description: "Completes only its assigned scope with leased tools and returns evidence with provenance; it has no spawn authority.", artifact: "dossier", detail: "10 iterations · fixed scope", authorityPhenotype: "BoundedWorker", capabilities: ["execute", "scoped_execution"] },
      { id: "adaptive_worker", title: "Adaptive worker", description: "Changes only among contract strategies, within explicit strategy and cognitive-change ceilings.", artifact: "dossier", detail: "20 iterations · capped adaptation", authorityPhenotype: "AdaptiveWorker", capabilities: ["execute", "scoped_execution", "adaptive_strategy", "domain_specialization"] },
      { id: "specialist", title: "Specialist", description: "Applies adaptive analysis only inside a required, explicitly declared niche; Node forces write authority off.", artifact: "dossier", detail: "declared niche · no write", authorityPhenotype: "Specialist", capabilities: ["execute", "analyze", "domain_specialization"] },
      { id: "procedural_executor", title: "Procedural executor", description: "Runs registered deterministic procedures with zero model-token budget and returns the corresponding procedure receipt.", artifact: "dossier", detail: "deterministic · 0 model tokens", authorityPhenotype: "BoundedWorker", capabilities: ["execute", "scoped_execution", "deterministic_procedure", "domain_specialization"] },
      { id: "symbiotic_worker", title: "Symbiotic worker", description: "Uses only procedures and capabilities present in an explicit host contract; it has no authority beyond that host.", artifact: "dossier", detail: "host contract required", authorityPhenotype: "BoundedWorker", capabilities: ["execute", "host_bound"] },
    ],
  },
  {
    id: "epistemic",
    number: "03",
    title: "Establish knowledge",
    name: "Epistemic family",
    intro: "Test claims, hypotheses, and results before they are reused.",
    tone: "lilac",
    workers: [
      { id: "verifier_worker", title: "Verifier", description: "Checks a claim independently and returns accept, reject, or unresolved with reproduction evidence.", artifact: "verification_report", detail: "5 iterations · ternary verdict", authorityPhenotype: "Verifier", capabilities: ["analyze", "verify"] },
      { id: "red_worker", title: "Adversarial worker", description: "Searches for a reproducible counterexample under an adversarial recipe; it cannot promote its own finding.", artifact: "verification_report", detail: "adversarial · no promotion", authorityPhenotype: "Verifier", capabilities: ["analyze", "verify", "adversarial_review", "domain_specialization"] },
      { id: "experimental_worker", title: "Experimenter", description: "Binds a testable hypothesis to a protocol and measurements in a dedicated experiment record.", artifact: "experiment_record", detail: "hypothesis · protocol · measures", authorityPhenotype: "BoundedWorker", capabilities: ["execute", "scoped_execution", "experiment", "measure", "domain_specialization"] },
      { id: "formal_worker", title: "Formal worker", description: "Runs a configured solver with zero model-token budget and returns a certificate bound to a real solver receipt.", artifact: "formal_certificate", detail: "solver lease · 0 model tokens", authorityPhenotype: "BoundedWorker", capabilities: ["execute", "scoped_execution", "formal_proof", "domain_specialization"] },
      { id: "math_worker", title: "Math worker", description: "Computes mathematical expressions deterministically and returns exact closed-form results with a solver receipt; numeric approximations are labeled.", artifact: "formal_certificate", detail: "deterministic · solver receipt", authorityPhenotype: "BoundedWorker", capabilities: ["execute", "scoped_execution", "formal_proof"] },
      { id: "synthesis_worker", title: "Synthesis worker", description: "Combines sourced claims while preserving material disagreements and provenance; execution and writing remain disabled.", artifact: "synthesis_dossier", detail: "read only · preserves disagreement", authorityPhenotype: "Verifier", capabilities: ["analyze", "synthesize", "preserve_provenance"] },
    ],
  },
  {
    id: "repair",
    number: "04",
    title: "Adapt and repair",
    name: "Adaptation and repair family",
    intro: "Explore candidates, assess bounded cases, diagnose incidents, or restore known state.",
    tone: "rose",
    workers: [
      { id: "creative_worker", title: "Creative worker", description: "Produces a read-only candidate with assumptions and a falsification test; it cannot execute or self-promote.", artifact: "creative_candidate", detail: "read only · candidate", authorityPhenotype: "BoundedWorker", capabilities: ["create_candidate"] },
      { id: "medical_worker", title: "Medical worker", description: "Produces non-diagnostic educational considerations for an explicitly synthetic vignette, with uncertainty and a safety note.", artifact: "clinical_report", detail: "8 iterations · synthetic only", authorityPhenotype: "Verifier", capabilities: ["analyze", "clinical_context"] },
      { id: "recovery_worker", title: "Recovery worker", description: "Uses only its leased restoration action, then reports restored state, receipts, and remaining risk.", artifact: "dossier", detail: "3 iterations · restore lease", authorityPhenotype: "BoundedWorker", capabilities: ["execute", "recover"] },
      { id: "forensic_worker", title: "Forensic worker", description: "Reconstructs only causal links supported by incident receipts and keeps observed facts separate from hypotheses.", artifact: "causal_dossier", detail: "receipt-bound causal analysis", authorityPhenotype: "Verifier", capabilities: ["analyze", "causal_analysis"] },
    ],
  },
  {
    id: "organizational",
    number: "05",
    title: "Connect and teach",
    name: "Organizational family",
    intro: "Share validated knowledge and coordinate one bounded mission subgraph.",
    tone: "blue",
    workers: [
      { id: "liaison_worker", title: "Liaison worker", description: "Bridges assigned groups with a concise, sourced handoff; execution and writing remain disabled.", artifact: "dossier", detail: "read only · up to 32 messages", authorityPhenotype: "BoundedWorker", capabilities: ["coordinate", "handoff"] },
      { id: "teaching_worker", title: "Teaching worker", description: "Transmits a validated procedure with prerequisites, steps, evidence, and an explicit transfer check.", artifact: "training_packet", detail: "read only · transfer check", authorityPhenotype: "ScoutCell", capabilities: ["analyze", "teach"] },
      { id: "sub_orchestrator", title: "Sub-orchestrator", description: "Coordinates a local subgraph only after bounded delegation is granted: at most five children, depth one, and one-hour expiry.", artifact: "dossier", detail: "5 children · depth 1 · 1 hour", authorityPhenotype: "SubOrchestrator", capabilities: ["analyze", "coordinate", "delegate"] },
    ],
  },
];

export const workerTypes = workerFamilies.flatMap((family) =>
  family.workers.map((worker) => ({ ...worker, familyId: family.id })),
);
