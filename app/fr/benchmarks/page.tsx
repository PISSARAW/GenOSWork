import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { BenchmarkExplorer } from "@/components/p3-explorers";
import { genosSource, genosSourceCommit } from "@/components/product-evidence";

const repo = `https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/`;

export const metadata: Metadata = { title: "Benchmarks GenOS", description: "Résultats publiés, expériences locales et exploration interactive d'un benchmark déterministe sur douze tâches.", alternates: { canonical: "/fr/benchmarks", languages: { en: "/en/benchmarks", fr: "/fr/benchmarks" } }, openGraph: { locale: "fr_FR" } };

export default function FrenchBenchmarksPage() {
  return <div className="page-shell" lang="fr"><section className="page-hero section-wrap p3-hero"><Eyebrow>BENCHMARKS · RÉSULTATS ET PROTOCOLES</Eyebrow><h1>Des scores avec<br /><em>leur contexte.</em></h1><p>Explorez les évaluations publiées et les expériences locales documentées dans GenOS. Chaque résultat est limité à son corpus, son protocole et ses conditions d’exécution.</p><div className="p3-hero-links"><a href="/fr/runs">Relire une campagne GenOS →</a><a href="/fr/api-mcp">Référence API / MCP →</a></div></section><BenchmarkExplorer locale="fr" />
    <section className="section-wrap benchmark-section">
      <div className="benchmark-section-heading"><Eyebrow>RÉSULTAT RAPPORTÉ ET PROTOCOLE EN ATTENTE</Eyebrow><h2>Deux états<br /><em>différents.</em></h2><p>Le défi d’identité possède un résultat de campagne borné. SocialWorld V2 dispose de sondes et d’outils de qualification, mais pas encore d’un résultat de campagne appariée.</p></div>
      <div className="benchmark-grid">
        <article className="benchmark-card experiment-record">
          <div className="benchmark-card-head"><span>IDENTITY CHALLENGE · RUN LOCAL RAPPORTÉ</span><i className="benchmark-dot" /></div>
          <h3>Campagne runtime v4.1</h3>
          <p className="benchmark-intro">Qwen 2.5 14B via Ollama · continuité/fork, provenance d’un faux souvenir et usage du modèle opérationnel de soi.</p>
          <div className="benchmark-metrics"><div><strong>10 / 12</strong><span>GenOS complet · défis A/B/C</span></div><div><strong>28 / 48</strong><span>Réussites de l’oracle strict</span></div><div><strong>48 / 48</strong><span>Inférences réelles consignées</span></div></div>
          <p className="benchmark-detail">Le seuil préconfirmatoire de 3/4 est atteint pour chaque défi par GenOS complet. La fiche d’identité seule l’égale sur A et fait mieux sur B. Quatre répétitions par cellule et des tâches fortement guidées donnent des résultats descriptifs, pas une preuve de connaissance de soi généralisable ni d’avantage sur une fiche minimale.</p>
          <a className="text-link" href={genosSource("benchmarks/identity-challenge/CAMPAIGN-REPORT-2026-10.md")} target="_blank" rel="noreferrer">Lire le rapport v4.1 et ses limites<span>↗</span></a>
        </article>
        <article className="benchmark-card experiment-record">
          <div className="benchmark-card-head"><span>SOCIALWORLD V2 · CAMPAGNE EN ATTENTE</span><i className="benchmark-dot benchmark-dot-exploratory" /></div>
          <h3>Six scénarios, aucun score de campagne</h3>
          <p className="benchmark-intro">Les scénarios V2-01 à V2-06 ont des sondes déterministes, runners ou oracles pour examiner mémoire sociale, interactions, confiance, morphogenèse et métacognition.</p>
          <p className="benchmark-detail">La campagne appariée préenregistrée, avec ses bras de comparaison et ses graines, reste à exécuter. Les sondes valident des raccords logiciels ; elles ne comptent pas comme résultats de campagne et ne démontrent pas d’avantage causal.</p>
          <a className="text-link" href={`${repo}benchmarks/social-world/campaigns/socialworld-v2/README.md`} target="_blank" rel="noreferrer">Lire le protocole et les preuves requises<span>↗</span></a>
        </article>
      </div>
    </section>
    <section className="section-wrap french-note"><Eyebrow>INTERPRÉTATION</Eyebrow><p>Les douze tâches planning-gap sont synthétiques; le benchmark est un runner déterministe sans LLM. Cet explorateur présente le résultat enregistré du 30 septembre 2026 et ne relance pas la suite. Les évaluations LoCoMo et SWE-bench Lite ont leurs propres corpus et limites, décrits sur la page anglaise.</p><a href="/benchmarks">Voir tous les rapports et protocoles en anglais ↗</a></section></div>;
}
