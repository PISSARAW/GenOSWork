"use client";

import { useState } from "react";
import type { TopologyGuide } from "@/components/topology-guides";
import { getVariantSimulationSteps } from "@/components/variant-simulation-flows";

function wrapStep(label: string, width = 24) {
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > width && current) {
      lines.push(current);
      current = word;
    } else current = next;
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function SimulationGraphic({ family, variant, steps, activeStep }: { family: string; variant: string; steps: string[]; activeStep: number }) {
  const gap = 22;
  const nodeWidth = 166;
  const stepWidth = nodeWidth + gap;
  const width = steps.length * stepWidth - gap + 32;
  return <svg className="topology-sim-svg" viewBox={`0 0 ${width} 175`} role="img" aria-label={`Illustrated workflow for ${family}, variant ${variant}, step ${activeStep + 1} of ${steps.length}`}>
    {steps.map((step, index) => {
      const x = 16 + index * stepWidth;
      const isComplete = index < activeStep;
      const isCurrent = index === activeStep;
      const lines = wrapStep(step);
      return <g key={`${variant}-${index}`} className={isCurrent ? "simulation-step-current" : isComplete ? "simulation-step-complete" : "simulation-step-pending"}>
        {index < steps.length - 1 && <line className="simulation-step-connector" x1={x + nodeWidth} y1="93" x2={x + stepWidth} y2="93"/>}
        <text className="simulation-step-index" x={x + 5} y="44">{String(index + 1).padStart(2, "0")}{isComplete ? " · DONE" : isCurrent ? " · IN PROGRESS" : " · UPCOMING"}</text>
        <rect className="simulation-step-box" x={x} y="57" width={nodeWidth} height="76" rx="4"/>
        <circle className="simulation-step-dot" cx={x + 14} cy="72" r="4"/>
        <text className="simulation-step-label" x={x + 12} y={lines.length === 1 ? "99" : lines.length === 2 ? "92" : "86"}>
          {lines.map((line, lineIndex) => <tspan key={lineIndex} x={x + 12} dy={lineIndex ? 14 : 0}>{line}</tspan>)}
        </text>
      </g>;
    })}
  </svg>;
}

const partialVariants: Record<string, Set<string>> = {
  "a-team": new Set(["matrix_team", "incident_command", "adaptive"]),
  biocenose: new Set(["argumentation_community", "polycentric_council", "byzantine_resilient_community", "representative_community", "persistent_community"]),
  holobionte: new Set(["organelle", "adaptive-microbiome", "immune-critical", "local-first", "regenerative", "cloud-core/edge-symbionts", "edge-core/cloud-symbionts", "memory-rich", "competitive-partner", "procedural", "tool", "cloud-core/edge-sync"]),
  metapopulation: new Set(["balanced", "resilient", "exploratory", "conservative", "classic_patch", "island_search", "heterogeneous_islands", "source_sink", "rescue_network", "stepping_stone", "anti_synchrony", "federated", "ephemeral_patch", "persistent", "evolutionary", "cultural"]),
  biome: new Set(["resource", "exploration", "quality_diversity", "successional", "resilience", "persistent", "open_ended", "adversarial", "knowledge", "compute", "multi_scale"]),
};

export function TopologySimulation({ family, guide }: { family: string; guide: TopologyGuide }) {
  const [activeId, setActiveId] = useState(guide.variants[0]?.id ?? "default");
  const [activeStep, setActiveStep] = useState(0);
  const active = guide.variants.find((item) => item.id === activeId) ?? guide.variants[0];
  if (!active) return null;
  const steps = getVariantSimulationSteps(family, active.id);

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
          <h3>{active.id.replaceAll("_", " ").replaceAll("-", " ")} <span className={partialVariants[family]?.has(active.id) ? "maturity-tag maturity-partial" : "maturity-tag"}>{partialVariants[family]?.has(active.id) ? "PARTIAL" : "CATALOGED"}</span></h3>
          <p className="variant-usecase">{active.useCase}</p>
          <div className="simulation-canvas"><TopologyGraphic family={family} variant={active.id} steps={steps} activeStep={activeStep}/><span className="simulation-caption">CONTRACT ILLUSTRATION · NO AGENT EXECUTED</span></div>
          <div className="simulation-controls"><button type="button" onClick={() => setActiveStep((current) => (current + 1) % steps.length)}>Next step <span aria-hidden="true">→</span></button><button type="button" onClick={() => setActiveStep(0)}>Restart <span aria-hidden="true">↺</span></button><span role="status" aria-live="polite">{activeStep + 1}/{steps.length} · {steps[activeStep]}</span></div>
          <p className="simulation-explainer">The workflow highlights operations or checks described by this variant's policy. Available services may require an explicit call, adapter, or verifier; limits are listed in the canonical documentation.</p>
        </article>
      </div>
    </section>
    <p className="catalog-note">Maturity: partial variants remain marked as such in the central catalog. Their presence does not mean they are selected automatically or that every contract capability is activated.</p>
  </div>;
}

function TopologyGraphic({ family, variant, steps, activeStep }: { family: string; variant: string; steps: string[]; activeStep: number }) {
  return <SimulationGraphic family={family} variant={variant} steps={steps} activeStep={activeStep}/>;
}
