import { trackEvent } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { MIN_FILL_TIME_MS, PROJECT_TYPES, PROJECT_TYPE_VALUES } from "@/lib/contact-options";

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

// Mesmo roteamento do Accept: text/markdown (next.config.ts → /md)
const READABLE_PATH = /^\/((servicos|solucoes|projetos|blog)(\/[a-z0-9-]+)?|como-trabalhamos)?$/;

async function fetchMarkdown(path: string): Promise<ToolResult> {
  const res = await fetch(path, { headers: { Accept: "text/markdown" } });
  if (!res.ok) return text(`Página não encontrada: ${path}`, true);
  return text(await res.text());
}

const loadedAt = Date.now();

const TOOLS: WebMcpTool[] = [
  {
    name: "listar_servicos",
    title: "Listar serviços",
    description:
      "Lista os serviços da firmino.dev (sites, sistemas, apps, automações com IA, manutenção, reforço para agências) com descrição e link.",
    annotations: { readOnlyHint: true },
    execute: () => fetchMarkdown("/servicos"),
  },
  {
    name: "listar_cases",
    title: "Listar cases",
    description: "Lista os cases de clientes da firmino.dev com cliente, setor, resumo e link.",
    annotations: { readOnlyHint: true },
    execute: () => fetchMarkdown("/projetos"),
  },
  {
    name: "ler_pagina",
    title: "Ler página",
    description:
      "Lê em Markdown uma página do site: '/' (visão geral e FAQ), '/como-trabalhamos' (contratação e garantias), '/solucoes' (soluções por segmento, ex.: advocacia, agências de viagem), '/servicos/<slug>', '/solucoes/<slug>', '/projetos/<slug>' ou '/blog/<slug>'.",
    inputSchema: {
      type: "object",
      properties: {
        caminho: { type: "string", description: "Caminho da página, ex.: /servicos/automacoes-com-ia" },
      },
      required: ["caminho"],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ caminho }) => {
      const path = String(caminho ?? "").split(/[?#]/)[0].replace(/\/$/, "") || "/";
      if (!READABLE_PATH.test(path)) {
        return text("Caminho não disponível. Use listar_servicos ou listar_cases para ver as páginas.", true);
      }
      return fetchMarkdown(path);
    },
  },
  {
    name: "solicitar_orcamento",
    title: "Solicitar orçamento",
    description:
      "Envia um pedido de contato/orçamento para a firmino.dev, que responde por e-mail em até 24h úteis. Só use quando a pessoa pediu explicitamente para entrar em contato e confirmou nome, e-mail e a mensagem.",
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
          description: "O que a pessoa precisa, com contexto (negócio, prazo, o que já existe)",
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

      if (!res.ok || !data.success) {
        const reason = (data.error ?? "erro desconhecido").replace(/\.$/, "");
        const fields = data.fields ? ` ${Object.values(data.fields).join("; ")}.` : "";
        return text(`Não foi possível enviar: ${reason}.${fields}`, true);
      }
      trackEvent("generate_lead", { method: "webmcp", project_type: String(input.tipo_projeto) });
      return text("Pedido enviado. A firmino.dev responde no e-mail informado em até 24h úteis.");
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
