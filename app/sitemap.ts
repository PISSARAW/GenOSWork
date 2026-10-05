import type { MetadataRoute } from "next";
import { topologies } from "@/components/topologies";
import { concepts } from "@/components/concepts";
import { capabilityPages } from "@/components/capability-pages";
import { hasFrenchPage, siteUrl } from "@/components/site-config";

const baseRoutes = [
  "",
  "/runtime",
  "/orchestrator",
  "/workers",
  "/daemons",
  "/topologies",
  "/morphogenesis",
  "/organizations",
  "/research",
  "/ecosystem",
  "/concepts",
  "/systems",
  "/systems/organism",
  "/benchmarks",
  "/runs",
  "/sandbox",
  "/api-mcp",
  "/lab",
  "/lab/models",
  "/evidence",
  "/capabilities",
  "/developers",
];

const supervisionRoutes = [
  "/runtime/supervision",
  "/runtime/supervision/agents",
  "/runtime/supervision/workspaces",
  "/runtime/supervision/budgets",
  "/runtime/supervision/events",
  "/runtime/supervision/memory",
  "/runtime/supervision/evidence",
];

function withLanguages(route: string): MetadataRoute.Sitemap[number][] {
  const localizedRoute = `/en${route}`;
  const englishUrl = `${siteUrl}${localizedRoute || "/en"}`;
  const hasLocalizedPage =
    hasFrenchPage(route || "/") ||
    route.startsWith("/concepts/") ||
    route.startsWith("/topologies/") ||
    route.startsWith("/morphogenesis/cases/") ||
    route.startsWith("/capabilities/");
  const languages = hasLocalizedPage
    ? { en: englishUrl, fr: `${siteUrl}/fr${route}` }
    : undefined;
  const englishEntry: MetadataRoute.Sitemap[number] = {
    url: englishUrl,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/topologies/") ? 0.7 : 0.8,
    ...(languages ? { alternates: { languages } } : {}),
  };
  if (!languages) return [englishEntry];

  return [
    englishEntry,
    {
      url: languages.fr,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 0.9 : 0.7,
      alternates: { languages },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const conceptRoutes = concepts.map(({ slug }) => `/concepts/${slug}`);
  const capabilityRoutes = capabilityPages.map(({ slug }) => `/capabilities/${slug}`);
  const topologyRoutes = topologies.map(({ slug }) => `/topologies/${slug}`);
  const morphogenesisRoutes = [
    "/revue-de-changement",
    "/migration-de-donnees",
    "/analyse-imbriquee",
    "/promotion-sous-gate",
  ].map((slug) => `/morphogenesis/cases${slug}`);
  const all = [
    ...baseRoutes,
    ...supervisionRoutes,
    ...conceptRoutes,
    ...capabilityRoutes,
    ...topologyRoutes,
    ...morphogenesisRoutes,
  ];
  return all.flatMap(withLanguages);
}
