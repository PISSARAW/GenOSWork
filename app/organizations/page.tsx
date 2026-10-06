import type { Metadata } from "next";
import { OrganizationsView } from "@/components/organizations-view";

export const metadata: Metadata = {
  title: "The 19 dynamic organizations and their algorithms",
  description: "Run all 19 GenOS organization guidance algorithms locally: Brier consensus, quorum with abstention, adversarial review, swarm search, routing, recovery and memory.",
  alternates: { canonical: "/en/organizations", languages: { en: "/en/organizations", fr: "/fr/organizations" } },
};

export default function OrganizationsPage() {
  return <OrganizationsView />;
}
