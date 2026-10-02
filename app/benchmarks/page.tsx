import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { BenchmarkExplorer } from "@/components/p3-explorers";

export const metadata: Metadata = {
  title: "Experiment registry",
  description: "Published GenOS results on LoCoMo, SWE-bench Lite, and local experiments, with question, protocol, scope, reproduction, and interpretation limits.",
  alternates: { canonical: "/en/benchmarks", languages: { en: "/en/benchmarks", fr: "/fr/benchmarks" } },
};

const repo = "https://github.com/PISSARAW/GenOS/blob/v3/";

type ExperimentRecord = {
  id: string;
  status: string;
  tone: string;
  title: string;
  intro: string;
  metrics: [string, string][];
  detail: string;
  source: string;
  href: string;
  question: string;
  environment: string;
  reproduction: string;
};

const evaluations: ExperimentRecord[] = [
  {
    id: "01",
    status: "REPORTED EVALUATION",
    tone: "reported",
    title: "LoCoMo · conversational memory",
    intro: "Evaluation of GenOS V3 and Qwen 2.5 Coder 7B on the LoCoMo corpus, with 1,986 questions across five categories.",
    metrics: [["18.39%", "Overall F1 · 1,986 questions"], ["23.68%", "F1 · factual questions (cats. 1–4)"], ["5.84%", "Overall exact match"]],
    detail: "By category: event 30.71%, factual 17.02%, causal 16.92%, temporal 13.23%, adversarial 0.09%. The adversarial score penalizes explicit refusals when the gold answer is “undefined”; the report proposes a separate abstention metric.",
    source: "Read the LoCoMo report",
    href: "docs/06-qualite-preuves/benchmarks/locomo.md",
    question: "Does GenOS memory improve long-conversation factual recall?",
    environment: "GenOS V3 · Qwen 2.5 Coder 7B · LoCoMo corpus (1,986 questions)",
    reproduction: "See the LoCoMo report for corpus version and harness commit.",
  },
  {
    id: "02",
    status: "PARTIAL DATASET EVALUATION",
    tone: "reported",
    title: "SWE-bench Lite · bug resolution",
    intro: "Run under WSL Ubuntu 24.04 with DeepSeek Coder V2. The report covers tasks ready in the environment, not the entire benchmark.",
    metrics: [["9 / 26", "Tasks resolved"], ["34.6%", "Of 26 ready tasks"], ["300", "Tasks in the full dataset"]],
    detail: "Fixes are validated with FAIL_TO_PASS and PASS_TO_PASS tests. The 26-task denominator limits the scope: this rate is not a result on all 300 SWE-bench Lite tasks.",
    source: "Read the SWE-bench Lite report",
    href: "docs/06-qualite-preuves/benchmarks/swe-bench-lite.md",
    question: "Can GenOS resolve real bug-fix tasks end to end?",
    environment: "WSL Ubuntu 24.04 · DeepSeek Coder V2 · 26 ready tasks of 300",
    reproduction: "FAIL_TO_PASS + PASS_TO_PASS validation per the linked report.",
  },
];

