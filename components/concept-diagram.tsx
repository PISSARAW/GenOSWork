import type { ConceptDiagram } from "@/components/concepts";

const diagrams: Record<ConceptDiagram, { labels: string[]; colors: string[]; detail: string[] }> = {
  clinical: { labels: ["SIGNAUX", "QUALIFIER", "CONTENIR", "RÉÉVALUER"], colors: ["#4b91aa", "#8378d5", "#dd8756", "#5b9a83"], detail: ["surveillance", "diagnostic", "mesure bornée", "état vérifié"] },
  memory: { labels: ["ÉPISODES", "INDEX", "RAPPEL", "MISSION"], colors: ["#dd8756", "#8378d5", "#4b91aa", "#5b9a83"], detail: ["actions · résultats", "lexical + vectoriel", "score + provenance", "contexte enrichi"] },
  cortex: { labels: ["DEMANDE", "MÉMOIRES", "CLASSEMENT", "AGENT"], colors: ["#dd8756", "#4b91aa", "#8378d5", "#5b9a83"], detail: ["contexte", "épisodique · sémantique", "rappel sélectionné", "réponse vérifiable"] },
  ontogenesis: { labels: ["PLANIFIER", "EXÉCUTER", "VÉRIFIER", "INTÉGRER"], colors: ["#8378d5", "#4b91aa", "#dd8756", "#5b9a83"], detail: ["tâche admissible", "mission bornée", "preuves requises", "retour au backlog"] },
  ontology: { labels: ["ENTITÉS", "RELATIONS", "HYPOTHÈSES", "ANALYSE"], colors: ["#4b91aa", "#5b9a83", "#dd8756", "#8378d5"], detail: ["identité · propriétés", "observations", "mondes possibles", "provenance · incertitude"] },
};

export function ConceptDiagramView({ kind, title, description }: { kind: ConceptDiagram; title: string; description: string }) {
  const diagram = diagrams[kind];
  return (
    <figure className="concept-diagram" aria-labelledby={`diagram-${kind}-title`}>
      <figcaption><span className="concept-diagram-kicker">SCHÉMA DE FONCTIONNEMENT</span><strong id={`diagram-${kind}-title`}>{title}</strong></figcaption>
      <svg viewBox="0 0 760 220" role="img" aria-labelledby={`diagram-${kind}-svg-title diagram-${kind}-svg-desc`}>
        <title id={`diagram-${kind}-svg-title`}>{title}</title>
        <desc id={`diagram-${kind}-svg-desc`}>{description}</desc>
        <defs><marker id={`arrow-${kind}`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L6 3.5 L0 7" fill="none" stroke="#b6b2c3" strokeWidth="1.2" /></marker></defs>
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
      <div className="concept-diagram-foot"><span>ENTRÉE</span><i /><span>TRAITEMENT</span><i /><span>RÉSULTAT AVEC CONTEXTE</span></div>
    </figure>
  );
}
