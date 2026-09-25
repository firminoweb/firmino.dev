import { SERVICES, CLIENT_PROJECTS, PUBLISHED_PROJECTS, COMPANY } from "@/data/portfolio";
import {
  GUARANTEES,
  FAQ_ITEMS,
  KNOWS_ABOUT,
  PROCESS_STEPS,
  ENGAGEMENT_MODELS,
} from "@/data/empresa";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getServicoBySlug, hasServicoContent } from "@/lib/servicos";
import { getAllSolucoes, getSolucaoBySlug } from "@/lib/solucoes";
import { absoluteUrl } from "@/lib/seo";
import type { Project } from "@/types";

/* ════════════════════════════════════════════
   Versões em Markdown do site · firmino.dev
   Para IAs e agentes: o /llms.txt e as páginas
   servidas com `Accept: text/markdown` (rewrite
   em next.config.ts → /md/...). Tudo sai dos
   mesmos dados das páginas HTML.
   E-mail e telefone ficam de fora de propósito:
   no site eles só aparecem ofuscados; aqui o
   caminho de contato é a página /contato.
   ════════════════════════════════════════════ */

function link(title: string, path: string, desc?: string): string {
  return `- [${title}](${absoluteUrl(path)})${desc ? `: ${desc}` : ""}`;
}

const CONTACT_FOOTER = [
  "---",
  "",
  `Fale com a firmino.dev: ${absoluteUrl("/contato")} (formulário e WhatsApp, resposta em até 24h úteis).`,
];

const COMPANY_SUMMARY = `Empresa brasileira de desenvolvimento de software sob medida (${COMPANY.legalName}, CNPJ ${COMPANY.cnpj}), sediada em São Paulo e com atendimento remoto em todo o Brasil. Faz sites, sistemas web, apps iOS e Android, automações com IA e manutenção de sistemas, do pequeno negócio à grande operação, e reforço técnico para agências.`;

function publishedServices() {
  return SERVICES.filter((s) => hasServicoContent(s.slug));
}

/** /llms.txt (https://llmstxt.org). Também é a versão Markdown da home. */
export function llmsTxt(): string {
  return [
    "# firmino.dev",
    "",
    `> ${COMPANY_SUMMARY}`,
    "",
    `Especialidades: ${KNOWS_ABOUT.join(", ")}.`,
    "",
    "Garantias:",
    ...GUARANTEES.map((g) => `- ${g.title}: ${g.desc}`),
    "",
    "## Serviços",
    "",
    ...publishedServices().map((s) => link(s.title, `/servicos/${s.slug}`, s.desc)),
    "",
    "## Soluções por segmento",
    "",
    ...getAllSolucoes().map((s) => link(s.title, `/solucoes/${s.slug}`, s.description)),
    "",
    "## Cases de clientes",
    "",
    ...CLIENT_PROJECTS.map((p) =>
      link(p.title, `/projetos/${p.slug}`, `${p.client} (${p.segment}). ${p.summary}`),
    ),
    "",
    "## Perguntas frequentes",
    "",
    ...FAQ_ITEMS.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Artigos",
    "",
    ...getAllPosts().map((p) => link(p.title, `/blog/${p.slug}`, p.description)),
    "",
    "## Empresa e contato",
    "",
    link("Como trabalhamos", "/como-trabalhamos", "modelos de contratação, etapas do projeto e garantias"),
    link("Sobre", "/sobre", "quem somos, estrutura do time e liderança técnica"),
    link("Contato", "/contato", "formulário e WhatsApp, resposta em até 24h úteis"),
    "",
    "## Para agentes de IA",
    "",
    link("API de contato", "/docs/api", "enviar pedido de orçamento com o consentimento da pessoa (OpenAPI em /openapi.json)"),
    link("Agent Skills", "/.well-known/agent-skills/index.json", "como conhecer a empresa e como solicitar orçamento"),
    "- Servidor MCP (Streamable HTTP, sem login): https://firmino.dev/mcp, com as ferramentas `listar_servicos`, `listar_cases`, `ler_pagina` e `solicitar_orcamento`. Adicione como conector no seu assistente.",
    "- WebMCP: no navegador, as mesmas ferramentas ficam disponíveis em https://firmino.dev",
    link("Catálogo de recursos para agentes (ARD)", "/.well-known/ai-catalog.json"),
    "- Todas as páginas de conteúdo respondem em Markdown com `Accept: text/markdown`",
    "",
    "## Optional",
    "",
    link("Stack", "/stack", "tecnologias que usamos"),
    link("João Firmino", "/joao", "fundador e líder técnico"),
    link("Política de privacidade", "/politica-de-privacidade"),
    "",
  ].join("\n");
}

function servicesMd(): string {
  return [
    "# Serviços da firmino.dev",
    "",
    `> ${COMPANY_SUMMARY}`,
    "",
    ...publishedServices().map((s) => link(s.title, `/servicos/${s.slug}`, s.desc)),
    "",
    ...CONTACT_FOOTER,
  ].join("\n");
}

function serviceMd(slug: string): string | null {
  const servico = getServicoBySlug(slug);
  if (!servico) return null;
  return [
    `# ${servico.title}`,
    "",
    `> ${servico.description}`,
    "",
    servico.content.trim(),
    "",
    ...CONTACT_FOOTER,
  ].join("\n");
}

function solucoesMd(): string {
  return [
    "# Soluções por segmento da firmino.dev",
    "",
    ...getAllSolucoes().map((s) => link(s.title, `/solucoes/${s.slug}`, s.description)),
    "",
    ...CONTACT_FOOTER,
  ].join("\n");
}

