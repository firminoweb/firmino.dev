import Link from "next/link";
import { SectionLabel } from "@/components/ui";
import { STATUS_LABELS, type ProjectDetail } from "@/lib/portal/types";
import { formatDate, formatMoney, formatSize } from "./format";
import { StatusBadge } from "./StatusBadge";

/* ════════════════════════════════════════════
   Visão do projeto para o cliente. Usada pelo
   portal (/cliente/projetos/[id]) e pela demo
   pública (/area-do-cliente/demo), que passa
   demo=true para desligar links reais.
   ════════════════════════════════════════════ */

interface Props {
  detail: ProjectDetail;
  demo?: boolean;
  /** Formulário "abrir chamado" (só no portal real). */
  ticketForm?: React.ReactNode;
}

const milestoneTone = { planejada: "neutral", em_andamento: "active", concluida: "done" } as const;
const ticketTone = { aberto: "warn", em_andamento: "active", resolvido: "done" } as const;

export function ProjectDetailView({ detail, demo = false, ticketForm }: Props) {
  const { project, milestones, deliveries, tickets, documents } = detail;
  const done = milestones.filter((m) => m.status === "concluida").length;
  const progress = milestones.length ? Math.round((done / milestones.length) * 100) : 0;
  const next = milestones.find((m) => m.status !== "concluida");

  return (
    <div className="flex flex-col gap-10">
      {/* Resumo */}
      <section className="gc p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[12px] uppercase tracking-[1.5px] font-semibold text-text-dim">{project.clientName}</span>
          <StatusBadge tone={project.status === "concluido" ? "done" : project.status === "pausado" ? "warn" : "active"}>
            {STATUS_LABELS.project[project.status]}
          </StatusBadge>
        </div>
        <h1 className="font-serif text-[clamp(26px,3.4vw,38px)] leading-[1.15] text-text-light mb-2">{project.name}</h1>
        {project.summary && <p className="text-[14.5px] text-text-dim leading-[1.7] max-w-[640px]">{project.summary}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="metric-box !text-left">
            <div className="text-[11px] text-text-dim uppercase tracking-[1px]">Etapa atual</div>
            <div className="text-[15px] font-semibold text-brand mt-1">{project.stage || "A definir"}</div>
          </div>
          <div className="metric-box !text-left">
            <div className="text-[11px] text-text-dim uppercase tracking-[1px]">Progresso</div>
            <div className="text-[15px] font-semibold text-brand mt-1">
              {progress}% <span className="text-[12px] font-normal text-text-dim">({done} de {milestones.length} etapas)</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-dim mt-2 overflow-hidden">
              <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="metric-box !text-left">
            <div className="text-[11px] text-text-dim uppercase tracking-[1px]">Próxima entrega</div>
            <div className="text-[15px] font-semibold text-brand mt-1">{next ? next.title : "Tudo entregue"}</div>
            {next?.dueDate && <div className="text-[12px] text-text-dim">{formatDate(next.dueDate)}</div>}
          </div>
        </div>
      </section>

      {/* Cronograma */}
      <section>
        <SectionLabel>Cronograma</SectionLabel>
        {milestones.length === 0 ? (
          <p className="text-[14px] text-text-dim mt-3">O cronograma será publicado aqui assim que o plano for combinado.</p>
        ) : (
          <ol className="mt-4 flex flex-col gap-3">
            {milestones.map((m, i) => (
              <li key={m.id} className="gc p-5 flex gap-4">
                <div className="font-serif text-[20px] text-accent-light w-7 shrink-0">{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-[15.5px] font-semibold text-text-light">{m.title}</h3>
                    <StatusBadge tone={milestoneTone[m.status]}>{STATUS_LABELS.milestone[m.status]}</StatusBadge>
                  </div>
                  {m.description && <p className="text-[13.5px] text-text-dim leading-[1.65]">{m.description}</p>}
                  <p className="text-[12px] text-text-muted mt-1.5">Previsão: {formatDate(m.dueDate)}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* Entregas */}
      <section>
        <SectionLabel>Entregas</SectionLabel>
        {deliveries.length === 0 ? (
          <p className="text-[14px] text-text-dim mt-3">As entregas aparecem aqui a cada ciclo, com o que ficou pronto.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {deliveries.map((d) => (
              <li key={d.id} className="gc p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-text-light">{d.title}</h3>
                  <span className="text-[12px] text-text-muted">{formatDate(d.deliveredOn)}</span>
                </div>
                {d.description && <p className="text-[13.5px] text-text-dim leading-[1.65] mt-1">{d.description}</p>}
                {d.linkUrl &&
                  (demo ? (
                    <span className="inline-block mt-2 text-[13px] text-accent-light font-medium">Ver funcionando →</span>
                  ) : (
                    <a href={d.linkUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-[13px] text-accent-light hover:text-accent font-medium">
                      Ver funcionando →
                    </a>
                  ))}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Chamados */}
      <section>
        <SectionLabel>Chamados</SectionLabel>
        {tickets.length === 0 ? (
          <p className="text-[14px] text-text-dim mt-3">Nenhum chamado por enquanto. Precisa de um ajuste ou achou um problema? Abra um chamado abaixo.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {tickets.map((t) => {
              const content = (
                <>
                  <span className="text-[14.5px] font-medium text-text-light">{t.title}</span>
                  <span className="flex items-center gap-3">
                    <span className="text-[12px] text-text-muted">{formatDate(t.updatedAt)}</span>
                    <StatusBadge tone={ticketTone[t.status]}>{STATUS_LABELS.ticket[t.status]}</StatusBadge>
                  </span>
                </>
              );
              return (
                <li key={t.id}>
                  {demo ? (
                    <div className="gc px-5 py-4 flex flex-wrap items-center justify-between gap-2">{content}</div>
                  ) : (
                    <Link href={`/cliente/chamados/${t.id}`} className="gc px-5 py-4 flex flex-wrap items-center justify-between gap-2 hover:border-accent/40 transition-colors">
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {ticketForm && <div className="mt-5">{ticketForm}</div>}
      </section>

      {/* Documentos e faturas */}
      <section>
        <SectionLabel>Documentos e faturas</SectionLabel>
        {documents.length === 0 ? (
          <p className="text-[14px] text-text-dim mt-3">Contrato, notas fiscais e demais documentos do projeto ficam disponíveis aqui.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {documents.map((doc) => {
              const isInvoice = doc.amountCents != null || doc.paid != null;
              return (
                <li key={doc.id} className="gc px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] uppercase tracking-[1px] font-semibold text-text-dim">{STATUS_LABELS.document[doc.kind]}</span>
                      {isInvoice && doc.paid != null && (
                        <StatusBadge tone={doc.paid ? "done" : "warn"}>{doc.paid ? "Pago" : "Pendente"}</StatusBadge>
                      )}
                    </div>
                    <div className="text-[14.5px] font-medium text-text-light">{doc.title}</div>
                    <div className="text-[12px] text-text-muted">
                      {[doc.referenceDate && formatDate(doc.referenceDate), isInvoice && formatMoney(doc.amountCents), formatSize(doc.sizeBytes)]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  </div>
                  {demo ? (
                    <span className="text-[13px] text-accent-light font-medium">Baixar</span>
                  ) : (
                    <a href={`/cliente/documentos/${doc.id}`} className="text-[13px] text-accent-light hover:text-accent font-medium">
                      Baixar
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
