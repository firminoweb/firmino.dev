/* ════════════════════════════════════════════
   Modelo do que a área do cliente mostra.
   Sem banco: usado pelos componentes do portal
   e pela demo pública (src/data/portal-demo.ts).
   Datas "YYYY-MM-DD" (date) e ISO (timestamp).
   ════════════════════════════════════════════ */

export type ProjectStatus = "ativo" | "pausado" | "concluido";
export type MilestoneStatus = "planejada" | "em_andamento" | "concluida";
export type TicketStatus = "aberto" | "em_andamento" | "resolvido";
export type DocumentKind = "contrato" | "proposta" | "nota_fiscal" | "boleto" | "relatorio" | "outro";

export interface ProjectSummary {
  id: string;
  name: string;
  summary: string;
  stage: string;
  status: ProjectStatus;
}

export interface MilestoneView {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  status: MilestoneStatus;
}

export interface DeliveryView {
  id: string;
  title: string;
  description: string;
  deliveredOn: string;
  linkUrl: string | null;
}

export interface TicketSummary {
  id: string;
  title: string;
  status: TicketStatus;
  updatedAt: string;
}

export interface DocumentView {
  id: string;
  kind: DocumentKind;
  title: string;
  referenceDate: string | null;
  amountCents: number | null;
  paid: boolean | null;
  fileName: string;
  sizeBytes: number;
}

export interface ProjectDetail {
  project: ProjectSummary & { clientName: string };
  milestones: MilestoneView[];
  deliveries: DeliveryView[];
  tickets: TicketSummary[];
  documents: DocumentView[];
}

export interface TicketMessageView {
  id: string;
  body: string;
  createdAt: string;
  authorName: string;
  fromTeam: boolean;
}

export interface TicketDetail {
  ticket: TicketSummary & { projectId: string; projectName: string; clientId: string; clientName: string };
  messages: TicketMessageView[];
}

export const STATUS_LABELS = {
  project: { ativo: "Em andamento", pausado: "Pausado", concluido: "Concluído" },
  milestone: { planejada: "Planejada", em_andamento: "Em andamento", concluida: "Concluída" },
  ticket: { aberto: "Aberto", em_andamento: "Em atendimento", resolvido: "Resolvido" },
  document: {
    contrato: "Contrato",
    proposta: "Proposta",
    nota_fiscal: "Nota fiscal",
    boleto: "Boleto",
    relatorio: "Relatório",
    outro: "Documento",
  },
} as const;
