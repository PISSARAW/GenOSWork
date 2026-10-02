import { Eyebrow } from "@/components/eyebrow";

const sourceCommit = "0c2de1f5b644f58cef0f8bc4a08afd76ce5b2f30";
const source = `https://github.com/PISSARAW/GenOS/blob/${sourceCommit}/docs/03-reference/api-et-contrats.md`;
const apiSource = `https://github.com/PISSARAW/GenOS/blob/${sourceCommit}/backend/src/routes/mcpRoutes.js`;

const translations = {
  en: {
    eyebrow: "DEVELOPER REFERENCE · GENOS.MCP/V1",
    title: <>Use the API.<br /><em>Know its limits.</em></>,
    intro: "A practical guide to the GenOS REST and MCP surfaces, based on the source contracts. Authentication, tenant scope and tool permissions are enforced by the GenOS server.",
    quick: "Request flow", flow: "client → auth → tenant scope → permission and policy checks → MCP transport → structured result",
    authTitle: "Authentication and scope", authBody: "Send a GenOS access token in Authorization: Bearer. MCP execution requires mcp:execute_safe and an explicit organization and project scope. Pass both tenant headers; the IDs must belong together and the authenticated principal must be authorized for them.",
    corsTitle: "Browser access and CORS", corsBody: "GenOS checks browser origins against the default allowlist and GENOS_ALLOWED_ORIGINS. Add the exact public site origin to that server setting before connecting from a browser. Do not route a shared access token through a public website server.",
    execTitle: "Execute an MCP tool", execBody: "The HTTP envelope accepts toolName or tool_name and timeoutMs or timeout_ms. Tool arguments use the JSON schema for that tool; names are canonically snake_case. The example launches a local supervised orchestration and waits for its result.",
    discoveryTitle: "Discover tools and schemas", discoveryBody: "Use these read and safe-execution routes to inspect available tools, retrieve argument schemas, or exercise a tool through the configured MCP transport. A successful test call can execute the real downstream tool.",
    routesTitle: "MCP routes", route: "Route", permission: "Permission", note: "Purpose / behavior",
    errorsTitle: "Responses and errors", errorsBody: "Check the HTTP status and the tool-specific response body. REST does not use one universal success envelope. Errors may include error.code, error.message, requestId, traceId and details.",
    codes: "Typical status", meaning: "Meaning",
    toolTitle: "genos_orchestrate arguments", toolBody: "This schema is version-sensitive; retrieve the live tool schema before relying on optional fields. The small example fixes the executor to local and foreground execution.",
    interopTitle: "Protocol conventions", interopBody: "MCP tool arguments use snake_case. The REST envelope temporarily accepts camelCase aliases only for its own two fields. Do not send both aliases with conflicting values. MCP protocol version is genos.mcp/v1.",
    healthTitle: "Health probes and other interfaces", healthBody: "The HTTP service exposes cheap health probes. gRPC and Rust CLI contracts are separate from REST and MCP; use the source documentation and proto definitions for those clients.",
    caveat: "This guide documents contracts, not guaranteed availability. Tools can be unequipped, denied, quarantined, unconfigured or blocked by a circuit breaker. A transport-level success does not establish application-level correctness.",
    sourceLink: "Read the canonical API contract ↗", routesLink: "Inspect the MCP route implementation ↗",
  },
  fr: {
    eyebrow: "RÉFÉRENCE DÉVELOPPEUR · GENOS.MCP/V1",
    title: <>Utiliser l’API.<br /><em>En connaître les limites.</em></>,
    intro: "Guide pratique des interfaces REST et MCP de GenOS, établi à partir des contrats source. Le serveur GenOS applique l’authentification, le scope tenant et les permissions d’outil.",
    quick: "Chemin d’une requête", flow: "client → authentification → scope tenant → permissions et politiques → transport MCP → résultat structuré",
    authTitle: "Authentification et scope", authBody: "Envoyez un jeton d’accès GenOS dans Authorization: Bearer. L’exécution MCP exige mcp:execute_safe et un scope explicite comprenant une organisation et un projet. Envoyez les deux en-têtes tenant; les identifiants doivent correspondre et le principal authentifié doit y être autorisé.",
    corsTitle: "Accès navigateur et CORS", corsBody: "GenOS vérifie les origines navigateur à partir de sa liste par défaut et de GENOS_ALLOWED_ORIGINS. Ajoutez l’origine exacte du site public à ce paramètre avant une connexion depuis un navigateur. Ne faites pas transiter un jeton partagé par le serveur web public.",
    execTitle: "Exécuter un outil MCP", execBody: "L’enveloppe HTTP accepte toolName ou tool_name et timeoutMs ou timeout_ms. Les arguments de l’outil doivent respecter son schéma JSON; leurs noms canoniques sont en snake_case. L’exemple lance une orchestration locale supervisée et attend son résultat.",
    discoveryTitle: "Découvrir outils et schémas", discoveryBody: "Ces routes de lecture et d’exécution contrôlée servent à lister les outils, obtenir leurs schémas d’arguments ou les essayer via le transport MCP configuré. Un appel de test réussi peut exécuter le véritable outil aval.",
    routesTitle: "Routes MCP", route: "Route", permission: "Permission", note: "Rôle / comportement",
    errorsTitle: "Réponses et erreurs", errorsBody: "Vérifiez le statut HTTP et le corps propre à l’outil. REST n’emploie pas une enveloppe de succès unique. Une erreur peut contenir error.code, error.message, requestId, traceId et details.",
    codes: "Statut courant", meaning: "Sens",
    toolTitle: "Arguments de genos_orchestrate", toolBody: "Ce schéma dépend de la version; récupérez le schéma courant avant d’utiliser des champs facultatifs. Le petit exemple fixe l’exécuteur local et l’exécution au premier plan.",
    interopTitle: "Conventions des protocoles", interopBody: "Les arguments MCP utilisent snake_case. L’enveloppe REST accepte temporairement camelCase pour ses deux champs seulement. N’envoyez pas deux alias avec des valeurs contradictoires. La version MCP est genos.mcp/v1.",
    healthTitle: "Sondes et autres interfaces", healthBody: "Le service HTTP expose des sondes de santé légères. gRPC et la CLI Rust ont leurs propres contrats, distincts de REST et MCP; consultez la documentation source et les fichiers proto.",
    caveat: "Ce guide décrit les contrats, pas une disponibilité garantie. Un outil peut être désactivé, refusé, mis en quarantaine, non configuré ou bloqué par un coupe-circuit. Un succès de transport ne prouve pas la correction métier.",
    sourceLink: "Lire le contrat API canonique ↗", routesLink: "Voir l’implémentation des routes MCP ↗",
  },
};

