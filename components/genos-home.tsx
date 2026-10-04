import Link from "next/link";
import { genosSource } from "@/components/product-evidence";

const content = {
  en: {
    kicker: "GENOS AGENT RUNTIME / OPEN SOURCE",
    heroLead: "An agent runtime built for",
    heroEm: "what happens next.",
    intro: "GenOS versions workspace state, runs supervised agents within boundaries, and keeps evidence attached to decisions. Fork approaches, inspect the results, and promote a change only when its checks support it.",
    runtime: "Explore the runtime",
    demo: "Try the zero-token demo",
    caveat: "Alpha software · capabilities and evidence vary by execution path",
    flowLabel: "A GENOS WORKFLOW / ILLUSTRATIVE",
    flow: [
      { n: "01", title: "Versioned starting state", detail: "snapshot · workspace · context" },
      { n: "02", title: "Counterfactual branches", detail: "isolated candidates · budgets" },
      { n: "03", title: "Evidence gate", detail: "diff · checks · decision" },
    ],
    branchA: "approach A", branchB: "approach B",
    outcome: "Promote, hold, or revise",
    flowNote: "A successful run alone does not establish a valid outcome.",
    facts: ["8 orchestration topologies", "Rust runtime + Node.js control plane", "CLI + leased MCP tools"],
    mechanicsKicker: "01 / THE RUNTIME",
    mechanicsLead: "Work can branch.",
    mechanicsEm: "The reasoning stays visible.",
    mechanicsIntro: "GenOS provides concrete operations for state, execution, and review. Coverage depends on the adapter and workflow; the evidence ledger records those limits.",
    mechanics: [
      { title: "Version the state", body: "Snapshot supported workspace state and compare later changes with a concrete starting point.", route: "/runtime", action: "Runtime model" },
      { title: "Explore alternatives", body: "Fork isolated candidates, inspect diffs, and replay supported trajectories when the inputs permit it.", route: "/sandbox", action: "Explore the sandbox" },
      { title: "Supervise execution", body: "Launch agents through configured runtimes with workspace boundaries, budgets, events, and handoffs.", route: "/orchestrator", action: "Orchestration" },
      { title: "Gate the decision", body: "Keep receipts and checks with the proposal. A gate can hold or reject a change when evidence is missing.", route: "/evidence", action: "Evidence ledger" },
    ],
    topologiesKicker: "02 / ORCHESTRATION",
    topologiesLead: "Eight ways to",
    topologiesEm: "organize the agents.",
    topologiesIntro: "Topologies define different coordination patterns. Each has its own contract, implementation status, and validation gaps.",
    groups: [
      { title: "Compare & specialize", names: "Trinity · A-Team", body: "Parallel candidate worlds and domain specialists." },
      { title: "Coordinate & share", names: "Biocénose · Syncytium · Rhizome", body: "Quorums, shared state, and capability-based routing." },
      { title: "Adapt & recover", names: "Holobionte · Biome · Métapopulation", body: "Host controls, resource cycles, and lineage-aware recovery." },
    ],
    topologyCaveat: "A registered topology does not imply every declared capability is active or validated end to end.",
    topologyLink: "Compare all eight topologies",
    proofKicker: "03 / START WITH EVIDENCE",
    proofLead: "Inspect the system.",
    proofEm: "See its limits.",
    proofBody: "The site separates implemented paths from partial, experimental, and proposed work. Recorded runs retain incomplete outcomes; the source and capability contracts explain what each path can actually do.",
    proofLinks: [
      { title: "Inspect a recorded run", route: "/runs" },
      { title: "Read the evidence ledger", route: "/evidence" },
      { title: "Build with GenOS", route: "/developers" },
    ],
    source: "Read the source and product contract",
    factsLabel: "GenOS at a glance",
    exploreLabel: "Explore GenOS",
  },
  fr: {
    kicker: "GENOS AGENT RUNTIME / OPEN SOURCE",
    heroLead: "Un runtime d’agents fait pour",
    heroEm: "la suite du travail.",
    intro: "GenOS versionne l’état des workspaces, exécute des agents supervisés dans un cadre borné et relie les preuves aux décisions. Explorez plusieurs approches, examinez leurs résultats et ne validez un changement que si les contrôles le justifient.",
    runtime: "Explorer le runtime",
    demo: "Essayer la démo sans token",
    caveat: "Logiciel alpha · capacités et preuves variables selon le parcours",
    flowLabel: "UN PARCOURS GENOS / SCHÉMA ILLUSTRATIF",
    flow: [
      { n: "01", title: "État initial versionné", detail: "snapshot · workspace · contexte" },
      { n: "02", title: "Branches contrefactuelles", detail: "candidats isolés · budgets" },
      { n: "03", title: "Barrière de preuve", detail: "diff · contrôles · décision" },
    ],
    branchA: "approche A", branchB: "approche B",
    outcome: "Valider, retenir ou réviser",
    flowNote: "Une exécution réussie ne prouve pas à elle seule la validité du résultat.",
    facts: ["8 topologies d’orchestration", "Runtime Rust + plan de contrôle Node.js", "CLI + outils MCP sous autorisation"],
    mechanicsKicker: "01 / LE RUNTIME",
    mechanicsLead: "Le travail peut bifurquer.",
    mechanicsEm: "Les raisons restent visibles.",
    mechanicsIntro: "GenOS fournit des opérations concrètes pour l’état, l’exécution et la revue. Leur couverture dépend de l’adaptateur et du parcours ; le registre des preuves expose ces limites.",
    mechanics: [
      { title: "Versionner l’état", body: "Créer des snapshots de l’état pris en charge et comparer les changements à un point de départ précis.", route: "/runtime", action: "Modèle du runtime" },
      { title: "Explorer des variantes", body: "Créer des branches isolées, inspecter les diffs et rejouer les trajectoires prises en charge lorsque les entrées le permettent.", route: "/sandbox", action: "Explorer le sandbox" },
      { title: "Superviser l’exécution", body: "Lancer des agents dans des runtimes configurés avec limites de workspace, budgets, événements et passations.", route: "/orchestrator", action: "Orchestration" },
      { title: "Contrôler la décision", body: "Joindre les reçus et contrôles à une proposition. Une barrière peut retenir ou refuser un changement si les preuves manquent.", route: "/evidence", action: "Registre des preuves" },
    ],
    topologiesKicker: "02 / ORCHESTRATION",
    topologiesLead: "Huit façons",
    topologiesEm: "d’organiser les agents.",
    topologiesIntro: "Les topologies décrivent différentes formes de coordination. Chacune possède son contrat, son état d’implémentation et ses lacunes de validation.",
    groups: [
      { title: "Comparer et spécialiser", names: "Trinity · A-Team", body: "Mondes candidats parallèles et spécialistes par domaine." },
      { title: "Coordonner et partager", names: "Biocénose · Syncytium · Rhizome", body: "Quorums, état partagé et routage par capacité." },
      { title: "Adapter et reprendre", names: "Holobionte · Biome · Métapopulation", body: "Contrôles de l’hôte, cycles de ressources et reprise par lignage." },
    ],
    topologyCaveat: "Une topologie enregistrée ne signifie pas que toutes ses capacités sont actives ou validées de bout en bout.",
    topologyLink: "Comparer les huit topologies",
    proofKicker: "03 / PARTIR DES PREUVES",
    proofLead: "Explorer le système.",
    proofEm: "Voir ses limites.",
    proofBody: "Le site distingue les parcours implémentés des travaux partiels, expérimentaux ou projetés. Les exécutions enregistrées conservent aussi les résultats incomplets ; le code source et les contrats précisent la portée de chaque parcours.",
    proofLinks: [
      { title: "Examiner une exécution", route: "/runs" },
      { title: "Lire le registre des preuves", route: "/evidence" },
      { title: "Développer avec GenOS", route: "/developers" },
    ],
    source: "Lire le code source et le contrat produit",
    factsLabel: "GenOS en bref",
    exploreLabel: "Explorer GenOS",
  },
} as const;

