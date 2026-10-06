import { organizationIds, type OrganizationId } from "./organizations";

// Browser-safe ports of GenOS' deterministic guidance steps. Pure functions;
// no agent launch, permissions, network, database or promotion side effects.
export type Agent = { id: string; role?: string; capabilities?: string[]; x?: number; y?: number; heading?: number; fitness?: number };
export type Edge = { id: string; flow?: number; conductivity?: number };
export type Vote = { id?: string; support?: boolean; abstain?: boolean; weight?: number };
export type Report = { confidence?: number; coverage?: number; resolvedOutcome?: string | null };
export type Fact = string | { id?: string; text: string; sourceRefs?: string[] };
export type OrganizationState = {
  orchestratorId?: string; agents?: Agent[]; pack?: Agent[]; edges?: Edge[];
  dossiers?: { id?: string; events?: { evidenceReport?: Report }[] }[];
  votes?: Vote[]; trails?: { id?: string; path?: string; intensity?: number }[];
  populations?: { id: string; weight?: number }[]; budget?: number;
  need?: string; lostRoles?: string[]; facts?: Fact[];
};
export type OrganizationOptions = {
  cohesion?: number; alignment?: number; separation?: number; separationRadius?: number;
  step?: number; reinforcement?: number; decay?: number; pruneBelow?: number;
  quorumRatio?: number; need?: string; limit?: number;
};
export type Vector = { x: number; y: number };
export type OrganizationOutput = {
  hub?: string | null; spokes?: string[]; pairs?: string[][]; anonymous?: boolean;
  red?: string[]; blue?: string[]; weightedSupport?: number; meanBrier?: number | null;
  participantCount?: number; resolvedCount?: number; reached?: boolean; support?: number;
  abstentions?: number; dominant?: string | null; agents?: { id: string; heading: number; vector: Vector }[];
  barycenter?: Vector; individuals?: { id: string; volitive: Vector }[];
  edges?: { id: string; conductivity: number }[];
  pack?: { id: string; role: string; position: Vector }[]; need?: string | null; route?: string | null;
  roleGradient?: { id: string; rank: number }[]; allocations?: { id: string; budget: number }[];
  silent?: boolean; buffered?: number; competitors?: string[]; mode?: string;
  root?: string | null; children?: string[]; isolated?: string[]; plan?: string[]; facts?: Fact[];
};
export type OrganizationResult = OrganizationOutput & { organization: OrganizationId };
export type OrganizationInput = { state: OrganizationState; options: OrganizationOptions };
type Algorithm = (state: OrganizationState, options: OrganizationOptions) => OrganizationOutput;
const n = (value: number | undefined, fallback = 0) => Number.isFinite(value) ? value! : fallback;
const ids = (agents: Agent[] = []) => agents.map((agent) => agent.id).filter(Boolean);
const round = (value: number, digits = 3) => Number(value.toFixed(digits));

export function calibrationRows(state: OrganizationState) {
  return (state.dossiers ?? []).map((dossier, index) => {
    const report = [...(dossier.events ?? [])].reverse().map((event) => event.evidenceReport).find(Boolean) ?? {};
    const confidence = Math.max(0, Math.min(1, n(report.confidence, n(report.coverage, 0.5))));
    const resolved = report.resolvedOutcome !== undefined && report.resolvedOutcome !== null;
    const outcome = report.resolvedOutcome === "success" ? 1 : 0;
    const brier = resolved ? (confidence - outcome) ** 2 : null;
    return { id: dossier.id ?? `E${index + 1}`, confidence, outcome, resolved, brier, weight: brier === null ? 0 : Math.max(0, 1 - brier) };
  });
}

