import { genosSourceCommit } from "@/components/product-evidence";

export type ResearchStatus =
  | "HYPOTHESIS"
  | "PROTOCOL"
  | "RUNNING"
  | "SUPPORTED IN THIS EXPERIMENT"
  | "NOT SUPPORTED"
  | "INCONCLUSIVE"
  | "REPLICATED";

export type ResearchSection = {
  index: string;
  title: string;
  question: string;
  summary: string;
  links: [string, string][];
  externalBasis: string;
  externalAnchor?: string;
  genosHypothesis: string;
  status: ResearchStatus;
  evidenceHref: string;
};

const docs = `https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/`;

export const researchDocsBase = docs;

export const researchSections: ResearchSection[] = [
  {
    index: "01",
    title: "Runtime, state, and continuity",
    question: "How can agent work be resumed and inspected?",
    summary: "GenOS explores versioned state, snapshots, counterfactual branches, and recovery. Decisions retain their provenance so results can be compared, challenged, or resumed.",
    links: [
      ["Agent runtime", "01-concepts/runtime-agentique.md"],
      ["Counterfactual workspaces", "02-orchestration/workspaces-contrefactuel.md"],
      ["Orchestration and branches", "02-orchestration/orchestration.md"],
    ],
    externalBasis: "Convergent replicated state and versioned histories",
    externalAnchor: "Conflict-free replicated data types (Shapiro et al., 2011)",
    genosHypothesis: "Concurrent member writes can converge on shared versioned state under explicit merge operations and invariant checks.",
    status: "RUNNING",
    evidenceHref: "/runs",
  },
  {
    index: "02",
    title: "Orchestration and topologies",
    question: "What organization fits a group of collaborating agents?",
    summary: "The work defines eight topologies, their contracts, capabilities, and limits: specialist teams, populations, communities, shared state, and execution across comparison worlds. Their presence in the runtime does not imply equal maturity.",
    links: [
      ["Topology and capability contract", "02-orchestration/topologies-et-capacites.md"],
      ["Topology index", "02-orchestration/topologies/README.md"],
      ["Agent communication", "02-orchestration/communication.md"],
    ],
    externalBasis: "Distributed scheduling and organizational coordination",
    genosHypothesis: "Each topology answers a falsifiable question — e.g. three heterogeneous trajectories beat one single trajectory net of cost — testable per topology.",
    status: "PROTOCOL",
    evidenceHref: "/benchmarks",
  },
  {
    index: "03",
    title: "Memory, learning, and plasticity",
    question: "How can experience influence later decisions?",
    summary: "This research area covers episodic and semantic memory, retrieval, lessons, plasticity, and consolidation. Effects observed in controlled scenarios remain distinct from quality measured on real tasks.",
    links: [
      ["Memory and learning", "01-concepts/memoire-et-apprentissage.md"],
      ["Neurobiology and plasticity", "01-concepts/neurobiologie-et-plasticite.md"],
      ["Autobiographical memory", "02-orchestration/memoire-autobiographique.md"],
    ],
    externalBasis: "Human episodic and semantic memory systems",
    genosHypothesis: "Retrieval that combines similarity, recency, credibility, and success signals may improve long-conversation factual recall over a same-model raw-context baseline. The published LoCoMo result reports absolute F1, without that controlled comparison.",
    status: "INCONCLUSIVE",
    evidenceHref: `${docs}06-qualite-preuves/benchmarks/locomo.md`,
  },
  {
    index: "04",
    title: "Epistemology and evidence",
    question: "What justifies a conclusion or promotion?",
    summary: "GenOS treats outputs as results to examine. The work covers uncertainty, abstention, provenance, independent evidence, and metric limitations, separating execution success from the validity of a claim.",
    links: [
      ["Epistemology and evidence", "01-concepts/epistemologie-et-evidence.md"],
      ["Product completeness and status", "03-reference/contrat-produit-et-completude.md"],
      ["Quality and evidence", "06-qualite-preuves/README.md"],
    ],
    externalBasis: "Probabilistic forecast scoring",
    externalAnchor: "Brier score (Brier, 1950)",
    genosHypothesis: "Deliberation with explicit ballots and Brier-scored calibration improves error detection instead of merely producing consensus.",
    status: "PROTOCOL",
    evidenceHref: "/benchmarks",
  },
  {
    index: "05",
    title: "Evolution and verified development",
    question: "How can an agent evolve without confusing change with progress?",
    summary: "GVX and evolutionary research examine transformations, mutations, lineages, experimental nurseries, and promotion conditions. They emphasize external measurements, replication, and safeguards against circular self-evaluation.",
    links: [
      ["Verified development (GVX)", "01-concepts/gvx.md"],
      ["GVX experimental nursery", "02-orchestration/nursery-experimentale-gvx.md"],
      ["Evolutionary research on selfhood", "06-benchmarks/recherche-evolutionnaire-soi.md"],
    ],
    externalBasis: "Metapopulation ecology: local extinction and recolonization",
    externalAnchor: "Levins metapopulation model (Levins, 1969)",
    genosHypothesis: "Semi-independent groups under extinction pressure maintain capabilities through migration and recolonization.",
    status: "INCONCLUSIVE",
    evidenceHref: "/benchmarks",
  },
  {
    index: "06",
    title: "Biomimetic systems and cognition",
    question: "Which biological ideas can become testable computational mechanisms?",
    summary: "The program examines memory, homeostasis, communication, perception, immunity, and collective coordination as engineering models. Analogies organize mechanisms; they do not prove biological properties or consciousness.",
    links: [
      ["Computational biology", "01-concepts/biologie-computationnelle.md"],
      ["Epistemic immune system", "01-concepts/adaptive-epistemic-immune-system.md"],
      ["Vital agent organs", "01-concepts/organes-vitaux-agents.md"],
    ],
    externalBasis: "Physiology, immunology, and collective behavior as design analogies",
    genosHypothesis: "Biological organization patterns translate into bounded runtime operations with explicit limits — inspiration first, validation per mechanism.",
    status: "HYPOTHESIS",
    evidenceHref: "/concepts",
  },
];
