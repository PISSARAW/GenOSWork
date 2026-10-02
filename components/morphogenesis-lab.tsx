"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/eyebrow";

const examples = [
  "Review a change, find risks, and preserve the evidence.",
  "Compare two recovery strategies under a tight budget.",
  "Coordinate specialists to audit a release plan.",
];

export function MorphogenesisLab() {
  const [mission, setMission] = useState(examples[0]);
  const [iteration, setIteration] = useState(0);
  const [status, setStatus] = useState("READY · NO RUNTIME CONNECTION");
  const run = () => {
    setIteration((current) => current + 1);
    setStatus("ILLUSTRATION UPDATED · NO MODEL OR TOKENS USED");
  };
  const reset = () => {
    setMission(examples[0]);
    setIteration(0);
    setStatus("READY · NO RUNTIME CONNECTION");
  };

  return (
    <section className="lab-section">
      <div className="section-wrap lab-wrap">
        <div className="lab-intro">
          <Eyebrow light>03 — MORPHOGENESIS LAB <span className="demo-badge">BROWSER SIMULATION</span></Eyebrow>
          <h2>What kind of team<br />does this mission <em>need?</em></h2>
          <p>Explore how a mission might be organized. This deterministic illustration runs in your browser; it is not a live GenOS execution and does not call a model.</p>
          <label className="mission-label" htmlFor="mission-input">YOUR MISSION</label>
          <div className="mission-control"><input id="mission-input" maxLength={120} value={mission} onChange={(event) => setMission(event.target.value)} /><button type="button" onClick={run}>Compose <span aria-hidden="true">↗</span></button></div>
          <div className="example-missions">{examples.map((example) => <button key={example} type="button" onClick={() => setMission(example)}>{example}</button>)}</div>
          <div className="demo-controls"><button className="reset-button" type="button" onClick={reset}>Reset demo <span aria-hidden="true">↺</span></button><span className="demo-status" role="status" aria-live="polite">{status}</span></div>
        </div>
        <div className={`lab-stage${iteration > 0 ? " has-run" : ""}`}>
          <div className="stage-top"><span>ILLUSTRATIVE MISSION GRAPH</span><span>LOCAL ONLY <i /></span></div>
          <div className="stage-canvas">
            <svg className="lab-connectors" viewBox="0 0 680 410" aria-hidden="true"><path d="M142 205 C210 205 202 83 284 83" /><path d="M142 205 H284" /><path d="M142 205 C210 205 202 327 284 327" /><path d="M408 83 C493 83 478 205 546 205" /><path d="M408 205 H546" /><path d="M408 327 C493 327 478 205 546 205" /></svg>
            <div className="lab-node node-mission"><span className="node-kind">INPUT</span><strong>Mission</strong><span className="node-mission-copy">{mission || "Your mission"}</span></div>
            <div className="lab-node node-worker worker-one"><span className="node-kind">CANDIDATE A</span><strong>Inspect</strong><span>scope + changes</span></div>
            <div className="lab-node node-worker worker-two"><span className="node-kind">CANDIDATE B</span><strong>Challenge</strong><span>risks + countercase</span></div>
            <div className="lab-node node-worker worker-three"><span className="node-kind">CANDIDATE C</span><strong>Verify</strong><span>tests + provenance</span></div>
            <div className="lab-node node-review"><span className="node-kind">GATE</span><strong>{iteration > 0 ? "Review" : "Evidence"}</strong><span>{iteration > 0 ? "compare · inspect" : "compare · hold"}</span></div>
            <span className="canvas-note">EXAMPLE GRAPH · SIMULATED</span>
          </div>
          <div className="stage-footer"><span><i className="legend-dot legend-a" /> independent candidate</span><span><i className="legend-dot legend-gate" /> evidence review</span><span>0 tokens used</span></div>
        </div>
      </div>
    </section>
  );
}