function solucaoMd(slug: string): string | null {
  const s = getSolucaoBySlug(slug);
  if (!s) return null;
  const cases = CLIENT_PROJECTS.filter((p) => s.cases.includes(p.slug));
  return [
    `# ${s.title}: ${s.headline}`,
    "",
    `> ${s.description}`,
    "",
    s.content.trim(),
    "",
    ...(cases.length
      ? [
          s.prova === "setor" ? "## Cases" : "## Projetos de outros setores que provam a solução",
          "",
          ...cases.map((p) => link(p.title, `/projetos/${p.slug}`, `${p.client}. ${p.summary}`)),
          "",
        ]
      : []),
    ...(s.faq.length ? ["## Perguntas frequentes", "", ...s.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""])] : []),
    ...CONTACT_FOOTER,
  ].join("\n");
}

function projectsMd(): string {
  return [
    "# Cases de clientes da firmino.dev",
    "",
    ...CLIENT_PROJECTS.map((p) =>
      link(p.title, `/projetos/${p.slug}`, `${p.client} (${p.segment}). ${p.summary}`),
    ),
    "",
    ...CONTACT_FOOTER,
  ].join("\n");
}

function section(title: string, paragraphs: string[]): string[] {
  return paragraphs.length ? [`## ${title}`, "", ...paragraphs.flatMap((p) => [p, ""])] : [];
}

function projectMd(slug: string): string | null {
  const p: Project | undefined = PUBLISHED_PROJECTS.find((x) => x.slug === slug);
  if (!p) return null;
  const isCareer = p.kind === "carreira";
  return [
    `# ${p.title}`,
    "",
    `> ${p.summary}`,
    "",
    // Mesma separação da página: case de carreira é do João como funcionário
    isCareer
      ? `Projeto da carreira de João Firmino (fundador da firmino.dev), feito como funcionário de ${p.client}.`
      : `Case de cliente da firmino.dev para ${p.client}.`,
    "",
    `- Cliente: ${p.client}`,
    `- Setor: ${p.segment}`,
    `- ${isCareer ? "Papel" : "Entrega"}: ${p.role}`,
    `- Duração: ${p.duration}`,
    `- Stack: ${p.stack.join(", ")}`,
    "",
    ...(p.metrics.length
      ? ["## Resultados em números", "", ...p.metrics.map((m) => `- ${m.value}: ${m.label}`), ""]
      : []),
    ...section("Contexto", p.context),
    ...section("Desafio", p.challenge),
    ...section("Solução", p.solution),
    ...section("Resultado", p.outcome),
    ...CONTACT_FOOTER,
  ].join("\n");
}

function blogMd(): string {
  return [
    "# Blog da firmino.dev",
    "",
    ...getAllPosts().map((p) => link(p.title, `/blog/${p.slug}`, p.description)),
    "",
  ].join("\n");
}

function postMd(slug: string): string | null {
  const post = getPostBySlug(slug);
  if (!post) return null;
  return [
    `# ${post.title}`,
    "",
    `> ${post.description}`,
    "",
    `Por ${post.author ?? "João Firmino"}, publicado em ${post.date}${post.updated ? `, atualizado em ${post.updated}` : ""}.`,
    "",
    post.content.trim(),
    "",
    ...CONTACT_FOOTER,
  ].join("\n");
}

function howWeWorkMd(): string {
  return [
    "# Como trabalhamos",
    "",
    "## Modelos de contratação",
    "",
    ...ENGAGEMENT_MODELS.flatMap((m) => [`### ${m.title}`, "", `Para: ${m.forWhen}`, "", `Cobrança: ${m.billing}`, ""]),
    "## Etapas do projeto",
    "",
    ...PROCESS_STEPS.map((s) => `${Number(s.num)}. **${s.title}**: ${s.desc}`),
    "",
    "## Garantias",
    "",
    ...GUARANTEES.map((g) => `- **${g.title}**: ${g.desc}`),
    "",
    ...CONTACT_FOOTER,
  ].join("\n");
}

/**
 * Markdown da página em `path` (segmentos da URL; [] = home), ou null se a
 * página não tem versão Markdown. Precisa bater com os rewrites de
 * next.config.ts e com markdownPaths().
 */
export function pageMarkdown(path: string[]): string | null {
  const [section, slug, ...rest] = path;
  if (rest.length) return null;
  if (!section) return llmsTxt();
  if (section === "como-trabalhamos") return slug ? null : howWeWorkMd();
  if (section === "servicos") return slug ? serviceMd(slug) : servicesMd();
  if (section === "solucoes") return slug ? solucaoMd(slug) : solucoesMd();
  if (section === "projetos") return slug ? projectMd(slug) : projectsMd();
  if (section === "blog") return slug ? postMd(slug) : blogMd();
  return null;
}

/** Todas as páginas com versão Markdown, para pré-renderizar no build. */
export function markdownPaths(): string[][] {
  return [
    [],
    ["como-trabalhamos"],
    ["servicos"],
    ...publishedServices().map((s) => ["servicos", s.slug]),
    ["solucoes"],
    ...getAllSolucoes().map((s) => ["solucoes", s.slug]),
    ["projetos"],
    ...PUBLISHED_PROJECTS.map((p) => ["projetos", p.slug]),
    ["blog"],
    ...getAllPosts().map((p) => ["blog", p.slug]),
  ];
}
