import { siteUrl, primaryNav, truthModes } from "@/components/site-config";
import { concepts } from "@/components/concepts";
import { topologies } from "@/components/topologies";
import { genosReviewedAt, genosSourceCommit, productClaims } from "@/components/product-evidence";

export const dynamic = "force-static";

export async function GET() {
  const absoluteEnglish = (path: string) =>
    `${siteUrl}/en${path === "/" ? "" : path}`;
  const lines = [
    `# GenOS Agent Runtime`,
    ``,
    `> Open-source AI agent runtime with versioned state, supervised execution and path-specific evidence gates. Capability maturity varies by mode and adapter.`,
    ``,
    `- Website: ${siteUrl}/en`,
    `- French overview: ${siteUrl}/fr`,
    `- Source repository: https://github.com/PISSARAW/GenOS`,
    `- Reviewed product contract: https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/docs/03-reference/contrat-produit-et-completude.md`,
    `- Source revision: ${genosSourceCommit} (reviewed ${genosReviewedAt})`,
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
    ...topologies.map((t) => `- ${t.name} [${t.implementation}]: ${siteUrl}/en/topologies/${t.slug} — ${t.summary}`),
    ``,
    `## Product claims (${productClaims.length})`,
    ...productClaims.map((claim) => `- ${claim.name} [${claim.status}; ${claim.evidenceLevel}]: ${claim.implementedSlice} Open: ${claim.missingWork}`),
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
