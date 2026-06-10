import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/portfolio";
import { getAllPosts } from "@/lib/blog";
import { getAllServicoSlugs } from "@/lib/servicos";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://firmino.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/servicos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projetos`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/stack`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contato`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE_URL}/projetos/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.featured ? 0.85 : 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const servicoRoutes: MetadataRoute.Sitemap = getAllServicoSlugs().map((slug) => ({
    url: `${SITE_URL}/servicos/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes, ...servicoRoutes];
}
