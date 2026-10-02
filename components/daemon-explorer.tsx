"use client";

import { useEffect, useState } from "react";

type Locale = "fr" | "en";
type DaemonKey = "resident" | "scouts" | "sentinel" | "legacy";

type Step = { title: string; detail: string; tag?: string };
type DaemonView = {
  key: DaemonKey;
  name: string;
  kind: string;
  description: string;
  steps: Step[];
  note: string;
  stat: string;
};

const frenchViews: DaemonView[] = [
  {
    key: "resident",
    name: "ResidentDaemon",
    kind: "Archétype résident",
    description: "Suit un territoire de projet dans le temps. Son savoir reste lié au dépôt et au HEAD qu’il a observés.",
    stat: "1 territoire · observation seule",
    note: "Les organelles sont ses fonctions internes. Les phénotypes orientent son attention selon les pressions mesurées.",
    steps: [
      { title: "Territoire", detail: "Dépôt, périmètre et HEAD enregistrés.", tag: "CONTEXTE" },
      { title: "Événement", detail: "Un commit, un test ou une entrée d’orchestrateur attire son attention.", tag: "SIGNAL" },
      { title: "Observation", detail: "Cartographie, interoception et recherche rassemblent des indices.", tag: "ORGANELLES" },
      { title: "Finding", detail: "Une affirmation reçoit des preuves, une portée et des limites.", tag: "VÉRIFIABLE" },
      { title: "Handoff", detail: "Le brief va à l’orchestrateur, qui décide de la suite.", tag: "DÉCISION ORCHESTRATEUR" },
    ],
  },
  {
    key: "scouts",
    name: "ScoutCells",
    kind: "Auxiliaires bornés · pas des daemons résidents",
    description: "Effectuent une reconnaissance ciblée, puis s’arrêtent. Leur rôle est de rapporter des indices sans modifier le dépôt.",
    stat: "12 cellules max · durée de vie 5 min",
    note: "Lecture et analyse seulement : pas d’écriture, de délégation, de spawn ni de promotion.",
    steps: [
      { title: "Demande ciblée", detail: "Un orchestrateur demande une piste : architecture, historique Git, tests ou chemin.", tag: "PÉRIMÈTRE" },
      { title: "Reconnaissance parallèle", detail: "Jusqu’à 12 cellules cherchent chacune dans un angle borné.", tag: "BUDGET LIMITÉ" },
      { title: "Indices", detail: "Chaque cellule renvoie ses observations et leur contexte.", tag: "LECTURE SEULE" },
      { title: "Synthèse", detail: "Les résultats sont regroupés pour aider la décision suivante.", tag: "PAS UNE PREUVE" },
      { title: "Expiration", detail: "Les cellules s’arrêtent à la fin de la tâche ou après leur TTL.", tag: "5 MIN MAX" },
    ],
  },
  {
    key: "sentinel",
    name: "SentinelDaemonKeeper",
    kind: "Superviseur du plan de contrôle",
    description: "Observe la disponibilité des processus et leur dernier heartbeat. Il ne produit pas de findings métier.",
    stat: "Liveness seule · lecture seule",
    note: "Un redémarrage n’est pas décidé par Sentinel : le host ou le gestionnaire de processus le contrôle.",
    steps: [
      { title: "Heartbeat", detail: "Le runtime signale périodiquement qu’il est toujours actif.", tag: "ÉTAT PROCESSUS" },
      { title: "Lecture liveness", detail: "Sentinel compare l’âge du signal, la santé et le territoire connu.", tag: "OBSERVE" },
      { title: "État", detail: "La vue indique HEALTHY, STALE ou DEGRADED selon les données disponibles.", tag: "DIAGNOSTIC" },
      { title: "Recommandation", detail: "Si l’état pose problème, il recommande d’inspecter processus et territoire.", tag: "PAS DE RESTART AUTOMATIQUE" },
      { title: "Décision du host", detail: "Le host ou le process manager choisit l’action opérationnelle.", tag: "SUPERVISION EXTERNE" },
    ],
  },
  {
    key: "legacy",
    name: "WorkspaceGitDaemon",
    kind: "Compatibilité historique",
    description: "Ancien modèle qui associait daemon, cron et autofix. L’autofix est désormais désactivé.",
    stat: "Autofix : no-op permanent",
    note: "Le parcours de réparation actuel ouvre un RepairEpisode, confie le patch à un worker, puis le vérifie et le soumet à gouvernance.",
    steps: [
      { title: "Ancien cycle", detail: "L’ancien daemon cherchait un candidat à modifier automatiquement.", tag: "DÉPRÉCIÉ" },
      { title: "No-op", detail: "L’autofix historique ne produit plus de patch et renvoie sa raison d’arrêt.", tag: "AUCUNE ÉCRITURE" },
      { title: "RepairEpisode", detail: "Une finding peut ouvrir un épisode de réparation contrôlé.", tag: "LEASE ET BRANCHE" },
      { title: "Worker + vérification", detail: "Un worker effectue le changement, puis des contrôles vérifient le résultat.", tag: "TRAVAIL BORNÉ" },
      { title: "Gouvernance", detail: "Les règles de gouvernance autorisent ou refusent push et merge.", tag: "GATE EXPLICITE" },
    ],
  },
];

