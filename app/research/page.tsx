import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: "GenOS Research",
  description: "A map of documented GenOS research areas: agent runtime, orchestration, memory, epistemology, evolution, and biomimetic systems.",
  alternates: { canonical: "/research" },
};

const docs = "https://github.com/PISSARAW/GenOS/blob/v3/docs/";
const sections = [
  {
    index: "01",
    title: "Runtime, state, and continuity",
    question: "How can agent work be resumed and inspected?",
    summary: "GenOS explores versioned state, snapshots, counterfactual branches, and recovery. Decisions retain their provenance so results can be compared, challenged, or resumed.",
    links: [
      ["Agent runtime", "01-concepts/runtime-agentique.md"],
      ["Counterfactual workspaces", "02-orchestration/workspaces-contrefactuel.md"],
      ["Orchestration and branches", "02-orchestration/orchestration.md"],
    ],
  },
  {
    index: "02",
    title: "Orchestration and topologies",
    question: "What organization fits a group of collaborating agents?",
    summary: "The work defines eight topologies, their contracts, capabilities, and limits: specialist teams, populations, communities, shared state, and execution across comparison worlds. Their presence in the runtime does not imply equal maturity.",
    links: [
      ["Topology and capability contract", "02-orchestration/topologies-et-capacites.md"],
      ["Topology index", "02-orchestration/topologies/README.md"],
      ["Agent communication", "02-orchestration/communication.md"],
    ],
  },
  {
    index: "03",
    title: "Memory, learning, and plasticity",
    question: "How can experience influence later decisions?",
    summary: "This research area covers episodic and semantic memory, retrieval, lessons, plasticity, and consolidation. Effects observed in controlled scenarios remain distinct from quality measured on real tasks.",
    links: [
      ["Memory and learning", "01-concepts/memoire-et-apprentissage.md"],
      ["Neurobiology and plasticity", "01-concepts/neurobiologie-et-plasticite.md"],
      ["Autobiographical memory", "02-orchestration/memoire-autobiographique.md"],
    ],
  },
  {
    index: "04",
    title: "Epistemology and evidence",
    question: "What justifies a conclusion or promotion?",
    summary: "GenOS treats outputs as results to examine. The work covers uncertainty, abstention, provenance, independent evidence, and metric limitations, separating execution success from the validity of a claim.",
    links: [
      ["Epistemology and evidence", "01-concepts/epistemologie-et-evidence.md"],
      ["Product completeness and status", "03-reference/contrat-produit-et-completude.md"],
      ["Quality and evidence", "06-qualite-preuves/README.md"],
    ],
  },
  {
    index: "05",
    title: "Evolution and verified development",
    question: "How can an agent evolve without confusing change with progress?",
    summary: "GVX and evolutionary research examine transformations, mutations, lineages, experimental nurseries, and promotion conditions. They emphasize external measurements, replication, and safeguards against circular self-evaluation.",
    links: [
      ["Verified development (GVX)", "01-concepts/gvx.md"],
      ["GVX experimental nursery", "02-orchestration/nursery-experimentale-gvx.md"],
      ["Evolutionary research on selfhood", "06-benchmarks/recherche-evolutionnaire-soi.md"],
    ],
  },
  {
    index: "06",
    title: "Biomimetic systems and cognition",
    question: "Which biological ideas can become testable computational mechanisms?",
    summary: "The program examines memory, homeostasis, communication, perception, immunity, and collective coordination as engineering models. Analogies organize mechanisms; they do not prove biological properties or consciousness.",
    links: [
      ["Computational biology", "01-concepts/biologie-computationnelle.md"],
      ["Epistemic immune system", "01-concepts/adaptive-epistemic-immune-system.md"],
      ["Vital agent organs", "01-concepts/organes-vitaux-agents.md"],
    ],
  },
];

export default function ResearchPage() {
  return (
    <div className="page-shell" lang="en">
      <section className="page-hero section-wrap research-hero">
        <Eyebrow>RESEARCH · PROGRAM AND SOURCES</Eyebrow>
        <h1>Research made<br /><em>verifiable.</em></h1>
        <p>GenOS studies how agents can preserve state, work together, and learn from results under supervision. This page maps the main documented research areas and links to canonical repository documents.</p>
        <div className="hero-actions">
          <a className="button button-dark" href={`${docs}README.md`} target="_blank" rel="noreferrer">Browse all documentation <span>↗</span></a>
          <a className="button button-quiet" href="https://github.com/PISSARAW/GenOS/blob/v3/docs/adr/README.md" target="_blank" rel="noreferrer">Read ADR decisions <span>↗</span></a>
        </div>
        <div className="research-scope"><span>SCOPE</span><p>A summary of the material currently documented in GenOS, not an exhaustive review of external scientific literature. Prototypes, hypotheses, and measured results retain distinct statuses.</p></div>
      </section>

      <section className="section-wrap research-index">
        <div className="research-intro"><Eyebrow>RESEARCH AREAS</Eyebrow><h2>Six groups of<br /><em>open questions.</em></h2><p>Each source document details its scope, technical choices, and limits. Experimental results are collected separately on the benchmarks page.</p></div>
        <div className="research-grid">
          {sections.map((section) => (
            <article className="research-card" key={section.index}>
              <div className="research-card-meta"><span>{section.index} / RESEARCH</span><span aria-hidden="true">↗</span></div>
              <h3>{section.title}</h3>
              <strong className="research-question">{section.question}</strong>
              <p>{section.summary}</p>
              <div className="research-links">{section.links.map(([label, path]) => <a key={path} href={`${docs}${path}`} target="_blank" rel="noreferrer">{label}<span aria-hidden="true">↗</span></a>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="research-bottom section-wrap">
        <div><Eyebrow>EVIDENCE AND RESULTS</Eyebrow><h2>What we measure<br />stays <em>contextual.</em></h2></div>
        <div><p>A number only makes sense with its task, corpus, protocol, and limits. See available results and campaigns still to be run.</p><a className="button button-dark" href="/benchmarks">View benchmarks <span>→</span></a></div>
      </section>
    </div>
  );
}
