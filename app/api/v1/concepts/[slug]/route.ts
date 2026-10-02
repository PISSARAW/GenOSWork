import { notFound } from "next/navigation";
import { getConcept } from "@/components/concepts";

export const dynamic = "force-static";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();
  return Response.json({
    id: concept.slug,
    title: concept.title,
    definition: concept.intro,
    family: concept.familyId ?? concept.eyebrow,
    implementation: concept.implementation ?? "unassessed",
    integration: concept.integration ?? "unassessed",
    evidence: concept.evidence ?? "unassessed",
    science: concept.scienceBasis ?? null,
    mathematicalModel: concept.mathModel ?? null,
    simulations: concept.hasSimulation ? [`/lab/models?model=${concept.slug}`] : [],
    benchmarks: concept.hasBenchmark ? ["/benchmarks"] : [],
    related: concept.related ?? [],
    routes: { en: `/concepts/${concept.slug}`, fr: `/fr/concepts/${concept.slug}` },
    sourceCommit: "0c2de1f5b644f58cef0f8bc4a08afd76ce5b2f30",
  });
}
