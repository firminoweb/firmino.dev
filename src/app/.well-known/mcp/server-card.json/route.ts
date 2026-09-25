import { CATALOG_HEADERS, mcpServerCard } from "@/lib/ai-catalog";

/* MCP Server Card (SEP-1649): como descobrir e conectar no servidor /mcp. */
export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(mcpServerCard(), null, 2), { headers: CATALOG_HEADERS });
}
