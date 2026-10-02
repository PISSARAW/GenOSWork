import type { Metadata } from "next";
import { SupervisionDetail } from "@/components/supervision-detail";
import { getSupervisionPage } from "@/components/supervision-data";

export const metadata: Metadata = { title: "Evidence reports", description: "Connect agent run claims to artifacts, checks, provenance and promotion decisions.", alternates: { canonical: "/en/runtime/supervision/evidence" } };
export default function Page() { return <SupervisionDetail page={getSupervisionPage("evidence")!} />; }
