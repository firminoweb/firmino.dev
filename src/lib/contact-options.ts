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

/** Tempo mínimo de preenchimento; abaixo disso o envio é descartado em silêncio (antispam). */
export const MIN_FILL_TIME_MS = 2_000;

/** Por onde o lead chegou, exibido no e-mail. Ausente = chamada direta à API. */
export const LEAD_CHANNELS = {
  form: "Formulário do site",
  webmcp: "Agente de IA no navegador (WebMCP)",
  api: "API (agente ou integração)",
} as const;
