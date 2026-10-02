import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHeading } from "@/components/section-heading";
import { TopologyCard } from "@/components/topology-card";
import { TrajectoryGraphic } from "@/components/trajectory-graphic";
import { topologies } from "@/components/topologies";

const pillars = [
  { n: "01 / VERSION", title: "Keep every path.", body: "Capture state, fork independent trajectories, compare diffs and replay validated snapshots.", tone: "dark", icon: "◫", href: "/runtime" },
  { n: "02 / ORCHESTRATE", title: "Coordinate with intent.", body: "Compose specialized workers, apply budgets and permissions, and preserve the handoffs.", tone: "sand", icon: "⌘", href: "/topologies" },
  { n: "03 / VERIFY", title: "Let evidence decide.", body: "Keep claims, provenance, checks and promotion gates connected to the work.", tone: "lilac", icon: "◎", href: "/evidence" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-copy">
          <Eyebrow><span className="eyebrow-pulse" /> OPEN-SOURCE AGENT RUNTIME</Eyebrow>
          <h1>Build for what<br />happens <em>next.</em></h1>
          <p className="hero-lede">Agents fail. Plans change. Evidence disagrees. GenOS gives multi-agent work a versioned state, so you can fork a path, inspect what happened, and decide what deserves to move forward.</p>
          <div className="hero-actions"><Link className="button button-dark" href="/runtime">Explore the runtime <span>→</span></Link><a className="button button-quiet" href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noreferrer">Read the source <span>↗</span></a></div>
          <div className="hero-proof"><span className="proof-dot" /> Snapshots · forks · replay · evidence gates</div>
        </div>
        <TrajectoryGraphic />
        <div className="hero-index"><span>01 / 04</span><span>THE RUNTIME LAYER</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <section className="signal-strip" aria-label="GenOS runtime characteristics"><div><strong>State</strong><span>versioned by default</span></div><b>×</b><div><strong>Execution</strong><span>supervised and bounded</span></div><b>×</b><div><strong>Promotion</strong><span>gated by evidence</span></div><b>×</b><div><strong>Recovery</strong><span>built into the workflow</span></div></section>

      <section className="section-wrap section-space" id="runtime">
        <SectionHeading index="01" label="THE RUNTIME" title="Make the work" emphasis="inspectable." body="Most orchestration starts with a prompt and ends with an answer. GenOS keeps the execution history in view—so a successful run can still be questioned, and a failed one can still teach you something." />
        <div className="runtime-grid">{pillars.map((card) => <article className={`runtime-card runtime-card-${card.tone}`} key={card.n}><div className="card-meta"><span>{card.n}</span><span className="card-symbol" aria-hidden="true">{card.icon}</span></div><div className={`mini-illustration mini-${card.tone}`} aria-hidden="true"><i /><i /><i /><i /></div><h3>{card.title}</h3><p>{card.body}</p><Link className="text-link" href={card.href}>Explore {card.n.split(" / ")[1].toLowerCase()} <span>↗</span></Link></article>)}</div>
        <div className="workflow-line"><span>MISSION</span><i /><span>PLAN</span><i /><span>FORK</span><i /><span>EXECUTE</span><i /><span>VERIFY</span><i /><span>PROMOTE / HOLD</span></div>
      </section>

      <section className="section-wrap section-space topology-preview" id="topologies">
        <SectionHeading index="02" label="ORGANIZATION IS A CHOICE" title="Eight ways to" emphasis="work together." body="A topology describes how workers coordinate. GenOS wires all eight into its runtime; the services, evidence requirements and operational maturity vary by mode." />
        <div className="topology-grid">{topologies.map((topology) => <TopologyCard key={topology.slug} topology={topology} />)}</div>
        <div className="section-end-link"><Link className="text-link" href="/topologies">Explore all eight topologies <span>→</span></Link><span>CAPABILITIES VARY BY MODE · CONTRACTS ARE NOT AUTOMATIC EFFECTS</span></div>
      </section>

      <section className="section-wrap organization-teaser">
        <div><Eyebrow>19 DYNAMIC ORGANIZATIONS</Eyebrow><h2>Structure the team.<br /><em>Guide the next step.</em></h2><p>Consensus with abstention, blind adversarial review, swarm search, mycelial routing, isolated recovery and more. Dynamic organizations are algorithmic decision rules, separate from the eight topologies.</p></div>
        <div className="organization-teaser-visual" aria-hidden="true"><div className="teaser-ring"><i /><i /><i /><i /><i /><i /></div><div className="teaser-core">STEP</div><span>19 ALGORITHMS</span></div>
        <Link className="button button-dark" href="/organizations">Explore all 19 organizations <span>→</span></Link>
      </section>

      <section className="home-lab"><div className="section-wrap home-lab-inner"><div><Eyebrow light>03 — EXPLORE THE IDEA</Eyebrow><h2>What kind of team<br />does a mission <em>need?</em></h2><p>Trace a sample mission through parallel strategies in the browser. It is an illustration of the model, not a live runtime connection.</p><Link className="button button-white" href="/lab">Open Morphogenesis Lab <span>↗</span></Link><Link className="morph-home-link" href="/morphogenesis">Explore executable graph compositions <span>→</span></Link></div><div className="home-lab-visual" aria-hidden="true"><span>MISSION</span><i /><div><b>Trinity</b><b>A-Team</b><b>Biome</b></div><i /><span>EVIDENCE</span></div></div></section>

      <section className="section-wrap section-space"><div className="home-evidence"><div><Eyebrow>04 — CLAIMS NEED RECEIPTS</Eyebrow><h2>See where the claim<br /><em>meets the code.</em></h2></div><p>Implemented, partial and proposed are different states. Explore the implementation ledger, read the source contracts and follow their stated limits.</p><Link className="button button-dark" href="/evidence">Open the evidence ledger <span>→</span></Link></div></section>
    </>
  );
}
