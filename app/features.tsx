import Link from "next/link";

const features = [
  // CORE
  {
    category: "Core",
    items: [
      { titre: "Snapshot atomique", desc: "Capture complète de l'état d'un agent : identité, genome, monde, curseur d'événements, métadonnées runtime. Restaurable, forkable, diffable." },
      { titre: "Fork contrefactuel", desc: "Forkez des hypothèses concurrentes à partir d'un snapshot commun sans copie de données (hardlink). Chaque branche a son propre identité et son propre flux d'événements." },
      { titre: "Diff structurel", desc: "Comparez deux états agent field par field. Identifiez exactement ce qui a changé entre deux snapshots, deux branches, ou deux résultats d'évaluation." },
      { titre: "Replay déterministe", desc: "Rejouez un snapshot et sa trace d'événements pour reproduire exactement un résultat. Utilisé pour la vérification, le debuggage, les tests, et l'audit." },
      { titre: "Lineage & provenance", desc: "Chaque agent a une lignée traçable. Les événements sont append-only. Vous pouvez inspecter quand et pourquoi deux trajectoires ont divergé." },
      { titre: "Évaluation & sélection", desc: "Scorez des branches sur plusieurs critères (correctness, coût, latence, sécurité). Sélection Pareto pour les compromis multi-objectifs." },
    ],
  },
  {
    category: "Biomimetic",
    items: [
      { titre: "Cellular Immunity", desc: "Virophages, fièvre computationnelle, cascade caspase (apoptosis) pour isoler et détruire des états agents corrompus." },
      { titre: "Évolution & Écologie", desc: "Les agents se reproduisent par mitose, bourgeonnement ou schizogonie (fission multiple). Les budgets token sont échangés via des réseaux trophiques." },
      { titre: "Neurobiologie & Cognition", desc: "Neuromodulation (Dopamine RPE), replay hippocampique, quotas de néoténie pour guider l'intelligence collective." },
      { titre: "Apoptosis automatique", desc: "Détection automatique de stagnation cognitive et teardown gracieux de l'agent incriminé. Pas de boucle infinie sans conséquence." },
      { titre: "Cryptobiosis", desc: "Freeze et resume automatique sur limites de taux API ou dégradation réseau. L'agent survit aux perturbations environnementales." },
      { titre: "Hypermutation", desc: "Diversification automatique de température et de prompt pendant les deadlocks cognitifs. Échappatoire aux minima locaux de réflexion." },
    ],
  },
  {
    category: "Sécurité",
    items: [
      { titre: "Sandboxing isolé", desc: "Chaque agent s'exécute dans une capsule avec son propre répertoire. Zéro copie via hardlinks. Frontière physique entre agents." },
      { titre: "Autorisations fines", desc: "Contrôle précis des outils et commandes disponibles pour chaque agent. Listing explicite, pas de permissions implicites." },
      { titre: "Traçabilité complète", desc: "Tous les événements sont loggés, append-only, avec lignage. Audit complet de qui a fait quoi, quand, et pourquoi." },
      { titre: "Isolation réseau (roadmap)", desc: "gVisor, Firecracker, bwrap, sandbox-exec pour isoler les agents des ressources système. Prévu pour v0.1.0." },
    ],
  },
  {
    category: "Studio",
    items: [
      { titre: "Plan de contrôle local", desc: "React + TypeScript + Vite frontend avec Express + SQLite backend. Courbe d'apprentissage minimale." },
      { titre: "Dashboard de flotte", desc: "Vue d'ensemble de vos agents, workspaces, expériences, évaluations, lignage, outils, et telemetry runtime." },
      { titre: "Vue évaluation & lignage", desc: "Explorez les résultats d'évaluation, les arbres de lignage, et les relations causales entre agents et branches." },
      { titre: "Timeline de workspace", desc: "Chronologie visuelle d'un workspace avec diff causale entre snapshots. Idéal pour le debuggage d'incidents." },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-[#1e2430] bg-[#0c1018] py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Caractéristiques
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#9ca3af]">
            Ce qui distingue GenOS des frameworks d'orchestration d'agents classiques :
            traitement versionné de l'état agent, sandboxing atomique, et primitives biomimétiques natives.
          </p>
        </div>
      </section>

      {/* FEATURES PAR CATÉGORIE */}
      <section className="border-t border-[#1e2430] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {features.map((cat) => (
            <div key={cat.category} className="mb-16 last:mb-0">
              <h2 className="mb-2 text-xl font-bold text-white">{cat.category}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <div key={item.titre} className="rounded-xl border border-[#1e2430] bg-[#0c1018] p-5">
                    <h3 className="text-base font-semibold text-white">{item.titre}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#9ca3af]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARAISON */}
      <section className="border-t border-[#1e2430] bg-[#0c1018] py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Par rapport aux approches classiques</h2>
          <p className="mt-3 max-w-3xl text-lg text-[#9ca3af]">
            La plupart des orchestrateurs avancent le long d'une seule timeline mutable. GenOS change la modèle de fond.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-[#1e2430] bg-[#0c1018]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#1e2430]">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#7a8294]">Capacité</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#7a8294]">Orchestrateur classique</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#7a8294]">GenOS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2430]">
                {[
                  { capa: "État agent", classique: "Mutable, unique timeline", genos: "Versionné, snapshots, forks" },
                  { capa: "Expérimentation", classique: "Coûteuse, difficile à comparer", genos: "Fork isolé, comparaison de preuves" },
                  { titre: "Reproductibilité", classique: "Non garantie", genos: "Deterministic replay natif" },
                  { capa: "Débuquage", classique: "Difficile, état corrompu", genos: "Lineage, diff, replay causale" },
                  { capa: "Promotion", classique: "Tout ou rien", genos: "Sélective, basée sur preuves" },
                  { capa: "Sécurité", classique: "A posteriori", genos: "Sandboxing atomique natif" },
                  { capa: "Biomimétique", classique: "Non disponible", genos: "Apoptosis, cryptobiosis, HGT, etc." },
                ].map((row) => (
                  <tr key={row.capa} className="hover:bg-[#0c1018]/50">
                    <td className="px-5 py-4 text-sm font-medium text-white">{row.capa}</td>
                    <td className="px-5 py-4 text-sm text-[#9ca3af]">{row.classique}</td>
                    <td className="px-5 py-4 text-sm text-[#e8ecf0]">{row.genos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1e2430] bg-[#0c1018] py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Pas encore convaincu ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#9ca3af]">
            Téléchargez l'alpha, lancez la démo, et voyez par vous-même comment GenOS transforme le débogue et l'orchestration d'agents.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/PISSARAW/GenOS/releases/tag/v0.0.1-alpha.1"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#5b4fcf] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#5b4fcf]/25 transition hover:bg-[#6d5ff0] focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/50"
            >
              Télécharger l'alpha v0.0.1
            </a>
            <a
              href="https://github.com/PISSARAW/GenOS/tree/main/examples/safe-debugging-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[#3a4252] bg-[#1a1f2c] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#252c3c] focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/30"
            >
              Voir la démo de débogage
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
