export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmino.dev";

export const SITE_NAME = "firmino.dev";

/** @id da Organization no grafo schema.org. Layout, /sobre, /joao e cases apontam pra ele. */
export const ORG_ID = `${SITE_URL}/#organization`;

/**
 * Imagem de compartilhamento padrão (a rota /opengraph-image).
 *
 * Precisa ser declarada em TODA página que define `openGraph` próprio: o
 * metadata da página substitui o do layout, e sem isso o link é compartilhado
 * no WhatsApp e no LinkedIn sem prévia nenhuma. Segmentos com gerador próprio
 * (blog/[slug], projetos/[slug]) não usam esta constante.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "firmino.dev · Construímos software. Reforçamos times.",
};

/** Açúcar para `openGraph.images` e `twitter.images`. */
export const OG_IMAGES = [OG_IMAGE];

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** ItemList para páginas de listagem (/servicos, /projetos): diz ao buscador e às IAs quais itens a página agrupa. */
export function itemListJsonLd(name: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
