import type { Metadata } from "next";
import { Navbar, Footer, Background } from "@/components/layout";
import { Reveal, SectionLabel, ObfuscatedContact, JsonLd } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT, COMPANY } from "@/data/portfolio";
import { breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Contato — firmino.dev";
const DESCRIPTION =
  "Fale com a firmino.dev. Discuta seu projeto, peça um orçamento ou agende uma conversa.";

export const metadata: Metadata = {
  title: "Contato",
  description: DESCRIPTION,
  alternates: { canonical: "/contato" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/contato",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

interface PublicChannel {
  label: string;
  value: string;
  href: string;
  icon: string;
  desc: string;
}

const PUBLIC_CHANNELS: PublicChannel[] = [
  {
    label: "LinkedIn",
    value: "/company/firminodev",
    href: CONTACT.linkedin,
    icon: "in",
    desc: "Siga a página da empresa",
  },
  {
    label: "GitHub",
    value: "/firminoweb",
    href: CONTACT.github,
    icon: "</>",
    desc: "Código aberto e experimentos",
  },
  {
    label: "X / Twitter",
    value: "@firminodev",
    href: CONTACT.twitter,
    icon: "𝕏",
    desc: "Novidades e bastidores",
  },
];

interface ProtectedChannel {
  label: string;
  value: string;
  kind: "email" | "phone";
  icon: string;
  desc: string;
}

const PROTECTED_CHANNELS: ProtectedChannel[] = [
  {
    label: "E-mail",
    value: CONTACT.email,
    kind: "email",
    icon: "✉",
    desc: "Resposta em até 24h úteis",
  },
  {
    label: "Telefone / WhatsApp",
    value: CONTACT.phone,
    kind: "phone",
    icon: "☎",
    desc: "São Paulo, BRT (UTC-3)",
  },
];

export default function ContatoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contato", path: "/contato" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[40vh] !pb-10">
          <div className="content-container w-full max-w-[920px]">
            <SectionLabel>Contato</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              Vamos <span className="text-accent-light italic">conversar</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Conta pra gente o que você está construindo. Discutimos escopo, prazo e a melhor abordagem técnica — sem compromisso.
            </p>
          </div>
        </section>

        <section className="section-padding !pt-6">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div className="gc py-8 px-7 sm:px-10 mb-6 relative overflow-hidden">
                <div className="case-glow-line" />
                <SectionLabel>Formulário</SectionLabel>
                <h2 className="font-serif text-[24px] sm:text-[28px] !leading-[1.18] text-brand mb-2">
                  Conte sobre o seu projeto
                </h2>
                <p className="text-[13.5px] text-text-dim leading-[1.7] mb-6 max-w-[560px]">
                  Quanto mais detalhes (escopo, prazo, stack atual), mais útil será nossa primeira resposta.
                </p>
                <ContactForm />
              </div>
            </Reveal>

            {/* Canais públicos: LinkedIn / GitHub / X — links abertos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PUBLIC_CHANNELS.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.06}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="gc case-card p-7 block relative overflow-hidden"
                  >
                    <div className="case-glow-line" />
                    <div className="flex items-start gap-4">
                      <div className="service-icon !mb-0">{c.icon}</div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-[12px] uppercase tracking-[2px] font-semibold text-text-dim mb-2">
                          {c.label}
                        </h2>
                        <p className="text-[16px] font-bold text-brand tracking-tight mb-1 break-all">
                          {c.value}
                        </p>
                        <p className="text-[12.5px] text-text-dark leading-[1.6]">{c.desc}</p>
                      </div>
                      <span className="case-arrow">↗</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Canais protegidos: e-mail / telefone — ofuscados contra scrapers */}
            <Reveal delay={0.15}>
              <div className="gc py-7 px-7 sm:px-10 mt-4 relative overflow-hidden">
                <div className="case-glow-line" />
                <SectionLabel>Canais diretos</SectionLabel>
                <p className="text-[13px] text-text-dim leading-[1.65] mb-5 max-w-[560px]">
                  Preferimos o formulário acima — é mais rápido pra alinhar contexto. Se preferir, os canais diretos abaixo também funcionam.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {PROTECTED_CHANNELS.map((c) => (
                    <div key={c.label} className="flex items-start gap-3">
                      <div className="service-icon !mb-0 !w-10 !h-10 !text-[15px]">{c.icon}</div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] uppercase tracking-[1.5px] font-semibold text-text-dim mb-1">
                          {c.label}
                        </div>
                        <ObfuscatedContact
                          value={c.value}
                          kind={c.kind}
                          className="text-[14.5px] font-semibold text-brand hover:text-accent-light transition-colors break-all"
                        />
                        <p className="text-[11.5px] text-text-darker leading-[1.55] mt-1">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="gc py-9 px-7 sm:px-10 mt-6 relative overflow-hidden">
                <SectionLabel>Onde estamos</SectionLabel>
                <h2 className="font-serif text-[24px] sm:text-[28px] !leading-[1.18] text-brand mb-3">
                  São Paulo, Brasil
                </h2>
                <p className="text-[14px] text-text-dim leading-[1.75] max-w-[560px]">
                  Atendimento 100% remoto para clientes do Brasil e exterior. Workshops e imersões presenciais sob demanda na grande São Paulo.
                </p>
                <p className="text-[12.5px] text-text-darker leading-[1.7] mt-4 pt-4 border-t border-border-subtle max-w-[560px]">
                  Empresa registrada no Brasil: {COMPANY.legalName} — CNPJ {COMPANY.cnpj}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
