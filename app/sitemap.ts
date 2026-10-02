import type { MetadataRoute } from "next";
import { topologies } from "@/components/topologies";
import { concepts } from "@/components/concepts";
import { siteUrl } from "@/components/site-config";

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

function withLanguages(route: string): MetadataRoute.Sitemap[number] {
  const url = `${siteUrl}${route || "/"}`;
  return {
    url,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/topologies/") ? 0.7 : 0.8,
    alternates: {
      languages: {
        en: url,
        fr: `${siteUrl}/fr${route === "" ? "" : route}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const conceptRoutes = concepts.map(({ slug }) => `/concepts/${slug}`);
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
    ...topologyRoutes,
    ...morphogenesisRoutes,
  ];
  const frenchShell: MetadataRoute.Sitemap[number] = {
    url: `${siteUrl}/fr`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    alternates: { languages: { en: `${siteUrl}/`, fr: `${siteUrl}/fr` } },
  };
  return [withLanguages(""), frenchShell, ...all.filter((r) => r !== "").map(withLanguages)];
}
