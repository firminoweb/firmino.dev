import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar, Footer, Background } from "@/components/layout";
import { Button, JsonLd, Reveal, SectionLabel, Tag, TrackedLink, WhatsAppButton } from "@/components/ui";
import { Faq } from "@/components/home";
import { CaseCard } from "@/components/projects/CaseCard";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { CLIENT_PROJECTS, SERVICES } from "@/data/portfolio";
import { HERO_TRUST } from "@/data/empresa";
import { mdxOptions } from "@/lib/mdx-options";
import { absoluteUrl, breadcrumbJsonLd, SITE_URL, ORG_ID, OG_IMAGES } from "@/lib/seo";
import { getAllSolucoes, getSolucaoBySlug, segmentInSentence } from "@/lib/solucoes";
import "../../blog/[slug]/prose.css";

interface SolucaoPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSolucoes().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: SolucaoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solucao = getSolucaoBySlug(slug);
  if (!solucao) return { title: "Solução não encontrada", robots: { index: false, follow: false } };

  const ogTitle = `${solucao.title} · firmino.dev`;
  const path = `/solucoes/${solucao.slug}`;
  return {
    title: solucao.title,
    description: solucao.description,
    alternates: { canonical: path },
    openGraph: { title: ogTitle, description: solucao.description, url: path, type: "website", images: OG_IMAGES },
    twitter: { card: "summary_large_image", title: ogTitle, description: solucao.description, images: OG_IMAGES },
  };
}

export default async function SolucaoPage({ params }: SolucaoPageProps) {
  const { slug } = await params;
  const solucao = getSolucaoBySlug(slug);
  if (!solucao) notFound();

  // Página de segmento só se sustenta com prova da empresa: case de carreira
  // (feito como funcionário) ou slug errado quebra o build em vez de ir pro ar.
  const cases = solucao.cases.map((caseSlug) => {
    const project = CLIENT_PROJECTS.find((p) => p.slug === caseSlug);
    if (!project) throw new Error(`[solucoes/${slug}] "${caseSlug}" não é um case de cliente publicado`);
    return project;
  });
  const servicos = SERVICES.filter((s) => solucao.servicos.includes(s.slug));
  const source = `solucao-${solucao.slug}`;

  const url = absoluteUrl(`/solucoes/${solucao.slug}`);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solucao.title,
    description: solucao.description,
    url,
    serviceType: solucao.tags,
    audience: { "@type": "BusinessAudience", audienceType: solucao.segment },
    provider: { "@type": "Organization", "@id": ORG_ID, name: "firmino.dev", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Brasil" },
    inLanguage: "pt-BR",
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Soluções", path: "/solucoes" },
          { name: solucao.segment, path: `/solucoes/${solucao.slug}` },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <article>
          <section className="page-hero !min-h-[40vh] !pb-10">
            <div className="content-container w-full max-w-[760px]">
              <Link
                href="/solucoes"
                className="text-[12.5px] text-text-dim hover:text-text-nav transition-colors mb-8 inline-block"
              >
                ← Todas as soluções
              </Link>
              <SectionLabel>Solução para {segmentInSentence(solucao)}</SectionLabel>
              <div className="flex items-start gap-5 mb-6">
                <div className="service-icon !mb-0 shrink-0">{solucao.icon}</div>
                <h1 className="font-serif hero-heading !text-[clamp(28px,3.6vw,42px)] !leading-[1.15]">
                  {solucao.title}:{" "}
                  <span className="text-accent-light italic">{solucao.headline}</span>
                </h1>
              </div>
              <p className="text-base text-text-muted leading-[1.8] max-w-[620px] mb-6">
                {solucao.description}
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
                {HERO_TRUST.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[13px] text-text-subtle font-medium">
                    <span aria-hidden className="text-success">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <TrackedLink
                  href="/contato"
                  event="cta_click"
                  eventParams={{ location: source, label: "proposta" }}
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Quero uma proposta →
                </TrackedLink>
                <WhatsAppButton
                  message={solucao.whatsapp}
                  source={source}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#15803d] text-white font-semibold text-[14px] hover:bg-[#166534] transition-colors"
                >
                  Falar no WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </section>

          <section className="section-padding !pt-4">
            <div className="content-container max-w-[760px]">
              <div className="prose prose-invert prose-firmino max-w-none">
                <MDXRemote source={solucao.content} components={mdxComponents} options={mdxOptions} />
              </div>
            </div>
          </section>

          {cases.length > 0 && (
            <section className="section-padding !pt-4">
              <div className="content-container max-w-[760px]">
                <Reveal>
                  <SectionLabel>{cases.length > 1 ? "Cases" : "Case"}</SectionLabel>
                  <h2 className="font-serif section-heading !text-[clamp(24px,3vw,34px)] mb-8">
                    Quem já construiu isso{" "}
                    <span className="text-accent-light italic">com a gente</span>
                  </h2>
                </Reveal>
                <div className="flex flex-col gap-[18px]">
                  {cases.map((p) => (
                    <Reveal key={p.slug}>
                      <CaseCard project={p} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          {servicos.length > 0 && (
            <section className="section-padding !pt-4">
              <div className="content-container max-w-[760px]">
                <SectionLabel>Serviços relacionados</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {servicos.map((s) => (
                    <Link key={s.slug} href={`/servicos/${s.slug}`} className="gc p-5 block group">
                      <div className="flex items-center gap-2 mb-2">
                        <span aria-hidden className="text-accent-light">{s.icon}</span>
                        <span className="text-[14.5px] font-semibold text-text-light group-hover:text-brand transition-colors">
                          {s.title}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-text-dim leading-[1.6] line-clamp-3">{s.desc}</p>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {solucao.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </section>
          )}

          {solucao.faq.length > 0 && <Faq items={solucao.faq} />}

          <section className="section-padding !pt-4">
            <div className="content-container max-w-[760px]">
              <div className="gc py-10 px-6 sm:py-14 sm:px-12 text-center relative overflow-hidden">
                <div className="glow-line-top-cta" />
                <div className="cta-radial-overlay" />
                <div className="relative">
                  <h2 className="font-serif section-heading !text-[clamp(22px,3vw,32px)] !leading-[1.2] mb-4">
                    Vamos ver o que faz sentido pro seu negócio?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
                    Conta como funciona hoje. A gente responde em até 24h úteis com um caminho e uma estimativa, sem custo e sem compromisso.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <WhatsAppButton
                      message={solucao.whatsapp}
                      source={`${source}-final`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#15803d] text-white font-semibold text-[14px] hover:bg-[#166534] transition-colors"
                    >
                      Falar no WhatsApp
                    </WhatsAppButton>
                    <Button href="/contato" variant="ghost">Prefiro o formulário</Button>
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
