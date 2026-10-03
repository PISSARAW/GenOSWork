import { topologies } from "@/components/topologies";
import { concepts } from "@/components/concepts";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.0.0",
    runtime: { snapshots: "IMPLEMENTED", topologies: "WIRED", rhizomeRouting: "CALLABLE · BOUNDED" },
    topologyIds: topologies.map((t) => t.slug),
    conceptCoverage: {
      total: concepts.length,
      withMath: concepts.filter((c) => c.hasMathematics).length,
      withSimulation: concepts.filter((c) => c.hasSimulation).length,
      withBenchmark: concepts.filter((c) => c.hasBenchmark).length,
    },
  });
}
