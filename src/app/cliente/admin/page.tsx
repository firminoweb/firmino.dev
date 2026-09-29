import Link from "next/link";
import { getDb } from "@/db";
import { listClientsWithCounts, listOpenTickets } from "@/lib/portal/admin";
import { STATUS_LABELS } from "@/lib/portal/types";
import { requireAdmin } from "@/lib/portal/session";
import { SectionLabel } from "@/components/ui";
import { fieldClass } from "@/components/portal/form";
import { formatDate } from "@/components/portal/format";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { SubmitButton } from "@/components/portal/SubmitButton";
import { createClientAction } from "./actions";

export default async function AdminHome() {
  const admin = await requireAdmin();
  const db = await getDb();
  const [clientsList, openTickets] = await Promise.all([listClientsWithCounts(db, admin), listOpenTickets(db, admin)]);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-serif text-[32px] text-text-light">Painel</h1>

      <section>
        <SectionLabel>Chamados em aberto ({openTickets.length})</SectionLabel>
        {openTickets.length === 0 ? (
          <p className="text-[14px] text-text-dim mt-3">Nenhum chamado em aberto.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {openTickets.map((t) => (
              <li key={t.id}>
                <Link href={`/cliente/chamados/${t.id}`} className="gc px-5 py-4 flex flex-wrap items-center justify-between gap-2 hover:border-accent/40">
                  <span>
                    <span className="block text-[14.5px] font-medium text-text-light">{t.title}</span>
                    <span className="text-[12px] text-text-dim">{t.clientName} · {t.projectName}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[12px] text-text-muted">{formatDate(t.updatedAt)}</span>
                    <StatusBadge tone={t.status === "aberto" ? "warn" : "active"}>{STATUS_LABELS.ticket[t.status]}</StatusBadge>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionLabel>Clientes</SectionLabel>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {clientsList.map((c) => (
            <li key={c.id}>
              <Link href={`/cliente/admin/clientes/${c.id}`} className="gc p-5 block hover:border-accent/40">
                <div className="text-[16px] font-semibold text-text-light">{c.name}</div>
                <div className="text-[12.5px] text-text-dim">
                  {c.projects} projeto(s) · {c.people} pessoa(s) com acesso
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <form action={createClientAction} className="flex gap-3 items-center mt-4 max-w-[520px]">
          <input name="name" required placeholder="Nome do novo cliente" className={fieldClass} />
          <SubmitButton>Criar cliente</SubmitButton>
        </form>
      </section>
    </div>
  );
}
