import Image from "next/image";
import {
  Button,
  SectionLabel,
  WhatsAppButton,
  WhatsAppGlyph,
  TrackedLink,
} from "@/components/ui";
import { CLIENT_PROJECTS } from "@/data/portfolio";
import { HERO_TRUST } from "@/data/empresa";

// Só clientes da firmino.dev. As marcas da carreira do fundador ficam na /joao.
// Os logos de cliente são ícones quadrados, então o nome vai ao lado: sem ele,
// um ícone de 24px não diz de quem é. "Viaza / GoMilhas" vira "Viaza" pra caber.
const PROOF_LOGOS = CLIENT_PROJECTS.filter((p) => p.logo)
  .slice(0, 6)
  .map((p) => ({ name: p.client.split(" / ")[0], logo: p.logo as string }));

const PROOF_METRICS = [
  { value: "4 meses", label: "do início às duas lojas", sub: "StartPrev" },
  { value: "18 meses", label: "de portal no ar", sub: "PMERJ" },
];

export function Hero() {
  return (
    <section id="home" className="section-padding-hero">
      <div className="content-container w-full grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-14 items-center">
        {/* Left — transform-only entrance keeps the <h1> a valid LCP candidate */}
        <div className="hero-rise">
          <SectionLabel prominent>Engenharia de software · Web · Mobile · IA</SectionLabel>
          <h1 className="hero-heading">
            <span className="font-serif">Construímos </span>
            <span className="font-serif text-accent-light italic">software</span>
            <span className="font-serif">.</span><br />
            <span className="font-serif">Reforçamos </span>
            <span className="font-serif text-accent-light italic">times</span>
            <span className="font-serif">.</span>
          </h1>
          <p className="text-base text-text-muted leading-[1.75] max-w-[500px] mb-5">
            Aplicações web, apps mobile e automações com IA sob medida pra sua empresa. Do pequeno negócio à grande operação, com engenharia sênior do primeiro dia ao que vai pro ar.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-9">
            {HERO_TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[13px] text-text-subtle font-medium">
                <span aria-hidden className="text-success">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <div>
            <div className="flex flex-wrap gap-3.5">
              <TrackedLink
                href="/contato"
                event="cta_click"
                eventParams={{ location: "hero", label: "proposta" }}
                className="btn-primary inline-flex items-center justify-center"
              >
                Quero uma proposta →
              </TrackedLink>
              <Button href="/projetos" variant="ghost">Ver cases</Button>
            </div>
            <p className="text-[11.5px] text-text-dim mt-3">
              Resposta em 24h · sem compromisso
            </p>
          </div>
        </div>

        {/* Right — proof + direct WhatsApp lead channel */}
        <div className="reveal-immediate flex justify-center" style={{ animationDelay: "0.15s" }}>
          <ProofCard />
        </div>
      </div>
    </section>
  );
}

function ProofCard() {
  return (
    <div className="gc w-full max-w-[360px] p-0 relative overflow-hidden">
      <div className="glow-line-top-hero" />

      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-card">
        <div className="flex items-center gap-2.5">
          <div className="hero-card-dot" />
          <span className="text-[13px] text-text-subtle font-medium">firmino.dev</span>
        </div>
        <span className="text-[11px] text-text-dim font-semibold">Desde 2024</span>
      </div>

      <div className="px-6 pt-6 pb-7 flex flex-col gap-5">
        <div>
          <span className="text-[10.5px] text-accent-light font-semibold tracking-[2px] uppercase">
            Clientes atendidos
          </span>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {PROOF_LOGOS.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-2 h-10 rounded-lg bg-[#f4f5fa] border border-border-card px-2.5 min-w-0"
              >
                <Image
                  src={c.logo}
                  alt=""
                  width={48}
                  height={48}
                  className="w-6 h-6 rounded object-contain shrink-0"
                />
                <span className="text-[12px] font-semibold text-text-subtle truncate">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PROOF_METRICS.map((m) => (
            <div key={m.value} className="metric-box !text-left !px-4 !py-3">
              <div className="font-serif text-[24px] font-medium text-brand tracking-tight leading-none">
                {m.value}
              </div>
              <div className="text-[11px] text-accent-light font-semibold mt-1.5">{m.label}</div>
              <div className="text-[10px] text-text-dim mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>

        <div>
          <WhatsAppButton
            source="hero"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-[10px] bg-[#15803d] text-white font-semibold text-[14px] hover:bg-[#166534] transition-colors"
          >
            <WhatsAppGlyph className="w-[18px] h-[18px]" />
            Falar agora no WhatsApp
          </WhatsAppButton>
          <p className="text-[11px] text-text-dim text-center mt-2.5">
            Resposta em 24h · sem compromisso
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <div className="hero-sweep-bar animate-sweep" />
      </div>
    </div>
  );
}
