import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/eyebrow";
import { concepts } from "@/components/concepts";
import { topologies } from "@/components/topologies";
import { morphogenesisCases } from "@/components/morphogenesis-cases";
import { TranslationNotice } from "@/components/locale-controls";
import { AgentCoordinationGuide, isCoordinationGuide } from "@/components/agent-coordination-guide";
import { genosSource, genosSourceCommit } from "@/components/product-evidence";
import { FrenchConceptDetail } from "@/components/french-concept-detail";
import { frenchConceptTitles } from "@/components/concept-french-titles";

type Summary = { title: string; emphasis: string; intro: string; bullets: string[]; family: string };

const summaries: Record<string, Summary> = {
  orchestrator: { title: "Orchestrer", emphasis: "avec intention.", intro: "Le planificateur GenOS décompose un objectif, distribue le travail, recueille les sorties puis les soumet aux contrôles et aux limites prévus. Pour Trinity, seuls les mondes de l’invocation courante comptent et agents comme mondes doivent être terminaux.", bullets: ["Choisir une topologie et des capacités", "Limiter ressources, permissions et budgets", "Vérifier l’état terminal et les preuves avant clôture"], family: "ORCHESTRATION" },
  runtime: { title: "Un état versionné", emphasis: "pour les parcours pris en charge.", intro: "GenOS peut versionner des workspaces et conserver certains reçus. La portée de la reprise dépend du mode, de l’adaptateur et des preuves disponibles; les effets externes ne sont pas restaurés automatiquement.", bullets: ["Inspecter les états pris en charge", "Comparer des branches", "Vérifier la portée de chaque replay"], family: "RUNTIME" },
  "runtime/supervision": { title: "Superviser", emphasis: "chaque frontière.", intro: "Le plan de contrôle expose les espaces de travail, budgets, événements, mémoires et preuves associés aux exécutions.", bullets: ["Contrôler portée et autorité", "Observer budgets et événements", "Examiner preuves et provenance"], family: "SUPERVISION" },
  "runtime/supervision/agents": { title: "Observer les agents", emphasis: "pendant leur exécution.", intro: "La supervision des agents suit leur cycle de vie, leurs handoffs et les résultats produits pendant une mission.", bullets: ["Suivre les états des agents", "Relier événements et résultats", "Examiner les limites du processus"], family: "SUPERVISION" },
  "runtime/supervision/workspaces": { title: "Isoler les workspaces", emphasis: "et leurs trajectoires.", intro: "Les workspaces isolent les changements candidats et les snapshots afin de comparer le travail sans confondre les états.", bullets: ["Examiner les workspaces", "Comparer des branches candidates", "Reprendre un snapshot"], family: "SUPERVISION" },
  "runtime/supervision/budgets": { title: "Borner une mission", emphasis: "par des budgets.", intro: "Les budgets déclarent les ressources et limites d’exécution associées à une mission GenOS.", bullets: ["Lire les budgets déclarés", "Observer les consommations", "Comprendre les limites d’application"], family: "SUPERVISION" },
  "runtime/supervision/events": { title: "Reconstituer une exécution", emphasis: "dans l’ordre des événements.", intro: "L’historique d’événements relie les étapes, les handoffs et les résultats d’une exécution supervisée.", bullets: ["Suivre la chronologie", "Examiner handoffs et statuts", "Relier les événements aux artifacts"], family: "SUPERVISION" },
  "runtime/supervision/memory": { title: "Gérer une mémoire", emphasis: "avec sa provenance.", intro: "La mémoire runtime associe récupération de contexte, portée et provenance pour rendre les éléments utilisés inspectables.", bullets: ["Comprendre la portée", "Examiner les éléments récupérés", "Suivre leur provenance"], family: "SUPERVISION" },
  "runtime/supervision/evidence": { title: "Relier les affirmations", emphasis: "aux artifacts et contrôles.", intro: "Les rapports de preuve associent les affirmations d’une exécution aux artifacts, vérifications, provenances et décisions de promotion.", bullets: ["Examiner les artifacts", "Lire les vérifications", "Suivre provenance et décision"], family: "SUPERVISION" },
  workers: { title: "Workers spécialisés", emphasis: "missions bornées.", intro: "Les workers prennent en charge des sous-tâches avec des rôles, des capacités et des autorisations transmis par l’orchestrateur. Les budgets cognitifs sont normalisés ; un lease vide reste vide et les outils fournis ne peuvent que restreindre la politique du rôle.", bullets: ["Assigner un rôle et une tâche", "Définir le budget et le périmètre", "Garder les handoffs inspectables"], family: "WORKERS" },
  daemons: { title: "Des services de fond", emphasis: "sous contrôle.", intro: "Les daemons maintiennent certaines fonctions du runtime et appliquent des limites de cycle de vie et d’autorité. Le host résident interroge un curseur durable indexé toutes les 500 ms et conserve sa position après redémarrage.", bullets: ["Séparer service et mission", "Observer état et erreurs", "Rester dans les frontières configurées"], family: "DAEMONS" },
  topologies: { title: "Huit modes de travail", emphasis: "une même gouvernance.", intro: "Les topologies décrivent comment les workers se coordonnent. Chaque mode relie des services différents et conserve ses limites d’implémentation.", bullets: ["Trinity : candidats parallèles et comparaison", "A-Team : spécialistes et transmissions", "Biocenose : communauté et votes", "Holobionte : hôte et symbiotes", "Syncytium : état partagé et cohérence", "Rhizome : capacités et traces", "Métapopulation : groupes régionaux et reprise", "Biome : allocation et collecte bornée"], family: "TOPOLOGIES" },
  morphogenesis: { title: "Composer des systèmes", emphasis: "et examiner leurs changements.", intro: "La morphogenèse compose des graphes exécutables et formule des propositions de changement structurel. Le chemin de mission par défaut ne les applique pas.", bullets: ["Définir des nœuds et des relations", "Soumettre les transitions à leurs préconditions et preuves", "Distinguer proposition, application et promotion"], family: "MORPHOGENÈSE" },
  organizations: { title: "Choisir une règle", emphasis: "pour décider ensemble.", intro: "Les organisations dynamiques décrivent des règles de décision collective. Elles sont distinctes des huit topologies de coordination.", bullets: ["Consensus et quorum", "Évaluation contradictoire", "Recherche distribuée et reprise"], family: "ORGANISATIONS" },
  research: { title: "Relier les idées", emphasis: "aux modèles et aux preuves.", intro: "La carte de recherche relie les systèmes de GenOS à leurs inspirations scientifiques, modèles mathématiques et questions ouvertes.", bullets: ["Distinguer métaphore et mécanisme", "Associer une mesure à chaque affirmation", "Repérer les propositions sans validation"], family: "RECHERCHE" },
  concepts: { title: "Un atlas canonique", emphasis: "des concepts GenOS.", intro: "L’atlas organise les concepts par familles et relie leurs modèles, implémentations, intégrations et éléments de preuve.", bullets: ["Identité et développement", "Cognition et contrôle", "Connaissance, mémoire et preuves", "Intelligence collective et orchestration", "Évolution, physiologie et immunité", "Vérification formelle et infrastructure"], family: "ATLAS DES CONCEPTS" },
  systems: { title: "Des familles reliées", emphasis: "dans un même runtime.", intro: "La carte des systèmes montre comment les composants GenOS s’organisent autour de l’identité, l’exécution, la coordination, la mémoire et la vérification.", bullets: ["Lire un concept dans son système", "Suivre les liens entre composants", "Comparer carte système et carte biologique"], family: "SYSTÈMES" },
  "systems/organism": { title: "Une carte biologique", emphasis: "avec ses correspondances logicielles.", intro: "Cette vue associe des fonctions du runtime à des métaphores biologiques tout en signalant ce qui est implémenté, simulé ou encore analogique.", bullets: ["Relier fonction et composant logiciel", "Séparer inspiration et preuve", "Voir les limites des correspondances"], family: "CARTE DE L’ORGANISME" },
  lab: { title: "Explorer des modèles", emphasis: "dans le navigateur.", intro: "Les laboratoires web rendent certaines idées interactives. Une simulation locale illustre les mécanismes et n’est pas une exécution GenOS en direct.", bullets: ["Modifier les hypothèses visibles", "Comparer les trajectoires calculées", "Relier la démo à ses limites"], family: "LABORATOIRE" },
  "lab/models": { title: "Modèles interactifs", emphasis: "et paramètres visibles.", intro: "Ces modèles de démonstration font varier les paramètres et montrent les conséquences calculées dans le navigateur.", bullets: ["Explorer les huit topologies", "Comparer des modèles de cognition", "Lire le périmètre de chaque simulation"], family: "STUDIO DE MODÈLES" },
  evidence: { title: "Examiner les affirmations", emphasis: "à la source.", intro: "Le registre V3 sépare les capacités partielles, expérimentales et implémentées, ainsi que le niveau de preuve. Trinity attend une qualification après correction; la campagne Biocénose SQLite a terminé trois cycles sans aucune promotion vérifiée.", bullets: ["Distinguer mécanisme testé et mission vérifiée", "Lire la tranche disponible et les validations manquantes", "Ouvrir le contrat V3 à un commit immuable"], family: "REGISTRE DE PREUVES" },
};

