import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { P2ModelLab } from "@/components/p2-model-lab";

export const metadata: Metadata = {
  title: "GenOS Simulation Studio",
  description: "Adjust explicit parameters in local teaching models for GenOS topologies and concepts.",
  alternates: { canonical: "/lab/models" },
};

export default async function ModelLabPage({ searchParams }: { searchParams: Promise<{ model?: string }> }) {
  const { model } = await searchParams;
  return <div className="page-shell lab-model-page">
    <section className="page-hero section-wrap lab-model-hero">
      <Eyebrow>GENOS LAB · P2 MODELS</Eyebrow>
      <h1>Change a signal.<br /><em>See the model respond.</em></h1>
      <p>Explore eight topology models and seven concept models with bounded, inspectable inputs. Each result is computed in your browser and labeled as a teaching simulation.</p>
    </section>
    <P2ModelLab initialModelId={model} />
    <section className="section-wrap model-reading-note"><span className="atlas-kicker">READ THE OUTPUT</span><p>These models help explain policies and relationships. They do not call GenOS services or provide runtime evidence. Follow each concept or topology profile for its actual implementation status, source, and limitations.</p></section>
  </div>;
}
