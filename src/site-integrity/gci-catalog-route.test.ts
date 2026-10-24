import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "../../app/api/v1/gci/capabilities/route";

const descriptor = {
  schema: "genos.gci.capability/v1",
  capabilityId: "genos.catalog.inspect",
  version: "1.0.0",
  implementationDigest: `sha256:${"a".repeat(64)}`,
  provider: { id: "PISSARAW/GenOS", projectId: "genos-core" },
  maturity: "verified",
  exportModes: ["linked"],
  inputContract: { type: "object" },
  outputContract: { type: "object" },
  requiredAuthority: ["catalog:read"],
  dependencies: [],
  constraints: {},
  sideEffects: [],
  evidence: [{ kind: "test", ref: "evidence://catalog" }],
  revocationPolicy: { revocable: true },
};

describe("GenOS GCI read-only catalog pilot", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("fails closed if the GCI tenant is not configured", async () => {
    vi.stubEnv("GENOS_GCI_API_URL", "");
    vi.stubEnv("GENOS_GCI_API_TOKEN", "");
    vi.stubEnv("GENOS_GCI_ORGANIZATION_ID", "");
    vi.stubEnv("GENOS_GCI_PROJECT_ID", "");
    const response = await GET();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: { code: "GCI_PILOT_NOT_CONFIGURED" } });
  });

  it("reads only the scoped export catalog and returns descriptors without GCI internals", async () => {
    configurePilot();
    const fetcher = vi.fn().mockResolvedValue(Response.json({ capabilities: [{ ...descriptor, access: { level: "internal" } }] }));
    vi.stubGlobal("fetch", fetcher);

    const response = await GET();
    const body = await response.json();
    const [url, options] = fetcher.mock.calls[0];

    expect(response.status).toBe(200);
    expect(body.schema).toBe("genoswork.gci-readonly-catalog/v1");
    expect(body.sourceCommit).toMatch(/^[a-f0-9]{40}$/);
    expect(body.projectId).toBe("genoswork-production");
    expect(body.capabilities).toEqual([descriptor]);
    expect(url).toBe("https://gci.example.test/api/gci/v1/capabilities");
    expect(options.method).toBe("GET");
    expect(options.cache).toBe("no-store");
    expect(options.redirect).toBe("error");
    expect(options.headers).toMatchObject({
      Authorization: "Bearer pilot-token",
      "X-Organization-Id": "org-pilot",
      "X-Project-Id": "genoswork-production",
    });
    expect(JSON.stringify(body)).not.toContain("pilot-token");
  });

  it("does not disclose upstream authentication or payload errors", async () => {
    configurePilot();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ message: "private" }, { status: 403 })));

    const response = await GET();

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: { code: "GCI_UPSTREAM_FAILURE" } });
  });
});

function configurePilot() {
  vi.stubEnv("GENOS_GCI_API_URL", "https://gci.example.test/ignored/path");
  vi.stubEnv("GENOS_GCI_API_TOKEN", "pilot-token");
  vi.stubEnv("GENOS_GCI_ORGANIZATION_ID", "org-pilot");
  vi.stubEnv("GENOS_GCI_PROJECT_ID", "genoswork-production");
}
