import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { MorphologyGraphVisual } from "@/components/morphology-graph-visual";
import { morphogenesisCases } from "@/components/morphogenesis-cases";

export const metadata: Metadata = {
  title: "Morphogenesis — compose work graphs",
  description: "Explore executable Morphogenesis graphs: sequence, parallelism, nesting, gates, and illustrated use cases.",
  alternates: { canonical: "/morphogenesis" },
};

const operators = [
  { name: "SEQUENCE", symbol: "01 → 02 → 03", body: "Connects ordered steps. Each step passes its output to the next." },
  { name: "PARALLEL", symbol: "01 ↘ ↗ 02", body: "Starts independent branches, then waits at their join barrier." },
  { name: "NEST", symbol: "HOST [ SUBGRAPH ]", body: "Places a local graph inside a host role with an explicit execution boundary." },
  { name: "GATE", symbol: "IF ✓ → THEN · ELSE", body: "Evaluates a stated condition and chooses one of two branches." },
];

export default function MorphogenesisPage() {
  const featured = morphogenesisCases[0];
  return <div className="page-shell morph-page">
    <section className="page-hero section-wrap morph-hero">
      <Eyebrow>COMPOSITION · EXECUTABLE GRAPHS</Eyebrow>
      <h1>Compose the work,<br />keep <em>control.</em></h1>
      <p>Morphogenesis combines graph operators and topology leaves into a work plan. A topology describes a way to collaborate; a graph composes these patterns into one workflow.</p>
      <div className="morph-hero-actions"><Link className="button button-dark" href={`/morphogenesis/cases/${featured.slug}`}>View a composed graph <span>→</span></Link><Link className="button button-quiet" href="/topologies">Explore the eight topologies <span>↗</span></Link></div>
    </section>

    <section className="section-wrap morph-operator-section">
      <div className="morph-section-heading"><Eyebrow>FOUR CORE OPERATORS</Eyebrow><h2>A shape for every<br /><em>dependency.</em></h2><p>Operators turn a set of workers into a graph: they define order, branches, subgraphs, and transition conditions.</p></div>
      <div className="morph-operator-grid">{operators.map((operator, i) => <article className={`morph-operator morph-operator-${i + 1}`} key={operator.name}><span>0{i + 1} / OPERATOR</span><div className="morph-operator-symbol" aria-hidden="true">{operator.symbol}</div><h3>{operator.name}</h3><p>{operator.body}</p></article>)}</div>
      <p className="morph-operator-note">The runtime also includes COMPETE, WRAP, BRIDGE, and FEDERATE. <a href="https://github.com/PISSARAW/GenOS/blob/main/docs/adr/0133-graphe-morphologique-executable-et-plugins-de-topologies.md" target="_blank" rel="noreferrer">Read the decision and the eight-operator contract ↗</a></p>
    </section>

    <section className="morph-featured-section"><div className="section-wrap morph-featured-grid"><div><Eyebrow light>END-TO-END EXAMPLE</Eyebrow><h2>From parallel paths<br />to a <em>decision.</em></h2><p>An independent review sends several paths to work, gathers their receipts, then lets an explicit gate decide whether integration can proceed.</p><Link className="button button-white" href={`/morphogenesis/cases/${featured.slug}`}>Explore this case <span>↗</span></Link></div><MorphologyGraphVisual title={featured.recipe} nodes={featured.nodes} edges={featured.edges} compact /></div></section>

    <section className="section-wrap section-space morph-cases-section"><div className="morph-case-heading"><div><Eyebrow>USE CASES</Eyebrow><h2>Choose a composition<br />for the <em>problem.</em></h2></div><p>Each example shows when to add structure, what the graph connects, and where explicit decisions remain.</p></div>
      <div className="morph-case-grid">{morphogenesisCases.map((item) => <Link className="morph-case-card" href={`/morphogenesis/cases/${item.slug}`} key={item.slug}>
        <div className="morph-case-meta"><span>{item.number} / MORPHOGENESIS</span><span>USE CASE ↗</span></div>
        <div className="morph-case-glyph" aria-hidden="true"><i /><i /><i /><i /><b /></div>
        <h3>{item.shortTitle}</h3><p>{item.summary}</p><code>{item.operators.join(" · ")}</code>
      </Link>)}</div>
    </section>

    <section className="section-wrap morph-contract-note"><div><Eyebrow>STATUS AND SCOPE</Eyebrow><h2>A contract describes a<br /><em>capability, not magic.</em></h2></div><p>All eight plugins are registered in the runtime, with input contracts and limits specific to each topology. Controllers remain simplified in-process models, and some leaves require a ballot, supplied capability, or mission text. Composition does not automatically activate every capability listed in a contract.</p><div className="morph-source-links"><Link href="/evidence">View implementation status <span>→</span></Link><a href="https://github.com/PISSARAW/GenOS/blob/main/docs/03-reference/plugins-topologies-morphogenese.md" target="_blank" rel="noreferrer">Read the plugin contract ↗</a><a href="https://github.com/PISSARAW/GenOS/blob/main/docs/adr/0133-graphe-morphologique-executable-et-plugins-de-topologies.md" target="_blank" rel="noreferrer">Read the executable graph decision ↗</a></div></section>
  </div>;
}
