export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://genoswork.vercel.app";

export const genosRepo = "https://github.com/PISSARAW/GenOS";
export const genosDocs = (path = "") =>
  `https://github.com/PISSARAW/GenOS/blob/v3/${path}`;

export type TruthMode = "SIMULATION" | "RECORDED" | "LIVE";

export const truthModes: Record<
  TruthMode,
  { label: string; description: string }
> = {
  SIMULATION: {
    label: "SIMULATION",
    description:
      "A simplified model running in the browser. It explains an idea and proves nothing about the runtime.",
  },
  RECORDED: {
    label: "RECORDED GENOS RUN",
    description:
      "An artifact from a real historical GenOS execution. Inspectable, replayable, failures included.",
  },
  LIVE: {
    label: "LIVE GENOS",
    description:
      "A real runtime executes the mission. Bounded, tenant-scoped, evidence preserved.",
  },
};

export type NavChild = { label: string; href: string; note?: string };
export type NavEntry = {
  id: string;
  labelEn: string;
  labelFr: string;
  hrefEn: string;
  hrefFr: string;
  questionEn: string;
  questionFr: string;
  children: NavChild[];
  childrenFr?: NavChild[];
};

export const primaryNav: NavEntry[] = [
  {
    id: "learn",
    labelEn: "Learn",
    labelFr: "Comprendre",
    hrefEn: "/systems",
    hrefFr: "/fr/systems",
    questionEn: "What is GenOS, and why does it exist?",
    questionFr: "Qu'est-ce que GenOS, et pourquoi existe-t-il ?",
    children: [
      { label: "System map", href: "/systems", note: "How parts fit together" },
      { label: "Organism view", href: "/systems/organism" },
      { label: "Orchestrator", href: "/orchestrator" },
      { label: "Concept Atlas", href: "/concepts" },
    ],
    childrenFr: [
      { label: "Carte système", href: "/fr/systems" },
      { label: "Vue organisme", href: "/fr/systems/organism" },
      { label: "Orchestration", href: "/fr/orchestrator" },
      { label: "Atlas des concepts", href: "/fr/concepts" },
    ],
  },
  {
    id: "system",
    labelEn: "System",
    labelFr: "Système",
    hrefEn: "/runtime",
    hrefFr: "/fr/runtime",
    questionEn: "What is GenOS made of?",
    questionFr: "De quelles parties GenOS est-il composé ?",
    children: [
      { label: "Runtime", href: "/runtime" },
      { label: "Supervision", href: "/runtime/supervision" },
      { label: "Workers", href: "/workers" },
      { label: "Daemons", href: "/daemons" },
      { label: "Topologies", href: "/topologies" },
      { label: "Morphogenesis", href: "/morphogenesis" },
      { label: "Organizations", href: "/organizations" },
    ],
    childrenFr: [
      { label: "Runtime", href: "/fr/runtime" },
      { label: "Supervision", href: "/fr/runtime/supervision" },
      { label: "Workers", href: "/fr/workers" },
      { label: "Daemons", href: "/fr/daemons" },
      { label: "Topologies", href: "/fr/topologies" },
      { label: "Morphogenèse", href: "/fr/morphogenesis" },
      { label: "Organisations", href: "/fr/organizations" },
    ],
  },
  {
    id: "lab",
    labelEn: "Lab",
    labelFr: "Laboratoire",
    hrefEn: "/lab",
    hrefFr: "/fr/lab",
    questionEn: "Can I manipulate or run something?",
    questionFr: "Puis-je manipuler ou exécuter quelque chose ?",
    children: [
      { label: "Interactive models", href: "/lab/models" },
      { label: "Topology playground", href: "/lab" },
      { label: "Recorded runs", href: "/runs" },
      { label: "Public sandbox", href: "/sandbox" },
    ],
    childrenFr: [
      { label: "Modèles interactifs", href: "/fr/lab/models" },
      { label: "Laboratoire", href: "/fr/lab" },
      { label: "Exécutions archivées", href: "/fr/runs" },
      { label: "Sandbox", href: "/fr/sandbox" },
    ],
  },
  {
    id: "evaluation",
    labelEn: "Evaluation",
    labelFr: "Évaluation",
    hrefEn: "/benchmarks",
    hrefFr: "/fr/benchmarks",
    questionEn: "What actually works, and how do we know?",
    questionFr: "Qu'est-ce qui fonctionne, et comment le sait-on ?",
    children: [
      { label: "Benchmark dashboard", href: "/benchmarks" },
      { label: "Evidence ledger", href: "/evidence" },
      { label: "Recorded runs", href: "/runs" },
    ],
    childrenFr: [
      { label: "Benchmarks", href: "/fr/benchmarks" },
      { label: "Preuves", href: "/fr/evidence" },
      { label: "Exécutions archivées", href: "/fr/runs" },
    ],
  },
  {
    id: "research",
    labelEn: "Research",
    labelFr: "Recherche",
    hrefEn: "/research",
    hrefFr: "/fr/research",
    questionEn: "What scientific ideas does the project rest on?",
    questionFr: "Sur quelles idées scientifiques repose le projet ?",
    children: [
      { label: "Research program", href: "/research" },
      { label: "Concept Atlas", href: "/concepts" },
      { label: "Evidence ledger", href: "/evidence" },
    ],
    childrenFr: [
      { label: "Programme de recherche", href: "/fr/research" },
      { label: "Atlas des concepts", href: "/fr/concepts" },
      { label: "Preuves", href: "/fr/evidence" },
    ],
  },
  {
    id: "developers",
    labelEn: "Developers",
    labelFr: "Développeurs",
    hrefEn: "/developers",
    hrefFr: "/fr/developers",
    questionEn: "How do I install, program, or integrate GenOS?",
    questionFr: "Comment installer, programmer ou intégrer GenOS ?",
    children: [
      { label: "Quickstart", href: "/developers" },
      { label: "API / MCP reference", href: "/api-mcp" },
      { label: "Live sandbox", href: "/sandbox" },
    ],
    childrenFr: [
      { label: "Développeurs", href: "/fr/developers" },
      { label: "Référence API / MCP", href: "/fr/api-mcp" },
      { label: "Sandbox", href: "/fr/sandbox" },
    ],
  },
];

export type TranslationStatus = "FULL" | "SUMMARY";

/** Routes with a fully translated FR page. Everything else is SUMMARY via /fr/[...slug]. */
export const frenchFullRoutes = new Set([
  "/",
  "/developers",
  "/api-mcp",
  "/benchmarks",
  "/runs",
  "/sandbox",
]);

export function frenchStatus(path: string): TranslationStatus {
  return frenchFullRoutes.has(path) ? "FULL" : "SUMMARY";
}

export function oppositeLocalePath(pathname: string): string {
  const isFr = pathname === "/fr" || pathname.startsWith("/fr/");
  if (isFr) {
    const en = pathname.replace(/^\/fr(?=\/|$)/, "") || "/";
    return en;
  }
  return pathname === "/" ? "/fr" : `/fr${pathname}`;
}
