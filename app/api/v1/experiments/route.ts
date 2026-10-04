import benchmark from "@/public/benchmarks/planning-gap/2026-09-30-a-star-240.json";
import campaign from "@/public/recorded-runs/topology-campaign.json";
import { biocenosisFirstCampaign, biocenosisSqliteCampaign } from "@/components/recorded-campaigns";
import { evaluations, experiments, plannedProtocols } from "@/components/experiment-registry";
import { genosSource, genosSourceCommit } from "@/components/product-evidence";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.1.0",
    sourceCommit: genosSourceCommit,
    principle: "These artifacts report bounded experiments. They do not establish general performance, and campaign failures remain part of the result.",
    evaluations: [
      {
        id: "planning-gap-2026-09-30",
        kind: "benchmark",
        measuredAt: benchmark.measuredAt,
        command: benchmark.command,
        budget: benchmark.budget,
        tasks: benchmark.tasks,
        rawArtifact: "/benchmarks/planning-gap/2026-09-30-a-star-240.json",
        summary: benchmark.summary,
        corrections: benchmark.corrections,
      },
      {
        id: campaign.provenance.runId,
        kind: "recorded-campaign",
        provenance: campaign.provenance,
        summary: campaign.summary,
        missions: campaign.missions,
        rawArtifact: "/recorded-runs/topology-campaign.json",
      },
      biocenosisFirstCampaign,
      biocenosisSqliteCampaign,
    ],
    publishedRecords: [...evaluations, ...experiments].map((record) => ({ ...record, reportUrl: genosSource(record.href) })),
    protocolsWithoutCampaign: plannedProtocols.map(([name, detail, href]) => ({ name, detail, sourceUrl: genosSource(href) })),
  });
}
