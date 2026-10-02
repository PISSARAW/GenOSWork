import Link from "next/link";
import type { Topology } from "@/components/topologies";

export function TopologyCard({ topology }: { topology: Topology }) {
  const glyph = topology.slug === "a-team" ? "ateam" : topology.slug === "biocenose" ? "bio" : topology.slug === "holobionte" ? "holo" : topology.slug === "metapopulation" ? "meta" : topology.slug;
  return (
    <Link className={`topology-card topology-${topology.color}`} href={`/topologies/${topology.slug}`}>
      <span className="topology-number">{topology.index}</span>
      <span className={`topology-glyph glyph-${glyph}`} aria-hidden="true"><i /><i /><i /><i /></span>
      <strong>{topology.name}</strong>
      <span>{topology.summary}</span>
      <b>{topology.status}</b>
      <span className="card-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
