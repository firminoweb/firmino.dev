import { getDb } from "@/db";
import { getDocumentFileForUser } from "@/lib/portal/access";
import { getCurrentUser } from "@/lib/portal/session";

/* Download de documento: só para o cliente dono (ou admin). Nunca em cache público. */
export async function GET(_: Request, ctx: RouteContext<"/cliente/documentos/[id]">) {
  const user = await getCurrentUser();
  if (!user) return new Response("Faça login para baixar.", { status: 401 });
  const { id } = await ctx.params;
  const file = await getDocumentFileForUser(await getDb(), user, id);
  if (!file) return new Response("Documento não encontrado.", { status: 404 });

  const name = file.fileName.replace(/[^\w.\- ]+/g, "_");
  return new Response(new Uint8Array(file.data), {
    headers: {
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${name}"; filename*=UTF-8''${encodeURIComponent(file.fileName)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
