import { genosSourceCommit } from "@/components/reality-bar";

export const dynamic = "force-static";

const ledger = [
  { capability: "Counterfactual snapshots", status: "IMPLEMENTED" },
  { capability: "Eight topology modes", status: "WIRED" },
  { capability: "Automatic Rhizome routing", status: "PROPOSED" },
  { capability: "Continuous web perception loop", status: "PARTIAL" },
  { capability: "Morphogenesis topology plugins", status: "IMPLEMENTED · BOUNDED" },
];

export async function GET() {
  return Response.json({
    version: "1.0.0",
    sourceCommit: genosSourceCommit,
    ledger,
    routes: { en: "/evidence", fr: "/fr/evidence" },
  });
}
