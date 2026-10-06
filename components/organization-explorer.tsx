"use client";

import { useEffect, useState } from "react";
import { organizationIds, organizations, organizationFamilies, type Organization, type OrganizationId } from "./organizations";
import { organizationGuides } from "./organization-guides";
import { createOrganizationInput, type ScenarioKind } from "./organization-scenarios";
import { authorityFor, parseOrganizationInput, preferredAgents, runOrganizationStep, type OrganizationInput, type OrganizationOptions, type OrganizationResult } from "./organization-algorithms";
import { OrganizationResultVisual } from "./organization-result";
import { OrganizationVisual } from "./organization-visual";
import { genosSource, genosSourceCommit } from "./product-evidence";
import styles from "./organization-explorer.module.css";

type Language = "en" | "fr";
const familyFr: Record<string, string> = { "Collective judgment": "Jugement collectif", "Collective coordination": "Coordination collective", "Swarm search": "Recherche en essaim", "Adaptive routing": "Routage adaptatif", "Resilience & memory": "Résilience et mémoire" };
const swarmIds: OrganizationId[] = ["flocking_boids", "fish_school_search", "slime_mould_network", "grey_wolf_optimizer"];
type Parameter = { key: keyof OrganizationOptions; en: string; fr: string; min: number; max: number; step: number; fallback: number };
const parameters: Partial<Record<OrganizationId, Parameter[]>> = {
  quorum_with_abstention: [{ key: "quorumRatio", en: "Support threshold", fr: "Seuil de support", min: 0.05, max: 1, step: 0.05, fallback: 0.5 }],
  flocking_boids: [
    { key: "cohesion", en: "Cohesion", fr: "Cohésion", min: 0, max: 1, step: 0.05, fallback: 0.05 },
    { key: "alignment", en: "Alignment", fr: "Alignement", min: 0, max: 1, step: 0.05, fallback: 0.05 },
    { key: "separation", en: "Separation", fr: "Séparation", min: 0, max: 1, step: 0.05, fallback: 0.1 },
    { key: "separationRadius", en: "Separation radius", fr: "Rayon de séparation", min: 0, max: 10, step: 0.1, fallback: 1 },
  ],
  fish_school_search: [{ key: "step", en: "Movement step", fr: "Pas de mouvement", min: 0, max: 1, step: 0.05, fallback: 0.1 }],
  grey_wolf_optimizer: [{ key: "step", en: "Movement step", fr: "Pas de mouvement", min: 0, max: 1, step: 0.05, fallback: 0.1 }],
  slime_mould_network: [
    { key: "reinforcement", en: "Reinforcement multiplier", fr: "Multiplicateur de renforcement", min: 1, max: 2, step: 0.05, fallback: 1.1 },
    { key: "decay", en: "Decay multiplier", fr: "Multiplicateur de décroissance", min: 0, max: 1, step: 0.05, fallback: 0.9 },
    { key: "pruneBelow", en: "Pruning threshold", fr: "Seuil d’élagage", min: 0, max: 1, step: 0.01, fallback: 0.05 },
  ],
};

