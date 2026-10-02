"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleSwitch } from "@/components/locale-controls";

const links = [
  ["Supervision", "/runtime/supervision"],
  ["Runtime", "/runtime"],
  ["Topologies", "/topologies"],
  ["Concept Atlas", "/concepts"],
  ["Systems", "/systems"],
  ["Benchmarks", "/benchmarks"],
  ["Lab", "/lab"],
  ["Developers", "/developers"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  const nav = isFrench
    ? [["Présentation", "/fr"], ["Runtime", "/fr/runtime"], ["Topologies", "/fr/topologies"], ["Atlas", "/fr/concepts"], ["API / MCP", "/fr/api-mcp"], ["Développeurs", "/fr/developers"], ["Benchmarks", "/fr/benchmarks"]]
    : links;
  return (
    <header className="site-header" id="top">
      <Link className="brand" href={isFrench ? "/fr" : "/"} aria-label={isFrench ? "Accueil GenOS" : "GenOS home"}>
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span>GenOS<span className="brand-sub">AGENT RUNTIME</span></span>
      </Link>
      <nav className="site-nav" aria-label={isFrench ? "Navigation principale" : "Main navigation"}>
        {nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <details className="mobile-nav">
        <summary aria-label={isFrench ? "Ouvrir le menu" : "Open site menu"}>{isFrench ? "MENU" : "MENU"} <span>＋</span></summary>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
      </details>
      <LocaleSwitch />
      <a className="header-cta" href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noreferrer">
        {isFrench ? "Voir GitHub" : "Explore GitHub"} <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
