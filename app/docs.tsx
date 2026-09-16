import Link from "next/link";

const modeDetails = [
  {
    nom: "Trinity",
    titre: "Trois mondes, une décision plus robuste",
    paragraphe: "Trinity lance trois agents en parallèle dans des mondes d'exécution indépendants. Chacun explore une approche différente du même problème. Au bout du compte, l'orchestrateur compare les preuves, score les résultats, et ne fusionne que ce qui passe les critères de validation. C'est la méthode scientifique appliquée à l'orchestration d'agents.",
    points: [
      "3 mondes parallèles : thèse, antithese, synthèse",
      "Comparaison d'implémentations alternatives",
      "Fusion des résultats les plus robustes",
      "Idéal pour les décisions architecturales critiques",
    ],
    usage: "Décisions critiques, conception architecturale, exploration de solutions alternatives",
  },
  {
    nom: "A-Team",
    titre: "L'équipe pluridisciplinaire parfaite, instantanément",
    paragraphe: "A-Team compose dynamiquement une équipe de spécialistes autour d'un objectif commun. Chaque membre est un agent autonome avec une zone de compétence claire et un budget cognitif. L'orchestrateur veille à la cohérence des livrables et à la complétude des preuves.",
    points: [
      "Composition automatique selon les besoins du projet",
      "Spécialistes : design, frontend, contenu, sécurité, backend...",
      "Fusion des travaux en un résultat cohérent",
      "Chaque membre opère dans sa zone de compétence",
    ],
    usage: "Projet de bout en bout, intégration multi-compétences, livraison complète",
  },
  {
    nom: "Biocénose",
    titre: "Une communauté d'agents qui s'auto-optimise",
    paragraphe: "Biocénose crée un écosystème d'agents coopératifs qui évoluent ensemble. La coopération et la compétition douce stimulent des comportements émergents — meilleure adaptation, découverte de solutions inattendues, résilience face aux perturbations. Comme un vrai écosystème.",
    points: [
      "Agents coopératifs dans un même écosystème",
      "Compétition douce pour stimuler l'amélioration",
      "Comportements émergents stables",
      "Auto-optimisation continue",
    ],
    usage: "Environnement de développement continu, auto-optimisation, découverte de solutions",
  },
  {
    nom: "Holobionte",
    titre: "Sécurité intégrée, pas ajoutée",
    paragraphe: "Holobionte place la sécurité au cœur de l'agent dès sa création. Détection de menaces, confinement automatique, autorisations fines, traçabilité complète. L'agent est conçu pour opérer dans des contextes sensibles sans compromettre la sécurité.",
    points: [
      "Détection de menaces intégrée",
      "Confinement et isolement automatique",
      "Autorisations fines et traçables",
      "Preuve de sécurité à chaque décision",
    ],
    usage: "Opérations critiques, données sensibles, conformité réglementaire",
  },
  {
    nom: "Syncytium",
    titre: "Mémoire collective, décision coordonnée",
    paragraphe: "Syncytium permet aux agents de partager un état commun : mémoire collective, contexte partagé, cohérence des décisions. Chaque agent a accès à l'histoire complète des échanges. La coordination est fine, sans centralisation rigide ni goulot d'étranglement messager.",
    points: [
      "Mémoire collective partagée entre agents",
      "Contexte commun en temps réel",
      "Cohérence des décisions sans centralisation",
      "Pas de goulot d'étranglement messager",
    ],
    usage: "Résolution de problèmes distribuée, coordination fine, vision commune",
  },
  {
    nom: "Biome",
    titre: "Des populations spécialisées par tâche",
    paragraphe: "Biome organise les agents en populations distinctes, chacune spécialisée pour une tâche précise. Les populations évoluent en parallèle dans des niches différentes. Chaque population est optimisée pour son rôle, et les échanges entre populations sont contrôlés.",
    points: [
      "Populations spécialisées par tâche",
      "Évolution parallèle dans des niches distinctes",
      "Optimisation par rôle",
      "Échanges contrôlés entre populations",
    ],
    usage: "Grande échelle, plusieurs flux de travail parallèles, équipes spécialisées",
  },
  {
    nom: "Rhizome",
    titre: "Pas de hiérarchie, que des connexions",
    paragraphe: "Rhizome abandonne la hiérarchie pour une architecture en réseau. Chaque agent peut se connecter à n'importe quel autre agent, créant des chemins adaptatifs et résilients. Si un nœud tombe, les autres trouvent d'autres chemins. La structure évolue avec les besoins.",
    points: [
      "Architecture non hiérarchique en réseau",
      "Connexions directes entre agents",
      "Résilience : chemins alternatifs automatiquement",
      "Auto-organisation adaptative",
    ],
    usage: "Systèmes adaptatifs, besoins évolutifs, résilience du réseau",
  },
  {
    nom: "Métapopulation",
    titre: "Plusieurs populations, une même organisation",
    paragraphe: "Métapopulation fait coexister plusieurs populations semi-indépendantes dans un même espace organisationnel. Chaque population a ses propres règles, son propre rythme, mais échange avec les voisines. La diversité des approches au sein d'une même organisation crée robustesse et richesse.",
    points: [
      "Plusieurs populations semi-indépendantes",
      "Règles propres à chaque population",
      "Échanges inter-populations contrôlés",
      "Diversité + robustesse",
    ],
    usage: "Organisations complexes, plusieurs équipes ou projets en parallèle, diversité de méthodes",
  },
];

