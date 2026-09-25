import { aiCatalog, CATALOG_HEADERS } from "@/lib/ai-catalog";

/* Caminho da spec ARD (§5.1); o isitagentready procura /.well-known/ai-catalog.json. Mesmo conteúdo. */
export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(aiCatalog(), null, 2), { headers: CATALOG_HEADERS });
}
