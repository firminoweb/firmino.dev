import { z } from "zod";
import { MIN_FILL_TIME_MS, PROJECT_TYPE_VALUES } from "@/lib/contact-options";

export { LEAD_CHANNELS, MIN_FILL_TIME_MS } from "@/lib/contact-options";

/* ════════════════════════════════════════════
   Contrato do contato · firmino.dev
   Schema do POST /api/contact (só servidor):
   validação da API e geração do /openapi.json.
   Constantes usadas no cliente ficam em
   lib/contact-options.ts.
   ════════════════════════════════════════════ */

const TouchSchema = z.object({
  l: z.string().max(300),
  r: z.string().max(253),
  t: z.number().int().nonnegative(),
});

export const ContactSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(120, "Nome muito longo").describe("Nome de quem pede o contato"),
  email: z.email("E-mail inválido").max(180).describe("E-mail para a resposta"),
  company: z.string().max(160).optional().default("").describe("Empresa (opcional)"),
  projectType: z
    .enum(PROJECT_TYPE_VALUES, { message: "Selecione uma opção" })
    .describe(
      "web = site ou sistema web; mobile = app iOS/Android; ia = IA e automação; reforco = reforço para time ou agência; outro = outro ou ainda não sabe",
    ),
  message: z
    .string()
    .min(10, "Mensagem muito curta (mín. 10 caracteres)")
    .max(4000, "Mensagem muito longa")
    .describe("O que a pessoa precisa, com o máximo de contexto (negócio, prazo, o que já existe)"),
  website: z.string().max(0).optional().default(""), // honeypot: precisa vir vazio
  elapsedMs: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .default(0)
    .describe(`Milissegundos entre abrir o formulário e enviar. Abaixo de ${MIN_FILL_TIME_MS} o envio é descartado como spam.`),
  channel: z.enum(["form", "webmcp", "mcp", "api"]).optional().default("api").describe("Canal de envio"),
  // Informativo: dado de origem malformado nunca pode barrar um lead
  attribution: z
    .object({ session: TouchSchema.optional(), first: TouchSchema.optional() })
    .optional()
    .catch(undefined),
});

export type ContactInput = z.input<typeof ContactSchema>;
