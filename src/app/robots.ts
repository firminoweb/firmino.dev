import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://firmino.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // O PDF do CV fica fora do índice de propósito: quem tem que ranquear
        // para "joão firmino" é a /joao, não um PDF concorrendo com ela.
        disallow: ["/api/", "/cv-joao-firmino-full-stack.pdf"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
