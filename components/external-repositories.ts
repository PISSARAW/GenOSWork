export type RepositoryStatus = "in-code" | "pilot" | "local" | "reference";

export type ExternalRepository = {
  number: number;
  name: string;
  url: string;
  status: RepositoryStatus;
  sourcePath?: string;
};

export type RepositoryGroup = {
  id: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  repositories: ExternalRepository[];
};

export const externalRepositoryGroups: RepositoryGroup[] = [
  {
    id: "evolution",
    titleEn: "Evolution and causal learning",
    titleFr: "Évolution et apprentissage causal",
    descriptionEn: "Ideas for choosing organizations, evolving bounded heuristics, and assessing effects.",
    descriptionFr: "Des pistes pour choisir des organisations, faire évoluer des heuristiques bornées et évaluer les effets.",
    repositories: [
      { number: 1, name: "icaros-usc/pyribs", url: "https://github.com/icaros-usc/pyribs", status: "reference" },
      { number: 2, name: "SakanaAI/ShinkaEvolve", url: "https://github.com/SakanaAI/ShinkaEvolve", status: "reference" },
      { number: 3, name: "jennyzzt/dgm", url: "https://github.com/jennyzzt/dgm", status: "reference" },
      { number: 4, name: "py-why/dowhy", url: "https://github.com/py-why/dowhy", status: "reference" },
    ],
  },
  {
    id: "evaluation",
    titleEn: "Independent evaluation",
    titleFr: "Évaluation indépendante",
    descriptionEn: "External comparisons, generated counterexamples, and agent benchmarks.",
    descriptionFr: "Comparaisons externes, contre-exemples générés et bancs d’essai pour agents.",
    repositories: [
      { number: 5, name: "UKGovernmentBEIS/inspect_ai", url: "https://github.com/UKGovernmentBEIS/inspect_ai", status: "pilot", sourcePath: "benchmarks/inspect-ai/README.md" },
      { number: 6, name: "dubzzz/fast-check", url: "https://github.com/dubzzz/fast-check", status: "in-code", sourcePath: "backend/tests/test_property_invariants.js" },
      { number: 7, name: "ethz-spylab/agentdojo", url: "https://github.com/ethz-spylab/agentdojo", status: "reference" },
      { number: 8, name: "ServiceNow/BrowserGym", url: "https://github.com/ServiceNow/BrowserGym", status: "reference" },
    ],
  },
  {
    id: "security",
    titleEn: "Authority and isolation",
    titleFr: "Autorité et isolation",
    descriptionEn: "Policies, delegated rights, sandboxing, and protected state.",
    descriptionFr: "Politiques, droits délégués, isolation et protection de l’état.",
    repositories: [
      { number: 9, name: "cedar-policy/cedar", url: "https://github.com/cedar-policy/cedar", status: "local" },
      { number: 10, name: "eclipse-biscuit/biscuit-rust", url: "https://github.com/eclipse-biscuit/biscuit-rust", status: "reference" },
      { number: 11, name: "bytecodealliance/wasmtime", url: "https://github.com/bytecodealliance/wasmtime", status: "reference" },
      { number: 12, name: "jedisct1/libsodium", url: "https://github.com/jedisct1/libsodium", status: "reference" },
    ],
  },
  {
    id: "web",
    titleEn: "Software and web work",
    titleFr: "Travail logiciel et web",
    descriptionEn: "Coding workers, browser journeys, technical quality, and accessibility.",
    descriptionFr: "Workers de programmation, parcours navigateur, qualité technique et accessibilité.",
    repositories: [
      { number: 13, name: "OpenHands/software-agent-sdk", url: "https://github.com/OpenHands/software-agent-sdk", status: "reference" },
      { number: 14, name: "microsoft/playwright", url: "https://github.com/microsoft/playwright", status: "in-code", sourcePath: "backend/src/services/webJourneyVerifier.js" },
      { number: 15, name: "GoogleChrome/lighthouse", url: "https://github.com/GoogleChrome/lighthouse", status: "local" },
      { number: 16, name: "dequelabs/axe-core", url: "https://github.com/dequelabs/axe-core", status: "local" },
    ],
  },
  {
    id: "continuity",
    titleEn: "Continuity and shared state",
    titleFr: "Continuité et état partagé",
    descriptionEn: "Durable workflows, concurrent data, incremental updates, and transport formats.",
    descriptionFr: "Workflows durables, données concurrentes, mises à jour incrémentales et formats de transport.",
    repositories: [
      { number: 17, name: "temporalio/temporal", url: "https://github.com/temporalio/temporal", status: "reference" },
      { number: 18, name: "automerge/automerge", url: "https://github.com/automerge/automerge", status: "reference" },
      { number: 19, name: "TimelyDataflow/differential-dataflow", url: "https://github.com/TimelyDataflow/differential-dataflow", status: "reference" },
      { number: 20, name: "capnproto/capnproto", url: "https://github.com/capnproto/capnproto", status: "reference" },
    ],
  },
  {
    id: "formal",
    titleEn: "Proofs and observability",
    titleFr: "Preuves et observabilité",
    descriptionEn: "Formal methods, constrained output, and diagnostic telemetry.",
    descriptionFr: "Méthodes formelles, sorties contraintes et télémétrie de diagnostic.",
    repositories: [
      { number: 21, name: "lean-dojo/LeanDojo-v2", url: "https://github.com/lean-dojo/LeanDojo-v2", status: "reference" },
      { number: 22, name: "dafny-lang/dafny", url: "https://github.com/dafny-lang/dafny", status: "reference" },
      { number: 23, name: "mlc-ai/xgrammar", url: "https://github.com/mlc-ai/xgrammar", status: "reference" },
      { number: 24, name: "open-telemetry/opentelemetry-collector", url: "https://github.com/open-telemetry/opentelemetry-collector", status: "reference" },
    ],
  },
];

export const externalRepositories = externalRepositoryGroups.flatMap((group) => group.repositories);
