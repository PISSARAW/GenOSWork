import type { ProductStatus } from "@/components/product-evidence";

export type ProductEvolution = {
  id: string;
  status: ProductStatus;
  date: string;
  title: { en: string; fr: string };
  summary: { en: string; fr: string };
  evidence: { en: string; fr: string };
  limit: { en: string; fr: string };
  sourcePath: string;
};

/**
 * Editorial release notes backed by the immutable GenOS revision in
 * product-evidence.ts. They describe bounded shipped slices, not roadmap
 * promises or the uncommitted state of a local checkout.
 */
export const productEvolutions: ProductEvolution[] = [
  {
    id: "topology-runtimes",
    status: "partial",
    date: "2026-10-18",
    title: { en: "Topology runtimes moved beyond composition", fr: "Les topologies dépassent la simple composition" },
    summary: {
      en: "Rhizome now has a provider-backed growth and routing path marked implemented. Holobiont and Metapopulation move to partial with verified host-veto and regional-runtime slices.",
      fr: "Rhizome dispose désormais d’un parcours de croissance et de routage avec provider, déclaré implémenté. Holobionte et Métapopulation passent au statut partiel avec des tranches vérifiées de veto hôte et de runtime régional.",
    },
    evidence: {
      en: "The product contract records 36 passing Rhizome suites, 55 Holobiont scripts and 14 Metapopulation topology suites.",
      fr: "Le contrat produit consigne 36 suites Rhizome, 55 scripts Holobionte et 14 suites topologiques Métapopulation réussis.",
    },
    limit: {
      en: "Providers, independent verifiers and physical isolation remain host responsibilities; suite completion is not general mission correctness.",
      fr: "Les providers, vérificateurs indépendants et l’isolation physique restent à la charge de l’hôte ; réussir une suite ne prouve pas la justesse générale d’une mission.",
    },
    sourcePath: "docs/03-reference/contrat-produit-et-completude.md",
  },
  {
    id: "native-workers",
    status: "partial",
    date: "2026-10-18",
    title: { en: "All 19 native worker types have bounded qualification", fr: "Les 19 types de workers natifs ont une qualification bornée" },
    summary: {
      en: "The executable inventory now covers 19 WorkerKind values, 25 methods and 24 benchmark cases, with C2/C3 evidence for one bounded task per type.",
      fr: "L’inventaire exécutable couvre désormais 19 valeurs WorkerKind, 25 méthodes et 24 cas de benchmark, avec une preuve C2/C3 sur une tâche bornée par type.",
    },
    evidence: {
      en: "The reviewed report records a 24/24 benchmark and three Windows fault campaigns totaling 57/57 conforming scenarios.",
      fr: "Le rapport revu consigne un benchmark 24/24 et trois campagnes Windows avec fautes totalisant 57/57 scénarios conformes.",
    },
    limit: {
      en: "The qualification is task-specific and does not cover every method, arbitrary missions or general parity with another framework.",
      fr: "La qualification est propre aux tâches mesurées et ne couvre ni chaque méthode, ni les missions libres, ni une parité générale avec un autre framework.",
    },
    sourcePath: "docs/06-qualite-preuves/qualification-workers.md",
  },
  {
    id: "adaptive-morphogenesis",
    status: "partial",
    date: "2026-10-18",
    title: { en: "Morphogenesis gained an adaptive, evidence-gated control path", fr: "La Morphogenèse gagne un contrôle adaptatif sous preuve" },
    summary: {
      en: "The runtime can characterize a mission, select admitted topology variants, execute bounded graph changes and retain verified outcomes for later decisions. All 19 organization policies now have executable step coverage.",
      fr: "Le runtime peut caractériser une mission, sélectionner des variants topologiques admis, exécuter des changements de graphe bornés et conserver les résultats vérifiés. Les 19 politiques d’organisation couvrent désormais une étape exécutable.",
    },
    evidence: {
      en: "Admission, snapshots, budgets, transition receipts, recovery and paired evaluation are represented by explicit services and gates.",
      fr: "Admission, snapshots, budgets, reçus de transition, reprise et évaluation appariée sont représentés par des services et barrières explicites.",
    },
    limit: {
      en: "The current evidence supports bounded mechanisms and selected campaigns, not global optimality or universal superiority over static orchestration.",
      fr: "Les preuves actuelles soutiennent des mécanismes bornés et certaines campagnes, pas une optimalité globale ni une supériorité universelle sur l’orchestration statique.",
    },
    sourcePath: "docs/02-orchestration/topologies/morphogenese.md",
  },
  {
    id: "gqwf-v2",
    status: "partial",
    date: "2026-10-18",
    title: { en: "GQWF v2 adds lazy, durable execution workspaces", fr: "GQWF v2 ajoute des workspaces durables et paresseux" },
    summary: {
      en: "Versioned roots, immutable bases and private overlays can stay logical until a tool needs a physical path. Successful supervised runs can ingest a candidate root before releasing their lease.",
      fr: "Racines versionnées, bases immuables et overlays privés peuvent rester logiques jusqu’à ce qu’un outil exige un chemin physique. Un run supervisé réussi peut ingérer une racine candidate avant de libérer son bail.",
    },
    evidence: {
      en: "The reviewed slice covers hashes, expected versions, signed garbage inventories, resumable lease release and opt-in supervised mission routing.",
      fr: "La tranche revue couvre les empreintes, versions attendues, inventaires de collecte signés, libérations de bail reprenables et le routage opt-in des missions supervisées.",
    },
    limit: {
      en: "No head is published automatically. Promotion still requires a verifier bound to the exact workspace, candidate and generation.",
      fr: "Aucune tête n’est publiée automatiquement. La promotion exige toujours un vérificateur lié au workspace, au candidat et à la génération exacts.",
    },
    sourcePath: "docs/02-orchestration/gqwf-v2.md",
  },
  {
    id: "philosophy-audits",
    status: "partial",
    date: "2026-10-18",
    title: { en: "The philosophy registry reaches 420 explicit audits", fr: "Le registre philosophique atteint 420 audits explicites" },
    summary: {
      en: "Every registry entry maps to a bounded predicate over one of eleven shared primitives. Missing and violated observations create verification tasks and caveats instead of being counted as success.",
      fr: "Chaque entrée du registre correspond à un prédicat borné sur l’une des onze primitives partagées. Une observation absente ou violée crée une tâche de vérification et une réserve au lieu d’être comptée comme succès.",
    },
    evidence: {
      en: "The documented simulation contains 15,120 activation, ablation and falsification observations across four graphs and three seeds.",
      fr: "La simulation documentée contient 15 120 observations d’activation, d’ablation et de falsification sur quatre graphes et trois graines.",
    },
    limit: {
      en: "These are software audits, not 420 implemented theories, external truth checks or evidence of subjective consciousness.",
      fr: "Il s’agit d’audits logiciels, pas de 420 théories réalisées, de contrôles de vérité externe ni d’une preuve de conscience subjective.",
    },
    sourcePath: "docs/03-reference/contrats-philosophiques-ontogenese.md",
  },
  {
    id: "ett-v1",
    status: "partial",
    date: "2026-10-18",
    title: { en: "ETT v1 preregisters a bounded endogenous-thought protocol", fr: "ETT v1 préenregistre un protocole borné de pensée endogène" },
    summary: {
      en: "Without a new human prompt after launch, the read-only chain can detect an internal signal, formulate a falsifiable question, triage it, produce a bounded proposal and request independent classification.",
      fr: "Sans nouvelle requête humaine après le lancement, la chaîne en lecture seule peut détecter un signal interne, formuler une question falsifiable, l’arbitrer, produire une proposition bornée et demander une classification indépendante.",
    },
    evidence: {
      en: "The hypothesis, normalized cost metric, integrity checks, mandate, freshness, budget and cooldown conditions are declared in a versioned protocol.",
      fr: "L’hypothèse, la métrique de coût normalisée, les contrôles d’intégrité, le mandat, la fraîcheur, le budget et le délai de refroidissement sont déclarés dans un protocole versionné.",
    },
    limit: {
      en: "At the reviewed revision, the independent-verifier implementation, learning and the reserved comparative campaign are absent from the pinned tree. ETT is not a phenomenal-consciousness test or general autonomy authority.",
      fr: "À la révision examinée, l’implémentation du vérificateur indépendant, l’apprentissage et la campagne comparative réservée sont absents de l’arbre épinglé. ETT n’est ni un test de conscience phénoménale ni une autorité d’autonomie générale.",
    },
    sourcePath: "docs/01-concepts/endogenous-thought-test.md",
  },
  {
    id: "variant-runtime-wiring",
    status: "partial",
    date: "2026-10-22",
    title: { en: "Topology variants now drive more runtime decisions", fr: "Les variants topologiques pilotent davantage le runtime" },
    summary: {
      en: "Rhizome variant settings now constrain observable routing, growth, resilience, quarantine, bridge compatibility and propagation behavior. The same development adds nested Biome topologies, independent ecological-mutation checks, Syncytium graph guards and a reusable A-Team subteam adapter.",
      fr: "Les paramètres des variants Rhizome encadrent désormais des opérations observables de routage, croissance, résilience, quarantaine, compatibilité des ponts et propagation. Ces travaux ajoutent aussi les topologies Biome imbriquées, la vérification indépendante des mutations écologiques, des barrières de graphe Syncytium et un adaptateur réutilisable de sous-équipes A-Team.",
    },
    evidence: {
      en: "Accepted ADR 0718 records the wiring of all declared Rhizome profile parameters; focused implementation commits add the Biome nested-topology service, mutation oracle, Syncytium cycle/precondition checks and A-Team execution adapter.",
      fr: "L’ADR 0718 accepté consigne le câblage des paramètres déclarés des profils Rhizome ; des commits d’implémentation ciblés ajoutent le service de topologies imbriquées Biome, l’oracle de mutation, les contrôles de cycles/préconditions Syncytium et l’adaptateur d’exécution A-Team.",
    },
    limit: {
      en: "These are bounded runtime mechanisms, not evidence of globally optimal topology selection. The A-Team multi-team path still requires authenticated subrun receipts and end-to-end qualification before success can imply mission quality.",
      fr: "Ces mécanismes de runtime sont bornés et ne prouvent pas une sélection topologique globalement optimale. Le parcours multi-équipe A-Team exige toujours des reçus authentifiés de sous-run et une qualification bout en bout avant que son succès puisse établir la qualité d’une mission.",
    },
    sourcePath: "docs/adr/0718-cablage-effectif-parametres-variants-rhizome.md",
  },
  {
    id: "autonomy-identity-shev",
    status: "partial",
    date: "2026-10-21",
    title: { en: "Autonomy gained stewardship, identity and field-execution paths", fr: "L’autonomie gagne des parcours de stewardship, d’identité et d’exécution terrain" },
    summary: {
      en: "Ontogenesis can turn eligible daemon findings into durable, idempotent backlog proposals; SHEV gained a real-time field-campaign adapter; identity challenges cover renamed peers, parent/fork lineage and partner choice from observed performance. Role-aware token budgets and an in-process Windows path for RAM/SWAP missions also landed.",
      fr: "Ontogenèse peut convertir des findings admissibles du daemon en propositions durables et idempotentes du backlog ; SHEV gagne un adaptateur de campagne terrain en temps réel ; les défis d’identité couvrent les pairs renommés, la filiation parent/fork et le choix d’un partenaire selon ses performances observées. Les budgets de tokens par rôle et un parcours Windows in-process pour les missions RAM/SWAP sont également ajoutés.",
    },
    evidence: {
      en: "The identity campaign records 48 real model inferences and 28/48 strict oracle passes; the daemon-stewardship and role-budget changes have dedicated contracts and tests. These results are scoped to their documented scenarios.",
      fr: "La campagne d’identité consigne 48 inférences réelles du modèle et 28/48 réussites à l’oracle strict ; le stewardship du daemon et les budgets par rôle disposent de contrats et de tests dédiés. Ces résultats restent limités aux scénarios documentés.",
    },
    limit: {
      en: "The identity tasks are controlled and do not establish general self-knowledge. SHEV's longitudinal field campaign remains protocol-only; daemon findings still pass Ontogenesis authority, budget, review and proof gates before any repair is integrated.",
      fr: "Les tâches d’identité sont contrôlées et ne démontrent pas une connaissance de soi générale. La campagne longitudinale SHEV reste au stade du protocole ; les findings du daemon doivent toujours franchir les barrières d’autorité, de budget, de revue et de preuve d’Ontogenèse avant toute intégration de réparation.",
    },
    sourcePath: "benchmarks/identity-challenge/CAMPAIGN-REPORT-2026-10.md",
  },
  {
    id: "security-qualification-pipeline",
    status: "partial",
    date: "2026-10-22",
    title: { en: "A proof-governed security pipeline takes shape", fr: "Une chaîne de sécurité gouvernée par la preuve se met en place" },
    summary: {
      en: "GenOS now connects digital evidence ingestion, scoped CyberCorp actions, security-specialist morphogenesis, verified security dossiers, bounded recovery and security learning. The Security Authority Kernel and Security Qualification Lab add explicit authority and qualification paths, including mission CC-GENOS-001.",
      fr: "GenOS relie désormais l’ingestion de preuves numériques, les actions CyberCorp bornées, la morphogenèse de spécialistes, les dossiers de sécurité vérifiés, la récupération contrôlée et l’apprentissage de sécurité. Le Security Authority Kernel et le laboratoire de qualification ajoutent des parcours explicites d’autorité et de qualification, dont la mission CC-GENOS-001.",
    },
    evidence: {
      en: "The committed DEO, CyberCorp gateway, SERE, SHRE, Security Authority Kernel, learning/ontogenesis and qualification-lab implementations each have focused tests; CC-GENOS-001 replays the dossier and checks rejection of out-of-mandate actions.",
      fr: "Les implémentations commitées du DEO, de la passerelle CyberCorp, de SERE, SHRE, du Security Authority Kernel, de l’apprentissage/ontogenèse et du laboratoire de qualification disposent chacune de tests ciblés ; CC-GENOS-001 rejoue le dossier et vérifie le refus des actions hors mandat.",
    },
    limit: {
      en: "CC-GENOS-001 uses synthetic fixtures unless authenticated external exports and a dedicated trust policy are supplied, so its current result is pipeline qualification rather than real CyberCorp incident-response validation. A report or recovery receipt does not authorize an action by itself.",
      fr: "CC-GENOS-001 utilise des fixtures synthétiques tant que des exports externes authentifiés et une politique de confiance dédiée ne sont pas fournis : le résultat qualifie donc la chaîne, pas une réponse réelle à incident CyberCorp. Un rapport ou un reçu de récupération n’autorise pas une action à lui seul.",
    },
    sourcePath: "docs/adr/0729-mission-cc-genos-001.md",
  },
];
