import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { concepts } from "@/components/concepts";

export const metadata: Metadata = {
  title: "Concepts et cognition",
  description: "Découvrez les mécanismes de mémoire, de cortex, d’ontogenèse, d’ontologie et de pathologies computationnelles dans GenOS.",
  alternates: { canonical: "/concepts" },
};

export default function ConceptsPage() {
  return (
    <div className="page-shell" lang="fr">
      <section className="page-hero section-wrap concepts-hero">
        <Eyebrow>CONCEPTS · MÉCANISMES ET ANALOGIES</Eyebrow>
        <h1>Comprendre ce qui<br />fait <em>fonctionner GenOS.</em></h1>
        <p>Cinq notions pour explorer les mécanismes de cognition et de continuité du projet. Chaque fiche montre le cheminement des données et distingue les fonctionnalités vérifiées des analogies et des limites.</p>
      </section>
      <section className="section-wrap concepts-index" aria-label="Index des concepts">
        {concepts.map((concept) => (
          <Link className="concept-index-card" href={`/concepts/${concept.slug}`} key={concept.slug}>
            <span className="concept-index-number">{concept.number} / CONCEPT</span>
            <span className={`concept-status concept-status-${concept.statusTone}`}><i />{concept.status}</span>
            <strong>{concept.title}</strong>
            <span className="concept-index-intro">{concept.intro}</span>
            <span className="concept-index-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
