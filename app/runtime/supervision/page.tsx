import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { supervisionPages } from "@/components/supervision-data";

export const metadata: Metadata = {
  title: "Supervised agent runtime",
  description: "Explore the concrete GenOS runtime surfaces for launching and supervising agents, isolated workspaces, budgets, events, memory and evidence reports.",
  alternates: { canonical: "/runtime/supervision" },
};

const events = [
  { time: "09:41:02", kind: "RUN ADMITTED", body: "Workspace + execution profile attached", tone: "violet" },
  { time: "09:41:05", kind: "WORKER STARTED", body: "Researcher · process p-042", tone: "green" },
  { time: "09:42:18", kind: "BUDGET", body: "Token allocation updated · 2,400 remaining", tone: "amber" },
  { time: "09:44:31", kind: "HANDOFF", body: "Evidence review requested", tone: "blue" },
];

export default function SupervisionPage() {
  return (
    <div className="page-shell supervision-page">
      <section className="page-hero section-wrap supervision-hero">
        <Eyebrow><span className="eyebrow-pulse" /> AGENT RUNTIME · SUPERVISION</Eyebrow>
        <h1>Every run, in<br />its <em>full context.</em></h1>
        <p>Launch and follow supervised agent processes with their workspaces, budgets, events, memory and evidence in view. Each surface connects back to the run that produced it.</p>
        <div className="hero-actions"><a className="button button-dark" href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noreferrer">Explore runtime source <span>↗</span></a><Link className="button button-quiet" href="/evidence">Review implementation status <span>→</span></Link></div>
        <div className="supervision-demo-note"><span className="demo-mark">i</span><span><strong>Illustrative run</strong> · Static sample data shows the supervision model; it is not a live runtime connection.</span></div>
      </section>

      <section className="section-wrap supervision-console" aria-labelledby="console-title">
        <div className="console-heading"><div><Eyebrow>RUN / MISSION-2048</Eyebrow><h2 id="console-title">Workspace migration review</h2></div><span className="run-state"><i /> IN REVIEW</span></div>
        <div className="console-metrics">
          <article><span>WORKER PROCESSES</span><strong>3 <small>/ 4</small></strong><b>2 running · 1 review</b></article>
          <article><span>ISOLATED WORKSPACES</span><strong>02</strong><b>1 active branch · 1 baseline</b></article>
          <article><span>EXECUTION BUDGET</span><strong>68<small>%</small></strong><b>3,240 / 4,800 tokens</b><div className="budget-track"><i style={{ width: "68%" }} /></div></article>
          <article><span>EVIDENCE CHECKS</span><strong>4 <small>/ 5</small></strong><b>1 check needs review</b></article>
        </div>

        <div className="console-main-grid">
          <article className="runtime-map-panel">
            <div className="panel-heading"><div><span className="panel-kicker">PROCESS TOPOLOGY</span><h3>Run execution map</h3></div><span className="sample-chip">SAMPLE</span></div>
            <div className="runtime-map" role="img" aria-label="Illustrative mission flow connecting the supervisor to three worker processes and a review gate">
              <div className="map-supervisor"><span>SUPERVISOR</span><strong>Mission 2048</strong><small>policy · budget · workspace</small></div>
              <div className="map-connectors" aria-hidden="true"><i /><i /><i /></div>
              <div className="map-workers">
                <div className="map-worker worker-running"><span><i /> RUNNING · 02:14</span><strong>Researcher</strong><small>process p-042</small></div>
                <div className="map-worker worker-complete"><span><i /> COMPLETE · 01:48</span><strong>Implementer</strong><small>process p-043</small></div>
                <div className="map-worker worker-review"><span><i /> REVIEW · 00:37</span><strong>Verifier</strong><small>process p-044</small></div>
              </div>
              <div className="map-review-gate"><span>↘</span><div><strong>Evidence gate</strong><small>4 checks passed · 1 pending</small></div></div>
            </div>
            <div className="map-legend"><span><i className="legend-running" /> Running</span><span><i className="legend-complete" /> Complete</span><span><i className="legend-review" /> Review required</span></div>
          </article>
          <article className="budget-panel">
            <div className="panel-heading"><div><span className="panel-kicker">RESOURCE ENVELOPE</span><h3>Budget consumption</h3></div><span className="budget-glyph">⌁</span></div>
            <div className="budget-total"><strong>68%</strong><span>of declared token budget</span></div>
            <div className="budget-large-track"><i style={{ width: "68%" }} /></div>
            <div className="budget-rows"><div><span>Tokens</span><b>3,240 <small>/ 4,800</small></b></div><div><span>Run time</span><b>04:39 <small>/ 10:00</small></b></div><div><span>Events</span><b>18 <small>/ 50</small></b></div></div>
            <div className="budget-footnote"><i>✓</i><span>Within configured limits</span></div>
          </article>
        </div>

        <div className="console-bottom-grid">
          <article className="event-panel">
            <div className="panel-heading"><div><span className="panel-kicker">OBSERVABILITY</span><h3>Recent events</h3></div><Link href="/runtime/supervision/events">Open event history <span>→</span></Link></div>
            <ol className="event-list">{events.map((event) => <li key={event.time}><time>{event.time}</time><i className={`event-dot event-${event.tone}`} /><div><strong>{event.kind}</strong><span>{event.body}</span></div></li>)}</ol>
          </article>
          <article className="evidence-panel">
            <div className="panel-heading"><div><span className="panel-kicker">PROVENANCE</span><h3>Evidence report</h3></div><span className="report-ref">RPT-2048</span></div>
            <div className="report-claim"><span>MISSION CLAIM</span><strong>Migration is isolated and reversible</strong></div>
            <div className="report-progress"><div><span>Workspace diff reviewed</span><b>PASS</b></div><div><span>Worker outputs attached</span><b>PASS</b></div><div><span>Rollback procedure verified</span><b className="report-pending">PENDING</b></div></div>
            <Link className="text-link" href="/runtime/supervision/evidence">Inspect report structure <span>→</span></Link>
          </article>
        </div>
      </section>

      <section className="section-wrap supervision-capabilities">
        <div className="supervision-capabilities-heading"><Eyebrow>THE SUPERVISION SURFACES</Eyebrow><h2>One run. Six ways<br />to <em>inspect it.</em></h2><p>Move from process state to the context, limits and evidence behind a result.</p></div>
        <div className="supervision-link-grid">{supervisionPages.map((page) => <Link className="supervision-link-card" href={`/runtime/supervision/${page.slug}`} key={page.slug}><span>{page.number} / {page.eyebrow}</span><strong>{page.slug === "agents" ? "Agent processes" : page.slug === "workspaces" ? "Isolated workspaces" : page.slug === "budgets" ? "Budgets & limits" : page.slug === "events" ? "Event history" : page.slug === "memory" ? "Scoped memory" : "Evidence reports"}</strong><p>{page.description}</p><b>Explore surface <i>↗</i></b></Link>)}</div>
      </section>

      <section className="supervision-boundary"><div className="section-wrap"><Eyebrow light>WHAT THIS VIEW REPRESENTS</Eyebrow><h2>Operational visibility,<br /><em>with clear boundaries.</em></h2><p>This dashboard illustrates how run state, worker activity, budgets and evidence can be brought together. It uses sample values and does not connect to or launch a live GenOS process.</p><Link className="button button-outline" href="/runtime">Read the runtime model <span>→</span></Link></div></section>
    </div>
  );
}
