import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { FaqItem } from "@/data/empresa";

/* ════════════════════════════════════════════
   Soluções por segmento · firmino.dev
   content/solucoes/<slug>.mdx → /solucoes/<slug>
   Slug = termo que o cliente busca (ex.:
   sistema-para-advocacia). Só entra segmento
   com case de cliente real em `cases`.
   ════════════════════════════════════════════ */

const SOLUCOES_DIR = path.join(process.cwd(), "content/solucoes");

export interface SolucaoContent {
  slug: string;
  /** Nome curto do segmento ("Advocacia"), usado em menu, cards e links. */
  segment: string;
  /** Título com o termo de busca; vira <title> e início do H1. */
  title: string;
  /** Complemento de venda do H1 (em itálico). */
  headline: string;
  description: string;
  icon: string;
  tags: string[];
  /** Slugs de PROJECTS que provam o segmento (precisam ser cases de cliente). */
  cases: string[];
  /** Slugs de SERVICES relacionados. */
  servicos: string[];
  /** Mensagem pré-preenchida do WhatsApp. */
  whatsapp: string;
  faq: FaqItem[];
  /** Última revisão relevante (YYYY-MM-DD). Alimenta o sitemap. */
  updated?: string;
  content: string;
}

function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value ? String(value) : undefined;
}

function listFiles(): string[] {
  if (!fs.existsSync(SOLUCOES_DIR)) return [];
  return fs.readdirSync(SOLUCOES_DIR).filter((f) => f.endsWith(".mdx"));
}

function parseFile(file: string): SolucaoContent {
  const raw = fs.readFileSync(path.join(SOLUCOES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const list = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);

  return {
    slug: file.replace(/\.mdx$/, ""),
    segment: String(data.segment),
    title: String(data.title),
    headline: String(data.headline),
    description: String(data.description),
    icon: String(data.icon ?? "◆"),
    tags: list(data.tags),
    cases: list(data.cases),
    servicos: list(data.servicos),
    whatsapp: String(data.whatsapp),
    faq: Array.isArray(data.faq)
      ? data.faq.map((f: { q: unknown; a: unknown }) => ({ q: String(f.q), a: String(f.a) }))
      : [],
    updated: toIsoDate(data.updated),
    content,
  };
}

export function getAllSolucoes(): SolucaoContent[] {
  return listFiles()
    .map(parseFile)
    .sort((a, b) => a.segment.localeCompare(b.segment, "pt-BR"));
}

export function getSolucaoBySlug(slug: string): SolucaoContent | null {
  const file = `${slug}.mdx`;
  return listFiles().includes(file) ? parseFile(file) : null;
}

/** Segmento no meio da frase: só a 1ª letra minúscula ("Cobrança por Pix" → "cobrança por Pix"). */
export function segmentInSentence(s: SolucaoContent): string {
  return s.segment.charAt(0).toLowerCase() + s.segment.slice(1);
}

/** Soluções que citam o case, para linkar a página do case de volta ao segmento. */
export function getSolucoesForCase(projectSlug: string): SolucaoContent[] {
  return getAllSolucoes().filter((s) => s.cases.includes(projectSlug));
}
