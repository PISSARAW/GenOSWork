import { genosSourceCommit } from "@/components/reality-bar";

export const dynamic = "force-static";

const ledger = [
  { capability: "Counterfactual snapshots", status: "IMPLEMENTED" },
  { capability: "Eight topology modes", status: "WIRED" },
  { capability: "Rhizome session routing", status: "CALLABLE · BOUNDED" },
  { capability: "Continuous web perception loop", status: "PARTIAL" },
  { capability: "Morphogenesis topology plugins", status: "IMPLEMENTED · BOUNDED" },
];

export async function GET() {
  return Response.json({
    version: "1.0.0",
    sourceCommit: genosSourceCommit,
    ledger,
    routes: { en: "/en/evidence", fr: "/fr/evidence" },
  });
}