const englishViews: DaemonView[] = [
  {
    key: "resident", name: "ResidentDaemon", kind: "Resident archetype",
    description: "Follows a project territory over time. Its knowledge stays attached to the repository and HEAD it observed.",
    stat: "1 territory · observation only", note: "Organelles are its internal functions. Phenotypes shift its attention in response to measured pressures.",
    steps: [
      { title: "Territory", detail: "Repository, scope, and HEAD are registered.", tag: "CONTEXT" },
      { title: "Event", detail: "A commit, test, or orchestrator entry draws its attention.", tag: "SIGNAL" },
      { title: "Observation", detail: "Cartography, interoception, and search gather clues.", tag: "ORGANELLES" },
      { title: "Finding", detail: "A claim receives evidence, scope, and limitations.", tag: "VERIFIABLE" },
      { title: "Handoff", detail: "A brief goes to the orchestrator, which chooses what happens next.", tag: "DECISION" },
    ],
  },
  {
    key: "scouts", name: "ScoutCells", kind: "Bounded auxiliaries · not resident daemons",
    description: "Perform a focused reconnaissance, then stop. They report clues without changing the repository.",
    stat: "12 cells max · 5 min lifetime", note: "Read and analyze only: no writes, delegation, spawning, or promotion.",
    steps: [
      { title: "Focused request", detail: "An orchestrator asks for a lead: architecture, Git history, tests, or path.", tag: "SCOPE" },
      { title: "Parallel scouting", detail: "Up to 12 cells search from separate bounded angles.", tag: "LIMITED BUDGET" },
      { title: "Clues", detail: "Each cell returns observations with context.", tag: "READ ONLY" },
      { title: "Synthesis", detail: "Results are grouped to inform the next decision.", tag: "NOT PROOF" },
      { title: "Expiry", detail: "Cells stop when the task ends or their TTL expires.", tag: "5 MIN MAX" },
    ],
  },
  {
    key: "sentinel", name: "SentinelDaemonKeeper", kind: "Control plane supervisor",
    description: "Observes process availability and the last heartbeat. It does not produce domain findings.",
    stat: "Liveness only · read only", note: "Sentinel does not decide restarts: the host or process manager controls them.",
    steps: [
      { title: "Heartbeat", detail: "The runtime periodically signals that it is still active.", tag: "PROCESS STATE" },
      { title: "Liveness view", detail: "Sentinel compares signal age, health, and known territory.", tag: "OBSERVE" },
      { title: "Status", detail: "The view reports HEALTHY, STALE, or DEGRADED from available data.", tag: "DIAGNOSTIC" },
      { title: "Recommendation", detail: "When needed, it recommends inspecting process and territory.", tag: "NO AUTO RESTART" },
      { title: "Host decision", detail: "The host or process manager chooses the operational action.", tag: "EXTERNAL CONTROL" },
    ],
  },
  {
    key: "legacy", name: "WorkspaceGitDaemon", kind: "Historical compatibility",
    description: "An older model that combined daemon, cron, and autofix. Autofix is now disabled.",
    stat: "Autofix: permanent no-op", note: "The current repair path opens a RepairEpisode, assigns a worker, verifies the change, and applies governance.",
    steps: [
      { title: "Old cycle", detail: "The old daemon searched for a candidate to modify automatically.", tag: "DEPRECATED" },
      { title: "No-op", detail: "Legacy autofix no longer creates patches and reports why it stopped.", tag: "NO WRITES" },
      { title: "RepairEpisode", detail: "A finding can open a controlled repair episode.", tag: "LEASE AND BRANCH" },
      { title: "Worker + verification", detail: "A worker makes the change, then checks verify the result.", tag: "BOUNDED WORK" },
      { title: "Governance", detail: "Governance rules allow or reject push and merge.", tag: "EXPLICIT GATE" },
    ],
  },
];

const anatomyFr = ["cartographie", "interoception", "recherche", "findings", "vérification", "stigmergie", "handoff", "réconciliation"];
const anatomyEn = ["cartography", "interoception", "search", "findings", "verification", "stigmergy", "handoff", "reconciliation"];
const phenotypeFr = ["sécurité", "contrats", "dépendances", "documentation", "historien", "chaperon", "métabolique", "cross-repo", "réparation", "recherche profonde"];
const phenotypeEn = ["security", "contract", "dependency", "documentation", "historian", "chaperone", "metabolic", "cross-repo", "repair", "deep research"];

