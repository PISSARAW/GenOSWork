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
      <Eyebrow>LIVE GENOS · YOUR RUNTIME</Eyebrow>
      <div style={{ margin: "14px 0" }}><TruthBadge mode="LIVE" /></div>
      <h1>Connect GenOS<br /><em>and try a mission.</em></h1>
      <p>Use an HTTPS GenOS endpoint and a tenant-scoped access key with `mcp:execute_safe`. The page sends one foreground orchestration request to `genos_orchestrate` using the local executor. Prefer short-lived, narrowly scoped credentials — never a production bearer token in browser code.</p>
      <div className="p3-hero-links"><a href="/runs">Inspect recorded runs →</a><a href="/developers">Read developer docs →</a></div>
    </section>
    <LiveSandbox />
  </div>;
}
