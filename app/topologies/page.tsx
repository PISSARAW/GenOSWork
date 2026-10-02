import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { TopologyCard } from "@/components/topology-card";
import { topologies } from "@/components/topologies";

export const metadata: Metadata = { title: "Orchestration topologies", description: "Explore the eight GenOS orchestration topologies and their runtime profiles, contracts and known limits.", alternates: { canonical: "/topologies" } };

export default function TopologiesPage() {
  return (
    <div className="page-shell">
      <section className="page-hero section-wrap">
        <Eyebrow>ORCHESTRATION · EIGHT MODES</Eyebrow>
        <h1>Different work<br />needs different <em>structure.</em></h1>
        <p>Topologies define how workers coordinate—not a promise that every possible capability is active. Each profile below links to its runtime path and operational limits.</p>
        <div className="topology-legend"><span><i className="legend-runtime" /> Runtime path wired</span><span><i className="legend-contract" /> Capability profile varies</span></div>
      </section>
      <section className="section-wrap section-space topology-index"><div className="topology-grid">{topologies.map((topology) => <TopologyCard key={topology.slug} topology={topology} />)}</div><p className="index-source">Canonical status and capability details: <a href="https://github.com/PISSARAW/GenOS/blob/v3/docs/02-orchestration/topologies-et-capacites.md" target="_blank" rel="noreferrer">GenOS topology capability contract ↗</a></p></section>
    </div>
  );
}