export function DaemonExplorer({ locale = "fr" }: { locale?: Locale }) {
  const isFrench = locale === "fr";
  const views = isFrench ? frenchViews : englishViews;
  const [selected, setSelected] = useState<DaemonKey>("resident");
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const current = views.find((view) => view.key === selected) ?? views[0];
  const step = current.steps[stepIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) setPlaying(false);
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) setPlaying(false);
    };
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    return () => reducedMotion.removeEventListener("change", onMotionPreferenceChange);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStepIndex((index) => (index + 1) % current.steps.length);
    }, 1900);
    return () => window.clearInterval(timer);
  }, [playing, current.steps.length, selected]);

  function selectType(key: DaemonKey) {
    setSelected(key);
    setStepIndex(0);
  }

  return (
    <section className="daemon-explorer section-wrap" aria-labelledby="daemon-explorer-title">
      <div className="daemon-explorer-heading">
        <div>
          <span className="eyebrow">{isFrench ? "PARCOURS ANIMÉS · SIMULATION LOCALE" : "ANIMATED FLOWS · LOCAL SIMULATION"}</span>
          <h2 id="daemon-explorer-title">{isFrench ? <>Voir chaque<br /><em>cycle en action.</em></> : <>See each cycle<br /><em>in motion.</em></>}</h2>
        </div>
        <p>{isFrench ? "Choisis un composant pour suivre son rôle, ses limites et le passage d’une étape à l’autre. Cette animation explique les flux ; elle ne lance pas le runtime GenOS." : "Choose a component to follow its role, limits, and handoffs. This animation explains the flows; it does not run the GenOS runtime."}</p>
      </div>

      <div className="daemon-explorer-tabs" role="group" aria-label={isFrench ? "Types de daemon et composants associés" : "Daemon types and related components"}>
        {views.map((view) => <button key={view.key} type="button" aria-pressed={selected === view.key} className={selected === view.key ? "is-selected" : ""} onClick={() => selectType(view.key)}>{view.name}<span>{view.kind}</span></button>)}
      </div>

      <div className="daemon-explorer-panel" aria-label={current.name}>
        <div className="daemon-explorer-summary">
          <div><span className="daemon-explorer-kind">{current.kind}</span><h3>{current.name}</h3><p>{current.description}</p></div>
          <strong>{current.stat}</strong>
        </div>

        <div className={`daemon-flow daemon-flow-${current.key}`} aria-label={isFrench ? "Étapes du cycle animé" : "Animated cycle steps"}>
          {current.steps.map((item, index) => <div className={`daemon-flow-stage ${index === stepIndex ? "is-active" : ""} ${index < stepIndex ? "is-done" : ""}`} key={item.title} aria-current={index === stepIndex ? "step" : undefined}>
            <span className="daemon-flow-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="daemon-flow-dot" aria-hidden="true" />
            <div><span className="daemon-flow-tag">{item.tag}</span><h4>{item.title}</h4><p>{item.detail}</p></div>
            {index < current.steps.length - 1 && <span className="daemon-flow-connector" aria-hidden="true" />}
          </div>)}
        </div>

        <div className="daemon-explorer-footer">
          <div className="daemon-step-readout" aria-live="polite"><span>{isFrench ? `ÉTAPE ${stepIndex + 1} / ${current.steps.length}` : `STEP ${stepIndex + 1} / ${current.steps.length}`}</span><strong>{step.title}</strong><p>{step.detail}</p></div>
          <div className="daemon-player-controls">
            <button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>{playing ? (isFrench ? "Pause" : "Pause") : (isFrench ? "Lire" : "Play")}</button>
            <button type="button" onClick={() => { setStepIndex(0); setPlaying(true); }}>{isFrench ? "Recommencer" : "Restart"}</button>
            <button type="button" onClick={() => { setPlaying(false); setStepIndex((index) => (index + 1) % current.steps.length); }}>{isFrench ? "Étape suivante →" : "Next step →"}</button>
          </div>
        </div>
        <p className="daemon-explorer-note">{current.note}</p>

        {current.key === "resident" && <div className="daemon-explorer-anatomy">
          <div><span>{isFrench ? "8 ORGANELLES · FONCTIONS INTERNES" : "8 ORGANELLES · INTERNAL FUNCTIONS"}</span><div>{(isFrench ? anatomyFr : anatomyEn).map((item) => <i key={item}>{item}</i>)}</div></div>
          <div><span>{isFrench ? "10 PHÉNOTYPES · ORIENTATION DE L’ATTENTION" : "10 PHENOTYPES · ATTENTION MODULATION"}</span><div>{(isFrench ? phenotypeFr : phenotypeEn).map((item) => <i key={item}>{item}</i>)}</div></div>
        </div>}
      </div>
    </section>
  );
}
