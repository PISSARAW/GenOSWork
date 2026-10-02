"use client";

import { useState } from "react";

type Parameter = { id: string; label: string; min: number; max: number; initial: number; unit?: string };
type Metric = { label: string; value: number; display: string };
type Result = { headline: string; explanation: string; metrics: Metric[]; stages: string[]; state: string };
type Model = {
  id: string;
  title: string;
  summary: string;
  domain: "topology" | "concept";
  parameters: Parameter[];
  evaluate: (values: Record<string, number>) => Result;
};

const topologyExperiments: Record<string, { question: string; baseline: string; metric: string; falsifier: string }> = {
  trinity: { question: "At equal total compute, do independent candidates raise verified success over one candidate?", baseline: "One candidate with the same total token and time budget.", metric: "Verified success per unit cost; retain failures and correlated strategies.", falsifier: "No improvement across the preregistered task set, or an improvement that disappears after cost normalization." },
  "a-team": { question: "Do explicit specialist dependencies reduce critical-path time without losing deliverable quality?", baseline: "One worker with the same total budget and task instructions.", metric: "Verified completion, critical-path duration, handoff repairs, and total cost.", falsifier: "No quality-preserving time or cost benefit, or integration errors increase." },
  biocenose: { question: "Does an explicit ballot improve forecast calibration over the strongest individual forecast?", baseline: "Best individual forecaster, scored on the same resolved outcomes.", metric: "Brier score, coverage, abstention, and preserved dissent.", falsifier: "The aggregate has worse Brier score or hides unresolved outcomes or minority evidence." },
  holobionte: { question: "Does capability-constrained specialist composition meet the task more reliably than a fixed team?", baseline: "Fixed team under the same capability and resource budget.", metric: "Verified task coverage, resource use, and contract violations.", falsifier: "No coverage gain at equal budget, or any increase in unauthorized work." },
  syncytium: { question: "Do shared-state operations converge while preserving declared invariants under concurrent writes?", baseline: "Serialized writes to the same initial state.", metric: "Convergence rate, invariant violations, rejected operations, and latency.", falsifier: "Any promoted divergent state or invariant violation; report workload assumptions." },
  rhizome: { question: "Does capability-link exploration find more useful routes than direct member selection at equal budget?", baseline: "Direct selection from the same composed member set.", metric: "Verified reachable tasks, search cost, and invalid or missing routes.", falsifier: "No route-coverage gain at equal budget, or added routes fail verification." },
  metapopulation: { question: "Does bounded migration recover more functioning groups after local failures than isolated groups?", baseline: "Same group count and resources with migration disabled.", metric: "Recovery rate, time to recovery, capability diversity, and transfer cost.", falsifier: "No recovery improvement or higher resource cost without compensating capability retention." },
  biome: { question: "Does adaptive allocation improve verified output under changing resource supply over a fixed allocation?", baseline: "Fixed allocation with the same cumulative resource budget.", metric: "Verified output, resource use, constraint violations, and recovery after shocks.", falsifier: "No output or resilience gain at equal budget, or any hard-bound violation." },
};

