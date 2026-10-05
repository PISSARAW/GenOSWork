import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/eyebrow";
import { getTopology, topologies } from "@/components/topologies";
import { topologyGuides } from "@/components/topology-guides";
import { TopologySimulation } from "@/components/topology-simulation";
import { concepts } from "@/components/concepts";
import { RealityBar, genosSourceCommit } from "@/components/reality-bar";
import { genosSource, topologyClaim } from "@/components/product-evidence";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return topologies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topology = getTopology(slug);
  return topology ? {
    title: topology.name,
    description: `${topology.summary} Read its GenOS runtime profile and known limits.`,
    alternates: {
      canonical: `/en/topologies/${slug}`,
      languages: { en: `/en/topologies/${slug}`, fr: `/fr/topologies/${slug}` },
    },
  } : {};
}

export default async function TopologyDetailPage({ params }: Props) {
  const { slug } = await params;
  const topology = getTopology(slug);
  if (!topology) notFound();
  const guide = topologyGuides[slug];
  if (!guide) notFound();
  const claim = topologyClaim(slug);
  const glyph = topology.slug === "a-team" ? "ateam" : topology.slug === "biocenose" ? "bio" : topology.slug === "holobionte" ? "holo" : topology.slug === "metapopulation" ? "meta" : topology.slug;
  return (
    <div className="page-shell">
      <section className="page-hero section-wrap topology-detail-hero">
        <Link className="back-link" href="/topologies">← ALL TOPOLOGIES</Link>
        <div className={`topology-detail-glyph topology-${topology.color} glyph-${glyph}`} aria-hidden="true"><i /><i /><i /><i /></div>
        <Eyebrow>{topology.index} · TOPOLOGY PROFILE</Eyebrow>
        <h1>{topology.name}<br /><em>{topology.summary}</em></h1>
        <p>{topology.principle}</p>
        <span className={`status-chip status-${topology.implementation}`}><i /> {topology.implementation.toUpperCase()} · {topology.status}</span>
      </section>
      <div className="section-wrap topology-reality-wrap">
        <RealityBar implementation={topology.implementation} integration={topology.integration} evidence={topology.evidence} note={topology.statusNote} />
      </div>
      <section className="section-wrap topology-context-grid">
        <article className="topology-context-card"><Eyebrow>01 / PURPOSE</Eyebrow><h2>What it is for</h2><p>{guide.purpose}</p></article>
        <article className="topology-context-card"><Eyebrow>02 / SELECTION</Eyebrow><h2>When to use it</h2><p>{guide.selection}</p></article>
        <article className="topology-context-card topology-science-card"><Eyebrow>03 / SCIENTIFIC BASIS</Eyebrow><h2>Inspiration<br /><em>and limits.</em></h2><p>{guide.scientificBasis}</p></article>
      </section>
      <section className="section-wrap section-space profile-grid">
        <article className="profile-panel"><Eyebrow>RUNTIME PATH</Eyebrow><h2>What is wired</h2><p>{topology.runtime}</p></article>
        <article className="profile-panel profile-limit"><Eyebrow>KNOWN BOUNDARY</Eyebrow><h2>What this does not imply</h2><p>{topology.limit}</p></article>
      </section>
      {(slug === "syncytium" || slug === "holobionte") && <section className="section-wrap topology-evidence-section">
        <article className="topology-failure-panel"><Eyebrow>V3 · MISSION PROTOCOL</Eyebrow><h2>{slug === "syncytium" ? "Shared-state qualification" : "Host and symbiont qualification"}</h2>
          <p>{slug === "syncytium"
            ? "The protocol must distinguish a persisted local session from independent writers. Record versions, admissible operations, merge assumptions, invariant results, conflicts and recovery receipts for each mission."
            : "The protocol must record host authority, admitted resident capabilities, resource allocation, action receipts, health, contribution and succession. A supplied capability does not imply that an immune veto ran."}</p>
          <a href={genosSource(`docs/02-orchestration/topologies/${slug}.md`)} target="_blank" rel="noreferrer">Read the canonical mission protocol ↗</a>
        </article>
        <article className="topology-evidence-panel"><Eyebrow>PROOF BOUNDARY</Eyebrow><h2>What remains to run</h2>
          <p>{slug === "syncytium"
            ? "The documented CRDT conditions are conditional design properties. Concurrent distributed convergence and full mission outcomes have not been established by the local session tests."
            : "The longitudinal benchmark is a protocol, not a completed comparative campaign. The historical four-role composer does not automatically use the persistent host runtime."}</p>
          <a href={genosSource(`docs/${guide.benchmarkPath}`)} target="_blank" rel="noreferrer">Read the dedicated benchmark protocol ↗</a>
        </article>
      </section>}
      <TopologySimulation family={slug} guide={guide} />
      <section className="section-wrap topology-evidence-section">
        <div className="topology-failure-panel"><Eyebrow>FAILURE MODES</Eyebrow><h2>What can go wrong</h2><ul>{guide.failureModes.map((failure) => <li key={failure}>{failure}</li>)}</ul></div>
        <div className="topology-evidence-panel"><Eyebrow>EVIDENCE AND BENCHMARKS</Eyebrow><h2>What has been checked</h2><p><strong>Working slice:</strong> {claim?.implementedSlice ?? topology.runtime}</p><p><strong>Still open:</strong> {claim?.missingWork ?? topology.limit}</p><p>Linked evidence: {claim?.evidenceLevel ?? "unit"}. A policy for a variant does not establish a successful end-to-end mission or comparative performance.</p>{guide.benchmarkPath ? <a href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/${guide.benchmarkPath}`} target="_blank" rel="noreferrer">Read the benchmark protocol ↗</a> : <p className="topology-no-benchmark">No topology-specific benchmark protocol is linked from this profile.</p>}{claim && <a href={genosSource(claim.sourcePath)} target="_blank" rel="noreferrer">Read the latest evidence ↗</a>}<a href={genosSource("docs/03-reference/contrat-produit-et-completude.md")} target="_blank" rel="noreferrer">Read the product completion contract ↗</a></div>
      </section>
      <section className="section-wrap topology-related-section"><Eyebrow>RELATED CONCEPTS</Eyebrow><div>{guide.relatedConcepts.map((relatedSlug) => { const related = getRelatedConcept(relatedSlug); return related && <Link key={related.slug} href={`/concepts/${related.slug}`}><span>{related.title}</span><b>↗</b></Link>; })}</div></section>
      <section className="section-wrap profile-source"><span>CANONICAL CONTRACT</span><a href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/02-orchestration/topologies/${slug}.md`} target="_blank" rel="noreferrer">Read the {topology.name} documentation ↗</a><a href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/02-orchestration/topologies-et-capacites.md`} target="_blank" rel="noreferrer">Compare capability contracts ↗</a><a href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/03-reference/plugins-topologies-morphogenese.md`} target="_blank" rel="noreferrer">Read plugin boundaries ↗</a></section>
      <section className="section-wrap profile-next"><span>EXPLORE MORE</span><Link href={`/lab/models?model=${slug}`}>Adjust this topology model →</Link><Link href="/lab">Morphogenesis Lab →</Link><Link href="/evidence">Evidence ledger →</Link></section>
    </div>
  );
}

function getRelatedConcept(slug: string) {
  return concepts.find((concept) => concept.slug === slug);
}
