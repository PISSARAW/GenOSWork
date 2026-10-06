import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { RecordedRunExplorer } from "@/components/p3-explorers";

import { TruthBadge } from "@/components/truth-badge";
import { biocenosisFirstCampaign, biocenosisSqliteCampaign } from "@/components/recorded-campaigns";

export const metadata: Metadata = {
  title: "Recorded GenOS runs",
  description: "Inspect a published historical GenOS topology campaign, mission by mission, with source provenance and verification failures.",
  alternates: { canonical: "/en/runs", languages: { en: "/en/runs", fr: "/fr/runs" } },
};

export default function RunsPage() {
  return <div className="page-shell" lang="en">
    <section className="page-hero section-wrap p3-hero">
      <Eyebrow>RECORDED RUNS · EXECUTION EVIDENCE</Eyebrow>
      <div style={{ margin: "14px 0" }}><TruthBadge mode="RECORDED" /></div>
      <h1>Runs as they<br /><em>actually ended.</em></h1>
      <p>Inspect recorded GenOS campaigns and their limits. Accepted dispatch, completed cycle, verified decision and promotion are separate states; each artifact retains its own provenance.</p>
      <div className="p3-hero-links"><a href="/benchmarks">Explore benchmark results →</a><a href="/sandbox">Connect a live runtime →</a></div>
    </section>
    <RecordedRunExplorer />
    <section className="section-wrap section-space recorded-campaign-note"><Eyebrow>BIOCENOSIS · LIVE LOCAL CAMPAIGNS</Eyebrow><h2>Cycles completed.<br /><em>No verified promotion.</em></h2><p>The first 12 missions all blocked. A second 12-mission run used the full backend and SQLite WAL: {biocenosisSqliteCampaign.cycleStates.blocked} blocked, {biocenosisSqliteCampaign.cycleStates.completed} completed cycles, {biocenosisSqliteCampaign.fullySatisfiedMissions} missions satisfying every criterion and {biocenosisSqliteCampaign.verifiedPromotions} verified promotions. Completion describes the cycle, not the mission outcome.</p><p>SQLite retained {biocenosisSqliteCampaign.persistence.telemetryEvents} telemetry and {biocenosisSqliteCampaign.persistence.communityEvents} community events with no reported loss. Every member used the same Ollama model, so independent fault domains were not demonstrated.</p><div className="p3-hero-links"><a href={biocenosisFirstCampaign.reportUrl} target="_blank" rel="noreferrer">First run report ↗</a><a href={biocenosisSqliteCampaign.reportUrl} target="_blank" rel="noreferrer">SQLite run report ↗</a><a href={biocenosisSqliteCampaign.rawArtifact} target="_blank" rel="noreferrer">Raw JSON ↗</a></div></section>
  <section className="section-wrap section-space recorded-campaign-note"><Eyebrow>TRINITY · 6 OCTOBRE 2026</Eyebrow><h2>Trinity: verified results and their limits.</h2><p>71 verified artifacts from 24 missions on D:. Inspect the results, their independent verifiers and the files needed to replay them. No Trinity promotion is demonstrated. The report is in French.</p><a href="/recorded-runs/trinity-2026-10-06/index.html">Open the campaign →</a></section></div>;
}
