import { genosSource, genosSourceCommit } from "@/components/product-evidence";
import { biocenosisSqliteCampaign } from "@/components/recorded-campaigns";
import { evaluations, experiments, plannedProtocols } from "@/components/experiment-registry";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.1.0",
    sourceCommit: genosSourceCommit,
    evaluations: [...evaluations, ...experiments].map((record) => ({ ...record, reportUrl: genosSource(record.href), route: "/benchmarks" })),
    recordedQualificationCampaigns: [biocenosisSqliteCampaign],
    protocolsWithoutCampaign: plannedProtocols.map(([name, detail, href]) => ({ name, detail, sourceUrl: genosSource(href) })),
    principle: "A score without environment, version, protocol, population, and limits is not comparable.",
  });
}
