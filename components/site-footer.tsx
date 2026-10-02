"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="brand brand-footer" href="/">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>GenOS<span className="brand-sub">AGENT RUNTIME</span></span>
        </Link>
        <p>{isFrench ? <>Une exécution que vous pouvez examiner.<br />Un état que vous pouvez retrouver.</> : <>Execution you can question.<br />State you can come back to.</>}</p>
        <div className="footer-links">
          {isFrench ? <><Link href="/fr">Présentation</Link><Link href="/fr/runtime">Runtime</Link><Link href="/fr/orchestrator">Orchestration</Link><Link href="/fr/topologies">Topologies</Link><Link href="/fr/morphogenesis">Morphogenèse</Link><Link href="/fr/organizations">Organisations</Link><Link href="/fr/concepts">Atlas des concepts</Link><Link href="/fr/systems">Systèmes</Link><Link href="/fr/research">Recherche</Link><Link href="/fr/evidence">Preuves</Link><Link href="/fr/developers">Développeurs</Link><Link href="/fr/api-mcp">Référence API / MCP</Link><Link href="/fr/benchmarks">Benchmarks</Link><Link href="/fr/runs">Exécutions archivées</Link><Link href="/fr/sandbox">Sandbox GenOS</Link></> : <><Link href="/runtime">Runtime</Link><Link href="/orchestrator">Orchestrator</Link><Link href="/topologies">Topologies</Link><Link href="/morphogenesis">Morphogenesis</Link><Link href="/organizations">Organizations</Link><Link href="/concepts">Concept Atlas</Link><Link href="/systems">Systems</Link><Link href="/research">Research</Link><Link href="/benchmarks">Benchmarks</Link><Link href="/evidence">Evidence</Link><Link href="/api-mcp">API / MCP reference</Link></>}
          <a href="https://github.com/PISSARAW/GenOS/tree/v3/docs" target="_blank" rel="noreferrer">{isFrench ? "Documentation source ↗" : "Source documentation ↗"}</a>
          <a href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GENOS AGENT RUNTIME</span>
        <span>{isFrench ? "CONÇU POUR LES PISTES QUI N’ONT PAS ABOUTI" : "BUILT FOR THE BRANCHES THAT DIDN&apos;T WORK"}</span>
        <Link href="#top">{isFrench ? "HAUT DE PAGE ↑" : "BACK TO TOP ↑"}</Link>
      </div>
    </footer>
  );
}
