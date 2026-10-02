import type { Metadata } from "next";
import { SupervisionDetail } from "@/components/supervision-detail";
import { getSupervisionPage } from "@/components/supervision-data";

export const metadata: Metadata = { title: "Isolated agent workspaces", description: "How GenOS scopes agent workspaces, snapshots and candidate branches.", alternates: { canonical: "/en/runtime/supervision/workspaces" } };
export default function Page() { return <SupervisionDetail page={getSupervisionPage("workspaces")!} />; }
