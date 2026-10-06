import type { Concept } from "@/components/concepts";

// Curated from the GenOS V3 sources pinned by product-evidence.ts.
// A dossier describes the bounded runtime path, not a verified user outcome.
export const v3ConceptDossiers: Record<string, Partial<Concept>> = {
  "natural-search-control-plane": {
    steps: [
      { title: "Observe and decide", body: "Attribute runtime events to their agent, preserve hypothesis identity and provenance, then select a bounded process using pressure, radius and hysteresis." },
      { title: "Execute and checkpoint", body: "Run the selected module and atomically commit its versioned state before reporting success. Serialize agent operations and reject stale writers or corrupt checkpoint formats." },
      { title: "Resume under evidence gates", body: "Reload the committed ledger and seven module states after restart. Cultural delivery is scoped and idempotent; received traits remain candidates, not promoted decisions." },
    ],
    scopeTitle: "Internal recovery is not external replay",
    scope: "The published 21-script suite tests SQLite reopen, partial-write crashes, concurrency, failed flushes, provenance and cultural delivery. Recovery restores committed internal search state, not an external workspace or a complete agent history. The 12-task planning harness does not establish a causal production benefit from phases 6-12; cultural validation still requires explicit observed or verified evidence.",
    failureModes: ["Reporting success before the checkpoint commits.", "Restoring a partial projection instead of the committed state.", "Treating a transmitted candidate or self-reported tool result as independently verified progress."],
  },
  "g-cir": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "The Node Omega gateway executes six guarded operations, with session visibility, MMU resolution and verification receipts. Legacy signal and Trinity adapters remain supported; general free-form mission compilation and complete Rust production bindings remain open.",
    steps: [
      { title: "Admit", body: "Require a target, supported typed input, coherent context, budget and authorization before any model call. Invalid fields and projections over 16 KiB are refused." },
      { title: "Resolve obligations", body: "Keep dependencies and the remaining cognitive question explicit; completed local work can be omitted only with a recorded reason." },
      { title: "Attest visibility", body: "Persist rendered fragments, prompt digests, recipient, model and session revision. Invalidate expired or compacted fragments and recheck visibility when resuming." },
    ],
    scopeTitle: "Session visibility is not execution proof",
    scope: "The published runtime persists session visibility and invalidation events, and shares versioned Node/Rust contracts. READ, CALL, CHECK and EMIT require authorized bindings; a model response never supplies its own proof or authority. Rust production backends, general mission compilation, topology control and empirical PGO qualification remain incomplete.",
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
      { title: "Close against the contract", body: "The homeostasis gate checks declared invariants and required evidence. Closure requires a transition receipt bound to the active contract, latest state and current execution-evidence epoch. Completed workers cannot make an unsatisfied mission successful." },
      { title: "Reserve ownership", body: "A mission identity and resource ownership record arbitrate wake-up and successor launch; a losing or stale process is refused." },
      { title: "Resume or regenerate", body: "Restore the frozen mission payload after a valid wake condition. Regeneration launches a child worker only after topology and authority checks." },
    ],
    scopeTitle: "A live runtime is checked before replacement",
    scope: "The continuation loop is bounded and idempotent by mission and deviation. A crash during launching requires controlled recovery, not blind replay. Regeneration has separate service paths, and distributed multi-instance operation is not qualified.",
    failureModes: ["Launching a duplicate successor after a crash.", "Treating worker completion as mission evidence.", "Rebuilding a resumed prompt from mutable current_task instead of the frozen mission."],
  },
  "epistemic-meristem": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "Transactional experiment waves, verified coverage, Trinity hypotheses and Biome niche assignment are connected under explicit contracts. Host adapters must supply real isolation, execution and verification; empirical advantage remains unqualified.",
    steps: [
      { title: "Detect a gap", body: "Compare the current problem with recorded coverage and its evidence." },
      { title: "Open a wave", body: "Rank distinct experimental contracts against sealed coverage, preserving admissible independent replications and the declared budget." },
      { title: "Seal verified coverage", body: "Execute isolated worlds through host adapters. Require every scoped result and its declared independent verifier before atomically sealing coverage and its receipt." },
    ],
    scopeTitle: "A growth proposal needs verification",
    scope: "An interrupted wave stays open and does not increase coverage. Trinity assessments and Biome niches can consume the same scoped contracts, while Rhizome recruitment retains its authority and budget gates. Distinct verifier identities alone do not establish independent errors or better mission outcomes.",
    codeSources: ["backend/src/services/morphogenesis/capabilities/experimentWaveRuntime.js", "backend/src/services/morphogenesis/capabilities/trinityMeristemBridge.js", "backend/tests/test_capability_wave_runtime.js", "backend/tests/test_capability_scientific_runtime.js"],
  },
  "unblocking-spiral": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "Counterfactual search connects bounded intervention planning, verified attempt history, explicit authorization and snapshot restoration. General mission control and comparative benefit remain unqualified.",
    steps: [
      { title: "Recognize blockage", body: "Use repeated failure evidence to identify the blocked method and scope." },
      { title: "Choose a bounded change", body: "Propose another method or scope under the morphology policy." },
      { title: "Verify and restore", body: "Bind the outcome to the original intervention contract and verifier, persist it, and restore the snapshot even on failure before planning another attempt." },
    ],
    scopeTitle: "Method changes remain governed",
    scope: "An unfinished or unverifiable attempt blocks progression. Wider scales require verified failures at the current scale and never widen permissions. The host must implement snapshot, execute, verify and restore adapters; a method score is not authorization or evidence of improved outcomes.",
    codeSources: ["backend/src/services/morphogenesis/capabilities/spiralRuntime.js", "backend/src/services/morphogenesis/synthesis/spiralSearch.js", "backend/tests/test_capability_spiral_runtime.js"],
  },
  "counterexample-cambium": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "Declarative procedures support isolated before/after decision replay, transactional consolidation, contextual Holobiont recall and transitive invalidation. Arbitrary text procedures and general agent memory remain outside this guarantee.",
    steps: [
      { title: "Capture", body: "Record a counterexample with source, version and the claim it challenges." },
      { title: "Replay compression", body: "Run original witness and counterexample cases in a bounded worker. Refuse a compressed procedure that changes a declared decision." },
      { title: "Recall within scope", body: "Revalidate evidence, environment version, conditions and ancestors. Abstain outside the attested domain and propagate supported invalidation to descendants." },
    ],
    scopeTitle: "A counterexample is evidence, not an automatic repair",
    scope: "Replay is limited to structured declarative procedures and at most 10,000 cases in a resource-bounded worker. An arbitrary comparator or success boolean is not proof; timeout refuses compression. Preserving known decisions does not show that all future failures are covered.",
    codeSources: ["backend/src/services/morphogenesis/capabilities/cambiumReplay.js", "backend/src/services/memory/cambiumConsolidationRuntime.js", "backend/tests/test_capability_cambium_runtime.js"],
  },
  chronotaxis: {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "Resident ticks dispatch bounded read-only probes and persist actual phase coverage, failed probes and missed windows. Field coverage and improved anomaly detection remain unqualified.",
    steps: [
      { title: "Plan phases", body: "Choose bounded nonperiodic observation windows against declared coverage goals." },
      { title: "Execute read-only probes", body: "The resident tick rechecks spacing and deadlines, then dispatches an allowed SQL probe and records its timestamped artifact. Failed or missed probes do not increase coverage." },
      { title: "Review gaps", body: "Compare coverage with the plan before changing observation policy." },
    ],
    scopeTitle: "A schedule is not an observation",
    scope: "Only resolved artifacts from actual observations count toward coverage. The runner must keep calling the resident tick; creating a schedule does not start a daemon. Latency and spacing constraints may exclude some phase sectors, and varied timing cannot guarantee detection of every anomaly.",
    codeSources: ["backend/src/services/morphogenesis/capabilities/residentProbeRuntime.js", "backend/src/services/ontogenesis/scheduleService.js", "backend/tests/test_capability_probe_runtime.js"],
  },
  "risk-ledger": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "A transactional risk lineage, preregistered ordered evaluation units, provenance checks and signed receipts guard opt-in topology promotions. Statistical assumptions and field qualification remain separate obligations.",
    steps: [
      { title: "Pre-register", body: "Declare the promotion family, binary criterion, null hypothesis and total risk budget." },
      { title: "Spend and inherit risk", body: "Reserve a summable allocation before evaluation. Bind ordered source units to the immutable protocol; forks, merges and topology changes cannot refund spent risk." },
      { title: "Gate promotion", body: "Refuse an opt-in statistical promotion without an admissible receipt; other evidence gates still apply." },
    ],
    scopeTitle: "Statistical admission is only one promotion gate",
    scope: "Protected graph nodes retain their risk scope across resume and composition. Gates reread provenance as well as the signed receipt. The union-bound guarantee requires valid individual tests; the sequential model assumes conditional win probability at most one half under its null. These gates do not replace deterministic checks, safety or dissent review, and no general field benefit is established.",
    codeSources: ["backend/src/services/morphogenesis/capabilities/riskLineage.js", "backend/src/services/morphogenesis/capabilities/statisticalProvenance.js", "backend/tests/test_capability_risk_runtime.js", "backend/tests/test_capability_integration_runtime.js"],
  },
  "natural-creative-ecology": {
    implementation: "partial", integration: "wired", evidence: "integration-tested",
    statusNote: "Three numerical procedure families have a persisted causal cycle with native processes, POET snapshot verification, inter-agent cultural reuse and SQLite reopen. Six executed ablation arms retain null results; open-ended creativity and all 25 conceptual mechanisms are not demonstrated.",
    steps: [
      { title: "Explore", body: "Curiosity can steer Rust exploration; Play uses bounded sandbox work and real snapshot capture in its E2E path." },
      { title: "Retain and reuse", body: "Persist measured procedures, receipts and phenotype updates, transmit an admitted procedure to another agent and revalidate it after SQLite reopen." },
      { title: "Compare executed arms", body: "Run baseline, full and four component ablations on shared splits and paired seeds. Preserve zero gains and unmeasured pairs rather than treating report creation as promotion." },
    ],
    scopeTitle: "Controlled closure is not general creativity",
    scope: "The native cycle and two-seed ablation campaign establish controlled wiring for bounded numerical transformations. Search costs are observed, not equalized; standard error is not a significance test. Older heuristic estimates and simulations remain separate. These tests do not validate arbitrary user tasks, general creativity or all 25 conceptual mechanisms.",
    codeSources: ["backend/src/services/nceCausalCycleService.js", "backend/src/services/nceAblationService.js", "backend/tests/test_nce_native_cycle.js", "backend/tests/test_nce_executed_ablation.js"],
  },
};
