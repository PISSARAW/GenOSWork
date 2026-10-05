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
  if (!page) return { title: "Capability not found" };
  return {
    title: page.en.name,
    description: page.en.purpose,
    alternates: { canonical: `/en/capabilities/${slug}`, languages: { en: `/en/capabilities/${slug}`, fr: `/fr/capabilities/${slug}` } },
  };
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getCapabilityPage(slug);
  if (!page) notFound();
  return <CapabilityDetail page={page} locale="en" />;
}
