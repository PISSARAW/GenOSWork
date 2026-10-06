"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { concepts } from "@/components/concepts";
import { conceptFamilies } from "@/components/concept-catalog";
import { stateLabel } from "@/components/reality-bar";
import { frenchConceptFamilyNames, frenchConceptTitles } from "@/components/concept-french-titles";

type FeatureFilter = "all" | "biologyInspired" | "hasMathematics" | "hasInteractiveModel" | "hasSimulation" | "hasBenchmark";

export function ConceptAtlas({ locale = "en" }: { locale?: "en" | "fr" }) {
  const french = locale === "fr";
  const familyName = (family: typeof conceptFamilies[number]) => french ? frenchConceptFamilyNames[family.id] : family.name;
  const conceptTitle = (concept: typeof concepts[number]) => french ? frenchConceptTitles[concept.slug] : concept.title;
  const implementationLabels: Record<string, string> = { implemented: "Implémenté", partial: "Partiel", experimental: "Expérimental", proposed: "Proposé", conceptual: "Conceptuel", unassessed: "Non évalué" };
  const label = (state: string) => french ? implementationLabels[state] : stateLabel(state as Parameters<typeof stateLabel>[0]);
  const resetFilters = () => { setQuery(""); setFamilyFilter("all"); setImplementationFilter("all"); setFeatureFilter("all"); };
  const [query, setQuery] = useState("");
  const [familyFilter, setFamilyFilter] = useState("all");
  const [implementationFilter, setImplementationFilter] = useState("all");
  const [featureFilter, setFeatureFilter] = useState<FeatureFilter>("all");

  const visibleConcepts = useMemo(() => {
    const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const needle = normalize(query.trim());
    return concepts.filter((concept) => {
      const family = conceptFamilies.find((item) => item.id === concept.familyId);
      const state = concept.implementation ?? "unassessed";
      const matchesText = !needle || normalize(`${concept.slug} ${concept.title} ${concept.intro} ${family?.name ?? ""} ${frenchConceptTitles[concept.slug]} ${concept.scienceBasisFr ?? ""} ${frenchConceptFamilyNames[concept.familyId ?? ""] ?? ""}`).includes(needle);
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
      <section className="section-wrap atlas-overview" aria-label={french ? "Familles de concepts" : "Concept systems"}>
        <div className="atlas-overview-intro">
          <span className="atlas-kicker">{french ? "UNE CARTE DE GENOS" : "A MAP OF GENOS"}</span>
          <p>{french ? "Chaque famille relie ses concepts, leur état d'implémentation et les composants voisins du runtime." : "Start with a system to see its concepts, implementation record, and links to neighboring parts of the runtime."}</p>
          <Link href={`/${locale}/systems`}>{french ? "Parcourir les familles" : "Browse system families"} <span>→</span></Link>
        </div>
        <div className="atlas-system-rail">
          {conceptFamilies.map((family, index) => <a key={family.id} href={`#${family.id}`} onClick={resetFilters}><i>{String(index + 1).padStart(2, "0")}</i><span>{familyName(family)}</span></a>)}
        </div>
      </section>

      <section className="section-wrap atlas-browser" aria-label={french ? "Rechercher et filtrer les concepts" : "Search and filter concepts"}>
        <div className="atlas-filters">
          <label className="atlas-search"><span>{french ? "RECHERCHE" : "SEARCH"}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={french ? "Rechercher un concept ou une famille" : "Search a concept or system"} /></label>
          <label><span>{french ? "FAMILLE" : "SYSTEM"}</span><select value={familyFilter} onChange={(event) => setFamilyFilter(event.target.value)}><option value="all">{french ? "Toutes les familles" : "All systems"}</option>{conceptFamilies.map((family) => <option value={family.id} key={family.id}>{familyName(family)}</option>)}</select></label>
          <label><span>{french ? "IMPLÉMENTATION" : "IMPLEMENTATION"}</span><select value={implementationFilter} onChange={(event) => setImplementationFilter(event.target.value)}><option value="all">{french ? "Tous les statuts" : "Any status"}</option>{["implemented", "partial", "experimental", "proposed", "conceptual", "unassessed"].map((state) => <option key={state} value={state}>{label(state)}</option>)}</select></label>
          <label><span>{french ? "ATTRIBUT" : "HAS"}</span><select value={featureFilter} onChange={(event) => setFeatureFilter(event.target.value as FeatureFilter)}><option value="all">{french ? "Tous les attributs" : "Any attribute"}</option><option value="biologyInspired">{french ? "Inspiration biologique" : "Biological inspiration"}</option><option value="hasMathematics">{french ? "Modèle mathématique" : "Mathematical model"}</option><option value="hasInteractiveModel">{french ? "Modèle interactif" : "Interactive model"}</option><option value="hasSimulation">{french ? "Simulation numérique" : "Numeric simulation"}</option><option value="hasBenchmark">{french ? "Protocole de benchmark" : "Benchmark protocol"}</option></select></label>
        </div>
        <p className="atlas-result-count" role="status">{french ? `${visibleConcepts.length} concepts affichés sur ${concepts.length}` : `Showing ${visibleConcepts.length} of ${concepts.length} registered concepts`}</p>
      </section>

      <div className="section-wrap atlas-family-list">
        {visibleByFamily.map(({ family, items }) => (
          <section className="atlas-family" id={family.id} key={family.id} aria-labelledby={`family-${family.id}`}>
            <header className="atlas-family-heading">
              <div><span className="atlas-kicker">{french ? "FAMILLE" : "SYSTEM"} · {String(items.length).padStart(2, "0")} CONCEPTS</span><h2 id={`family-${family.id}`}>{familyName(family)}</h2></div>
              {!french && <p>{family.description}</p>}
            </header>
            <div className="atlas-concept-grid">
              {items.map((concept) => (
                <Link className="atlas-concept-card" href={`/${locale}/concepts/${concept.slug}`} key={concept.slug}>
                  <span className="atlas-concept-meta">{concept.number} / CONCEPT <i>{label(concept.implementation ?? "unassessed")}</i></span>
                  <strong>{conceptTitle(concept)}</strong>
                  <span className="atlas-concept-intro">{french ? concept.scienceBasisFr : concept.intro}</span>
                  <span className="atlas-feature-tags">
                    {concept.biologyInspired && <i>{french ? "biologie" : "biology"}</i>}
                    {concept.hasMathematics && <i>math</i>}
                    {concept.hasInteractiveModel && <i>{french ? "interactif" : "interactive"}</i>}
                    {concept.hasSimulation && <i>simulation</i>}
                    {concept.hasBenchmark && <i>benchmark</i>}
                  </span>
                  <b aria-hidden="true">↗</b>
                </Link>
              ))}
            </div>
          </section>
        ))}
        {visibleConcepts.length === 0 && <div className="atlas-empty"><strong>{french ? "Aucun concept ne correspond à ces filtres." : "No concepts match those filters."}</strong><button type="button" onClick={resetFilters}>{french ? "Réinitialiser les filtres" : "Reset filters"}</button></div>}
      </div>
    </>
  );
}
