"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, genosRepo } from "@/components/site-config";

export function SiteFooter() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="brand brand-footer" href={isFrench ? "/fr" : "/"}>
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            GenOS<span className="brand-sub">AGENT RUNTIME</span>
          </span>
        </Link>
        <p>
          {isFrench ? (
            <>
              Une exécution que vous pouvez examiner.
              <br />
              Un état que vous pouvez retrouver.
            </>
          ) : (
            <>
              Execution you can question.
              <br />
              State you can come back to.
            </>
          )}
        </p>
        <div className="footer-links footer-links-groups">
          {primaryNav.map((entry) => (
            <div className="footer-group" key={entry.id}>
              <Link
                className="footer-group-title"
                href={isFrench ? entry.hrefFr : entry.hrefEn}
              >
                {isFrench ? entry.labelFr : entry.labelEn}
              </Link>
              {(isFrench
                ? entry.childrenFr ?? entry.children
                : entry.children
              ).map((child) => (
                <Link key={child.href} href={child.href}>
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="footer-group">
            <span className="footer-group-title">Source</span>
            <a href={`${genosRepo}/tree/v3/docs`} target="_blank" rel="noreferrer">
              {isFrench ? "Documentation source ↗" : "Source documentation ↗"}
            </a>
            <a href={genosRepo} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GENOS AGENT RUNTIME</span>
        <span>
          {isFrench
            ? "COMPRENDRE · EXPÉRIMENTER · VÉRIFIER"
            : "UNDERSTAND · EXPERIMENT · VERIFY"}
        </span>
        <Link href="#top">{isFrench ? "HAUT DE PAGE ↑" : "BACK TO TOP ↑"}</Link>
      </div>
    </footer>
  );
}
