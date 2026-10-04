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
