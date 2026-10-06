import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { genosSource } from "@/components/product-evidence";
import { MorphologyGraphVisual } from "@/components/morphology-graph-visual";
import { morphogenesisCases } from "@/components/morphogenesis-cases";

export const metadata: Metadata = {
  title: "Morphogenesis — compose work graphs",
  description: "Explore bounded Morphogenesis graph execution: sequence, parallelism, nesting, evidence gates, and known mission-path limits.",
  alternates: { canonical: "/en/morphogenesis" },
};

const operators = [
  { name: "SEQUENCE", symbol: "01 → 02 → 03", body: "Connects ordered steps. Each step passes its output to the next." },
  { name: "PARALLEL", symbol: "01 ↘ ↗ 02", body: "Starts independent branches, then waits at their join barrier." },
  { name: "NEST", symbol: "HOST [ SUBGRAPH ]", body: "Places a local graph inside a host role with an explicit execution boundary." },
  { name: "GATE", symbol: "IF ✓ → THEN · ELSE", body: "Evaluates a stated condition and chooses one of two branches." },
];

const crossCuttingCapabilities = [
  { slug: "epistemic-meristem", title: "Epistemic meristem", summary: "Revalidate verified coverage gaps before proposing growth." },
  { slug: "unblocking-spiral", title: "Unblocking spiral", summary: "Change method and scope when repeated blockage has evidence." },
  { slug: "counterexample-cambium", title: "Counterexample cambium", summary: "Store counterexamples and gate their later recall." },
  { slug: "chronotaxis", title: "Aperiodic chronotaxis", summary: "Persist observation windows, receipts and missed phases." },
  { slug: "risk-ledger", title: "Statistical risk ledger", summary: "Pre-register and account for promotion risk before opt-in gates." },
] as const;

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
      <p className="morph-operator-note">The runtime also includes COMPETE, WRAP, BRIDGE, and FEDERATE. <a href={genosSource("docs/adr/0133-graphe-morphologique-executable-et-plugins-topologies.md")} target="_blank" rel="noreferrer">Read the decision and the eight-operator contract ↗</a></p>
    </section>

    <section className="morph-featured-section"><div className="section-wrap morph-featured-grid"><div><Eyebrow light>ILLUSTRATED GRAPH COMPOSITION</Eyebrow><h2>From parallel paths<br />to a <em>decision gate.</em></h2><p>An independent review sends several paths to work and gathers execution receipts as traces. Separate evidence must satisfy the explicit gate before integration can proceed. The graph illustration is not a verified user mission.</p><Link className="button button-white" href={`/morphogenesis/cases/${featured.slug}`}>Explore this case <span>↗</span></Link></div><MorphologyGraphVisual title={featured.recipe} nodes={featured.nodes} edges={featured.edges} compact /></div></section>

    <section className="section-wrap section-space morph-cases-section"><div className="morph-case-heading"><div><Eyebrow>USE CASES</Eyebrow><h2>Choose a composition<br />for the <em>problem.</em></h2></div><p>Each example shows when to add structure, what the graph connects, and where explicit decisions remain.</p></div>
      <div className="morph-case-grid">{morphogenesisCases.map((item) => <Link className="morph-case-card" href={`/morphogenesis/cases/${item.slug}`} key={item.slug}>
        <div className="morph-case-meta"><span>{item.number} / MORPHOGENESIS</span><span>USE CASE ↗</span></div>
        <div className="morph-case-glyph" aria-hidden="true"><i /><i /><i /><i /><b /></div>
        <h3>{item.shortTitle}</h3><p>{item.summary}</p><code>{item.operators.join(" · ")}</code>
      </Link>)}</div>
    </section>

    <section className="section-wrap morph-contract-note"><div><Eyebrow>STATUS AND SCOPE</Eyebrow><h2>A contract describes a<br /><em>capability, not magic.</em></h2></div><p>All eight plugins are registered with topology-specific input contracts. When a graph declares workers, each must have a successful typed artifact with provenance before the topology can consume its result; the evidence barrier binds those validated reports into the mission graph. The default mission path still only prepares a morphology proposal. A mission can explicitly execute its planned graph with executeMorphogenesisGraph: true after the evidence barrier; that output remains unverified and does not apply a transition or create an AgentGit commit. A separate explicit variant transition can persist a version commit after its checks; failed persistence rolls back the transition. A variant change needs a registered transition and satisfied conditions and evidence. Structural changes keep target topology separate from target organization, and an explicit topology transfer requires a source topology. Execution receipts remain unverified traces; graph completion alone neither proves a mission outcome nor creates a learning experience. Controllers remain simplified in-process models, and some leaves require a ballot, supplied capability, or mission text.</p><div className="morph-source-links"><Link href="/evidence">View implementation status <span>→</span></Link><a href={genosSource("docs/03-reference/plugins-topologies-morphogenese.md")} target="_blank" rel="noreferrer">Read the plugin contract ↗</a><a href={genosSource("docs/adr/0133-graphe-morphologique-executable-et-plugins-topologies.md")} target="_blank" rel="noreferrer">Read the executable graph decision ↗</a></div></section>
    <section className="section-wrap section-space morph-cases-section">
      <div className="morph-case-heading"><div><Eyebrow>V3 · CROSS-CUTTING CAPABILITIES</Eyebrow><h2>Change the plan<br /><em>with evidence.</em></h2></div><p>These bounded capabilities complement graph execution. Their dossiers distinguish connected paths from automatic mission behavior.</p></div>
      <div className="morph-case-grid">{crossCuttingCapabilities.map((capability, index) => <Link className="morph-case-card" href={`/concepts/${capability.slug}`} key={capability.slug}>
        <div className="morph-case-meta"><span>{String(index + 1).padStart(2, "0")} / CAPABILITY</span><span>DOSSIER ↗</span></div>
        <h3>{capability.title}</h3><p>{capability.summary}</p>
      </Link>)}</div>
    </section>
  </div>;
}
