import Image from "next/image";

const navItems = ["Product", "Solutions", "Docs", "Playground", "Pricing", "Blog"];

const lifecycle = [
  {
    label: "Build",
    heading: "Assemble AI systems that can reason, retry, and recover.",
    text: "Design agent workflows with code or no-code, then orchestrate them through a runtime built for long-running execution and explicit control.",
  },
  {
    label: "Test",
    heading: "Validate behavior before your system ever reaches production.",
    text: "Create realistic task traces, score each decision, and turn agent runs into reusable eval datasets that improve quality over time.",
  },
  {
    label: "Deploy",
    heading: "Ship agents onto infrastructure designed for state and scale.",
    text: "Run multi-step execution environments with resilient history, branch isolation, and production-safe execution boundaries.",
  },
  {
    label: "Monitor",
    heading: "Surface drift, failures, and costly mistakes before they spread.",
    text: "Track metrics, signal anomalies, and inspect every action with full provenance across agent runs and workspaces.",
  },
  {
    label: "Govern",
    heading: "Keep every decision inside a trusted policy envelope.",
    text: "Apply permission boundaries, detect sensitive data, and enforce proof gates before a task can be promoted to live operations.",
  },
];

const metrics = [
  { value: "350M+", label: "monthly open source downloads" },
  { value: "7K+", label: "active platform customers" },
  { value: "5", label: "of the Fortune 10 are using agent tooling" },
];

const logos = ["OpenAI", "Anthropic", "Vercel", "AWS", "MongoDB", "GitHub", "Databricks", "Notion"];

const customerStories = [
  {
    quote:
      "GenOS cut our agent debugging cycles from days to minutes, giving every workflow a traceable execution history.",
    author: "Klarna",
    metric: "80% faster case resolution",
  },
  {
    quote:
      "We can now compare branches, replay recovery paths, and hold every output to proof before promotion.",
    author: "Monday.com",
    metric: "8.7x faster eval loops",
  },
  {
    quote:
      "The control plane made our multi-agent workflows explainable, safer, and dramatically easier to operate at scale.",
    author: "ServiceNow",
    metric: "90% fewer escalations",
  },
];

const pillars = [
  { title: "Runtime", text: "Isolated execution, retries, memory-aware orchestration, and deterministic recovery loops." },
  { title: "Genome", text: "Each agent cell carries identity, constraints, and context without behavioral drift." },
  { title: "Memory", text: "Long-term context, provenance, and learning traces across sequential decisions." },
  { title: "Workspaces", text: "Fork, diff, and restore execution branches safely without contaminating live workflows." },
  { title: "Proof Gates", text: "Promote only when evidence, policy, and validation all agree." },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#09090b] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_center,_rgba(134,98,255,0.34),_rgba(134,98,255,0)_60%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Image src="/genos-logo.png" alt="GenOS" width={28} height={28} priority />
            </div>
            <span className="text-lg font-semibold tracking-[-0.05em] text-white">GenOS</span>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-zinc-300 lg:flex">
            {navItems.map((item) => (
              <a key={item} href="#" className="transition hover:text-white">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/10 md:inline-flex">
              GitHub ★
            </button>
            <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#09090b] transition hover:bg-zinc-200">
              Get started
            </button>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 pb-18 pt-18 lg:px-8 lg:pt-22">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-violet-200">
              Agentic runtime
            </div>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[0.94] tracking-[-0.08em] text-white md:text-7xl">
              Own your intelligence.<br />
              Ship systems you can trust.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300 md:text-xl">
              Build, evaluate, deploy, and govern agentic workflows with full provenance, resilient memory, and proof-before-promotion controls.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-[#09090b] transition hover:bg-zinc-200">
                Start building
              </a>
              <a href="#" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:bg-white/10">
                Book a demo
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-semibold tracking-[-0.06em] text-violet-200">{item.value}</div>
                  <div className="mt-2 text-xs leading-5 text-zinc-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-4 rounded-[32px] bg-violet-600/20 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-[#101014] p-4 shadow-[0_40px_80px_rgba(12,11,20,0.9)]">
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7ef7b7]" />
                </div>
                <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-violet-200">
                  runtime active
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#121217] p-5">
                <div className="mb-5 flex items-center justify-between text-xs text-zinc-400">
                  <span>workflow: research_cell_04</span>
                  <span className="font-medium text-violet-200">ready</span>
                </div>

                <div className="space-y-3">
                  {[
                    ["Branch state", "stable"],
                    ["Proof gate", "passed"],
                    ["Promotion risk", "low"],
                    ["Memory traces", "synced"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
                      <span>{label}</span>
                      <span className="font-medium text-violet-200">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-full border border-white/10 bg-white/5 px-6 py-4 text-xs uppercase tracking-[0.22em] text-zinc-400">
          Trusted by teams building the future of work
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 text-center text-sm font-medium uppercase tracking-[0.18em] text-zinc-500 sm:grid-cols-4 lg:grid-cols-8">
          {logos.map((logo) => (
            <div key={logo} className="rounded-xl border border-white/10 bg-white/5 px-3 py-4">
              {logo}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-200">Accelerating the agent development lifecycle</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
            Build, test, deploy, monitor, and govern with one platform.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {lifecycle.map((item) => (
            <article key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <div className="mb-5 inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-violet-200">
                {item.label}
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white">{item.heading}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-200">Why teams choose GenOS</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
              A faster way to own every agent decision.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 h-10 w-10 rounded-2xl bg-violet-500/15 ring-1 ring-violet-500/30" />
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-200">Customer stories</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
            Learn from teams running agents in production.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {customerStories.map((story) => (
            <article key={story.author} className="rounded-[28px] border border-white/10 bg-[#101014] p-6">
              <div className="mb-6 text-3xl text-violet-200">“</div>
              <p className="text-lg leading-8 text-zinc-200">{story.quote}</p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="text-sm font-medium text-white">{story.author}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-violet-200">{story.metric}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-8">
        <div className="rounded-[32px] border border-violet-500/20 bg-[linear-gradient(135deg,#101014_0%,#171720_100%)] p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-200">Get started</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
                The platform for trusted AI execution.
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[#09090b] transition hover:bg-zinc-200">
                Start building
              </a>
              <a href="#" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:bg-white/10">
                Get a demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="flex flex-col gap-10 border-t border-white/10 pt-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Image src="/genos-logo.png" alt="GenOS" width={28} height={28} />
              </div>
              <span className="text-lg font-semibold tracking-[-0.05em] text-white">GenOS</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-400">
              The agentic runtime for building, evaluating, securing, and operating AI systems with proof and trust built in.
            </p>
          </div>

          <div className="grid gap-8 text-sm text-zinc-400 sm:grid-cols-3">
            <div>
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-200">Product</div>
              <ul className="space-y-2">
                <li>Runtime</li>
                <li>Genome</li>
                <li>Memory</li>
                <li>Workspaces</li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-200">Resources</div>
              <ul className="space-y-2">
                <li>Docs</li>
                <li>API</li>
                <li>Blog</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-200">Company</div>
              <ul className="space-y-2">
                <li>About</li>
                <li>Careers</li>
                <li>Trust</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
