import type { Metadata } from "next";
import { CapabilityIndex } from "@/components/capability-view";

export const metadata: Metadata = {
  title: "Cinq capacités transversales de GenOS",
  description: "Méristème épistémique, spirale de déblocage, chronotaxie apériodique, cambium des contre-exemples et infini sous contrat : mécanismes, état et limites.",
  alternates: { canonical: "/fr/capabilities", languages: { en: "/en/capabilities", fr: "/fr/capabilities" } },
  openGraph: { locale: "fr_FR" },
};

export default function CapacitesPage() {
  return <CapabilityIndex locale="fr" />;
}
