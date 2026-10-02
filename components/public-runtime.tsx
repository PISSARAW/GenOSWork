"use client";

import { useEffect, useState } from "react";

type Scenario = "evidence-gate" | "budgeted-plan" | "quorum-review";
type RunReceipt = {
  runId: string;
  scenario: Scenario;
  createdAt: string;
  expiresAt: string;
  verdict: string;
  quota: { limit: number; windowSeconds: number; remaining: number };
  events: { sequence: number; phase: string; detail: string; state: "complete" | "held" | "rejected" }[];
};

const scenarioLabels: Record<Scenario, { en: string; fr: string; explanationEn: string; explanationFr: string }> = {
  "evidence-gate": { en: "Evidence gate", fr: "Seuil de preuve", explanationEn: "See how a fixed evidence threshold holds or rejects a claim.", explanationFr: "Observez un seuil fixe qui suspend ou rejette une affirmation." },
  "budgeted-plan": { en: "Budgeted plan", fr: "Plan sous budget", explanationEn: "Watch a small workflow stop when it runs out of steps.", explanationFr: "Observez un workflow court s’arrêter à épuisement des étapes." },
  "quorum-review": { en: "Quorum review", fr: "Revue par quorum", explanationEn: "Apply a declared quorum to five fixed teaching ballots.", explanationFr: "Appliquez un quorum déclaré à cinq votes pédagogiques fixes." },
};

