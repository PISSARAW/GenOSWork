const { readFileSync, mkdirSync, writeFileSync } = require("node:fs");
const ts = require("typescript");
const moduleExports = {};
const source = readFileSync("components/mechanism-literature.ts", "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
new Function("exports", compiled)(moduleExports);
const references = [...new Map(Object.values(moduleExports.mechanismLiterature).flat().filter((r) => r.url.startsWith("https://doi.org/")).map((r) => [r.url, r])).values()];
const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

(async () => {
  const results = [];
  for (const reference of references) {
    try {
      const doi = decodeURIComponent(reference.url.slice("https://doi.org/".length));
      const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, { signal: AbortSignal.timeout(30000), headers: { "User-Agent": "GenOSWork-ConceptAtlasAudit/1.0" } });
      if (!response.ok) throw new Error(`${doi}: HTTP ${response.status}`);
      const { message } = await response.json();
      const primaryTitle = message.title?.[0] || "";
      const subtitle = message.subtitle?.[0];
      const title = subtitle && !normalize(primaryTitle).includes(normalize(subtitle)) ? `${primaryTitle}: ${subtitle}` : primaryTitle;
      // Bibliographies may omit a lecture-series prefix or an optional subtitle.
      const matches = normalize(title) === normalize(reference.title) || normalize(title).endsWith(normalize(reference.title)) || normalize(title).startsWith(normalize(reference.title));
      results.push({ doi, expectedTitle: reference.title, title, matches, registeredYear: message.published?.["date-parts"]?.[0]?.[0], expectedYear: reference.year });
    } catch (error) {
      results.push({ url: reference.url, error: error.message });
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
  mkdirSync("artifacts/concept-atlas", { recursive: true });
  writeFileSync("artifacts/concept-atlas/reference-audit.json", JSON.stringify(results, null, 2));
  const issues = results.filter((r) => r.error || !r.matches || r.registeredYear !== r.expectedYear);
  console.log(JSON.stringify({ checked: results.length, issues }, null, 2));
  if (issues.length) process.exitCode = 1;
})().catch((error) => { console.error(error); process.exitCode = 1; });
