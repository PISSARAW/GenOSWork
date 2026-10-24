import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { genosReviewedAt, genosSource, genosSourceCommit } from "@/components/product-evidence";
import { productEvolutions } from "@/components/product-evolutions";

const copy = {
  en: {
    eyebrow: "GENOS EVOLUTIONS · 6–24 OCTOBER 2026",
    title: <>What changed.<br /><em>What it proves.</em></>,
    intro: "A source-backed review of the capabilities added or materially strengthened since the previous site baseline. Every item separates the working slice from what remains unqualified.",
    source: "REVIEWED SOURCE",
    evidence: "Observed evidence",
    limit: "Boundary",
    open: "Open the GenOS source",
    ledger: "See the complete evidence ledger",
    methodTitle: "A release note is not a product claim.",
    methodBody: "This page follows the published origin/v3 revision, not uncommitted local work. Counts and statuses are scoped to the cited tests and contracts. A passing suite, persisted receipt or successful transport does not establish arbitrary mission correctness.",
  },
  fr: {
    eyebrow: "ÉVOLUTIONS GENOS · 6–24 OCTOBRE 2026",
    title: <>Ce qui change.<br /><em>Ce que cela prouve.</em></>,
    intro: "Une revue sourcée des capacités ajoutées ou nettement renforcées depuis la précédente base du site. Chaque évolution sépare la tranche fonctionnelle de ce qui reste non qualifié.",
    source: "SOURCE EXAMINÉE",
    evidence: "Preuve observée",
    limit: "Frontière",
    open: "Ouvrir la source GenOS",
    ledger: "Voir le registre complet des preuves",
    methodTitle: "Une note de version n’est pas une preuve produit.",
    methodBody: "Cette page suit la révision publiée origin/v3, pas les travaux locaux non commités. Les nombres et statuts restent bornés aux tests et contrats cités. Une suite réussie, un reçu persisté ou un transport correct ne prouvent pas la justesse d’une mission libre.",
  },
} as const;

export function EvolutionsPage({ locale }: { locale: "en" | "fr" }) {
  const c = copy[locale];
  const prefix = locale === "fr" ? "/fr" : "";

  return <div className="updates-page" lang={locale}>
    <section className="updates-hero section-wrap">
      <div>
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
      </div>
      <aside aria-label={c.source}>
        <span>{c.source}</span>
        <strong>{genosSourceCommit.slice(0, 12)}</strong>
        <small>{genosReviewedAt} · origin/v3</small>
      </aside>
    </section>

    <section className="updates-grid section-wrap" aria-label={locale === "fr" ? "Évolutions produit" : "Product evolutions"}>
      {productEvolutions.map((item, index) => <article className="updates-card" key={item.id}>
        <div className="updates-card-head"><span>0{index + 1}</span><span className={`status-chip status-${item.status}`}><i /> {item.status.toUpperCase()}</span></div>
        <h2>{item.title[locale]}</h2>
        <p className="updates-summary">{item.summary[locale]}</p>
        <dl>
          <div><dt>{c.evidence}</dt><dd>{item.evidence[locale]}</dd></div>
          <div><dt>{c.limit}</dt><dd>{item.limit[locale]}</dd></div>
        </dl>
        <a href={genosSource(item.sourcePath)} target="_blank" rel="noreferrer">{c.open} <span aria-hidden="true">↗</span></a>
      </article>)}
    </section>

    <section className="updates-method section-wrap">
      <div><Eyebrow>{locale === "fr" ? "MÉTHODE" : "METHOD"}</Eyebrow><h2>{c.methodTitle}</h2></div>
      <div><p>{c.methodBody}</p><Link href={`${prefix}/evidence`}>{c.ledger} <span aria-hidden="true">→</span></Link></div>
    </section>
  </div>;
}
