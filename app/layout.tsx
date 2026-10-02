import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LocaleFrame, SkipLink } from "@/components/locale-controls";
import { headers } from "next/headers";
import "./globals.css";
import "./supervision.css";
import "./morphogenesis.css";
import "./p2.css";
import "./p3.css";
import "./p4.css";
import "./p4-overview.css";

const siteUrl = "https://genoswork.vercel.app";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GenOS — An agent runtime built for what happens next",
    template: "%s — GenOS Agent Runtime",
  },
  description:
    "GenOS is an open-source agent runtime for versioned state, counterfactual execution, supervised orchestration and evidence-aware promotion.",
  openGraph: {
    type: "website",
    siteName: "GenOS Agent Runtime",
    title: "GenOS — An agent runtime built for what happens next",
    description: "Fork a trajectory. Inspect the evidence. Decide what earns promotion.",
    url: siteUrl,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = (await headers()).get("x-genos-locale") === "fr" ? "fr" : "en";
  return (
    <html lang={locale}>
      <body>
        <LocaleFrame>
        <SkipLink />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        </LocaleFrame>
      </body>
    </html>
  );
}
