import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: "The orchestrator",
  description: "How GenOS plans and supervises missions, dispatches bounded workers, and checks evidence before a result can be closed or promoted.",
  alternates: { canonical: "/orchestrator" },
};

const stages = [
  { n: "01", title: "Route the request", body: "Classify the request and choose the smallest suitable execution path. A known result or a direct procedure can avoid a worker mission entirely.", tag: "PROFILE · ROUTE" },
  { n: "02", title: "Set the mission contract", body: "Define the strategy, available work, budgets and constraints before planning workers. Permissions and capacity can narrow or stop a proposed plan.", tag: "STRATEGY · BUDGET" },
  { n: "03", title: "Plan and reconcile", body: "Build bounded phases and assignments, then compare the selected assignments with the workers actually created. A mismatch blocks the mission from proceeding as if dispatch had succeeded.", tag: "PLAN · DISPATCH" },
  { n: "04", title: "Execute in bounded workspaces", body: "Workers operate under declared leases and isolated workspaces. Parallel branches can preserve separate trajectories for comparison when the mission contract allows it.", tag: "WORKERS · ISOLATION" },
  { n: "05", title: "Check evidence and close", body: "Wait for expected work to reach a stable state, collect evidence and check mission invariants. Missing evidence or failed checks can leave a mission incomplete, blocked or ready for bounded recovery.", tag: "EVIDENCE · GATE" },
];

const guardrails = [
  { title: "A completed worker is not proof", body: "Transport and worker status are observations. A result needs the expected evidence and checks before the mission can be considered complete." },
  { title: "Plans meet real limits", body: "Budgets, permissions, fan-out, workspace isolation and available capacity constrain the work that can actually run." },
  { title: "Topology names carry no blanket guarantee", body: "A registered topology or capability profile does not prove that every capability is active or that a proposed plan was dispatched." },
];

export default function OrchestratorPage() {
  return (
    <div className="page-shell orchestrator-page">
      <section className="page-hero section-wrap orchestrator-hero">
        <Eyebrow>CONTROL PLANE · MISSION ORCHESTRATION</Eyebrow>
        <h1>Coordinate the work.<br />Keep the <em>receipts.</em></h1>
        <p>The GenOS orchestrator plans and supervises backend missions: it applies a strategy and budget, dispatches bounded workers, and checks evidence before closure. It makes execution inspectable; it does not turn a successful dispatch into proof of a correct result.</p>
        <div className="hero-actions">
          <Link className="button button-dark" href="/runtime/supervision">Open mission supervision <span>→</span></Link>
          <Link className="button button-quiet" href="/topologies">Explore topologies <span>→</span></Link>
        </div>
        <div className="orchestrator-status"><i /> PARTIAL IMPLEMENTATION <span>·</span> NODE.JS MISSION CONTROL</div>
      </section>

      <section className="section-wrap orchestrator-flow-section" aria-labelledby="orchestrator-flow-title">
        <div className="orchestrator-section-heading">
          <div><Eyebrow>THE MISSION PATH</Eyebrow><h2 id="orchestrator-flow-title">From request<br />to <em>verified close.</em></h2></div>
          <p>The path branches according to the request and its contract. Some work can be served directly; missions that need workers move through planning, dispatch, evidence and a completion gate.</p>
        </div>
        <div className="orchestrator-flow-rail" aria-hidden="true"><span>REQUEST</span><i /><span>CONTRACT</span><i /><span>PLAN</span><i /><span>DISPATCH</span><i /><span>PROOF</span></div>
        <div className="orchestrator-stages">{stages.map((stage) => <article className="orchestrator-stage" key={stage.n}><span className="orchestrator-stage-n">{stage.n}</span><div><span className="orchestrator-stage-tag">{stage.tag}</span><h3>{stage.title}</h3><p>{stage.body}</p></div><span className="orchestrator-stage-arrow" aria-hidden="true">↘</span></article>)}</div>
      </section>

      <section className="orchestrator-guardrail-wrap"><div className="section-wrap orchestrator-guardrails">
        <div className="orchestrator-guardrail-intro"><Eyebrow light>WHAT THE CONTROL PLANE ENFORCES</Eyebrow><h2>Every decision<br />has a <em>boundary.</em></h2><p>Mission status and topology labels are not substitutes for the contracts and evidence attached to a run.</p></div>
        <div className="orchestrator-guardrail-list">{guardrails.map((item, i) => <article key={item.title}><span>0{i + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div>
      </div></section>

      <section className="section-wrap orchestrator-runtime-note">
        <div><Eyebrow>IMPLEMENTATION BOUNDARY</Eyebrow><h2>Two runtimes,<br /><em>different jobs.</em></h2></div>
        <div className="orchestrator-runtime-copy"><p>The backend Node.js control plane plans and supervises missions and their workers. The Rust <code>genos-orchestrator</code> crate runs a local ecosystem simulation; it does not launch those backend workers or certify a Node mission’s deliverable.</p><p>The main mission path still uses the historical morphology preparer. Morphogenesis V2 can run as an opt-in shadow preflight, which evaluates a proposal without applying or committing a transition.</p><a href="https://github.com/PISSARAW/GenOS/blob/main/docs/02-orchestration/orchestration.md" target="_blank" rel="noreferrer">Read the operational orchestration contract ↗</a></div>
      </section>

      <section className="section-wrap orchestrator-next-links" aria-label="Related pages">
        <Eyebrow>CONTINUE EXPLORING</Eyebrow>
        <Link href="/runtime/supervision"><span>01 / INSPECT</span><strong>Mission supervision</strong><b>→</b></Link>
        <Link href="/topologies"><span>02 / COMPOSE</span><strong>Topology contracts</strong><b>→</b></Link>
        <Link href="/evidence"><span>03 / VERIFY</span><strong>Evidence ledger</strong><b>→</b></Link>
      </section>
    </div>
  );
}
