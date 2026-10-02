import type { SupervisionPageData } from "@/components/supervision-data";
import { Eyebrow } from "@/components/eyebrow";

export function SupervisionDetail({ page }: { page: SupervisionPageData }) {
  return (
    <div className="page-shell supervision-detail-page">
      <section className="page-hero section-wrap supervision-detail-hero">
        <div className="supervision-breadcrumb"><a href="/runtime/supervision">SUPERVISION</a><span>/</span>{page.eyebrow}</div>
        <Eyebrow>{page.number} / {page.eyebrow}</Eyebrow>
        <h1>{page.title}<br /><em>{page.emphasis}</em></h1>
        <p>{page.description}</p>
        <div className="detail-sample-note"><span>EXAMPLE MODEL</span> This page describes a runtime surface; values and events are illustrative.</div>
      </section>
      <section className="section-wrap detail-overview">
        <div className="detail-overview-heading"><div><Eyebrow>{page.status}</Eyebrow><h2>A reviewable<br /><em>sequence.</em></h2></div><p>Each transition keeps its relationship to the mission and the state that authorized it. That makes later review more useful than a detached success message.</p></div>
        <div className="detail-step-list">{page.steps.map((step, index) => <article key={step.label}><span className="detail-step-label">{step.label}</span><div className="detail-step-connector" aria-hidden="true"><i className={index === page.steps.length - 1 ? "connector-last" : ""} /></div><div className="detail-step-copy"><h3>{step.title}</h3><p>{step.body}</p></div><span className="detail-step-number">0{index + 1}</span></article>)}</div>
      </section>
      <section className="detail-signal-section"><div className="section-wrap"><div className="detail-signal-heading"><Eyebrow light>WHAT THE OPERATOR CAN INSPECT</Eyebrow><h2>Context is part<br />of the <em>control.</em></h2></div><div className="detail-signal-grid">{page.signals.map((signal) => <article key={signal.label}><span>{signal.label}</span><strong>{signal.value}</strong><small>{signal.note}</small></article>)}</div></div></section>
      <section className="section-wrap detail-principle"><div className="principle-mark">“</div><div><Eyebrow>RUNTIME PRINCIPLE</Eyebrow><blockquote>{page.principle}</blockquote><a href="/runtime/supervision">← Back to supervision overview</a></div></section>
    </div>
  );
}
