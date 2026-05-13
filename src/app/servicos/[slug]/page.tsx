import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar, Footer, Background } from "@/components/layout";
import { Button, JsonLd, SectionLabel, Tag } from "@/components/ui";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { mdxOptions } from "@/lib/mdx-options";
import { absoluteUrl, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { getAllServicoSlugs, getServicoBySlug } from "@/lib/servicos";
import "../../blog/[slug]/prose.css";

interface ServicoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllServicoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const servico = getServicoBySlug(slug);

  if (!servico) {
    return {
      title: "Serviço não encontrado",
      robots: { index: false, follow: false },
    };
  }

  const ogTitle = `${servico.title} · firmino.dev`;
  const path = `/servicos/${servico.slug}`;

  return {
    title: servico.title,
    description: servico.description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description: servico.description,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: servico.description,
    },
  };
}

export default async function ServicoDetailPage({ params }: ServicoPageProps) {
  const { slug } = await params;
  const servico = getServicoBySlug(slug);

  if (!servico) notFound();

  const url = absoluteUrl(`/servicos/${servico.slug}`);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servico.title,
    description: servico.description,
    url,
    provider: {
      "@type": "Organization",
      name: "firmino.dev",
      url: SITE_URL,
    },
    areaServed: "BR",
    inLanguage: "pt-BR",
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: servico.title, path: `/servicos/${servico.slug}` },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <article>
          <section className="page-hero !min-h-[40vh] !pb-10">
            <div className="content-container w-full max-w-[760px]">
              <Link
                href="/servicos"
                className="text-[12.5px] text-text-dim hover:text-text-nav transition-colors mb-8 inline-block"
              >
                ← Todos os serviços
              </Link>
              <SectionLabel>Serviço</SectionLabel>
              <div className="flex items-start gap-5 mb-6">
                <div className="service-icon !mb-0 shrink-0">{servico.icon}</div>
                <h1 className="font-serif hero-heading !text-[clamp(32px,4.2vw,50px)] !leading-[1.08]">
                  {servico.headline ?? servico.title}
                </h1>
              </div>
              {servico.description && (
                <p className="text-base text-text-muted leading-[1.8] max-w-[620px] mb-6">
                  {servico.description}
                </p>
              )}
              {servico.tags && servico.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {servico.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="section-padding !pt-4">
            <div className="content-container max-w-[760px]">
              <div className="prose prose-invert prose-firmino max-w-none">
                <MDXRemote
                  source={servico.content}
                  components={mdxComponents}
                  options={mdxOptions}
                />
              </div>
            </div>
          </section>

          <section className="section-padding !pt-4">
            <div className="content-container max-w-[760px]">
              <div className="gc py-10 px-6 sm:py-14 sm:px-12 text-center relative overflow-hidden">
                <div className="glow-line-top-cta" />
                <div className="cta-radial-overlay" />
                <div className="relative">
                  <h2 className="font-serif section-heading !text-[clamp(22px,3vw,32px)] !leading-[1.2] mb-4">
                    Faz sentido pra sua operação?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
                    Conta o que você precisa. A gente responde em até 24h úteis com um plano e estimativa.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link href="/contato">
                      <Button>Quero conversar →</Button>
                    </Link>
                    <Link href="/servicos">
                      <Button variant="ghost">Ver outros serviços</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>

        <Footer />
      </div>
    </>
  );
}
