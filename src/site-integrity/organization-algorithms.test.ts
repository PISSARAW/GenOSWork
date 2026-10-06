import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { organizationIds, organizations } from "@/components/organizations";
import { organizationAlgorithms, authorityFor, parseOrganizationInput, preferredAgents, runOrganizationStep } from "@/components/organization-algorithms";
import { createOrganizationInput } from "@/components/organization-scenarios";
import { organizationGuides } from "@/components/organization-guides";
import { genosSourceCommit } from "@/components/product-evidence";
import { frenchStatus } from "@/components/site-config";

describe("all 19 browser organization algorithms", () => {
  it("covers the exact registry with executable algorithms and bilingual guides", () => {
    expect(organizationIds).toHaveLength(19);
    expect(new Set(organizationIds).size).toBe(19);
    expect(organizations.map((item) => item.id)).toEqual([...organizationIds]);
    expect(Object.keys(organizationAlgorithms).sort()).toEqual([...organizationIds].sort());
    expect(Object.keys(organizationGuides).sort()).toEqual([...organizationIds].sort());
    expect(frenchStatus("/organizations")).toBe("FULL");
  });
  for (const id of organizationIds) for (const scenario of ["example", "boundary", "empty"] as const) {
    it(`${id}: ${scenario} is finite, repeatable and preserves input`, () => {
      const input = createOrganizationInput(id, scenario), original = structuredClone(input);
      const parsed = parseOrganizationInput(JSON.stringify(input));
      const first = runOrganizationStep(id, parsed.state, parsed.options);
      expect(first).toEqual(runOrganizationStep(id, parsed.state, parsed.options));
      expect(input).toEqual(original);
      expect(JSON.stringify(first)).not.toMatch(/NaN|Infinity/);
      expect(first.organization).toBe(id);
      expect(preferredAgents(first, 0)).toEqual([]);
    });
  }
  it("requires resolved external outcomes for Brier and uses the latest report", () => {
    const output = runOrganizationStep("brier_weighted_consensus", { dossiers: [
      { events: [{ evidenceReport: { confidence: 0.1, resolvedOutcome: "failure" } }, { evidenceReport: { confidence: 0.9, resolvedOutcome: "success" } }] },
      { events: [{ evidenceReport: { confidence: 0.7, resolvedOutcome: "failure" } }] },
      { events: [{ evidenceReport: { confidence: 1 } }] },
    ] });
    expect(output).toMatchObject({ resolvedCount: 2, weightedSupport: 0.66, meanBrier: 0.25 });
    expect(runOrganizationStep("brier_weighted_consensus", { dossiers: [{ events: [{ evidenceReport: { confidence: 1 } }] }] })).toMatchObject({ resolvedCount: 0, meanBrier: null, weightedSupport: 0 });
  });
  it("excludes abstention weight and compares the unrounded support to the threshold", () => {
    const state = { votes: [{ support: true, weight: 2 }, { support: false, weight: 1 }, { abstain: true, weight: 100 }] };
    expect(runOrganizationStep("quorum_with_abstention", state, { quorumRatio: 0.667 })).toMatchObject({ support: 0.667, abstentions: 1, reached: false });
    expect(runOrganizationStep("quorum_with_abstention", { votes: [{ abstain: true }] })).toMatchObject({ support: 0, reached: false });
  });
  it("handles odd blind review pairs and role partitions", () => {
    expect(runOrganizationStep("blind_adversarial_review", { agents: [{ id: "A" }, { id: "B" }, { id: "C" }] })).toMatchObject({ pairs: [["A", "B"], ["C"]], anonymous: true });
    expect(runOrganizationStep("red_blue_coevolution", { agents: [{ id: "A", role: "attacker" }, { id: "B", role: "defender" }, { id: "O", role: "observer" }] })).toMatchObject({ red: ["A"], blue: ["B"] });
  });
  it("balances Boids steering and keeps coincident agents finite", () => {
    const output = runOrganizationStep("flocking_boids", { agents: [{ id: "A", x: 0, y: 0, heading: 0 }, { id: "B", x: 2, y: 0, heading: 1 }] }, { cohesion: 0.1, alignment: 0.2, separation: 0.3, separationRadius: 3 });
    expect(output.agents![0].vector.x).toBeCloseTo(-0.2);
    expect(output.agents![1].vector.x).toBeCloseTo(0.2);
    expect(output.agents!.map((item) => item.heading)).toEqual([0.2, 0.8]);
  });
  it("weights Fish School movement and retains the zero-weight source fallback", () => {
    const output = runOrganizationStep("fish_school_search", { agents: [{ id: "A", x: 0, fitness: 1 }, { id: "B", x: 10, fitness: 3 }] }, { step: 0.5 });
    expect(output.barycenter).toEqual({ x: 7.5, y: 0 });
    expect(output.individuals!.map((item) => item.volitive.x)).toEqual([3.75, -1.25]);
    expect(runOrganizationStep("fish_school_search", { agents: [{ id: "A", x: 9, fitness: 0 }] }).barycenter).toEqual({ x: 0, y: 0 });
  });
  it("reinforces and prunes paths, then prefers conductivity order", () => {
    const output = runOrganizationStep("slime_mould_network", { edges: [{ id: "low", flow: 0, conductivity: 0.05 }, { id: "high", flow: 2, conductivity: 0.8 }, { id: "mid", flow: 0, conductivity: 0.5 }] });
    expect(output.edges).toEqual([{ id: "high", conductivity: 0.88 }, { id: "mid", conductivity: 0.45 }]);
    expect(preferredAgents(output, 1)).toEqual(["high"]);
  });
  it("keeps wolf leaders fixed and moves omega toward alpha", () => {
    const output = runOrganizationStep("grey_wolf_optimizer", { pack: [{ id: "omega", x: 10, fitness: 0 }, { id: "alpha", x: 0, fitness: 3 }, { id: "beta", x: 2, fitness: 2 }, { id: "delta", x: 4, fitness: 1 }] }, { step: 0.5 });
    expect(output.pack!.map((item) => item.role)).toEqual(["alpha", "beta", "delta", "omega"]);
    expect(output.pack!.map((item) => item.position.x)).toEqual([0, 2, 4, 5]);
    expect(preferredAgents(output)).toEqual(["alpha", "beta", "delta"]);
    expect(authorityFor("grey_wolf_optimizer", "omega")).toBe("follower");
    expect(authorityFor("grey_wolf_optimizer", "alpha")).toBe("leader");
  });
  it("routes the first compatible member and refuses an absent capability", () => {
    const agents = [{ id: "A", capabilities: ["review"] }, { id: "B", capabilities: ["review"] }];
    expect(runOrganizationStep("mycelial_routing", { agents }, { need: "review" }).route).toBe("A");
    expect(runOrganizationStep("mycelial_routing", { agents, need: "missing" }).route).toBeNull();
  });
  it("exposes stable ranks, zero-weight allocation and rounding effects", () => {
    expect(runOrganizationStep("dynamic_polyethism", { agents: [{ id: "A", fitness: 1 }, { id: "B", fitness: 1 }] }).roleGradient).toEqual([{ id: "A", rank: 1 }, { id: "B", rank: 2 }]);
    expect(runOrganizationStep("energy_huddle", { budget: 100, populations: [{ id: "A", weight: 0 }] }).allocations).toEqual([{ id: "A", budget: 0 }]);
    const rounded = runOrganizationStep("energy_huddle", { budget: 2, populations: [{ id: "A" }, { id: "B" }, { id: "C" }] });
    expect(rounded.allocations!.reduce((sum, item) => sum + item.budget, 0)).toBe(3);
  });
  it("preserves supplied memory provenance without aliasing caller state", () => {
    const input = createOrganizationInput("memory_compilation");
    const output = runOrganizationStep("memory_compilation", input.state);
    expect(output.facts).toEqual(input.state.facts);
    output.facts!.push("new");
    expect(input.state.facts).toHaveLength(2);
  });
  it.each([
    '{"state":{"agents":[{"id":"A"},{"id":"A"}]}}',
    '{"state":{"votes":[{"weight":-1}]}}',
    '{"options":{"quorumRatio":0}}',
    '{"options":{"step":2}}',
    '{"state":{"matrix":{}}}',
    '{"options":{"limit":1.5}}',
    '{"state":{"dossiers":[{"events":[{"evidenceReport":{"confidence":"0.9"}}]}]}}',
    '{"state":{"facts":[null]}}',
    '{"state":{"agents":[{"id":"A","x":1e400}]}}',
    '{"state":{"facts":[{"id":"F1"}]}}',
    '{"state":{"agents":[{"id":"A","support":true}]}}',
    '{"state":null}',
  ])("rejects invalid editor input: %s", (input) => expect(() => parseOrganizationInput(input)).toThrow());
  it("bounds list size and rejects unknown organization IDs", () => {
    expect(() => parseOrganizationInput(JSON.stringify({ state: { agents: Array.from({ length: 65 }, (_, i) => ({ id: `${i}` })) } }))).toThrow();
    expect(() => runOrganizationStep("unknown" as typeof organizationIds[number])).toThrow();
  });
});

