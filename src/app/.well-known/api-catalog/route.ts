import { API_PATHS } from "@/lib/api-docs";
import { absoluteUrl } from "@/lib/seo";

/*
 * Catálogo de APIs (RFC 9727): aponta agentes para a spec, a doc e o status.
 * O Link rel="api-catalog" exigido pela RFC (inclusive no HEAD) vem do header
 * global em next.config.ts, que sobrescreveria um Link definido aqui.
 */
export const dynamic = "force-static";

export function GET() {
  const linkset = {
    linkset: [
      {
        anchor: absoluteUrl(API_PATHS.contact),
        "service-desc": [{ href: absoluteUrl(API_PATHS.openapi), type: "application/openapi+json" }],
        "service-doc": [{ href: absoluteUrl(API_PATHS.docs), type: "text/markdown" }],
        status: [{ href: absoluteUrl(API_PATHS.health), type: "application/json" }],
      },
    ],
  };
  return new Response(JSON.stringify(linkset, null, 2), {
    headers: {
      "Content-Type": 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
    },
  });
}

export function HEAD() {
  return new Response(null);
}
