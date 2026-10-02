import benchmark from "@/public/benchmarks/planning-gap/2026-09-30-a-star-240.json";
import campaign from "@/public/recorded-runs/topology-campaign.json";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.0.0",
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
    ],
    protocolsWithoutCampaign: ["a-team", "holobiont-longitudinal", "syncytium", "eab"],
  });
}
