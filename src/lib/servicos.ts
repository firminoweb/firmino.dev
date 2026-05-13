import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { SERVICES } from "@/data/portfolio";

const SERVICOS_DIR = path.join(process.cwd(), "content/servicos");

export interface ServicoContent {
  slug: string;
  title: string;
  description: string;
  icon: string;
  /** Headline used in the hero of the detail page. Falls back to title. */
  headline?: string;
  /** Short keywords for SEO. */
  tags?: string[];
  content: string;
  readingTime: string;
}

function listFiles(): string[] {
  if (!fs.existsSync(SERVICOS_DIR)) return [];
  return fs.readdirSync(SERVICOS_DIR).filter((f) => f.endsWith(".mdx"));
}

function parseFile(file: string): ServicoContent {
  const raw = fs.readFileSync(path.join(SERVICOS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx$/, "");
  const service = SERVICES.find((s) => s.slug === slug);

  return {
    slug,
    title: String(data.title ?? service?.title ?? slug),
    description: String(data.description ?? service?.desc ?? ""),
    icon: String(data.icon ?? service?.icon ?? "◆"),
    headline: data.headline ? String(data.headline) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getServicoBySlug(slug: string): ServicoContent | null {
  const file = `${slug}.mdx`;
  if (!listFiles().includes(file)) return null;
  return parseFile(file);
}

export function getAllServicoSlugs(): string[] {
  return listFiles().map((f) => f.replace(/\.mdx$/, ""));
}

export function hasServicoContent(slug: string): boolean {
  return listFiles().includes(`${slug}.mdx`);
}
