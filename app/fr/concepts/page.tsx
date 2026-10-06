import type { Metadata } from "next";
import { ConceptAtlas } from "@/components/concept-atlas";
import { concepts } from "@/components/concepts";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: "Atlas des concepts GenOS",
  description: "Les concepts GenOS par famille, implémentation, modèle et niveau de preuve.",
  alternates: { canonical: "/fr/concepts", languages: { en: "/en/concepts", fr: "/fr/concepts" } },
};

export default function FrenchConceptsPage() {
  return <div className="page-shell" lang="fr">
    <section className="page-hero section-wrap concepts-hero">
      <Eyebrow>ATLAS DES CONCEPTS · {concepts.length} CONCEPTS</Eyebrow>
      <h1>Explorer GenOS<br /><em>par ses concepts.</em></h1>
      <p>Chaque fiche relie ses fondements scientifiques, son modèle, sa source GenOS et ses niveaux d'implémentation, d'intégration et de preuve.</p>
    </section>
    <ConceptAtlas locale="fr" />
  </div>;
}
