import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/eyebrow";
import { MorphologyGraphVisual } from "@/components/morphology-graph-visual";
import { morphogenesisCases } from "@/components/morphogenesis-cases";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return morphogenesisCases.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = morphogenesisCases.find((candidate) => candidate.slug === slug);
  if (!item) return { title: "Morphogenesis use case not found" };
  const localizedPath = `/en/morphogenesis/cases/${item.slug}`;
  return {
    title: item.title,
    description: item.summary,
    alternates: {
      canonical: localizedPath,
      languages: {
        en: localizedPath,
        fr: `/fr/morphogenesis/cases/${item.slug}`,
      },
    },
  };
}

export default async function MorphogenesisCasePage({ params }: Props) {
  const { slug } = await params;
  const index = morphogenesisCases.findIndex((candidate) => candidate.slug === slug);
  if (index < 0) notFound();
  const item = morphogenesisCases[index];
  const previous = morphogenesisCases[(index - 1 + morphogenesisCases.length) % morphogenesisCases.length];
  const next = morphogenesisCases[(index + 1) % morphogenesisCases.length];

  return <div className="page-shell morph-case-page">
    <section className="section-wrap morph-case-hero">
      <Link className="morph-back-link" href="/morphogenesis">← Morphogenesis · all cases</Link>
      <Eyebrow>{item.number} · USE CASE · MORPHOGENESIS</Eyebrow>
      <h1>{item.title.split(" ").slice(0, -1).join(" ")}<br /><em>{item.title.split(" ").slice(-1)}</em></h1>
      <p>{item.summary}</p>
      <div className="morph-operator-pills">{item.operators.map((operator) => <span key={operator}>{operator}</span>)}</div>
    </section>

    <section className="section-wrap morph-case-diagram"><MorphologyGraphVisual title={item.recipe} nodes={item.nodes} edges={item.edges} /></section>

    <section className="section-wrap morph-case-explainer"><article><Eyebrow>CONTEXT</Eyebrow><h2>When this graph<br /><em>is useful.</em></h2><p>{item.scenario}</p></article><article><Eyebrow>WHY THIS SHAPE</Eyebrow><h2>What the structure<br /><em>makes explicit.</em></h2><ul>{item.why.map((reason) => <li key={reason}>{reason}</li>)}</ul></article></section>

    <section className="section-wrap morph-case-boundary"><span className="morph-boundary-icon" aria-hidden="true">i</span><div><Eyebrow>CONTRACT AND LIMITS</Eyebrow><p>{item.boundary}</p><Link href="/topologies">Compare related topologies <span>→</span></Link></div></section>
    <nav className="section-wrap morph-case-nav" aria-label="Navigation between cases"><Link href={`/morphogenesis/cases/${previous.slug}`}><span>← PREVIOUS</span><strong>{previous.shortTitle}</strong></Link><Link href={`/morphogenesis/cases/${next.slug}`}><span>NEXT →</span><strong>{next.shortTitle}</strong></Link></nav>
  </div>;
}
