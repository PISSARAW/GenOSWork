import type { Metadata } from "next";
import { ExternalRepositoriesPage } from "@/components/external-repositories-page";

export const metadata: Metadata = {
  title: "Dépôts externes | Écosystème GenOS",
  description: "Explorez 24 dépôts externes, leurs sources GitHub et leur état réel d’intégration dans GenOS.",
  alternates: { canonical: "/fr/ecosystem", languages: { en: "/en/ecosystem", fr: "/fr/ecosystem" } },
  openGraph: { locale: "fr_FR" },
};

export default function FrenchEcosystemPage() {
  return <ExternalRepositoriesPage locale="fr" />;
}
