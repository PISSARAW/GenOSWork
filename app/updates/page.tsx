import type { Metadata } from "next";
import { EvolutionsPage } from "@/components/evolutions-page";

export const metadata: Metadata = {
  title: "GenOS evolutions — October 2026",
  description: "Source-backed GenOS changes: topology runtimes, native workers, adaptive Morphogenesis, GQWF v2, philosophy audits and ETT v1.",
  alternates: { canonical: "/en/updates", languages: { en: "/en/updates", fr: "/fr/updates" } },
};

export default function UpdatesPage() {
  return <EvolutionsPage locale="en" />;
}
