import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { LiveSandbox } from "@/components/p3-explorers";
import { PublicRuntime } from "@/components/public-runtime";

import { TruthBadge } from "@/components/truth-badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live GenOS sandbox",
  description: "Connect to a tenant-scoped GenOS runtime and run a supervised local orchestration mission.",
  alternates: { canonical: "/en/sandbox", languages: { en: "/en/sandbox", fr: "/fr/sandbox" } },
};

export default function SandboxPage() {
  return <div className="page-shell" lang="en">
    <section className="page-hero section-wrap p3-hero">
      <Eyebrow>PUBLIC SCENARIOS · RECORDED RUNS · YOUR RUNTIME</Eyebrow>
      <div style={{ margin: "14px 0" }}><TruthBadge mode="SIMULATION" /></div>
      <h1>Run a bounded scenario.<br /><em>Or connect GenOS.</em></h1>
      <p>Use the disposable public runtime for a deterministic teaching run, inspect a historical campaign, or connect a tenant-scoped GenOS endpoint for a supervised mission.</p>
      <div className="p3-hero-links"><a href="/runs">Inspect recorded runs →</a><a href="/developers">Read developer docs →</a></div>
    </section>
    <section className="section-wrap p3-section" aria-labelledby="try-genos-title">
      <div className="p3-section-heading"><span className="p3-kicker">PUBLIC · NO CREDENTIAL</span><h2 id="try-genos-title">Three bounded<br /><em>ways to explore.</em></h2><p>The public runtime below accepts only registered scenarios. These browser models are teaching simulations; recorded runs show historical evidence, and neither should be mistaken for a connected GenOS mission.</p></div>
      <div className="journey-grid">
        <div className="journey-card"><span>SCENARIO A · SIMULATION</span><strong>Compare three strategies</strong><p>Change evidence, cost, and risk in the Trinity teaching model.</p><a href="/lab/models?model=trinity">Open Trinity simulation →</a></div>
        <div className="journey-card"><span>SCENARIO B · SIMULATION</span><strong>Weigh a judgment</strong><p>Move quorum and dissent in the Biocenosis teaching model.</p><a href="/lab/models?model=biocenose">Open Biocenosis simulation →</a></div>
        <div className="journey-card"><span>SCENARIO C · RECORDED</span><strong>Replay a real campaign</strong><p>Twelve missions, two accepted dispatches, zero verified — failures included.</p><a href="/runs">Replay the campaign →</a></div>
        <div className="journey-card"><span>SCENARIO D · EVIDENCE</span><strong>Read a result with limits</strong><p>Every score states its question, environment, and reproduction path.</p><a href="/benchmarks">Open the registry →</a></div>
      </div>
    </section>
    <PublicRuntime />
    <section className="section-wrap p3-section" aria-labelledby="connect-runtime-title">
      <div className="p3-section-heading"><span className="p3-kicker">CONNECT YOUR RUNTIME · ADVANCED</span><h2 id="connect-runtime-title">Your runtime,<br /><em>your mission.</em></h2><p>Use an HTTPS GenOS endpoint and a short-lived, tenant-scoped access key with `mcp:execute_safe`. The page sends one foreground orchestration request to `genos_orchestrate` using the local executor. Prefer narrowly scoped credentials — never a production bearer token in browser code.</p></div>
    </section>
    <LiveSandbox />
  </div>;
}
