import type { GraphEdge, GraphNode } from "@/components/morphogenesis-cases";

type Props = { title: string; nodes: GraphNode[]; edges: GraphEdge[]; compact?: boolean };

const width = 820;
const boxWidth = 118;
const boxHeight = 64;

export function MorphologyGraphVisual({ title, nodes, edges, compact = false }: Props) {
  const positions = new Map(nodes.map((node) => [node.id, node]));
  return (
    <div className={`morph-graph${compact ? " morph-graph-compact" : ""}`} role="img" aria-label={`Illustrative graph diagram: ${title}`}>
      <div className="morph-graph-top"><span>MISSION GRAPH</span><span>IR · EXAMPLE</span></div>
      <svg viewBox={`0 0 ${width} 470`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs><marker id="morph-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>
        <g className="morph-edges">{edges.map((edge, index) => {
          const from = positions.get(edge.from);
          const to = positions.get(edge.to);
          if (!from || !to) return null;
          const x1 = from.x + boxWidth / 2;
          const y1 = from.y + boxHeight / 2;
          const x2 = to.x - boxWidth / 2;
          const y2 = to.y + boxHeight / 2;
          const bend = Math.max(24, Math.abs(x2 - x1) * 0.38);
          const labelX = (x1 + x2) / 2;
          const labelY = (y1 + y2) / 2 - 7;
          return <g key={`${edge.from}-${edge.to}-${index}`}><path d={`M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`} markerEnd="url(#morph-arrow)" />{edge.label && <text x={labelX} y={labelY}>{edge.label}</text>}</g>;
        })}</g>
        <g className="morph-nodes">{nodes.map((node) => <g key={node.id} className={`morph-node morph-node-${node.kind}`} transform={`translate(${node.x - boxWidth / 2} ${node.y})`}>
          <rect width={boxWidth} height={boxHeight} rx="5" />
          <text className="morph-node-kind" x="10" y="16">{node.kind === "topology" ? "TOPOLOGY" : node.kind === "gate" ? "GATE" : node.kind === "operator" ? "OPERATOR" : node.kind === "input" ? "MISSION" : "OUTCOME"}</text>
          <text className="morph-node-label" x="10" y="38">{node.label}</text>
          {node.note && <text className="morph-node-note" x="10" y="53">{node.note}</text>}
        </g>)}</g>
      </svg>
      <div className="morph-graph-recipe"><span>COMPOSITION</span><code>{title}</code></div>
    </div>
  );
}
