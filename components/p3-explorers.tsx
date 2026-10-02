"use client";

import { useMemo, useState, type FormEvent } from "react";
import benchmark from "@/public/benchmarks/planning-gap/2026-09-30-a-star-240.json";
import campaign from "@/public/recorded-runs/topology-campaign.json";

type AlgorithmKey = "react" | "tot" | "mcts" | "genos";
type BenchmarkTask = (typeof benchmark.results)[number];
type CampaignMission = (typeof campaign.missions)[number];

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
          <div className="p3-metrics"><Metric value={result.success ? (fr ? "Oui" : "Yes") : (fr ? "Non" : "No")} label={fr ? "Succès validé" : "Verified success"} /><Metric value={result.expansions} label={fr ? "Expansions" : "Expansions"} /><Metric value={result.plan.length} label={fr ? "Actions dans le plan" : "Plan actions"} /><Metric value={selectedTask.optimalLength ?? "—"} label={fr ? "Optimum BFS (si calculé)" : "BFS optimum (if computed)"} /></div>
          <div className="p3-action-plan"><span>{fr ? "PLAN ENREGISTRÉ" : "RECORDED PLAN"}</span>{result.plan.length ? <ol>{result.plan.map((action, index) => <li key={`${index}-${action}`}><i>{String(index + 1).padStart(2, "0")}</i>{action}</li>)}</ol> : <p>{fr ? "Aucun plan produit dans ce résultat." : "This result contains no plan."}</p>}</div>
          <p className="p3-caveat">{fr ? "Comparaison déterministe sur des tâches synthétiques, budget maximal de 240 expansions. Ces valeurs viennent du runner source; la sélection ci-dessus ne constitue pas une nouvelle exécution." : "Deterministic comparison on synthetic tasks with a 240-expansion cap. These values come from the source runner; this selector does not launch a new run."}</p>
        </div>}
      </div>
      <div className="p3-source-line"><span>{fr ? "ARTEFACT SOURCE" : "SOURCE ARTIFACT"} · {benchmark.measuredAt}</span><a href="/benchmarks/planning-gap/2026-09-30-a-star-240.json" target="_blank" rel="noreferrer">{fr ? "Télécharger le JSON ↗" : "Download JSON ↗"}</a></div>
    </section>
  );
}

export function RecordedRunExplorer({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  const [selected, setSelected] = useState(campaign.missions[0]?.name ?? "");
  const mission = (campaign.missions.find((item) => item.name === selected) ?? campaign.missions[0]) as CampaignMission | undefined;
  const summary = campaign.summary;

  return <section className="section-wrap p3-section" aria-labelledby="recorded-run-title">
    <div className="p3-section-heading"><span className="p3-kicker">{fr ? "TRACE GENOS · CAMPAGNE ENREGISTRÉE" : "GENOS TRACE · RECORDED CAMPAIGN"}</span><h2 id="recorded-run-title">{fr ? <>Une campagne réelle,<br /><em>avec ses échecs.</em></> : <>A real campaign,<br /><em>failures included.</em></>}</h2><p>{fr ? "Relecture d’une campagne locale lancée avec Qwen 2.5 14B. Deux dispatches ont été acceptés; aucune des douze missions n’a passé la vérification finale. L’acceptation d’un dispatch ne prouve pas l’exécution." : "Replay of a local campaign run with Qwen 2.5 14B. Two dispatches were accepted; none of the twelve missions passed final verification. An accepted dispatch is not proof of execution."}</p></div>
    <div className="p3-run-summary"><Metric value={`${summary.verifiedMissions} / ${summary.missions}`} label={fr ? "Missions vérifiées" : "Verified missions"} /><Metric value={`${summary.acceptedDispatches} / ${summary.missions}`} label={fr ? "Dispatches acceptés" : "Accepted dispatches"} /><Metric value={summary.totalWorkerErrors} label={fr ? "Workers en erreur" : "Workers in error"} /><Metric value={summary.timeouts} label={fr ? "Missions avec timeout" : "Missions timed out"} /></div>
    <div className="p3-run-layout"><div className="p3-mission-picker" role="listbox" aria-label={fr ? "Choisir une mission enregistrée" : "Select a recorded mission"}>{campaign.missions.map((item, index) => <button key={item.name} type="button" role="option" aria-selected={mission?.name === item.name} onClick={() => setSelected(item.name)}><i>{String(index + 1).padStart(2, "0")}</i><span>{item.name}</span><b>{item.passed ? "OK" : item.timedOut ? "TIMEOUT" : item.dispatchStatus === "accepted" ? (fr ? "ACCEPTÉ" : "ACCEPTED") : (fr ? "ÉCHEC" : "FAILED")}</b></button>)}</div>
      {mission && <article className="p3-mission-detail"><div className="p3-result-heading"><div><span className="p3-kicker">{fr ? "MISSION" : "MISSION"} {campaign.missions.indexOf(mission) + 1} / {campaign.missions.length}</span><h3>{mission.name}</h3></div><b className={mission.passed ? "p3-verdict p3-verdict-ok" : "p3-verdict p3-verdict-fail"}>{mission.passed ? (fr ? "VÉRIFIÉE" : "VERIFIED") : (fr ? "NON VÉRIFIÉE" : "NOT VERIFIED")}</b></div><div className="p3-metrics"><Metric value={mission.exitCode ?? "—"} label={fr ? "Code de sortie" : "Exit code"} /><Metric value={mission.durationMs ? `${Math.round(mission.durationMs / 1000)} s` : "—"} label={fr ? "Durée" : "Duration"} /><Metric value={mission.dispatchStatus ?? "—"} label="Dispatch" /><Metric value={mission.workerStatuses.length} label="Workers" /></div><div className="p3-event-list"><span>{fr ? "OBSERVATIONS ENREGISTRÉES" : "RECORDED OBSERVATIONS"}</span><ul><li>{fr ? "Vérification finale : " : "Final verification: "}{mission.passed ? (fr ? "réussie" : "passed") : (fr ? "échouée" : "failed")}</li>{mission.timedOut && <li>{fr ? "La mission a dépassé son délai." : "The mission timed out."}</li>}{mission.workerStatuses.map((status, index) => <li key={`${index}-${status}`}>Worker {index + 1} : {status}</li>)}{mission.sessionProbeVerified === true && <li>{fr ? "Une sonde de session associée a été vérifiée; cela ne valide pas cette mission ni les workers." : "An associated session probe passed; that does not verify this mission or its workers."}</li>}{mission.failures.map((failure) => <li key={failure}>{failure}</li>)}</ul></div></article>}</div>
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
  const [error, setError] = useState("");

  async function runMission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setResponse(null);
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
      {response !== null && <div className="p3-live-result" aria-live="polite"><div><span className="p3-kicker">{fr ? "RÉPONSE DU RUNTIME" : "RUNTIME RESPONSE"}</span><button type="button" onClick={() => { setResponse(null); setToken(""); }}>{fr ? "Effacer le résultat et le jeton" : "Clear result and token"}</button></div><pre>{JSON.stringify(response, null, 2)}</pre></div>}
    </form>
  </section>;
}
