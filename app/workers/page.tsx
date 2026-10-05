import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { WorkersExplorer } from "@/components/workers-explorer";
import "../workers.css";

export const metadata: Metadata = {
  title: "Workers and types",
  description: "Explore the role of a GenOS worker, its execution contract, and 19 types grouped into five families.",
  alternates: { canonical: "/en/workers" },
};

const families = [
  {
    id: "sensory",
    number: "01",
    title: "Observe",
    name: "Sensing family",
    intro: "Observe a scope, collect signals, and report findings before a decision is made.",
    tone: "sage",
    workers: [
      { id: "scout_cell", title: "Scout cell", description: "Can scan supplied text for literal terms and report exact offsets with source references; broader observation still depends on its mission tools.", artifact: "scout_observation", detail: "scan_literal · bounded corpus" },
      { id: "resident_daemon", title: "Resident daemon", description: "Can check a bounded, timestamped sample window against a numeric threshold. Continuous territory monitoring uses a separate resident path.", artifact: "dossier", detail: "monitor_samples · finite window" },
    ],
  },
  {
    id: "execution",
    number: "02",
    title: "Execute",
    name: "Execution family",
    intro: "Perform assigned work within a defined scope, budget, and toolset.",
    tone: "ochre",
    workers: [
      { id: "bounded_worker", title: "Bounded worker", description: "Completes only its assigned scope and cites references for the outputs it finished.", artifact: "dossier", detail: "fixed scope · 10 iterations" },
      { id: "adaptive_worker", title: "Adaptive worker", description: "Changes only among contract strategies and records each decision with its rationale and evidence.", artifact: "dossier", detail: "local adaptation · capped" },
      { id: "specialist", title: "Specialist", description: "Applies an adaptive approach only within a required, explicitly declared skill niche.", artifact: "dossier", detail: "declared niche · focused analysis" },
      { id: "procedural_executor", title: "Procedural executor", description: "Runs bounded LPT scheduling and subset-sum search without model tokens. Unsupported methods fail closed.", artifact: "dossier", detail: "LPT · subset_sum · 0 LLM tokens" },
      { id: "symbiotic_worker", title: "Symbiotic worker", description: "Uses only capabilities named by an explicit host contract and stays within its authority limits.", artifact: "dossier", detail: "authority inherited from host" },
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
      { id: "verifier_worker", title: "Verifier", description: "Can recompute an LPT or subset-sum receipt and return a sourced accept or reject verdict.", artifact: "verification_report", detail: "verify_procedure · bounded" },
      { id: "red_worker", title: "Adversarial worker", description: "Can falsify a claimed procedure receipt with a reproducible counterexample; a matching receipt remains unresolved.", artifact: "verification_report", detail: "falsify_procedure · bounded" },
      { id: "experimental_worker", title: "Experimenter", description: "Can execute an LPT experiment, measure makespan, and compare it with a declared threshold.", artifact: "experiment_record", detail: "measure_lpt · one input" },
      { id: "formal_worker", title: "Formal worker", description: "Uses a configured Lean runner to prove a closed arithmetic comparison; other proof classes are not yet connected.", artifact: "formal_certificate", detail: "Lean · closed arithmetic only" },
      { id: "synthesis_worker", title: "Synthesis worker", description: "Can group exactly matching sourced claims while preserving contradictory positions and provenance.", artifact: "synthesis_dossier", detail: "synthesize_claims · exact match" },
    ],
  },
  {
    id: "repair",
    number: "04",
    title: "Adapt and repair",
    name: "Adaptation and repair family",
    intro: "Explore options, diagnose a situation, or return to a known state under control.",
    tone: "rose",
    workers: [
      { id: "creative_worker", title: "Creative worker", description: "Returns a candidate with explicit assumptions and a test that could falsify it.", artifact: "creative_candidate", detail: "read-only · candidate not promoted" },
      { id: "medical_worker", title: "Medical worker", description: "Produces non-diagnostic educational considerations for a synthetic case; no individual treatment advice.", artifact: "clinical_report", detail: "synthetic case · no real diagnosis" },
      { id: "recovery_worker", title: "Recovery worker", description: "Reports the recovery action and restored state with a receipt and evidence references.", artifact: "dossier", detail: "restore · 3 iterations" },
      { id: "forensic_worker", title: "Forensic worker", description: "Reconstructs only declared incident links from timestamped events and causation references; their real-world truth remains unverified.", artifact: "causal_dossier", detail: "declared links · no inferred cause" },
    ],
  },
  {
    id: "organizational",
    number: "05",
    title: "Connect and teach",
    name: "Organizational family",
    intro: "Support knowledge sharing and, in a bounded case, coordinate a mission subgraph.",
    tone: "blue",
    workers: [
      { id: "liaison_worker", title: "Liaison worker", description: "Transfers cited information between distinct source and target groups.", artifact: "dossier", detail: "read-only · communication bridge" },
      { id: "teaching_worker", title: "Teaching worker", description: "Can teach a bounded subset-sum instance and check a learner's proposed indices against the target sum.", artifact: "training_packet", detail: "teach_subset_sum · transfer check" },
      { id: "sub_orchestrator", title: "Sub-orchestrator", description: "Coordinates at most five children and reports each child outcome with evidence.", artifact: "dossier", detail: "only type with bounded delegation" },
    ],
  },
];

