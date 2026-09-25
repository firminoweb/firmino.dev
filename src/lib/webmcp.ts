import { trackEvent } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { MIN_FILL_TIME_MS, PROJECT_TYPES, PROJECT_TYPE_VALUES } from "@/lib/contact-options";
import {
  TOOL_INFO,
  READ_PATH_DESCRIPTION,
  READ_PATH_ERROR,
  MESSAGE_DESCRIPTION,
  CONTACT_SENT,
  contactErrorText,
  readablePath,
} from "@/lib/agent-tools";

/* ════════════════════════════════════════════
   WebMCP · firmino.dev
   Ferramentas que agentes de IA no navegador
   (Chrome/Gemini, ChatGPT Atlas, Comet...)
   podem chamar direto, sem "adivinhar" a
   interface. Carregado sob demanda pelo
   <WebMcpTools /> só quando a API existe.
   Spec: https://webmachinelearning.github.io/webmcp/
   ════════════════════════════════════════════ */

interface ToolResult {
  content: { type: "text"; text: string }[];
  isError?: boolean;
}

export interface WebMcpTool {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean; consequentialHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<ToolResult>;
}

/** Superfície atual (`registerTool`) e a das primeiras implementações (`provideContext`). */
export interface ModelContext {
  registerTool?: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => unknown;
  provideContext?: (context: { tools: WebMcpTool[] }) => unknown;
}

const text = (t: string, isError = false): ToolResult => ({
  content: [{ type: "text", text: t }],
  ...(isError && { isError }),
});

async function fetchMarkdown(path: string): Promise<ToolResult> {
  const res = await fetch(path, { headers: { Accept: "text/markdown" } });
  if (!res.ok) return text(`Página não encontrada: ${path}`, true);
  return text(await res.text());
}

const loadedAt = Date.now();

const TOOLS: WebMcpTool[] = [
  {
    name: "listar_servicos",
    ...TOOL_INFO.listar_servicos,
    annotations: { readOnlyHint: true },
    execute: () => fetchMarkdown("/servicos"),
  },
  {
    name: "listar_cases",
    ...TOOL_INFO.listar_cases,
    annotations: { readOnlyHint: true },
    execute: () => fetchMarkdown("/projetos"),
  },
  {
    name: "ler_pagina",
    ...TOOL_INFO.ler_pagina,
    inputSchema: {
      type: "object",
      properties: {
        caminho: { type: "string", description: READ_PATH_DESCRIPTION },
      },
      required: ["caminho"],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ caminho }) => {
      const path = readablePath(caminho);
      return path ? fetchMarkdown(path) : text(READ_PATH_ERROR, true);
    },
  },
  {
    name: "solicitar_orcamento",
    ...TOOL_INFO.solicitar_orcamento,
    inputSchema: {
      type: "object",
      properties: {
        nome: { type: "string", minLength: 2, maxLength: 120 },
        email: { type: "string", format: "email", maxLength: 180 },
        empresa: { type: "string", maxLength: 160, description: "Opcional" },
        tipo_projeto: {
          type: "string",
          enum: [...PROJECT_TYPE_VALUES],
          description: PROJECT_TYPES.map((t) => `${t.value} = ${t.label}`).join("; "),
        },
        mensagem: {
          type: "string",
          minLength: 10,
          maxLength: 4000,
          description: MESSAGE_DESCRIPTION,
        },
      },
      required: ["nome", "email", "tipo_projeto", "mensagem"],
    },
    annotations: { readOnlyHint: false, consequentialHint: true },
    execute: async (input) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(input.nome ?? "").trim(),
          email: String(input.email ?? "").trim(),
          company: String(input.empresa ?? "").trim(),
          projectType: input.tipo_projeto,
          message: String(input.mensagem ?? "").trim(),
          // O agente não "digita": conta o tempo desde que a página abriu
          elapsedMs: Math.max(Date.now() - loadedAt, MIN_FILL_TIME_MS),
          channel: "webmcp",
          attribution: readAttribution(),
        }),
      });
      const data: { success: boolean; error?: string; fields?: Record<string, string> } = await res
        .json()
        .catch(() => ({ success: false }));

      if (!res.ok || !data.success) return text(contactErrorText(data.error, data.fields), true);
      trackEvent("generate_lead", { method: "webmcp", project_type: String(input.tipo_projeto) });
      return text(CONTACT_SENT);
    },
  },
];

export function registerTools(mc: ModelContext, signal: AbortSignal): void {
  if (typeof mc.registerTool === "function") {
    for (const tool of TOOLS) mc.registerTool(tool, { signal });
  } else if (typeof mc.provideContext === "function") {
    mc.provideContext({ tools: TOOLS });
  }
}
