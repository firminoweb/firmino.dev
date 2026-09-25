import type { ProjectDetail } from "@/lib/portal/types";

/**
 * Projeto fictício da demo pública (/area-do-cliente/demo). Mesmo formato
 * que o portal real recebe do banco, renderizado pelos mesmos componentes.
 * Nomes e valores são inventados; a página deixa isso explícito.
 */
export const PORTAL_DEMO: ProjectDetail = {
  project: {
    id: "demo",
    name: "Sistema de agendamento com pagamento por Pix",
    summary:
      "Agenda online para os pacientes marcarem e pagarem o sinal por Pix, com lembrete automático no WhatsApp e painel para a recepção.",
    stage: "Construção: 3ª entrega",
    status: "ativo",
    clientName: "Clínica Exemplo",
  },
  milestones: [
    {
      id: "m1",
      title: "Diagnóstico e plano",
      description: "Entendemos a rotina da recepção, combinamos o escopo e o cronograma.",
      dueDate: "2026-08-14",
      status: "concluida",
    },
    {
      id: "m2",
      title: "Protótipo aprovado",
      description: "Telas do agendamento validadas com a equipe da clínica antes de construir.",
      dueDate: "2026-08-28",
      status: "concluida",
    },
    {
      id: "m3",
      title: "Agendamento online",
      description: "Paciente escolhe o profissional, o dia e o horário pelo celular.",
      dueDate: "2026-09-25",
      status: "concluida",
    },
    {
      id: "m4",
      title: "Pagamento do sinal por Pix e lembretes",
      description: "Sinal pago no agendamento, confirmado sozinho, e lembrete no WhatsApp na véspera.",
      dueDate: "2026-10-09",
      status: "em_andamento",
    },
    {
      id: "m5",
      title: "Painel da recepção e lançamento",
      description: "Agenda do dia, faltas e pagamentos numa tela só. Sistema no ar para os pacientes.",
      dueDate: "2026-10-23",
      status: "planejada",
    },
  ],
  deliveries: [
    {
      id: "d3",
      title: "Agendamento online no ar em ambiente de teste",
      description: "A equipe da clínica já pode marcar consultas de teste pelo celular.",
      deliveredOn: "2026-09-25",
      linkUrl: "https://example.com",
    },
    {
      id: "d2",
      title: "Protótipo navegável aprovado",
      description: "Todas as telas do paciente e da recepção, com os ajustes pedidos na reunião.",
      deliveredOn: "2026-08-28",
      linkUrl: "https://example.com",
    },
    {
      id: "d1",
      title: "Plano do projeto",
      description: "Escopo, cronograma e o que fica pronto em cada entrega.",
      deliveredOn: "2026-08-14",
      linkUrl: null,
    },
  ],
  tickets: [
    { id: "t2", title: "Incluir o convênio no cadastro do paciente", status: "em_andamento", updatedAt: "2026-09-24T14:00:00Z" },
    { id: "t1", title: "Trocar o logo na tela inicial", status: "resolvido", updatedAt: "2026-09-02T10:00:00Z" },
  ],
  documents: [
    { id: "doc4", kind: "boleto", title: "Parcela 3 de 4", referenceDate: "2026-10-10", amountCents: 450000, paid: false, fileName: "parcela-3.pdf", sizeBytes: 96_000 },
    { id: "doc3", kind: "nota_fiscal", title: "NF parcela 2", referenceDate: "2026-09-10", amountCents: 450000, paid: true, fileName: "nf-parcela-2.pdf", sizeBytes: 120_000 },
    { id: "doc2", kind: "contrato", title: "Contrato de desenvolvimento", referenceDate: "2026-08-07", amountCents: null, paid: null, fileName: "contrato.pdf", sizeBytes: 310_000 },
    { id: "doc1", kind: "proposta", title: "Proposta comercial", referenceDate: "2026-08-01", amountCents: null, paid: null, fileName: "proposta.pdf", sizeBytes: 540_000 },
  ],
};
