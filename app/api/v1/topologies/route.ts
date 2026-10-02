import { topologies } from "@/components/topologies";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.0.0",
    count: topologies.length,
    topologies: topologies.map((t) => ({
      id: t.slug,
      name: t.name,
      routes: { en: `/en/topologies/${t.slug}`, fr: `/fr/topologies/${t.slug}` },
      simulation: `/en/lab/models?model=${t.slug}`,
    })),
  });
}
