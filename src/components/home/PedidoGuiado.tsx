import { Reveal, SectionLabel } from "@/components/ui";
import { LeadWizard } from "@/components/forms/LeadWizard";

/** Pedido guiado na home: o lead começa sem sair da página. */
export function PedidoGuiado() {
  return (
    <section id="orcamento" className="section-padding">
      <div className="content-container max-w-[820px]">
        <Reveal>
          <div className="text-center mb-10">
            <SectionLabel center>Orçamento</SectionLabel>
            <h2 className="font-serif section-heading">
              Peça seu orçamento{" "}<br />
              <span className="text-accent-light italic">em 1 minuto</span>
            </h2>
            <p className="text-[14px] sm:text-[15px] text-text-dim leading-[1.75] max-w-[520px] mx-auto mt-4">
              Três perguntas rápidas. A gente responde em até 24h úteis com um caminho e uma estimativa, sem custo.
            </p>
          </div>
        </Reveal>
        <div className="gc py-8 px-6 sm:px-10 relative overflow-hidden">
          <div className="case-glow-line" />
          <LeadWizard source="home-orcamento" />
        </div>
      </div>
    </section>
  );
}
