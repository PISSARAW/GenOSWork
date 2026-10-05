import type { Metadata } from "next";
import { CapabilityIndex } from "@/components/capability-view";

export const metadata: Metadata = {
  title: "Five cross-cutting GenOS capabilities",
  description: "Explore the epistemic meristem, unblocking spiral, aperiodic chronotaxis, counterexample cambium and contracted infinity, with their current implementation limits.",
  alternates: { canonical: "/en/capabilities", languages: { en: "/en/capabilities", fr: "/fr/capabilities" } },
};

export default function CapabilitiesPage() {
  return <CapabilityIndex locale="en" />;
}
