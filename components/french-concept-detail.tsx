import Link from "next/link";
import type { Concept } from "@/components/concepts";
import { concepts, conceptModelBySlug } from "@/components/concepts";
import { ConceptMechanism } from "@/components/concept-mechanism";
import { teachingFlows } from "@/components/concept-learning-data";
import { frenchConceptFamilyNames, frenchConceptTitles } from "@/components/concept-french-titles";
import { mechanismLabelsFr, referencesForConcept } from "@/components/mechanism-literature";
import { genosSourceCommit } from "@/components/reality-bar";
import { Eyebrow } from "@/components/eyebrow";
import { AgentCoordinationGuide, isCoordinationGuide } from "@/components/agent-coordination-guide";

const implementationFr: Record<string, string> = { conceptual: "conceptuel", proposed: "proposé", partial: "partiel", experimental: "expérimental", implemented: "implémenté", unassessed: "non évalué" };
const integrationFr: Record<string, string> = { isolated: "isolée", callable: "appelable", wired: "raccordée", "end-to-end": "de bout en bout", unassessed: "non évaluée" };
const evidenceFr: Record<string, string> = { none: "aucune preuve produit liée", "unit-tested": "tests unitaires", "integration-tested": "tests d'intégration", "end-to-end-tested": "test de bout en bout", "reported-run": "exécution rapportée", "test-failing": "test en échec", "benchmark-protocol": "protocole de benchmark", benchmarked: "benchmark réalisé", replicated: "répliquée", unassessed: "non évaluée" };