const experiments: ExperimentRecord[] = [
  {
    id: "03",
    status: "LOCAL EXPERIMENT · SYNTHETIC",
    tone: "local",
    title: "AGOW · diffusion and ablations",
    intro: "Local campaign with Qwen 2.5 Coder 7B: ablation, controlled mediation, and three paired replications on synthetic cases.",
    metrics: [["11 / 12", "Success · full diffusion"], ["0 / 12", "Success · diffusion removed"], ["8 / 8 × 3", "Replications · diffusion transmitted"]],
    detail: "Workspace ablation scores 11/12 versus 11/12 in this campaign. The same report also documents a Lipson-like run of a simulated trajectory (reward 7.7369) and MBH-RNN (100,000 iterations, ten simulated trials); neither is a replication or a measure of generalization.",
    source: "Read the campaign report and its limits",
    href: "docs/06-benchmarks/campagnes-agow-mbh-lipson.md",
    question: "Does AGOW diffusion change outcomes on synthetic cases?",
    environment: "Local campaign · Qwen 2.5 Coder 7B · synthetic cases + 3 paired replications",
    reproduction: "Campaign report documents seeds and ablation arms.",
  },
  {
    id: "04",
    status: "LOCAL SUITE · 12 TASKS",
    tone: "local",
    title: "Planning · policy comparison",
    intro: "A deterministic suite of 12 synthetic tasks compares GenOS with ReAct, Tree of Thoughts, and MCTS, with a budget of 240 expansions.",
    metrics: [["12 / 12", "GenOS · tasks passed"], ["11 / 12", "Tree of Thoughts"], ["24.8", "Average expansions · GenOS"]],
    detail: "In this run, ReAct passes 9/12 and MCTS 6/12 (175.9 average expansions). This is a small local synthetic suite, not an independent standard benchmark; a scenario correction was also recorded with the result.",
    source: "View the raw result from September 30",
    href: "benchmarks/planning-gap/results/2026-09-30-a-star-240.json",
    question: "Does the GenOS planning policy beat ReAct, ToT, and MCTS at equal budget?",
    environment: "Deterministic harness · 12 synthetic tasks · 240-expansion budget",
    reproduction: "benchmarks/planning-gap/results/2026-09-30-a-star-240.json",
  },
  {
    id: "05",
    status: "DETERMINISTIC ABLATION · 4 SCENARIOS",
    tone: "local",
    title: "Self-model ablation",
    intro: "The harness compares eight arms on the same scenarios to check whether removing layers changes the reference decision chain.",
    metrics: [["6 / 7", "Layers with an observed effect"], ["4", "Deterministic scenarios"], ["0", "Decisions changed · memory here"]],
    detail: "The result depends on a decision harness without an LLM. Effects from some layers remain to be confirmed in runtime missions; the report explicitly distinguishes behavioral change from a status that is merely displayed.",
    source: "Read the protocol and detailed verdict",
    href: "benchmarks/cognitive-key-ablation/README.md",
    question: "Which self-model layers affect the reference decision chain?",
    environment: "Decision harness without LLM · 4 deterministic scenarios · 8 arms",
    reproduction: "benchmarks/cognitive-key-ablation/README.md",
  },
  {
    id: "06",
    status: "SIMULATION · EXPLICIT ASSUMPTIONS",
    tone: "exploratory",
    title: "Evolution of self mechanisms",
    intro: "Four simulated environments, three seeds, and 40 generations study which layers survive under hypothetical metabolic costs.",
    metrics: [["4", "Simulated environments"], ["3", "Seeds per environment"], ["40", "Generations"]],
    detail: "Benefit profiles are defined in the model: the experiment informs selection under these assumptions, not an empirical discovery about the mechanisms. The report also flags an uninterpretable contrast in the predictable environment.",
    source: "Read the P3 research and its limits",
    href: "docs/06-benchmarks/recherche-evolutionnaire-soi.md",
    question: "Which layers survive selection under hypothetical metabolic costs?",
    environment: "Simulation · 4 environments × 3 seeds × 40 generations",
    reproduction: "Model assumptions and benefit profiles in the linked research doc.",
  },
  {
    id: "07",
    status: "STRUCTURAL MEASURE · NO LLM",
    tone: "exploratory",
    title: "Cognitive Key · recipe diversity",
    intro: "Ablation on three problems: the harness compares the structural diversity of cognitive recipes composed at dispatch.",
    metrics: [["3", "Recipes · diversity arm E"], ["0.51", "Pairwise distance · E"], ["1.0", "Requirement coverage · E"]],
    detail: "Arm D (relevance only) produces one repeated recipe and a distance of 0; E produces three recipes with 1.0 coverage. This result concerns structure, not agent response quality: runtime missions remain to be measured.",
    source: "Read the protocol, measures, and remaining tasks",
    href: "benchmarks/cognitive-key-ablation/README.md",
    question: "Does diversity-arm composition produce structurally varied recipes?",
    environment: "Ablation harness · 3 problems · no LLM in the loop",
    reproduction: "benchmarks/cognitive-key-ablation/README.md",
  },
];

const planned = [
  ["A-Team", "Paired protocol defined; a campaign connected to real workers has not run yet.", "docs/06-benchmarks/benchmark-ateam.md"],
  ["Longitudinal Holobiont", "Twelve-arm protocol; no real campaign has run.", "docs/06-benchmarks/benchmark-longitudinal-holobionte.md"],
  ["Syncytium", "Aggregator and metrics are described; campaign counters remain to be collected.", "docs/06-benchmarks/benchmark-syncytium.md"],
  ["EAB · epistemic abstention", "The runner awaits the local LoCoMo corpus and complete predictions; no complete EAB report is provided here.", "benchmarks/eab/README.md"],
  ["SWE-bench Lite · extension", "The reported result covers 26 ready tasks, not the full set of 300.", "docs/06-qualite-preuves/benchmarks/swe-bench-lite.md"],
];