export function GenosHome({ locale }: { locale: "en" | "fr" }) {
  const c = content[locale];
  const prefix = locale === "fr" ? "/fr" : "";

  return <div className="genos-home" lang={locale}>
    <section className="home-hero section-wrap" aria-labelledby="home-title">
      <div className="home-hero-copy">
        <p className="home-kicker">{c.kicker}</p>
        <h1 id="home-title">{c.heroLead}<br /><em>{c.heroEm}</em></h1>
        <p className="home-lede">{c.intro}</p>
        <div className="home-actions">
          <Link className="button button-dark" href={prefix + "/runtime"}>{c.runtime} <span aria-hidden="true">↗</span></Link>
          <a className="button button-quiet" href={genosSource("examples/safe-debugging-demo/README.md")} target="_blank" rel="noreferrer">{c.demo} <span aria-hidden="true">↗</span></a>
        </div>
        <p className="home-hero-note">{c.caveat}</p>
      </div>
      <div className="home-flow" aria-label={c.flowLabel}>
        <div className="home-flow-heading"><span>{c.flowLabel}</span><span>GENOS / 01</span></div>
        {c.flow.map((step, index) => <div className="home-flow-part" key={step.n}>
          <div className="home-flow-stage"><span className="home-flow-index">{step.n}</span><div><strong>{step.title}</strong><small>{step.detail}</small>{index === 1 && <div className="home-flow-options"><span>{c.branchA}</span><span>{c.branchB}</span></div>}</div><span className="home-flow-symbol" aria-hidden="true">{index === 0 ? "◫" : index === 1 ? "⑂" : "◇"}</span></div>
          {index < 2 && <div className="home-flow-connector" aria-hidden="true" />}
        </div>)}
        <div className="home-flow-outcome"><span aria-hidden="true">↳</span>{c.outcome}</div>
        <p className="home-flow-foot">{c.flowNote}</p>
      </div>
    </section>

    <div className="home-facts" aria-label={c.factsLabel}><div className="section-wrap">{c.facts.map((fact) => <span key={fact}>{fact}</span>)}</div></div>

    <section className="home-section section-wrap" aria-labelledby="home-mechanics-title">
      <div className="home-section-head"><div><p className="home-kicker">{c.mechanicsKicker}</p><h2 id="home-mechanics-title">{c.mechanicsLead}<br /><em>{c.mechanicsEm}</em></h2></div><p>{c.mechanicsIntro}</p></div>
      <div className="home-mechanics-grid">{c.mechanics.map((item, index) => <article className="home-mechanic" key={item.title}><span>0{index + 1} / 04</span><h3>{item.title}</h3><p>{item.body}</p><Link href={prefix + item.route}>{item.action} <span aria-hidden="true">↗</span></Link></article>)}</div>
    </section>

    <section className="home-topologies" aria-labelledby="home-topologies-title"><div className="section-wrap">
      <div className="home-section-head"><div><p className="home-kicker">{c.topologiesKicker}</p><h2 id="home-topologies-title">{c.topologiesLead}<br /><em>{c.topologiesEm}</em></h2></div><p>{c.topologiesIntro}</p></div>
      <div className="home-topology-grid">{c.groups.map((group, index) => <article key={group.title}><span>0{index + 1} / 03</span><h3>{group.title}</h3><strong>{group.names}</strong><p>{group.body}</p></article>)}</div>
      <div className="home-topology-foot"><p>{c.topologyCaveat}</p><Link href={prefix + "/topologies"}>{c.topologyLink} <span aria-hidden="true">↗</span></Link></div>
    </div></section>

    <section className="home-proof section-wrap" aria-labelledby="home-proof-title">
      <div><p className="home-kicker">{c.proofKicker}</p><h2 id="home-proof-title">{c.proofLead}<br /><em>{c.proofEm}</em></h2><p>{c.proofBody}</p><a href={genosSource("docs/03-reference/contrat-produit-et-completude.md")} target="_blank" rel="noreferrer">{c.source} ↗</a></div>
      <nav aria-label={c.exploreLabel}>{c.proofLinks.map((link, index) => <Link key={link.route} href={prefix + link.route}><span>0{index + 1}</span><strong>{link.title}</strong><b aria-hidden="true">↗</b></Link>)}</nav>
    </section>
  </div>;
}