const frenchConceptSummaries: Record<string, Summary> = {
  "signal-plane": { title: "Zéro prompt inutile", emphasis: "pour les signaux courants.", intro: "Le Signal Plane traite les événements typés par règles et récepteurs déterministes. Une escalade cognitive reste possible lorsqu'aucune action directe ne suffit.", bullets: ["Suivre le trajet d'un signal", "Voir quand un LLM intervient", "Séparer livraison et preuve d'action"], family: "COMMUNICATION" },
  "communication-ecology": { title: "Communiquer", emphasis: "au bon niveau.", intro: "GenOS peut choisir le silence, une trace, un signal, un message structuré ou un échange verbal borné selon la situation.", bullets: ["Comparer les huit niveaux", "Comprendre le coût et la portée", "Distinguer réception et vérification"], family: "COMMUNICATION" },
  "agent-relationships": { title: "Relier les agents", emphasis: "sans confondre leurs rôles.", intro: "Le registre décrit 29 types de liens persistants répartis entre filiation, organisation, collaboration, social, épistémique et adversarial.", bullets: ["Parcourir les six classes", "Voir les types et recouvrements", "Séparer relation, message et autorité"], family: "RELATIONS" },
  genome: { title: "Le génome GenOS", emphasis: "est un modèle logiciel.", intro: "Il décrit des traits et contraintes versionnés. Les opérations Rust transforment ces données; cela ne démarre pas à lui seul un agent runtime.", bullets: ["Distinguer le modèle du processus agent", "Lire les opérations de transformation", "Ne pas confondre avec l’ADN biologique"], family: "CONCEPT GENOS" },
  epigenetics: { title: "L’épigénétique GenOS", emphasis: "est une analogie logicielle.", intro: "Les politiques règlent l’expression de traits modélisés selon le contexte. Le réajustement épigénétique du modèle n’est pas un mécanisme cellulaire.", bullets: ["Voir les traits comme des données", "Distinguer politique et biologie", "Consulter les limites de la reproduction"], family: "CONCEPT GENOS" },
  "agent-dna": { title: "AgentDNA", emphasis: "est un format de données.", intro: "Cet artefact versionné décrit l’identité et les traits d’un agent. Le modifier ne lance, ne clone et ne reconfigure pas à lui seul un worker.", bullets: ["Examiner le format binaire", "Séparer données et processus runtime", "Consulter le contrat canonique"], family: "CONCEPT GENOS" },
  reproduction: { title: "La reproduction GenOS", emphasis: "transforme des modèles.", intro: "Les routines Rust transforment des modèles de génome et de cellule; le démarrage d’un worker est séparé. Les handlers biomimétiques Node inscrivent des métadonnées de simulation, sans créer de descendants runtime.", bullets: ["Distinguer transformation et démarrage", "Lire les règles d’héritage modélisées", "Traiter jumeaux, triplets et chimères Node comme des simulations"], family: "CONCEPT GENOS" },
  mutation: { title: "La mutation GenOS", emphasis: "a plusieurs portées.", intro: "Les opérations Rust modifient des modèles génomiques. Les handlers biomimétiques MCP modifient des registres de scénario, sans changer l’AgentDNA d’un agent actif ni son comportement runtime.", bullets: ["Distinguer modèle Rust et registre Node", "Vérifier les bornes de chaque opération", "Ne pas interpréter un score simulé comme une mesure biologique"], family: "CONCEPT GENOS" },
};
function chooseSummary(path: string): Summary | undefined {
  const exact = summaries[path];
  if (exact) return exact;
  if (path.startsWith("concepts/")) {
    const slug = path.slice("concepts/".length);
    if (!concepts.some((c) => c.slug === slug)) return undefined;
    return frenchConceptSummaries[slug] ?? { title: "Une fiche de concept", emphasis: "ancrée dans le runtime.", intro: "La fiche anglaise détaille son mécanisme, son état d'implémentation et les preuves disponibles. Le résumé français de l'atlas présente les familles et les principes transverses.", bullets: ["Lire le concept dans l'Atlas français", "Ouvrir la fiche complète en anglais", "Vérifier les liens de preuve dans le dépôt"], family: "CONCEPT GENOS" };
  }
  if (path.startsWith("topologies/")) {
    const slug = path.slice("topologies/".length);
    if (!topologies.some((t) => t.slug === slug)) return undefined;
    return { title: "Une topologie GenOS", emphasis: "et son contrat d'exécution.", intro: "La fiche anglaise distingue le principe de coordination, les services connectés, les preuves et les limites du mode.", bullets: ["Voir la synthèse des huit topologies", "Ouvrir la fiche complète en anglais", "Consulter le contrat canonique"], family: "TOPOLOGIE" };
  }
  if (path.startsWith("morphogenesis/cases/")) {
    const slug = path.slice("morphogenesis/cases/".length);
    if (!morphogenesisCases.some((c) => c.slug === slug)) return undefined;
    return { title: "Un cas de morphogenèse", emphasis: "avec changements vérifiables.", intro: "L'étude de cas détaillée reste en anglais et documente le contexte, la trajectoire et les preuves de changement.", bullets: ["Explorer le laboratoire de morphogenèse", "Ouvrir l'étude complète en anglais", "Suivre les éléments de preuve"], family: "ÉTUDE DE CAS" };
  }
  return undefined;
}

