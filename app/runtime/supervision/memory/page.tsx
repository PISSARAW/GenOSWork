import type { Metadata } from "next";
import { SupervisionDetail } from "@/components/supervision-detail";
import { getSupervisionPage } from "@/components/supervision-data";

export const metadata: Metadata = { title: "Scoped runtime memory", description: "How GenOS scopes memory retrieval and preserves context provenance.", alternates: { canonical: "/runtime/supervision/memory" } };
export default function Page() { return <SupervisionDetail page={getSupervisionPage("memory")!} />; }
