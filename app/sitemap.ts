import type { MetadataRoute } from "next";
import { topologies } from "@/components/topologies";
import { concepts } from "@/components/concepts";

const siteUrl = "https://genoswork.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/runtime", "/daemons", "/topologies", "/lab", "/evidence", "/developers"];
  const conceptRoutes = ["/concepts", ...concepts.map(({ slug }) => `/concepts/${slug}`)];
  const supervisionRoutes = ["/runtime/supervision", "/runtime/supervision/agents", "/runtime/supervision/workspaces", "/runtime/supervision/budgets", "/runtime/supervision/events", "/runtime/supervision/memory", "/runtime/supervision/evidence"];
  const topologyRoutes = topologies.map(({ slug }) => `/topologies/${slug}`);
  return [...routes, ...conceptRoutes, ...topologyRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/topologies/") ? 0.7 : 0.8,
  }));
}