export async function generateStaticParams() {
  const staticPaths = Object.keys(summaries).filter((path) => path !== "concepts" && path !== "organizations").map((path) => ({
    slug: path.split("/"),
  }));
  const conceptPaths = concepts.map(({ slug }) => ({
    slug: ["concepts", slug],
  }));
  const topologyPaths = topologies.map(({ slug }) => ({
    slug: ["topologies", slug],
  }));
  const casePaths = morphogenesisCases.map(({ slug }) => ({
    slug: ["morphogenesis", "cases", slug],
  }));
  return [...staticPaths, ...conceptPaths, ...topologyPaths, ...casePaths];
}

export async function generateMetadata({ params }: PageProps<"/fr/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  if (path.startsWith("concepts/")) {
    const concept = concepts.find((item) => item.slug === path.slice("concepts/".length));
    if (concept) return {
      title: `${frenchConceptTitles[concept.slug]} · concept GenOS`,
      description: concept.scienceBasisFr,
      alternates: { canonical: `/fr/${path}`, languages: { en: `/en/${path}`, fr: `/fr/${path}` } },
      openGraph: { locale: "fr_FR" },
    };
  }
  const summary = chooseSummary(path);
  return summary ? { title: (path.startsWith("concepts/") && isCoordinationGuide(path.slice("concepts/".length)) ? summary.title : summary.family) + " GenOS", description: summary.intro, alternates: { canonical: "/fr/" + path, languages: { en: "/en/" + path, fr: "/fr/" + path } }, openGraph: { locale: "fr_FR" } } : { title: "GenOS en français" };
}