const models: Model[] = [
  {
    id: "trinity", title: "Trinity", domain: "topology", summary: "Compare independent candidates against evidence and trade-offs.",
    parameters: [{ id: "candidates", label: "Candidate worlds", min: 1, max: 5, initial: 3 }, { id: "evidence", label: "Evidence coverage", min: 0, max: 100, initial: 68, unit: "%" }, { id: "risk", label: "Risk pressure", min: 0, max: 100, initial: 35, unit: "%" }],
    evaluate: (v) => { const candidates = v.candidates; const eligible = Math.max(0, Math.min(candidates, Math.floor((v.evidence + 20 - v.risk * 0.25) / 25))); const pareto = Math.max(eligible ? 1 : 0, Math.ceil(eligible * (1 - v.risk / 180))); return { headline: eligible ? `${pareto} candidate${pareto === 1 ? "" : "s"} retained for review` : "Evidence gate requests more work", explanation: "The model compares candidates on separate evidence and risk dimensions. It does not select or deploy a production solution.", metrics: [{ label: "Eligible", value: candidates ? eligible / candidates * 100 : 0, display: `${eligible} / ${candidates}` }, { label: "Retained set", value: candidates ? pareto / candidates * 100 : 0, display: `${pareto} candidate${pareto === 1 ? "" : "s"}` }], stages: ["Common snapshot", "Independent branches", "Evidence comparison", eligible ? "Retain Pareto set" : "Request experiment"], state: eligible ? "REVIEW SET" : "MORE EVIDENCE" }; },
  },
  {
    id: "a-team", title: "A-Team", domain: "topology", summary: "Schedule specialist work across dependencies and handoffs.",
    parameters: [{ id: "domains", label: "Work domains", min: 2, max: 8, initial: 4 }, { id: "parallelism", label: "Parallel tasks", min: 1, max: 8, initial: 3 }, { id: "handoff", label: "Handoff reliability", min: 0, max: 100, initial: 80, unit: "%" }],
    evaluate: (v) => { const blocked = Math.max(0, Math.ceil((100 - v.handoff) / 35) - 1); const parallel = Math.min(v.domains, v.parallelism); const duration = Math.ceil(v.domains / parallel) + blocked; return { headline: blocked ? `${blocked} handoff${blocked === 1 ? "" : "s"} need repair` : `${parallel} work streams can run in parallel`, explanation: "The simplified schedule uses domain count, parallel capacity, and handoff reliability. Real task dependencies determine the actual critical path.", metrics: [{ label: "Parallel capacity", value: parallel / v.domains * 100, display: `${parallel} / ${v.domains} domains` }, { label: "Handoff quality", value: v.handoff, display: `${v.handoff}%` }, { label: "Work rounds", value: Math.min(100, duration * 18), display: `${duration} rounds` }], stages: ["Declare roles", "Build dependency graph", blocked ? "Repair handoff" : "Run ready tasks", "Integrate deliverables"], state: blocked ? "HANDOFF RISK" : "GRAPH READY" }; },
  },
  {
    id: "biocenose", title: "Biocenosis", domain: "topology", summary: "Show how quorum, evidence, and dissent shape a collective judgment.",
    parameters: [{ id: "members", label: "Reviewers", min: 3, max: 15, initial: 7 }, { id: "quorum", label: "Quorum threshold", min: 25, max: 90, initial: 60, unit: "%" }, { id: "dissent", label: "Dissent retained", min: 0, max: 100, initial: 45, unit: "%" }],
    evaluate: (v) => { const participation = Math.max(20, 92 - v.dissent * 0.2); const reached = participation >= v.quorum; return { headline: reached ? "Quorum reached; preserve minority arguments" : "Quorum not reached; defer aggregation", explanation: "Participation and dissent remain separate signals. A numerical majority is not treated as a truth oracle.", metrics: [{ label: "Reviewers", value: v.members / 15 * 100, display: `${v.members}` }, { label: "Participation", value: participation, display: `${Math.round(participation)}%` }, { label: "Quorum", value: v.quorum, display: `${v.quorum}%` }, { label: "Dissent record", value: v.dissent, display: `${v.dissent}% retained` }], stages: ["Private judgments", "Commit and reveal", "Arguments and dissent", reached ? "Aggregate with quorum" : "Defer decision"], state: reached ? "QUORUM" : "DEFER" }; },
  },
  {
    id: "holobionte", title: "Holobiont", domain: "topology", summary: "Admit specialist symbionts under capability, resource, and health constraints.",
    parameters: [{ id: "demand", label: "Required capabilities", min: 1, max: 10, initial: 5 }, { id: "budget", label: "Resource budget", min: 1, max: 10, initial: 6 }, { id: "health", label: "Symbiont health", min: 0, max: 100, initial: 74, unit: "%" }],
    evaluate: (v) => { const admitted = Math.min(v.demand, v.budget, Math.floor(v.health / 12) + 1); const quarantined = v.health < 40 ? v.demand - admitted : 0; return { headline: quarantined ? `${quarantined} capability provider${quarantined === 1 ? "" : "s"} held for review` : `${admitted} of ${v.demand} capabilities admitted`, explanation: "This is a policy illustration of admission and quarantine. It does not run symbionts or claim automatic immunity.", metrics: [{ label: "Capability coverage", value: admitted / v.demand * 100, display: `${admitted} / ${v.demand}` }, { label: "Budget use", value: admitted / v.budget * 100, display: `${Math.min(admitted, v.budget)} / ${v.budget} units` }, { label: "Health signal", value: v.health, display: `${v.health}%` }], stages: ["Declare host needs", "Check capabilities", v.health < 40 ? "Quarantine candidate" : "Admit under contract", "Review lifecycle"], state: quarantined ? "QUARANTINE" : "ADMISSION" }; },
  },
  {
    id: "syncytium", title: "Syncytium", domain: "topology", summary: "Explore concurrent writes, merge assumptions, and invariant checks.",
    parameters: [{ id: "writers", label: "Concurrent writers", min: 1, max: 8, initial: 3 }, { id: "merge", label: "Merge compatibility", min: 0, max: 100, initial: 82, unit: "%" }, { id: "strictness", label: "Invariant strictness", min: 0, max: 100, initial: 68, unit: "%" }],
    evaluate: (v) => { const conflicts = Math.max(0, Math.round((v.writers - 1) * (100 - v.merge) / 100)); const invariant = Math.max(0, Math.round(v.merge - conflicts * v.strictness / 15)); const converged = invariant >= 45; return { headline: converged ? "Merge converges under the declared model" : "Invariant check blocks the merged state", explanation: "Convergence is conditional on supported operations and replication assumptions. This browser model is not a distributed Syncytium runtime.", metrics: [{ label: "Merge compatibility", value: v.merge, display: `${v.merge}%` }, { label: "Conflict pressure", value: Math.min(100, conflicts * 25), display: `${conflicts} potential conflicts` }, { label: "Invariant score", value: invariant, display: `${invariant} / 100` }], stages: ["Versioned shared state", "Concurrent operations", "Merge supported writes", converged ? "Check invariants" : "Reject and reconcile"], state: converged ? "INVARIANTS PASS" : "RECONCILE" }; },
  },
  {
    id: "rhizome", title: "Rhizome", domain: "topology", summary: "Trace direct capability links, bridges, and gaps in a changing graph.",
    parameters: [{ id: "gap", label: "Capability gap", min: 0, max: 100, initial: 55, unit: "%" }, { id: "bridges", label: "Available bridges", min: 0, max: 8, initial: 3 }, { id: "search", label: "Exploration budget", min: 0, max: 100, initial: 60, unit: "%" }],
    evaluate: (v) => { const coverage = Math.min(100, Math.round(v.bridges * 12 + v.search * 0.45)); const reachable = coverage >= v.gap; return { headline: reachable ? "A direct capability path is available" : "The gap remains; a new route is only a proposal", explanation: "The model shows local graph coverage. Automatic multi-hop route creation remains proposed and is not implied by this simulation.", metrics: [{ label: "Capability coverage", value: coverage, display: `${coverage}%` }, { label: "Required gap", value: v.gap, display: `${v.gap}%` }, { label: "Exploration budget", value: v.search, display: `${v.search}%` }], stages: ["Identify capability gap", "Inspect adjacent links", reachable ? "Follow available bridge" : "Propose new connection" , "Validate route locally"], state: reachable ? "DIRECT PATH" : "GAP OPEN" }; },
  },
  {
    id: "metapopulation", title: "Metapopulation", domain: "topology", summary: "Model local loss, migration pressure, and recolonization capacity.",
    parameters: [{ id: "demes", label: "Regional groups", min: 2, max: 10, initial: 6 }, { id: "loss", label: "Groups extinguished", min: 0, max: 8, initial: 2 }, { id: "migration", label: "Migration capacity", min: 0, max: 100, initial: 58, unit: "%" }],
    evaluate: (v) => { const loss = Math.min(v.demes, v.loss); const survivors = v.demes - loss; const recolonized = Math.min(loss, Math.floor(v.migration / 25)); const viable = survivors + recolonized; return { headline: recolonized ? `${recolonized} vacant region${recolonized === 1 ? "" : "s"} recolonized in the model` : "No migration path can recolonize vacant regions", explanation: "The result is a bounded patch model; it does not model population quality, founder effects, or live migration services.", metrics: [{ label: "Regions remaining", value: viable / v.demes * 100, display: `${viable} / ${v.demes}` }, { label: "Vacant after recovery", value: (loss - recolonized) / v.demes * 100, display: `${loss - recolonized}` }, { label: "Migration capacity", value: v.migration, display: `${v.migration}%` }], stages: ["Regional groups", "Local extinction", "Migration and founders", recolonized ? "Validate recolonization" : "Recovery unavailable"], state: viable > 0 ? "RECOVERY MODEL" : "NO SURVIVORS" }; },
  },
  {
    id: "biome", title: "Biome", domain: "topology", summary: "Balance task demand with resource supply across ecological niches.",
    parameters: [{ id: "resources", label: "Available resources", min: 0, max: 100, initial: 62, unit: "%" }, { id: "demand", label: "Task load", min: 0, max: 100, initial: 48, unit: "%" }, { id: "niches", label: "Active niches", min: 1, max: 8, initial: 4 }],
    evaluate: (v) => { const supply = Math.min(100, v.resources + v.niches * 5); const pressure = Math.min(100, Math.max(0, v.demand - supply + 50)); const sustainable = supply >= v.demand; return { headline: sustainable ? "The modeled resource balance supports the load" : "Resource pressure exceeds the modeled supply", explanation: "This model illustrates resource accounting and niche diversity, not biological population dynamics or an automatic runtime adaptation.", metrics: [{ label: "Resource supply", value: supply, display: `${supply}%` }, { label: "Task load", value: v.demand, display: `${v.demand}%` }, { label: "Pressure", value: pressure, display: `${pressure}%` }], stages: ["Observe environment", "Map resource niches", sustainable ? "Allocate within budget" : "Constrain or defer work", "Review new signals"], state: sustainable ? "BALANCED" : "RESOURCE PRESSURE" }; },
  },
  {
    id: "agow", title: "AGOW attention", domain: "concept", summary: "Compare candidate salience with a broadcast threshold.",
    parameters: [{ id: "salience", label: "Candidate salience", min: 0, max: 100, initial: 72, unit: "%" }, { id: "threshold", label: "Ignition threshold", min: 10, max: 90, initial: 60, unit: "%" }, { id: "competition", label: "Competing candidates", min: 0, max: 100, initial: 28, unit: "%" }],
    evaluate: (v) => { const score = Math.max(0, v.salience - v.competition * 0.35); const ignites = score >= v.threshold; return { headline: ignites ? "Candidate crosses the illustrative ignition threshold" : "Candidate remains in local competition", explanation: "This simplified attention model visualizes competition and broadcast. It does not claim to reproduce biological consciousness.", metrics: [{ label: "Adjusted salience", value: score, display: `${Math.round(score)}%` }, { label: "Threshold", value: v.threshold, display: `${v.threshold}%` }, { label: "Competition", value: v.competition, display: `${v.competition}%` }], stages: ["Candidate signals", "Compete for attention", ignites ? "Ignition threshold crossed" : "Remain local", ignites ? "Broadcast to workspace" : "Continue evaluation"], state: ignites ? "BROADCAST MODEL" : "LOCAL CANDIDATE" }; },
  },
  {
    id: "genome", title: "Genome and epigenetics", domain: "concept", summary: "See how expression controls alter an available capability profile.",
    parameters: [{ id: "locus", label: "Capability loci", min: 1, max: 12, initial: 8 }, { id: "methylation", label: "Expression suppression", min: 0, max: 100, initial: 30, unit: "%" }, { id: "signal", label: "Activation signal", min: 0, max: 100, initial: 66, unit: "%" }],
    evaluate: (v) => { const expressed = Math.round(v.locus * Math.max(0.1, Math.min(1, (100 - v.methylation + v.signal * 0.35) / 100))); return { headline: `${expressed} of ${v.locus} modeled capability loci expressed`, explanation: "The analogy maps expression regulation to software capability availability. A slider is not a genetic mechanism and does not modify a GenOS agent.", metrics: [{ label: "Expression", value: expressed / v.locus * 100, display: `${expressed} / ${v.locus} loci` }, { label: "Suppression", value: v.methylation, display: `${v.methylation}%` }, { label: "Activation signal", value: v.signal, display: `${v.signal}%` }], stages: ["Inherited loci", "Apply expression state", "Resolve phenotype", "Expose active capabilities"], state: "PHENOTYPE MODEL" }; },
  },
  {
    id: "agent-dna", title: "AgentDNA mutation", domain: "concept", summary: "Follow a proposed mutation through validation before inheritance.",
    parameters: [{ id: "mutation", label: "Mutation pressure", min: 0, max: 100, initial: 35, unit: "%" }, { id: "fitness", label: "Task fitness", min: 0, max: 100, initial: 68, unit: "%" }, { id: "validation", label: "Validation coverage", min: 0, max: 100, initial: 75, unit: "%" }],
    evaluate: (v) => { const proposals = Math.ceil(v.mutation / 25); const eligible = v.validation >= 60 && v.fitness >= 50 ? Math.min(proposals, 2) : 0; return { headline: eligible ? `${eligible} mutation proposal${eligible === 1 ? "" : "s"} eligible for review` : "Mutation proposals remain unvalidated", explanation: "Eligibility is a teaching rule. The model does not alter lineage, clone an agent, or approve a mutation for a live runtime.", metrics: [{ label: "Proposals", value: v.mutation, display: `${proposals}` }, { label: "Fitness signal", value: v.fitness, display: `${v.fitness}%` }, { label: "Validation", value: v.validation, display: `${v.validation}%` }], stages: ["Inherited traits", "Generate candidate mutation", eligible ? "Validate candidate" : "Reject or gather evidence", "Human or policy review"], state: eligible ? "REVIEW CANDIDATE" : "NOT ELIGIBLE" }; },
  },
  {
    id: "evidence", title: "Evidence and belief revision", domain: "concept", summary: "Balance supporting evidence with contradictions and source quality.",
    parameters: [{ id: "support", label: "Supporting evidence", min: 0, max: 100, initial: 65, unit: "%" }, { id: "contradiction", label: "Contradictory evidence", min: 0, max: 100, initial: 25, unit: "%" }, { id: "provenance", label: "Source provenance", min: 0, max: 100, initial: 80, unit: "%" }],
    evaluate: (v) => { const confidence = Math.round(Math.max(0, Math.min(100, v.support * 0.55 + v.provenance * 0.3 - v.contradiction * 0.45))); return { headline: confidence >= 55 ? "Claim remains supported with stated uncertainty" : "Claim needs more evidence or revision", explanation: "This score is an illustrative decision aid. It is not a probability of truth and does not replace a source-specific evidence rule.", metrics: [{ label: "Illustrative support", value: confidence, display: `${confidence} / 100` }, { label: "Contradiction", value: v.contradiction, display: `${v.contradiction}%` }, { label: "Provenance", value: v.provenance, display: `${v.provenance}%` }], stages: ["State a claim", "Attach sources", "Check contradictions", confidence >= 55 ? "Retain with uncertainty" : "Revise or investigate"], state: confidence >= 55 ? "SUPPORTED, REVIEWABLE" : "UNCERTAIN" }; },
  },
  {
    id: "memory", title: "Memory consolidation", domain: "concept", summary: "Rank episodes for retrieval and consolidation into semantic memory.",
    parameters: [{ id: "recency", label: "Recency weight", min: 0, max: 100, initial: 45, unit: "%" }, { id: "relevance", label: "Mission relevance", min: 0, max: 100, initial: 78, unit: "%" }, { id: "provenance", label: "Provenance quality", min: 0, max: 100, initial: 82, unit: "%" }],
    evaluate: (v) => { const retrieval = Math.round(v.relevance * 0.55 + v.recency * 0.2 + v.provenance * 0.25); const consolidate = retrieval >= 65 && v.provenance >= 60; return { headline: consolidate ? "Episode is a consolidation candidate" : "Episode can be retrieved with caution", explanation: "The ranking model separates relevance and provenance. Memory retrieval can supply context but cannot prove a current claim.", metrics: [{ label: "Retrieval rank", value: retrieval, display: `${retrieval} / 100` }, { label: "Relevance", value: v.relevance, display: `${v.relevance}%` }, { label: "Provenance", value: v.provenance, display: `${v.provenance}%` }], stages: ["Record episode", "Rank by current mission", consolidate ? "Propose consolidation" : "Keep episodic context", "Attach provenance"], state: consolidate ? "CONSOLIDATION CANDIDATE" : "EPISODIC CONTEXT" }; },
  },
  {
    id: "immunity", title: "Epistemic immune response", domain: "concept", summary: "Route a suspicious claim through bounded checks and quarantine.",
    parameters: [{ id: "threat", label: "Threat signal", min: 0, max: 100, initial: 62, unit: "%" }, { id: "specificity", label: "Detection specificity", min: 0, max: 100, initial: 74, unit: "%" }, { id: "authority", label: "Authority check", min: 0, max: 100, initial: 90, unit: "%" }],
    evaluate: (v) => { const response = Math.round(v.threat * (0.4 + v.specificity / 170)); const contain = response >= 58 && v.authority >= 50; return { headline: contain ? "Route for bounded containment and human review" : "Keep under observation; avoid an automatic block", explanation: "The model shows a response pathway, not absolute immunity. Specificity and authority checks help expose overreaction and false positives.", metrics: [{ label: "Response signal", value: response, display: `${response}%` }, { label: "Specificity", value: v.specificity, display: `${v.specificity}%` }, { label: "Authority check", value: v.authority, display: `${v.authority}%` }], stages: ["Observe claim or signal", "Check source and authority", contain ? "Quarantine for review" : "Monitor without blocking", "Reassess with evidence"], state: contain ? "BOUNDED REVIEW" : "OBSERVE" }; },
  },
  {
    id: "lean", title: "Lean proof boundary", domain: "concept", summary: "Illustrate the boundary between a generated proof candidate and kernel verification.",
    parameters: [{ id: "candidate", label: "Proof candidate completeness", min: 0, max: 100, initial: 72, unit: "%" }, { id: "kernel", label: "Kernel check available", min: 0, max: 1, initial: 1 }, { id: "complexity", label: "Obligation complexity", min: 1, max: 10, initial: 4 }],
    evaluate: (v) => { const ready = v.kernel === 1 && v.candidate >= 50 + v.complexity * 4; return { headline: ready ? "Candidate reaches the illustrative verifier boundary" : "Candidate does not reach the verifier boundary", explanation: "No Lean compiler or kernel is run here. A real pass requires the exact proposition, proof artifact, and successful kernel result.", metrics: [{ label: "Candidate completeness", value: v.candidate, display: `${v.candidate}%` }, { label: "Verifier availability", value: v.kernel * 100, display: v.kernel ? "Available in model" : "Unavailable" }, { label: "Obligation complexity", value: v.complexity * 10, display: `${v.complexity} / 10` }], stages: ["State proposition", "Generate proof candidate", ready ? "Submit to kernel" : "Repair or simplify", ready ? "Await actual verifier result" : "No proof claim"], state: ready ? "CANDIDATE ONLY" : "NOT VERIFIED" }; },
  },
  {
    id: "brier", title: "Brier calibration", domain: "concept", summary: "Score a probability against a resolved outcome and compare a baseline.",
    parameters: [{ id: "forecast", label: "Forecast probability", min: 0, max: 100, initial: 70, unit: "%" }, { id: "outcome", label: "Resolved outcome", min: 0, max: 1, initial: 1 }, { id: "baseline", label: "Baseline probability", min: 0, max: 100, initial: 50, unit: "%" }],
    evaluate: (v) => { const p = v.forecast / 100; const b = v.baseline / 100; const score = (p - v.outcome) ** 2; const baselineScore = (b - v.outcome) ** 2; const better = score < baselineScore; return { headline: better ? "Forecast scores better than this baseline" : score === baselineScore ? "Forecast ties this baseline" : "Forecast scores worse than this baseline", explanation: `Binary Brier score = (p − o)² = ${score.toFixed(3)}. Lower is better for the same event definition and resolved outcome; one case does not establish calibration.`, metrics: [{ label: "Forecast Brier", value: (1 - score) * 100, display: score.toFixed(3) }, { label: "Baseline Brier", value: (1 - baselineScore) * 100, display: baselineScore.toFixed(3) }, { label: "Outcome", value: v.outcome * 100, display: v.outcome ? "Resolved: yes" : "Resolved: no" }], stages: ["State event", "Record probability", "Wait for resolution", better ? "Lower error on this case" : "No improvement on this case"], state: better ? "LOWER CASE ERROR" : "BASELINE NOT BEATEN" }; },
  },
  {
    id: "stdp", title: "STDP timing rule", domain: "concept", summary: "Illustrate a pair-based timing window without claiming neural or runtime equivalence.",
    parameters: [{ id: "delta", label: "Post − pre timing", min: -50, max: 50, initial: 10, unit: " ms" }, { id: "window", label: "Learning window", min: 5, max: 50, initial: 20, unit: " ms" }, { id: "amplitude", label: "Maximum update", min: 0, max: 100, initial: 40, unit: "%" }],
    evaluate: (v) => { const magnitude = Math.abs(v.delta) <= v.window ? v.amplitude * Math.exp(-Math.abs(v.delta) / v.window) : 0; const update = v.delta > 0 ? magnitude : v.delta < 0 ? -magnitude : 0; const bounded = Math.max(-100, Math.min(100, update)); return { headline: bounded > 0 ? "Illustrative potentiation" : bounded < 0 ? "Illustrative depression" : "No update outside the declared window", explanation: `Pair rule: Δw = sign(Δt) · A · exp(−|Δt|/τ) inside the window. This simplified curve is not the full biological model or the GenOS runtime's exact rule.`, metrics: [{ label: "Signed weight change", value: Math.abs(bounded), display: `${bounded > 0 ? "+" : ""}${bounded.toFixed(1)}` }, { label: "Timing window", value: v.window * 2, display: `±${v.window} ms` }, { label: "Event order", value: v.delta > 0 ? 100 : v.delta < 0 ? 0 : 50, display: v.delta > 0 ? "Pre before post" : v.delta < 0 ? "Post before pre" : "Simultaneous" }], stages: ["Observe event pair", "Measure Δt", "Apply bounded curve", "Validate on a declared task"], state: bounded > 0 ? "POTENTIATION MODEL" : bounded < 0 ? "DEPRESSION MODEL" : "NO CHANGE" }; },
  },
];

