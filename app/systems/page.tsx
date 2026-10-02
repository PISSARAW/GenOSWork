import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { conceptFamilies } from "@/components/concept-catalog";
import { concepts } from "@/components/concepts";

export const metadata: Metadata = { title: "GenOS systems", description: "A map of the systems that organize GenOS concepts, runtime mechanisms, and evidence.", alternates: { canonical: "/systems" } };

export default function SystemsPage() {
  return <div className="page-shell">
    <section className="page-hero section-wrap systems-hero"><Eyebrow>GENOS SYSTEMS · CONCEPT FAMILIES</Eyebrow><h1>One runtime,<br /><em>connected systems.</em></h1><p>GenOS concepts describe related parts of identity, cognition, evidence, memory, collective work, and runtime infrastructure. Browse the families, then follow their links into the atlas.</p></section>
    <section className="section-wrap systems-grid" aria-label="GenOS concept families">
      {conceptFamilies.map((family, index) => <article className="systems-card" key={family.id}>
        <span>{String(index + 1).padStart(2, "0")} / SYSTEM · {String(concepts.filter((concept) => concept.familyId === family.id).length).padStart(2, "0")} CONCEPTS</span><h2>{family.name}</h2><p>{family.description}</p><Link href={`/concepts#${family.id}`}>Explore this family <b>→</b></Link>
      </article>)}
    </section>
    <section className="systems-map-note"><div className="section-wrap"><Eyebrow light>HOW TO READ THE MAP</Eyebrow><p>Family membership is an editorial navigation aid. Concepts can belong to more than one system through their related links; the grouping does not imply an automatic runtime dependency.</p><Link href="/concepts">Open the Concept Atlas →</Link></div></section>
  </div>;
}
