import Link from "next/link";
import type { ReactNode } from "react";
import { concepts } from "@/components/concepts";

const systemNodes = [
  { id: "sensorium", name: "Sensorium", description: "Observation and perception signals", href: "/concepts/sensorium", phase: "SIGNAL & COGNITION" },
  { id: "agow", name: "AGOW", description: "Candidate competition and attention", href: "/concepts/agow", phase: "SIGNAL & COGNITION" },
  { id: "morphogenesis", name: "Morphogenesis", description: "Compose a bounded organization", href: "/concepts/morphogenesis", phase: "ORGANIZE & EXECUTE" },
  { id: "topologies", name: "Topologies", description: "Choose a coordination structure", href: "/topologies", phase: "ORGANIZE & EXECUTE" },
  { id: "workers", name: "Workers & daemons", description: "Run roles and resident services", href: "/workers", phase: "ORGANIZE & EXECUTE" },
  { id: "communication-ecology", name: "Communication", description: "Route typed signals and handoffs", href: "/concepts/communication-ecology", phase: "ORGANIZE & EXECUTE" },
  { id: "execution", name: "Execution", description: "Carry out bounded operations", href: "/runtime", phase: "VERIFY & ADAPT" },
  { id: "lean-verification", name: "Verifiers", description: "Check declared proof obligations", href: "/concepts/lean-verification", phase: "VERIFY & ADAPT" },
  { id: "evidence", name: "Evidence", description: "Keep claims tied to sources and results", href: "/concepts/evidence", phase: "VERIFY & ADAPT" },
  { id: "episodic-memory", name: "Memory", description: "Retain episodes and retrieval context", href: "/concepts/episodic-memory", phase: "VERIFY & ADAPT" },
  { id: "genome", name: "Genome & expression", description: "Version inherited capability traits", href: "/concepts/genome", phase: "VERIFY & ADAPT" },
];

const organismRows = [
  ["DNA", "Genome and capability loci", "GenOS traits are versioned software state, not biological DNA.", "genome"],
  ["Epigenetic regulation", "Expression controls", "Expression rules do not reproduce cellular chemistry.", "epigenetics"],
  ["Phenotype", "Active roles and capability profile", "The mapping describes configured behavior, not a living phenotype.", "phenotype"],
  ["Nervous system", "Cognition and control services", "Distributed software control does not establish consciousness.", "cortex"],
  ["Memory", "Episodic, semantic, and procedural stores", "Stored context can be stale and cannot prove a current claim.", "memoire"],
  ["Immune response", "Evidence checks, quarantine, and review", "Safeguards can miss threats or overreact; immunity is not absolute.", "maladies"],
  ["Metabolism", "Resource budgets and allocation", "Accounting limits work but does not model biological metabolism.", "metabolism"],
  ["Sensorium", "Observation and perception interfaces", "Inputs depend on configured tools and may be incomplete.", "sensorium"],
  ["Development", "Ontogenesis and lifecycle transitions", "Software lifecycle stages are explicit runtime policy.", "ontogenese"],
  ["Reproduction", "Replication and lineage operations", "Creating a branch or clone does not imply biological reproduction.", "reproduction"],
  ["Ecology", "Topologies, niches, and populations", "Ecological terms are design analogies with stated operational limits.", "biome"],
  ["Fossil record", "Archived lineage and experience", "Archives preserve selected records; they do not recreate a complete organism.", "memory-fossilization"],
] as const;

function ConceptLink({ slug, children }: { slug: string; children: ReactNode }) {
  const concept = concepts.find((item) => item.slug === slug);
  return concept ? <Link href={`/concepts/${concept.slug}`}>{children}</Link> : <span>{children}</span>;
}

export function SystemMap() {
  const phases = [...new Set(systemNodes.map((node) => node.phase))];
  return <section className="section-wrap system-map" aria-labelledby="system-map-title">
    <header className="system-map-heading"><div><span className="atlas-kicker">RUNTIME PATH</span><h2 id="system-map-title">System Map</h2></div><p>Follow one explanatory path from observation through coordination, verification, and retained context. Arrows describe a useful reading order, not a mandatory runtime sequence.</p></header>
    <div className="system-map-phases">
      {phases.map((phase, phaseIndex) => {
        const nodes = systemNodes.filter((node) => node.phase === phase);
        return <div className="system-map-phase" key={phase}>
          <span className="system-map-phase-label">{String(phaseIndex + 1).padStart(2, "0")} / {phase}</span>
          <div className="system-map-nodes">{nodes.map((node, index) => <div className="system-map-node-wrap" key={node.id}>
            {node.id === "topologies" ? <Link className="system-map-node" href={node.href}><strong>{node.name}</strong><span>{node.description}</span></Link> : node.id === "workers" ? <Link className="system-map-node" href={node.href}><strong>{node.name}</strong><span>{node.description}</span></Link> : node.id === "execution" ? <Link className="system-map-node" href={node.href}><strong>{node.name}</strong><span>{node.description}</span></Link> : <ConceptLink slug={node.id}><span className="system-map-node"><strong>{node.name}</strong><span>{node.description}</span></span></ConceptLink>}
            {index < nodes.length - 1 && <span className="system-map-arrow" aria-hidden="true">↓</span>}
          </div>)}</div>
          {phaseIndex < phases.length - 1 && <div className="system-map-bridge" aria-hidden="true">↓</div>}
        </div>;
      })}
    </div>
    <p className="system-map-caveat">Concept relationships are navigational. Their presence here does not claim that every route is automatically wired in every GenOS execution.</p>
    <Link className="map-switch-link" href="/systems/organism">View the biological organism map →</Link>
  </section>;
}

export function OrganismMap() {
  return <section className="section-wrap organism-map" aria-labelledby="organism-map-title">
    <header className="system-map-heading"><div><span className="atlas-kicker">BIOLOGICAL ORGANISM MAP</span><h2 id="organism-map-title">Analogy with limits.</h2></div><p>Biological terms help organize a software system. Every row names the software translation and one limit, so the metaphor does not read as an empirical claim.</p></header>
    <div className="organism-map-table" role="table" aria-label="Biological analogy and GenOS software mapping">
      <div className="organism-map-row organism-map-header" role="row"><span role="columnheader">BIOLOGICAL IDEA</span><span role="columnheader">GENOS SOFTWARE CONCEPT</span><span role="columnheader">LIMIT OF ANALOGY</span></div>
      {organismRows.map(([biology, software, limit, slug], index) => <div className="organism-map-row" role="row" key={biology}>
        <strong role="cell"><i>{String(index + 1).padStart(2, "0")}</i>{biology}</strong>
        <ConceptLink slug={slug}><span role="cell">{software} <b aria-hidden="true">↗</b></span></ConceptLink>
        <p role="cell">{limit}</p>
      </div>)}
    </div>
    <p className="system-map-caveat">These are design analogies. They do not imply biological equivalence, consciousness, or validated behavior beyond the implementation and evidence recorded for each concept.</p>
    <Link className="map-switch-link" href="/systems">Return to the runtime System Map →</Link>
  </section>;
}
