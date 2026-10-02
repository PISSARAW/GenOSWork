import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { LiveSandbox } from "@/components/p3-explorers";

export const metadata: Metadata = { title: "Sandbox GenOS en direct", description: "Connectez en français un runtime GenOS avec un jeton et un scope tenant, puis lancez une mission locale supervisée.", alternates: { canonical: "/fr/sandbox", languages: { en: "/sandbox", fr: "/fr/sandbox" } }, openGraph: { locale: "fr_FR" } };

export default function FrenchSandboxPage() { return <div className="page-shell" lang="fr"><section className="page-hero section-wrap p3-hero"><Eyebrow>GENOS EN DIRECT · VOTRE RUNTIME</Eyebrow><h1>Connecter GenOS<br /><em>et lancer une mission.</em></h1><p>Utilisez un endpoint HTTPS GenOS et une clé associée à la permission mcp:execute_safe. La page envoie une requête d’orchestration au premier plan via genos_orchestrate et l’exécuteur local.</p><div className="p3-hero-links"><a href="/fr/runs">Inspecter les exécutions enregistrées →</a><a href="/fr/api-mcp">Lire les contrats API et MCP →</a></div></section><LiveSandbox locale="fr" /></div>; }
