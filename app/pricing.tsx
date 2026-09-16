import Link from "next/link";

const plans = [
  {
    nom: "Community",
    prix: "Free",
    period: "Alpha",
    description: "Pour les développeurs qui veulent explorer GenOS et contribuer à l'écosystème.",
    couleur: "bg-[#1a1f2c] border-[#1e2430]",
    badge: "Alpha",
    badgeColor: "bg-[#f59e0b]/20 text-[#f59e0b]",
    features: [
      "GénOS CLI (Rust)",
      "Snapshots, forks, diffs, replay",
      "AgentWorld Capsules (hardlink isolation)",
      "GenOS Studio (local control plane)",
      "Exemples et démos",
      "Documentation complète",
      "License Apache 2.0",
    ],
    cta: "Télécharger l'alpha",
    ctaLink: "https://github.com/PISSARAW/GenOS/releases/tag/v0.0.1-alpha.1",
    ctaExternal: true,
  },
  {
    nom: "Profil Enterprise",
    prix: "Sur demande",
    period: null,
    description: "Pour les organisations qui veulent déployer GenOS en production avec support et garanties.",
    couleur: "bg-gradient-to-br from-[#5b4fcf]/10 to-[#3d33a0]/10 border-[#5b4fcf]/30",
    badge: null,
    badgeColor: null,
    features: [
      "Tout ce qu'offre Community",
      "Accès anticipé aux versions bêta",
      "Support technique prioritaire",
      "Consultation d'architecture",
      "Intégration sur site (BYOC)",
      "Guichet d'assurance qualité",
      "Gestion conformité (roadmap)",
      "SLA personnalisé",
    ],
    cta: "Nous contacter",
    ctaLink: "#contact",
    ctaExternal: false,
  },
];

const faq = [
  {
    q: "GenOS est-il prêt pour la production ?",
    a: "Non encore. GenOS est en phase alpha (v0.0.1). Les interfaces peuvent changer avant la version 0.1.0. Ce n'est pas encore une frontière de sécurité de production. Pour des cas d'usage critiques, attendez la version 1.0.0 ou contactez-nous pour un engagement sur mesure.",
  },
  {
    q: "Quels sont les prérequis pour utiliser GenOS ?",
    a: "Pour l'alpha actuelle : Rust 1.88+, Git, et Bash (Linux/macOS) ou PowerShell (Windows). GenOS Studio requiert Node.js 20.19+ ou 22.12+ avec npm. Aucune clé de modèle n'est requise pour les démos.",
  },
  {
    q: "Quelle est la différence avec LangChain, LangGraph, CrewAI ou AutoGen ?",
    a: "La plupart de ces frameworks avancent sur une timeline mutable. GenOS traite l'état agent comme du versionné : snapshots, forks, branches isolées, diffs, replay déterministe, et promotion sélective basée sur des preuves. La différence est fondamentale, pas superficielle. De plus, GenOS intègre des primitives biomimétiques natives (apoptosis, cryptobiosis, transfert horizontal de gènes, etc.).",
  },
  {
    q: "GenOS est-il compatible avec mes modèles préférés ?",
    a: "GenOS vise la compatibilité avec OpenAI (GPT-4o), Anthropic (Claude 3.5), Ollama, et des fixtures de replay déterministes. Ces connecteurs modèles sont planifiés pour v0.1.0.",
  },
  {
    q: "Comment contribuer à GenOS ?",
    a: "Lisez CONTRIBUTING.md dans le repository. Les changements architecturaux doivent inclure un Architecture Decision Record (ADR) dans docs/2-architecture/adrs/ et une preuve exécutable. Les petites contributions peuvent être proposées via le backlog good-first-issues.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-[#1e2430] bg-[#0c1018] py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Tarifs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#9ca3af]">
            GenOS est gratuit et open-source en phase alpha. L'enterprise viendra avec les garanties et le support qu'elle nécessite.
          </p>
        </div>
      </section>

      {/* PLANS */}
      <section className="border-t border-[#1e2430] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {plans.map((plan) => (
              <div key={plan.nom} className={`rounded-2xl border ${plan.couleur} p-8`}>
                {plan.badge && (
                  <div className={`mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${plan.badgeColor}`}>
                    {plan.badge}
                  </div>
                )}
                <h2 className="text-2xl font-bold text-white">{plan.nom}</h2>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.prix}</span>
                  {plan.period && (
                    <span className="text-sm text-[#7a8294]">/{plan.period}</span>
                  )}
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#9ca3af]">{plan.description}</p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-[#c8ced8]">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#5b4fcf]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {plan.ctaExternal ? (
                    <a
                      href={plan.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl bg-[#5b4fcf] px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-[#6d5ff0] focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/50"
                    >
                      {plan.cta}
                      <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-xs">→</span>
                    </a>
                  ) : (
                    <Link
                      href={plan.ctaLink}
                      className="block rounded-xl bg-[#5b4fcf] px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-[#6d5ff0] focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/50"
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="contact" className="border-t border-[#1e2430] bg-[#0c1018] py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">FAQ</h2>
          <div className="mt-8 space-y-6">
            {faq.map((item, i) => (
              <details key={i} className="group rounded-xl border border-[#1e2430] bg-[#0c1018] p-5">
                <summary className="cursor-pointer text-base font-semibold text-white list-none flex items-center justify-between gap-4">
                  {item.q}
                  <svg className="h-5 w-5 shrink-0 text-[#7a8294] transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-[#9ca3af]">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-[#1e2430] bg-[#161b26] p-8 text-center">
            <h3 className="text-lg font-semibold text-white">Questions qui ne sont pas ici ?</h3>
            <p className="mt-2 text-sm text-[#9ca3af]">
              Contactez-nous à l'adresse indiquée dans le fichier SUPPORT.md du repository.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
