import type { TruthMode } from "@/components/site-config";
import { truthModes } from "@/components/site-config";

export function TruthBadge({ mode, compact = false }: { mode: TruthMode; compact?: boolean }) {
  const info = truthModes[mode];
  return (
    <span
      className={`truth-badge truth-${mode.toLowerCase()}`}
      title={info.description}
      aria-label={`${info.label}: ${info.description}`}
    >
      <i aria-hidden="true" />
      {info.label}
      {!compact && <em>{info.description}</em>}
    </span>
  );
}