export function PublicRuntime({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  const [scenario, setScenario] = useState<Scenario>("evidence-gate");
  const [evidence, setEvidence] = useState(65);
  const [budget, setBudget] = useState(3);
  const [quorum, setQuorum] = useState(0.6);
  const [run, setRun] = useState<RunReceipt | null>(null);
  const [remainingMs, setRemainingMs] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!run) return;
    const expiresAt = Date.parse(run.expiresAt);
    const update = () => {
      const remaining = Math.max(0, expiresAt - Date.now());
      setRemainingMs(remaining);
      if (!remaining) setRun(null);
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [run]);

  async function startRun() {
    setBusy(true); setError(""); setRun(null);
    try {
      const response = await fetch("/api/public-runtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario, evidence, budget, quorum }),
        cache: "no-store",
        signal: AbortSignal.timeout(5_000),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(typeof body.error === "string" ? body.error : `HTTP ${response.status}`);
      setRun(body as RunReceipt);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : (fr ? "Échec de l’exécution publique." : "Public run failed."));
    } finally { setBusy(false); }
  }

  const selected = scenarioLabels[scenario];
  const minutes = Math.floor(remainingMs / 60_000);
  const seconds = Math.floor((remainingMs % 60_000) / 1000);

  return <section className="section-wrap p3-section" aria-labelledby="public-runtime-title">
    <div className="p3-section-heading"><span className="p3-kicker">{fr ? "RUNTIME PUBLIC · JETABLE · SANS IDENTIFIANT" : "PUBLIC RUNTIME · DISPOSABLE · NO CREDENTIAL"}</span><h2 id="public-runtime-title">{fr ? <>Un run isolé.<br /><em>Des limites visibles.</em></> : <>One bounded run.<br /><em>Limits in view.</em></>}</h2><p>{fr ? "Exécutez un des trois scénarios déterministes. Le serveur n’accepte ni code fourni par l’utilisateur ni appel d’outil externe. Le reçu reste en mémoire dans cette page pendant dix minutes." : "Run one of three deterministic scenarios. The server accepts no user code and makes no external tool calls. The receipt stays in this page's memory for ten minutes."}</p></div>
    <div className="public-runtime-card">
      <div className="public-runtime-controls">
        <label>{fr ? "Scénario" : "Scenario"}<select value={scenario} onChange={(event) => setScenario(event.target.value as Scenario)}>{(Object.keys(scenarioLabels) as Scenario[]).map((key) => <option key={key} value={key}>{fr ? scenarioLabels[key].fr : scenarioLabels[key].en}</option>)}</select></label>
        <p>{fr ? selected.explanationFr : selected.explanationEn}</p>
        {scenario === "evidence-gate" && <label className="public-range">{fr ? "Force de la preuve" : "Evidence strength"}<strong>{evidence}/100</strong><input type="range" min="0" max="100" value={evidence} onChange={(event) => setEvidence(Number(event.target.value))} /><small>{fr ? "Seuil pédagogique fixe : 60/100" : "Fixed teaching threshold: 60/100"}</small></label>}
        {scenario === "budgeted-plan" && <label className="public-range">{fr ? "Étapes disponibles" : "Available steps"}<strong>{budget} / 5</strong><input type="range" min="1" max="5" value={budget} onChange={(event) => setBudget(Number(event.target.value))} /><small>{fr ? "Vérification possible à partir de 4 étapes" : "Verification step is reached with 4 or more steps"}</small></label>}
        {scenario === "quorum-review" && <label className="public-range">{fr ? "Quorum requis" : "Required quorum"}<strong>{Math.round(quorum * 100)}%</strong><input type="range" min="20" max="100" value={Math.round(quorum * 100)} onChange={(event) => setQuorum(Number(event.target.value) / 100)} /><small>{fr ? "Votes pédagogiques fixes : 3 pour, 2 contre" : "Fixed teaching ballots: 3 for, 2 against"}</small></label>}
        <button type="button" onClick={startRun} disabled={busy}>{busy ? (fr ? "Exécution…" : "Running…") : (fr ? "Créer un run jetable" : "Start disposable run")}<b>→</b></button>
      </div>
      <aside className="public-runtime-limits"><span>{fr ? "CONTRAT D’EXÉCUTION" : "EXECUTION CONTRACT"}</span><ul><li>{fr ? "8 runs par minute et par adresse client déclarée par le proxy" : "8 runs per minute per client address supplied by the proxy"}</li><li>{fr ? "Requête limitée à 2 Ko · réponse sans cache" : "2 KB request cap · response is never cached"}</li><li>{fr ? "Aucun code arbitraire, secret, outil ou effet externe" : "No arbitrary code, secrets, tools, or external effects"}</li><li>{fr ? "Reçu côté navigateur effacé après 10 minutes ou à la demande" : "Browser receipt clears after 10 minutes or on demand"}</li></ul><small>{fr ? "Les quotas s’appliquent par processus serveur. Sans adresse fournie par un proxy fiable, ils partagent le même compartiment; une plateforme multi-instance doit ajouter un limiteur partagé avant une exposition à grande échelle." : "Quotas apply per server process. Without a trusted proxy address, clients share one bucket; a multi-instance deployment needs a shared limiter before broad exposure."}</small></aside>
      {error && <p className="p3-sandbox-error" role="alert">{error}</p>}
      {run && <div className="public-runtime-result" aria-live="polite">
        <div className="public-runtime-result-heading"><div><span className="p3-kicker">{fr ? "REÇU ÉPHÉMÈRE" : "EPHEMERAL RECEIPT"} · {run.runId}</span><strong>{run.verdict.replaceAll("-", " ").toUpperCase()}</strong></div><button type="button" onClick={() => setRun(null)}>{fr ? "Effacer" : "Delete"}</button></div>
        <p>{fr ? `Expiration dans ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} · ${run.quota.remaining}/${run.quota.limit} exécutions restantes sur cette fenêtre serveur.` : `Expires in ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} · ${run.quota.remaining}/${run.quota.limit} runs remain in this server window.`}</p>
        <ol className="public-runtime-events">{run.events.map((event) => <li key={event.sequence} data-state={event.state}><i>{String(event.sequence).padStart(2, "0")}</i><div><strong>{event.phase}</strong><span>{event.detail}</span></div><b>{event.state.toUpperCase()}</b></li>)}</ol>
        <small>{fr ? "Résultat de scénario pédagogique déterministe. Il ne représente pas une mission GenOS connectée ni une vérification dans le monde réel." : "Deterministic teaching scenario output. This is not a connected GenOS mission or real-world verification."}</small>
      </div>}
    </div>
  </section>;
}
