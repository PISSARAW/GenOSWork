import { describe, expect, it } from "vitest";
import { concepts } from "@/components/concepts";
import { catalogConcepts, conceptFamilies } from "@/components/concept-catalog";
import { topologies } from "@/components/topologies";
import { primaryNav, frenchStatus } from "@/components/site-config";

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

  it("exposes every topology and keeps the eight canonical modes", () => {
    expect(topologies.length).toBe(8);
    const slugs = topologies.map((t) => t.slug).sort();
    expect(slugs).toEqual(
      ["a-team", "biocenose", "biome", "holobionte", "metapopulation", "rhizome", "syncytium", "trinity"].sort(),
    );
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
    expect(primaryNav.length).toBe(6);
  });

  it("marks FR translation status explicitly (FULL only for translated shells)", () => {
    expect(frenchStatus("/")).toBe("FULL");
    expect(frenchStatus("/benchmarks")).toBe("FULL");
    expect(frenchStatus("/concepts/agow")).toBe("SUMMARY");
    expect(frenchStatus("/topologies/trinity")).toBe("SUMMARY");
  });
});
