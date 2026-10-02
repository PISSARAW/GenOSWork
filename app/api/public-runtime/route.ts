import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

type Scenario = "evidence-gate" | "budgeted-plan" | "quorum-review";
type RequestBody = { scenario?: unknown; evidence?: unknown; budget?: unknown; quorum?: unknown };

const windowMs = 60_000;
const maxRunsPerWindow = 8;
const rateWindows = new Map<string, { startedAt: number; count: number }>();

function boundedNumber(value: unknown, fallback: number, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
}

function jsonError(status: number, error: string) {
  return Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const now = Date.now();
  for (const [key, entry] of rateWindows) if (now - entry.startedAt >= windowMs) rateWindows.delete(key);
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = (forwarded || "unknown-client").slice(0, 100);
  if (!rateWindows.has(clientKey) && rateWindows.size >= 2_048) return jsonError(503, "Public quota capacity is temporarily full. Try again shortly.");
  const window = rateWindows.get(clientKey);
  if (!window || now - window.startedAt >= windowMs) rateWindows.set(clientKey, { startedAt: now, count: 0 });
  const activeWindow = rateWindows.get(clientKey)!;
  if (activeWindow.count >= maxRunsPerWindow) {
    return Response.json({ error: "Public quota reached. Try again in one minute." }, { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": String(Math.max(1, Math.ceil((windowMs - (now - activeWindow.startedAt)) / 1000))) } });
  }
  activeWindow.count += 1;

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 2_048) return jsonError(413, "Request exceeds the 2 KB limit.");
  const reader = request.body?.getReader();
  if (!reader) return jsonError(400, "Request body is required.");
  const chunks: Uint8Array[] = [];
  let byteLength = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    byteLength += value.byteLength;
    if (byteLength > 2_048) { await reader.cancel(); return jsonError(413, "Request exceeds the 2 KB limit."); }
    chunks.push(value);
  }
  const combined = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) { combined.set(chunk, offset); offset += chunk.byteLength; }
  const raw = new TextDecoder().decode(combined);
  let body: RequestBody;
  try { body = JSON.parse(raw) as RequestBody; } catch { return jsonError(400, "Request body must be valid JSON."); }
  const scenario = body.scenario as Scenario;
  if (!["evidence-gate", "budgeted-plan", "quorum-review"].includes(scenario)) return jsonError(400, "Choose a registered public scenario.");
  const evidence = Math.round(boundedNumber(body.evidence, 65, 0, 100));
  const budget = Math.round(boundedNumber(body.budget, 3, 1, 5));
  const quorum = boundedNumber(body.quorum, 0.6, 0.2, 1);
  const runId = `public-${randomUUID()}`;
  const createdAt = new Date(now).toISOString();
  const expiresAt = new Date(now + 10 * 60_000).toISOString();
  let verdict: string;
  let events: { sequence: number; phase: string; detail: string; state: "complete" | "held" | "rejected" }[];

  if (scenario === "evidence-gate") {
    verdict = evidence >= 60 ? "verified" : evidence >= 35 ? "held" : "rejected";
    events = [
      { sequence: 1, phase: "admit", detail: "Registered scenario accepted; no user code or external tools are available.", state: "complete" },
      { sequence: 2, phase: "observe", detail: `Evidence strength set to ${evidence}/100 for this teaching run.`, state: "complete" },
      { sequence: 3, phase: "evaluate", detail: "Compare evidence with the fixed teaching threshold of 60/100.", state: "complete" },
      { sequence: 4, phase: "verify", detail: verdict === "verified" ? "Threshold met in the model; this is not independent real-world verification." : verdict === "held" ? "Evidence is inconclusive; the modeled action is held." : "Evidence is below the model threshold; the modeled claim is rejected." , state: verdict === "verified" ? "complete" : verdict === "held" ? "held" : "rejected" },
    ];
  } else if (scenario === "budgeted-plan") {
    verdict = budget >= 4 ? "completed" : "budget-exhausted";
    const plan = ["inspect inputs", "compare candidates", "check constraints", "verify chosen result", "record receipt"];
    events = [
      { sequence: 1, phase: "admit", detail: "Registered scenario accepted; execution budget is capped at five steps.", state: "complete" },
      ...plan.slice(0, budget).map((step, index) => ({ sequence: index + 2, phase: step, detail: `Bounded teaching step ${index + 1} of ${budget}.`, state: "complete" as const })),
      { sequence: budget + 2, phase: "outcome", detail: verdict === "completed" ? "The modeled plan reached its verification step." : "The step budget ended before verification; no success is claimed.", state: verdict === "completed" ? "complete" : "held" },
    ];
  } else {
    const ballots = [true, true, false, true, false];
    const yes = ballots.filter(Boolean).length;
    const quorumMet = ballots.length >= Math.ceil(quorum * ballots.length);
    verdict = quorumMet && yes / ballots.length >= 0.6 ? "accepted" : "no-consensus";
    events = [
      { sequence: 1, phase: "admit", detail: "Five fixed teaching ballots loaded; no live agents were contacted.", state: "complete" },
      { sequence: 2, phase: "count", detail: `${yes} of ${ballots.length} ballots support the proposal.`, state: "complete" },
      { sequence: 3, phase: "quorum", detail: `Required quorum: ${Math.ceil(quorum * ballots.length)} of ${ballots.length}; received ${ballots.length}.`, state: quorumMet ? "complete" : "held" },
      { sequence: 4, phase: "outcome", detail: verdict === "accepted" ? "The fixed teaching policy accepts the proposal." : "The fixed teaching policy records no consensus.", state: verdict === "accepted" ? "complete" : "held" },
    ];
  }

  return Response.json({ runId, scenario, createdAt, expiresAt, verdict, quota: { limit: maxRunsPerWindow, windowSeconds: 60, remaining: maxRunsPerWindow - activeWindow.count }, events }, { headers: { "Cache-Control": "no-store" } });
}
