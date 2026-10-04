import { concepts } from "@/components/concepts";
import { conceptFamilies } from "@/components/concept-catalog";
import { genosSourceCommit } from "@/components/reality-bar";
import { frenchConceptTitles } from "@/components/concept-french-titles";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.0.0",
    count: concepts.length,
    families: conceptFamilies,
    concepts: concepts.map((c) => ({
      id: c.slug,
      title: c.title,
      titleFr: frenchConceptTitles[c.slug],
      definition: c.intro,
      definitionFr: c.scienceBasisFr ?? null,
      family: c.familyId ?? c.eyebrow,
      implementation: c.implementation ?? "unassessed",
      integration: c.integration ?? "unassessed",
      evidence: c.evidence ?? "unassessed",
      biologyInspired: c.biologyInspired ?? false,
      hasMathematics: c.hasMathematics ?? false,
      hasSimulation: c.hasSimulation ?? false,
      hasInteractiveModel: c.hasInteractiveModel ?? false,
      hasBenchmark: c.hasBenchmark ?? false,
      science: c.scienceBasis ?? null,
      scienceFr: c.scienceBasisFr ?? null,
      mathematicalModel: c.mathModel ?? null,
      mathematicalModelFr: c.mathModelFr ?? null,
      biologicalInspiration: c.biologyBasisEn ?? null,
      biologicalInspirationFr: c.biologyBasisFr ?? null,
      literatureMechanisms: c.literatureMechanisms ?? [],
      useCases: c.useCases ?? [],
      failureModes: c.failureModes ?? [],
      codeSources: (c.codeSources ?? []).map((path) => ({ path, url: `https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/${path}` })),
      related: c.related ?? [],
      source: c.source,
      routes: { en: `/en/concepts/${c.slug}`, fr: `/fr/concepts/${c.slug}` },
    })),
    sourceCommit: genosSourceCommit,
  });
}
