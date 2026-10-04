import { topologies } from "@/components/topologies";
import { concepts } from "@/components/concepts";
import { genosSourceCommit, productClaims } from "@/components/product-evidence";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.1.0",
    sourceCommit: genosSourceCommit,
    runtime: productClaims.map(({ id, status, label, evidenceLevel }) => ({ id, status, label, evidenceLevel })),
    topologyIds: topologies.map((t) => t.slug),
    conceptCoverage: {
      total: concepts.length,
      withMath: concepts.filter((c) => c.hasMathematics).length,
      taggedWithSimulation: concepts.filter((c) => c.hasSimulation).length,
      taggedWithBenchmark: concepts.filter((c) => c.hasBenchmark).length,
      qualification: "Flags indicate related material, not concept-specific verified artifacts or full implementation.",
    },
  });
}
