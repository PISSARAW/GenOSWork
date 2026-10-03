import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { DaemonExplorer } from "@/components/daemon-explorer";
import "./daemons.css";
import "./daemon-explorer.css";

export const metadata: Metadata = {
  title: "Resident daemons",
  description: "The GenOS resident daemon, its organelles and phenotypes, and related components that should not be confused with it.",
  alternates: { canonical: "/en/daemons" },
};

const organelles = [
  ["Mapping", "Builds a view of the territory and its relationships."],
  ["Interoception", "Tracks activity, health, and pressure signals."],
  ["Natural search", "Explores clues and knowledge relevant to the territory."],
  ["Findings", "Produces bounded findings with scope and limitations."],
  ["Verification", "Checks freshness, scope, and observed evidence."],
  ["Stigmergy", "Leaves markers to guide future attention."],
  ["Handoff", "Sends a contextualized brief to the orchestrator."],
  ["Reconciliation", "Finds stale states and resources that need cleanup."],
];

const phenotypes = [
  ["security", "Security signals and threat signatures."],
  ["contract", "Drift between producers and consumers."],
  ["dependency", "Dependency changes and compatibility."],
  ["documentation", "Gaps between code, tests, and documentation."],
  ["historian", "Repeated failures, regressions, and historical context."],
  ["chaperone", "New structures and signs of incomplete integration."],
  ["metabolic", "Resource pressure and operational anomalies."],
  ["cross_repo", "Shared contract drift across territories."],
  ["repair", "Repair opportunities to pass on for controlled handling."],
  ["deep_research", "Knowledge gaps and stale information."],
];

const neighbors = [
  { name: "ScoutCells", kind: "Bounded auxiliary", description: "Read-only scouting cells with limited duration and budget. They are not resident daemons." },
  { name: "SentinelDaemonKeeper", kind: "Control plane supervisor", description: "Observes process availability. It does not produce domain findings or decide on its own to restart a process." },
  { name: "WorkspaceGitDaemon", kind: "Legacy compatibility", description: "An older model kept for compatibility. Its autofix is deprecated; repairs go through an episode, a worker, and checks." },
];

export default function DaemonsPage() {
  return (
    <div className="page-shell daemon-page" lang="en">
      <section className="page-hero section-wrap daemon-hero">
        <Eyebrow>RUNTIME · RESIDENT OBSERVATION</Eyebrow>
        <h1>A daemon to<br /><em>know its territory.</em></h1>
        <p>In GenOS, a resident daemon observes a project territory across missions. It maintains traceable knowledge and sends useful signals to the orchestrator.</p>
        <div className="daemon-status"><i /> IMPLEMENTED ARCHETYPE · EXPERIMENTAL MATURITY</div>
      </section>

      <section className="section-wrap daemon-principle" aria-label="Responsibility principle">
        <div><span>DAEMON</span><strong>Observes and learns</strong></div><b aria-hidden="true">→</b>
        <div><span>ORCHESTRATOR</span><strong>Chooses the mission</strong></div><b aria-hidden="true">→</b>
        <div><span>WORKER</span><strong>Acts under control</strong></div>
      </section>

      <DaemonExplorer locale="en" />

      <section className="section-wrap daemon-section">
        <div className="daemon-section-heading"><Eyebrow>01 · THE ARCHETYPE</Eyebrow><h2>One resident,<br /><em>one territory.</em></h2></div>
        <div className="daemon-archetype-copy">
          <p><code>ResidentDaemon</code> is the only GenOS resident-daemon archetype. It follows an identified territory—such as a repository at a specific Git HEAD—so its findings remain attached to their context.</p>
          <p>Residency grants no additional authority: the daemon observes and reports. A finding is neither sufficient evidence nor an instruction to act; the orchestrator chooses what happens next, and a worker can intervene with the required checks.</p>
          <div className="daemon-guardrails"><span>FILE WRITES · PROHIBITED</span><span>GIT PUSH · PROHIBITED</span><span>MERGE · PROHIBITED</span></div>
        </div>
      </section>

      <section className="daemon-organelles-band">
        <div className="section-wrap daemon-list-section">
          <div className="daemon-section-heading"><Eyebrow light>02 · INTERNAL ORGANS</Eyebrow><h2>Eight organelles,<br /><em>one logical process.</em></h2><p>These are functions of ResidentDaemon, not eight separately launched agents or processes.</p></div>
          <div className="daemon-organelles">
            {organelles.map(([name, description], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{name}</h3><p>{description}</p></div><b aria-hidden="true">↗</b></article>)}
          </div>
        </div>
      </section>

      <section className="section-wrap daemon-section daemon-phenotype-section">
        <div className="daemon-section-heading"><Eyebrow>03 · ECOLOGICAL SPECIALIZATIONS</Eyebrow><h2>Ten phenotypes<br /><em>shape attention.</em></h2><p>Phenotypes activate in response to measured pressures in the territory. They shape attention, memory, and briefs without changing the daemon's identity.</p></div>
        <div className="daemon-phenotypes">
          {phenotypes.map(([name, description]) => <article key={name}><code>{name}</code><p>{description}</p></article>)}
          <div className="daemon-phenotype-note"><strong>Adaptive activation</strong><span>Current thresholds are heuristics. The benefits and costs of each family remain to be measured separately.</span></div>
        </div>
      </section>

      <section className="section-wrap daemon-neighbors-section">
        <div className="daemon-section-heading"><Eyebrow>04 · RELATED COMPONENTS</Eyebrow><h2>Components<br /><em>near the daemon.</em></h2><p>They are part of the ecosystem but do not add more resident archetypes.</p></div>
        <div className="daemon-neighbors">
          {neighbors.map((item) => <article key={item.name}><span>{item.kind}</span><h3>{item.name}</h3><p>{item.description}</p></article>)}
        </div>
      </section>

      <section className="daemon-scope-wrap">
        <div className="section-wrap daemon-scope">
          <Eyebrow light>SCOPE AND LIMITS</Eyebrow>
          <h2>An experimental observation system.</h2>
          <p>The runtime, territories, findings, handoffs, reconciliation, and evaluation are implemented. Overall maturity remains <strong>EXPERIMENTAL</strong>: available live results are too limited to establish a general benefit. Knowledge can also become stale when the territory's HEAD changes.</p>
          <p>The resident host polls the indexed durable event cursor every 500 ms. On restart it returns to BOOTSTRAPPING while retaining health, revision count, and the last event cursor. Production events are reported as emitted only after the cheap update and journal write both succeed.</p>
          <a href="https://github.com/PISSARAW/GenOS/blob/6133af69933c86f39f0396f801f2ce2b3385826b/docs/03-reference/types-de-daemons.md" target="_blank" rel="noreferrer">Read the daemon reference catalog <span>↗</span></a>
        </div>
      </section>
    </div>
  );
}
