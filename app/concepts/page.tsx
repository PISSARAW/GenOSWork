import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { ConceptAtlas } from "@/components/concept-atlas";
import { concepts } from "@/components/concepts";

export const metadata: Metadata = {
  title: "GenOS Concept Atlas",
  description: "Explore the canonical GenOS concepts by system, implementation status, biological inspiration, mathematical model, and evidence.",
  alternates: { canonical: "/en/concepts" },
};

export default function ConceptsPage() {
  return (
    <div className="page-shell" lang="en">
      <section className="page-hero section-wrap concepts-hero">
        <Eyebrow>CONCEPT ATLAS · {concepts.length} REGISTERED CONCEPTS</Eyebrow>
        <h1>Explore GenOS<br /><em>as a system.</em></h1>
        <p>Browse the runtime by the systems its concepts belong to. Each entry links to the canonical GenOS source and distinguishes implementation, integration, and evidence status.</p>
      </section>
      <ConceptAtlas />
    </div>
  );
}
