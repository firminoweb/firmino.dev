import { Reveal, SectionLabel, JsonLd } from "@/components/ui";
import { COMPANY } from "@/data/portfolio";

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quanto custa um projeto?",
    a: "Depende do tamanho. Um site institucional, um app e uma plataforma com integração têm escopos diferentes. Na primeira conversa a gente entende o que você precisa e devolve uma estimativa de investimento e prazo — sem custo e sem compromisso.",
  },
  {
    q: "Em quanto tempo fica pronto?",
    a: "Projetos menores saem em poucas semanas. Plataformas maiores avançam em entregas quinzenais, com algo já funcionando cedo pra você acompanhar de perto. O cronograma é definido junto com você antes de começar.",
  },
  {
    q: "Vocês trabalham com contrato e nota fiscal?",
    a: `Sim. Somos uma empresa registrada no Brasil — ${COMPANY.legalName}, CNPJ ${COMPANY.cnpj} — com contrato e nota fiscal em todos os projetos, do pequeno negócio à grande operação.`,
  },
  {
    q: "Atendem empresas fora de São Paulo?",
    a: "Sim. O atendimento é 100% remoto, para clientes de todo o Brasil e do exterior. Workshops e imersões presenciais ficam disponíveis sob demanda na grande São Paulo.",
  },
  {
    q: "Já tenho um sistema ou uma agência. Dá pra trabalhar junto?",
    a: "Dá. A gente assume a evolução de um sistema que já existe ou entra como reforço técnico dentro do seu time ou da sua agência — no seu processo e nas suas ferramentas, sem fricção e, se você preferir, sem contato com o seu cliente final.",
  },
  {
    q: "Como começa?",
    a: "Você manda uma mensagem pelo formulário ou pelo WhatsApp contando o que precisa. Respondemos em até 24h úteis com os próximos passos — e só seguimos adiante se fizer sentido pra você.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section className="section-padding">
      <JsonLd data={FAQ_JSON_LD} />
      <div className="content-container max-w-[820px]">
        <Reveal>
          <div className="text-center mb-12">
            <SectionLabel center>Perguntas frequentes</SectionLabel>
            <h2 className="font-serif section-heading">
              Antes de <span className="text-accent-light italic">conversar</span>
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details className="faq-item gc px-6 py-1 sm:px-7">
                <summary className="flex items-center justify-between gap-4 py-5 text-left">
                  <span className="text-[15.5px] sm:text-[16.5px] font-semibold text-text-light tracking-tight">
                    {item.q}
                  </span>
                  <span className="faq-chevron text-accent-light text-[18px] shrink-0 transition-transform duration-300" aria-hidden>
                    ⌄
                  </span>
                </summary>
                <p className="text-[14px] text-text-dim leading-[1.75] pb-5 pr-6 max-w-[680px]">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
