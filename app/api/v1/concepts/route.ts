import { concepts } from "@/components/concepts";
import { conceptFamilies } from "@/components/concept-catalog";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.0.0",
    count: concepts.length,
    families: conceptFamilies,
    concepts: concepts.map((c) => ({
      id: c.slug,
      title: c.title,
      definition: c.intro,
      family: c.familyId ?? c.eyebrow,
      implementation: c.implementation ?? "unassessed",
      integration: c.integration ?? "unassessed",
      evidence: c.evidence ?? "unassessed",
      biologyInspired: c.biologyInspired ?? false,
      hasMathematics: c.hasMathematics ?? false,
      hasSimulation: c.hasSimulation ?? false,
      hasBenchmark: c.hasBenchmark ?? false,
      related: c.related ?? [],
      source: c.source,
      routes: { en: `/concepts/${c.slug}`, fr: `/fr/concepts/${c.slug}` },
    })),
  });
}