function OrganizationSession({ organization, language }: { organization: Organization; language: Language }) {
  const fr = language === "fr", t = (en: string, french: string) => fr ? french : en;
  const id = organization.id, guide = organizationGuides[id];
  const [input, setInput] = useState(() => createOrganizationInput(id));
  const [kind, setKind] = useState<ScenarioKind>("example");
  const [draft, setDraft] = useState(() => JSON.stringify(createOrganizationInput(id), null, 2));
  const [result, setResult] = useState<OrganizationResult | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<{ input: OrganizationInput; result: OrganizationResult }[]>([]);
  const [count, setCount] = useState(0);
  const modify = (value: OrganizationInput) => { setInput(value); setDraft(JSON.stringify(value, null, 2)); setResult(null); setError(""); };
  const execute = (value: OrganizationInput) => {
    try {
      const validated = parseOrganizationInput(JSON.stringify(value));
      const output = runOrganizationStep(id, validated.state, validated.options);
      setInput(validated); setDraft(JSON.stringify(validated, null, 2)); setResult(output); setError(""); setCount((value) => value + 1);
      setHistory((old) => [...old, { input: validated, result: output }].slice(-6));
    } catch (failure) { setError(failure instanceof Error ? failure.message : String(failure)); }
  };
  const load = (scenario: ScenarioKind) => { setKind(scenario); modify(createOrganizationInput(id, scenario)); setCount(0); setHistory([]); };
  const updateOption = (key: keyof OrganizationOptions, value: number) => modify({ ...input, options: { ...input.options, [key]: value } });
  const membersKey = id === "grey_wolf_optimizer" ? "pack" : "agents";
  const members = input.state[membersKey];
  const resizeMembers = (count: number) => {
    const original = members ?? [], size = Math.min(12, Math.max(0, Math.floor(count)));
    const agents = Array.from({ length: size }, (_, index) => original[index] ?? { id: `Member-${index + 1}`, role: "member", x: index, y: (index * 3) % 5, fitness: 0.5, capabilities: [] });
    modify({ ...input, state: { ...input.state, [membersKey]: agents } });
  };
  const download = () => {
    if (!result) return;
    const receipt = { mode: "local-guidance", sourceRevision: genosSourceCommit, organization: id, execution: count, input, output: result, preferred: preferredAgents(result, input.options.limit ?? 3) };
    const url = URL.createObjectURL(new Blob([JSON.stringify(receipt, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `genos-${id}-step-${count}.json`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };
  return <section className={styles.lab} aria-labelledby="organization-lab-heading">
    <div className={styles.labHeading}><span className={styles.kicker}>{t("EXECUTABLE ORGANIZATION LAB", "LABORATOIRE D’ORGANISATIONS EXÉCUTABLES")}</span><span className={styles.badge}>{t("LOCAL COMPUTATION · 19 / 19", "CALCUL LOCAL · 19 / 19")}</span></div>
    <h2 id="organization-lab-heading" tabIndex={-1}>{fr ? guide.nameFr : organization.name}</h2>
    <p>{fr ? guide.summaryFr : organization.summary}</p><code className={styles.formula}>{guide.formula}</code><p className={styles.scope}>{fr ? guide.scopeFr : guide.scopeEn}</p>
    <div className={styles.labGrid}><div className={styles.inputPanel}><div className={styles.kicker}>{t("01 / INPUTS", "01 / ENTRÉES")}</div><div className={styles.controls}>
      <label className={styles.control}><span>{t("Scenario", "Scénario")}</span><select value={kind} onChange={(event) => load(event.target.value as ScenarioKind)}><option value="example">{t("Example", "Exemple nominal")}</option><option value="boundary">{t("Boundary case", "Cas limite")}</option><option value="empty">{t("Empty input", "Entrée vide")}</option></select></label>
      {members && <label className={styles.control}><span>{t("Member count", "Nombre de membres")}<b>{members.length}</b></span><input type="range" min="0" max="12" step="1" value={Math.min(12, members.length)} onChange={(event) => {
        const original = members ?? [], size = Number(event.target.value);
        const agents = Array.from({ length: size }, (_, index) => original[index] ?? { id: `Member-${index + 1}`, role: "member", x: index, y: (index * 3) % 5, fitness: 0.5, capabilities: [] });
        modify({ ...input, state: { ...input.state, [membersKey]: agents } });
      }} /></label>}
      {(parameters[id] ?? []).map((parameter) => <label className={styles.control} key={parameter.key}><span>{fr ? parameter.fr : parameter.en}<b>{input.options[parameter.key] ?? parameter.fallback}</b></span><input type="range" min={parameter.min} max={parameter.max} step={parameter.step} value={input.options[parameter.key] ?? parameter.fallback} onChange={(event) => updateOption(parameter.key, Number(event.target.value))} /></label>)}
      {id === "mycelial_routing" && <label className={styles.control}><span>{t("Required capability", "Capacité requise")}</span><input type="text" maxLength={100} value={input.state.need ?? input.options.need ?? ""} onChange={(event) => modify({ ...input, state: { ...input.state, need: event.target.value } })} /></label>}
      {id === "energy_huddle" && <label className={styles.control}><span>{t("Available budget", "Budget disponible")}<b>{input.state.budget ?? 0}</b></span><input type="range" min="0" max="5000" step="50" value={Math.min(5000, input.state.budget ?? 0)} onChange={(event) => modify({ ...input, state: { ...input.state, budget: Number(event.target.value) } })} /></label>}
      {id === "brier_weighted_consensus" && <div className={styles.formRows}>{(input.state.dossiers ?? []).map((dossier, index) => { const report = [...(dossier.events ?? [])].reverse().map((event) => event.evidenceReport).find(Boolean) ?? {}; return <label className={styles.control} key={index}><span>{dossier.id ?? `E${index + 1}`} · p <b>{report.confidence ?? 0.5}</b></span><input type="range" min="0" max="1" step="0.05" value={report.confidence ?? 0.5} onChange={(event) => { const next = structuredClone(input); const events = next.state.dossiers![index].events ?? []; next.state.dossiers![index].events = [...(events.at(-1)?.evidenceReport ? events.slice(0, -1) : events), { evidenceReport: { ...report, confidence: Number(event.target.value) } }]; modify(next); }} /></label>; })}</div>}
      {id === "quorum_with_abstention" && <div className={styles.formRows}>{(input.state.votes ?? []).map((vote, index) => <label className={styles.control} key={index}><span>{vote.id ?? `V${index + 1}`}</span><select value={vote.abstain ? "abstain" : vote.support ? "yes" : "no"} onChange={(event) => { const next = structuredClone(input); next.state.votes![index] = { ...vote, abstain: event.target.value === "abstain", support: event.target.value === "yes" }; modify(next); }}><option value="yes">{t("Support", "Pour")}</option><option value="no">{t("Oppose", "Contre")}</option><option value="abstain">{t("Abstain", "Abstention")}</option></select></label>)}</div>}
    </div><div className={styles.actions}><button type="button" onClick={() => execute(input)}>{t("Run one step", "Exécuter un pas")} →</button><button type="button" onClick={() => load(kind)}>{t("Reset", "Réinitialiser")}</button><button type="button" disabled={!result} onClick={download}>{t("Export result", "Exporter le résultat")}</button></div>
    <details className={styles.editor}><summary>{t("Edit all input data (JSON)", "Modifier toutes les données d’entrée (JSON)")}</summary><label className={styles.control}><span>{t("State and options", "État et options")}</span><textarea value={draft} spellCheck={false} onChange={(event) => setDraft(event.target.value)} /></label><button type="button" onClick={() => { try { execute(parseOrganizationInput(draft)); } catch (failure) { setError(failure instanceof Error ? failure.message : String(failure)); } }}>{t("Apply and run", "Appliquer et exécuter")}</button><p>{t("Maximum 64 members per list; JSON data only. Options and state follow the source field names.", "Maximum 64 membres par liste ; données JSON uniquement. Les options et l’état reprennent les noms de champs de la source.")}</p></details>{error && <p className={styles.error} role="alert">{error}</p>}
    </div><div className={styles.resultPanel}><div className={styles.resultHeading}><span>{t("02 / COMPUTED OUTPUT", "02 / SORTIE CALCULÉE")}</span><span role="status" aria-live="polite">{result ? `${t("Step", "Pas")} ${count}` : t("Ready to compute", "Prêt à calculer")}</span></div>
    {result ? <OrganizationResultVisual input={input} result={result} language={language} /> : <div className={styles.pending}><OrganizationVisual organization={organization} language={language} /><p>{t("Change the inputs, then run the step to see its computed output.", "Modifiez les entrées, puis exécutez le pas pour voir la sortie calculée.")}</p></div>}
    {result && <><p>{t("Preferred continuations", "Continuations préférées")} : <strong>{preferredAgents(result, input.options.limit ?? 3).join(" · ") || "∅"}</strong></p><details><summary>{t("Inspect exact output", "Inspecter la sortie exacte")}</summary><pre>{JSON.stringify(result, null, 2)}</pre></details><details><summary>{t("Role authority", "Autorité des rôles")}</summary><pre>{JSON.stringify((input.state.agents ?? input.state.pack ?? []).map((agent) => ({ id: agent.id, role: agent.role ?? "member", authority: authorityFor(id, result.pack?.find((wolf) => wolf.id === agent.id)?.role ?? agent.role ?? "") })), null, 2)}</pre></details></>}
    {history.length > 0 && <details><summary>{t("Recent calculations", "Calculs récents")} ({history.length})</summary><pre>{JSON.stringify(history, null, 2)}</pre></details>}
    </div></div>
    <div className={styles.sourceLinks}><a href={genosSource(`backend/src/services/${swarmIds.includes(id) ? "swarmTopologyAlgorithms" : "organizationAlgorithms"}.js`)} target="_blank" rel="noreferrer">{t("Algorithm source", "Source de l’algorithme")} ↗</a><a href={genosSource("backend/src/services/dynamicOrganizationService.js")} target="_blank" rel="noreferrer">{t("Organization registry", "Registre des organisations")} ↗</a><a href={genosSource("docs/03-reference/contrat-produit-et-completude.md")} target="_blank" rel="noreferrer">{t("Runtime maturity contract", "Contrat de maturité du runtime")} ↗</a></div>
  </section>;
}

export function OrganizationExplorer({ language = "en" }: { language?: Language }) {
  const fr = language === "fr", t = (en: string, french: string) => fr ? french : en;
  const [activeId, setActiveId] = useState<OrganizationId>(organizationIds[0]);
  const [family, setFamily] = useState("all"), [query, setQuery] = useState("");
  useEffect(() => {
    const fromHash = () => { const candidate = window.location.hash.slice(1); setActiveId(organizationIds.includes(candidate as OrganizationId) ? candidate as OrganizationId : organizationIds[0]); };
    fromHash(); window.addEventListener("hashchange", fromHash); window.addEventListener("popstate", fromHash);
    return () => { window.removeEventListener("hashchange", fromHash); window.removeEventListener("popstate", fromHash); };
  }, []);
  const choose = (id: OrganizationId, scroll = true) => {
    setActiveId(id); window.history.pushState(null, "", `#${id}`);
    if (scroll) requestAnimationFrame(() => { document.getElementById("organization-lab")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); document.getElementById("organization-lab-heading")?.focus({ preventScroll: true }); });
  };
  const active = organizations.find((organization) => organization.id === activeId)!;
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const visible = organizations.filter((organization) => (family === "all" || organization.family === family) && normalize(`${organization.name} ${organizationGuides[organization.id].nameFr} ${organization.id}`).includes(normalize(query.trim())));
  return <div className={styles.explorer} id="organization-lab">
    <label className={styles.search} style={{ marginBottom: 20 }}>{t("Choose an organization", "Choisir une organisation")}<select aria-label={t("Organization", "Organisation")} value={activeId} onChange={(event) => choose(event.target.value as OrganizationId, false)}>{organizations.map((organization, index) => <option key={organization.id} value={organization.id}>{String(index + 1).padStart(2, "0")} · {fr ? organizationGuides[organization.id].nameFr : organization.name}</option>)}</select></label>
    <OrganizationSession key={activeId} organization={active} language={language} />
    <div className={styles.catalogHeading}><div><span className={styles.kicker}>{t("THE COMPLETE REGISTRY", "LE REGISTRE COMPLET")}</span><h2>{t("Nineteen ways to guide a step.", "Dix-neuf règles pour guider un pas.")}</h2></div><label className={styles.search}>{t("Find an organization", "Rechercher une organisation")}<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Name or identifier", "Nom ou identifiant")} /></label></div>
    <div className={styles.filters} role="group" aria-label={t("Organization families", "Familles d’organisations")}><button type="button" aria-pressed={family === "all"} onClick={() => setFamily("all")}>{t("All", "Toutes")} · 19</button>{organizationFamilies.map((value) => <button type="button" key={value} aria-pressed={family === value} onClick={() => setFamily(value)}>{fr ? familyFr[value] : value}</button>)}</div>
    <p className={styles.kicker} role="status">{visible.length} / 19 {t("organizations", "organisations")}</p>
    <div className={styles.catalog}>{visible.map((organization) => { const guide = organizationGuides[organization.id]; return <article className={styles.card} key={organization.id} data-selected={activeId === organization.id}>
      <div className={styles.cardTop}><span>{String(organizationIds.indexOf(organization.id) + 1).padStart(2, "0")} / 19</span><span>{fr ? organization.status === "PARTIAL" ? "RUNTIME PARTIEL" : "RUNTIME EXPÉRIMENTAL" : `RUNTIME ${organization.status}`}</span></div>
      <OrganizationVisual organization={organization} language={language} /><h3>{fr ? guide.nameFr : organization.name}</h3><p>{fr ? guide.summaryFr : organization.summary}</p><code className={styles.formula}>{guide.formula}</code><dl><dt>{t("INPUT", "ENTRÉE")}</dt><dd>{guide.inputs}</dd><dt>{t("OUTPUT", "SORTIE")}</dt><dd>{guide.outputs}</dd><dt>{t("USE CASE", "CAS D’USAGE")}</dt><dd>{fr ? guide.useFr : guide.useEn}</dd></dl><p>{fr ? guide.scopeFr : guide.scopeEn}</p><code className={styles.id}>{organization.id}</code><button type="button" aria-pressed={activeId === organization.id} onClick={() => choose(organization.id)}>{t("Run this algorithm", "Exécuter cet algorithme")} →</button>
    </article>; })}</div>
    {!visible.length && <p className={styles.emptyFilter}>{t("No matches. Clear the search or choose another family.", "Aucun résultat. Effacez la recherche ou choisissez une autre famille.")}</p>}
    <aside className={styles.bottomNote}><p>{t("All 19 data-only guidance steps can be calculated locally here. Runtime statuses above follow the source contract: worker execution, tool authority, persistent services and verified mission outcomes remain separate. ", "Les 19 pas de guidage sur données peuvent être calculés localement ici. Les statuts runtime suivent le contrat source : exécution des workers, autorité des outils, services persistants et résultats de mission vérifiés restent des conditions distinctes. ")}<a href={genosSource("docs/02-orchestration/topologies-et-capacites.md")} target="_blank" rel="noreferrer">{t("Read the topology and capability contract", "Lire le contrat des topologies et capacités")} ↗</a></p></aside>
  </div>;
}
