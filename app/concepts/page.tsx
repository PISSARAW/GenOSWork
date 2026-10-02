import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { concepts } from "@/components/concepts";

export const metadata: Metadata = {
  title: "Concepts and cognition",
  description: "Explore GenOS memory, cortex, ontogenesis, ontology, and computational pathology mechanisms.",
  alternates: { canonical: "/concepts" },
};

export default function ConceptsPage() {
  return (
    <div className="page-shell" lang="en">
      <section className="page-hero section-wrap concepts-hero">
        <Eyebrow>CONCEPTS · MECHANISMS AND ANALOGIES</Eyebrow>
        <h1>Understand what<br /><em>makes GenOS work.</em></h1>
        <p>Five concepts for exploring cognition and project continuity mechanisms. Each overview shows how data flows and distinguishes verified features from analogies and limitations.</p>
      </section>
      <section className="section-wrap concepts-index" aria-label="Concept index">
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
