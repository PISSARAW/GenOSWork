import type { Metadata } from "next";
import { SupervisionDetail } from "@/components/supervision-detail";
import { getSupervisionPage } from "@/components/supervision-data";

export const metadata: Metadata = { title: "Agent run budgets", description: "How GenOS declares, measures and enforces execution budgets.", alternates: { canonical: "/runtime/supervision/budgets" } };
export default function Page() { return <SupervisionDetail page={getSupervisionPage("budgets")!} />; }
