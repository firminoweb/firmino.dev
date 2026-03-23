/* ════════════════════════════════════════════
   CMS Client — Strapi-ready
   ════════════════════════════════════════════

   Quando o Strapi estiver configurado, basta
   definir as env vars e as funções já estarão
   prontas para consumir a API.
   ════════════════════════════════════════════ */

import type { CMSArticle, CMSProject } from "@/types";

const CMS_URL = process.env.STRAPI_URL || "http://localhost:1337";
const CMS_TOKEN = process.env.STRAPI_API_TOKEN || "";

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function fetchCMS<T>(endpoint: string): Promise<StrapiResponse<T>> {
  const res = await fetch(`${CMS_URL}/api${endpoint}`, {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`CMS fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getArticles(): Promise<CMSArticle[]> {
  const { data } = await fetchCMS<CMSArticle[]>("/articles?sort=publishedAt:desc&populate=*");
  return data;
}

export async function getArticleBySlug(slug: string): Promise<CMSArticle | null> {
  const { data } = await fetchCMS<CMSArticle[]>(`/articles?filters[slug][$eq]=${slug}&populate=*`);
  return data[0] || null;
}

export async function getProjects(): Promise<CMSProject[]> {
  const { data } = await fetchCMS<CMSProject[]>("/projects?sort=publishedAt:desc&populate=*");
  return data;
}

export async function getProjectBySlug(slug: string): Promise<CMSProject | null> {
  const { data } = await fetchCMS<CMSProject[]>(`/projects?filters[slug][$eq]=${slug}&populate=*`);
  return data[0] || null;
}
