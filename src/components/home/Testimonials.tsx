import { Reveal, SectionLabel } from "@/components/ui";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

// PLACEHOLDER — substitua pelos depoimentos reais (citação, nome, cargo e empresa)
// antes de publicar. Um por persona: empresa digitalizando, app mobile e agência.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "A operação inteira de controle de SKUs rodava em planilha e a gente já não confiava nos números. Em poucos meses tínhamos um sistema que o time usa todo dia.",
    name: "Geisa Castelo Branco",
    role: "Coordenadora de Produtos Digitais",
    company: "Walmart.com · E-commerce",
  },
  {
    quote:
      "O app foi publicado nas lojas sem dor de cabeça e virou nosso principal canal de pedido. O cliente abre, pede e volta, e a gente acompanha tudo pelo painel.",
    name: "André Teixeira",
    role: "Gerente de Projetos",
    company: "Pão de Açúcar · App Mobile",
  },
  {
    quote:
      "Entraram no nosso fluxo como se fossem da casa: mesmo Jira, mesma daily, zero fricção com o cliente final. Entregamos um projeto que não caberia no nosso time sozinho.",
    name: "Leonardo Coletti",
    role: "Sócio-Diretor",
    company: "Agência CasaNostra · Whitelabel de Landing Pages",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="content-container">
        <Reveal>
          <div className="text-center mb-12">
            <SectionLabel center>Depoimentos</SectionLabel>
            <h2 className="font-serif section-heading">
              Quem contratou<br />
              <span className="text-accent-light italic">recomenda</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.07} className="h-full">
              <figure className="gc h-full flex flex-col px-7 py-8 relative overflow-hidden">
                <div className="glow-line-top" />
                <span aria-hidden className="font-serif text-[40px] leading-none text-accent-light/60 select-none">
                  “
                </span>
                <blockquote className="text-[14px] text-text-subtle leading-[1.75] mt-2 flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-border-card">
                  <span
                    aria-hidden
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-dim border border-border-card text-[13px] font-semibold text-accent-light shrink-0"
                  >
                    {initials(t.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-semibold text-brand tracking-tight">
                      {t.name}
                    </span>
                    <span className="block text-[12px] text-text-dim mt-0.5">
                      {t.role} · {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]![0] ?? "" : "";
  return (first + last).toUpperCase();
}
