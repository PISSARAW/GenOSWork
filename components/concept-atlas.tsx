"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { concepts } from "@/components/concepts";
import { conceptFamilies } from "@/components/concept-catalog";
import { stateLabel } from "@/components/reality-bar";

type FeatureFilter = "all" | "biologyInspired" | "hasMathematics" | "hasInteractiveModel" | "hasSimulation" | "hasBenchmark";

export function ConceptAtlas() {
  const [query, setQuery] = useState("");
  const [familyFilter, setFamilyFilter] = useState("all");
  const [implementationFilter, setImplementationFilter] = useState("all");
  const [featureFilter, setFeatureFilter] = useState<FeatureFilter>("all");

  const visibleConcepts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return concepts.filter((concept) => {
      const family = conceptFamilies.find((item) => item.id === concept.familyId);
      const state = concept.implementation ?? "unassessed";
      const matchesText = !needle || `${concept.title} ${concept.intro} ${family?.name ?? ""}`.toLowerCase().includes(needle);
      const matchesFamily = familyFilter === "all" || concept.familyId === familyFilter;
      const matchesStatus = implementationFilter === "all" || state === implementationFilter;
      const matchesFeature = featureFilter === "all" || Boolean(concept[featureFilter]);
      return matchesText && matchesFamily && matchesStatus && matchesFeature;
    });
  }, [query, familyFilter, implementationFilter, featureFilter]);

  const visibleByFamily = conceptFamilies
    .map((family) => ({ family, items: visibleConcepts.filter((concept) => concept.familyId === family.id) }))
    .filter(({ items }) => items.length > 0);

  return (
    <>
      <section className="section-wrap atlas-overview" aria-label="Concept systems">
        <div className="atlas-overview-intro">
          <span className="atlas-kicker">A MAP OF GENOS</span>
          <p>Start with a system to see its concepts, implementation record, and links to neighboring parts of the runtime.</p>
          <Link href="/systems">Browse system families <span>→</span></Link>
        </div>
        <div className="atlas-system-rail">
          {conceptFamilies.map((family, index) => <a key={family.id} href={`#${family.id}`}><i>{String(index + 1).padStart(2, "0")}</i><span>{family.name}</span></a>)}
        </div>
      </section>

      <section className="section-wrap atlas-browser" aria-label="Search and filter concepts">
        <div className="atlas-filters">
          <label className="atlas-search"><span>SEARCH</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a concept or system" /></label>
          <label><span>SYSTEM</span><select value={familyFilter} onChange={(event) => setFamilyFilter(event.target.value)}><option value="all">All systems</option>{conceptFamilies.map((family) => <option value={family.id} key={family.id}>{family.name}</option>)}</select></label>
          <label><span>IMPLEMENTATION</span><select value={implementationFilter} onChange={(event) => setImplementationFilter(event.target.value)}><option value="all">Any status</option><option value="implemented">Implemented</option><option value="partial">Partial</option><option value="experimental">Experimental</option><option value="proposed">Proposed</option><option value="conceptual">Conceptual</option><option value="unassessed">Unassessed</option></select></label>
          <label><span>HAS</span><select value={featureFilter} onChange={(event) => setFeatureFilter(event.target.value as FeatureFilter)}><option value="all">Any attribute</option><option value="biologyInspired">Biological inspiration</option><option value="hasMathematics">Mathematical model</option><option value="hasInteractiveModel">Interactive model</option><option value="hasSimulation">Numeric simulation</option><option value="hasBenchmark">Benchmark protocol</option></select></label>
        </div>
        <p className="atlas-result-count" role="status">Showing {visibleConcepts.length} of {concepts.length} registered concepts</p>
      </section>

      <div className="section-wrap atlas-family-list">
        {visibleByFamily.map(({ family, items }) => (
          <section className="atlas-family" id={family.id} key={family.id} aria-labelledby={`family-${family.id}`}>
            <header className="atlas-family-heading">
              <div><span className="atlas-kicker">SYSTEM · {String(items.length).padStart(2, "0")} CONCEPTS</span><h2 id={`family-${family.id}`}>{family.name}</h2></div>
              <p>{family.description}</p>
            </header>
            <div className="atlas-concept-grid">
              {items.map((concept) => (
                <Link className="atlas-concept-card" href={`/concepts/${concept.slug}`} key={concept.slug}>
                  <span className="atlas-concept-meta">{concept.number} / CONCEPT <i>{stateLabel(concept.implementation ?? "unassessed")}</i></span>
                  <strong>{concept.title}</strong>
                  <span className="atlas-concept-intro">{concept.intro}</span>
                  <span className="atlas-feature-tags">
                    {concept.biologyInspired && <i>biology</i>}
                    {concept.hasMathematics && <i>math</i>}
                    {concept.hasInteractiveModel && <i>interactive</i>}
                    {concept.hasSimulation && <i>simulation</i>}
                    {concept.hasBenchmark && <i>benchmark</i>}
                  </span>
                  <b aria-hidden="true">↗</b>
                </Link>
              ))}
            </div>
          </section>
        ))}
        {visibleConcepts.length === 0 && <div className="atlas-empty"><strong>No concepts match those filters.</strong><p>Clear the search or choose a different system or attribute.</p></div>}
      </div>
    </>
  );
}
