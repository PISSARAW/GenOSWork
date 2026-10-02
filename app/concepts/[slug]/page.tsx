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
  if (!concept) return { title: "Concept not found" };
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
    <div className="page-shell" lang="en">
      <section className="page-hero section-wrap concept-detail-hero">
        <Link className="concept-back-link" href="/concepts">← All concepts</Link>
        <Eyebrow>{concept.number} · {concept.eyebrow}</Eyebrow>
        <h1>{concept.title}<br /><em>in GenOS.</em></h1>
        <p>{concept.intro}</p>
        <span className={`concept-status concept-status-${concept.statusTone}`}><i />{concept.status}</span>
      </section>

      <section className="section-wrap concept-explainer">
        <ConceptDiagramView kind={concept.diagram} title={concept.diagramTitle} description={concept.diagramDescription} />
      </section>

      <section className="section-wrap concept-steps">
        <div className="concept-section-heading"><Eyebrow>HOW IT WORKS</Eyebrow><h2>Four steps,<br /><em>one mechanism.</em></h2></div>
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

      {concept.slug === "ontogenese" && (
        <section className="ontogenesis-compare-wrap">
          <div className="section-wrap ontogenesis-compare">
            <div className="ontogenesis-compare-heading">
              <Eyebrow>HOW IT COMPARES TO OTHER AGENTS</Eyebrow>
              <h2>The difference is<br /><em>continuity.</em></h2>
              <p>Many assistants answer a request or execute a task. Ontogenesis adds a durable loop that resumes the project between missions and keeps decision steps visible.</p>
            </div>
            <div className="ontogenesis-compare-grid" role="list" aria-label="Comparison of operating modes">
              <article className="onto-compare-card" role="listitem">
                <span>01 / CONVERSATIONAL ASSISTANT</span>
                <h3>One request, one response</h3>
                <p>Conversation-centered interaction. The person usually guides the next step and carries work forward from one session to the next.</p>
                <small>FOCUS · ANSWER THE CURRENT TURN</small>
              </article>
              <article className="onto-compare-card" role="listitem">
                <span>02 / TASK AGENT</span>
                <h3>One goal, one run</h3>
                <p>Can use tools and produce a deliverable within a defined scope. Persistence, verification, and integration depend on the product and its configuration.</p>
                <small>FOCUS · COMPLETE A MISSION</small>
              </article>
              <article className="onto-compare-card onto-compare-genos" role="listitem">
                <span>03 / GENOS · ONTOGENESIS</span>
                <h3>One project, multiple missions</h3>
                <p>A resident controller selects eligible tasks, starts bounded missions, examines evidence, then integrates, waits, or replans.</p>
                <small>FOCUS · MAINTAIN PROJECT CONTINUITY</small>
              </article>
            </div>
            <div className="ontogenesis-compare-note">
              <span aria-hidden="true">i</span>
              <p><strong>An architectural comparison, not a ranking.</strong> These are general categories: capabilities vary across agents, models, and configurations. GenOS does not claim to be better at every task; its distinctive focus is project lifecycle management with explicit evidence and authority limits.</p>
            </div>
            <div className="ontogenesis-compare-links">
              <Link href="/orchestrator">View the orchestration flow <span>→</span></Link>
              <Link href="/benchmarks">View available benchmarks <span>→</span></Link>
              <a href="https://github.com/PISSARAW/GenOS/blob/main/docs/02-orchestration/ontogenese-boucle.md" target="_blank" rel="noreferrer">Read the operational loop ↗</a>
            </div>
          </div>
        </section>
      )}

      <section className="concept-scope-wrap">
        <div className="section-wrap concept-scope">
          <Eyebrow light>SCOPE AND LIMITS</Eyebrow>
          <h2>{concept.scopeTitle}</h2>
          <p>{concept.scope}</p>
          <a href={`https://github.com/PISSARAW/GenOS/blob/main/docs/${concept.source}`} target="_blank" rel="noreferrer">Read the source: {concept.sourceLabel} <span>↗</span></a>
        </div>
      </section>

      <nav className="section-wrap concept-pagination" aria-label="Navigation between concepts">
        <Link href={`/concepts/${previous.slug}`}><span>PREVIOUS</span><strong>← {previous.title}</strong></Link>
        <Link href={`/concepts/${next.slug}`}><span>NEXT</span><strong>{next.title} →</strong></Link>
      </nav>
    </div>
  );
}
