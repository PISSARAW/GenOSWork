"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleSwitch } from "@/components/locale-controls";
import { primaryNav } from "@/components/site-config";

export function SiteHeader() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  const isEnglishPrefix = pathname === "/en" || pathname.startsWith("/en/");
  const englishHref = (href: string) => isEnglishPrefix ? `/en${href === "/" ? "" : href}` : href;
  return (
    <header className="site-header" id="top">
      <Link
        className="brand"
        href={isFrench ? "/fr" : englishHref("/")}
        aria-label={isFrench ? "Accueil GenOS" : "GenOS home"}
      >
        <span className="brand-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>
          GenOS<span className="brand-sub">WORK CONTINUITY</span>
        </span>
      </Link>
      <nav
        className="site-nav site-nav-groups"
        aria-label={isFrench ? "Navigation principale" : "Main navigation"}
      >
        {primaryNav.map((entry) => (
          <div className="nav-group" key={entry.id}>
            <Link
              className="nav-group-label"
              href={isFrench ? entry.hrefFr : englishHref(entry.hrefEn)}
              title={isFrench ? entry.questionFr : entry.questionEn}
            >
              {isFrench ? entry.labelFr : entry.labelEn}
            </Link>
            <div className="nav-panel" role="menu">
              <p className="nav-panel-question">
                {isFrench ? entry.questionFr : entry.questionEn}
              </p>
              {(isFrench
                ? entry.childrenFr ?? entry.children
                : entry.children
              ).map((child) => (
                <Link key={child.href} href={isFrench ? child.href : englishHref(child.href)} role="menuitem">
                  {child.label}
                  {child.note && <small>{child.note}</small>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <details className="mobile-nav">
        <summary aria-label={isFrench ? "Ouvrir le menu" : "Open site menu"}>
          MENU <span>＋</span>
        </summary>
        <nav aria-label="Mobile navigation">
          {primaryNav.map((entry) => (
            <Link
              key={entry.id}
              href={isFrench ? entry.hrefFr : englishHref(entry.hrefEn)}
            >
              {isFrench ? entry.labelFr : entry.labelEn}
            </Link>
          ))}
          {primaryNav.flatMap((entry) =>
            (isFrench ? entry.childrenFr ?? entry.children : entry.children).map(
              (child) => (
                <Link
                  key={`${entry.id}-${child.href}`}
                  href={isFrench ? child.href : englishHref(child.href)}
                  className="mobile-nav-child"
                >
                  {"— "}
                  {child.label}
                </Link>
              ),
            ),
          )}
        </nav>
      </details>
      <LocaleSwitch />
      <a
        className="header-cta"
        href="https://github.com/PISSARAW/GenOS"
        target="_blank"
        rel="noreferrer"
      >
        {isFrench ? "Voir GitHub" : "Explore GitHub"}{" "}
        <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
