import { notFound } from "next/navigation";
import { getConcept, conceptModelBySlug } from "@/components/concepts";
import { genosSourceCommit } from "@/components/reality-bar";
import { referencesForConcept } from "@/components/mechanism-literature";

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
    simulations: conceptModelBySlug[concept.slug] ? [`/en/lab/models?model=${conceptModelBySlug[concept.slug]}`] : [],
    benchmarks: concept.hasBenchmark ? ["/benchmarks"] : [],
    useCases: concept.useCases ?? [],
    failureModes: concept.failureModes ?? [],
    codeSources: (concept.codeSources ?? []).map((path) => ({ path, url: `https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/${path}` })),
    primaryReferences: referencesForConcept(concept.slug),
    related: concept.related ?? [],
    routes: { en: `/en/concepts/${concept.slug}`, fr: `/fr/concepts/${concept.slug}` },
    sourceCommit: genosSourceCommit,
  });
}
