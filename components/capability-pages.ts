export type CapabilityCopy = {
  name: string;
  tagline: string;
  purpose: string;
  mechanism: string;
  connected: string;
  open: string;
  example: string;
  evaluation: string;
  boundary: string;
};

export type CapabilityPage = {
  slug: string;
  claimId: string;
  sourcePath: string;
  codePath: string;
  en: CapabilityCopy;
  fr: CapabilityCopy;
};

/** Editorial summaries of the bounded GenOS V3 contracts pinned by product-evidence.ts. */
export const capabilityPages: CapabilityPage[] = [
  {
    slug: "meristeme-epistemique",
    claimId: "epistemic-meristem",
    sourcePath: "docs/02-orchestration/meristeme-epistemique.md",
    codePath: "backend/src/services/morphogenesis/capabilities/epistemicMeristem.js",
    en: {
      name: "Epistemic meristem",
      tagline: "Grow an experiment where a distinction is missing.",
      purpose: "When several workers propose different fixes but share the same untested assumption, GenOS needs a new experiment rather than another role.",
      mechanism: "Candidates declare hypotheses, predictions, distinguishing outcomes, dependencies, verifier, utility and cost. The ranker discounts overlap with experiments actually covered by verified receipts. Independent replication has a separate path.",
      connected: "Deterministic ranking, scoped coverage storage and optional Rhizome growth planning are connected. A proposed assignment alone does not occupy a niche.",
      open: "Autonomous worker recruitment, full Trinity contract adaptation and empirical calibration remain open.",
      example: "If three fixes assume that an event is delivered only once, a controlled duplicate delivery can test the shared assumption before allocating another fixer.",
      evaluation: "Compare against role recruitment and text diversity on hidden-cause incidents, with equal models and budgets. Measure discovered causes, shared errors and cost per useful distinction.",
      boundary: "The similarity score uses declared fields; it is not proven semantic diversity. Ranking cannot authorize a worker spawn.",
    },
    fr: {
      name: "Méristème épistémique",
      tagline: "Faire naître une expérience là où manque une distinction.",
      purpose: "Quand plusieurs workers proposent des corrections différentes mais partagent la même hypothèse non testée, GenOS a besoin d'une nouvelle expérience plutôt que d'un autre rôle.",
      mechanism: "Les candidats déclarent hypothèses, prédictions, résultats discriminants, dépendances, vérificateur, utilité et coût. Le classement pénalise le recouvrement avec les expériences effectivement couvertes par des reçus vérifiés. La réplication indépendante suit une voie distincte.",
      connected: "Le classement déterministe, le stockage des couvertures par périmètre et la planification optionnelle de croissance Rhizome sont reliés. Une simple affectation n'occupe pas une niche.",
      open: "Le recrutement autonome, l'adaptation complète des contrats Trinity et la calibration empirique restent à faire.",
      example: "Si trois corrections supposent qu'un événement n'est livré qu'une fois, une livraison doublée contrôlée peut tester cette hypothèse avant d'allouer un autre worker.",
      evaluation: "Comparer au recrutement par rôles et à la diversité textuelle sur des incidents à cause cachée, à modèles et budgets égaux. Mesurer les causes découvertes, les erreurs communes et le coût par distinction utile.",
      boundary: "La similarité repose sur des champs déclarés ; elle ne démontre pas une diversité sémantique. Le classement n'autorise aucun recrutement.",
    },
  },
  {
    slug: "spirale-de-deblocage",
    claimId: "unblock-spiral",
    sourcePath: "docs/02-orchestration/spirale-de-deblocage.md",
    codePath: "backend/src/services/morphogenesis/capabilities/unblockSpiral.js",
    en: {
      name: "Unblocking spiral",
      tagline: "Change the intervention or its scale when work stalls.",
      purpose: "Repeated attempts can change their wording while repeating the same operation. This controller asks for a different intervention family, an admissible scale or new evidence.",
      mechanism: "Each attempt records initial state, hypothesis, family, scale and evidence. A canonical signature rejects equivalent repeats except declared independent replication. The persisted search policy starts locally and may widen by one scale after two consecutive verified failures.",
      connected: "Signed attempts, duplicate refusal and bounded persistent progression are wired into morphology search and its existing transition gate.",
      open: "Automatic control of an entire mission and comparative evidence that this policy improves outcomes remain open.",
      example: "After two unmeasured SQL rewrites, another equivalent rewrite is refused. A measured index change remains local; a data-model change needs evidence that local options were exhausted.",
      evaluation: "Compare local and framework-changing problems at equal budget. Measure valid solutions, cost to first solution and unnecessary expansions.",
      boundary: "The search space is discrete, not a literal spiral. The current controller does not use the golden ratio, and a wider search grants no new permission.",
    },
    fr: {
      name: "Spirale de déblocage",
      tagline: "Changer de méthode ou d'échelle quand le travail stagne.",
      purpose: "Des tentatives successives peuvent changer de mots tout en répétant la même opération. Ce contrôleur exige une autre famille d'intervention, une échelle admissible ou une preuve nouvelle.",
      mechanism: "Chaque tentative enregistre l'état initial, l'hypothèse, la famille, l'échelle et les preuves. Une signature canonique refuse les répétitions équivalentes, sauf réplication indépendante déclarée. La recherche persistante commence localement et peut gagner une échelle après deux échecs vérifiés consécutifs.",
      connected: "L'historique signé, le refus des doublons et la progression bornée persistante sont reliés à la recherche morphologique et à son contrôle de transition.",
      open: "Le pilotage automatique d'une mission entière et la démonstration comparative d'un gain restent à faire.",
      example: "Après deux réécritures SQL sans mesure nouvelle, une troisième tentative équivalente est refusée. Une indexation mesurée reste locale ; changer le modèle de données demande de justifier l'épuisement des options locales.",
      evaluation: "Comparer des problèmes qui demandent une correction locale ou un changement de cadre, à budget égal. Mesurer les solutions valides, leur coût et les élargissements inutiles.",
      boundary: "L'espace de recherche est discret, pas une spirale littérale. Le contrôleur actuel n'utilise pas le nombre d'or et l'élargissement ne confère aucune autorisation.",
    },
  },
  {
    slug: "chronotaxie-aperiodique",
    claimId: "chronotaxis",
    sourcePath: "docs/02-orchestration/chronotaxie-aperiodique.md",
    codePath: "backend/src/services/morphogenesis/capabilities/chronotaxis.js",
    en: {
      name: "Aperiodic chronotaxis",
      tagline: "Observe more than one phase of a recurring problem.",
      purpose: "Fixed polling can always sample the healthy phase of a periodic fault. More probes at the same instant do not solve that blind spot.",
      mechanism: "A deterministic golden-angle phase sequence shifts observations within allowed windows. Schedules persist their index and offset. Coverage counts only explicit OBSERVED receipts; missed windows remain visible.",
      connected: "Phase calculation, interval schedules, wake identifiers and persisted observation receipts are available.",
      open: "A generic resident probe wired to wake events, field qualification and metapopulation migration timing remain open.",
      example: "A 300 ms fault repeats every ten seconds. Staggered windows can reach phases that fixed ten-second polling misses, while receipts show which phases were truly observed.",
      evaluation: "Compare fixed polling, fixed offsets, random jitter and chronotaxis on periodic, near-periodic and random faults at equal probe budget. Measure misses and detection delay.",
      boundary: "Maximum latency and minimum spacing constrain the sequence. It is predictable and offers no cryptographic or universal detection guarantee.",
    },
    fr: {
      name: "Chronotaxie apériodique",
      tagline: "Observer plusieurs phases d'un problème récurrent.",
      purpose: "Un sondage fixe peut toujours tomber sur la phase saine d'une panne périodique. Ajouter des sondes au même instant ne supprime pas cet angle mort.",
      mechanism: "Une suite déterministe de phases à angle d'or décale les observations dans les fenêtres autorisées. Les calendriers conservent leur index et leur décalage. La couverture ne compte que les reçus OBSERVED explicites ; les fenêtres manquées restent visibles.",
      connected: "Le calcul des phases, les calendriers périodiques, les identifiants de réveil et les reçus d'observation persistés sont disponibles.",
      open: "Le branchement d'une sonde résidente générique aux réveils, la qualification terrain et le calendrier des migrations Métapopulation restent ouverts.",
      example: "Une panne de 300 ms revient toutes les dix secondes. Des fenêtres déphasées peuvent atteindre les phases manquées par un sondage fixe ; les reçus montrent celles qui furent réellement observées.",
      evaluation: "Comparer sondage fixe, décalages fixes, jitter et chronotaxie sur des pannes périodiques, quasi périodiques et aléatoires à budget de sondes égal. Mesurer les défauts manqués et le délai de détection.",
      boundary: "La latence maximale et l'espacement minimal bornent la séquence. Elle est prévisible et ne garantit ni sécurité cryptographique ni détection universelle.",
    },
  },
  {
    slug: "cambium-contre-exemples",
    claimId: "cambium",
    sourcePath: "docs/02-orchestration/cambium-contre-exemples.md",
    codePath: "backend/src/services/morphogenesis/capabilities/cambiumService.js",
    en: {
      name: "Counterexample cambium",
      tagline: "Keep the exception that changes a decision.",
      purpose: "A procedure may be useful only under specific conditions. Memory compression must preserve the evidence that separates safe application from a harmful generalization.",
      mechanism: "Procedural claims link scope, environment version, conditions, verified witnesses and counterexamples. A compression gate checks resolvable artifacts and decision preservation; removing the last witness requires explicit degradation to UNVERIFIED.",
      connected: "A claim registry, transactional compression gate, SQL witness protection and conditional Holobiont memory recall exist.",
      open: "General automated replay into memory, ongoing artifact accessibility audits and broad comparative campaigns remain open.",
      example: "Retrying after a timeout works when the operation is idempotent. A timeout after an effect has already happened is a counterexample that must survive consolidation.",
      evaluation: "At equal storage, compare long histories with rare exceptions and version changes. Measure incorrect generalizations, lost witnesses and wrongly reactivated procedures.",
      boundary: "A resolvable witness today may disappear later. The injected decision comparator is a trust dependency, not a universal verifier.",
    },
    fr: {
      name: "Cambium des contre-exemples",
      tagline: "Conserver l'exception qui change la décision.",
      purpose: "Une procédure peut n'être utile que sous certaines conditions. La compression de mémoire doit préserver la preuve qui sépare une application sûre d'une généralisation dangereuse.",
      mechanism: "Les assertions procédurales relient périmètre, version d'environnement, conditions, témoins vérifiés et contre-exemples. Un contrôle de compression vérifie l'accès aux artefacts et la préservation des décisions ; retirer le dernier témoin exige une dégradation explicite à UNVERIFIED.",
      connected: "Un registre d'assertions, un contrôle transactionnel de compression, une protection SQL des témoins et un rappel conditionnel de la mémoire Holobionte existent.",
      open: "Le rejeu automatique dans la mémoire générale, les audits continus d'accessibilité et les campagnes comparatives restent à faire.",
      example: "Réessayer après timeout fonctionne si l'opération est idempotente. Un timeout après un effet déjà produit est un contre-exemple à conserver pendant la consolidation.",
      evaluation: "À stockage égal, comparer de longues histoires avec exceptions rares et changements de version. Mesurer les mauvaises généralisations, les témoins perdus et les procédures réactivées à tort.",
      boundary: "Un témoin accessible aujourd'hui peut disparaître. Le comparateur de décisions injecté est une dépendance de confiance, pas un vérificateur universel.",
    },
  },
  {
    slug: "infini-sous-contrat",
    claimId: "contracted-infinity",
    sourcePath: "docs/02-orchestration/infini-sous-contrat.md",
    codePath: "backend/src/services/morphogenesis/capabilities/riskLedgerService.js",
    en: {
      name: "Contracted infinity",
      tagline: "Carry a validation budget through an evolving lineage.",
      purpose: "Repeated adaptive comparisons create repeated chances to promote a false improvement. Forks, merges and rollbacks must not mint a fresh risk allowance.",
      mechanism: "A transactional ledger reserves statistical risk before a test, then records it as spent. Forks delegate only remaining budget; merging transfers existing grants without creating new ones. An opt-in gate uses a bounded sequential test receipt.",
      connected: "The risk ledger and opt-in Trinity and Biocenosis promotion gates are connected for scoped tests.",
      open: "Data provenance checks, more promotion paths and long empirical campaigns remain open.",
      example: "Two branches test candidate procedures. Their allocations come from one parent grant; merging their results cannot issue another copy of that grant.",
      evaluation: "Run long adaptive campaigns with null and real improvements, plus fork, replay and merge attacks. Measure false promotions, true gains and evaluation cost.",
      boundary: "The bound holds only if each test is valid under its actual selection, data and stopping rules. The ledger alone does not establish real-world safety.",
    },
    fr: {
      name: "Infini sous contrat",
      tagline: "Transmettre un budget de validation dans une lignée évolutive.",
      purpose: "Des comparaisons adaptatives répétées multiplient les occasions de promouvoir un faux progrès. Fork, fusion et rollback ne doivent pas créer un nouveau budget de risque.",
      mechanism: "Un registre transactionnel réserve le risque statistique avant un test puis le comptabilise comme dépensé. Les forks ne délèguent que le solde ; une fusion transfère les allocations existantes sans en créer. Un contrôle facultatif utilise un reçu de test séquentiel borné.",
      connected: "Le registre de risque et les contrôles facultatifs de promotion Trinity et Biocénose sont reliés pour des tests à périmètre déclaré.",
      open: "La vérification de provenance des données, d'autres chemins de promotion et les longues campagnes empiriques restent ouverts.",
      example: "Deux branches testent des procédures candidates. Leurs allocations viennent d'un même budget parent ; leur fusion ne peut pas en émettre une nouvelle copie.",
      evaluation: "Mener de longues campagnes adaptatives avec faux et vrais gains, puis attaquer les chemins fork, replay et fusion. Mesurer fausses promotions, vrais gains et coût d'évaluation.",
      boundary: "La borne ne tient que si chaque test est valide pour la sélection, les données et les règles d'arrêt réellement utilisées. Le registre seul ne démontre pas la sûreté réelle.",
    },
  },
];

export function getCapabilityPage(slug: string) {
  return capabilityPages.find((page) => page.slug === slug);
}

export function capabilityHref(claimId: string, locale: "en" | "fr" = "en") {
  const page = capabilityPages.find((item) => item.claimId === claimId);
  return page ? `/${locale}/capabilities/${page.slug}` : undefined;
}
