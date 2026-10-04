import type { Metadata } from "next";
import { ExternalRepositoriesPage } from "@/components/external-repositories-page";

export const metadata: Metadata = {
  title: "External repositories | GenOS ecosystem",
  description: "Explore 24 external repositories, their GitHub sources, and their observed integration status in GenOS.",
  alternates: { canonical: "/en/ecosystem", languages: { en: "/en/ecosystem", fr: "/fr/ecosystem" } },
};

export default function EcosystemPage() {
  return <ExternalRepositoriesPage locale="en" />;
}
