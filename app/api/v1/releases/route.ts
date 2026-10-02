import { genosSourceCommit } from "@/components/reality-bar";
import { siteUrl } from "@/components/site-config";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.0.0",
    site: siteUrl,
    sourceCommit: genosSourceCommit,
    source: `https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}`,
  });
}
