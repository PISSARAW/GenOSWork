import { genosSource, genosSourceCommit } from "@/components/product-evidence";

export const biocenosisSqliteCampaign = {
  id: "biocenose-sqlite-live-2026-10-04",
  kind: "recorded-campaign",
  sourceCommit: genosSourceCommit,
  measuredAt: "2026-10-04",
  topology: "biocenose",
  environment: "Full local backend · SQLite WAL · Ollama qwen2.5-coder:7b shared by all members",
  missionCount: 12,
  cycleStates: { blocked: 9, completed: 3 },
  fullySatisfiedMissions: 0,
  verifiedPromotions: 0,
  persistence: { telemetryEvents: 766, communityEvents: 549, reportedLoss: 0 },
  limitations: [
    "A completed cycle can still end in escalation or require additional evidence.",
    "No mission met every criterion in its complex prompt.",
    "Independent provider fault domains were not measured: every member used the same local model.",
    "The Human–AI variant had no human decision and the Hybrid Oracle variant had no injected deterministic receipt.",
  ],
  reportUrl: genosSource("docs/06-qualite-preuves/missions-live-biocenose-sqlite-2026-10-04.md"),
  rawArtifact: genosSource("docs/06-qualite-preuves/biocenose-sqlite-live-results-2026-10-04.json"),
} as const;

export const biocenosisFirstCampaign = {
  id: "biocenose-live-2026-10-04",
  kind: "recorded-campaign",
  sourceCommit: genosSourceCommit,
  measuredAt: "2026-10-04",
  topology: "biocenose",
  missionCount: 12,
  cycleStates: { blocked: 12, completed: 0 },
  fullySatisfiedMissions: 0,
  verifiedPromotions: 0,
  reportUrl: genosSource("docs/06-qualite-preuves/missions-live-biocenose-2026-10-04.md"),
} as const;
