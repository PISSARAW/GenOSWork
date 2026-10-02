"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const frenchPaths: Record<string, string> = {
  "/": "/fr",
  "/developers": "/fr/developers",
  "/api-mcp": "/fr/api-mcp",
  "/benchmarks": "/fr/benchmarks",
  "/runs": "/fr/runs",
  "/sandbox": "/fr/sandbox",
};

const englishPaths = Object.fromEntries(Object.entries(frenchPaths).map(([english, french]) => [french, english]));

export function LocaleFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lang = pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <div lang={lang}>{children}</div>;
}

export function LocaleSwitch() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  const destination = isFrench
    ? englishPaths[pathname] ?? (pathname.replace(/^\/fr(?=\/|$)/, "") || "/")
    : frenchPaths[pathname] ?? `/fr${pathname === "/" ? "" : pathname}`;

  return <nav className="locale-switch" aria-label={isFrench ? "Choisir la langue" : "Choose language"}>
    <a href={isFrench ? destination : pathname} lang="en" aria-current={!isFrench ? "page" : undefined}>EN</a>
    <span aria-hidden="true">/</span>
    <a href={isFrench ? pathname : destination} lang="fr" aria-current={isFrench ? "page" : undefined}>FR</a>
  </nav>;
}

export function SkipLink() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  return <a className="skip-link" href="#main-content">{isFrench ? "Aller au contenu" : "Skip to content"}</a>;
}
