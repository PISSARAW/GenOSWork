import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { catalogConcepts } from "@/components/concept-catalog";
import { concepts } from "@/components/concepts";
import { genosSourceCommit, productClaims } from "@/components/product-evidence";

const genosRoot = resolve(process.cwd(), "..", "GenOS");
const hasLocalSource = existsSync(join(genosRoot, ".git"));
let publishedFiles: Set<string>;

function git(...args: string[]) {
  return execFileSync("git", ["-c", `safe.directory=${genosRoot.replaceAll("\\", "/")}`, "-C", genosRoot, ...args], { encoding: "utf8" }).trim();
}

describe.skipIf(!hasLocalSource)("GenOS V3 source synchronization", () => {
  const files = () => publishedFiles ??= new Set(git("ls-tree", "-r", "--name-only", genosSourceCommit).split("\n"));
  it("pins the current local origin/v3 revision", () => {
    expect(git("rev-parse", "refs/remotes/origin/v3")).toBe(genosSourceCommit);
  });

  it("links product claims and V3 concept dossiers to files in that revision", () => {
    const v3Slugs = new Set(["g-cir", "relational-physiology", "signal-plane", "mission-continuity", "epistemic-meristem", "unblocking-spiral", "counterexample-cambium", "chronotaxis", "risk-ledger", "natural-creative-ecology"]);
    const paths = [
      ...productClaims.map((claim) => claim.sourcePath),
      ...catalogConcepts.filter((concept) => v3Slugs.has(concept.slug)).map((concept) => `docs/${concept.source.replace(/^\.\.\//, "")}`),
    ];
    for (const path of new Set(paths)) {
      expect(files().has(path), path).toBe(true);
    }
  });

  it("resolves every atlas documentation and code reference at the published revision", () => {
    const missing = concepts.flatMap((concept) => [`docs/${concept.source}`, ...(concept.codeSources ?? [])]
      .filter((path) => !files().has(path)).map((path) => `${concept.slug}: ${path}`));
    expect(missing).toEqual([]);
    const slugs = new Set(concepts.map((concept) => concept.slug));
    expect(concepts.flatMap((concept) => (concept.related ?? []).filter((slug) => !slugs.has(slug)).map((slug) => `${concept.slug}: ${slug}`))).toEqual([]);
  });

  it("retains the canonical mechanisms behind the V3 status summaries", () => {
    const markers = [
      ["docs/02-orchestration/g-cir.md", "Visibilité attestée"],
      ["docs/02-orchestration/physiologie-relationnelle.md", "29 relations"],
      ["docs/01-concepts/signal-plane-zero-text.md", "signal_delivery_claims"],
      ["docs/02-orchestration/continuite-mission-organisme.md", "missionIdentityService"],
      ["docs/01-concepts/natural-creative-ecology.md", "nceMetadata"],
      ["docs/06-qualite-preuves/missions-live-biocenose-sqlite-2026-10-04.md", "766"],
    ] as const;
    for (const [path, marker] of markers) {
      expect(git("show", `${genosSourceCommit}:${path}`), path).toContain(marker);
    }
  }, 30_000);
});
