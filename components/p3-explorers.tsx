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

export function BenchmarkExplorer() {
  const [taskId, setTaskId] = useState(benchmark.results[0]?.task ?? "");
  const [algorithm, setAlgorithm] = useState<AlgorithmKey>("genos");
  const [domain, setDomain] = useState("all");
  const visibleTasks = useMemo(() => benchmark.results.filter((task) => domain === "all" || task.domain === domain), [domain]);
  const selectedTask = (visibleTasks.find((task) => task.task === taskId) ?? visibleTasks[0]) as BenchmarkTask | undefined;
  const result = selectedTask?.[algorithm];

  return (
    <section className="section-wrap p3-section" aria-labelledby="benchmark-explorer-title">
      <div className="p3-section-heading"><span className="p3-kicker">BENCHMARK INTERACTIF · RÉSULTATS ENREGISTRÉS</span><h2 id="benchmark-explorer-title">Explorez les 12 tâches<br /><em>du même run.</em></h2><p>Choisissez un domaine, une tâche et une politique. Le panneau restitue le plan, le verdict et les expansions enregistrés le 30 septembre 2026. Il ne relance pas le benchmark.</p></div>
      <div className="p3-benchmark">
        <div className="p3-controls">
          <label>Domaine<select value={domain} onChange={(event) => { const next = event.target.value; setDomain(next); const first = benchmark.results.find((task) => next === "all" || task.domain === next); if (first) setTaskId(first.task); }}><option value="all">Tous les domaines</option><option value="blocksworld">Blocksworld · 8 tâches</option><option value="trapchain">TrapChain · 4 tâches</option></select></label>
          <label>Tâche<select value={selectedTask?.task ?? ""} onChange={(event) => setTaskId(event.target.value)}>{visibleTasks.map((task) => <option key={task.task} value={task.task}>{task.task}</option>)}</select></label>
          <label>Politique<select value={algorithm} onChange={(event) => setAlgorithm(event.target.value as AlgorithmKey)}>{algorithms.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        </div>
        {selectedTask && result && <div className="p3-benchmark-result">
          <div className="p3-result-heading"><div><span className="p3-kicker">{selectedTask.domain.toUpperCase()} · {selectedTask.task}</span><h3>{algorithms.find((item) => item.id === algorithm)?.label}</h3></div><b className={result.success ? "p3-verdict p3-verdict-ok" : "p3-verdict p3-verdict-fail"}>{result.success ? "OBJECTIF ATTEINT" : "ÉCHEC ENREGISTRÉ"}</b></div>
          <div className="p3-metrics"><Metric value={result.success ? "Oui" : "Non"} label="Succès validé" /><Metric value={result.expansions} label="Expansions" /><Metric value={result.plan.length} label="Actions dans le plan" /><Metric value={selectedTask.optimalLength ?? "—"} label="Optimalité BFS (si calculée)" /></div>
          <div className="p3-action-plan"><span>PLAN ENREGISTRÉ</span>{result.plan.length ? <ol>{result.plan.map((action, index) => <li key={`${index}-${action}`}><i>{String(index + 1).padStart(2, "0")}</i>{action}</li>)}</ol> : <p>Aucun plan produit dans ce résultat.</p>}</div>
          <p className="p3-caveat">Comparaison déterministe sur des tâches synthétiques, budget maximal de 240 expansions. Ces valeurs proviennent du runner source; la sélection ci-dessus ne constitue pas une nouvelle exécution.</p>
        </div>}
      </div>
      <div className="p3-source-line"><span>ARTIFACT SOURCE · {benchmark.measuredAt}</span><a href="/benchmarks/planning-gap/2026-09-30-a-star-240.json" target="_blank" rel="noreferrer">Télécharger le JSON ↗</a></div>
    </section>
  );
}

export function RecordedRunExplorer() {
  const [selected, setSelected] = useState(campaign.missions[0]?.name ?? "");
  const mission = (campaign.missions.find((item) => item.name === selected) ?? campaign.missions[0]) as CampaignMission | undefined;
  const summary = campaign.summary;

  return <section className="section-wrap p3-section" aria-labelledby="recorded-run-title">
    <div className="p3-section-heading"><span className="p3-kicker">TRACE GENOS · CAMPAGNE ENREGISTRÉE</span><h2 id="recorded-run-title">Une campagne réelle,<br /><em>avec ses échecs.</em></h2><p>Relecture d’une campagne locale lancée avec Qwen 2.5 14B. Deux dispatches ont été acceptés; aucun des douze contrôles de mission n’a passé la vérification finale. L’acceptation d’un dispatch ne prouve pas l’exécution.</p></div>
    <div className="p3-run-summary"><Metric value={`${summary.verifiedMissions} / ${summary.missions}`} label="Missions vérifiées" /><Metric value={`${summary.acceptedDispatches} / ${summary.missions}`} label="Dispatches acceptés" /><Metric value={summary.totalWorkerErrors} label="Workers en erreur" /><Metric value={summary.timeouts} label="Missions avec timeout" /></div>
    <div className="p3-run-layout"><div className="p3-mission-picker" role="listbox" aria-label="Choisir une mission enregistrée">{campaign.missions.map((item, index) => <button key={item.name} type="button" role="option" aria-selected={mission?.name === item.name} onClick={() => setSelected(item.name)}><i>{String(index + 1).padStart(2, "0")}</i><span>{item.name}</span><b>{item.passed ? "OK" : item.timedOut ? "TIMEOUT" : item.dispatchStatus === "accepted" ? "ACCEPTÉ" : "ÉCHEC"}</b></button>)}</div>
      {mission && <article className="p3-mission-detail"><div className="p3-result-heading"><div><span className="p3-kicker">MISSION {campaign.missions.indexOf(mission) + 1} / {campaign.missions.length}</span><h3>{mission.name}</h3></div><b className={mission.passed ? "p3-verdict p3-verdict-ok" : "p3-verdict p3-verdict-fail"}>{mission.passed ? "VÉRIFIÉE" : "NON VÉRIFIÉE"}</b></div><div className="p3-metrics"><Metric value={mission.exitCode ?? "—"} label="Code de sortie" /><Metric value={mission.durationMs ? `${Math.round(mission.durationMs / 1000)} s` : "—"} label="Durée" /><Metric value={mission.dispatchStatus ?? "—"} label="Dispatch" /><Metric value={mission.workerStatuses.length} label="Workers" /></div><div className="p3-event-list"><span>OBSERVATIONS ENREGISTRÉES</span><ul><li>Vérification finale : {mission.passed ? "réussie" : "échouée"}</li>{mission.timedOut && <li>La mission a dépassé son délai.</li>}{mission.workerStatuses.map((status, index) => <li key={`${index}-${status}`}>Worker {index + 1} : {status}</li>)}{mission.sessionProbeVerified === true && <li>Une sonde de session associée a été vérifiée; cela ne valide pas cette mission ni les workers.</li>}{mission.failures.map((failure) => <li key={failure}>{failure}</li>)}</ul></div></article>}</div>
    <div className="p3-run-provenance"><div><span>RUN ID</span><code>{campaign.provenance.runId}</code></div><div><span>COMMIT SOURCE</span><code>{campaign.provenance.sourceCommit}</code></div><div><span>ENVIRONNEMENT</span><code>{campaign.provenance.executor} · {campaign.provenance.model}</code></div><div><span>QUALIFICATION</span><code>{campaign.provenance.qualification}</code></div><p>Trace historique partielle extraite de GenOS. Les identifiants de session et le contenu des missions ne sont pas publiés. Les résumés affichés reprennent le résultat de campagne; ils ne reconstituent pas un journal chronologique.</p></div>
    <div className="p3-source-line"><span>SHA-256 · {campaign.provenance.sha256}</span><a href="/recorded-runs/topology-campaign.json" target="_blank" rel="noreferrer">Télécharger la trace expurgée ↗</a></div>
  </section>;
}

export function LiveSandbox() {
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
    if (!organization.trim() || !project.trim()) { setError("Le scope exige un identifiant d’organisation et de projet."); return; }
    if (!token.trim()) { setError("Saisissez un jeton autorisé à appeler mcp:execute_safe."); return; }
    if (mission.trim().length < 12 || mission.trim().length > 500) { setError("La mission doit contenir entre 12 et 500 caractères."); return; }
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
    <div className="p3-section-heading"><span className="p3-kicker">SANDBOX · EXÉCUTION GENOS EN DIRECT</span><h2 id="live-sandbox-title">Votre runtime,<br /><em>votre mission.</em></h2><p>Connectez un serveur GenOS puis soumettez une mission à l’orchestrateur local. GenOS applique ses contrôles de permission et de scope. L’appel part directement de votre navigateur vers votre endpoint.</p></div>
    <form className="p3-sandbox" onSubmit={runMission}>
      <div className="p3-sandbox-grid"><label>URL de base GenOS<input type="url" required placeholder="https://genos.example.com" value={endpoint} onChange={(event) => setEndpoint(event.target.value)} autoComplete="url" /></label><label>Jeton d’accès<input type="password" required placeholder="Bearer token" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="off" /></label><label>Organisation<input required value={organization} onChange={(event) => setOrganization(event.target.value)} autoComplete="off" /></label><label>Projet<input required value={project} onChange={(event) => setProject(event.target.value)} autoComplete="off" /></label></div>
      <label className="p3-mission-input">Mission <small>12 à 500 caractères · exécuteur local</small><textarea rows={4} maxLength={500} minLength={12} required value={mission} onChange={(event) => setMission(event.target.value)} /></label>
      <div className="p3-sandbox-footer"><p>Le jeton reste en mémoire dans cette page et n’est ni envoyé à GenOSWork ni enregistré dans le navigateur. Le serveur GenOS doit autoriser l’origine du site en CORS. Les résultats dépendent de ses permissions, de ses modèles locaux et de son état.</p><button type="submit" disabled={busy}>{busy ? "Mission en cours…" : "Exécuter sur GenOS"}<b>→</b></button></div>
      {error && <p className="p3-sandbox-error" role="alert">{error}</p>}
      {response !== null && <div className="p3-live-result" aria-live="polite"><div><span className="p3-kicker">RÉPONSE DU RUNTIME</span><button type="button" onClick={() => { setResponse(null); setToken(""); }}>Effacer le résultat et le jeton</button></div><pre>{JSON.stringify(response, null, 2)}</pre></div>}
    </form>
  </section>;
}
