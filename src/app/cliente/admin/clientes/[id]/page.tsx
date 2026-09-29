import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { getClientForAdmin } from "@/lib/portal/admin";
import { STATUS_LABELS } from "@/lib/portal/types";
import { requireAdmin } from "@/lib/portal/session";
import { SectionLabel } from "@/components/ui";
import { fieldClass, Label } from "@/components/portal/form";
import { SubmitButton } from "@/components/portal/SubmitButton";
import { createProjectAction, deleteDocumentAction, setUserActiveAction, updateClientAction } from "../../actions";
import { CreateUserForm, DocumentUploadForm } from "../../AdminForms";

const UUID = /^[0-9a-f-]{36}$/i;

export default async function AdminClientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await requireAdmin();
  const data = UUID.test(id) ? await getClientForAdmin(await getDb(), admin, id) : null;
  if (!data) notFound();
  const { client, people, projects, documents } = data;
  const path = `/cliente/admin/clientes/${id}`;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link href="/cliente/admin" className="text-[13px] text-text-dim hover:text-text-light">← Painel</Link>
        <form action={updateClientAction.bind(null, id)} className="flex gap-3 items-center mt-3 max-w-[560px]">
          <input name="name" defaultValue={client.name} required className={`${fieldClass} !text-[20px] font-semibold`} />
          <SubmitButton variant="ghost">Salvar</SubmitButton>
        </form>
      </div>

      <section className="flex flex-col gap-4">
        <SectionLabel>Projetos</SectionLabel>
        <ul className="flex flex-col gap-2">
          {projects.map((p) => (
            <li key={p.id}>
              <Link href={`/cliente/admin/projetos/${p.id}`} className="gc px-5 py-4 flex justify-between gap-3 hover:border-accent/40">
                <span className="text-[15px] font-medium text-text-light">{p.name}</span>
                <span className="text-[12.5px] text-text-dim">{STATUS_LABELS.project[p.status]}{p.stage && ` · ${p.stage}`}</span>
              </Link>
            </li>
          ))}
        </ul>
        <form action={createProjectAction.bind(null, id)} className="gc p-5 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
          <Label text="Novo projeto">
            <input name="name" required className={fieldClass} placeholder="Ex.: Sistema de agendamento" />
          </Label>
          <Label text="Resumo (opcional)">
            <input name="summary" className={fieldClass} />
          </Label>
          <SubmitButton>Criar projeto</SubmitButton>
        </form>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Pessoas com acesso</SectionLabel>
        <ul className="flex flex-col gap-2">
          {people.map((p) => (
            <li key={p.id} className="gc px-5 py-3 flex flex-wrap items-center justify-between gap-3">
              <span className={p.active ? "" : "opacity-50"}>
                <span className="text-[14.5px] font-medium text-text-light">{p.name}</span>{" "}
                <span className="text-[13px] text-text-dim">{p.email}</span>
              </span>
              <form action={setUserActiveAction.bind(null, p.id, id, !p.active)}>
                <SubmitButton variant={p.active ? "danger" : "ghost"} pendingText="...">
                  {p.active ? "Remover acesso" : "Reativar"}
                </SubmitButton>
              </form>
            </li>
          ))}
        </ul>
        <div className="gc p-5">
          <CreateUserForm clientId={id} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Documentos gerais (contrato, proposta)</SectionLabel>
        <ul className="flex flex-col gap-2">
          {documents.map((d) => (
            <li key={d.id} className="gc px-5 py-3 flex flex-wrap items-center justify-between gap-3">
              <span>
                <span className="text-[11px] uppercase tracking-[1px] font-semibold text-text-dim mr-2">{STATUS_LABELS.document[d.kind]}</span>
                <span className="text-[14.5px] text-text-light">{d.title}</span>
              </span>
              <span className="flex items-center gap-4">
                <a href={`/cliente/documentos/${d.id}`} className="text-[13px] text-accent-light">Baixar</a>
                <form action={deleteDocumentAction.bind(null, d.id, path)}>
                  <SubmitButton variant="danger" pendingText="...">Excluir</SubmitButton>
                </form>
              </span>
            </li>
          ))}
        </ul>
        <div className="gc p-5">
          <DocumentUploadForm clientId={id} projectId={null} />
        </div>
      </section>
    </div>
  );
}
