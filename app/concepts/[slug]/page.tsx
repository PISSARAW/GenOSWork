import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/eyebrow";
import { ConceptDiagramView } from "@/components/concept-diagram";
import { concepts, getConcept, type Concept } from "@/components/concepts";
import { conceptFamilies } from "@/components/concept-catalog";
import { RealityBar, genosSourceCommit, type DocItem } from "@/components/reality-bar";

const modelByConcept: Record<string, string> = {
  agow: "agow", attention: "agow", genome: "genome", epigenetics: "genome", "agent-dna": "agent-dna",
  evidence: "evidence", beliefs: "evidence", claims: "evidence", contradictions: "evidence", provenance: "evidence",
  memoire: "memory", "episodic-memory": "memory", "semantic-memory": "memory", "procedural-memory": "memory",
  maladies: "immunity", "immune-system": "immunity", "adaptive-epistemic-immunity": "immunity", pathologies: "immunity",
  "lean-verification": "lean", "proof-artifact": "lean", "deterministic-verification": "lean",
};

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
    alternates: {
      canonical: `/concepts/${concept.slug}`,
      languages: {
        en: `/concepts/${concept.slug}`,
        fr: `/fr/concepts/${concept.slug}`,
      },
    },
  };
}

export default async function ConceptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();
  const index = concepts.findIndex((item) => item.slug === concept.slug);
  const previous = concepts[(index - 1 + concepts.length) % concepts.length];
  const next = concepts[(index + 1) % concepts.length];
  const family = conceptFamilies.find((item) => item.id === concept.familyId);
  const implementation = concept.implementation ?? "unassessed";
  const integration = concept.integration ?? "unassessed";
  const evidence = concept.evidence ?? "unassessed";
  const related = (concept.related ?? []).map((relatedSlug) => getConcept(relatedSlug)).filter((item): item is Concept => item !== undefined);
  const doc: DocItem[] = [
    { key: "science", label: "Science", state: concept.scienceBasis ? "full" : concept.biologyInspired ? "partial" : "na" },
    { key: "math", label: "Mathematics", state: concept.mathModel ? "full" : concept.hasMathematics ? "partial" : "na" },
    { key: "simulation", label: "Simulation", state: concept.hasSimulation ? "full" : "missing" },
    { key: "usecases", label: "Use cases", state: concept.useCases?.length || concept.steps.length ? "full" : "partial" },
    { key: "benchmark", label: "Benchmark", state: concept.hasBenchmark ? "full" : "missing" },
    { key: "fr", label: "FR translation", state: "partial" },
  ];

  return (
    <div className="page-shell" lang="en">
      <section className="page-hero section-wrap concept-detail-hero">
        <Link className="concept-back-link" href="/concepts">← All concepts</Link>
        <Eyebrow>{concept.number} · {family?.name ?? concept.eyebrow}</Eyebrow>
        <h1>{concept.title}<br /><em>in GenOS.</em></h1>
        <p>{concept.intro}</p>
      </section>

      <div className="section-wrap concept-reality-wrap">
        <RealityBar implementation={implementation} integration={integration} evidence={evidence} note={concept.statusNote} doc={doc} />
        <nav className="concept-depth-nav" aria-label="Reading depths">
          <span>READ IN</span>
          <a href="#thirty-seconds">30 seconds ↓</a>
          <a href="#five-minutes">5 minutes ↓</a>
          <a href="#deep-dive">Deep dive ↓</a>
        </nav>
      </div>

      {concept.diagram && <section className="section-wrap concept-explainer">
        <ConceptDiagramView kind={concept.diagram} title={concept.diagramTitle} description={concept.diagramDescription} />
      </section>}

      <section className="section-wrap concept-model-section" id="thirty-seconds">
        <div className="concept-section-heading"><Eyebrow>DEFINITION AND SCIENCE</Eyebrow><h2>What it means<br /><em>in GenOS.</em></h2></div>
        <div className="concept-model-grid">
          <article><span>IN ONE SENTENCE</span><p>{concept.intro}</p></article>
          <article><span>BIOLOGICAL / SCIENTIFIC BASIS</span><p>{concept.scienceBasis ?? (concept.biologyInspired ? "The linked GenOS source documents the inspiration and its limits; this atlas entry has not yet summarized that evidence." : "No biological equivalence is asserted by this entry. See the linked source for the concept's stated foundations and scope.")}</p></article>
          <article><span>GENOS TRANSLATION</span><p>{concept.steps.length ? concept.steps.map((step) => step.title).join(" → ") : concept.intro}</p></article>
          <article className="concept-math-panel"><span>MATHEMATICAL / LOGICAL MODEL</span><p>{concept.mathModel ?? (concept.hasMathematics ? "A mathematical treatment is linked from the canonical source; this atlas entry does not restate it." : "No normalized mathematical model is registered in this atlas entry.")}</p></article>
        </div>
      </section>

      <section className="section-wrap concept-steps" id="five-minutes">
        <div className="concept-section-heading"><Eyebrow>PROCESS AND USE</Eyebrow><h2>{concept.steps.length ? "How it works" : "Use cases"}<br /><em>at a glance.</em></h2></div>
        <div className="concept-step-list">
          {concept.steps.length ? concept.steps.map((step, stepIndex) => (
            <article className="concept-step" key={step.title}>
              <span>{String(stepIndex + 1).padStart(2, "0")}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
              <b aria-hidden="true">↘</b>
            </article>
          )) : (concept.useCases?.length ? concept.useCases : ["The linked canonical source describes the intended use; a reviewed example has not yet been added to this atlas entry."]).map((useCase, useCaseIndex) => (
            <article className="concept-step" key={useCase}>
              <span>{String(useCaseIndex + 1).padStart(2, "0")}</span>
              <div><h3>Use case</h3><p>{useCase}</p></div>
              <b aria-hidden="true">↘</b>
            </article>
          ))}
        </div>
      </section>

      <section className="concept-architecture-wrap" id="deep-dive">
        <div className="section-wrap concept-architecture">
          <div><Eyebrow light>RUNTIME IMPLEMENTATION</Eyebrow><h2>What is connected,<br /><em>and how far.</em></h2><p>{concept.scope}</p></div>
          <div className="concept-architecture-details">
            <article><span>IMPLEMENTATION DETAIL</span><p>{concept.statusNote ?? "No concept-specific status record has been curated in the atlas."}</p></article>
            <article><span>FAILURE MODES</span><p>{concept.failureModes?.join(" · ") ?? "Failure modes have not yet been separately cataloged for this entry; follow the source and evidence links before relying on the mechanism."}</p></article>
            <article><span>CODE REFERENCES</span><p>{concept.codeSources?.length ? concept.codeSources.join(" · ") : "No implementation file is pinned to this concept entry yet."}</p></article>
          </div>
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
              <a href="https://github.com/PISSARAW/GenOS/blob/v3/docs/02-orchestration/ontogenese-boucle.md" target="_blank" rel="noreferrer">Read the operational loop ↗</a>
            </div>
          </div>
        </section>
      )}

      <section className="concept-scope-wrap">
        <div className="section-wrap concept-scope">
          <Eyebrow light>EVIDENCE AND LIMITS</Eyebrow>
          <h2>{concept.scopeTitle}</h2>
          <p>{concept.scope}</p>
          <div className="concept-evidence-links">
            <a href={`https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/${concept.source}`} target="_blank" rel="noreferrer">Read the pinned source: {concept.sourceLabel} <span>↗</span></a>
            <Link href="/evidence">Open the evidence ledger <span>→</span></Link>
            {concept.hasBenchmark && <Link href="/benchmarks">Browse benchmark protocols <span>→</span></Link>}
            {modelByConcept[concept.slug]
              ? <Link href={`/lab/models?model=${modelByConcept[concept.slug]}`}>Experiment with this concept <span>→</span></Link>
              : <Link href="/lab/models">Explore teaching simulations <span>→</span></Link>}
          </div>
        </div>
      </section>

      {related.length > 0 && <section className="section-wrap concept-related">
        <Eyebrow>RELATED CONCEPTS</Eyebrow>
        <div>{related.map((item) => <Link key={item.slug} href={`/concepts/${item.slug}`}><span>{item.title}</span><b>↗</b></Link>)}</div>
      </section>}

      <nav className="section-wrap concept-pagination" aria-label="Navigation between concepts">
        <Link href={`/concepts/${previous.slug}`}><span>PREVIOUS</span><strong>← {previous.title}</strong></Link>
        <Link href={`/concepts/${next.slug}`}><span>NEXT</span><strong>{next.title} →</strong></Link>
      </nav>
    </div>
  );
}
