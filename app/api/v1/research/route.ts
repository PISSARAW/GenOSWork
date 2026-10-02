import { researchSections } from "@/components/research-program";
import { primaryMechanismReferences } from "@/components/mechanism-literature";
import { genosSourceCommit } from "@/components/reality-bar";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.0.0",
    sourceCommit: genosSourceCommit,
    qualification: "Research map and mechanism-level bibliography. Citations contextualize ideas; they do not validate the GenOS implementation.",
    sections: researchSections.map((section) => ({
      ...section,
      routes: { en: "/en/research", fr: "/fr/research" },
    })),
    primaryReferences: primaryMechanismReferences,
  });
}
