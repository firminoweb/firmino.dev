/* ════════════════════════════════════════════
   Ferramentas para agentes · firmino.dev
   Nome, título e descrição de cada ferramenta,
   compartilhados pelo WebMCP (lib/webmcp.ts,
   no navegador) e pelo servidor MCP (/mcp).
   Sem zod de propósito: vai para o cliente.
   ════════════════════════════════════════════ */

export const TOOL_INFO = {
  listar_servicos: {
    title: "Listar serviços",
    description:
      "Lista os serviços da firmino.dev (sites, sistemas, apps, automações com IA, manutenção, reforço para agências) com descrição e link.",
  },
  listar_cases: {
    title: "Listar cases",
    description: "Lista os cases de clientes da firmino.dev com cliente, setor, resumo e link.",
  },
  ler_pagina: {
    title: "Ler página",
    description:
      "Lê em Markdown uma página do site: '/' (visão geral e FAQ), '/como-trabalhamos' (contratação e garantias), '/solucoes' (soluções por segmento, ex.: advocacia, clínicas, academias, cobrança por Pix), '/servicos/<slug>', '/solucoes/<slug>', '/projetos/<slug>' ou '/blog/<slug>'.",
  },
  solicitar_orcamento: {
    title: "Solicitar orçamento",
    description:
      "Envia um pedido de contato/orçamento para a firmino.dev, que responde por e-mail em até 24h úteis. Só use quando a pessoa pediu explicitamente para entrar em contato e confirmou nome, e-mail e a mensagem.",
  },
} as const;

export const READ_PATH_DESCRIPTION = "Caminho da página, ex.: /servicos/automacoes-com-ia";
export const MESSAGE_DESCRIPTION = "O que a pessoa precisa, com contexto (negócio, prazo, o que já existe)";

// Mesmo roteamento do Accept: text/markdown (next.config.ts → /md)
const READABLE_PATH = /^\/((servicos|solucoes|projetos|blog)(\/[a-z0-9-]+)?|como-trabalhamos)?$/;

/** Normaliza o caminho pedido pelo agente; null se a página não tem versão Markdown. */
export function readablePath(input: unknown): string | null {
  const path = String(input ?? "").split(/[?#]/)[0].replace(/\/$/, "") || "/";
  return READABLE_PATH.test(path) ? path : null;
}

export const READ_PATH_ERROR = "Caminho não disponível. Use listar_servicos ou listar_cases para ver as páginas.";
export const CONTACT_SENT = "Pedido enviado. A firmino.dev responde no e-mail informado em até 24h úteis.";

/** Mensagem de erro legível a partir da resposta do contato. */
export function contactErrorText(error?: string, fields?: Record<string, string>): string {
  const reason = (error ?? "erro desconhecido").replace(/\.$/, "");
  const detail = fields ? ` ${Object.values(fields).join("; ")}.` : "";
  return `Não foi possível enviar: ${reason}.${detail}`;
}
