import type { EvidenceState, ImplementationState, IntegrationState } from "@/components/concept-catalog";

export const genosSourceCommit = "0c2de1f5b644f58cef0f8bc4a08afd76ce5b2f30";

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
  "benchmark-protocol": "Benchmark protocol",
  benchmarked: "Benchmarked",
  replicated: "Replicated",
  unassessed: "Unassessed",
};

export function stateLabel(state: ImplementationState | IntegrationState | EvidenceState) {
  return labels[state];
}

export function RealityBar({
  implementation,
  integration,
  evidence,
  note,
}: {
  implementation: ImplementationState;
  integration: IntegrationState;
  evidence: EvidenceState;
  note?: string;
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
          <span>LAST VERIFIED SOURCE</span>
          <a href={`https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}`} target="_blank" rel="noreferrer">GenOS {genosSourceCommit.slice(0, 7)} ↗</a>
        </div>
      </div>
      {note && <p>{note}</p>}
    </section>
  );
}
