import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import { Reveal, SectionLabel, Button, JsonLd } from "@/components/ui";
import { STATS, CONTACT } from "@/data/portfolio";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

const TITLE = "Sobre — firmino.dev";
const DESCRIPTION =
  "Conheça a firmino.dev — empresa de engenharia de software com 15+ anos de mercado, especializada em web, mobile, micro-frontends e Generative AI.";

export const metadata: Metadata = {
  title: "Sobre",
  description: DESCRIPTION,
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/sobre",
    type: "profile",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "João Firmino",
  url: `${SITE_URL}/sobre`,
  jobTitle: "Engenheiro de Software · Tech Lead",
  description:
    "Engenheiro de software com 15+ anos de experiência em Angular, React, React Native, Next.js, Node.js e aplicações com Generative AI.",
  knowsAbout: [
    "Angular",
    "React",
    "React Native",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Micro-frontends",
    "Module Federation",
    "Clean Architecture",
    "Generative AI",
    "LLM Applications",
    "AI-Driven Development",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressCountry: "BR",
  },
  worksFor: { "@type": "Organization", name: "firmino.dev", url: SITE_URL },
  sameAs: [CONTACT.linkedin, CONTACT.github],
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
    desc: "Cada escolha de stack, arquitetura e padrão precisa ser justificável. Nada de framework do mês — só ferramenta que resolve um problema concreto.",
  },
  {
    icon: "◎",
    title: "Qualidade não é etapa, é hábito",
    desc: "Testes, code review, acessibilidade e performance entram no fluxo desde o primeiro commit. Não dá para retrofitar isso depois sem custo.",
  },
  {
    icon: "⏣",
    title: "AI-Driven com responsabilidade",
    desc: "Usamos LLMs e ferramentas de IA Generativa para acelerar entrega — sem abrir mão de revisão crítica, segurança e propriedade do código.",
  },
];

const TIMELINE = [
  {
    year: "2009",
    title: "Início da jornada",
    desc: "Primeiros projetos web em PHP/JS para agências e produtos próprios. Aprendendo o ofício no chão de fábrica da web.",
  },
  {
    year: "2012 – 2016",
    title: "Produto e escala",
    desc: "Carreira em produtos de alto tráfego: UOL, Walmart, ViajaNet, Reclame Aqui, Grupo Pão de Açucar. Ionic, AngularJS, Node em ambiente real.",
  },
  {
    year: "2016 – 2020",
    title: "Plataformas corporativas",
    desc: "Itaú (zFlow), GPA, NTT Data/everis. Design Systems multi-cliente, micro-frontends e cobertura de testes elevada.",
  },
  {
    year: "2020 – 2023",
    title: "Liderança técnica",
    desc: "O Boticário, TOTVS, Itaú Unibanco. PWA e mobile em escala nacional, orquestrador de APIs com Module Federation, mentoria e arquitetura.",
  },
  {
    year: "2024 – hoje",
    title: "AI-Driven & whitelabel",
    desc: "Plataformas whitelabel multi-marca, integração de Generative AI no ciclo de desenvolvimento e consultoria técnica para times de produto.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={PERSON_JSON_LD} />
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
              Engenharia <span className="text-accent-light italic">com método</span>,<br />
              entrega <span className="text-accent-light italic">com critério</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Somos uma empresa de engenharia de software fundada por João Firmino, focada em construir plataformas web, apps mobile e produtos com Generative AI para times que exigem excelência técnica.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding-sm">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STATS.map((s, i) => (
                  <div key={i} className="metric-box !text-left !px-5 !py-4">
                    <div className="font-serif text-[26px] sm:text-[30px] font-medium text-white tracking-tight">
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
                  De 2009 até <span className="text-accent-light italic">aqui</span>
                </h2>
                <p className="text-[15px] text-text-muted leading-[1.85] mb-4">
                  A firmino.dev nasceu como continuação natural de uma trajetória de mais de 15 anos em engenharia de software — passando por produtos digitais de alto tráfego, plataformas corporativas críticas e times de design system multi-cliente.
                </p>
                <p className="text-[15px] text-text-muted leading-[1.85]">
                  Ao longo desse caminho, ficou claro que software de qualidade não é uma questão de stack favorita, mas de método: decisões de arquitetura justificáveis, qualidade tratada como hábito (não etapa) e respeito pelo código que outro time vai herdar. É essa abordagem que oferecemos para nossos clientes.
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
                      <Button variant="ghost">Ver projetos</Button>
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
