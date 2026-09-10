const pillars = [
  {
    title: "Runtime agentique",
    description:
      "Branches, snapshots, reprise après échec, budgets de ressources et orchestration explicite pour des agents qui doivent tenir la route en production.",
  },
  {
    title: "Génome & épigénétique",
    description:
      "Chaque cellule d’exécution porte son propre génome, ses contraintes, ses capacités et son contexte d’adaptation sans dérive de comportement.",
  },
  {
    title: "Mémoire & synapses",
    description:
      "Traçabilité des décisions, apprentissage contextuel, connectome propositionnel et conservation des preuves dans le bon espace temporel.",
  },
  {
    title: "Workspaces & contre-factuel",
    description:
      "Forks de contexte, états isolés et scénarios de validation sans polluer le flux principal ni casser la confiance des opérateurs.",
  },
  {
    title: "Proof Gates",
    description:
      "Validation avant promotion : chaque action est vérifiée, pondérée, expliquée et prouvée avant d’être acceptée comme décision active.",
  },
];

const differentiators = [
  {
    label: "Live evidence",
    text: "Visualiser les branches, les preuves et les contre-factuels pendant l’exécution, pas seulement après coup.",
  },
  {
    label: "Bilingual by design",
    text: "Le marché IA est encore trop anglais ; GenOS a une vraie proposition FR/EN avec une identité claire et locale.",
  },
  {
    label: "Trust first",
    text: "Les modèles ne promettent pas le succès ; GenOS exige une preuve avant promotion, avec traçabilité et auditabilité.",
  },
];

const stack = [
  "Next.js 15",
  "TypeScript",
  "Tailwind CSS",
  "React Server Components",
  "Fumadocs",
  "PostHog",
  "Sentry",
  "WebContainers",
];

const metrics = [
  { value: "5", label: "piliers produit" },
  { value: "FR/EN", label: "positionnement global" },
  { value: "∞", label: "branches et scénarios" },
  { value: "100%", label: "preuve avant promotion" },
];

const compareRows = [
  ["LangChain", "Documentation massive et observabilité, mais peu de preuve de validité avant promotion."],
  ["CrewAI", "Marketplace de crews et builder rapide, mais faible notion de provenance et de validation active."],
  ["AutoGen", "Benchmarks académiques, mais peu de positionnement sécurité / fiabilité / trust."],
  ["GenOS", "Runtime biomimétique de confiance : evidence, branches, mémoire, isolation et promotion contrôlée."],
];

