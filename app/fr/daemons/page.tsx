import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { DaemonExplorer } from "@/components/daemon-explorer";
import "../../daemons/daemons.css";
import "../../daemons/daemon-explorer.css";

export const metadata: Metadata = {
  title: "Daemons GenOS — parcours animés",
  description: "Explorez les cycles du daemon résident GenOS, des ScoutCells, de SentinelDaemonKeeper et du daemon Git historique.",
  alternates: { canonical: "/fr/daemons", languages: { fr: "/fr/daemons", en: "/en/daemons" } },
  openGraph: { locale: "fr_FR" },
};

export default function FrenchDaemonsPage() {
  return <div className="page-shell daemon-page french-daemon-page" lang="fr">
    <section className="page-hero section-wrap daemon-hero">
      <Eyebrow>RUNTIME · SERVICES RÉSIDENTS</Eyebrow>
      <h1>Voir les daemons<br /><em>suivre leur cycle.</em></h1>
      <p>Explore leurs parcours étape par étape. Le résident observe un territoire ; les composants voisins ont des rôles et des limites différents.</p>
      <div className="daemon-status"><i /> ARCHÉTYPE RÉSIDENT · MATURITÉ EXPÉRIMENTALE</div>
    </section>
    <DaemonExplorer locale="fr" />
    <section className="daemon-scope-wrap">
      <div className="section-wrap daemon-scope">
        <Eyebrow light>PORTÉE ET LIMITES</Eyebrow>
        <h2>Une animation explicative, pas un runtime en direct.</h2>
        <p>Le cycle résident, les territoires, les findings et les handoffs sont implémentés. La maturité globale reste <strong>EXPÉRIMENTALE</strong> ; l’animation ne lance aucun daemon et ne représente pas un résultat live.</p>
        <p>Le host résident interroge le curseur d’événements indexé toutes les 500 ms. Au redémarrage, l’activité revient à BOOTSTRAPPING tandis que la santé, les révisions et le dernier curseur sont conservés. Le pont de production ne confirme un événement qu’après mise à jour et journalisation réussies.</p>
        <a href="https://github.com/PISSARAW/GenOS/blob/6133af69933c86f39f0396f801f2ce2b3385826b/docs/03-reference/types-de-daemons.md" target="_blank" rel="noreferrer">Ouvrir le catalogue de référence <span>↗</span></a>
      </div>
    </section>
  </div>;
}
