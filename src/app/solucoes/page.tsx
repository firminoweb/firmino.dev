import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import { Reveal, SectionLabel, Button, Tag, JsonLd } from "@/components/ui";
import { CLIENT_PROJECTS } from "@/data/portfolio";
import { breadcrumbJsonLd, itemListJsonLd, OG_IMAGES } from "@/lib/seo";
import { getAllSolucoes, segmentInSentence } from "@/lib/solucoes";

const TITLE = "Soluções por segmento · firmino.dev";
const DESCRIPTION =
  "Sistemas, apps e sites sob medida para o seu tipo de negócio, com case real de cada segmento. Veja o que construímos para escritórios de advocacia, agências de viagem, cobrança automática por Pix e mais.";

export const metadata: Metadata = {
  title: "Soluções por segmento",
  description: DESCRIPTION,
  alternates: { canonical: "/solucoes" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/solucoes", type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: OG_IMAGES },
};

export default function SolucoesPage() {
  const solucoes = getAllSolucoes();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Soluções", path: "/solucoes" },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          "Soluções por segmento da firmino.dev",
          solucoes.map((s) => ({ name: s.title, path: `/solucoes/${s.slug}` })),
        )}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[40vh] !pb-10">
          <div className="content-container w-full max-w-[920px]">
            <SectionLabel>Soluções</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              Software sob medida{" "}<br />
              <span className="text-accent-light italic">pro seu tipo de negócio</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Cada segmento tem as suas dores. Aqui estão os que já atendemos, com o que construímos e o case de quem contratou.
            </p>
          </div>
        </section>

        <section className="section-padding !pt-6">
          <div className="content-container max-w-[1080px] grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            {solucoes.map((s, i) => {
              const cases = CLIENT_PROJECTS.filter((p) => s.cases.includes(p.slug));
              return (
                <Reveal key={s.slug} delay={i * 0.05} className="h-full">
                  <div className="gc py-8 px-7 sm:py-10 sm:px-10 relative overflow-hidden h-full flex flex-col">
                    <div className="service-icon">{s.icon}</div>
                    <h2 className="text-[20px] sm:text-[22px] font-bold text-text-light mb-3 tracking-tight">
                      <Link href={`/solucoes/${s.slug}`} className="hover:text-accent-light transition-colors">
                        {s.title}
                      </Link>
                    </h2>
                    <p className="text-[14.5px] text-text-dim leading-[1.75] mb-5">{s.description}</p>
                    {cases.length > 0 && (
                      <p className="text-[13px] text-text-subtle mb-5">
                        <span className="font-semibold">Case:</span> {cases.map((p) => p.client).join(", ")}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {s.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <Link
                      href={`/solucoes/${s.slug}`}
                      className="mt-auto text-[13px] text-accent-light hover:text-accent transition-colors inline-flex items-center gap-1.5 font-medium"
                    >
                      Ver a solução para {segmentInSentence(s)} →
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section-padding !pt-4">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div className="gc py-10 px-6 sm:py-14 sm:px-12 text-center relative overflow-hidden">
                <div className="glow-line-top-cta" />
                <div className="cta-radial-overlay" />
                <div className="relative">
                  <h2 className="font-serif section-heading !text-[clamp(22px,3vw,34px)] !leading-[1.2] mb-4">
                    Seu segmento não está aqui?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
                    A gente atende empresas de todo tipo, do pequeno negócio à grande operação. Conta o que você precisa.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button href="/contato">Quero uma proposta →</Button>
                    <Button href="/servicos" variant="ghost">Ver todos os serviços</Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
