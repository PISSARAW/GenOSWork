"use client";

import { useEffect, useState } from "react";
import type { TeachingFlow } from "@/components/concept-learning-data";

type Locale = "en" | "fr";

const labels = {
  en: { heading: "Explore the mechanism", sub: "A qualitative teaching model of this concept. It does not run GenOS or validate its implementation.", play: "Play", pause: "Pause", previous: "Previous", next: "Next", step: "Step", assumption: "Assumptions satisfied", active: "Current transition", note: "Change the assumption and move through the stages to inspect the decision path.", holds: "The modeled transition may proceed.", fails: "The modeled transition stops for review; no outcome is inferred.", reduced: "Automatic animation is disabled by your reduced-motion setting; use the arrows." },
  fr: { heading: "Explorer le mécanisme", sub: "Un modèle pédagogique qualitatif de ce concept. Il n'exécute pas GenOS et ne valide pas son implémentation.", play: "Lancer", pause: "Pause", previous: "Précédent", next: "Suivant", step: "Étape", assumption: "Hypothèses satisfaites", active: "Transition en cours", note: "Modifiez l'hypothèse et parcourez les étapes pour examiner la décision.", holds: "La transition modélisée peut avancer.", fails: "L'enchaînement modélisé s'arrête pour examen ; aucun résultat n'est déduit.", reduced: "L'animation automatique est désactivée par votre réglage de mouvement réduit ; utilisez les flèches." },
} as const;

const layoutByFamily: Record<string, string> = {
  "identity-development": "lineage", "cognition-control": "feedback", "knowledge-evidence": "gate", "memory-learning": "feedback",
  "collective-intelligence": "network", orchestration: "network", "evolution-ecology": "lineage", "physiology-perception": "feedback",
  "immunity-medicine": "gate", "formal-verification": "gate", "runtime-infrastructure": "pipeline",
};

export function ConceptMechanism({ slug, title, familyId, flow, locale = "en" }: { slug: string; title: string; familyId: string; flow: TeachingFlow; locale?: Locale }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [assumptionHolds, setAssumptionHolds] = useState(true);
  const t = labels[locale];
  const stages = flow[locale];
  const layout = layoutByFamily[familyId] ?? "pipeline";

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReducedMotion(preference.matches); if (preference.matches) setPlaying(false); };
    update();
    setReady(true);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStep((current) => assumptionHolds ? (current + 1) % 3 : Math.min(current + 1, 1)), 2400);
    return () => window.clearInterval(timer);
  }, [playing, assumptionHolds]);

  return (
    <section className="concept-mechanism" id="interactive-model" aria-labelledby={`${slug}-mechanism-title`} aria-busy={!ready}>
      <div className="concept-mechanism-head">
        <div><span className="atlas-kicker">{locale === "fr" ? "SCHÉMA ANIMÉ · MODÈLE INTERACTIF" : "ANIMATED DIAGRAM · INTERACTIVE MODEL"}</span><h2 id={`${slug}-mechanism-title`}>{t.heading}: {title}</h2><p>{t.sub}</p></div>
        <span className="concept-mechanism-index">{String(step + 1).padStart(2, "0")} / 03</span>
      </div>
      <div className={`concept-mechanism-diagram concept-mechanism-${layout}`} role="img" aria-label={`${title}: ${stages.join(" → ")}`}>
        {stages.map((stage, index) => (
          <div className={`concept-mechanism-node ${step === index ? "is-active" : ""} ${step > index ? "is-complete" : ""} ${!assumptionHolds && index === 2 ? "is-blocked" : ""}`} key={`${slug}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong>
            <small>{index === 0 ? locale === "fr" ? "ENTRÉE" : "INPUT" : index === 1 ? locale === "fr" ? "MÉCANISME" : "MECHANISM" : locale === "fr" ? "ISSUE SOUS CONDITIONS" : "CONDITIONAL OUTCOME"}</small>
          </div>
        ))}
        <div className="concept-mechanism-connector concept-mechanism-connector-one" aria-hidden="true"><i /></div>
        <div className="concept-mechanism-connector concept-mechanism-connector-two" aria-hidden="true"><i /></div>
        {layout === "feedback" && <div className="concept-mechanism-return" aria-hidden="true">↶</div>}
      </div>
      <div className="concept-mechanism-controls">
        <button type="button" onClick={() => setPlaying((current) => !current)} aria-pressed={playing} disabled={!ready || reducedMotion} title={reducedMotion ? t.reduced : undefined}>{playing ? "Ⅱ " + t.pause : "▶ " + t.play}</button>
        <button type="button" disabled={!ready} onClick={() => { setPlaying(false); setStep((current) => assumptionHolds ? (current + 2) % 3 : Math.max(current - 1, 0)); }} aria-label={t.previous} title={t.previous}>←</button>
        <button type="button" disabled={!ready} onClick={() => { setPlaying(false); setStep((current) => assumptionHolds ? (current + 1) % 3 : Math.min(current + 1, 1)); }} aria-label={t.next} title={t.next}>→</button>
        <label><input type="checkbox" disabled={!ready} checked={assumptionHolds} onChange={(event) => { setAssumptionHolds(event.target.checked); if (!event.target.checked) setStep((current) => Math.min(current, 1)); }} /> {t.assumption}</label>
      </div>
      <div className="concept-mechanism-readout" role="status"><span>{t.active} · {t.step} {step + 1}</span><strong>{stages[step]}</strong><p>{assumptionHolds ? t.holds : t.fails} {t.note}</p></div>
    </section>
  );
}
