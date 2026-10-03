import type { ConceptDiagram } from "@/components/concepts";

const diagrams: Record<ConceptDiagram, { labels: string[]; colors: string[]; detail: string[] }> = {
  clinical: { labels: ["SIGNALS", "CLASSIFY", "CONTAIN", "REASSESS"], colors: ["var(--rust)", "var(--rust)", "#dd8756", "#5b9a83"], detail: ["monitoring", "diagnosis", "bounded measure", "verified state"] },
  memory: { labels: ["EPISODES", "INDEX", "RETRIEVE", "MISSION"], colors: ["#dd8756", "var(--rust)", "var(--rust)", "#5b9a83"], detail: ["actions · outcomes", "lexical + vector", "score + provenance", "enriched context"] },
  cortex: { labels: ["REQUEST", "MEMORIES", "RANKING", "AGENT"], colors: ["#dd8756", "var(--rust)", "var(--rust)", "#5b9a83"], detail: ["context", "episodic · semantic", "selected recall", "verifiable response"] },
  ontogenesis: { labels: ["PLAN", "EXECUTE", "VERIFY", "INTEGRATE"], colors: ["var(--rust)", "var(--rust)", "#dd8756", "#5b9a83"], detail: ["eligible task", "bounded mission", "required evidence", "return to backlog"] },
  ontology: { labels: ["ENTITIES", "RELATIONS", "HYPOTHESES", "ANALYSIS"], colors: ["var(--rust)", "#5b9a83", "#dd8756", "var(--rust)"], detail: ["identity · properties", "observations", "possible worlds", "provenance · uncertainty"] },
};

export function ConceptDiagramView({ kind, title, description }: { kind: ConceptDiagram; title: string; description: string }) {
  const diagram = diagrams[kind];
  return (
    <figure className="concept-diagram" aria-labelledby={`diagram-${kind}-title`}>
      <figcaption><span className="concept-diagram-kicker">HOW IT WORKS</span><strong id={`diagram-${kind}-title`}>{title}</strong></figcaption>
      <svg viewBox="0 0 760 220" role="img" aria-labelledby={`diagram-${kind}-svg-title diagram-${kind}-svg-desc`}>
        <title id={`diagram-${kind}-svg-title`}>{title}</title>
        <desc id={`diagram-${kind}-svg-desc`}>{description}</desc>
        <defs><marker id={`arrow-${kind}`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L6 3.5 L0 7" fill="none" stroke="var(--rust)" strokeWidth="1.2" /></marker></defs>
        <path className="concept-flow-line" d="M106 78 H654" />
        {diagram.labels.map((label, index) => {
          const x = 96 + index * 188;
          const color = diagram.colors[index];
          return (
            <g key={label}>
              {index < 3 && <path d={`M${x + 35} 78 H${x + 153}`} className="concept-flow-arrow" markerEnd={`url(#arrow-${kind})`} />}
              <circle cx={x} cy="78" r="29" fill="#f7f6f2" stroke={color} strokeWidth="2" />
              <circle cx={x} cy="78" r="5" fill={color} />
              <text x={x} y="137" textAnchor="middle" className="concept-svg-label">{label}</text>
              <text x={x} y="158" textAnchor="middle" className="concept-svg-detail">{diagram.detail[index]}</text>
            </g>
          );
        })}
        {kind === "memory" && <path className="concept-feedback" d="M660 176 C660 207 96 207 96 176" markerEnd={`url(#arrow-${kind})`} />}
        {kind === "cortex" && <path className="concept-feedback" d="M660 176 C660 207 96 207 96 176" markerEnd={`url(#arrow-${kind})`} />}
        {kind === "ontogenesis" && <path className="concept-feedback" d="M660 176 C660 207 96 207 96 176" markerEnd={`url(#arrow-${kind})`} />}
      </svg>
      <div className="concept-diagram-foot"><span>INPUT</span><i /><span>PROCESSING</span><i /><span>RESULT WITH CONTEXT</span></div>
    </figure>
  );
}
