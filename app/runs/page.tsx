import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { RecordedRunExplorer } from "@/components/p3-explorers";

export const metadata: Metadata = {
  title: "Recorded GenOS runs",
  description: "Inspect a published historical GenOS topology campaign, mission by mission, with source provenance and verification failures.",
  alternates: { canonical: "/runs" },
};

export default function RunsPage() {
  return <div className="page-shell" lang="en">
    <section className="page-hero section-wrap p3-hero">
      <Eyebrow>RECORDED RUNS · EXECUTION EVIDENCE</Eyebrow>
      <h1>Runs as they<br /><em>actually ended.</em></h1>
      <p>This page replays a historical local campaign from GenOS artifacts. It preserves failed checks, distinguishes accepted dispatches from completed work, and identifies the source commit.</p>
      <div className="p3-hero-links"><a href="/benchmarks">Explore benchmark results →</a><a href="/sandbox">Connect a live runtime →</a></div>
    </section>
    <RecordedRunExplorer />
  </div>;
}
