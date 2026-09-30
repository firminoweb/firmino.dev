/* ════════════════════════════════════════════
   Constantes do contato · firmino.dev
   Sem zod de propósito: é importado por código
   de cliente (formulário, WebMCP). O schema de
   validação fica em lib/contact.ts (servidor).
   ════════════════════════════════════════════ */

/** Opções de "O que você precisa" (rótulos do formulário). */
export const PROJECT_TYPES = [
  { value: "web", label: "Site ou sistema web" },
  { value: "mobile", label: "App mobile (iOS/Android)" },
  { value: "ia", label: "IA e automação" },
  { value: "reforco", label: "Reforço para meu time ou agência" },
  { value: "outro", label: "Outro / ainda não sei" },
] as const;

export const PROJECT_TYPE_VALUES = ["web", "mobile", "ia", "reforco", "outro"] as const;

/** "Quanto você pensa em investir?" (opcional). Começa baixo de propósito: o autônomo não pode se sentir de fora. */
export const BUDGET_RANGES = [
  { value: "nao-sei", label: "Ainda não sei, quero uma estimativa" },
  { value: "ate-10k", label: "Até R$ 10 mil" },
  { value: "10k-30k", label: "R$ 10 mil a R$ 30 mil" },
  { value: "30k-80k", label: "R$ 30 mil a R$ 80 mil" },
  { value: "acima-80k", label: "Acima de R$ 80 mil" },
] as const;

export const BUDGET_VALUES = ["nao-sei", "ate-10k", "10k-30k", "30k-80k", "acima-80k"] as const;

/** Porte da operação (pedido guiado). */
export const COMPANY_SIZES = [
  { value: "autonomo", label: "Só eu (autônomo ou profissional liberal)" },
  { value: "pequena", label: "Pequena empresa (até 20 pessoas)" },
  { value: "media-grande", label: "Média ou grande empresa" },
  { value: "agencia", label: "Agência atendendo um cliente" },
] as const;

export const COMPANY_SIZE_VALUES = ["autonomo", "pequena", "media-grande", "agencia"] as const;

/** Prazo (pedido guiado). */
export const TIMELINES = [
  { value: "urgente", label: "O quanto antes" },
  { value: "3-meses", label: "Nos próximos 3 meses" },
  { value: "pesquisando", label: "Ainda estou pesquisando" },
] as const;

export const TIMELINE_VALUES = ["urgente", "3-meses", "pesquisando"] as const;

/** Botão de origem (`?origem=`): slug curto como "servico-automacoes-com-ia" ou "hero". */
export const SOURCE_PATTERN = /^[a-z0-9_-]{1,80}$/;

/** Rótulo de uma opção pelo valor (e-mail do lead). */
export function optionLabel(
  options: readonly { value: string; label: string }[],
  value: string | undefined,
): string | undefined {
  return value ? (options.find((o) => o.value === value)?.label ?? value) : undefined;
}

/**
 * Link para o formulário carregando o botão de origem (e o tipo, que já vem
 * selecionado). O formulário lê isso no navegador, então /contato segue estático.
 */
export function contactHref(source: string, projectType?: (typeof PROJECT_TYPE_VALUES)[number]): string {
  const params = new URLSearchParams({ origem: source });
  if (projectType) params.set("tipo", projectType);
  return `/contato?${params.toString()}`;
}

/** Mesmo que contactHref, mas para o pedido guiado (/orcamento). */
export function orcamentoHref(source: string): string {
  return `/orcamento?${new URLSearchParams({ origem: source }).toString()}`;
}

/** Tempo mínimo de preenchimento; abaixo disso o envio é descartado em silêncio (antispam). */
export const MIN_FILL_TIME_MS = 2_000;

/** Por onde o lead chegou, exibido no e-mail. Ausente = chamada direta à API. */
export const LEAD_CHANNELS = {
  form: "Formulário do site",
  webmcp: "Agente de IA no navegador (WebMCP)",
  mcp: "Assistente de IA via conector MCP (Claude, ChatGPT...)",
  api: "API (agente ou integração)",
} as const;
