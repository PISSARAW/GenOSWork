import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { BenchmarkExplorer } from "@/components/p3-explorers";

export const metadata: Metadata = { title: "Benchmarks GenOS", description: "Résultats publiés, expériences locales et exploration interactive d'un benchmark déterministe sur douze tâches.", alternates: { canonical: "/fr/benchmarks", languages: { en: "/en/benchmarks", fr: "/fr/benchmarks" } }, openGraph: { locale: "fr_FR" } };

export default function FrenchBenchmarksPage() {
  return <div className="page-shell" lang="fr"><section className="page-hero section-wrap p3-hero"><Eyebrow>BENCHMARKS · RÉSULTATS ET PROTOCOLES</Eyebrow><h1>Des scores avec<br /><em>leur contexte.</em></h1><p>Explorez les évaluations publiées et les expériences locales documentées dans GenOS. Chaque résultat est limité à son corpus, son protocole et ses conditions d’exécution.</p><div className="p3-hero-links"><a href="/fr/runs">Relire une campagne GenOS →</a><a href="/fr/api-mcp">Référence API / MCP →</a></div></section><BenchmarkExplorer locale="fr" /><section className="section-wrap french-note"><Eyebrow>INTERPRÉTATION</Eyebrow><p>Les douze tâches planning-gap sont synthétiques; le benchmark est un runner déterministe sans LLM. Cet explorateur présente le résultat enregistré du 30 septembre 2026 et ne relance pas la suite. Les évaluations LoCoMo et SWE-bench Lite ont leurs propres corpus et limites, décrits sur la page anglaise.</p><a href="/benchmarks">Voir tous les rapports et protocoles en anglais ↗</a></section></div>;
}
