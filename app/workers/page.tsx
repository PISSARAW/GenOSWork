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
      { id: "scout_cell", title: "Scout cell", description: "Performs a short, read-only observation and returns findings with their sources.", artifact: "scout_observation", detail: "ephemeral · 1 iteration" },
      { id: "resident_daemon", title: "Resident daemon", description: "Monitors an area and reports relevant changes over time.", artifact: "dossier", detail: "resident · probes and snapshots" },
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
      { id: "bounded_worker", title: "Bounded worker", description: "Executes a focused mission with assigned tools and no delegation.", artifact: "dossier", detail: "fixed scope · 10 iterations" },
      { id: "adaptive_worker", title: "Adaptive worker", description: "Can locally adjust its strategy under rules and a limited number of changes.", artifact: "dossier", detail: "local adaptation · capped" },
      { id: "specialist", title: "Specialist", description: "Applies an adaptive approach within a declared skill niche.", artifact: "dossier", detail: "declared niche · focused analysis" },
      { id: "procedural_executor", title: "Procedural executor", description: "Follows a deterministic procedure delegated to a solver, with no LLM token budget in the Rust preset.", artifact: "dossier", detail: "deterministic · 0 LLM tokens" },
      { id: "symbiotic_worker", title: "Symbiotic worker", description: "Provides a procedural capability within its host's authority limits.", artifact: "dossier", detail: "authority inherited from host" },
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
      { id: "verifier_worker", title: "Verifier", description: "Independently examines a claim and returns an Accepted, Rejected, or Unresolved verdict.", artifact: "verification_report", detail: "read-only · evidence expected" },
      { id: "red_worker", title: "Adversarial worker", description: "Looks for counterexamples and tests a proposal through adversarial analysis.", artifact: "verification_report", detail: "adversarial approach" },
      { id: "experimental_worker", title: "Experimenter", description: "Connects a hypothesis to a protocol and observed measurements.", artifact: "experiment_record", detail: "hypothesis → protocol → measurements" },
      { id: "formal_worker", title: "Formal worker", description: "Produces a formal verification with a deterministic solver.", artifact: "formal_certificate", detail: "deterministic · solver receipt" },
      { id: "synthesis_worker", title: "Synthesis worker", description: "Combines multiple sources while preserving their provenance and disagreements.", artifact: "synthesis_dossier", detail: "read-only · sources retained" },
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
      { id: "creative_worker", title: "Creative worker", description: "Suggests new directions and pairs them with hypotheses to falsify.", artifact: "creative_candidate", detail: "read-only · candidate not promoted" },
      { id: "medical_worker", title: "Medical worker", description: "Produces an educational clinical report on a synthetic case, with explicit uncertainty.", artifact: "clinical_report", detail: "synthetic case · no real diagnosis" },
      { id: "recovery_worker", title: "Recovery worker", description: "Helps resume from a checkpoint with a smaller mission and iteration limit.", artifact: "dossier", detail: "restore · 3 iterations" },
      { id: "forensic_worker", title: "Forensic worker", description: "Reconstructs a causal chain after an incident from sourced evidence.", artifact: "causal_dossier", detail: "causal analysis · evidence expected" },
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
      { id: "liaison_worker", title: "Liaison worker", description: "Bridges participants and passes mission-relevant information between them.", artifact: "dossier", detail: "read-only · communication bridge" },
      { id: "teaching_worker", title: "Teaching worker", description: "Structures instruction into prerequisites, steps, and evidence.", artifact: "training_packet", detail: "read-only · documented steps" },
      { id: "sub_orchestrator", title: "Sub-orchestrator", description: "Coordinates a depth-1 subgraph with a maximum budget of five child workers in the Rust preset.", artifact: "dossier", detail: "only type with bounded delegation" },
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
          <div><p>The canonical catalog of 19 <code>WorkerKind</code> values is defined in the Rust runtime. The Node registry knows all 19 identifiers, but some profiles map to shared phenotypes, so the effective contracts differ between the two layers.</p><p>A successful artifact or transport does not prove a result is valid. GenOS checks the expected format and provenance according to the execution path and evidence gate used.</p><p>Worker paths share bounded cognitive-budget normalization; an explicit empty tool lease grants no tools, and a supplied lease can only restrict the role policy.</p><div className="worker-source-links"><a href="https://github.com/PISSARAW/GenOS/blob/6133af69933c86f39f0396f801f2ce2b3385826b/docs/03-reference/types-de-workers.md" target="_blank" rel="noreferrer">Read the catalog and its limits <span>↗</span></a><Link href="/evidence">View the evidence registry <span>→</span></Link></div></div>
      </section>
    </div>
  );
}
