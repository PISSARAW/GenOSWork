import Link from "next/link";

// Les 8 modes d'orchestration GenOS
const modes = [
  {
    nom: "Trinity",
    description: "Trois mondes d'exécution parallèles (thèse, antithese, synthèse) pour explorer des implémentations alternatives et fusionner les résultats les plus robustes.",
    strategie: "comparaison + fusion",
    cible: "Decision critique / conception architecturale",
    accent: "from-[#5b4fcf] to-[#3d33a0]",
  },
  {
    nom: "A-Team",
    description: "Une équipe plurisciplinaire de spécialistes (design, frontend, contenu, sécurité...) coalesce autour d'un objectif commun. Chaque membre opère dans sa zone de compétence.",
    strategie: "specialisation + fusion",
    cible: "Projet de bout en bout nécessitant diverses compétences",
    accent: "from-[#3b82f6] to-[#1d4ed8]",
  },
  {
    nom: "Biocénose",
    description: "Une communauté d'agents coopératifs évoluant dans un même écosystème. L'interaction et la concurrence douce produisent des comportements émergents stables.",
    strategie: "coopération + compétition douce",
    cible: "Environnement de développement continu et auto-optimisé",
    accent: "from-[#10b981] to-[#047857]",
  },
  {
    nom: "Holobionte",
    description: "Sécurité intégrée à l'agent : détection de menaces, confinement, autorisations fines, traçabilité complète. L'agent est conçu pour opérer dans des contextes sensibles.",
    strategie: "défense en profondeur",
    cible: "Opérations critiques, données sensibles, conformité",
    accent: "from-[#ef4444] to-[#b91c1c]",
  },
  {
    nom: "Syncytium",
    description: "Un état partagé entre agents : mémoire collective, contexte commun, cohérence des décisions. Permet une coordination fine sans centralisation rigide.",
    strategie: "mémoire partagée + cohérence",
    cible: "Résolution de problèmes distribuée nécessitant une vision commune",
    accent: "from-[#f59e0b] to-[#d97706]",
  },
  {
    nom: "Biome",
    description: "Des populations d'agents spécialisés par tâche, évoluant en parallèle dans des niches distinctes. Chaque population est optimisée pour son rôle.",
    strategie: "spécialisation par population",
    cible: "Grande échelle : plusieurs flux de travail parallèles",
    accent: "from-[#8b5cf6] to-[#6d28d9]",
  },
  {
    nom: "Rhizome",
    description: "Architecture non hiérarchique : les agents s'auto-organisent en réseau. Chaque agent peut se connecter à tout autre agent, créant des chemins adaptatif et résilient.",
    strategie: "auto-organisation + réseau",
    cible: "Systèmes adaptatifs où les besoins évoluent rapidement",
    accent: "from-[#ec4899] to-[#db2777]",
  },
  {
    nom: "Métapopulation",
    description: "Plusieurs populations semi-indépendantes coexistent dans un même espace. Chaque population a ses propres règles, mais échange avec les voisines pour diversifier et robustifier.",
    strategie: "diversité + échange inter-populations",
    cible: "Orgues complexes avec plusieurs équipes / projets en parallèle",
    accent: "from-[#14b8a6] to-[#0f766e]",
  },
];

