import type { Metadata } from "next";
import { ApiMcpReference } from "@/components/api-mcp-reference";

export const metadata: Metadata = { title: "Référence API REST et MCP", description: "Routes GenOS, authentification, scope tenant, permissions, schémas MCP, codes d’erreur et conventions de protocole.", alternates: { canonical: "/fr/api-mcp", languages: { en: "/api-mcp", fr: "/fr/api-mcp" } }, openGraph: { locale: "fr_FR" } };

export default function FrenchApiMcpPage() { return <ApiMcpReference locale="fr" />; }
