import { Eyebrow } from "@/components/eyebrow";
import { externalRepositoryGroups, externalRepositories, type RepositoryStatus } from "@/components/external-repositories";
import { externalRepositoryDetails } from "@/components/external-repository-details";
import { genosSource, genosSourceCommit } from "@/components/product-evidence";

const statusLabels: Record<RepositoryStatus, { en: string; fr: string }> = {
  "in-code": { en: "In GenOS code", fr: "Dans le code GenOS" },
  pilot: { en: "Executable pilot", fr: "Pilote exécutable" },
  local: { en: "Local v3 only", fr: "v3 local seulement" },
  reference: { en: "Not integrated", fr: "Non intégré" },
};

export function ExternalRepositoriesPage({ locale }: { locale: "en" | "fr" }) {
  const french = locale === "fr";
  const statusCount = (status: RepositoryStatus) => externalRepositories.filter((item) => item.status === status).length;

  return (
    <div className="page-shell ecosystem-page" lang={locale}>
      <section className="page-hero section-wrap ecosystem-hero">
        <Eyebrow>{french ? "ÉCOSYSTÈME · DÉPÔTS EXTERNES" : "ECOSYSTEM · EXTERNAL REPOSITORIES"}</Eyebrow>
        <h1>{french ? "24 dépôts à voir," : "24 repositories,"}<br /><em>{french ? "un état précis." : "each with a clear status."}</em></h1>
        <p>{french
          ? "Chaque fiche relie le dépôt d’origine à GenOS : relation actuelle, effet concret sur le code et capacité obtenue. Lorsqu’un projet n’est pas intégré, la capacité décrite reste une piste."
          : "Each card connects the original repository to GenOS: current relationship, concrete code impact, and resulting capability. For projects not integrated, the capability is explicitly prospective."}</p>
        <div className="ecosystem-summary" aria-label={french ? "Résumé des statuts" : "Status summary"}>
          <div><strong>{externalRepositories.length}</strong><span>{french ? "dépôts source" : "source repositories"}</span></div>
          <div><strong>{statusCount("in-code") + statusCount("pilot")}</strong><span>{french ? "dans la révision épinglée" : "in pinned revision"}</span></div>
          <div><strong>{statusCount("local")}</strong><span>{french ? "dans v3 local" : "in local v3"}</span></div>
          <div><strong>{statusCount("reference")}</strong><span>{french ? "non intégrés" : "not integrated"}</span></div>
        </div>
        <p className="ecosystem-method">{french
          ? `Audit du 4 octobre 2026. Révision GenOS épinglée par ce site : ${genosSourceCommit.slice(0, 8)} ; Cedar et les deux capteurs SHEV supplémentaires figurent dans v3 local jusqu’au commit b0e64d6e. Un mécanisme GenOS similaire n’implique pas l’utilisation du dépôt externe.`
          : `Reviewed October 4, 2026. GenOS revision pinned by this site: ${genosSourceCommit.slice(0, 8)}; Cedar and the two additional SHEV sensors are in local v3 through commit b0e64d6e. A similar GenOS mechanism does not imply use of the external repository.`}</p>
      </section>

      <nav className="section-wrap ecosystem-index" aria-label={french ? "Catégories de dépôts" : "Repository categories"}>
        {externalRepositoryGroups.map((group, index) => (
          <a href={`#${group.id}`} key={group.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {french ? group.titleFr : group.titleEn}
            <b aria-hidden="true">↘</b>
          </a>
        ))}
      </nav>

      <div className="ecosystem-sections">
        {externalRepositoryGroups.map((group, index) => (
          <section className="section-wrap ecosystem-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
            <div className="ecosystem-group-heading">
              <div><Eyebrow>{String(index + 1).padStart(2, "0")} / 06</Eyebrow><h2 id={`${group.id}-title`}>{french ? group.titleFr : group.titleEn}</h2></div>
              <p>{french ? group.descriptionFr : group.descriptionEn}</p>
            </div>
            <div className="ecosystem-grid">
              {group.repositories.map((repo) => {
                const detail = externalRepositoryDetails[repo.number];
                return (
                  <article className="ecosystem-card" key={repo.url}>
                    <div className="ecosystem-card-top"><span>{String(repo.number).padStart(2, "0")} / 24</span><span className={`ecosystem-status ecosystem-status-${repo.status}`}>{statusLabels[repo.status][locale]}</span></div>
                    <h3>{repo.name}</h3>
                    <dl className="ecosystem-detail-list">
                      <div><dt>{french ? "Relation avec GenOS" : "Relationship to GenOS"}</dt><dd>{detail.relation[locale]}</dd></div>
                      <div><dt>{french ? "Impact constaté" : "Observed impact"}</dt><dd>{detail.impact[locale]}</dd></div>
                      <div><dt>{repo.status === "reference" ? (french ? "Possibilité à tester" : "Potential experiment") : (french ? "Ce que GenOS peut faire" : "What GenOS can do")}</dt><dd>{detail.capability[locale]}</dd></div>
                    </dl>
                    {detail.genosPath && <p className="ecosystem-code-path"><span>{french ? "Dans GenOS" : "In GenOS"}</span><code>{detail.genosPath}</code></p>}
                    <div className="ecosystem-card-links">
                      <a href={repo.url} target="_blank" rel="noopener noreferrer" aria-label={`${french ? "Voir le dépôt" : "Open repository"} ${repo.name} ${french ? "sur GitHub" : "on GitHub"}`}>
                        {french ? "Voir le dépôt" : "Open repository"} <span aria-hidden="true">↗</span>
                      </a>
                      {repo.sourcePath && <a className="ecosystem-source-link" href={genosSource(repo.sourcePath)} target="_blank" rel="noopener noreferrer">{french ? "Voir le code GenOS" : "View GenOS code"} ↗</a>}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <aside className="section-wrap ecosystem-footnote">
        <strong>{french ? "Comment lire cette sélection" : "How to read this selection"}</strong>
        <p>{french
          ? `Les ${statusCount("reference")} fiches « Non intégré » sont des références ou des pistes d’expérimentation, pas des dépendances de GenOS. Le pilote Inspect AI n’a pas encore de résultat de modèle réel ; les contrôles web automatisés ne démontrent pas à eux seuls la qualité d’une mission complète.`
          : `The ${statusCount("reference")} “Not integrated” entries are references or experiment ideas, not GenOS dependencies. The Inspect AI pilot has no real model result yet; automated web checks alone do not establish the quality of a complete mission.`}</p>
      </aside>
    </div>
  );
}
