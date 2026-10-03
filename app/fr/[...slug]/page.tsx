import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/eyebrow";
import { concepts } from "@/components/concepts";
import { topologies } from "@/components/topologies";
import { morphogenesisCases } from "@/components/morphogenesis-cases";
import { TranslationNotice } from "@/components/locale-controls";

type Summary = { title: string; emphasis: string; intro: string; bullets: string[]; family: string };

const summaries: Record<string, Summary> = {
  orchestrator: { title: "Orchestrer", emphasis: "avec intention.", intro: "Le planificateur GenOS décompose un objectif, distribue le travail, recueille les sorties puis les soumet aux contrôles et aux limites prévus.", bullets: ["Choisir une topologie et des capacités", "Limiter les ressources et les permissions", "Relier décisions, traces et résultats"], family: "ORCHESTRATION" },
  runtime: { title: "Un état versionné", emphasis: "pour le travail des agents.", intro: "GenOS conserve les snapshots, branches, changements et traces d’exécution afin que le travail puisse être comparé et repris.", bullets: ["Capturer et inspecter des états", "Créer des branches de trajectoire", "Rejouer à partir de snapshots vérifiés"], family: "RUNTIME" },
  "runtime/supervision": { title: "Superviser", emphasis: "chaque frontière.", intro: "Le plan de contrôle expose les espaces de travail, budgets, événements, mémoires et preuves associés aux exécutions.", bullets: ["Contrôler portée et autorité", "Observer budgets et événements", "Examiner preuves et provenance"], family: "SUPERVISION" },
  "runtime/supervision/agents": { title: "Observer les agents", emphasis: "pendant leur exécution.", intro: "La supervision des agents suit leur cycle de vie, leurs handoffs et les résultats produits pendant une mission.", bullets: ["Suivre les états des agents", "Relier événements et résultats", "Examiner les limites du processus"], family: "SUPERVISION" },
  "runtime/supervision/workspaces": { title: "Isoler les workspaces", emphasis: "et leurs trajectoires.", intro: "Les workspaces isolent les changements candidats et les snapshots afin de comparer le travail sans confondre les états.", bullets: ["Examiner les workspaces", "Comparer des branches candidates", "Reprendre un snapshot"], family: "SUPERVISION" },
  "runtime/supervision/budgets": { title: "Borner une mission", emphasis: "par des budgets.", intro: "Les budgets déclarent les ressources et limites d’exécution associées à une mission GenOS.", bullets: ["Lire les budgets déclarés", "Observer les consommations", "Comprendre les limites d’application"], family: "SUPERVISION" },
  "runtime/supervision/events": { title: "Reconstituer une exécution", emphasis: "dans l’ordre des événements.", intro: "L’historique d’événements relie les étapes, les handoffs et les résultats d’une exécution supervisée.", bullets: ["Suivre la chronologie", "Examiner handoffs et statuts", "Relier les événements aux artifacts"], family: "SUPERVISION" },
  "runtime/supervision/memory": { title: "Gérer une mémoire", emphasis: "avec sa provenance.", intro: "La mémoire runtime associe récupération de contexte, portée et provenance pour rendre les éléments utilisés inspectables.", bullets: ["Comprendre la portée", "Examiner les éléments récupérés", "Suivre leur provenance"], family: "SUPERVISION" },
  "runtime/supervision/evidence": { title: "Relier les affirmations", emphasis: "aux artifacts et contrôles.", intro: "Les rapports de preuve associent les affirmations d’une exécution aux artifacts, vérifications, provenances et décisions de promotion.", bullets: ["Examiner les artifacts", "Lire les vérifications", "Suivre provenance et décision"], family: "SUPERVISION" },
  workers: { title: "Workers spécialisés", emphasis: "missions bornées.", intro: "Les workers prennent en charge des sous-tâches avec des rôles, des capacités et des autorisations transmis par l’orchestrateur.", bullets: ["Assigner un rôle et une tâche", "Définir le budget et le périmètre", "Garder les handoffs inspectables"], family: "WORKERS" },
  daemons: { title: "Des services de fond", emphasis: "sous contrôle.", intro: "Les daemons maintiennent certaines fonctions du runtime et appliquent des limites de cycle de vie et d’autorité.", bullets: ["Séparer service et mission", "Observer état et erreurs", "Rester dans les frontières configurées"], family: "DAEMONS" },
  topologies: { title: "Huit modes de travail", emphasis: "une même gouvernance.", intro: "Les topologies décrivent comment les workers se coordonnent. Chaque mode relie des services différents et conserve ses limites d’implémentation.", bullets: ["Trinity : candidats parallèles et comparaison", "A-Team : spécialistes et transmissions", "Biocenose : communauté et votes", "Holobionte : hôte et symbiotes", "Syncytium : état partagé et cohérence", "Rhizome : capacités et traces", "Métapopulation : groupes régionaux et reprise", "Biome : allocation et collecte bornée"], family: "TOPOLOGIES" },
  morphogenesis: { title: "Composer des systèmes", emphasis: "et examiner leurs changements.", intro: "La morphogenèse compose des graphes exécutables et formule des propositions de changement structurel. Le chemin de mission par défaut ne les applique pas.", bullets: ["Définir des nœuds et des relations", "Soumettre les transitions à leurs préconditions et preuves", "Distinguer proposition, application et promotion"], family: "MORPHOGENÈSE" },
  organizations: { title: "Choisir une règle", emphasis: "pour décider ensemble.", intro: "Les organisations dynamiques décrivent des règles de décision collective. Elles sont distinctes des huit topologies de coordination.", bullets: ["Consensus et quorum", "Évaluation contradictoire", "Recherche distribuée et reprise"], family: "ORGANISATIONS" },
  research: { title: "Relier les idées", emphasis: "aux modèles et aux preuves.", intro: "La carte de recherche relie les systèmes de GenOS à leurs inspirations scientifiques, modèles mathématiques et questions ouvertes.", bullets: ["Distinguer métaphore et mécanisme", "Associer une mesure à chaque affirmation", "Repérer les propositions sans validation"], family: "RECHERCHE" },
  concepts: { title: "Un atlas canonique", emphasis: "des concepts GenOS.", intro: "L’atlas organise les concepts par familles et relie leurs modèles, implémentations, intégrations et éléments de preuve.", bullets: ["Identité et développement", "Cognition et contrôle", "Connaissance, mémoire et preuves", "Intelligence collective et orchestration", "Évolution, physiologie et immunité", "Vérification formelle et infrastructure"], family: "ATLAS DES CONCEPTS" },
  systems: { title: "Des familles reliées", emphasis: "dans un même runtime.", intro: "La carte des systèmes montre comment les composants GenOS s’organisent autour de l’identité, l’exécution, la coordination, la mémoire et la vérification.", bullets: ["Lire un concept dans son système", "Suivre les liens entre composants", "Comparer carte système et carte biologique"], family: "SYSTÈMES" },
  "systems/organism": { title: "Une carte biologique", emphasis: "avec ses correspondances logicielles.", intro: "Cette vue associe des fonctions du runtime à des métaphores biologiques tout en signalant ce qui est implémenté, simulé ou encore analogique.", bullets: ["Relier fonction et composant logiciel", "Séparer inspiration et preuve", "Voir les limites des correspondances"], family: "CARTE DE L’ORGANISME" },
  lab: { title: "Explorer des modèles", emphasis: "dans le navigateur.", intro: "Les laboratoires web rendent certaines idées interactives. Une simulation locale illustre les mécanismes et n’est pas une exécution GenOS en direct.", bullets: ["Modifier les hypothèses visibles", "Comparer les trajectoires calculées", "Relier la démo à ses limites"], family: "LABORATOIRE" },
  "lab/models": { title: "Modèles interactifs", emphasis: "et paramètres visibles.", intro: "Ces modèles de démonstration font varier les paramètres et montrent les conséquences calculées dans le navigateur.", bullets: ["Explorer les huit topologies", "Comparer des modèles de cognition", "Lire le périmètre de chaque simulation"], family: "STUDIO DE MODÈLES" },
  evidence: { title: "Examiner les affirmations", emphasis: "à la source.", intro: "Le registre de preuves sépare les capacités implémentées, partielles, intégrées et proposées. Chaque statut renvoie aux contrats GenOS.", bullets: ["Lire l’état d’implémentation", "Suivre les limites connues", "Ouvrir le document source canonique"], family: "REGISTRE DE PREUVES" },
};

