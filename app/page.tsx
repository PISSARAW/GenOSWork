import Image from "next/image";

const pillars = [
  {
    title: "Runtime",
    description:
      "Executions isolated, snapshots, retries, memory-aware orchestration, and deterministic recovery loops for production agent systems.",
  },
  {
    title: "Genome",
    description:
      "Each agent cell carries its own genome, constraints, identity, and context adaptations without behavioral drift.",
  },
  {
    title: "Memory",
    description:
      "Long-term context, synaptic traces, provenance, and learning loops that preserve trust across decision chains.",
  },
  {
    title: "Workspaces",
    description:
      "Fork, compare, isolate, and restore states to test counterfactuals without contaminating the main execution path.",
  },
  {
    title: "Proof Gates",
    description:
      "Every action is checked, weighted, and proven before promotion — making reliability part of the product experience.",
  },
];

const differentiators = [
  {
    label: "Evidence-first",
    text: "Trace every decision, branch, and validation to a proof object instead of a vague success signal.",
  },
  {
    label: "Bilingual",
    text: "A product that speaks to global teams from day one, without forcing a monolingual English-only story.",
  },
  {
    label: "Production-grade trust",
    text: "Security, compliance, workspace isolation, and recoverability are core product features, not add-ons.",
  },
];

const brands = ["Next.js", "TypeScript", "Tailwind CSS", "Fumadocs", "PostHog", "Sentry", "WebContainers"];

const statCards = [
  { value: "5", label: "core pillars" },
  { value: "∞", label: "execution branches" },
  { value: "FR/EN", label: "global positioning" },
  { value: "100%", label: "proof before promotion" },
];

