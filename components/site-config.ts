import { genosSourceCommit } from "@/components/product-evidence";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://genos.work";

export const genosRepo = "https://github.com/PISSARAW/GenOS";
export const genosDocs = (path = "") =>
  `https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/${path}`;

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
      "An artifact from a real historical GenOS execution. Inspectable, with failures included; reproduction depends on the available inputs and harness.",
  },
  LIVE: {
    label: "LIVE GENOS",
    description:
      "A connected GenOS endpoint accepts a mission request. Check worker, decision, verification and promotion states in its response.",
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
    labelEn: "Overview",
    labelFr: "Aperçu",
    hrefEn: "/systems",
    hrefFr: "/fr/systems",
    questionEn: "What does GenOS keep with the work?",
    questionFr: "Que conserve GenOS avec le travail ?",
    children: [
      { label: "System map", href: "/systems", note: "How parts fit together" },
      { label: "Runtime overview", href: "/runtime" },
      { label: "Recorded runs", href: "/runs" },
      { label: "Concept Atlas", href: "/concepts" },
    ],
    childrenFr: [
      { label: "Carte système", href: "/fr/systems" },
      { label: "Aperçu du runtime", href: "/fr/runtime" },
      { label: "Exécutions enregistrées", href: "/fr/runs" },
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
      { label: "Teaching lab", href: "/lab" },
      { label: "Organizations", href: "/organizations" },
    ],
    childrenFr: [
      { label: "Runtime", href: "/fr/runtime" },
      { label: "Supervision", href: "/fr/runtime/supervision" },
      { label: "Workers", href: "/fr/workers" },
      { label: "Daemons", href: "/fr/daemons" },
      { label: "Topologies", href: "/fr/topologies" },
      { label: "Morphogenèse", href: "/fr/morphogenesis" },
      { label: "Laboratoire pédagogique", href: "/fr/lab" },
      { label: "Organisations", href: "/fr/organizations" },
    ],
  },
  {
    id: "evidence",
    labelEn: "Evidence",
    labelFr: "Preuves",
    hrefEn: "/evidence",
    hrefFr: "/fr/evidence",
    questionEn: "What supports a claim, and what remains open?",
    questionFr: "Qu'est-ce qui étaye une affirmation, et que reste-t-il ouvert ?",
    children: [
      { label: "Evidence ledger", href: "/evidence" },
      { label: "Benchmarks", href: "/benchmarks" },
      { label: "Recorded runs", href: "/runs" },
      { label: "Research program", href: "/research" },
    ],
    childrenFr: [
      { label: "Preuves", href: "/fr/evidence" },
      { label: "Benchmarks", href: "/fr/benchmarks" },
      { label: "Exécutions archivées", href: "/fr/runs" },
      { label: "Programme de recherche", href: "/fr/research" },
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

/** Explicit French summaries published by app/fr/[...slug]. Keep this list in
 * sync with the summary registry there so sitemap and language links never
 * advertise a French URL that resolves to a 404. Dynamic concept, topology,
 * and morphogenesis case routes are added by the sitemap from their registries.
 */
export const frenchSummaryRoutes = new Set([
  "/orchestrator",
  "/runtime",
  "/runtime/supervision",
  "/runtime/supervision/agents",
  "/runtime/supervision/workspaces",
  "/runtime/supervision/budgets",
  "/runtime/supervision/events",
  "/runtime/supervision/memory",
  "/runtime/supervision/evidence",
  "/workers",
  "/daemons",
  "/topologies",
  "/morphogenesis",
  "/organizations",
  "/research",
  "/concepts",
  "/systems",
  "/systems/organism",
  "/lab",
  "/lab/models",
  "/evidence",
]);

export function hasFrenchPage(path: string): boolean {
  return frenchFullRoutes.has(path) || frenchSummaryRoutes.has(path);
}

export function frenchStatus(path: string): TranslationStatus {
  const canonicalPath = path.replace(/^\/en(?=\/|$)/, "") || "/";
  return frenchFullRoutes.has(canonicalPath) ? "FULL" : "SUMMARY";
}

export function oppositeLocalePath(pathname: string): string {
  const isFr = pathname === "/fr" || pathname.startsWith("/fr/");
  if (isFr) {
    const englishPath = pathname.replace(/^\/fr(?=\/|$)/, "") || "/";
    return `/en${englishPath === "/" ? "" : englishPath}`;
  }
  const unprefixedPath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return unprefixedPath === "/" ? "/fr" : `/fr${unprefixedPath}`;
}
