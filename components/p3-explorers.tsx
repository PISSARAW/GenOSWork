"use client";

import { useMemo, useState, type FormEvent } from "react";
import benchmark from "@/public/benchmarks/planning-gap/2026-09-30-a-star-240.json";
import campaign from "@/public/recorded-runs/topology-campaign.json";

type AlgorithmKey = "react" | "tot" | "mcts" | "genos";
type BenchmarkTask = (typeof benchmark.results)[number];
type CampaignMission = (typeof campaign.missions)[number];
type FailureCategory = "all" | "timeouts" | "dispatch" | "workers" | "verification" | "other";

function runtimeField(value: unknown, names: string[]): string | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  for (const name of names) {
    const field = record[name];
    if (typeof field === "string" || typeof field === "number" || typeof field === "boolean") return String(field);
  }
  for (const child of [record.result, record.data, record.output, record.mission, record.verification, record.promotion]) {
    const found = runtimeField(child, names);
    if (found !== null) return found;
  }
  return null;
}

function failureCategory(mission: CampaignMission, failure: string): Exclude<FailureCategory, "all"> {
  const value = failure.toLowerCase();
  if (mission.timedOut || value.includes("timed out")) return "timeouts";
  if (value.includes("dispatch")) return "dispatch";
  if (value.includes("worker")) return "workers";
  if (value.includes("gate") || value.includes("verified") || value.includes("proof") || value.includes("completion")) return "verification";
  return "other";
}

const algorithms: { id: AlgorithmKey; label: string }[] = [
  { id: "genos", label: "GenOS A*" },
  { id: "react", label: "ReAct" },
  { id: "tot", label: "Tree of Thoughts" },
  { id: "mcts", label: "MCTS" },
];

function Metric({ value, label }: { value: string | number; label: string }) {
  return <div className="p3-metric"><strong>{value}</strong><span>{label}</span></div>;
}

