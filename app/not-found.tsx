import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero section-wrap">
      <div className="eyebrow">404 · ROUTE NOT FOUND</div>
      <h1>This branch<br />doesn’t <em>exist.</em></h1>
      <p>The page may have moved, or the route may not be part of this site.</p>
      <div className="hero-actions"><Link className="button button-dark" href="/">Back to GenOS <span>→</span></Link><Link className="button button-quiet" href="/topologies">Explore topologies</Link></div>
    </section>
  );
}
