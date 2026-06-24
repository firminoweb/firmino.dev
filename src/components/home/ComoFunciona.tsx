import {
  Reveal,
  SectionLabel,
  TrackedLink,
  WhatsAppButton,
  WhatsAppGlyph,
} from "@/components/ui";

interface Step {
  num: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Conversa e diagnóstico",
    desc: "Você conta o que precisa pelo WhatsApp ou pelo formulário. A gente entende a sua operação, aponta o caminho e devolve uma estimativa de investimento e prazo. Sem custo e sem compromisso.",
  },
  {
    num: "02",
    title: "Plano combinado",
    desc: "Antes de começar, definimos juntos o escopo, o cronograma e por onde faz mais sentido começar. Você aprova o plano já sabendo onde quer chegar.",
  },
  {
    num: "03",
    title: "Construção com entregas frequentes",
    desc: "A gente constrói em ciclos curtos, com algo funcionando cedo pra você acompanhar de perto. A cada quinzena você vê o que andou e ajusta a prioridade do que vem.",
  },
  {
    num: "04",
    title: "Entrega, evolução e suporte",
    desc: "O sistema entra no ar e continua evoluindo junto com a sua operação. O código é seu, fica no seu repositório, e a gente segue dando suporte e melhorando conforme o uso real mostra o que importa.",
  },
];

export function ComoFunciona() {
  return (
    <section className="section-padding">
      <div className="content-container">
        <Reveal>
          <div className="text-center mb-12">
            <SectionLabel center>Como funciona</SectionLabel>
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
          {STEPS.map((s, i) => (
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
