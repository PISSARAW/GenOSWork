import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { OrganizationVisual } from "@/components/organization-visual";
import { organizationFamilies, organizations } from "@/components/organizations";

export const metadata: Metadata = {
  title: "Dynamic organizations",
  description: "Explore the 19 GenOS dynamic organizations and the algorithms that guide consensus, adversarial review, swarm search, routing, recovery and memory.",
  alternates: { canonical: "/en/organizations" },
};

export default function OrganizationsPage() {
  return (
    <div className="page-shell organizations-page">
      <section className="page-hero section-wrap organization-hero">
        <Eyebrow>ORCHESTRATION · 19 DYNAMIC ORGANIZATIONS</Eyebrow>
        <h1>Algorithms shape<br />how a team <em>adapts.</em></h1>
        <p>An organization is a decision rule for one step of collective work: how agents exchange evidence, allocate attention, find routes or recover. It is a different layer from a topology, which describes the wider coordination structure.</p>
        <div className="organization-statline"><span><strong>19</strong> organizations</span><i /><span><strong>4</strong> swarm algorithms</span><i /><span><strong>8</strong> separate topologies</span></div>
      </section>

      <section className="section-wrap organization-map-section" aria-labelledby="organization-map-title">
        <div className="organization-map-copy"><Eyebrow>READ THE TWO LAYERS</Eyebrow><h2 id="organization-map-title">Structure holds the team.<br /><em>An algorithm guides the step.</em></h2><p>The topology defines a broad pattern such as a hub, a shared state or a network. A dynamic organization adds a specific rule that can guide a decision, such as ranked search, abstaining from a vote or routing by capability. <Link href="/topologies">Explore the eight topologies →</Link></p></div>
        <div className="organization-layer-map" role="img" aria-label="A topology structures the group, an organization guides a decision, and a runtime step returns a result">
          <div className="layer-box layer-topology"><small>STRUCTURE</small><strong>Topology</strong><span>8 coordination patterns</span><b>hub · regions · shared state</b></div>
          <span className="layer-arrow" aria-hidden="true">→</span>
          <div className="layer-box layer-organization"><small>DECISION RULE</small><strong>Organization</strong><span>19 dynamic algorithms</span><b>consensus · swarm · routing</b></div>
          <span className="layer-arrow" aria-hidden="true">→</span>
          <div className="layer-box layer-step"><small>ONE BOUNDED STEP</small><strong>Guidance</strong><span>deterministic result</span><b>rank · route · allocate</b></div>
          <svg className="layer-connector" viewBox="0 0 900 50" aria-hidden="true"><path d="M450 0v24H150v22m300-22v22m300-22v22" /></svg>
        </div>
      </section>

      <section className="section-wrap organization-index" aria-label="Dynamic organizations by family">
        {organizationFamilies.map((family) => {
          const group = organizations.filter((organization) => organization.family === family);
          return (
            <section className="organization-family" key={family}>
              <header className="organization-family-heading"><div><Eyebrow>{String(group.length).padStart(2, "0")} ORGANIZATIONS</Eyebrow><h2>{family}</h2></div><span>Deterministic local guidance steps</span></header>
              <div className="organization-grid">
                {group.map((organization) => (
                  <article className="organization-card" key={organization.id}>
                    <div className="organization-card-meta"><span>{String(organizations.indexOf(organization) + 1).padStart(2, "0")} / 19</span><span className={`organization-status organization-status-${organization.status.toLowerCase()}`}>{organization.status}</span></div>
                    <OrganizationVisual organization={organization} />
                    <h3>{organization.name}</h3>
                    <p className="organization-summary">{organization.summary}</p>
                    <div className="organization-algorithm"><span>ALGORITHM</span><strong>{organization.algorithm}</strong></div>
                    <p className="organization-mechanism">{organization.mechanism}</p>
                    <code>{organization.id}</code>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="organization-caveat"><div className="section-wrap"><Eyebrow light>IMPLEMENTATION STATUS</Eyebrow><h2>Available guidance<br /><em>needs real-world proof.</em></h2><p>GenOS describes the 19 organizations as a deterministic, local step. Its product contract currently marks these entries partial or experimental: registration and an algorithm do not by themselves prove that an orchestrator selected the organization, dispatched it for a mission, or improved the result.</p><a href="https://github.com/PISSARAW/GenOS/blob/e9cdad244c2bce9e155007964c591b9be321dc02/docs/03-reference/contrat-produit-et-completude.md" target="_blank" rel="noreferrer">Read the implementation contract ↗</a></div></section>
    </div>
  );
}