function chooseSummary(path: string): Summary | undefined {
  const exact = summaries[path];
  if (exact) return exact;
  if (path.startsWith("concepts/")) {
    const slug = path.slice("concepts/".length);
    if (!concepts.some((c) => c.slug === slug)) return undefined;
    return { title: "Une fiche de concept", emphasis: "ancrée dans le runtime.", intro: "La fiche anglaise détaille son mécanisme, son état d'implémentation et les preuves disponibles. Le résumé français de l'atlas présente les familles et les principes transverses.", bullets: ["Lire le concept dans l'Atlas français", "Ouvrir la fiche complète en anglais", "Vérifier les liens de preuve dans le dépôt"], family: "CONCEPT GENOS" };
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
  const staticPaths = Object.keys(summaries).map((path) => ({
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
  const summary = chooseSummary(path);
  return summary ? { title: summary.family + " GenOS", description: summary.intro, alternates: { canonical: "/fr/" + path, languages: { en: "/en/" + path, fr: "/fr/" + path } }, openGraph: { locale: "fr_FR" } } : { title: "GenOS en français" };
}

export default async function FrenchOverviewPage({ params }: PageProps<"/fr/[...slug]">) {
  const { slug } = await params;
  const path = slug.join("/");
  const summary = chooseSummary(path);
  if (!summary) notFound();
  const englishHref = "/en/" + path;
  const sourceHref = path.startsWith("concepts/") ? "https://github.com/PISSARAW/GenOS/tree/v3/docs/01-concepts" : path.startsWith("topologies/") ? "https://github.com/PISSARAW/GenOS/blob/v3/docs/02-orchestration/topologies-et-capacites.md" : "https://github.com/PISSARAW/GenOS/tree/v3/docs";
  return <div className="page-shell french-overview" lang="fr"><section className="page-hero section-wrap api-reference-hero"><Eyebrow>{summary.family} · APERÇU EN FRANÇAIS</Eyebrow><h1>{summary.title}<br /><em>{summary.emphasis}</em></h1><p>{summary.intro}</p><ul>{summary.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className="hero-actions"><Link className="button button-dark" href={englishHref}>Ouvrir la page détaillée en anglais <span>↗</span></Link><a className="button button-quiet" href={sourceHref} target="_blank" rel="noreferrer">Documentation GenOS ↗</a></div></section><section className="section-wrap french-overview-note"><TranslationNotice enPath={englishHref} /><Link href="/fr">Retour à la présentation française →</Link></section></div>;
}
