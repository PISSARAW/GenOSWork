import type { Metadata } from "next";
import { OrganizationsView } from "@/components/organizations-view";

export const metadata: Metadata = {
  title: "Les 19 organisations dynamiques et leurs algorithmes",
  description: "Exécutez les 19 algorithmes de guidage GenOS : consensus Brier, quorum avec abstention, revue adversariale, recherche en essaim, routage, reprise et mémoire.",
  alternates: { canonical: "/fr/organizations", languages: { en: "/en/organizations", fr: "/fr/organizations" } },
  openGraph: { locale: "fr_FR" },
};

export default function FrenchOrganizationsPage() {
  return <OrganizationsView language="fr" />;
}
