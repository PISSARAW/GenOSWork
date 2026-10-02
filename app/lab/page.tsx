import type { Metadata } from "next";
import { MorphogenesisLab } from "@/components/morphogenesis-lab";

export const metadata: Metadata = { title: "Morphogenesis Lab", description: "Explore an illustrative, local-only visualization of how an agent mission can branch into candidate work and evidence review.", alternates: { canonical: "/lab" } };

export default function LabPage() {
  return <div className="lab-page"><MorphogenesisLab /></div>;
}
