import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { getProjectDetailForUser } from "@/lib/portal/access";
import { getProjectClientId } from "@/lib/portal/admin";
import { STATUS_LABELS } from "@/lib/portal/types";
import { requireAdmin } from "@/lib/portal/session";
import { SectionLabel } from "@/components/ui";
import { fieldClass, Label } from "@/components/portal/form";
import { formatDate, formatMoney } from "@/components/portal/format";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { SubmitButton } from "@/components/portal/SubmitButton";
import {
  addDeliveryAction,
  addMilestoneAction,
  deleteDeliveryAction,
  deleteDocumentAction,
  deleteMilestoneAction,
  setDocumentPaidAction,
  updateMilestoneAction,
  updateProjectAction,
} from "../../actions";
import { DocumentUploadForm } from "../../AdminForms";

export default async function AdminProjetoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await requireAdmin();
  const db = await getDb();
  const detail = await getProjectDetailForUser(db, admin, id);
  if (!detail) notFound();
  const clientId = (await getProjectClientId(db, id))!;
  const { project, milestones, deliveries, tickets, documents } = detail;
  const path = `/cliente/admin/projetos/${id}`;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={`/cliente/admin/clientes/${clientId}`} className="text-[13px] text-text-dim hover:text-text-light">
          ← {project.clientName}
        </Link>
        <Link href={`/cliente/projetos/${id}`} className="btn-ghost !py-2 !px-4 text-[13px]">
          Ver como o cliente vê →
        </Link>
      </div>

      {/* Projeto */}
      <form action={updateProjectAction.bind(null, id)} className="gc p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Label text="Nome do projeto">
          <input name="name" defaultValue={project.name} required className={fieldClass} />
        </Label>
        <Label text="Status">
          <select name="status" defaultValue={project.status} className={fieldClass}>
            {Object.entries(STATUS_LABELS.project).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </Label>
        <Label text="Etapa atual" hint="O que o cliente lê em destaque. Ex.: Construção: 2ª entrega">
          <input name="stage" defaultValue={project.stage} className={fieldClass} />
        </Label>
        <Label text="Resumo">
          <input name="summary" defaultValue={project.summary} className={fieldClass} />
        </Label>
        <div className="sm:col-span-2">
          <SubmitButton>Salvar projeto</SubmitButton>
        </div>
      </form>

      {/* Cronograma */}
      <section className="flex flex-col gap-3">
        <SectionLabel>Cronograma</SectionLabel>
        {milestones.map((m, i) => (
          <div key={m.id} className="gc p-5 flex flex-col gap-3">
            <form action={updateMilestoneAction.bind(null, m.id, id)} className="grid grid-cols-1 sm:grid-cols-[auto_1fr_160px_170px] gap-3 items-end">
              <span className="font-serif text-[20px] text-accent-light pb-2">{i + 1}</span>
              <Label text="Etapa">
                <input name="title" defaultValue={m.title} required className={fieldClass} />
              </Label>
              <Label text="Previsão">
                <input name="dueDate" type="date" defaultValue={m.dueDate ?? ""} className={fieldClass} />
              </Label>
              <Label text="Status">
                <select name="status" defaultValue={m.status} className={fieldClass}>
                  {Object.entries(STATUS_LABELS.milestone).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </Label>
              <div className="sm:col-span-4">
                <Label text="Descrição para o cliente">
                  <textarea name="description" defaultValue={m.description} rows={2} className={fieldClass} />
                </Label>
              </div>
              <div className="sm:col-span-4 flex items-center gap-4">
                <SubmitButton variant="ghost">Salvar etapa</SubmitButton>
              </div>
            </form>
            <form action={deleteMilestoneAction.bind(null, m.id, id)}>
              <SubmitButton variant="danger" pendingText="...">Excluir etapa</SubmitButton>
            </form>
          </div>
        ))}
        <form action={addMilestoneAction.bind(null, id)} className="gc p-5 grid grid-cols-1 sm:grid-cols-[1fr_170px] gap-3 items-end">
          <Label text="Nova etapa">
            <input name="title" required className={fieldClass} placeholder="Ex.: Protótipo aprovado" />
          </Label>
          <Label text="Previsão">
            <input name="dueDate" type="date" className={fieldClass} />
          </Label>
          <div className="sm:col-span-2">
            <Label text="Descrição (opcional)">
              <input name="description" className={fieldClass} />
            </Label>
          </div>
          <SubmitButton>Adicionar etapa</SubmitButton>
        </form>
      </section>

      {/* Entregas */}
      <section className="flex flex-col gap-3">
        <SectionLabel>Entregas</SectionLabel>
        {deliveries.map((d) => (
          <div key={d.id} className="gc px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <span>
              <span className="text-[14.5px] font-medium text-text-light">{d.title}</span>{" "}
              <span className="text-[12.5px] text-text-dim">· {formatDate(d.deliveredOn)}</span>
            </span>
            <form action={deleteDeliveryAction.bind(null, d.id, id)}>
              <SubmitButton variant="danger" pendingText="...">Excluir</SubmitButton>
            </form>
          </div>
        ))}
        <form action={addDeliveryAction.bind(null, id)} className="gc p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Label text="O que foi entregue">
            <input name="title" required className={fieldClass} placeholder="Ex.: Agendamento online no ar" />
          </Label>
          <Label text="Data">
            <input name="deliveredOn" type="date" defaultValue={today} required className={fieldClass} />
          </Label>
          <Label text="Descrição para o cliente">
            <input name="description" className={fieldClass} />
          </Label>
          <Label text="Link para ver funcionando (opcional)">
            <input name="linkUrl" type="url" className={fieldClass} placeholder="https://" />
          </Label>
          <label className="flex items-center gap-2 text-[13px] text-text-dim sm:col-span-2">
            <input type="checkbox" name="notify" defaultChecked /> Avisar o cliente por e-mail
          </label>
          <div className="sm:col-span-2">
            <SubmitButton>Registrar entrega</SubmitButton>
          </div>
        </form>
      </section>

      {/* Documentos */}
      <section className="flex flex-col gap-3">
        <SectionLabel>Documentos e faturas</SectionLabel>
        {documents.map((doc) => (
          <div key={doc.id} className="gc px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <span>
              <span className="text-[11px] uppercase tracking-[1px] font-semibold text-text-dim mr-2">{STATUS_LABELS.document[doc.kind]}</span>
              <span className="text-[14.5px] text-text-light">{doc.title}</span>
              {doc.amountCents != null && <span className="text-[12.5px] text-text-dim"> · {formatMoney(doc.amountCents)}</span>}
              {doc.paid != null && (
                <span className="ml-2">
                  <StatusBadge tone={doc.paid ? "done" : "warn"}>{doc.paid ? "Pago" : "Pendente"}</StatusBadge>
                </span>
              )}
            </span>
            <span className="flex items-center gap-4">
              {doc.paid != null && (
                <form action={setDocumentPaidAction.bind(null, doc.id, path, !doc.paid)}>
                  <SubmitButton variant="ghost" pendingText="..." className="!py-1.5 !px-3 text-[12.5px]">
                    {doc.paid ? "Marcar pendente" : "Marcar pago"}
                  </SubmitButton>
                </form>
              )}
              <a href={`/cliente/documentos/${doc.id}`} className="text-[13px] text-accent-light">Baixar</a>
              <form action={deleteDocumentAction.bind(null, doc.id, path)}>
                <SubmitButton variant="danger" pendingText="...">Excluir</SubmitButton>
              </form>
            </span>
          </div>
        ))}
        <div className="gc p-5">
          <DocumentUploadForm clientId={clientId} projectId={id} />
        </div>
      </section>

      {/* Chamados */}
      <section className="flex flex-col gap-3">
        <SectionLabel>Chamados</SectionLabel>
        {tickets.length === 0 && <p className="text-[14px] text-text-dim">Nenhum chamado.</p>}
        {tickets.map((t) => (
          <Link key={t.id} href={`/cliente/chamados/${t.id}`} className="gc px-5 py-4 flex justify-between gap-3 hover:border-accent/40">
            <span className="text-[14.5px] text-text-light">{t.title}</span>
            <StatusBadge tone={t.status === "resolvido" ? "done" : t.status === "aberto" ? "warn" : "active"}>
              {STATUS_LABELS.ticket[t.status]}
            </StatusBadge>
          </Link>
        ))}
      </section>
    </div>
  );
}
