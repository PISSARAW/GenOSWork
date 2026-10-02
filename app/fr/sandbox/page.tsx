import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { LiveSandbox } from "@/components/p3-explorers";
import { PublicRuntime } from "@/components/public-runtime";
import { TruthBadge } from "@/components/truth-badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Sandbox GenOS en direct", description: "Essayez un scénario guidé sans identifiant, ou connectez en français un runtime GenOS avec un jeton et un scope tenant.", alternates: { canonical: "/fr/sandbox", languages: { en: "/en/sandbox", fr: "/fr/sandbox" } }, openGraph: { locale: "fr_FR" } };

export default function FrenchSandboxPage() {
  return <div className="page-shell" lang="fr">
    <section className="page-hero section-wrap p3-hero"><Eyebrow>SCÉNARIOS PUBLICS · TRACES · VOTRE RUNTIME</Eyebrow><div style={{ margin: "14px 0" }}><TruthBadge mode="SIMULATION" /></div><h1>Un scénario borné.<br /><em>Ou GenOS connecté.</em></h1><p>Utilisez le runtime public jetable pour un run pédagogique déterministe, relisez une campagne historique ou connectez un endpoint GenOS avec scope tenant pour une mission supervisée.</p><div className="p3-hero-links"><a href="/fr/runs">Inspecter les exécutions enregistrées →</a><a href="/fr/api-mcp">Lire les contrats API et MCP →</a></div></section>
    <section className="section-wrap p3-section" aria-labelledby="try-genos-title-fr">
      <div className="p3-section-heading"><span className="p3-kicker">PUBLIC · SANS IDENTIFIANT</span><h2 id="try-genos-title-fr">Trois voies bornées<br /><em>pour explorer.</em></h2><p>Le runtime public ci-dessous n’accepte que des scénarios enregistrés. Les modèles interactifs sont des simulations pédagogiques; les runs historiques restituent des preuves passées. Aucun des deux ne représente une mission GenOS connectée.</p></div>
      <div className="journey-grid">
        <div className="journey-card"><span>SCÉNARIO A · SIMULATION</span><strong>Comparer trois stratégies</strong><p>Faites varier preuves, coût et risque dans le modèle Trinity.</p><a href="/lab/models?model=trinity">Ouvrir la simulation Trinity →</a></div>
        <div className="journey-card"><span>SCÉNARIO B · SIMULATION</span><strong>Peser un jugement</strong><p>Déplacez quorum et dissidence dans le modèle Biocénose.</p><a href="/lab/models?model=biocenose">Ouvrir la simulation Biocénose →</a></div>
        <div className="journey-card"><span>SCÉNARIO C · ENREGISTRÉ</span><strong>Rejouer une campagne réelle</strong><p>Douze missions, deux dispatches acceptés, zéro vérifiée — échecs inclus.</p><a href="/fr/runs">Rejouer la campagne →</a></div>
        <div className="journey-card"><span>SCÉNARIO D · PREUVES</span><strong>Lire un résultat avec ses limites</strong><p>Chaque score expose question, environnement et reproduction.</p><a href="/fr/benchmarks">Ouvrir le registre →</a></div>
      </div>
    </section>
    <PublicRuntime locale="fr" />
    <section className="section-wrap p3-section" aria-labelledby="connect-runtime-title-fr">
      <div className="p3-section-heading"><span className="p3-kicker">CONNECTER VOTRE RUNTIME · AVANCÉ</span><h2 id="connect-runtime-title-fr">Votre runtime,<br /><em>votre mission.</em></h2><p>Utilisez un endpoint HTTPS GenOS et une clé éphémère limitée au scope tenant avec la permission mcp:execute_safe. La page envoie une requête d’orchestration au premier plan via genos_orchestrate et l’exécuteur local.</p></div>
    </section>
    <LiveSandbox locale="fr" />
  </div>;
}