export function FrenchConceptDetail({ concept }: { concept: Concept }) {
  const flow = teachingFlows[concept.slug];
  const references = referencesForConcept(concept.slug, concept.familyId);
  const steps = flow.fr;
  const frenchTitle = frenchConceptTitles[concept.slug];
  const sourceUrl = `https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/${concept.source}`;
  const index = concepts.findIndex((item) => item.slug === concept.slug);
  const previous = concepts[(index - 1 + concepts.length) % concepts.length];
  const next = concepts[(index + 1) % concepts.length];

  return <div className="page-shell french-concept-detail" lang="fr">
    <section className="page-hero section-wrap concept-detail-hero">
      <Link className="concept-back-link" href="/fr/concepts">← Tous les concepts</Link>
      <Eyebrow>CONCEPT GENOS · {frenchConceptFamilyNames[concept.familyId ?? ""]?.toUpperCase()}</Eyebrow>
      <h1>{frenchTitle}<br /><em>dans GenOS.</em></h1>
      <p>{concept.scienceBasisFr}</p>
      <div className="hero-actions"><a className="button button-dark" href="#interactive-model">Explorer le modèle interactif <span>↓</span></a><Link className="button button-quiet" href={`/en/concepts/${concept.slug}`}>Version anglaise ↗</Link></div>
    </section>

    <section className="section-wrap concept-model-section">
      <div className="concept-section-heading"><Eyebrow>SCIENCE ET FORMALISATION</Eyebrow><h2>Comprendre le<br /><em>mécanisme.</em></h2></div>
      <div className="concept-model-grid">
        <article><span>FONDEMENT SCIENTIFIQUE</span><p>{concept.scienceBasisFr}</p></article>
        <article className="concept-math-panel"><span>MODÈLE MATHÉMATIQUE OU LOGIQUE</span><p>{concept.mathModelFr}</p></article>
        {concept.biologyBasisFr && <article><span>INSPIRATION BIOLOGIQUE ET JUSTIFICATION</span><p>{concept.biologyBasisFr}</p></article>}
        <article><span>PORTÉE DANS GENOS</span><p>Ce modèle explique le principe. Son implémentation et ses preuves sont décrites dans la source GenOS versionnée ; l'analogie scientifique ne les valide pas.</p></article>
      </div>
    </section>

    <div className="section-wrap"><ConceptMechanism slug={concept.slug} title={frenchTitle} familyId={concept.familyId ?? ""} flow={flow} locale="fr" /></div>

    <section className="section-wrap concept-steps">
      <div className="concept-section-heading"><Eyebrow>ÉTAPES PROPRES AU CONCEPT</Eyebrow><h2>Du signal<br /><em>au résultat.</em></h2></div>
      <div className="concept-step-list">{steps.map((title, index) => <article className="concept-step" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{index === 0 ? concept.scienceBasisFr : index === 1 ? concept.mathModelFr : concept.biologyBasisFr ?? `Pour ${frenchTitle}, cette issue découle du modèle ci-dessus seulement si ses hypothèses et le contrôle de résultat sont satisfaits.`}</p></div><b aria-hidden="true">↘</b></article>)}</div>
    </section>

    <section className="section-wrap concept-literature" aria-labelledby="fr-concept-sources">
      <div className="concept-section-heading"><Eyebrow>RECHERCHE PRIMAIRE · MÉCANISME</Eyebrow><h2 id="fr-concept-sources">Sources et<br /><em>limites.</em></h2></div>
      <div className="concept-literature-list">{references.map((reference) => <article key={`${reference.mechanismId}-${reference.year}`}><span>{mechanismLabelsFr[reference.mechanismId].toUpperCase()} · {reference.year}</span><h3>{reference.title}</h3><p>{reference.authors} · <i>{reference.venue}</i></p><p>{reference.kind === "technical" ? "Documentation technique primaire de ce mécanisme. Elle précise son fonctionnement, sans valider l'intégration GenOS." : `Recherche primaire sur ${mechanismLabelsFr[reference.mechanismId]}. Elle éclaire l'analogie avec ${frenchTitle}, sans valider l'implémentation GenOS.`}</p><a href={reference.url} target="_blank" rel="noreferrer">Ouvrir la source ↗</a></article>)}</div>
      <p className="concept-literature-note">Ces références expliquent le mécanisme ou la technologie d'origine ; elles ne constituent pas une preuve de fonctionnement de GenOS.</p>
    </section>

    {isCoordinationGuide(concept.slug) && <AgentCoordinationGuide slug={concept.slug} language="fr" />}

    <section className="concept-scope-wrap"><div className="section-wrap concept-scope"><Eyebrow light>IMPLÉMENTATION ET PREUVES</Eyebrow><h2>Vérifier la portée de {frenchTitle}.</h2><p>Le schéma animé est pédagogique. La fiche source versionnée décrit l'implémentation ; les statuts ci-dessous indiquent sa maturité sans déduire un fonctionnement réel de l'analogie scientifique.</p><div className="concept-evidence-links"><span>Implémentation : {implementationFr[concept.implementation ?? "unassessed"]}</span><span>Intégration : {integrationFr[concept.integration ?? "unassessed"]}</span><span>Preuve : {evidenceFr[concept.evidence ?? "unassessed"]}</span><a href={sourceUrl} target="_blank" rel="noreferrer">Source GenOS versionnée ↗</a>{concept.codeSources?.map((source) => <a key={source} href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/${source}`} target="_blank" rel="noreferrer">Code : {source} ↗</a>)}{conceptModelBySlug[concept.slug] && <Link href={`/lab/models?model=${conceptModelBySlug[concept.slug]}`}>Simulation numérique ciblée ↗</Link>}</div></div></section>

    {(concept.related?.length ?? 0) > 0 && <section className="section-wrap concept-related"><Eyebrow>CONCEPTS LIÉS</Eyebrow><div>{concept.related?.filter((slug) => frenchConceptTitles[slug]).map((slug) => <Link key={slug} href={`/fr/concepts/${slug}`}><span>{frenchConceptTitles[slug]}</span><b>↗</b></Link>)}</div></section>}
    <nav className="section-wrap concept-pagination" aria-label="Navigation entre les concepts">
      <Link href={`/fr/concepts/${previous.slug}`}><span>PRÉCÉDENT</span><strong>← {frenchConceptTitles[previous.slug]}</strong></Link>
      <Link href={`/fr/concepts/${next.slug}`}><span>SUIVANT</span><strong>{frenchConceptTitles[next.slug]} →</strong></Link>
    </nav>
  </div>;
}
