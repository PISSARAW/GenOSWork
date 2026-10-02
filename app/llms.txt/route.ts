import { siteUrl, primaryNav, truthModes } from "@/components/site-config";
import { concepts } from "@/components/concepts";
import { topologies } from "@/components/topologies";

export const dynamic = "force-static";

export async function GET() {
  const lines = [
    `# GenOS Agent Runtime — public knowledge interface`,
    ``,
    `> Understand the system. Change the model. Observe a run. Inspect the evidence. Reproduce the result.`,
    ``,
    `Site: ${siteUrl}`,
    `Source: https://github.com/PISSARAW/GenOS`,
    ``,
    `## Intentions (6)`,
    ...primaryNav.flatMap((entry) => [
      `- ${entry.labelEn} (${entry.hrefEn}) — ${entry.questionEn}`,
      ...entry.children.map((c) => `  - ${c.label}: ${c.href}`),
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
    `- ${siteUrl}/api/v1/evidence`,
    `- ${siteUrl}/api/v1/capabilities`,
    `- ${siteUrl}/api/v1/releases`,
    ``,
    `## Concepts (${concepts.length})`,
    ...concepts.map((c) => `- ${c.title}: /concepts/${c.slug} — ${c.intro}`),
    ``,
    `## Topologies (${topologies.length})`,
    ...topologies.map((t) => `- ${t.name}: /topologies/${t.slug}`),
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