export default async function FrenchOverviewPage({ params }: PageProps<"/fr/[...slug]">) {
  const { slug } = await params;
  const path = slug.join("/");
  const summary = chooseSummary(path);
  if (path.startsWith("concepts/")) {
    const concept = concepts.find((item) => item.slug === path.slice("concepts/".length));
    if (!concept) notFound();
    return <FrenchConceptDetail concept={concept} />;
  }
  if (!summary) notFound();
  const englishHref = "/en/" + path;
  const sourceHref = path.startsWith("concepts/") ? `https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}/docs/01-concepts` : path.startsWith("topologies/") ? genosSource("docs/02-orchestration/topologies-et-capacites.md") : `https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}/docs`;
  const guideSlug = path.startsWith("concepts/") ? path.slice("concepts/".length) : "";
  const hasGuide = isCoordinationGuide(guideSlug);
  const guideSources: Record<string, string> = { "signal-plane": "docs/01-concepts/signal-plane-zero-text.md", "communication-ecology": "docs/02-orchestration/communication.md", "agent-relationships": "docs/02-orchestration/relations-inter-agents.md" };
  const preciseSource = hasGuide ? genosSource(guideSources[guideSlug]) : sourceHref;
  return <div className="page-shell french-overview" lang="fr"><section className="page-hero section-wrap api-reference-hero"><Eyebrow>{summary.family} · {hasGuide ? "GUIDE EN FRANÇAIS" : "APERÇU EN FRANÇAIS"}</Eyebrow><h1>{summary.title}<br /><em>{summary.emphasis}</em></h1><p>{summary.intro}</p><ul>{summary.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className="hero-actions"><Link className="button button-dark" href={englishHref}>{hasGuide ? "Lire la version anglaise" : "Ouvrir la page détaillée en anglais"} <span>↗</span></Link><a className="button button-quiet" href={preciseSource} target="_blank" rel="noreferrer">Documentation GenOS ↗</a></div></section>{hasGuide && <AgentCoordinationGuide slug={guideSlug} language="fr" />}<section className="section-wrap french-overview-note">{!hasGuide && <TranslationNotice enPath={englishHref} />}<Link href="/fr">Retour à la présentation française →</Link></section></div>;
}
