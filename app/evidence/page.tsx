import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { genosReviewedAt, genosSource, genosSourceCommit, productClaims } from "@/components/product-evidence";

export const metadata: Metadata = { title: "Evidence and implementation status", description: "Review GenOS V3 capability claims, their bounded implementation, missing work and evidence level.", alternates: { canonical: "/en/evidence" } };

export default function EvidencePage() {
  return (
    <div className="page-shell">
      <section className="page-hero section-wrap evidence-hero">
        <Eyebrow>EVIDENCE · CLAIMS AND LIMITS</Eyebrow>
        <h1>A claim is a place<br />to <em>start looking.</em></h1>
        <p>The GenOS product contract separates implemented, partial, experimental and planned capabilities. Each entry below names the working slice, the missing work and the strongest linked evidence type. A registered mode or successful transport is not a verified mission.</p>
        <div className="principle-callout"><span>GENOS PRINCIPLE</span><strong>A successful transport is not proof of a valid decision.</strong></div>
      </section>
      <section className="section-wrap section-space evidence-ledger-page">
        <div className="eyebrow">PRODUCT CLAIMS <span className="ledger-refresh">REVIEWED {genosReviewedAt} · GENOS {genosSourceCommit.slice(0, 7)}</span></div>
        <div className="ledger-head"><span>CAPABILITY</span><span>PRODUCT STATUS</span><span>IMPLEMENTED SLICE AND OPEN WORK</span><span>SOURCE</span></div>
        {productClaims.map((claim) => <article className="ledger-row" key={claim.id}><div className="ledger-name"><span className={`ledger-icon ledger-icon-${claim.status}`} aria-hidden="true">{claim.status === "implemented" ? "↗" : "◌"}</span><strong>{claim.name}</strong></div><div><span className={`status-chip status-${claim.status}`}><i /> {claim.status.toUpperCase()}</span><small className="evidence-level">{claim.label} · {claim.evidenceLevel}</small></div><p>{claim.implementedSlice} <strong>Still open:</strong> {claim.missingWork}</p><a href={genosSource(claim.sourcePath)} target="_blank" rel="noreferrer" aria-label={`Read GenOS source for ${claim.name}`}>↗</a></article>)}
        <div className="evidence-note"><span>↳</span><p>Statuses apply to the bounded interfaces described here. They are reviewed against one immutable V3 commit and may change when the runtime and its evidence change.</p><a href={genosSource("docs/03-reference/contrat-produit-et-completude.md")} target="_blank" rel="noreferrer">PRODUCT CONTRACT ↗</a></div>
      </section>
      <section className="section-wrap evidence-links"><Eyebrow>GO DEEPER</Eyebrow><a href={genosSource("docs/02-orchestration/topologies-et-capacites.md")} target="_blank" rel="noreferrer">Topology capability contract <span>↗</span></a><a href={genosSource("docs/03-reference/plugins-topologies-morphogenese.md")} target="_blank" rel="noreferrer">Morphogenesis plugin contract <span>↗</span></a><a href={genosSource("docs/06-qualite-preuves/missions-live-biocenose-sqlite-2026-10-04.md")} target="_blank" rel="noreferrer">Biocenosis live campaign <span>↗</span></a></section>
    </div>
  );
}
