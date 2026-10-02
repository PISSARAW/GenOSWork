import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/eyebrow";
import { getTopology, topologies } from "@/components/topologies";
import { topologyGuides } from "@/components/topology-guides";
import { TopologySimulation } from "@/components/topology-simulation";
import { concepts } from "@/components/concepts";
import { RealityBar, genosSourceCommit } from "@/components/reality-bar";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return topologies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topology = getTopology(slug);
  return topology ? { title: topology.name, description: `${topology.summary} Read its GenOS runtime profile and known limits.`, alternates: { canonical: `/topologies/${slug}` } } : {};
}

export default async function TopologyDetailPage({ params }: Props) {
  const { slug } = await params;
  const topology = getTopology(slug);
  if (!topology) notFound();
  const guide = topologyGuides[slug];
  if (!guide) notFound();
  const glyph = topology.slug === "a-team" ? "ateam" : topology.slug === "biocenose" ? "bio" : topology.slug === "holobionte" ? "holo" : topology.slug === "metapopulation" ? "meta" : topology.slug;
  return (
    <div className="page-shell">
      <section className="page-hero section-wrap topology-detail-hero">
        <Link className="back-link" href="/topologies">← ALL TOPOLOGIES</Link>
        <div className={`topology-detail-glyph topology-${topology.color} glyph-${glyph}`} aria-hidden="true"><i /><i /><i /><i /></div>
        <Eyebrow>{topology.index} · TOPOLOGY PROFILE</Eyebrow>
        <h1>{topology.name}<br /><em>{topology.summary}</em></h1>
        <p>{topology.principle}</p>
        <span className="status-chip status-implemented"><i /> {topology.status}</span>
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
      <TopologySimulation family={slug} guide={guide} />
      <section className="section-wrap topology-evidence-section">
        <div className="topology-failure-panel"><Eyebrow>FAILURE MODES</Eyebrow><h2>What can go wrong</h2><ul>{guide.failureModes.map((failure) => <li key={failure}>{failure}</li>)}</ul></div>
        <div className="topology-evidence-panel"><Eyebrow>EVIDENCE AND BENCHMARKS</Eyebrow><h2>What has been checked</h2><p>The implementation status above reflects the pinned GenOS product contract. Unit coverage does not establish a successful end-to-end mission or comparative performance.</p>{guide.benchmarkPath ? <a href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/${guide.benchmarkPath}`} target="_blank" rel="noreferrer">Read the benchmark protocol ↗</a> : <p className="topology-no-benchmark">No topology-specific benchmark protocol is linked from this profile.</p>}<a href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/03-reference/contrat-produit-et-completude.md`} target="_blank" rel="noreferrer">Read the product completion contract ↗</a></div>
      </section>
      <section className="section-wrap topology-related-section"><Eyebrow>RELATED CONCEPTS</Eyebrow><div>{guide.relatedConcepts.map((relatedSlug) => { const related = getRelatedConcept(relatedSlug); return related && <Link key={related.slug} href={`/concepts/${related.slug}`}><span>{related.title}</span><b>↗</b></Link>; })}</div></section>
      <section className="section-wrap profile-source"><span>CANONICAL CONTRACT</span><a href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/02-orchestration/topologies/${slug}.md`} target="_blank" rel="noreferrer">Read the {topology.name} documentation ↗</a><a href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/02-orchestration/topologies-et-capacites.md`} target="_blank" rel="noreferrer">Compare capability contracts ↗</a><a href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/03-reference/plugins-topologies-morphogenese.md`} target="_blank" rel="noreferrer">Read plugin boundaries ↗</a></section>
      <section className="section-wrap profile-next"><span>EXPLORE MORE</span><Link href="/lab">Morphogenesis Lab →</Link><Link href="/evidence">Evidence ledger →</Link></section>
    </div>
  );
}

function getRelatedConcept(slug: string) {
  return concepts.find((concept) => concept.slug === slug);
}