function EvaluationCard({ item }: { item: ExperimentRecord }) {
  return (
    <article className="benchmark-card experiment-record">
      <div className="benchmark-card-head"><span>{item.id} / {item.status}</span><i className={`benchmark-dot benchmark-dot-${item.tone}`} /></div>
      <h3>{item.title}</h3><p className="benchmark-intro">{item.intro}</p>
      <div className="benchmark-metrics">{item.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      <dl>
        <dt>QUESTION</dt><dd>{item.question}</dd>
        <dt>ENVIRONMENT</dt><dd>{item.environment}</dd>
        <dt>LIMITS</dt><dd>{item.detail}</dd>
        <dt>REPRODUCTION</dt><dd><code>{item.reproduction}</code></dd>
      </dl>
      <a className="text-link" href={`${repo}${item.href}`} target="_blank" rel="noreferrer">{item.source}<span>↗</span></a>
    </article>
  );
}

export default function BenchmarksPage() {
  return (
    <div className="page-shell" lang="en">
      <section className="page-hero section-wrap benchmark-hero">
        <Eyebrow>EXPERIMENT REGISTRY · RESULTS AND PROTOCOLS</Eyebrow>
        <h1>Scores with<br /><em>their context.</em></h1>
        <p>Every entry states its question, environment, limits, and reproduction path. A benchmark specification without an execution is not a score; scores across different tasks, versions, and models are not comparable.</p>
        <div className="benchmark-summary"><div><strong>2</strong><span>published evaluation reports</span></div><div><strong>5</strong><span>local experiments summarized</span></div><div><strong>3</strong><span>topology protocols pending</span></div></div>
      </section>

      <section className="section-wrap benchmark-section">
        <div className="benchmark-section-heading"><Eyebrow>RESULTS AND EXPERIMENTS</Eyebrow><h2>What the runs<br /><em>measured.</em></h2><p>The figures below come from reports and artifacts in the source repository. Task contexts and datasets differ; do not compare scores across them.</p></div>
        <div className="benchmark-grid">{evaluations.map((item) => <EvaluationCard item={item} key={item.id} />)}</div>
        <div className="benchmark-subhead"><span>LOCAL EXPERIMENTS AND SIMULATIONS</span><i /></div>
        <div className="benchmark-grid">{experiments.map((item) => <EvaluationCard item={item} key={item.id} />)}</div>
      </section>

      <BenchmarkExplorer />

      <section className="section-wrap p3-cross-links"><a href="/runs"><span>RECORDED GENOS CAMPAIGN</span><strong>Inspect real run traces, including failed missions →</strong></a><a href="/sandbox"><span>LIVE RUNTIME</span><strong>Connect a scoped GenOS endpoint and run a mission →</strong></a></section>

      <section className="benchmark-planned">
        <div className="section-wrap benchmark-planned-inner">
          <div className="benchmark-section-heading"><Eyebrow>PROTOCOLS WITHOUT CAMPAIGN RESULTS</Eyebrow><h2>Ready to measure,<br /><em>not yet run.</em></h2><p>These documents define metrics or experimental plans. They do not provide real comparison results.</p></div>
          <div className="planned-list">{planned.map(([name, detail, href]) => <article key={name}><span className="planned-mark">—</span><div><h3>{name}</h3><p>{detail}</p></div><a href={`${repo}${href}`} target="_blank" rel="noreferrer" aria-label={`Read the ${name} protocol`}>↗</a></article>)}</div>
        </div>
      </section>

      <section className="section-wrap benchmark-method-note"><span>READ BEFORE INTERPRETING</span><p>These evaluations reflect the documentation reviewed on October 2, 2026. Each result applies only to the tasks, versions, models, and conditions stated in its source. The repository notes that a test result alone does not prove business correctness or generalization.</p><a href={`${repo}docs/01-concepts/epistemologie-et-evidence.md`} target="_blank" rel="noreferrer">GenOS evidence principles ↗</a><a href="/research">Explore research areas →</a></section>
      <section className="section-wrap benchmark-catalog-links"><span>FULL CATALOGS</span><a href={`${repo}docs/06-benchmarks/README.md`} target="_blank" rel="noreferrer">Documented protocols and reports ↗</a><a href={`${repo}docs/06-qualite-preuves/benchmarks/README.md`} target="_blank" rel="noreferrer">LoCoMo and SWE-bench evaluations ↗</a><a href="https://github.com/PISSARAW/GenOS/tree/v3/benchmarks" target="_blank" rel="noreferrer">Benchmark harnesses, suites, and artifacts ↗</a></section>
    </div>
  );
}
