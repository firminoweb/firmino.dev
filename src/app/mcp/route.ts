import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import {
  TOOL_INFO,
  READ_PATH_DESCRIPTION,
  READ_PATH_ERROR,
  MESSAGE_DESCRIPTION,
  CONTACT_SENT,
  contactErrorText,
  readablePath,
} from "@/lib/agent-tools";
import { MIN_FILL_TIME_MS, PROJECT_TYPES, PROJECT_TYPE_VALUES } from "@/lib/contact-options";
import { submitContact } from "@/lib/contact-service";
import { pageMarkdown } from "@/lib/markdown";
import { MCP_SERVER } from "@/lib/mcp";

/*
 * Servidor MCP (Streamable HTTP, sem sessão) com as mesmas ferramentas do
 * WebMCP. Permite adicionar a firmino.dev como conector no Claude, ChatGPT etc.
 * Descoberta: /.well-known/mcp/server-card.json, /.well-known/ai-catalog.json
 * e DNS _mcp._agents.firmino.dev.
 */

const text = (t: string, isError = false) => ({
  content: [{ type: "text" as const, text: t }],
  ...(isError && { isError }),
});

function markdownOf(path: string) {
  const md = pageMarkdown(path.split("/").filter(Boolean));
  return md ? text(md) : text(READ_PATH_ERROR, true);
}

const handler = createMcpHandler(
  (server) => {
    const readOnly = { readOnlyHint: true, openWorldHint: false } as const;

    server.registerTool("listar_servicos", { ...TOOL_INFO.listar_servicos, annotations: readOnly }, async () =>
      markdownOf("/servicos"),
    );

    server.registerTool("listar_cases", { ...TOOL_INFO.listar_cases, annotations: readOnly }, async () =>
      markdownOf("/projetos"),
    );

    server.registerTool(
      "ler_pagina",
      {
        ...TOOL_INFO.ler_pagina,
        inputSchema: z.object({ caminho: z.string().describe(READ_PATH_DESCRIPTION) }),
        annotations: readOnly,
      },
      async ({ caminho }) => {
        const path = readablePath(caminho);
        return path ? markdownOf(path) : text(READ_PATH_ERROR, true);
      },
    );

    server.registerTool(
      "solicitar_orcamento",
      {
        ...TOOL_INFO.solicitar_orcamento,
        inputSchema: z.object({
          nome: z.string().min(2).max(120),
          email: z.email().max(180),
          empresa: z.string().max(160).optional().describe("Opcional"),
          tipo_projeto: z
            .enum(PROJECT_TYPE_VALUES)
            .describe(PROJECT_TYPES.map((t) => `${t.value} = ${t.label}`).join("; ")),
          mensagem: z.string().min(10).max(4000).describe(MESSAGE_DESCRIPTION),
          // Fora do navegador não há clique de "enviar": o agente precisa
          // declarar que a pessoa revisou e autorizou o envio.
          pessoa_confirmou: z
            .literal(true)
            .describe("true somente depois que a pessoa revisou nome, e-mail e mensagem e autorizou o envio"),
        }),
        annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
      },
      async (input) => {
        // Balde único "mcp" no rate limit: o IP que chega aqui é o do
        // assistente (Anthropic, OpenAI...), não o da pessoa.
        const { body } = await submitContact(
          {
            name: input.nome,
            email: input.email,
            company: input.empresa ?? "",
            projectType: input.tipo_projeto,
            message: input.mensagem,
            elapsedMs: MIN_FILL_TIME_MS,
            channel: "mcp",
          },
          "mcp",
        );
        return body.success ? text(CONTACT_SENT) : text(contactErrorText(body.error, body.fields), true);
      },
    );
  },
  {
    serverInfo: { name: MCP_SERVER.name, version: MCP_SERVER.version },
    instructions: `${MCP_SERVER.description} Responda em português. Nunca invente preço: a estimativa é feita sem custo na primeira conversa.`,
  },
);

export { handler as GET, handler as POST, handler as DELETE };
