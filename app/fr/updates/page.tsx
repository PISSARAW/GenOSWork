import type { Metadata } from "next";
import { EvolutionsPage } from "@/components/evolutions-page";

export const metadata: Metadata = {
  title: "Évolutions GenOS — octobre 2026",
  description: "Les évolutions GenOS sourcées : topologies, workers natifs, Morphogenèse adaptative, GQWF v2, audits philosophiques et ETT v1.",
  alternates: { canonical: "/fr/updates", languages: { en: "/en/updates", fr: "/fr/updates" } },
  openGraph: { locale: "fr_FR" },
};

export default function FrenchUpdatesPage() {
  return <EvolutionsPage locale="fr" />;
}
