"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { oppositeLocalePath, frenchStatus } from "@/components/site-config";

export function LocaleFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lang = pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <div lang={lang}>{children}</div>;
}

export function LocaleSwitch() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  const destination = oppositeLocalePath(pathname);

  return (
    <nav
      className="locale-switch"
      aria-label={isFrench ? "Choisir la langue" : "Choose language"}
    >
      <a
        href={isFrench ? destination : pathname}
        lang="en"
        aria-current={!isFrench ? "page" : undefined}
      >
        EN
      </a>
      <span aria-hidden="true">/</span>
      <a
        href={isFrench ? pathname : destination}
        lang="fr"
        aria-current={isFrench ? "page" : undefined}
      >
        FR
      </a>
    </nav>
  );
}

export function SkipLink() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  return (
    <a className="skip-link" href="#main-content">
      {isFrench ? "Aller au contenu" : "Skip to content"}
    </a>
  );
}

export function TranslationNotice({ enPath }: { enPath: string }) {
  const status = frenchStatus(enPath);
  if (status === "FULL") return null;
  return (
    <p className="translation-notice" role="note">
      <strong>FR · SUMMARY</strong>
      <span>
        Cette page est un résumé français. La documentation complète et les
        fiches détaillées restent en anglais.{" "}
        <a href={enPath}>Open the full English page →</a>
      </span>
    </p>
  );
}
