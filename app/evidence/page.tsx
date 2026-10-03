import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = { title: "Evidence and implementation status", description: "Review GenOS capability claims alongside implementation status, source documentation and known limitations.", alternates: { canonical: "/en/evidence" } };

const evidenceCommit = "b935962a26e2967de39db4cb253424fac44cc7e3";
const evidenceSource = `https://github.com/PISSARAW/GenOS/blob/${evidenceCommit}/`;

const rows = [
  { name: "Counterfactual snapshots", status: "IMPLEMENTED", tone: "implemented", body: "Snapshot, fork, diff and replay workflows are part of the runtime.", href: `${evidenceSource}docs/02-orchestration/git-agents.md`, source: "Agent Git snapshots and replay" },
  { name: "Eight topology modes", status: "WIRED", tone: "implemented", body: "Each mode has different services and capability limits; registration is not full feature parity.", href: `${evidenceSource}docs/02-orchestration/topologies-et-capacites.md`, source: "Topology capability contract" },
  { name: "Rhizome session routing", status: "CALLABLE · BOUNDED", tone: "partial", body: "The topology-session API plans bounded multi-hop routes over the persisted graph. Autonomous mission integration, provider execution and end-to-end growth remain experimental.", href: `${evidenceSource}backend/src/services/topologySessionTools.js`, source: "Rhizome topology-session route operation" },
  { name: "Continuous web perception loop", status: "PARTIAL", tone: "partial", body: "Web observation and foveation primitives exist; a complete observe–act–verify loop does not.", href: `${evidenceSource}README.md`, source: "Runtime limitations" },
  { name: "Morphogenesis topology plugins", status: "IMPLEMENTED · BOUNDED", tone: "partial", body: "Variant changes require a registered transition and satisfied conditions and evidence. Execution receipts are unverified traces; graph completion alone does not prove the mission or create a learning experience.", href: `${evidenceSource}docs/03-reference/plugins-topologies-morphogenese.md`, source: "Plugin contract and limits" },
  { name: "HOX lineage differentiation", status: "CONNECTED · LIMITED PATH", tone: "partial", body: "The Rust biology orchestrator resolves cell lineage from expressed HOX state under energy and epigenetic constraints. It does not model morphogen diffusion and is not an automatic step in every backend mission.", href: `${evidenceSource}docs/01-concepts/biologie-computationnelle.md`, source: "Computational biology scope" },
  { name: "Regulation and Eureka events", status: "TRANSITION-GATED", tone: "partial", body: "A Eureka event is emitted only after an accepted regulation transition; ordinary process completion or shutdown does not count as evidence or reward.", href: `${evidenceSource}docs/adr/0111-regulation-cognitive-bornee-et-eureka.md`, source: "Bounded cognitive regulation" },
  { name: "Dissonance pathology marker", status: "CONFIGURABLE · SOFTWARE MODEL", tone: "partial", body: "The marker requires a finite positive threshold and a dissonance ratio above 0.85. It stores the raw score and is not a medical diagnosis or proof of hallucination.", href: `${evidenceSource}crates/genos-biology/src/pathology.rs`, source: "Degenerative-state threshold" },
];

export default function EvidencePage() {
  return (
    <div className="page-shell">
      <section className="page-hero section-wrap evidence-hero">
        <Eyebrow>EVIDENCE · CLAIMS AND LIMITS</Eyebrow>
        <h1>A claim is a place<br />to <em>start looking.</em></h1>
        <p>GenOS separates what is wired, what is partial and what is proposed. Follow each reference to the canonical runtime docs for current contracts, tests and limitations.</p>
        <div className="principle-callout"><span>GENOS PRINCIPLE</span><strong>A successful transport is not proof of a valid decision.</strong></div>
      </section>
      <section className="section-wrap section-space evidence-ledger-page">
        <div className="eyebrow">IMPLEMENTATION LEDGER <span className="ledger-refresh">SOURCES IN GENOS @ {evidenceCommit.slice(0, 7)} ↗</span></div>
        <div className="ledger-head"><span>CAPABILITY</span><span>RUNTIME STATUS</span><span>WHAT THE SOURCE SAYS</span><span>SOURCE</span></div>
        {rows.map((row) => <article className="ledger-row" key={row.name}><div className="ledger-name"><span className={`ledger-icon ledger-icon-${row.tone}`} aria-hidden="true">{row.tone === "proposed" ? "⌁" : row.tone === "partial" ? "◌" : "↗"}</span><strong>{row.name}</strong></div><div><span className={`status-chip status-${row.tone}`}><i /> {row.status}</span></div><p>{row.body}</p><a href={row.href} target="_blank" rel="noreferrer" aria-label={`Read source: ${row.source}`}>↗</a></article>)}
        <div className="evidence-note"><span>↳</span><p>Status changes with the runtime. Source documentation is canonical; this ledger is a concise guide and should be reviewed when implementation changes.</p><a href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noreferrer">OPEN GENOS ↗</a></div>
      </section>
      <section className="section-wrap evidence-links"><Eyebrow>GO DEEPER</Eyebrow><a href="https://github.com/PISSARAW/GenOS/blob/v3/docs/02-orchestration/topologies-et-capacites.md" target="_blank" rel="noreferrer">Topology capability contract <span>↗</span></a><a href="https://github.com/PISSARAW/GenOS/blob/v3/docs/03-reference/plugins-topologies-morphogenese.md" target="_blank" rel="noreferrer">Morphogenesis plugin contract <span>↗</span></a><a href="https://github.com/PISSARAW/GenOS/tree/v3/docs/06-qualite-preuves" target="_blank" rel="noreferrer">Evidence and quality docs <span>↗</span></a></section>
    </div>
  );
}
