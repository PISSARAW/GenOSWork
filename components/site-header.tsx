import Link from "next/link";

const links = [
  ["Supervision", "/runtime/supervision"],
  ["Runtime", "/runtime"],
  ["Daemons", "/daemons"],
  ["Topologies", "/topologies"],
  ["Concepts", "/concepts"],
  ["Lab", "/lab"],
  ["Evidence", "/evidence"],
  ["Developers", "/developers"],
];

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <Link className="brand" href="/" aria-label="GenOS home">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span>GenOS<span className="brand-sub">AGENT RUNTIME</span></span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <details className="mobile-nav">
        <summary aria-label="Open site menu">MENU <span>＋</span></summary>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
      </details>
      <a className="header-cta" href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noreferrer">
        Explore GitHub <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}