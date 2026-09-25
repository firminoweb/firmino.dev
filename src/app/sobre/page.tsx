import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import { Reveal, SectionLabel, Button, JsonLd } from "@/components/ui";
import { COMPANY_STATS } from "@/data/portfolio";
import { TEAM_AREAS } from "@/data/empresa";
import { PERSON } from "@/data/curriculo";
import { breadcrumbJsonLd, SITE_URL, ORG_ID, OG_IMAGES } from "@/lib/seo";

const TITLE = "Sobre · firmino.dev";
const DESCRIPTION =
  "Conheça a firmino.dev: empresa de engenharia de software que atende clientes desde 2024, com um fundador de 16+ anos de mercado e uma rede de parceiros pelo Brasil.";

export const metadata: Metadata = {
  title: "Sobre",
  description: DESCRIPTION,
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/sobre",
    type: "website",
    images: OG_IMAGES,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: OG_IMAGES },
};

const ABOUT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: TITLE,
  url: `${SITE_URL}/sobre`,
  inLanguage: "pt-BR",
  // A Person vive na /joao; aqui a entidade principal é a empresa.
  mainEntity: { "@id": ORG_ID },
};

const PRINCIPLES = [
  {
    icon: "◈",
    title: "Engenharia que envelhece bem",
    desc: "Código que outro time vai conseguir manter daqui a três anos. Padrões claros, abstrações honestas, sem hero work nem mágica desnecessária.",
  },
  {
    icon: "⬡",
    title: "Decisões com critério",
    desc: "Cada escolha de stack, arquitetura e padrão precisa ser justificável. Nada de framework do mês: só ferramenta que resolve um problema concreto.",
  },
  {
    icon: "◎",
    title: "Qualidade não é etapa, é hábito",
    desc: "Testes, code review, acessibilidade e performance entram no fluxo desde o primeiro commit. Não dá para retrofitar isso depois sem custo.",
  },
  {
    icon: "⏣",
    title: "IA com responsabilidade",
    desc: "Usamos LLMs e ferramentas de IA Generativa para acelerar entrega, sem abrir mão de revisão crítica, segurança e propriedade do código.",
  },
];