export default function WorkersPage() {
  return (
    <div className="page-shell workers-page" lang="en">
      <section className="page-hero section-wrap workers-hero">
        <Eyebrow>WORKERS · ROLES AND CONTRACTS</Eyebrow>
        <h1>A worker receives<br />a frame to <em>act.</em></h1>
        <p>In GenOS, a worker is a child agent assigned a specific mission. Its type determines the execution contract: capabilities, authority, available tools, limits, and expected evidence.</p>
        <div className="workers-hero-facts"><span><b>19</b> canonical types</span><i>×</i><span><b>5</b> families</span><i>×</i><span><b>1</b> contract per mission</span></div>
      </section>

      <section className="section-wrap worker-model" aria-labelledby="worker-model-title">
        <div className="worker-model-copy">
          <Eyebrow>THE MODEL</Eyebrow>
          <h2 id="worker-model-title">Mission + contract + lease.<br /><em>A traceable record.</em></h2>
          <p>The parent assigns an objective and scope. The runtime resolves a type, applies authorized permissions and tools, then requests a result in the expected format with its provenance.</p>
        </div>
        <div className="worker-equation" role="img" aria-label="Mission plus type, contract, and lease produce a typed, sourced record">
          <div><span>INPUT</span><b>Mission</b><small>objective · scope</small></div><i>+</i>
          <div><span>PROFILE</span><b>Type</b><small>canonical phenotype</small></div><i>→</i>
          <div className="worker-equation-result"><span>EXPECTED RESULT</span><b>Record</b><small>typed · sourced · bounded</small></div>
        </div>
      </section>

      <section className="section-wrap worker-taxonomy" aria-label="Worker type catalog">
        <div className="worker-taxonomy-heading"><Eyebrow>THE CATALOG · 19 TYPES</Eyebrow><p>Each type provides a contract and output artifact suited to a function. Contract details depend on the execution path.</p></div>
        <WorkersExplorer families={families} />
      </section>

      <section className="worker-distinctions-wrap">
        <div className="section-wrap worker-distinctions">
          <div><Eyebrow light>KEEP THESE DISTINCT</Eyebrow><h2>Type, role, and topology<br /><em>mean different things.</em></h2></div>
          <div className="worker-distinction-list">
            <article><span>TYPE</span><div><h3>The worker contract</h3><p><code>verifier_worker</code> defines a profile and an expected evidence format.</p></div></article>
            <article><span>ROLE</span><div><h3>The task within a mission</h3><p><code>independent_reviewer</code> or <code>implementation</code> describes an assignment that can be paired with a compatible type.</p></div></article>
            <article><span>TOPOLOGY</span><div><h3>The team structure</h3><p>Trinity, A-Team, or Biome describe how participants work together. A topology does not create a new worker type.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section-wrap worker-evidence-note">
        <div><Eyebrow>CONTRACTS AND INTEGRATION STATUS</Eyebrow><h2>A type defines a frame.<br /><em>Evidence shows what runs.</em></h2></div>
          <div><p>The canonical catalog has 19 <code>WorkerKind</code> values. Narrow deterministic methods now run for procedural, formal, verifier, red, experimental, synthesis, resident, forensic, scout, and teaching workers. The remaining kinds still rely on their contracted runtime paths.</p><p>The local benchmark has 20 cases: 10 pass without Lean, one more passes with Lean, and nine remain unmeasured. AutoGen has only two comparable procedural cases, so no general parity claim follows. A successful artifact or transport does not prove a valid decision.</p><p>Worker token and time budgets are capped by the canonical contract; zero-token routes do not fall back to a model call. An explicit empty tool lease grants no tools, and a supplied lease can only restrict the role policy.</p><div className="worker-source-links"><a href="https://github.com/PISSARAW/GenOS/blob/698993b1d0854802c9c95b4786df9d18863dbf1a/docs/03-reference/types-de-workers.md" target="_blank" rel="noreferrer">Read the catalog and its limits <span>↗</span></a><Link href="/evidence">View the evidence registry <span>→</span></Link></div></div>
      </section>
    </div>
  );
}
