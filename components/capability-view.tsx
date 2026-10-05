import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { capabilityPages, type CapabilityPage } from "@/components/capability-pages";
import { genosReviewedAt, genosSource, productClaims } from "@/components/product-evidence";

type Locale = "en" | "fr";

const labels = {
  en: {
    back: "All five capabilities", status: "PARTIAL · REVIEWED", purpose: "The problem", mechanism: "How the mechanism works",
    connected: "Connected in GenOS", open: "Still open", example: "Example", evaluation: "How to test it",
    boundary: "Boundary", source: "Read the GenOS contract", code: "Inspect the runtime code", next: "Explore another capability",
    intro: "Five cross-cutting mechanisms for experimentation, recovery, observation, memory and validation. Each has a bounded implementation in GenOS; none is a ninth topology or a fully qualified autonomous workflow.",
    title: "Five capabilities,", titleEmphasis: "five open questions.", cardLink: "Read the capability", review: "Source reviewed",
  },
  fr: {
    back: "Les cinq capacités", status: "PARTIEL · REVU", purpose: "Le problème", mechanism: "Le mécanisme",
    connected: "Relié dans GenOS", open: "À compléter", example: "Exemple", evaluation: "Comment l'éprouver",
    boundary: "Limite", source: "Lire le contrat GenOS", code: "Examiner le code runtime", next: "Explorer une autre capacité",
    intro: "Cinq mécanismes transversaux pour expérimenter, se débloquer, observer, mémoriser et valider. Chacun possède une implémentation bornée dans GenOS ; aucun n'est une neuvième topologie ni un parcours autonome entièrement qualifié.",
    title: "Cinq capacités,", titleEmphasis: "cinq questions ouvertes.", cardLink: "Lire la capacité", review: "Source revue le",
  },
} as const;

export function CapabilityIndex({ locale }: { locale: Locale }) {
  const ui = labels[locale];
  return <div className="page-shell capability-page" lang={locale}>
    <section className="page-hero section-wrap capability-hero">
      <Eyebrow>{locale === "fr" ? "CAPACITÉS TRANSVERSALES · GENOS V3" : "CROSS-CUTTING CAPABILITIES · GENOS V3"}</Eyebrow>
      <h1>{ui.title}<br /><em>{ui.titleEmphasis}</em></h1>
      <p>{ui.intro}</p>
      <div className="capability-review">{ui.review} {genosReviewedAt} · {locale === "fr" ? "statut" : "status"}: {ui.status}</div>
    </section>
    <section className="section-wrap capability-index-grid" aria-label={locale === "fr" ? "Les cinq capacités" : "Five capabilities"}>
      {capabilityPages.map((page, index) => <article className="capability-index-card" key={page.slug}>
        <span>{String(index + 1).padStart(2, "0")} / 05 <b>{ui.status}</b></span>
        <h2>{page[locale].name}</h2>
        <p>{page[locale].tagline}</p>
        <small>{page[locale].open}</small>
        <Link href={`/${locale}/capabilities/${page.slug}`}>{ui.cardLink} ↗</Link>
      </article>)}
    </section>
  </div>;
}

export function CapabilityDetail({ page, locale }: { page: CapabilityPage; locale: Locale }) {
  const ui = labels[locale];
  const copy = page[locale];
  const index = capabilityPages.findIndex((item) => item.slug === page.slug);
  const next = capabilityPages[(index + 1) % capabilityPages.length];
  const claim = productClaims.find((item) => item.id === page.claimId);

  return <div className="page-shell capability-page" lang={locale}>
    <section className="page-hero section-wrap capability-hero">
      <Link className="capability-back" href={`/${locale}/capabilities`}>← {ui.back}</Link>
      <Eyebrow>{String(index + 1).padStart(2, "0")} / 05 · {ui.status}</Eyebrow>
      <h1>{copy.name}<br /><em>{copy.tagline}</em></h1>
      <p>{copy.purpose}</p>
      <div className="capability-review">{ui.review} {genosReviewedAt} · {claim?.evidenceLevel ?? "integration"}</div>
    </section>

    <section className="section-wrap capability-detail-grid" aria-label={copy.name}>
      <article className="capability-feature"><span>01 / {ui.mechanism}</span><p>{copy.mechanism}</p></article>
      <article><span>02 / {ui.connected}</span><p>{copy.connected}</p></article>
      <article><span>03 / {ui.open}</span><p>{copy.open}</p></article>
      <article><span>04 / {ui.example}</span><p>{copy.example}</p></article>
      <article><span>05 / {ui.evaluation}</span><p>{copy.evaluation}</p></article>
      <article className="capability-boundary"><span>06 / {ui.boundary}</span><p>{copy.boundary}</p></article>
    </section>

    <section className="section-wrap capability-source-panel">
      <div><Eyebrow>{locale === "fr" ? "CONTRAT ET CODE" : "CONTRACT AND CODE"}</Eyebrow><p>{locale === "fr" ? "Le statut décrit la tranche documentée au commit de revue. Les liens ouvrent les sources du runtime, pas une démonstration en direct." : "This status describes the slice documented at the reviewed commit. These links open runtime sources, not a live demonstration."}</p></div>
      <div className="capability-source-links"><a href={genosSource(page.sourcePath)} target="_blank" rel="noreferrer">{ui.source} ↗</a><a href={genosSource(page.codePath)} target="_blank" rel="noreferrer">{ui.code} ↗</a></div>
    </section>

    <nav className="section-wrap capability-next" aria-label={ui.next}>
      <span>{ui.next}</span><Link href={`/${locale}/capabilities/${next.slug}`}>{next[locale].name} →</Link>
    </nav>
  </div>;
}
