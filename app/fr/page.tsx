import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = { title: "GenOS en français", description: "Présentation française de GenOS, son runtime multi-agents, ses preuves, ses benchmarks et sa référence API / MCP.", alternates: { canonical: "/fr", languages: { en: "/", fr: "/fr" } }, openGraph: { locale: "fr_FR" } };

const links = [
  { n: "01", title: "Référence API / MCP", body: "Routes REST, jetons, scopes tenant, permissions, schémas d’outils et erreurs.", href: "/fr/api-mcp", label: "Lire la référence" },
  { n: "02", title: "Développeurs", body: "Installer GenOS, découvrir les projets et accéder à la documentation source.", href: "/fr/developers", label: "Commencer" },
  { n: "03", title: "Benchmarks interactifs", body: "Explorer les résultats mesurés tâche par tâche et politique par politique.", href: "/fr/benchmarks", label: "Explorer les résultats" },
  { n: "04", title: "Exécutions enregistrées", body: "Revoir une campagne GenOS avec ses missions incomplètes et son origine.", href: "/fr/runs", label: "Relire la campagne" },
  { n: "05", title: "Sandbox en direct", body: "Connecter votre runtime avec un jeton et un scope que vous fournissez.", href: "/fr/sandbox", label: "Ouvrir la sandbox" },
];

export default function FrenchHomePage() {
  return <div className="page-shell french-home" lang="fr">
    <section className="hero section-wrap"><div className="hero-copy"><Eyebrow><span className="eyebrow-pulse" /> RUNTIME OPEN SOURCE POUR AGENTS</Eyebrow><h1>Préparer<br />la suite <em>du travail.</em></h1><p className="hero-lede">Les agents échouent, les plans changent et les preuves se contredisent. GenOS conserve un état versionné du travail multi-agents pour explorer plusieurs pistes, examiner leurs résultats et décider de ce qui peut avancer.</p><div className="hero-actions"><Link className="button button-dark" href="/fr/developers">Découvrir GenOS <span>→</span></Link><a className="button button-quiet" href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noreferrer">Voir le code source <span>↗</span></a></div><div className="hero-proof"><span className="proof-dot" /> instantanés · branches · relecture · preuves</div></div><div className="french-hero-card"><Eyebrow>LE CYCLE DE TRAVAIL GENOS</Eyebrow><ol><li><i>01</i><span>Définir une mission</span></li><li><i>02</i><span>Orchestrer des workers</span></li><li><i>03</i><span>Conserver l’état et les traces</span></li><li><i>04</i><span>Vérifier les preuves</span></li><li><i>05</i><span>Promouvoir ou suspendre</span></li></ol><p>Les capacités disponibles et le niveau de preuve varient selon le mode d’exécution.</p></div></section>
    <section className="signal-strip" aria-label="Caractéristiques du runtime GenOS"><div><strong>État</strong><span>versionné par défaut</span></div><b>×</b><div><strong>Exécution</strong><span>supervisée et bornée</span></div><b>×</b><div><strong>Promotion</strong><span>conditionnée aux preuves</span></div><b>×</b><div><strong>Reprise</strong><span>intégrée au flux de travail</span></div></section>
    <section className="section-wrap french-route-section"><div><Eyebrow>PARCOURS EN FRANÇAIS</Eyebrow><h2>Explorer GenOS<br /><em>avec ses limites.</em></h2><p>La documentation API/MCP, la présentation développeur, les benchmarks, les exécutions enregistrées et le sandbox sont disponibles en français.</p></div><div className="french-route-grid">{links.map((item) => <article key={item.n}><span>{item.n} / GENOS</span><h3>{item.title}</h3><p>{item.body}</p><Link href={item.href}>{item.label} <b>→</b></Link></article>)}</div></section>
    <section className="french-boundary"><div className="section-wrap"><Eyebrow light>ÉTAT DES TRADUCTIONS</Eyebrow><h2>Un résumé français.<br /><em>Les contrats à la source.</em></h2><p>Les sections principales d’architecture, de topologie, d’organisation, de recherche et de concepts ont un résumé français. Leurs fiches techniques détaillées et les documents faisant autorité restent en anglais dans GenOS.</p><div><a href="https://github.com/PISSARAW/GenOS/tree/v3/docs" target="_blank" rel="noreferrer">Documentation GenOS ↗</a><Link href="/fr/api-mcp">Lire la référence API / MCP →</Link><Link href="/">English home →</Link></div></div></section>
  </div>;
}
