import { openApiSpec } from "@/lib/api-docs";

export const dynamic = "force-static";

export function GET() {
  return Response.json(openApiSpec(), {
    headers: { "Content-Type": "application/openapi+json; charset=utf-8" },
  });
}