export const organizationAlgorithms: Record<OrganizationId, Algorithm> = {
  specialist_expert_committee: (state) => ({ hub: state.orchestratorId || null, spokes: ids(state.agents) }),
  blind_adversarial_review: (state) => {
    const members = ids(state.agents);
    const pairs: string[][] = [];
    for (let index = 0; index < members.length; index += 2) pairs.push(members.slice(index, index + 2));
    return { pairs, anonymous: true };
  },
  red_blue_coevolution: (state) => ({
    red: (state.agents ?? []).filter((agent) => /red|attack|adversar/i.test(agent.role ?? "")).map((agent) => agent.id),
    blue: (state.agents ?? []).filter((agent) => /blue|defen/i.test(agent.role ?? "")).map((agent) => agent.id),
  }),
  brier_weighted_consensus: (state) => {
    const resolved = calibrationRows(state).filter((row) => row.resolved);
    if (!resolved.length) return { weightedSupport: 0, meanBrier: null, participantCount: 0, resolvedCount: 0 };
    const weights = resolved.reduce((sum, row) => sum + row.weight, 0);
    const support = resolved.reduce((sum, row) => sum + row.weight * row.outcome, 0);
    return { weightedSupport: round(weights > 0 ? support / weights : 0), meanBrier: round(resolved.reduce((sum, row) => sum + row.brier!, 0) / resolved.length, 4), participantCount: resolved.length, resolvedCount: resolved.length };
  },
  quorum_with_abstention: (state, options) => {
    let activeWeight = 0, supportWeight = 0, abstentions = 0;
    for (const vote of state.votes ?? []) {
      if (vote.abstain === true) { abstentions++; continue; }
      activeWeight += n(vote.weight, 1);
      if (vote.support === true) supportWeight += n(vote.weight, 1);
    }
    const support = activeWeight > 0 ? supportWeight / activeWeight : 0;
    return { reached: support >= n(options.quorumRatio, 0.5), support: round(support), abstentions };
  },
  stigmergy: (state) => {
    let dominant: string | null = null, intensity = -1;
    for (const trail of state.trails ?? []) if (n(trail.intensity) > intensity) { intensity = n(trail.intensity); dominant = trail.path || trail.id || null; }
    return { dominant };
  },
  flocking_boids: (state, options) => {
    const members = state.agents ?? [], count = members.length || 1;
    const center = { x: members.reduce((sum, agent) => sum + n(agent.x), 0) / count, y: members.reduce((sum, agent) => sum + n(agent.y), 0) / count };
    return { agents: members.map((agent) => {
      const others = members.filter((other) => other !== agent);
      const heading = others.length ? others.reduce((sum, other) => sum + n(other.heading), 0) / others.length : n(agent.heading);
      let sx = 0, sy = 0;
      for (const other of others) {
        const distance = Math.hypot(n(agent.x) - n(other.x), n(agent.y) - n(other.y));
        if (distance > 0 && distance < n(options.separationRadius, 1)) { sx += (n(agent.x) - n(other.x)) / distance; sy += (n(agent.y) - n(other.y)) / distance; }
      }
      return { id: agent.id, heading: n(agent.heading) + n(options.alignment, 0.05) * (heading - n(agent.heading)), vector: { x: n(options.cohesion, 0.05) * (center.x - n(agent.x)) + n(options.separation, 0.1) * sx, y: n(options.cohesion, 0.05) * (center.y - n(agent.y)) + n(options.separation, 0.1) * sy } };
    }) };
  },
  fish_school_search: (state, options) => {
    const members = state.agents ?? [], weight = (agent: Agent) => Math.max(0, n(agent.fitness, 1));
    const total = members.reduce((sum, agent) => sum + weight(agent), 0) || 1;
    const barycenter = { x: members.reduce((sum, agent) => sum + n(agent.x) * weight(agent), 0) / total, y: members.reduce((sum, agent) => sum + n(agent.y) * weight(agent), 0) / total };
    return { barycenter, individuals: members.map((agent) => ({ id: agent.id, volitive: { x: n(options.step, 0.1) * (barycenter.x - n(agent.x)), y: n(options.step, 0.1) * (barycenter.y - n(agent.y)) } })) };
  },
  slime_mould_network: (state, options) => ({ edges: (state.edges ?? []).flatMap((edge) => {
    const conductivity = Math.max(0, n(edge.conductivity, 0.5) * (Math.max(0, n(edge.flow)) > 0 ? n(options.reinforcement, 1.1) : n(options.decay, 0.9)));
    return conductivity >= n(options.pruneBelow, 0.05) ? [{ id: edge.id, conductivity: round(conductivity, 4) }] : [];
  }) }),
  grey_wolf_optimizer: (state, options) => {
    const ranked = [...(state.pack ?? [])].sort((a, b) => n(b.fitness) - n(a.fitness));
    return { pack: ranked.map((wolf, index) => {
      const target = index < 3 ? wolf : ranked[0];
      return { id: wolf.id, role: ["alpha", "beta", "delta"][index] ?? "omega", position: { x: n(wolf.x) + n(options.step, 0.1) * (n(target.x) - n(wolf.x)), y: n(wolf.y) + n(options.step, 0.1) * (n(target.y) - n(wolf.y)) } };
    }) };
  },
  mycelial_routing: (state, options) => {
    const need = state.need || options.need || null;
    return { need, route: need ? (state.agents ?? []).find((agent) => (agent.capabilities ?? []).includes(need))?.id ?? null : null };
  },
  dynamic_polyethism: (state) => ({ roleGradient: [...(state.agents ?? [])].sort((a, b) => n(b.fitness) - n(a.fitness)).map((agent, index) => ({ id: agent.id, rank: index + 1 })) }),
  energy_huddle: (state) => {
    const groups = state.populations ?? [], weights = groups.map((group) => Math.max(0, n(group.weight, 1))), total = weights.reduce((sum, weight) => sum + weight, 0) || 1;
    return { allocations: groups.map((group, index) => ({ id: group.id, budget: Math.round(weights[index] / total * n(state.budget, groups.length * 1000)) })) };
  },
  network_silence: (state) => ({ silent: true, buffered: (state.agents ?? []).length }),
  strategy_arena: (state) => ({ competitors: ids(state.agents), mode: "isolated_tournament" }),
  hierarchical_merge: (state) => ({ root: state.agents?.[0]?.id ?? null, children: (state.agents ?? []).slice(1).map((agent) => agent.id) }),
  competitive_arena: (state) => ({ competitors: ids(state.agents), mode: "isolated_tournament" }),
  isolated_recovery: (state) => ({ isolated: ids(state.agents), plan: state.lostRoles ?? [] }),
  memory_compilation: (state) => ({ facts: state.facts ?? [] }),
};

