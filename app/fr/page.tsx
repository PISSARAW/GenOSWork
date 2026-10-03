import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = { title: "GenOS — runtime open source pour agents IA", description: "Runtime open source d’orchestration multi-agents : état versionné, branches contrefactuelles, replay déterministe et promotion fondée sur les preuves.", alternates: { canonical: "/fr", languages: { en: "/en", fr: "/fr" } }, openGraph: { locale: "fr_FR" } };

const links = [
  { n: "01", title: "Comprendre la méthode", body: "Voir comment GenOS conserve les décisions, les changements et leurs éléments de contexte.", href: "/fr/runtime", label: "Lire l’aperçu" },
  { n: "02", title: "Relire une exécution", body: "Examiner une campagne enregistrée, ses résultats et le travail resté ouvert.", href: "/fr/runs", label: "Ouvrir une exécution" },
  { n: "03", title: "Vérifier les preuves", body: "Distinguer ce qui est implémenté, partiel, mesuré ou simplement proposé.", href: "/fr/evidence", label: "Consulter les preuves" },
];

export default function FrenchHomePage() {
  return <div className="page-shell french-home" lang="fr">
    <section className="hero section-wrap"><div className="hero-copy"><Eyebrow><span className="eyebrow-pulse" /> CONTINUITÉ DU TRAVAIL · OPEN SOURCE</Eyebrow><h1>Garder le travail<br /><em>lisible dans le temps.</em></h1><p className="hero-lede">GenOS conserve les décisions, les changements et les éléments qui les soutiennent afin qu’un projet technique puisse être relu, repris et transmis sans perdre son contexte.</p><div className="hero-actions"><Link className="button button-dark" href="/fr/runtime">Comprendre la méthode <span>→</span></Link><Link className="button button-quiet" href="/fr/evidence">Lire les preuves <span>→</span></Link></div><div className="hero-proof"><span className="proof-dot" /> décisions · changements · contrôles · continuité</div></div><div className="french-hero-card"><Eyebrow>UN DOSSIER DE TRAVAIL DURABLE</Eyebrow><ol><li><i>01</i><span>Documenter le contexte</span></li><li><i>02</i><span>Enregistrer une décision</span></li><li><i>03</i><span>Relier les changements</span></li><li><i>04</i><span>Examiner les éléments</span></li><li><i>05</i><span>Préparer la reprise</span></li></ol><p>Le niveau de preuve et les capacités disponibles sont explicités pour chaque élément.</p></div></section>
    <section className="section-wrap french-route-section"><div><Eyebrow>PARCOURS EN FRANÇAIS</Eyebrow><h2>Une lecture<br /><em>sans surpromesse.</em></h2><p>Trois entrées pour comprendre le cadre, relire une exécution et vérifier ce que les éléments disponibles permettent réellement d’affirmer.</p></div><div className="french-route-grid">{links.map((item) => <article key={item.n}><span>{item.n} / GENOS</span><h3>{item.title}</h3><p>{item.body}</p><Link href={item.href}>{item.label} <b>→</b></Link></article>)}</div></section>
    <section className="french-boundary"><div className="section-wrap"><Eyebrow light>ÉTAT DES TRADUCTIONS</Eyebrow><h2>Un résumé français.<br /><em>Les contrats à la source.</em></h2><p>Les sections principales d’architecture, de topologie, d’organisation, de recherche et de concepts ont un résumé français. Leurs fiches techniques détaillées et les documents faisant autorité restent en anglais dans GenOS.</p><div><a href="https://github.com/PISSARAW/GenOS/tree/v3/docs" target="_blank" rel="noreferrer">Documentation GenOS ↗</a><Link href="/fr/api-mcp">Lire la référence API / MCP →</Link><Link href="/">English home →</Link></div></div></section>
  </div>;
}
