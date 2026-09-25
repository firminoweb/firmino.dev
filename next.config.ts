import type { NextConfig } from "next";

const STRAPI_URL = process.env.STRAPI_URL;

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];
if (STRAPI_URL) {
  try {
    const url = new URL(STRAPI_URL);
    remotePatterns.push({
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: "/uploads/**",
    });
  } catch {
    /* ignore invalid STRAPI_URL */
  }
}

// Páginas com versão Markdown (src/lib/markdown.ts). Precisa bater com
// pageMarkdown()/markdownPaths().
const MD_SECTION = "servicos|solucoes|projetos|blog";
const MD_PAGES = [
  { source: "/", md: "/md" },
  { source: `/:section(${MD_SECTION}|como-trabalhamos)`, md: "/md/:section" },
  { source: `/:section(${MD_SECTION})/:slug`, md: "/md/:section/:slug" },
];

const ACCEPTS_MARKDOWN = [
  { type: "header" as const, key: "accept", value: "(.*)text/markdown(.*)" },
];

// RFC 8288: aponta agentes para o resumo do site, o sitemap e o catálogo de APIs (RFC 9727)
const DISCOVERY_LINKS =
  '</llms.txt>; rel="describedby"; type="text/plain", </sitemap.xml>; rel="sitemap", </.well-known/api-catalog>; rel="api-catalog"';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Negociação de conteúdo: agente que pede `Accept: text/markdown` recebe a
  // versão Markdown na mesma URL; navegador segue recebendo HTML. É resolvido
  // no roteamento (sem middleware), então não custa nada nas visitas normais.
  // O Vary: Accept sai da rota /md (o Next sobrescreve Vary nas páginas HTML).
  async rewrites() {
    return {
      beforeFiles: MD_PAGES.map(({ source, md }) => ({
        source,
        destination: md,
        has: ACCEPTS_MARKDOWN,
      })),
      afterFiles: [],
      fallback: [],
    };
  },
  // Quando dois blocos casam a mesma URL, o último vence: o genérico vem
  // primeiro e as páginas com Markdown sobrescrevem incluindo o alternate.
  async headers() {
    return [
      { source: "/:path*", headers: [{ key: "Link", value: DISCOVERY_LINKS }] },
      ...MD_PAGES.map(({ source, md }) => ({
        source,
        headers: [
          { key: "Link", value: `${DISCOVERY_LINKS}, <${md}>; rel="alternate"; type="text/markdown"` },
        ],
      })),
    ];
  },
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns,
  },
  // PGlite (banco local da área do cliente em dev) não deve ser empacotado
  serverExternalPackages: ["@electric-sql/pglite"],
  experimental: {
    // Upload de documentos da área do cliente: arquivo de até 4 MB + campos.
    // 4.5mb é também o teto de corpo de requisição da Vercel.
    serverActions: { bodySizeLimit: "4.5mb" },
    // Inline route CSS into <style> tags instead of a render-blocking
    // <link>. Removes the HTML→CSS critical-chain hop that was delaying LCP.
    inlineCss: true,
    optimizePackageImports: [
      "@/components/ui",
      "@/components/home",
      "@/components/layout",
      "@/components/blog",
      "@/components/projects",
      "@/components/forms",
    ],
  },
};

export default nextConfig;
