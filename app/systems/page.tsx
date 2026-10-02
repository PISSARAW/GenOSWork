import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { conceptFamilies } from "@/components/concept-catalog";
import { concepts } from "@/components/concepts";
import { SystemMap } from "@/components/system-maps";

export const metadata: Metadata = {
  title: "GenOS systems",
  description: "A map of the systems that organize GenOS concepts, runtime mechanisms, and evidence.",
  alternates: { canonical: "/en/systems", languages: { en: "/en/systems", fr: "/fr/systems" } },
};

const intentions = [
  { n: "LEARN", title: "What is GenOS?", body: "Mission, system map, orchestrator, concept atlas.", href: "/systems" },
  { n: "SYSTEM", title: "What is it made of?", body: "Runtime, supervision, workers, daemons, topologies.", href: "/runtime" },
  { n: "LAB", title: "Can I touch it?", body: "Simulations, recorded runs, live sandbox.", href: "/lab" },
  { n: "EVALUATION", title: "What works?", body: "Benchmarks, evidence ledger, recorded runs.", href: "/benchmarks" },
  { n: "RESEARCH", title: "What science?", body: "Foundations, models, open questions.", href: "/research" },
  { n: "DEVELOPERS", title: "How to build?", body: "Quickstart, API / MCP reference.", href: "/developers" },
];

export default function SystemsPage() {
  return (
    <div className="page-shell">
      <section className="page-hero section-wrap systems-hero">
        <Eyebrow>GENOS SYSTEMS · CONCEPT FAMILIES</Eyebrow>
        <h1>One runtime,<br /><em>connected systems.</em></h1>
        <p>GenOS concepts describe related parts of identity, cognition, evidence, memory, collective work, and runtime infrastructure. Browse the families, then follow their links into the atlas.</p>
      </section>
      <SystemMap />
      <section className="section-wrap systems-intentions" aria-label="Six ways to enter GenOS">
        {intentions.map((item) => (
          <article className="systems-intention" key={item.n}>
            <span>{item.n}</span>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
            <Link href={item.href}>Enter <b>→</b></Link>
          </article>
        ))}
      </section>
      <section className="section-wrap systems-grid" aria-label="GenOS concept families">
        {conceptFamilies.map((family, index) => {
          const count = concepts.filter((concept) => concept.familyId === family.id).length;
          return (
            <article className="systems-card" key={family.id}>
              <span>{String(index + 1).padStart(2, "0")} / SYSTEM · {String(count).padStart(2, "0")} CONCEPTS</span>
              <h2>{family.name}</h2>
              <p>{family.description}</p>
              <Link href={`/concepts#${family.id}`}>Explore this family <b>→</b></Link>
            </article>
          );
        })}
      </section>
      <section className="systems-map-note">
        <div className="section-wrap"><Eyebrow light>HOW TO READ THE MAP</Eyebrow><p>Family membership is an editorial navigation aid. Concepts can belong to more than one system through their related links; the grouping does not imply an automatic runtime dependency.</p><Link href="/concepts">Open the Concept Atlas →</Link></div>
      </section>
    </div>
  );
}