export function runOrganizationStep(id: OrganizationId, state: OrganizationState = {}, options: OrganizationOptions = {}): OrganizationResult {
  if (!organizationIds.includes(id)) throw new Error("Unknown organization");
  // Copy data to keep callers' input immutable even when output retains facts.
  return structuredClone({ organization: id, ...organizationAlgorithms[id](state, options) });
}

export function preferredAgents(result: OrganizationResult, limit = 3): string[] {
  if (!Number.isFinite(limit) || limit <= 0) return [];
  const magnitude = (vector: Vector) => Math.hypot(vector.x, vector.y);
  let selected: string[] = [];
  if (result.organization === "grey_wolf_optimizer") selected = (result.pack ?? []).filter((wolf) => wolf.role !== "omega").map((wolf) => wolf.id);
  else if (result.organization === "fish_school_search") selected = [...(result.individuals ?? [])].sort((a, b) => magnitude(b.volitive) - magnitude(a.volitive)).map((agent) => agent.id);
  else if (result.organization === "flocking_boids") selected = [...(result.agents ?? [])].sort((a, b) => magnitude(b.vector) - magnitude(a.vector)).map((agent) => agent.id);
  else if (result.organization === "slime_mould_network") selected = [...(result.edges ?? [])].sort((a, b) => b.conductivity - a.conductivity).map((edge) => edge.id);
  else selected = result.spokes ?? result.competitors ?? result.isolated ?? result.roleGradient?.map((item) => item.id) ?? result.allocations?.map((item) => item.id) ?? (result.children ? [result.root, ...result.children].filter((id): id is string => Boolean(id)) : undefined) ?? result.pairs?.flat() ?? (result.red ? [...result.red, ...(result.blue ?? [])] : undefined) ?? (result.route ? [result.route] : result.hub ? [result.hub] : []);
  return selected.slice(0, Math.floor(limit));
}

export function authorityFor(id: OrganizationId, role = ""): string {
  switch (id) {
    case "grey_wolf_optimizer": return /alpha|beta|delta/i.test(role) ? "leader" : "follower";
    case "specialist_expert_committee": return /orchestrator/i.test(role) ? "hub" : "spoke";
    case "red_blue_coevolution": return /red|blue/i.test(role) ? "adversary" : "observer";
    case "hierarchical_merge": return /orchestrator|host/i.test(role) ? "root" : "member";
    case "blind_adversarial_review": return /critic|review/i.test(role) ? "critic" : "member";
    case "brier_weighted_consensus": return /expert|forecaster/i.test(role) ? "voter" : "member";
    case "quorum_with_abstention": return /voter|member/i.test(role) ? "voter" : "member";
    case "stigmergy": return /forager|scout/i.test(role) ? "forager" : "member";
    case "mycelial_routing": return /hypha|router/i.test(role) ? "router" : "member";
    case "dynamic_polyethism": return /generalist|specialist/i.test(role) ? "polyethic" : "member";
    case "strategy_arena": case "competitive_arena": return /competitor|champion/i.test(role) ? "competitor" : "observer";
    case "memory_compilation": return /librarian|compiler/i.test(role) ? "compiler" : "member";
    default: return "member";
  }
}

