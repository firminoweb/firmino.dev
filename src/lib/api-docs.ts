import { z } from "zod";
import { ContactSchema, MIN_FILL_TIME_MS } from "@/lib/contact";
import { PROJECT_TYPES } from "@/lib/contact-options";
import { absoluteUrl } from "@/lib/seo";

/* ════════════════════════════════════════════
   Documentação da API pública · firmino.dev
   Única API pública: POST /api/contact. O
   OpenAPI sai do mesmo ContactSchema que a
   rota valida, então doc e validação não
   divergem. Publicado via /.well-known/api-catalog
   (RFC 9727), /openapi.json e /docs/api.
   ════════════════════════════════════════════ */

export const API_PATHS = {
  catalog: "/.well-known/api-catalog",
  openapi: "/openapi.json",
  docs: "/docs/api",
  health: "/api/health",
  contact: "/api/contact",
};

// Honeypot e atribuição são internos do site; canal é preenchido pelo servidor
const PublicContactSchema = ContactSchema.omit({ website: true, attribution: true, channel: true });

export function openApiSpec() {
  const requestSchema = z.toJSONSchema(PublicContactSchema, { io: "input" });
  return {
    openapi: "3.1.0",
    info: {
      title: "firmino.dev API",
      version: "1.0.0",
      description:
        "API pública da firmino.dev, empresa de desenvolvimento de software sob medida. Permite que agentes e integrações enviem um pedido de contato ou orçamento. Envie somente com o consentimento explícito da pessoa.",
    },
    servers: [{ url: absoluteUrl("/") }],
    externalDocs: { url: absoluteUrl(API_PATHS.docs) },
    paths: {
      [API_PATHS.contact]: {
        post: {
          operationId: "solicitarContato",
          summary: "Envia um pedido de contato/orçamento",
          description: `Resposta por e-mail em até 24h úteis. Limite de 3 envios por minuto por IP. Envios com elapsedMs abaixo de ${MIN_FILL_TIME_MS} são aceitos (201) mas descartados como spam.`,
          requestBody: {
            required: true,
            content: { "application/json": { schema: requestSchema } },
          },
          responses: {
            "201": { description: "Pedido recebido" },
            "400": { description: "Campos inválidos (ver `fields` na resposta)" },
            "429": { description: "Muitas tentativas" },
            "5XX": { description: "Falha ao entregar o e-mail" },
          },
        },
      },
      [API_PATHS.health]: {
        get: {
          operationId: "status",
          summary: "Status da API",
          responses: { "200": { description: "API no ar" } },
        },
      },
    },
  };
}

export function apiDocsMd(): string {
  return [
    "# API da firmino.dev",
    "",
    "> Uma única operação pública: enviar um pedido de contato ou orçamento para a firmino.dev, que responde por e-mail em até 24h úteis.",
    "",
    "Use somente quando a pessoa pediu para entrar em contato e confirmou os dados. Não envie mensagens em massa nem sem consentimento.",
    "",
    `- Especificação OpenAPI: ${absoluteUrl(API_PATHS.openapi)}`,
    `- Catálogo (RFC 9727): ${absoluteUrl(API_PATHS.catalog)}`,
    `- Status: ${absoluteUrl(API_PATHS.health)}`,
    "",
    `## POST ${API_PATHS.contact}`,
    "",
    "Corpo JSON:",
    "",
    "| Campo | Obrigatório | Regra |",
    "|---|---|---|",
    "| `name` | sim | 2 a 120 caracteres |",
    "| `email` | sim | e-mail válido |",
    "| `company` | não | até 160 caracteres |",
    `| \`projectType\` | sim | ${PROJECT_TYPES.map((t) => `\`${t.value}\` (${t.label})`).join(", ")} |`,
    "| `message` | sim | 10 a 4000 caracteres, com contexto do que a pessoa precisa |",
    `| \`elapsedMs\` | sim na prática | tempo em ms entre abrir o formulário e enviar; abaixo de ${MIN_FILL_TIME_MS} o envio é descartado como spam |`,
    "",
    "Exemplo:",
    "",
    "```json",
    JSON.stringify(
      {
        name: "Maria Souza",
        email: "maria@empresa.com.br",
        company: "Empresa Exemplo",
        projectType: "web",
        message: "Preciso de um sistema para controlar pedidos que hoje ficam numa planilha.",
        elapsedMs: 30000,
      },
      null,
      2,
    ),
    "```",
    "",
    "Respostas: `201` recebido; `400` campos inválidos (`fields` traz o erro de cada campo); `429` muitas tentativas (limite de 3 por minuto).",
    "",
    `No navegador, agentes com suporte a WebMCP podem usar a ferramenta \`solicitar_orcamento\` em ${absoluteUrl("/")}.`,
    "",
  ].join("\n");
}
