import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { getProjectDetailForUser } from "@/lib/portal/access";
import { isAdmin, requireUser } from "@/lib/portal/session";
import { ProjectDetailView } from "@/components/portal/ProjectDetailView";
import { NewTicketForm } from "../../chamados/TicketForms";

export default async function ProjetoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const detail = await getProjectDetailForUser(await getDb(), user, id);
  if (!detail) notFound();

  return (
    <div className="flex flex-col gap-6">
      {isAdmin(user) && (
        <div className="text-[13px] text-text-dim">
          Você está vendo como o cliente.{" "}
          <Link href={`/cliente/admin/projetos/${id}`} className="text-accent-light">
            Voltar para a edição
          </Link>
        </div>
      )}
      <ProjectDetailView detail={detail} ticketForm={<NewTicketForm projectId={id} />} />
    </div>
  );
}
