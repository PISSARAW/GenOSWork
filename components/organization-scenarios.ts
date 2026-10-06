import type { OrganizationId } from "./organizations";
import type { Agent, OrganizationInput } from "./organization-algorithms";

const team: Agent[] = [
  { id: "A", role: "specialist", fitness: 0.9, x: 1, y: 2, heading: 0.3, capabilities: ["review", "memory"] },
  { id: "B", role: "generalist", fitness: 0.6, x: 3, y: 1, heading: 0.8, capabilities: ["search"] },
  { id: "C", role: "specialist", fitness: 0.8, x: 2, y: 4, heading: 0.2, capabilities: ["review", "route"] },
  { id: "D", role: "generalist", fitness: 0.3, x: 5, y: 3, heading: 1.1, capabilities: ["repair"] },
  { id: "E", role: "compiler", fitness: 0.5, x: 4, y: 5, heading: 0.5, capabilities: ["memory"] },
];
const swarm = { state: { agents: team }, options: { limit: 3 } };
export const organizationScenarios: Record<OrganizationId, OrganizationInput> = {
  specialist_expert_committee: { state: { orchestratorId: "Hub", agents: team.slice(0, 3) }, options: { limit: 3 } },
  blind_adversarial_review: { state: { agents: team.slice(0, 4) }, options: { limit: 3 } },
  red_blue_coevolution: { state: { agents: [{ id: "Red", role: "red_worker" }, { id: "Blue", role: "blue_defender" }, { id: "Observer", role: "neutral_observer" }] }, options: { limit: 3 } },
  brier_weighted_consensus: { state: { dossiers: [
    { id: "E1", events: [{ evidenceReport: { confidence: 0.9, resolvedOutcome: "success" } }] },
    { id: "E2", events: [{ evidenceReport: { confidence: 0.7, resolvedOutcome: "failure" } }] },
    { id: "E3", events: [{ evidenceReport: { confidence: 0.65, resolvedOutcome: "success" } }] },
    { id: "E4", events: [{ evidenceReport: { confidence: 0.95 } }] },
  ] }, options: {} },
  quorum_with_abstention: { state: { votes: [{ id: "A", support: true, weight: 2 }, { id: "B", support: false, weight: 1 }, { id: "C", support: true, weight: 1 }, { id: "D", abstain: true, weight: 5 }] }, options: { quorumRatio: 0.6 } },
  stigmergy: { state: { trails: [{ path: "route-A", intensity: 0.8 }, { path: "route-B", intensity: 0.3 }, { path: "route-C", intensity: 0.55 }] }, options: {} },
  flocking_boids: { ...swarm, options: { cohesion: 0.15, alignment: 0.1, separation: 0.3, separationRadius: 3, limit: 3 } },
  fish_school_search: { ...swarm, options: { step: 0.3, limit: 3 } },
  slime_mould_network: { state: { edges: [{ id: "A–B", flow: 2, conductivity: 0.8 }, { id: "B–C", flow: 0, conductivity: 0.5 }, { id: "A–C", flow: 0, conductivity: 0.04 }] }, options: { reinforcement: 1.1, decay: 0.9, pruneBelow: 0.05, limit: 3 } },
  grey_wolf_optimizer: { state: { pack: team }, options: { step: 0.3, limit: 3 } },
  mycelial_routing: { state: { agents: team, need: "review" }, options: { limit: 3 } },
  dynamic_polyethism: swarm,
  energy_huddle: { state: { budget: 1200, populations: [{ id: "Review", weight: 3 }, { id: "Search", weight: 2 }, { id: "Memory", weight: 1 }] }, options: { limit: 3 } },
  network_silence: { state: { agents: team }, options: {} },
  strategy_arena: { state: { agents: [{ id: "Strategy-A", role: "competitor" }, { id: "Strategy-B", role: "competitor" }, { id: "Strategy-C", role: "champion" }] }, options: { limit: 3 } },
  hierarchical_merge: { state: { agents: [{ id: "Root", role: "host" }, ...team.slice(0, 4)] }, options: { limit: 3 } },
  competitive_arena: { state: { agents: [{ id: "Candidate-A", role: "competitor" }, { id: "Candidate-B", role: "competitor" }, { id: "Candidate-C", role: "competitor" }] }, options: { limit: 3 } },
  isolated_recovery: { state: { agents: [{ id: "Worker-A", role: "reviewer" }, { id: "Worker-B", role: "repair" }], lostRoles: ["reviewer", "repair"] }, options: { limit: 3 } },
  memory_compilation: { state: { facts: [{ id: "F1", text: "Independent review found a missing precondition.", sourceRefs: ["review:12"] }, { id: "F2", text: "A resolved outcome is required for calibration.", sourceRefs: ["evidence:7", "decision:3"] }] }, options: {} },
};

export type ScenarioKind = "example" | "boundary" | "empty";
export function createOrganizationInput(id: OrganizationId, kind: ScenarioKind = "example"): OrganizationInput {
  const input = structuredClone(organizationScenarios[id]);
  if (kind === "empty") return { state: {}, options: input.options };
  if (kind !== "boundary") return input;
  switch (id) {
    case "specialist_expert_committee": input.state.agents = []; break;
    case "blind_adversarial_review": input.state.agents = structuredClone(team); break;
    case "red_blue_coevolution": input.state.agents = [{ id: "Observer", role: "neutral_observer" }]; break;
    case "brier_weighted_consensus": input.state.dossiers!.forEach((dossier) => { delete dossier.events![0].evidenceReport!.resolvedOutcome; }); break;
    case "quorum_with_abstention": input.state.votes = [{ id: "A", abstain: true }, { id: "B", abstain: true }]; break;
    case "stigmergy": input.state.trails = [{ path: "first", intensity: 0.5 }, { path: "second", intensity: 0.5 }]; break;
    case "flocking_boids": input.state.agents = [{ id: "A", x: 1, y: 1 }, { id: "B", x: 1, y: 1 }]; break;
    case "fish_school_search": input.state.agents!.forEach((agent) => { agent.fitness = 0; }); break;
    case "slime_mould_network": input.state.edges!.forEach((edge) => { edge.conductivity = 0.01; edge.flow = 0; }); break;
    case "grey_wolf_optimizer": input.state.pack = [{ id: "A", fitness: 1, x: 1, y: 1 }]; break;
    case "mycelial_routing": input.state.need = "unavailable"; break;
    case "dynamic_polyethism": input.state.agents!.forEach((agent) => { agent.fitness = 0.5; }); break;
    case "energy_huddle": input.state.populations!.forEach((population) => { population.weight = 0; }); break;
    case "network_silence": input.state.agents = []; break;
    case "strategy_arena": case "competitive_arena": input.state.agents = []; break;
    case "hierarchical_merge": input.state.agents = [{ id: "Root" }]; break;
    case "isolated_recovery": input.state.lostRoles = []; break;
    case "memory_compilation": input.state.facts = []; break;
  }
  return input;
}
