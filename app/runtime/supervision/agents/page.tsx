import type { Metadata } from "next";
import { SupervisionDetail } from "@/components/supervision-detail";
import { getSupervisionPage } from "@/components/supervision-data";

export const metadata: Metadata = { title: "Agent process supervision", description: "How GenOS launches, observes and records supervised agent processes.", alternates: { canonical: "/runtime/supervision/agents" } };
export default function Page() { return <SupervisionDetail page={getSupervisionPage("agents")!} />; }
