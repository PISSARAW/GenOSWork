import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = { title: "How GenOS works", description: "Explore the GenOS runtime lifecycle: version state, compose workers, execute under constraints and review evidence.", alternates: { canonical: "/en/runtime" } };

const steps = [
  ["01", "Frame the mission", "Turn a request into explicit work, constraints, budgets and evidence obligations."],
  ["02", "Choose an organization", "Select a topology and compatible workers for the coordination problem at hand."],
  ["03", "Version the state", "Capture a snapshot and keep candidate trajectories isolated when the mission calls for comparison."],
  ["04", "Execute under supervision", "Run through declared permissions, workspace boundaries, resource budgets and observable handoffs."],
  ["05", "Inspect the evidence", "Review outputs with their provenance and apply the relevant validation and promotion gates."],
  ["06", "Promote, hold or recover", "A result can be promoted, rejected, left uncertain or used to start a new branch from a known state."],
];

export default function RuntimePage() {
  return (
    <div className="page-shell">
      <section className="page-hero section-wrap">
        <Eyebrow>THE RUNTIME · A WORKING MODEL</Eyebrow>
        <h1>An execution history<br />you can <em>return to.</em></h1>
        <p>GenOS is an open-source runtime for supervised multi-agent work. Supported paths can version workspace state and retain selected receipts. Recovery, verification and promotion depend on the selected mode, adapter and available evidence.</p>
        <div className="hero-actions"><Link className="button button-dark" href="/runtime/supervision">Explore supervision <span>→</span></Link><a className="button button-quiet" href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noreferrer">Read the source <span>↗</span></a></div>
      </section>
      <section className="section-wrap section-space runtime-lifecycle">
        <div className="eyebrow">REFERENCE LIFECYCLE · STEPS MAY HOLD OR FAIL</div>
        <div className="lifecycle-list">{steps.map(([n, title, body]) => <article className="lifecycle-row" key={n}><span className="lifecycle-number">{n}</span><div><h2>{title}</h2><p>{body}</p></div><span className="lifecycle-mark" aria-hidden="true">↘</span></article>)}</div>
      </section>
      <section className="runtime-comparison"><div className="section-wrap comparison-inner"><div><Eyebrow light>STATE IS THE DIFFERENCE</Eyebrow><h2>From one mutable<br />timeline to <em>branches.</em></h2></div><div className="compare-visual"><div><b>ONE TIMELINE</b><span className="compare-line"><i /><i /><i /><i /></span><small>New work overwrites context</small></div><div><b>VERSIONED STATE</b><span className="compare-branches"><i /><i /><i /><i /><i /></span><small>Branches can be compared and replayed</small></div></div></div></section>
      <section className="section-wrap section-space runtime-boundaries"><Eyebrow>DESIGNED WITH BOUNDARIES</Eyebrow><h2>Every capability has a <em>contract.</em></h2><div className="boundary-grid"><article><b>Permissions</b><p>Tool access follows explicit leases and known allow-lists. Admission can refuse a mission before any worker runs.</p></article><article><b>Budgets</b><p>Execution can stop when its declared event, time or resource budget expires.</p></article><article><b>Evidence</b><p>A worker receipt or completed cycle can still require review. Promotion rules depend on the path and profile.</p></article></div><p>Snapshots cover supported state; they do not automatically restore external effects or processes. A registered topology does not activate every listed capability.</p><Link className="text-link" href="/topologies">Read the topology contracts <span>→</span></Link></section>
    </div>
  );
}
