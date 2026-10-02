import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/eyebrow";
import { ConceptDiagramView } from "@/components/concept-diagram";
import { concepts, getConcept } from "@/components/concepts";

export function generateStaticParams() {
  return concepts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) return { title: "Concept introuvable" };
  return {
    title: concept.title,
    description: concept.intro,
    alternates: { canonical: `/concepts/${concept.slug}` },
  };
}

export default async function ConceptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();
  const index = concepts.findIndex((item) => item.slug === concept.slug);
  const previous = concepts[(index - 1 + concepts.length) % concepts.length];
  const next = concepts[(index + 1) % concepts.length];

  return (
    <div className="page-shell" lang="fr">
      <section className="page-hero section-wrap concept-detail-hero">
        <Link className="concept-back-link" href="/concepts">← Tous les concepts</Link>
        <Eyebrow>{concept.number} · {concept.eyebrow}</Eyebrow>
        <h1>{concept.title}<br /><em>dans GenOS.</em></h1>
        <p>{concept.intro}</p>
        <span className={`concept-status concept-status-${concept.statusTone}`}><i />{concept.status}</span>
      </section>

      <section className="section-wrap concept-explainer">
        <ConceptDiagramView kind={concept.diagram} title={concept.diagramTitle} description={concept.diagramDescription} />
      </section>

      <section className="section-wrap concept-steps">
        <div className="concept-section-heading"><Eyebrow>LE FONCTIONNEMENT</Eyebrow><h2>Quatre étapes,<br /><em>un mécanisme.</em></h2></div>
        <div className="concept-step-list">
          {concept.steps.map((step, stepIndex) => (
            <article className="concept-step" key={step.title}>
              <span>{String(stepIndex + 1).padStart(2, "0")}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
              <b aria-hidden="true">↘</b>
            </article>
          ))}
        </div>
      </section>

      <section className="concept-scope-wrap">
        <div className="section-wrap concept-scope">
          <Eyebrow light>PORTÉE ET LIMITES</Eyebrow>
          <h2>{concept.scopeTitle}</h2>
          <p>{concept.scope}</p>
          <a href={`https://github.com/PISSARAW/GenOS/blob/main/docs/${concept.source}`} target="_blank" rel="noreferrer">Lire la source : {concept.sourceLabel} <span>↗</span></a>
        </div>
      </section>

      <nav className="section-wrap concept-pagination" aria-label="Navigation entre les concepts">
        <Link href={`/concepts/${previous.slug}`}><span>PRÉCÉDENT</span><strong>← {previous.title}</strong></Link>
        <Link href={`/concepts/${next.slug}`}><span>SUIVANT</span><strong>{next.title} →</strong></Link>
      </nav>
    </div>
  );
}
