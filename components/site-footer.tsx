import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="brand brand-footer" href="/">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>GenOS<span className="brand-sub">AGENT RUNTIME</span></span>
        </Link>
        <p>Execution you can question.<br />State you can come back to.</p>
        <div className="footer-links">
          <Link href="/runtime">Runtime</Link><Link href="/orchestrator">Orchestrator</Link><Link href="/topologies">Topologies</Link><Link href="/morphogenesis">Morphogenesis</Link>
          <Link href="/organizations">Organizations</Link>
          <Link href="/concepts">Concepts</Link>
          <Link href="/research">Research</Link><Link href="/benchmarks">Benchmarks</Link>
          <Link href="/evidence">Evidence</Link>
          <a href="https://github.com/PISSARAW/GenOS/tree/v3/docs" target="_blank" rel="noreferrer">Documentation ↗</a>
          <a href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GENOS AGENT RUNTIME</span>
        <span>BUILT FOR THE BRANCHES THAT DIDN&apos;T WORK</span>
        <Link href="#top">BACK TO TOP ↑</Link>
      </div>
    </footer>
  );
}
