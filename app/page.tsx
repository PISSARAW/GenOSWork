import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHeading } from "@/components/section-heading";
import { TrajectoryGraphic } from "@/components/trajectory-graphic";

const pillars = [
  { n: "01 / RECORD", title: "Keep the context.", body: "Capture the decision, the source material, and the state of the work in one durable record.", tone: "dark", icon: "◫", href: "/runtime" },
  { n: "02 / REVIEW", title: "See what changed.", body: "Compare a proposed change with what came before it, including the reasons and supporting artifacts.", tone: "sand", icon: "⌘", href: "/runs" },
  { n: "03 / CONTINUE", title: "Pick up responsibly.", body: "Make the next step clear: what is ready, what remains open, and what needs review.", tone: "lilac", icon: "◎", href: "/evidence" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-copy">
          <Eyebrow><span className="eyebrow-pulse" /> OPEN-SOURCE WORK CONTINUITY</Eyebrow>
          <h1>Keep the work<br /><em>legible over time.</em></h1>
          <p className="hero-lede">GenOS keeps decisions, changes, and supporting material together so a technical project can be reviewed, resumed, and handed over without losing its context.</p>
          <div className="hero-actions"><Link className="button button-dark" href="/runtime">Explore the method <span>→</span></Link><Link className="button button-quiet" href="/evidence">Review the record <span>→</span></Link></div>
          <div className="hero-proof"><span className="proof-dot" /> Built for review, continuity, and accountable change</div>
        </div>
        <TrajectoryGraphic />
        <div className="hero-index"><span>01 / 03</span><span>THE WORK RECORD</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <section className="section-wrap section-space home-journey" aria-label="A practical way to assess GenOS">
        <SectionHeading index="00" label="START HERE" title="A clear record" emphasis="of the work." body="Read the method, inspect a recorded execution, then check which claims are supported by the source and evidence." />
        <div className="journey-grid">
          <div className="journey-card"><span>01 · RUNTIME</span><strong>Understand the record</strong><p>See which parts preserve state, handoffs, decisions, and recovery points.</p><Link href="/runtime">Read the runtime overview →</Link></div>
          <div className="journey-card"><span>02 · RECORDED RUN</span><strong>Inspect an execution</strong><p>Review one historical run with its decisions, artifacts, and incomplete work.</p><Link href="/runs">Open a recorded run →</Link></div>
          <div className="journey-card"><span>03 · EVIDENCE</span><strong>Check the limits</strong><p>See what is implemented, measured, partial, or still proposed.</p><Link href="/evidence">Read the evidence ledger →</Link></div>
        </div>
      </section>

      <section className="section-wrap section-space" id="runtime">
        <SectionHeading index="01" label="THE METHOD" title="Make the work" emphasis="reviewable." body="A project should retain more than its latest output. GenOS keeps enough of the working record to explain a decision, compare a change, and hand the work to someone else." />
        <div className="runtime-grid">{pillars.map((card) => <article className={`runtime-card runtime-card-${card.tone}`} key={card.n}><div className="card-meta"><span>{card.n}</span><span className="card-symbol" aria-hidden="true">{card.icon}</span></div><div className={`mini-illustration mini-${card.tone}`} aria-hidden="true"><i /><i /><i /><i /></div><h3>{card.title}</h3><p>{card.body}</p><Link className="text-link" href={card.href}>Explore {card.n.split(" / ")[1].toLowerCase()} <span>↗</span></Link></article>)}</div>
        <div className="workflow-line"><span>CONTEXT</span><i /><span>DECISION</span><i /><span>CHANGE</span><i /><span>REVIEW</span><i /><span>CONTINUE</span></div>
      </section>

      <section className="section-wrap section-space"><div className="home-evidence"><div><Eyebrow>02 — EVIDENCE</Eyebrow><h2>Read the claim<br /><em>with its limits.</em></h2></div><p>Implementation, partial work, and proposals are kept distinct. Follow each claim to its source, scope, and known limits.</p><Link className="button button-dark" href="/evidence">Open the evidence ledger <span>→</span></Link></div></section>
    </>
  );
}
