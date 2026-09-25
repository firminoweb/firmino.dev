import Link from "next/link";
import { getDb } from "@/db";
import { isLoginTokenUsable } from "@/lib/portal/auth";
import { SubmitButton } from "@/components/portal/SubmitButton";
import { confirmLoginAction } from "../../actions";

/*
 * O GET só confere o link; quem consome é o clique em "Entrar" (POST).
 * Filtros de e-mail (Outlook, antivírus) abrem links sozinhos e gastariam
 * um link de uso único antes da pessoa.
 */
export default async function ConfirmarPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  const usable = token ? await isLoginTokenUsable(await getDb(), token) : false;

  return (
    <div className="max-w-[440px] mx-auto">
      <div className="gc p-7 sm:p-9 flex flex-col gap-5 text-center">
        {usable ? (
          <>
            <h1 className="font-serif text-[28px] text-text-light">Tudo certo</h1>
            <p className="text-[14px] text-text-dim">Clique para entrar na área do cliente.</p>
            <form action={confirmLoginAction}>
              <input type="hidden" name="token" value={token} />
              <SubmitButton pendingText="Entrando..." className="w-full">
                Entrar →
              </SubmitButton>
            </form>
          </>
        ) : (
          <>
            <h1 className="font-serif text-[28px] text-text-light">Link expirado</h1>
            <p className="text-[14px] text-text-dim">Este link expirou ou já foi usado. Os links valem por 15 minutos e uma única vez.</p>
            <Link href="/cliente/entrar" className="btn-primary inline-flex justify-center">
              Pedir um novo link
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
