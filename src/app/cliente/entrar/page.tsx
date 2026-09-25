import Link from "next/link";
import { redirect } from "next/navigation";
import { Notice } from "@/components/portal/form";
import { getCurrentUser } from "@/lib/portal/session";
import { LoginForm } from "./LoginForm";

export default async function EntrarPage({ searchParams }: { searchParams: Promise<{ expirado?: string }> }) {
  if (await getCurrentUser()) redirect("/cliente");
  const { expirado } = await searchParams;

  return (
    <div className="max-w-[440px] mx-auto">
      <div className="gc p-7 sm:p-9 flex flex-col gap-5">
        <div>
          <h1 className="font-serif text-[30px] leading-[1.15] text-text-light mb-2">Área do cliente</h1>
          <p className="text-[14px] text-text-dim leading-[1.7]">
            Acompanhe o cronograma, as entregas, os chamados e os documentos do seu projeto. Sem senha: você recebe um link de acesso no e-mail.
          </p>
        </div>
        {expirado && <Notice tone="error">Este link expirou ou já foi usado. Peça um novo abaixo.</Notice>}
        <LoginForm />
      </div>
      <p className="text-[12.5px] text-text-dim text-center mt-5">
        Ainda não é cliente?{" "}
        <Link href="/area-do-cliente" className="text-accent-light hover:text-accent">
          Veja como funciona
        </Link>
      </p>
    </div>
  );
}