export function ApiMcpReference({ locale = "en" }: { locale?: "en" | "fr" }) {
  const t = translations[locale];
  const rows = locale === "fr"
    ? [["GET /api/tools", "read", "Liste les outils visibles."], ["GET /api/tools/:name/schema", "read", "Retourne le schéma d’entrée courant."], ["POST /api/tools/test", "mcp:execute_safe + scope tenant", "Teste via le transport MCP configuré."], ["POST /api/tools/dry-run", "mcp:execute_safe", "Simule l’outil dans l’état VFS fourni; ce n’est pas un appel d’exécution."], ["POST /api/mcp/execute", "mcp:execute_safe + scope tenant", "Exécute l’outil si le registre et les politiques l’autorisent."]]
    : [["GET /api/tools", "read", "List visible tools."], ["GET /api/tools/:name/schema", "read", "Returns the current input schema."], ["POST /api/tools/test", "mcp:execute_safe + tenant", "Tests the configured MCP transport."], ["POST /api/tools/dry-run", "mcp:execute_safe", "Simulates against supplied VFS state; it does not execute the transport."], ["POST /api/mcp/execute", "mcp:execute_safe + tenant", "Executes the tool when registry and policy allow it."]];
  const errorRows = locale === "fr"
    ? [["400", "Requête ou arguments invalides"], ["401", "Jeton absent ou invalide"], ["403", "Permission, scope ou politique refusé"], ["404", "Route ou outil introuvable"], ["429", "Limitation de débit"], ["502", "Transport MCP aval en échec"], ["503", "Service, outil ou garde-fou indisponible"], ["504", "Délai dépassé"]]
    : [["400", "Invalid request or arguments"], ["401", "Missing or invalid token"], ["403", "Permission, scope or policy denied"], ["404", "Route or tool not found"], ["429", "Rate limited"], ["502", "Downstream MCP transport failed"], ["503", "Service, tool or safety gate unavailable"], ["504", "Deadline exceeded"]];

  return <div className="page-shell api-reference-page" lang={locale}>
    <section className="page-hero section-wrap api-reference-hero"><Eyebrow>{t.eyebrow}</Eyebrow><h1>{t.title}</h1><p>{t.intro}</p><div className="api-flow"><span>{t.quick}</span><code>{t.flow}</code></div></section>
    <section className="section-wrap api-docs">
      <article className="api-doc-block"><div><span className="api-kicker">01 / SECURITY</span><h2>{t.authTitle}</h2><p>{t.authBody}</p></div><pre><code>{`Authorization: Bearer <access-token>\nX-Organization-Id: <organization-id>\nX-Project-Id: <project-id>`}</code></pre></article>
      <article className="api-doc-block"><div><span className="api-kicker">02 / BROWSER CLIENTS</span><h2>{t.corsTitle}</h2><p>{t.corsBody}</p></div><pre><code>GENOS_ALLOWED_ORIGINS=https://genoswork.vercel.app</code></pre></article>
      <article className="api-doc-block api-doc-wide"><div><span className="api-kicker">03 / MCP EXECUTION</span><h2>{t.execTitle}</h2><p>{t.execBody}</p></div><pre><code>{`curl --request POST "$GENOS_URL/api/mcp/execute" \\\n  --header "Authorization: Bearer $GENOS_TOKEN" \\\n  --header "X-Organization-Id: $GENOS_ORG" \\\n  --header "X-Project-Id: $GENOS_PROJECT" \\\n  --header "Content-Type: application/json" \\\n  --data '{"toolName":"genos_orchestrate","args":{"mission":"Summarize the approved task","executor":"local","background":false},"timeoutMs":60000}'`}</code></pre></article>
      <article className="api-doc-block api-doc-wide"><div><span className="api-kicker">04 / DISCOVERY AND TEST</span><h2>{t.discoveryTitle}</h2><p>{t.discoveryBody}</p></div><div className="api-route-table"><div className="api-route-row api-route-head"><b>{t.route}</b><b>{t.permission}</b><b>{t.note}</b></div>{rows.map(([route, permission, description]) => <div className="api-route-row" key={route}><code>{route}</code><span>{permission}</span><p>{description}</p></div>)}</div></article>
      <article className="api-doc-block"><div><span className="api-kicker">05 / TOOL CONTRACT</span><h2>{t.toolTitle}</h2><p>{t.toolBody}</p></div><pre><code>{`{\n  "mission": "string (required)",\n  "worker_assignments": "optional",\n  "strategy": "optional",\n  "background": false,\n  "executor": "local",\n  "provider": "optional",\n  "modelId": "optional"\n}`}</code></pre></article>
      <article className="api-doc-block"><div><span className="api-kicker">06 / WIRE FORMAT</span><h2>{t.interopTitle}</h2><p>{t.interopBody}</p></div><pre><code>{`{\n  "toolName": "genos_replay",\n  "args": { "snapshot_id": "snap-example" },\n  "timeoutMs": 30000\n}`}</code></pre></article>
      <article className="api-doc-block api-doc-wide"><div><span className="api-kicker">07 / ERROR HANDLING</span><h2>{t.errorsTitle}</h2><p>{t.errorsBody}</p></div><div className="api-error-table"><div className="api-error-row api-route-head"><b>{t.codes}</b><b>{t.meaning}</b></div>{errorRows.map(([code, meaning]) => <div className="api-error-row" key={code}><code>{code}</code><span>{meaning}</span></div>)}</div><pre><code>{`{\n  "error": {\n    "code": "ZERO_TRUST_DENIED",\n    "message": "Tool execution denied.",\n    "requestId": "req-example",\n    "traceId": "trace-example"\n  }\n}`}</code></pre></article>
      <article className="api-doc-block api-doc-wide"><div><span className="api-kicker">08 / OTHER SURFACES</span><h2>{t.healthTitle}</h2><p>{t.healthBody}</p></div><pre><code>{`GET /healthz\nGET /readyz\nGET /livez\ngRPC: 127.0.0.1:50051\nMCP protocol: genos.mcp/v1`}</code></pre></article>
      <article className="api-doc-block api-doc-wide"><div><span className="api-kicker">09 / KNOWLEDGE API</span><h2>{locale === "fr" ? "Découverte machine-readable" : "Machine-readable discovery"}</h2><p>{locale === "fr" ? "Les routes de connaissance publiques sont en lecture seule et n’exigent pas d’identifiant. OpenAPI décrit les schémas; llms.txt donne une carte compacte des contenus." : "Public knowledge routes are read-only and require no credentials. OpenAPI describes response schemas; llms.txt provides a compact content map."}</p></div><div className="api-knowledge-links"><a href="/openapi.json">OpenAPI 3.0.3 ↗</a><a href="/llms.txt">llms.txt ↗</a><a href="/api/v1/concepts">Concept registry ↗</a><a href="/api/v1/research">Research map ↗</a><a href="/api/v1/experiments">Experiments and raw artifacts ↗</a><a href="/api/v1/topologies">Topology registry ↗</a></div></article>
      <aside className="api-caveat"><b>{locale === "fr" ? "À savoir" : "Read before integrating"}</b><p>{t.caveat}</p></aside>
      <div className="api-source-links"><a href={source} target="_blank" rel="noreferrer">{t.sourceLink}</a><a href={apiSource} target="_blank" rel="noreferrer">{t.routesLink}</a><span>{locale === "fr" ? `Contrat consulté le 2 octobre 2026 · GenOS ${sourceCommit.slice(0, 7)}` : `Contract reviewed October 2, 2026 · GenOS ${sourceCommit.slice(0, 7)}`}</span></div>
    </section>
  </div>;
}
