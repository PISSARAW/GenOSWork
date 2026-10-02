export type Topology = {
  slug: string;
  name: string;
  index: string;
  summary: string;
  principle: string;
  runtime: string;
  limit: string;
  status: string;
  color: string;
};

export const topologies: Topology[] = [
  { slug: "trinity", name: "Trinity", index: "01", summary: "Parallel candidates with comparative evidence.", principle: "Three candidate worlds work on one mission while keeping their histories apart. A comparative barrier evaluates their evidence before a result is promoted.", runtime: "Dedicated orchestration path, comparative evidence dossiers and a promotion barrier.", limit: "The declared capability profile does not mean every listed capability is an active lease in every run.", status: "WIRED · COMPARATIVE GATE", color: "purple" },
  { slug: "a-team", name: "A-Team", index: "02", summary: "Specialists, handoffs and integration.", principle: "A mission is divided across domain specialists. Explicit handoffs move work between them, then an integration step assembles the result.", runtime: "Dedicated dispatch and coordination paths for domain work, handoffs and integration.", limit: "Pareto arbitration only applies where the A-Team evaluator invokes it.", status: "WIRED · SPECIALIZED WORKERS", color: "orange" },
  { slug: "biocenose", name: "Biocénose", index: "03", summary: "Community evaluation and explicit ballots.", principle: "A community of roles contributes evidence and evaluations. Consensus can account for confidence and quorum, while the evidence barrier remains in the decision path.", runtime: "Community preparation, evaluation and explicit jury ballots; consensus services are available.", limit: "A juror must provide an explicit ballot. Profile capabilities are not all activated automatically.", status: "WIRED · EVALUATION PATH", color: "green" },
  { slug: "holobionte", name: "Holobionte", index: "04", summary: "A host and symbionts under capability contracts.", principle: "An orchestrating host composes specialist symbionts around a mission capability. Their execution is constrained by the allocation and execution contract supplied to the run.", runtime: "Host and symbiont composition, with local inference available through the symbiont runtime.", limit: "Automatic immune behavior is proposed; host veto and drift evaluation are primitives without a guaranteed call in every path.", status: "WIRED · IMMUNITY PARTIAL", color: "orange" },
  { slug: "syncytium", name: "Syncytium", index: "05", summary: "Shared state with consistency checks.", principle: "Agents operate around shared state. Persisted topology sessions expose snapshots and CRDT operations, then evaluate state coherence.", runtime: "Persisted sessions, snapshots, CRDT operations and invariant consistency checks.", limit: "A shared-state mode does not imply every mission uses it or that every mutation requires a human operator.", status: "WIRED · PERSISTED SESSIONS", color: "blue" },
  { slug: "rhizome", name: "Rhizome", index: "06", summary: "Capability routing and stigmergic traces.", principle: "A session exposes members by capability and records traces that can guide later work. The structure can grow through explicit, audited mutations.", runtime: "Persisted sessions, capability-based member selection and stigmergic deposits with revisioned audit events.", limit: "Current routing selects from composed members; automatic multi-hop route traversal and branch creation remain proposed.", status: "WIRED · AUTO ROUTING PROPOSED", color: "green" },
  { slug: "metapopulation", name: "Métapopulation", index: "07", summary: "Regional groups and explicit recovery planning.", principle: "Semi-independent groups coordinate through weighted quorum and recovery plans. The runtime makes regional work and its lineage explicit.", runtime: "Regional runtime paths, quorum and recovery planning services are available.", limit: "Recovery calculations are explicit service calls, not an autonomous loop triggered by composition alone.", status: "WIRED · EXPLICIT RECOVERY", color: "purple" },
  { slug: "biome", name: "Biome", index: "08", summary: "Resource allocation and bounded foraging.", principle: "Work is organized around a changing resource environment. A mission loop observes, proposes, constrains, acts and verifies within a declared budget.", runtime: "Persisted sessions, allocation, foraging and health operations; a bounded mission loop with receipts and explicit authorization before real effects.", limit: "Navigation and reallocation are mission-triggered, not autonomous. Simulated mode produces no real effect.", status: "WIRED · MISSION LOOP", color: "orange" },
];

export function getTopology(slug: string) {
  return topologies.find((topology) => topology.slug === slug);
}
