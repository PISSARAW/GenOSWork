import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { BenchmarkExplorer } from "@/components/p3-explorers";
import { biocenosisSqliteCampaign } from "@/components/recorded-campaigns";
import { genosReviewedAt, genosSourceCommit } from "@/components/product-evidence";
import { evaluations, experiments, plannedProtocols, type ExperimentRecord } from "@/components/experiment-registry";

export const metadata: Metadata = {
  title: "Experiment registry",
  description: "Published GenOS results on LoCoMo, SWE-bench Lite, and local experiments, with question, protocol, scope, reproduction, and interpretation limits.",
  alternates: { canonical: "/en/benchmarks", languages: { en: "/en/benchmarks", fr: "/fr/benchmarks" } },
};

const repo = `https://github.com/PISSARAW/GenOS/blob/${genosSourceCommit}/`;

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

      <section className="section-wrap recorded-campaign-note"><Eyebrow>LIVE TOPOLOGY CAMPAIGN · OUTCOME EVIDENCE</Eyebrow><h2>Biocenosis ran.<br /><em>The missions remain unverified.</em></h2><p>{biocenosisSqliteCampaign.missionCount} complex missions used the full local backend and SQLite WAL. {biocenosisSqliteCampaign.cycleStates.blocked} cycles blocked and {biocenosisSqliteCampaign.cycleStates.completed} completed; {biocenosisSqliteCampaign.verifiedPromotions} outcomes received verified promotion. This is a functional qualification run, not a comparative benchmark. Its event persistence result does not imply mission success.</p><div className="p3-hero-links"><a href={biocenosisSqliteCampaign.reportUrl} target="_blank" rel="noreferrer">Read the report ↗</a><a href={biocenosisSqliteCampaign.rawArtifact} target="_blank" rel="noreferrer">Inspect raw results ↗</a></div></section>

      <BenchmarkExplorer />

      <section className="section-wrap p3-cross-links"><a href="/runs"><span>RECORDED GENOS CAMPAIGN</span><strong>Inspect real run traces, including failed missions →</strong></a><a href="/sandbox"><span>LIVE RUNTIME</span><strong>Connect a scoped GenOS endpoint and run a mission →</strong></a></section>

      <section className="benchmark-planned">
        <div className="section-wrap benchmark-planned-inner">
          <div className="benchmark-section-heading"><Eyebrow>PROTOCOLS WITHOUT CAMPAIGN RESULTS</Eyebrow><h2>Ready to measure,<br /><em>not yet run.</em></h2><p>These documents define metrics or experimental plans. They do not provide real comparison results.</p></div>
          <div className="planned-list">{plannedProtocols.map(([name, detail, href]) => <article key={name}><span className="planned-mark">—</span><div><h3>{name}</h3><p>{detail}</p></div><a href={`${repo}${href}`} target="_blank" rel="noreferrer" aria-label={`Read the ${name} protocol`}>↗</a></article>)}</div>
        </div>
      </section>

      <section className="section-wrap benchmark-method-note"><span>READ BEFORE INTERPRETING</span><p>These evaluations reflect the documentation reviewed on {genosReviewedAt} at GenOS {genosSourceCommit.slice(0, 7)}. Each result applies only to the tasks, versions, models, and conditions stated in its source. A test result alone does not prove business correctness or generalization.</p><a href={`${repo}docs/01-concepts/epistemologie-et-evidence.md`} target="_blank" rel="noreferrer">GenOS evidence principles ↗</a><a href="/research">Explore research areas →</a></section>
      <section className="section-wrap benchmark-catalog-links"><span>FULL CATALOGS</span><a href={`${repo}docs/06-benchmarks/README.md`} target="_blank" rel="noreferrer">Documented protocols and reports ↗</a><a href={`${repo}docs/06-qualite-preuves/benchmarks/README.md`} target="_blank" rel="noreferrer">LoCoMo and SWE-bench evaluations ↗</a><a href={`https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}/benchmarks`} target="_blank" rel="noreferrer">Benchmark harnesses, suites, and artifacts ↗</a></section>
    </div>
  );
}
