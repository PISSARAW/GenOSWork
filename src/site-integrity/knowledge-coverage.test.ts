import { describe, expect, it } from "vitest";
import { concepts } from "@/components/concepts";
import { teachingFlows } from "@/components/concept-learning-data";
import { frenchConceptTitles } from "@/components/concept-french-titles";
import { mechanismLabelsFr, referencesForConcept } from "@/components/mechanism-literature";
import { catalogConcepts, conceptFamilies } from "@/components/concept-catalog";
import { topologies } from "@/components/topologies";
import { primaryNav, frenchStatus, truthModes } from "@/components/site-config";
import { researchSections } from "@/components/research-program";
import { genosSourceCommit, productClaims, topologyClaim } from "@/components/product-evidence";
import { biocenosisSqliteCampaign } from "@/components/recorded-campaigns";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { canonicalConceptAdditions, canonicalConceptAliases } from "@/components/canonical-concept-additions";
import { workerFamilies, workerTypes } from "@/components/worker-catalog";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : /\.(ts|tsx)$/.test(entry.name) ? [path] : [];
  });
}

describe("GenOS knowledge coverage (public contract)", () => {
  it("registers every catalog concept with route, definition, family, relations, statuses, source", () => {
    expect(concepts.length).toBeGreaterThan(0);
    expect(catalogConcepts.length).toBeGreaterThan(0);
    for (const c of concepts) {
      expect(c.slug, "slug").toBeTruthy();
      expect(c.title, `title ${c.slug}`).toBeTruthy();
      expect(c.intro, `definition ${c.slug}`).toBeTruthy();
      expect(c.familyId ?? c.eyebrow, `family ${c.slug}`).toBeTruthy();
      expect(Array.isArray(c.related ?? []), `relations ${c.slug}`).toBe(true);
      expect(c.implementation, `implementation ${c.slug}`).toBeTruthy();
      expect(c.integration, `integration ${c.slug}`).toBeTruthy();
      expect(c.evidence, `evidence ${c.slug}`).toBeTruthy();
      expect(c.source, `source ${c.slug}`).toBeTruthy();
      // Use cases or process: steps, scope, or useCases must exist
      expect(
        c.steps.length > 0 || (c.useCases?.length ?? 0) > 0 || c.scope.length > 0,
        `use/scope ${c.slug}`,
      ).toBe(true);
    }
  });

  it("keeps slugs unique and families valid", () => {
    const slugs = concepts.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const familyIds = new Set(conceptFamilies.map((f) => f.id));
    for (const c of concepts) {
      if (c.familyId) expect(familyIds.has(c.familyId)).toBe(true);
    }
  });

  it("keeps Atlas status triplets aligned with exact product claims and topology records", () => {
    const evidenceByLevel = {
      unit: "unit-tested",
      integration: "integration-tested",
      "end-to-end": "end-to-end-tested",
      benchmark: "benchmark-protocol",
      "reported-run": "reported-run",
    } as const;

    for (const claim of productClaims) {
      const concept = concepts.find((item) => item.slug === claim.id);
      if (!concept) continue;
      const expectedIntegration = claim.evidenceLevel === "end-to-end"
        ? "end-to-end"
        : claim.evidenceLevel === "integration" || claim.evidenceLevel === "reported-run"
          ? "wired"
          : "callable";
      expect(
        { implementation: concept.implementation, integration: concept.integration, evidence: concept.evidence },
        claim.id,
      ).toEqual({
        implementation: claim.status === "planned" ? "proposed" : claim.status,
        integration: expectedIntegration,
        evidence: evidenceByLevel[claim.evidenceLevel],
      });
    }

    for (const topology of topologies) {
      const concept = concepts.find((item) => item.slug === topology.slug);
      expect(concept, topology.slug).toBeDefined();
      expect(
        { implementation: concept?.implementation, integration: concept?.integration, evidence: concept?.evidence },
        topology.slug,
      ).toEqual({ implementation: topology.implementation, integration: topology.integration, evidence: topology.evidence });
    }

    for (const concept of concepts) {
      if (concept.implementation !== "implemented") {
        expect(concept.status, concept.slug).not.toMatch(/^implemented\b/i);
      }
    }
  });

  it("registers ETT as a bounded, bilingual Atlas concept", () => {
    const ett = concepts.find((concept) => concept.slug === "endogenous-thought-test");
    expect(ett).toBeDefined();
    expect(ett?.source).toBe("01-concepts/endogenous-thought-test.md");
    expect(ett?.implementation).toBe("partial");
    expect(ett?.integration).toBe("wired");
    expect(ett?.hasBenchmark).toBe(true);
    expect(ett?.related).toEqual(expect.arrayContaining(["agow", "ontogenese", "evidence"]));
    expect(frenchConceptTitles[ett!.slug]).toBe("Test de pensée endogène");
    expect(ett?.scope).toContain("phenomenal consciousness");
  });

  it("covers every new canonical GenOS concept without duplicating established Atlas pages", () => {
    expect(canonicalConceptAdditions).toHaveLength(39);
    expect(Object.keys(canonicalConceptAliases)).toHaveLength(45);
    expect(concepts).toHaveLength(156);
    const slugs = new Set(concepts.map((concept) => concept.slug));
    for (const [canonicalId, slug] of Object.entries(canonicalConceptAliases)) {
      expect(slugs.has(slug), `${canonicalId} -> ${slug}`).toBe(true);
    }
    for (const slug of ["endogenous-thought-test", "agent-ecosystem", "genomic-stability"]) {
      expect(slugs.has(slug), slug).toBe(true);
    }
  });

  it("publishes the 20 canonical WorkerKind contracts across five families", () => {
    expect(workerFamilies.map((family) => family.workers.length)).toEqual([2, 5, 6, 4, 3]);
    expect(workerTypes.map((worker) => worker.id)).toEqual([
      "scout_cell", "resident_daemon",
      "bounded_worker", "adaptive_worker", "specialist", "procedural_executor", "symbiotic_worker",
      "verifier_worker", "red_worker", "experimental_worker", "formal_worker", "math_worker", "synthesis_worker",
      "creative_worker", "medical_worker", "recovery_worker", "forensic_worker",
      "liaison_worker", "teaching_worker", "sub_orchestrator",
    ]);
    expect(new Set(workerTypes.map((worker) => worker.id)).size).toBe(20);
    for (const worker of workerTypes) {
      expect(worker.capabilities.length, `${worker.id} capabilities`).toBeGreaterThan(0);
      expect(worker.authorityPhenotype, `${worker.id} authority`).toBeTruthy();
      expect(worker.artifact, `${worker.id} artifact`).toBeTruthy();
      expect(worker.detail, `${worker.id} limit`).toBeTruthy();
    }
    expect(workerTypes.find((worker) => worker.id === "procedural_executor")?.detail).toContain("0 model tokens");
    expect(workerTypes.find((worker) => worker.id === "formal_worker")?.detail).toContain("0 model tokens");
    expect(workerTypes.find((worker) => worker.id === "sub_orchestrator")?.detail).toContain("depth 1");
  });

  it("reports documentation depth without hiding gaps", () => {
    const withMath = concepts.filter((c) => c.mathModel ?? c.hasMathematics).length;
    const withSim = concepts.filter((c) => c.hasSimulation).length;
    const withBench = concepts.filter((c) => c.hasBenchmark).length;
    // Floors: these must not regress below current honest baseline
    expect(concepts.length).toBeGreaterThanOrEqual(90);
    expect(withMath).toBeGreaterThan(0);
    expect(withSim).toBeGreaterThan(0);
    // Publish coverage for CI logs
    console.log(
      `COVERAGE concepts=${concepts.length} math=${withMath} simulation=${withSim} benchmark=${withBench}`,
    );
  });

  it("gives every concept a bilingual mechanism, formal model, primary source and interactive route", () => {
    expect(concepts.length).toBeGreaterThanOrEqual(115);
    expect(Object.keys(teachingFlows).sort()).toEqual(concepts.map((concept) => concept.slug).sort());
    expect(Object.keys(frenchConceptTitles).sort()).toEqual(concepts.map((concept) => concept.slug).sort());
    for (const concept of concepts) {
      expect(concept.scienceBasis?.length, `science ${concept.slug}`).toBeGreaterThan(45);
      expect(concept.mathModel?.length, `math ${concept.slug}`).toBeGreaterThan(30);
      expect(concept.scienceBasisFr?.length, `science FR ${concept.slug}`).toBeGreaterThan(35);
      expect(concept.mathModelFr?.length, `math FR ${concept.slug}`).toBeGreaterThan(25);
      expect(frenchConceptTitles[concept.slug].length, `title FR ${concept.slug}`).toBeGreaterThan(2);
      expect(concept.hasInteractiveModel, `interactive ${concept.slug}`).toBe(true);
      expect(teachingFlows[concept.slug].en).toHaveLength(3);
      expect(teachingFlows[concept.slug].fr).toHaveLength(3);
      expect(new Set(teachingFlows[concept.slug].en).size, `distinct EN steps ${concept.slug}`).toBe(3);
      expect(new Set(teachingFlows[concept.slug].fr).size, `distinct FR steps ${concept.slug}`).toBe(3);
      const references = referencesForConcept(concept.slug, concept.familyId);
      expect(references.length, `primary reference ${concept.slug}`).toBeGreaterThan(0);
      for (const reference of references) {
        expect(reference.url).toMatch(/^https:\/\//);
        expect(mechanismLabelsFr[reference.mechanismId], `mechanism FR ${reference.mechanismId}`).toBeTruthy();
      }
      if (concept.biologyInspired) {
        expect(concept.biologyBasisEn?.length, `biology ${concept.slug}`).toBeGreaterThan(45);
        expect(concept.biologyBasisFr?.length, `biology FR ${concept.slug}`).toBeGreaterThan(35);
      }
    }
  });

  it("exposes every topology and keeps the eight canonical modes", () => {
    expect(topologies.length).toBe(8);
    const slugs = topologies.map((t) => t.slug).sort();
    expect(slugs).toEqual(
      ["a-team", "biocenose", "biome", "holobionte", "metapopulation", "rhizome", "syncytium", "trinity"].sort(),
    );
  });

  it("publishes product status, scope and proof for every topology", () => {
    expect(new Set(productClaims.map((claim) => claim.id)).size).toBe(productClaims.length);
    for (const topology of topologies) {
      const claim = topologyClaim(topology.slug);
      expect(claim, topology.slug).toBeDefined();
      expect(claim?.status, topology.slug).toBe(topology.implementation);
      expect(claim?.implementedSlice, topology.slug).toBeTruthy();
      expect(claim?.missingWork, topology.slug).toBeTruthy();
      expect(claim?.sourcePath, topology.slug).toMatch(/^docs\//);
    }
    expect(biocenosisSqliteCampaign.cycleStates.blocked + biocenosisSqliteCampaign.cycleStates.completed).toBe(biocenosisSqliteCampaign.missionCount);
    expect(biocenosisSqliteCampaign.verifiedPromotions).toBe(0);
  });

  it("keeps current GenOS source links on one immutable reviewed revision", () => {
    for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
      const source = readFileSync(file, "utf8");
      const refs = source.matchAll(/github\.com\/PISSARAW\/GenOS\/(?:blob|tree)\/(v3|[0-9a-f]{40})\//g);
      for (const ref of refs) expect(ref[1], `${file}: moving or inconsistent GenOS source link`).toBe(genosSourceCommit);
    }
  });

  it("keeps one navigation model: header/footer/sitemap share the same destinations", () => {
    const navHrefs = new Set(
      primaryNav.flatMap((e) => [
        e.hrefEn,
        e.hrefFr,
        ...e.children.map((c) => c.href),
        ...(e.childrenFr ?? []).map((c) => c.href),
      ]),
    );
    // Core destinations must exist in the single model
    for (const must of ["/systems", "/runtime", "/lab", "/benchmarks", "/research", "/developers", "/concepts"]) {
      expect(navHrefs.has(must), `nav contains ${must}`).toBe(true);
    }
    expect(primaryNav.map((entry) => entry.id)).toEqual(["learn", "system", "evidence", "developers"]);
  });

  it("marks bilingual concept pages as fully translated", () => {
    expect(frenchStatus("/")).toBe("FULL");
    expect(frenchStatus("/benchmarks")).toBe("FULL");
    expect(frenchStatus("/concepts/agow")).toBe("FULL");
    expect(frenchStatus("/topologies/trinity")).toBe("SUMMARY");
  });

  it("keeps three distinct truth modes (simulation is not a run, a run is not live)", () => {
    expect(Object.keys(truthModes).sort()).toEqual(["LIVE", "RECORDED", "SIMULATION"]);
    for (const mode of Object.values(truthModes)) {
      expect(mode.label).toBeTruthy();
      expect(mode.description).toBeTruthy();
    }
  });

  it("chains every research area: external science, GenOS hypothesis, evidence, status", () => {
    expect(researchSections.length).toBe(6);
    const valid = new Set([
      "HYPOTHESIS",
      "PROTOCOL",
      "RUNNING",
      "SUPPORTED IN THIS EXPERIMENT",
      "NOT SUPPORTED",
      "INCONCLUSIVE",
      "REPLICATED",
    ]);
    for (const section of researchSections) {
      expect(section.externalBasis, `science ${section.index}`).toBeTruthy();
      expect(section.genosHypothesis, `hypothesis ${section.index}`).toBeTruthy();
      expect(section.evidenceHref, `evidence ${section.index}`).toBeTruthy();
      expect(valid.has(section.status), `status ${section.index}`).toBe(true);
      expect(section.links.length).toBeGreaterThan(0);
    }
  });
});
