"use client";

import { useState, type CSSProperties } from "react";

type Worker = {
  id: string;
  title: string;
  description: string;
  artifact: string;
  detail: string;
};

type Family = {
  id: string;
  number: string;
  title: string;
  name: string;
  intro: string;
  tone: string;
  workers: Worker[];
};

const demonstrations: Record<string, { input: string; steps: [string, string, string]; result: string }> = {
  scout_cell: { input: "Supplied text + literal term", steps: ["Validate the bounded corpus", "Find the exact term offset", "Return a sourced observation"], result: "scout_observation · exact offset" },
  resident_daemon: { input: "Timestamped sample window", steps: ["Validate samples and sources", "Compare values with a threshold", "Report bounded anomalies"], result: "dossier · finite window" },
  bounded_worker: { input: "Focused mission", steps: ["Use assigned tools", "Work within fixed scope", "Return a bounded result"], result: "dossier" },
  adaptive_worker: { input: "Mission + constraints", steps: ["Choose an allowed strategy", "Probe and inspect evidence", "Adjust within the change cap"], result: "dossier · strategy trace" },
  specialist: { input: "Declared skill niche", steps: ["Load niche context", "Apply focused analysis", "Report with sources"], result: "dossier · niche analysis" },
  procedural_executor: { input: "LPT or subset-sum problem", steps: ["Validate structured parameters", "Run the bounded algorithm", "Return a computed receipt"], result: "dossier · procedure receipt" },
  symbiotic_worker: { input: "Host capability", steps: ["Receive a declared procedure", "Intersect with host authority", "Return an authorized result"], result: "dossier · capability result" },
  verifier_worker: { input: "Claim to check", steps: ["Inspect independently", "Run a safe test", "Issue a three-way verdict"], result: "verification_report" },
  red_worker: { input: "Proposal under review", steps: ["Assume the claim may fail", "Search for a counterexample", "Report reproducible evidence"], result: "verification_report · challenge" },
  experimental_worker: { input: "Testable hypothesis", steps: ["Define a protocol", "Record measurements", "Compare with prediction"], result: "experiment_record" },
  formal_worker: { input: "Closed arithmetic claim", steps: ["Bind the exact Lean version", "Run Lean on the generated theorem", "Return a certificate only on proof"], result: "formal_certificate · Lean receipt" },
  synthesis_worker: { input: "Several source records", steps: ["Keep source provenance", "Compare claims and conflicts", "Compose a sourced synthesis"], result: "synthesis_dossier" },
  creative_worker: { input: "Open-ended question", steps: ["Explore possible directions", "Draft a candidate", "Pair it with a falsifying test"], result: "creative_candidate · unpromoted" },
  medical_worker: { input: "Synthetic case", steps: ["Review supplied context", "State uncertainty", "Write an educational report"], result: "clinical_report" },
  recovery_worker: { input: "Saved checkpoint", steps: ["Restore known state", "Narrow the mission", "Resume with a short limit"], result: "dossier · recovery trace" },
  forensic_worker: { input: "Referenced incident events", steps: ["Check timestamps and declared links", "Retain causation references", "Mark causal truth unverified"], result: "causal_dossier · declared links" },
  liaison_worker: { input: "Separate participants", steps: ["Receive mission-relevant notes", "Compress shared context", "Bridge the two groups"], result: "dossier · message bridge" },
  teaching_worker: { input: "Subset-sum example + learner indices", steps: ["Execute the procedure", "Provide prerequisites and steps", "Check the learner witness"], result: "training_packet · transfer verdict" },
  sub_orchestrator: { input: "Assigned subgraph", steps: ["Break down local work", "Dispatch bounded child tasks", "Reconcile child outcomes"], result: "dossier · bounded subgraph" },
};

export function WorkersExplorer({ families }: { families: Family[] }) {
  const allWorkers = families.flatMap((family) => family.workers.map((worker) => ({ ...worker, family })));
  const [selectedId, setSelectedId] = useState(allWorkers[0]?.id ?? "");
  const selected = allWorkers.find((worker) => worker.id === selectedId) ?? allWorkers[0];

  if (!selected) return null;

  const demo = demonstrations[selected.id];

  return (
    <>
      <section className={`worker-demo worker-family-${selected.family.tone}`} aria-labelledby="worker-demo-title" aria-live="polite">
        <div className="worker-demo-copy">
          <div className="worker-demo-kicker"><span className="worker-demo-live-dot" /> INTERACTIVE WALKTHROUGH <span>ILLUSTRATIVE · NOT A LIVE RUN</span></div>
          <h2 id="worker-demo-title">{selected.title}<br /><em>in motion.</em></h2>
          <p>{selected.description}</p>
          <div className="worker-demo-contract"><span>INPUT</span><b>{demo.input}</b><span>EXPECTED ARTIFACT</span><code>{demo.result}</code></div>
        </div>

        <div className={`worker-demo-track worker-demo-track-${selected.id}`} key={selected.id} role="img" aria-label={`${selected.title} illustrative flow: ${demo.steps.join(", then ")}`}>
          <div className="worker-demo-track-head"><span>MISSION FLOW</span><code>{selected.id}</code></div>
          <div className="worker-demo-lane">
            <span className="worker-demo-wire" />
            <span className="worker-demo-packet" aria-hidden="true">◆</span>
            {demo.steps.map((step, index) => (
              <div className="worker-demo-step" style={{ "--step-index": index } as CSSProperties} key={step}>
                <span className="worker-demo-step-node"><b>0{index + 1}</b></span>
                <span className="worker-demo-step-label">{step}</span>
              </div>
            ))}
          </div>
          <div className="worker-demo-output"><span>RESULT</span><i aria-hidden="true">→</i><code>{demo.result}</code><span className="worker-demo-check" aria-hidden="true">✓</span></div>
          <p className="worker-demo-footnote">Canonical limits bound execution, and each successful result needs a typed artifact with provenance. Missing executors or invalid, unsourced artifacts block success.</p>
        </div>
      </section>

      {families.map((family) => (
        <section className={`worker-family worker-family-${family.tone}`} id={family.id} key={family.id} aria-labelledby={`${family.id}-title`}>
          <header className="worker-family-heading">
            <span className="worker-family-number">{family.number}</span>
            <div><span>{family.name}</span><h2 id={`${family.id}-title`}>{family.title}</h2></div>
            <p>{family.intro}</p>
            <span className="worker-family-count">{String(family.workers.length).padStart(2, "0")} TYPES</span>
          </header>
          <div className="worker-card-grid">
            {family.workers.map((worker) => (
              <button
                className={`worker-card${selected.id === worker.id ? " worker-card-selected" : ""}`}
                type="button"
                key={worker.id}
                aria-pressed={selected.id === worker.id}
                aria-label={`Show animated walkthrough for ${worker.title}`}
                onClick={() => setSelectedId(worker.id)}
              >
                <span className="worker-card-meta"><span>{worker.id}</span><span className="worker-card-mark" aria-hidden="true">↗</span></span>
                <span className="worker-card-title">{worker.title}</span>
                <span className="worker-card-description">{worker.description}</span>
                <span className="worker-card-foot"><span>EXPECTED ARTIFACT</span><code>{worker.artifact}</code><small>{worker.detail}</small></span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
