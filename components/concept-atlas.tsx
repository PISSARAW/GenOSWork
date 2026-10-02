"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { concepts } from "@/components/concepts";
import { conceptFamilies } from "@/components/concept-catalog";
import { stateLabel } from "@/components/reality-bar";

type FeatureFilter = "all" | "biologyInspired" | "hasMathematics" | "hasSimulation" | "hasBenchmark";

export function ConceptAtlas() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [implementation, setImplementation] = useState("all");
  const [feature, setFeature] = useState<FeatureFilter>("all");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return concepts.filter((concept) => {
      const familyName = conceptFamilies.find((item) => item.id === concept.familyId)?.name ?? "";
      const status = concept.implementation ?? "unassessed";
      const matchesQuery = !needle || `${concept.title} ${concept.intro} ${familyName}`.toLowerCase().includes(needle);
      const matchesFamily = family === "all" || concept.familyId === family;
      const matchesImplementation = implementation === "all" || status === implementation;
      const matchesFeature = feature === "all" ? true : Boolean(concept[feature]);
      return matchesQuery && matchesFamily && matchesImplementation && matchesFeature;
    });
  }, [query, family, implementation, feature]);
  const groups = conceptFamilies.map((item) => ({ item, entries: filtered.filter((concept) => concept.familyId === item.id) })).filter((group) => group.entries.length);

  return <>
    <section className="section-wrap atlas-overview" aria-label="Concept systems">
      <div className="atlas-overview-intro"><span className="atlas-kicker">A MAP OF GENOS</span><p>Start with a system to see its concepts, status record, and links to neighboring parts of the runtime.</p><Link href="/systems">Browse system families <span>→</span></Link></div>
      <div className="atlas-system-rail">{conceptFamilies.map((item, index) => <a key={item.id} href={`#${item.id}`}><i>{String(index + 1).padStart(2, "0")}</i><span>{item.name}</span></a>)}</div>
    </section>
    <section className="section-wrap atlas-browser" aria-label="Search and filter concepts">
      <div className="atlas-filters">
        <label className="atlas-search"><span>SEARCH</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a concept or system" /></label>
        <label><span>SYSTEM</span><select value={family} onChange={(event) => setFamily(event.target.value)}><option value="all">All systems</option>{conceptFamilies.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
        <label><span>IMPLEMENTATION</span><select value={implementation} onChange={(event) => setImplementation(event.target.value)}><option value="all">Any status</option><option value="implemented">Implemented</option><option value="partial">Partial</option><option value="experimental">Experimental</option><option value="proposed">Proposed</option><option value="conceptual">Conceptual</option><option value="unassessed">Unassessed</option></select></label>
        <label><span>HAS</span><select value={feature} onChange={(event) => setFeature(event.target.value as FeatureFilter)}><option value="all">Any attribute</option><option value="biologyInspired">Biological inspiration</option><option value="hasMathematics">Mathematical model</option><option value="hasSimulation">Interactive illustration</option><option value="hasBenchmark">Benchmark protocol</option></select></label>
      </div>
      <p className="atlas-result-count" role="status">Showing {filtered.length} of {concepts.length} registered concepts</p>
    </section>
    <div className="section-wrap atlas-family-list">
      {groups.map(({ item, entries }) => <section className="atlas-family" id={item.id} key={item.id} aria-labelledby={`family-${item.id}`}>
        <header className="atlas-family-heading"><div><span className="atlas-kicker">SYSTEM · {String(entries.length).padStart(2, "0")} CONCEPTS</span><h2 id={`family-${item.id}`}>{item.name}</h2></div><p>{item.description}</p></header>
        <div className="atlas-concept-grid">{entries.map((concept) => <Link className="atlas-concept-card" href={`/concepts/${concept.slug}`} key={concept.slug}>
          <span className="atlas-concept-meta">{concept.number} / CONCEPT <i>{stateLabel(concept.implementation ?? "unassessed")}</i></span><strong>{concept.title}</strong><span className="atlas-concept-intro">{concept.intro}</span>
          <span className="atlas-feature-tags">{concept.biologyInspired && <i>biology</i>}{concept.hasMathematics && <i>math</i>}{concept.hasSimulation && <i>simulation</i>}{concept.hasBenchmark && <i>benchmark protocol</i>}</span><b aria-hidden="true">↗</b>
        </Link>)}</div>
      </section>)}
      {!filtered.length && <div className="atlas-empty"><strong>No concepts match those filters.</strong><p>Clear the search or choose a different system or attribute.</p></div>}
    </div>
  </>;
}
