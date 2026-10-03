export type TopologyVariantMaturity = "implemented" | "partial" | "unassessed";
export const genosVariantSourceCommit = "b935962a26e2967de39db4cb253424fac44cc7e3";

// Snapshot of GenOS' canonical morphogenesis variant registry at the pinned
// source commit. This records variant-policy
// maturity, not end-to-end maturity of the topology that uses the policy.
const implemented: Record<string, string[]> = {
  trinity: ["controlled", "heterogeneous", "adversarial", "counterfactual", "factorial", "pareto", "jury", "recursive", "adaptive", "temporal", "oracular", "exploratory"],
  "a-team": ["expert_committee", "pipeline", "project_dag", "cross_functional_pod", "boundary_spanner", "matrix_team", "tiger_team", "incident_command", "multiteam", "adaptive", "relay_team"],
  biocenose: ["epistemic_jury", "delphi_community", "adversarial_assembly", "forecasting_crowd", "minority_preserving_jury", "human_ai_deliberation", "hybrid_oracle_community"],
  syncytium: ["hard", "soft", "code", "document", "graph", "transactional", "epistemic", "blackboard", "localFirst", "speculative", "hierarchical", "realtimeControl", "humanAi"],
  rhizome: ["exploratory", "routing", "growth", "resilient", "sparse", "persistent", "ephemeral", "small_world", "private", "cross_representation", "procedural", "self_healing"],
};

const partial: Record<string, string[]> = {
  biocenose: ["argumentation_community", "polycentric_council", "byzantine_resilient_community", "representative_community", "persistent_community"],
  holobionte: ["organelle", "adaptive-microbiome", "immune-critical", "local-first", "regenerative", "cloud-core/edge-symbionts", "edge-core/cloud-symbionts", "memory-rich", "competitive-partner", "procedural", "tool", "cloud-core/edge-sync"],
  metapopulation: ["balanced", "resilient", "exploratory", "conservative", "classic_patch", "island_search", "heterogeneous_islands", "source_sink", "rescue_network", "stepping_stone", "anti_synchrony", "federated", "ephemeral_patch", "persistent", "evolutionary", "cultural"],
  biome: ["resource", "exploration", "quality_diversity", "successional", "resilience", "persistent", "open_ended", "adversarial", "knowledge", "compute", "multi_scale"],
};

const statusByTopology: Record<string, Record<string, TopologyVariantMaturity>> = {};

for (const [topology, variants] of Object.entries(implemented)) {
  statusByTopology[topology] = Object.fromEntries(variants.map((variant) => [variant, "implemented"]));
}

for (const [topology, variants] of Object.entries(partial)) {
  statusByTopology[topology] = {
    ...statusByTopology[topology],
    ...Object.fromEntries(variants.map((variant) => [variant, "partial"])),
  };
}

export function getTopologyVariantMaturity(topology: string, variant: string): TopologyVariantMaturity {
  return statusByTopology[topology]?.[variant] ?? "unassessed";
}
