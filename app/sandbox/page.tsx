import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { LiveSandbox } from "@/components/p3-explorers";

import { TruthBadge } from "@/components/truth-badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live GenOS sandbox",
  description: "Connect to a tenant-scoped GenOS runtime and run a supervised local orchestration mission.",
  alternates: { canonical: "/sandbox", languages: { en: "/sandbox", fr: "/fr/sandbox" } },
};

export default function SandboxPage() {
  return <div className="page-shell" lang="en">
    <section className="page-hero section-wrap p3-hero">
      <Eyebrow>LIVE GENOS · TWO WAYS TO RUN</Eyebrow>
      <div style={{ margin: "14px 0" }}><TruthBadge mode="LIVE" /></div>
      <h1>Try a scenario.<br /><em>Or connect your runtime.</em></h1>
      <p>Start with a guided teaching scenario in your browser, then inspect recorded runs — or connect a tenant-scoped GenOS endpoint and run a supervised mission on your own runtime.</p>
      <div className="p3-hero-links"><a href="/runs">Inspect recorded runs →</a><a href="/developers">Read developer docs →</a></div>
    </section>
    <section className="section-wrap p3-section" aria-labelledby="try-genos-title">
      <div className="p3-section-heading"><span className="p3-kicker">TRY GENOS · PUBLIC · NO CREDENTIAL</span><h2 id="try-genos-title">No runtime?<br /><em>Start here.</em></h2><p>A disposable public runtime with quotas, timeouts, and expiring artifacts does not exist yet. Until then, these guided paths need no secret and prove nothing about a live runtime.</p></div>
      <div className="journey-grid">
        <div className="journey-card"><span>SCENARIO A · SIMULATION</span><strong>Compare three strategies</strong><p>Change evidence, cost, and risk in the Trinity teaching model.</p><a href="/lab/models?model=trinity">Open Trinity simulation →</a></div>
        <div className="journey-card"><span>SCENARIO B · SIMULATION</span><strong>Weigh a judgment</strong><p>Move quorum and dissent in the Biocenosis teaching model.</p><a href="/lab/models?model=biocenose">Open Biocenosis simulation →</a></div>
        <div className="journey-card"><span>SCENARIO C · RECORDED</span><strong>Replay a real campaign</strong><p>Twelve missions, two accepted dispatches, zero verified — failures included.</p><a href="/runs">Replay the campaign →</a></div>
        <div className="journey-card"><span>SCENARIO D · EVIDENCE</span><strong>Read a result with limits</strong><p>Every score states its question, environment, and reproduction path.</p><a href="/benchmarks">Open the registry →</a></div>
      </div>
    </section>
    <section className="section-wrap p3-section" aria-labelledby="connect-runtime-title">
      <div className="p3-section-heading"><span className="p3-kicker">CONNECT YOUR RUNTIME · ADVANCED</span><h2 id="connect-runtime-title">Your runtime,<br /><em>your mission.</em></h2><p>Use an HTTPS GenOS endpoint and a short-lived, tenant-scoped access key with `mcp:execute_safe`. The page sends one foreground orchestration request to `genos_orchestrate` using the local executor. Prefer narrowly scoped credentials — never a production bearer token in browser code.</p></div>
    </section>
    <LiveSandbox />
  </div>;
}
