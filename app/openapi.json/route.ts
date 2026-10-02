import { siteUrl } from "@/components/site-config";

export const dynamic = "force-static";

const spec = {
  openapi: "3.0.3",
  info: {
    title: "GenOSWork knowledge API",
    version: "1.0.0",
    description:
      "Machine-readable GenOS concepts, topologies, evidence, benchmarks, capabilities, and releases. Complements the HTML pages; it does not replace them.",
  },
  servers: [{ url: siteUrl }],
  paths: {
    "/api/v1/concepts": { get: { summary: "List registered concepts" } },
    "/api/v1/concepts/{slug}": { get: { summary: "Get one concept" } },
    "/api/v1/topologies": { get: { summary: "List the eight topologies" } },
    "/api/v1/benchmarks": { get: { summary: "List evaluations and protocols" } },
    "/api/v1/evidence": { get: { summary: "Implementation ledger" } },
    "/api/v1/capabilities": { get: { summary: "Runtime capability status" } },
    "/api/v1/releases": { get: { summary: "Pinned source commit" } },
  },
};

export async function GET() {
  return Response.json(spec);
}
