import { aiCatalog, CATALOG_HEADERS } from "@/lib/ai-catalog";

/* ARD / AI Catalog: tudo o que a firmino.dev oferece a agentes. Mesmo conteúdo de /.well-known/ard.json. */
export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(aiCatalog(), null, 2), { headers: CATALOG_HEADERS });
}