export function BenchmarkExplorer({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  const [taskId, setTaskId] = useState(benchmark.results[0]?.task ?? "");
  const [algorithm, setAlgorithm] = useState<AlgorithmKey>("genos");
  const [domain, setDomain] = useState("all");
  const visibleTasks = useMemo(() => benchmark.results.filter((task) => domain === "all" || task.domain === domain), [domain]);
  const selectedTask = (visibleTasks.find((task) => task.task === taskId) ?? visibleTasks[0]) as BenchmarkTask | undefined;
  const result = selectedTask?.[algorithm];

  return (
    <section className="section-wrap p3-section" aria-labelledby="benchmark-explorer-title">
      <div className="p3-section-heading"><span className="p3-kicker">{fr ? "BENCHMARK INTERACTIF · RÉSULTATS ENREGISTRÉS" : "INTERACTIVE BENCHMARK · RECORDED RESULTS"}</span><h2 id="benchmark-explorer-title">{fr ? <>Explorez les 12 tâches<br /><em>du même run.</em></> : <>Explore all 12 tasks<br /><em>in one run.</em></>}</h2><p>{fr ? "Choisissez un domaine, une tâche et une politique. Le panneau restitue le plan, le verdict et les expansions enregistrés le 30 septembre 2026. Il ne relance pas le benchmark." : "Choose a domain, task and policy to inspect its recorded plan, outcome and expansions from September 30, 2026. This view does not rerun the benchmark."}</p></div>
      <div className="p3-benchmark">
        <div className="p3-controls">
          <label>{fr ? "Domaine" : "Domain"}<select value={domain} onChange={(event) => { const next = event.target.value; setDomain(next); const first = benchmark.results.find((task) => next === "all" || task.domain === next); if (first) setTaskId(first.task); }}><option value="all">{fr ? "Tous les domaines" : "All domains"}</option><option value="blocksworld">Blocksworld · 8 {fr ? "tâches" : "tasks"}</option><option value="trapchain">TrapChain · 4 {fr ? "tâches" : "tasks"}</option></select></label>
          <label>{fr ? "Tâche" : "Task"}<select value={selectedTask?.task ?? ""} onChange={(event) => setTaskId(event.target.value)}>{visibleTasks.map((task) => <option key={task.task} value={task.task}>{task.task}</option>)}</select></label>
          <label>{fr ? "Politique" : "Policy"}<select value={algorithm} onChange={(event) => setAlgorithm(event.target.value as AlgorithmKey)}>{algorithms.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        </div>
        {selectedTask && result && <div className="p3-benchmark-result">
          <div className="p3-result-heading"><div><span className="p3-kicker">{selectedTask.domain.toUpperCase()} · {selectedTask.task}</span><h3>{algorithms.find((item) => item.id === algorithm)?.label}</h3></div><b className={result.success ? "p3-verdict p3-verdict-ok" : "p3-verdict p3-verdict-fail"}>{result.success ? (fr ? "OBJECTIF ATTEINT" : "GOAL REACHED") : (fr ? "ÉCHEC ENREGISTRÉ" : "RECORDED FAILURE")}</b></div>
          <div className="p3-metrics"><Metric value={result.success ? (fr ? "Oui" : "Yes") : (fr ? "Non" : "No")} label={fr ? "Objectif du scénario atteint" : "Harness goal met"} /><Metric value={result.expansions} label={fr ? "Expansions" : "Expansions"} /><Metric value={result.plan.length} label={fr ? "Actions dans le plan" : "Plan actions"} /><Metric value={selectedTask.optimalLength ?? "—"} label={fr ? "Optimum BFS (si calculé)" : "BFS optimum (if computed)"} /></div>
          <div className="p3-action-plan"><span>{fr ? "PLAN ENREGISTRÉ" : "RECORDED PLAN"}</span>{result.plan.length ? <ol>{result.plan.map((action, index) => <li key={`${index}-${action}`}><i>{String(index + 1).padStart(2, "0")}</i>{action}</li>)}</ol> : <p>{fr ? "Aucun plan produit dans ce résultat." : "This result contains no plan."}</p>}</div>
          <p className="p3-caveat">{fr ? "Comparaison déterministe sur des tâches synthétiques, budget maximal de 240 expansions. Ces valeurs viennent du runner source; la sélection ci-dessus ne constitue pas une nouvelle exécution." : "Deterministic comparison on synthetic tasks with a 240-expansion cap. These values come from the source runner; this selector does not launch a new run."}</p>
        </div>}
      </div>
      <div className="p3-source-line"><span>{fr ? "ARTEFACT SOURCE" : "SOURCE ARTIFACT"} · {benchmark.measuredAt}</span><a href="/benchmarks/planning-gap/2026-09-30-a-star-240.json" target="_blank" rel="noreferrer">{fr ? "Télécharger le JSON ↗" : "Download JSON ↗"}</a></div>
      <p className="p3-reproduction"><span>{fr ? "COMMANDE DE REPRODUCTION" : "REPRODUCTION COMMAND"}</span><code>{benchmark.command}</code><small>{fr ? "Le résultat est spécifique à la suite, au budget et aux versions de l’artefact. Rejouer la commande requiert le dépôt source GenOS et son environnement." : "The result is specific to this suite, budget and artifact version. Replaying the command requires the GenOS source repository and its environment."}</small></p>
    </section>
  );
}

export function RecordedRunExplorer({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  const [selected, setSelected] = useState(campaign.missions[0]?.name ?? "");
  const [view, setView] = useState<"sequence" | "workers" | "evidence">("sequence");
  const [failureFilter, setFailureFilter] = useState<FailureCategory>("all");
  const mission = (campaign.missions.find((item) => item.name === selected) ?? campaign.missions[0]) as CampaignMission | undefined;
  const summary = campaign.summary;
  const failureEntries = campaign.missions.flatMap((item) => item.failures.map((failure) => ({ mission: item, failure, category: failureCategory(item, failure) })));
  const visibleFailures = failureEntries.filter((entry) => failureFilter === "all" || entry.category === failureFilter);
  const failureFilters: { id: FailureCategory; en: string; fr: string }[] = [
    { id: "all", en: "All", fr: "Tous" }, { id: "timeouts", en: "Timeouts", fr: "Délais" },
    { id: "dispatch", en: "Dispatch", fr: "Dispatch" }, { id: "workers", en: "Workers", fr: "Workers" },
    { id: "verification", en: "Verification", fr: "Vérification" }, { id: "other", en: "Other", fr: "Autres" },
  ];

  return <section className="section-wrap p3-section" aria-labelledby="recorded-run-title">
    <div className="p3-section-heading"><span className="p3-kicker">{fr ? "RÉSULTATS GENOS · CAMPAGNE ENREGISTRÉE" : "GENOS RESULTS · RECORDED CAMPAIGN"}</span><h2 id="recorded-run-title">{fr ? <>Une campagne réelle,<br /><em>avec ses échecs.</em></> : <>A real campaign,<br /><em>failures included.</em></>}</h2><p>{fr ? "Inspection des résumés d’une campagne locale lancée avec Qwen 2.5 14B. Deux dispatches ont été acceptés; aucune des douze missions n’a passé la vérification finale. Aucun journal événementiel complet n’est publié ici." : "Inspect recorded mission summaries from a local campaign with Qwen 2.5 14B. Two dispatches were accepted; none of the twelve missions passed final verification. No full event log is published here."}</p></div>
    <div className="p3-run-summary"><Metric value={`${summary.verifiedMissions} / ${summary.missions}`} label={fr ? "Missions vérifiées" : "Verified missions"} /><Metric value={`${summary.acceptedDispatches} / ${summary.missions}`} label={fr ? "Dispatches acceptés" : "Accepted dispatches"} /><Metric value={summary.totalWorkerErrors} label={fr ? "Workers en erreur" : "Workers in error"} /><Metric value={summary.timeouts} label={fr ? "Missions avec timeout" : "Missions timed out"} /></div>
    <div className="principle-callout" role="note"><span>{fr ? "SUCCÈS D'EXÉCUTION ≠ SUCCÈS VÉRIFIÉ" : "EXECUTION SUCCESS ≠ VERIFIED SUCCESS"}</span><strong>{fr ? `Dispatch accepté : ${summary.acceptedDispatches}/${summary.missions} · Vérifié : ${summary.verifiedMissions}/${summary.missions}` : `Dispatch accepted: ${summary.acceptedDispatches}/${summary.missions} · Verified: ${summary.verifiedMissions}/${summary.missions}`}</strong></div>
    <div className="p3-replay-tabs" role="group" aria-label={fr ? "Vues synchronisées" : "Synchronized campaign views"}>
      {([ ["sequence", fr ? "Campagne" : "Campaign"], ["workers", fr ? "Workers" : "Workers"], ["evidence", fr ? "Preuves & échecs" : "Evidence & failures"] ] as const).map(([id, label]) => <button type="button" aria-pressed={view === id} key={id} onClick={() => setView(id)}>{label}</button>)}
      <span>{fr ? "Mission sélectionnée synchronisée dans chaque vue" : "Selected mission is shared across every view"}</span>
    </div>
    <section className="p3-failure-explorer" aria-labelledby="failure-explorer-title">
      <div><span className="p3-kicker">{fr ? "EXPLORATEUR DES ÉCHECS · RÉSULTATS PUBLIÉS" : "FAILURE EXPLORER · PUBLISHED RESULTS"}</span><h3 id="failure-explorer-title">{fr ? `${failureEntries.length} échecs documentés` : `${failureEntries.length} recorded failure observations`}</h3><p>{fr ? "Filtrez les motifs publiés et sélectionnez une mission pour synchroniser les vues. Les catégories sont des regroupements d’affichage, pas des causes racines certifiées." : "Filter published failure observations and select a mission to synchronize the views. Categories group the displayed text; they are not certified root causes."}</p></div>
      <div className="p3-failure-filters" role="group" aria-label={fr ? "Filtrer par catégorie d’échec" : "Filter by failure category"}>{failureFilters.map((filter) => <button type="button" key={filter.id} aria-pressed={failureFilter === filter.id} onClick={() => setFailureFilter(filter.id)}>{fr ? filter.fr : filter.en} <b>{filter.id === "all" ? failureEntries.length : failureEntries.filter((entry) => entry.category === filter.id).length}</b></button>)}</div>
      <ul>{visibleFailures.map((entry, index) => <li key={`${entry.mission.name}-${entry.failure}-${index}`}><button type="button" onClick={() => { setSelected(entry.mission.name); setView("evidence"); }}><span>{entry.mission.name}</span><b>{entry.failure}</b><i>{fr ? "Ouvrir" : "Open"} ↗</i></button></li>)}</ul>
    </section>
    <div className="p3-run-layout"><div className="p3-mission-picker" role="listbox" aria-label={fr ? "Sélectionner une mission dans la campagne" : "Select a campaign mission"}>{campaign.missions.map((item, index) => <button key={item.name} type="button" role="option" aria-selected={mission?.name === item.name} onClick={() => setSelected(item.name)}><i>{String(index + 1).padStart(2, "0")}</i><span>{item.name}</span><b>{item.passed ? "OK" : item.timedOut ? "TIMEOUT" : item.dispatchStatus === "accepted" ? (fr ? "ACCEPTÉ" : "ACCEPTED") : (fr ? "ÉCHEC" : "FAILED")}</b></button>)}</div>
      {mission && <article className="p3-mission-detail">
        <div className="p3-result-heading"><div><span className="p3-kicker">{fr ? "MISSION" : "MISSION"} {campaign.missions.indexOf(mission) + 1} / {campaign.missions.length} · {fr ? "VUE" : "VIEW"} {view === "sequence" ? (fr ? "CAMPAGNE" : "CAMPAIGN") : view === "workers" ? "WORKERS" : (fr ? "PREUVES" : "EVIDENCE")}</span><h3>{mission.name}</h3></div><b className={mission.passed ? "p3-verdict p3-verdict-ok" : "p3-verdict p3-verdict-fail"}>{mission.passed ? (fr ? "VÉRIFIÉE" : "VERIFIED") : (fr ? "NON VÉRIFIÉE" : "NOT VERIFIED")}</b></div>
        {view === "sequence" && <><p className="p3-replay-caveat">{fr ? "Ordre des missions enregistré; aucun timestamp événementiel n’est publié. Sélectionnez une ligne pour synchroniser les autres vues." : "Recorded mission order; no event timestamps are published. Select a row to synchronize the other views."}</p><ol className="p3-sequence-list">{campaign.missions.map((item, index) => <li key={item.name} aria-current={item.name === mission.name ? "step" : undefined}><button type="button" onClick={() => setSelected(item.name)}><i>{String(index + 1).padStart(2, "0")}</i><span>{item.name}</span><b>{item.passed ? "VERIFIED" : item.timedOut ? "TIMEOUT" : item.dispatchStatus === "accepted" ? "ACCEPTED" : "FAILED"}</b></button></li>)}</ol><div className="p3-metrics"><Metric value={mission.exitCode ?? "—"} label={fr ? "Code de sortie" : "Exit code"} /><Metric value={mission.durationMs ? `${Math.round(mission.durationMs / 1000)} s` : "—"} label={fr ? "Durée" : "Duration"} /><Metric value={mission.dispatchStatus ?? "—"} label="Dispatch" /><Metric value={mission.workerStatuses.length} label="Workers" /></div></>}
        {view === "workers" && <div className="p3-event-list"><span>{fr ? "ÉTATS DES WORKERS POUR LA MISSION SÉLECTIONNÉE" : "WORKER STATES FOR THE SELECTED MISSION"}</span>{mission.workerStatuses.length ? <ol className="p3-worker-list">{mission.workerStatuses.map((status, index) => <li key={`${index}-${status}`}><i>{String(index + 1).padStart(2, "0")}</i><span>Worker {index + 1}</span><b>{status}</b></li>)}</ol> : <p>{fr ? "Aucun état worker n’est disponible pour cette mission dans la trace publiée." : "No worker state is available for this mission in the published trace."}</p>}<p className="p3-replay-caveat">{fr ? "Un dispatch accepté ne prouve ni l’exécution complète du worker ni la vérification du résultat." : "An accepted dispatch does not prove full worker execution or result verification."}</p></div>}
        {view === "evidence" && <><div className="p3-metrics"><Metric value={mission.passed ? (fr ? "Oui" : "Yes") : (fr ? "Non" : "No")} label={fr ? "Vérification finale" : "Final verification"} /><Metric value={mission.dispatchStatus ?? "—"} label="Dispatch" /><Metric value={mission.timedOut ? (fr ? "Oui" : "Yes") : (fr ? "Non" : "No")} label="Timeout" /><Metric value={mission.failures.length} label={fr ? "Échecs enregistrés" : "Recorded failures"} /></div><div className="p3-event-list"><span>{fr ? "OBSERVATIONS ET LIMITES ENREGISTRÉES" : "RECORDED OBSERVATIONS AND LIMITS"}</span><ul><li>{fr ? "Vérification finale : " : "Final verification: "}{mission.passed ? (fr ? "réussie" : "passed") : (fr ? "échouée" : "failed")}</li>{mission.timedOut && <li>{fr ? "La mission a dépassé son délai." : "The mission timed out."}</li>}{mission.sessionProbeVerified === true && <li>{fr ? "Une sonde de session associée a réussi; elle ne valide ni la mission ni les workers." : "An associated session probe passed; it does not verify the mission or its workers."}</li>}{mission.failures.length ? mission.failures.map((failure) => <li key={failure}>{failure}</li>) : <li>{fr ? "Aucun détail d’échec n’est fourni pour cette mission." : "No failure detail is supplied for this mission."}</li>}</ul></div></>}
      </article>}</div>
    <div className="p3-run-provenance"><div><span>RUN ID</span><code>{campaign.provenance.runId}</code></div><div><span>{fr ? "COMMIT SOURCE" : "SOURCE COMMIT"}</span><code>{campaign.provenance.sourceCommit}</code></div><div><span>{fr ? "ENVIRONNEMENT" : "ENVIRONMENT"}</span><code>{campaign.provenance.executor} · {campaign.provenance.model}</code></div><div><span>{fr ? "QUALIFICATION" : "QUALIFICATION"}</span><code>{fr ? "campagne expérimentale historique; vérification échouée" : campaign.provenance.qualification}</code></div><p>{fr ? "Trace historique partielle issue de GenOS. Les identifiants de session et le contenu des missions ne sont pas publiés. Les résumés proviennent des résultats de campagne; ils ne reconstituent pas un journal chronologique." : "Partial historical trace from GenOS. Session identifiers and mission prompts are not published. Summaries come from campaign results; they do not reconstruct a chronological event log."}</p></div>
    <div className="p3-source-line"><span>SHA-256 · {campaign.provenance.sha256}</span><a href="/recorded-runs/topology-campaign.json" target="_blank" rel="noreferrer">{fr ? "Télécharger la trace expurgée ↗" : "Download sanitized trace ↗"}</a></div>
  </section>;
}

export function LiveSandbox({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  const [endpoint, setEndpoint] = useState("");
  const [token, setToken] = useState("");
  const [organization, setOrganization] = useState("");
  const [project, setProject] = useState("");
  const [mission, setMission] = useState("Compare deux approches simples pour résoudre une tâche de planification, puis explique les preuves et limites de ton résultat.");
  const [busy, setBusy] = useState(false);
  const [response, setResponse] = useState<unknown>(null);
  const [transportStatus, setTransportStatus] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function runMission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setResponse(null); setTransportStatus(null);
    let base: URL;
    try { base = new URL(endpoint); } catch { setError("Saisissez une URL GenOS valide."); return; }
    if (base.protocol !== "https:" && !(base.protocol === "http:" && ["localhost", "127.0.0.1"].includes(base.hostname))) { setError("L’endpoint doit utiliser HTTPS (HTTP est permis sur localhost)."); return; }
    if (!organization.trim() || !project.trim()) { setError(fr ? "Le scope exige un identifiant d’organisation et de projet." : "Enter both organization and project scope IDs."); return; }
    if (!token.trim()) { setError(fr ? "Saisissez un jeton autorisé à appeler mcp:execute_safe." : "Enter a token authorized for mcp:execute_safe."); return; }
    if (mission.trim().length < 12 || mission.trim().length > 500) { setError(fr ? "La mission doit contenir entre 12 et 500 caractères." : "Mission length must be between 12 and 500 characters."); return; }
    setBusy(true);
    try {
      const api = new URL("/api/mcp/execute", base);
      const result = await fetch(api, { method: "POST", headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json", "X-Organization-Id": organization.trim(), "X-Project-Id": project.trim() }, body: JSON.stringify({ toolName: "genos_orchestrate", args: { mission: mission.trim(), executor: "local", background: false }, timeoutMs: 120000 }), signal: AbortSignal.timeout(125000) });
      const body = await result.json().catch(() => ({ message: "La réponse du serveur n’est pas du JSON." }));
      if (!result.ok) throw new Error(typeof body?.error?.message === "string" ? `${result.status} · ${body.error.message}` : `${result.status} · Exécution refusée par l’API GenOS.`);
      setTransportStatus(result.status);
      setResponse(body);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Échec de connexion à GenOS."); }
    finally { setBusy(false); }
  }

  return <section className="section-wrap p3-section" aria-labelledby="live-sandbox-title">
    <div className="p3-section-heading"><span className="p3-kicker">{fr ? "SANDBOX · EXÉCUTION GENOS EN DIRECT" : "SANDBOX · LIVE GENOS EXECUTION"}</span><h2 id="live-sandbox-title">{fr ? <>Votre runtime,<br /><em>votre mission.</em></> : <>Your runtime,<br /><em>your mission.</em></>}</h2><p>{fr ? "Connectez un serveur GenOS et soumettez une mission à l’orchestrateur local. GenOS applique ses contrôles de permission et de scope. L’appel part directement de votre navigateur." : "Connect a GenOS server and submit a mission to its local orchestrator. GenOS enforces permission and tenant scope. The request goes directly from your browser."}</p></div>
    <form className="p3-sandbox" onSubmit={runMission}>
      <div className="p3-sandbox-grid"><label>{fr ? "URL de base GenOS" : "GenOS base URL"}<input type="url" required placeholder="https://genos.example.com" value={endpoint} onChange={(event) => setEndpoint(event.target.value)} autoComplete="url" /></label><label>{fr ? "Jeton d’accès" : "Access token"}<input type="password" required placeholder="Bearer token" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="off" /></label><label>{fr ? "Organisation" : "Organization"}<input required value={organization} onChange={(event) => setOrganization(event.target.value)} autoComplete="off" /></label><label>{fr ? "Projet" : "Project"}<input required value={project} onChange={(event) => setProject(event.target.value)} autoComplete="off" /></label></div>
      <label className="p3-mission-input">{fr ? "Mission" : "Mission"} <small>{fr ? "12 à 500 caractères · exécuteur local" : "12 to 500 characters · local executor"}</small><textarea rows={4} maxLength={500} minLength={12} required value={mission} onChange={(event) => setMission(event.target.value)} /></label>
      <div className="p3-sandbox-footer"><p>{fr ? "Le jeton reste en mémoire dans cette page. Il n’est ni envoyé à GenOSWork ni enregistré dans le navigateur. Le serveur doit autoriser l’origine du site avec CORS. Les résultats dépendent des permissions, modèles locaux et de l’état GenOS." : "The token stays in this page's memory. It is not sent to GenOSWork or saved in the browser. The GenOS server must allow this site origin through CORS. Results depend on its permissions, local models and state."}</p><button type="submit" disabled={busy}>{busy ? (fr ? "Mission en cours…" : "Mission running…") : (fr ? "Exécuter sur GenOS" : "Run on GenOS")}<b>→</b></button></div>
      {error && <p className="p3-sandbox-error" role="alert">{error}</p>}
      {response !== null && <div className="p3-live-result" aria-live="polite"><div><span className="p3-kicker">{fr ? "RÉPONSE DU RUNTIME" : "RUNTIME RESPONSE"}</span><button type="button" onClick={() => { setResponse(null); setToken(""); setTransportStatus(null); }}>{fr ? "Effacer le résultat et le jeton" : "Clear result and token"}</button></div><p>{fr ? "Transport HTTP" : "HTTP transport"}: {transportStatus ?? "—"} · {fr ? "réponse reçue, issue de mission à qualifier" : "response received; mission outcome requires inspection"}</p><dl className="live-state-grid"><div><dt>{fr ? "État de mission" : "Mission state"}</dt><dd>{runtimeField(response, ["missionStatus", "mission_state", "missionState"]) ?? (fr ? "Non déclaré" : "Not reported")}</dd></div><div><dt>{fr ? "État des workers" : "Worker state"}</dt><dd>{runtimeField(response, ["workerStatus", "worker_state", "workerState"]) ?? (fr ? "Non déclaré" : "Not reported")}</dd></div><div><dt>{fr ? "Vérification" : "Verification"}</dt><dd>{runtimeField(response, ["verificationStatus", "verification_status", "verificationState"]) ?? (fr ? "Non déclarée" : "Not reported")}</dd></div><div><dt>{fr ? "Promotion" : "Promotion"}</dt><dd>{runtimeField(response, ["promotionStatus", "promotion_status", "promotionState"]) ?? (fr ? "Non déclarée" : "Not reported")}</dd></div></dl><p>{fr ? "Un succès de transport ou d’outil ne prouve pas une décision vérifiée. La réponse brute ci-dessous fait autorité pour ce serveur." : "Transport or tool success does not establish a verified decision. The raw response below is authoritative for this server."}</p><pre>{JSON.stringify(response, null, 2)}</pre></div>}
    </form>
  </section>;
}
