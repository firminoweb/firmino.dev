import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import { JsonLd, SectionLabel } from "@/components/ui";
import { absoluteUrl, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

const TITLE = "Blog — firmino.dev";
const DESCRIPTION =
  "Artigos sobre desenvolvimento web, AI-Driven Development, micro-frontends e mais.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return DATE_FORMATTER.format(new Date(y, (m ?? 1) - 1, d ?? 1));
}

export default function BlogPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/blog"),
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: "firmino.dev", url: SITE_URL },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
      author: { "@type": "Person", name: post.author ?? "João Firmino" },
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[40vh] !pb-10">
          <div className="content-container w-full max-w-[920px]">
            <SectionLabel>Blog</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              Notas <span className="text-accent-light italic">técnicas</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Aprendizados de quem constrói software em produção — sem hype, sem framework do mês.
            </p>
          </div>
        </section>

        <section className="section-padding !pt-2">
          <div className="content-container max-w-[920px]">
            {posts.length === 0 ? (
              <p className="text-text-dim text-[14.5px]">Nada publicado ainda. Em breve.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="gc block py-7 px-7 sm:py-8 sm:px-9 hover:border-accent-light/30 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-3 text-[12px] text-text-dim uppercase tracking-[1.5px]">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span className="text-text-dim/40">·</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h2 className="font-serif text-[22px] sm:text-[26px] leading-[1.25] text-text-light mb-2 group-hover:text-accent-light transition-colors">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="text-[14.5px] text-text-muted leading-[1.7]">
                          {post.description}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