const matrix = [
  ["LangChain", "Massive docs and observability, but limited proof-before-promotion for live decision reliability."],
  ["CrewAI", "Fast builder and crew marketplace, yet weaker provenance and rigorous validation of agent outcomes."],
  ["AutoGen", "Research-driven benchmarks, but less emphasis on security, trust, and deployable reliability."],
  ["GenOS", "Biomimetic runtime built around trust, provenance, memory, recovery, and controlled promotion."],
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-white text-[#111827]">
      <div className="top-glow absolute inset-x-0 top-0 h-[540px]" />

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
              <Image src="/genos-logo.png" alt="GenOS logo" width={64} height={64} priority />
            </div>
            <div className="text-xl font-semibold tracking-[-0.04em] text-slate-900">GenOS</div>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-slate-600 lg:flex">
            <a href="#product" className="transition hover:text-slate-900">Product</a>
            <a href="#solutions" className="transition hover:text-slate-900">Solutions</a>
            <a href="#docs" className="transition hover:text-slate-900">Docs</a>
            <a href="#playground" className="transition hover:text-slate-900">Playground</a>
            <a href="#benchmarks" className="transition hover:text-slate-900">Benchmarks</a>
            <a href="#pricing" className="transition hover:text-slate-900">Pricing</a>
            <a href="#blog" className="transition hover:text-slate-900">Blog</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 md:inline-flex">
              GitHub ★
            </button>
            <button className="rounded-full bg-[#7f5af0] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_25px_rgba(127,90,240,0.25)] transition hover:bg-[#6a49de]">
              Get Started →
            </button>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="hero-grid absolute inset-0 -z-10 opacity-60" />

        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex rounded-full border border-[#e9d5ff] bg-[#f5f0ff] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#5b3ec5]">
            proof before promotion
          </div>

          <h1 className="text-balance text-5xl font-semibold tracking-[-0.07em] text-slate-950 md:text-7xl">
            The agentic runtime for systems that need trust, not just speed.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            GenOS gives autonomous agents a controlled execution model: memory, branches, safety gates, provenance, and recovery loops built for production reliability.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#product"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Explore the platform
            </a>
            <a
              href="#playground"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Run in browser
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <div key={card.label} className="soft-panel rounded-2xl p-5 text-left">
                <div className="text-3xl font-semibold tracking-[-0.05em] text-[#5b3ec5]">{card.value}</div>
                <div className="mt-2 text-sm text-slate-500">{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-5 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          <span>Built for</span>
          <div className="flex flex-wrap gap-6 text-slate-600">
            {brands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5b3ec5]">Product</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            A biomimetic operating system for agentic execution.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="soft-panel rounded-3xl p-6">
              <div className="mb-5 h-11 w-11 rounded-2xl bg-[#f3ecff] ring-1 ring-[#d9c9ff]" />
              <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="solutions" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_2fr] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5b3ec5]">Why it matters</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              Built to replace “it worked once” with “it was proven.”
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {differentiators.map((item) => (
              <div key={item.label} className="soft-panel rounded-3xl p-6">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#5b3ec5]">{item.label}</div>
                <p className="mt-4 text-base leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="docs" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="soft-panel rounded-[32px] p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1.9fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5b3ec5]">Architecture</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                One control plane. Multiple execution cells.
              </h2>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-semibold text-[#5b3ec5]">Control plane</div>
                <p className="mt-2 text-slate-600">
                  Orchestration, policy, evidence gates, and public APIs for teams building trustworthy autonomous systems.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-[#5b3ec5]">Execution layer</div>
                  <p className="mt-2 text-slate-600">
                    Isolated workspaces, memory traces, branch comparisons, and recoverable execution states.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-[#5b3ec5]">Trust layer</div>
                  <p className="mt-2 text-slate-600">
                    Security, provenance, and governance convert uncertain actions into explicit proof before promotion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benchmarks" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5b3ec5]">Comparison</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Better than static agent tooling. Built for real deployment and trust.
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-5 py-4 font-semibold">Ecosystem</th>
                <th className="px-5 py-4 font-semibold">Market gap</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map(([name, text]) => (
                <tr key={name} className="border-t border-slate-200">
                  <td className="px-5 py-4 font-semibold text-slate-900">{name}</td>
                  <td className="px-5 py-4 text-slate-600">{text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="playground" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.8fr] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5b3ec5]">Playground</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              Run GenOS in your browser.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
              Fork a workspace, compare execution branches, inspect proofs, and resume after failure without leaving the browser.
            </p>
          </div>

          <div className="soft-panel rounded-[30px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff7d7d]" />
                <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
                <span className="h-3 w-3 rounded-full bg-[#7ef7b7]" />
              </div>
              <div className="rounded-full border border-[#d9c9ff] bg-[#f5f0ff] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#5b3ec5]">
                runtime active
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-700">
                <span>agent: research_cell_04</span>
                <span className="font-medium text-[#5b3ec5]">ready</span>
              </div>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200">
                  <span>Branch state</span>
                  <span className="font-medium text-[#5b3ec5]">stable</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200">
                  <span>Proof gate</span>
                  <span className="font-medium text-[#5b3ec5]">passed</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200">
                  <span>Promotion risk</span>
                  <span className="font-medium text-[#5b3ec5]">low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="soft-panel rounded-[32px] p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5b3ec5]">Pricing</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                Open-source core. Enterprise trust layer.
              </h2>
            </div>
            <div className="rounded-full border border-[#d9c9ff] bg-[#f5f0ff] px-4 py-2 text-sm text-[#4d3ab3]">
              Open source core + cloud + enterprise
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-8">
        <div className="flex flex-col justify-between gap-8 border-t border-slate-200 pt-8 md:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                <Image src="/genos-logo.png" alt="GenOS logo" width={44} height={44} />
              </div>
              <div className="text-xl font-semibold text-slate-950">GenOS</div>
            </div>
            <p className="mt-4 max-w-sm text-slate-600">
              Agentic runtime for executing, comparing, securing, and promoting AI decisions with explicit proof.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 text-sm text-slate-600">
            <div>
              <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#5b3ec5]">Product</div>
              <ul className="space-y-2">
                <li>Runtime</li>
                <li>Genome</li>
                <li>Memory</li>
                <li>Workspaces</li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#5b3ec5]">Developer</div>
              <ul className="space-y-2">
                <li>Docs</li>
                <li>CLI</li>
                <li>API</li>
                <li>Benchmarks</li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#5b3ec5]">Company</div>
              <ul className="space-y-2">
                <li>About</li>
                <li>Careers</li>
                <li>Trust</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
