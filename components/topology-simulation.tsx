"use client";

import { useState } from "react";
import type { TopologyGuide } from "@/components/topology-guides";
import { getVariantSimulationSteps } from "@/components/variant-simulation-flows";
import { TopologyDiagram } from "@/components/topology-visuals";
import { genosVariantSourceCommit, getTopologyVariantMaturity } from "@/components/topology-variant-maturity";

export function TopologySimulation({ family, guide }: { family: string; guide: TopologyGuide }) {
  const [activeId, setActiveId] = useState(guide.variants[0]?.id ?? "default");
  const [activeStep, setActiveStep] = useState(0);
  const active = guide.variants.find((item) => item.id === activeId) ?? guide.variants[0];
  if (!active) return null;
  const steps = getVariantSimulationSteps(family, active.id);
  const maturity = getTopologyVariantMaturity(family, active.id);

  return <div className="topology-learning section-wrap">
    <section className="learning-block">
      <div className="learning-copy"><span className="learning-kicker">01 / MODEL</span><h2>The principle<br/>and its equation</h2><p>{guide.explanation}</p></div>
      <div className="math-card"><span className="learning-kicker">SIMPLIFIED FORMALIZATION</span><p className="math-formula">{guide.formula}</p><p>{guide.formulaNote}</p></div>
    </section>
    <section className="variant-simulation" aria-labelledby="variant-title">
      <div className="variant-heading"><span className="learning-kicker">02 / VARIANTS AND USE CASES</span><h2 id="variant-title">Choose a policy</h2><p>Select a variant to explore steps based on its documented contract. This illustration does not run agents or call runtime services.</p></div>
      <div className="variant-layout">
        <nav className="variant-picker" aria-label="Topology variants">
          {guide.variants.map((item) => <button type="button" key={item.id} className={item.id === activeId ? "variant-option is-selected" : "variant-option"} aria-pressed={item.id === activeId} onClick={() => { setActiveId(item.id); setActiveStep(0); }}><span>{item.id.replaceAll("_", " ").replaceAll("-", " ")}</span><b>↗</b></button>)}
        </nav>
        <article className="variant-card">
          <div className="variant-card-top"><span className="learning-kicker">LOCAL SIMULATION · ILLUSTRATIVE</span><span className="variant-counter">{String(guide.variants.findIndex((item) => item.id === activeId) + 1).padStart(2, "0")} / {String(guide.variants.length).padStart(2, "0")}</span></div>
          <h3>{active.id.replaceAll("_", " ").replaceAll("-", " ")} <span className={`maturity-tag${maturity === "partial" ? " maturity-partial" : maturity === "unassessed" ? " maturity-unassessed" : ""}`}>{maturity === "implemented" ? "POLICY IMPLEMENTED" : maturity === "partial" ? "PARTIAL POLICY" : "STATUS UNASSESSED"}</span></h3>
          <p className="variant-usecase">{active.useCase}</p>
          <div className="simulation-canvas"><TopologyDiagram family={family} variant={active.id} activeStep={activeStep} stepCount={steps.length}/><span className="simulation-caption">TOPOLOGY MAP · ILLUSTRATION ONLY · NO AGENT EXECUTED</span></div>
          <div className="simulation-controls"><button type="button" onClick={() => setActiveStep((current) => (current + 1) % steps.length)}>Next step <span aria-hidden="true">→</span></button><button type="button" onClick={() => setActiveStep(0)}>Restart <span aria-hidden="true">↺</span></button><span role="status" aria-live="polite">{activeStep + 1}/{steps.length} · {steps[activeStep]}</span></div>
          <p className="simulation-explainer">The drawing changes with the topology and variant to show their documented structure and policy. It is an explanatory model; maturity labels and runtime limits still apply.</p>
        </article>
      </div>
    </section>
    <p className="catalog-note">This status follows the maturity of the variant policy in GenOS’ <a href={`https://github.com/PISSARAW/GenOS/blob/${genosVariantSourceCommit}/backend/src/services/morphogenesis/registry/variantCatalog.js`} target="_blank" rel="noreferrer">canonical catalog</a>. “Policy implemented” does not certify end-to-end execution: topology maturity, required adapters, permissions, and evidence remain separate runtime conditions. This illustration does not run agents; its selector is manual. In the runtime, mission signals may select a preset automatically when its preconditions are met.</p>
  </div>;
}
