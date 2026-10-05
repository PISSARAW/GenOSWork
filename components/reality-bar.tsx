import type { EvidenceState, ImplementationState, IntegrationState } from "@/components/concept-catalog";
import { genosSourceCommit } from "@/components/product-evidence";

export { genosSourceCommit };

const labels: Record<ImplementationState | IntegrationState | EvidenceState, string> = {
  conceptual: "Conceptual",
  proposed: "Proposed",
  partial: "Partial",
  experimental: "Experimental",
  implemented: "Implemented",
  isolated: "Isolated",
  callable: "Callable",
  wired: "Wired",
  "end-to-end": "End to end",
  none: "None linked",
  "unit-tested": "Unit tested",
  "integration-tested": "Integration tested",
  "end-to-end-tested": "End-to-end tested",
  "reported-run": "Reported run",
  "test-failing": "Test failing",
  "benchmark-protocol": "Benchmark protocol",
  benchmarked: "Benchmarked",
  replicated: "Replicated",
  unassessed: "Unassessed",
};

export function stateLabel(state: ImplementationState | IntegrationState | EvidenceState) {
  return labels[state];
}

export type DocItem = { key: string; label: string; state: "full" | "partial" | "missing" | "na" };

export function DocCompleteness({ items }: { items: DocItem[] }) {
  return (
    <div className="doc-completeness" aria-label="Documentation completeness">
      <span className="doc-completeness-title">DOCUMENTATION</span>
      <ul>
        {items.map((item) => (
          <li key={item.key} className={`doc-${item.state}`}>
            <i aria-hidden="true">
              {item.state === "full" ? "✓" : item.state === "partial" ? "△" : item.state === "na" ? "–" : "○"}
            </i>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RealityBar({
  implementation,
  integration,
  evidence,
  note,
  doc,
}: {
  implementation: ImplementationState;
  integration: IntegrationState;
  evidence: EvidenceState;
  note?: string;
  doc?: DocItem[];
}) {
  const axes = [
    ["IMPLEMENTATION", implementation],
    ["RUNTIME INTEGRATION", integration],
    ["EVIDENCE", evidence],
  ] as const;

  return (
    <section className="reality-bar" aria-label="Implementation status">
      <div className="reality-axis-list">
        {axes.map(([name, state]) => (
          <div className={`reality-axis reality-${state}`} key={name}>
            <span>{name}</span>
            <strong>{stateLabel(state)}</strong>
          </div>
        ))}
        <div className="reality-source">
          <span>LAST REVIEWED SOURCE</span>
          <a href={`https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}`} target="_blank" rel="noreferrer">GenOS {genosSourceCommit.slice(0, 7)} ↗</a>
        </div>
      </div>
      {note && <p>{note}</p>}
      {doc && <p>Documentation markers describe linked material, not verified GenOS behavior. Simulation and benchmark flags remain partial until a concept-specific artifact is linked.</p>}
      {doc && <DocCompleteness items={doc} />}
    </section>
  );
}
