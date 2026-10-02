export type ConceptSlug = "maladies" | "memoire" | "cortex" | "ontogenese" | "ontologie";
export type ConceptDiagram = "clinical" | "memory" | "cortex" | "ontogenesis" | "ontology";

export type Concept = {
  slug: ConceptSlug;
  number: string;
  title: string;
  eyebrow: string;
  intro: string;
  status: string;
  statusTone: "green" | "amber" | "purple";
  diagram: ConceptDiagram;
  diagramTitle: string;
  diagramDescription: string;
  steps: { title: string; body: string }[];
  scopeTitle: string;
  scope: string;
  source: string;
  sourceLabel: string;
};

export const concepts: Concept[] = [
  {
    slug: "maladies", number: "01", title: "Maladies", eyebrow: "PATHOLOGIES COMPUTATIONNELLES",
    intro: "GenOS modélise des dérèglements possibles dans un système d’agents : alertes excessives, contamination entre espaces, effets indésirables d’une intervention ou dégradation des performances.",
    status: "Modèle clinique · raccordement partiel", statusTone: "amber", diagram: "clinical",
    diagramTitle: "Surveiller, isoler, réévaluer",
    diagramDescription: "Un moniteur relève des signaux, un évaluateur qualifie le problème, une mesure bornée est appliquée, puis l’état est vérifié.",
    steps: [
      { title: "Observer", body: "Suivre l’état clinique simulé, les budgets, les alertes et les signaux de propagation." },
      { title: "Qualifier", body: "Classer le dérèglement comme auto-immun, nosocomial, iatrogène ou dégénératif." },
      { title: "Contenir", body: "Selon le cas, isoler un espace, réduire une alerte ou corriger une intervention excessive." },
      { title: "Vérifier", body: "Mesurer le nouvel état et décider d’une réintégration, d’une nouvelle action ou d’un arrêt." },
    ],
    scopeTitle: "Une analogie logicielle, pas un outil médical",
    scope: "Les « maladies » décrivent des états simulés d’agents et leurs mécanismes de gouvernance. Elles ne décrivent pas des maladies humaines et GenOS ne diagnostique ni ne traite des personnes. La documentation précise que seules certaines primitives et certains effets sont effectivement raccordés ; les autres scénarios restent des propositions.",
    source: "01-concepts/nosologie/pathologie-et-medecine.md", sourceLabel: "Pathologie et médecine computationnelle",
  },
  {
    slug: "memoire", number: "02", title: "Mémoire", eyebrow: "EXPÉRIENCE · RAPPEL · CONSOLIDATION",
    intro: "La mémoire de GenOS aide à retrouver des expériences utiles, à relier des décisions et à éviter des impasses connues. Elle combine des épisodes détaillés avec des faits indexés et des signaux de provenance.",
    status: "Implémenté · plusieurs mécanismes", statusTone: "green", diagram: "memory",
    diagramTitle: "De l’expérience au rappel",
    diagramDescription: "Les expériences et les connaissances sont indexées, classées par pertinence, puis rappelées pour éclairer une mission ; des cycles de consolidation et d’élagage entretiennent le corpus.",
    steps: [
      { title: "Encoder", body: "Une mémoire épisodique conserve le contexte, l’action, l’observation et le résultat d’une expérience." },
      { title: "Indexer", body: "Les faits et décisions peuvent être retrouvés par recherche lexicale et vectorielle." },
      { title: "Classer", body: "Le rappel combine similarité, correspondance lexicale, récence, crédibilité et signaux de succès ou d’échec." },
      { title: "Consolider", body: "La plasticité ajuste certains liens ; la consolidation et l’élagage limitent les souvenirs peu utiles." },
    ],
    scopeTitle: "Le rappel reste une sélection, pas une preuve",
    scope: "La mémoire peut orienter une décision, mais un élément rappelé ne devient pas vrai par sa seule présence. GenOS conserve la provenance et distingue l’expérience, le score de rappel et la vérification indépendante.",
    source: "01-concepts/memoire-et-apprentissage.md", sourceLabel: "Mémoire et apprentissage",
  },
  {
    slug: "cortex", number: "03", title: "Cortex", eyebrow: "UNE MÉTAPHORE D’ARCHITECTURE",
    intro: "Dans GenOS, le mot « cortex » sert à expliquer certaines fonctions de récupération et de mise en relation. Il ne désigne pas un cerveau artificiel unifié : les mécanismes sont répartis entre index, mémoires, agents et contrôleurs.",
    status: "Analogie documentée · limites explicites", statusTone: "purple", diagram: "cortex",
    diagramTitle: "Une fonction distribuée de rappel",
    diagramDescription: "Une demande interroge des mémoires épisodiques et sémantiques ; un classement prépare le contexte rappelé, qui est ensuite utilisé par un agent et soumis à vérification.",
    steps: [
      { title: "Recevoir une demande", body: "Une mission ou une question fournit le contexte de recherche." },
      { title: "Explorer les mémoires", body: "Les index lexical et vectoriel repèrent des épisodes, faits et décisions apparentés." },
      { title: "Composer le contexte", body: "Les résultats classés sont proposés à l’agent avec leurs éléments de provenance." },
      { title: "Contrôler la sortie", body: "L’agent produit une réponse ou une action, qui conserve ses propres obligations de vérification." },
    ],
    scopeTitle: "Pas une simulation du cerveau humain",
    scope: "La documentation présente les images de cortex, d’hippocampe et de synapse comme des analogies de conception. Elles ne prouvent ni une équivalence neurobiologique, ni une perception, ni une expérience subjective. La recherche sémantique est une fonction logicielle de récupération.",
    source: "01-concepts/memoire-et-apprentissage.md", sourceLabel: "Mémoire sémantique et analogie du cortex",
  },
  {
    slug: "ontogenese", number: "04", title: "Ontogenèse", eyebrow: "CONTINUITÉ D’UN PROJET",
    intro: "L’Ontogenèse est le contrôleur résident qui suit un projet entre ses missions : il sélectionne une tâche, lance une exécution bornée, examine les preuves et organise l’intégration ou la reprise.",
    status: "Partiel · boucle et états raccordés", statusTone: "amber", diagram: "ontogenesis",
    diagramTitle: "Une boucle de missions vérifiées",
    diagramDescription: "Le projet planifie, exécute, vérifie puis intègre une mission. Un échec retourne à la planification ; une contrainte peut mettre la boucle en attente.",
    steps: [
      { title: "Planifier", body: "Choisir dans un backlog une tâche admissible, selon les dépendances, les priorités et les budgets." },
      { title: "Exécuter", body: "Déléguer une mission bornée au runtime GenOS et conserver son état." },
      { title: "Vérifier", body: "Examiner les preuves ; sans preuves suffisantes, la mission retourne en planification." },
      { title: "Intégrer et réévaluer", body: "Intégrer un résultat accepté, mémoriser les échecs et choisir la suite ou attendre un événement." },
    ],
    scopeTitle: "Le contrôleur n’est pas un organisme vivant",
    scope: "L’analogie du développement décrit un projet qui traverse des états logiciels et des contraintes de ressources. La documentation marque l’Ontogenèse comme partielle : la boucle, des politiques de sélection et des mécanismes de persistance existent, mais la reprise transparente de tous les scénarios n’est pas garantie.",
    source: "01-concepts/ontogenese.md", sourceLabel: "Ontogenèse : contrôleur résident de projet",
  },
  {
    slug: "ontologie", number: "05", title: "Ontologie", eyebrow: "ENTITÉS · RELATIONS · MONDES POSSIBLES",
    intro: "L’ontologie opérationnelle fournit des structures pour décrire des entités, leurs critères d’identité, leurs relations et des scénarios hypothétiques. Elle aide à formuler des analyses, sans décider seule de ce qui doit être exécuté.",
    status: "Analyses bornées · non exécutoires", statusTone: "purple", diagram: "ontology",
    diagramTitle: "Décrire avant d’agir",
    diagramDescription: "Des entités et propriétés structurent une question ; des relations ou mondes possibles peuvent être analysés avec provenance et incertitude, sans déclencher d’action.",
    steps: [
      { title: "Définir", body: "Décrire une entité avec ses propriétés et critères d’identité explicites." },
      { title: "Relier", body: "Enregistrer une relation ou une observation de continuité entre des entités." },
      { title: "Explorer", body: "Construire et comparer des mondes possibles avec des hypothèses déclarées." },
      { title: "Qualifier", body: "Rendre l’analyse avec provenance et incertitude ; les mondes hypothétiques restent non vérifiés." },
    ],
    scopeTitle: "Une analyse ne vaut pas validation du réel",
    scope: "Les opérations ontologiques décrivent ou comparent des structures hypothétiques. Elles n’accordent pas d’autorisation, ne promeuvent pas un résultat et ne prouvent pas qu’un scénario s’est produit dans le monde réel.",
    source: "03-reference/ontologie-operationnelle.md", sourceLabel: "Contrat de l’ontologie opérationnelle",
  },
];

export function getConcept(slug: string) {
  return concepts.find((concept) => concept.slug === slug);
}
