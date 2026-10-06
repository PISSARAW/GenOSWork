import { useId } from "react";
import { calibrationRows, type OrganizationInput, type OrganizationResult, type Vector } from "./organization-algorithms";
import styles from "./organization-explorer.module.css";

const format = (value: number) => Number(value.toFixed(4)).toString();
export function OrganizationResultVisual({ input, result, language }: { input: OrganizationInput; result: OrganizationResult; language: "en" | "fr" }) {
  const markerId = useId().replaceAll(":", "");
  const fr = language === "fr", t = (en: string, french: string) => fr ? french : en;
  const empty = <p className={styles.empty}>{t("No active data in this step.", "Aucune donnée active pour ce pas.")}</p>;
  const group = (label: string, members: string[], kind = "") => <div className={styles.group} data-kind={kind}><span>{label}</span><div>{members.length ? members.map((member, index) => <b key={`${member}-${index}`}>{member}</b>) : <i>∅</i>}</div></div>;
  const bar = (label: string, value: number, max = 1, active = false, note = "") => <div className={styles.barRow} key={label}><span>{label}</span><div className={styles.barTrack}><i style={{ width: `${Math.min(100, Math.max(0, value / (max || 1) * 100))}%` }} data-active={active} /></div><b>{format(value)}</b>{note && <small>{note}</small>}</div>;

  if (result.agents || result.individuals || result.pack) {
    const agents = result.pack ? input.state.pack ?? [] : input.state.agents ?? [];
    const positions = agents.map((agent) => {
      let after: Vector = { x: agent.x ?? 0, y: agent.y ?? 0 };
      const wolf = result.pack?.find((item) => item.id === agent.id);
      const vector = result.agents?.find((item) => item.id === agent.id)?.vector ?? result.individuals?.find((item) => item.id === agent.id)?.volitive;
      if (wolf) after = wolf.position;
      else if (vector) after = { x: after.x + vector.x, y: after.y + vector.y };
      return { id: agent.id, before: { x: agent.x ?? 0, y: agent.y ?? 0 }, after, role: wolf?.role };
    });
    if (!positions.length) return empty;
    const all = positions.flatMap((point) => [point.before, point.after]);
    if (result.barycenter) all.push(result.barycenter);
    const minX = Math.min(...all.map((point) => point.x)), maxX = Math.max(...all.map((point) => point.x));
    const minY = Math.min(...all.map((point) => point.y)), maxY = Math.max(...all.map((point) => point.y));
    const project = (point: Vector) => ({ x: 55 + (point.x - minX) / (maxX - minX || 1) * 490, y: 230 - (point.y - minY) / (maxY - minY || 1) * 180 });
    const center = result.barycenter ? project(result.barycenter) : null;
    return <div className={styles.spatial}><svg viewBox="0 0 620 285" role="img" aria-label={t("Computed movement: hollow nodes are input positions, filled nodes are the computed step.", "Mouvement calculé : nœuds creux à l’entrée, nœuds pleins après le pas.")}>
      <defs><marker id={markerId} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="#7eb89f" /></marker></defs>
      <path d="M35 30v220h555" fill="none" stroke="#5b5963" />
      {positions.map((point) => { const a = project(point.before), b = project(point.after); return <g key={point.id}><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#7eb89f" strokeWidth="1.8" markerEnd={`url(#${markerId})`} /><circle cx={a.x} cy={a.y} r="6" fill="none" stroke="#9b95b0" /><circle cx={b.x} cy={b.y} r="4" fill={point.role === "alpha" ? "#dfb36b" : "#b5a9ef"} /><text x={b.x + 8} y={b.y - 9}>{point.id.slice(0, 14)}{point.role ? ` · ${point.role}` : ""}</text></g>; })}
      {center && <g><path d={`M${center.x - 7} ${center.y}h14M${center.x} ${center.y - 7}v14`} stroke="#dfb36b" strokeWidth="2" /><text x={center.x + 9} y={center.y + 17}>{t("Barycenter", "Barycentre")}</text></g>}
      <text x="35" y="276">x: {format(minX)} → {format(maxX)} · y: {format(minY)} → {format(maxY)}</text>
    </svg><p className={styles.legend}>{t("○ Input position · ● Computed position · → Movement vector", "○ Position d’entrée · ● Position calculée · → Vecteur de mouvement")}</p><div className={styles.tableWrap}><table><caption>{t("Exact coordinates", "Coordonnées exactes")}</caption><thead><tr><th>ID</th><th>{t("Before", "Avant")}</th><th>{t("After one step", "Après un pas")}</th><th>{t("Role / heading", "Rôle / cap")}</th></tr></thead><tbody>{positions.map((point) => <tr key={point.id}><td>{point.id}</td><td>{format(point.before.x)}, {format(point.before.y)}</td><td>{format(point.after.x)}, {format(point.after.y)}</td><td>{point.role ?? (result.agents ? format(result.agents.find((item) => item.id === point.id)?.heading ?? 0) : "—")}</td></tr>)}</tbody></table></div></div>;
  }
  if (result.organization === "brier_weighted_consensus") return <><div className={styles.metrics}><div><strong>{format(result.weightedSupport! * 100)}%</strong><span>{t("Weighted support", "Support pondéré")}</span></div><div><strong>{result.meanBrier === null ? "—" : format(result.meanBrier!)}</strong><span>Brier</span></div><div><strong>{result.resolvedCount}</strong><span>{t("Resolved reports", "Rapports résolus")}</span></div></div><div className={styles.bars}>{calibrationRows(input.state).map((row) => bar(row.id, row.weight, 1, row.resolved, row.resolved ? `Brier: ${format(row.brier!)} · p=${row.confidence} · o=${row.outcome}` : t("Unresolved: excluded", "Non résolu : exclu")))}</div></>;
  if (result.organization === "quorum_with_abstention") return <><div className={styles.metrics}><div><strong>{format(result.support! * 100)}%</strong><span>{t("Active support", "Support actif")}</span></div><div><strong>{result.reached ? t("Reached", "Atteint") : t("Held", "Retenu")}</strong><span>{t("Quorum", "Quorum")}: {format((input.options.quorumRatio ?? 0.5) * 100)}%</span></div><div><strong>{result.abstentions}</strong><span>{t("Abstentions", "Abstentions")}</span></div></div><div className={styles.votes}>{(input.state.votes ?? []).map((vote, index) => <div key={index} data-vote={vote.abstain ? "abstain" : vote.support ? "yes" : "no"}><b>{vote.id ?? index + 1}</b><span>{vote.abstain ? t("Abstain", "Abstention") : vote.support ? t("Support", "Pour") : t("Oppose", "Contre")}</span><small>{t("weight", "poids")} {vote.weight ?? 1}</small></div>)}</div></>;
  if (result.organization === "stigmergy") { const trails = input.state.trails ?? [], max = Math.max(1, ...trails.map((trail) => trail.intensity ?? 0)); return <><p className={styles.resultTitle}>{t("Dominant trail", "Trace dominante")} : <strong>{result.dominant ?? "∅"}</strong></p><div className={styles.bars}>{trails.map((trail, index) => bar(trail.path ?? trail.id ?? `T${index}`, trail.intensity ?? 0, max, (trail.path ?? trail.id) === result.dominant))}</div></>; }
  if (result.organization === "slime_mould_network") { const max = Math.max(1, ...(result.edges ?? []).map((edge) => edge.conductivity)); return <div className={styles.bars}>{(input.state.edges ?? []).map((edge) => { const updated = result.edges?.find((item) => item.id === edge.id); return bar(edge.id, updated?.conductivity ?? 0, max, Boolean(updated), `${t("Before", "Avant")}: ${edge.conductivity ?? 0.5} · ${updated ? t("Retained", "Conservée") : t("Pruned", "Élaguée")}`); })}</div>; }
  if (result.organization === "energy_huddle") { const allocated = (result.allocations ?? []).reduce((sum, group) => sum + group.budget, 0), budget = input.state.budget ?? (input.state.populations?.length ?? 0) * 1000; return <><div className={styles.metrics}><div><strong>{budget}</strong><span>{t("Available budget", "Budget disponible")}</span></div><div><strong>{allocated}</strong><span>{t("Allocated", "Alloué")}</span></div><div><strong>{budget - allocated}</strong><span>{t("Remainder", "Reste")}</span></div></div><div className={styles.bars}>{(result.allocations ?? []).map((item) => bar(item.id, item.budget, Math.max(1, budget), true))}</div></>; }
  if (result.roleGradient) return <div className={styles.rankList}>{result.roleGradient.length ? result.roleGradient.map((item) => <div key={item.id}><strong>{String(item.rank).padStart(2, "0")}</strong><span>{item.id}</span><b>fitness {input.state.agents?.find((agent) => agent.id === item.id)?.fitness ?? 0}</b></div>) : empty}</div>;
  if (result.facts) return <div className={styles.facts}>{result.facts.length ? result.facts.map((fact, index) => <article key={index}><b>{typeof fact === "string" ? `F${index + 1}` : fact.id ?? `F${index + 1}`}</b><p>{typeof fact === "string" ? fact : fact.text}</p><small>{typeof fact === "string" ? "—" : (fact.sourceRefs ?? []).join(" · ") || "—"}</small></article>) : empty}</div>;
  return <div className={styles.flow}>
    {result.spokes && <>{group(t("Hub", "Hub"), result.hub ? [result.hub] : [])}<span aria-hidden="true">→</span>{group(t("Specialists", "Spécialistes"), result.spokes)}</>}
    {result.pairs && result.pairs.map((pair, index) => <div key={index}>{group(`${t("Anonymous pair", "Paire anonyme")} ${index + 1}`, pair, "sealed")}</div>)}
    {result.red && <>{group("Red", result.red, "red")}<span aria-hidden="true">↔</span>{group("Blue", result.blue ?? [], "blue")}</>}
    {result.organization === "mycelial_routing" && <>{group(t("Need", "Besoin"), result.need ? [result.need] : [])}<span aria-hidden="true">→</span>{group(t("Matching member", "Membre compatible"), result.route ? [result.route] : [])}</>}
    {result.competitors && group(t("Isolated competitors", "Concurrents isolés"), result.competitors, "sealed")}
    {result.children && <>{group(t("Root", "Racine"), result.root ? [result.root] : [])}<span aria-hidden="true">→</span>{group(t("Children", "Enfants"), result.children)}</>}
    {result.isolated && <>{group(t("Isolated members", "Membres isolés"), result.isolated, "sealed")}<span aria-hidden="true">→</span>{group(t("Lost-role plan", "Plan de rôles perdus"), result.plan ?? [])}</>}
    {result.silent && <>{group(t("Silent members", "Membres silencieux"), (input.state.agents ?? []).map((agent) => agent.id), "sealed")}<div className={styles.silenceCount}><strong>{result.buffered}</strong><span>{t("members in buffering guidance", "membres dans la consigne de tampon")}</span></div></>}
  </div>;
}
