import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import { Reveal, SectionLabel, Button, Tag, JsonLd } from "@/components/ui";
import { SERVICES } from "@/data/portfolio";
import { breadcrumbJsonLd } from "@/lib/seo";
import { hasServicoContent } from "@/lib/servicos";

const TITLE = "Serviços — firmino.dev";
const DESCRIPTION =
  "Squad sênior plug-and-play para empresas digitalizando operação e agências precisando de reforço técnico. 15+ anos em stack de produção web, mobile e Generative AI.";

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
  "Squad para empresa digitalizando": {
    deliverables: [
      "Squad sênior dedicado em sprints quinzenais",
      "Roadmap de saída do sistema antigo ou da ferramenta pronta para plataforma própria",
      "Entrega contínua com qualidade automatizada e CI/CD",
    ],
    stack: ["Squad dedicado", "Sprints quinzenais", "CI/CD"],
  },
  "Reforço técnico para agência": {
    deliverables: [
      "Sênior ou squad alocado no seu time de delivery",
      "Encaixe no seu PM, no seu Jira e na sua relação com o cliente",
      "White-label total — sem contato com seu cliente final se você preferir",
      "Faturamento PJ limpo: você emite a NF, a gente entrega o código",
    ],
    stack: ["Alocação sênior", "White-label", "PM-friendly", "PJ"],
  },
  "Aplicações e automações com IA": {
    deliverables: [
      "Chatbot que atende cliente em texto ou voz, conectado ao seu sistema",
      "Agente que lê documento, extrai informação e devolve resultado pronto",
      "Automação de tarefa repetitiva — atendimento, triagem, geração de conteúdo",
      "Integração com IA dentro do que você já usa (WhatsApp, planilha, CRM, ERP)",
    ],
    stack: ["IA Generativa", "LLM", "Agentes", "Automação", "Integrações"],
  },
  "App mobile sob medida pra sua empresa": {
    deliverables: [
      "App nativo iOS e Android construído do zero",
      "Catálogo, pedido, pagamento, fidelidade — qualquer fluxo da sua operação",
      "Publicação nas lojas (App Store e Google Play) e atualizações contínuas",
      "Integração com seu sistema atual (ERP, CRM, e-commerce)",
    ],
    stack: ["React Native", "iOS", "Android", "App Store", "Google Play"],
  },
  "Aplicações web sob medida pra sua empresa": {
    deliverables: [
      "Sistemas, sites e plataformas web sob medida — do protótipo até no ar",
      "Painéis administrativos, e-commerce, plataformas de cliente, sistemas internos",
      "APIs e integrações com bancos de dados e serviços que você já usa",
      "Hospedagem, manutenção e evolução contínua",
    ],
    stack: ["Angular", "React", "Next.js", "Node.js", "TypeScript", "GraphQL"],
  },
  "Arquitetura, performance & qualidade": {
    deliverables: [
      "Plataformas corporativas com Module Federation e micro-frontends",
      "Design Systems compartilhados entre times",
      "Auditoria Lighthouse, Web Vitals e otimização de bundle",
      "Cobertura de testes acima de 80% e conformidade WCAG 2.1 AA / ARIA",
    ],
    stack: ["Module Federation", "Design Systems", "Clean Architecture", "Lighthouse", "WCAG"],
  },
  "Tech leadership & code review": {
    deliverables: [
      "Liderança técnica fracionada (CTO-as-a-service)",
      "Code review estratégico e definição de padrões",
      "Mentoria e capacitação do squad interno",
      "Roadmap técnico e gestão de dívida estratégica",
    ],
    stack: ["Tech Lead fracionado", "Code Review", "Padrões", "Mentoria"],
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
              Como <span className="text-accent-light italic">atendemos</span> sua empresa ou agência
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Trabalhamos em dois formatos comerciais: squad dedicado para empresas digitalizando ou alocação sênior dentro do seu time de agência. Sustentado por 15+ anos de stack de produção em Angular, React, Next.js, React Native e Generative AI.
            </p>
          </div>
        </section>

        <section className="section-padding !pt-6">
          <div className="content-container max-w-[920px] flex flex-col gap-5">
            {SERVICES.map((s, i) => {
              const extra = SERVICE_DETAILS[s.title];
              const hasDetail = hasServicoContent(s.slug);
              return (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="gc py-8 px-7 sm:py-10 sm:px-10 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-10">
                      <div className="service-icon !mb-0">{s.icon}</div>
                      <div>
                        <h2 className="text-[20px] sm:text-[22px] font-bold text-text-light mb-3 tracking-tight">
                          {hasDetail ? (
                            <Link
                              href={`/servicos/${s.slug}`}
                              className="hover:text-accent-light transition-colors"
                            >
                              {s.title}
                            </Link>
                          ) : (
                            s.title
                          )}
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
                            <div className="flex flex-wrap gap-1.5 mb-5">
                              {extra.stack.map((t) => (
                                <Tag key={t}>{t}</Tag>
                              ))}
                            </div>
                          </>
                        )}
                        {hasDetail && (
                          <Link
                            href={`/servicos/${s.slug}`}
                            className="text-[13px] text-accent-light hover:text-accent transition-colors inline-flex items-center gap-1.5 font-medium"
                          >
                            Saber mais sobre esse serviço →
                          </Link>
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
                      <Button>Quero uma proposta →</Button>
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
