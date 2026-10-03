export type SupervisionPageData = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
  status: string;
  steps: { label: string; title: string; body: string }[];
  signals: { label: string; value: string; note: string }[];
  principle: string;
};

export const supervisionPages: SupervisionPageData[] = [
  {
    slug: "agents",
    number: "01",
    eyebrow: "SUPERVISED PROCESSES",
    title: "Launch work with",
    emphasis: "clear limits.",
    description: "A run groups a mission, its worker processes, coordination policy and execution receipts. The supervisor keeps each process attached to the workspace and budget that authorized it.",
    status: "PROCESS LIFECYCLE",
    steps: [
      { label: "01 · ADMIT", title: "Validate the run", body: "Resolve the mission, worker configuration, permissions and available budget before execution." },
      { label: "02 · START", title: "Launch workers", body: "Start configured processes and preserve their identities, roles and parent run." },
      { label: "03 · OBSERVE", title: "Collect outcomes", body: "Track state changes, handoffs, failures and completion through runtime events." },
      { label: "04 · CLOSE", title: "Keep the execution trace", body: "Attach outputs and execution receipts as traces; link separate evidence only when it is available for review." },
    ],
    signals: [{ label: "Process states", value: "queued · running · stopped", note: "Lifecycle is visible per worker" }, { label: "Run boundary", value: "workspace + policy", note: "Workers inherit explicit scope" }, { label: "On completion", value: "receipt ≠ evidence", note: "Execution traces and proof stay separate" }],
    principle: "A process exit records execution status; a mission outcome needs separate evaluation, and a receipt alone is not evidence.",
  },
  {
    slug: "workspaces",
    number: "02",
    eyebrow: "ISOLATED WORKSPACES",
    title: "Give each path",
    emphasis: "its own space.",
    description: "Workspaces bound what an agent can inspect and change. Snapshots and isolated branches let candidate work proceed without silently overwriting the state that another path is using.",
    status: "ISOLATION MODEL",
    steps: [
      { label: "01 · SCOPE", title: "Set the boundary", body: "Associate the run with a named workspace and the paths its workers are allowed to use." },
      { label: "02 · SNAPSHOT", title: "Record a starting point", body: "Capture the workspace state before a run or candidate branch changes it." },
      { label: "03 · ISOLATE", title: "Work on a branch", body: "Keep alternative trajectories separate and retain their relationship to the source state." },
      { label: "04 · REVIEW", title: "Compare before promotion", body: "Inspect changes and evidence before a candidate is restored or promoted." },
    ],
    signals: [{ label: "Scope", value: "mission-bound", note: "Paths and permissions travel with the run" }, { label: "Recovery", value: "snapshot → restore", note: "Known states remain addressable" }, { label: "Alternatives", value: "isolated branches", note: "Compare candidates without collisions" }],
    principle: "Isolation makes a path inspectable and recoverable; it does not grant broader filesystem access.",
  },
  {
    slug: "budgets",
    number: "03",
    eyebrow: "BOUNDED EXECUTION",
    title: "Make resource limits",
    emphasis: "part of the plan.",
    description: "Budgets define how much time, work or model usage a run may consume. The supervisor can surface spend against its declared ceiling and make exhaustion an explicit execution outcome.",
    status: "BUDGET SIGNALS",
    steps: [
      { label: "01 · DECLARE", title: "Set a ceiling", body: "Attach time, step, token or other configured limits to the mission and its workers." },
      { label: "02 · ALLOCATE", title: "Reserve for work", body: "Assign bounded shares to workers or branches so parallel execution has a known envelope." },
      { label: "03 · MEASURE", title: "Track consumption", body: "Keep observed use beside the requested ceiling and retain budget events in the run history." },
      { label: "04 · ENFORCE", title: "Stop or continue by policy", body: "When a limit is reached, record the outcome and require an allowed continuation decision." },
    ],
    signals: [{ label: "Time", value: "elapsed / limit", note: "Run-level duration" }, { label: "Work", value: "steps / allowance", note: "Progress has an explicit ceiling" }, { label: "Tokens", value: "used / allocated", note: "Usage is attributed to execution" }],
    principle: "A budget is an upper bound, not a promise that the configured work will finish within it.",
  },
  {
    slug: "events",
    number: "04",
    eyebrow: "OBSERVABLE EVENTS",
    title: "Follow the run",
    emphasis: "as it changes.",
    description: "A process view is useful only when it explains how the run reached its current state. Events make admission, handoffs, budget decisions and worker outcomes reviewable in order.",
    status: "EVENT STREAM",
    steps: [
      { label: "09:41:02 · RUN", title: "Mission admitted", body: "A run is associated with its policy, workspace and declared execution envelope." },
      { label: "09:41:05 · WORKER", title: "Research worker started", body: "A configured worker begins inside the run boundary." },
      { label: "09:42:18 · BUDGET", title: "Allocation updated", body: "The supervisor records a budget decision with its affected worker." },
      { label: "09:44:31 · HANDOFF", title: "Evidence review requested", body: "A result moves to a review step with its source outputs attached." },
    ],
    signals: [{ label: "Ordering", value: "timestamped", note: "Sequence explains transitions" }, { label: "Attribution", value: "run + worker", note: "Events retain their source" }, { label: "Review", value: "filterable history", note: "Investigate a path after it ends" }],
    principle: "The event record describes observed runtime activity. A Eureka event requires an accepted regulation transition; normal process shutdown alone does not qualify.",
  },
  {
    slug: "memory",
    number: "05",
    eyebrow: "SCOPED MEMORY",
    title: "Carry context",
    emphasis: "with provenance.",
    description: "Runtime memory can inform a mission with prior observations and decisions. Scope, source and retrieval context matter: an item should remain traceable to where it came from and why it was returned.",
    status: "MEMORY PATH",
    steps: [
      { label: "01 · SCOPE", title: "Choose the memory boundary", body: "Resolve the project, tenant, workspace or session context allowed to contribute." },
      { label: "02 · RETRIEVE", title: "Find relevant records", body: "Return candidate memories together with source and retrieval metadata." },
      { label: "03 · USE", title: "Pass context to the run", body: "Make retrieved context available to the authorized worker without losing its origin." },
      { label: "04 · RECORD", title: "Preserve new observations", body: "Store observations with attribution; only evaluated and verified outcomes can inform successful learning." },
    ],
    signals: [{ label: "Scope", value: "project / session", note: "Retrieval follows configured boundaries" }, { label: "Provenance", value: "source + timestamp", note: "Context can be traced" }, { label: "Control", value: "read / write policy", note: "Memory access follows permissions" }],
    principle: "Retrieved context is a candidate input, not verified ground truth.",
  },
  {
    slug: "evidence",
    number: "06",
    eyebrow: "REPORTS AND EVIDENCE",
    title: "Make every claim",
    emphasis: "traceable.",
    description: "Evidence reports connect a run's claims to the artifacts, checks and provenance behind them. Reviewers can see what passed, what remains partial and which gaps still block promotion.",
    status: "REPORT CONTENTS",
    steps: [
      { label: "01 · CLAIM", title: "State what the run asserts", body: "Make the result reviewable as a claim with an explicit scope." },
      { label: "02 · ATTACH", title: "Link source artifacts", body: "Keep outputs, execution receipts, events and workspace changes traceable; receipts do not become evidence by themselves." },
      { label: "03 · CHECK", title: "Record verification", body: "Show which checks ran, their outcomes and any limitations in coverage." },
      { label: "04 · DECIDE", title: "Apply the promotion gate", body: "Keep a decision tied to the evidence available at review time." },
    ],
    signals: [{ label: "Claim", value: "scoped and versioned", note: "The report says what is being asserted" }, { label: "Sources", value: "artifacts + receipts", note: "Evidence links to its origin" }, { label: "Decision", value: "promote · hold · reject", note: "Gate outcome is recorded" }],
    principle: "An evidence report makes a decision auditable; process completion and execution receipts do not replace domain-specific validation.",
  },
];

export function getSupervisionPage(slug: string) {
  return supervisionPages.find((page) => page.slug === slug);
}