// Fases da EMPRESA, sem ano: a firmino.dev não data trabalho de cliente, e
// amarrar cada cliente a um ano aqui reintroduziria pela porta dos fundos a
// datação que os cases deixaram de expor.
const TIMELINE = [
  {
    year: "Início",
    title: "Primeiros contratos",
    desc: "A operação começa com dois projetos de fôlego longo: uma plataforma whitelabel de passagens com milhas e a sustentação de um portal de governo em Angular.",
  },
  {
    year: "Expansão",
    title: "Produto financeiro e mobile",
    desc: "Entram banking white-label em três frentes, do app do usuário final ao backoffice e à integração BaaS, e um app publicado na App Store e na Google Play.",
  },
  {
    year: "Hoje",
    title: "Pagamentos e fundação de produto",
    desc: "Plataforma de pagamentos com integração de adquirentes e saque automático, e base de front-end em Next.js para produto começando do zero.",
  },
  {
    year: "Rede",
    title: "Parceiros pelo Brasil",
    desc: "Desenvolvimento, UI/UX e marketing digital acionados por projeto, com profissionais e estúdios parceiros espalhados pelo país.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={ABOUT_JSON_LD} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Sobre", path: "/sobre" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[50vh] !pb-10">
          <div className="content-container w-full max-w-[920px]">
            <SectionLabel>Sobre</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              Engenharia <span className="text-accent-light italic">com método</span>,{" "}<br />
              entrega <span className="text-accent-light italic">com critério</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Somos uma empresa de engenharia de software que atende clientes desde 2024, construindo plataformas web, apps mobile e produtos com IA. Por trás dela, um fundador com 16+ anos de mercado e uma rede de parceiros espalhada pelo Brasil.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding-sm">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COMPANY_STATS.map((s, i) => (
                  <div key={i} className="metric-box !text-left !px-5 !py-4">
                    <div className="font-serif text-[26px] sm:text-[30px] font-medium text-brand tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-[11px] text-text-dim mt-0.5">{s.label}</div>
                    <div className="text-[10.5px] text-text-darker mt-0.5">{s.detail}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding !pt-12">
          <div className="content-container max-w-[920px] flex flex-col gap-12">
            <Reveal>
              <div>
                <SectionLabel>História</SectionLabel>
                <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-5">
                  Da fundação até <span className="text-accent-light italic">aqui</span>
                </h2>
                <p className="text-[15px] text-text-muted leading-[1.85] mb-4">
                  A firmino.dev começou a atender clientes em 2024, quando os primeiros contratos saíram do papel: uma plataforma whitelabel de viagens e a sustentação de um portal de governo. De lá para cá foram seis clientes, em cinco segmentos, do app publicado nas lojas à plataforma de pagamentos em produção.
                </p>
                <p className="text-[15px] text-text-muted leading-[1.85]">
                  A empresa é nova, mas o método não. Ele vem de mais de 16 anos do fundador dentro de produtos de alta escala, e parte de uma convicção simples: software de qualidade não é questão de stack favorita, e sim de decisão de arquitetura justificável, qualidade tratada como hábito e respeito pelo código que outro time vai herdar.
                </p>
              </div>
            </Reveal>

            {/* Timeline */}
            <Reveal>
              <div>
                <SectionLabel>Trajetória</SectionLabel>
                <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-7">
                  Marcos da <span className="text-accent-light italic">caminhada</span>
                </h2>
                <div className="flex flex-col gap-3">
                  {TIMELINE.map((m, i) => (
                    <Reveal key={m.year} delay={i * 0.05}>
                      <div className="gc py-5 px-6 sm:py-6 sm:px-7 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-6">
                        <div className="font-serif text-[16px] text-accent-light font-medium tracking-tight pt-[2px]">
                          {m.year}
                        </div>
                        <div>
                          <h3 className="text-[15.5px] font-bold text-text-light mb-1.5 tracking-tight">
                            {m.title}
                          </h3>
                          <p className="text-[13.5px] text-text-dim leading-[1.7]">{m.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Principles */}
            <Reveal>
              <div>
                <SectionLabel>Princípios</SectionLabel>
                <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-7">
                  Como <span className="text-accent-light italic">trabalhamos</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PRINCIPLES.map((p, i) => (
                    <Reveal key={p.title} delay={i * 0.06}>
                      <div className="gc py-7 px-6 h-full">
                        <div className="service-icon">{p.icon}</div>
                        <h3 className="text-[16px] font-bold text-text-light mb-2 tracking-tight">
                          {p.title}
                        </h3>
                        <p className="text-[13.5px] text-text-dim leading-[1.7]">{p.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Quem está por trás */}
            <Reveal>
              <div>
                <SectionLabel>Quem está por trás</SectionLabel>
                <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-7">
                  A pessoa que <span className="text-accent-light italic">responde</span>
                </h2>
                <Link
                  href="/joao"
                  className="gc case-card py-7 px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center gap-6 relative overflow-hidden"
                >
                  <div className="case-glow-line" />
                  <Image
                    src={PERSON.photo}
                    alt={`Foto de ${PERSON.name}`}
                    width={400}
                    height={400}
                    className="w-[96px] h-[96px] rounded-full object-cover border border-border-subtle shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-bold text-brand tracking-tight mb-1">
                      {PERSON.name}
                    </h3>
                    <p className="text-[13px] text-accent-light font-medium mb-2.5">
                      {PERSON.founderTitle}
                    </p>
                    <p className="text-[13.5px] text-text-dim leading-[1.7]">
                      16+ anos de engenharia de software em Itaú, O Boticário, TOTVS, NTT Data, Walmart e UOL, antes de fundar a empresa. É o lastro técnico por trás de cada projeto. Conheça a trajetória do fundador.
                    </p>
                  </div>
                  <span className="case-arrow shrink-0 hidden sm:block">↗</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Quem faz */}
        <section className="section-padding !pt-0">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div>
                <SectionLabel>Quem faz</SectionLabel>
                <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-5">
                  Quem cuida do <span className="text-accent-light italic">seu projeto</span>
                </h2>
                <p className="text-[15px] text-text-muted leading-[1.85] mb-7 max-w-[640px]">
                  Além do fundador, trabalhamos com profissionais e estúdios parceiros espalhados pelo Brasil. Cada projeto recebe as áreas que ele pede, sem o cliente pagar por estrutura que o caso não precisa.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TEAM_AREAS.map((a, i) => (
                    <Reveal key={a.id} delay={i * 0.06}>
                      <div className="gc py-7 px-6 h-full">
                        <div className="service-icon">{a.icon}</div>
                        <h3 className="text-[16px] font-bold text-text-light mb-2 tracking-tight">
                          {a.title}
                        </h3>
                        <p className="text-[13.5px] text-text-dim leading-[1.7]">{a.desc}</p>
                        <p className="text-[11.5px] text-accent-light font-semibold mt-3">{a.entersWhen}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
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
                    Vamos construir algo juntos?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
                    Conte para a gente o que você está construindo. Respondemos em até 24h úteis.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link href="/contato">
                      <Button>Fale com a gente →</Button>
                    </Link>
                    <Link href="/projetos">
                      <Button variant="ghost">Ver cases</Button>
                    </Link>
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
