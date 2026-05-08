import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  cover?: string;
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
}

function parseFile(file: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx$/, "");
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date,
    author: data.author ? String(data.author) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return listFiles()
    .map(parseFile)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const file = `${slug}.mdx`;
  if (!listFiles().includes(file)) return null;
  return parseFile(file);
}

export function getAllSlugs(): string[] {
  return listFiles().map((f) => f.replace(/\.mdx$/, ""));
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
} {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    next: i > 0 ? posts[i - 1] : null,
    prev: i < posts.length - 1 ? posts[i + 1] : null,
  };
}