function ModelRunner({ model }: { model: Model }) {
  const [values, setValues] = useState(() => Object.fromEntries(model.parameters.map((parameter) => [parameter.id, parameter.initial])));
  const result = model.evaluate(values);
  return <>
    <div className="model-controls">
      {model.parameters.map((parameter) => <label className="model-control" key={parameter.id}>
        <span><b>{parameter.label}</b><output>{values[parameter.id]}{parameter.unit ?? ""}</output></span>
        <input type="range" min={parameter.min} max={parameter.max} step="1" value={values[parameter.id]} onChange={(event) => setValues((current) => ({ ...current, [parameter.id]: Number(event.target.value) }))} aria-label={parameter.label} />
      </label>)}
    </div>
    <section className="model-outcome" aria-live="polite">
      <div className="model-result"><span className="learning-kicker">SIMULATED RESULT</span><b>{result.state}</b><h3>{result.headline}</h3><p>{result.explanation}</p></div>
      <div className="model-metrics">{result.metrics.map((metric) => <div className="model-metric" key={metric.label}><span>{metric.label}</span><b>{metric.display}</b><i><em style={{ width: `${Math.max(0, Math.min(100, metric.value))}%` }} /></i></div>)}</div>
      <ol className="model-stages">{result.stages.map((stage, index) => <li key={`${stage}-${index}`} className={index === result.stages.length - 1 ? "is-current" : ""}><span>{String(index + 1).padStart(2, "0")}</span>{stage}</li>)}</ol>
    </section>
  </>;
}

