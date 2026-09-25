import type { MetadataRoute } from "next";
import { PUBLISHED_PROJECTS } from "@/data/portfolio";
import { getAllPosts } from "@/lib/blog";
import { getAllServicoSlugs, getServicoBySlug } from "@/lib/servicos";
import { getAllSolucoes } from "@/lib/solucoes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://firmino.dev";

/*
 * lastModified só entra quando existe uma data real (frontmatter `date` /
 * `updated`). Usar a hora do build marcava o site inteiro como alterado a
 * cada deploy, e os robôs aprendem a ignorar lastmod de quem faz isso.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts
    .map((p) => p.updated ?? p.date)
    .sort()
    .at(-1);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/servicos`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/solucoes`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/como-trabalhamos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/projetos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/stack`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/sobre`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/joao`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contato`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/area-do-cliente`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/area-do-cliente/demo`, changeFrequency: "monthly", priority: 0.5 },
    {
      url: `${SITE_URL}/blog`,
      ...(latestPost && { lastModified: new Date(latestPost) }),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    { url: `${SITE_URL}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PUBLISHED_PROJECTS.map((p) => ({
    url: `${SITE_URL}/projetos/${p.slug}`,
    changeFrequency: "monthly",
    priority: p.featured ? 0.85 : 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const servicoRoutes: MetadataRoute.Sitemap = getAllServicoSlugs().map((slug) => {
    const updated = getServicoBySlug(slug)?.updated;
    return {
      url: `${SITE_URL}/servicos/${slug}`,
      ...(updated && { lastModified: new Date(updated) }),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const solucaoRoutes: MetadataRoute.Sitemap = getAllSolucoes().map((s) => ({
    url: `${SITE_URL}/solucoes/${s.slug}`,
    ...(s.updated && { lastModified: new Date(s.updated) }),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes, ...servicoRoutes, ...solucaoRoutes];
}
