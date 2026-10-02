import { siteUrl } from "@/components/site-config";

export const dynamic = "force-static";

const jsonResponse = (schema: string) => ({
  description: "Successful response",
  content: { "application/json": { schema: { $ref: `#/components/schemas/${schema}` } } },
});

const spec = {
  openapi: "3.0.3",
  info: {
    title: "GenOSWork knowledge API",
    version: "1.1.0",
    description: "Machine-readable concepts, topologies, evidence, research, evaluation protocols, raw artifacts, capabilities and source pins. A simulation is not a run; a run is not a benchmark.",
  },
  servers: [{ url: siteUrl }],
  paths: {
    "/api/v1/concepts": { get: { operationId: "listConcepts", summary: "List concepts and their science, model, limits and source links", responses: { "200": jsonResponse("ConceptList") } } },
    "/api/v1/concepts/{slug}": { get: { operationId: "getConcept", summary: "Get a concept dossier", parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }], responses: { "200": jsonResponse("Concept"), "404": { description: "Concept not found" } } } },
    "/api/v1/topologies": { get: { operationId: "listTopologies", summary: "List the registered topologies and teaching models", responses: { "200": jsonResponse("TopologyList") } } },
    "/api/v1/benchmarks": { get: { operationId: "listBenchmarks", summary: "List published evaluations and missing campaigns", responses: { "200": jsonResponse("BenchmarkRegistry") } } },
    "/api/v1/experiments": { get: { operationId: "listExperiments", summary: "Get reproduction commands, summaries, and raw experiment artifacts", responses: { "200": jsonResponse("ExperimentRegistry") } } },
    "/api/v1/research": { get: { operationId: "getResearchMap", summary: "Get research questions, status labels, and primary references", responses: { "200": jsonResponse("ResearchMap") } } },
    "/api/v1/evidence": { get: { operationId: "getEvidenceLedger", summary: "Get implementation status and source commit", responses: { "200": jsonResponse("EvidenceLedger") } } },
    "/api/v1/capabilities": { get: { operationId: "getCapabilities", summary: "Get runtime capability status", responses: { "200": jsonResponse("CapabilityLedger") } } },
    "/api/v1/releases": { get: { operationId: "getSourcePin", summary: "Get the pinned GenOS source revision", responses: { "200": jsonResponse("SourcePin") } } },
    "/api/public-runtime": { post: { operationId: "runPublicScenario", summary: "Run a credential-free bounded teaching scenario", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/PublicRunRequest" } } } }, responses: { "200": jsonResponse("PublicRunReceipt"), "400": { description: "Invalid or unregistered scenario" }, "413": { description: "Request exceeds 2 KB" }, "429": { description: "Process-local public quota reached" }, "503": { description: "In-memory quota capacity reached" } } } },
  },
  components: {
    schemas: {
      ConceptList: { type: "object", required: ["version", "count", "concepts"], properties: { version: { type: "string" }, count: { type: "integer" }, sourceCommit: { type: "string" }, concepts: { type: "array", items: { $ref: "#/components/schemas/Concept" } } } },
      Concept: { type: "object", required: ["id", "title", "definition", "routes"], properties: { id: { type: "string" }, title: { type: "string" }, definition: { type: "string" }, family: { type: "string" }, implementation: { type: "string" }, integration: { type: "string" }, evidence: { type: "string" }, science: { type: "string", nullable: true }, mathematicalModel: { type: "string", nullable: true }, useCases: { type: "array", items: { type: "string" } }, failureModes: { type: "array", items: { type: "string" } }, codeSources: { type: "array", items: { type: "object", properties: { path: { type: "string" }, url: { type: "string", format: "uri" } } } }, primaryReferences: { type: "array", items: { type: "object", additionalProperties: true } }, related: { type: "array", items: { type: "string" } }, routes: { type: "object", properties: { en: { type: "string" }, fr: { type: "string" } } }, sourceCommit: { type: "string" } } },
      TopologyList: { type: "object", required: ["version", "count", "topologies"], properties: { version: { type: "string" }, count: { type: "integer" }, topologies: { type: "array", items: { type: "object", additionalProperties: true } } } },
      BenchmarkRegistry: { type: "object", required: ["version", "evaluations"], properties: { version: { type: "string" }, evaluations: { type: "array", items: { type: "object", additionalProperties: true } }, protocolsWithoutCampaign: { type: "array", items: { type: "string" } } } },
      ExperimentRegistry: { type: "object", required: ["version", "evaluations"], properties: { version: { type: "string" }, principle: { type: "string" }, evaluations: { type: "array", items: { type: "object", additionalProperties: true } } } },
      ResearchMap: { type: "object", required: ["version", "sections", "primaryReferences"], properties: { version: { type: "string" }, sourceCommit: { type: "string" }, qualification: { type: "string" }, sections: { type: "array", items: { type: "object", additionalProperties: true } }, primaryReferences: { type: "array", items: { type: "object", additionalProperties: true } } } },
      EvidenceLedger: { type: "object", additionalProperties: true },
      CapabilityLedger: { type: "object", additionalProperties: true },
      SourcePin: { type: "object", required: ["version", "sourceCommit", "source"], properties: { version: { type: "string" }, sourceCommit: { type: "string" }, source: { type: "string", format: "uri" } } },
      PublicRunRequest: { type: "object", required: ["scenario"], properties: { scenario: { type: "string", enum: ["evidence-gate", "budgeted-plan", "quorum-review"] }, evidence: { type: "integer", minimum: 0, maximum: 100 }, budget: { type: "integer", minimum: 1, maximum: 5 }, quorum: { type: "number", minimum: 0.2, maximum: 1 } } },
      PublicRunReceipt: { type: "object", required: ["runId", "scenario", "createdAt", "expiresAt", "verdict", "events"], properties: { runId: { type: "string" }, scenario: { type: "string" }, createdAt: { type: "string", format: "date-time" }, expiresAt: { type: "string", format: "date-time" }, verdict: { type: "string" }, quota: { type: "object", additionalProperties: true }, events: { type: "array", items: { type: "object", additionalProperties: true } } } },
    },
  },
};

export async function GET() {
  return Response.json(spec);
}