export function P2ModelLab({ initialModelId }: { initialModelId?: string }) {
  const initialModel = models.find((model) => model.id === initialModelId);
  const [domain, setDomain] = useState<Model["domain"]>(initialModel?.domain ?? "topology");
  const candidates = models.filter((model) => model.domain === domain);
  const [selectedId, setSelectedId] = useState(initialModel?.id ?? "trinity");
  const active = candidates.find((model) => model.id === selectedId) ?? candidates[0];
  if (!active) return null;
  return <section className="section-wrap p2-model-lab" aria-label="Interactive GenOS models">
    <div className="model-domain-tabs" role="group" aria-label="Model category">
      <button type="button" aria-pressed={domain === "topology"} onClick={() => { setDomain("topology"); setSelectedId("trinity"); }}>8 topology models</button>
      <button type="button" aria-pressed={domain === "concept"} onClick={() => { setDomain("concept"); setSelectedId("agow"); }}>{models.filter((model) => model.domain === "concept").length} concept models</button>
    </div>
    <div className="model-workbench">
      <nav className="model-picker" aria-label={`${domain === "topology" ? "Topology" : "Concept"} model selection`}>
        {candidates.map((model, index) => <button type="button" key={model.id} aria-pressed={model.id === active.id} onClick={() => setSelectedId(model.id)}><span>{String(index + 1).padStart(2, "0")}</span><b>{model.title}</b><i>↗</i></button>)}
      </nav>
      <article className="model-card" key={active.id}>
        <header className="model-card-heading"><div><span className="learning-kicker">{active.domain === "topology" ? "TOPOLOGY MODEL" : "CONCEPT MODEL"} · LOCAL SIMULATION</span><h2>{active.title}</h2><p>{active.summary}</p></div><span className="demo-badge">BROWSER SIMULATION</span></header>
        <ModelRunner key={active.id} model={active} />
        <p className="model-disclaimer">Teaching model only. It does not call GenOS, execute agents, prove a claim, or represent a recorded run.</p>
        {active.domain === "topology" && topologyExperiments[active.id] && <section className="model-experiment" aria-labelledby="model-experiment-title"><span className="learning-kicker">COMPARABLE EXPERIMENT PROTOCOL · PROPOSED</span><h3 id="model-experiment-title">A question this model cannot answer alone</h3><dl><dt>Hypothesis</dt><dd>{topologyExperiments[active.id].question}</dd><dt>Control</dt><dd>{topologyExperiments[active.id].baseline}</dd><dt>Measure</dt><dd>{topologyExperiments[active.id].metric}</dd><dt>Falsifier</dt><dd>{topologyExperiments[active.id].falsifier}</dd></dl><p>Pre-register task population, software/model versions, random seeds, and a shared budget before running either arm. The browser simulation is not evidence for this hypothesis.</p></section>}
      </article>
    </div>
  </section>;
}
