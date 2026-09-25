import { TOOL_INFO } from "@/lib/agent-tools";
import { getAgentSkills, skillUrl } from "@/lib/agent-skills";
import { API_PATHS } from "@/lib/api-docs";
import { MCP_SERVER } from "@/lib/mcp";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

/* ════════════════════════════════════════════
   Catálogos para agentes · firmino.dev
   MCP Server Card (/.well-known/mcp/server-card.json)
   e ARD / AI Catalog (/.well-known/ai-catalog.json
   e /.well-known/ard.json). Tudo gerado dos
   mesmos dados das ferramentas e das skills.
   ════════════════════════════════════════════ */

const HOST = new URL(SITE_URL).host;

/** Headers dos catálogos: JSON público, legível de qualquer origem. */
export const CATALOG_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};

export function mcpServerCard() {
  return {
    serverInfo: { name: MCP_SERVER.name, title: MCP_SERVER.title, version: MCP_SERVER.version },
    description: MCP_SERVER.description,
    endpoint: absoluteUrl(MCP_SERVER.endpoint),
    transport: { type: "streamable-http", url: absoluteUrl(MCP_SERVER.endpoint) },
    authentication: { required: false },
    capabilities: { tools: true, resources: false, prompts: false },
    tools: Object.entries(TOOL_INFO).map(([name, t]) => ({ name, title: t.title, description: t.description })),
    documentation: absoluteUrl("/llms.txt"),
  };
}

const urn = (namespace: string, name: string) => `urn:air:${HOST}:${namespace}:${name}`;

export function aiCatalog() {
  return {
    specVersion: "1.0",
    host: { displayName: "firmino.dev", identifier: `did:web:${HOST}` },
    entries: [
      {
        identifier: urn("server", MCP_SERVER.name),
        displayName: "firmino.dev (servidor MCP)",
        type: "application/mcp-server-card+json",
        url: absoluteUrl("/.well-known/mcp/server-card.json"),
        description: MCP_SERVER.description,
        tags: ["software sob medida", "orçamento", "Brasil"],
        representativeQueries: [
          "quais serviços a firmino.dev oferece",
          "cases de app e sistema da firmino.dev",
          "pedir orçamento de um sistema sob medida",
          "empresa para desenvolver sistema para clínica ou academia",
        ],
      },
      {
        identifier: urn("api", "contato"),
        displayName: "API de pedido de orçamento",
        type: "application/openapi+json",
        url: absoluteUrl(API_PATHS.openapi),
        description: "Envia um pedido de contato ou orçamento para a firmino.dev, com o consentimento da pessoa.",
        representativeQueries: [
          "enviar pedido de orçamento para desenvolvimento de software",
          "contratar desenvolvimento de app no Brasil",
          "solicitar proposta de sistema sob medida",
        ],
      },
      ...getAgentSkills().map((s) => ({
        identifier: urn("skill", s.name),
        displayName: s.name,
        type: "application/agent-skills+md",
        url: absoluteUrl(skillUrl(s.name)),
        description: s.description,
        representativeQueries:
          s.name === "solicitar-orcamento-firmino-dev"
            ? ["como pedir orçamento para a firmino.dev", "entrar em contato com uma software house"]
            : ["a firmino.dev é confiável", "o que a firmino.dev faz e para quem"],
      })),
      {
        identifier: urn("docs", "llms"),
        displayName: "Resumo do site para IAs (llms.txt)",
        type: "text/plain",
        url: absoluteUrl("/llms.txt"),
        description: "Empresa, especialidades, garantias, serviços, soluções por segmento, cases, FAQ e artigos.",
        representativeQueries: [
          "o que é a firmino.dev",
          "quanto custa desenvolver um app ou sistema",
          "garantias de uma empresa de desenvolvimento de software",
        ],
      },
    ],
  };
}
