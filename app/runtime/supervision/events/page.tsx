import type { Metadata } from "next";
import { SupervisionDetail } from "@/components/supervision-detail";
import { getSupervisionPage } from "@/components/supervision-data";

export const metadata: Metadata = { title: "Runtime event history", description: "Follow supervised run events, handoffs and worker outcomes in order.", alternates: { canonical: "/en/runtime/supervision/events" } };
export default function Page() { return <SupervisionDetail page={getSupervisionPage("events")!} />; }
