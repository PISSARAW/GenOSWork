import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { OrganismMap } from "@/components/system-maps";

export const metadata: Metadata = {
  title: "Biological Organism Map",
  description: "Explore GenOS biology-inspired software concepts alongside explicit limits of each analogy.",
  alternates: { canonical: "/en/systems/organism" },
};

export default function OrganismMapPage() {
  return <div className="page-shell">
    <section className="page-hero section-wrap systems-hero">
      <Link className="back-link" href="/systems">← SYSTEM MAP</Link>
      <Eyebrow>GENOS SYSTEMS · BIOLOGY-INSPIRED DESIGN</Eyebrow>
      <h1>Organism map.<br /><em>Software, with boundaries.</em></h1>
      <p>Use biological ideas as a guide to system design while keeping the software mechanism and the limit of each analogy visible.</p>
    </section>
    <OrganismMap />
  </div>;
}
