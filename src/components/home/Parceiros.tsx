import { Reveal, SectionLabel } from "@/components/ui";
import { PARTNER_AREAS } from "@/data/portfolio";

/**
 * Rede de parceiros, sem nomes de propósito: são profissionais e estúdios
 * independentes acionados por projeto, não quadro fixo. Citar nome daria a
 * entender vínculo que não existe.
 */
export function Parceiros() {
  return (
    <section className="section-padding !pt-0">
      <div className="content-container max-w-[1000px]">
        <Reveal>
          <div className="text-center mb-10">
            <SectionLabel center>Rede de parceiros</SectionLabel>
            <h2 className="font-serif section-heading !leading-[1.14]">
              Um time que <span className="text-accent-light italic">monta</span><br />
              conforme o projeto
            </h2>
            <p className="text-[15px] text-text-dim leading-[1.8] max-w-[560px] mx-auto mt-5">
              Trabalhamos com uma rede de profissionais e estúdios parceiros espalhados pelo
              Brasil. Cada projeto recebe a composição que ele pede, sem você pagar por
              estrutura que o seu caso não precisa.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PARTNER_AREAS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07} className="h-full">
              <div className="gc py-8 px-6 h-full">
                <div className="service-icon">{a.icon}</div>
                <h3 className="text-[16px] font-bold text-text-light mb-2 tracking-tight">
                  {a.title}
                </h3>
                <p className="text-[13.5px] text-text-dim leading-[1.7]">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
