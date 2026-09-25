/* Status da API pública (referenciado no /.well-known/api-catalog). Dinâmico
   de propósito: responder já prova que as funções do servidor estão no ar. */
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" });
}