export default function Home() {
  return (
    <main className="relative overflow-hidden text-white">
      <div className="bg-grid absolute inset-0 opacity-30" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#051611]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#89f7c7]/30 bg-[#0b2b25] text-sm font-semibold text-[#89f7c7]">
              G
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">GenOS</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#9adfc3]">
                V3
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-[#d7efe6] lg:flex">
            <a href="#product" className="transition hover:text-white">Product</a>
            <a href="#solutions" className="transition hover:text-white">Solutions</a>
            <a href="#docs" className="transition hover:text-white">Docs</a>
            <a href="#playground" className="transition hover:text-white">Playground</a>
            <a href="#benchmarks" className="transition hover:text-white">Benchmarks</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="#blog" className="transition hover:text-white">Blog</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-[#dffaf0] transition hover:bg-white/5 md:inline-flex">
              GitHub ★
            </button>
            <button className="rounded-full bg-[#89f7c7] px-4 py-2 text-sm font-semibold text-[#031711] transition hover:bg-[#b4ffd9]">
              Get Started →
            </button>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="aurora mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#89f7c7]/30 bg-[#0d261f]/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#b9f5d8]">
            proof before promotion
          </div>

          <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
            The runtime for agentic systems that must be trusted, not just fast.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#c7e9dc] md:text-xl">
            GenOS turns autonomous agents into auditable cellular execution units: isolated branches, memory, provenance, decision gates and recovery loops designed for real-world deployment.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#product"
              className="rounded-full bg-[#89f7c7] px-6 py-3 text-sm font-semibold text-[#041b15] transition hover:bg-[#b9fddf]"
            >
              Explore the platform
            </a>
            <a
              href="#playground"
              className="rounded-full border border-white/15 bg-white/0 px-6 py-3 text-sm font-semibold text-[#ecfff7] transition hover:bg-white/5"
            >
              Run GenOS in browser
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="glass rounded-2xl p-5 text-left">
                <div className="text-3xl font-semibold text-[#89f7c7]">{metric.value}</div>
                <div className="mt-2 text-sm text-[#b5d9ca]">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-5 text-xs uppercase tracking-[0.22em] text-[#8ec7af]">
          <span>Built for</span>
          <div className="flex flex-wrap gap-6 text-[#d7efe6]">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#9fe7c4]">Product</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            A biomimetic operating system for agentic execution.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="glass noise relative rounded-3xl p-6">
              <div className="mb-5 h-11 w-11 rounded-2xl bg-[#173f35] ring-1 ring-[#89f7c7]/20" />
              <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#cfe9df]">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="solutions" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#9fe7c4]">Why it matters</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              Built to replace “it worked once” with “it was proven.”
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {differentiators.map((d) => (
              <div key={d.label} className="glass rounded-3xl p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-[#89f7c7]">{d.label}</div>
                <p className="mt-4 text-base leading-7 text-[#dfeee7]">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="docs" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="glass rounded-[32px] p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#9fe7c4]">Architecture</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                One control plane. Multiple execution cells.
              </h2>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-[#89f7c7]/15 bg-[#112722] p-5">
                <div className="text-sm font-medium text-[#89f7c7]">Control plane</div>
                <p className="mt-2 text-[#d7efe6]">
                  Orchestration, policy, runtime arbiters, evidence gates and public APIs for operators, developers and AI teams.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-[#89f7c7]/15 bg-[#112722] p-5">
                  <div className="text-sm font-medium text-[#89f7c7]">Execution layer</div>
                  <p className="mt-2 text-[#d7efe6]">
                    Agents, cells, observability, memory, workspaces and branches are kept isolated, comparable and recoverable.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#89f7c7]/15 bg-[#112722] p-5">
                  <div className="text-sm font-medium text-[#89f7c7]">Trust layer</div>
                  <p className="mt-2 text-[#d7efe6]">
                    Security, provenance, compliance, governance and audit logs convert uncertainty into explicit proof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benchmarks" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#9fe7c4]">Comparatif</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
            Better than static agent tooling. Built for trust and real deployment.
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#081c18]/80">
          <table className="w-full text-left text-sm text-[#dcefe8]">
            <thead className="bg-[#0d2b25] text-[#9fe7c4]">
              <tr>
                <th className="px-5 py-4 font-medium">Ecosystème</th>
                <th className="px-5 py-4 font-medium">Limite du marché</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map(([name, text]) => (
                <tr key={name} className="border-t border-white/10">
                  <td className="px-5 py-4 font-semibold text-white">{name}</td>
                  <td className="px-5 py-4 text-[#d4ece2]">{text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="playground" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#9fe7c4]">Playground</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              Run GenOS in your browser.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[#cfe8df]">
              A live runtime where developers can fork a workspace, compare branches, inspect proofs and resume after failure without leaving the browser.
            </p>
          </div>

          <div className="glass rounded-[30px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff7d7d]" />
                <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
                <span className="h-3 w-3 rounded-full bg-[#7ef7b7]" />
              </div>
              <div className="rounded-full border border-[#89f7c7]/20 bg-[#102b24] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#a8f0cf]">
                runtime active
              </div>
            </div>

            <div className="rounded-2xl border border-[#89f7c7]/15 bg-[#071c18] p-5">
              <div className="mb-3 flex items-center justify-between text-sm text-[#bfe9d8]">
                <span>agent: research_cell_04</span>
                <span className="text-[#89f7c7]">ready</span>
              </div>
              <div className="space-y-3 text-sm text-[#dfeee7]">
                <div className="flex items-center justify-between rounded-xl bg-[#0d2a24] px-3 py-2">
                  <span>Branch state</span>
                  <span className="text-[#89f7c7]">stable</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#0d2a24] px-3 py-2">
                  <span>Proof gate</span>
                  <span className="text-[#89f7c7]">passed</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#0d2a24] px-3 py-2">
                  <span>Promotion risk</span>
                  <span className="text-[#89f7c7]">low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="glass rounded-[32px] p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#9fe7c4]">Pricing</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                Open-source core. Enterprise trust layer.
              </h2>
            </div>
            <div className="rounded-full border border-[#89f7c7]/20 bg-[#102b24] px-4 py-2 text-sm text-[#cff5e1]">
              Open source core + cloud + enterprise
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-8">
        <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row">
          <div>
            <div className="text-xl font-semibold">GenOS</div>
            <p className="mt-3 max-w-sm text-[#badbc8]">
              Runtime agentique biomimétique pour exécuter, comparer, sécuriser et promouvoir des décisions d’IA avec preuve explicite.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 text-sm text-[#d8efe5]">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9fe7c4]">Product</div>
              <ul className="space-y-2">
                <li>Runtime</li>
                <li>Genome</li>
                <li>Memory</li>
                <li>Workspaces</li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9fe7c4]">Developer</div>
              <ul className="space-y-2">
                <li>Docs</li>
                <li>CLI</li>
                <li>API</li>
                <li>Benchmarks</li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9fe7c4]">Company</div>
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
