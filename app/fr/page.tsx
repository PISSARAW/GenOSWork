import type { Metadata } from "next";
import { GenosHome } from "@/components/genos-home";

export const metadata: Metadata = {
  title: "GenOS — runtime open source pour agents IA",
  description: "GenOS versionne l’état des workspaces, orchestre des agents supervisés et soumet les changements à des barrières de preuve.",
  alternates: { canonical: "/fr", languages: { en: "/en", fr: "/fr" } },
  openGraph: { locale: "fr_FR" },
};

export default function FrenchHomePage() {
  return <GenosHome locale="fr" />;
}
