import type { Metadata } from "next";
import { ApiMcpReference } from "@/components/api-mcp-reference";

export const metadata: Metadata = { title: "REST and MCP API reference", description: "Documented GenOS REST and MCP routes, authentication, tenant scope, tool schemas, errors and protocol conventions.", alternates: { canonical: "/en/api-mcp", languages: { en: "/en/api-mcp", fr: "/fr/api-mcp" } } };

export default function ApiMcpPage() { return <ApiMcpReference />; }
