import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = { title: "Developers", description: "Build with GenOS: open-source Rust runtime, Node.js control plane, CLI and MCP integrations.", alternates: { canonical: "/developers" } };

export default function DevelopersPage() {
  return (
    <div className="page-shell">
      <section className="page-hero section-wrap developer-hero">
        <Eyebrow>DEVELOPERS · OPEN SOURCE</Eyebrow>
        <h1>Try it. Trace it.<br /><em>Change it.</em></h1>
        <p>GenOS is a polyglot agent runtime with a Rust workspace, Node.js control plane, CLI and MCP interfaces. Start with the zero-token safe debugging example, then follow its evidence into the source.</p>
        <div className="hero-actions"><a className="button button-dark" href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noreferrer">Browse the repository <span>↗</span></a><a className="button button-quiet" href="https://github.com/PISSARAW/GenOS/tree/main/examples/safe-debugging-demo" target="_blank" rel="noreferrer">Zero-token demo <span>↗</span></a></div>
      </section>
      <section className="section-wrap section-space dev-start">
        <div><Eyebrow>QUICK START</Eyebrow><h2>Run the runtime <em>locally.</em></h2><p>Install the required Rust and Node.js versions, clone GenOS and build the workspace. The safe debugging demo does not need an API key.</p><a className="text-link" href="https://github.com/PISSARAW/GenOS#setup" target="_blank" rel="noreferrer">Full setup guide <span>↗</span></a></div>
        <div className="terminal-card"><div className="terminal-top"><span><i /><i /><i /></span><span>LOCAL DEVELOPMENT</span><span>RUST · NODE</span></div><pre><code><span className="term-muted"># Clone GenOS</span>{"\n"}git clone https://github.com/PISSARAW/GenOS.git{"\n"}cd GenOS{"\n\n"}<span className="term-muted"># Build the Rust workspace</span>{"\n"}cargo build --workspace{"\n\n"}<span className="term-muted"># Explore the CLI</span>{"\n"}cargo run -p genos-cli -- --help</code></pre><div className="terminal-foot"><span>RUST 1.88+ · NODE 20.19+</span><a href="https://github.com/PISSARAW/GenOS#how-to-use-it-without-going-insane" target="_blank" rel="noreferrer">MORE DOCS ↗</a></div></div>
      </section>
      <section className="dev-links-wrap"><div className="section-wrap dev-links"><Eyebrow>PROJECT SURFACES</Eyebrow><a href="https://github.com/PISSARAW/GenOS/tree/main/crates" target="_blank" rel="noreferrer"><span>01</span><strong>Rust workspace</strong><small>Runtime core and CLI</small><b>↗</b></a><a href="https://github.com/PISSARAW/GenOS/tree/main/backend" target="_blank" rel="noreferrer"><span>02</span><strong>Node.js control plane</strong><small>REST, gRPC and persistence</small><b>↗</b></a><a href="https://github.com/PISSARAW/GenOS/tree/main/mcp" target="_blank" rel="noreferrer"><span>03</span><strong>MCP interfaces</strong><small>Local tool access under lease</small><b>↗</b></a><a href="https://github.com/PISSARAW/GenOS/tree/main/docs" target="_blank" rel="noreferrer"><span>04</span><strong>Documentation</strong><small>Architecture, contracts and evidence</small><b>↗</b></a></div></section>
      <section className="section-wrap dev-note"><strong>Safety is part of the interface.</strong><p>GenOS validates paths and tool arguments, enforces leases and uses promotion gates. Keep those boundaries in place when building integrations.</p></section>
    </div>
  );
}
