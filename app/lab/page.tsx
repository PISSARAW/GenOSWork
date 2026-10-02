import type { Metadata } from "next";
import Link from "next/link";
import { MorphogenesisLab } from "@/components/morphogenesis-lab";

export const metadata: Metadata = { title: "Morphogenesis Lab", description: "Explore an illustrative, local-only visualization of how an agent mission can branch into candidate work and evidence review.", alternates: { canonical: "/lab" } };

export default function LabPage() {
  return <div className="lab-page"><MorphogenesisLab />
    <section className="lab-model-callout section-wrap" aria-labelledby="lab-models-title">
      <div><span className="atlas-kicker">INTERACTIVE MODELS</span><h2 id="lab-models-title">Explore system behavior.</h2><p>Adjust policy signals across eight topology models and seven concept models. Each one is a labeled browser simulation.</p></div>
      <Link href="/lab/models">Open the Simulation Studio <b aria-hidden="true">→</b></Link>
    </section>
  </div>;
}
