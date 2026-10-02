import type { MetadataRoute } from "next";
import { topologies } from "@/components/topologies";
import { concepts } from "@/components/concepts";

const siteUrl = "https://genoswork.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/runtime", "/orchestrator", "/workers", "/daemons", "/topologies", "/morphogenesis", "/organizations", "/research", "/concepts", "/systems", "/systems/organism", "/benchmarks", "/runs", "/sandbox", "/api-mcp", "/lab", "/lab/models", "/evidence", "/developers", "/fr", "/fr/developers", "/fr/api-mcp", "/fr/benchmarks", "/fr/runs", "/fr/sandbox"];
  const supervisionRoutes = ["/runtime/supervision", "/runtime/supervision/agents", "/runtime/supervision/workspaces", "/runtime/supervision/budgets", "/runtime/supervision/events", "/runtime/supervision/memory", "/runtime/supervision/evidence"];
  const conceptRoutes = concepts.map(({ slug }) => `/concepts/${slug}`);
  const topologyRoutes = topologies.map(({ slug }) => `/topologies/${slug}`);
  const morphogenesisRoutes = ["/revue-de-changement", "/migration-de-donnees", "/analyse-imbriquee", "/promotion-sous-gate"].map((slug) => `/morphogenesis/cases${slug}`);
  const frenchRoutes = ["/fr/orchestrator", "/fr/runtime", "/fr/workers", "/fr/daemons", "/fr/topologies", "/fr/morphogenesis", "/fr/organizations", "/fr/research", "/fr/concepts", "/fr/systems", "/fr/systems/organism", "/fr/lab", "/fr/lab/models", "/fr/evidence", ...supervisionRoutes.map((route) => `/fr${route}`), ...conceptRoutes.map((route) => `/fr${route}`), ...topologyRoutes.map((route) => `/fr${route}`), ...morphogenesisRoutes.map((route) => `/fr${route}`)];
  return [...routes, ...supervisionRoutes, ...conceptRoutes, ...topologyRoutes, ...morphogenesisRoutes, ...frenchRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/topologies/") ? 0.7 : 0.8,
  }));
}
