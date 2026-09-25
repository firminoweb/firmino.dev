import { SITE_URL } from "@/lib/seo";

/*
 * robots.txt como route handler (e não robots.ts) porque o MetadataRoute do
 * Next não suporta a diretiva Content-Signal (https://contentsignals.org).
 *
 * Content-Signal: autoriza busca, uso em respostas de IA (ai-input) e treino
 * de modelos (ai-train). Decisão do João em 2026-09-25: o site existe para
 * ser encontrado, e estar no conhecimento das IAs ajuda a marca.
 *
 * O PDF do CV fica fora do índice de propósito: quem tem que ranquear para
 * "joão firmino" é a /joao, não um PDF concorrendo com ela.
 */
export const dynamic = "force-static";

export function GET() {
  const body = [
    "User-Agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "Allow: /",
    "Allow: /api/health",
    "Disallow: /api/",
    "Disallow: /cv-joao-firmino-full-stack.pdf",
    "",
    `Host: ${SITE_URL}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
