import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/eyebrow";
import { getTopology, topologies } from "@/components/topologies";
import { topologyGuides } from "@/components/topology-guides";
import { TopologySimulation } from "@/components/topology-simulation";

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
      <section className="section-wrap section-space profile-grid">
        <article className="profile-panel"><Eyebrow>RUNTIME PATH</Eyebrow><h2>What is wired</h2><p>{topology.runtime}</p></article>
        <article className="profile-panel profile-limit"><Eyebrow>KNOWN BOUNDARY</Eyebrow><h2>What this does not imply</h2><p>{topology.limit}</p></article>
      </section>
      <TopologySimulation family={slug} guide={guide} />
      <section className="section-wrap profile-source"><span>CANONICAL CONTRACT</span><a href={`https://github.com/PISSARAW/GenOS/blob/v3/docs/02-orchestration/topologies/${slug}.md`} target="_blank" rel="noreferrer">Read the {topology.name} documentation ↗</a><a href="https://github.com/PISSARAW/GenOS/blob/v3/docs/02-orchestration/topologies-et-capacites.md" target="_blank" rel="noreferrer">Compare capability contracts ↗</a></section>
      <section className="section-wrap profile-next"><span>EXPLORE MORE</span><Link href="/lab">Morphogenesis Lab →</Link><Link href="/evidence">Evidence ledger →</Link></section>
    </div>
  );
}