export default function DocsPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-[#1e2430] bg-[#0c1018] py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Documentation
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#9ca3af]">
            Comprenez les concepts, l'architecture et les modes d'orchestration de GenOS.
            De la théorie biomimétique à la mise en production.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/#modes" className="rounded-lg border border-[#3a4252] bg-[#1a1f2c] px-4 py-2 text-[#9ca3af] transition hover:bg-[#252c3c] hover:text-white">← Retour à l'accueil</Link>
            <a href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#3a4252] px-4 py-2 text-[#9ca3af] transition hover:bg-[#252c3c] hover:text-white">Repository GitHub →</a>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="border-t border-[#1e2430] bg-[#0c1018] py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Vision</h2>
          <p className="mt-4 leading-relaxed text-[#9ca3af]">
            GenOS est un runtime d'exécution d'agents autonomes inspiré des systèmes biologiques et des principes du versionnement détermiste. L'idée centrale : traiter le workflow d'un agent comme une computation versionnée — avec des snapshots, des forks, des branches isolées, des comparaisons de preuves, et une promotion sélective.
          </p>
          <p className="mt-4 leading-relaxed text-[#9ca3af]">
            Au lieu d'une seule timeline mutable où une erreur corrompt tout l'état environnant, GenOS permet de :
          </p>
          <ul className="mt-4 space-y-3 text-[#9ca3af]">
            <li className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#5b4fcf]/20 text-[#5b4fcf] text-xs font-bold flex items-center justify-center">1</span>
              <span><strong className="text-white">Snapshotner</strong> l'état complet d'un agent (identité, genome, monde, curseur d'événements, métadonnées runtime)</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#5b4fcf]/20 text-[#5b4fcf] text-xs font-bold flex items-center justify-center">2</span>
              <span><strong className="text-white">Forker</strong> des hypothèses concurrentes dans des branches isolées</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#5b4fcf]/20 text-[#5b4fcf] text-xs font-bold flex items-center justify-center">3</span>
              <span><strong className="text-white">Comparer</strong> les preuves avant toute promotion — diff, scoring, sélection multi-objectifs</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#5b4fcf]/20 text-[#5b4fcf] text-xs font-bold flex items-center justify-center">4</span>
              <span><strong className="text-white">Rejouer</strong> (replay) les preuves pour vérifier la reproductibilité</span>
            </li>
          </ul>
        </div>
      </section>

      {/* LES MODES */}
      <section className="border-t border-[#1e2430] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Les 8 modes d'orchestration</h2>
          <p className="mt-3 max-w-3xl text-lg text-[#9ca3af]">
            Chaque mode correspond à un principe biologique. Choisissez celui qui correspond à votre besoin, ou combinez-les.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {modeDetails.map((mode) => (
              <div key={mode.nom} className="rounded-2xl border border-[#1e2430]/80 bg-[#0c1018] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5b4fcf] to-[#3d33a0] text-white font-bold shadow-md">
                    {mode.nom[0]}
                  </div>
                  <h3 className="text-xl font-bold text-white">{mode.nom}</h3>
                </div>
                <p className="text-base leading-relaxed text-[#9ca3af]">{mode.paragraphe}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {mode.points.map((point) => (
                    <span key={point} className="rounded-lg bg-[#5b4fcf]/10 px-3 py-1 text-xs font-medium text-[#b0b8cc] border border-[#5b4fcf]/20">
                      {point}
                    </span>
                  ))}
                </div>

                <div className="mt-5 rounded-lg border border-[#1e2430] bg-[#161b26] p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#7c6df0]">Meilleur pour</span>
                  <p className="mt-1 text-sm text-[#9ca3af]">{mode.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="border-t border-[#1e2430] bg-[#0c1018] py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Architecture</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {[
              { titre: "Orchestrateur", desc: "Le cerveau de la mission. Il choisit la stratégie, compose les équipes, assigne les tâches, supervise les résultats, et décide des actions correctives. L'orchestrateur a son propre budget cognitif et son périmètre d'action." },
              { titre: "Agents Autonomes", desc: "Chaque agent est exécuté dans une capsule isolée avec son propre contexte, son budget cognitif et son périmètre d'action. Il produit du code, des décisions ou des artefacts après sa propre réflexion." },
              { titre: "AgentWorld Capsules", desc: "L'unité d'isolation atomique. Une capsule encapsule l'environnement d'exécution d'un agent avec zéro copie (hardlink) et une isolation stricte. C'est la frontière de sécurité de base." },
              { titre: "Snapshot & Replay", desc: "Tout état agent est snapshotable. Les snapshots sont restaurables, forkables, comparables (diff), et rejouables (replay). La ligne de vie (lineage) des agents est préservée pour l'audit et le debuggage." },
              { titre: "Évaluation & Preuves", desc: "Les résultats des agents sont évalués avant promotion. Scoring multi-objectifs (correctness, coût, latence, invariants de sécurité), comparaison de branches, et sélection Pareto sont des workflows first-class." },
              { titre: "Runtime Biomimétique", desc: "Apoptosis (teardown gracieux des agents corrompus), cryptobiosis (freeze/resume sur erreur réseau), hypermutation (diversification en cas de deadlock cognitif), transfert horizontal de gènes (partage de configurations réussies)." },
            ].map((block) => (
              <div key={block.titre} className="rounded-xl border border-[#1e2430] bg-[#0c1018] p-5">
                <h3 className="text-base font-bold text-white">{block.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9ca3af]">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉTAT ACTUEL */}
      <section className="border-t border-[#1e2430] py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">État actuel du projet</h2>

          <div className="mt-6 rounded-2xl border border-[#1e2430] bg-[#0c1018] p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f59e0b]/20 text-[#f59e0b] text-sm font-bold">α</span>
              <span className="text-lg font-semibold text-white">Alpha — v0.0.1</span>
            </div>
            <p className="text-sm text-[#9ca3af]">
              GenOS est un logiciel de recherche actif en phase alpha. Les interfaces peuvent changer avant la version 0.1.0.
              Ce n'est pas encore une frontière de sécurité de production.
            </p>
          </div>

          <div className="mt-6 grid gap-4 text-sm text-[#9ca3af]">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#10b981]" />
              <span>Démonstration de débogage parallèle sûr (run-demo.sh)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#10b981]" />
              <span>Snapshots, forks, diffs, replay sans appel LLM</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#10b981]" />
              <span>GenOS Studio : plane de contrôle local (React + Express + SQLite)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
              <span>Évaluation et sélection Pareto — expérimental</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
              <span>Croyances, mémoire, provenance et lignage — expérimental</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
              <span>Studio et orchestration de swarms biomimétiques — en développement</span>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="border-t border-[#1e2430] bg-[#0c1018] py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Feuille de route</h2>

          <div className="mt-6 space-y-6">
            {[
              { version: "v0.0.1 — Exécutable (actuel)", items: ["Génome, phénotype, capsule, croyances épistémiques, mémoire, preuves et DAGs causaux", "Sandboxing mondes (répertoires isolés et Git worktrees)", "Snapshot, restore, fork contrefactuel, diff et replay", "Merge cognitif, évolution de branches, expériences d'hérédité", "Adaptateur MCP JSON-RPC v1alpha1 (STDIO + HTTP)", "CLI unifiée : agent, capsule, snapshot, monde, dev, expérience"] },
              { version: "v0.1.0 — Aperçu développeur (cible suivante)", items: ["Capsule AgentWorld comme frontière standard par défaut", "SQLite et PostgreSQL pour snapshots, events, CAS", "Connecteurs modèles : OpenAI GPT-4o, Anthropic Claude 3.5, Ollama", "Nettoyage robuste, timeouts, annulation, sauvetage de résultats partiels", "Schémas JSON versionnés et stables", "Documentation complète et scripts d'installation"] },
              { version: "v0.2.0 — Swarms biomimétiques", items: ["Apoptosis, cryptobiosis, hypermutation automatique", "Collaboration stigmergique par marqueurs environnementaux", "Moteur de consensus de swarm pour décisions colllectives", "Transfert horizontal de gènes (HGT) de configurations réussies"] },
              { version: "v0.5.0 — Laboratoire causal & évaluation", items: ["Moteur Pareto multi-objectifs (correctness, coût, latence, sécurité)", "Studio causal interactif pour débogage d'incidents historiques", "Plateforme de test sécurité co-évolution (red-team vs blue-team)", "Explorateur DAG causal visuel, arbres de lignage, telemetry de budget", "Intégrations IDE : VS Code, JetBrains, Antigravity"] },
            ].map((milestone) => (
              <div key={milestone.version} className="rounded-xl border border-[#1e2430] bg-[#0c1018] p-5">
                <h3 className="text-base font-bold text-white">{milestone.version}</h3>
                <ul className="mt-3 space-y-2 text-sm text-[#9ca3af]">
                  {milestone.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5b4fcf]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