// The JSON editor accepts bounded data, never code or a service/matrix object.
export function parseOrganizationInput(text: string): OrganizationInput {
  if (text.length > 32768) throw new Error("Input exceeds 32 KB / Entrée supérieure à 32 Ko");
  const parsed: unknown = JSON.parse(text);
  const object = (value: unknown, path: string): Record<string, unknown> => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${path}: expected object / objet attendu`);
    return value as Record<string, unknown>;
  };
  const root = object(parsed, "input");
  const state = object(root.state === undefined ? {} : root.state, "state"), options = object(root.options === undefined ? {} : root.options, "options");
  const arrays = new Set(["agents", "pack", "edges", "dossiers", "events", "votes", "trails", "populations", "lostRoles", "facts", "capabilities", "sourceRefs"]);
  const booleans = new Set(["support", "abstain"]);
  const strings = new Set(["id", "role", "orchestratorId", "need", "path", "resolvedOutcome", "text"]);
  const numbers = new Set(["x", "y", "heading", "fitness", "flow", "conductivity", "weight", "intensity", "confidence", "coverage", "budget", "cohesion", "alignment", "separation", "separationRadius", "step", "reinforcement", "decay", "pruneBelow", "quorumRatio", "limit"]);
  const recordKeys: Record<string, string[]> = {
    agents: ["id", "role", "capabilities", "x", "y", "heading", "fitness"],
    pack: ["id", "role", "capabilities", "x", "y", "heading", "fitness"],
    edges: ["id", "flow", "conductivity"], dossiers: ["id", "events"], events: ["evidenceReport"],
    votes: ["id", "support", "abstain", "weight"], trails: ["id", "path", "intensity"],
    populations: ["id", "weight"], facts: ["id", "text", "sourceRefs"],
  };
  const walk = (value: unknown, path: string, depth = 0) => {
    if (depth > 8) throw new Error(`${path}: nesting too deep / structure trop profonde`);
    for (const [key, item] of Object.entries(object(value, path))) {
      const at = `${path}.${key}`;
      if (arrays.has(key)) {
        if (!Array.isArray(item) || item.length > 64) throw new Error(`${at}: expected array, max 64 / tableau attendu, maximum 64`);
        for (const entry of item) {
          if (["lostRoles", "capabilities", "sourceRefs"].includes(key) || (key === "facts" && typeof entry === "string")) {
            if (typeof entry !== "string" || entry.length > 2000) throw new Error(`${at}: invalid text / texte invalide`);
          } else {
            const record = object(entry, at);
            for (const field of Object.keys(record)) if (!recordKeys[key]?.includes(field)) throw new Error(`${at}.${field}: unsupported field / champ non pris en charge`);
            if (key === "facts" && typeof record.text !== "string") throw new Error(`${at}.text: text required / texte requis`);
            walk(entry, at, depth + 1);
          }
        }
        if (["agents", "pack", "edges", "populations"].includes(key)) {
          const keys = item.map((entry) => object(entry, at).id);
          if (keys.some((id) => typeof id !== "string" || !id.trim()) || new Set(keys).size !== keys.length) throw new Error(`${at}: unique non-empty IDs required / identifiants uniques non vides requis`);
        }
      } else if (booleans.has(key)) {
        if (typeof item !== "boolean") throw new Error(`${at}: expected boolean / booléen attendu`);
      } else if (strings.has(key)) {
        if (key === "resolvedOutcome" && item === null) continue;
        if (typeof item !== "string" || item.length > 2000) throw new Error(`${at}: invalid text / texte invalide`);
      } else if (numbers.has(key)) {
        if (typeof item !== "number" || !Number.isFinite(item) || Math.abs(item) > 1000000) throw new Error(`${at}: invalid finite number / nombre fini invalide`);
        if (!["x", "y", "heading"].includes(key) && item < 0) throw new Error(`${at}: must be non-negative / valeur positive ou nulle requise`);
        if (["confidence", "coverage", "quorumRatio", "step", "decay"].includes(key) && item > 1) throw new Error(`${at}: range 0–1 / intervalle 0–1`);
        if (key === "quorumRatio" && item === 0) throw new Error(`${at}: threshold must be positive / seuil strictement positif requis`);
        if (key === "limit" && (!Number.isInteger(item) || item > 64)) throw new Error(`${at}: integer 0–64 / entier 0–64`);
      } else if (key === "evidenceReport") {
        for (const field of Object.keys(object(item, at))) if (!["confidence", "coverage", "resolvedOutcome"].includes(field)) throw new Error(`${at}.${field}: unsupported field / champ non pris en charge`);
        walk(item, at, depth + 1);
      }
      else throw new Error(`${at}: unsupported field / champ non pris en charge`);
    }
  };
  const stateKeys = new Set(["orchestratorId", "agents", "pack", "edges", "dossiers", "votes", "trails", "populations", "budget", "need", "lostRoles", "facts"]);
  const optionKeys = new Set(["cohesion", "alignment", "separation", "separationRadius", "step", "reinforcement", "decay", "pruneBelow", "quorumRatio", "need", "limit"]);
  for (const key of Object.keys(root)) if (!["state", "options"].includes(key)) throw new Error(`input.${key}: unsupported field / champ non pris en charge`);
  for (const key of Object.keys(state)) if (!stateKeys.has(key)) throw new Error(`state.${key}: unsupported field / champ non pris en charge`);
  for (const key of Object.keys(options)) if (!optionKeys.has(key)) throw new Error(`options.${key}: unsupported field / champ non pris en charge`);
  walk(state, "state"); walk(options, "options");
  return { state: state as OrganizationState, options: options as OrganizationOptions };
}
