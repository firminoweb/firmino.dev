import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import { Reveal, SectionLabel, Button, Tag, JsonLd } from "@/components/ui";
import { SERVICES } from "@/data/portfolio";
import { breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Serviços — firmino.dev";
const DESCRIPTION =
  "Engenharia de software para web, micro-frontends, mobile, performance, consultoria técnica e aplicações com Generative AI.";

export const metadata: Metadata = {
  title: "Serviços",
  description: DESCRIPTION,
  alternates: { canonical: "/servicos" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/servicos",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_DETAILS: Record<string, { deliverables: string[]; stack: string[] }> = {
  "Aplicações Web Completas": {
    deliverables: [
      "MVPs e produtos completos do protótipo ao deploy em produção",
      "Aplicações SPA, PWA e SSR com Next.js",
      "APIs REST e GraphQL com Node.js / NestJS",
      "Integração com bancos relacionais e NoSQL",
    ],
    stack: ["Angular", "React", "Next.js", "Node.js", "TypeScript", "GraphQL"],
  },
  "Arquitetura & Micro-frontends": {
    deliverables: [
      "Plataformas corporativas com Module Federation",
      "Design Systems compartilhados entre times",
      "Padrões Clean Architecture e SOLID",
      "Estratégia de deploy independente por domínio",
    ],
    stack: ["Module Federation", "Design Systems", "Clean Architecture", "SOLID"],
  },
  "Mobile & PWA": {
    deliverables: [
      "Apps React Native iOS / Android",
      "Progressive Web Apps com instalação e offline-first",
      "Apps híbridos com Ionic / Capacitor",
      "Pipeline de publicação nas stores",
    ],
    stack: ["React Native", "Ionic", "Capacitor", "PWA"],
  },
  "Performance & Qualidade": {
    deliverables: [
      "Auditoria Lighthouse e Web Vitals",
      "Cobertura de testes Jest, Cypress, Testing Library",
      "Code splitting, lazy loading e otimização de bundle",
      "Conformidade WCAG 2.1 AA / ARIA",
    ],
    stack: ["Lighthouse", "Web Vitals", "Jest", "Cypress", "WCAG 2.1 AA"],
  },
  "Consultoria & Mentoria Técnica": {
    deliverables: [
      "Liderança técnica e arquitetural em squads",
      "Code review, definição de padrões e style guides",
      "Mentoria e capacitação de times técnicos",
      "Definição de roadmap técnico e dívida estratégica",
    ],
    stack: ["Tech Lead", "Code Review", "Padrões", "Mentoria"],
  },
  "Generative AI & LLM Applications": {
    deliverables: [
      "Integração de LLMs em produtos existentes",
      "Pipelines com modelos locais e LLMOps",
      "Agentes e copilots customizados",
      "Aceleração do ciclo dev com AI-Driven Development",
    ],
    stack: ["LLM", "LLMOps", "Local LLMs", "AI-Driven", "Generative AI"],
  },
};

export default function ServicosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[40vh] !pb-10">
          <div className="content-container w-full max-w-[920px]">
            <SectionLabel>Serviços</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              O que <span className="text-accent-light italic">construímos</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Da arquitetura de plataformas corporativas a apps mobile e produtos com IA Generativa — entregamos software que gera resultado mensurável.
            </p>
          </div>
        </section>

        <section className="section-padding !pt-6">
          <div className="content-container max-w-[920px] flex flex-col gap-5">
            {SERVICES.map((s, i) => {
              const extra = SERVICE_DETAILS[s.title];
              return (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="gc py-8 px-7 sm:py-10 sm:px-10 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-10">
                      <div className="service-icon !mb-0">{s.icon}</div>
                      <div>
                        <h2 className="text-[20px] sm:text-[22px] font-bold text-text-light mb-3 tracking-tight">
                          {s.title}
                        </h2>
                        <p className="text-[14.5px] text-text-dim leading-[1.75] mb-5">
                          {s.desc}
                        </p>
                        {extra && (
                          <>
                            <ul className="flex flex-col gap-2 mb-5">
                              {extra.deliverables.map((d) => (
                                <li key={d} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[9px]" />
                                  <span className="text-[13.5px] text-text-subtle leading-[1.65]">
                                    {d}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-1.5">
                              {extra.stack.map((t) => (
                                <Tag key={t}>{t}</Tag>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
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
                    Tem um projeto em mente?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
                    Conte para gente o que você está construindo. Respondemos em até 24h úteis.
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
