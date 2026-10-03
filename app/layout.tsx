import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LocaleFrame, SkipLink } from "@/components/locale-controls";
import "./globals.css";
import "./supervision.css";
import "./morphogenesis.css";
import "./p2.css";
import "./p3.css";
import "./p4.css";
import "./p4-overview.css";
import "./p5-research.css";

import { siteUrl } from "@/components/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GenOS — Open-source agent runtime and work continuity",
    template: "%s — GenOS Agent Runtime",
  },
  description:
    "GenOS is an open-source agent runtime that preserves decisions, changes, execution context, and evidence so technical work can be reviewed and resumed.",
  openGraph: {
    type: "website",
    siteName: "GenOS Agent Runtime",
    title: "GenOS — Open-source agent runtime and work continuity",
    description: "Review agent work with its decisions, changes, context, and evidence.",
    url: `${siteUrl}/en`,
  },
  twitter: {
    card: "summary_large_image",
    title: "GenOS — Open-source agent runtime and work continuity",
    description: "Review agent work with its decisions, changes, context, and evidence.",
    images: [`${siteUrl}/opengraph-image`],
  },
  alternates: { canonical: "/en", languages: { en: "/en", fr: "/fr" } },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "GenOS",
        url: siteUrl,
        sameAs: ["https://github.com/PISSARAW/GenOS"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "GenOS Agent Runtime",
        url: siteUrl,
        inLanguage: ["en", "fr"],
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
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
