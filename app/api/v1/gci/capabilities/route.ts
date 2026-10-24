import { genosSourceCommit } from "@/components/product-evidence";

export const dynamic = "force-dynamic";

const REQUIRED_SETTINGS = [
  "GENOS_GCI_API_URL",
  "GENOS_GCI_API_TOKEN",
  "GENOS_GCI_ORGANIZATION_ID",
  "GENOS_GCI_PROJECT_ID",
] as const;

type GciExport = {
  schema: "genos.gci.capability/v1";
  capabilityId: string;
  version: string;
  implementationDigest: string;
  provider: { id: string; projectId?: string };
  maturity: "declared" | "integrated" | "verified";
  exportModes: Array<"linked" | "embedded" | "managed">;
  inputContract: Record<string, unknown>;
  outputContract: Record<string, unknown>;
  requiredAuthority: string[];
  dependencies: Array<{ capabilityId: string; version: string }>;
  constraints: Record<string, unknown>;
  sideEffects: string[];
  evidence: Array<Record<string, unknown>>;
  revocationPolicy: Record<string, unknown>;
};

export async function GET() {
  let settings: ReturnType<typeof readSettings>;
  try {
    settings = readSettings();
  } catch {
    return pilotError("GCI_PILOT_NOT_CONFIGURED", 503);
  }

  try {
    const response = await fetch(settings.catalogUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${settings.token}`,
        "X-Organization-Id": settings.organizationId,
        "X-Project-Id": settings.projectId,
        Accept: "application/json",
      },
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return pilotError("GCI_UPSTREAM_FAILURE", 502);
    const payload: unknown = await response.json();
    const exports = readExports(payload);
    return Response.json({
      schema: "genoswork.gci-readonly-catalog/v1",
      sourceCommit: genosSourceCommit,
      projectId: settings.projectId,
      capabilities: exports,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return pilotError("GCI_UPSTREAM_UNAVAILABLE", 502);
  }
}

function readSettings() {
  const values = REQUIRED_SETTINGS.map((key) => process.env[key]?.trim());
  if (values.some((value) => !value)) throw new Error("GCI pilot settings are incomplete");
  const [baseUrl, token, organizationId, projectId] = values as [string, string, string, string];
  const url = new URL(baseUrl);
  if (!secureOrigin(url)) throw new Error("GCI API origin must use HTTPS");
  url.pathname = "/api/gci/v1/capabilities";
  url.search = "";
  url.hash = "";
  return { catalogUrl: url.toString(), token, organizationId, projectId };
}

function secureOrigin(url: URL) {
  const localHost = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  return ["https:", ...(localHost ? ["http:"] : [])].includes(url.protocol)
    && !url.username && !url.password;
}

function readExports(payload: unknown): GciExport[] {
  if (!payload || typeof payload !== "object" || !Array.isArray((payload as { capabilities?: unknown }).capabilities)) {
    throw new Error("GCI catalog response is invalid");
  }
  return (payload as { capabilities: GciExport[] }).capabilities.map(publicExport);
}

function publicExport(entry: GciExport): GciExport {
  if (!isValidExport(entry)) {
    throw new Error("GCI export descriptor is invalid");
  }
  return {
    schema: entry.schema,
    capabilityId: entry.capabilityId,
    version: entry.version,
    implementationDigest: entry.implementationDigest,
    provider: entry.provider,
    maturity: entry.maturity,
    exportModes: entry.exportModes,
    inputContract: entry.inputContract,
    outputContract: entry.outputContract,
    requiredAuthority: entry.requiredAuthority,
    dependencies: entry.dependencies,
    constraints: entry.constraints,
    sideEffects: entry.sideEffects,
    evidence: entry.evidence,
    revocationPolicy: entry.revocationPolicy,
  };
}

function isValidExport(entry: GciExport) {
  return Boolean(entry && entry.schema === "genos.gci.capability/v1"
    && typeof entry.capabilityId === "string" && typeof entry.version === "string"
    && /^sha256:[a-f0-9]{64}$/.test(entry.implementationDigest)
    && typeof entry.provider?.id === "string" && Array.isArray(entry.exportModes)
    && Array.isArray(entry.requiredAuthority) && Array.isArray(entry.dependencies)
    && Array.isArray(entry.sideEffects) && Array.isArray(entry.evidence)
    && entry.inputContract && typeof entry.inputContract === "object"
    && entry.outputContract && typeof entry.outputContract === "object"
    && entry.constraints && typeof entry.constraints === "object"
    && entry.revocationPolicy && typeof entry.revocationPolicy === "object");
}

function pilotError(code: string, status: number) {
  return Response.json({ error: { code } }, { status, headers: { "Cache-Control": "no-store" } });
}
