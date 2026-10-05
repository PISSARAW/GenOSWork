import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { capabilityPages, getCapabilityPage } from "@/components/capability-pages";
import { CapabilityDetail } from "@/components/capability-view";

export function generateStaticParams() {
  return capabilityPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getCapabilityPage(slug);
  if (!page) return { title: "Capacité introuvable" };
  return {
    title: page.fr.name,
    description: page.fr.purpose,
    alternates: { canonical: `/fr/capabilities/${slug}`, languages: { en: `/en/capabilities/${slug}`, fr: `/fr/capabilities/${slug}` } },
    openGraph: { locale: "fr_FR" },
  };
}

export default async function CapacitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getCapabilityPage(slug);
  if (!page) notFound();
  return <CapabilityDetail page={page} locale="fr" />;
}