// Le contenu de la page
export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="inset-0" style={{ background: "radial-gradient(circle at 30% 20%, #5b4fcf 0%, transparent 50%), radial-gradient(circle at 70% 80%, #3b82f6 0%, transparent 50%)" }} />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7c6df0]">
            <span className="h-8 w-8 rounded-full bg-[#5b4fcf]/20 flex items-center justify-center text-[#7c6df0]">v3</span>
            Runtime d'Orchestration Biologique
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
            Orchestrez des agents
            <br />
            <span className="bg-gradient-to-r from-[#5b4fcf] via-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
              comme la nature
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-[#9ca3af]">
            GenOS V3 est un runtime d'exécution d'agents autonomes inspiré des systèmes biologiques.
            <br />
            <span className="text-white font-medium">8 modes d'orchestration</span> — de la comparaison triadique (Trinity) aux communautés coopératives (Biocénose) — vous donnent le contrôle sur la façon dont vos agents travaillent ensemble.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="rounded-xl bg-[#5b4fcf] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#5b4fcf]/25 transition hover:bg-[#6d5ff0] focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/50"
            >
              Consulter la documentation
            </Link>
            <Link
              href="#modes"
              className="rounded-xl border border-[#3a4252] bg-[#1a1f2c] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#252c3c] focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/30"
            >
              Découvrir les modes
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-[#1e2430] bg-[#0c1018] py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "8", label: "modes d'orchestration" },
              { value: "∞", label: "combinaisons possibles" },
              { value: "V3", label: "version biomimétique" },
              { value: "0", label: "agent mort sans raison" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold tracking-tight text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-[#7a8294]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODES D'ORCHESTRATION */}
      <section id="modes" className="border-t border-[#1e2430] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Les 8 modes d'orchestration
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#9ca3af]">
              Chaque mode correspond à un principe biologique. Choisissez celui qui correspond à votre besoin, ou combinez-les.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {modes.map((mode) => (
              <div
                key={mode.nom}
                className={`rounded-2xl border border-[#1e2430]/80 bg-[#0c1018] p-6 transition hover:border-[#5b4fcf]/30 hover:shadow-lg hover:shadow-[#5b4fcf]/5`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${mode.accent} text-white font-bold text-lg shadow-md`}>
                  {mode.nom[0]}
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">{mode.nom}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#9ca3af]">{mode.description}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#5b4fcf]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5b4fcf]" />
                  {mode.strategie}
                </div>
                <div className="mt-4 text-sm text-[#6b7280]">
                  <span className="font-medium text-[#8892a4]">Cible :</span> {mode.cible}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#1e2430] bg-[#0c1018] p-8">
            <h3 className="text-xl font-bold text-white">Combiner les modes</h3>
            <p className="mt-3 text-base text-[#9ca3af]">
              Un projet complexe peut utiliser Trinity pour explorer 3 architectures, puis A-Team pour implémenter chacune avec les spécialistes adéquats, et Holobionte pour garantir la sécurité de chaque décision. La biomimétique, c'est l'arbitraire — pas la rigidité.
            </p>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="border-t border-[#1e2430] bg-[#0c1018] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Architecture
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#9ca3af]">
              GenOS s'articule autour d'un runtime central, d'un orchestrateur et d'agents autonomes exécutés dans des capsules isolées.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { titre: "Orchestrateur", desc: "Le cerveau de la mission. Il choisit la stratégie, compose les équipes, assigne les tâches, supervise les résultats et décide des actions correctives." },
              { titre: "Agents Autonomes", desc: "Chaque agent est une capsule isolée avec son propre contexte, son budget cognitif et son périmètre d'action. Ils produisent du code, des décisions ou des artefacts après réflexion." },
              { titre: "Runtime & Infrastructure", desc: "Le runtime assure l'isolation (workspaces, capsules), la traçabilité (mémoire épisodique, traces), la supervision (PID, stderr, timeout), et la récupération (auto-relance, quorum).", accent: true },
            ].map((block) => (
              <div key={block.titre} className={`rounded-2xl border ${block.accent ? "border-[#5b4fcf]/20 bg-[#5b4fcf]/5" : "border-[#1e2430] bg-[#0c1018]"} p-6`}>
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${block.accent ? "bg-[#5b4fcf]/20 text-[#5b4fcf]" : "bg-[#1e2430] text-[#5b4fcf]"} font-bold`}>
                  {block.titre[0]}
                </div>
                <h3 className="text-lg font-bold text-white">{block.titre}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#9ca3af]">{block.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#1e2430] bg-[#0c1018] p-8">
            <h3 className="text-xl font-bold text-white">Flux typique d'une mission</h3>
            <ol className="mt-4 grid gap-4 text-base leading-relaxed text-[#9ca3af] lg:grid-cols-2">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5b4fcf]/20 text-[#5b4fcf] font-bold">1</span>
                <span>L'orchestrateur reçoit la mission et choisit la stratégie (Trinity, A-Team, etc.)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5b4fcf]/20 text-[#5b4fcf] font-bold">2</span>
                <span>Les agents sont créés dans des capsules isolées avec un budget cognitif et un périmètre</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5b4fcf]/20 text-[#5b4fcf] font-bold">3</span>
                <span>Chaque agent exécute sa tâche, produit des artefacts (code, décisions, preuves)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5b4fcf]/20 text-[#5b4fcf] font-bold">4</span>
                <span>L'orchestrateur synthetise les résultats, valide la cohérence, et décide de la prochaine étape</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1e2430] bg-gradient-to-b from-[#0c1018] to-[#06080a] py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Prêt à orchestrer vos agents ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#9ca3af]">
            Démarrez avec la documentation, explorez les modes, et construisez votre premier projet avec GenOS.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="rounded-xl bg-[#5b4fcf] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#5b4fcf]/25 transition hover:bg-[#6d5ff0] focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/50"
            >
              Lire la documentation
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[#3a4252] bg-[#1a1f2c] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#252c3c] focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/30"
            >
              Voir sur GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
