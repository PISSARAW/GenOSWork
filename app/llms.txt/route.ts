import { siteUrl, primaryNav, truthModes } from "@/components/site-config";
import { concepts } from "@/components/concepts";
import { topologies } from "@/components/topologies";

export const dynamic = "force-static";

export async function GET() {
  const absoluteEnglish = (path: string) =>
    `${siteUrl}/en${path === "/" ? "" : path}`;
  const lines = [
    `# GenOS Agent Runtime`,
    ``,
    `> Open-source agent runtime and durable work record. Review decisions, changes, execution context, and evidence to understand and resume technical work.`,
    ``,
    `- Website: ${siteUrl}/en`,
    `- French overview: ${siteUrl}/fr`,
    `- Source repository: https://github.com/PISSARAW/GenOS`,
    `- Sitemap: ${siteUrl}/sitemap.xml`,
    ``,
    `## Start here`,
    `- English overview: ${siteUrl}/en`,
    `- French overview: ${siteUrl}/fr`,
    `- Runtime: ${siteUrl}/en/runtime`,
    `- Recorded runs: ${siteUrl}/en/runs`,
    `- Evidence ledger: ${siteUrl}/en/evidence`,
    `- Developer quickstart: ${siteUrl}/en/developers`,
    `- REST and MCP API reference: ${siteUrl}/en/api-mcp`,
    ``,
    `## Site sections`,
    ...primaryNav.flatMap((entry) => [
      `- ${entry.labelEn}: ${entry.questionEn} — ${absoluteEnglish(entry.hrefEn)}`,
      ...entry.children.map((c) => `  - ${c.label}: ${absoluteEnglish(c.href)}`),
    ]),
    ``,
    `## French pages`,
    ...primaryNav.flatMap((entry) => [
      `- ${entry.labelFr}: ${siteUrl}${entry.hrefFr}`,
      ...(entry.childrenFr ?? []).map((child) => `  - ${child.label}: ${siteUrl}${child.href}`),
    ]),
    ``,
    `## Truth modes`,
    ...Object.entries(truthModes).map(([k, v]) => `- ${k}: ${v.description}`),
    ``,
    `## Knowledge surfaces (machine-readable)`,
    `- ${siteUrl}/openapi.json`,
    `- ${siteUrl}/api/v1/concepts`,
    `- ${siteUrl}/api/v1/topologies`,
    `- ${siteUrl}/api/v1/benchmarks`,
    `- ${siteUrl}/api/v1/experiments`,
    `- ${siteUrl}/api/v1/research`,
    `- ${siteUrl}/api/v1/evidence`,
    `- ${siteUrl}/api/v1/capabilities`,
    `- ${siteUrl}/api/v1/releases`,
    ``,
    `## Concepts (${concepts.length})`,
    ...concepts.map((c) => `- ${c.title}: ${siteUrl}/en/concepts/${c.slug} — ${c.intro}`),
    ``,
    `## Topologies (${topologies.length})`,
    ...topologies.map((t) => `- ${t.name}: ${siteUrl}/en/topologies/${t.slug} — ${t.summary}`),
    ``,
    `## Rules`,
    `- A simulation is not a run. A run is not a benchmark. A benchmark is not a general proof.`,
    `- Implementation, integration, and evidence are three separate axes.`,
    `- FR pages without FULL status are SUMMARY pages linking to the full EN page.`,
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