const sourceRoot = resolve(process.cwd(), "..", "GenOS");
const hasSource = existsSync(resolve(sourceRoot, ".git"));
type Canonical = { runTopologyStep: typeof runOrganizationStep; preferredAgents: (id: string, result: unknown, limit: number) => string[]; authorityFor?: typeof authorityFor };
function canonicalSource() {
  const source = (file: string) => execFileSync("git", ["-c", `safe.directory=${sourceRoot.replaceAll("\\", "/")}`, "-C", sourceRoot, "show", `${genosSourceCommit}:backend/src/services/${file}.js`], { encoding: "utf8" });
  const organizationsModule = { exports: {} as { runOrganizationStep: typeof runOrganizationStep; authorityFor: typeof authorityFor } };
  runInNewContext(source("organizationAlgorithms"), { module: organizationsModule });
  const swarmModule = { exports: {} as Canonical };
  runInNewContext(source("swarmTopologyAlgorithms"), { module: swarmModule, require: () => organizationsModule.exports });
  return { ...swarmModule.exports, authorityFor: organizationsModule.exports.authorityFor };
}
describe.skipIf(!hasSource)("parity with the immutable GenOS source", () => {
  const canonical = hasSource ? canonicalSource() : null;
  for (const id of organizationIds) for (const kind of ["example", "boundary", "empty"] as const) it(`${id}: ${kind} matches the published step and preferred selection`, () => {
    const { state, options } = createOrganizationInput(id, kind);
    const output = runOrganizationStep(id, state, options);
    expect(output).toEqual(JSON.parse(JSON.stringify(canonical!.runTopologyStep(id, state, options))));
    expect(preferredAgents(output)).toEqual(Array.from(canonical!.preferredAgents(id, output, 3)));
    for (const role of ["orchestrator", "alpha", "omega", "red_worker", "critic", "compiler", "specialist", "member"]) expect(authorityFor(id, role)).toBe(canonical!.authorityFor!(id, role));
  });
});
