import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { researchDocsBase, researchSections } from "@/components/research-program";
import { primaryMechanismReferences } from "@/components/mechanism-literature";
import { genosSource } from "@/components/product-evidence";

export const metadata: Metadata = {
  title: "GenOS Research",
  description: "A map of documented GenOS research areas: agent runtime, orchestration, memory, epistemology, evolution, and biomimetic systems.",
  alternates: { canonical: "/en/research", languages: { en: "/en/research", fr: "/fr/research" } },
};

const docs = researchDocsBase;

export default function ResearchPage() {
  return (
    <div className="page-shell" lang="en">
      <section className="page-hero section-wrap research-hero">
        <Eyebrow>RESEARCH · PROGRAM AND SOURCES</Eyebrow>
        <h1>Research questions<br /><em>and evidence.</em></h1>
        <p>GenOS studies how agents can preserve state, work together, and learn from results under supervision. Each hypothesis needs a matching protocol and measured outcome before it can be treated as supported.</p>
        <div className="hero-actions">
          <a className="button button-dark" href={`${docs}README.md`} target="_blank" rel="noreferrer">Browse all documentation <span>↗</span></a>
          <a className="button button-quiet" href={genosSource("docs/adr/README.md")} target="_blank" rel="noreferrer">Read ADR decisions <span>↗</span></a>
        </div>
        <div className="research-scope"><span>SCOPE</span><p>A summary of the material currently documented in GenOS, not an exhaustive review of external scientific literature. Prototypes, hypotheses, and measured results retain distinct statuses.</p></div>
      </section>

      <section className="section-wrap research-index">
        <div className="research-intro"><Eyebrow>RESEARCH AREAS</Eyebrow><h2>Six groups of<br /><em>open questions.</em></h2><p>Each source document details its scope, technical choices, and limits. Experimental results are collected separately on the benchmarks page.</p></div>
        <div className="research-grid">
          {researchSections.map((section) => (
            <article className="research-card" key={section.index}>
              <div className="research-card-meta"><span>{section.index} / RESEARCH · {section.status}</span><span aria-hidden="true">↗</span></div>
              <h3>{section.title}</h3>
              <strong className="research-question">{section.question}</strong>
              <p>{section.summary}</p>
              <dl className="research-chain">
                <dt>EXTERNAL SCIENCE</dt><dd>{section.externalBasis}{section.externalAnchor ? ` — ${section.externalAnchor}` : ""}</dd>
                <dt>GENOS HYPOTHESIS</dt><dd>{section.genosHypothesis}</dd>
                <dt>GENOS EVIDENCE</dt><dd><a href={section.evidenceHref} target={section.evidenceHref.startsWith("http") ? "_blank" : undefined} rel={section.evidenceHref.startsWith("http") ? "noreferrer" : undefined}>Follow the chain →</a></dd>
              </dl>
              <div className="research-links">{section.links.map(([label, path]) => <a key={path} href={`${docs}${path}`} target="_blank" rel="noreferrer">{label}<span aria-hidden="true">↗</span></a>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap research-literature" aria-labelledby="research-literature-title">
        <div className="research-intro"><Eyebrow>PRIMARY REFERENCES · MECHANISMS</Eyebrow><h2 id="research-literature-title">Sources for the<br /><em>mechanisms.</em></h2><p>These primary sources describe selected scientific mechanisms used as design analogies. They do not test or validate GenOS code.</p></div>
        <div className="research-literature-grid">{primaryMechanismReferences.map((reference) => <article key={reference.id}><span>{reference.mechanism} · {reference.year}</span><h3>{reference.title}</h3><p>{reference.authors} · <i>{reference.venue}</i></p><a href={reference.url} target="_blank" rel="noreferrer">Open source ↗</a></article>)}</div>
      </section>

      <section className="research-bottom section-wrap">
        <div><Eyebrow>EVIDENCE AND RESULTS</Eyebrow><h2>What we measure<br />stays <em>contextual.</em></h2></div>
        <div><p>A number only makes sense with its task, corpus, protocol, and limits. See available results and campaigns still to be run.</p><a className="button button-dark" href="/benchmarks">View benchmarks <span>→</span></a></div>
      </section>
    </div>
  );
}
