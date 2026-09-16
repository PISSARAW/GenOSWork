import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GenOS — Runtime d'Orchestration Biologique",
  description: "GenOS V3 est un runtime d'orchestration d'agents autonomes inspiré des systèmes biologiques. 8 modes d'organisation : Trinity, A-Team, Biocénose, Holobionte, Syncytium, Biome, Rhizome, Métapopulation.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "GenOS V3 — Orchestration biologique d'agents",
    description: "Un runtime pour agents autonomes où une exécution réussie n'est pas une preuve, et une erreur n'est pas fatale.",
    type: "website",
    url: "https://genoswork.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GenOS V3 — Runtime d'Orchestration Biologique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GenOS V3 — Orchestration biologique d'agents",
    description: "Runtime d'agents autonomes inspiré des systèmes biologiques. Snapshots, forks, replay, promotion par preuve.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#06080a] text-[#e8ecf0] font-sans antialiased selection:bg-[#5b4fcf] selection:text-white">
        <header className="sticky top-0 z-50 border-b border-[#1e2430]/80 backdrop-blur-xl bg-[#06080a]/80">
          <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c6df0] to-[#4a3fa0] text-white font-bold text-sm shadow-lg shadow-[#5b4fcf]/20">
                G
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                GenOS
              </span>
            </a>

            <div className="hidden items-center gap-8 text-sm font-medium text-[#8892a4] lg:flex">
              <a href="#modes" className="transition hover:text-white">Modes</a>
              <a href="/docs" className="transition hover:text-white">Docs</a>
              <a href="/features" className="transition hover:text-white">Caractéristiques</a>
              <a href="#architecture" className="transition hover:text-white">Architecture</a>
              <a href="/pricing" className="transition hover:text-white">Tarifs</a>
            </div>

            <div className="flex items-center gap-3">
              <a href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#3a4252] bg-[#1a1f2c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#252c3c] focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/30">
                GitHub
              </a>
              <a href="/docs" className="rounded-lg bg-[#5b4fcf] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6d5ff0] focus:outline-none focus:ring-2 focus:ring-[#5b4fcf]/50">
                Démarrer
              </a>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-6 lg:px-8">
          {children}
        </main>

        <footer className="border-t border-[#1e2430]/80 mt-24 bg-[#06080a]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c6df0] to-[#4a3fa0] text-white font-bold text-sm">
                  G
                </div>
                <span className="text-lg font-bold text-white">GenOS</span>
                <span className="text-sm text-[#8892a4]">© 2026 — Runtime d'orchestration biologique</span>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-[#8892a4]">
                <a href="/docs" className="transition hover:text-white">Documentation</a>
                <a href="/features" className="transition hover:text-white">Caractéristiques</a>
                <a href="/pricing" className="transition hover:text-white">Tarifs</a>
                <a href="https://github.com/PISSARAW/GenOS" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
