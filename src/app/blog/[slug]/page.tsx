import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar, Footer, Background } from "@/components/layout";
import { JsonLd, SectionLabel } from "@/components/ui";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { PostNav } from "@/components/blog/PostNav";
import { mdxOptions } from "@/lib/mdx-options";
import { absoluteUrl, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { getAdjacentPosts, getAllSlugs, getPostBySlug } from "@/lib/blog";
import "./prose.css";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado",
      robots: { index: false, follow: false },
    };
  }

  const ogTitle = `${post.title} · firmino.dev`;
  const path = `/blog/${post.slug}`;
  const ogImage = post.cover ? [absoluteUrl(post.cover)] : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description: post.description,
      url: path,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      ...(ogImage && { images: ogImage }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: post.description,
      ...(ogImage && { images: ogImage }),
    },
  };
}

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return DATE_FORMATTER.format(new Date(y, (m ?? 1) - 1, d ?? 1));
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(post.slug);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "pt-BR",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: post.author ?? "João Firmino",
      url: `${SITE_URL}/sobre`,
    },
    publisher: {
      "@type": "Organization",
      name: "firmino.dev",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") },
    },
    ...(post.cover && { image: absoluteUrl(post.cover) }),
    ...(post.tags && { keywords: post.tags.join(", ") }),
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <article>
          <section className="page-hero !min-h-[44vh] !pb-10">
            <div className="content-container w-full max-w-[760px]">
              <Link
                href="/blog"
                className="text-[12.5px] text-text-dim hover:text-text-nav transition-colors mb-8 inline-block"
              >
                ← Voltar para o blog
              </Link>
              <SectionLabel>Artigo</SectionLabel>
              <h1 className="font-serif hero-heading !text-[clamp(34px,4.4vw,52px)] !leading-[1.1] mb-6">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-base text-text-muted leading-[1.8] max-w-[620px] mb-7">
                  {post.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-text-dim uppercase tracking-[1.5px]">
                {post.author && <span>{post.author}</span>}
                {post.author && <span className="text-text-dim/40">·</span>}
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="text-text-dim/40">·</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </section>

          <section className="section-padding !pt-4">
            <div className="content-container max-w-[760px]">
              <div className="prose prose-invert prose-firmino max-w-none">
                <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={mdxOptions}
                />
              </div>
              <PostNav prev={prev} next={next} />
            </div>
          </section>
        </article>

        <Footer />
      </div>
    </>
  );
}
