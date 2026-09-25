import { apiDocsMd } from "@/lib/api-docs";

/* Documentação da API para humanos e agentes (service-doc do api-catalog). */
export const dynamic = "force-static";

export function GET() {
  return new Response(apiDocsMd(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
