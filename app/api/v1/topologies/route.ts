import { topologies } from "@/components/topologies";
import { genosSourceCommit, topologyClaim } from "@/components/product-evidence";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.1.0",
    sourceCommit: genosSourceCommit,
    count: topologies.length,
    topologies: topologies.map((t) => ({
      id: t.slug,
      name: t.name,
      productStatus: t.implementation,
      runtimeIntegration: t.integration,
      evidence: t.evidence,
      workingSlice: topologyClaim(t.slug)?.implementedSlice ?? t.runtime,
      missingWork: topologyClaim(t.slug)?.missingWork ?? t.limit,
      routes: { en: `/en/topologies/${t.slug}`, fr: `/fr/topologies/${t.slug}` },
      simulation: `/en/lab/models?model=${t.slug}`,
    })),
  });
}
