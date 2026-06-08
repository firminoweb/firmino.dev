import { Reveal, Button, SectionLabel, TrackedLink } from "@/components/ui";

export function AiCta() {
  return (
    <section className="section-padding">
      <div className="content-container">
        <Reveal>
          <div className="gc py-12 px-6 sm:py-[72px] sm:px-14 text-center relative overflow-hidden">
            <div className="glow-line-top-cta" />
            <div className="cta-radial-overlay" />
            <div className="relative">
              <SectionLabel center>Generative AI & LLM Applications</SectionLabel>
              <h2 className="font-serif section-heading !text-[clamp(24px,3.5vw,44px)] !tracking-tight !leading-[1.2] mb-5">
                Impulsione seu negócio com<br />
                <span className="text-accent-light italic">aplicações inteligentes</span>
              </h2>
              <p className="text-[14px] sm:text-[15px] text-text-dim leading-[1.75] max-w-[560px] mx-auto mb-9">
                Coloque a inteligência artificial pra trabalhar no seu dia a dia: chatbot que atende cliente, agente que lê documento e automação que tira a tarefa repetitiva do time. Conectado ao que você já usa — WhatsApp, planilha, CRM — e entregue funcionando, sem precisar virar uma empresa de tecnologia.
              </p>
              <TrackedLink href="/contato" event="cta_click" eventParams={{ location: "ai_cta" }}>
                <Button>Fale com a gente →</Button>
              </TrackedLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
