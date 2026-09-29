import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { getTicketForUser } from "@/lib/portal/access";
import { STATUS_LABELS } from "@/lib/portal/types";
import { isAdmin, requireUser } from "@/lib/portal/session";
import { formatDate } from "@/components/portal/format";
import { fieldClass } from "@/components/portal/form";
import { SubmitButton } from "@/components/portal/SubmitButton";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { setTicketStatusAction } from "../actions";
import { ReplyForm } from "../TicketForms";

const tone = { aberto: "warn", em_andamento: "active", resolvido: "done" } as const;

export default async function ChamadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const data = await getTicketForUser(await getDb(), user, id);
  if (!data) notFound();
  const { ticket, messages } = data;
  const admin = isAdmin(user);

  return (
    <div className="flex flex-col gap-6 max-w-[760px]">
      <Link
        href={admin ? `/cliente/admin/projetos/${ticket.projectId}` : `/cliente/projetos/${ticket.projectId}`}
        className="text-[13px] text-text-dim hover:text-text-light"
      >
        ← {ticket.projectName}
      </Link>
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <StatusBadge tone={tone[ticket.status]}>{STATUS_LABELS.ticket[ticket.status]}</StatusBadge>
          {admin && <span className="text-[12px] text-text-dim">{ticket.clientName}</span>}
        </div>
        <h1 className="font-serif text-[28px] leading-[1.2] text-text-light">{ticket.title}</h1>
      </div>

      {admin && (
        <form action={setTicketStatusAction.bind(null, ticket.id)} className="flex items-end gap-3">
          <select name="status" defaultValue={ticket.status} className={`${fieldClass} max-w-[220px]`}>
            <option value="aberto">Aberto</option>
            <option value="em_andamento">Em atendimento</option>
            <option value="resolvido">Resolvido</option>
          </select>
          <SubmitButton variant="ghost">Mudar status</SubmitButton>
        </form>
      )}

      <ol className="flex flex-col gap-3">
        {messages.map((m) => (
          <li key={m.id} className={`gc p-5 ${m.fromTeam ? "border-accent/30" : ""}`}>
            <div className="flex justify-between gap-3 text-[12px] mb-2">
              <span className={m.fromTeam ? "font-semibold text-accent-light" : "font-semibold text-text-subtle"}>{m.authorName}</span>
              <span className="text-text-muted">{formatDate(m.createdAt)}</span>
            </div>
            <p className="text-[14px] text-text-light leading-[1.7] whitespace-pre-wrap">{m.body}</p>
          </li>
        ))}
      </ol>

      <ReplyForm ticketId={ticket.id} />
    </div>
  );
}
