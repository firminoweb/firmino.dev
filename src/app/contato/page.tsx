import { Navbar, Footer, Background } from "@/components/layout";
import { Reveal, SectionLabel } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT } from "@/data/portfolio";

export const metadata = {
  title: "Contato — firmino.dev",
  description:
    "Fale com a firmino.dev. Discuta seu projeto, peça um orçamento ou agende uma conversa.",
};

const CHANNELS = [
  {
    label: "E-mail",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: "✉",
    desc: "Resposta em até 24h úteis",
  },
  {
    label: "Telefone / WhatsApp",
    value: CONTACT.phone,
    href: `tel:+55${CONTACT.phone.replace(/\D/g, "")}`,
    icon: "☎",
    desc: "São Paulo, BRT (UTC-3)",
  },
  {
    label: "LinkedIn",
    value: "/in/firminoweb",
    href: CONTACT.linkedin,
    icon: "in",
    desc: "Conecte-se profissionalmente",
  },
  {
    label: "GitHub",
    value: "/firminoweb",
    href: CONTACT.github,
    icon: "</>",
    desc: "Código aberto e experimentos",
  },
];

export default function ContatoPage() {
  return (
    <>
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
                <h2 className="font-serif text-[24px] sm:text-[28px] !leading-[1.18] text-white mb-2">
                  Conte sobre o seu projeto
                </h2>
                <p className="text-[13.5px] text-text-dim leading-[1.7] mb-6 max-w-[560px]">
                  Quanto mais detalhes (escopo, prazo, stack atual), mais útil será nossa primeira resposta.
                </p>
                <ContactForm />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CHANNELS.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.06}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="gc case-card p-7 block relative overflow-hidden"
                  >
                    <div className="case-glow-line" />
                    <div className="flex items-start gap-4">
                      <div className="service-icon !mb-0">{c.icon}</div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-[12px] uppercase tracking-[2px] font-semibold text-text-dim mb-2">
                          {c.label}
                        </h2>
                        <p className="text-[16px] font-bold text-white tracking-tight mb-1 break-all">
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

            <Reveal delay={0.2}>
              <div className="gc py-9 px-7 sm:px-10 mt-6 relative overflow-hidden">
                <SectionLabel>Onde estamos</SectionLabel>
                <h2 className="font-serif text-[24px] sm:text-[28px] !leading-[1.18] text-white mb-3">
                  São Paulo, Brasil
                </h2>
                <p className="text-[14px] text-text-dim leading-[1.75] max-w-[560px]">
                  Atendimento 100% remoto para clientes do Brasil e exterior. Workshops e imersões presenciais sob demanda na grande São Paulo.
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
