import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { genosSource, genosSourceCommit } from "@/components/product-evidence";

export const metadata: Metadata = { title: "Developers", description: "Build with GenOS: open-source Rust runtime, Node.js control plane, CLI and MCP integrations.", alternates: { canonical: "/en/developers" } };

export default function DevelopersPage() {
  return (
    <div className="page-shell">
      <section className="page-hero section-wrap developer-hero">
        <Eyebrow>DEVELOPERS · OPEN SOURCE</Eyebrow>
        <h1>Try it. Trace it.<br /><em>Change it.</em></h1>
        <p>GenOS is a polyglot agent runtime with a Rust workspace, Node.js control plane, CLI and MCP interfaces. Start with the zero-token safe debugging example, then follow its evidence into the source.</p>
        <div className="hero-actions"><a className="button button-dark" href={`https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}`} target="_blank" rel="noreferrer">Browse reviewed source <span>↗</span></a><a className="button button-quiet" href={genosSource("examples/safe-debugging-demo/README.md")} target="_blank" rel="noreferrer">Zero-token demo <span>↗</span></a><a className="button button-quiet" href="/api-mcp">REST / MCP reference <span>→</span></a></div>
      </section>
      <section className="section-wrap section-space dev-start">
        <div><Eyebrow>QUICK START</Eyebrow><h2>Run the runtime <em>locally.</em></h2><p>Use Rust stable 1.88+, Node.js 22.12+, Git and native C/C++ build tools. Install each workspace’s dependencies. The zero-token demo exercises local state mechanics without a model or API key; it does not prove replay of arbitrary external commands.</p><a className="text-link" href={genosSource("README.md")} target="_blank" rel="noreferrer">Full setup guide <span>↗</span></a></div>
        <div className="terminal-card"><div className="terminal-top"><span><i /><i /><i /></span><span>LOCAL DEVELOPMENT</span><span>RUST · NODE</span></div><pre><code><span className="term-muted"># Clone and install dependencies</span>{"\n"}git clone https://github.com/PISSARAW/GenOS.git{"\n"}cd GenOS{"\n"}git checkout {genosSourceCommit}{"\n"}npm ci{"\n"}npm ci --prefix backend{"\n"}npm ci --prefix mcp{"\n"}cargo build --workspace{"\n\n"}<span className="term-muted"># Zero-token demo · Windows / cross-platform</span>{"\n"}node examples/safe-debugging-demo/run-demo.mjs target/debug/genos{"\n\n"}<span className="term-muted"># Backend · configure .env before model missions</span>{"\n"}cp .env.example .env{"\n"}npm --prefix backend start</code></pre><div className="terminal-foot"><span>RUST 1.88+ · NODE 22.12+ · SQLITE NATIVE BUILD TOOLS</span><a href={genosSource("examples/safe-debugging-demo/README.md")} target="_blank" rel="noreferrer">DEMO CONTRACT ↗</a></div></div>
      </section>
      <section className="section-wrap dev-note"><strong>First model mission</strong><p>Start an Ollama or other configured model server and make the chosen model available before dispatch. The example environment selects Ollama but does not download a model. MCP stdio exposes no tools without <code>GENOS_MCP_LEASE</code>; authorize only the named tools needed by the client. Backend HTTP calls additionally require the configured credentials and tenant scope.</p><a href={genosSource("mcp/README.md")} target="_blank" rel="noreferrer">MCP lease and client setup ↗</a></section>
      <section className="dev-links-wrap"><div className="section-wrap dev-links"><Eyebrow>PROJECT SURFACES</Eyebrow><a href={`https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}/crates`} target="_blank" rel="noreferrer"><span>01</span><strong>Rust workspace</strong><small>Runtime core and CLI</small><b>↗</b></a><a href={`https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}/backend`} target="_blank" rel="noreferrer"><span>02</span><strong>Node.js control plane</strong><small>REST, gRPC and persistence</small><b>↗</b></a><a href={`https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}/mcp`} target="_blank" rel="noreferrer"><span>03</span><strong>MCP interfaces</strong><small>Local tool access under lease</small><b>↗</b></a><a href={`https://github.com/PISSARAW/GenOS/tree/${genosSourceCommit}/docs`} target="_blank" rel="noreferrer"><span>04</span><strong>Documentation</strong><small>Architecture, contracts and evidence</small><b>↗</b></a></div></section>
      <section className="section-wrap dev-note"><strong>Safety is part of the interface.</strong><p>GenOS validates paths and tool arguments, enforces leases and uses promotion gates. Keep those boundaries in place when building integrations.</p></section>
    </div>
  );
}
