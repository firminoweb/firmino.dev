import {
  Reveal,
  SectionLabel,
  TrackedLink,
  WhatsAppButton,
  WhatsAppGlyph,
} from "@/components/ui";
import { PROCESS_STEPS, ENGAGEMENT_MODELS } from "@/data/empresa";

export function ComoFunciona() {
  return (
    <section className="section-padding">
      <div className="content-container">
        <Reveal>
          <div className="text-center mb-12">
            <SectionLabel center>Como trabalhamos</SectionLabel>
            <h2 className="font-serif section-heading">
              Do primeiro contato ao<br />
              <span className="text-accent-light italic">sistema rodando</span>
            </h2>
            <p className="text-[14px] sm:text-[15px] text-text-dim leading-[1.75] max-w-[560px] mx-auto mt-5">
              Sem mistério e sem juridiquês. Você sempre sabe em que etapa o projeto está e o que vem a seguir.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.07} className="h-full">
              <div className="gc py-8 px-7 relative overflow-hidden h-full flex flex-col">
                <div className="glow-line-top" />
                <div className="font-serif text-[30px] font-medium text-accent-light leading-none tracking-tight mb-4">
                  {s.num}
                </div>
                <h3 className="text-[16.5px] font-bold text-text-light mb-2.5 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-text-dim leading-[1.7]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <div className="gc mt-10 px-6 py-6 sm:px-8">
            <p className="text-[11px] text-text-darker tracking-[1.5px] uppercase font-medium mb-4">
              Quatro jeitos de contratar
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {ENGAGEMENT_MODELS.map((m) => (
                <div key={m.id} className="metric-box !text-left !px-4 !py-3">
                  <div className="text-[14px] font-bold text-brand tracking-tight">{m.title}</div>
                  <div className="text-[11.5px] text-text-dim mt-0.5">{m.short}</div>
                </div>
              ))}
            </div>
            <TrackedLink
              href="/como-trabalhamos"
              event="cta_click"
              eventParams={{ location: "como_funciona", label: "como_trabalhamos" }}
              className="inline-block mt-5 text-[13px] text-accent-light hover:text-accent transition-colors font-medium"
            >
              Ver como trabalhamos →
            </TrackedLink>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="text-center mt-12">
            <p className="text-[14px] sm:text-[15px] text-text-dim leading-[1.75] max-w-[560px] mx-auto mb-7">
              Já tem time ou agência? A gente entra no seu fluxo como reforço, nas suas ferramentas e no seu processo, sem fricção.
            </p>
            <div className="flex flex-wrap gap-3.5 justify-center">
              <TrackedLink
                href="/contato"
                event="cta_click"
                eventParams={{ location: "como_funciona", label: "proposta" }}
                className="btn-primary inline-flex items-center justify-center"
              >
                Quero uma proposta →
              </TrackedLink>
              <WhatsAppButton
                source="como_funciona"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#15803d] text-white font-semibold text-[14px] hover:bg-[#166534] transition-colors"
              >
                <WhatsAppGlyph className="w-[18px] h-[18px]" />
                Falar no WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
