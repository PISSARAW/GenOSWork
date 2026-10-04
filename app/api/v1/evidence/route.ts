import { genosReviewedAt, genosSource, genosSourceCommit, productClaims } from "@/components/product-evidence";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.1.0",
    sourceCommit: genosSourceCommit,
    reviewedAt: genosReviewedAt,
    contract: genosSource("docs/03-reference/contrat-produit-et-completude.md"),
    ledger: productClaims.map((claim) => ({ ...claim, sourceUrl: genosSource(claim.sourcePath) })),
    routes: { en: "/en/evidence", fr: "/fr/evidence" },
  });
}
