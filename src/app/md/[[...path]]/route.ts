import { markdownPaths, pageMarkdown } from "@/lib/markdown";
import { absoluteUrl } from "@/lib/seo";

/*
 * Versão Markdown das páginas para agentes de IA. Não é linkada no site:
 * chega aqui via rewrite quando a requisição pede `Accept: text/markdown`
 * (ver next.config.ts), ou pelo Link rel="alternate" das páginas.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return markdownPaths().map((path) => ({ path }));
}

export async function GET(_: Request, ctx: RouteContext<"/md/[[...path]]">) {
  const { path = [] } = await ctx.params;
  const md = pageMarkdown(path);
  if (md == null) return new Response(null, { status: 404 });

  const htmlUrl = absoluteUrl(`/${path.join("/")}`);
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      // A página HTML é a canônica: evita que /md/... concorra com ela no índice
      Link: `<${htmlUrl}>; rel="canonical"`,
    },
  });
}
