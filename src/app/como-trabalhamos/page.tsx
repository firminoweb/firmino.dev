import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import {
  Reveal,
  SectionLabel,
  Tag,
  JsonLd,
  TrackedLink,
  WhatsAppButton,
  WhatsAppGlyph,
} from "@/components/ui";
import { ENGAGEMENT_MODELS, PROCESS_STEPS, TEAM_AREAS, GUARANTEES } from "@/data/empresa";
import { COMPANY } from "@/data/portfolio";
import { breadcrumbJsonLd, OG_IMAGES } from "@/lib/seo";
import type { TeamAreaId } from "@/types";

const TITLE = "Como trabalhamos · firmino.dev";
const DESCRIPTION =
  "Como contratar a firmino.dev: projeto sob medida, time mensal, plano de manutenção ou reforço técnico. Quem participa de cada etapa e o que fica garantido em contrato.";

export const metadata: Metadata = {
  title: "Como trabalhamos",
  description: DESCRIPTION,
  alternates: { canonical: "/como-trabalhamos" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/como-trabalhamos",
    type: "website",
    images: OG_IMAGES,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: OG_IMAGES },
};

const AREA_TITLE = Object.fromEntries(TEAM_AREAS.map((a) => [a.id, a.title])) as Record<
  TeamAreaId,
  string
>;

const HEADING = "font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18]";

export default function ComoTrabalhamosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Como trabalhamos", path: "/como-trabalhamos" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[46vh] !pb-10">
          <div className="content-container w-full max-w-[1080px]">
            <SectionLabel>Como contratar</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              Sem surpresa,{" "}<br />
              <span className="text-accent-light italic">do contrato à entrega</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Como contratar, quem trabalha no seu projeto e o que fica garantido em contrato. Tudo
              claro antes de começar.
            </p>
          </div>
        </section>

        {/* Modelos de contratação */}
        <section className="section-padding !pt-6">
          <div className="content-container max-w-[1080px]">
            <Reveal>
              <div className="mb-8">
                <SectionLabel>Modelos de contratação</SectionLabel>
                <h2 className={HEADING}>
                  Quatro jeitos de <span className="text-accent-light italic">contratar</span>
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
              {ENGAGEMENT_MODELS.map((m, i) => (
                <Reveal key={m.id} delay={i * 0.05} className="h-full">
                  <div className="gc py-8 px-7 sm:px-9 h-full flex flex-col relative overflow-hidden">
                    <div className="glow-line-top" />
                    <h3 className="text-[20px] font-bold text-text-light tracking-tight mb-4">
                      {m.title}
                    </h3>
                    <dl className="flex flex-col gap-4 mb-6">
                      <div>
                        <dt className="text-[11px] uppercase tracking-[1.5px] font-semibold text-accent-light mb-1">
                          Pra quando
                        </dt>
                        <dd className="text-[14px] text-text-dim leading-[1.7]">{m.forWhen}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-[1.5px] font-semibold text-accent-light mb-1">
                          Como é cobrado
                        </dt>
                        <dd className="text-[14px] text-text-dim leading-[1.7]">{m.billing}</dd>
                      </div>
                    </dl>
                    <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
                      {m.services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/servicos/${s.slug}`}
                          className="text-[13px] text-accent-light hover:text-accent transition-colors font-medium"
                        >
                          {s.label} →
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Etapas e quem participa */}
        <section className="section-padding !pt-4">
          <div className="content-container max-w-[1080px]">
            <Reveal>
              <div className="mb-8">
                <SectionLabel>Etapas</SectionLabel>
                <h2 className={HEADING}>
                  Quem participa de <span className="text-accent-light italic">cada etapa</span>
                </h2>
                <p className="text-[15px] text-text-dim leading-[1.8] max-w-[640px] mt-4">
                  Você tem um ponto de contato só, do começo ao fim: a liderança técnica. As outras
                  áreas entram quando a etapa pede.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              {PROCESS_STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.06} className="h-full">
                  <div className="gc py-8 px-6 h-full flex flex-col relative overflow-hidden">
                    <div className="glow-line-top" />
                    <div className="font-serif text-[30px] font-medium text-accent-light leading-none tracking-tight mb-4">
                      {s.num}
                    </div>
                    <h3 className="text-[16px] font-bold text-text-light mb-2.5 tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-[13.5px] text-text-dim leading-[1.7] flex-1">{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-border-card">
                      {s.areas.map((id) => (
                        <Tag key={id}>{AREA_TITLE[id]}</Tag>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <div className="gc mt-4 py-6 px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {TEAM_AREAS.map((a) => (
                  <div key={a.id}>
                    <div className="text-[14px] font-bold text-text-light tracking-tight">
                      {a.title}
                    </div>
                    <p className="text-[13px] text-text-dim leading-[1.65] mt-1">{a.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Garantias */}
        <section className="section-padding !pt-4">
          <div className="content-container max-w-[1080px]">
            <Reveal>
              <div className="mb-8">
                <SectionLabel>Garantias</SectionLabel>
                <h2 className={HEADING}>
                  O que fica <span className="text-accent-light italic">garantido</span>
                </h2>
                <p className="text-[15px] text-text-dim leading-[1.8] max-w-[640px] mt-4">
                  Compromissos que valem pra todo cliente e ficam no contrato. {COMPANY.legalName} ·
                  CNPJ {COMPANY.cnpj}.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GUARANTEES.map((g, i) => (
                <Reveal key={g.title} delay={i * 0.04} className="h-full">
                  <div className="gc py-6 px-6 h-full flex items-start gap-3">
                    <span aria-hidden className="text-success text-[15px] leading-[1.5]">
                      ✓
                    </span>
                    <div>
                      <h3 className="text-[15px] font-bold text-text-light tracking-tight mb-1.5">
                        {g.title}
                      </h3>
                      <p className="text-[13.5px] text-text-dim leading-[1.7]">{g.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding !pt-4">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div className="gc py-10 px-6 sm:py-14 sm:px-12 text-center relative overflow-hidden">
                <div className="glow-line-top-cta" />
                <div className="cta-radial-overlay" />
                <div className="relative">
                  <h2 className="font-serif section-heading !text-[clamp(22px,3vw,34px)] !leading-[1.2] mb-4">
                    Qual modelo serve pro seu caso?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
                    Conte o que você precisa. Na primeira conversa a gente indica o formato e
                    devolve uma estimativa de investimento e prazo, sem compromisso.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <TrackedLink
                      href="/contato"
                      event="cta_click"
                      eventParams={{ location: "como_trabalhamos", label: "proposta" }}
                      className="btn-primary inline-flex items-center justify-center"
                    >
                      Quero uma proposta →
                    </TrackedLink>
                    <WhatsAppButton
                      source="como_trabalhamos"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#15803d] text-white font-semibold text-[14px] hover:bg-[#166534] transition-colors"
                    >
                      <WhatsAppGlyph className="w-[18px] h-[18px]" />
                      Falar no WhatsApp
                    </WhatsAppButton>
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
