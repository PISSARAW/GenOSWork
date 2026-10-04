import type { Concept } from "@/components/concepts";

// Curated from the GenOS V3 sources pinned by product-evidence.ts.
// A dossier describes the bounded runtime path, not a verified user outcome.
export const v3ConceptDossiers: Record<string, Partial<Concept>> = {
  "g-cir": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "Two adapters compile signal and Trinity hypothesis contracts into a versioned local obligation graph. General free-form mission compilation is open.",
    steps: [
      { title: "Admit", body: "Require a target, supported typed input, coherent context, budget and authorization before any model call. Invalid fields and projections over 16 KiB are refused." },
      { title: "Resolve obligations", body: "Keep dependencies and the remaining cognitive question explicit; completed local work can be omitted only with a recorded reason." },
      { title: "Attest visibility", body: "Persist the exact rendered prompt, its SHA-256 hash, recipient and model for this invocation. Reuse a completed identical response only after checking the stored bytes." },
    ],
    scopeTitle: "Visibility belongs to one invocation",
    scope: "The visibility receipt is not signed or bound to a session. Compaction, model changes and restarts require fresh visibility checks. The local obligation registry and two adapters do not yet form a general cross-language G-CIR for arbitrary missions.",
    failureModes: ["A tool-accessible artifact is not necessarily seen by a model.", "A repeated signal must not trigger an unbounded new inference.", "A failed or in-flight invocation cannot be treated as a completed answer."],
    useCases: ["Escalate a signal with no deterministic receiver after admission.", "Compile remaining Trinity hypothesis work under a fixed plan."],
  },
  "relational-physiology": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "The 29-relation kernel is integrated into a targeted persistent audience-routing path; general mission admission and enforcement remain open.",
    steps: [
      { title: "Load scoped relations", body: "Read organization and project edges with provenance. Incomplete or failed reads refuse the affected independence-sensitive route." },
      { title: "Check authority and independence", body: "Apply existing leases, ACLs and budgets first. Group known dependent origins for quorum; refuse a claim of established statistical independence." },
      { title: "Record and dispatch", body: "Preserve the more restrictive relation, write the decision receipt and send only the reduced allowed content." },
    ],
    scopeTitle: "A relation cannot grant permission",
    scope: "Family, managerial, social and verifier labels constrain routing but confer no new rights. Separate model families do not prove independent errors. The current routing patch does not provide a complete transactional revocation firewall.",
    failureModes: ["Counting siblings or shared-model runs as independent votes.", "Treating a manager or guardian label as authorization.", "Losing causal history when an edge is revoked."],
  },
  "signal-plane": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "SQLite deliveries, subscriber pull, ACK states, leased retries and cognitive escalation are connected; receiver registration at server startup is not wired.",
    steps: [
      { title: "Persist and address", body: "Store typed signals and per-subscriber deliveries; an inbox reads scoped pending items and records seen/ACK states." },
      { title: "Dispatch or escalate", body: "A matching receptor may return an action result. If deterministic dispatch fails, a value-of-information gate may allow a bounded advisory model response." },
      { title: "Recover", body: "A local push is backed by SQLite pull and atomic claims. Failed handlers retry with backoff and reach terminal quarantine after eight attempts." },
    ],
    scopeTitle: "At-least-once delivery requires idempotent effects",
    scope: "The EventBus push is process-local. A crash after an action but before delivery confirmation may run its handler again; external actions must deduplicate by signal ID. In-memory coalescing is lost on restart and the model response is not proof of action success.",
    failureModes: ["A persisted signal is not proof its business action completed.", "Startup currently does not register all production receptors.", "Polling tool leases alone do not bind a supplied agent ID to the MCP client identity."],
  },
  "mission-continuity": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "Completion, evidence collection, bounded continuation, dormancy and succession have connected paths; SQLite WAL authority was tested across two processes, not a multi-instance deployment.",
    steps: [
      { title: "Close against the contract", body: "The homeostasis gate checks declared invariants and required evidence. Completed workers cannot make an unsatisfied mission successful." },
      { title: "Reserve ownership", body: "A mission identity and resource ownership record arbitrate wake-up and successor launch; a losing or stale process is refused." },
      { title: "Resume or regenerate", body: "Restore the frozen mission payload after a valid wake condition. Regeneration launches a child worker only after topology and authority checks." },
    ],
    scopeTitle: "A live runtime is checked before replacement",
    scope: "The continuation loop is bounded and idempotent by mission and deviation. A crash during launching requires controlled recovery, not blind replay. Regeneration has separate service paths, and distributed multi-instance operation is not qualified.",
    failureModes: ["Launching a duplicate successor after a crash.", "Treating worker completion as mission evidence.", "Rebuilding a resumed prompt from mutable current_task instead of the frozen mission."],
  },
  "epistemic-meristem": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "Verified coverage records and read revalidation support Rhizome planning; autonomous recruitment and empirical calibration are open.",
    steps: [
      { title: "Detect a gap", body: "Compare the current problem with recorded coverage and its evidence." },
      { title: "Revalidate", body: "Require the declared verifier and VERIFIED receipt before persisting a growth claim." },
      { title: "Propose growth", body: "Route a bounded candidate into planning, without silently enrolling a new worker." },
    ],
    scopeTitle: "A growth proposal needs verification",
    scope: "The meristem records experimental distinctions. It does not autonomously recruit agents or establish that expanded coverage improves mission outcomes.",
  },
  "unblocking-spiral": {
    implementation: "partial", integration: "callable", evidence: "integration-tested",
    statusNote: "Blockage signatures, candidate selection and a morphology filter exist; full automatic mission control is open.",
    steps: [
      { title: "Recognize blockage", body: "Use repeated failure evidence to identify the blocked method and scope." },
      { title: "Choose a bounded change", body: "Propose another method or scope under the morphology policy." },
      { title: "Verify before continuation", body: "Keep the change provisional until the next observed result passes its gate." },
    ],
    scopeTitle: "Method changes remain governed",
    scope: "The spiral can select a candidate response to blockage. It does not yet autonomously drive an entire mission or establish improved outcomes.",
  },
  "counterexample-cambium": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "A registry, admission gate and conditional Holobiont recall exist; general replay into memory is open.",
    steps: [
      { title: "Capture", body: "Record a counterexample with source, version and the claim it challenges." },
      { title: "Gate", body: "Check relevance and provenance before admitting it into a later decision." },
      { title: "Recall", body: "Expose eligible prior failures to a bounded Holobiont path without calling recall a verified fix." },
    ],
    scopeTitle: "A counterexample is evidence, not an automatic repair",
    scope: "The current path does not replay every counterexample into the general memory system or prove that later agents avoid the same failure.",
  },
  chronotaxis: {
    implementation: "partial", integration: "callable", evidence: "integration-tested",
    statusNote: "Aperiodic schedules and observation receipts persist; resident probes and field qualification remain open.",
    steps: [
      { title: "Plan phases", body: "Choose bounded nonperiodic observation windows against declared coverage goals." },
      { title: "Persist receipts", body: "Record scheduled and observed windows so missed opportunities remain visible." },
      { title: "Review gaps", body: "Compare coverage with the plan before changing observation policy." },
    ],
    scopeTitle: "A schedule is not an observation",
    scope: "Persisted timing plans do not establish that a resident probe ran or that field coverage improved.",
  },
  "risk-ledger": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "A transactional risk ledger and opt-in Trinity promotion gate exist. Data provenance and broader empirical qualification remain open.",
    steps: [
      { title: "Pre-register", body: "Declare the promotion family, binary criterion, null hypothesis and total risk budget." },
      { title: "Spend risk", body: "Record each sequential test against the remaining budget in a transaction." },
      { title: "Gate promotion", body: "Refuse an opt-in statistical promotion without an admissible receipt; other evidence gates still apply." },
    ],
    scopeTitle: "Statistical admission is only one promotion gate",
    scope: "The sum of allocated error budgets is bounded, but invalid data or changed outcome definitions can defeat the premise. Other topology promotions and field campaigns are not generally qualified.",
  },
  "natural-creative-ecology": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "The curiosity Node–Rust bridge, persisted phenotype and topology filtering run in controlled tests. POET agent startup remains simulated in its test.",
    steps: [
      { title: "Explore", body: "Curiosity can steer Rust exploration; Play uses bounded sandbox work and real snapshot capture in its E2E path." },
      { title: "Retain state", body: "NCE metadata and the per-agent phenotype vector are persisted, with topology signals filtering eligible engines." },
      { title: "Compare", body: "A deterministic culture-to-phenotype task is tested; ablations are prototypes without scientific validity." },
    ],
    scopeTitle: "Controlled closure is not general creativity",
    scope: "The infrastructure has connected causal paths, but autonomous user-task campaigns, statistical comparisons and generalization are not established. A POET test still simulates agent startup.",
  },
};
