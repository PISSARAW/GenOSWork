type Localized = { en: string; fr: string };

export type RepositoryDetail = {
  relation: Localized;
  impact: Localized;
  capability: Localized;
  genosPath?: string;
};

export const externalRepositoryDetails: Record<number, RepositoryDetail> = {
  1: {
    relation: { en: "Quality-diversity research candidate for Morphogenesis, Biome and Metapopulation.", fr: "Piste de recherche qualité-diversité pour Morphogenèse, Biome et Métapopulation." },
    impact: { en: "No direct code impact: GenOS selects topologies with its own services, without a pyribs archive.", fr: "Aucun impact direct sur le code : GenOS sélectionne ses topologies avec ses propres services, sans archive pyribs." },
    capability: { en: "Could keep a repertoire of organizations differentiated by cost, robustness and mission fit, then select a measured candidate.", fr: "Pourrait conserver un répertoire d’organisations différenciées par coût, robustesse et adéquation aux missions, puis choisir un candidat mesuré." },
  },
  2: {
    relation: { en: "Reference for bounded evolutionary search around GVX heuristics.", fr: "Référence pour la recherche évolutionnaire bornée autour des heuristiques GVX." },
    impact: { en: "No direct code impact: ShinkaEvolve does not generate or promote GenOS heuristics.", fr: "Aucun impact direct sur le code : ShinkaEvolve ne génère ni ne promeut les heuristiques GenOS." },
    capability: { en: "Could propose variants of worker selection or budget allocation while GVX independently evaluates and approves promotion.", fr: "Pourrait proposer des variantes de sélection de workers ou d’allocation de budgets, tandis que GVX évaluerait et autoriserait indépendamment leur promotion." },
  },
  3: {
    relation: { en: "Research comparison for self-modifying coding-agent lineages.", fr: "Point de comparaison scientifique pour les lignées d’agents de programmation auto-modifiants." },
    impact: { en: "No direct code impact: GenOS already keeps AgentDNA, forks and lineages without running DGM.", fr: "Aucun impact direct sur le code : GenOS conserve déjà AgentDNA, forks et lignées sans exécuter DGM." },
    capability: { en: "Could serve as a controlled rival for GVX on identical tasks and budgets, including intermediate candidates in the comparison.", fr: "Pourrait servir de concurrent contrôlé à GVX sur les mêmes tâches et budgets, en conservant les candidats intermédiaires dans la comparaison." },
  },
  4: {
    relation: { en: "Candidate method for estimating whether SHEV interventions caused observed effects.", fr: "Méthode candidate pour estimer si les interventions SHEV ont causé les effets observés." },
    impact: { en: "No direct code impact: GenOS records and verifies effects, but does not run DoWhy estimators or refutation tests.", fr: "Aucun impact direct sur le code : GenOS enregistre et vérifie des effets, sans exécuter les estimateurs ni les tests de réfutation DoWhy." },
    capability: { en: "Could estimate and challenge an intervention effect when longitudinal data and explicit causal assumptions are available.", fr: "Pourrait estimer et mettre à l’épreuve l’effet d’une intervention lorsque des données longitudinales et des hypothèses causales explicites sont disponibles." },
  },
  5: {
    relation: { en: "Optional external Python evaluation harness, separate from the GenOS runtime.", fr: "Banc d’évaluation Python externe et optionnel, séparé du runtime GenOS." },
    impact: { en: "Added four deterministic tasks and three paired arms: model alone, fixed topology and Morphogenesis. The scorer sits outside GenOS.", fr: "A ajouté quatre tâches déterministes et trois bras appariés : modèle seul, topologie imposée et Morphogenèse. L’évaluateur se trouve hors de GenOS." },
    capability: { en: "Can run an independently scored comparison once a real multi-arm runner is supplied; no model or topology result is published yet.", fr: "Permet de lancer une comparaison notée indépendamment dès qu’un vrai runner multibras est fourni ; aucun résultat de modèle ou de topologie n’est encore publié." },
    genosPath: "benchmarks/inspect-ai/",
  },
  6: {
    relation: { en: "Direct backend development dependency for property-based tests.", fr: "Dépendance directe du backend pour les tests par propriétés." },
    impact: { en: "Added seeded generated cases for MCP leases, local Morphogenesis limits and promotion transitions, with counterexample shrinking.", fr: "A ajouté des cas générés avec graine fixe pour les leases MCP, les limites de Morphogenèse locale et les transitions de promotion, avec réduction des contre-exemples." },
    capability: { en: "Can find short sequences that violate these safety invariants. Test adapters do not prove real worker execution or restoration.", fr: "Permet de trouver de petites séquences qui violent ces invariants de sécurité. Les adaptateurs de test ne prouvent ni l’exécution réelle des workers ni la restauration." },
    genosPath: "backend/tests/test_property_invariants.js",
  },
  7: {
    relation: { en: "Possible external security benchmark for tool-using agents.", fr: "Banc de sécurité externe possible pour les agents utilisant des outils." },
    impact: { en: "No direct code impact: GenOS has internal adversarial tests but no AgentDojo task or attack runner.", fr: "Aucun impact direct sur le code : GenOS possède des tests adversariaux internes, sans tâches ni runner d’attaque AgentDojo." },
    capability: { en: "Could measure whether untrusted web, tool or memory content redirects a GenOS agent while also measuring legitimate task completion.", fr: "Pourrait mesurer si des contenus web, d’outils ou de mémoire non fiables détournent un agent GenOS, tout en mesurant l’achèvement de la tâche légitime." },
  },
  8: {
    relation: { en: "External web-task environment for comparing agent organizations.", fr: "Environnement externe de tâches web pour comparer les organisations agentiques." },
    impact: { en: "No direct code impact: Playwright verifies bounded journeys, but GenOS does not run BrowserGym suites.", fr: "Aucun impact direct sur le code : Playwright vérifie des parcours bornés, mais GenOS n’exécute pas les suites BrowserGym." },
    capability: { en: "Could compare a single worker, fixed topologies and Morphogenesis on the same browser missions and budgets.", fr: "Pourrait comparer un worker seul, des topologies fixes et Morphogenèse sur les mêmes missions navigateur et les mêmes budgets." },
  },
  9: {
    relation: { en: "Direct local-v3 authorization dependency through the official Cedar WASM package.", fr: "Dépendance d’autorisation directe de v3 local via le package WASM officiel Cedar." },
    impact: { en: "Added a validated policy and StartMission/Control checks in the agent authority service; family or cooperation links do not grant permission by themselves.", fr: "A ajouté une politique validée et des contrôles StartMission/Control dans le service d’autorité des agents ; parenté ou coopération ne donnent pas seules une permission." },
    capability: { en: "Can refuse unauthorized mission starts and agent control at those boundaries. This policy does not yet cover every GenOS tool.", fr: "Permet de refuser un lancement de mission ou un contrôle d’agent non autorisé à ces frontières. Cette politique ne couvre pas encore tous les outils GenOS." },
    genosPath: "backend/src/services/cedarAgentAuthority.js",
  },
  10: {
    relation: { en: "Candidate for attenuated delegation between orchestrators and workers.", fr: "Piste de délégation atténuable entre orchestrateurs et workers." },
    impact: { en: "No direct code impact: GenOS leases are internal and no Biscuit token is issued or verified.", fr: "Aucun impact direct sur le code : les leases GenOS sont internes et aucun jeton Biscuit n’est émis ou vérifié." },
    capability: { en: "Could pass a verifiable token that a downstream worker may restrict but cannot expand.", fr: "Pourrait transmettre un jeton vérifiable qu’un worker en aval peut restreindre sans pouvoir l’élargir." },
  },
  11: {
    relation: { en: "Potential WebAssembly isolation layer for executable organs and plugins.", fr: "Couche d’isolation WebAssembly potentielle pour les organes exécutables et les plugins." },
    impact: { en: "No direct code impact: GenOS does not run plugins inside Wasmtime.", fr: "Aucun impact direct sur le code : GenOS n’exécute pas ses plugins dans Wasmtime." },
    capability: { en: "Could execute bounded candidate code with explicit imports and resource limits before GenOS promotion gates review its results.", fr: "Pourrait exécuter du code candidat dans un périmètre d’imports et de ressources explicite, avant l’examen de ses résultats par les gates de promotion GenOS." },
  },
  12: {
    relation: { en: "Cryptographic library candidate for sealed and transportable agent state.", fr: "Bibliothèque cryptographique candidate pour l’état agentique scellé et transportable." },
    impact: { en: "No direct code impact: GenOS capsule hashes detect alteration, but libsodium is not a dependency.", fr: "Aucun impact direct sur le code : les empreintes de capsules GenOS détectent une altération, mais libsodium n’est pas une dépendance." },
    capability: { en: "Could add authenticated encryption for transported spores or capsules once key management and restoration rules are defined.", fr: "Pourrait ajouter le chiffrement authentifié des spores ou capsules transportées après définition de la gestion des clés et des règles de restauration." },
  },
  13: {
    relation: { en: "Possible adapter or comparison for software-development workers.", fr: "Adaptateur ou comparateur possible pour les workers de développement logiciel." },
    impact: { en: "No direct code impact: GenOS coding workers use their own execution interfaces, not the OpenHands SDK.", fr: "Aucun impact direct sur le code : les workers de programmation GenOS utilisent leurs propres interfaces d’exécution, pas le SDK OpenHands." },
    capability: { en: "Could provide a common software environment interface to compare GenOS workers with an external coding-agent baseline.", fr: "Pourrait fournir une interface commune vers un environnement logiciel pour comparer les workers GenOS à un agent de programmation externe." },
  },
  14: {
    relation: { en: "Direct browser automation dependency in the GenOS web journey verifier.", fr: "Dépendance directe d’automatisation navigateur dans le vérificateur de parcours web GenOS." },
    impact: { en: "Added bounded Chromium actions and assertions, host allowlisting and hashed evidence receipts; newer local v3 reuses the verifier in SHEV audits.", fr: "A ajouté des actions et assertions Chromium bornées, une liste d’hôtes autorisés et des reçus de preuve hachés ; v3 local réutilise ce vérificateur dans les audits SHEV." },
    capability: { en: "Can check that a real page journey still works after an intervention and report confirmed, regressed or inconclusive.", fr: "Permet de vérifier qu’un parcours réel fonctionne encore après une intervention et de conclure confirmé, régressé ou inconclusif." },
    genosPath: "backend/src/services/webJourneyVerifier.js",
  },
  15: {
    relation: { en: "Direct local-v3 web quality sensor called from the SHEV audit flow.", fr: "Capteur direct de qualité web dans v3 local, appelé par le flux d’audit SHEV." },
    impact: { en: "Added thresholded Lighthouse category scores to stored web audit receipts and before/after effect checks.", fr: "A ajouté des scores Lighthouse à seuils aux reçus d’audit web et aux contrôles d’effet avant/après." },
    capability: { en: "Can detect a measured regression in selected performance, accessibility, best-practices or SEO scores; results depend on the browser environment.", fr: "Permet de détecter une régression mesurée des scores choisis de performance, accessibilité, bonnes pratiques ou SEO ; le résultat dépend de l’environnement navigateur." },
    genosPath: "backend/src/services/webAuditSensors.js",
  },
  16: {
    relation: { en: "Direct local-v3 accessibility sensor through @axe-core/playwright.", fr: "Capteur direct d’accessibilité dans v3 local via @axe-core/playwright." },
    impact: { en: "Added rule-violation counts and explicit thresholds to SHEV web audit receipts and effect checks.", fr: "A ajouté les nombres de violations de règles et des seuils explicites aux reçus d’audit web et aux contrôles d’effet SHEV." },
    capability: { en: "Can catch automated accessibility regressions after a change; a passing audit does not replace human accessibility review.", fr: "Permet de détecter des régressions d’accessibilité automatisables après un changement ; un audit vert ne remplace pas une revue humaine." },
    genosPath: "backend/src/services/webAuditSensors.js",
  },
  17: {
    relation: { en: "Reference architecture for long-running distributed workflows.", fr: "Architecture de référence pour les workflows distribués de longue durée." },
    impact: { en: "No direct code impact: GenOS persists and retries workflow state with SQLite, without a Temporal server.", fr: "Aucun impact direct sur le code : GenOS persiste et relance l’état des workflows avec SQLite, sans serveur Temporal." },
    capability: { en: "Could supply durable activity histories and recovery when external operations span workers or machines, after an explicit integration study.", fr: "Pourrait fournir un historique durable des activités et une reprise quand des opérations externes couvrent plusieurs workers ou machines, après étude d’intégration." },
  },
  18: {
    relation: { en: "Possible CRDT library for Syncytium shared state.", fr: "Bibliothèque CRDT possible pour l’état partagé de Syncytium." },
    impact: { en: "No direct code impact: Syncytium has its own Lamport-ordered CRDT operations; Automerge is not connected.", fr: "Aucun impact direct sur le code : Syncytium possède ses opérations CRDT ordonnées par horloge de Lamport ; Automerge n’est pas raccordé." },
    capability: { en: "Could merge concurrent offline annotations or work maps, while authority and promotion decisions remain outside the merged document.", fr: "Pourrait fusionner des annotations ou cartes de travail modifiées hors ligne, tandis que les décisions d’autorité et de promotion resteraient hors du document fusionné." },
  },
  19: {
    relation: { en: "Potential incremental computation engine for Rhizome and dependency propagation.", fr: "Moteur de calcul incrémental potentiel pour Rhizome et la propagation des dépendances." },
    impact: { en: "No direct code impact: GenOS does not use Differential Dataflow for its graph updates.", fr: "Aucun impact direct sur le code : GenOS n’utilise pas Differential Dataflow pour mettre à jour ses graphes." },
    capability: { en: "Could recompute only consequences of a changed belief, worker or relation if profiling shows full recalculation is costly.", fr: "Pourrait recalculer seulement les conséquences d’une croyance, d’un worker ou d’une relation modifiés si le profilage montre un coût de recalcul complet." },
  },
  20: {
    relation: { en: "Transport-format candidate for typed high-volume internal messages.", fr: "Format de transport candidat pour les messages internes typés et volumineux." },
    impact: { en: "No direct code impact: GenOS uses MessagePack and protobuf-related tooling, not Cap’n Proto.", fr: "Aucun impact direct sur le code : GenOS utilise MessagePack et des outils liés à protobuf, pas Cap’n Proto." },
    capability: { en: "Could reduce message size or latency in measured hot paths if its schema and binding costs justify migration.", fr: "Pourrait réduire taille ou latence des messages sur des chemins chauds mesurés si le coût des schémas et des bindings justifie la migration." },
  },
  21: {
    relation: { en: "Specialized reference for Lean proof-state traces and tactic search.", fr: "Référence spécialisée pour tracer les états de preuve Lean et chercher des tactiques." },
    impact: { en: "No direct code impact: GenOS has Lean-related verification work but no LeanDojo-v2 pipeline.", fr: "Aucun impact direct sur le code : GenOS comporte du travail de vérification Lean, sans pipeline LeanDojo-v2." },
    capability: { en: "Could retain failed proof states and retrieve relevant tactics or lemmas; Lean itself would still validate the final proof.", fr: "Pourrait conserver les états de preuve bloqués et retrouver tactiques ou lemmes pertinents ; Lean continuerait de valider la preuve finale." },
  },
  22: {
    relation: { en: "Formal-methods candidate for small critical runtime state machines.", fr: "Méthode formelle candidate pour de petites machines à états critiques du runtime." },
    impact: { en: "No direct code impact: GenOS does not compile or check a Dafny model of its leases, budgets or promotion gates.", fr: "Aucun impact direct sur le code : GenOS ne compile ni ne vérifie de modèle Dafny pour ses leases, budgets ou gates de promotion." },
    capability: { en: "Could verify a reference model and run conformance tests against the existing implementation; this would not automatically prove the JavaScript or Rust code.", fr: "Pourrait vérifier un modèle de référence puis tester la conformité de l’implémentation existante ; cela ne prouverait pas automatiquement le code JavaScript ou Rust." },
  },
  23: {
    relation: { en: "Potential constrained-decoding component for a compact command language.", fr: "Composant potentiel de décodage contraint pour un langage de commandes compact." },
    impact: { en: "No direct code impact: GenOS validates structured outputs but does not invoke XGrammar during model decoding.", fr: "Aucun impact direct sur le code : GenOS valide des sorties structurées, sans invoquer XGrammar pendant le décodage du modèle." },
    capability: { en: "Could force syntactically valid commands with a compatible inference engine; GenOS would still check meaning and authorization.", fr: "Pourrait imposer des commandes syntaxiquement valides avec un moteur d’inférence compatible ; GenOS devrait toujours vérifier leur sens et leur autorisation." },
  },
  24: {
    relation: { en: "Possible collection layer for GenOS traces, metrics and logs.", fr: "Couche de collecte possible pour les traces, métriques et journaux GenOS." },
    impact: { en: "No direct code impact: GenOS persists internal spans but has no native Collector exporter or uniform W3C propagation.", fr: "Aucun impact direct sur le code : GenOS persiste des spans internes, sans exporteur Collector natif ni propagation W3C uniforme." },
    capability: { en: "Could correlate mission, worker, topology, cost and recovery telemetry across services after instrumentation and sensitive-data filtering.", fr: "Pourrait corréler la télémétrie des missions, workers, topologies, coûts et reprises entre services après instrumentation et filtrage des données sensibles." },
  },
};
