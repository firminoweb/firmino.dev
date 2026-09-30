import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar, Footer, Background } from "@/components/layout";
import {
  Button,
  JsonLd,
  Reveal,
  SectionLabel,
  Tag,
  TrackedLink,
  WhatsAppButton,
  WhatsAppGlyph,
} from "@/components/ui";
import { Faq } from "@/components/home";
import { CaseCard } from "@/components/projects/CaseCard";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { CLIENT_PROJECTS } from "@/data/portfolio";
import { contactHref, type PROJECT_TYPE_VALUES } from "@/lib/contact-options";
import { mdxOptions } from "@/lib/mdx-options";
import { absoluteUrl, breadcrumbJsonLd, SITE_URL, ORG_ID, OG_IMAGES } from "@/lib/seo";
import { getAllServicoSlugs, getServicoBySlug } from "@/lib/servicos";
import "../../blog/[slug]/prose.css";

// Serviço que tem tipo equivalente no formulário já chega com ele selecionado
const PROJECT_TYPE_BY_SERVICO: Record<string, (typeof PROJECT_TYPE_VALUES)[number]> = {
  "aplicacoes-web-sob-medida": "web",
  "app-mobile-sob-medida": "mobile",
  "automacoes-com-ia": "ia",
  "reforco-tecnico-agencia": "reforco",
};

const WHATSAPP_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#15803d] text-white font-semibold text-[14px] hover:bg-[#166534] transition-colors";

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
      images: OG_IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: servico.description,
      images: OG_IMAGES,
    },
  };
}

export default async function ServicoDetailPage({ params }: ServicoPageProps) {
  const { slug } = await params;
  const servico = getServicoBySlug(slug);

  if (!servico) notFound();

  // Mesmo critério das soluções: só case de cliente publicado; slug errado quebra o build
  const cases = servico.cases.map((caseSlug) => {
    const project = CLIENT_PROJECTS.find((p) => p.slug === caseSlug);
    if (!project) throw new Error(`[servicos/${slug}] "${caseSlug}" não é um case de cliente publicado`);
    return project;
  });
  const source = `servico-${servico.slug}`;
  const formHref = contactHref(source, PROJECT_TYPE_BY_SERVICO[servico.slug]);
  const whatsappMessage =
    servico.whatsapp ??
    `Olá! Vim pela página "${servico.title}" no site da firmino.dev e quero conversar sobre um projeto.`;

  const url = absoluteUrl(`/servicos/${servico.slug}`);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servico.title,
    description: servico.description,
    url,
    ...(servico.tags && { serviceType: servico.tags }),
    // @id liga o serviço à mesma entidade da empresa (layout), em vez de
    // criar uma Organization "firmino.dev" solta em cada página
    provider: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "firmino.dev",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Brasil" },
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
                {/* H1 = título da listagem + headline de venda — o nome do serviço
                    precisa aparecer no H1 igual ao <title> e ao anchor da listagem (SEO). */}
                <h1 className="font-serif hero-heading !text-[clamp(28px,3.6vw,42px)] !leading-[1.15]">
                  {servico.headline ? (
                    <>
                      {servico.title}:{" "}
                      <span className="text-accent-light italic">{servico.headline}</span>
                    </>
                  ) : (
                    servico.title
                  )}
                </h1>
              </div>
              {servico.description && (
                <p className="text-base text-text-muted leading-[1.8] max-w-[620px] mb-6">
                  {servico.description}
                </p>
              )}
              {servico.tags && servico.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {servico.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <TrackedLink
                  href={formHref}
                  event="cta_click"
                  eventParams={{ location: source, label: "proposta" }}
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Quero uma proposta →
                </TrackedLink>
                <WhatsAppButton message={whatsappMessage} source={source} className={WHATSAPP_BUTTON_CLASS}>
                  <WhatsAppGlyph className="w-[18px] h-[18px]" />
                  Falar no WhatsApp
                </WhatsAppButton>
              </div>
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

          {cases.length > 0 && (
            <section className="section-padding !pt-4">
              <div className="content-container max-w-[760px]">
                <Reveal>
                  <SectionLabel>{cases.length > 1 ? "Cases" : "Case"}</SectionLabel>
                  <h2 className="font-serif section-heading !text-[clamp(24px,3vw,34px)] mb-8">
                    Já está funcionando{" "}
                    <span className="text-accent-light italic">em produção</span>
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

          {servico.faq.length > 0 && <Faq items={servico.faq} />}

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
                    <TrackedLink
                      href={contactHref(`${source}-final`, PROJECT_TYPE_BY_SERVICO[servico.slug])}
                      event="cta_click"
                      eventParams={{ location: `${source}-final`, label: "proposta" }}
                      className="btn-primary inline-flex items-center justify-center"
                    >
                      Quero conversar →
                    </TrackedLink>
                    <WhatsAppButton
                      message={whatsappMessage}
                      source={`${source}-final`}
                      className={WHATSAPP_BUTTON_CLASS}
                    >
                      <WhatsAppGlyph className="w-[18px] h-[18px]" />
                      Falar no WhatsApp
                    </WhatsAppButton>
                    <Button href="/servicos" variant="ghost">Ver outros serviços</Button>
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
